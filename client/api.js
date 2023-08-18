import axios from "axios";

export async function loginUser({ username, password }) {
  const res = await axios.post("http://localhost:4001/user/login", {
    username: username,
    password: password,
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
