// controllers/user/userController.js

const bcrypt = require('bcrypt');
const User = require('../../models/user/User');
const { generateToken, setUser, getUser } = require('../../services/auth');
const { setJwtCookie } = require('../../middleware/authMiddleware');

const handleUserSignup = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userData = {
      username: username,
      password: password,
    };
    const newUser = await setUser(userData); // Create a new user using setUser
    const token = generateToken(newUser); // Generate JWT token

    setJwtCookie(res, token); // Set the JWT token in a cookie using the middleware

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
};

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
    setJwtCookie(res, token); // Set the JWT token in a cookie using the middleware
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
};

module.exports = {
    handleUserSignup,
    handleUserLogin
};
