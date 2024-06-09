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
  if (location.pathname.includes("reports")) {
    return <>{children}</>;
  }

  if (
    user?.allowedModules[location.pathname] &&
    user?.allowedModules[location.pathname]?.get
  ) {
    return <>{children}</>;
  } else {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }
};

export default AuthGuard;
