import React from 'react'
import Cross from "../../../assets/cross.png"
import { Modal } from '@mui/material'
import { useState } from 'react'
import { APIService } from '../../../services/API'
import SucessfullModal from '../../../Components/modals/SucessfullModal'
const EditLobModal = (props) => {
    // const [showSuccess,setShowSuccess] = useState(false);
    const [editModalInput,setEditModalInput] = useState(props.item.name);
    const [errorMessage,setErrorMessage] = useState("");
    const handleEdit = async () => {
        if(editModalInput == "") {
            setErrorMessage("Lob Name Cannot Be Empty")
            return ;
        }
        const data = {
            "user_id":1234,
            "old_name":props.item.name,
            "new_name":editModalInput,
        }
        const response = await APIService.editLob(data);
        console.log(response);
        props.showSuccess();
     }
     
  return (
    <>
    
     <Modal open={props.isOpen}
                fullWidth={true}
                maxWidth={'md'}
                className='flex justify-center items-center' 
                >
                <div className='flex justify-center'>
                    <div className="w-[778px]  h-[255px] bg-white rounded-lg">
                        <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-t-lg">
                            <div className="mr-[290px] ml-[290px]">
                                <div className="text-[16px]">Edit Lob</div>
                            </div>
                            <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                                <button onClick={props.handleClose}><img className="w-[20px] h-[20px]" src={Cross} alt="cross" /></button>
                            </div>
                        </div>
                        <div className="space-y-16">
                        <div className="h-auto w-full mt-[15px] ">
                                <div className="flex gap-[48px] justify-center items-center">
                                    <div className=" space-y-[12px] py-[20px] px-[10px]">
                                        <div className="">
                                            <div className="text-[14px] text-[#505050]">LOB Name<label className="text-red-500">*</label></div>
                                            <input className="w-[217px] h-[22px] border-[1px] border-[#C6C6C6] rounded-sm py-1 px-2 text-[12px] text-[#505050]" type="text" name="empName" value={editModalInput} onChange={(e) => setEditModalInput(e.target.value)} />
                                            <div className="text-[12px] text-[#CD0000] ">{errorMessage}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=" flex justify-center items-center gap-[10px]">
                                <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' onClick={handleEdit}>Save</button>
                                <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={props.handleClose}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            </>
  )
}

export default EditLobModal
