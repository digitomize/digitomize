import axios from "axios";
import { redirect } from "react-router-dom";
import { auth } from "./firebase";
const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export async function loginUser({ username, password }) {
  const res = await axios.post(`${backendUrl}/user/login`, {
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
          `${backendUrl}/user/dashboard`,
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
    `${backendUrl}/user/dashboard`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  console.log("RESPONSE ----> ", res);
  console.log(res.status);
}
