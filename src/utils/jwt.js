import axios from "axios";
import { jwtDecode } from "jwt-decode";
// import { verify, sign } from "jsonwebtoken";
//
// import axios from "./axios";

// ----------------------------------------------------------------------

const isValidToken = (accessToken) => {
  console.log('accessToken', accessToken)
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode(accessToken);
  console.log('decoded', decoded)
  const currentTime = Date.now() / 1000;
  console.log(' decoded.exp > currentTime',  decoded.exp > currentTime)

  return decoded.exp > currentTime;
};

const handleTokenExpired = (exp) => {
  let expiredTimer;

  window.clearTimeout(expiredTimer);
  const currentTime = Date.now();
  const timeLeft = exp * 5000 - currentTime;
  // console.log('timeLeft' , timeLeft);
  expiredTimer = window.setTimeout(() => {
    // console.log("expired");
    // You can do what ever you want here, like show a notification
  }, timeLeft);
};

const setSession = (user, accessToken) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("user", JSON.stringify(user));
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    // This function below will handle when token is expired
    const { exp } = jwtDecode(accessToken);
    console.log("exp", exp);
    handleTokenExpired(exp);
  } else {
    // localStorage.removeItem("accessToken");
    // localStorage.removeItem("user");
    delete axios.defaults.headers.common.Authorization;
  }
};

export { isValidToken, setSession };
// export { isValidToken, setSession, verify, sign };
