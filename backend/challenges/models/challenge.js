import mongoose from "mongoose";

// Challenge Schema

const challengeSchema = new mongoose.Schema(
  {
    host: {
      type: String,
      lowercase: true,
      required: [true, "Host is required."],
    },
    name: {
      type: String,
      unique: true,
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
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    startTimeUnix: {
      type: Number,
      required: [true, "Start time is required."],
    },
    endTimeUnix: {
      type: Number,
      required: [true, "End time is required."],
    },
  },
);

const AllChallenge = mongoose.model("AllChallenge", challengeSchema, "allchallenges");

export { AllChallenge };
