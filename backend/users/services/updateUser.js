const User = require('../models/User'); // Replace with your User model

// Function to update user data in MongoDB
const updateUser = async (updatedUser) => {
    try {
        // Find the user by ID and update the data
        console.log(updatedUser);
        return await User.findByIdAndUpdate(updatedUser._id, updatedUser, { new: true });
    } catch (error) {
        console.error('Error updating user:', error);
    }
};

module.exports = {
    updateUser
};
