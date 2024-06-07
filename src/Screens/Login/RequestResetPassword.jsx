import { useState } from "react";
import { APIService } from "../../services/API";
import AuthLayout from "../../Components/common/AuthLayout";

const RequestResetPassword = () => {
  const [userName, setUserName] = useState("");
  const [onSubmit, setSubmit] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUserName(e.target.value);
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userName) {
      try {
        const response = await APIService.resetPassword({ username: userName });
        if (response.status === 200) {
          setUserEmail(response?.data?.data);
          setSubmit(true);
        }
      } catch (err) {
        setError(err.message || "An unexpected error occurred");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="w-3/5  h-[712px] bg-white rounded-lg flex flex-col items-center self-center justify-self-center">
        <div className="w-[400px] flex flex-col justify-between items-stretch h-full p-8">
          {onSubmit ? (
            <>
              <div className="text-center text-[21px] mt-[12px]">
                Reset your password
              </div>
              <div className="text-center text-[18px] mb-[50px]">
                A link to reset password has been sent to{" "}
                <span className="font-bold">{userEmail}</span> The link is valid
                only for 24 hrs.
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
    </AuthLayout>
  );
};

export default RequestResetPassword;
