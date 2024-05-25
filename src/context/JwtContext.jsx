import { createContext, useEffect, useReducer } from "react";
// utils
import { isValidToken, setSession } from "../utils/jwt";
import { env_URL_SERVER } from "../Redux/helper";
import { toast } from "react-toastify";
import axios from "axios";

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

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");
        const user = window.localStorage.getItem("user");

        // if (accessToken && isValidToken(accessToken)) {
        if (accessToken) {
          setSession(accessToken);

          //   const response = await axios.get("/api/account/my-account");
          //   const { user } = response.data;

          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: true,
              user: JSON.parse(user),
            },
          });
          console.log("authSideEffect");
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
        console.error(err);
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

  //   const login = async (email, password) => {
  //     const response = await axios.post('/api/account/login', {
  //       email,
  //       password
  //     });
  //     const { accessToken, user } = response.data;

  //     setSession(accessToken);
  //     dispatch({
  //       type: Types.Login,
  //       payload: {
  //         user
  //       }
  //     });
  //   };
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
      const { token, user_id, role_id } = response.data;

      let userObj = {
        id: user_id,
        roleId: role_id,
      };
      setSession(userObj, token);
      dispatch({
        type: Types.Login,
        payload: {
          user: userObj,
        },
      });
    } catch (error) {
      console.log("error", error);
      toast.warning("Server error occured");
    }

    //   .login({ username, password, company_key })
    //   .then((res) => {
    //     if (res) {
    //       sessionStorage.setItem("Role", res.data.role_id);
    //       sessionStorage.setItem("User_id", res.data.user_id);
    //       sessionStorage.setItem("token", res.data.token);
    //       localStorage.setItem("token", res?.data.token);
    //       const userObj = {
    //         userName: res?.data.userName,
    //         email: res?.data.email,
    //       };
    //       localStorage.setItem("user", JSON.stringify(userObj));
    //       setToken(res?.data.token);
    //       setUser(userObj);
    //       toast.success("Login Success!");
    //       navigate("/dashboard");
    //     }
    //   })
    //   .catch((e) => toast.warning("Server error occured"));
  };

  const register = async (email, password, firstName, lastName) => {
    const response = await axios.post("/api/account/register", {
      email,
      password,
      firstName,
      lastName,
    });
    const { accessToken, user } = response.data;

    window.localStorage.setItem("accessToken", accessToken);
    dispatch({
      type: Types.Register,
      payload: {
        user,
      },
    });
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: Types.Logout });
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
        register,
        resetPassword,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
