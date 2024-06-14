import React from 'react'
import Cross from "../../../assets/cross.png"
import { Modal } from '@mui/material'
import { useState } from 'react'
import { APIService } from '../../../services/API'
import Draggable from 'react-draggable'
import useAuth from '../../../context/JwtContext'
const EditLocalityModal = (props) => {
    const { user } = useAuth()
    // const [showSuccess,setShowSuccess] = useState(false);
    const [inputField, setInputField] = useState(props.item.locality);
    const [formErrors,setFormErrors] = useState("");
    const handleUpdate = async () => {
        if (inputField == "") {
            setFormErrors("Enter Locality Name")
            return;
        }else {
            setFormErrors("")
        }
        const data = {
            "user_id": user.id,
            "id": props.item.id,
            "locality": inputField,
            "cityid": props.item.cityid
        }
        const response = await APIService.editLocality(data);
        // props.handleClose();
        props.openPrompt();
    }

    const handleClose = () => {
        props.handleClose();
        props.showCancel();
    }
    return (
        <>
            <Modal open={true}
                fullWidth={true}
                maxWidth={'md'} 
                className='flex justify-center items-center'>
                <>
                    <Draggable handle='div.move'>
                        <div className='flex justify-center items-center'>
                            <div className="w-[700px]  h-auto bg-white rounded-lg mb-3">
                                <div className='move cursor-move'>
                                        <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-t-lg relative">
                                            <div className="mr-[200px] ml-[200px]">
                                                <div className="text-[16px]">Update Locality Name</div>
                                            </div>
                                            <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white absolute right-2">
                                                <button  onClick={() => {handleClose()}}>
                                                    <img className="w-[20px] h-[20px]" src={Cross} alt="cross" />
                                                </button>
                                            </div>
                                        </div>
                                </div>
                                <div className="h-auto w-full mt-[5px] ">
                                    <div className="flex gap-[48px] justify-center items-center">
                                        <div className=" space-y-[12px] py-[20px] px-[10px]">
                                            <div className="mb-4">
                                                <div className="text-[14px]">Country Name<label className="text-red-500">*</label></div>
                                                <div className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 py-[2px] text-[11px] bg-[#F5F5F5]">
                                                    {props.item.country}
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <div className="text-[14px]">State Name<label className="text-red-500">*</label></div>
                                                <div className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 py-[2px] text-[11px] bg-[#F5F5F5]">
                                                    {props.item.state}
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <div className="text-[14px]">City Name<label className="text-red-500">*</label></div>
                                                <div className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 py-[2px] text-[11px] bg-[#F5F5F5]">
                                                    {props.item.city}
                                                </div>
                                            </div>
                                            <div className="">
                                                <div className="text-[14px]">Locality Name<label className="text-red-500">*</label></div>
                                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 py-[2px] text-[11px]" type="text" name="empName" value={inputField} onChange={(e) => setInputField(e.target.value)} />
                                                <div className="text-[9px] text-[#CD0000] absolute">{formErrors}</div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className="mt-[10px] flex justify-center items-center gap-[10px] mb-3">

                                    <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' type="submit" onClick={handleUpdate}>Save</button>
                                    <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={() => {handleClose()}}>Cancel</button>
                                </div>

                            </div>
                        </div>
                    </Draggable>
                </>
            </Modal>
        </>
    )
}

export default EditLocalityModal
