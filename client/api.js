import axios from "axios";
import { redirect } from "react-router-dom";
import { auth } from "./firebase";
import { updateProfile } from "firebase/auth";
import { PlaySquare } from "lucide-react";
import { toast } from "react-toastify";
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

// export async function sendDeviceID(data) {
//   console.log("api invoked");
//   const loggedIn = await isLoggedIn();

//   if (loggedIn) {
//     const currentUser = auth.currentUser;
//     const accessToken = await currentUser.getIdToken();

//     if (accessToken) {
//       try {
//         data = {"deviceID":data};
//         const response = await axios.post(`${backendUrl}/user/notifs`, data, {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });
//         return response;
//       } catch (error) {
//         console.error(error);
//         throw new Error(`Failed to send device ID: ${error.message}`);
//       }
//     }
//   }
// }

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

export async function changeUserPreferences(platform, prefer) {
  const loggedIn = await isLoggedIn();

  if (loggedIn) {
    const currentUser = auth.currentUser;
    const accessToken = await currentUser.getIdToken();

    if (accessToken) {
      try {
        const response = await axios.post(
          `${backendUrl}/user/preferences`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
              platform: platform,
              preference: prefer,
          },
        );
        // console.log("RESPONSEEEE:", response);
        return response;
      } catch (err) {
        // console.log("ERRRR:",err);
        throw new Error(err.response.data.message);
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

export async function leaderboardData(page = 1, platform) {
  try {
    // console.log(platform);
    if (platform && platform.length != 0) {
      const response = await axios.get(
        `${backendUrl}/user/leaderboard?page=${page}&platform=${platform}`,
      );

      return response;
    } else {
      const response = await axios.get(
        `${backendUrl}/user/leaderboard?page=${page}`,
      );

      return response;
    }
  } catch (err) {
    console.log(err);
  }
}
export async function rankOnLeaderboard(username) {
  try {
    const response = await axios.get(
      `${backendUrl}/user/leaderboard?username=${username}`,
    );
    return response;
  } catch (err) {
    console.log(err);
    return null;
  }
}

// generating signature so we can do signed uploads
async function uploadPictureToCloudinary(formData, accessToken, uid) {
  const { data } = await axios.get(`${backendUrl}/user/signImageUpload`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const { signature, timestamp, public_id } = data;
  const CLOUDINARY_API_KEY = import.meta.env.VITE_REACT_APP_CLOUDINARY_API_KEY;
  const CLOUD_NAME = import.meta.env.VITE_REACT_APP_CLOUDINARY_CLOUD_NAME;

  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;

  // creating New form data object with picture and other paramaters
  let cloudinaryformData = new FormData();
  cloudinaryformData.append("file", formData.picture);
  cloudinaryformData.append("folder", "users");
  cloudinaryformData.append("signature", signature);
  cloudinaryformData.append("timestamp", timestamp);
  cloudinaryformData.append("api_key", CLOUDINARY_API_KEY);
  cloudinaryformData.append("public_id", public_id);

  // making post request to cloudinary to store the picture and updating form data to store the URL
  await axios
    .post(url, cloudinaryformData)
    .then((res) => {
      // console.log(timestamp);
      // console.log(res.data);
      const photo = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/ar_1.0,c_fill,g_face/f_auto/r_max/v${res.data.version}/users/${uid}.${res.data.format}`;
      formData.picture = photo;
      updateProfile(auth.currentUser, {
        photoURL: photo,
      });

      setTimeout(() =>
        window.location.reload(), 3000,
      );
    })
    .catch((err) => {
      console.log("failed to upload profile picture");
      console.log(err);
    });
}

export async function submitUserFormData(formData) {
  // const jwtToken = Cookies.get("jwt");
  const loggedIn = await isLoggedIn();
  if (!loggedIn) {
    throw redirect("/login");
  }

  /* Throw an error if the entered username is an URL. */
  const urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
    "(\\#[-a-z\\d_]*)?$",
    "i",
  ); // fragment locator

  if (
    Object.keys(formData).some((platform) =>
      urlPattern.test(formData[platform]?.username),
    )
  ) {
    throw new Error("Invalid Username. Usernames should not be URLs.");
  }

  const currentUser = auth.currentUser;
  // console.log(currentUser);
  const accessToken = await currentUser.getIdToken();
  // console.log(jwtToken);
 
    // console.log(formData.picture);
    const res = await axios.post(`${backendUrl}/user/dashboard`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  // console.log("RESPONSE ----> ", res);
  // console.log(res.status);
}

export async function submitUserImage(formData) {
  // const jwtToken = Cookies.get("jwt");
  const loggedIn = await isLoggedIn();
  if (!loggedIn) {
    throw redirect("/login");
  }

  /* Throw an error if the entered username is an URL. */
  const urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i",
  ); // fragment locator

  if (
    Object.keys(formData).some((platform) =>
      urlPattern.test(formData[platform]?.username),
    )
  ) {
    throw new Error("Invalid Username. Usernames should not be URLs.");
  }

  const currentUser = auth.currentUser;
  // console.log(currentUser);
  const accessToken = await currentUser.getIdToken();
  // console.log(jwtToken);
  await uploadPictureToCloudinary(formData, accessToken, currentUser.uid);
  // console.log(formData.picture);
  const res = await axios.post(`${backendUrl}/user/dashboard`, formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (
    res?.status === 200 &&
    !["ERR_BAD_REQUEST", "ERR_NETWORK"].includes(res?.code)
  ) {
    toast.success("Profile Image updated successfully", {
      position: "top-left",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  } else if (res?.response?.data?.message) {
    toast.error(res.response.data.message, {
      position: "top-left",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    }); // Show specific error message from server
  } else {
    toast.error("Profile image update failed. Please try again.", {
      position: "top-left",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  // console.log("RESPONSE ----> ", res);
  // console.log(res.status);
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
