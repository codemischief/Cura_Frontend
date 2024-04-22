import React from 'react';
import { Outlet, Link } from "react-router-dom";
import backLink from "../../../assets/back.png";
import searchIcon from "../../../assets/searchIcon.png";
import nextIcon from "../../../assets/next.png";
import refreshIcon from "../../../assets/refresh.png";
import downloadIcon from "../../../assets/download.png";
import { useState, useEffect, useRef } from 'react';
import Navbar from "../../../Components/Navabar/Navbar";
import Cross from "../../../assets/cross.png";
import Add from "./../../../assets/add.png";
import Pdf from "../../../assets/pdf.png";
import Excel from "../../../assets/excel.png"
import Filter from "../../../assets/filter.png"
import { Modal } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import { CircularProgress, Pagination, LinearProgress } from "@mui/material";
import { APIService } from '../../../services/API';
import Edit from "../../../assets/edit.png"
import Trash from "../../../assets/trash.png"

import OrderInformation from './Dialog/OrderInformation';
import Photos from './Dialog/Photos';
import OrderStatusHistory from './Dialog/OrderStatusHistory';

const ManageOrder = () => {
    // we have the module here
    const menuRef = useRef();

    const [existingOrder, setExistingOrder] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPages, setCurrentPages] = useState(15);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedDialog, setSelectedDialogue] = useState(1);
    const [pageLoading, setPageLoading] = useState(false);
    const [downloadModal, setDownloadModal] = useState(false);

    const handlePageChange = (event, value) => {

        setCurrentPage(value)
        fetchPageData(value);
    }

    const [flag, setFlag] = useState(false)

    const fetchData = async () => {
        console.log('ugm')
        setPageLoading(true);
        const data = {
            "user_id": 1234,
            "rows": [
                "id",
                "clientid",
                "clientname",
                "orderdate",
                "earlieststartdate",
                "expectedcompletiondate",
                "actualcompletiondate",
                "owner",
                "ownername",
                "comments",
                "status",
                "orderstatus",
                "briefdescription",
                "additionalcomments",
                "service",
                "servicename",
                "clientpropertyid",
                "clientproperty",
                "vendorid",
                "vendorname",
                "assignedtooffice",
                "officename",
                "dated",
                "createdby",
                "isdeleted",
                "entityid",
                "entity",
                "tallyledgerid"
            ],
            "filters": [],
            "sort_by": ["id"],
            "order": "desc",
            "pg_no": 1,
            "pg_size": 15
        }
            ;
        const response = await APIService.getOrder(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingOrder(result);
        setPageLoading(false);
    }
    const fetchPageData = async (pageNumber) => {
        setPageLoading(true);
        setCurrentPage(pageNumber)
        const data = {
            "user_id": 1234,
            "rows": [
                "id",
                "clientid",
                "clientname",
                "orderdate",
                "earlieststartdate",
                "expectedcompletiondate",
                "actualcompletiondate",
                "owner",
                "ownername",
                "comments",
                "status",
                "orderstatus",
                "briefdescription",
                "additionalcomments",
                "service",
                "servicename",
                "clientpropertyid",
                "clientproperty",
                "vendorid",
                "vendorname",
                "assignedtooffice",
                "officename",
                "dated",
                "createdby",
                "isdeleted",
                "entityid",
                "entity",
                "tallyledgerid"
            ],
            "filters": [],
            "sort_by": ["id"],
            "order": "desc",
            "pg_no": Number(pageNumber),
            "pg_size": Number(currentPages)
        }
        const response = await APIService.getOrder(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingOrder(result);
        setPageLoading(false);
    }
    const fetchQuantityData = async (quantity) => {
        setPageLoading(true);
        const data = {
            "user_id": 1234,
            "rows": [
                "id",
                "clientid",
                "clientname",
                "orderdate",
                "earlieststartdate",
                "expectedcompletiondate",
                "actualcompletiondate",
                "owner",
                "ownername",
                "comments",
                "status",
                "orderstatus",
                "briefdescription",
                "additionalcomments",
                "service",
                "servicename",
                "clientpropertyid",
                "clientproperty",
                "vendorid",
                "vendorname",
                "assignedtooffice",
                "officename",
                "dated",
                "createdby",
                "isdeleted",
                "entityid",
                "entity",
                "tallyledgerid"
            ],
            "filters": [],
            "sort_by": ["id"],
            "order": flag ? "asc" : "desc",
            "pg_no": Number(currentPage),
            "pg_size": Number(quantity)
        }
            ;
        const response = await APIService.getOrder(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingOrder(result);
        setPageLoading(false);
    }

    useEffect(() => {
        fetchData();

        const handler = (e) => {
            if (!menuRef.current.contains(e.target)) {

            }
        }

        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);

    const handleEdit = (id) => {
        // we need to open the edit modal
        // setCurrPma(id)
        // setShowEditModal(true);
    }

    const handleDelete = (id) => {
        // setCurrPma(id);
        // setShowDeleteModal(true)
    }



    const handleExcelDownload = async () => {
        const data = {

        };
        // const response = await APIService.getEmployees(data)
        // const temp = await response.json();
        // const result = temp.data;
        // const worksheet = XLSX.utils.json_to_sheet(result);
        // const workbook = XLSX.utils.book_new();
        // XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        // XLSX.writeFile(workbook, "OrderData.xlsx");
        // FileSaver.saveAs(workbook, "demo.xlsx");
    }

    const openDownload = () => {
        setDownloadModal(true);
    }

    const handleRefresh = () => {
        fetchData();
    }

    const selectFirst = () => {
        setSelectedDialogue(1);
    }

    const selectSecond = () => {
        setSelectedDialogue(2);
    }

    const selectThird = () => {
        setSelectedDialogue(3);
    }


    const [isStateDialogue, setIsStateDialogue] = React.useState(false);
    const handleOpen = () => {
        setIsStateDialogue(true);
    };
    const handleClose = () => {
        setIsStateDialogue(false);
    }
    return (
        <div className="h-screen">
            <Navbar />

            <div className='h-[calc(100vh_-_7rem)] w-full px-10'>


                <div className='h-16 w-full  flex justify-between items-center p-2  border-gray-300 border-b-2'>
                    <div className='flex items-center space-x-3'>
                        <div className='rounded-2xl  bg-[#EBEBEB] h-8 w-8 flex justify-center items-center'>
                            <img className='h-5 w-5' src={backLink} />
                        </div>

                        <div className='flex-col'>
                            <h1 className='text-[18px]'>Manage Order</h1>
                            <p className='text-[14px]'>Manage &gt; Manage Order</p>
                        </div>
                    </div>
                    <div className='flex space-x-2 items-center relative'>
                        <div className='flex'>
                            {/* search button */}
                            <input
                                className="h-[36px] bg-[#EBEBEB] text-[#787878]"
                                type="text"
                                placeholder="  Search"
                            />
                            <button onClick={() => { }}><img src={Cross} className='absolute w-[20px] h-[20px] left-[160px] top-2' /></button>
                            <div className="h-[36px] w-[40px] bg-[#004DD7] flex items-center justify-center rounded-r-lg">
                                <img className="h-[26px] " src={searchIcon} alt="search-icon" />
                            </div>
                        </div>

                        <div>
                            {/* button */}
                            <button className="bg-[#004DD7] text-white h-[36px] w-[240px] rounded-lg" onClick={handleOpen}>
                                <div className="flex items-center justify-center gap-4">
                                    Add New Order
                                    <img className='h-[18px] w-[18px]' src={Add} alt="add" />
                                </div>
                            </button>
                        </div>

                    </div>

                </div>


                <div className='h-12 w-full bg-white'>
                    <div className='flex justify-between'>
                        <div className='w-[85%] flex'>
                            <div className='w-[3%] p-4'>
                                {/* <p>Sr. </p> */}
                            </div>
                            <div className='w-[12%]  px-4 py-3'>

                                <div className="w-[90%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-14 bg-[#EBEBEB] rounded-[5px]" />
                                    <button className='p-1'><img src={Filter} className='h-[15px] w-[15px]' /></button>
                                </div>
                            </div>
                            <div className='w-[11%]  px-4 py-3'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-14 bg-[#EBEBEB] rounded-[5px]" />
                                    <button className='p-1' onClick={() => setSuburbFilter((prev) => !prev)}><img src={Filter} className='h-[15px] w-[15px]' /></button>
                                </div>
                            </div>
                            <div className='w-[13%]  px-4 py-3'>
                                <div className="w-[80%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-14 bg-[#EBEBEB] rounded-[5px]" />
                                    <button className='p-1'><img src={Filter} className='h-[15px] w-[15px]' /></button>
                                </div>

                            </div>
                            <div className='w-[16%]  px-4 py-3'>
                                <div className="w-[60%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-14 bg-[#EBEBEB] rounded-[5px]" />
                                    <button className='p-1'><img src={Filter} className='h-[15px] w-[15px]' /></button>
                                </div>

                            </div>
                            <div className='w-[9%]  px-4 py-3'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-9 bg-[#EBEBEB] rounded-[5px]" />
                                    <button className='p-1' ><img src={Filter} className='h-[15px] w-[15px]' /></button>
                                </div>

                            </div>
                            <div className='w-[12%]  px-4 py-3'>
                                <div className="w-[88%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-14 bg-[#EBEBEB] rounded-[5px]" />
                                    <button className='p-1' ><img src={Filter} className='h-[15px] w-[15px]' /></button>
                                </div>

                            </div>
                            <div className='w-[11%]  px-4 py-3'>
                                <div className="w-[99%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-14 bg-[#EBEBEB] rounded-[5px]" />
                                    <button className='p-1' ><img src={Filter} className='h-[15px] w-[15px]' /></button>
                                </div>

                            </div>
                            <div className='w-[13%]  px-4 py-3'>
                                <div className="w-[80%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-14 bg-[#EBEBEB] rounded-[5px]" />
                                    <button className='p-1' ><img src={Filter} className='h-[15px] w-[15px]' /></button>
                                </div>

                            </div>
                        </div>
                        <div className='w-[15%] flex'>
                            <div className='w-[58%]  px-4 py-3'>
                                <div className="w-full flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-12 bg-[#EBEBEB] rounded-[5px]" />
                                    <button className='p-1'><img src={Filter} className='h-[15px] w-[15px]' /></button>
                                </div>
                            </div>
                            <div className='w-[38%] 0 p-4'>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='h-[calc(100vh_-_14rem)] w-full text-[12px]'>

                    <div className='w-full h-12 bg-[#F0F6FF] flex justify-between'>
                        <div className='w-[85%] flex'>
                            <div className='w-[3%] p-4'>
                                <p>Sr. </p>
                            </div>
                            <div className='w-[12%]  p-4'>
                                <p>Client Name <span className="font-extrabold">↑↓</span></p>
                            </div>
                            <div className='w-[11%]  p-4'>
                                <p>Assigned to <span className="font-extrabold">↑↓</span></p>
                            </div>
                            <div className='w-[13%]  p-4'>
                                <p>Order Description</p>
                            </div>
                            <div className='w-[16%]  p-4'>
                                <p>Property Description <span className="font-extrabold">↑↓</span></p>
                            </div>
                            <div className='w-[9%]  p-4'>
                                <p>Service <span className="font-extrabold">↑↓</span></p>
                            </div>
                            <div className='w-[12%]  p-4'>
                                <p>Order Status <span className="font-extrabold">↑↓</span></p>
                            </div>
                            <div className='w-[11%]  p-4'>
                                <p>Start Date <span className="font-extrabold">↑↓</span></p>
                            </div>
                            <div className='w-[13%]  p-4'>
                                <p>Completion Date </p>
                            </div>
                        </div>
                        <div className='w-[15%]  flex'>
                            <div className='w-[62%]  p-4'>
                                <p>Order Date <span className="font-extrabold">↑↓</span></p>
                            </div>
                            <div className='w-[38%] 0 p-4'>
                                <p>Edit</p>
                            </div>
                        </div>
                    </div>


                    <div className='w-full h-[calc(100vh_-_18rem)] overflow-auto'>
                        {/* we map our items here */}
                        {pageLoading && <div className='ml-5 mt-5'><LinearProgress /></div>}
                        {!pageLoading && existingOrder.map((item, index) => {
                            return <div className='w-full h-auto bg-white flex justify-between border-gray-400 border-b-[1px]'>
                                <div className='w-[85%] flex'>
                                    <div className='w-[3%] p-4'>
                                        <p>{index + 1 + (currentPage - 1) * currentPages}</p>
                                    </div>
                                    <div className='w-[12%]  p-4'>
                                        <p>{item.clientname}</p>
                                    </div>
                                    <div className='w-[11%]  p-4'>
                                        <p>{item.assignedtooffice}</p>
                                    </div>
                                    <div className='w-[13%]  p-4'>
                                        <p>{item.briefdescription}</p>
                                    </div>
                                    <div className='w-[16%]  p-4'>
                                        <p>{item.briefdescription}</p>
                                    </div>
                                    <div className='w-[9%]  p-4'>
                                        <p>{item.service}</p>
                                    </div>
                                    <div className='w-[12%]  p-4'>
                                        <p>{item.status}</p>
                                    </div>
                                    <div className='w-[11%]  p-4'>
                                        <p>{item.earlieststartdate}</p>
                                    </div>
                                    <div className='w-[13%]  p-4'>
                                        <p>{item.expectedcompletiondate}</p>
                                    </div>
                                </div>
                                <div className='w-[15%]  flex'>
                                    <div className='w-[62%]  p-4'>
                                        <p>{item.orderdate}</p>
                                    </div>
                                    <div className='w-[38%] p-4'>
                                    <div className='flex space-x-1'>
                                            <img className='w-4 h-4 cursor-pointer' src={Edit} alt="edit" onClick={() => handleEdit(item.id)} />
                                            <img className='w-4 h-4 cursor-pointer' src={Trash} alt="trash" onClick={() => handleDelete(item.id)} />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        })}
                    </div>

                </div>





            </div>


            <div className='w-full h-12 flex justify-between px-6 '>
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
                                fetchQuantityData(e.target.value)
                            }}

                        >
                            <option>
                                15
                            </option>
                            <option>
                                25
                            </option>
                            <option>
                                50
                            </option>
                        </select>
                    </div>
                    <div className="flex text-sm">
                        <p className="mr-11 text-gray-700">{totalItems} Items in {Math.ceil(totalItems / currentPages)} Pages</p>
                    </div>
                    {downloadModal && <div className='h-[120px] w-[220px] bg-white shadow-xl rounded-md absolute bottom-12 right-24 flex-col items-center justify-center  p-5'>
                        <button onClick={() => setDownloadModal(false)}><img src={Cross} className='absolute top-1 left-1 w-4 h-4' /></button>

                        <button>
                            <div className='flex space-x-2 justify-center items-center ml-3 mt-3'>

                                <p>Download as pdf</p>
                                <img src={Pdf} />
                            </div>
                        </button>
                        <button onClick={handleExcelDownload}>
                            <div className='flex space-x-2 justify-center items-center mt-5 ml-3'>
                                <p>Download as Excel</p>
                                <img src={Excel} />
                            </div>
                        </button>
                    </div>}

                    <div className='border-solid border-black border-[0.5px] rounded-md w-28 h-10 flex items-center justify-center space-x-1 p-2' >
                        {/* refresh */}
                        <button onClick={handleRefresh}><p>Refresh</p></button>
                        <img src={refreshIcon} className="h-2/3" />
                    </div>
                    <div className='border-solid border-black border-[1px] w-28 rounded-md h-10 flex items-center justify-center space-x-1 p-2'>
                        {/* download */}
                        <button onClick={openDownload}><p>Download</p></button>
                        <img src={downloadIcon} className="h-2/3" />
                    </div>
                </div>
            </div>

            <Modal open={isStateDialogue}
                fullWidth={true}
                maxWidth={'md'}
                className='flex justify-center items-center'
            >
                <div className='flex justify-center'>
                    <div className="w-[1050px] h-auto bg-white  rounded-lg">
                        <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-lg">
                            <div className="mr-[410px] ml-[410px]">
                                <div className="text-[16px]">New Order</div>
                            </div>
                            <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                                <img onClick={handleClose} className="w-[20px] h-[20px]" src={Cross} alt="cross" />
                            </div>
                        </div>
                        <div className="mt-1 flex bg-[#DAE7FF] justify-center space-x-4 items-center h-9">
                            <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-60 cursor-pointer" onClick={selectFirst}>
                                <div>Order Information</div>
                            </div>
                            <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-60 cursor-pointer" onClick={selectSecond}>
                                <div>Photos</div>
                            </div>
                            <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-60 cursor-pointer" onClick={selectThird}>
                                <div>Order Status history</div>
                            </div>
                        </div>
                        {selectedDialog == 1 && <OrderInformation setIsStateDialogue={setIsStateDialogue} />}
                        {selectedDialog == 2 && <Photos setIsStateDialogue={setIsStateDialogue} />}
                        {selectedDialog == 3 && <OrderStatusHistory setIsStateDialogue={setIsStateDialogue} />}

                    </div>
                </div>
            </Modal>

        </div>
    )
}

export default ManageOrder
