//? APIs to MongoDB

require('dotenv').config({ path: "../../.env" });
const mongoose = require("mongoose");
const codechefContests = require('./platforms/codechefController');
const codeforcesContests = require('./platforms/codeforcesController');
const gfgContests = require('./platforms/gfgController');
const leetcodeContests = require('./platforms/leetcodeController');
const { UpcomingContest, AllContest } = require('../../models/contest/Contest');

console.log(process.env.TEST);
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("MongoDB Connected."))
    .catch((err) => console.log("Error:", err));


async function clearUpcoming() {
    try {
        await UpcomingContest.deleteMany({}); 
    }
    catch (err) {
        console.log("Error while deleting upcoming contests:", err);
    }
}


async function addToDB(mappedContests, platform) {
    // Separate upcoming and all contests
    const currentTime = Date.now();
    const upcomingContestsData = [];
    const allContestData = [];

    // mappedContests.forEach((contest) => {
    //     if (contest.startTimeUnix > currentTime) {
    //         console.log("ADDDEDDD");
    //     // Upcoming contest
    //     upcomingContestsData.push(contest);
    //   } else {
    //     // Ended contest
    //     allContestData.push(contest);
    //   }
    // });
    // Update the UpcomingContest collection
    try {
        // await UpcomingContest.deleteMany({});
        await UpcomingContest.insertMany(mappedContests, { ordered: false });
        console.log(`Updated upcoming contests for ${platform}`);
        
        // Update all collection
        await AllContest.insertMany(mappedContests, { ordered: false });
        console.log(`Updated all contests for ${platform}`);
    }
    catch (err) {
        if (err.code === 11000) {
            console.log(`Some duplicate(s) in ${platform}`);
        }
        else {
            console.log(`Error adding contests to MongoDB for ${platform}`, err);
        }
    }
}

async function syncContests() {
    try {
        await clearUpcoming();
        //* LeetCode Section
        const leetcodeData = await leetcodeContests.leetcode_c();
        await addToDB(leetcodeData, "LeetCode");

        //* GeeksforGeeks Section
        const geeksforgeeksData = await gfgContests.geeksforgeeks_c();
        await addToDB(geeksforgeeksData, "GeeksForGeeks");

        //* Codeforces Section
        const codeforcesData = await codeforcesContests.codeforces_c();
        await addToDB(codeforcesData, "Codeforces");

        //* CodeChef Section
        const codechefData = await codechefContests.codechef_c();
        await addToDB(codechefData, "CodeChef");

        //* All Functions Synced.
        console.log("All Contests Synced.");
    } catch (error) {
        console.log("Error fetching or syncing contests:", error);
    }
}

// Fetch and sync contests on startup
// syncContests();

// Schedule periodic sync every 1 hour
setInterval(syncContests, 60 * 60 * 1000);

module.exports = {
    syncContests,
}
