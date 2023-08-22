const User = require("../../models/user/User");

//? returns JSON message with Status Code
// Finds user by Id and updates it with given data.
// Helper function to update platform-specific data
const updatePlatformData = (platform, userData, existingData) => {
  const platformData = userData[platform];
  if (platformData) {
    existingData.username = platformData.username || existingData.username;
    existingData.showOnWebsite =
      platformData.showOnWebsite || existingData.showOnWebsite;

    // If username is provided in userData, set ratings, badge, and fetchTime to null
    if (platformData.username) {
      existingData.ratings = "";
      existingData.badge = "";
      existingData.fetchTime = 0;
    }
    // You can similarly update other properties specific to each platform
  }
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

    // Update platform-specific data for CodeChef
    updatePlatformData("codechef", updatedData, user.codechef);

    // Update platform-specific data for LeetCode
    updatePlatformData("leetcode", updatedData, user.leetcode);

    // Update platform-specific data for CodeForces
    updatePlatformData("codeforces", updatedData, user.codeforces);

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
