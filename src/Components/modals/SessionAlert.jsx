import PropTypes from "prop-types";
import { Modal, Box, Typography, Button, Stack } from "@mui/material";

const SessionTimeoutModal = ({
  open,
  onContinue,
  onLogout,
  countdown,
}) => {
  return (
    <Modal open={open} disableEscapeKeyDown onClose={(event, reason) => reason === "backdropClick" ? null : onClose()}>
      <Box sx={{ ...modalStyle , borderRadius : '15px'}}>
        <Typography variant="h6" align="center">
          Your Session will Expire Soon. <hr/>
           Please click continue to Stay Logged In.
        </Typography>
        <Typography align="center" variant="subtitle1" color="error" sx={{
          marginTop : '10px'
        }}>
          Logging out in {countdown} seconds...
        </Typography>
        <Stack direction={"row"} justifyContent={'center'} mt={2} spacing={'30px'}>
          <Button 
                variant="outlined"
                //   onClick={handleShow}
                sx={{
                  height: "36px",
                  textTransform: "none",
                  color: "#004DD7",
                  borderRadius: "8px",
                  width: "133px",
                  fontSize: "14px",
                  border: "1px solid #004DD7",
                  fontWeight: "600px",
                  lineHeight: "18.9px",
                  "&:hover": {
                    //you want this to be the same as the backgroundColor above
                    backgroundColor: "#004DD7",
                    color: "#fff",
                  },
                }} onClick={onContinue}>
            Continue
          </Button>
          <Button
            variant="outlined"
            //   onClick={handleShow}
            sx={{
              height: "36px",
              textTransform: "none",
              color: "rgba(185, 28, 28, 0.9)",
              borderRadius: "8px",
              width: "133px",
              fontSize: "14px",
              border: "1px solid rgba(185, 28, 28, 0.9)",
              fontWeight: "600px",
              lineHeight: "18.9px",
              "&:hover": {
                //you want this to be the same as the backgroundColor above
                backgroundColor: "rgba(185, 28, 28, 0.9)",
                color: "#fff",
              },
            }}
            onClick={onLogout}
            // sx={{ ml: 2 }}
          >
            Logout
          </Button>
        </Stack>
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
  margin : 'auto',
  top : '40%',
  right : '35%',
  // transform: "translate(-50%, -50%)",
  width: '30%',
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default SessionTimeoutModal;