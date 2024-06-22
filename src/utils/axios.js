import axios from "axios";
import { redirectToLogin } from "../services/setNavigation";
import { toast } from "react-toastify";
import { APIService } from "../services/API";
let apiToken = null;


export const setAccessToken = (apiTokenParam) => {
  apiToken = null
  apiToken = apiTokenParam;
};

export const getToken = () => {
  if (apiToken) {
    return apiToken;
  }
  else {
    return localStorage.getItem("accessToken")
  }
};

let toastShown = false;
const env_URL_SERVER = import.meta.env.VITE_ENV_URL_SERVER;
// export const accessToken = localStorage.getItem("accessToken");
export const userId = JSON.parse(localStorage.getItem("user"))?.id;
// customHeaderMethods
export const moduleMethods = Object.freeze({
  get: "get",
  edit: "edit",
  add: "add",
  delete: "delete",
});

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: env_URL_SERVER, // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${accessToken}`,
  },
});


axiosInstance.interceptors.request.use(
  (config) => {
    const { headers } = config;
    const accessToken = getToken();
    headers["Authorization"] = `Bearer ${accessToken}`;

    if (config.appendLog) {
      config.data = {
        // ...logPayload,
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
(error) => {
    if (error.response.status === 498) {
      if (!toastShown) {
        toastShown = true;
        setTimeout(() => (toastShown = false), 1000); 
        localStorage.clear();
        setAccessToken(null)
        redirectToLogin();
        toast.error("Unauthorized!");
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
    } else if ( error.response.status === 404) {
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
