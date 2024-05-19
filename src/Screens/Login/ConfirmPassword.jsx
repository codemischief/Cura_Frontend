import React, { useEffect, useState } from "react";
import Logo from "../../assets/logo.jpg";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import * as Yup from "yup";
import { APIService } from "../../services/API";
import { Navigate } from "react-router-dom";

const ConfirmPassword = () => {
  const [userName, setUserName] = useState(null);
  const [onSubmit, setOnsubmit] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUserName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userName) {
      try {
        const response = await APIService.resetPassword({ username: userName });

        if (!response.ok) {
          // Handle HTTP errors
          const errorResponse = await response.json();
          throw new Error(errorResponse.detail || "An error occurred");
        }
        const res = await response.json();
        console.log(res);
      } catch (err) {
        // Handle network or parsing errors
        console.error("Error:", err);
        setError(err.message || "An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    console.log(error, "error");
  }, [error]);

  return (
    <div className="flex w-screen h-screen  py-[20px] justify-center bg-[#F5F5F5]">
      <img
        className="w-[140px] h-[64px]  absolute left-5 "
        src={Logo}
        alt="company Logo"
      />
      <div className="w-3/5  h-[712px] bg-white rounded-lg flex flex-col items-center self-center justify-self-center">
        <div className="w-[400px] flex flex-col justify-between items-stretch h-full p-8">
          {onSubmit ? (
            <>
              <div className="text-center text-[21px] mt-[12px]">
                Reset your password
              </div>
              <div className="text-center text-[18px] mb-[50px]">
                A link to reset password has been sent to{" "}
                <span className="font-bold">shreyas2002sutar@gmail.com.</span>{" "}
                The link is valid only for 24 hrs.
              </div>
              ,
              <div className="flex flex-col items-center justify-center gap-[10px]">
                <button className="w-[200px] h-[35px] text-[18px] rounded-lg cursor-pointer bg-[#004DD7] text-[#ffff]">
                  Next
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="text-center text-[18px] flex flex-col gap-[40px]">
                <div className="text-center text-[21px] mt-[12px]">
                  Reset your password
                </div>
                <div className="text-center text-[18px] mt-[12px]">
                  Resetting your password is easy, enter your username below.
                </div>
              </div>
              <form
                className="space-y-[100px] py-[20px]"
                onSubmit={handleSubmit}
              >
                <div className="space-y-[12px]">
                  <div className="space-y-[2px]">
                    <div className="text-[#505050] text-[18px] ">
                      Enter Your Username
                    </div>
                    <div className="m-[0px] p-[0px] relative">
                      <input
                        className={`border-[1px]  w-[400px] h-[48px] text-[#505050] px-3 text-[12px]`}
                        name="userName"
                        type={"text"}
                        value={userName}
                        onChange={handleChange}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-[400px] h-[74px] bg-[#FFEAEA] rounded-[15px] border-[1px] border-[#CD0000] flex justify-center items-center px-[45px] py-[20px] text-[12px] invisible"></div>
                <div className="flex flex-col items-center justify-center gap-[10px]">
                  {error && (
                    <div
                      id="inputError"
                      className="w-[400px] h-[74px] bg-[#FFEAEA] rounded-[15px] border-[1px] border-[#CD0000] flex justify-center items-center px-[45px] py-[20px] text-[12px] "
                    >
                      {error}
                    </div>
                  )}
                  <button
                    className={`w-[200px] h-[35px] text-white text-[18px] rounded-lg cursor-pointer ${
                      userName ? "bg-[#004DD7] cursor-pointer" : "bg-[#787878]"
                    }`}
                    type="submit"
                    disabled={!userName}
                  >
                    Next
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmPassword;
