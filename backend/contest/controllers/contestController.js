// ? MongoDB to our API

import { UpcomingContest, AllContest } from "../models/Contest.js";

let upcomingContestList = []; // Variable to store contests in memory

//* Function to fetch contests from MongoDB and update the upcomingContestList variable
async function updateContests() {
  try {
    console.log("┌──────────────────────────────────┐");
    console.log("│ Retrieving Data | MongoDB to App".padEnd(35) + "│");
    console.log("└──────────────────────────────────┘");

    // Fetch contests from MongoDB (without id, createdAt and updatedAt)
    const fetchedContests = await UpcomingContest.find().select(
      `-_id -createdAt -updatedAt -__v`,
    );

    // Sorting contests
    fetchedContests.sort((a, b) => a.startTimeUnix - b.startTimeUnix);

    // Update the upcomingContestList variable
    upcomingContestList = fetchedContests;

    console.log("===============================================");
    console.log("Contests variable updated successfully. | MongoDb to App");
    console.log("===============================================");
  } catch (error) {
    console.error("Error fetching contests:", error);
  }
}

//* Function to return upcomingContestList
async function getContestList() {
  return await upcomingContestList;
}

const getContestByVanity = async (vanity) => {
  try {
    // First, check the upcomingContestList in memory
    const contestInMemory = upcomingContestList.find(
      (contest) => contest.vanity === vanity,
    );
    if (contestInMemory) {
      return contestInMemory;
    }

    // If not found in memory, query MongoDB
    const contestFromDB = await AllContest.findOne({ vanity: vanity });
    if (contestFromDB) {
      // Add the contest to memory for future access
      // upcomingContestList.push(contestFromDB);
      return contestFromDB;
    }

    return null; // Contest not found
  } catch (error) {
    throw error;
  }
};

export default {
  getContestList,
  updateContests,
  getContestByVanity,
};
