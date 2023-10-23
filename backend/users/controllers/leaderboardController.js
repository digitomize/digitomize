import User from '../models/User.js';

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
      users = await User.find({ [`${platform}.rating`]: { $exists: true, $ne: null } });
      totalUsers = users.length;
      users.sort((a, b) => {
        const aRating = a[platform] ? a[platform].rating || 0 : 0;
        const bRating = b[platform] ? b[platform].rating || 0 : 0;
        return bRating - aRating;
      });
      users = users.slice((page - 1) * pageSize, page * pageSize);
    } else {
      users = await User.find();
      totalUsers = users.length;
      console.log(totalUsers);
      users.sort((a, b) => b.digitomize_rating - a.digitomize_rating);
      // console.log("Sorted:", users);
      users = users.slice((page - 1) * pageSize, page * pageSize);
    }

    const total_pages = Math.ceil(totalUsers / pageSize);
    const users_in_page = users.length;

    const leaderboard = users.map((user) => {
      const platformRating = user[req.query.platform] ? user[req.query.platform].rating : null;

      const userRatings = {
        codechef: user.codechef ? user.codechef.rating : null,
        leetcode: user.leetcode ? user.leetcode.rating : null,
        codeforces: user.codeforces ? user.codeforces.rating : null,
      };

      return {
        username: user.username,
        picture: user.picture,
        name: user.name,
        ...userRatings,
        digitomize_rating: user.digitomize_rating,
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
      leaderboard,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { getLeaderboard };
