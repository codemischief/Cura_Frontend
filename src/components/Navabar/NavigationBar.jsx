import { useLocation } from "react-router-dom";
import MainLogo from "../Logo";
import MenuDesktop from "./NavMenu";
import { Button, Stack } from "@mui/material";
import { PowerSettingsNew } from "@mui/icons-material";
import { PATH_DASHBOARD } from "../../route/path";

const Navbar = () => {
  const { pathname } = useLocation();
  // console.log("PATH_DASHBOARD", PATH_DASHBOARD);
  const isHome = pathname === "/";
  return (
    <div className="w-full px-[36px] items-center justify-between flex h-[89px] gap-[36px] bg-blue-700 text-white">
      <MainLogo />
      <MenuDesktop isHome={isHome} isOffset={100} />
      <Stack
        direction={"row"}
        justifyContent={"start"}
        alignItems={"center"}
        gap={2}
      >
        <Button variant="contained">Dashboard</Button>
        <Button variant="contained">Change Password</Button>
        <Button variant="contained" startIcon={<PowerSettingsNew />}>
          Logout
        </Button>
      </Stack>
    </div>
  );
};

export default Navbar;
