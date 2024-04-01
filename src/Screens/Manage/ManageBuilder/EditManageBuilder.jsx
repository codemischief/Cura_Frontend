import React from 'react';
import Cross from "../../../assets/cross.png";
import { Link } from 'react-router-dom';
import { Modal, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import SucessfullModal from '../../../Components/modals/SucessfullModal';
import FailureModal from '../../../Components/modals/FailureModal';
import { APIService } from '../../../services/API';


const EditManageBuilder = (props) => {
    const [pageLoading, setPageLoading] = useState(false);
    const [showSucess, setShowSucess] = useState(false);
    const [showFailure, setShowFailure] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const openSuccessModal = () => {
        // set the state for true for some time
        props.setOpenDialog(false);
        setShowSucess(true);
        setTimeout(function () {
            setShowSucess(false)
        }, 2000)
    }
    const openFailureModal = () => {
        props.setOpenDialog(false);
        setShowFailure(true);
        setTimeout(function () {
            setShowFailure(false)
        }, 4000);
    }

    const editNewBuilder = async () => {
        const data = {
            "user_id": 1234,
            "builder_id": Number(props.builder.id),
            "builder_name": String(formValues.builderName),
            "phone_1": String(formValues.phone1),
            "phone_2": String(formValues.phone2),
            "email1": String(formValues.email1),
            "addressline1": String(formValues.address1) == "" ? "" : String(formValues.address1),
            "addressline2": String(formValues.address2),
            "suburb": "deccan",
            "city": 360,
            "state": "Maharashtra",
            "country": 5,
            "zip": String(formValues.zip),
            "website": String(formValues.website),
            "comments": String(formValues.comment),
            "dated": "10-03-2024 08:29:00",
            "created_by": 1234,
            "is_deleted": false
        }
        console.log(data);
        const response = await APIService.editBuilderInfo(data);
        if (response.ok) {
            
            openSuccessModal();
        } else {
           
            openFailureModal();
        }
        
    }

    const selectedCountry = [
        "India", "USA", "UK", "Germany", "France", "Italy"
    ]
    const selectedState = [
        "State1", "State2", "State3", "State4"
    ]
    const selectedCity = [
        "City1", "City2", "City3", "City4"
    ]

    const handleDialogClose = () => {
        props.setOpenDialog(false);
    };
    console.log(props.builder)
    const initialValues = {
        builderName: props.builder.buildername ,
        phone1: props.builder.phone1,
        phone2: props.builder.phone2,
        email1: props.builder.email1,
        email2: props.builder.email2,
        suburb : "deccan",
        address1: props.builder.address1,
        address2: props.builder.address2,
        country: props.builder.country,
        state: props.builder.state,
        city: props.builder.city,
        zip: props.builder.zip,
        website: props.builder.website,
        comment: props.builder.comment
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});

    // handle changes in input form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async  (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues)); // validate form and set error message
        if (formValues.builderName == "") {
            return;
        }
        setIsLoading(true);
        await editNewBuilder();
         await props.fetchData();   
        setIsLoading(false);
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
        <>
            <SucessfullModal isOpen={showSucess} message="Builder has been edited " />
            <FailureModal isOpen={showFailure} message="Error! cannot edit the builder" />
            <Modal open={props.openDialog}
                fullWidth={true}
                maxWidth={'md'} >
                <div className='flex justify-center mt-[80px] rounded-lg'>
                    <div className="w-[1050px] h-auto bg-white ">
                        <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center">
                            <div className="mr-[410px] ml-[410px]">
                                <div className="text-[16px]">Edit Builder</div>
                            </div>
                            <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                                <img onClick={handleDialogClose} className="w-[20px] h-[20px]" src={Cross} alt="cross" />
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="h-auto w-full">
                                <div className="flex gap-[48px] justify-center items-center">
                                    <div className=" space-y-[12px] py-[20px] px-[10px]">
                                        <div className="">
                                            <div className="text-[14px]">Builder Name <label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="builderName" value={formValues.builderName} onChange={handleChange} />
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.builderName}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Phone1 <label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="phone1" value={formValues.phone1} onChange={handleChange} />
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.phone1}</div>

                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Phone2 </div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="phone2" value={formValues.phone2} onChange={handleChange} />
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Email1</div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="email" name="email1" value={formValues.email1} onChange={handleChange} />
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Email2</div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="email" name="email2" value={formValues.email2} onChange={handleChange} />
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Address 1 <label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="address1" value={formValues.address1} onChange={handleChange} />
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.address1}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Address Line 2</div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="address2" value={formValues.address2} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className=" space-y-[12px] py-[20px] px-[10px]">
                                        <div className="">
                                            <div className="text-[14px]">Country <label className="text-red-500">*</label></div>
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
                                            <div className="text-[14px]">State <label className="text-red-500">*</label></div>
                                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="state" value={formValues.state} onChange={handleChange} >
                                                {selectedCity.map(item => (
                                                    <option key={item} value={item}>
                                                        {item}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.state}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">City <label className="text-red-500">*</label></div>
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
                                            <div className="text-[14px]">Zip Code</div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="zip" value={formValues.zip} onChange={handleChange} />
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Website</div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="website" value={formValues.website} onChange={handleChange} />
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Comment</div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="comment" value={formValues.comment} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="my-[10px] flex justify-center items-center gap-[10px]">
                                <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' type="submit">Save</button>
                                <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleDialogClose}>Cancel</button>
                                {isLoading && <CircularProgress />}
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </>

    )
}

export default EditManageBuilder
