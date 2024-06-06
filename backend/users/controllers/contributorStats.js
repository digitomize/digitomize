import express from "express";
import axios from "axios";
import cron from "node-cron";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

const router = express.Router();

const GITHUB_API_URL = process.env.GITHUB_API_URL;
const CONTRIBUTORS_FILE_PATH = ".all-contributorsrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMP_FILE_PATH = path.join(__dirname, "contributorsData.json");

// Function to fetch contributors data from GitHub
export const fetchContributorsData = async () => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/contents/${CONTRIBUTORS_FILE_PATH}`, {
      headers: {
        Accept: "application/vnd.github.v3.raw",
      },
    });
    const contributorsData = JSON.parse(response.data);
    if (!fs.existsSync(TEMP_FILE_PATH) || fs.readFileSync(TEMP_FILE_PATH, 'utf-8') !== JSON.stringify({contributors: contributorsData, lastUpdated: new Date()}, null, 2)) {
      fs.writeFileSync(TEMP_FILE_PATH, JSON.stringify({
        contributors: contributorsData,
        lastUpdated: new Date(),
      }, null, 2));
    }
    console.log("Contributors data updated at:", new Date());
  } catch (error) {
    if (error.response && error.response.status === 403) {
      console.error("GitHub API rate limit exceeded:", error.response.data);
    } else {
      console.error("Error fetching contributors data:", error.message);
    }
  }
};

// Schedule the task to run every 12 hours
cron.schedule("0 */12 * * *", fetchContributorsData);

// Initial fetch of the data
fetchContributorsData();

// Route to get contributors stats
import rateLimit from 'express-rate-limit';

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});

router.get("/stats", apiLimiter, (req, res) => {
  if (!fs.existsSync(TEMP_FILE_PATH)) {
    return res.status(503).json({ message: "Service unavailable. Please try again later." });
  }
  const data = JSON.parse(fs.readFileSync(TEMP_FILE_PATH, "utf-8"));
  return res.status(200).json(data);
});

export default router;
