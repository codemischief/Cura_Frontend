import React from 'react';
import Cross from "../../../assets/cross.png";
import { Link } from 'react-router-dom';
import { Modal } from "@mui/material";
import { useState, useEffect } from "react";

const EditProspect = (props) => {
    const handleDialogClose = () => {
        props.setOpenDialog(false);
    }

    const selectedCountry =[
        "India", "USA", "UK", "Germany", "France","Italy"
    ]
    const selectedState =[
        "State1", "State2", "State3", "State4"
    ]
    const selectedCity =[
        "City1", "City2", "City3", "City4"
    ]

    const initialValues = {
        test: "",
        country: "",
        state: "",
        city: "",
        suburb: "",
        propertyLocation: "",
        possibleServices: "",
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

    return (
        <Modal open={props.openDialog}
            fullWidth={true}
            maxWidth={'md'} >

            <div className='flex justify-center mt-[20px]'>
                <div className="w-auto h-auto bg-white rounded-lg">
                    <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center">
                        <div className="mr-[410px] ml-[410px]">
                            <div className="text-[16px]">Edit Prospect</div>
                        </div>
                        <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                            <img onClick={handleDialogClose} className="w-[20px] h-[20px] cursor-pointer" src={Cross} alt="cross" />
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="h-auto w-full mt-[5px] ">
                            <div className="flex gap-[48px] justify-center items-center">
                                <div className=" space-y-[12px] py-[20px] px-[10px]">
                                    <div className="">
                                        <div className="text-[14px]">Test <label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="test" value={formValues.test} onChange={handleChange} />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.test}</div>
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
                                        <div className="text-[14px]">State<label className="text-red-500">*</label></div>
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
                                        <div className="text-[14px]">City<label className="text-red-500">*</label></div>
                                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="city" value={formValues.city} onChange={handleChange} >
                                            {selectedCity.map(item => (
                                                    <option key={item} value={item}>
                                                        {item}
                                                    </option>
                                                    ))}
                                            </select>
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.city}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Suburb <label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="suburb" value={formValues.suburb} onChange={handleChange} />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.suburb}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Property Location <label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="propertyLocation" value={formValues.propertyLocation} onChange={handleChange} />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.propertyLocation}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Possible Services <label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="possibleServices" value={formValues.possibleServices} onChange={handleChange} />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.possibleServices}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="my-5 flex justify-center items-center gap-[10px]">
                            <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' type="submit">Save</button>
                            <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleDialogClose}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    )
}

export default EditProspect
