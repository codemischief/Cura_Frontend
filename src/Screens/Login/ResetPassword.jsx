import { useState } from "react";
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
  const [backToLogin, setBackToLogin] = useState(false);
  const url = window.location.href;
  const token = url.match(/reset\/(.+)/)[1];

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Clear the error message for the corresponding field if condition is met
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
    }
    setForm({ ...form, [name]: value });
  };
  const handleBlur = async (e) => {
    const { name, value } = e.target;
    try {
      if (
        name === "password" ||
        (name === "confirmPassword" && value !== form.password)
      ) {
        await Yup.reach(passwordValidationSchema, name).validate(value);
      }
      setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
    } catch (err) {
      console.log("err", err);
      setErrors((prevErrors) => ({ ...prevErrors, [name]: err.message }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await passwordValidationSchema.validate(form, { abortEarly: false });

      const response = await APIService.changePassword(
        { password: form.password },
        token
      );
      if (response.status === 200) {
        setBackToLogin(true);
      }
    } catch (err) {
      if (err.inner) {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      } else {
        setErrors({
          backendErr: err.message || "An unexpected error occurred",
        });
      }
    }
  };

  const passwordValidationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  console.log("errors", errors);
  return (
    <div className="flex w-screen h-screen py-[20px] justify-center bg-[#F5F5F5]">
      <img
        className="w-[140px] h-[64px] absolute left-5"
        src={Logo}
        alt="company Logo"
      />
      <div className="w-3/5 h-[712px] bg-white rounded-lg flex flex-col items-center self-center justify-self-center">
        {!backToLogin ? (
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
                        errors?.password
                          ? "border-[#FF0000]"
                          : "border-[#C6C6C6]"
                      }`}
                      name="password"
                      type={openEyeIconPass ? "text" : "password"}
                      value={form.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
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
                      onBlur={handleBlur}
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
              {errors?.backendErr && (
                <div
                  id="inputError"
                  className="w-[400px] h-[74px] bg-[#FFEAEA] rounded-[15px] border-[1px] border-[#CD0000] flex justify-center items-center px-[45px] py-[20px] text-[12px]"
                >
                  {errors?.backendErr}
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
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-[124px]">
            <div className="w-full flex flex-col items-center gap-9">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="65"
                viewBox="0 0 64 65"
                fill="none"
              >
                <g clipPath="url(#clip0_1_421)">
                  <path
                    d="M32 0.537109C14.327 0.537109 0 14.8641 0 32.5371C0 50.2111 14.327 64.5371 32 64.5371C49.674 64.5371 64 50.2111 64 32.5371C64 14.8641 49.674 0.537109 32 0.537109ZM32 60.6001C16.561 60.6001 4 47.9761 4 32.537C4 17.098 16.561 4.53698 32 4.53698C47.439 4.53698 60 17.098 60 32.537C60 47.9759 47.439 60.6001 32 60.6001ZM44.771 20.8281L25.9959 39.7211L17.5409 31.2661C16.7599 30.4851 15.4939 30.4851 14.7119 31.2661C13.9309 32.0471 13.9309 33.3131 14.7119 34.0941L24.6109 43.9941C25.3919 44.7741 26.6579 44.7741 27.4399 43.9941C27.5299 43.9041 27.607 43.806 27.677 43.7041L47.601 23.657C48.381 22.876 48.381 21.61 47.601 20.8281C46.819 20.0471 45.553 20.0471 44.771 20.8281Z"
                    fill="#00BE00"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1_421">
                    <rect
                      width="64"
                      height="64"
                      fill="white"
                      transform="translate(0 0.537109)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <p className="text-[#282828]">
                Password reset successfully. Redirecting to the login page.
              </p>
            </div>
            <button
              className="bg-[#004DD7] w-[200px] h-[35px] text-white text-[18px] rounded-lg cursor-pointer"
              type="submit"
              onClick={() => {}}
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
