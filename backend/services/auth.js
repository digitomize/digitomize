const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'mykey'; // Change this to a secure secret key
const User = require('../models/user/User');

const setUser = async (userData) => {
  try {
    const { username, password, firstName, lastName, email, bio, dateOfBirth, phoneNumber, github, codechef, leetcode, codeforces } = userData;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      firstName,
      lastName,
      email,
      bio,
      dateOfBirth,
      phoneNumber,
      github,
      codechef,
      leetcode,
      codeforces
    });

    await newUser.save();
    return newUser;
  } catch (error) {
    if (error.code === 11000) {
      const key = Object.keys(error.keyValue)[0];
      const message = `User with this ${key} already exists`;
      return Promise.reject({ status: 400, message });
    }
    console.error("Error:", error);
    throw new Error('Error creating user');
  }
};




const getUser = async (username) => {
    try {
        const user = await User.findOne({ username });
        return user;
    } catch (error) {
        throw new Error('User not found');
    }
};

const generateToken = (user) => {
    return jwt.sign({ userId: user._id }, secretKey);
};

module.exports = { setUser, getUser, generateToken };
