const User = require('../models/user/User');

const getUser = async (identifier) => {
    try {
      const user = await User.findOne({
        $or: [{ username: identifier }, { email: identifier }]
      });
      return user;
    } catch (error) {
      throw new Error('User not found');
    }
  };
  

module.exports = {
    getUser
}