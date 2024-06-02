import { Navigate, useLocation } from "react-router-dom";
import useAuth from "./JwtContext";
import { toast } from "react-toastify";

const AuthGuard = ({ children }) => {
  const location = useLocation();
  // const { isAuthenticated, user } = useAuth();
  const isAuthenticated = true

  if (!isAuthenticated) {
    toast.warning("Session expired");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // if (
  //   user?.allowedModules[location.pathname] &&
  //   user?.allowedModules[location.pathname]?.get
  // ) {
  //   return <>{children}</>;
  // } else {
  //   return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  // }
  return <>{children}</>;
};

export default AuthGuard;
