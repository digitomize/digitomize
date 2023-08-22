const jwt = require('jsonwebtoken');
const secretKey = 'mykey'; // Change this to a secure secret key

function checkLoggedIn(request, response) {
    const authHeader = request.headers['authorization'];
    const authToken = authHeader && authHeader.split(' ')[1]; // Get the token part after 'Bearer'

    if (!authToken) {
        return response.status(404).json({ error: "No Token found", message: "No Token found" }); // Redirect to the login page
    }
    jwt.verify(authToken, secretKey, (err, decodedToken) => {
        if (err) {
            return response.status(404).json({ message: "Invalid Token" }); // Redirect to the login page
        }

        // Authentication successful, attach the user data to the request for later use
        console.log("decodedtoken:", decodedToken);
        return response.status(200).json({
            message: "Valid Token",
            name: decodedToken.name
        })
    });
};


module.exports = {
    checkLoggedIn
}