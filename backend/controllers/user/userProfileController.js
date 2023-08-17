const { getUser } = require('../../services/auth');

const handleUserProfilePreview = async (req, res) => {
  try {
    const username = req.params.username;

    // Fetch the user's data from the database
    const user = await getUser(username);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Prepare the public user data object
    const publicUserData = {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    };

    // Add fields with showOnWebsite set to true
    if (user.bio.showOnWebsite) {
      publicUserData.bio = user.bio.data;
    }
    if (user.dateOfBirth.showOnWebsite) {
      publicUserData.dateOfBirth = user.dateOfBirth.data;
    }
    if (user.phoneNumber.showOnWebsite) {
      publicUserData.phoneNumber = user.phoneNumber.data;
    }
    if (user.github.showOnWebsite) {
      publicUserData.github = user.github.data;
    }
    if (user.codechef.showOnWebsite) {
      publicUserData.codechef = {
        username: user.codechef.username,
        rating: user.codechef.rating,
        badge: user.codechef.badge
      };
    }
    if (user.leetcode.showOnWebsite) {
      publicUserData.leetcode = {
        username: user.leetcode.username,
        rating: user.leetcode.rating,
        badge: user.leetcode.badge
      };
    }
    if (user.codeforces.showOnWebsite) {
      publicUserData.codeforces = {
        username: user.codeforces.username,
        rating: user.codeforces.rating,
        badge: user.codeforces.badge
      };
    }

    res.json(publicUserData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error fetching user profile' });
  }
};

module.exports = {
  handleUserProfilePreview
};
