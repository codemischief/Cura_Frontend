import PropTypes from "prop-types";
import { CheckCircleOutlined, ReportProblem } from "@mui/icons-material";
import { Modal } from "@mui/material";

export const alertVariant = {
  cancel: "cancel",
  success: "success",
};
const AlertModal = ({ isOpen, variant, message }) => {
  let modalIcon = {
    success: (
      <CheckCircleOutlined
        sx={{ fill: "#00BE00", fontSize: 100, stroke: "3px" }}
      />
    ),
    cancel: (
      <ReportProblem sx={{ fill: "white", fontSize: 100, stroke: "#FFB91E" }} />
    ),
  };

  return (
    <Modal
      open={isOpen}
      fullWidth={true}
      maxWidth={"md"}
      className="flex justify-center items-center"
    >
      <div className="w-2/4 h-64 rounded-xl bg-white mx-auto flex-col justify-center items-center">
        <div className="w-full h-64 pt-12 flex-col justify-center items-center">
          <div className="flex justify-center">{modalIcon[variant]}</div>
          <div className="w-full flex justify-center mt-6">
            <h1>{message}</h1>
          </div>
        </div>
      </div>
    </Modal>
  );
};

AlertModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  variant: PropTypes.oneOf(["success", "cancel"]).isRequired,
  message: PropTypes.string.isRequired,
};
export default AlertModal;
