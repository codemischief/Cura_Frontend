import PropTypes from "prop-types";
import { Modal, Box, Typography, Button } from "@mui/material";

const SessionTimeoutModal = ({
  open,
  onContinue,
  onLogout,
  countdown,
}) => {
  return (
    <Modal open={open} disableEscapeKeyDown onClose={(event, reason) => reason === "backdropClick" ? null : onClose()}>
      <Box sx={{ ...modalStyle }}>
        <Typography variant="h6">
          Your session will expire soon. Please click continue to stay logged in.
        </Typography>
        <Typography variant="subtitle1" color="error">
          Logging out in {countdown} seconds...
        </Typography>
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={onContinue}>
            Continue
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={onLogout}
            sx={{ ml: 2 }}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

SessionTimeoutModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onContinue: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  countdown: PropTypes.number.isRequired,
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default SessionTimeoutModal;