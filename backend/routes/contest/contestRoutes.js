const express = require('express');
const router = express.Router();
const contestController = require("../../controllers/contest/contestController");

// GET route for contests
router.get("/", async (req, res) => {
    try {
        const host = req.query.host; // Get the 'host' query parameter
        const vanity = req.query.vanity; // Get the 'vanity' query parameter

        // Convert 'host' and 'vanity' to arrays
        const platformArray = host ? host.split(",") : [];
        const vanityArray = vanity ? vanity.split(",") : [];

        const contests = await contestController.getContestList();

        // Check if there are any query parameters
        if (host || vanity) {
            // If there are query parameters, filter the contests
            const filteredContests = contests.filter((contest) => {
                // Check if the contest 'host' OR 'vanity' matches the provided parameters
                return (
                    platformArray.includes(contest.host) ||
                    vanityArray.includes(contest.vanity)
                );
            });

            const totalContests = filteredContests.length;

            // Create the response object with total and results fields
            const response = {
                total: totalContests,
                results: filteredContests
            };
            res.json(response);
        } else {
            // If no query parameters are provided, return all contests
            res.json({
                total: contests.length,
                results: contests
            });
        }
    } catch (err) {
        console.log("Error:", err);
    }
});

module.exports = router;
