import Logo from "../../assets/logo.jpg";

const UnAuthorized = () => {
  return (
    <div className="flex w-screen h-screen py-20 justify-center bg-[#F5F5F5]">
      <img
        className="w-36 h-16 absolute left-5"
        src={Logo}
        alt="company Logo"
      />
      <div className="w-3/5 my-[1.75rem] h-full bg-white rounded-lg flex flex-col items-center self-center justify-self-center">
        <div className="h-full w-full">
          <h4>Access Denied</h4>
          <p>
            You are not authorised to perform this action. Please contact your
            administrator if you believe this is an error.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnAuthorized;
