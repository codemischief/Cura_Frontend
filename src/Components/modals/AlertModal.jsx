import PropTypes from "prop-types";
import { CheckCircleOutlined } from "@ant-design/icons";
import { ReportProblem } from "@mui/icons-material";
import { Modal } from "@mui/material";

const AlertModal = ({ isOpen, variant, message }) => {
  let modalIcon = {
    success: <CheckCircleOutlined color="green" />,
    cancel: <ReportProblem />,
  };

  return (
    <Modal
      open={isOpen}
      fullWidth={true}
      maxWidth={"md"}
      className="flex justify-center items-center"
    >
      <div className="w-2/4 h-64 rounded-xl bg-white mx-auto ">
        <div className="w-full h-64 pt-12">
          {/* <img src={SucessImage} className="h-24 w-24  mx-auto " /> */}
          {modalIcon[variant]}
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
