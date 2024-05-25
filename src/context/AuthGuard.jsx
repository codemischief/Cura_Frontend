import { Navigate, useLocation } from "react-router-dom";
import useAuth from "./JwtContext";

const AuthGuard = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();
  console.log("gurad", token);
  return token ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default AuthGuard;
