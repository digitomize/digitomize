const express = require('express');
const router = express.Router();
const contestController = require("../../controllers/contest/contestController");

// console.log(contestController.getContestList());

router.get("/", async (req, res) => {
    try {
        const contests = await contestController.getContestList();
        const totalContests = contests.length;

        // Create the response object with total and results fields
        const response = {
            total: totalContests,
            results: contests
        };

        res.json(response);
    } catch (err) {
        console.log("Error:", err);
    }
});


module.exports = router;

