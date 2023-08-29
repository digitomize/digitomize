const express = require("express");
const cors = require('cors');
require('dotenv').config();
const mongoose = require("mongoose");
const dataSyncer = require("./contest/controllers/DataSyncController");
const contestSyncer = require("./contest/controllers/contestController");
const contestRouter = require("./contest/routes/contestRoutes");
const fetchContestsData = require('./fetchContests');
const bodyParser = require('body-parser');
const userRoutes = require('./users/routes/userRoutes');
const admin = require('firebase-admin');

const serviceAccount = require('./firebase-config.json');

//* Check for ENV file
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


//* Function to start server with MongoDB and UpcomingContest list.
async function startServer() {
    try {
        const app = express();

        app.use(cors());

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });

        //* Connects MongoDB
        await mongoose.connect(process.env.MONGODB_URL)
            .then(() => console.log("MongoDB Connected."))
            .catch((err) => console.log("Error:", err));

        //* Adds data from MongoDB to upcomingcontestlist variable
        await contestSyncer.updateContests();
        setInterval(contestSyncer.updateContests, 60 * 60 * 1000);

        //* Fetches data from APIs to MongoDB
        await dataSyncer.syncContests();
        setInterval(dataSyncer.syncContests, 90 * 60 * 1000);

        //Pinging the server every 14min
        // await main();
        setInterval(async () => {
            try {
                main();
                console.log('<=======Sent GET request to AWAKE');
            } catch (error) {
                console.error('Error Pinging', error);
            }
        }, 14 * 60 * 1000);


        // app.use(cookieParser());
        app.use(bodyParser.json());
        // app.use('/auth', authRoutes);
        app.use('/user', userRoutes);
        //* GET route for contests
        app.use("/api/contests", contestRouter);

        //* PORT for server
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`<--- Server listening on port ${port} --->`);
        });

    }
    catch (err) {
        console.log("Error starting server:", err);
    }
}

startServer();