import User from "../models/User.js";
import { sendWebhook_updateAccount } from "../../services/discord-webhook/updateAccount.js";
import { handleUserDataUpdate } from "./userProfileController.js";
const maxUpdatesPerDay = 50;
const twitterUrlPattern = /^(?:https?:\/\/)?(?:www\.)?twitter\.com\/(?:#!\/)?[a-zA-Z0-9_]{1,15}(?:\/)?$/;
const linkedInUrlPattern = /^(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]{5,30}\/?$/;
const instagramUrlPattern = /^(?:https?:\/\/)?(?:www\.)?instagram\.com\/[a-zA-Z0-9_]{1,30}\/?$/;
const phoneNumberPattern = /^((\+[1-9]{1}[0-9]{0,1}\s?)?[1-9]{1}\d{9})?$/;

// Helper function to update platform-specific data
const updatePlatformData = (platform, userData, existingData, user) => {
  const platformData = userData[platform];
  // console.log(platformData);
  if (platformData) {
    if (
      platformData.username === undefined ||
      platformData.showOnWebsite === undefined
    ) {
      throw new Error(
        `Both 'username' and 'showOnWebsite' properties are required for the '${platform}' platform.`,
      );
    }

    existingData.showOnWebsite = platformData.showOnWebsite || false;

    // If username is provided in userData, set ratings, badge, and fetchTime to null
    if (platformData.username !== existingData.username) {
      existingData.username = platformData.username || "";
      existingData.rating = null;
      existingData.attendedContestsCount = null;
      existingData.badge = null;
      existingData.fetchTime = 0;
      user.digitomize_rating = 0;
    }
    // You can similarly update other properties specific to each platform
  }
};

function validatePhoneNumber(number){
  if(number && !phoneNumberPattern.test(number)){
    throw new Error('Invalid phone number');
  }
  return null;
}

// Helper function to update a specific data field
const updateDataField = (field, userData, existingData) => {
  if (
    userData[field]?.data !== undefined &&
    userData[field]?.showOnWebsite !== undefined
  ) {
    if(field==='phoneNumber'){
      validatePhoneNumber(userData[field]?.data);
    }
    existingData[field] = {
      data: userData[field]?.data,
      showOnWebsite: userData[field]?.showOnWebsite,
    };
  } else if (userData[field] !== undefined) {
    throw new Error(
      `Both 'data' and 'showOnWebsite' properties are required for the '${field}' field.`,
    );
  }
};

function validateSocialUrls (social) {
  const patterns = {
    twitter: twitterUrlPattern,
    linkedin: linkedInUrlPattern,
    instagram: instagramUrlPattern,
  };

  for (const [platform, url] of Object.entries(social)) {
    if (url && !patterns[platform].test(url)) {
      return { error: `Invalid ${platform} URL`, message: `Invalid ${platform} URL` };
    }
  }
  return null;
}

// Helper function to update user data, including platform-specific data
const updateUserData = async (userData, existingData) => {
  // Update general user data (firstName, lastName, etc.)
  const generalFields = ["username", "picture", "resume", "name", "email_show"];
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
    updatePlatformData(platform, userData, existingData[platform], existingData);
  });

  if (userData.social) {
    const validationError = validateSocialUrls(userData.social);
    if (validationError) {
      throw validationError;
    }
    const socialFields = Object.keys(userData.social);
    socialFields.forEach((field) => {
      if (existingData.social && existingData.social[field] !== undefined) {
        existingData.social[field] = userData.social[field];
      }
    });
  }

  const skills = userData.skills;
  if (skills) {
    existingData.skills = skills;
  }
  const education = userData.education;
  if (education) {
    existingData.education = education;
  }

  // You can similarly update other general properties as needed
};

function normalizeValue (value) {
  // Treat null and '' as equal
  return value === null ? "" : value;
}

