
import React from "react";
// import Dialog from "@mui/material/Dialog";
import Cross from "../../../assets/cross.png";
import { Link } from 'react-router-dom';
import { Modal } from "@mui/material";
import { useState, useEffect } from "react";
import Select from "react-select";
import Checkbox from '@mui/material/Checkbox';

import eyeIcon from "../../../assets/eye.jpg";

const UserDialog = (props) => {

  const [type1, setType1] = useState("password");
  const [type2, setType2] = useState("password");

    // password visibility
  const passwordToggle = () => {
    if (type1 === "password") {
      setType1("text");
    } else {
      setType1("password");
    }
  };

  const confirmPasswordToggle = () => {
    if (type2 === "password") {
      setType2("text");
    } else {
      setType2("password");
    }
  };


    // hardcoded for dropdown instances ********* start*************
    const selectedCity = [
        "City1", "City2", "City3", "City4"
    ]
    const assignedRoles = [
        "Role1", "Role2", "Role3", "Role4"
    ]
    // hardcoded for dropdown instances ********* End*************

    //For closing a modal 
    const handleDialogClose = () => {
        props.setOpenDialog(false);
    };

    //Validation of the form
    const initialValues = {
        nameOfTheUser: "",
        userName: "",
        password: "",
        lob: "",
        email: "",
        addressLine1: "",
        effectiveDate: "",
        confirmPassword: "",
        role: "",
        homePhone: "",
        city: "",
        suburb: "",
        zipCode: "",

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
        if (!values.nameOfTheUser) {
            errors.nameOfTheUser = "Enter the name of the user";
        }
        if (!values.userName) {
            errors.userName = "Enter username";
        }
        if (!values.password) {
            errors.password = "Enter password";
        }
        if (!values.lob) {
            errors.lob = "Select lob";
        }
        if (!values.email) {
            errors.email = "Enter your Email address";
        }
        if (!values.addressLine1) {
            errors.addressLine1 = "Enter address";
        }
        if (!values.effectiveDate) {
            errors.effectiveDate = "Select Effective Date";
        }
        if (!values.confirmPassword) {
            errors.confirmPassword = "Re-enter your password";
        }
        if (!values.role) {
            errors.role = "select role";
        }
        if (!values.homePhone) {
            errors.homePhone = "Enter home phone number";
        }
        if (!values.city) {
            errors.city = "Select city";
        }
        if (!values.suburb) {
            errors.suburb = "Enter suburb";
        }
        if (!values.zipCode) {
            errors.zipCode = "Enter zip code";
        }
        return errors;
    };




    return (

        <Modal open={props.openDialog}
            fullWidth={true}
            maxWidth={'md'} >

            <div className='flex justify-center '>
                <div className="w-[1050px] h-auto bg-white rounded-lg">
                    <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center">
                        <div className="mr-[410px] ml-[410px]">
                            <div className="text-[16px]">Add New User</div>
                        </div>
                        <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                            <Link to="/manageuser"><img onClick={handleDialogClose} className="w-[20px] h-[20px]" src={Cross} alt="cross" /></Link>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="h-auto w-full">
                            <div className="flex gap-[48px] justify-center items-center">
                                <div className=" space-y-[12px] py-[20px] px-[10px]">
                                    <div className="">
                                        <div className="text-[14px]">Name of the User<label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="nameOfTheUser" value={formValues.nameOfTheUser} onChange={handleChange} />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.nameOfTheUser}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Create Username<label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="username" value={formValues.userName} onChange={handleChange} />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.userName}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Create Password<label className="text-red-500">*</label></div>
                                        <div className="m-0 p-0 relative">
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type={type1} name="password" value={formValues.password} onChange={handleChange} />
                                            <span className="w-4 h-4 absolute right-1 bottom-0.5">
                                                <img
                                                    className='cursor-pointer'
                                                    onClick={passwordToggle}
                                                    src={eyeIcon}
                                                    alt="eye-icon"
                                                />
                                            </span>
                                        </div>
                                        <div className="text-[12px] text-[#CD0000]">{formErrors.password}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">LOB<label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="date" name="lob" value={formValues.lob} onChange={handleChange} />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.lob}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Email 1<label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="email1" value={formValues.email} onChange={handleChange} />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.email}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Work Phone</div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="email" name="Work phone" />
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Address Line 1<label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="AddressLine1" value={formValues.addressLine1} onChange={handleChange} />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.addressLine1}</div>
                                    </div>
                                </div>
                                <div className=" space-y-[12px] py-[20px] px-[10px]">
                                    <div className="">
                                        <div className="text-[14px]">Office<label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="Office" />
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Effective Date<label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="date" name="EffectiveDate" value={formValues.effectiveDate} onChange={handleChange} />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.effectiveDate}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Confirm Password<label className="text-red-500">*</label></div>
                                        <div className="m-0 p-0 relative">
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type={type2} name="confirmPassword" value={formValues.confirmPassword} onChange={handleChange} />
                                            <span className="w-4 h-4 absolute right-1 bottom-0.5">
                                                <img
                                                    className='cursor-pointer'
                                                    onClick={confirmPasswordToggle}
                                                    src={eyeIcon}
                                                    alt="eye-icon"
                                                />
                                            </span>
                                        </div>
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.confirmPassword}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Assign role<label className="text-red-500">*</label></div>
                                        <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="assignRole" value={formValues.role} onChange={handleChange} >
                                            {assignedRoles.map(item => (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.role}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Email 2</div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="Email2" />
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Home Phone<label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="HomePhone" value={formValues.homePhone} onChange={handleChange} />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.homePhone}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Address Line 2</div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="addressLine2" />
                                    </div>
                                </div>
                                <div className=" space-y-[12px] py-[20px] px-[10px] ">
                                    <div className="">
                                        <div className="text-[14px]">City<label className="text-red-500">*</label></div>
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
                                        <div className="text-[14px]">Suburb<label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="suburb" value={formValues.suburb} onChange={handleChange} />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.suburb}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Zip Code<label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="zipcode" value={formValues.zipCode} onChange={handleChange} />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.zipCode}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-[10px] flex justify-center items-center"><Checkbox label="Active" />Active</div>
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

export default UserDialog;
