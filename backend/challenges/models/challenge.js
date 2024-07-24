import mongoose from "mongoose";

// Challenge Schema

const challengeSchema = new mongoose.Schema(
  {
    host: {
      type: String,
      lowercase: true,
      required: [true, "Please provide the host of the challenge."],
    },
    name: {
      type: String,
      unique: true,
      required: [true, "Please provide the name of the challenge."],
    },
    vanity: {
      type: String,
      required: [true, "Please provide the vanity of the challenge."],
      lowercase: true,
    },
    url: {
      type: String,
      required: [true, "Please provide the URL of the challenge."],
    },
    description: {
      type: String,
      required: [true, "Please provide a description of the challenge."],
    },
    startTimeUnix: {
      type: Number,
      required: [true, "Please provide the start time of the challenge."],
    },
    endTimeUnix: {
      type: Number,
      required: [true, "Please provide the end time of the challenge."],
    },
  },
);

const AllChallenge = mongoose.model("AllChallenge", challengeSchema, "allchallenges");

export { AllChallenge };
