const jwt = require("jsonwebtoken");
const { getUser } = require("../services/getUser");
const { getAuth } = require("firebase-admin/auth");
const { admin } = require("../firebase-config.json"); // Update the path accordingly

async function addUID(request, response, next) {
  const authHeader = request.body.headers["Authorization"];
  const authToken = authHeader && authHeader.split(" ")[1]; // Get the token part after 'Bearer'

  if (!authToken) {
    return response
      .status(401)
      .json({ message: "User Not Authorised", error: "User Not Authorised" }); // Redirect to the login page
  }
  console.log(authToken);

  try {
    let decodedToken;
    getAuth()
      .verifyIdToken(authToken)
      .then((decTok) => {
        decodedToken = decTok.uid;
        request.uid = decodedToken;
        next();
      })
      .catch((err) => {
        console.log(err);
      });

    // Authentication successful, attach the user data to the request for later use
  } catch (error) {
    console.log(error);
    return response.status(403).json({
      message: "does not have access rights",
      error: "does not have access rights",
    }); // Redirect to the login page
  }
}

async function checkAuth(request, response, next) {
  const authHeader = request.headers["authorization"];
  const authToken = authHeader && authHeader.split(" ")[1]; // Get the token part after 'Bearer'

  if (!authToken) {
    return response
      .status(401)
      .json({ message: "User Not Authorised", error: "User Not Authorised" }); // Redirect to the login page
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(authToken);

    // Authentication successful, attach the user data to the request for later use
    request.uid = decodedToken.uid;
    next();
  } catch (error) {
    return response.status(403).json({
      message: "does not have access rights",
      error: "does not have access rights",
    }); // Redirect to the login page
  }
}

async function checkUserOwnership(req, res, next) {
  const userIdFromToken = req.userId;

  const usernameFromRequest = req.params.username; // Make sure to adjust this based on your route

  const userFromRequest = await getUser(usernameFromRequest);
  const userIdFromRequest = userFromRequest._id.toString(); // Convert to string

  console.log("From token:", userIdFromToken);
  console.log("From req:", userIdFromRequest);
  if (userIdFromToken !== userIdFromRequest) {
    return res.status(403).json({ error: "Forbidden" });
  }

  req.userId = userIdFromRequest;

  next();
}

module.exports = {
  checkAuth,
  addUID,
  // setJwtCookie,
  checkUserOwnership,
};
