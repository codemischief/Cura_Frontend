import { useNavigate } from "react-router-dom";

let navigate = null;

export const setNavigate = (navigateFunction) => {
  navigate = navigateFunction;
};

export const redirectToLogin = () => {
  if (navigate) {
    navigate("/login");
  } else {
    console.error("Navigate function is not set.");
  }
};
