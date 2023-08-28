const express = require('express');
const { handleUserSignup} = require('../../controllers/user/authController');
const { handleUserDashboard } = require('../../controllers/user/userDashboardController');
const { handleUserProfilePreview } = require('../../controllers/user/userProfileController');
const { handleUpdateUserProfile } = require('../../controllers/user/userUpdateController');
const { addUID, checkUserOwnership } = require('../../middlewares/authMiddleware');
// const { checkLoggedIn } = require('../../services/checkLoggedIn');


const router = express.Router();

// POST route for user signup
router.post('/signup', addUID, handleUserSignup);

// router.get('/signout', checkAuth, handleUserSignout);

router.get('/dashboard', addUID, handleUserDashboard);

router.post('/dashboard', addUID, handleUpdateUserProfile);

router.get('/profile/:username', handleUserProfilePreview);

router.post('/profile/:username', addUID, checkUserOwnership, handleUpdateUserProfile);

// router.post('/isLoggedin', checkLoggedIn);

module.exports = router;
