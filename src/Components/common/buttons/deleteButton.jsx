import { Delete } from "@mui/icons-material";
import useAuth from "../../../context/JwtContext";
import { useLocation } from "react-router-dom";

import PropTypes from "prop-types";

const DeleteButton = ({ handleDelete, sx, rowData }) => {
  const { user } = useAuth();
  const { pathname } = useLocation();

  // if (!user.allowedModules[pathname]?.delete) return null;
  const hasAccess = (path) => {
   

    // Check if the exact path is allowed
    if (user.allowedModules[pathname]?.delete) {
      return true;
    }

    // Check for dynamic route access
    let newUrl = pathname?.replace(/\/\d+$/, "") + '/';
    return Object.keys(user.allowedModules).some(
      (allowedPath) =>
        path.startsWith(allowedPath) && user?.allowedModules[newUrl]?.delete
    );
  };
  if(!hasAccess(pathname)) {
    return null
  }
  return (
    <Delete
      sx={{
        ...sx,
        width: "20px",
        height: "20px",
        color: "gray",
        cursor: "pointer",
      }}
      onClick={() => handleDelete(rowData)}
    />
  );
};

DeleteButton.propTypes = {
  rowData: PropTypes.any,
  handleDelete: PropTypes.func,
  sx: PropTypes.any,
};
export default DeleteButton;
