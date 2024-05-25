import { Navigate, useLocation } from "react-router-dom";
import useAuth from "./JwtContext";
import { useEffect, useState } from "react";

const AuthGuard = ({ children }) => {
  const { isAuthenticated, isInitialized } = useAuth();
  const [isLoggedIn, setIsloggedIn] = useState(false);

  // useEffect(() => {
  //   console.log('isAuthenticatedUse', isAuthenticated)
  //   if (isAuthenticated) {
  //     setIsloggedIn(true);
  //   }
  // }, [isAuthenticated]);
  // console.log("isAuthenticated", isAuthenticated, isLoggedIn);
  const location = useLocation();
  // console.log("gurad", token);
  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default AuthGuard;
