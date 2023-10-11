const express = require("express");
const {
  getCommunityList,
  createCommunity,
  updateCommunityMembers,
  updateCommunity,
} = require("../controllers/DataController");
const { addUID } = require("../../users/middlewares/authMiddleware");

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

// Add Member / Update Member
router.post("/updateMembers", addUID, updateCommunityMembers);

module.exports = router;
