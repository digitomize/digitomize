import mongoose from "mongoose";

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
    role: {
      type: Number,
      default: 0,
    },
    role: {
      type: String,
      required: [true, "Community Role is required."],
    },
  },
  { timestamps: true }
);

const CommunityMember = mongoose.model(
  "CommunityMember",
  communityMemberSchema,
  "communityMember"
);

export default CommunityMember;
