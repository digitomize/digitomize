const mongoose = require('mongoose');

//* Contest Schema
const contestSchema = new mongoose.Schema({
    host: {
        type: String,
        lowercase: true,
        required: [true, "Host is required."],
    },
    name: {
        type: String,
        required: [true, "Name is required."],
    },
    vanity: {
        type: String,
        required: [true, "Vanity is required."],
        lowercase: true,
    },
    url: {
        type: String,
        required: [true, "URL is required."],
        unique: true,
    },
    startTimeUnix: {
        type: Number,
        required: [true, "Start time is required."],
    },
    duration: {
        type: Number,
        required: [true, "Duration is required in min."],
    },
}, { timestamps: true });

const UpcomingContest = mongoose.model('UpcomingContest', contestSchema, 'upcomingcontests');
const AllContest = mongoose.model('AllContest', contestSchema, 'allcontests');

module.exports = {
  UpcomingContest,
  AllContest,
};