function compareUserProfile (oldPlatformData, newPlatformData) {
  // console.log("Old Platform Data:", oldPlatformData);
  // console.log("New Platform Data:", newPlatformData);

  if (oldPlatformData && newPlatformData) {
    // Check direct fields (username, name, resume, picture)
    const directFields = ["username", "name", "resume", "picture"];
    const notEqualDirectFields = directFields
      .filter(field => newPlatformData[field] !== undefined && String(normalizeValue(oldPlatformData[field])) !== String(normalizeValue(newPlatformData[field])));

    if (notEqualDirectFields.length > 0) {
      // console.log(`Direct fields "${notEqualDirectFields.join(', ')}" not equal`);
      return false;
    }

    // Check fields with nested data (phoneNumber, bio, dateOfBirth)
    const nestedFields = ["phoneNumber", "bio", "dateOfBirth"];
    const notEqualNestedFields = nestedFields
      .filter(field => newPlatformData[field] !== undefined && String(normalizeValue(oldPlatformData[field]?.data)) !== String(normalizeValue(newPlatformData[field]?.data)));

    if (notEqualNestedFields.length > 0) {
      // console.log(`Nested fields "${notEqualNestedFields.join(', ')}" not equal`);
      // console.log(normalizeValue(oldPlatformData.phoneNumber?.data), normalizeValue(newPlatformData.phoneNumber?.data))
      return false;
    }

    // Check social fields (linkedin, twitter, instagram)
    const socialFields = ["linkedin", "twitter", "instagram"];
    const notEqualSocialFields = socialFields
      .filter(field => newPlatformData?.social !== undefined && String(normalizeValue(oldPlatformData?.social[field])) !== String(normalizeValue(newPlatformData?.social[field])));

    if (notEqualSocialFields.length > 0) {
      // console.log(`Social fields "${notEqualSocialFields.join(', ')}" not equal`);
      return false;
    }

    // Check contest platforms (codeforces, codechef, leetcode) for username
    const contestFields = ["codeforces", "codechef", "leetcode"];
    const notEqualContestFields = contestFields
      .filter(field => newPlatformData[field] && String(normalizeValue(oldPlatformData[field]?.username)) !== String(normalizeValue(newPlatformData[field]?.username)));

    if (notEqualContestFields.length > 0) {
      // console.log(`Contest fields "${notEqualContestFields.join(', ')}" not equal`);
      return false;
    }

    // Check skills
    if (newPlatformData.skills && JSON.stringify(oldPlatformData.skills) !== JSON.stringify(newPlatformData.skills)) {
      // console.log("Skills not equal");
      return false;
    }
  } else {
    // console.log("One or both platform data is undefined or null");
    return false;
  }

  // console.log("All fields are equal");
  return true;
}

const handleUpdateUserProfile = async (req, res) => {
  try {
    // const { userId } = req;
    const userId = req.decodedToken.uid;
    const updatedData = req.body;
    // console.log("UpdatedData:", updatedData);

    // Check if updatedData is empty
    if (Object.keys(updatedData).length === 0) {
      return res.status(400).json({
        message: "No data provided for update",
        error: "No data provided for update",
      });
    }

    // Get the existing user profile
    const user = await User.findOne({ uid: userId });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", error: "User not found" });
    }
    const today = new Date().toDateString();
    const updateIndex = user.updatesToday.findIndex(
      (update) => update.timestamp.toDateString() === today,
    );
    if (
      updateIndex !== -1 &&
      user.updatesToday[updateIndex].count >= maxUpdatesPerDay
    ) {
      return res.status(400).json({
        message: "Maximum number of updates reached for today",
        error: "Maximum number of updates reached for today",
      });
    }

    try {
      // Clone the user's data before updating
      const userDataBeforeUpdate = JSON.parse(JSON.stringify(user));

      if (compareUserProfile(userDataBeforeUpdate, updatedData)) {
        return res.status(400).json({
          message: "No changes were applied to the user profile",
          error: "No changes were applied to the user profile",
        });
      }

      // Update user data, including platform-specific data
      await updateUserData(updatedData, user);

      // Save the updated user profile
      await user.save();
      // console.log("UPDATING USERRRRRHEREEEEEEE");
      handleUserDataUpdate(user);

      if (process.env.NODE_ENV === "production") {
        sendWebhook_updateAccount({
          oldImage: userDataBeforeUpdate.picture,
          newImage: user.picture,
          oldUsername: userDataBeforeUpdate.username,
          newUsername: user.username,
          oldData: userDataBeforeUpdate,
          newData: user,
        });
      }

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
      console.log(error);
      res.status(400).json({ error: error.error, message: error.message }); // Send the error message to the client
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: "Internal Server Error",
    });
  }
};


import { Novu } from "@novu/node";
const novu = new Novu(process.env.NOVU_API_KEY);
const handleUserPreferences = async (req, res) => {
  try {
    const { uid } = req.decodedToken;
    const { platform, preference } = req.body;
    // console.log(req.body);
    // console.log(uid, platform, preference);

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure the platform exists in the contest_notifs object
    // if (!user.preferences.contest_notifs[platform]) {
    //   return res.status(400).json({ message: "Invalid platform" });
    // }

    // Update the preference for the specified platform
    user.preferences.contest_notifs[platform] = preference;

    // Save the user
    await user.save();

    // Handle adding/removing user from novu service based on preference
    if (preference) {
      const topicKey = `${platform}-notifs`;
      const response = await novu.topics.addSubscribers(topicKey, {
        subscribers: [uid],
      });
    } else {
      const topicKey = `${platform}-notifs`;
      const response = await novu.topics.removeSubscribers(topicKey, {
        subscribers: [uid],
      });
      // console.log(response);
    }

    return res.status(200).json({ message: `Preference for ${platform} updated successfully to ${preference}` });
  } catch (error) {
    console.error("Error updating user preference:", error);
    return res.status(500).json({ message: "Internal server error", error: "Internal server error"});
  }
};

   


export {
  updatePlatformData,
  updateDataField,
  updateUserData,
  handleUpdateUserProfile,
  handleUserPreferences
};
