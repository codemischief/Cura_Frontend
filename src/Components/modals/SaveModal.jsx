import React from 'react'
import { Modal } from '@mui/material'
import { useState, useEffect } from "react";
import Cross from "../../assets/cross.png";
import SucessImage from "../../assets/SuccessImage.png";
const  SaveModal=(props)=> {
    const [showLoading, setShowLoading] = useState(false);
    const handleClose = ()=>{

    }
    

  return (
    <div>
    <Modal open={props.isOpen} fullWidth={true} maxWidth={'md'}>
    <div className='w-2/4 h-64 rounded-xl bg-white mx-auto mt-48' >
    <div className="h-[40px] flex justify-center items-center">
                        <div className="ml-56 mr-52">
                            <div className="text-[16px]">Save Bank Statement</div>
                        </div>
                        <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                            <img onClick={() => props.closeDialog(false)} className="w-[20px] h-[20px]" src={Cross} alt="cross" />
                        </div>
     </div>
     <div className="mt-2 h-20 w-20 flex justify-center items-center rounded-full bg-[#FFEAEA] ">
                 <div className="text-[14px]">Client:</div>
                    </div>
                    <div className="mt-4 w-full text-center">
                        <p>Are you sure you want to Save Bank Statement</p>
                    </div>
                    <div className="my-5 flex justify-center items-center gap-[10px]">
                        <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' onClick={() => Save(props.item)}>Save</button>
                        <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleClose}>Cancel</button>
                    </div>
    </div>
</Modal>
</div>
  )
}

export default SaveModal