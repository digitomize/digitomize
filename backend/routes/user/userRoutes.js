const express = require('express');
const { handleUserSignup, handleUserLogin } = require('../../controllers/user/authController');
const { handleUserDashboard } = require('../../controllers/user/userDashboardController');
const { handleUserProfilePreview } = require('../../controllers/user/userProfileController');
const { handleUpdateUserProfile } = require('../../controllers/user/userUpdateController');
const { checkAuth, checkUserOwnership } = require('../../middlewares/authMiddleware');

const router = express.Router();

// POST route for user signup
router.post('/signup', handleUserSignup);

// POST route for user login
router.post('/login', handleUserLogin);

// router.get('/signout', checkAuth, handleUserSignout);

router.get('/dashboard', checkAuth, handleUserDashboard);

router.get('/profile/:username', handleUserProfilePreview);

router.post('profile/:username', checkAuth, checkUserOwnership, handleUpdateUserProfile);


module.exports = router;
