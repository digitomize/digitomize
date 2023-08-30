const express = require("express");
const cors = require('cors');
require('dotenv').config();
const mongoose = require("mongoose");
const dataSyncer = require("./controllers/contest/DataSyncController");
const contestSyncer = require("./controllers/contest/contestController");
const contestRouter = require("./routes/contest/contestRoutes");
const userRoutes = require('./routes/user/userRoutes');
const bodyParser = require('body-parser');
const fetchContestsData = require('./fetchContests');

const app = express();

console.log(process.env.TEST);
async function main() {
    try {
        console.log('Pinging...');
        const contestsData = await fetchContestsData();
        console.log('Pong!');
    } catch (error) {
        console.error('Error pinging the server:', error);
    }
}

async function setupUserServer() {
    // Set up user routes
    app.use('/user', userRoutes);

}

async function setupContestServer() {

    //* Fetches data from API and stores it in mongoDB
    await dataSyncer.syncContests();
    setInterval(dataSyncer.syncContests, 12 * 60 * 60 * 1000);  // 12 hours

    //* Adds data from mongoDB to upcomingcontestslist variable
    await contestSyncer.updateContests();
    setInterval(contestSyncer.updateContests, 30 * 60 * 1000); // 30 minutes

    // Pinging the server every 14 minutes
    setInterval(async () => {
        try {
            await main();
            console.log('<======= Sent GET request to AWAKE');
        } catch (error) {
            console.error('Error Pinging', error);
        }
    }, 14 * 60 * 1000);

    // Set up contest routes
    app.use("/api/contests", contestRouter);

}

async function startServersProduction() {

    try {

        app.use(cors());
        app.use(bodyParser.json());

        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB Connected.");

        await setupUserServer();
        await setupContestServer();
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`<--- Server listening on port ${port} --->`);
        });
    } catch (err) {
        console.log("Error starting servers:", err);
    }

}
async function startServersDev() {
    try {
        app.use(cors());
        app.use(bodyParser.json());

        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB Connected.");
        

        if (process.env.USERS === 'true') {
            await setupUserServer();
        }
        if (process.env.CONTESTS === 'true') {
            await setupContestServer();
        }

        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`<--- Server listening on port ${port} --->`);
        });
    } catch (err) {
        console.log("Error starting servers:", err);
    }
}

if (process.env.NODE_ENV === 'development') {
    startServersDev();
}
else if (process.env.NODE_ENV === 'production') {
    startServersProduction();
}
else {
    console.log("Error: NODE_ENV not set.");
}
