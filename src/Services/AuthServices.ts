import axios from "axios";

export async function login(loginData) {
  const response = await axios.post("http://localhost:8800/auth/login", {
    username: loginData.UserName,
    password: loginData.Password,
  });
  return {
    token: response.data.token,
    user: response.data.user,
    message: response.data.message,
  };
}
