import express from "express";
import { handleUserSignup } from "../controllers/authController.js";
import { handleUserDashboard } from "../controllers/userDashboardController.js";
import { handleUserProfilePreview } from "../controllers/userProfileController.js";
import { handleUpdateUserProfile } from "../controllers/userUpdateController.js";
import { addUID } from "../middlewares/authMiddleware.js";
import { getLeaderboard } from "../controllers/leaderboardController.js";
import { generateSignature } from "../controllers/cloudinaryUploadController.js";

const router = express.Router();

router.get("/leaderboard", getLeaderboard);

// POST route for user signup
router.post("/signup", addUID, handleUserSignup);

// router.get('/signout', checkAuth, handleUserSignout);

router.get("/dashboard", addUID, handleUserDashboard);

router.post("/dashboard", addUID, handleUpdateUserProfile);

router.get("/signImageUpload",addUID, generateSignature)

router.get("/profile/:username", handleUserProfilePreview);

// router.post('/profile/:username', addUID, checkUserOwnership, handleUpdateUserProfile);

// router.post('/isLoggedin', checkLoggedIn);

export default router;
