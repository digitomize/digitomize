// ? APIs to MongoDB

import dotenv from "dotenv";
import { UpcomingHackathon, AllHackathon } from "../models/Hackathon.js";
import devfolioHackathons from "./platforms/devfolioController.js";
import devpostHackathons from "./platforms/devpostController.js";
import unstopHackathons from "./platforms/unstopController.js";

dotenv.config({ path: "../../.env" });

//* Clear the UpcomingHackathon collection in MongoDB
async function clearUpcoming() {
  try {
    const currentTime = Math.floor(Date.now() / 1000);
    await UpcomingHackathon.deleteMany({
      registerationEndTimeUnix: { $lt: currentTime },
    });
    console.log("Deleted the hackathons whose registerations have closed.");
  } catch (err) {
    console.log(
      "Error while deleting the hackathons whose registerations have closed:",
      err,
    );
  }
}

//* Add Hackathons to the DB,
async function addToDB(hackathons, platform) {
  try {
    // Sorting contests
    hackathons.sort(
      (a, b) => a.registerationStartTimeUnix - b.registerationStartTimeUnix,
    );

    try {
      // Add to UpcomingHackathon collection
      await UpcomingHackathon.insertMany(hackathons, { ordered: false });
      console.log(`│ Updated hackathons for ${platform}`.padEnd(53) + "│");
    } catch (upcomingErr) {
      if (upcomingErr.code === 11000) {
        console.log(
          `│ Some duplicate(s) in UpcomingHackathon for ${platform}`.padEnd(
            53,
          ) + "│",
        );
      } else {
        throw upcomingErr;
      }
    }

    try {
      // Update AllHackathon collection
      await AllHackathon.insertMany(hackathons, { ordered: false });
      console.log(`│ Updated AllHackathons for ${platform}`.padEnd(53) + "│");
    } catch (allErr) {
      if (allErr.code === 11000) {
        console.log(
          `│ Some duplicate(s) in AllHackathon for ${platform}`.padEnd(53) +
            "│",
        );
      } else {
        throw allErr;
      }
    }
  } catch (err) {
    console.log(`Error adding hackathons to MongoDB for ${platform}`, err);
  }
}

async function syncHackathons() {
  try {
    console.log("===============================================");
    console.log("Syncing Data | API to MongoDB");
    console.log("===============================================");

    //* Clearing the UpcomingHackathon collection
    await clearUpcoming();

    console.log("┌────────────────────Devfolio────────────────────┐");
    const devfolioData = await devfolioHackathons.devfolio_c();
    await addToDB(devfolioData, "Devfolio");

    console.log("┌────────────────────Devpost────────────────────┐");
    const devpostData = await devpostHackathons.devpost_c();
    await addToDB(devpostData, "Devpost");

    console.log("┌────────────────────Unstop────────────────────┐");
    const unstopData = await unstopHackathons.unstop_c();
    await addToDB(unstopData, "Unstop");

    //* All Functions Synced.
    console.log("===============================================");
    console.log("All Hackathons Synced. | API to MongoDB");
    console.log("===============================================");
  } catch (error) {
    console.log("Error fetching or syncing hackathons:", error);
  }
}

export default {
  syncHackathons,
};
