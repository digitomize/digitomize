const express = require('express');
const { handleUserSignup, handleUserLogin } = require('../../controllers/user/userController');

const router = express.Router();

// POST route for user signup
router.post('/signup', handleUserSignup);

// POST route for user login
router.post('/login', handleUserLogin);

module.exports = router;
