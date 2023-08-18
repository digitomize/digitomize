import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export async function loginUser({ username, password }) {
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
  ``;
  const token = res.data.token;
  Cookies.set("jwt", token, { secure: true });
  return res;
}
export async function signupUser({ username, firstName, email, password }) {
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
}

export function getUserNameFromCookie() {
  const jwtToken = Cookies.get("jwt");

  if (jwtToken) {
    // Decode the JWT token
    const decodedToken = jwt_decode(jwtToken);

    // Now you can access the payload data from the decoded token
    return decodedToken.name;
  } else {
    console.log("JWT token not found in the cookie.");
  }
}
