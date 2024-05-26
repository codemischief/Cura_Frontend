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
  }, timeLeft);
};

const setSession = (user, accessToken) => {
  console.log("accessTokenTyyy", accessToken);
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("user", JSON.stringify(user));
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    // This function below will handle when token is expired
    const { exp } = jwtDecode(accessToken);
    console.log("exp", exp);
    handleTokenExpired(exp);
  } else {
    console.log("clearing,");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common.Authorization;
  }
};

export { isValidToken, setSession };
// export { isValidToken, setSession, verify, sign };
