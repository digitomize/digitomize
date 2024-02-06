import { Router } from "express";
import hackathonController from "../controllers/hackathonDbSyncController.js";

const router = Router();

// GET route for hackathons
router.get("/", async (req, res) => {
  try {
    const hackathons = await hackathonController.getUpcomingHackathonsList();

    res.status(200).json({
        total: hackathons.length,
        results: hackathons,
    });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({
      error: "Internal server error",
      message: "Internal server error",
    });
  }
});

export default router;