import { Navigate, useLocation } from "react-router-dom";
import useAuth from "./useAuth";

const AuthGuard = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  console.log("isAuthenticated", isAuthenticated);
  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default AuthGuard;
