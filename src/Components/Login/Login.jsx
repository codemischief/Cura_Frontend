import React from "react";
import Logo from "../assets/logo.jpg";
import eyeIcon from "../assets/eye.jpg";
import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import useAuth from "../../context/useAuth";
import bcrypt from 'bcryptjs'
import { authService } from "../../services/authServices";

import axios from "../Config/axios";

const Login = () => {
  const getuserId = (data) => (data);

  const  {setAuth} =useAuth();
  const navigate = useNavigate();

  const location = useLocation();
  // const from = location.state?.from?.pathname || "/";




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

  const [userId, setUserId] = useState("");


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
  };

  const comkeyToggle = () => {
    if (type2 === "password") {
      setType2("text");
    } else {
      setType2("password");
    }
  };

  const show = () => {
    const element = document.getElementById("inputError");
    element.style.display="block";
  }
const mockPostResponse = async () => {
  // localStorage.setItem("username","ruderaw")
  // localStorage.setItem("password","abcdefg")
  const username =formValues.username;
  // var salt = bcrypt.genSaltSync(12);
  var password = formValues.password;
    // const password =bcrypt.hash(formValues.password,12);
    // const password ="$2a$12$pT07xTktKj9e1KWuib8/z.riX4asy1vyk8jvIaGxtPELi9UhM9OQC"
    console.log(password)
    const company_key =formValues.comkey;
  // const userData  ={
  //   "username" :formValues.username,
  //    "password" : bcrypt.hashSync(formValues.password,10),
  //   "company_key" : Number(formValues.comkey)
  // }
  // const response =  await authService.login(userData);
  // console.log(response);
  
    try{
          
      // const response =  await authService.login({ username,password,company_key});
      const {response} = await axios.post("http://192.168.10.133:8000/validateCredentials",
          { username,password,company_key},
          {
              headers: { 
              "Content-Type": "application/json"},

          }
      );
      // console.log((response.json()).data)
      // const data=response.data.data.role_id;
      // setUserId(response.data.data.user_id)
      // getuserId("1")
      //   setFormValues(initialValues);
      //   console.log(response);
      //   sessionStorage.setItem('user_id', JSON.stringify(response.data.data.role_id));
        if(response.data.data.role_id == "1"){
          navigate("/dashboard")
        }else {
          navigate("/user")
        }
    }catch(e){
      if(!e?.response){
        setErrorMessage("No server Response");}

    }
    // axios.post('http://192.168.10.133:8000/validateCredentials', {username,password,company_key})
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   setErrorMessage("No server Response");
    //   console.log(error);
    // });

  //   const {data} = await axios.post('http://192.168.10.133:8000/validateCredentials', {
  //     username: username,
  //     password: password,
  //     company_key: company_key
  //   }, {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  // })
  // console.log(data)

}


  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    mockPostResponse();
    
   
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
    // localStorage.setItem(username, "ruderaw");

    // if (Object.keys(formErrors).length == 0 && isSubmit) {
    //   // Find user login info
    //   const userData = database.find(
    //     (user) => user.username === formValues.username
    //   );
    //   if (userData) {
    //     if (userData.password !== formValues.password) {
    //       // Invalid password
    //       setErrorMessage("Incorrect username,password or Company Key. Please enter the Correct Information and try again.")
    //       console.log("invalid password");
    //       show();
    //     } else {
    //       const hashedPassword=bcrypt.hashSync(userData.password,10)
    //       console.log(hashedPassword)
    //       // navigate("/dashboard");
    //       setIsSubmit(true);
    //       mockPostResponse();
    //       console.log("login successful");
    //     }
    //   } else {
    //     setErrorMessage("Incorrect username,password or Company Key. Please enter the Correct Information and try again.")
    //     console.log("user not found");
    //     show();
    //   }
    // }
  }, [formErrors]);
  return (
    <div className="flex gap-[75px] py-[20px]">
      <img
        className="w-[140px] h-[64px] ml-[19px]"
        src={Logo}
        alt="company Logo"
      />
      <div className="w-[826px] h-[540px] bg-white rounded-sm flex flex-col items-center">
        <div className="w-[400px] h-[300px] mt-[35px]">
          <div className="text-center text-[21px] mb-[35px]">Welcome Back!</div>
          <form className="space-y-[15px]" onSubmit={handleSubmit}>
            <div className="space-y-[12px]">
              <div className="space-y-[2px]">
                <div className="text-[#505050] text-[18px]">Username</div>
                <input
                  className="border-[1px] border-[#C6C6C6] w-[400px] h-[30px] text-[#505050]"
                  type="text"
                  name="username"
                  value="rudraw"
                  onChange={handleChange}
                  autoComplete="off"
                />
                <div className="text-[12px] text-[#CD0000] ">{formErrors.username}</div>
              </div>
              <div className="space-y-[2px]">
                <div className="text-[#505050] text-[18px] ">Password</div>
                <div className="m-[0px] p-[0px] relative">
                  <input
                    className="border-[1px] border-[#C6C6C6] w-[400px] h-[30px] text-[#505050]"
                    name="password"
                    type={type1}
                    value={formValues.password}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  <span className="w-[20px] h-[20px] absolute right-[10px] bottom-[3px]">
                    <img
                      className='cursor-pointer'
                      onClick={passwordToggle}
                      src={eyeIcon}
                      alt="eye-icon"
                    />
                  </span>
                </div>

                <div className="text-[12px] text-[#CD0000] ">{formErrors.password}</div>
              </div>
              <div className="space-y-[2px]">
                <div className="text-[#505050] text-[18px]">Company Key</div>
                <div className="m-[0px] p-[0px] relative">
                  <input
                    className="border-[1px] border-[#C6C6C6] w-[400px] h-[30px] text-[#505050]"
                    name="comkey"
                    type={type2}
                    value={formValues.comkey}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  <span className="w-[20px] h-[20px] absolute right-[10px] bottom-[3px]">
                    <img
                      className='cursor-pointer'
                      onClick={comkeyToggle}
                      src={eyeIcon}
                      alt="eye-icon"
                    />
                  </span>
                </div>

                <div className="text-[12px] text-[#CD0000] ">{formErrors.comkey}</div>
              </div>
            </div>

             {/* to create a space  */}
            <div className="w-[400px] h-[74px] bg-[#FFEAEA] rounded-[15px] border-[1px] border-[#CD0000] flex justify-center items-center px-[45px] py-[20px] text-[12px] invisible"></div>  

            {/* error message  */}
           {isSubmit && <div id="inputError" className="w-[400px] h-[74px] bg-[#FFEAEA] rounded-[15px] border-[1px] border-[#CD0000] flex justify-center items-center px-[45px] py-[20px] text-[12px] ">
              {errorMessage}
            </div>}

            {/* forgot section */}
            <div className="flex flex-col items-center justify-center gap-[10px]">
              <Link className="text-[#004DD7] text-[18px] cursor-pointer" to="/">Forget your password?</Link>
              <button className="bg-[#004DD7] w-[200px] h-[35px] text-white text-[18px] rounded-lg cursor-pointer">Login</button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
