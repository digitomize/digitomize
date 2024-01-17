import { getUser } from "../services/getUser.js";
import { svgCard } from "../utils/svgCard.js";

const generateSVG = async (req, res) => {
  try {
    const user = await getUser(req.params.username);

    const queries = req.query;
    const platforms = ["leetcode", "codechef", "codeforces"];
    // console.log(queries);
    let toReturn = [];
    if (typeof queries === "object" && queries !== null) {
      const keys = Object.keys(queries);
      // console.log(keys)
      keys.forEach((e) => {
        if (
          platforms.includes(e) &&
          (queries[e] === "1" || queries[e].includes("1"))
        )
          toReturn.push(e);
      });
    }

    let cards = `<svg width="100%" height="100%" version="1.1"
    xmlns="http://www.w3.org/2000/svg">`;
    try {
      let width = 100 / toReturn.length,
        height = "100%",
        x = 0;
      toReturn.forEach((e, i) => {
        let data = user[e];
        // console.log(data);
        if (data.username && data.rating) {
          let card = ``;
          if (e === "leetcode") {
            card += svgCard(data, width + "%", height, x + "%", e);
          }
          if (e === "codechef") {
            card += svgCard(data, width + "%", height, x + "%", e);
          }
          if (e === "codeforces") {
            card += svgCard(data, width + "%", height, x + "%", e);
          }
          cards += `${card}`;
          x += 100 / toReturn.length;
        }
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
        message: "Error creating user card",
        error: "Error creating user card",
      });
      return;
    }
    cards += `</svg>`;
    res.set("Content-Type", "image/svg+xml");
    res.status(200).end(cards);
  } catch (error) {
    console.error("Error fetching user profile:", error.message);
    res.status(500).json({
      message: `Error fetching user profile: ${error.message}`,
      error: "Error fetching user profile",
    });
  }
};

export { generateSVG };
