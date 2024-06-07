import PropTypes from "prop-types";
import Logo from "../../assets/logo.jpg";

const AuthLayout = ({ children }) => {
  return (
    <div className="w-screen h-screen px-[1.72rem] py-[1.75rem] flex items-start justify-center gap-[4.32rem] bg-[#F5F5F5]">
      <div
        className="relative w-full max-w-[54.125rem] max-h-[44.5rem] h-full px-[13.84rem] pt-[3.75rem] pb-[2.4rem] bg-white rounded-lg
     flex flex-col items-center self-center justify-self-center"
      >
        {children}
        <div className="absolute top-0 -left-[13.37rem] w-fit h-fit">
          <img className="w-36 h-16 left-5" src={Logo} alt="company Logo" />
        </div>
      </div>
    </div>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AuthLayout;
