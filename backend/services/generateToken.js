const jwt = require('jsonwebtoken');
const secretKey = 'mykey'; // Change this to a secure secret key

const generateToken = (user) => {
  return jwt.sign({ userId: user._id, name: user.firstName }, secretKey);
};

module.exports = {
    generateToken
}