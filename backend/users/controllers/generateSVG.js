import { getUser } from "../services/getUser.js";
import { leetcodeSVG } from "../utils/leetcodeSVG.js";
import { codechefSVG } from "../utils/codechefSVG.js";
import { codeforcesSVG } from "../utils/codeforcesSVG.js";

const generateSVG = async (req, res) => {
  try {
    const user = await getUser(req.params.username);
    // console.log(user);

    const queries = req.query;
    // console.log(queries);
    const platforms = ["leetcode", "codechef", "codeforces"];
    let toReturn = [];
    for (const e in queries)
      if (platforms.includes(e) && (queries[e] === "1" || queries[e].includes("1"))) toReturn.push(e);

    // console.log(toReturn);

    let cards = `<svg width="100%" height="100%" version="1.1"
    xmlns="http://www.w3.org/2000/svg">`;
      try {
        let width=100/toReturn.length, height="100%",x=0;
        toReturn.forEach((e,i) => {
          let data = user[e];
          let card = ``;
          if (e === "leetcode") {
            card += leetcodeSVG(data,width+"%",height,x+"%");
          }
          if (e === "codechef") {
            card += codechefSVG(data,width+"%",height,x+"%");
          }
          if (e === "codeforces") {
            card += codeforcesSVG(data,width+"%",height,x+"%");
          }
          cards += `${card}`;
          x += 100/toReturn.length;
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
    console.error("Error:", error);
    res.status(500).json({
      message: "Error fetching user profile",
      error: "Error fetching user profile",
    });
  }
};

const addGTag = (x) => {
  return `<g transform="translate(${x},0)">`
}

export { generateSVG };
