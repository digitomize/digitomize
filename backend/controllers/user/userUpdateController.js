const User = require("../../models/user/User");

//? returns JSON message with Status Code
// Finds user by Id and updates it with given data.
const handleUpdateUserProfile = async (req, res) => {
  try {
    const { userId } = req;
    const updatedData = req.body;

    // Check if updatedData is empty
    if (Object.keys(updatedData).length === 0) {
      return res.status(400).json({ error: "No data provided for update" });
    }

    // Update user data
    await User.findByIdAndUpdate(userId, updatedData);

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error updating user" });
  }
};

module.exports = {
  handleUpdateUserProfile,
};
