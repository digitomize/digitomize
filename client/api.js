import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { redirect } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

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
}
// export async function signupUser({ username, firstName, email, password }) {
//   const res = await axios.post("http://localhost:4001/user/signup", {
//     firstName,
//     username,
//     email,
//     password,
//   });
//   console.log(res.status);
//   if (res.status !== 201) {
//     throw {
//       statusCode: res.status,
//       message: res.data.error,
//     };
//   }

//   const token = res.data.token;
//   Cookies.set("jwt", token, { secure: true });
//   return res;
// }

// export async function signupUser({ username, firstName, email, password }) {
//   await createUserWithEmailAndPassword(auth, email, password)
//     .then((res) => {
//       auth.currentUser.getIdToken(true).then((idToken) => {
//         console.log(idToken);
//       });
//       return res;
//     })
//     .catch((err) => {
//       return err.message;
//     });
// }

// export function getUserNameFromCookie() {
//   const jwtToken = Cookies.get("jwt");

//   if (isLoggedIn()) {
//     // Decode the JWT token
//     const decodedToken = jwt_decode(jwtToken);

//     // Now you can access the payload data from the decoded token
//     return decodedToken.name;
//   } else {
//     console.log("JWT token not found in the cookie.");
//   }
// }

export function isLoggedIn() {
  const jwtToken = Cookies.get("jwt");

  if (jwtToken) {
    // Decode the JWT token
    const decodedToken = jwt_decode(jwtToken);
    console.log("IS LOG IN FUNCTION CALLED NEED TO BE CHANGED");
    // Now you can access the payload data from the decoded token
    if (decodedToken.name) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export async function userDashboardDetails() {
  // const jwtToken = Cookies.get("jwt");
  const currentUserToken = auth.currentUser.accessToken;
  console.log("THIS CALLED");

  try {
    const data = await axios.get("http://localhost:4001/user/dashboard", {
      headers: {
        Authorization: `Bearer ${currentUserToken}`,
      },
    });
    return data;
  } catch (err) {
    return err;
  }
}

export async function submitUserFormData(formData) {
  // const jwtToken = Cookies.get("jwt");
  const currentUserToken = auth.currentUser.accessToken;
  // console.log(jwtToken);
  const res = await axios.post(
    `http://localhost:4001/user/profile/${formData.username}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${currentUserToken}`,
      },
    }
  );
  console.log(res.status);
}
