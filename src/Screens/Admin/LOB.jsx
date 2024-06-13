import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import backLink from "../../assets/back.png";
import searchIcon from "../../assets/searchIcon.png";
import nextIcon from "../../assets/next.png";
import refreshIcon from "../../assets/refresh.png";
import downloadIcon from "../../assets/download.png";
import { useState, useEffect, useRef } from 'react';
import Navbar from "../../Components/Navabar/Navbar";
import Cross from "../../assets/cross.png";
import Edit from "../../assets/edit.png";
import Trash from "../../assets/trash.png";
import Add from "./../../assets/add.png";
import { Modal, CircularProgress, LinearProgress, Pagination } from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
import { APIService } from '../../services/API';
import Filter from "../../assets/filter.png"
import Pdf from "../../assets/pdf.png";
import Excel from "../../assets/excel.png"
import EditLobModal from './Modals/EditLobModal';
import SucessfullModal from "../../Components/modals/SucessfullModal"
import FailureModal from '../../Components/modals/FailureModal';
import CancelModel from './../../Components/modals/CancelModel';
import DeleteLobModal from './Modals/DeleteLobModal';
import SaveConfirmationLob from './Modals/SaveConfirmationLob';
import CharacterFilter from '../../Components/Filters/CharacterFilter';
import NumericFilter from '../../Components/Filters/NumericFilter';
import Draggable from 'react-draggable';
import ActiveFilter from "../../assets/active_filter.png"
import AddButton from '../../Components/common/CustomButton';
import EditButton from '../../Components/common/buttons/EditButton';
import DeleteButton from '../../Components/common/buttons/deleteButton';
const env_URL_SERVER = import.meta.env.VITE_ENV_URL_SERVER
const LOB = () => {
    const menuRef = useRef();
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const [existingLOB, setExistingLOB] = useState([]);
    const [currentPages, setCurrentPages] = useState(15);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageLoading, setPageLoading] = useState(false);
    const [totalItems, setTotalItems] = useState(0);
    const [downloadModal, setDownloadModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [lobError, setLobError] = useState("");
    const [currItem, setCurrItem] = useState({});
    const [sortField, setSortField] = useState("id");
    const [openAddConfirmation, setOpenAddConfirmation] = useState(false);
    // const [flag,setFlag] = useState(false);
    useEffect(() => {
        fetchData();
        const handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setLobFilter(false);
                setIdFilter(false);
            }
        }

        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);
    const fetchPageData = async (pageNumber) => {
        setPageLoading(true);
        setCurrentPage(pageNumber);
        const data = {

            "rows": ["id", "name"],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": Number(pageNumber),
            "pg_size": Number(currentPages)
        };
        const response = await APIService.getLob(data)
        const temp = await response.json();
        const result = temp.data;
        const t = temp.total_count;
        setTotalItems(t);
        setExistingLOB(result);
        setPageLoading(false);
    }
    const fetchQuantityData = async (number) => {
        setPageLoading(true);
        setCurrentPage((prev) => 1);
        const data = {

            "rows": ["id", "name"],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(number)
        };
        const response = await APIService.getLob(data)
        const temp = await response.json();
        const result = temp.data;
        const t = temp.total_count;
        setTotalItems(t);
        setExistingLOB(result);
        setPageLoading(false);
    }
    const fetchData = async () => {
        setPageLoading(true);

        const tempArray = []
        Object.keys(filterMapState).forEach((key) => {
            if (filterMapState[key].filterType != "") {
                if (filterMapState[key].filterData == 'Numeric') {
                    tempArray.push([
                        key,
                        filterMapState[key].filterType,
                        Number(filterMapState[key].filterValue),
                        filterMapState[key].filterData,
                    ]);
                } else {
                    tempArray.push([
                        key,
                        filterMapState[key].filterType,
                        filterMapState[key].filterValue,
                        filterMapState[key].filterData,
                    ]);
                }

            }
        });
        setFilterState((prev) => tempArray)
        const data = {

            "rows": ["id", "name"],
            "filters": tempArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": Number(currentPage),
            "pg_size": Number(currentPages),
            "search_key": searchQuery
        };
        const response = await APIService.getLob(data)
        const temp = await response.json();
        const result = temp.data;
        const t = temp.total_count;
        setTotalItems(t);
        console.log(t);
        setExistingLOB(result);
        setPageLoading(false);
    }
    const handleSort = async (field) => {
        setPageLoading(true);
        setSortField(field);
        // var existingFlag = flag
        // existingFlag = !existingFlag
        // setFlag(existingFlag)
        setFlag((prev) => {
            return !prev
        })
        // setFlag((prev) => {
        //     return !prev;
        // })
        const data = {

            "rows": ["id", "name"],
            "filters": filterState,
            "sort_by": [field],
            "order": !flag ? "asc" : "desc",
            "pg_no": Number(currentPage),
            "pg_size": Number(currentPages),
            "search_key": searchQuery
        };
        const response = await APIService.getLob(data)
        const temp = await response.json();
        const result = temp.data;
        const t = temp.total_count;
        setTotalItems(t);
        setExistingLOB(result);

        setPageLoading(false);
    }
    const handleAddLob = () => {
        if (lobName == "") {
            setLobError("This Feild Is Mandatory");
            return;
        } else {
            setLobError("");
        }
        setIsLobDialogue(false)
        setOpenAddConfirmation(true);
        // this is the validation logic

    }
    const addLob = async () => {

        const data = {

            "name": lobName,
        }
        const response = await APIService.addLob(data);
        const res = await response.json()
        console.log(res);
        setOpenAddConfirmation(false);
        if (res.result == "success") {
            setLobName("");
            openSuccessModal();
        } else {
            openFailureModal();
        }
        fetchData();
    }
    const deleteLob = async (name) => {
        // we write delete lob logic here
        setPageLoading(true);
        const data = {

            "name": String(name)
        }
        const response = await APIService.deleteLob(data);
        setDeleteLobModal(false);
        const res = await response.json()
        console.log("this is the error")
        console.log(res.result)
        if (res.result == 'success') {
            openDeleteSuccess();
            // console.log('hi')
        }
        fetchData();
        setPageLoading(false);
    }
    const [isLobDialogue, setIsLobDialogue] = React.useState(false);
    const handleOpen = () => {
        setIsLobDialogue(true);
    };
    const handleClose = () => {
        initials();
        setIsLobDialogue(false);
        openAddCancelModal();
    }
    const initials = () => {
        setLobName("")
        setLobError("");
    }
    const [backDropLoading, setBackDropLoading] = useState(false)
    const handleDownload = async (type) => {
        setDownloadModal(false)
        setPageLoading(true);
        setBackDropLoading(true)
        const data = {

            rows: ["name", "id"],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 0,
            "pg_size": 0,
            "search_key": searchQuery,
            "downloadType": type,
            "routename": pathname,
            "colmap": {
                "name": "LOB Name",
                "id": "ID"
            }
        };
        const response = await APIService.getLob(data)
        const temp = await response.json();
        const result = temp.data;
        console.log(temp)
        if (temp.result == 'success') {
            const d = {
                "filename": temp.filename,
            }
            APIService.download(d, temp.filename).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.blob();
            })
                .then(result => {
                    if (type == "excel") {
                        FileSaver.saveAs(result, 'LobData.xlsx');
                    } else if (type == "pdf") {
                        FileSaver.saveAs(result, 'LobData.pdf');
                    }
                    console.log('Success:', result);
                })
                .catch(error => {
                    console.error('Error:', error);
                });

            setTimeout(() => {
                setPageLoading(false)
            }, 1000)
        }
    }
    const [lobName, setLobName] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const handleRefresh = () => {
        fetchData();
    }
    const handleChange = (e) => {
        const { value } = e.target;
        console.log(value);
        setLobName(value);
    }
    const [flag, setFlag] = useState(false);
    const handleSearch = async () => {
        setPageLoading(true);
        setCurrentPage(1)
        const data = {

            "rows": ["id", "name"],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": searchQuery
        };
        const response = await APIService.getLob(data)
        const temp = await response.json();
        const result = temp.data;
        const t = temp.total_count;
        setTotalItems(t);
        console.log(t);
        setExistingLOB(result);
        setPageLoading(false);
    }
    const [lobFilter, setLobFilter] = useState(false);
    const [lobFilterInput, setLobFilterInput] = useState("");
    const toggleLobFilter = () => {
        setLobFilter((prev) => !prev)
    }
    const handlePageChange = (event, value) => {
        console.log(value);
        setCurrentPage(value)
        fetchPageData(value);
    }
    const openDownload = () => {
        setDownloadModal((prev) => !prev);
    }
    const handleOpenEdit = (oldItem) => {
        setEditModal(true);
        setCurrItem(oldItem)
    }
    const [isSuccessModal, setIsSuccessModal] = useState(false);
    const [isFailureModal, setIsFailureModal] = useState(false);
    const [showEditSuccess, setShowEditSuccess] = useState(false);
    const [showCancelModelAdd, setShowCancelModelAdd] = useState(false);
    const [showCancelModel, setShowCancelModel] = useState(false);
    const openSuccessModal = () => {
        // set the state for true for some time
        setIsLobDialogue(false);
        setIsSuccessModal(true);
        setTimeout(function () {
            setIsSuccessModal(false)
        }, 2000)
    }
    const openAddCancelModal = () => {
        // set the state for true for some time
        setIsLobDialogue(false);
        setShowCancelModelAdd(true);
        setTimeout(function () {
            setShowCancelModelAdd(false)
        }, 2000)
    }
    const openCancelModal = () => {
        // set the state for true for some time

        setShowCancelModel(true);
        setTimeout(function () {
            setShowCancelModel(false)
        }, 2000)
    }
    const openFailureModal = () => {
        setIsLobDialogue(false);
        setIsFailureModal(true);
        setTimeout(function () {
            setIsFailureModal(false);
        }, 2000)
    }
    const openSuccessEditModal = () => {
        setEditModal(false);
        setShowEditSuccess(true);
        setTimeout(function () {
            setShowEditSuccess(false);
        }, 2000)
        fetchData();
    }

    const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
    const openDeleteSuccess = () => {
        // setIsLobDialogue(false);
        console.log('hey')
        setShowDeleteSuccess(true);
        setTimeout(function () {
            setShowDeleteSuccess(false);
        }, 2000)
    }
    const handleCloseSearch = async () => {
        setPageLoading(true);
        setSearchQuery("");
        setCurrentPage(1);
        const data = {

            "rows": ["id", "name"],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": ""
        };
        const response = await APIService.getLob(data)
        const temp = await response.json();
        const result = temp.data;
        const t = temp.total_count;
        setTotalItems(t);
        console.log(t);
        setExistingLOB(result);
        setPageLoading(false);
    }
    const handleFilter = () => {

    }
    const handleDelete = (item) => {
        setCurrItem(item)
        setDeleteLobModal(true);
    }

    const filterMapping = {
        name: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        id: {
            filterType: "",
            filterValue: null,
            filterData: "Numeric",
            filterInput: ""
        }
    }

    const [filterMapState, setFilterMapState] = useState(filterMapping);

    const newHandleFilter = async (inputVariable, setInputVariable, type, columnName) => {

        var existing = filterMapState;
        existing = {
            ...existing, [columnName]: {
                ...existing[columnName],
                filterType: type == 'noFilter' ? "" : type
            }
        }
        existing = {
            ...existing, [columnName]: {
                ...existing[columnName],
                filterValue: type == 'noFilter' ? "" : inputVariable
            }
        }
        if (type == 'noFilter' || type == 'isNull' || type == 'isNotNull') setInputVariable("");
        fetchFiltered(existing);
    }
    const [filterState, setFilterState] = useState([]);
    const fetchFiltered = async (mapState) => {
        setPageLoading(true);
        setFilterMapState(mapState)
        const tempArray = [];
        // we need to query thru the object
        setLobFilter(false);
        setIdFilter(false);
        // console.log(filterMapState);
        console.log(filterMapState)
        Object.keys(mapState).forEach((key) => {
            if (mapState[key].filterType != "") {
                if (mapState[key].filterData == 'Numeric') {
                    tempArray.push([
                        key,
                        mapState[key].filterType,
                        Number(mapState[key].filterValue),
                        mapState[key].filterData,
                    ]);
                } else {
                    tempArray.push([
                        key,
                        mapState[key].filterType,
                        mapState[key].filterValue,
                        mapState[key].filterData,
                    ]);
                }

            }
        });
        setFilterState(tempArray)
        console.log('this is getting called')
        console.log(tempArray)
        setCurrentPage(1);
        const data = {

            "rows": ["id", "name"],
            "filters": tempArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": searchQuery
        };
        const response = await APIService.getLob(data)
        const temp = await response.json();
        const result = temp.data;
        const t = temp.total_count;
        setTotalItems(t);
        console.log(t);
        setExistingLOB(result);
        setPageLoading(false);
    }

    const [deleteLobModal, setDeleteLobModal] = useState(false);
    const [idFilter, setIdFilter] = useState(false)
    const [idFilterInput, setIdFilterInput] = useState("");





    function handleKeyDown(event) {
        if (event.keyCode === 13) {
            handleSearch()
        }
    }
    const handleEnterToFilter = (event, inputVariable,
        setInputVariable,
        type,
        columnName) => {
        if (event.keyCode === 13) {
            // if its empty then we remove that 
            // const temp = {...filterMapState};
            // temp[columnName].type = "".
            // setFilterMapState(temp)
            if (inputVariable == "") {
                const temp = { ...filterMapState }
                temp[columnName].filterType = ""
                setFilterMapState(temp)
                fetchData()
            } else {
                newHandleFilter(inputVariable,
                    setInputVariable,
                    type,
                    columnName)
            }



        }
    }
    return (
        <div className='font-medium'>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={pageLoading}
                onClick={() => { }}
            >

                <CircularProgress color="inherit" />

            </Backdrop>
            {editModal && <EditLobModal isOpen={editModal} handleClose={() => setEditModal(false)} item={currItem} fetchData={fetchData} showSuccess={openSuccessEditModal} showCancel={openCancelModal} />}
            {showCancelModelAdd && <CancelModel isOpen={showCancelModelAdd} message="Process cancelled, no new LOB added." />}
            {showCancelModel && <CancelModel isOpen={showCancelModel} message="Process cancelled, no changes saved." />}
            {isSuccessModal && <SucessfullModal isOpen={isSuccessModal} message="New Lob added Successfully!" />}
            {isFailureModal && <FailureModal isOpen={isFailureModal} message="Some Error Occured Try again!" />}
            {showEditSuccess && <SucessfullModal isOpen={showEditSuccess} message="Changes Saved Successfully!" />}
            {showDeleteSuccess && <SucessfullModal isOpen={showDeleteSuccess} message="Lob Deleted Successfully!" />}
            {deleteLobModal && <DeleteLobModal isOpen={deleteLobModal} handleDelete={deleteLob} item={currItem} handleClose={() => setDeleteLobModal(false)} showCancel={openCancelModal} />}
            {openAddConfirmation && <SaveConfirmationLob handleClose={() => setOpenAddConfirmation(false)} currLob={lobName} addLob={addLob} setDefault={initials} showCancel={openAddCancelModal} />}
            <div className='h-[calc(100vh_-_123px)] w-full px-10'>
                {/* we need the first banner */}
                <div className='h-16 w-full  flex justify-between items-center p-2  border-gray-300 border-b-2'>
                    <div className='flex items-center space-x-3'>
                        <div className='rounded-2xl  bg-[#EBEBEB] h-8 w-8 flex justify-center items-center '>
                            <button onClick={() => navigate(-1)}><img className='w-5 h-5' src={backLink} /></button>
                        </div>

                        <div className='flex-col'>
                            <h1 className='text-[18px]' >LOB</h1>
                            <p className='text-[14px]'>Admin &gt; LOB</p>
                        </div>
                    </div>
                    <div className='flex space-x-2 items-center'>

                        <div className='flex bg-[#EBEBEB] '>
                            {/* search button */}
                            <input
                                className="h-[36px] bg-[#EBEBEB] text-[#787878] pl-2 outline-none w-48"
                                type="text"
                                placeholder="   Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDownCapture={handleKeyDown}
                            />
                            <button onClick={handleCloseSearch}><img src={Cross} className=' w-[20px] h-[20px] mx-2' /></button>
                            <div className="h-[36px] w-[40px] bg-[#004DD7] flex items-center justify-center rounded-r-lg">
                                <button onClick={handleSearch}><img className="h-[26px] " src={searchIcon} alt="search-icon" /></button>
                            </div>
                        </div>

                        <div>
                            {/* button */}
                            {/* <button className="bg-[#004DD7] text-white h-[36px] w-[240px] rounded-lg" onClick={handleOpen}>
                                <div className="flex items-center justify-center gap-4">
                                    Add New LOB
                                    <img className='h-[18px] w-[18px]' src={Add} alt="add" />
                                </div>
                            </button> */}
                            <AddButton title="Add New LOB" onClick={handleOpen} />

                        </div>

                    </div>

                </div>

                {/* filter component */}
                <div className='h-12 w-full bg-white flex justify-between'>
                    <div className='w-3/4 flex'>
                        <div className='w-[10%] p-4'>

                        </div>
                        <div className='w-[20%] px-3 py-2.5'>
                            <div className="w-[50%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                <input className="w-[70%] bg-[#EBEBEB] rounded-[5px] text-xs pl-2 outline-none" value={lobFilterInput} onChange={(e) => setLobFilterInput(e.target.value)}
                                    onKeyDown={(event) => handleEnterToFilter(event, lobFilterInput,
                                        setLobFilterInput,
                                        'contains',
                                        'name')}
                                />
                                {console.log(filterMapState.name.filterType)}
                                {filterMapState.name.filterType == "" ? <button className='w-[30%] px-1 py-2' onClick={() => setLobFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> : <button className='w-[30%] px-1 py-2' onClick={() => setLobFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>}
                            </div>
                            {lobFilter && <CharacterFilter inputVariable={lobFilterInput} setInputVariable={setLobFilterInput} handleFilter={newHandleFilter} filterColumn='name' menuRef={menuRef} filterType={filterMapState.name.filterType} />}
                        </div>
                    </div>
                    <div className='w-1/6 px-3 py-2.5'>
                        <div className='w-[45%] flex items-center bg-[#EBEBEB] rounded-[5px]'>
                            <input className="w-[70%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" value={idFilterInput} onChange={(e) => setIdFilterInput(e.target.value)}

                                onKeyDown={(event) => handleEnterToFilter(event, idFilterInput,
                                    setIdFilterInput,
                                    'equalTo',
                                    'id')}
                            />
                            {filterMapState.id.filterType == "" ? <button className='w-[30%] px-1 py-2' onClick={() => setIdFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> : <button className='w-[30%] px-1 py-2' onClick={() => setIdFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>}
                        </div>
                        {idFilter && <NumericFilter inputVariable={idFilterInput} setInputVariable={setIdFilterInput} handleFilter={newHandleFilter} menuRef={menuRef} columnName='id' filterType={filterMapState.id.filterType} />}
                        <div className='w-1/2 p-4'>

                        </div>
                    </div>
                </div>

                {/* main table component */}
                <div className='h-[calc(100vh_-_14rem)] w-full text-[12px]'>
                    <div className='w-full h-12 bg-[#F0F6FF] flex justify-between'>
                        <div className='w-3/4 flex'>
                            <div className='w-[10%] p-4'>
                                <p>Sr. </p>
                            </div>
                            <div className='w-[20%]  p-4'>
                                <p>LOB Name <button onClick={() => handleSort("name")}><span className="font-extrabold">↑↓</span></button></p>
                            </div>

                        </div>
                        <div className='w-1/6  flex'>
                            <div className='w-1/2 p-4'>
                                <p>ID <button onClick={() => handleSort("id")}><span className="font-extrabold">↑↓</span></button></p>
                            </div>
                            <div className='w-1/2  p-4'>
                                <p>Edit</p>
                            </div>
                        </div>
                    </div>

                    <div className='h-[calc(100vh_-_17rem)] w-full overflow-auto'>
                        {/* {pageLoading && <div className='ml-5 mt-5'><LinearProgress /></div>} */}
                        {!pageLoading && existingLOB && existingLOB.length == 0 && <div className='h-10 border-gray-400 border-b-[1px] flex items-center'>
                            <h1 className='ml-10'>No Records To Show</h1>
                        </div>}
                        {!pageLoading && existingLOB.map((item, index) => {
                            return <div className='w-full flex justify-between border-gray-400 border-b-[1px]'>
                                <div className='w-3/4 flex'>
                                    <div className='w-[10%] p-3 ml-[3px]'>
                                        <p>{index + 1 + (currentPage - 1) * currentPages}</p>
                                    </div>
                                    <div className='w-[20%]  p-3 ml-[3px]'>
                                        <p>{item.name}</p>
                                    </div>
                                    {/* <div className='w-[20%]  p-4'>
                                                    <p>{item.lob_head}</p>
                                                </div>
                                                <div className='w-[25%]  p-4'>
                                                    <p>{item.company}</p>
                                                </div> */}
                                </div>
                                <div className='w-1/6  flex'>
                                    <div className='w-1/2 p-3 flex ml-[9px]'>
                                        <p>{item.id}</p>
                                    </div>
                                    <div className='w-1/2 p-3 flex items-center ml-[9px] gap-2'>
                                        <EditButton
                                            rowData={item}
                                            handleEdit={handleOpenEdit}
                                        />
                                        <DeleteButton

                                            handleDelete={handleDelete}
                                            rowData={item}
                                        />
                                        {/* <img className=' h-5 mr-4 cursor-pointer' src={Edit} alt="edit" onClick={() => handleOpenEdit(item)} />
                                        <button onClick={() => handleDelete(item)}><img className=' h-5' src={Trash} alt="trash" /></button> */}
                                    </div>
                                </div>
                            </div>
                        })}
                        {/* we get all the existing cities here */}
                    </div>
                </div>


                {/* main data */}



            </div>

            {/* footer component */}
            <div className='w-full h-12 flex justify-between justify-self-end px-6 mt-5 fixed bottom-0 bg-white'>
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
                                console.log(e.target.value);
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
                        <button onClick={() => setDownloadModal(false)}><img src={Cross} className='absolute top-1 right-1 w-4 h-4' /></button>

                        <button onClick={() => handleDownload("pdf")}>
                            <div className='flex space-x-2 justify-center items-center ml-3 mt-3'>
                                <p>Download as pdf</p>
                                <img src={Pdf} />
                            </div>
                        </button>
                        <button onClick={() => handleDownload("excel")}>
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


            {/* modal component */}
            <Modal open={isLobDialogue}
                fullWidth={true}
                maxWidth={'md'}
                className='flex justify-center items-center'
            >
                <>
                    <Draggable handle='div.move'>
                        <div className='flex justify-center'>
                            <div className="w-[778px]  h-auto bg-white rounded-lg">
                                <div className="move cursor-move">
                                    <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-t-lg">
                                        <div className="mr-[290px] ml-[290px]">
                                            <div className="text-[16px]">New LOB</div>
                                        </div>
                                        <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                                            <button onClick={handleClose}><img className="w-[20px] h-[20px]" src={Cross} alt="cross" /></button>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-16 mb-3">
                                    <div className="h-auto w-full mt-[15px] ">
                                        <div className="flex gap-[48px] justify-center items-center">
                                            <div className=" space-y-[12px] py-[20px] px-[10px]">
                                                <div className="">
                                                    <div className="text-[14px] text-[#505050]">LOB Name  <label className="text-red-500">*</label></div>
                                                    <input className="w-[217px] h-[22px] border-[1px] border-[#C6C6C6] rounded-sm py-1 px-2 text-[12px] text-[#505050]" type="text" name="empName" value={lobName} onChange={handleChange} />
                                                    <div className="text-[11px] text-[#CD0000] absolute">{lobError}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-center items-center gap-[10px] ">
                                        <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' onClick={handleAddLob}>Add</button>
                                        <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleClose}>Cancel</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </Draggable>
                </>
            </Modal>
        </div>
    )
}

export default LOB
