import React from 'react';
import DeletePhoto from '../../../assets/delete.png'
import Cross from "../../../assets/cross.png";
import { Link } from 'react-router-dom';
import { Modal , Button ,CircularProgress} from '@mui/material'
import { useState, useEffect } from "react";
import { APIService } from '../../../services/API';
import SucessfullModal from '../../../Components/modals/SucessfullModal';
import SucessImage from "../../../assets/SuccessImage.png";
import Draggable from 'react-draggable';
const Delete = (props) => {
    const [showLoading,setShowLoading] = useState(false);
    const [showSucess,setShowSucess] = useState(false);
    const deleteStatement = async (item) =>{
        // props.setShowDelete(true);
        
        console.log(props);
        setShowLoading(true);
        const data = {"user_id":1234,"id": props.currentStatement};
        console.log(data);
        const response = await APIService.deleteBankStatement(data);
        props.closeDialog(false);
          await props.fetchData();
          setShowLoading(false);
          if((await response.json()).result === "success"){
            setShowSucess(true);
          }
        setTimeout(function () {
            setShowSucess(false)
          }, 2000)
          
          props.closeDialog(false);
          
      }

      const handleDialogClose = () => {
        props.closeDialog(false);
        props.showCancel();
    };
  return (
    <div>
     <Modal open={showSucess} fullWidth={true} >
        <>
        <Draggable>
        <div className='w-2/4 h-64 rounded-xl bg-white mx-auto mt-48' >
           <div className='w-full h-64 pt-12'>
                <img src={SucessImage} className='h-24 w-24  mx-auto '/>
                <div className='w-full flex justify-center mt-6'>
                    <h1>Bank Statement Deleted successfully</h1>
                </div>
           </div>
        </div>
        </Draggable>
        </>
    </Modal>
    <Modal open={props.isOpen}
            fullWidth={true}
            className='flex justify-center items-center rounded-lg'
             >  
             <>
             <Draggable>
            <div className='bg-white rounded-lg'>
                <div className="w-auto h-auto flex flex-col justify-center items-center rounded-lg relative">
                    <div className="h-[40px] bg-[#EDF3FF] flex justify-center items-center rounded-md">
                        <div className="ml-56 mr-52">
                            <div className="text-[16px]">Delete</div>
                        </div>
                        <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white absolute right-2">
                            <button onClick={() => {handleDialogClose()}}>
                            <img className="w-[20px] h-[20px]" src={Cross} alt="cross" />
                            </button>
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
                        <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={() => {handleDialogClose()}}>Cancel</button>
                        {/* {showLoading && <CircularProgress/>} */}
                    </div>
                </div>
            </div>
            </Draggable>
            </>
        </Modal>
        </div>
  )
}

export default Delete
