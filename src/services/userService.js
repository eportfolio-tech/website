import axios from "../helper/axios";

export const userService = {
  login,
  // logout,
  signup,
};

async function login(username, password) {
  const response = await axios.post("/authentication/login", null, {
    params: {
      username: username,
      password: password,
    },
  });
  const user = response.data.data;
  localStorage.setItem("user", JSON.stringify(user));
  return user;
}

// async function logout() {
//   await axios.post("/api/auth/logout/", null, null);
//   // remove user from local storage to log user out
//   localStorage.removeItem("user");
// }

async function signup(userInfo) {
  const response = await axios.post("/authentication/signup", {
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    email: userInfo.email,
    password: userInfo.password,
    username: userInfo.username,
    title: userInfo.title,
    phone: userInfo.phone,
  });
  return response.data;
}
