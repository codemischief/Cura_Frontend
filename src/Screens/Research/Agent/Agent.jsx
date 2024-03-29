import React from 'react';
import { Outlet, Link } from "react-router-dom";
import backLink from "../../../assets/back.png";
import searchIcon from "../../../assets/searchIcon.png";
import nextIcon from "../../../assets/next.png";
import refreshIcon from "../../../assets/refresh.png";
import downloadIcon from "../../../assets/download.png";
import { useState, useEffect } from 'react';
import Navbar from "../../../Components/Navabar/Navbar";
import Edit from "../../../assets/edit.png";
import Trash from "../../../assets/trash.png";
import Cross from "../../../assets/cross.png";
import { Modal } from "@mui/material";
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
const Agent = () => {

    // we have the module here
    const [existingExployer, setExistingEmployer] = useState([]);
    useEffect(() => {
        // fetch("")
        //     .then((res) => res.json())
        //     .then((data) => {
        //         setExistingOwner(data)
        //         console.log(data);
        //     })
    }, []);
    //Validation of the form
    const initialValues = {
        type: "",
        name: "",
        email: "",
        phoneNumber: "",
        contactName1: "",
        contactEmail1: "",
        phone1: "",
        phone2: "",
        country: "",
        state: "",
        city: "",
        locality: "",
        contactName2: "",
        contactEmail2: "",
        website: "",
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
    const selectedsR = [
        "1", "2", "3", "4"
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
        if (!values.name) {
            errors.name = "Enter the name ";
        }
        if (!values.country) {
            errors.country = "Select Country";
        }
        return errors;
    };

    const [isEmployerDialogue, setIsEmployerDialogue] = React.useState(false);
    const handleOpen = () => {
        setIsEmployerDialogue(true);
    };
    const handleClose = () => {
        setIsEmployerDialogue(false);
    }

    const [isEditDialogue, setIsEditDialogue] = React.useState(false);
    const handleOpenEdit = () => {
        setIsEditDialogue(true);
    };
    const handleCloseEdit = () => {
        setIsEditDialogue(false);
    }

    const [isDeleteDialogue, setIsDeleteDialogue] = React.useState(false);
    const handleOpenDelete = () => {
        setIsDeleteDialogue(true);
    };
    const handleCloseDelete = () => {
        setIsDeleteDialogue(false);
    }
    const handleDownload = () => {
        // we handle the download here
        const worksheet = XLSX.utils.json_to_sheet(existingExployer);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "EmployerData.xlsx");
        FileSaver.saveAs(workbook, "demo.xlsx");
    }
    const handleRefresh = async () => {
        // await fetchData();
    }
    return (
        <div>
            <Navbar />
            <div className='flex-col w-full h-full  bg-white'>
                <div className='flex-col'>
                    {/* this div will have all the content */}
                    <div className='w-full  flex-col px-6'>
                        {/* the top section of the div */}
                        <div className='h-1/2 w-full  flex justify-between items-center p-2  border-gray-300 border-b-2'>
                            <div className='flex items-center space-x-3'>
                                <div className='rounded-2xl  bg-[#EBEBEB] h-8 w-8 flex justify-center items-center'>
                                    <img className='h-5 w-5' src={backLink} />
                                </div>

                                <div className='flex-col'>
                                    <h1 className='text-[18px]'>Government Department</h1>
                                    <p className='text-[14px]'>Research &gt; Government Department</p>
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
                                    <button className="bg-[#004DD7] text-white h-[36px] w-[300px] rounded-lg text-[14px]" onClick={handleOpen}>
                                        Add New Government Department  +
                                    </button>
                                </div>

                            </div>

                        </div>
                        <div className='h-12 w-full bg-white'>
                           
                        <div className='flex justify-between'>
                        <div className='w-[85%] flex '>
                                <div className='w-[5%] p-4'>
                                    
                                </div>
                                <div className='w-[12%]  p-4'>
                                   <input className="w-14 h-6 bg-[#EBEBEB] rounded-md" />
                                </div>
                                <div className='w-[10%]  p-4'>
                                    <input className="w-14 h-6 bg-[#EBEBEB] rounded-md" />
                                </div>
                                <div className='w-[10%]  p-4'>
                                    <input className="w-14 h-6 bg-[#EBEBEB] rounded-md" />
                                </div>
                                <div className='w-[12%]  p-4'>
                                    <input className="w-14 h-6 bg-[#EBEBEB] rounded-md" />
                                </div>
                                <div className='w-[12%]  p-4'>
                                    <input className="w-14 h-6 bg-[#EBEBEB] rounded-md" />
                                </div>
                                <div className='w-[12%]  p-4'>
                                    <input className="w-14 h-6 bg-[#EBEBEB] rounded-md" />
                                </div>
                                <div className='w-[12%]  p-4'>
                                    <input className="w-14 h-6 bg-[#EBEBEB] rounded-md" />
                                </div>
                                <div className='w-[10%]  p-4'>
                                    <input className="w-14 h-6 bg-[#EBEBEB] rounded-md" />
                                </div>
                            </div>
                            <div className='w-[15%] flex'>
                                <div className='w-1/2  px-4 py-3'>
                                   <input className="w-14 h-6 bg-[#EBEBEB] rounded-md" />
                                </div>
                                <div className='w-1/2 0 p-4'>
                                    
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div className='w-full h-[500px] bg-white px-6 text-[12px]'>
                        <div className='w-full h-12 bg-[#F0F6FF] flex justify-between '>
                            <div className='w-[85%] flex '>
                                <div className='w-[5%] p-4 '>
                                    <p className='text-xs'>Sr. </p>
                                </div>
                                <div className='w-[12%]  p-3 flex items-center'>
                                    <p className='text-xs'>Name of Agent<span className="font-extrabold">↑↓</span></p>
                                </div>
                                <div className='w-[10%]  p-3 flex items-center'>
                                    <p className='text-xs'>Agency Name <span className="font-extrabold">↑↓</span></p>
                                </div>
                                <div className='w-[10%]  p-3 flex items-center'>
                                    <p>Email Id <span className="font-extrabold">↑↓</span></p>
                                </div>
                                <div className='w-[12%]  p-3 flex items-center'>
                                    <p className='text-xs'>Phone Number<span className="font-extrabold">↑↓</span></p>
                                </div>
                                <div className='w-[12%]  flex items-center'>
                                    <p className='text-xs'>Whatsapp Number <span className="font-extrabold">↑↓</span></p>
                                </div>
                                <div className='w-[12%]  flex items-center'>
                                    <p className='text-xs'>Localities Dealing <span className="font-extrabold">↑↓</span></p>
                                </div>
                                <div className='w-[12%] flex items-center'>
                                    <p className='text-xs'>Name Of Partners <span className="font-extrabold">↑↓</span></p>
                                </div>
                                <div className='w-[10%]  p-3 flex items-center'>
                                    <p className='text-xs'>Registered <span className="font-extrabold">↑↓</span></p>
                                </div>
                            </div>
                            <div className='w-[15%] flex'>
                                <div className='w-1/2  p-4'>
                                    <p>ID <span className="font-extrabold">↑↓</span></p>
                                </div>
                                <div className='w-1/2 0 p-4'>
                                    <p>Edit</p>
                                </div>
                            </div>
                        </div>
                        <div className='w-full h-80 '>
                            {existingExployer.map((item, index) => {
                                return <div className='w-full h-12  flex justify-between border-gray-400 border-b-[1px]'>
                                </div>
                            })}
                            {/* we get all the existing Employers here */}

                        </div>
                    </div>
                    <div className='w-full h-12 flex justify-between justify-self-end px-6 '>
                        {/* footer component */}
                        <div className='ml-2'>
                            <div className='flex items-center w-auto h-full'>
                                {/* items */}
                                <div className='h-12 flex justify-center items-center'>
                                    <img src={backLink} className='h-2/4' />
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
                                    <img src={nextIcon} className='h-2/4' />
                                </div>
                            </div>
                        </div>
                        <div className='flex mr-10 justify-center items-center space-x-2 '>
                            <div className="flex mr-8 space-x-2 text-sm items-center">
                               <p className="text-gray-400">Items Per page</p>
                               <select className="text-gray-400 border-black border-[1px] rounded-md p-1">
                                <option>
                                    12
                                </option>
                                <option>
                                    13
                                </option>
                                <option>
                                    14
                                </option>
                               </select>
                            </div>
                            <div className="flex text-sm">
                                <p className="mr-11 text-gray-400">219 Items in 19 Pages</p>
                            </div>
                            
                            <div className='border-solid border-black border-[0.5px] rounded-md w-28 h-10 flex items-center justify-center space-x-1 p-2' >
                                {/* refresh */}
                                <button onClick={handleRefresh}><p>Refresh</p></button>
                                <img src={refreshIcon} className="h-2/3" />
                            </div>
                            <div className='border-solid border-black border-[1px] w-28 rounded-md h-10 flex items-center justify-center space-x-1 p-2'>
                                {/* download */}
                                <button onClick={handleDownload}><p>Download</p></button>
                                <img src={downloadIcon} className="h-2/3" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* modal goes here */}
            <Modal open={isEmployerDialogue}
                fullWidth={true}
                maxWidth={'md'}
                className='flex justify-center items-center'
            >
                <div className=''>
                    <div className="w-6/7  h-auto bg-white rounded-lg">
                        <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center">
                            <div className="mr-[410px] ml-[410px]">
                                <div className="text-[16px]">New Employer Institute</div>
                            </div>
                            <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                                <button onClick={handleClose}><img className="w-[20px] h-[20px]" src={Cross} alt="cross" /></button>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="h-auto w-full mt-[5px] ">
                                <div className="flex gap-[48px] justify-center">
                                    <div className=" space-y-[12px] py-[20px] px-[10px]">
                                        <div className="">
                                            <div className="text-[14px]">Type</div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="type" value={formValues.type} onChange={handleChange} />
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Name</div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="name" value={formValues.name} onChange={handleChange} />
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.name}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Email Id</div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="email" name="email" value={formValues.email} onChange={handleChange} />
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Phone Number</div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="phoneNumber" value={formValues.phoneNumber} onChange={handleChange} />
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Contact Name 1</div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="contactName1" value={formValues.contactName1} onChange={handleChange} />
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Contact Email 1</div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="contactEmail1" value={formValues.contactEmail1} onChange={handleChange} />
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Phone 1</div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="phone1" value={formValues.phone1} onChange={handleChange} />
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Phone 2 </div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="phone2" value={formValues.phone2} onChange={handleChange} />
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
                                            <div className="text-[14px]">State</div>
                                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="state" value={formValues.state} onChange={handleChange} >
                                                {selectedState.map(item => (
                                                    <option key={item} value={item}>
                                                        {item}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">City</div>
                                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="city" value={formValues.city} onChange={handleChange} >
                                                {selectedCity.map(item => (
                                                    <option key={item} value={item}>
                                                        {item}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Locality </div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="locality" value={formValues.locality} onChange={handleChange} />
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Contact Name 2 </div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="contactName2" value={formValues.contactName2} onChange={handleChange} />
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Contact Email 2</div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="email" name="contactEmail2" value={formValues.contactEmail2} onChange={handleChange} />
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Website </div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="website" value={formValues.website} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-2">
                                <div className="flex space-x-2 items-center">
                                    <input type="checkbox" />
                                    <div className="text-[13px] font-semibold">Exclude from Mailing List</div>
                                </div>
                                <div className=" mb-2 flex justify-center items-center gap-[10px]">
                                    <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' type="submit">Add</button>
                                    <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleClose}>Cancel</button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Agent;

