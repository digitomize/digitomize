const mongoose = require("mongoose");

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
      lowercase: true,
    },
  },
  { timestamps: true }
);

const Community = mongoose.model("Community", communitySchema, "community");

module.exports = {
  Community,
};
