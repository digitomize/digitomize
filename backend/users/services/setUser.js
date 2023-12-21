import User from "../models/User.js";
import { sendEmail } from "../../services/email/createAccount.js";
import { sendWebhook_createAccount } from "../../services/discord-webhook/createAccount.js";

// Utility function to create default contest object
function createDefaultContestObject (platformData) {
  const commonDefaults = {
    rating: null,
    badge: null,
    fetchTime: 0,
    attendedContestsCount: null,
  };

  if (platformData) {
    return {
      showOnWebsite: platformData.showOnWebsite || false,
      username: platformData.username || null,
      ...commonDefaults,
    };
  } else {
    return undefined;
  }
}

// Takes the data and creates a new User in MongoDB
const setUser = async (userData) => {
  console.log(userData);
  try {
    const {
      uid,
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
    } = userData;

    let { username } = userData;
    const emailParts = email.split("@");
    const usernameBeforeAtSymbol = emailParts[0];
    if (!username) {
      username = usernameBeforeAtSymbol;
    }
    // Finds if the username with same name is already registered.
    const checkForDuplicateUsername = await User.findOne({
      username,
    });

    const newUser = new User({
      uid,
      username: checkForDuplicateUsername ? uid : username || uid, // if username already used, use uid as username.
      name: name || "Digitomize User",
      picture:
        picture ||
        "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg",
      resume,
      email,
      email_verified,
      email_show: email_show || undefined,
      bio: bio
        ? {
            showOnWebsite: bio.showOnWebsite || false,
            data: bio.data || null,
          }
        : undefined,
      dateOfBirth: dateOfBirth
        ? {
            showOnWebsite: dateOfBirth.showOnWebsite || false,
            data: dateOfBirth.data || null,
          }
        : undefined,
      phoneNumber: phoneNumber
        ? {
            showOnWebsite: phoneNumber.showOnWebsite || false,
            data: phoneNumber.data || null,
          }
        : undefined,
      github: github
        ? {
            showOnWebsite: github.showOnWebsite || false,
            data: github.data || null,
          }
        : undefined,
      codechef: createDefaultContestObject(codechef),
      leetcode: createDefaultContestObject(leetcode),
      codeforces: createDefaultContestObject(codeforces),
    });

    const createdUser = await newUser.save();
    console.log(createdUser);
    console.log("New user created.");
    if (process.env.NODE_ENV === "production") {
      // if(true){
      console.log("sending mail...");
      await sendEmail(newUser.email, newUser.name);
      sendWebhook_createAccount({
        imageURL: createdUser.picture,
        title: `${createdUser.name}`,
        username: createdUser.username,
        description: `UID: ${createdUser.uid} \nName: ${createdUser.name} \nUsername: ${createdUser.username} \nEmail: ${createdUser.email}`,
      });
    }
    return newUser;
  } catch (error) {
    if (error.code === 11000) {
      console.log(error);
      const key = Object.keys(error.keyValue)[0];
      const message = `User with this ${key} already exists`;
      const customError = new Error(message);
      customError.status = 200;
      throw customError;// Throw custom error object
    }
    console.error("Error:", error);
    throw new Error("Error creating user"); // Throw custom error object
  }
};

export { setUser };
