// ? MongoDB to our API

const { UpcomingContest, AllContest } = require('../../models/contest/Contest');

let upcomingContestList = []; // Variable to store contests in memory

//* Function to fetch contests from MongoDB and update the upcomingContestList variable
async function updateContests() {
    try {
        console.log("===============================================");
        console.log("Retrieving Data | MongoDB to App");
        console.log("===============================================");
        // Fetch contests from MongoDB (without id, createdAt and updatedAt)
        const fetchedContests = await UpcomingContest.find().select(`-_id -createdAt -updatedAt -__v`);

        // Sorting contests
        fetchedContests.sort((a, b) => a.startTimeUnix - b.startTimeUnix);

        // Update the upcomingContestList variable
        upcomingContestList = fetchedContests;

        console.log("===============================================");
        console.log('Contests variable updated successfully. | MongoDb to App');
        console.log("===============================================");
    } catch (error) {
        console.error('Error fetching contests:', error);
    }
}

//* Function to return upcomingContestList
async function getContestList() {
    return await upcomingContestList;
}

const getContestByVanity = async (vanity) => {
    try {
        // First, check the upcomingContestList in memory
        const contestInMemory = upcomingContestList.find(contest => contest.vanity === vanity);
        if (contestInMemory) {
            return contestInMemory;
        }

        // If not found in memory, query MongoDB
        const contestFromDB = await AllContest.findOne({ vanity: vanity });
        if (contestFromDB) {
            // Add the contest to memory for future access
            // upcomingContestList.push(contestFromDB);
            return contestFromDB;
        }

        return null; // Contest not found
    } catch (error) {
        throw error;
    }
};
const handleContestRoute = async (req, res) => {
    try {
        let host = req.query.host;
        let vanity = req.query.vanity;

        if (host) {
            host = host.toLowerCase();
        }

        if (vanity) {
            vanity = vanity.toLowerCase();
        }

        const platformArray = host ? host.split(",") : [];
        const vanityArray = vanity ? vanity.split(",") : [];

        const contests = await getContestList();

        if (vanity) {
            const contestByVanity = await getContestByVanity(vanity);
            if (contestByVanity) {
                res.json({
                    total: 1,
                    results: [contestByVanity]
                });
            } else {
                res.json({
                    total: 0,
                    results: []
                });
            }
        } else if (host) {
            const filteredContests = contests.filter((contest) => {
                return platformArray.includes(contest.host);
            });

            res.json({
                total: filteredContests.length,
                results: filteredContests
            });
        } else {
            res.json({
                total: contests.length,
                results: contests
            });
        }
    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    getContestList,
    updateContests,
    getContestByVanity,
    handleContestRoute
};