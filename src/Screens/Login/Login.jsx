import React, { useState } from "react";
import * as Yup from "yup";
import { Form, FormikProvider, useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../../assets/logo.jpg";
import eyeIcon from "../../assets/eye.jpg";
import EyeHide from "./../../assets/eyeHide.png";
import { toast } from "react-toastify";
import useAuth from "../../context/JwtContext";
import { CircularProgress } from "@mui/material";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
  companyKey: Yup.string().required("Company Key is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [openEyeIconPass, setOpenEyeIconPass] = useState(false);
  const [openEyeIconCom, setOpenEyeIconCom] = useState(false);
  const [apiError, setApiError] = useState("");

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      companyKey: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      setApiError("");
      try {
        await login(values.username, values.password, values.companyKey);
        toast.success("Login success");
        navigate("/dashboard");
      } catch (error) {
        toast.error("Login Failed");
        setApiError("Failed to login. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const passwordToggle = () => {
    setOpenEyeIconPass(!openEyeIconPass);
  };

  const comkeyToggle = () => {
    setOpenEyeIconCom(!openEyeIconCom);
  };

  const {
    errors,
    values,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = formik;

  return (
    <div className="flex w-screen h-screen py-20 justify-center bg-[#F5F5F5]">
      <img
        className="w-36 h-16 absolute left-5"
        src={Logo}
        alt="company Logo"
      />
      <div className="w-3/5 h-144 bg-white rounded-lg flex flex-col items-center self-center justify-self-center">
        <div className="w-96 h-75 mt-9">
          <div className="text-center text-2xl mb-9">Login Panel</div>
          <FormikProvider value={values}>
            <Form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-3">
                <div className="space-y-0.5">
                  <div className="text-gray-700 text-lg">Username</div>
                  <input
                    className="border border-gray-300 w-full h-8 text-gray-700 px-3 text-sm"
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="off"
                  />
                  {touched.username && errors.username && (
                    <div className="text-red-600 text-xs">
                      {errors.username}
                    </div>
                  )}
                </div>
                <div className="space-y-0.5">
                  <div className="text-gray-700 text-lg">Password</div>
                  <div className="relative">
                    <input
                      className="border border-gray-300 w-full h-8 text-gray-700 px-3 text-sm"
                      name="password"
                      type={openEyeIconPass ? "text" : "password"}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      autoComplete="off"
                    />
                    <span
                      className="w-5 h-5 absolute right-2.5 bottom-[6px] cursor-pointer"
                      onClick={passwordToggle}
                    >
                      <img
                        src={openEyeIconPass ? eyeIcon : EyeHide}
                        alt="eye-icon"
                      />
                    </span>
                  </div>
                  {touched.password && errors.password && (
                    <div className="text-red-600 text-xs">
                      {errors.password}
                    </div>
                  )}
                </div>
                <div className="space-y-0.5">
                  <div className="text-gray-700 text-lg">Company Key</div>
                  <div className="relative">
                    <input
                      className="border border-gray-300 w-full h-8 text-gray-700 px-3 text-sm"
                      name="companyKey"
                      type={openEyeIconCom ? "text" : "password"}
                      value={formik.values.companyKey}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      autoComplete="off"
                    />
                    <span
                      className="w-5 h-5 absolute right-2.5 bottom-[6px] cursor-pointer"
                      onClick={comkeyToggle}
                    >
                      <img
                        src={openEyeIconCom ? eyeIcon : EyeHide}
                        alt="eye-icon"
                      />
                    </span>
                  </div>
                  {touched.companyKey && errors.companyKey && (
                    <div className="text-red-600 text-xs">
                      {errors.companyKey}
                    </div>
                  )}
                </div>
              </div>
              {apiError && (
                <div className="w-full bg-red-100 rounded-lg border border-red-600 flex justify-center items-center px-11 py-5 text-xs text-red-600">
                  {apiError}
                </div>
              )}
              <div className="flex flex-col items-center justify-center gap-2.5">
                <Link
                  className="text-blue-700 text-lg cursor-pointer"
                  to="/reset"
                >
                  Forgot Password
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-[200px] h-9 text-white text-lg rounded-lg cursor-pointer ${
                    isSubmitting
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-blue-700"
                  }`}
                >
                  {isSubmitting ? (
                    <CircularProgress sx={{ color: "white" }} />
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </Form>
          </FormikProvider>
        </div>
      </div>
    </div>
  );
};

export default Login;
