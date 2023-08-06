//? APIs to MongoDB

require('dotenv').config({ path: "../../.env" });
const codechefContests = require('./platforms/codechefController');
const codeforcesContests = require('./platforms/codeforcesController');
const gfgContests = require('./platforms/gfgController');
const leetcodeContests = require('./platforms/leetcodeController');
const { UpcomingContest, AllContest } = require('../../models/contest/Contest');

//* Clear the UpcomingContest collection in MongoDB
async function clearUpcoming() {
    try {
        await UpcomingContest.deleteMany({}); 
    }
    catch (err) {
        console.log("Error while deleting upcoming contests:", err);
    }
}

//* Add contest using API
async function addToDB(mappedContests, platform) {
    try {
        //Sorting contests
        mappedContests.sort((a, b) => a.startTimeUnix - b.startTimeUnix);
        // console.log(mappedContests);
        // Add to UpcomingContest collection
        await UpcomingContest.insertMany(mappedContests, { ordered: false });
        console.log(`Updated upcoming contests for ${platform}`);
        
        // Update AllContest collection
        await AllContest.insertMany(mappedContests, { ordered: false });
        console.log(`Updated all contests for ${platform}`);
    }
    catch (err) {
        //* 11000 is error code for duplicate item.
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

        //* Clearing the UpcomingContest collection
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

module.exports = {
    syncContests,
}
