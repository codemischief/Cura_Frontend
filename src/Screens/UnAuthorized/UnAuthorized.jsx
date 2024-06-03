import { useEffect } from "react";
import Logo from "../../assets/logo.jpg";
import useAuth from "../../context/JwtContext";
import { useNavigate } from "react-router-dom";

const UnAuthorized = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      isAuthenticated ? navigate("/dashboard") : navigate("/login");
    }, 2000);
  }, []);

  return (
    <div className="flex w-screen h-screen py-20 justify-center bg-[#F5F5F5]">
      <img
        className="w-36 h-16 absolute left-5"
        src={Logo}
        alt="company Logo"
      />
      <div className="w-3/5 my-[1.75rem] h-full bg-white rounded-lg flex flex-col items-center self-center justify-start py-[3.55rem]">
        <div className=" flex flex-col h-fit w-full max-w-[35rem] text-center gap-[9.69rem] justify-start text-[#282828]">
          <h4 className="text-[1.3125rem]">Access Denied</h4>
          <p className="text-[1.5rem] leading-[2.25rem]">
            You are not authorised to perform this action. Please contact your
            administrator if you believe this is an error.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnAuthorized;
