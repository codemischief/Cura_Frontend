
import React from "react";
// import Dialog from "@mui/material/Dialog";
import Cross from "../assets/cross.png";
import { Link } from 'react-router-dom';
import { Modal } from "@mui/material";
import { useState, useEffect } from "react";
import Select from "react-select";
import Checkbox from '@mui/material/Checkbox';

const projectDialog = (props) => {
    //For closing a modal 
    const handleDialogClose = () => {
        props.setOpenDialog(false);
    };

    // hardcoded for dropdown instances ********* start*************
    const selectedCity = [
        "City1", "City2", "City3", "City4"
    ]
    const selectedState = [
        "state1", "state2", "state3", "state4"
    ]
    const selectedCountry = [
        "country1", "country2", "country3", "country4"
    ]
    const selectedProjectType = [
        "1", "2", "3", "4"
    ]
    const selectedBuilderName = [
        "name1", "name2", "name3", "name4"
    ]
    // hardcoded for dropdown instances ********* End*************

    //Validation of the form
    const initialValues = {
        projectName: "",
        projectType: "",
        addressLine1: "",
        country: "",
        state: "",
        city: "",
        suburb: "",
        builderName: "",
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
        if (!values.projectName) {
            errors.projectName = "Enter the name of the project!";
        }
        if (!values.projectType) {
            errors.projectType = "Enter project type!";
        }
        if (!values.addressLine1) {
            errors.addressLine1 = "Enter address!";
        }
        if (!values.country) {
            errors.country = "Enter country!";
        }
        if (!values.state) {
            errors.state = "Enter state!";
        }
        if (!values.city) {
            errors.city = "Enter city!";
        }
        if (!values.suburb) {
            errors.suburb = "Enter suburb!";
        }
        if (!values.builderName) {
            errors.builderName = "Enter the name of the builder!";
        }
        return errors;
    };

    return (

        <Modal open={props.openDialog}
            fullWidth={true}
            maxWidth={'md'} >

            <div className='flex justify-center'>
                <div className="w-50 h-auto bg-white rounded-lg">
                    <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center">
                        <div className="mr-[410px] ml-[410px]">
                            <div className="text-[16px]">New project</div>
                        </div>
                        <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                            <Link to="/manageprojectinfo"><img onClick={handleDialogClose} className="w-[20px] h-[20px]" src={Cross} alt="cross" /></Link>
                        </div>
                    </div>
                    <div className="mt-1 flex bg-[#DAE7FF] justify-evenly items-center h-9">
                        <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-40" >
                            <Link to="/projectinfosec">Project Information</Link>
                        </div>
                        <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-40">
                            <div>Project details</div>
                        </div>
                        <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-40">
                            <div>Bank details</div>
                        </div>
                        <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-40">
                            <div>Contacts</div>
                        </div>
                        <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-40">
                            <div>Photos</div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex items-center justify-evenly">
                            <div className="space-y-2">
                                <div className="">
                                    <div>Project Name <label className="text-red-500">*</label></div>
                                    <input type="text" className="border-[#C6C6C6] border-[1px] rounded-md w-52 h-6" name="projectName" value={formValues.projectName} onChange={handleChange} />
                                    <div className="text-[12px] text-[#CD0000] ">{formErrors.projectName}</div>
                                </div>
                                <div className="">
                                    <div>Project Type <label className="text-red-500">*</label></div>
                                    <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="projectType" value={formValues.projectType} onChange={handleChange} >
                                            {selectedProjectType.map(item => (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            ))}
                                    </select>
                                    <div className="text-[12px] text-[#CD0000] ">{formErrors.projectType}</div>
                                </div>
                                <div className="">
                                    <div>Address Line 1 <label className="text-red-500">*</label></div>
                                    <input type="text" className="border-[#C6C6C6] border-[1px] rounded-md w-52 h-6" name="addressLine1" value={formValues.addressLine1} onChange={handleChange}/>
                                    <div className="text-[12px] text-[#CD0000] ">{formErrors.addressLine1}</div>
                                </div>
                                <div className="">
                                    <div>Country<label className="text-red-500">*</label></div>
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
                                    <div>State<label className="text-red-500">*</label></div>
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
                                    <div>City<label className="text-red-500">*</label></div>
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
                                    <div>Suburb<label className="text-red-500">*</label></div>
                                    <input type="text" className="border-[#C6C6C6] border-[1px] rounded-md w-52 h-6" name="suburb" value={formValues.suburb} onChange={handleChange}/>
                                    <div className="text-[12px] text-[#CD0000] ">{formErrors.suburb}</div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="">
                                    <div>Builder Name <label className="text-red-500">*</label></div>
                                    <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="builderName" value={formValues.builderName} onChange={handleChange} >
                                            {selectedBuilderName.map(item => (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            ))}
                                    </select>
                                    <div className="text-[12px] text-[#CD0000] ">{formErrors.builderName}</div>
                                </div>
                                <div className="">
                                    <div>Mailing Group</div>
                                    <input type="text" className="border-[#C6C6C6] border-[1px] rounded-md w-52 h-6" />
                                </div>
                                <div className="">
                                    <div>Address Line 2</div>
                                    <input type="text" className="border-[#C6C6C6] border-[1px] rounded-md w-52 h-6" />
                                </div>
                                <div className="">
                                    <div>Zip code</div>
                                    <input type="text" className="border-[#C6C6C6] border-[1px] rounded-md w-52 h-6" />
                                </div>
                                <div className="">
                                    <div>Nearest Landmark</div>
                                    <input type="text" className="border-[#C6C6C6] border-[1px] rounded-md w-52 h-6" />
                                </div>
                                <div className="">
                                    <div>Subscribed E-mail</div>
                                    <input type="text" className="border-[#C6C6C6] border-[1px] rounded-md w-52 h-6" />
                                </div>
                                <div className="">
                                    <div>Website</div>
                                    <input type="text" className="border-[#C6C6C6] border-[1px] rounded-md w-52 h-6" />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center items-center space-x-2">
                            <div className="mt-[10px] flex justify-center items-center font-semibold text-[12px]"><Checkbox label="Active" />Tenet woking bachlors allowed</div>
                            <div className="mt-[10px] flex justify-center items-center font-semibold text-[12px]"><Checkbox label="Active" />Tenet student allowed</div>
                            <div className="mt-[10px] flex justify-center items-center font-semibold text-[12px]"><Checkbox label="Active" />Tenet Foreigners allowed</div>
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

export default projectDialog;
