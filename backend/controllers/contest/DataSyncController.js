//? APIs to MongoDB
import dotenv from 'dotenv';
dotenv.config({ path: "../../.env" });
import  codechef_c  from './platforms/codechefController.js';
import codeforces_c  from './platforms/codeforcesController.js';
import  geeksforgeeks_c  from './platforms/gfgController.js';
import  leetcode_c  from './platforms/leetcodeController.js';
import codingninjas_studio_c  from './platforms/codingninjas_studioController.js';
import UpcomingContest  from '../../models/contest/Contest.js';
import AllContest  from '../../models/contest/Contest.js';

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
            await UpcomingContest.insertMany(mappedContests, { ordered: false, upsert: true });
            console.log(`Updated upcoming contests for ${platform}`);
        } catch (upcomingErr) {
            if (upcomingErr.code === 11000) {
                console.log(`Some duplicate(s) in UpcomingContest for ${platform}`);
            } else {
                throw upcomingErr;
            }
        }

        try {
            // Update AllContest collection
            await AllContest.insertMany(mappedContests, { ordered: false });
            console.log(`Updated AllContests for ${platform}`);
        } catch (allErr) {
            if (allErr.code === 11000) {
                console.log(`Some duplicate(s) in AllContest for ${platform}`);
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

        // * Codingninjas_studio Section
        console.log("<======= Codingninjas_studio =====>");
        const codingninjasData = await codingninjas_studio_c();
        await addToDB(codingninjasData, "Codingninjas_studio");
        
        //* LeetCode Section
        console.log("<======= LeetCode =====>");
        const leetcodeData = await leetcode_c();
        await addToDB(leetcodeData, "LeetCode");
        //* GeeksforGeeks Section
        console.log("<======= GeeksForGeeks =======>");
        const geeksforgeeksData = await geeksforgeeks_c();
        await addToDB(geeksforgeeksData, "GeeksForGeeks");

        //* Codeforces Section
        console.log("<======= CodeForces =======>");
        const codeforcesData = await codeforces_c();
        await addToDB(codeforcesData, "Codeforces");

        //* CodeChef Section
        console.log("<======= CodeChef =======>");
        const codechefData = await codechef_c();
        await addToDB(codechefData, "CodeChef");

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
}
