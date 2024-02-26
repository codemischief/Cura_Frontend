import React from "react";
import "./login.css";
import Logo from "../assets/logo.jpg";
import eyeIcon from "../assets/eye.jpg";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const login = () => {
  const navigate = useNavigate();

  // Testing User Login info
  const database = [
    {
      username: "user1",
      password: "pass1",
    },
    {
      username: "user2",
      password: "pass2",
    },
  ];

  const initialValues = {
    username: "",
    password: "",
    comkey: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [type, setType] = useState("password");

  // handle changes in input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // password visibility
  const passwordToggle = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  const comkeyToggle = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  const changeStyle = () =>{
    const element = document.getElementById("bottom-loginbtn");
    element.classList.remove("loginBtn");  
    element.classList.add("modified-loginBtn");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues)); // validate form and set error message
    setIsSubmit(true);
  };

  // validate form and to throw Error message
  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "username is required!";
    }
    if (!values.password) {
      errors.password = "password is required!";
    }
    if (!values.comkey) {
      errors.comkey = "company key is required!";
    }
    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length == 0 && isSubmit) {
      // Find user login info
      const userData = database.find(
        (user) => user.username === formValues.username
      );
      if (userData) {
        if (userData.password !== formValues.password) {
          // Invalid password
          console.log("invalid password");
        } else {
          navigate("/dashboard");
          console.log("login successful");
        }
      } else {
        console.log("user not found");
      }
    }
  }, [formErrors]);

  return (
    <div className="login">
      <div className="logo">
        <img className="logo-icon" src={Logo} alt="company logo" />
      </div>
      <div className="main">
        <div className="upper">
          <div className="heading">Welcome Back!</div>
          <form onSubmit={handleSubmit}>
            <div className="username">
              <div className="form-heading">Username</div>
              <input
                className="form-input"
                name="username"
                type="text"
                value={formValues.username}
                onChange={handleChange}
                autoComplete="off"
              />
              <span className="error">{formErrors.username}</span>
            </div>
            <div className="password">
              <div className="form-heading">Password</div>
              <div className="input_group">
                <input
                  className="form-input"
                  name="password"
                  type={type}
                  value={formValues.password}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <span className="eye_icon">
                  <img
                    className="span"
                    onClick={passwordToggle}
                    src={eyeIcon}
                    alt="eye-icon"
                  />
                </span>
              </div>
              <span className="error">{formErrors.password}</span>
            </div>
            <div className="company-key">
              <div className="form-heading">Company Key</div>
              <div className="input_group">
                <input
                  className="form-input"
                  name="comkey"
                  type={type}
                  value={formValues.comkey}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <span className="eye_icon">
                  <img onClick={comkeyToggle} src={eyeIcon} alt="eye-icon" />
                </span>
              </div>
              <span className="error">{formErrors.comkey}</span>
            </div>
            <div className="bottom">
              <a className="forget-link" href="#">
                Forgot your password
              </a>
              <button className="loginBtn" id="bottom-loginbtn" onClick={changeStyle}>
                Login
              </button>
            </div>
          </form>
        </div>

        {/* <div className="bottom">
          <a className="forget-link" href="#">
            Forget your password
          </a>
          <button className="loginBtn">Login</button>
        </div> */}
      </div>
    </div>
  );
};

export default login;
