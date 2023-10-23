const express = require("express");
const { handleUserSignup } = require("../controllers/authController");
const {
  handleUserDashboard,
} = require("../controllers/userDashboardController");

const { addUID } = require("../middlewares/authMiddleware");
const { getUserList, updateUser } = require("../controllers/userController");

const router = express.Router();

router.get("/user-list", addUID, getUserList);
router.put("/user", addUID, updateUser);

module.exports = router;
