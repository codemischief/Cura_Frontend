import { useLocation } from "react-router-dom";
import useAuth from "../../context/JwtContext";

const checkEditAccess = () => {
  const { user } = useAuth();
  const { pathname } = useLocation();
  
  const hasAccess = (path) => {
    // Check if the exact path is allowed
    if (user.allowedModules[path]?.edit) {
      return true;
    }

    // Check for dynamic route access
    return Object.keys(user.allowedModules).some(
      (allowedPath) =>
        path.startsWith(allowedPath) && user.allowedModules[allowedPath].edit
    );
  };

  return hasAccess(pathname);
};

export default checkEditAccess;