import React, { useState } from "react";
import { Modal, Button, CircularProgress } from "@mui/material";
import DeleteImage from "../../../assets/delete.png";
import Cross from "../../../assets/cross.png"
import { APIService } from "../../../services/API";
import Draggable from "react-draggable";
const DeletePaymentModal = (props) => {
  const [showLoading, setShowLoading] = useState(false);
  const handleDeleteClick = () => {
    //  props.handleDelete(props.item.name);
    props.handleDelete(props.item);
  }

  return (
    <Modal open={true}
            fullWidth={true}
            className='flex justify-center items-center rounded-lg'
             >

                <>
                <Draggable>
            <div className='bg-white rounded-lg'>
                <div className="w-auto h-auto flex flex-col justify-center items-center ">
                    <div className="h-[40px] flex justify-center items-center">
                        <div className="ml-56 mr-52">
                            <div className="text-[16px]">Delete</div>
                        </div>
                        <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                           <button onClick={props.handleClose}><img  className="w-[20px] h-[20px]" src={Cross} alt="cross" /></button> 
                        </div>
                    </div>
                    <div className="mt-2 h-20 w-20 flex justify-center items-center rounded-full bg-[#FFEAEA] ">
                        <img className="h-10 w-10" src={DeleteImage} alt="delete photo" />
                    </div>
                    <div className="mt-4 w-full text-center">
                        <p>Are you sure you want to delete ?</p>
                    </div>
                    <div className="my-5 flex justify-center items-center gap-[10px]">
                        <button className='w-[100px] h-[35px] bg-red-700 text-white rounded-md' onClick={handleDeleteClick}>Delete</button>
                        <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={props.handleClose}>Cancel</button>
                    </div>
                </div>
            </div>
                </Draggable>
                </>
        </Modal>
  );
};

export default DeletePaymentModal;