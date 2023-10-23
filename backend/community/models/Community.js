import mongoose from "mongoose";

//* Community Schema
const communitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    vanity: {
      type: String,
      required: [true, "Vanity is required."],
      lowercase: true,
      unique: { value: true, caseInsensitive: true },
    }
  },
  { timestamps: true }
);

const Community = mongoose.model("Community", communitySchema, "community");

export {
  Community
};
