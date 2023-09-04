const { getUser } = require('../services/getUser');
const { codeforces_u } = require('./platforms/codeforcesUpdater');
const { codechef_u } = require('./platforms/codechefUpdater'); // Import your CodeChef updater function
const { leetcode_u } = require('./platforms/leetcodeUpdater'); // Import your LeetCode updater function
const { updateUser } = require('../services/updateUser');

// Mapping of platform names to their updater functions
const platformUpdaters = {
  codeforces: codeforces_u,
  codechef: codechef_u,       // Replace with your CodeChef updater function
  leetcode: leetcode_u        // Replace with your LeetCode updater function
};

const handleUserPlatformUpdate = async (username, platform) => {
  const updater = platformUpdaters[platform];
  if (updater) {
    return await updater(username);
  }
  return null; // Handle unsupported platform case if needed
};

// Updates user data in DB
const handleUserDataUpdate = async (user) => {
  const currentTime = new Date();
  
  let changes = false;
  for (const platformKey of ['codeforces', 'codechef', 'leetcode']) {
  // for (const platformKey of ['codeforces']) {
    const platformData = user[platformKey];
    if (platformData.showOnWebsite && platformData.fetchTime + 12 * 60 * 60 * 1000 < currentTime) {
      const newData = await handleUserPlatformUpdate(platformData.username, platformKey);
      console.log("newData", newData);
      if (newData) {
        changes = true;
        platformData.attendedContestsCount = newData.attendedContestsCount;
        platformData.username = newData.handle;
        platformData.rating = parseInt(newData.rating);
        platformData.badge = newData.rank;
        platformData.fetchTime = currentTime;
      }
    }
  }

  // Save the updated user object in MongoDB
  if (changes) {
    await updateUser(user);
  }
};

// Handle user profile preview route
const handleUserProfilePreview = async (req, res) => {
  try {
    const username = req.params.username;

    // Fetch the user's data from the database
    const user = await getUser(username);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await handleUserDataUpdate(user);

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
      attendedContestsCount: platform.attendedContestsCount || null,
      badge: platform.badge || null
    };
  } else {
    targetObject[platformKey] = {
      username: null,
      rating: null,
      attendedContestsCount: null,
      badge: null
    };
  }
}

module.exports = {
  handleUserProfilePreview
};
