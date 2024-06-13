import { AllChallenge } from "../models/challenge.js";
import dotenv from "dotenv";
import { quineQuest_c } from "./platforms/quinequestController.js";

dotenv.config({ path: "../../.env" });

async function clearCompletedChallenge () {
  try {
    const currentTime = Math.floor(Date.now() / 1000);
    await AllChallenge.deleteMany({ endTimeUnix: { $lt: currentTime } });
    console.log("Deleted challenges which have end time before now.");
  } catch (err) {
    console.log(`Error while deleting completed challenges before ${currentTime}:`, err);
  }
}

async function addToDB (challenges) {
  try {
    await AllChallenge.insertMany(challenges, { ordered: false });
    console.log("Challenges added to MongoDB");
  } catch (err) {
    if (err.code === 11000) {
      console.log("│ Some duplicate(s) in AllChallenge for Quine".padEnd(53) + "│");
    } else {
      console.log("Error adding challenges to MongoDB:", err);
    }
  }
}

async function syncChallenges () {
  try {
    console.log("===============================================");
    console.log("Syncing Data | API to MongoDB");
    console.log("===============================================");

    await clearCompletedChallenge();

    const challenges = [];

    console.log("┌───────────────────────Quine────────────────────────┐");
    challenges.push(await quineQuest_c());
    await addToDB(challenges);
    console.log("└────────────────────────────────────────────────────┘");
  } catch (err) {
    console.log("Error occurred during challenge synchronization:", err);
  }
}

export { syncChallenges };
