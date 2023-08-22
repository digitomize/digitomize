const User = require("../../models/user/User");

// Helper function to update platform-specific data
const updatePlatformData = (platform, userData, existingData) => {
  const platformData = userData[platform];
  if (platformData) {
    existingData.username = platformData.username || null;
    existingData.showOnWebsite =
      platformData.showOnWebsite || null;

    // If username is provided in userData, set ratings, badge, and fetchTime to null
    if (platformData.username) {
      existingData.ratings = null;
      existingData.badge = null;
      existingData.fetchTime = 0;
    }
    // You can similarly update other properties specific to each platform
  }
};

// Helper function to update a specific data field
const updateDataField = (field, userData, existingData) => {
  existingData[field] = {
    data: userData[field]?.data || null,
    showOnWebsite: userData[field]?.showOnWebsite || null,
  };
};

// Helper function to update user data, including platform-specific data
const updateUserData = (userData, existingData) => {
  // Update general user data (firstName, lastName, etc.)
  const generalFields = ["firstName", "lastName", "email", "email_show"];
  generalFields.forEach(field => {
    existingData[field] = userData[field] || existingData[field];
  });

  // Update fields with common structure
  const commonFields = ["bio", "dateOfBirth", "phoneNumber", "github"];
  commonFields.forEach(field => {
    updateDataField(field, userData, existingData);
  });

  // Update platform-specific data for CodeChef, LeetCode, and CodeForces
  const platforms = ["codechef", "leetcode", "codeforces"];
  platforms.forEach(platform => {
    updatePlatformData(platform, userData, existingData[platform]);
  });

  // You can similarly update other general properties as needed
};

const handleUpdateUserProfile = async (req, res) => {
  try {
    const { userId } = req;
    const updatedData = req.body;

    // Check if updatedData is empty
    if (Object.keys(updatedData).length === 0) {
      return res.status(400).json({ error: "No data provided for update" });
    }

    // Get the existing user profile
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user data, including platform-specific data
    updateUserData(updatedData, user);

    // Save the updated user profile
    await user.save();

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error updating user" });
  }
};

module.exports = {
  handleUpdateUserProfile,
};
