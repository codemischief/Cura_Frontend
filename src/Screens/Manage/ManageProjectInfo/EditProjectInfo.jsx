import React, { useState } from 'react'
import { Modal } from '@mui/material'
import Cross from "../../../assets/cross.png"
import ProjectInformation from "./ManageProjectInfoForm/ProjectInformation";
import ProjectDetails from "./ManageProjectInfoForm/ProjectDetails";
import BankDetails from "./ManageProjectInfoForm/BankDetails";
import Contact from './ManageProjectInfoForm/Contact';
import Photos from './ManageProjectInfoForm/Photos';
const EditProjectInfo = ({handleClose}) => {
    const [selectedDialogue,setSelectedDialogue] = useState(1)
  return (
    <Modal open={true}
    fullWidth={true}
    maxWidth={'md'}
    className='flex justify-center items-center'
>
    <>
        <div className='flex justify-center'>
            <div className="w-[1050px] h-auto bg-white rounded-lg">
                <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-lg">
                    <div className="mr-[410px] ml-[410px]">
                        <div className="text-[16px]">Edit project</div>
                    </div>
                    <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white mr-2">
                        <button onClick={handleClose}><img className="w-[20px] h-[20px] " src={Cross} alt="cross" /></button>
                    </div>
                </div>
                <div className="mt-1 flex bg-[#DAE7FF] justify-evenly items-center h-9">
                    <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-40" >
                        <button onClick={() => setSelectedDialogue(1)}><div>Project Information</div></button>
                    </div>
                    <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-40">
                        <button onClick={() => setSelectedDialogue(2)}><div>Project details</div></button>
                    </div>
                    <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-40">
                        <button onClick={() => setSelectedDialogue(3)}><div>Bank details</div></button>
                    </div>
                    <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-40">
                        <button onClick={() => setSelectedDialogue(4)}><div>Contacts</div></button>
                    </div>
                    <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-40">
                        <button onClick={() => setSelectedDialogue(5)}><div>Photos</div></button>
                    </div>
                </div>
                {selectedDialogue == 1 && <ProjectInformation />}
                {selectedDialogue == 2 && <ProjectDetails />}
                {selectedDialogue == 3 && <BankDetails />}
                {selectedDialogue == 4 && <Contact />}
                {selectedDialogue == 5 && <Photos />}
                <div className="my-2 flex justify-center items-center gap-[10px]">
                    <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md'> Update</button>
                    <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleClose}>Cancel</button>
                </div>
            </div>
        </div>
    </>
</Modal>
  )
}

export default EditProjectInfo
