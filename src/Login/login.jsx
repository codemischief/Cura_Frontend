import React from "react";
import "./login.css";
import Logo from "../assets/logo.jpg";
import eyeIcon from "../assets/eye.jpg";

const login = () => {
    const click1 = () =>{
        let val=document.getElementById("pass");
        val.type="text";
    }
    const click2 = () =>{
        let val=document.getElementById("com-key");
        val.type="text";
    }
  return (
    <div className="login">
      <div className="logo">
        <img className="logo-icon" src={Logo} alt="company logo" />
      </div>
      <div className="main">
        <div className="upper">
          <div className="heading">Welcome Back!</div>
          <form className="form" action="">
            <div className="username">
              <div className="form-heading">Username</div>
              <input className="form-input" type="text" />
            </div>
            <div className="password">
              <div className="form-heading">Password</div>
              <input className="form-input " id="pass" type="password"/>
            </div>
            <div className="company-key">
              <div className="form-heading">Company Key</div>
              <input className="form-input" id="com-key" type="password"/>
            </div>
          </form>
        </div>

        <div className="bottom">
          <a className="forget-link" href="#">
            Forget your password
          </a>
          <button className="loginBtn">Login</button>
        </div>
      </div>
      <div className="eye-icon1" onClick={click1} ><img src={eyeIcon} alt="eye-icon"/></div>
      <div className="eye-icon2" onClick={click2} ><img src={eyeIcon} alt="eye-icon"/></div>
    </div>
  );
};

export default login;
