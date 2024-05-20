import React from 'react';
import { Outlet, Link } from "react-router-dom";
import backLink from "../../assets/back.png";
import searchIcon from "../../assets/searchIcon.png";
import refreshIcon from "../../assets/refresh.png";
import downloadIcon from "../../assets/download.png";
import { useState, useEffect, useRef } from 'react';
import Navbar from "../../Components/Navabar/Navbar";
import Cross from "../../assets/cross.png";
import { Modal, Pagination, LinearProgress, Select, CircularProgress } from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import { APIService } from '../../services/API';
import Pdf from "../../assets/pdf.png";
import Excel from "../../assets/excel.png"
import Edit from "../../assets/edit.png"
import Trash from "../../assets/trash.png"
import Filter from "../../assets/filter.png"
import Add from "../../assets/add.png";
import SucessfullModal from '../../Components/modals/SucessfullModal';
import CancelModel from './../../Components/modals/CancelModel';
import SaveConfirmationService from './Modals/SaveConfirmationService';
import FailureModal from '../../Components/modals/FailureModal';
import DeleteServiceModel from './Modals/DeleteServiceModel';
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
import CharacterFilter from "../../Components/Filters/CharacterFilter"
import NumericFilter from '../../Components/Filters/NumericFilter';
import EditService from './Modals/EditService';
import Draggable from 'react-draggable';
import ActiveFilter from "../../assets/active_filter.png"

