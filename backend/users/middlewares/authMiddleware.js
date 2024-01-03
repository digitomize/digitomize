import { getUser } from "../services/getUser.js";
import { getAuth } from "firebase-admin/auth";
import User from "../models/User.js";
import { ROLE } from "../../core/const.js";
import { sendRequestLog } from "../../services/discord-webhook/routeLog.js";
import admin from "firebase-admin";

const addUID = async (request, response, next) => {
  const authHeader =
    request?.body?.headers?.Authorization ||
    request?.body?.headers?.authorization ||
    request?.headers?.authorization ||
    request?.headers?.Authorization ||
    request?.Authorization ||
    request?.authorization;
  const authToken = authHeader && authHeader.split(" ")[1];
  if (!authToken) {
    return response.status(401).json({
      message: "User Not Authorised",
      error:
        "Authentication required. Please include an 'Authorization' header with a valid Bearer token.",
    }); // Redirect to the login page
  }

  try {
    getAuth()
      .verifyIdToken(authToken)
      .then((decTok) => {
        request.decodedToken = decTok;
        // console.log("calling next");
        next();
      })
      .catch((err) => {
        console.log(err);
        return response.status(401).json({
          message: "Invalid or expired token",
          error: "Invalid or expired token",
        });
      });

    // Authentication successful, attach the user data to the request for later use
  } catch (error) {
    console.log(error);
    return response.status(403).json({
      message: "Access forbidden",
      error: "Access forbidden",
    }); // Redirect to the login page
  }
};

const checkAuth = async (request, response, next) => {
  const authHeader = request.headers.authorization;
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
};

const checkUserOwnership = async (req, res, next) => {
  const userUIDFromToken = req.decodedToken.uid;

  const usernameFromRequest = req.params.username; // Make sure to adjust this based on your route

  const userFromRequest = await getUser(usernameFromRequest);
  // console.log(userFromRequest);
  const userUIDFromRequest = userFromRequest.uid.toString(); // Convert to string

  // console.log("From token:", userIdFromToken);
  // console.log("From req:", userIdFromRequest);
  if (userUIDFromToken !== userUIDFromRequest) {
    return res.status(403).json({ error: "Forbidden" });
  }

  req.userId = userUIDFromRequest;

  next();
};

const dgmAdminCheck = async (request, response, next) => {
  const { decodedToken } = request;
  const userId = decodedToken.uid;
  // Check If User has admin role
  const user = await User.findOne({ uid: userId }).select(
    "-_id -password -createdAt -updatedAt -__v",
  );

  if (!user) {
    // User not found, redirect to the login page
    return response
      .status(404)
      .json({ message: "User not found", error: "User not found" });
  }

  if (user.role !== ROLE.ADMIN) {
    return response.status(403).json({
      message: "You don't have sufficient permission",
      error: "You don't have sufficient permission",
    });
  }
  next();
};
const routeLogging = async (req, response, next) => {
  // const logData = {
  //   method: req.method,
  //   url: req.originalUrl,
  //   headers: req.headers,
  //   query: req.query,
  //   body: req.body,
  //   ip: req.ip,
  //   userAgent: req.get("User-Agent"),
  //   cookies: req.cookies,
  //   timestamp: new Date().toISOString(),
  // };

  try {
    sendRequestLog(req);
  } catch (error) {
    console.log(error);
  }

  // Continue with the request handling
  next();
};

export { addUID, checkAuth, checkUserOwnership, dgmAdminCheck, routeLogging };
