import React, { useEffect, useState } from 'react'
import { Modal } from '@mui/material'
import Cross from "../../../assets/cross.png"
import { APIService } from '../../../services/API';
const EditCountryModal = (props) => {
    // console.log(props.currentCountry);
    const [showLoading,setShowLoading] = useState(false);
    const [countryName,setCountryName] =  useState(props.currentCountry);
    
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
          maxWidth = {'md'} 
          className='flex justify-center items-center'
          >
            <div className='flex justify-center '>
                <div className="w-[778px]  h-[250px] bg-white rounded-lg">
                    <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-t-lg">
                        <div className="mr-[270px] ml-[270px]">
                            <div className="text-[20px]">Edit Country</div>
                        </div>
                        <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                            <button onClick={() => {props.setIsOpen(false)}}><img  className="w-[20px] h-[20px]" src={Cross} alt="cross" /></button>
                        </div>
                    </div>
                    <form onSubmit={() => {}} className='mb-3 space-y-16'>
                        <div className="h-auto w-full mt-2 ">
                            <div className="flex gap-[48px] justify-center items-center">
                                <div className=" space-y-[12px] py-[20px] px-[10px]">
                                    <div className="">
                                        <div className="text-[14px]">Enter New Country Name<label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm py-1 px-2 text-[12px]" 
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
                        
                        <div className=" flex justify-center items-center gap-[10px]"> 
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
