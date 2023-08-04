// ? MongoDB to our API

const { UpcomingContest } = require('../../models/contest/Contest');

let contestlist = []; // Variable to store contests in memory

//* Function to fetch contests from MongoDB and update the contestlist variable
async function updateContests() {
    try {
        // Fetch contests from MongoDB (without id, createdAt and updatedAt)
        const fetchedContests = await UpcomingContest.find().select(`-_id -createdAt -updatedAt -__v`);

        // Update the contestlist variable
        contestlist = fetchedContests;

        console.log('Contests variable updated successfully.');
    } catch (error) {
        console.error('Error fetching contests:', error);
    }
}

//* Function to return contestlist
async function getContestList() {
    return await contestlist;
}

module.exports = {
    getContestList,
    updateContests,
};