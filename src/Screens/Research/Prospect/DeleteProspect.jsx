import React from "react";
import DeletePhoto from "../../../assets/delete.png";
import Cross from "../../../assets/cross.png";
import { Link } from "react-router-dom";
import { Modal } from "@mui/material";
import { useState, useEffect } from "react";
import { APIService } from "../../../services/API";
import Draggable from "react-draggable";
const DeleteProspect = ({
  openDialog,
  setOpenDialog,
  handleDelete,
  deleteError,
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
          <div className="bg-white rounded-lg">
            <div className="w-auto h-auto  ">
              <div className="h-[40px] justify-center flex items-center">
                <div className="mr-[210px] ml-[210px]">
                  <div className="text-[16px] font-semibold">Delete</div>
                </div>
                <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                  <img
                    onClick={handleDialogClose}
                    className="w-[20px] h-[20px] cursor-pointer"
                    src={Cross}
                    alt="cross"
                  />
                </div>
              </div>
              <div className="ml-48 mt-2 h-20 w-20 flex justify-center items-center rounded-full bg-[#FFEAEA] ">
                {/* <img className="h-10 w-10" src={DeletePhoto} alt="delete photo" /> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="49"
                  height="49"
                  viewBox="0 0 49 49"
                  fill="none"
                >
                  <path
                    d="M14.0918 42.334C12.9918 42.334 12.0505 41.9426 11.2678 41.16C10.4851 40.3773 10.0931 39.4353 10.0918 38.334V12.334H8.0918V8.33398H18.0918V6.33398H30.0918V8.33398H40.0918V12.334H38.0918V38.334C38.0918 39.434 37.7005 40.376 36.9178 41.16C36.1351 41.944 35.1931 42.3353 34.0918 42.334H14.0918ZM34.0918 12.334H14.0918V38.334H34.0918V12.334ZM18.0918 34.334H22.0918V16.334H18.0918V34.334ZM26.0918 34.334H30.0918V16.334H26.0918V34.334Z"
                    fill="#CD0000"
                  />
                </svg>
              </div>
              <span className="text-red-700 flex justify-center">
                {deleteError}
              </span>
              <div className="mt-4 w-full text-center">
                <p>Are you sure you want to delete this prospect</p>
              </div>
              <div className="my-5 flex justify-center items-center gap-[10px]">
                <button
                  className="w-[100px] h-[35px] bg-red-700 text-white rounded-md"
                  onClick={handleDelete}
                >
                  Delete
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

export default DeleteProspect;
