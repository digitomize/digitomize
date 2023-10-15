const express = require("express");
const { handleUserSignup } = require("../controllers/authController");
const {
  handleUserDashboard,
} = require("../controllers/userDashboardController");
const {
  handleUserProfilePreview,
} = require("../controllers/userProfileController");
const {
  handleUpdateUserProfile,
} = require("../controllers/userUpdateController");
const { addUID } = require("../middlewares/authMiddleware");
const { getUserList } = require("../controllers/userController");
// const { checkLoggedIn } = require('../../services/checkLoggedIn');

const router = express.Router();

// POST route for user signup
router.post("/signup", addUID, handleUserSignup);

// router.get('/signout', checkAuth, handleUserSignout);

router.get("/dashboard", addUID, handleUserDashboard);

router.post("/dashboard", addUID, handleUpdateUserProfile);

router.get("/profile/:username", handleUserProfilePreview);

// router.post('/profile/:username', addUID, checkUserOwnership, handleUpdateUserProfile);

// router.post('/isLoggedin', checkLoggedIn);

module.exports = router;
