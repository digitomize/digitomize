const jwt = require('jsonwebtoken');
const { getUser } = require('../services/getUser');

function checkAuth(request, response, next) {
    // const authToken = request.cookies.jwt;

    const authHeader = request.headers['authorization'];
    const authToken = authHeader && authHeader.split(' ')[1]; // Get the token part after 'Bearer'
  
    if (!authToken) {
        return response.redirect('/login'); // Redirect to the login page
    }

    const secretKey = 'mykey'; // Replace with your actual secret key

    jwt.verify(authToken, secretKey, (err, decodedToken) => {
        if (err) {
            return response.redirect('/login'); // Redirect to the login page
        }

        // Authentication successful, attach the user data to the request for later use
        // console.log("decodedtoken:", decodedToken);
        request.userId = decodedToken.userId;
        next();
    });
}


// function setJwtCookie(req, res, token, next) {
//     if (token) {
//         res.cookie('jwt', token, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production', // Use 'secure' only in production
//         });
//     }
//     next();
// }

// const { ObjectId } = require('mongoose').Types;

async function checkUserOwnership(req, res, next) {
    const userIdFromToken = req.userId;

    const usernameFromRequest = req.params.username; // Make sure to adjust this based on your route

    const userFromRequest = await getUser(usernameFromRequest);
    const userIdFromRequest = userFromRequest._id.toString(); // Convert to string

    console.log("From token:",userIdFromToken);
    console.log("From req:",userIdFromRequest);
    if (userIdFromToken !== userIdFromRequest) {
        return res.status(403).json({ error: 'Forbidden' });
    }

    req.userId = userIdFromRequest;

    next();
}


module.exports = {
    checkAuth,
    // setJwtCookie,
    checkUserOwnership
};
