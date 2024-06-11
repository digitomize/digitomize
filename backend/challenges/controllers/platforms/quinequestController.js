import axios from "axios";

async function quineQuest_c () {
  // this data is needed for the PUT request ,it can be random
  const data = {
    user_id: "100",
    page: "1",
  };
  try {
    const response = await axios.put("https://cosmos.quine.sh/api/cosmos/creators/quest/", data);
    const challengeData = response.data;
    const startUnix = Math.floor(new Date(challengeData.creator_quest_started_at).getTime() / 1000);
    const endTime = Math.floor(new Date(challengeData.creator_quest_ends_at).getTime() / 1000);
    const formattedChallenge = {
      host: "quine",
      name: challengeData.creator_quest_name,
      vanity: challengeData.creator_quest_id,
      url: "https://quine.sh/quests/creator/submissions",
      description: challengeData.creator_quest_short_description,
      startTimeUnix: startUnix,
      endTimeUnix: endTime,
    };
    return formattedChallenge;
  } catch (error) {
    console.error("Failed to fetch data from Quine Quest:", error.response || error.message);
    return null;
  }
}

export { quineQuest_c };
