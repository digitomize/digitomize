const express = require("express");
require('dotenv').config();
const mongoose = require("mongoose");
const dataSyncer = require("./controllers/contest/DataSyncController");
const contestSyncer = require("./controllers/contest/contestController");
const contestRouter = require("./routes/contest/contestRoutes");

console.log(process.env.TEST);


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

        app.use("/api/contests", contestRouter);
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