import PropTypes from "prop-types";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import useAuth from "../../context/JwtContext";
import { useLocation } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

const AddButton = ({ onClick = () => {}, title = "Add new", sx, icon }) => {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const hasAccess = (path) => {
   

    // Check if the exact path is allowed
    if (user.allowedModules[pathname]?.add) {
      return true;
    }

    // Check for dynamic route access
    return Object.keys(user.allowedModules).some(
      (allowedPath) =>
        path.startsWith(allowedPath) && user.allowedModules[allowedPath].add
    );
  };
  if(!hasAccess(pathname)) {
    return null
  }
    
  return (
    <Button
      sx={{
        backgroundColor: "#004DD7",
        color: "white",
        height: "36px",
        width: "240px",
        fontSize: "16px",
        fontWeight: 500,
        lineHeight: "1.18125rem",
        borderRadius: "8px",
        textTransform: "none",
        "&:hover": {
          backgroundColor: "#004DD7", // Keep the background color unchanged
        },
        ...sx,
      }}
      onClick={onClick}
    >
      {/* <div className="flex items-center justify-center gap-6">{title}</div>
      {!icon ? <Add sx={{ height: "18px", width: "18px" }} /> : icon} */}
      <div className="flex items-center justify-center gap-4">
        {title}
        {!icon ? <PlusOutlined className="fill-white stroke-2" /> : icon}
      </div>
    </Button>
  );
};

export default AddButton;

AddButton.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  icon: PropTypes.element,
  sx: PropTypes.any,
};
