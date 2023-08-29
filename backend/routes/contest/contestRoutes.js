const express = require('express');
const router = express.Router();
const contestController = require("../../controllers/contest/contestController");

// GET route for contests
router.get("/", contestController.handleContestRoute);

module.exports = router;
