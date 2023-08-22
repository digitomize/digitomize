const User = require('../../models/user/User');

const handleUserDashboard = async (req, res) => {
  try {
    // Check if user is logged in using the checkAuth middleware
    if (!req.userId) {
      // User is not logged in, redirect to the login page
      return res.redirect('/login');
    }

    // User is logged in, fetch user data from the database
    const userId = req.userId;
    const user = await User.findById(userId)
      .select('-_id -password -createdAt -updatedAt -__v');

    if (!user) {
      // User not found, redirect to the login page
      return res.redirect('/login');
    }

    // Construct the JSON response with all fields
    const jsonResponse = {
      personal_data: {
        username: user.username,
        firstName: user.firstName,
        email: user.email,
        email_show: user.email_show,
        lastName: user.lastName || null,
        bio: {
          data: user.bio.data || null, showOnWebsite: user.bio.showOnWebsite
        },
        phoneNumber: {
          data: user.phoneNumber.data || null, showOnWebsite: user.phoneNumber.showOnWebsite
        },
        dateOfBirth: {
          data: user.dateOfBirth.data || null, showOnWebsite: user.dateOfBirth.showOnWebsite
        }
      },
      github: {
        data: user.github.data || null,
        showOnWebsite: user.github.showOnWebsite,
      },
      ratings: {
        codeforces: {
          data: user.codeforces.username || null,
          showOnWebsite: user.codeforces.showOnWebsite,
        },
        codechef: {
          data: user.codechef.username || null,
          showOnWebsite: user.codechef.showOnWebsite,
        },
        leetcode: {
          data: user.leetcode.username || null,
          showOnWebsite: user.leetcode.showOnWebsite,
        }
      }
    };
    // console.log(jsonResponse);
    // Send the JSON response to the client
    res.json(jsonResponse);
  } catch (error) {
    console.error('Error:', error);
    // Internal server error, send a 500 Internal Server Error status
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  handleUserDashboard,
};