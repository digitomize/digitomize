const express = require('express');
const router = express.Router();
const contestController = require("../../controllers/contest/contestController");

// console.log(contestController.getContestList());

router.get("/", async (req, res) => {
    try {
        // await contestController.getContestList();
        const contests = await contestController.getContestList();
        console.log(contests);
        res.json(contests);
    }
    catch (err) {
        console.log("Error:", err);
    }
});

module.exports = router;

