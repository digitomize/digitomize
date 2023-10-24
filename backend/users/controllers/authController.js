import { setUser } from '../services/setUser.js';

//? returns JSON message with Status Code
// Uses setUser to create a new user, then generates a token using generateToken, then sets the cookie using setJwtCookie.
const handleUserSignup = async (req, res) => {
  let {
    uid, username, name , picture, email_verified, email, email_show, bio, dateOfBirth, phoneNumber, github, codechef, leetcode, codeforces
  } = req.decodedToken;

  if (!username) {
    username = req.body?.username;
  }
  if (!name) {
    name = req.body?.name;
  }
  // Validate required fields
  if (!uid) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  // console.log(uid);
  try {
    const userData = {
      uid, username, name, picture, email_verified, email, email_show, bio, dateOfBirth, phoneNumber, github, codechef, leetcode, codeforces
    };

    const newUser = await setUser(userData); // Create a new user using setUser
    // console.log(newUser);
    res.status(201).json({ message: 'User created successfully' });

  } catch (error) {
    console.error("Error:", error);
    if (error.status === 400) {
      return res.status(400).json({ error: error.message });
    }
    if (error.status === 200) {
      return res.status(200).json({ message: "User already exists." });
    }
    res.status(500).json({ error: 'Error creating user' });
  }
};

export { handleUserSignup };