const Service = () => {

    const menuRef = useRef();
    // we have the module here
    const [pageLoading, setPageLoading] = useState(false);
    const [existingService, setExistingService] = useState([]);
    const [currentPages, setCurrentPages] = useState(15);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [downloadModal, setDownloadModal] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [isSearchOn, setIsSearchOn] = useState(false);
    const [allCountry, setAllCountry] = useState([]);
    const [allState, setAllState] = useState([]);
    const [allCity, setAllCity] = useState([]);
    const [allCategory, setAllCategory] = useState([]);
    const [allUsername, setAllUsername] = useState([]);
    const [allRoles, setAllRoles] = useState([]);
    const [allEntities, setAllEntites] = useState([]);
    const [allLOB, setAllLOB] = useState([]);
    const [currCountry, setCurrCountry] = useState(-1);
    const [isServiceDialogue, setIsServiceDialogue] = useState(false);
    const [isEditDialogue, setIsEditDialogue] = React.useState(false);
    const [currItem, setCurrItem] = useState({});
    const [showAddSuccess, setShowAddSuccess] = useState(false);
    const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
    const [openAddConfirmation, setOpenAddConfirmation] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isFailureModal, setIsFailureModal] = useState(false)
    const [deleteConfirmation, showDeleteConfirmation] = useState(false);

    const [lobNameFilter, setLobNameFilter] = useState(false)
    const [lobNameFilterInput, setLobNameFilterInput] = useState("");
    const [serviceFilter, setServiceFilter] = useState(false)
    const [serviceFilterInput, setServiceFilterInput] = useState("");
    const [idFilter, setIdFilter] = useState(false)
    const [idFilterInput, setIdFilterInput] = useState("");
    // const [filterArray,setFilterArray] = useState([]);

    const fetchLobData = async () => {
        setPageLoading(true);
        const data = {
            "user_id": 1234,
            "rows": ["id", "name"],
            "filters": [],
            "sort_by": ["name"],
            "order": "asc",
            "pg_no": 0,
            "pg_size": 0
        };
        const response = await APIService.getLob(data);
        const result = (await response.json());
        console.log(result.data);

        if (Array.isArray(result.data)) {
            setAllLOB(result.data);
        }
    }

    const [typeOfOrganization, setTypeOfOrganization] = useState([
        {
            id: 1,
            type: "Proprietorship"
        },
        {
            id: 2,
            type: "Trust"
        },
        {
            id: 3,
            type: "PVT. Ltd Company"
        },
        {
            id: 4,
            type: "Pub. Ltd Company"
        },
        {
            id: 5,
            type: "Partnership"
        },
    ])

    const getVendorCategoryAdmin = async () => {
        const data = {
            "user_id": 1234,
            "order": "asc"
        }
        const response = await APIService.getVendorCategoryAdmin(data);
        const res = await response.json()
        console.log(res.data);
        setAllCategory(res.data)
    }

    const fetchRoleData = async () => {
        setPageLoading(true);
        // const data = { "user_id":  1234 };
        const data = { "user_id": 1234 };
        const response = await APIService.getRoles(data)
        const result = (await response.json());
        console.log(result.data);

        if (Array.isArray(result.data)) {
            setAllRoles(result.data);
        }
    }

    const [sortField, setSortField] = useState("id")
    const [flag, setFlag] = useState(false)
    const fetchData = async () => {
        console.log('ugm')
        // we need to query thru the object
        const tempArray = [];
        // we need to query thru the object
        Object.keys(filterMapState).forEach(key => {
            if (filterMapState[key].filterType != "") {
                if (filterMapState[key].filterData == 'Numeric') {
                    tempArray.push([
                        key,
                        filterMapState[key].filterType,
                        Number(filterMapState[key].filterValue),
                        filterMapState[key].filterData,
                    ]);
                } else {
                    tempArray.push([key, filterMapState[key].filterType, filterMapState[key].filterValue, filterMapState[key].filterData]);
                }

            }
        })
        setFilterState(tempArray)
        setPageLoading(true);
        const data = {
            "user_id": 1234,
            "rows": ["*"],
            "filters": tempArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": Number(currentPage),
            "pg_size": Number(currentPages),
            "search_key": searchInput
        };
        const response = await APIService.getService(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingService(result);
        setPageLoading(false);
    }
    const fetchPageData = async (pageNumber) => {
        setPageLoading(true);

        // we need to query thru the object
        setCurrentPage((prev) => pageNumber)
        const data = {
            "user_id": 1234,
            "rows": ["*"],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": Number(pageNumber),
            "pg_size": Number(currentPages),
            "search_key": searchInput
        };
        const response = await APIService.getService(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingService(result);
        setPageLoading(false);
    }
    const fetchQuantityData = async (quantity) => {
        setPageLoading(true);
        setCurrentPage((prev) => 1)
        console.log(searchInput);
        const data = {
            "user_id": 1234,
            "rows": ["*"],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(quantity),
            "search_key": searchInput
        };
        const response = await APIService.getService(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingService(result);
        setPageLoading(false);
    }
    useEffect(() => {
        fetchData();
        fetchLobData();
        fetchCityData('Maharashtra')
        fetchTallyLedgerData();
        getVendorCategoryAdmin();
        fetchRoleData();
        const handler = (e) => {
            if (menuRef.current == null || !menuRef.current.contains(e.target)) {
                setLobNameFilter(false)
                setServiceFilter(false)
                setIdFilter(false)
            }
        }

        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);
    const [editId, setEditId] = useState(0);
    const handleEdit = (id) => {
        setEditId((prev) => id)
        setIsEditDialogue(true)
    }
    const handleOpenEdit = (oldItem) => {
        console.log('called');
        setIsEditDialogue(true);
        setCurrItem(oldItem)
    };

    const handleOpen = () => {
        setIsServiceDialogue(true);
    };

    const handleClose = () => {
        initials();
        setIsServiceDialogue(false);
        openAddCancelModal();
    }
    const initials = () => {
        setFormValues(initialValues);
        setFormErrors({});
    }
    const handleAddService = () => {
        console.log(formValues)
        if (!validate()) {
            console.log('hu')
            return;
        }
        setIsServiceDialogue(false);
        setOpenAddConfirmation(true);

    }
    const addService = async () => {
        const data = {
            "user_id": 1234,
            "lob": Number(formValues.lob),
            "service": formValues.serviceName,
            "active": true,
            "servicetype": "New service",
            "category2": "Category",
            "tallyledgerid": 28
        }
        const response = await APIService.addService(data);

        const result = (await response.json())

        setOpenAddConfirmation(false);
        console.log(result)
        setIsServiceDialogue(false);
        if (result.result == "success") {
            setFormValues(initialValues);
            openAddSuccess();
        } else {
            openFailureModal();
            setErrorMessage(result.message)
        }

        console.log(data);
        console.log(result);
    }

    const initialValues = {
        lob: null,
        serviceName: null,

    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [showEditSuccess, setShowEditSuccess] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };


    // validate form and to throw Error message
    const validate = () => {
        var res = true;

        if (!formValues.serviceName) {
            setFormErrors((existing) => {
                return { ...existing, serviceName: "Enter Service Name" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, serviceName: "" }
            })
        }
        if (!formValues.lob) {
            setFormErrors((existing) => {
                return { ...existing, lob: "Enter LOB" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, lob: "" }
            })
        }

        return res;
    }
    const [currId, setCurrId] = useState("");
    const [currName, setCurrName] = useState("");
    const handleDelete = (id, name) => {
        setCurrId(id);
        setCurrName(name);
        showDeleteConfirmation(true);
    }
    const deleteUser = async (id) => {
        const data = {
            "user_id": 1234,
            "id": id
        }
        const response = await APIService.deleteService(data);
        showDeleteConfirmation(false);
        openDeleteSuccess();
    }
    const handlePageChange = (event, value) => {
        console.log(value);
        setCurrentPage(value)
        fetchPageData(value);
    }
    const handleRefresh = () => {
        fetchData();
    }
    const openDownload = () => {
        setDownloadModal(true);
    }
    const closeDownload = () => {
        setDownloadModal(false);
    }
    const [backDropLoading, setBackDropLoading] = useState(false)
    const handleDownload = async (type) => {
        setPageLoading(true)
        setBackDropLoading(true)
        const data = {
            "user_id": 1234,
            "rows": [
                "lob",
                "service",
                "id"
            ],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 0,
            "pg_size": 0,
            "search_key": searchInput,
            "downloadType": type,
            "colmap" : {
                "lob" : "LOB Name",
                "service" : "Service",
                "id" : "ID"
            }
        };
        const response = await APIService.getService(data)
        const temp = await response.json();
        const result = temp.data;
        console.log(temp)
        if (temp.result == 'success') {
            const d = {
                "filename": temp.filename,
                "user_id": 1234
            }
            fetch(`http://20.197.13.140:8000/download/${temp.filename}`, {
                method: 'POST', // or the appropriate HTTP method
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(d) // Convert the object to a JSON string
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.blob();
                })
                .then(result => {
                    if (type == "excel") {
                        FileSaver.saveAs(result, 'ServiceData.xlsx');
                    } else if (type == "pdf") {
                        FileSaver.saveAs(result, 'ServiceData.pdf');
                    }
                    console.log('Success:', result);
                })
                .catch(error => {
                    console.error('Error:', error);
                });

            setTimeout(() => {
                setPageLoading(false)
                setBackDropLoading(false)
            }, 1000)
        }
    }
    const handleSearch = async () => {
        // console.log("clicked")
        setPageLoading(true);
        setIsSearchOn(true);
        setCurrentPage((prev) => 1);
        const data = {
            "user_id": 1234,
            "rows": [
                "*"
            ],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": searchInput
        };
        const response = await APIService.getService(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingService(result);
        setPageLoading(false);
    }
    const handleCloseSearch = async () => {
        setIsSearchOn(false);
        setPageLoading(true);
        setSearchInput("");
        setCurrentPage(1);
        const data = {
            "user_id": 1234,
            "rows": [
                "*"
            ],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": ""
        };
        const response = await APIService.getService(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingService(result);
        setPageLoading(false);
    }
    const openAddSuccess = () => {
        // (false);
        setShowAddSuccess(true);
        setTimeout(function () {
            setShowAddSuccess(false);
        }, 2000)
        fetchData();
    }
    const openFailureModal = () => {
        setIsFailureModal(true);
        setTimeout(function () {
            setIsFailureModal(false);
        }, 2000)
        fetchData();
    }
    const openDeleteSuccess = () => {
        setShowDeleteSuccess(true);
        setTimeout(function () {
            setShowDeleteSuccess(false);
        }, 2000)
        fetchData();
    }
    const openEditSuccess = () => {
        setIsEditDialogue(false);
        setShowEditSuccess(true);
        setTimeout(function () {
            setShowEditSuccess(false);
        }, 2000)
        fetchData();
    }

    const [showCancelModelAdd, setShowCancelModelAdd] = useState(false);
    const [showCancelModel, setShowCancelModel] = useState(false);
    const openAddCancelModal = () => {
        // set the state for true for some time
        setIsServiceDialogue(false);
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

    const filterMapping = {
        lob: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        service: {
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
    const [filterState, setFilterState] = useState([]);
    const fetchFiltered = async (mapState) => {
        setFilterMapState(mapState)
        const tempArray = [];
        setLobNameFilter(false)
        setServiceFilter(false)
        setIdFilter(false)
        // we need to query thru the object
        // console.log(filterMapState);
        console.log(filterMapState)
        Object.keys(mapState).forEach(key => {
            if (mapState[key].filterType != "") {
                tempArray.push([key, mapState[key].filterType, mapState[key].filterValue, mapState[key].filterData]);
            }
        })
        setCurrentPage(() => 1)

        setFilterState(tempArray)
        setPageLoading(true);
        const data = {
            "user_id": 1234,
            "rows": [
                "*"
            ],
            "filters": tempArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": isSearchOn ? searchInput : ""
        };
        const response = await APIService.getService(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingService(result);
        setPageLoading(false);
    }
    const newHandleFilter = async (inputVariable, setInputVariable, type, columnName) => {
        console.log(columnName)
        console.log('hey')
        console.log(filterMapState);



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
    const handleSort = async (field) => {
        setPageLoading(true);
        // we need to query thru the object
        setSortField(field)
        setFlag((prev) => !prev);
        const data = {
            "user_id": 1234,
            "rows": [
                "*"
            ],
            "filters": filterState,
            "sort_by": [field],
            "order": !flag ? "asc" : "desc",
            "pg_no": Number(currentPage),
            "pg_size": Number(currentPages),
            "search_key": isSearchOn ? searchInput : ""
        };
        // setFlag((prev) => !prev);
        const response = await APIService.getService(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingService(result);
        setPageLoading(false);
    }


    //    const [allCity,setAllCity] = useState([]);
    // we need to fetch the city data
    const fetchCityData = async (id) => {
        const data = { "user_id": 1234, "state_name": id };
        const response = await APIService.getCities(data);
        const result = (await response.json()).data;
        console.log(result);
        if (Array.isArray(result)) {
            setAllCity(result)
            // if (result.length > 0) {
            //     // setFormValues((existing) => {
            //     //     const newData = { ...existing, city: result[0].id }
            //     //     return newData;
            //     // })
            // }
        }
    }
    const [tallyLedgerData, setTallyLedgerData] = useState([])
    const fetchTallyLedgerData = async () => {
        const data = {
            "user_id": 1234
        }
        const response = await APIService.getTallyLedgerAdmin(data);
        const res = await response.json()
        console.log(res);
        setTallyLedgerData(res.data)
    }

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
    // fetching utility routes end here
    return (
        <div className='h-screen font-medium'>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={pageLoading}
                onClick={() => { }}
            >

                <CircularProgress color="inherit" />

            </Backdrop>
            <Navbar />
            {isEditDialogue && <EditService handleClose={() => setIsEditDialogue(false)} currService={editId} allLOB={allLOB} showSuccess={openEditSuccess} showCancel={openCancelModal} />}
            {showAddSuccess && <SucessfullModal isOpen={showAddSuccess} message="New Service created succesfully" />}
            {showDeleteSuccess && <SucessfullModal isOpen={showDeleteSuccess} message="Service deleted succesfully" />}
            {showEditSuccess && <SucessfullModal isOpen={showEditSuccess} message="Changes saved successfully" />}
            {openAddConfirmation && <SaveConfirmationService handleClose={() => setOpenAddConfirmation(false)} currName={formValues.serviceName} add={addService} showCancel={openAddCancelModal} setDefault={initials} />}
            {isFailureModal && <FailureModal isOpen={isFailureModal} message={errorMessage} />}
            {deleteConfirmation && <DeleteServiceModel handleClose={() => showDeleteConfirmation(false)} handleDelete={deleteUser} item={currId} showCancel={openCancelModal} name={currName} />}
            {showCancelModelAdd && <CancelModel isOpen={showCancelModelAdd} message="Process cancelled, no new service created." />}
            {showCancelModel && <CancelModel isOpen={showCancelModel} message="Process cancelled, no changes saved." />}
            <div className='h-[calc(100vh_-_7rem)] w-full  px-10'>
                <div className='h-16 w-full  flex justify-between items-center p-2  border-gray-300 border-b-2'>
                    <div className='flex items-center space-x-3'>
                        <div className='rounded-2xl  bg-[#EBEBEB] h-8 w-8 flex justify-center items-center '>
                            <Link to="/dashboard"><img className='w-5 h-5' src={backLink} /></Link>
                        </div>

                        <div className='flex-col'>
                            <h1 className='text-lg'>Service</h1>
                            <p className='text-sm'>Admin &gt; Service</p>
                        </div>
                    </div>
                    <div className='flex space-x-2 items-center'>

                        <div className='flex bg-[#EBEBEB]'>
                            {/* search button */}
                            <input
                                className="h-9 w-48 bg-[#EBEBEB] text-[#787878] pl-3 outline-none"
                                type="text"
                                placeholder="  Search"
                                value={searchInput}
                                onChange={(e) => {
                                    setSearchInput(e.target.value);
                                }}
                                onKeyDownCapture={handleKeyDown}
                            />
                            <button onClick={handleCloseSearch}><img src={Cross} className='w-5 h-5 mx-2' /></button>
                            <div className="h-9 w-10 bg-[#004DD7] flex items-center justify-center rounded-r-lg">
                                <button onClick={handleSearch}><img className="h-6" src={searchIcon} alt="search-icon" /></button>
                            </div>
                        </div>
                        <div>
                            {/* button */}
                            <button className="bg-[#004DD7] text-white h-9 w-72 rounded-lg" onClick={handleOpen}>
                                <div className="flex items-center justify-center gap-4">
                                    Add Service
                                    <img className='h-4 w-4' src={Add} alt="add" />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                {/* filter component */}
                <div className='h-12 w-full bg-white'>
                    <div className='w-full h-12 bg-white flex justify-between'>
                        <div className="w-[70%] flex">
                            <div className='w-[6%] flex'>
                                <div className='p-3'>
                                    {/* <p>Sr.</p> */}
                                </div>
                            </div>
                            <div className='w-[47%]  px-3 py-2.5'>
                                <div className="w-[30%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[75%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={lobNameFilterInput} onChange={(e) => setLobNameFilterInput(e.target.value)}

                                        onKeyDown={(event) => handleEnterToFilter(event, lobNameFilterInput,
                                            setLobNameFilterInput,
                                            'contains',
                                            'lob')}
                                    />
                                    {filterMapState.lob.filterType == "" ? <button className='w-[30%] px-1 py-2' onClick={() => setLobNameFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> : <button className='w-[30%] px-1 py-2' onClick={() => setLobNameFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>}
                                </div>
                                {lobNameFilter && <CharacterFilter inputVariable={lobNameFilterInput} setInputVariable={setLobNameFilterInput} handleFilter={newHandleFilter} filterColumn='lob' menuRef={menuRef} filterType={filterMapState.lob.filterType} />}
                            </div>

                            <div className='w-[47%]  px-3 py-2.5 mx-[-2px]'>
                                <div className="w-[30%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[75%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={serviceFilterInput} onChange={(e) => setServiceFilterInput(e.target.value)}

                                        onKeyDown={(event) => handleEnterToFilter(event, serviceFilterInput,
                                            setServiceFilterInput,
                                            'contains',
                                            'service')}
                                    />
                                    {filterMapState.service.filterType == "" ? <button className='w-[30%] px-1 py-2' onClick={() => setServiceFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> : <button className='w-[30%] px-1 py-2' onClick={() => setServiceFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>}
                                </div>
                                {serviceFilter && <CharacterFilter inputVariable={serviceFilterInput} setInputVariable={setServiceFilterInput} filterColumn='service' handleFilter={newHandleFilter} menuRef={menuRef} filterType={filterMapState.service.filterType} />}
                            </div>
                        </div>
                        <div className="w-[30%] flex">
                            <div className='w-[75%] px-3 py-2.5 mx-[-3px]'>
                                <div className="w-[40%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-[70%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" value={idFilterInput} onChange={(e) => setIdFilterInput(e.target.value)}

                                        onKeyDown={(event) => handleEnterToFilter(event, idFilterInput,
                                            setIdFilterInput,
                                            'equalTo',
                                            'id')}

                                    />
                                    {filterMapState.id.filterType == "" ? <button className='w-[30%] px-1 py-2' onClick={() => setIdFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> : <button className='w-[30%] px-1 py-2' onClick={() => setIdFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>}
                                </div>
                                {idFilter && <NumericFilter columnName='id' inputVariable={idFilterInput} setInputVariable={setIdFilterInput} handleFilter={newHandleFilter} menuRef={menuRef} filterType={filterMapState.id.filterType} />}
                            </div>

                            <div className='w-[35%]  flex'>
                                <div className='p-3'>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='h-[calc(100vh_-_14rem)] w-full text-xs'>
                    <div className='w-full h-12 bg-[#F0F6FF] flex justify-between border-gray-400 border-b-[1px]'>
                        <div className="w-[70%] flex">
                            <div className='w-[6%] flex'>
                                <div className='px-3 py-3.5'>
                                    <p>Sr.</p>
                                </div>
                            </div>
                            <div className='w-[47%]  flex'>
                                <div className='px-3 py-3.5'>
                                    <p>LOB Name <button onClick={() => handleSort('lob')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[47%]  flex'>
                                <div className='px-3 py-3.5'>
                                    <p>Service <button onClick={() => handleSort('service')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                        </div>
                        <div className="w-[30%] flex">
                            <div className='w-[65%] flex'>
                                <div className='px-3 py-3.5'>
                                    <p>ID <button onClick={() => handleSort('id')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[35%]  flex'>
                                <div className='px-3 py-3.5'>
                                    <p>Edit</p>
                                </div>
                            </div>
                        </div>

                    </div>


                    <div className='w-full h-[calc(100vh_-_17rem)] overflow-auto'>
                        {/* we map our items here */}
                        {/* {pageLoading && <div className='ml-5 mt-5'><LinearProgress /></div>} */}
                        {!pageLoading && existingService && existingService.length == 0 && <div className='h-10 border-gray-400 border-b-[1px] flex items-center'>
                            <h1 className='ml-10'>No Records To Show</h1>
                        </div>}
                        {!pageLoading && existingService.map((item, index) => {
                            return <div className='w-full py-1 bg-white flex justify-between items-center border-gray-400 border-b-[1px]'>
                                <div className="w-[70%] flex items-center">
                                    <div className='w-[6%] flex'>
                                        <div className='px-3 overflow-x-hidden'>
                                            <p>{index + 1 + (currentPage - 1) * currentPages}</p>
                                        </div>
                                    </div>
                                    <div className='w-[47%] flex'>
                                        <div className='px-3 overflow-x-hidden'>
                                            <p>{item.lob}</p>
                                        </div>
                                    </div>
                                    <div className='w-[47%]  flex pl-0.5'>
                                        <div className='px-3 overflow-x-hidden'>
                                            <p>{item.service}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[30%] flex items-center ">
                                    <div className='w-[65%]  flex ml-[2px]'>
                                        <div className='px-3 py-2 overflow-x-hidden'>
                                            <p>{item.id}</p>
                                        </div>
                                    </div>
                                    <div className='w-[30%]  flex'>
                                        <div className=' flex ml-4'>
                                            <div className='flex space-x-5'>
                                                <button onClick={() => { handleEdit(item.id) }}> <img className='w-4 h-4 cursor-pointer' src={Edit} alt="edit" /></button>
                                                <button onClick={() => handleDelete(item.id, item.service)}><img className='w-4 h-4 cursor-pointer' src={Trash} alt="trash" /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        })}
                    </div>

                </div>

            </div>


            <div className='w-full h-12 flex justify-between justify-self-end px-6 mt-5 fixed bottom-0 bg-white '>
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

            <Modal open={isServiceDialogue}
                fullWidth={true}
                maxWidth={'md'}
                className='flex justify-center items-center'
            >
                <>
                    <Draggable handle='div.move'>
                        <div className='flex justify-center '>
                            <div className="w-[700px] h-auto bg-white rounded-lg">
                                <div className="move cursor-move">
                                    <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-lg">
                                        <div className="mr-[210px] ml-[210px]">
                                            <div className="text-[16px]">New Service</div>
                                        </div>
                                        <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                                            <button onClick={() => { handleClose() }}>
                                                <img className="w-[20px] h-[20px]" src={Cross} alt="cross" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="h-auto w-full">
                                    <div className="flex gap-[48px] justify-center items-center">
                                        <div className=" space-y-[12px] py-[20px] px-[10px]">
                                            <div className="">
                                                <div className="text-sm">LOB <label className="text-red-500">*</label></div>
                                                <select className="w-[230px] h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs"
                                                    name="lob"
                                                    value={formValues.lob}
                                                    defaultValue="Select lob"
                                                    onChange={e => {
                                                        // fetchCityData(e.target.value);
                                                        console.log(e.target.value);
                                                        setFormValues((existing) => {
                                                            const newData = { ...existing, lob: e.target.value }
                                                            return newData;
                                                        })

                                                    }}
                                                >
                                                    <option value="none" hidden>Select a LOB</option>
                                                    {allLOB && allLOB.map(item => (
                                                        <option value={item.id} >
                                                            {item.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                <div className="text-[9px] text-[#CD0000] absolute">{formErrors.lob}</div>
                                            </div>
                                            <div className="">
                                                <div className="text-[13px]">Service Name <label className="text-red-500">*</label></div>
                                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="serviceName" value={formValues.serviceName} onChange={handleChange} />
                                                <div className="text-[9px] text-[#CD0000] absolute ">{formErrors.serviceName}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="my-2 mt-10 flex justify-center items-center gap-[10px]">
                                    <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' onClick={handleAddService}>Add</button>
                                    <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={() => { handleClose() }}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </Draggable>
                </>
            </Modal>
        </div>
    )
}
export default Service;
