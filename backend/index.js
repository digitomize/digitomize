const express = require("express");
const cors = require('cors');
require('dotenv').config();
const mongoose = require("mongoose");
const dataSyncer = require("./contest/controllers/DataSyncController");
const contestSyncer = require("./contest/controllers/contestController");
const contestRouter = require("./contest/routes/contestRoutes");
const userRoutes = require('./users/routes/userRoutes');
const bodyParser = require('body-parser');

const app = express();

console.log(process.env.TEST);
async function main() {
    try {
        console.log('Pinging...');
        // Your pinging logic here
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

    await dataSyncer.syncContests();
    setInterval(dataSyncer.syncContests, 90 * 60 * 1000);


    // Update contests data and sync contests data at regular intervals
    await contestSyncer.updateContests();
    setInterval(contestSyncer.updateContests, 60 * 60 * 1000);

    // Pinging the server every 14 minutes
    setInterval(async () => {
        try {
            await main();
            console.log('<=======Sent GET request to AWAKE');
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
            console.log(`<--- User server listening on port ${port} --->`);
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
        

        if (process.env.USER === 'true') {
            await setupUserServer();
        }
        if (process.env.CONTEST === 'true') {
            await setupContestServer();
        }

        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`<--- User server listening on port ${port} --->`);
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