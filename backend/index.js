import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import dataSyncer from "./contest/controllers/DataSyncController.js";
import contestSyncer from "./contest/controllers/contestController.js";
import contestRoutes from "./contest/routes/contestRoutes.js";
import communityRoutes from "./community/routes/communityRoutes.js";
import userRoutes from "./users/routes/userRoutes.js";
import adminRoutes from "./users/routes/adminRoutes.js";
import bodyParser from "body-parser";
import fetchContestsData from "./fetchContests.js";
import admin from "firebase-admin";
import { routeLogging } from "./users/middlewares/authMiddleware.js";
import sheetRoutes from "./DSA_sheets/routes/sheetRoutes.js";
import questionRoutes from "./DSA_sheets/routes/questionRoutes.js";

dotenv.config();
const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(routeLogging);
}

// Handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down due to uncaught exception");
  process.exit(1);
});

console.log(process.env.TEST);
async function main () {
  try {
    console.log("Pinging...");
    await fetchContestsData();
    console.log("Pong!");
  } catch (error) {
    console.error("Error pinging the server:", error);
  }
}

async function setupUserServer () {
  // console.log(process.env.FIREBASE_CREDENTIALS);
  console.log("ok");
  // Get the Firebase service account JSON from the environment variable
  const firebaseCredentials = JSON.parse(process.env.FIREBASE_CREDENTIALS);
  // console.log(firebaseCredentials);

  admin.initializeApp({
    credential: admin.credential.cert(firebaseCredentials),
  });
  // Set up user routes
  app.use("/user", userRoutes);
  app.use("/admin", adminRoutes);
  app.use("/sheets", sheetRoutes);
  app.use("/questions", questionRoutes);
}

async function setupContestServer () {
  await dataSyncer.syncContests();
  setInterval(dataSyncer.syncContests, 90 * 60 * 1000);

  // Update contests data and sync contests data at regular intervals
  await contestSyncer.updateContests();
  setInterval(contestSyncer.updateContests, 60 * 60 * 1000);

  // Pinging the server every 13 minutes
  setInterval(
    async () => {
      try {
        await main();
        console.log("<=======Sent GET request to AWAKE");
      } catch (error) {
        console.error("Error Pinging", error);
      }
    },
    13 * 60 * 1000,
  );

  // Set up contest routes
  app.use("/contests", contestRoutes);
}

async function setupCommunityServer () {
  app.use("/community", communityRoutes);
}

async function startServersProduction () {
  try {
    app.use(cors());
    app.use(bodyParser.json());

    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB Connected.");

    await setupUserServer();
    await setupContestServer();

    // Handle unhandled routes
    app.all("*", (req, res, next) => {
      res.status(404).json({ error: `${req.originalUrl} route not found` });
    });

    const servers = [];
    servers.push("User");
    servers.push("Contest");

    console.log("┌──────────────────────────────────┐");
    if (servers.length > 0) {
      for (const server of servers) {
        console.log("│ Server active:", server.padEnd(18) + "│");
      }
      console.log("├──────────────────────────────────┤");
    }
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`│ Server listening on port ${port}`.padEnd(35) + "│");
      console.log("└──────────────────────────────────┘");
    });
  } catch (err) {
    console.log("Error starting servers:", err);
  }
}
async function startServersDev () {
  try {
    app.use(cors());
    app.use(bodyParser.json());

    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB Connected.");
    const servers = [];
    if (process.env.USERS === "true") {
      await setupUserServer();
      servers.push("User");
      await setupCommunityServer();
      servers.push("Community");
    }
    if (process.env.CONTESTS === "true") {
      await setupContestServer();
      servers.push("Contest");
    }

    // Handle unhandled routes
    app.all("*", (req, res, next) => {
      res.status(404).json({ error: `${req.originalUrl} route not found` });
    });

    console.log("┌──────────────────────────────────┐");
    if (servers.length > 0) {
      for (const server of servers) {
        console.log("│ Server active:", server.padEnd(18) + "│");
      }
      console.log("├──────────────────────────────────┤");
    }
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`│ Server listening on port ${port}`.padEnd(35) + "│");
      console.log("└──────────────────────────────────┘");
    });
  } catch (err) {
    console.log("Error starting servers:", err);
  }
}

if (process.env.NODE_ENV === "development") {
  startServersDev();
} else if (process.env.NODE_ENV === "production") {
  startServersProduction();
} else {
  console.log("Error: NODE_ENV not set.");
}

// Handling unhandled server errors
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to Unhandled promise rejection");

  server.close(() => {
    process.exit(1);
  });
});
