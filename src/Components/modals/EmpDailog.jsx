 
import React from "react";
// import Dialog from "@mui/material/Dialog";
import Cross from "../assets/cross.png";
import { Link } from 'react-router-dom';
import { Modal } from "@mui/material";
import { useState, useEffect} from "react";
import Select from "react-select";
import Checkbox from '@mui/material/Checkbox';
const EmpDailog = (props) => {


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
        employeeName:"",
        panNo:"",
        userName: "",
        doj:"",
        desc:"",
        email:"",
        employeeId:"",
        lob:"",
        dob:"",
        role:"",
        phNo:"",
        country:"",
        state:"",
        city:"",
        suburb:"",
        entity:""

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
            if (!values.employeeName) {
            errors.employeeName = "Enter employee name";
            }
            if (!values.panNo) {
            errors.panNo = "Enter PAN number";
            }
            if (!values.userName) {
            errors.userName = "select userName";
            }
            if (!values.doj) {
            errors.doj = "Enter date of joining";
            }
            if (!values.desc) {
            errors.desc = "Enter Designamtion";
            }
            if (!values.email) {
            errors.email = "Enter email addresss";
            }
            if (!values.employeeId) {
            errors.employeeId = "Enter employee ID";
            }
            if (!values.lob) {
            errors.lob = "Select LOB";
            }
            if (!values.dob) {
            errors.dob = "Enter date of birth";
            }
            if (!values.role) {
            errors.role = "select role";
            }
            if (!values.phNo) {
            errors.phNo = "Enter phone number";
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
            if (!values.suburb) {
                errors.suburb = "Enter suburb";
                }
                if (!values.entity) {
                errors.entity = "Enter entity";
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
                            <div className="text-[16px]">Add New Employee</div>
                        </div>
                        <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                            <Link to="/manageemployees"><img onClick={handleDialogClose} className="w-[20px] h-[20px]" src={Cross} alt="cross" /></Link>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="h-auto w-full mt-[5px] ">
                            <div className="flex gap-[48px] justify-center items-center">
                                <div className=" space-y-[12px] py-[20px] px-[10px]">
                                    <div className="">
                                        <div className="text-[14px]">Employee Name<label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="empName"  value={formValues.employeeName} onChange={handleChange}  />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.employeeName}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Pan No<label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="panNo" value={formValues.panNo} onChange={handleChange} />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.panNo}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Username<label className="text-red-500">*</label></div>
                                        <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="userName" value={formValues.userName} onChange={handleChange} >
                                            {userName.map(item => (
                                                    <option key={item} value={item}>
                                                        {item}
                                                    </option>
                                                    ))}
                                            </select>
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.userName}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Date of joining<label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="date" name="doj" value={formValues.doj} onChange={handleChange} />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.doj}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Designation<label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="desc" value={formValues.desc} onChange={handleChange}  />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.desc}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Email<label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="email" name="email" value={formValues.email} onChange={handleChange}  />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.email}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Address Line 1</div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text"  name="add"  />
                                    </div>
                                </div>
                                <div className=" space-y-[12px] py-[20px] px-[10px]">
                                    <div className="">
                                        <div className="text-[14px]">Employee ID<label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="empId" value={formValues.employeeId} onChange={handleChange} />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.employeeId}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">LOB<label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="lob" value={formValues.lob} onChange={handleChange} />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.lob}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Date of birth<label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="date" name="dob" value={formValues.dob} onChange={handleChange}  />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.dob}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Last Date of Working</div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="date" name="lwd"  />
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Assign role<label className="text-red-500">*</label></div>
                                        <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="country" value={formValues.role} onChange={handleChange} >
                                            {assignedRoles.map(item => (
                                                    <option key={item} value={item}>
                                                        {item}
                                                    </option>
                                                    ))}
                                            </select>
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.country}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Phone Number<label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="phNo" value={formValues.phNo} onChange={handleChange}  />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.phNo}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Address Line 2</div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="add2"/>
                                    </div>
                                </div>
                                <div className=" space-y-[12px] py-[20px] px-[10px] ">
                                <div className="">
                                        <div className="text-[14px]">Country</div>
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
                                        <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="state" value={formValues.state} onChange={handleChange} >
                                            {selectedState.map(item => (
                                                    <option key={item} value={item}>
                                                        {item}
                                                    </option>
                                                    ))}
                                            </select>
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.state}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">City</div>
                                        <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="city"> value={formValues.city} onChange={handleChange} 
                                            {selectedCity.map(item => (
                                                    <option key={item} value={item}>
                                                        {item}
                                                    </option>
                                                    ))}
                                            </select>
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.city}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Suburb</div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="suburb" value={formValues.suburb} onChange={handleChange} />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.suburb}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Zip Code</div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="zipcode" />
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Entity</div>
                                        <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="entity" value={formValues.entity} onChange={handleChange} >
                                            {entity.map(item => (
                                                    <option key={item} value={item}>
                                                        {item}
                                                    </option>
                                                    ))}
                                            </select>
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.entity}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-[10px] flex justify-center items-center"><Checkbox label="Active" />Active</div>
                        <div className="mt-[10px] flex justify-center items-center gap-[10px]">
                            
                            <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md'>Save</button>
                            <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md'>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
    </Modal>
        
       
    )
}

export default EmpDailog;
