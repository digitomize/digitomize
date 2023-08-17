const User = require('../../models/user/User');

const handleUpdateUserProfile = async (req, res) => {
  try {
    const { userId } = req; // Assuming userId is available in req
    const updatedData = req.body;

    // Update user data
    await User.findByIdAndUpdate(userId, updatedData);

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error updating user' });
  }
};

module.exports = {
  handleUpdateUserProfile
};
