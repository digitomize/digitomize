const bcrypt = require('bcrypt');
const { generateToken, setUser, getUser } = require('../../services/auth');
const { setJwtCookie } = require('../../middlewares/authMiddleware');


//? returns JSON message with Status Code
// Uses setUser to create a new user, then generates a token using generateToken, then sets the cookie using setJwtCookie.
const handleUserSignup = async (req, res) => {
  const { username, password, firstName, lastName, email, bio, dateOfBirth, phoneNumber, github, codechef, leetcode, codeforces } = req.body;
  // Validate required fields
  if (!username || !password || !firstName || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const userData = {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      email: email,
      bio: bio,
      dateOfBirth: dateOfBirth,
      phoneNumber: phoneNumber,
      github: github,
      codechef: codechef,
      leetcode: leetcode,
      codeforces: codeforces
    };

    const newUser = await setUser(userData); // Create a new user using setUser
    const token = generateToken(newUser); // Generate JWT token

    setJwtCookie(req, res, token, () => {
      res.status(201).json({ message: 'User created successfully' });
    });

  } catch (error) {
    console.error("Error:", error);
    if (error.status === 400) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Error creating user' });
  }
};

//? returns JSON message with Status Code
// Uses getUser to find the user, then checks the bcrypt password, then generates a token using generateToken, then sets the cookie using setJwtCookie.
const handleUserLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await getUser(username);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = generateToken(user);
    setJwtCookie(req, res, token, () => {
      res.status(200).json({ message: 'Login successful' });
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: 'Error logging in' });
  }
};

//? returns JSON message with Status Code
// Removes JWT cookie from the client by setting it to expired.
const handleUserSignout = async (req, res) => {
  try {
      res.cookie('jwt', '', { expires: new Date(0), httpOnly: true });

      res.status(200).json({ message: 'Signout successful' });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error signing out' });
  }
};

module.exports = {
  handleUserSignup,
  handleUserLogin,
  handleUserSignout
};
