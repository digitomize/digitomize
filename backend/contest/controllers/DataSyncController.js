//? APIs to MongoDB

import dotenv from 'dotenv';
import atcoderContests from './platforms/atcoderController.js';
import codechefContests from './platforms/codechefController.js';
import codeforcesContests from './platforms/codeforcesController.js';
import gfgContests from './platforms/gfgController.js';
import leetcodeContests from './platforms/leetcodeController.js';
import codingninjas_studioContests from './platforms/codingninjas_studioController.js';
import { UpcomingContest, AllContest } from '../models/Contest.js';

dotenv.config({ path: "../../.env" });


//* Clear the UpcomingContest collection in MongoDB
async function clearUpcoming() {
    try {
        const currentTime = Math.floor(Date.now() / 1000);
        await UpcomingContest.deleteMany({ startTimeUnix: { $lt: currentTime } });
        console.log('Deleted upcoming contests with start time before now.');
    }
    catch (err) {
        console.log("Error while deleting upcoming contests:", err);
    }
}


//* Add contest using API
async function addToDB(mappedContests, platform) {
    try {
        // Sorting contests
        mappedContests.sort((a, b) => a.startTimeUnix - b.startTimeUnix);

        try {
            // Add to UpcomingContest collection
            await UpcomingContest.insertMany(mappedContests, { ordered: false });
            console.log(`│ Updated upcoming contests for ${platform}`.padEnd(53) + "│");
        } catch (upcomingErr) {
            if (upcomingErr.code === 11000) {
                console.log(`│ Some duplicate(s) in UpcomingContest for ${platform}`.padEnd(53) + "│");
            } else {
                throw upcomingErr;
            }
        }

        try {
            // Update AllContest collection
            await AllContest.insertMany(mappedContests, { ordered: false });
            console.log(`│ Updated AllContests for ${platform}`.padEnd(53) + "│");
        } catch (allErr) {
            if (allErr.code === 11000) {
                console.log(`│ Some duplicate(s) in AllContest for ${platform}`.padEnd(53) + "│");
            } else {
                throw allErr;
            }
        }
    } catch (err) {
        console.log(`Error adding contests to MongoDB for ${platform}`, err);
    }
}


async function syncContests() {
    try {
        console.log("===============================================");
        console.log("Syncing Data | API to MongoDB");
        console.log("===============================================");

        //* Clearing the UpcomingContest collection
        await clearUpcoming();

        console.log("┌────────────────────CodingNinjas────────────────────┐");
        const codingninjasData = await codingninjas_studioContests.codingninjas_studio_c();
        await addToDB(codingninjasData, "CodeStudio");

        //* LeetCode Section
        console.log("├──────────────────────Leetcode──────────────────────┤");
        const leetcodeData = await leetcodeContests.leetcode_c();
        await addToDB(leetcodeData, "LeetCode");

        console.log("├───────────────────────AtCoder──────────────────────┤");
        // console.log("<======= AtCode =======>");
        const atcodeData = await atcoderContests.atcoder_c();
        await addToDB(atcodeData, "AtCoder");
        
        //* GeeksforGeeks Section
        console.log("├────────────────────GeeksForGeeks───────────────────┤");
        // console.log("<======= GeeksForGeeks =======>");
        const geeksforgeeksData = await gfgContests.geeksforgeeks_c();
        await addToDB(geeksforgeeksData, "GFG");

        //* Codeforces Section
        console.log("├──────────────────────CodeForces────────────────────┤");
        // console.log("<======= CodeForces =======>");
        const codeforcesData = await codeforcesContests.codeforces_c();
        await addToDB(codeforcesData, "Codeforces");

        //* CodeChef Section
        console.log("├───────────────────────CodeChef─────────────────────┤");
        // console.log("<======= CodeChef =======>");
        const codechefData = await codechefContests.codechef_c();
        await addToDB(codechefData, "CodeChef");
        console.log("└────────────────────────────────────────────────────┘");

        //* All Functions Synced.
        console.log("===============================================");
        console.log("All Contests Synced. | API to MongoDB");
        console.log("===============================================");
    } catch (error) {
        console.log("Error fetching or syncing contests:", error);
    }
}

export default {
    syncContests
};
