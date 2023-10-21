import User from '../models/User.js';

const weightage = {
  codechef: 1.333,
  leetcode: 1.0,
  codeforces: 1.2,
  digitomize_rating: 1.142,
};

const calculateDigitomizeRating = (user) => {
  let ratings = {
    codechef: null,
    leetcode: null,
    codeforces: null,
  };
  let digitomizeRating = 0;

  for (const platform in ratings) {
    if (user[platform] && user[platform].rating && weightage[platform]) {
      const platformRating = {
        rating: user[platform].rating,
        digitomizeRating: user[platform].rating * weightage[platform],
      };
      ratings[platform] = platformRating;
      if (platformRating.digitomizeRating > digitomizeRating) {
        digitomizeRating = platformRating.digitomizeRating;
      }
    }
  }

  return { ratings, digitomizeRating };
};

const getLeaderboard = async (req, res) => {
  try {
    const pageSize = 5; // Number of users per page
    let page = parseInt(req.query.page) || 1;
    if (page < 1) {
      page = 1;
    }

    let users;
    let totalUsers;

    if (req.query.platform) {
      const platform = req.query.platform.toLowerCase();
      users = await User.find({ [`${platform}.rating`]: { $exists: true, $ne: null } })
        .limit(pageSize)
        .skip((page - 1) * pageSize);
      totalUsers = await User.countDocuments({ [`${platform}.rating`]: { $exists: true, $ne: null } });
    } else {
      users = await User.find()
        .limit(pageSize)
        .skip((page - 1) * pageSize);
      totalUsers = await User.countDocuments();
    }

    const total_pages = Math.ceil(totalUsers / pageSize);
    const users_in_page = users.length;

    const leaderboard = users.map((user) => {
      const { ratings, digitomizeRating } = calculateDigitomizeRating(user);
      const platformRating = ratings[req.query.platform] ? ratings[req.query.platform].rating : null;

      const userRatings = {};
      for (const platform in ratings) {
        userRatings[platform] = ratings[platform] ? ratings[platform].rating : null;
      }

      return {
        username: user.username,
        ...userRatings,
        digitomize_rating: digitomizeRating,
        platform_rating: platformRating,
      };
    });

    if (req.query.platform) {
      leaderboard.sort((a, b) => {
        const aRating = a.platform_rating || 0;
        const bRating = b.platform_rating || 0;
        return bRating - aRating;
      });
    } else {
      leaderboard.sort((a, b) => b.digitomize_rating - a.digitomize_rating);
    }

    res.json({
      total_users: totalUsers,
      users_in_page,
      total_pages,
        current_page: page,
        leaderboard
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { getLeaderboard };