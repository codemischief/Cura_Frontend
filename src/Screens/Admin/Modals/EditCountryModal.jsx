import React, { useEffect, useState } from 'react'
import { Modal } from '@mui/material'
import Cross from "../../../assets/cross.png"
import { APIService } from '../../../services/API';
const EditCountryModal = (props) => {
    // console.log(props.currentCountry);
    const [showLoading,setShowLoading] = useState(false);
    const [countryName,setCountryName] =  useState("");
    
const handleChange = (e) => {
    const { value } = e.target;
    setCountryName(value);
};
const handleEdit = async () => {
    const data = {
        "user_id" : 1234,
        "old_country_name" : props.currentCountry,
        "new_country_name" : countryName,
    }
    const response = await APIService.editCountry(data);
}
  return (
    <Modal open={props.isOpen} 
          fullWidth={true}
          maxWidth = {'md'} >
            <div className='flex justify-center mt-[200px]'>
                <div className="w-6/7  h-[250px] bg-white rounded-lg">
                    <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center">
                        <div className="mr-[410px] ml-[410px]">
                            <div className="text-[16px]">Edit Country Name!</div>
                        </div>
                        <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                            <button onClick={() => {props.setIsOpen(false)}}><img  className="w-[20px] h-[20px]" src={Cross} alt="cross" /></button>
                        </div>
                    </div>
                    <form onSubmit={() => {}}>
                        <div className="h-auto w-full mt-[5px] ">
                            <div className="flex gap-[48px] justify-center items-center">
                                <div className=" space-y-[12px] py-[20px] px-[10px]">
                                    <div className="">
                                        <div className="text-[14px]">Enter New Country Name<label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" 
                                        type="text"
                                        name="countryName"
                                        value={countryName}
                                        onChange={handleChange}
                                        autoComplete="off"
                                         />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-[10px] flex justify-center items-center gap-[10px]"> 
                            <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' type="submit" onClick={handleEdit}>Save</button>
                            <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={() => {props.setIsOpen(false)}}>Cancel</button>
                            {/* {isLoading && <CircularProgress/>} */}
                        </div>
                    </form>
                </div>
            </div>
    </Modal>
  )
}

export default EditCountryModal
