import React, { useState } from 'react'
import { Modal , Button ,CircularProgress} from '@mui/material'
import DeleteImage from "../../assets/trash.png";
const DeleteModal = (props) => {
    const [showLoading,setShowLoading] = useState(false);
    const deleteCountry = async (item) =>{
        // props.setShowDelete(true);
        const data = {"user_id":1,"country_name":props.currentCountry};
        setShowLoading(true);
        console.log(data);
        const response = await fetch('http://192.168.10.133:8000/deleteCountry', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          setShowLoading(false);
          props.closeDialog(false);
          props.fetchData();
      }
      
  return (
    <Modal open={props.isOpen} fullWidth={true} maxWidth={'md'}>
        <div className='w-2/4 h-64 rounded-xl bg-white mx-auto mt-48' >
           <div className='w-full h-64 pt-12'>
                <img src={DeleteImage} className='h-24 w-24  mx-auto '/>
                <h1 className='text-center mt-3'>Country - {props.currentCountry}</h1>
                <div className='w-full flex justify-center mt-6 space-x-4'>
                    <h1>Do you want to Delete</h1>
                    <Button variant="contained" color="success" onClick={() => deleteCountry(props.item)}>
                      Delete
                    </Button>
                    <Button variant="outlined" color="error" onClick={() => props.closeDialog(false)}>
                       Cancel
                    </Button>
                    {showLoading && <CircularProgress/>}
                </div>
           </div>     
        </div>
    </Modal>
  )
}

export default DeleteModal
