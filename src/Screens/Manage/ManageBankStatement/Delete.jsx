import React from 'react';
import DeletePhoto from '../../../assets/delete.png'
import Cross from "../../../assets/cross.png";
import { Link } from 'react-router-dom';
import { Modal , Button ,CircularProgress} from '@mui/material'
import { useState, useEffect } from "react";
import { APIService } from '../../../services/API';
const Delete = (props) => {
    const [showLoading,setShowLoading] = useState(false);
    const deleteStatement = async (item) =>{
        // props.setShowDelete(true);
        // console.log(props.currentBuilder);
        setShowLoading(true);
        const data = {"user_id":1234,"builder_id": props.currentBuilder};
        console.log(data);
        const response = await APIService.deleteBankStatement(data);
          await props.fetchData();
          setShowLoading(false);
          props.closeDialog(false);
          
      }
  return (
    <Modal open={props.isOpen}
            fullWidth={true}
            className='flex justify-center items-center rounded-lg'
             >
            <div className='bg-white'>
                <div className="w-auto h-auto flex flex-col justify-center items-center ">
                    <div className="h-[40px] flex justify-center items-center">
                        <div className="ml-56 mr-52">
                            <div className="text-[16px]">Delete</div>
                        </div>
                        <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                            <img onClick={() => props.closeDialog(false)} className="w-[20px] h-[20px]" src={Cross} alt="cross" />
                        </div>
                    </div>
                    <div className="mt-2 h-20 w-20 flex justify-center items-center rounded-full bg-[#FFEAEA] ">
                        <img className="h-10 w-10" src={DeletePhoto} alt="delete photo" />
                    </div>
                    <div className="mt-4 w-full text-center">
                        <p>Are you sure you want to delete the Bank Statement</p>
                    </div>
                    <div className="my-5 flex justify-center items-center gap-[10px]">
                        <button className='w-[100px] h-[35px] bg-red-700 text-white rounded-md' onClick={() => deleteStatement(props.item)}>Delete</button>
                        <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={() => props.closeDialog(false)}>Cancel</button>
                        {showLoading && <CircularProgress/>}
                    </div>
                </div>
            </div>

        </Modal>
  )
}

export default Delete
