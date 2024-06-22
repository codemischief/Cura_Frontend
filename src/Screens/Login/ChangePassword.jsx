import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { APIService } from "../../services/API";
import useAuth from "../../context/JwtContext";
import { Modal } from "@mui/material";
import { setAccessToken } from "../../utils/axios";

const passwordValidationSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Password is required"),
  newPassword: Yup.string()
    .required("New Password is required")
    .notOneOf(
      [Yup.ref("oldPassword")],
      "New Password must be different from Old Password"
    ),
});

const ChangePassword = () => {
  console.log("login");
  const navigate = useNavigate();
  const [openEyeIconPass, setOpenEyeIcon] = useState(false);
  const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);
  const [backToLogin, setBackToLogin] = useState(false);
  const [apiError, setApiError] = useState("");
  const url = window.location.href;
  const { user } = useAuth();

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    validationSchema: passwordValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const response = await APIService.changePassword({
          user_id: user.id,
          password: values.oldPassword,
          newpass: values.newPassword,
        });
            
        setBackToLogin(true);
        setApiError(null);
      } catch (error) {
        setApiError(error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleNavigate = async()=>{
    const res = await APIService.logOut()
    setBackToLogin(false);
    navigate("/login");
    setAccessToken(null)
  }

  useEffect(() => {
    if (backToLogin) {
      setTimeout(() => {
        handleNavigate()
      }, 1000);
    }
  }, [backToLogin]);

  const { handleChange, values, errors, touched, handleSubmit, handleBlur } =
    formik;
  return (
    <div className="h-full mt-20 bg-white rounded-lg flex flex-col items-center self-center justify-self-center mx-10">
      <div className="w-[400px] mt-[35px]">
        <div className="text-center text-[21px] mb-[50px]">
          Reset your password
        </div>
        <FormikProvider value={values}>
          <Form
            className="space-y-[15px]"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="space-y-[12px]">
              <div className="space-y-[2px]">
                <div className="text-[#505050] text-[18px]">Old Password</div>
                <div className="m-[0px] p-[0px] relative">
                  <input
                    className={`border-[1px] w-[400px] h-[48px] text-[#505050] px-3 text-[12px] ${
                      errors?.oldPassword && touched.oldPassword
                        ? "border-[#FF0000]"
                        : "border-[#C6C6C6]"
                    }`}
                    name="oldPassword"
                    type={openEyeIconPass ? "text" : "password"}
                    onChange={handleChange}
                    value={values.password}
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

                {touched.oldPassword && errors.oldPassword && (
                  <div className="text-[12px] text-[#CD0000]">
                    {errors?.oldPassword}
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-[12px]">
              <div className="space-y-[2px]">
                <div className="text-[#505050] text-[18px]">New Password</div>
                <div className="m-[0px] p-[0px] relative">
                  <input
                    className={`border-[1px] w-[400px] h-[48px] text-[#505050] px-3 text-[12px] ${
                      errors.newPassword && touched.newPassword
                        ? "border-[#FF0000]"
                        : "border-[#C6C6C6]"
                    }`}
                    name="newPassword"
                    type={confirmPasswordEye ? "text" : "password"}
                    onChange={handleChange}
                    value={values.newPassword}
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

                {touched.newPassword && errors.newPassword && (
                  <div className="text-[12px] text-[#CD0000]">
                    {errors?.newPassword}
                  </div>
                )}
              </div>
            </div>
            <div className="w-[400px] h-[74px] bg-[#FFEAEA] rounded-[15px] border-[1px] border-[#CD0000] flex justify-center items-center px-[45px] py-[20px] text-[12px] invisible"></div>

            {/* error message */}

            {apiError && (
              <div
                id="inputError"
                className="w-[400px] h-[74px] bg-[#FFEAEA] rounded-[15px] border-[1px] border-[#CD0000] flex justify-center items-center px-[45px] py-[20px] text-[12px]"
              >
                {apiError}
              </div>
            )}
            <div className="flex flex-col items-center justify-center gap-[10px] pb-5">
              <button
                disabled={formik.isSubmitting}
                className="bg-[#004DD7] w-[200px] h-[35px] text-white text-[18px] rounded-lg cursor-pointer"
                type="submit"
              >
                {formik.isSubmitting ? "Reseting..." : "Reset"}
              </button>
            </div>
          </Form>
        </FormikProvider>
      </div>

      <Modal
        open={backToLogin}
        fullWidth={true}
        maxWidth={"md"}
        className="flex justify-center items-center"
      >
        <div className="flex flex-col items-center justify-center gap-[124px] bg-white w-[778px]  h-auto py-10 rounded-lg">
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
          {/* <button
              className="bg-[#004DD7] w-[200px] h-[35px] text-white text-[18px] rounded-lg cursor-pointer"
              type="submit"
              onClick={() => {
                navigate("/login");
              }}
            >
              Back to Login
            </button> */}
        </div>
      </Modal>
    </div>
  );
};

export default ChangePassword;
