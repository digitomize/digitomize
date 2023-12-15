// ? API to mongodb function

import https from "https";

async function codechef_c() {
  const url = "https://www.codechef.com/api/list/contests/all";

  const promise = new Promise((resolve, reject) => {
    https.get(url, function (response) {
      if (response.statusCode === 200) {
        resolve(response);
      } else {
        reject(new Error("Error getting contests"));
      }
    });
  });

  const filteredContestsPromise = promise.then(function (response) {
    let list = "";

    response.on("data", function (data) {
      list += data;
    });

    return new Promise((resolve) => {
      response.on("end", function () {
        try {
          const contestList = JSON.parse(list.toString());
          const futureContests = contestList.future_contests;
          // console.log("Future Contests:", futureContests);
          const formattedContests = futureContests.map((contest) => ({
            host: "codechef",
            name: contest.contest_name,
            vanity: contest.contest_code,
            url: "https://www.codechef.com/" + contest.contest_code,
            // startTimeIST: formatStartTimeIST(contest.contest_start_date_iso),
            startTimeUnix: Math.floor(
              new Date(contest.contest_start_date_iso).getTime() / 1000,
            ),
            duration: contest.contest_duration,
          }));

          resolve(formattedContests);
        } catch (error) {
          console.log("Error parsing JSON:", error);
          resolve([]);
        }
      });
    });
  });

  return filteredContestsPromise;
}

function formatStartTimeIST(start_time) {
  const date = new Date(start_time);
  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const startTimeIST = date.toLocaleString("en-US", options);
  return startTimeIST;
}

export default {
  codechef_c,
};
