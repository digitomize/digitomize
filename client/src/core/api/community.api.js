import axios from 'axios'
import { isLoggedIn } from '../../../api'
import { auth } from '../../../firebase'
import { BACKEND_URL } from '../utils/const'

export const getCommunityList = async (body) => {
  const loggedIn = await isLoggedIn()

  if (loggedIn) {
    const currentUser = auth.currentUser
    const accessToken = await currentUser.getIdToken()

    if (accessToken) {
      try {
        return axios.get(`${BACKEND_URL}/community`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
      } catch (err) {
        return new Promise((resolve, reject) => {
          reject({ err })
        })
      }
    }
  }
}

export const createCommunity = async (body) => {
  const loggedIn = await isLoggedIn()

  if (loggedIn) {
    const currentUser = auth.currentUser
    const accessToken = await currentUser.getIdToken()

    if (accessToken) {
      try {
        return axios.post(`${BACKEND_URL}/community`, body, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
      } catch (err) {
        return new Promise((resolve, reject) => {
          reject({ err })
        })
      }
    }
  }
}
