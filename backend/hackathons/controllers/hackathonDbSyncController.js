// ? MongoDB to our API

import { UpcomingHackathon, AllHackathon } from "../models/Hackathon.js";

let upcomingHackathonsList = []; // Variable to store hackathons in memory

//* Function to fetch hackathons from MongoDB and update the upcomingHackathonsList variable
async function updateHackathons () {
  try {
    console.log("┌──────────────────────────────────┐");
    console.log("│ Retrieving Data | MongoDB to App".padEnd(35) + "│");
    console.log("└──────────────────────────────────┘");

    // Fetch hackathons from MongoDB (without id, createdAt and updatedAt)
    const fetchedHackathons = await UpcomingHackathon.find().select(
      "-_id -createdAt -updatedAt -__v",
    );

    // Sorting hackathons
    fetchedHackathons.sort((a, b) => a.registerationStartTimeUnix - b.registerationStartTimeUnix);

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
async function getUpcomingHackathonsList () {
  return upcomingHackathonsList;
}

export default {
  getUpcomingHackathonsList,
  updateHackathons,
};
