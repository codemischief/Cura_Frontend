import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navabar/NavigationBar";

const PrivateLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default PrivateLayout;
