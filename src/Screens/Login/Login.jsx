import React, { useState } from "react";
import * as Yup from "yup";
import { Form, FormikProvider, useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../../assets/logo.jpg";
import eyeIcon from "../../assets/eye.jpg";
import EyeHide from "./../../assets/eyeHide.png";
import { toast } from "react-toastify";
import useAuth from "../../context/JwtContext";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
  companyKey: Yup.string().required("Company Key is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [type1, setType1] = useState("password");
  const [type2, setType2] = useState("password");
  const [openEyeIconPass, setOpenEyeIconPass] = useState(true);
  const [openEyeIconCom, setOpenEyeIconCom] = useState(true);
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
        // await login(values.username, values.password, values.companyKey);
        // toast.success("Login success");
        // navigate("/dashboard");
      } catch (error) {
        setApiError("Failed to login. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const passwordToggle = () => {
    setType1(type1 === "password" ? "text" : "password");
    setOpenEyeIconPass(!openEyeIconPass);
  };

  const comkeyToggle = () => {
    setType2(type2 === "password" ? "text" : "password");
    setOpenEyeIconCom(!openEyeIconCom);
  };
  console.log("formik.errors", formik.errors, formik.values);
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
          <FormikProvider value={formik.values}>
            <Form className="space-y-4" onSubmit={formik.handleSubmit}>
              <div className="space-y-3">
                <div className="space-y-0.5">
                  <div className="text-gray-700 text-lg">Username</div>
                  <input
                    className="border border-gray-300 w-full h-8 text-gray-700 px-3 text-sm"
                    type="text"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    autoComplete="off"
                  />
                  {formik.touched.username && formik.errors.username && (
                    <div className="text-red-600 text-xs">
                      {formik.errors.username}
                    </div>
                  )}
                </div>
                <div className="space-y-0.5">
                  <div className="text-gray-700 text-lg">Password</div>
                  <div className="relative">
                    <input
                      className="border border-gray-300 w-full h-8 text-gray-700 px-3 text-sm"
                      name="password"
                      type={type1}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      autoComplete="off"
                    />
                    <span
                      className="w-5 h-5 absolute right-2.5 bottom-0.5 cursor-pointer"
                      onClick={passwordToggle}
                    >
                      <img
                        src={openEyeIconPass ? eyeIcon : EyeHide}
                        alt="eye-icon"
                      />
                    </span>
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <div className="text-red-600 text-xs">
                      {formik.errors.password}
                    </div>
                  )}
                </div>
                <div className="space-y-0.5">
                  <div className="text-gray-700 text-lg">Company Key</div>
                  <div className="relative">
                    <input
                      className="border border-gray-300 w-full h-8 text-gray-700 px-3 text-sm"
                      name="companyKey"
                      type={type2}
                      value={formik.values.companyKey}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      autoComplete="off"
                    />
                    <span
                      className="w-5 h-5 absolute right-2.5 bottom-0.5 cursor-pointer"
                      onClick={comkeyToggle}
                    >
                      <img
                        src={openEyeIconCom ? eyeIcon : EyeHide}
                        alt="eye-icon"
                      />
                    </span>
                  </div>
                  {formik.touched.companyKey && formik.errors.companyKey && (
                    <div className="text-red-600 text-xs">
                      {formik.errors.companyKey}
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
                  to="/forgot-password"
                >
                  Forgot Password
                </Link>
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className={`w-50 h-9 text-white text-lg rounded-lg cursor-pointer ${
                    formik.isSubmitting
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-blue-700"
                  }`}
                >
                  {formik.isSubmitting ? "Loading..." : "Login"}
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
