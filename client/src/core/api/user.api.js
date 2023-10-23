import axios from "axios";
import { isLoggedIn } from "../../../api";
import { auth } from "../../../firebase";
import { BACKEND_URL } from "../utils/const";

export const getUserData = async () => {
  const loggedIn = await isLoggedIn();

  if (loggedIn) {
    const currentUser = auth.currentUser;
    const accessToken = await currentUser.getIdToken();

    if (accessToken) {
      try {
        return axios.get(`${BACKEND_URL}/user/dashboard`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      } catch (err) {
        return new Promise((resolve, reject) => {
          reject({ err });
        });
      }
    }
  }
  return new Promise((resolve, reject) => {
    reject({ auth: false });
  });
};

export const getUserList = async () => {
  const loggedIn = await isLoggedIn();

  if (loggedIn) {
    const currentUser = auth.currentUser;
    const accessToken = await currentUser.getIdToken();

    if (accessToken) {
      try {
        return axios.get(`${BACKEND_URL}/admin/user-list`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      } catch (err) {
        return new Promise((resolve, reject) => {
          reject({ err });
        });
      }
    }
  }
  return new Promise((resolve, reject) => {
    reject({ auth: false });
  });
};

export const updateUserData = async (body) => {
  const loggedIn = await isLoggedIn();

  if (loggedIn) {
    const currentUser = auth.currentUser;
    const accessToken = await currentUser.getIdToken();

    if (accessToken) {
      try {
        return axios.put(`${BACKEND_URL}/admin/user`, body, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      } catch (err) {
        return new Promise((resolve, reject) => {
          reject({ err });
        });
      }
    }
  }
  return new Promise((resolve, reject) => {
    reject({ auth: false });
  });
};
