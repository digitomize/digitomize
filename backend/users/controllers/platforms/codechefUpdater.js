import https from "https";

async function codechef_u (username) {
  if (!username) {
    return null;
  }
  try {
    const profileUrl = `https://www.codechef.com/users/${username}`;

    const response = await new Promise((resolve, reject) => {
      https
        .get(profileUrl, (res) => {
          let data = "";
          res.on("data", (chunk) => {
            data += chunk;
          });
          res.on("end", () => {
            resolve(data);
          });
        })
        .on("error", (error) => {
          reject(error);
        });
    });

    const regex = /jQuery.extend\(Drupal\.settings,\s*({[^;]+})\);/;
    const regex2 = /<h3[^>]*>Practice Problems(.*?)<\/h3>/g;
    const match = regex.exec(response);
    const totalQuestionsMatch = regex2.exec(response);
    let resultObj = {
      attendedContestsCount: null,
      handle: username,
      rating: null,
      rank: `none`,
      totalQuestions:0
    }
    if(!match && !totalQuestionsMatch)
      throw new Error("User info and solved totalQuestions not found on the page");

    if (match) {
      const jsonString = match[1].replace(/\/\/.*/g, ""); // Remove single-line comments
      const userInfo = JSON.parse(jsonString);
      if (
        userInfo.date_versus_rating &&
        userInfo.date_versus_rating.all &&
        userInfo.date_versus_rating.all.length > 0
      ) {
        const allContests = userInfo.date_versus_rating.all;
        const lastContest = allContests[allContests.length - 1];
        const lastContestRating = lastContest.rating;

        let stars;
        if (lastContestRating <= 1399) {
          stars = 1;
        } else if (lastContestRating >= 1400 && lastContestRating <= 1599) {
          stars = 2;
        } else if (lastContestRating >= 1600 && lastContestRating <= 1799) {
          stars = 3;
        } else if (lastContestRating >= 1800 && lastContestRating <= 1999) {
          stars = 4;
        } else if (lastContestRating >= 2000 && lastContestRating <= 2199) {
          stars = 5;
        } else if (lastContestRating >= 2200 && lastContestRating <= 2499) {
          stars = 6;
        } else if (lastContestRating >= 2500) {
          stars = 7;
        }
       resultObj =  {
        ...resultObj,
          attendedContestsCount: allContests.length,
          handle: username,
          rating: lastContestRating,
          rank: `${stars} star`,
        };
      } 
    } 
    if(totalQuestionsMatch && totalQuestionsMatch?.length > 1 && typeof totalQuestionsMatch[1] === 'string' && totalQuestionsMatch[1].trim().length > 0){
        let totalQuestions = 0;
        totalQuestions = +totalQuestionsMatch[1].replace(/[\(\):]+/g,'');
        resultObj = {...resultObj,totalQuestions}
      }else if(!resultObj.attendedContestsCount && !resultObj.rating){
        throw new Error("User info and solved totalQuestions not found on the page");
      }
      return resultObj;
  } catch (error) {
    console.error("Error fetching user info:", error.message);
    return null;
  }
}

export { codechef_u };
