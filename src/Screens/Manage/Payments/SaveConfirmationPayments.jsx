import React, { useEffect } from 'react'
import { Modal } from "@mui/material"
// import Cross from "../../../assets/cross.png"
import Cross from "../../../assets/cross.png"
import Draggable from 'react-draggable'
import { usernameByUserId } from '../../../utils/UsernameByUserId'
const SaveConfirmationPayments = (props) => {
    const close = () =>{
        props.handleClose();
        props.showCancel();
        props.setDefault();
    } 
    useEffect(() => {
        
    })
    return (
        <Modal open={true} >
            <>
                <Draggable>
                    <div className='w-2/4 h-64 rounded-xl bg-white mx-auto mt-48' >
                        <div className="h-[40px] flex justify-center items-center">
                            <div className="w-[150px] mt-10 w-full text-center">
                                <div className="text-[24px]">Add Payment</div>
                                <hr class="w-60 h-1 mx-auto  bg-gray-100"></hr>
                            </div>

                            <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                                <button onClick={() => {close()}}> <img className="w-[20px] h-[20px]" src={Cross} alt="cross" /></button>
                            </div>
                        </div>
                        <div className="mt-8 w-full text-center">
                            <div className="text-[14px]">Payment to : {props.currPaymentto}</div>
                            <div className="text-[14px]">Payment by: {props.currPaymentby} </div>
                        </div>
                        <div className="mt-4 w-full text-center">
                            <p className="text-[14px]">Are you sure you want to Add new Payment ?</p>
                        </div>
                        <div className="my-10 flex justify-center items-center gap-[10px]">
                            <button className='w-[132px] h-[48px] bg-[#004DD7] text-white rounded-md' onClick={props.addPayment}>Add</button>
                            <button className='w-[132px] h-[48px] border-[1px] border-[#282828] rounded-md' onClick={() => {close()}}>Cancel</button>
                        </div>
                    </div>
                </Draggable>
            </>
        </Modal>
    )
}

export default SaveConfirmationPayments
