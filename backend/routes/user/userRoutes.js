const express = require('express');
const { handleUserSignup, handleUserLogin, handleUserSignout } = require('../../controllers/user/authController');
const { handleUserDashboard } = require('../../controllers/user/userDashboardController');
const { handleUserProfilePreview } = require('../../controllers/user/userProfileController');
const { checkAuth } = require('../../middlewares/authMiddleware');

const router = express.Router();

// POST route for user signup
router.post('/signup', handleUserSignup);

// POST route for user login
router.post('/login', handleUserLogin);

router.get('/signout', checkAuth, handleUserSignout);

router.get('/dashboard', checkAuth, handleUserDashboard);

router.get('/profile/:username', handleUserProfilePreview);

module.exports = router;
