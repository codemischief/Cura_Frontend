 
import React from "react";
// import Dialog from "@mui/material/Dialog";
import Cross from "../assets/cross.png";
import { Link } from 'react-router-dom';
import { Modal } from "@mui/material";
import { useState, useEffect} from "react";
import Select from "react-select";
import Checkbox from '@mui/material/Checkbox';
const CountryDialogue = (props) => {

   //For closing a modal 
    const handleDialogClose = () => {
        props.closeDialog(); 
    };

      //Validation of the form
      const initialValues = {
        countryName:"",
      };
      const [formValues, setFormValues] = useState(initialValues);
    //   const [formErrors, setFormErrors] = useState({});
      
      // handle changes in input form
        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormValues({ ...formValues, [name]: value });
        };
       
        const handleSubmit = (e) => {
            e.preventDefault();
            s// validate form and set error message
            setIsSubmit(true);
          };
        
         
      


    return(
        
     <Modal open={props.openDialog} 
          fullWidth={true}
          maxWidth = {'md'} >
            <div className='flex justify-center mt-[200px]'>
                <div className="w-6/7  h-[200px] bg-white rounded-lg">
                    <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center">
                        <div className="mr-[410px] ml-[410px]">
                            <div className="text-[16px]">Add New Country</div>
                        </div>
                        <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                            <button onClick={handleDialogClose}><img  className="w-[20px] h-[20px]" src={Cross} alt="cross" /></button>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="h-auto w-full mt-[5px] ">
                            <div className="flex gap-[48px] justify-center items-center">
                                <div className=" space-y-[12px] py-[20px] px-[10px]">
                                    <div className="">
                                        <div className="text-[14px]">Country Name<label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="empName"  value={formValues.builderName} onChange={handleChange}  />
                                        
                                    </div>
                                    
                                    
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-[10px] flex justify-center items-center gap-[10px]">
                            
                            <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' type="submit">Save</button>
                            <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleDialogClose}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
    </Modal>
        
       
    )
}

export default CountryDialogue;
