import axios from "axios";
import { redirect } from "react-router-dom";
import { auth } from "./firebase";
const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export async function loginUser({ username, password }) {
  const res = await axios.post(`${backendUrl}/user/login`, {
    username,
    password,
  });
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

    if (accessToken) {
      try {
        const response = await axios.get(`${backendUrl}/user/dashboard`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        return response;
      } catch (err) {
        console.log(err);
      }
    }
  }
}
export async function userProfileDetails(username) {
  try {
    const response = await axios.get(`${backendUrl}/user/profile/${username}`);
    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function leaderboardData(page = 1) {
  try {
    const response = await axios.get(
      `${backendUrl}/user/leaderboard?page=${page}`
    );
    return response;
  } catch (err) {
    console.log(err);
  }
}
export async function rankOnLeaderboard(username) {
  try {
    const response = await axios.get(
      `${backendUrl}/user/leaderboard?username=${username}`
    );
    console.log("response:", response);
    return response;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function uploadPictureToCloudinary(picture) {
  // generating signature so we can do signed uploads
  const { data } = await axios.get(`${backendUrl}/user/signImageUpload`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  const { signature, timestamp, public_id } = data
  const CLOUDINARY_API_KEY = import.meta.env.VITE_REACT_APP_CLOUDINARY_API_KEY
  const CLOUD_NAME = import.meta.env.VITE_REACT_APP_CLOUDINARY_CLOUD_NAME

  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`

  // creating New form data object with picture and other paramaters
  let cloudinaryformData = new FormData()
  cloudinaryformData.append('file', picture)
  cloudinaryformData.append('signature', signature)
  cloudinaryformData.append('timestamp', timestamp)
  cloudinaryformData.append('api_key', CLOUDINARY_API_KEY)
  cloudinaryformData.append("public_id", public_id);
  
  // making post request to clodinary to store the picture and updating form data to store the URL
  await axios.post(url, cloudinaryformData).then((res) => {
    formData.picture = res.data.url
  }
  ).catch((err) => {
    console.log('failed to upload profile picture');
    console.log(err);
  })
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

  uploadPictureToCloudinary(formData.picture)

  const res = await axios.post(`${backendUrl}/user/dashboard`, formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log("RESPONSE ----> ", res);
  console.log(res.status);
}

export async function getProfileData(username) {
  try {
    const response = await axios.get(`${backendUrl}/user/profile/${username}`);
    // console.log(response);
    return response.data;
  } catch (e) {
    console.error(e);
  }
}
