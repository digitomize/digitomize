import express from "express";
import {
  createCommunity,
  getCommunityList,
  getCommunityMemberList,
  updateCommunity,
} from "../controllers/DataController.js";
import { addUID } from "../../users/middlewares/authMiddleware.js";
import { communityAdminCheck } from "../middlewares/communityMiddleware.js";

const router = express.Router();

// CREATE community
router.post("/", addUID, createCommunity);

// READ list of community
router.get("/", addUID, async (request, response) => {
  const communityList = await getCommunityList();
  response.status(200).json({
    communityList,
  });
});

// get all community members by community id
router.get("/member", addUID, getCommunityMemberList);

// Update Community
router.put("/", [addUID, communityAdminCheck], updateCommunity);

export default router;
