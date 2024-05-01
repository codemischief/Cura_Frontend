import PropTypes from "prop-types";
// import Navbar from "../components/Navabar/Navbar";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navabar/NavigationBar";

const DashboardLayout = () => {
  return (
    <div className="h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
