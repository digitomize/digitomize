const { ROLE } = require("../../core/const");
const User = require("../models/User");

const getUserList = async (req, res) => {
  try {
    // User is logged in, fetch user data from the database
    const userId = req.decodedToken.uid;
    const user = await User.findOne({ uid: userId }).select(
      "-_id -password -createdAt -updatedAt -__v"
    );

    if (!user) {
      // User not found, redirect to the login page
      return res
        .status(404)
        .json({ message: "User not found", error: "User not found" });
    }
    if (user.role !== ROLE.ADMIN) {
      return res.status(400).json({
        message: "You don't have sufficient permission",
        error: "You don't have sufficient permission",
      });
    }
    const users = await User.find().select(
      "-_id -password -createdAt -updatedAt -__v"
    );

    res.status(200).json(users);
  } catch (error) {
    console.error("Error:", error);
    // Internal server error, send a 500 Internal Server Error status
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    // User is logged in, fetch user data from the database
    const userId = req.decodedToken.uid;
    const { body } = req;
    if (userId === body.uid) {
      return res
        .status(400)
        .json({ message: "Operation not allowed", error: "Bad Request" });
    }
    const user = await User.findOne({ uid: userId });
    if (!user) {
      // User not found, redirect to the login page
      return res
        .status(404)
        .json({ message: "User can't be verified", error: "User not found" });
    }
    if (user.role !== ROLE.ADMIN) {
      return res.status(400).json({
        message: "You don't have sufficient permission",
        error: "You don't have sufficient permission",
      });
    }
    const updatedUser = await User.updateOne(
      { uid: body.uid },
      {
        $set: {
          role: body.role,
        },
        $currentDate: { lastUpdated: true },
      }
    );
    return res.status(200).json({
      message: "User Updated Successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error:", error);
    // Internal server error, send a 500 Internal Server Error status
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getUserList,
  updateUser,
};
