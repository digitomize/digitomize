// controllers/user/userController.js

const bcrypt = require('bcrypt');
const User = require('../../models/user/User');

const handleUserDashboard = async (req, res) => {
  try {
    console.log(req.userId);
    // Check if user is logged in using the checkAuth middleware
    if (!req.userId) {
      // User is not logged in, redirect to the login page
      return res.redirect('/login');
    }

    // User is logged in, fetch user data from the database
    const userId = req.userId; // Assuming you have the user's ID available in req.user
    const user = await User.findById(userId);

    if (!user) {
      // User not found, redirect to the login page
      return res.redirect('/login');
    }

    // Send user data to the client
    res.json(user);
  } catch (error) {
    console.error('Error:', error);
    // Internal server error, send a 500 Internal Server Error status
    res.status(500).json({ error: 'Internal server error' });
  }
};



module.exports = {
  handleUserDashboard
};
