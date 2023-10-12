import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

// Login a user and store the JWT token in a cookie
export async function loginUser({ username, password }) {
  try {
    const res = await axios.post("http://localhost:4001/user/login", {
      username,
      password,
    });
    console.log(res.status);
    
    if (res.status !== 200) {
      throw {
        statusCode: res.status,
        message: res.data.message,
      };
    }

    const token = res.data.token;
    Cookies.set("jwt", token, { secure: true });
    return res;
  } catch (error) {
    throw error;
  }
}

// Sign up a user
export async function signupUser({ username, firstName, email, password }) {
  try {
    const res = await axios.post("http://localhost:4001/user/signup", {
      firstName,
      username,
      email,
      password,
    });
    console.log(res.status);
    
    if (res.status !== 200) {
      throw {
        statusCode: res.status,
        message: res.data.message,
      };
    }

    return res;
  } catch (error) {
    throw error;
  }
}

// Get the username from the JWT token stored in a cookie
export function getUserNameFromCookie() {
  const jwtToken = Cookies.get("jwt");

  if (jwtToken) {
    const decodedToken = jwt_decode(jwtToken);
    // Access the user's name from the decoded token
    return decodedToken.name;
  } else {
    console.log("JWT token not found in the cookie.");
  }
}

// Check if a user is logged in based on the presence of a JWT token
export function isLoggedIn() {
  const jwtToken = Cookies.get("jwt");

  if (jwtToken) {
    const decodedToken = jwt_decode(jwtToken);
    // Check if the user's name is present in the decoded token
    return !!decodedToken.name;
  } else {
    return false;
  }
}

// Fetch user dashboard details using the JWT token for authorization
export async function userDashboardDetails() {
  const jwtToken = Cookies.get("jwt");

  try {
    const data = await axios.get("http://localhost:4001/user/dashboard", {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}
