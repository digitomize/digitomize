const https = require("https");

async function codingninjas_studio_c() {
    const url = "https://api.codingninjas.com/api/v4/public_section/contest_list";

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
                    const filteredContests = contestList.data.events.filter(
                        (contest) => contest.event_start_time > Math.floor(Date.now() / 1000)
                    );
                    const contestsWithHost = filteredContests.map((contest) => ({
                        host: "CodingNinjas",
                        name: contest.name,
                        vanity: contest.id,
                        url: `https://codingninjas.com/studio/contests/${contest.slug}`,
                        startTimeUnix: contest.event_start_time,
                        duration: Math.floor(contest.event_duration / 60)
                        // duration: Math.floor(new Date(contest.end_time).getTime() / (60 * 1000)) - Math.floor(new Date(contest.start_time).getTime() / (60 * 1000)),
                    }));
                    // console.log(contestsWithHost);
                    resolve(contestsWithHost);
                } catch (error) {
                    console.log("Error parsing JSON:", error);
                    resolve([]);
                }
            });
        });
    });
    return filteredContestsPromise;
}
module.exports = {
    codingninjas_studio_c,
};
