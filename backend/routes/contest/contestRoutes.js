const express = require('express');
const router = express.Router();
const contestController = require("../../controllers/contest/contestController");

router.get("/", async (req, res) => {
    try {
        const host = req.query.host; // Get the host query parameter
        const platformArray = host ? host.split(",") : []; // Convert to an array

        const contests = await contestController.getContestList();
        const filteredContests = contests.filter((contest) => {
            return platformArray.length === 0 || platformArray.includes(contest.host);
        });

        const totalContests = filteredContests.length;
        console.log(req.query);

        // Create the response object with total and results fields
        const response = {
            total: totalContests,
            results: filteredContests
        };

        res.json(response);
    } catch (err) {
        console.log("Error:", err);
    }
});

module.exports = router;
