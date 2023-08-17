const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key'; // Change this to a secure secret key
const User = require('../models/User');

const setUser = async (userData) => {
    try {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const newUser = new User({
            username: userData.username,
            password: hashedPassword,
        });
        await newUser.save();
        return newUser;
    } catch (error) {
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
    return jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });
};

module.exports = { setUser, getUser, generateToken };
