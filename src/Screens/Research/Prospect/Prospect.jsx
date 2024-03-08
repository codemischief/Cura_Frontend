import React from 'react';
import { Outlet, Link } from "react-router-dom";
import backLink from "../../../assets/back.png";
import searchIcon from "../../../assets/searchIcon.png";
import nextIcon from "../../../assets/next.png";
import refreshIcon from "../../../assets/refresh.png";
import downloadIcon from "../../../assets/download.png";
import { useState } from 'react';
import Navbar from "../../../Components/Navabar/Navbar";
import Cross from "../../../assets/cross.png";
import { Modal } from "@mui/material";
const Prospect = () => {

  // we have the module here
  //Validation of the form
  const initialValues = {
    personName:"",
    country:"",
  };

  const selectedCountry = [
    "Country1", "Country2", "Country3", "Country4"
    ]
    const selectedState = [
        "State1", "State2", "State3", "State4"
    ]
    const selectedCity = [
        "City1", "City2", "City3", "City4"
    ]

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
   
  const handleSubmit = (e) => {
      e.preventDefault();
      setFormErrors(validate(formValues)); // validate form and set error message
      setIsSubmit(true);
    };
    const validate = (values) => {
        const errors = {};
        if (!values.personName) {
            errors.personName = "Enter the name of the person";
        }
        if (!values.country) {
            errors.country = "Select Country";
        }
        return errors;
    };
    
  const [isCityDialogue,setIsCityDialogue] = React.useState(false);
  const handleOpen = () => {
     setIsCityDialogue(true);
  };
  const handleClose = () => {
    setIsCityDialogue(false);
  }
  return (
    <div>
      <Navbar/>
      <div className='flex-col w-full h-full  bg-white'>
        <div className='flex-col'>
            {/* this div will have all the content */}
            <div className='w-full  flex-col px-6'>
                {/* the top section of the div */}
                <div className='h-1/2 w-full  flex justify-between items-center p-2  border-gray-300 border-b-2'>
                   <div className='flex items-center space-x-3'>
                      <div className='rounded-2xl  bg-[#EBEBEB] h-8 w-8 '>
                          <img src={backLink} />
                      </div>
                        
                      <div className='flex-col'>
                          <h1>Prospect</h1>
                          <p>Research &gt; Propect</p>
                      </div>
                   </div>
                   <div className='flex space-x-2 items-center'>

                        <div className='flex'>
                            {/* search button */}
                                <input
                                    className="h-[36px] bg-[#EBEBEB] text-[#787878]"
                                    type="text"
                                    placeholder="  Search"
                                />
                                <div className="h-[36px] w-[40px] bg-[#004DD7] flex items-center justify-center rounded-r-lg">
                                    <img className="h-[26px] " src={searchIcon} alt="search-icon" />
                                </div>
                        </div>

                        <div>
                            {/* button */}
                            <button className="bg-[#004DD7] text-white h-[30px] w-[200px] rounded-lg" onClick={handleOpen}>
                                Add New Prospect +
                            </button>
                        </div>

                   </div>
                   
                </div>
                <div className='h-12 w-full bg-white'>
                  
                </div>
            </div>

            <div className='w-full h-[400px] bg-white px-6'>
                <div className='w-full h-12 bg-[#F0F6FF] flex justify-between'>
                   <div className='w-3/4 flex'>
                      <div className='w-1/6 p-4'>
                         <p>Sr. No</p>
                      </div>
                      <div className='w-5/6  p-4'>
                        <p>City</p>
                      </div>
                   </div>
                   <div className='w-1/6  flex'>
                      <div className='w-1/2  p-4'>
                          <p>ID</p>
                      </div>
                      <div className='w-1/2 0 p-4'>
                          <p>Edit</p>
                      </div>
                   </div>
                </div>
            </div>
            <div className='w-full h-12 flex justify-between justify-self-end px-6 '>
                {/* footer component */}
                <div className='ml-2'>
                    <div className='flex items-center w-auto h-full'>
                       {/* items */}
                       <div className='h-12 flex justify-center items-center'>
                          <img src={backLink} className='h-2/4'/>
                       </div>
                       <div className='flex space-x-1 mx-5'>
                          {/* pages */}
                          <div className='w-6 bg-[#DAE7FF] p-1 pl-2 rounded-md'>
                              <p>1</p>  
                          </div>
                          <div className='w-6  p-1 pl-2'>
                              <p>2</p> 
                          </div>
                          <div className='w-6 p-1 pl-2'>
                              <p>3</p> 
                          </div>
                          <div className='w-6  p-1 pl-2'>
                              <p>4</p> 
                          </div>
                       </div>
                       <div className='h-12 flex justify-center items-center'>
                        {/* right button */}
                           <img src={nextIcon} className='h-2/4'/>
                       </div>
                    </div>
                    <div>
                        {/* items per page */}
                    </div>
                </div>
                <div className='flex mr-10 justify-center items-center space-x-2 '>
                    <div className='border-solid border-black border-[0.5px] rounded-md w-28 h-10 flex items-center justify-center space-x-1' >
                       {/* refresh */}
                       <p>Refresh</p>
                       <img src={refreshIcon} className='h-1/2'/>
                    </div>
                    <div className='border-solid border-black border-[1px] w-28 rounded-md h-10 flex items-center justify-center space-x-1'>
                        {/* download */}
                        <p>Download</p>
                        <img src={downloadIcon} className='h-1/2'/>
                    </div>
                </div>
            </div>
        </div>
     
    </div>

    {/* modal goes here */}
    <Modal open={isCityDialogue} 
          fullWidth={true}
          maxWidth = {'md'} >
            <div className='flex justify-center mt-[10px]'>
                <div className="w-6/7  h-auto bg-white rounded-lg">
                    <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center">
                        <div className="mr-[410px] ml-[410px]">
                            <div className="text-[16px]">New Prospect</div>
                        </div>
                        <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                            <button onClick={handleClose}><img  className="w-[20px] h-[20px]" src={Cross} alt="cross" /></button>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="h-auto w-full mt-[5px] ">
                            <div className="flex gap-[48px] justify-center">
                                <div className=" space-y-[12px] py-[20px] px-[10px]">
                                    <div className="">
                                        <div className="text-[14px]">Person Name<label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="personName"  value={formValues.personName} onChange={handleChange}  />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.personName}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Country<label className="text-red-500">*</label></div>
                                        <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="country" value={formValues.country} onChange={handleChange} >
                                            {selectedCountry.map(item => (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.country}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">State</div>
                                        <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="state"  >
                                            {selectedState.map(item => (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">City</div>
                                        <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="city"  >
                                            {selectedCity.map(item => (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Suburb</div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="suburb"  />
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Property Location</div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="propertyLocation"  />
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">requirement</div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="requirement"  />
                                    </div>
                                </div>
                                <div className=" space-y-[12px] py-[20px] px-[10px]">
                                    <div className="">
                                        <div className="text-[14px]">Email</div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="email"  />
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Phone Number</div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="phoneNumber"  />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="my-[10px] flex justify-center items-center gap-[10px]">
                            
                            <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' type="submit">Add</button>
                            <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleClose}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
    </Modal>
    </div>
  )
}

export default Prospect;
