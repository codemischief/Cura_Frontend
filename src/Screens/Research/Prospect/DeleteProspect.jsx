import React from 'react';
import DeletePhoto from '../../../assets/delete.png'
import Cross from "../../../assets/cross.png";
import { Link } from 'react-router-dom';
import { Modal } from "@mui/material";
import { useState, useEffect } from "react";

const DeleteProspect = (props) => {
  const handleDialogClose = () => {
    props.setOpenDialog(false);
};

  return (
    <Modal open={props.openDialog}
            fullWidth={true}
            className='flex justify-center items-center rounded-lg'
             >
            <div className='bg-white'>
                <div className="w-auto h-auto  ">
                    <div className="h-[40px] justify-center flex items-center">
                        <div className="mr-[210px] ml-[210px]">
                            <div className="text-[16px] font-semibold">Delete</div>
                        </div>
                        <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                            <img onClick={handleDialogClose} className="w-[20px] h-[20px] cursor-pointer" src={Cross} alt="cross" />
                        </div>
                    </div>
                    <div className="ml-48 mt-2 h-20 w-20 flex justify-center items-center rounded-full bg-[#FFEAEA] ">
                        <img className="h-10 w-10" src={DeletePhoto} alt="delete photo" />
                    </div>
                    <div className="mt-4 w-full text-center">
                        <p>Are you sure you want to delete this prospect</p>
                    </div>
                    <div className="my-5 flex justify-center items-center gap-[10px]">
                        <button className='w-[100px] h-[35px] bg-red-700 text-white rounded-md' type="submit">Delete</button>
                        <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleDialogClose}>Cancel</button>
                    </div>
                </div>
            </div>

        </Modal>
  )
}

export default DeleteProspect
