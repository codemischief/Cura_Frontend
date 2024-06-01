// import { createContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// // import { loginAPI, registerAPI } from "../Services/AuthService";
// import { toast } from "react-toastify";
// import React from "react";
// import axios from "axios";
// import { authService } from "../services/authServices";

// import { useContext } from "react";
// import { AuthContext } from "./JwtContext";

// const UserContext = createContext({});

// export const UserProvider = ({ children }) => {
//   const navigate = useNavigate();
//   const [token, setToken] = useState(null);
//   const [user, setUser] = useState(null);
//   const [isReady, setIsReady] = useState(false);

//   useEffect(() => {
//     const user = localStorage.getItem("user");
//     const token = localStorage.getItem("token");
//     if (user && token) {
//       setUser(JSON.parse(user));
//       setToken(token);
//       axios.defaults.headers.common["Authorization"] = "Bearer " + token;
//     }
//     setIsReady(true);
//   }, []);

//   //   const registerUser = async (email, username, password) => {
//   //     await registerAPI(email, username, password)
//   //       .then((res) => {
//   //         if (res) {
//   //           localStorage.setItem("token", res?.data.token);
//   //           const userObj = {
//   //             userName: res?.data.userName,
//   //             email: res?.data.email,
//   //           };
//   //           localStorage.setItem("user", JSON.stringify(userObj));
//   //           setToken(res?.data.token);
//   //           setUser(userObj);
//   //           toast.success("Login Success!");
//   //           navigate("/search");
//   //         }
//   //       })
//   //       .catch((e) => toast.warning("Server error occured"));
//   //   };

//   const loginUser = async (username, password, company_key) => {
//     await authService
//       .login({ username, password, company_key })
//       .then((res) => {
//         if (res) {
//           sessionStorage.setItem("Role", res.data.role_id);
//           sessionStorage.setItem("User_id", res.data.user_id);
//           sessionStorage.setItem("token", res.data.token);
//           localStorage.setItem("token", res?.data.token);
//           const userObj = {
//             userName: res?.data.userName,
//             email: res?.data.email,
//           };
//           localStorage.setItem("user", JSON.stringify(userObj));
//           setToken(res?.data.token);
//           setUser(userObj);
//           toast.success("Login Success!");
//           navigate("/dashboard");
//         }
//       })
//       .catch((e) => toast.warning("Server error occured"));
//   };

//   const isLoggedIn = () => {
//     return !!user;
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//     setToken("");
//     navigate("/");
//   };

//   return (
//     <UserContext.Provider
//       value={{ loginUser, user, token, logout, isLoggedIn }}
//     >
//       {isReady ? children : null}
//     </UserContext.Provider>
//   );
// };

// export const useAuth = () => React.useContext(UserContext);


