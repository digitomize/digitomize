const express = require("express");
require('dotenv').config();
console.log(process.env.TEST);
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
const dataSyncer = require("./controllers/contest/DataSyncController");
const contestSyncer = require("./controllers/contest/contestController");
const contestRouter = require("./routes/contest/contestRoutes");


// const app = express();

// Connected



// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());

// setInterval(syncContests, 60 * 60 * 1000);

// async function syncData() {
//     await dataSyncer.syncContests();
//     console.log("Syncing done.");
// }

// syncData();
// Function to start the server
// async function startServe() {
//     try {
//         // Call the syncContests function and wait for it to finish
//         //   await dataSyncer.syncContests();
//         //   console.log("Syncing done.");
//         // Your other routes and app configurations go here...


//         // Start the server
//         const PORT = process.env.PORT;
//         app.listen(PORT, () => {
//             console.log(`Server running on http://localhost:${PORT}`);
//         });
//     } catch (error) {
//         console.error('Error starting the server:', error);
//     }
// }

// Call the function to start the server




async function startServer() {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
            .then(() => console.log("MongoDB Connected."))
            .catch((err) => console.log("Error:", err));

        await dataSyncer.syncContests();
        setInterval(dataSyncer.syncContests, 60 * 60 * 1000);

        const app = express();

        await contestSyncer.updateContests();
        setInterval(contestSyncer.updateContests, 60 * 60 * 1000);

        app.get("/", contestRouter);
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });

    }
    catch (err) {
        console.log("Error starting server:", err);
    }
}

startServer();