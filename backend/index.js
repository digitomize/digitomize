const express = require("express");
require('dotenv').config();
console.log(process.env.TEST);
// const bodyParser = require("body-parser");
const dataSyncer  = require("./controllers/contest/DataSyncController");
const contestRouter = require("./routes/contest/contestRoutes");

dataSyncer.syncContests();

setInterval(dataSyncer.syncContests, 60 * 60 * 1000);

const app = express();



// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());


// Function to start the server
async function startServer() {
  try {
    // Call the syncContests function and wait for it to finish
    await dataSyncer.syncContests();

    // Your other routes and app configurations go here...

    app.get("/", contestRouter);
    // Start the server
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
}

// Call the function to start the server
startServer();