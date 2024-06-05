// src/utils/errorHandler.js

import { toast } from "react-toastify";

const errorHandler = (error, customMessage = null) => {
  let message = customMessage || "An unexpected error occurred";

  if (error.response) {
    const { status } = error.response;

    if (!customMessage) {
      switch (status) {
        case 400:
          message = "Bad Request";
          break;
        case 401:
          message = "Unauthorized";
          break;
        case 403:
          message = "Forbidden";
          break;
        case 404:
          message = "Not Found";
          break;
        case 500:
          message = "Internal Server Error";
          break;
        default:
          message = "An unexpected error occurred";
          break;
      }
    }
  } else if (error.request) {
  
    if (!customMessage) {
      message = "No response received from server";
    }
  } else {
    // Something happened in setting up the request that triggered an Error
    if (!customMessage) {
      message = error.message;
    }
  }

  // Determine the type of toast based on the message or status code
  if (status >= 400 && status < 500) {
    toast.warn(message);
  } else if (status >= 500) {
    toast.error(message);
  } else {
    toast.error(message);
  }
};

export default errorHandler;
