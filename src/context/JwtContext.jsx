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
import { isValidToken, setSession } from "../utils/jwt";
import { env_URL_SERVER } from "../Redux/helper";
import { replaceKeys } from "./routeMap";
import SessionTimeoutModal from "../Components/modals/SessionAlert";
import { setAccessToken } from "../utils/axios";
import { APIService } from "../services/API";

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
  accessToken: null,
};

const JWTReducer = (state, action) => {
  switch (action.type) {
    case Types.Initial:
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
      };
    case Types.Login:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
      };
    case Types.Logout:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        accessToken: null,
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
  const idleTimeoutRef = useRef(null);
  const idleEvents = ["mousemove", "keydown", "mousedown", "touchstart"];
  const navigate = useNavigate();

  const getInitialIdleTimeout = () => {
    const storedIdleTimeout = localStorage.getItem("idleTimeout");
    return storedIdleTimeout ? parseInt(storedIdleTimeout, 10) : null;
  };

  const [idleTimeout, setIdleTimeout] = useState(getInitialIdleTimeout);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const user = localStorage.getItem("user");
        const refreshToken = localStorage.getItem("refreshToken");
        if (accessToken && isValidToken(accessToken)) {
          setSession(JSON.parse(user), accessToken, refreshToken);
          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: true,
              user: JSON.parse(user),
              accessToken: accessToken,
            },
          });
        } else {
          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: false,
              user: null,
              accessToken: null,
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
            accessToken: null,
          },
        });
      }
    };

    initialize();
  }, []);

  useEffect(() => {
    if (idleTimeout !== null) {
      localStorage.setItem("idleTimeout", idleTimeout);
    }
  }, [idleTimeout]);

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
          logout();
        }
      }, 1000);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    clearInterval(countdownRef.current);
    resetIdleTimer(); // Reset idle timer when modal is closed by user
  };

  const resetIdleTimer = () => {
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
    }
    if (idleTimeout !== null) {
      idleTimeoutRef.current = setTimeout(handleOnIdle, idleTimeout);
    }
  };

  const pauseIdleTimer = () => {
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
    }
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        localStorage.setItem("lastActiveTab", "hidden");
        pauseIdleTimer();
      } else {
        localStorage.setItem("lastActiveTab", "visible");
        resetIdleTimer();
      }
    };

    if (state.isAuthenticated && idleTimeout !== null) {
      idleEvents.forEach((event) => {
        window.addEventListener(event, resetIdleTimer);
      });
      document.addEventListener("visibilitychange", handleVisibilityChange);
      window.addEventListener("storage", (event) => {
        if (event.key === "lastActiveTab" && event.newValue === "hidden") {
          pauseIdleTimer();
        }
      });
      resetIdleTimer();
    }

    return () => {
      idleEvents.forEach((event) => {
        window.removeEventListener(event, resetIdleTimer);
      });
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }
    };
  }, [state.isAuthenticated, idleTimeout]);

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
      const { token, user_id, role_id, access_rights, idleTimeOut, refresh_token } =
        response.data;
      if (token) {
        let userObj = {
          id: user_id,
          role_id: role_id,
          
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
        const idleTimeoutInMs = idleTimeOut ? idleTimeOut * 1000 : null;
        if (idleTimeoutInMs !== null) {
          localStorage.setItem("idleTimeout", idleTimeoutInMs); // Store idleTimeout in milliseconds
          setIdleTimeout(idleTimeoutInMs); // Set idleTimeout state
        }
        setSession(userObj, token, refresh_token);
        dispatch({
          type: Types.Login,
          payload: {
            user: userObj,
            accessToken: token,
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
    const response = await APIService.logOut();
    setIsModalOpen(false);
    clearInterval(countdownRef.current);
    setSession(null);
    localStorage.clear();
    dispatch({ type: Types.Logout });
    toast.success("Logged out successfully");
    navigate("/login");
    setAccessToken(null);
  };

  const handleContinueSession = () => {
    clearInterval(countdownRef.current);
    resetIdleTimer(); // Reset idle timer on user activity
    setIsModalOpen(false);
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
          onClose={handleModalClose}
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
