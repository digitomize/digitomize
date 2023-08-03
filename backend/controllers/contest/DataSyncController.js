//? APIs to MongoDB

require('dotenv').config({ path: "../../.env" });
const mongoose = require("mongoose");
const codechefContests = require('./platforms/codechefController');
const codeforcesContests = require('./platforms/codeforcesController');
const gfgContests = require('./platforms/gfgController');
const leetcodeContests = require('./platforms/leetcodeController');
const Contest = require('../../models/contest/Contest');

console.log(process.env.TEST);
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("MongoDB Connected."))
    .catch((err) => console.log("Error:", err));

async function syncContests() {
    try {


        //* LeetCode Section
        try {
            // Fetches all from API
            const mappedContests = await leetcodeContests.leetcode_c();
            // Insert into DB
            await Contest.insertMany(mappedContests, { ordered: false }); 
            console.log("LeetCode contests added:", mappedContests);
        } catch (err) {
            // If Contest already present
            if (err.code === 11000)
                console.log("Some Duplicate(s) in LeetCode");
            else console.log("Error:", err);
        }

        //* GeeksforGeeks Section
        try {
            // Fetches all from API
            const mappedContests = await gfgContests.geeksforgeeks_c();
            // Insert into DB
            await Contest.insertMany(mappedContests, { ordered: false }); 
            console.log("GFG contests added:", mappedContests);
        } catch (err) {
            // If Contest already present
            if (err.code === 11000)
                console.log("Some Duplicate(s) in GFG");
            else console.log("Error:", err);
        }

        //* Codeforces Section
        try {
            // Fetches all from API
            const mappedContests = await codeforcesContests.codeforces_c();
            // Insert into DB
            await Contest.insertMany(mappedContests, { ordered: false }); 
            console.log("Codeforces contests added:", mappedContests);
        } catch (err) {
            // If Contest already present
            if (err.code === 11000)
                console.log("Some Duplicate(s) in Codeforces");
            else console.log("Error:", err);
        }

        //* CodeChef Section
        try {
            // Fetches all from API
            const mappedContests = await codechefContests.codechef_c();
            // Insert into DB
            await Contest.insertMany(mappedContests, { ordered: false }); 
            console.log("CodeChef contests added:", mappedContests);
        } catch (err) {
            // If Contest already present
            if (err.code === 11000)
                console.log("Some Duplicate(s) in CodeChef");
            else console.log("Error:", err);
        }

        //* All Functions Synced.
        console.log("All Contests Synced.");
    } catch (error) {
        console.log("Error fetching or syncing contests:", error);
    }
}

// Fetch and sync contests on startup
syncContests();

// Schedule periodic sync every 1 hour
setInterval(syncContests, 60 * 60 * 1000);
