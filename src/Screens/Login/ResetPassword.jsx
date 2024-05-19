import React, { useState } from "react";
import Logo from "../../assets/logo.jpg";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import * as Yup from "yup";
import { APIService } from "../../services/API";

const ResetPassword = () => {
  const [openEyeIconPass, setOpenEyeIcon] = useState(false);
  const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const url = window.location.href;
  const token = url.match(/reset\/(.+)/)[1];


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // const handleBlur = async (e) => {
  //   const { name, value } = e.target;
  //   try {
  //     await Yup.reach(validationSchema, name).validate(value);
  //     setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
  //   } catch (err) {
  //     setErrors((prevErrors) => ({ ...prevErrors, [name]: err.message }));
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await validationSchema.validate(form, { abortEarly: false });
      // setErrors({});
     
      const response = await APIService.changePassword({"password":password},token);

      // Handle form submission (e.g., send data to the server)
    } catch (err) {
      // const validationErrors = {};
      // err.inner.forEach((error) => {
      //   validationErrors[error.path] = error.message;
      // });
      // setErrors(validationErrors);
    }
  };

  // const validationSchema = Yup.object().shape({
  //   password: Yup.string()
  //     .required("Password is required")
  //     .test(
  //       "password-validation",
  //       "Password must be at least 8 characters, include one uppercase letter, and one special character",
  //       function (value) {
  //         const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  //         return passwordRegex.test(value);
  //       }
  //     ),
  //   confirmPassword: Yup.string()
  //     .oneOf([Yup.ref("password"), null], "Passwords must match")
  //     .required("Confirm Password is required"),
  // });

  return (
    <div className="flex w-screen h-screen py-[20px] justify-center bg-[#F5F5F5]">
      <img
        className="w-[140px] h-[64px] absolute left-5"
        src={Logo}
        alt="company Logo"
      />
      <div className="w-3/5 h-[712px] bg-white rounded-lg flex flex-col items-center self-center justify-self-center">
        <div className="w-[400px] mt-[35px]">
          <div className="text-center text-[21px] mb-[150px]">
            Reset your password
          </div>
          <form className="space-y-[15px]" onSubmit={handleSubmit}>
            <div className="space-y-[12px]">
              <div className="space-y-[2px]">
                <div className="text-[#505050] text-[18px]">New Password</div>
                <div className="m-[0px] p-[0px] relative">
                  <input
                    className={`border-[1px] w-[400px] h-[48px] text-[#505050] px-3 text-[12px] ${
                      errors?.password ? "border-[#FF0000]" : "border-[#C6C6C6]"
                    }`}
                    name="password"
                    type={openEyeIconPass ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    autoComplete="off"
                  />
                  {openEyeIconPass ? (
                    <span className="w-[20px] h-[20px] absolute right-[10px] top-[10px]">
                      <Visibility
                        className="cursor-pointer"
                        onClick={() => setOpenEyeIcon(false)}
                      />
                    </span>
                  ) : (
                    <span className="w-[20px] h-[20px] absolute right-[10px] top-[10px]">
                      <VisibilityOff
                        className="cursor-pointer"
                        onClick={() => setOpenEyeIcon(true)}
                      />
                    </span>
                  )}
                </div>

                <div className="text-[12px] text-[#CD0000]">
                  {errors?.password}
                </div>
              </div>
            </div>
            <div className="space-y-[12px]">
              <div className="space-y-[2px]">
                <div className="text-[#505050] text-[18px]">
                  Confirm Password
                </div>
                <div className="m-[0px] p-[0px] relative">
                  <input
                    className={`border-[1px] w-[400px] h-[48px] text-[#505050] px-3 text-[12px] ${
                      errors.confirmPassword
                        ? "border-[#FF0000]"
                        : "border-[#C6C6C6]"
                    }`}
                    name="confirmPassword"
                    type={confirmPasswordEye ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    autoComplete="off"
                  />
                  {confirmPasswordEye ? (
                    <span className="w-[20px] h-[20px] absolute right-[10px] top-[10px]">
                      <Visibility
                        className="cursor-pointer"
                        onClick={() => setConfirmPasswordEye(false)}
                      />
                    </span>
                  ) : (
                    <span className="w-[20px] h-[20px] absolute right-[10px] top-[10px]">
                      <VisibilityOff
                        className="cursor-pointer"
                        onClick={() => setConfirmPasswordEye(true)}
                      />
                    </span>
                  )}
                </div>

                <div className="text-[12px] text-[#CD0000]">
                  {errors?.confirmPassword}
                </div>
              </div>
            </div>
            <div className="w-[400px] h-[74px] bg-[#FFEAEA] rounded-[15px] border-[1px] border-[#CD0000] flex justify-center items-center px-[45px] py-[20px] text-[12px] invisible"></div>

            {/* error message */}
            {(errors?.password || errors.confirmPassword) && (
              <div
                id="inputError"
                className="w-[400px] h-[74px] bg-[#FFEAEA] rounded-[15px] border-[1px] border-[#CD0000] flex justify-center items-center px-[45px] py-[20px] text-[12px]"
              >
                {errors?.password} {errors.confirmPassword}
              </div>
            )}
            <div className="flex flex-col items-center justify-center gap-[10px]">
              <button
                className="bg-[#004DD7] w-[200px] h-[35px] text-white text-[18px] rounded-lg cursor-pointer"
                type="submit"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
