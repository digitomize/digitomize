const mongoose = require("mongoose");

//* Community Schema
const communityMemberSchema = new mongoose.Schema(
  {
    communityId: {
      type: String,
      required: [true, "Community Id is required."],
    },
    uid: {
      type: String,
      required: [true, "User Id is required."],
      lowercase: true,
    },
    score: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const CommunityMember = mongoose.model(
  "CommunityMember",
  communityMemberSchema,
  "communityMember"
);

module.exports = {
  CommunityMember,
};
