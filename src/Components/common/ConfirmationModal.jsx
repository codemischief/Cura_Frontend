import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { Modal, Stack, Typography } from "@mui/material";
// import Cross from "../../../../assets/cross.png"
import Draggable from "react-draggable";
import { CloseOutlined } from "@ant-design/icons";

const ConfirmationModal = ({
  open,
  title,
  description,
  btnTitle,
  onClose,
  onSubmit,
}) => {
  console.log("open", open);
  return (
    <Modal open={open}>
      <>
        <Draggable>
          <div className=" flex flex-col w-[638px] h-[316px] rounded-xl bg-white justify-center items-center">
            <button
              onClick={onClose}
              className="flex self-end mr-[50px] mt-[10px]"
            >
              {/* <img className="w-[20px] h-[20px]" src={Cross} alt="cross" /> */}
              <CloseOutlined />
            </button>
            <Stack direction={"column"} gap={"55px"}>
              <Stack direction={"column"} gap={"12px"}>
                <Typography
                  sx={{
                    alignContent: "center",
                    fontFamily: "Open Sans",
                    fontSize: "24px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "135%",
                  }}
                >
                  {" "}
                  {title}
                </Typography>
                <hr className="h-1 w-full bg-gray-100"></hr>
              </Stack>
              <div>{description}</div>
            </Stack>

            <div className="my-10 flex justify-center items-center gap-[10px]">
              <button
                className="w-[132px] h-[48px] bg-[#004DD7] text-white rounded-md"
                onClick={onSubmit}
              >
                {btnTitle}
              </button>
              <button
                className="w-[132px] h-[48px] border-[1px] border-[#282828] rounded-md"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </Draggable>
      </>
    </Modal>
  );
};

// PropTypes
ConfirmationModal.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  btnTitle: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  //   content: PropTypes.node.isRequired,
};

export default ConfirmationModal;
