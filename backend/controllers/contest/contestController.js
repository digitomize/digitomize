// ? MongoDB to our API

const { UpcomingContest } = require('../../models/contest/Contest');

let contestlist = []; // Variable to store contests in memory

// Function to fetch contests from MongoDB and update the contests variable
async function updateContests() {
    try {
        // Fetch contests from MongoDB
        const fetchedContests = await UpcomingContest.find().select(`-_id -createdAt -updatedAt -__v`);

        // Update the contests variable
        contestlist = fetchedContests;
        console.log("INSIDE FUNCTION:",fetchedContests);

        console.log('Contests variable updated successfully.');
    } catch (error) {
        console.error('Error fetching contests:', error);
    }
}

// updateContests();
// (async () => {
//     await updateContests();
//     console.log("1");

//     // Start the interval after the initial update
//     setInterval(updateContests, 2 * 60 * 60 * 1000);
// })();

async function getContestList() {
    return await contestlist;
}


module.exports = {
    getContestList,
    updateContests, // Export the contests variable
};