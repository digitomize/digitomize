import https from "https";

async function leetcode_u(handle) {
  if (!handle) {
    return null;
  }
  const url = "https://leetcode.com/graphql";

  const query = {
    operationName: "getContentRankingData",
    variables: { username: handle },
    query: `
      query getContentRankingData($username: String!) {
        userContestRanking(username: $username) {
          attendedContestsCount
          rating
          badge {
            name
          }
          globalRanking
          __typename
        }
        matchedUser(username: $username) {
          submitStats {
            acSubmissionNum {
              difficulty
              count
              submissions
            }
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
          // console.log("OKKKKKKKKK", userInfo);
          // console.log(userInfo.data.userContestRanking.badge);
          if (
            userInfo.data?.userContestRanking === undefined ||
            userInfo.data?.userContestRanking === null
          ) {
            // userInfo.data = userContestRanking;
            userInfo.data.userContestRanking = {
              attendedContestsCount: 0,
              rating: 0,
              globalRanking: 0,
            };
          }
          if ([null, undefined].includes(userInfo.data?.matchedUser)) {
            userInfo.data.userContestRanking = {
              ...userInfo.data.userContestRanking,
              totalQuestions: 0,
              easyQuestions: 0,
              mediumQuestions: 0,
              hardQuestions: 0,
            };
          } else if (Object.hasOwn(userInfo.data?.matchedUser, "submitStats")) {
            const {
              submitStats: {
                acSubmissionNum: [all, easy, medium, hard],
              },
            } = userInfo.data?.matchedUser;
            userInfo.data.userContestRanking = {
              ...userInfo.data.userContestRanking,
              totalQuestions: all.count,
              easyQuestions: easy.count,
              mediumQuestions: medium.count,
              hardQuestions: hard.count,
            };
          }
          // console.log(userInfo)
          userInfo.data.userContestRanking.rank =
            userInfo.data.userContestRanking?.badge?.name || "none";
          userInfo.data.userContestRanking.handle = handle;

          //   console.log("HERRRREEEEE:",userInfo.data.userContestRanking);
          resolve(userInfo.data.userContestRanking);
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

export { leetcode_u };
