//? APIs to MongoDB

const { ROLE } = require("../../core/const");
const User = require("../../users/models/User");
const { Community } = require("../models/Community");
const { CommunityMember } = require("../models/CommunityMember");
const { COMMUNITY_ROLE } = require("../utils/const");

require("dotenv").config({ path: "../../.env" });

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
    const userId = req.decodedToken.uid;
    const user = await User.findOne({ uid: userId });
    if (!user) {
      // User not found, redirect to the login page
      return res
        .status(404)
        .json({ message: "User can't be verified", error: "User not found" });
    }
    if (user.role !== ROLE.ADMIN) {
      return res.status(400).json({
        message: "You don't have sufficient permission",
        error: "You don't have sufficient permission",
      });
    }
    const newCommunity = new Community(body);
    const savedCommunity = await newCommunity.save();
    const communityMember = new CommunityMember({
      communityId: savedCommunity._id,
      uid: decodedToken.uid,
      role: ROLE.COMMUNITY_ADMIN,
    });
    await communityMember.save();
    const updatedCommunityList = [...user.community];
    updatedCommunityList.push({
      communityId: savedCommunity._id,
    });
    const updatedUser = await User.updateOne(
      { uid: decodedToken.uid },
      {
        $set: {
          community: updatedCommunityList,
        },
        $currentDate: { lastUpdated: true },
      }
    );

    return response.status(200).json({ message: "Community Created!!" });
  } catch (error) {
    console.log("Error while creating community", error);
    return null;
  }
}

const updateCommunityHelper = (community, body) => {
  const updatedCommunity = {};
  const keys = ["name", "description"];
  keys.forEach((key) => {
    updatedCommunity[key] = body[key] || community[key];
  });
  return updatedCommunity;
};

async function updateCommunity(request, response) {
  try {
    const { body, decodedToken } = request;
    const community = await Community.findOne({ _id: body.communityId });
    const { members } = community;
    const member = members.find((member) => member.uid === decodedToken.uid);
    if (!member || member.role !== COMMUNITY_ROLE.ADMIN) {
      response
        .status(400)
        .json({ message: "Only admin can update community!" });
    }
    if (!community) {
      response.status(200).json({ message: "No community found!" });
    }
    const updatedCommunity = updateCommunityHelper(community, body);
    await Community.updateOne(
      { _id: body.communityId },
      {
        $set: {
          ...updatedCommunity,
        },
        $currentDate: { lastUpdated: true },
      }
    );
    response.status(200).json({ message: "Community data updated!!" });
  } catch (error) {
    response.status(500).json({ message: "Something went wrong!!" });
  }
}

module.exports = {
  getCommunityList,
  createCommunity,
  updateCommunity,
};
