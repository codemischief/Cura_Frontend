import axios from "axios";
import { redirectToLogin } from "../services/setNavigation";
import { toast } from "react-toastify";
let toastShown = false;
const env_URL_SERVER = import.meta.env.VITE_ENV_URL_SERVER;
export const accessToken = localStorage.getItem("accessToken");
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
    Authorization: `Bearer ${accessToken}`,
  },
});

const logPayload = {
  token: `Bearer ${accessToken}`,
  // user_id: userId,
};
// Request interceptor to set headers
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const { headers } = config;
//     // const reqid = uuidv4();

//     // Add the static header values
//     headers["Authorization"] = `Bearer ${accessToken}`;
//     // headers["reqid"] = reqid;
//     // headers["userid"] = userId;
//     headers["Content-Type"] = "application/json";

//     // Add dynamic headers if available in config
//     // if (config.modulename && config.methodname) {
//     //   headers["modulename"] = config.modulename;
//     //   headers["methodname"] = config.methodname;
//     // }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

axiosInstance.interceptors.request.use(
  (config) => {
    const { headers } = config;
    const accessToken = localStorage.getItem("accessToken");
    headers["Authorization"] = `Bearer ${accessToken}`;
    // const userId = JSON.parse(localStorage.getItem("user"))?.id;
    // Merge the common payload with the user's request data
    if (config.appendLog) {
      config.data = {
        ...logPayload,
        ...config.data, // This assumes that the user payload is passed as `data` in the Axios request config
      };
      return config;
    }
    config.data = {
      ...config.data,
      // user_id: userId,
    };

    return config;
  },
  (error) => {
    // Handle the error
    return Promise.reject(error);
  }
);
// Response interceptor (optional, for handling responses globally)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      (error.response && error.response.status === 401) ||
      error.response.status === 498
    ) {
      // Handle unauthorized access, e.g., redirect to login
      if (!toastShown) {
        toastShown = true;
        setTimeout(() => (toastShown = false), 1000); // Reset after 1 second
        localStorage.clear();
        redirectToLogin();
        toast.error("Unauthorized!");
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
