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
import Add from "./../../assets/add.png";
import { LinearProgress, Modal, Pagination } from "@mui/material";
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
import { APIService } from '../../services/API';
import { authService } from '../../services/authServices';
const City = () => {
    // we have the module here

    const [existingCities, setExistingCities] = useState([]);
    const [pageLoading, setPageLoading] = useState(false);
    const [showSucess, setShowSucess] = useState(false);
    const [showFailure, setShowFailure] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)
    const [currentPages, setCurrentPages] = useState(15);
    const [totalItems, setTotalItems] = useState(0)
    const [sortField, setSortField] = useState("id")
    const [flag, setFlag] = useState(false);
    const [downloadModal, setDownloadModal] = useState(false)
    const openSuccessModal = () => {
        // set the state for true for some time
        setIsCountryDialogue(false);
        setShowSucess(true);
        setTimeout(function () {
            setShowSucess(false)
        }, 2000)
    }
    const openFailureModal = () => {
        setIsCountryDialogue(false);
        setShowFailure(true);
        setTimeout(function () {
            setShowFailure(false)
        }, 4000);
    }
    const fetchCityData = async () => {
        setPageLoading(true);
        // const user_id = await authService.getUserID();
        // console.log(user_id)
        const data = {
            "user_id": 1234,
            "rows": ["id", "city", "state", "countryid", "country"],
            "filters": [],
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": 15
        }
        const response = await APIService.getCitiesAdmin(data)
        const res = await response.json();
        const result = res.data;
        const t = res.total_count;
        setTotalItems(t);
        setPageLoading(false);

        setExistingCities(result)
    }
    const fetchQuantityData = async (quantity) => {
        setPageLoading(true);
        // const user_id = await authService.getUserID();
        // console.log(user_id)
        setCurrentPages(quantity);
        const data = {
            "user_id": 1234,
            "rows": ["id", "city", "state", "countryid", "country"],
            "filters": [],
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": Number(currentPage),
            "pg_size": Number(quantity)
        }
        const response = await APIService.getCitiesAdmin(data)
        const res = await response.json();
        const result = res.data;
        const t = res.total_count;
        setTotalItems(t);
        setPageLoading(false);

        setExistingCities(result)
    }
    useEffect(() => {
        fetchCityData();
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
    const handleClose = () => {w
        setIsCityDialogue(false);
    }
    const handleDownload = () => {
        // we handle the download here
        const worksheet = XLSX.utils.json_to_sheet(existingCities);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "CityData.xlsx");
        FileSaver.saveAs(workbook, "demo.xlsx");
    }
    const handleRefresh = () => {
        fetchCityData();
    }
    const fetchPageData = async (page) => {
        setPageLoading(true)
        const data = {
            "user_id": 1234,
            "rows": ["id", "city", "state", "countryid", "country"],
            "filters": [],
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": Number(page),
            "pg_size": Number(currentPages)
        }
        const response = await APIService.getCitiesAdmin(data)
        const res = await response.json();
        const result = res.data;
        const t = res.total_count;
        setTotalItems(t);
        setExistingCities(result)
        setPageLoading(false);
    }
    const handlePageChange = (event, value) => {
        setCurrentPage(value)
        console.log('hey')
        fetchPageData(value)
    }
    return (
        <div className="h-screen">
            <Navbar />


            <div className='h-[calc(100vh_-_7rem)] w-full px-10'>

                <div className='h-16 w-full  flex justify-between items-center p-2  border-gray-300 border-b-2'>
                    <div className='flex items-center space-x-3'>
                        <div className='rounded-2xl  bg-[#EBEBEB] h-8 w-8 '>
                            <Link to="/dashboard"><img src={backLink} /></Link>
                        </div>

                        <div className='flex-col'>
                            <h1 className='text-[18px]'>City</h1>
                            <p className='text-[14px]'>Admin &gt; City</p>
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
                            <button className="bg-[#004DD7] text-white h-[36px] w-[240px] rounded-lg" onClick={handleOpen}>
                                <div className="flex items-center justify-center gap-4">
                                    Add New City
                                    <img className='h-[18px] w-[18px]' src={Add} alt="add" />
                                </div>
                            </button>
                        </div>

                    </div>

                </div>

                <div className='h-12 w-full bg-white'>

                </div>

                <div className='h-[calc(100vh_-_14rem)] w-full text-[12px]'>

                    <div className='w-full h-12 bg-[#F0F6FF] flex justify-between'>
                        <div className='w-3/4 flex'>
                            <div className='w-[10%] p-4'>
                                <p>Sr. </p>
                            </div>
                            <div className='w-[20%]  p-4'>
                                <p>Country</p>
                            </div>
                            <div className='w-[20%]  p-4'>
                                <p>State</p>
                            </div>
                            <div className='w-[25%]  p-4'>
                                <p>City</p>
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


                    <div className='h-[calc(100vh_-_17rem)] w-full  overflow-auto'>
                        {pageLoading && <LinearProgress />}
                        {!pageLoading && existingCities.map((item, index) => {
                            return <div className='w-full h-12  flex justify-between border-gray-400 border-b-[1px]'>
                                <div className='w-3/4 flex'>
                                    <div className='w-[10%] p-4'>
                                        <p>{index + 1 + (currentPage - 1) * currentPages}</p>
                                    </div>
                                    <div className='w-[20%]  p-4'>
                                        <p>{item.country}</p>
                                    </div>
                                    <div className='w-[20%]  p-4'>
                                        <p>{item.state}</p>
                                    </div>
                                    <div className='w-[25%]  p-4'>
                                        <p>{item.city}</p>
                                    </div>
                                </div>
                                <div className='w-1/6  flex'>
                                    <div className='w-1/2  p-4'>
                                        <p>{item.id}</p>
                                    </div>
                                    <div className='w-1/2 0 p-4 flex justify-between items-center'>
                                        <img className='w-5 h-5' src={Edit} alt="edit" />
                                        <img className='w-5 h-5' src={Trash} alt="trash" />
                                    </div>
                                </div>
                            </div>
                        })}
                        {/* we get all the existing cities here */}

                    </div>




                </div>


            </div>



            <div className='w-full h-12 flex justify-between justify-self-end px-6 '>
                {/* footer component */}
                <div className='ml-2'>
                    <div className='flex items-center w-auto h-full'>
                        {/* items */}
                        <Pagination count={Math.ceil(totalItems / currentPages)} onChange={handlePageChange} page={currentPage} />

                    </div>
                </div>
                <div className='flex mr-10 justify-center items-center space-x-2 '>
                    <div className="flex mr-8 space-x-2 text-sm items-center">
                        <p className="text-gray-700">Items Per page</p>
                        <select className="text-gray-700 border-black border-[1px] rounded-md p-1"
                            name="currentPages"
                            value={currentPages}
                            //  defaultValue="Select State"
                            onChange={e => {
                                setCurrentPages(e.target.value);
                                // console.log(e.target.value);
                                fetchQuantityData(e.target.value)
                            }}
                        >
                            <option>
                                15
                            </option>
                            <option>
                                20
                            </option>
                            <option>
                                25
                            </option>
                        </select>
                    </div>
                    <div className="flex text-sm">
                        <p className="mr-11 text-gray-700">{totalItems} Items in {Math.ceil(totalItems / currentPages)} Pages</p>
                    </div>
                    {downloadModal && <div className='h-[130px] w-[200px] bg-red-800 absolute bottom-12 right-24 flex-col items-center  justify-center space-y-6 p-5'>

                        <div className='flex'>
                            <p>Download as pdf</p>
                            {/* <img src=''/> */}
                        </div>
                        <div>
                            <p>Download as Excel</p>
                        </div>
                    </div>}

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

            <Modal open={isCityDialogue}
                fullWidth={true}
                maxWidth={'md'} >
                <div className='flex justify-center mt-[200px]'>
                    <div className="w-6/7  h-[200px] bg-white rounded-lg">
                        <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center">
                            <div className="mr-[410px] ml-[410px]">
                                <div className="text-[16px]">Add New City</div>
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
                                            <div className="text-[14px]">City Name<label className="text-red-500">*</label></div>
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

export default City
