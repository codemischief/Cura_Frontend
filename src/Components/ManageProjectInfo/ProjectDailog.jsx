
import React from "react";
// import Dialog from "@mui/material/Dialog";
import Cross from "../assets/cross.png";
import { Link } from 'react-router-dom';
import { Modal } from "@mui/material";
import { useState, useEffect } from "react";
import Select from "react-select";
import Checkbox from '@mui/material/Checkbox';
import ProjectInformation from "./ManageProjectInfoForm/ProjectInformation";
import ProjectDetails from "./ManageProjectInfoForm/ProjectDetails";

const projectDialog = (props) => {
    //For closing a modal 
    const [selectedDialogue,setSelectedDialogue] = useState(1);
    const selectFirst = () => {
       setSelectedDialogue(1);
    }
    const selectSecond = () => {
        setSelectedDialogue(2);
    }
    const selectThird = () => {
        setSelectedDialogue(3);
    }
    const selectFourth = () => {
        setSelectedDialogue(4);
    }
    const selectFifth = () => {
        setSelectedDialogue(5);
    }
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
            <>
            <div className='flex justify-center'>
                <div className="w-50 h-auto bg-white rounded-lg">
                    <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center">
                        <div className="mr-[410px] ml-[410px]">
                            <div className="text-[16px]">New project</div>
                        </div>
                        <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                            <button onClick={handleDialogClose}><img  className="w-[20px] h-[20px]" src={Cross} alt="cross" /></button>
                        </div>
                    </div>
                    <div className="mt-1 flex bg-[#DAE7FF] justify-evenly items-center h-9">
                        <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-40" >
                            <button onClick={selectFirst}><div>Project Information</div></button>
                        </div>
                        <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-40">
                            <button onClick={selectSecond}><div>Project details</div></button>
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
                    {selectedDialogue == 1 && <ProjectInformation/>}
                    {selectedDialogue == 2 && <ProjectDetails/>}
                </div>
                
            </div>
            
            </>
        </Modal>


    )
}

export default projectDialog;
