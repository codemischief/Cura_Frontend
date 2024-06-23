import axios from "axios";
import { redirectToLogin } from "../services/setNavigation";
import { toast } from "react-toastify";
import { APIService } from "../services/API";
let apiToken = null;

export const setAccessToken = (apiTokenParam) => {
  apiToken = null;
  apiToken = apiTokenParam;
};

export const getToken = () => {
  if (apiToken) {
    return apiToken;
  } else {
    return localStorage.getItem("accessToken");
  }
};

let toastShown = false;
const env_URL_SERVER = import.meta.env.VITE_ENV_URL_SERVER;
export const userId = JSON.parse(localStorage.getItem("user"))?.id;
export const moduleMethods = Object.freeze({
  get: "get",
  edit: "edit",
  add: "add",
  delete: "delete",
});

const axiosInstance = axios.create({
  baseURL: env_URL_SERVER,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshToken = async () => {
  const token = getToken();
  const refresh_token = localStorage.getItem("refreshToken");
  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  const response = await fetch(`${env_URL_SERVER}refreshToken`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
      refreshtoken: refresh_token,
    },
    body: JSON.stringify({ user_id: userId }),
  });

  const data = await response.json();

  if (response.ok) {
    localStorage.setItem("accessToken", data.data.token);
    setAccessToken(data.data.token); // Update the access token
    return data.data.token;
  } else {
    setAccessToken(null);
    localStorage.clear();
    redirectToLogin();
    throw new Error("Failed to refresh token");
  }
};

axiosInstance.interceptors.request.use(
  (config) => {
    const { headers } = config;
    const accessToken = getToken();
    headers["Authorization"] = `Bearer ${accessToken}`;

    if (config.appendLog) {
      config.data = {
        ...config.data,
      };
    } else {
      config.data = {
        ...config.data,
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 498) {
      const originalRequest = { ...error.config }; // Clone the original request config

      if (!toastShown) {
        
        try {
          const newAccessToken = await refreshToken();
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          
          // Ensure data is properly serialized if it's an object and not already a string
          if (originalRequest.data && typeof originalRequest.data === "string") {
            originalRequest.data = JSON.parse(originalRequest.data);
          }
          return axiosInstance(originalRequest); // Retry the original request with new token
        } catch (err) {
          toastShown = true;
        setTimeout(() => (toastShown = false), 1000);
          return Promise.reject(err);
        }
      }
    } else if (
      error.response.status === 401 ||
      error.response.status === 403 ||
      error.response.status === 400
    ) {
      if (!toastShown) {
        toastShown = true;
        setTimeout(() => (toastShown = false), 1000);
        toast.error("Bad Request: The request was invalid.");
      }
    } else if (error.response.status === 404) {
      if (!toastShown) {
        toastShown = true;
        setTimeout(() => (toastShown = false), 1000);
        toast.error("Not Found: The resource was not found.");
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
