import { setUser } from "../services/setUser.js";

const twitterUrlPattern = /^(?:https?:\/\/)?(?:www\.)?twitter\.com\/(?:#!\/)?[a-zA-Z0-9_]{1,15}(?:\/)?$/;
const linkedInUrlPattern = /^(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]{5,30}\/?$/;
const instagramUrlPattern = /^(?:https?:\/\/)?(?:www\.)?instagram\.com\/[a-zA-Z0-9_]{1,30}\/?$/;

// ? returns JSON message with Status Code
// Uses setUser to create a new user, then generates a token using generateToken, then sets the cookie using setJwtCookie.
function validateSocialUrls (social) {
  const patterns = {
    twitter: twitterUrlPattern,
    linkedin: linkedInUrlPattern,
    instagram: instagramUrlPattern,
  };

  for (const [platform, url] of Object.entries(social)) {
    if (url && !patterns[platform].test(url)) {
      return { error: `Invalid ${platform} URL` };
    }
  }
  return null;
}

const handleUserSignup = async (req, res) => {
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
    social,
    codechef,
    leetcode,
    codeforces,
  } = req.decodedToken;

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

  if (social) {
    const validationError = validateSocialUrls(social);
    if (validationError) {
      return res.status(400).json(validationError);
    }
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
      social,
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

export { handleUserSignup };
