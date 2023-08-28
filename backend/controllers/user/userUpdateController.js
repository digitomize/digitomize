const User = require("../../models/user/User");
const maxUpdatesPerDay = 50;

// Helper function to update platform-specific data
const updatePlatformData = (platform, userData, existingData) => {
  const platformData = userData[platform];
  // console.log(platformData);
  if (platformData) {
    if (
      platformData.username === undefined ||
      platformData.showOnWebsite === undefined
    ) {
      throw new Error(
        `Both 'username' and 'showOnWebsite' properties are required for the '${platform}' platform.`
      );
    }

    existingData.username = platformData.username || "";
    existingData.showOnWebsite = platformData.showOnWebsite || false;

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
  if (
    userData[field]?.data !== undefined &&
    userData[field]?.showOnWebsite !== undefined
  ) {
    existingData[field] = {
      data: userData[field]?.data,
      showOnWebsite: userData[field]?.showOnWebsite,
    };
  } else if (userData[field] !== undefined) {
    throw new Error(
      `Both 'data' and 'showOnWebsite' properties are required for the '${field}' field.`
    );
  }
};

// Helper function to update user data, including platform-specific data
const updateUserData = (userData, existingData) => {
  // Update general user data (firstName, lastName, etc.)
  const generalFields = ["username", "picture", "name", "email_show"];
  generalFields.forEach((field) => {
    if (userData[field] !== undefined) {
      existingData[field] = userData[field];
    }
  });

  // Update fields with common structure
  const commonFields = ["bio", "dateOfBirth", "phoneNumber", "github"];
  commonFields.forEach((field) => {
    updateDataField(field, userData, existingData);
  });

  // Update platform-specific data for CodeChef, LeetCode, and CodeForces
  const platforms = ["codechef", "leetcode", "codeforces"];
  platforms.forEach((platform) => {
    updatePlatformData(platform, userData, existingData[platform]);
  });

  // You can similarly update other general properties as needed
};

const handleUpdateUserProfile = async (req, res) => {
  try {
    // const { userId } = req;
    const userId = req.decodedToken.uid;
    const updatedData = req.body;

    // Check if updatedData is empty
    if (Object.keys(updatedData).length === 0) {
      return res.status(400).json({ error: "No data provided for update" });
    }

    // Get the existing user profile
    const user = await User.findOne({ uid: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const today = new Date().toDateString();
    const updateIndex = user.updatesToday.findIndex(
      (update) => update.timestamp.toDateString() === today
    );
    if (
      updateIndex !== -1 &&
      user.updatesToday[updateIndex].count >= maxUpdatesPerDay
    ) {
      return res
        .status(400)
        .json({ error: "Maximum number of updates reached for today" });
    }

    try {
      // Clone the user's data before updating
      const userDataBeforeUpdate = JSON.parse(JSON.stringify(user));

      // Update user data, including platform-specific data
      updateUserData(updatedData, user);

      // Save the updated user profile
      await user.save();

      // Compare the updated user data with the data before update
      const updatedFields = {};
      Object.keys(updatedData).forEach((field) => {
        if (
          JSON.stringify(userDataBeforeUpdate[field]) !==
          JSON.stringify(user[field])
        ) {
          updatedFields[field] = user[field];
        }
      });

      if (Object.keys(updatedFields).length === 0) {
        return res
          .status(200)
          .json({ message: "No changes were applied to the user profile" });
      } else {
        user.updateCount();
        user.save();
        res
          .status(200)
          .json({ message: "User updated successfully", updatedFields });
      }
    } catch (error) {
      // Handle the error thrown by updateUserData
      res.status(400).json({ error: error.message }); // Send the error message to the client
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error updating user" });
  }
};

module.exports = {
  handleUpdateUserProfile,
};
