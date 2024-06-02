import express from "express";
import axios from "axios";
import cron from "node-cron";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const GITHUB_API_URL = process.env.GITHUB_API_URL;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const ALL_CONTRIBUTORS_FILE_PATH = ".all-contributorsrc";

let cachedContributorStats = null;
let lastUpdated = 0;

export const fetchAllContributorsFile = async () => {
  try {
    const url = `${GITHUB_API_URL}/contents/${ALL_CONTRIBUTORS_FILE_PATH}`;
    const headers = {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3.raw",
    };

    const response = await axios.get(url, { headers });
    const contributorsData = response.data;

    const contributorsJson = JSON.parse(contributorsData);
    const contributors = contributorsJson.contributors;

    // Update the cached stats
    cachedContributorStats = contributors;
    lastUpdated = Date.now();
  } catch (error) {
    console.error("Error fetching .all-contributorsrc from GitHub:", error.message);
    if (error.response && error.response.status === 403) {
      console.error("GitHub API rate limit exceeded");
    }
  }
};

// Schedule to update contributor stats every 12 hours
cron.schedule("0 */12 * * *", fetchAllContributorsFile);

// Fetch initial stats
fetchAllContributorsFile();

router.get("/stats", (req, res) => {
  if (cachedContributorStats && (Date.now() - lastUpdated) < 12 * 60 * 60 * 1000) {
    return res.json(cachedContributorStats);
});
