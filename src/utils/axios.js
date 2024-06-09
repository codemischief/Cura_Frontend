import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import useAuth from "../context/JwtContext";
const env_URL_SERVER = import.meta.env.VITE_ENV_URL_SERVER;
const accessToken = localStorage.getItem("accessToken");
const userId = JSON.parse(localStorage.getItem("user"))?.id;
console.log('userId', userId)
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
});

// Request interceptor to set headers
axiosInstance.interceptors.request.use(
  (config) => {
    const { headers } = config;
    const reqid = uuidv4();

    // Add the static header values
    headers["Authorization"] = `Bearer ${accessToken}`;
    headers["reqid"] = reqid;
    headers["userid"] = userId;
    headers["Content-Type"] = "application/json";

    // Add dynamic headers if available in config
    if (config.modulename && config.methodname) {
      headers["modulename"] = config.modulename;
      headers["methodname"] = config.methodname;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (optional, for handling responses globally)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access, e.g., redirect to login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
