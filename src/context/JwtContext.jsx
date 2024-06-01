import { createContext, useContext, useEffect, useReducer } from "react";
// utils
import { isValidToken, setSession } from "../utils/jwt";
import { env_URL_SERVER } from "../Redux/helper";
import { toast } from "react-toastify";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { routeMapObj } from "./routeMap";

// ----------------------------------------------------------------------

const Types = {
  Initial: "INITIALIZE",
  Login: "LOGIN",
  Logout: "LOGOUT",
  Register: "REGISTER",
};

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const JWTReducer = (state, action) => {
  switch (action.type) {
    case Types.Initial:
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
      };
    case Types.Login:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case Types.Logout:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case Types.Register:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    default:
      return state;
  }
};

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(JWTReducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const user = localStorage.getItem("user");
        if (accessToken && isValidToken(accessToken)) {
          setSession(JSON.parse(user), accessToken);
          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: true,
              user: JSON.parse(user),
            },
          });
        } else {
          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
          console.log("authSideEffect-2");
        }
      } catch (err) {
        console.log("err", err);
        dispatch({
          type: Types.Initial,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (username, password, company_key) => {
    try {
      const response = await axios.post(
        `${env_URL_SERVER}validateCredentials`,
        {
          username,
          password,
          company_key,
        }
      );
      const { token, user_id, role_id, access_rights } = response.data;
      if (token) {
        const replaceKeys = () => {
          return Object.keys(access_rights).reduce((acc, key) => {
            const newKey = routeMapObj[key] || key;
            acc[newKey] = access_rights[key];
            return acc;
          }, {});
        };
        console.log('replaceKeys()', replaceKeys())
        let userObj = {
          id: user_id,
          roleId: role_id,
          allowedModules: replaceKeys(),
        };
        setSession(userObj, token);
        dispatch({
          type: Types.Login,
          payload: {
            user: userObj,
          },
        });
      }
    } catch (error) {
      throw new Error(
        "Failed to login. Please check your credentials and try again."
      );
    }
  };

  const logout = async () => {
    setSession(null);
    navigate("/login");
  };

  const resetPassword = (email) => console.log(email);

  const updateProfile = () => {};

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        login,
        logout,
        // register,
        resetPassword,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("Auth context must be use inside AuthProvider");

  return context;
};

export default useAuth;
