import React, { useState } from "react";
import { Modal, Button, CircularProgress } from "@mui/material";
import DeleteImage from "../../assets/delete.png";
import Cross from "../../assets/cross.png";
import { APIService } from "../../services/API";
import CancelModel from "./CancelModel";
import Draggable from "react-draggable";
import useAuth from "../../context/JwtContext";
const DeleteModal = (props) => {
    const { user} = useAuth()
    const [showLoading, setShowLoading] = useState(false);
    const deleteCountry = async (item) => {
        // props.setShowDelete(true);
        const data = { user_id: user.id, country_name: props.currentCountry };
        setShowLoading(true);
        console.log(data);
        const response = await APIService.deleteCountries(data);
        const res = await response.json()
        // const response = await fetch("http://192.168.10.133:8000/deleteCountry", {
        //   method: "POST",
        //   body: JSON.stringify(data),
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // });
        setShowLoading(false);
        props.closeDialog(false);
        if (res.result == 'success') {
            props.showSuccess();
            // console.log('hi')
        }
        props.fetchData();
    };

    const handleClose = () => {
        props.closeDialog(false);
        props.showCancel();
    }

    return (
        <>
            <Modal open={props.isOpen}
                fullWidth={true}
                className='flex justify-center items-center rounded-lg'
            >
                <>
                    <Draggable>
                        <div className='bg-white rounded-lg'>

                            <div className="w-auto h-auto flex flex-col justify-center items-center ">
                                <div className="h-[40px] bg-[#EDF3FF] flex justify-center items-center relative rounded-t-lg">
                                    <div className="ml-56 mr-52">
                                        <div className="text-[16px]">Delete</div>
                                    </div>
                                    <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white absolute right-2">
                                        <button onClick={() => handleClose()}><img className="w-[20px] h-[20px]" src={Cross} alt="cross" /></button>
                                    </div>
                                </div>
                                <div className="mt-2 h-20 w-20 flex justify-center items-center rounded-full bg-[#FFEAEA] ">
                                    <img className="h-10 w-10" src={DeleteImage} alt="delete photo" />
                                </div>
                                <div className="font-semibold mt-8 mb-1"><h1>Country - {props.currentCountry}</h1></div>
                                <div className="w-full text-center">
                                    <p>Are you sure you want to delete the Country</p>
                                </div>
                                <div className="my-5 flex justify-center items-center gap-[10px]">
                                    <button className='w-[100px] h-[35px] bg-red-700 text-white rounded-md' onClick={() => deleteCountry(props.item)}>Delete</button>
                                    <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={() => handleClose()}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </Draggable>
                </>
            </Modal>
        </>
    );
};

export default DeleteModal;