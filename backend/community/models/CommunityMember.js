import mongoose from "mongoose";
import { ROLE } from "../../core/const.js";

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
      default: ROLE.COMMUNITY_MEMBER,
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
