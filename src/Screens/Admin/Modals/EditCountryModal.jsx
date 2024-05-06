import React, { useEffect, useState } from 'react'
import { Modal } from '@mui/material'
import Cross from "../../../assets/cross.png"
import { APIService } from '../../../services/API';
import Draggable from 'react-draggable';
const EditCountryModal = (props) => {
    console.log(props.currentCountry);
    const [showLoading, setShowLoading] = useState(false);
    const [countryName, setCountryName] = useState(props.currentCountry);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { value } = e.target;
        setCountryName(value);
    };
    const handleEdit = async () => {
        if (countryName == "") {
            setErrorMessage("Enter Country Name");
            return;
        }
        const data = {
            "user_id": 1234,
            "old_country_name": props.currentCountry,
            "new_country_name": countryName,
        }
        const response = await APIService.editCountry(data);
        props.showSuccess();
    }

    const handleClose = () => {
        props.setIsOpen(false);
        props.showCancel();
    }

    return (
        <Modal open={props.isOpen}
            fullWidth={true}
            maxWidth={'md'}
            className='flex justify-center items-center'
        >
            <>
                <Draggable>
                    <div className='flex justify-center '>
                        <div className="w-[778px]  h-[250px] bg-white rounded-lg">
                            <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-t-lg">
                                <div className="mr-[270px] ml-[270px]">
                                    <div className="text-[20px]">Edit Country</div>
                                </div>
                                <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                                    <button onClick={() => {  handleClose() }}><img className="w-[20px] h-[20px]" src={Cross} alt="cross" /></button>
                                </div>
                            </div>
                            <div className='mb-3 space-y-16'>
                                <div className="h-auto w-full mt-2 ">
                                    <div className="flex gap-[48px] justify-center items-center">
                                        <div className=" space-y-[12px] py-[20px] px-[10px]">
                                            <div className="">
                                                <div className="text-[14px]">Enter New Country Name<label className="text-red-500">*</label></div>
                                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm py-1 px-2 text-[12px]"
                                                    type="text"
                                                    name="countryName"
                                                    value={countryName}
                                                    onChange={handleChange}
                                                    autoComplete="off"
                                                />
                                                <div className="text-[12px] text-[#CD0000] ">{errorMessage}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className=" flex justify-center items-center gap-[10px]">
                                    <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' type="submit" onClick={handleEdit}>Save</button>
                                    <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={() => {  handleClose() }}>Cancel</button>
                                    {/* {isLoading && <CircularProgress/>} */}
                                </div>
                            </div>
                        </div>
                    </div>
                </Draggable>
            </>
        </Modal>
    )
}

export default EditCountryModal
