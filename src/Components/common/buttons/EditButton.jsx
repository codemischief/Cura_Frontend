import React from "react";
import PropTypes from "prop-types";
import { Create } from "@mui/icons-material";
import useAuth from "../../../context/JwtContext";
import { useLocation } from "react-router-dom";

const EditButton = ({ handleEdit, sx, rowData }) => {
  const { user } = useAuth();
  const { pathname } = useLocation();
   
  // if (!user.allowedModules[pathname]?.edit) return null;
  return (
    <Create
      sx={{
        ...sx,
        width: "20px",
        height: "20px",
        color: "gray",
        cursor: "pointer",
      }}
      onClick={() => handleEdit(rowData)}
    />
  );
};

EditButton.propTypes = {
  rowData: PropTypes.any,
  handleEdit: PropTypes.func,
  icon: PropTypes.element,
  sx: PropTypes.any,
};

export default EditButton;
