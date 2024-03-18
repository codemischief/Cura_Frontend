import React from 'react';
import { Outlet, Link } from "react-router-dom";
import backLink from "../../assets/back.png";
import searchIcon from "../../assets/searchIcon.png";
import nextIcon from "../../assets/next.png";
import refreshIcon from "../../assets/refresh.png";
import downloadIcon from "../../assets/download.png";
import { useState, useEffect } from 'react';
import Navbar from "../../Components/Navabar/Navbar";
import Cross from "../../assets/cross.png";
import Edit from "../../assets/edit.png";
import Trash from "../../assets/trash.png";
import { Modal } from "@mui/material";
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
const LOB = () => {
    // we have the module here

    const [existingLOB,setExistingLOB] = useState([]);
    const fetchData = () => {
        fetch("/getcity")
            .then((res) => res.json())
            .then((data) => {
                setExistingLOB(data)
                
            })
    }
    useEffect(() => {
        fetchData();
    }, []);
    //Validation of the form
    const initialValues = {
        cityName: "",
    };
    const [formValues, setFormValues] = useState(initialValues);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmit(true);
    };

    const [isCityDialogue, setIsCityDialogue] = React.useState(false);
    const handleOpen = () => {
        setIsCityDialogue(true);
    };
    const handleClose = () => {
        setIsCityDialogue(false);
    }
    const handleDownload = () => {
        // we handle the download here
        const worksheet = XLSX.utils.json_to_sheet(existingCities);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook,worksheet,"Sheet1");
        XLSX.writeFile(workbook,"CityData.xlsx");
        FileSaver.saveAs(workbook,"demo.xlsx");
      }
      const handleRefresh = () => {
        fetchData();
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
                                <div className='rounded-2xl  bg-[#EBEBEB] h-8 w-8 '>
                                    <Link to="/dashboard"><img src={backLink} /></Link>
                                </div>

                                <div className='flex-col'>
                                    <h1>LOB</h1>
                                    <p>Admin &gt; LOB</p>
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
                                        Add New LOB +
                                    </button>
                                </div>

                            </div>

                        </div>
                        <div className='h-12 w-full bg-white'>

                        </div>
                    </div>

                    <div className='w-full h-[400px] bg-white px-6 text-[12px]'>
                        <div className='w-full h-12 bg-[#F0F6FF] flex justify-between'>
                            <div className='w-3/4 flex'>
                                <div className='w-[10%] p-4'>
                                    <p>Sr. </p>
                                </div>
                                <div className='w-[20%]  p-4'>
                                    <p>LOB Name</p>
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
                        <div className='w-full h-80 '>
                            {/* {existingLOB.map((item, index) => {
                                return <div className='w-full h-12  flex justify-between border-gray-400 border-b-[1px]'>
                                    <div className='w-3/4 flex'>
                                        <div className='w-[10%] p-4'>
                                            <p>{index + 1}</p>
                                        </div>
                                        <div className='w-[20%]  p-4'>
                                            <p>{item.country_name}</p>
                                        </div>
                                        <div className='w-[20%]  p-4'>
                                            <p>{item.state_name}</p>
                                        </div>
                                        <div className='w-[25%]  p-4'>
                                            <p>{item.city_name}</p>
                                        </div>
                                    </div>
                                    <div className='w-1/6  flex'>
                                        <div className='w-1/2  p-4'>
                                            <p>{item.user_id}</p>
                                        </div>
                                        <div className='w-1/2 0 p-4 flex justify-between items-center'>
                                            <img className='w-5 h-5' src={Edit} alt="edit" />
                                            <img className='w-5 h-5' src={Trash} alt="trash" />
                                        </div>
                                    </div>
                                </div>
                            })} */}
                            {/* we get all the existing cities here */}

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
                            <div>
                                {/* items per page */}
                            </div>
                        </div>
                        <div className='flex mr-10 justify-center items-center space-x-2 '>
                            <div className='border-solid border-black border-[0.5px] rounded-md w-28 h-10 flex items-center justify-center space-x-1' >
                                {/* refresh */}
                                <button onClick={handleRefresh}><p>Refresh</p></button>
                                <img src={refreshIcon} className='h-1/2' />
                            </div>
                            <div className='border-solid border-black border-[1px] w-28 rounded-md h-10 flex items-center justify-center space-x-1'>
                                {/* download */}
                                <button onClick={handleDownload}><p>Download</p></button>
                                <img src={downloadIcon} className='h-1/2' />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* modal goes here */}
            <Modal open={isCityDialogue}
                fullWidth={true}
                maxWidth={'md'} >
                <div className='flex justify-center mt-[200px]'>
                    <div className="w-6/7  h-[200px] bg-white rounded-lg">
                        <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center">
                            <div className="mr-[410px] ml-[410px]">
                                <div className="text-[16px]">New LOB</div>
                            </div>
                            <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                                <button onClick={handleClose}><img className="w-[20px] h-[20px]" src={Cross} alt="cross" /></button>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="h-auto w-full mt-[5px] ">
                                <div className="flex gap-[48px] justify-center items-center">
                                    <div className=" space-y-[12px] py-[20px] px-[10px]">
                                        <div className="">
                                            <div className="text-[14px]">LOB Name<label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="empName" value={formValues.cityName} onChange={handleChange} />
                                        </div>


                                    </div>
                                </div>
                            </div>

                            <div className="mt-[10px] flex justify-center items-center gap-[10px]">

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

export default LOB
