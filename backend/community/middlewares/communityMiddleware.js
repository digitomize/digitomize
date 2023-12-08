import { error } from "../../core/api/response.api.js";
import { ROLE } from "../../core/const.js";
import User from "../../users/models/User.js";
import CommunityMember from "../models/CommunityMember.js";

const communityAdminCheck = async (request, response, next) => {
  const { body, decodedToken } = request;
  const userId = decodedToken.uid;
  // Check If User has admin role
  const user = await User.findOne({ uid: userId }).select(
    "-_id -password -createdAt -updatedAt -__v",
  );

  if (!user) {
    // User not found, redirect to the login page
    return response
      .status(404)
      .json({ message: "User not found", error: "User not found" });
  }

  // Check if User is in community
  const communityMember = await CommunityMember.findOne({
    uid: userId,
    communityId: body.communityId,
  });
  if (!communityMember) {
    return error(response, 403, "Incorrect Community ID!");
  }
  if (communityMember.role !== ROLE.COMMUNITY_ADMIN) {
    return response.status(403).json({
      message: "You don't have sufficient permission",
      error: "You don't have sufficient permission",
    });
  }
  request.communityAdmin = communityMember;
  next();
};

const communityMemberCheck = async (request, response, next) => {
  const { body, decodedToken } = request;
  const userId = decodedToken.uid;
  // Check If User has admin role
  const user = await User.findOne({ uid: userId }).select(
    "-_id -password -createdAt -updatedAt -__v",
  );

  if (!user) {
    // User not found, redirect to the login page
    return response
      .status(404)
      .json({ message: "User not found", error: "User not found" });
  }

  // Check if User is in community
  const communityMember = await CommunityMember.findOne({
    uid: userId,
    communityId: body.communityId,
  });

  if (
    communityMember.role !== ROLE.COMMUNITY_ADMIN ||
    communityMember.role !== ROLE.COMMUNITY_MEMBER
  ) {
    return response.status(403).json({
      message: "You don't have sufficient permission",
      error: "You don't have sufficient permission",
    });
  }
  request.communityMember = communityMember;
  next();
};

export { communityAdminCheck, communityMemberCheck };
