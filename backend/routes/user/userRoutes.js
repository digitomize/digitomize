import express from'express';
import  handleUserSignup from'../../controllers/user/authController.js';
import handleUserLogin  from'../../controllers/user/authController.js';
import  handleUserDashboard  from'../../controllers/user/userDashboardController.js';
import  handleUserProfilePreview  from'../../controllers/user/userProfileController.js';
import  handleUpdateUserProfile  from'../../controllers/user/userUpdateController.js';
import  checkAuth  from'../../middlewares/authMiddleware.js';
import checkUserOwnership  from'../../middlewares/authMiddleware.js';

const router = express.Router();

// POST route for user signup 
router.post('/signup', handleUserSignup);

// POST route for user login
router.post('/login', handleUserLogin);

// router.get('/signout', checkAuth, handleUserSignout);

router.get('/dashboard', checkAuth, handleUserDashboard);

router.get('/profile/:username', handleUserProfilePreview);

router.post('/profile/:username', checkAuth, checkUserOwnership, handleUpdateUserProfile);


export default router;
