import { Router } from "express";
import hackathonController from "../controllers/hackathonDbSyncController.js";

const router = Router();

// GET route for hackathons
router.get("/", async (req, res) => {
  try {
    let vanity = req.query.vanity;

    if (vanity) {
      vanity = vanity.toLowerCase();
    }

    const hackathons = await hackathonController.getUpcomingHackathonsList();

    if (vanity) {
      const hackathonByVanity = await hackathonController.getHackathonByVanity(vanity);
      if (hackathonByVanity) {
        res.status(200).json({
          total: 1,
          results: [hackathonByVanity],
        });
      } else {
        res.status(200).json({
          total: 0,
          results: [],
        });
      }
    } else {
      res.status(200).json({
        total: hackathons.length,
        results: hackathons,
      });
    }
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({
      error: "Internal server error",
      message: "Internal server error",
    });
  }
});

export default router;