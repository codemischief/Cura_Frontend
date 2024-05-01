import React, { useState } from "react";
import { Modal, Button, CircularProgress } from "@mui/material";
import DeleteImage from "../../assets/delete.png";
import Cross from "../../assets/cross.png";
import { APIService } from "../../services/API";
const DeleteModal = (props) => {
  const [showLoading, setShowLoading] = useState(false);
  const deleteCountry = async (item) => {
    // props.setShowDelete(true);
    const data = { user_id: 1234, country_name: props.currentCountry };
    setShowLoading(true);
    console.log(data);
    const response = await APIService.deleteCountries(data);
    // const response = await fetch("http://192.168.10.133:8000/deleteCountry", {
    //   method: "POST",
    //   body: JSON.stringify(data),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    setShowLoading(false);
    props.closeDialog(false);
    props.fetchData();
  };

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
                        <img className="h-10 w-10" src={DeleteImage} alt="delete photo" />
                    </div>
                    <div className="mt-4 w-full text-center">
                        <p>Are you sure you want to delete the Country</p>
                    </div>
                    <div className="my-5 flex justify-center items-center gap-[10px]">
                        <button className='w-[100px] h-[35px] bg-red-700 text-white rounded-md' onClick={() => deleteCountry(props.item)}>Delete</button>
                        <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={() => props.closeDialog(false)}>Cancel</button>
                    </div>
                </div>
            </div>
        </Modal>
  );
};

export default DeleteModal;