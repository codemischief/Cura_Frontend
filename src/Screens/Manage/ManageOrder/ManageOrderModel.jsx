 
import React from "react";
// import Dialog from "@mui/material/Dialog";
import Cross from "../../../assets/cross.png";
import { Link } from 'react-router-dom';
import { Modal } from "@mui/material";
import { useState, useEffect} from "react";
import Select from "react-select";
import Checkbox from '@mui/material/Checkbox';
const ManageOrderModal = (props) => {


    // hardcoded for dropdown instances ********* start*************
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

   //For closing a modal 
    const handleDialogClose = () => {
        props.setOpenDialog(false); 
      };

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

      


    return(
        
     <Modal open={props.openDialog} 
          fullWidth={true}
         maxWidth = {'md'} >
          
            <div className='flex justify-center mt-[20px] rounded-lg'>
                <div className="w-[1050px] h-auto bg-white ">
                    <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center">
                        <div className="mr-[410px] ml-[410px]">
                            <div className="text-[16px]">New Order</div>
                        </div>
                        <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                            <Link to="/manageorder"><img onClick={handleDialogClose} className="w-[20px] h-[20px]" src={Cross} alt="cross" /></Link>
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
                            <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleDialogClose}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
    </Modal>
        
       
    )
}

export default ManageOrderModal;
