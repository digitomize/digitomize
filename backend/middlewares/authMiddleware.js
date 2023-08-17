const jwt = require('jsonwebtoken');

function checkAuth(request, response, next) {
    const authToken = request.cookies.jwt;

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


function setJwtCookie(req, res, token, next) {
    if (token) {
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use 'secure' only in production
        });
    }
    next();
}


module.exports = {
    checkAuth,
    setJwtCookie
};
