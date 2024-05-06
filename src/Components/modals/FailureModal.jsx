import React from 'react'
import { Modal } from '@mui/material'
import FailureImage from "../../assets/FailureImage.png";
const FailureModal = (props) => {
  return (
    <Modal open={props.isOpen} fullWidth={true} maxWidth={'md'} className='flex items-center justify-center'>
        <div className='w-2/4 h-64 rounded-xl bg-white mx-auto ' >
           <div className='w-full h-64 pt-12'>
                <img src={FailureImage} className='h-24 w-24  mx-auto '/>
                <div className='w-full flex justify-center mt-6'>
                    <h1>{props.message}</h1>
                </div>
           </div>
           
        </div>
    </Modal>
  )
}

export default FailureModal
