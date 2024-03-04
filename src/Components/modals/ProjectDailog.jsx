
import React from "react";
// import Dialog from "@mui/material/Dialog";
import Cross from "../assets/cross.png";
import { Link } from 'react-router-dom';
import { Modal } from "@mui/material";
import { useState, useEffect } from "react";
import Select from "react-select";
import Checkbox from '@mui/material/Checkbox';
const projectDialog = (props) => {

    //For closing a modal 
    const handleDialogClose = () => {
        props.setOpenDialog(false);
    };
   
    return (

        <Modal open={props.openDialog}
            fullWidth={true}
            maxWidth={'md'} >

            <div className='flex justify-center mt-[20px]'>
                <div className="w-50 h-[580px] bg-white rounded-lg">
                    <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center">
                        <div className="mr-[410px] ml-[410px]">
                            <div className="text-[16px]">New project</div>
                        </div>
                        <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                            <Link to="/manageprojectinfo"><img onClick={handleDialogClose} className="w-[20px] h-[20px]" src={Cross} alt="cross" /></Link>
                        </div>
                    </div>
                    <div className="mt-1 flex bg-[#DAE7FF] justify-evenly items-center h-9">
                        <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-40">
                            <div>Project Information</div>
                        </div>
                        <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-40">
                            <div>Project details</div>
                        </div>
                        <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-40">
                            <div>Bank details</div>
                        </div>
                        <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-40">
                            <div>Contacts</div>
                        </div>
                        <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-40">
                            <div>Photos</div>
                        </div>
                    </div>
                    <div className="flex items-center justify-evenly">
                        <div className="space-y-2">
                            <div className="">
                                <div>Project Name <label className="text-red-500">*</label></div>
                                <input type="text" className="border-[#C6C6C6] border-[1px] rounded-md w-52 h-6" />
                            </div>
                            <div className="">
                                <div>Project Type <label className="text-red-500">*</label></div>
                                <input type="text" className="border-[#C6C6C6] border-[1px] rounded-md w-52 h-6" />
                            </div>
                            <div className="">
                                <div>Address Line 1 <label className="text-red-500">*</label></div>
                                <input type="text" className="border-[#C6C6C6] border-[1px] rounded-md w-52 h-6" />
                            </div>
                            <div className="">
                                <div>Country<label className="text-red-500">*</label></div>
                                <input type="text" className="border-[#C6C6C6] border-[1px] rounded-md w-52 h-6" />
                            </div>
                            <div className="">
                                <div>State<label className="text-red-500">*</label></div>
                                <input type="text" className="border-[#C6C6C6] border-[1px] rounded-md w-52 h-6" />
                            </div>
                            <div className="">
                                <div>City<label className="text-red-500">*</label></div>
                                <input type="text" className="border-[#C6C6C6] border-[1px] rounded-md w-52 h-6" />
                            </div>
                            <div className="">
                                <div>Suburb<label className="text-red-500">*</label></div>
                                <input type="text" className="border-[#C6C6C6] border-[1px] rounded-md w-52 h-6" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="">
                                <div>Builder Name <label className="text-red-500">*</label></div>
                                <input type="text" className="border-[#C6C6C6] border-[1px] rounded-md w-52 h-6" />
                            </div>
                            <div className="">
                                <div>Mailing Group</div>
                                <input type="text" className="border-[#C6C6C6] border-[1px] rounded-md w-52 h-6" />
                            </div>
                            <div className="">
                                <div>Address Line 2</div>
                                <input type="text" className="border-[#C6C6C6] border-[1px] rounded-md w-52 h-6" />
                            </div>
                            <div className="">
                                <div>Zip code</div>
                                <input type="text" className="border-[#C6C6C6] border-[1px] rounded-md w-52 h-6" />
                            </div>
                            <div className="">
                                <div>Nearest Landmark</div>
                                <input type="text" className="border-[#C6C6C6] border-[1px] rounded-md w-52 h-6" />
                            </div>
                            <div className="">
                                <div>Subscribed E-mail</div>
                                <input type="text" className="border-[#C6C6C6] border-[1px] rounded-md w-52 h-6" />
                            </div>
                            <div className="">
                                <div>Website</div>
                                <input type="text" className="border-[#C6C6C6] border-[1px] rounded-md w-52 h-6" />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center space-x-2">
                    <div className="mt-[10px] flex justify-center items-center font-semibold text-[12px]"><Checkbox label="Active" />Tenet woking bachlors allowed</div>
                    <div className="mt-[10px] flex justify-center items-center font-semibold text-[12px]"><Checkbox label="Active" />Tenet student allowed</div>
                    <div className="mt-[10px] flex justify-center items-center font-semibold text-[12px]"><Checkbox label="Active" />Tenet Foreigners allowed</div>
                    </div>
                        <div className="mt-[10px] flex justify-center items-center gap-[10px]">
                            <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' type="submit">Save</button>
                            <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleDialogClose}>Cancel</button>
                        </div>
                </div>
            </div>
        </Modal>


    )
}

export default projectDialog;
