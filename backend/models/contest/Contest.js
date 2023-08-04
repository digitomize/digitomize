const mongoose = require('mongoose');

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

// const Contest = mongoose.model('Contest', contestSchema);
const UpcomingContest = mongoose.model('UpcomingContest', contestSchema);
const AllContest = mongoose.model('AllContest', contestSchema);

// module.exports = Contest;

module.exports = {
  UpcomingContest,
  AllContest,
};