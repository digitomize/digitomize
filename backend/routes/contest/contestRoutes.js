import express from "express";
const router = express.Router();
import contestController from "../../controllers/contest/contestController.js";

import fs  from "fs";

// Load the JSON file with motivational messages
import messages from './messages.json' assert {type: 'json'};

// GET route for sending a random message
router.get("/random-message", (req, res) => {
  // Select a random message from the array
  const randomIndex = Math.floor(Math.random() * messages.messages.length);
  const randomMessage = messages.messages[randomIndex];
  
  // Send the random message as JSON
  res.json({ message: randomMessage });
});

// GET route for contests
router.get("/", contestController.handleContestRoute);

export default router;
