import React from 'react'
import Cross from "../../../assets/cross.png"
import { Modal } from '@mui/material'
import { useState } from 'react'
import { APIService } from '../../../services/API'
const EditLocalityModal = (props) => {
    // const [showSuccess,setShowSuccess] = useState(false);
    const [inputField,setInputField] = useState(props.item.locality);
    
    const handleUpdate = async () => {
        if(inputField == "") {
            return ;
        }
        const data = {
            "user_id" : 1234,
            "id" : props.item.id,
            "locality" : inputField,
            "cityid" : props.item.cityid
        }
        const response = await APIService.editLocality(data);
        // props.handleClose();
        props.openPrompt();
    }
  return (
    <>
    <Modal open={true}
                fullWidth={true}
                maxWidth={'md'} >
                <div className='flex justify-center mt-[150px]'>
                    <div className="w-6/7  h-[400px] bg-white rounded-lg">
                        <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center">
                            <div className="mr-[410px] ml-[410px]">
                                <div className="text-[16px]">Update Locality Name</div>
                            </div>
                            <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                                <button onClick={props.handleClose}><img className="w-[20px] h-[20px]" src={Cross} alt="cross" /></button>
                            </div>
                        </div>
                        
                            <div className="h-auto w-full mt-[5px] ">
                                <div className="flex gap-[48px] justify-center items-center">
                                    <div className=" space-y-[12px] py-[20px] px-[10px]">
                                        <div className="">
                                            <div className="text-[14px]">Country Name<label className="text-red-500">*</label></div>
                                            <div className="w-[230px] hy-[10px]  rounded-sm">
                                                 {props.item.country}
                                            </div>
                                        </div>
                                        <div className="">
                                        <div className="text-[14px]">State Name<label className="text-red-500">*</label></div>
                                            <div className="w-[230px] hy-[10px]  rounded-sm">
                                               {props.item.state}
                                            </div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">City Name<label className="text-red-500">*</label></div>
                                            <div className="w-[230px] hy-[10px]  rounded-sm">
                                               {props.item.city}
                                            </div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Locality Name<label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="empName" value={inputField} onChange={(e) => setInputField(e.target.value)} />
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="mt-[10px] flex justify-center items-center gap-[10px]">

                                <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' type="submit" onClick={handleUpdate}>Update</button>
                                <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={props.handleClose}>Cancel</button>
                            </div>
                        
                    </div>
                </div>
            </Modal>
            </>
  )
}

export default EditLocalityModal
