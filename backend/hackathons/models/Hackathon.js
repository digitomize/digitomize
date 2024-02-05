import mongoose from "mongoose";

//* Contest Schema
const hackathonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    url: {
      type: String,
      required: [true, "URL is required."],
      unique: true,
    },
    registerationStartTimeUnix: {
      type: Number,
      required: [true, "Registeration Start time is required."],
    },
    registerationEndTimeUnix: {
      type: Number,
      required: [true, "Registeration End time is required."],
    },
    hackathonStartTimeUnix: {
      type: Number,
      required: [true, "Start time is required."],
    },
    duration: {
      type: Number,
      required: [true, "Duration is required in min."],
    },
  },
  { timestamps: true },
);

const AllHackathon = mongoose.model("AllHackathon", hackathonSchema, "allhackathons");

export { AllHackathon };