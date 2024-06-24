import React from 'react';
import DeletePhoto from '../../../assets/delete.png'
import Cross from "../../../assets/cross.png";
import { Link } from 'react-router-dom';
import { Modal, Button, CircularProgress } from '@mui/material'
import { useState, useEffect } from "react";
import { APIService } from '../../../services/API';
import Draggable from 'react-draggable';
import useAuth from '../../../context/JwtContext';
const Delete = (props) => {
    const {user} = useAuth()
    const [showLoading, setShowLoading] = useState(false);
    const deleteCountry = async (item) => {
        // props.setShowDelete(true);
        // 
        setShowLoading(true);
        const data = { "user_id": user.id, "builder_id": props.currentBuilder };
        
        const response = await APIService.deleteBuilderInfo(data);
        await props.fetchData();
        setShowLoading(false);
        props.closeDialog(false);
        props.showSuccess();
    }
    const close = () => {
        props.closeDialog(false);
        props.showCancel(false);
    };
    return (
        <Modal open={props.isOpen}
            fullWidth={true}
            className='flex justify-center items-center rounded-lg'
        >
            <>
                <Draggable>
                    <div className='bg-white rounded-lg'>
                        <div className="w-auto h-auto flex flex-col justify-center items-center rounded-lg ">
                            <div className="h-[40px] flex justify-center items-center rounded-lg">
                                <div className="ml-56 mr-52">
                                    <div className="text-[16px]">Delete</div>
                                </div>
                                <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                                    <img onClick={() => close()} className="w-[20px] h-[20px]" src={Cross} alt="cross" />
                                </div>
                            </div>
                            <div className="mt-2 h-20 w-20 flex justify-center items-center rounded-full bg-[#FFEAEA] ">
                                <img className="h-10 w-10" src={DeletePhoto} alt="delete photo" />
                            </div>
                            <div className="mt-4 w-full text-center">
                                <p>Are you sure you want to delete the builder {props.currentBuilder}</p>
                            </div>
                            <div className="my-5 flex justify-center items-center gap-[10px]">
                                <button className='w-[100px] h-[35px] bg-red-700 text-white rounded-md' onClick={() => deleteCountry(props.item)}>Delete</button>
                                <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={() => close()}>Cancel</button>
                                {showLoading && <CircularProgress />}
                            </div>
                        </div>
                    </div>
                </Draggable>
            </>

        </Modal>
    )
}

export default Delete
