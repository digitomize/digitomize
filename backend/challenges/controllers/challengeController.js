import { AllChallenge } from "../models/challenge.js";

let allChallengeList = []; // Variable to store challenges in memory

// Function to fetch challenges from MongoDB and update the allChallengeList variable

async function updateChallenges () {
  try {
    console.log("┌──────────────────────────────────┐");
    console.log("│ Retrieving Data | MongoDB to App".padEnd(35) + "│");
    console.log("└──────────────────────────────────┘");

    // Fetch challenges from MongoDB (without id, createdAt and updatedAt)
    const fetchedChallenges = await AllChallenge.find().select(
      "-_id -createdAt -updatedAt -__v",
    );

    // Sorting challenges
    fetchedChallenges.sort((a, b) => a.startTimeUnix - b.startTimeUnix);

    // Update the allChallengeList variable
    allChallengeList = fetchedChallenges;

    console.info("Challenges updated: %d items", fetchedChallenges.length);
  } catch (error) {
    console.error("Error fetching challenges:", error);
  }
}

// Function to return allChallengeList
async function getChallengeList () {
  return await allChallengeList;
}

export { updateChallenges, getChallengeList };
