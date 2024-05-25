import { useLocation } from "react-router-dom";
// import MainLogo from "../Logo";
import { Button, Stack } from "@mui/material";
import { PowerSettingsNew } from "@mui/icons-material";
import MenuDesktop from "./DeskTopMenu";
import MainLogo from "../Svg/logo";
const buttonStyle = {
  color: "white",
  height: "26px",
  padding: "6px 12px",
  textAlign: "center",
  fontFamily: "Open Sans",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "85.714%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  ":hover ": {
    background: "white",
    color: "blue",
    textDecoration: "none",
    borderRadius: "5px",
  },
};
const Navbar = () => {
  const { pathname } = useLocation();
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
        <Button sx={{ ...buttonStyle, width: "142px" }}>Dashboard</Button>
        <Button sx={buttonStyle}>Change Password</Button>
        <Button
          sx={{ ...buttonStyle, width: "142px" }}
          startIcon={<PowerSettingsNew />}
        >
          Logout
        </Button>
      </Stack>
    </div>
  );
};
export default Navbar;
