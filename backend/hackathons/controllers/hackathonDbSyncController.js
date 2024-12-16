// ? MongoDB to our API

import { UpcomingHackathon, AllHackathon } from "../models/Hackathon.js";

let upcomingHackathonsList = []; // Variable to store hackathons in memory

//* Function to fetch hackathons from MongoDB and update the upcomingHackathonsList variable
async function updateHackathons() {
  try {
    console.log("┌──────────────────────────────────┐");
    console.log("│ Retrieving Data | MongoDB to App".padEnd(35) + "│");
    console.log("└──────────────────────────────────┘");

    // Fetch hackathons from MongoDB (without id, createdAt and updatedAt)
    const fetchedHackathons = await UpcomingHackathon.find().select(
      "-_id -createdAt -updatedAt -__v",
    );

    // Sorting hackathons
    fetchedHackathons.sort(
      (a, b) => a.registerationEndTimeUnix - b.registerationEndTimeUnix,
    );

    // Update the upcomingHackathonsList variable
    upcomingHackathonsList = fetchedHackathons;

    console.log("===============================================");
    console.log("Hackathons variable updated successfully. | MongoDb to App");
    console.log("===============================================");
  } catch (error) {
    console.error("Error fetching hackathons:", error);
  }
}

//* Function to return upcomingHackathon
async function getUpcomingHackathonsList() {
  return upcomingHackathonsList;
}

const getHackathonByVanity = async(vanity) => {
  try {
    // First, check the upcomingContestList in memory
    const hackathonInMemory = upcomingHackathonsList.find(
      (contest) => contest.vanity === vanity,
    );
    if (hackathonInMemory) {
      return hackathonInMemory;
    }

    // If not found in memory, query MongoDB
    const hackathonFromDB = await AllHackathon.findOne({ vanity });
    if (hackathonFromDB) {
      return hackathonFromDB;
    }

    throw new Error("Hackathon not found");
  } catch (error) {
    console.error(error);
    return error;
  }
};

export default {
  getUpcomingHackathonsList,
  updateHackathons,
  getHackathonByVanity,
};
