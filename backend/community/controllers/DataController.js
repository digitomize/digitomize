//? APIs to MongoDB

import { ROLE } from "../../core/const.js";
import User from "../../users/models/User.js";
import { getUser } from "../../users/services/getUser.js";
import Community from "../models/Community.js";
import { error, success } from "../../core/api/response.api.js";
import CommunityMember from "../models/CommunityMember.js";

async function getCommunityList() {
  try {
    const communityList = await Community.find();
    return communityList;
  } catch (error) {
    console.log("Error fetching Community List", error);
  }
  return null;
}

async function createCommunity(request, response) {
  try {
    const { body, decodedToken } = request;
    const userId = decodedToken.uid;
    const user = await User.findOne({ uid: userId });
    if (!user) {
      // User not found, redirect to the login page
      return response
        .status(404)
        .json({ message: "User can't be verified", error: "User not found" });
    }
    if (user.role !== ROLE.ADMIN) {
      return response.status(403).json({
        message: "You don't have sufficient permission",
        error: "You don't have sufficient permission",
      });
    }
    let cmAdminUser = body.cmAdmin ? await getUser(body.cmAdmin) : user;
    if (!cmAdminUser) {
      return error(response, 400, "User not found!");
    }
    const newCommunity = new Community(body);
    const savedCommunity = await newCommunity.save();
    const communityMember = new CommunityMember({
      communityId: savedCommunity._id,
      uid: cmAdminUser.uid,
      role: ROLE.COMMUNITY_ADMIN,
    });
    await communityMember.save();
    const updatedCommunityList = [...cmAdminUser.community];
    updatedCommunityList.push({
      communityId: savedCommunity._id,
    });
    await User.updateOne(
      { uid: cmAdminUser.uid },
      {
        $set: {
          community: updatedCommunityList,
        },
        $currentDate: { lastUpdated: true },
      },
    );

    return success(savedCommunity, response, 200, "Community Created!!");
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return response.status(404).json({
        message: `${Object.keys(error.keyValue).join(", ")} already taken.`,
        error: `${Object.keys(error.keyValue).join(", ")} already taken.`,
      });
    }
    return response.status(500).json({
      message: "Internal Server Error",
      error: "Internal Server Error",
    });
  }
}

const updateCommunityHelper = (community, body) => {
  const updatedCommunity = {};
  const keys = ["name", "description", "vanity"];
  keys.forEach((key) => {
    updatedCommunity[key] = body[key] || community[key];
  });
  return updatedCommunity;
};

async function updateCommunity(request, response) {
  try {
    const { body } = request;
    if (!body.communityId) {
      return error(response, 400, "Community ID cannot be null");
    }
    const community = await Community.findOne({ _id: body.communityId });
    if (!community) {
      return error(response, 400, "No Community Found!!");
    }
    const updatedCommunity = updateCommunityHelper(community, body);
    await Community.updateOne(
      { _id: body.communityId },
      {
        $set: {
          ...updatedCommunity,
        },
        $currentDate: { lastUpdated: true },
      },
    );
    return success(updateCommunity, response, 200, "Community Updated!!");
  } catch (error) {
    response.status(500).json({ message: "Something went wrong!!" });
  }
}

async function deleteCommunity(request, response) {
  try {
    const { communityId } = request.body;
    if (!communityId) {
      return error(response, 400, "Community ID cannot be null");
    }
    await Community.deleteOne({ _id: communityId });
    await CommunityMember.deleteMany({ communityId });

    return success({}, response, 200, "Community Deleted!!");
  } catch (error) {
    response.status(500).json({ message: "Something went wrong!!" });
  }
}

export { getCommunityList, createCommunity, updateCommunity, deleteCommunity };
