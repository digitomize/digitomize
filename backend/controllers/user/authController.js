// ? functions for login/signup/logout
const User = require("../../models/user/User");

async function handleUserSignup(req, res) {
    const { username, firstName, password } = req.body;
    await User.create({
        username,
        firstName,
        password,
    });
    return res.json({ message: "User created." });
}

module.exports = {
    handleUserSignup,
}