import PropTypes from "prop-types";
import { Modal } from "@mui/material";
import Draggable from "react-draggable";
import { CrossIcon } from "../Svg/CrossIcon";
import DeleteIcon from "../Svg/DeleteIcon";
const CustomDeleteModal = ({
  openDialog,
  setOpenDialog,
  handleDelete,
  deleteError,
  text,
  isloading,
}) => {
  const handleDialogClose = () => {
    setOpenDialog(null);
  };

  return (
    <Modal
      open={openDialog}
      fullWidth={true}
      className="flex justify-center items-center rounded-lg"
    >
      <>
        <Draggable>
          <div className="bg-white rounded-lg w-[39.8865rem] h-[18.70369rem] flex items-center justify-center">
            <div className="w-auto h-auto  ">
              <div className=" relative h-[40px] justify-center flex items-center">
                <div className="mr-[210px] ml-[210px]">
                  <div className="text-[16px] font-semibold">Delete</div>
                </div>
                <div className="absolute top-[-0.5rem] right-[-3.75rem]">
                  <CrossIcon
                    bgColor="bg-[#EBEBEB]"
                    onClick={handleDialogClose}
                  />
                </div>
              </div>
              <div className="flex justify-center items-center">
                <DeleteIcon />
              </div>
              <span className="text-red-700 flex justify-center">
                {deleteError}
              </span>
              <div className="mt-4 w-full text-center">
                <p>Are you sure you want to delete this {text}?</p>
              </div>
              <div className="my-5 flex justify-center items-center gap-[10px]">
                <button
                  className={`w-[100px] h-[35px] rounded-md ${
                    isloading ? "bg-gray-500 cursor-not-allowed" : "bg-red-700"
                  } text-white`}
                  disabled={isloading}
                  onClick={handleDelete}
                >
                  {isloading ? "Deleting..." : "Delete"}
                </button>
                <button
                  className="w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md"
                  onClick={handleDialogClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Draggable>
      </>
    </Modal>
  );
};

CustomDeleteModal.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  setOpenDialog: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  deleteError: PropTypes.string,
};

CustomDeleteModal.defaultProps = {
  deleteError: "",
};
export default CustomDeleteModal;
