import { Router } from "express";

import { getChallengeList } from "../controllers/challengeController.js";
const router = Router();

// GET route for challenges
router.get("/", async (req, res) => {
  try {
    const challenges = await getChallengeList();
    res.status(200).json({
      total: challenges.length,
      results: challenges,
    });
  } catch (err) {
    console.error("Error fetching challenges:", err.message);
    res.status(500).json({
      error: "Internal server error",
      message: "Internal server error",
    });
  }
});

export default router;
