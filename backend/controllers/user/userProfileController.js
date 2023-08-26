const { getUser } = require('../../services/getUser');

// ?returns JSON
// Sends only toggled ON info for any user
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
      personal_data: {
        uid: user.uid,
        username: user.username,
        name: user.name,
        picture: user.picture,
        email_verified: user.email_verified,
        email: user.email_show ? user.email : null,
        // email_show: user.email_show,
        bio: user.bio.showOnWebsite ? user.bio.data : null,
        dateOfBirth: user.dateOfBirth.showOnWebsite ? user.dateOfBirth.data : null,
        phoneNumber: user.phoneNumber.showOnWebsite ? user.phoneNumber.data : null
      },
      github: {
        data: user.github.showOnWebsite ? user.github.data : null
      },
      ratings: {}
    };

    // Handle coding platforms
    handleCodingPlatform(publicUserData.ratings, user.codechef, 'codechef');
    handleCodingPlatform(publicUserData.ratings, user.leetcode, 'leetcode');
    handleCodingPlatform(publicUserData.ratings, user.codeforces, 'codeforces');

    res.json(publicUserData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error fetching user profile' });
  }
};

function handleCodingPlatform(targetObject, platform, platformKey) {
  if (platform.showOnWebsite) {
    targetObject[platformKey] = {
      username: platform.username || null,
      rating: platform.rating || null,
      badge: platform.badge || null
    };
  } else {
    targetObject[platformKey] = {
      username: null,
      rating: null,
      badge: null
    };
  }
}

module.exports = {
  handleUserProfilePreview
};