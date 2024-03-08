 
import React from "react";
// import Dialog from "@mui/material/Dialog";
import Cross from "../../../assets/cross.png";
import { Link } from 'react-router-dom';
import { Modal } from "@mui/material";
import { useState, useEffect} from "react";
import Select from "react-select";
import Checkbox from '@mui/material/Checkbox';
const ManageBuilderModal = (props) => {


    // hardcoded for dropdown instances ********* start*************
    const selectedCountry =[
        "India", "USA", "UK", "Germany", "France","Italy"
    ]
    const selectedState =[
        "State1", "State2", "State3", "State4"
    ]
    const selectedCity =[
        "City1", "City2", "City3", "City4"
    ]
    const entity =[
        "Entity1", "Entity1", "Entity1", "Entity1"
    ]
    const assignedRoles =[
        "Role1", "Role2", "Role3", "Role4"
    ]
    const userName =[
        "User1", "User2", "User3", "User4"
    ]
    // hardcoded for dropdown instances ********* End*************

   //For closing a modal 
    const handleDialogClose = () => {
        props.setOpenDialog(false); 
      };

      //Validation of the form
      const initialValues = {
        builderName:"",
        phone1:"",
        phon2: "",
        email1:"",
        email2:"",
        address1:"",
        address2:"",
        country:"",
        state:"",
        city:"",
        zip:"",
        website:"",
        comment:"",
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
            if (!values.builderName) {
            errors.employeeName = "Enter Builder name";
            }
            if (!values.phone1) {
            errors.phone1 = "Enter Phone number";
            }
            if (!values.email1) {
            errors.email1 = "Enter Email";
            }
            if (!values.email) {
            errors.email = "Enter email addresss";
            }
            if (!values.address1) {
            errors.address1 = "Enter Builder Adress";
            }
            if (!values.country) {
            errors.country = " Select country";
            }
            if (!values.state) {
            errors.state = "Select state";
            }
            if (!values.city) {
            errors.city = "Select city";
            }

            return errors;
        };

      


    return(
        
     <Modal open={props.openDialog} 
          fullWidth={true}
         maxWidth = {'md'} >
          
            <div className='flex justify-center mt-[20px]'>
                <div className="w-[1050px] h-[580px] bg-white rounded-lg">
                    <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center">
                        <div className="mr-[410px] ml-[410px]">
                            <div className="text-[16px]">Add New Builder</div>
                        </div>
                        <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                            <Link to="/managebuilder"><img onClick={handleDialogClose} className="w-[20px] h-[20px]" src={Cross} alt="cross" /></Link>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="h-auto w-full mt-[5px] ">
                            <div className="flex gap-[48px] justify-center items-center">
                                <div className=" space-y-[12px] py-[20px] px-[10px]">
                                    <div className="">
                                        <div className="text-[14px]">Builder Name<label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="empName"  value={formValues.builderName} onChange={handleChange}  />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.builderName}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Phone 1<label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="panNo" value={formValues.phone1} onChange={handleChange} />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.phone1}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Phone 2</div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="phNo" value={formValues.phone2} onChange={handleChange}  />
                                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.phNo}</div> */}
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Email 1<label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="phNo" value={formValues.email1} onChange={handleChange}  />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.email1}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Email 2</div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="desc" value={formValues.email2} onChange={handleChange}  />
                                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.desc}</div> */}
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Address 1<label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="email" name="email" value={formValues.address1} onChange={handleChange}  />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.adress1}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Address Line 2</div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="desc" value={formValues.address2} onChange={handleChange}  />
                                        {/* <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text"  name="add"  /> */}
                                    </div>
                                </div>
                                <div className=" space-y-[12px] py-[20px] px-[10px]">
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
                                        <div className="text-[14px]">State<label className="text-red-500">*</label></div>
                                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="country" value={formValues.state} onChange={handleChange} >
                                            {selectedCountry.map(item => (
                                                    <option key={item} value={item}>
                                                        {item}
                                                    </option>
                                                    ))}
                                            </select>
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.country}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">City<label className="text-red-500">*</label></div>
                                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="country" value={formValues.city} onChange={handleChange} >
                                            {selectedCountry.map(item => (
                                                    <option key={item} value={item}>
                                                        {item}
                                                    </option>
                                                    ))}
                                            </select>
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.country}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">ZIP Code</div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="phNo" value={formValues.zip} onChange={handleChange}  />
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Website</div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="phNo" value={formValues.website} onChange={handleChange}  />
                                        
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Comment</div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="phNo" value={formValues.comment} onChange={handleChange}  />
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

export default ManageBuilderModal;
