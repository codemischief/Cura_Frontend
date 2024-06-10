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
  console.log("decoded", decoded);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const handleTokenExpired = (exp) => {
  let expiredTimer;

  window.clearTimeout(expiredTimer);
  const currentTime = Date.now();
  const timeLeft = exp * 1000 - currentTime;
  expiredTimer = window.setTimeout(() => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("idleTimeOut");
  }, timeLeft);
};

const setSession = (user, accessToken, idleTimeOut) => {
  if (accessToken) {
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("user", JSON.stringify(user));
    sessionStorage.setItem("idleTimeOut", idleTimeOut);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    // This function below will handle when token is expired
    const { exp } = jwtDecode(accessToken);
    handleTokenExpired(exp);
  } else {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("idleTimeOut");
    delete axios.defaults.headers.common.Authorization;
  }
};

export { isValidToken, setSession };
// export { isValidToken, setSession, verify, sign };
