import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useIdleTimer } from "react-idle-timer";

import { isValidToken, setSession } from "../utils/jwt";
import { env_URL_SERVER } from "../Redux/helper";
import { replaceKeys } from "./routeMap";
import SessionTimeoutModal from "../Components/modals/SessionAlert";

// Initial Types and States
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const countdownRef = useRef(null);
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

  const handleOnIdle = () => {
    if (state.isAuthenticated) {
      setIsModalOpen(true);
      let countdownValue = 10;
      setCountdown(countdownValue);
      countdownRef.current = setInterval(() => {
        countdownValue -= 1;
        setCountdown(countdownValue);
        if (countdownValue <= 0) {
          clearInterval(countdownRef.current);
          console.log("idle-logout");
          logout();
        }
      }, 1000);
    }
  };

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
        let userObj = {
          id: user_id,
          roleId: role_id,
          allowedModules: {
            ...replaceKeys(access_rights),
            "/dashboard": {
              add: true,
              delete: true,
              edit: true,
              get: true,
            },
          },
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
    console.log("logout");
    setIsModalOpen(false);
    clearInterval(countdownRef.current);
    setSession(null);
    dispatch({ type: Types.Logout });
    toast.success("Logged out successfully");
    navigate("/login");
  };
  const handleContinueSession = () => {
    clearInterval(countdownRef.current);
    resetIdleTimer(); // Reset idle timer on user activity
    setIsModalOpen(false);
  };

  const resetPassword = (email) => console.log(email);

  const updateProfile = () => {};

  // Use react-idle-timer hook
  const { reset: resetIdleTimer } = useIdleTimer({
    timeout: 10 * 60 * 1000, // 5 minutes
    onIdle: handleOnIdle,
    debounce: 500,
    events: ["mousemove", "keydown", "mousedown", "touchstart"], // User activity events
  });

  useEffect(() => {
    if (state.isAuthenticated) {
      resetIdleTimer(); // Reset idle timer when user logs in
    }
  }, [state.isAuthenticated, resetIdleTimer]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        login,
        logout,
        resetPassword,
        updateProfile,
      }}
    >
      {children}
      {state.isAuthenticated && (
        <SessionTimeoutModal
          open={isModalOpen}
          onContinue={handleContinueSession}
          onLogout={logout}
          countdown={countdown}
        />
      )}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error("Auth context must be used inside AuthProvider");

  return context;
};

export default useAuth;
