const express = require("express");
const cors = require('cors');
require('dotenv').config();
const mongoose = require("mongoose");
const dataSyncer = require("./contest/controllers/DataSyncController");
const contestSyncer = require("./contest/controllers/contestController");
const contestRouter = require("./contest/routes/contestRoutes");
const userRoutes = require('./users/routes/userRoutes');
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
    const admin = require('firebase-admin');

    const serviceAccount = require('./firebase-config.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
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
        const servers = [];
        servers.push("User");
        servers.push("Contest");

        console.log("┌──────────────────────────────────┐");
        if (servers.length > 0) {
            for (const server of servers) {
                console.log("│ Server active:", server.padEnd(18) + "│");
            }
            console.log("├──────────────────────────────────┤");
        }
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`│ Server listening on port ${port}`.padEnd(35) + "│");
            console.log("└──────────────────────────────────┘");
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
        const servers = [];
        if (process.env.USERS === 'true') {
            await setupUserServer();
            servers.push("User");
        }
        if (process.env.CONTESTS === 'true') {
            await setupContestServer();
            servers.push("Contest");
        }

        console.log("┌──────────────────────────────────┐");
        if (servers.length > 0) {
            for (const server of servers) {
                console.log("│ Server active:", server.padEnd(18) + "│");
            }
            console.log("├──────────────────────────────────┤");
        }
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`│ Server listening on port ${port}`.padEnd(35) + "│");
            console.log("└──────────────────────────────────┘");
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