import https from "https";
import dotenv from "dotenv";
dotenv.config();
async function fetchContestsData() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: process.env.BACKEND_URL,
      path: "/contests",
      method: "GET",
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        //   console.log("Req Sent to Server")
        resolve(data);
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.end();
  });
}

export default fetchContestsData;
