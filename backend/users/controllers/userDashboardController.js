import User from '../models/User.js';

 const handleUserDashboard = async (req, res) => {
  try {
    // Check if user is logged in using the checkAuth middleware
    // if (!req.userId) {
    //   // User is not logged in, redirect to the login page
    //   return res.redirect('/login');
    // }

    // User is logged in, fetch user data from the database
    const userId = req.decodedToken.uid;
    const user = await User.findOne({ uid: userId })
      .select('-_id -password -createdAt -updatedAt -__v');

    if (!user) {
      // User not found, redirect to the login page
      return res.status(404).json({ message: "User not found", error: "User not found" });
    }

    // Construct the JSON response with all fields
    const jsonResponse = {
      personal_data: {
        uid: user.uid,
        username: user.username,
        name: user.name,
        picture: user.picture,
        email_verified: user.email_verified,
        email: user.email,
        email_show: user.email_show,
        skills: user.skills,
        education: user.education,
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
        },
        digitomize_rating: user.digitomize_rating,
      }
    };
    console.log(jsonResponse);
    // console.log(jsonResponse.education);
    // Send the JSON response to the client
    res.status(200).json(jsonResponse);
  } catch (error) {
    console.error('Error:', error);
    // Internal server error, send a 500 Internal Server Error status
    res.status(500).json({ error: 'Internal server error' });
  }
};

export {handleUserDashboard};