import mongoose from "mongoose";

//* Contest Schema
const hackathonSchema = new mongoose.Schema(
  {
    host:{
      type:String,
      required: [true, "host is required"],
    },
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

const UpcomingHackathon = mongoose.model("UpcomingHackathon", hackathonSchema, "upcominghackathons");
const AllHackathon = mongoose.model("AllHackathon", hackathonSchema, "allhackathons");

export { UpcomingHackathon, AllHackathon };