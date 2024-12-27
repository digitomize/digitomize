import express from "express";
import {
  createCommunity,
  deleteCommunity,
  getCommunityList,
  updateCommunity,
} from "../controllers/DataController.js";
import { addUID } from "../../users/middlewares/authMiddleware.js";
import { communityAdminCheck } from "../middlewares/communityMiddleware.js";
import {
  addCommunityMember,
  deleteCommunityMember,
  getCommunityMemberList,
  updateCommunityMember,
} from "../controllers/CommunityMemberController.js";

const router = express.Router();

// CREATE community
router.post("/", addUID, createCommunity);

// READ list of community
router.get("/", addUID, async(request, response) => {
  const communityList = await getCommunityList();
  response.status(200).json({
    communityList,
  });
});

// Update Community
router.put("/", [addUID, communityAdminCheck], updateCommunity);

// Delete Community
router.delete("/", [addUID, communityAdminCheck], deleteCommunity);

// Community Member Routes Start

// get all community members by community id
router.get("/member", addUID, getCommunityMemberList);

// Add Community Member
router.post("/member", [addUID, communityAdminCheck], addCommunityMember);

// Update Community Member
router.put("/member", [addUID, communityAdminCheck], updateCommunityMember);

// Delete Community Member
router.delete("/member", [addUID, communityAdminCheck], deleteCommunityMember);

export default router;
