import axios from "axios";
import { jwtDecode } from "jwt-decode";
// import { verify, sign } from "jsonwebtoken";
//
// import axios from "./axios";

// ----------------------------------------------------------------------

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode(accessToken);
  // console.log("decoded", decoded);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const handleTokenExpired = (exp) => {
  let expiredTimer;

  window.clearTimeout(expiredTimer);
  const currentTime = Date.now();
  const timeLeft = exp * 1000 - currentTime;
  expiredTimer = window.setTimeout(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    // localStorage.removeItem("idleTimeOut");
  }, timeLeft);
};

const setSession = (user, accessToken, idleTimeOut) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("user", JSON.stringify(user));
    // localStorage.setItem("idleTimeOut", idleTimeOut);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    // This function below will handle when token is expired
    const { exp } = jwtDecode(accessToken);
    handleTokenExpired(exp);
  } else {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    // localStorage.removeItem("idleTimeOut");
    delete axios.defaults.headers.common.Authorization;
  }
};

export { isValidToken, setSession };
// export { isValidToken, setSession, verify, sign };
