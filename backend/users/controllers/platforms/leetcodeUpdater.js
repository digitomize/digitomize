import https from "https";

async function leetcode_u(handle) {
  if (!handle) {
    return null;
  }
  const url = "https://leetcode.com/graphql";

  const query = {
    variables: { username: handle, year: 2023 },
    query: `
    query CombinedUserQueries($username: String!, $year: Int) {
      userPublicProfile: matchedUser(username: $username) {
        contestBadge {
          name
          expired
          hoverText
          icon
        }
        username
        githubUrl
        twitterUrl
        linkedinUrl
        profile {
          ranking
          userAvatar
          realName
          aboutMe
          school
          websites
          countryName
          company
          jobTitle
          skillTags
          postViewCount
          postViewCountDiff
          reputation
          reputationDiff
          solutionCount
          solutionCountDiff
          categoryDiscussCount
          categoryDiscussCountDiff
        }
      }
    
      languageStats: matchedUser(username: $username) {
        languageProblemCount {
          languageName
          problemsSolved
        }
      }
    
      userContestRanking(username: $username) {
        attendedContestsCount
        rating
        globalRanking
        totalParticipants
        topPercentage
        badge {
          name
        }
      }
      userContestRankingHistory(username: $username) {
        attended
        trendDirection
        problemsSolved
        totalProblems
        finishTimeInSeconds
        rating
        ranking
        contest {
          title
          startTime
        }
      }
    
      userProblemsSolved: matchedUser(username: $username) {
        problemsSolvedBeatsStats {
          difficulty
          percentage
        }
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
    
      userBadges: matchedUser(username: $username) {
        badges {
          id
          name
          shortName
          displayName
          icon
          hoverText
          medal {
            slug
            config {
              iconGif
              iconGifBackground
            }
          }
          creationDate
          category
        }
        upcomingBadges {
          name
          icon
          progress
        }
      }
    
      userProfileCalendar: matchedUser(username: $username) {
        userCalendar(year: $year) {
          activeYears
          streak
          totalActiveDays
          dccBadges {
            timestamp
            badge {
              name
              icon
            }
          }
          submissionCalendar
        }
      }
    
      getUserProfile: matchedUser(username: $username) {
        activeBadge {
          displayName
          icon
        }
      }
    }
    
    `,
  };

  return new Promise((resolve, reject) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const request = https.request(url, options, (response) => {
      let data = "";

      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        try {
          const userInfo = JSON.parse(data);
          console.log("OKKKKKKKKK", userInfo);
          if (userInfo.data?.userContestRanking == undefined) {
            // userInfo.data = userContestRanking;
            userInfo.data.userContestRanking = {
              attendedContests2023Count: 0,
              rating: 0,
              globalRanking: 0,
            };
          }
          userInfo.data.userContestRanking.rank = userInfo.data.userPublicProfile.contestBadge?.name || "none";
          userInfo.data.userContestRanking.handle = handle;

          // Filter out contests where attended is true
          const attendedContests2023 = userInfo.data.userContestRankingHistory.filter(contest => contest.attended && contest.contest.startTime > 1672531200);
          const attendedRankingsPositive = attendedContests2023.filter(contest => contest.ranking > 0);

          // Calculate average solved questions
          const avgSolved =
            attendedContests2023.reduce((sum, contest) => sum + contest.problemsSolved, 0) /
            attendedContests2023.length;

          // Find best and worst ranking
          const bestRanking = Math.min(...attendedRankingsPositive.map(contest => contest.ranking));
          const worstRanking = Math.max(...attendedContests2023.map(contest => contest.ranking));

          // Find maximum rating
          const maxRating = Math.max(...attendedContests2023.map(contest => contest.rating));

          const maxStreak2023 = userInfo.data.userProfileCalendar.userCalendar.streak;
          const activeDays2023 = userInfo.data.userProfileCalendar.userCalendar.totalActiveDays;



          const submissionCalendarString = userInfo.data.userProfileCalendar.userCalendar.submissionCalendar;

          // Step 1: Parse the submissionCalendar string into a JavaScript object
          const submissionCalendar = JSON.parse(submissionCalendarString);

          // Assuming the API already sends entries after 1672531200
          const submissionsAfter2023 = Object.entries(submissionCalendar)
            .map(([timestamp, submissions]) => ({ timestamp: parseInt(timestamp), submissions }));

          // Step 3: Count total number of submissions
          const totalSubmissions2023 = submissionsAfter2023.reduce((total, { submissions }) => total + submissions, 0);
          console.log("Total Submissions:", totalSubmissions2023);

          // Step 4: Find the most active day and month
          let mostActiveDayTimestamp2023 = 0;
          let mostActiveDaySubmissions2023 = 0;

          submissionsAfter2023.forEach(({ timestamp, submissions }) => {
            if (submissions > mostActiveDaySubmissions2023) {
              mostActiveDayTimestamp2023 = timestamp;
              mostActiveDaySubmissions2023 = submissions;
            }
          });

          // Step 5: Organize submissions by month
          const submissionsByMonth = submissionsAfter2023.reduce((acc, { timestamp, submissions }) => {
            const monthKey = new Date(timestamp * 1000).toLocaleString('en-US', { month: 'long' });
            acc[monthKey] = (acc[monthKey] || 0) + submissions;
            return acc;
          }, {});

          // Step 6: Find the most active month
          const mostActiveMonth2023 = Object.entries(submissionsByMonth).reduce((mostActive, [month, submissions]) => {
            return submissions > mostActive.submissions ? { month, submissions } : mostActive;
          }, { month: '', submissions: 0 }).month;

          console.log("Most Active Day (Unix Timestamp):", mostActiveDayTimestamp2023);
          console.log("Most Active Month:", mostActiveMonth2023);





          const result = { ...userInfo.data.userContestRanking, attendedContests2023, avgSolved, bestRanking, worstRanking, maxRating, attendedContests2023Count: attendedContests2023.length, maxStreak2023, activeDays2023, totalSubmissions2023, mostActiveDayTimestamp2023, mostActiveMonth2023 };
          console.log("result", result);
          // console.log(attendedRankingsPositive.map(contest => contest.ranking));

          resolve(result);
        } catch (error) {
          console.log("Error parsing JSON:", error);
          resolve({});
        }
      });
    });

    request.on("error", (error) => {
      console.log("Error getting user info:", error);
      reject(error);
    });

    request.write(JSON.stringify(query));
    request.end();
  });
}
leetcode_u("pranshgupta54")
export { leetcode_u };
