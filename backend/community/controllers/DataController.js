//? APIs to MongoDB

const { Community } = require("../models/Community");
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
    body.members = [
      {
        uid: decodedToken.uid,
        role: COMMUNITY_ROLE.ADMIN,
      },
    ];
    const newCommunity = new Community(body);
    await newCommunity.save();
    response.status(200).json({ data: newCommunity });
    return newCommunity;
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

async function updateCommunityMembers(request, response) {
  try {
    const { body, decodedToken } = request;
    const community = await Community.findOne({ _id: body.communityId });
    if (!community) {
      response.status(200).json({ message: "No community found!" });
    }
    const { members } = community;
    // Check if the user is admin of this community
    const member = members.find((member) => member.uid === decodedToken.uid);
    if (member.role === COMMUNITY_ROLE.ADMIN) {
      if (!body.memberId) {
        response.status(200).json({ message: "Member ID is required!" });
      }
      // Add the member
      const index = members.findIndex((member) => member.uid === body.memberId);
      if (index !== -1) {
        // User Already Exist
        if (body.remove) {
          members.splice(index, 1);
        } else {
          members[index].role = body.role || COMMUNITY_ROLE.MEMBER;
        }
      } else {
        members.push({
          uid: body.memberId,
          role: body.role || COMMUNITY_ROLE.MEMBER,
        });
      }
      if (body.remove) {
        response
          .status(200)
          .json({ message: "Cannot remove, member not found!" });
      }
      await Community.updateOne(
        { _id: body.communityId },
        {
          $set: {
            members,
          },
          $currentDate: { lastUpdated: true },
        }
      );
      response.status(200).json({ message: "Member List Updated!!" });
    } else {
      response
        .status(200)
        .json({ message: "Only admin can add/update/remove member!" });
    }
  } catch (error) {
    console.log("Error while creating community", error);
    return null;
  }
}

module.exports = {
  getCommunityList,
  createCommunity,
  updateCommunity,
  updateCommunityMembers,
};
