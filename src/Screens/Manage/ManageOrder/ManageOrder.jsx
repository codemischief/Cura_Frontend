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
import Checkbox from '@mui/material/Checkbox';

const ManageOrder = () => {
  // we have the module here

  const selectedClient = [
    "client 1","client 2","client 3"
   ];
   const selectedTallyLedger=[
    "1","2","3","4"
   ];
   const selectedVendors=[
    "1","2","3","4"
   ];
   const selectedAssignedTo=[
    "1","2","3","4"
   ];
   const selectedClientProperty=[
    "1","2","3","4"
   ];
   const selectedStatus=[
    "1","2","3","4"
   ];
   const selectedService=[
    "1","2","3","4"
   ];
    // hardcoded for dropdown instances ********* End*************

    //Validation of the form
    const initialValues = {
      assignedTo:"",
      status:"",
      clientName:"",
      orderDescription:"",
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    
    // handle changes in input form
      const handleChange = (e) => {
          const { name, value } = e.target;
          setFormValues({ ...formValues, [name]: value });
      };
     
      const handleSubmit = (e) => {
          e.preventDefault();
          setFormErrors(validate(formValues)); // validate form and set error message
          setIsSubmit(true);
        };
      // validate form and to throw Error message
      const validate = (values) => {
          const errors = {};
          if (!values.assignedTo) {
          errors.assignedTo = "select a name";
          }
          if (!values.status) {
          errors.status = "Select your status";
          }
          if (!values.clientName) {
          errors.clientName = "Select Client Name";
          }
          if (!values.orderDescription) {
              errors.orderDescription = "Enter Order Description";
          }
          return errors;
      };
    
  const [isStateDialogue,setIsStateDialogue] = React.useState(false);
  const handleOpen = () => {
     setIsStateDialogue(true);
  };
  const handleClose = () => {
    setIsStateDialogue(false);
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
                          <h1>Manage Order</h1>
                          <p>Manage &gt; Manage Order</p>
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
                                Add New Order +
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
                        <p>State</p>
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
    <Modal open={isStateDialogue} 
          fullWidth={true}
          maxWidth = {'md'} >
            <div className='flex justify-center mt-[20px] rounded-lg'>
                <div className="w-[1050px] h-auto bg-white ">
                    <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center">
                        <div className="mr-[410px] ml-[410px]">
                            <div className="text-[16px]">New Order</div>
                        </div>
                        <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                            <Link to="/manageorder"><img onClick={handleClose} className="w-[20px] h-[20px]" src={Cross} alt="cross" /></Link>
                        </div>
                    </div>
                    <div className="mt-1 flex bg-[#DAE7FF] justify-center space-x-4 items-center h-9">
                        <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-60">
                            <div>Order Information</div>
                        </div>
                        <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-60">
                            <div>Photos</div>
                        </div>
                        <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-60">
                            <div>Order Status history</div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="h-auto w-full">
                            <div className="flex gap-[48px] justify-center items-center">
                                <div className=" space-y-[12px] py-[20px] px-[10px]">
                                    <div className="">
                                        <div className="text-[14px]">Cura office</div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="Cura Office" />
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Entity</div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="Entity" />
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Assigned to <label className="text-red-500">*</label></div>
                                        <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="Assignedto" value={formValues.assignedTo} onChange={handleChange} >
                                            {selectedAssignedTo.map(item => (
                                                    <option key={item} value={item}>
                                                        {item}
                                                    </option>
                                                    ))}
                                        </select>
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.assignedTo}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Status <label className="text-red-500">*</label></div>
                                        <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="Assignedto" value={formValues.status} onChange={handleChange}>
                                            {selectedStatus.map(item => (
                                                    <option key={item} value={item}>
                                                        {item}
                                                    </option>
                                                    ))}
                                        </select>
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.status}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Client Property</div>
                                        <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="Assignedto" >
                                            {selectedClientProperty.map(item => (
                                                    <option key={item} value={item}>
                                                        {item}
                                                    </option>
                                                    ))}
                                        </select>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Service</div>
                                        <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="Assignedto" >
                                            {selectedService.map(item => (
                                                    <option key={item} value={item}>
                                                        {item}
                                                    </option>
                                                    ))}
                                        </select>
                                    </div>
                                </div>
                                <div className=" space-y-[12px] py-[20px] px-[10px]">
                                    <div className="">
                                        <div className="text-[14px]">Client Name<label className="text-red-500">*</label></div>
                                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="clientname" value={formValues.clientName} onChange={handleChange} >
                                            {selectedClient.map(item => (
                                                    <option key={item} value={item}>
                                                        {item}
                                                    </option>
                                                    ))}
                                            </select>
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.clientName}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Order Date</div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="date" name="OrderData" />  
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Start Date</div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="date" name="StartDate" />
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Explected Competition Date</div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="date" name="ExplectedCompetitionDate" />
                                        
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Actual Competition Date</div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="date" name="ActualCompetitionDate" />
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Vendor</div>
                                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="Vendors" >
                                            {selectedVendors.map(item => (
                                                    <option key={item} value={item}>
                                                        {item}
                                                    </option>
                                                    ))}
                                            </select>
                                    </div>
                                </div>
                                <div className=" space-y-[12px] py-[20px] px-[10px]">
                                    <div className="">
                                        <div className="text-[14px]">Tally Ledger</div>
                                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="tallyledger" >
                                            {selectedTallyLedger.map(item => (
                                                    <option key={item} value={item}>
                                                        {item}
                                                    </option>
                                                    ))}
                                            </select>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Comments</div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="comments" />  
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Order Description <label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="OrderDescription" value={formValues.orderDescription} onChange={handleChange}/>
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.orderDescription}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Additional Comments</div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="Additional Comments" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="my-[10px] flex justify-center items-center gap-[10px]">
                            <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' type="submit">Save</button>
                            <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleClose}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
    </Modal>
    </div>
  )
}

export default ManageOrder
