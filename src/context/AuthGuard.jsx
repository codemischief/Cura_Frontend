import { Navigate, useLocation } from "react-router-dom";
import useAuth from "./JwtContext";
import { toast } from "react-toastify";

const AuthGuard = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    toast.warning("Session expired");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const hasAccess = (path) => {
    if (path.includes("reports")) {
      return true;
    }

    // Check if the exact path is allowed
    if (user.allowedModules[path] && user.allowedModules[path].get) {
      return true;
    }

    // Check for dynamic route access
    
    let newUrl = path?.replace(/\/\d+$/, "") + '/';
    console.log(newUrl)
    console.log(user)
    return Object.keys(user.allowedModules).some(
      (allowedPath) => {
        
        return path.startsWith(allowedPath) && user?.allowedModules[newUrl]?.get
      }
    );
  };

  if (hasAccess(location.pathname)) {
    return <>{children}</>;
  } else {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }
};

export default AuthGuard;
