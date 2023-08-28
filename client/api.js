import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { redirect } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
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


export function isLoggedIn() {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      unsubscribe(); // Unsubscribe the listener once it's called
      if (currentUser) {
        console.log(currentUser);
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

export async function userDashboardDetails() {
  const loggedIn = await isLoggedIn();

  if (loggedIn) {
    const currentUser = auth.currentUser;
    const accessToken = await currentUser.getIdToken();

    console.log("before access token");
    console.log(accessToken);

    if (accessToken) {
      try {
        const response = await axios.get(
          "http://localhost:4001/user/dashboard",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        return response;
      } catch (err) {
        console.log(err);
      }
    }
  }
}

// export function isLoggedIn() {
//   const data = auth.onAuthStateChanged((currentUser) => {
//     if (currentUser) {
//       console.log(currentUser);
//       return true;
//     } else {
//       return false;
//     }
//   });
//   return data;
// }

// export async function userDashboardDetails() {
//   await isLoggedIn();
//   const accessToken = await auth.currentUser.accessToken;
//   console.log("befor access t");
//   console.log(accessToken);
//   if (accessToken) {
//     try {
//       const data = await axios.get("http://localhost:4001/user/dashboard", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       return data;
//     } catch (err) {
//       console.log(err);
//     }
//   }
// }

export async function submitUserFormData(formData) {
  // const jwtToken = Cookies.get("jwt");
  const loggedIn = await isLoggedIn();
  if (!loggedIn) {
    throw redirect("/login");
  }
  const currentUser = auth.currentUser;
  const accessToken = await currentUser.getIdToken();
  // console.log(jwtToken);
  const res = await axios.post(
    `http://localhost:4001/user/dashboard`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  console.log(res.status);
}
