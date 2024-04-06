import User from "../models/User.js";
import admin from "firebase-admin";
import { setUser } from "../services/setUser.js";
import { error, success } from "../../core/api/response.api.js";

const getUserList = async (req, res) => {
  try {
    const users = await User.find().select("-_id -password -updatedAt -__v");

    res.status(200).json(users);
  } catch (error) {
    console.error("Error:", error);
    // Internal server error, send a 500 Internal Server Error status
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { body } = req;
    const updatedUser = await User.updateOne(
      { uid: body.uid },
      {
        $set: {
          role: body.role,
        },
        $currentDate: { lastUpdated: true },
      },
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

const createUserFirebase = (req, res, next) => {
  const { body } = req;

  // Validate input fields
  if (!body || !body.email.trim() || !body.name.trim() || !body.password.trim()) {
        return res.status(400).json({ error: "Missing required fields" });
  }

  // Create user in Firebase Authentication
  admin
    .auth()
    .createUser({
      email: body.email,
      displayName: body.name,
      password: body.password,
    })
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      req.user = userRecord;
      next(); // Proceed to the next middleware
    })
    .catch((error) => {
      console.error("Error creating new user:", error);

      // Extract the error code and message from error object
      const errorMessage = `code:${error.errorInfo.code}, \n message:${error.errorInfo.message}`;

      // Return appropriate error response based on error code
      if (error.errorInfo.code === "auth/email-already-exists") {
        return res.status(400).json({ error: "Email already exists" });
      }

      // Return a 500 Internal Server Error status for other errors
      return res.status(500).json({
        error: "Internal server error",
        message: errorMessage,
      });
    });
};

const createUserDB = async (req, res) => {
  let {
    uid,
    username,
    name,
    picture,
    resume,
    email_verified,
    email,
    email_show,
    bio,
    dateOfBirth,
    phoneNumber,
    github,
    codechef,
    leetcode,
    codeforces,
  } = req.user;

  if (!username) {
    username = req.body?.username;
  }
  if (!name) {
    name = req.body?.name;
  }
  // Validate required fields
  if (!uid) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  // console.log(uid);
  try {
    const userData = {
      uid,
      username,
      name,
      picture,
      resume,
      email_verified,
      email,
      email_show,
      bio,
      dateOfBirth,
      phoneNumber,
      github,
      codechef,
      leetcode,
      codeforces,
    };

    await setUser(userData); // Create a new user using setUser
    // console.log(newUser);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error:", error);
    if (error.status === 400) {
      return res.status(400).json({ error: error.message });
    }
    if (error.status === 200) {
      return res.status(200).json({ message: "User already exists." });
    }
    res.status(500).json({ error: "Error creating user" });
  }
};

const deleteUserFirebase = async (req, res, next) => {
  const { body } = req;
  admin
    .auth()
    .deleteUser(body.uid)
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      // req.user = userRecord;
      // console.log("Successfully deleted user!");
      next();
    })
    .catch((error) => {
      console.log("Error deleting user:", error);
      return res.status(404).json({
        error,
        message: `code:${error.errorInfo.code}, \n message:${error.errorInfo.message}`,
      });
    });
};

const deleteUserDB = async (request, response) => {
  try {
    // console.log(request.body);
    const { uid } = request.body;
    // console.log(uid);
    if (!uid) {
      return error(response, 400, "User ID cannot be null");
    }
    await User.deleteOne({ uid });

    return success({}, response, 200, "User Deleted!!");
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Something went wrong!!" });
  }
};

export {
  getUserList,
  updateUser,
  createUserFirebase,
  createUserDB,
  deleteUserFirebase,
  deleteUserDB,
};
