import { getUser } from "../services/getUser.js";

const generateSVG = async (req, res) => {
  try {
    const user = await getUser(req.params.username);
    console.log(user);

    const queries = req.query;
    // console.log(queries);
    const platforms = ["leetcode", "codechef", "codeforces"];
    let toReturn = [];
    for (const e in queries)
      if (platforms.includes(e) && queries[e] === "1") toReturn.push(e);

    console.log(toReturn);
    let cards = ``

    try {
      toReturn.forEach((e) => {
        let data = user[e];
        let card = "lets see";
        cards += `${card}`;
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
        message: "Error creating user card",
        error: "Error creating user card",
      });
    }
    res.status(200).end(cards);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Error fetching user profile",
      error: "Error fetching user profile",
    });
  }
};

export { generateSVG };
