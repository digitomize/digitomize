import express from "express";
import axios from "axios";
import cron from "node-cron";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const router = express.Router();

const GITHUB_API_URL = process.env.GITHUB_API_URL;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

let cachedContributorStats = null;
let lastUpdated = 0;

const getContributorStatsFromGitHub = async () => {
  try {
    const repoUrl = `${GITHUB_API_URL}/contributors`;
    const headers = {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    };

    const response = await axios.get(repoUrl, { headers });
    const contributors = response.data;

    // Update the cached stats
    cachedContributorStats = contributors;
    lastUpdated = Date.now();
  } catch (error) {
    console.error("Error fetching contributor stats from GitHub:", error.message);
    if (error.response && error.response.status === 403) {
      console.error("Rate limit exceeded");
    }
  }
};

// Schedule to update contributor stats every 12 hours
cron.schedule("0 */12 * * *", getContributorStatsFromGitHub);

// Fetch initial stats
getContributorStatsFromGitHub();

router.get("/stats", (req, res) => {
  if (cachedContributorStats && (Date.now() - lastUpdated) < 12 * 60 * 60 * 1000) {
    return res.json(cachedContributorStats);
  } else {
    getContributorStatsFromGitHub()
      .then(() => {
        if (cachedContributorStats) {
          res.json(cachedContributorStats);
        } else {
          res.status(500).json({ message: "Error fetching contributor stats." });
        }
      })
      .catch(error => {
        console.error("Error in /stats route:", error.message);
        res.status(500).json({ message: "Internal server error" });
      });
  }
});

export default router;
