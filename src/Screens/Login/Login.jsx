import React from "react";
import Logo from "../../assets/logo.jpg";
import eyeIcon from "../../assets/eye.jpg";
import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import bcrypt from 'bcryptjs'
import useAuth from "../../context/useAuth";
import { useLocation } from "react-router-dom";
import { authService } from "../../services/authServices";
import EyeHide from "./../../assets/eyeHide.png";


const Login = () => {

  const [openEyeIconPass, setOpenEyeIconPass] = useState(true);
  const [openEyeIconCom, setOpenEyeIconCom] = useState(true);
  const [buttonLoading,setButtonLoading] = useState(false);
  const { setAuth } = useAuth();
  const location = useLocation();

  const mockPostResponse = async () => {
    setButtonLoading(true);
    const username = formValues.username;
    // var salt = bcrypt.genSaltSync(12);
    // var password = bcrypt.hashSync(formValues.password, salt);
    const password = formValues.password;
    const company_key = formValues.comkey;
    
    const response = await authService.login({ username, password, company_key });
    setButtonLoading(false);
    if (response.result == "success" && response.role_id == "1") {
      navigate("/dashboard")
    } else if (response.result == "success" && response.role_id == "2") {
      navigate("/user")
    }
    else if (response.result == "error") {
      setIsError(true)
      setErrorMessage(response.message);
    }
    
  }


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
  const [type1, setType1] = useState("password");
  const [type2, setType2] = useState("password");
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);


  // handle changes in input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // password visibility
  const passwordToggle = () => {
    if (type1 === "password") {
      setType1("text");
    } else {
      setType1("password");
    }
    setOpenEyeIconPass((prev) => { return !prev });
  };

  const comkeyToggle = () => {
    if (type2 === "password") {
      setType2("text");
    } else {
      setType2("password");
    }
    setOpenEyeIconCom((prev) => { return !prev });
  };

  const show = () => {
    const element = document.getElementById("inputError");
    element.style.display = "block";
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // validate form and set error message
    setIsSubmit(true);
    mockPostResponse();
    setFormErrors(validate(formValues));


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

  }, [formErrors]);
  return (
    <div className="flex w-screen h-screen  py-[20px] justify-center bg-[#F5F5F5]">
      <img
        className="w-[140px] h-[64px]  absolute left-5 "
        src={Logo}
        alt="company Logo"
      />
      <div className="w-3/5  h-[540px] bg-white rounded-lg flex flex-col items-center self-center justify-self-center">
        <div className="w-[400px] h-[300px] mt-[35px]">
          <div className="text-center text-[21px] mb-[35px]">Login Panel </div>
          <form className="space-y-[15px]" onSubmit={handleSubmit}>
            <div className="space-y-[12px]">
              <div className="space-y-[2px]">
                <div className="text-[#505050] text-[18px]">Username</div>
                <input
                  className="border-[1px] border-[#C6C6C6] w-[400px] h-[30px] text-[#505050] px-3 text-[12px]"
                  type="text"
                  name="username"
                  value={formValues.username}
                  onChange={handleChange}
                  autoComplete="off"
                />
                <div className="text-[12px] text-[#CD0000] ">{formErrors.username}</div>
              </div>
              <div className="space-y-[2px]">
                <div className="text-[#505050] text-[18px] ">Password</div>
                <div className="m-[0px] p-[0px] relative">
                  <input
                    className="border-[1px] border-[#C6C6C6] w-[400px] h-[30px] text-[#505050] px-3 text-[12px]"
                    name="password"
                    type={type1}
                    value={formValues.password}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  {openEyeIconPass &&
                    <span className="w-[20px] h-[20px] absolute right-[10px] bottom-[3px]">
                      <img
                        className='cursor-pointer'
                        onClick={passwordToggle}
                        src={eyeIcon}
                        alt="eye-icon"
                      />
                    </span>
                  }
                  {!openEyeIconPass &&
                    <span className="w-[20px] h-[20px] absolute right-[10px] bottom-[4px]">
                      <img
                        className='cursor-pointer'
                        onClick={passwordToggle}
                        src={EyeHide}
                        alt="eye-icon"
                      />
                    </span>
                  }

                </div>

                <div className="text-[12px] text-[#CD0000] ">{formErrors.password}</div>
              </div>
              <div className="space-y-[2px]">
                <div className="text-[#505050] text-[18px]">Company Key</div>
                <div className="m-[0px] p-[0px] relative">
                  <input
                    className="border-[1px] border-[#C6C6C6] w-[400px] h-[30px] text-[#505050] px-3 text-[12px]"
                    name="comkey"
                    type={type2}
                    value={formValues.comkey}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  {openEyeIconCom &&
                    <span className="w-[20px] h-[20px] absolute right-[10px] bottom-[3px]">
                      <img
                        className='cursor-pointer'
                        onClick={comkeyToggle}
                        src={eyeIcon}
                        alt="eye-icon"
                      />
                    </span>
                  }
                  {!openEyeIconCom &&
                    <span className="w-[20px] h-[20px] absolute right-[10px] bottom-[4px]">
                      <img
                        className='cursor-pointer'
                        onClick={comkeyToggle}
                        src={EyeHide}
                        alt="eye-icon"
                      />
                    </span>
                  }
                </div>

                <div className="text-[12px] text-[#CD0000] ">{formErrors.comkey}</div>
              </div>
            </div>

            {/* to create a space  */}
            <div className="w-[400px] h-[74px] bg-[#FFEAEA] rounded-[15px] border-[1px] border-[#CD0000] flex justify-center items-center px-[45px] py-[20px] text-[12px] invisible"></div>

            {/* error message  */}
            {isError && <div id="inputError" className="w-[400px] h-[74px] bg-[#FFEAEA] rounded-[15px] border-[1px] border-[#CD0000] flex justify-center items-center px-[45px] py-[20px] text-[12px] ">
              {errorMessage}
            </div>}

            {/* forgot section */}
            <div className="flex flex-col items-center justify-center gap-[10px]">
              <Link className="text-[#004DD7] text-[18px] cursor-pointer" to="/">Forgot Password</Link>
              <button className={`${buttonLoading ? " bg-gray-600 cursor-not-allowed": "bg-[#004DD7]"} w-[200px] h-[35px] text-white text-[18px] rounded-lg cursor-pointer`}>Login</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
