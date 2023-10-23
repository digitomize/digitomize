import express from "express";
import {
  createCommunity,
  getCommunityList,
  updateCommunity,
} from "../controllers/DataController.js";
import { addUID } from "../../users/middlewares/authMiddleware.js";

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

// Update Community
router.put("/", addUID, updateCommunity);

export default router;
