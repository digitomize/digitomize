import mongoose from "mongoose";

//* POTD Schema
const potdSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: [true, "Date is required."],
    },
    problemName: {
      type: String,
      required: [true, "Problem is required."],
    },
    problemUrl: {
      type: String,
      required: [true, "URL is required."],
    },
    platform: {
      type: String,
      required: [true, "Platform is required."],
    },
  },
  { timestamps: true },
);

const Potd = mongoose.model("Potd", potdSchema, "potd");

export { Potd };
