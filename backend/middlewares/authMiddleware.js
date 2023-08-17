const jwt = require('jsonwebtoken');

function checkAuth(request, response, next) {
    const authToken = request.cookies.authToken;

    if (!authToken) {
        return response.status(401).json({ message: 'Authentication failed.' });
    }

    const secretKey = 'your_secret_key'; // Replace with your actual secret key

    jwt.verify(authToken, secretKey, (err, decodedToken) => {
        if (err) {
            return response.status(401).json({ message: 'Authentication failed.' });
        }

        // Authentication successful, attach the user data to the request for later use
        request.user = decodedToken;
        next();
    });
}

function setJwtCookie(req, res, next) {
    const { user } = req;
    if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
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
