import React from 'react';
import { Outlet, Link, useNavigate } from "react-router-dom";
import backLink from "../../assets/back.png";
import searchIcon from "../../assets/searchIcon.png";
import nextIcon from "../../assets/next.png";
import refreshIcon from "../../assets/refresh.png";
import downloadIcon from "../../assets/download.png";
import Backdrop from '@mui/material/Backdrop';
import { useState, useEffect, useRef } from 'react';
import Navbar from "../../Components/Navabar/Navbar";
import Cross from "../../assets/cross.png";
import Edit from "../../assets/edit.png";
import Trash from "../../assets/trash.png";
import Add from "./../../assets/add.png";
import { Modal, CircularProgress, LinearProgress, Pagination } from "@mui/material";
import * as XLSX from 'xlsx';
import FileSaver, { saveAs } from 'file-saver';
import { APIService } from '../../services/API';
import Filter from "../../assets/filter.png"
import Pdf from "../../assets/pdf.png";
import Excel from "../../assets/excel.png"
import EditLocalityModal from './Modals/EditLocalityModal';
import SucessfullModal from '../../Components/modals/SucessfullModal';
import DeleteLocalityModal from './Modals/DeleteLocalityModal';
import FailureModal from '../../Components/modals/FailureModal';
import CancelModel from './../../Components/modals/CancelModel';
import SaveConfirmationLocality from './Modals/SaveConfirmationLocality';
import CharacterFilter from '../../Components/Filters/CharacterFilter';
import NumericFilter from '../../Components/Filters/NumericFilter';
import Draggable from 'react-draggable';
import ActiveFilter from "../../assets/active_filter.png"
const env_URL_SERVER = import.meta.env.VITE_ENV_URL_SERVER
const Locality = () => {
    const menuRef = useRef();
    const navigate = useNavigate()
    const [existingLocalities, setExistingLocalities] = useState([]);
    const [currentPages, setCurrentPages] = useState(15);
    const [currentPage, setCurrentPage] = useState(1);
    const [addConfirmation, setAddConfirmation] = useState(false)
    const [pageLoading, setPageLoading] = useState(false);
    const [totalItems, setTotalItems] = useState(0);
    const [downloadModal, setDownloadModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [lobError, setLobError] = useState("");
    const [currItem, setCurrItem] = useState({});
    const [allCountry, setAllCountry] = useState([]);
    const [allState, setAllState] = useState([]);
    const [allCity, setAllCity] = useState([]);
    const [currCountry, setCurrCountry] = useState(-1);
    const [isSearchOn, setIsSearchOn] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showEditSuccess, setShowEditSuccess] = useState(false);
    const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
    const [failureModal, setFailureModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [filterArray, setFilterArray] = useState([["country", "contains", ""], ["state", "contains", ""], ["city", "contains", ""], ["locality", "contains", ""]]);


    const [sortField, setSortField] = useState("id");
    const initialValues = {
        country: 5,
        state: "Maharashtra",
        city: 847,
        locality: ""
    }
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({
        country: "",
        state: "",
        city: "",
        locality: ""
    });
    const validate = () => {
        var res = true;
        if (!formValues.country) {
            setFormErrors((existing) => {
                return { ...existing, country: "Select a Country" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, country: "" }
            })
        }
        if (!formValues.state) {
            setFormErrors((existing) => {
                return { ...existing, state: "Select a State" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, state: "" }
            })
        }
        if (!formValues.city) {
            setFormErrors((existing) => {
                return { ...existing, city: "Select a City" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, city: "" }
            })
        }
        if (!formValues.locality) {
            setFormErrors((existing) => {
                return { ...existing, locality: "Enter a Locality" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, locality: "" }
            })
        }
        return res;
    }
    const fetchCountryData = async () => {
        setPageLoading(true);
        // const data = { "user_id":  1234 };
        const data = { "user_id": 1234, "rows": ["id", "name"], "filters": [], "sort_by": [], "order": "asc", "pg_no": 0, "pg_size": 0 };
        const response = await APIService.getCountries(data)
        const result = (await response.json()).data;
        // console.log(result.data);

        setAllCountry(result)
        // if (Array.isArray(result.data)) {
        //     setAllCountry(result.data);
        // }
    }
    const fetchStateData = async (id) => {
        console.log(id);
        const data = { "user_id": 1234, "country_id": id };
        // const data = {"user_id":1234,"rows":["id","state"],"filters":[],"sort_by":[],"order":"asc","pg_no":0,"pg_size":0};
        const response = await APIService.getState(data);
        const result = (await response.json()).data;
        console.log(result)
        if (Array.isArray(result)) {
            setAllState(result)
        }
    }
    const fetchCityData = async (id) => {
        const data = { "user_id": 1234, "state_name": id };
        const response = await APIService.getCities(data);
        const result = (await response.json()).data;
        console.log(result);
        if (Array.isArray(result)) {
            setAllCity(result)
        }
    }
    useEffect(() => {
        initials();
        fetchData();
        fetchCountryData();
        fetchStateData(5);
        fetchCityData("Maharashtra")
        const handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setCountryFilter(false);
                setStateFilter(false);
                setCityFilter(false)
                setLocalityFilter(false)
                setIdFilter(false)
            }

        }

        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);
    const fetchPageData = async (pageNumber) => {
        setPageLoading(true);
        const tempArray = [];
        // we need to query thru the object
        Object.keys(filterMapState).forEach(key => {
            if (filterMapState[key].filterType != "") {
                tempArray.push([key, filterMapState[key].filterType, filterMapState[key].filterValue, filterMapState[key].filterData]);
            }
        })
        console.log(tempArray)
        setCurrentPage(pageNumber);
        const data = {
            "user_id": 1234,
            "rows": ["id", "country", "cityid", "city", "state", "locality"],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": Number(pageNumber),
            "pg_size": Number(currentPages),
            "search_key": isSearchOn ? searchQuery : ""
        };
        const response = await APIService.getLocality(data)
        const temp = await response.json();
        const result = temp.data;
        const t = temp.total_count;
        setTotalItems(t);
        setExistingLocalities(result);
        setPageLoading(false);
    }
    const fetchQuantityData = async (number) => {
        setPageLoading(true);
        const tempArray = [];
        setCurrentPage((prev) => 1);
        // we need to query thru the object
        Object.keys(filterMapState).forEach(key => {
            if (filterMapState[key].filterType != "") {
                tempArray.push([key, filterMapState[key].filterType, filterMapState[key].filterValue, filterMapState[key].filterData]);
            }
        })
        console.log(tempArray)
        const data = {
            "user_id": 1234,
            "rows": ["id", "country", "cityid", "city", "state", "locality"],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(number),
            "search_key": isSearchOn ? searchQuery : ""
        };
        const response = await APIService.getLocality(data)
        const temp = await response.json();
        const result = temp.data;
        if (number == 25) console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingLocalities(result);
        setPageLoading(false);
    }
    const fetchData = async () => {
        setPageLoading(true);
        const tempArray = [];
        // we need to query thru the object
        console.log(filterMapState);
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
                    tempArray.push([
                        key,
                        filterMapState[key].filterType,
                        filterMapState[key].filterValue,
                        filterMapState[key].filterData,
                    ]);
                }

            }
        })
        setFilterState(tempArray)

        console.log('here is the call')
        console.log(tempArray)
        const data = {
            "user_id": 1234,
            "rows": ["id", "country", "cityid", "city", "state", "locality"],
            "filters": tempArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": Number(currentPage),
            "pg_size": Number(currentPages),
            "search_key": isSearchOn ? searchQuery : ""
        };
        console.log(data);
        const response = await APIService.getLocality(data)
        const temp = await response.json();
        const result = temp.data;
        const t = temp.total_count;
        setTotalItems(t);
        console.log(t);
        console.log(result);
        setExistingLocalities(result);
        setPageLoading(false);
    }
    const handleSort = async (field) => {
        setPageLoading(true);
        const tempArray = [];
        // we need to query thru the object
        Object.keys(filterMapState).forEach(key => {
            if (filterMapState[key].filterType != "") {
                tempArray.push([key, filterMapState[key].filterType, filterMapState[key].filterValue, filterMapState[key].filterData]);
            }
        })
        console.log(tempArray)
        setSortField(field);
        const data = {
            "user_id": 1234,
            "rows": ["id", "country", "cityid", "city", "state", "locality"],
            "filters": filterState,
            "sort_by": [field],
            "order": !flag ? "asc" : "desc",
            "pg_no": Number(currentPage),
            "pg_size": Number(currentPages),
            "search_key": isSearchOn ? searchQuery : ""
        };
        const response = await APIService.getLocality(data)
        const temp = await response.json();
        const result = temp.data;
        const t = temp.total_count;
        setTotalItems(t);
        console.log(result);
        setExistingLocalities(result);
        setPageLoading(false);
        setFlag((prev) => {
            return !prev;
        })

    }
    const handleAddLocality = () => {
        if (!validate()) {
            return;
        }
        setIsLocalityDialogue(false);
        setAddConfirmation(true);

    }
    const addLocality = async () => {
        const data = {
            "user_id": 1234,
            "cityid": formValues.city,
            "locality": formValues.locality
        }
        console.log(data);
        const response = await APIService.addLocality(data);
        const res = await response.json();
        setAddConfirmation(false)

        


        if (res.result == "success") {
            setFormValues(initialValues);
            openSuccess();
        } else {
            setErrorMessage(res.message)
            openFailure();
        }

        fetchData();
    }
    const openSuccess = () => {
        setShowSuccess(true);
        setTimeout(function () {
            setShowSuccess(false);
        }, 2000)
    }
    const [showCancelModelAdd, setShowCancelModelAdd] = useState(false);
    const [showCancelModel, setShowCancelModel] = useState(false);
    const openFailure = () => {
        setFailureModal(true);
        setTimeout(function () {
            setFailureModal(false);
        }, 2000)
    }
    const openAddCancelModal = () => {
        // set the state for true for some time
        setIsLocalityDialogue(false);
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
    const openEditSuccess = () => {
        setEditModal(false);
        setShowEditSuccess(true);
        setTimeout(function () {
            setShowEditSuccess(false);
        }, 2000)
        fetchData();
    }
    const [isLocalityDialogue, setIsLocalityDialogue] = React.useState(false);
    const handleOpen = () => {
        setIsLocalityDialogue(true);
    };
    const handleClose = () => {
        initials();
        setIsLocalityDialogue(false);
        openAddCancelModal();
    }
    const initials = () => {
        setFormValues(initialValues);
        fetchStateData(5)
        fetchCityData("Maharashtra")
        setFormErrors({});
    }
    const [backDropLoading,setBackDropLoading] = useState(false)
    const handleDownload = async (type) => {
        setDownloadModal(false)
        setPageLoading(true)
        setBackDropLoading(true)
        const data = {
            "user_id": 1234,
            "rows": ["country", "state", "city", "locality", "id"],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 0,
            "pg_size": 0,
            "search_key": searchQuery,
            "downloadType" : type,
            "colmap" : {
                "country" : "Country",
                "state" : "State",
                "city" : "City",
                "locality" : "Locality",
                "id" : "ID"
            }
        };
        const response = await APIService.getLocality(data)
        const temp = await response.json();
        const result = temp.data;
        console.log(temp)
        if(temp.result == 'success') {
            const d = {
                "filename" : temp.filename,
                "user_id" : 1234
            }
            fetch(`${env_URL_SERVER}/download/${temp.filename}`, {
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
                if(type == "excel") {
                    FileSaver.saveAs(result, 'localityData.xlsx');
                }else if(type == "pdf") {
                    FileSaver.saveAs(result, 'localityData.pdf');
                }
               
                console.log('Success:', result);
            })
            .catch(error => {
                console.error('Error:', error);
            });
            
            setTimeout(() => {
                setBackDropLoading(false)
                setPageLoading(false)
            },1000) 
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
        setIsSearchOn(true);
        setSortField("id");
        setCurrentPage((prev) => 1)
        const data = {
            "user_id": 1234,
            "rows": ["id", "country", "cityid", "city", "state", "locality"],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": searchQuery
        };
        const response = await APIService.getLocality(data)
        const temp = await response.json();
        const result = temp.data;
        const t = temp.total_count;
        setTotalItems(t);
        console.log(t);
        setExistingLocalities(result);
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
        setCurrItem(oldItem);
    }
    const handleCloseSearch = async () => {
        setPageLoading(true);
        setSearchQuery("");
        setIsSearchOn(false);
        setCurrentPage((prev) => 1)
        const data = {
            "user_id": 1234,
            "rows": ["id", "country", "cityid", "city", "state", "locality"],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": searchQuery
        };
        const response = await APIService.getLocality(data)
        const temp = await response.json();
        const result = temp.data;
        const t = temp.total_count;
        setTotalItems(t);
        console.log(t);
        setExistingLocalities(result);
        setPageLoading(false);
    }
    const deleteLocality = async (id) => {
        const data = {
            "user_id": 1234,
            "id": Number(id)
        };
        const response = await APIService.deleteLocality(data);
        setShowDeleteModal(false);
        openDeleteSuccess();
        fetchData();
    }
    const openDeleteSuccess = () => {
        setShowDeleteSuccess(true);
        setTimeout(function () {
            setShowDeleteSuccess(false);
        }, 2000)
        fetchData();
    }
    const [countryFilter, setCountryFilter] = useState(false);
    const [countryFilterInput, setCountryFilterInput] = useState("");
    const [countryFilterType, setCountryFilterType] = useState("");
    const [stateFilter, setStateFilter] = useState(false);
    const [stateFilterInput, setStateFilterInput] = useState("");
    const [stateFilterType, setStateFilterType] = useState("");
    const [cityFilter, setCityFilter] = useState(false);
    const [cityFilterInput, setCityFilterInput] = useState("");
    const [cityFilterType, setCityFilterType] = useState("");
    const [localityFilter, setLocalityFilter] = useState(false);
    const [localityFilterInput, setLocalityFilterInput] = useState("");
    const [localityFilterType, setLocalityFilterType] = useState("");
    const [idFilter, setIdFilter] = useState(false)
    const [idFilterInput, setidFilterInput] = useState("");

    const filterMapping = {
        country: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        state: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        city: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        locality: {
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

        if (type == 'noFilter' || type == 'isNull' || type == "isNotNull") setInputVariable("");


        fetchFiltered(existing);
    }
    const [filterState, setFilterState] = useState([]);
    const fetchFiltered = async (mapState) => {
        setPageLoading(true);
        const tempArray = [];
        setCountryFilter(false);
        setStateFilter(false);
        setCityFilter(false)
        setLocalityFilter(false)
        setIdFilter(false)
        // we need to query thru the object
        // console.log(filterMapState);
        console.log(filterMapState)
        Object.keys(mapState).forEach(key => {
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
        })
        setFilterMapState((prev) => mapState)
        setFilterState(tempArray)
        console.log('this is getting called')
        console.log(tempArray)
        setCurrentPage(1);
        const data = {
            "user_id": 1234,
            "rows": ["id", "country", "cityid", "city", "state", "locality"],
            "filters": tempArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": searchQuery
        };
        const response = await APIService.getLocality(data)
        const temp = await response.json();
        const result = temp.data;
        const t = temp.total_count;
        setTotalItems(t);
        setExistingLocalities(result);
        setPageLoading(false);
    }

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const handleDelete = (item) => {
        setCurrItem(item)
        setShowDeleteModal(true);

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
                // fetchCityData()
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
        <div className='h-screen font-medium'>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={pageLoading}
                onClick={() => {}}
            >

               <CircularProgress color="inherit"/>

            </Backdrop>
            <Navbar />

            {editModal && <EditLocalityModal isOpen={editModal} handleClose={() => setEditModal(false)} item={currItem} fetchData={fetchData} openPrompt={openEditSuccess} showCancel={openCancelModal} />}
            {showSuccess && <SucessfullModal isOpen={showSuccess} handleClose={() => setShowSuccess(false)} message="New Locality added successfully" />}
            {showCancelModelAdd && <CancelModel isOpen={showCancelModelAdd} message="Process cancelled, no new Locality added." />}
            {showCancelModel && <CancelModel isOpen={showCancelModel} message="Process cancelled, no changes saved." />}
            {failureModal && <FailureModal isOpen={failureModal} message={errorMessage} />}
            {showEditSuccess && <SucessfullModal isOpen={showEditSuccess} handleClose={() => setShowEditSuccess(false)} message="Changes saved succesfully" />}
            {showDeleteSuccess && <SucessfullModal isOpen={showDeleteSuccess} handleClose={() => setShowDeleteSuccess(false)} message="Locality Deleted Successfully" />}
            {showDeleteModal && <DeleteLocalityModal isOpen={showDeleteModal} handleDelete={deleteLocality} handleClose={() => setShowDeleteModal(false)} item={currItem} showCancel={openCancelModal} />}
            {addConfirmation && <SaveConfirmationLocality handleClose={() => setAddConfirmation(false)} currentLocality={formValues.locality} addLocality={addLocality} setDefault={initials} showCancel={openAddCancelModal} />}
            <div className='h-[calc(100vh_-_7rem)] w-full px-7'>
                {/* search component */}
                <div className='h-16 w-full  flex justify-between items-center p-2  border-gray-300 border-b-2'>
                    <div className='flex items-center space-x-3'>
                        <div className='rounded-2xl  bg-[#EBEBEB] h-8 w-8 flex justify-center items-center '>
                            <button onClick={() => navigate(-1)}><img className='h-5 w-5' src={backLink} /></button>
                        </div>

                        <div className='flex-col'>
                            <h1 className='text-[18px]'>Locality</h1>
                            <p className='text-[14px]'>Admin &gt; Localities</p>
                        </div>
                    </div>
                    <div className='flex space-x-2 items-center'>

                        <div className='flex bg-[#EBEBEB]'>
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
                            <button className="bg-[#004DD7] text-white h-[36px] w-[240px] rounded-lg" onClick={handleOpen}>
                                <div className="flex items-center justify-center gap-4">
                                    Add New Locality
                                    <img className='h-[18px] w-[18px]' src={Add} alt="add" />
                                </div>
                            </button>
                        </div>

                    </div>

                </div>

                {/* filter component */}
                <div className='h-12 w-full bg-white flex justify-between'>
                    <div className='w-[85%] flex'>
                        <div className='w-[5%] p-4'>
                            {/* <p>Sr. </p> */}
                        </div>
                        <div className='w-[15%] px-3 py-2.5'>
                            <div className="w-[65%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                <input className="w-[70%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" value={countryFilterInput} onChange={(e) => setCountryFilterInput(e.target.value)}

                                    onKeyDown={(event) => handleEnterToFilter(event, countryFilterInput,
                                        setCountryFilterInput,
                                        'contains',
                                        'country')}

                                />
                                {filterMapState.country.filterType == "" ?  <button className='w-[30%] px-1 py-2' onClick={() => setCountryFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> :  <button className='w-[30%] px-1 py-2' onClick={() => setCountryFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>  }
                                {/* if the filter is active */}

                            </div>
                            {countryFilter && <CharacterFilter inputVariable={countryFilterInput} setInputVariable={setCountryFilterInput} handleFilter={newHandleFilter} filterColumn='country' menuRef={menuRef} filterType={filterMapState.country.filterType}/>}
                        </div>
                        <div className='w-[20%] px-3 py-2.5 ml-1'>
                            <div className="w-[50%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                <input className="w-[70%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" value={stateFilterInput} onChange={(e) => setStateFilterInput(e.target.value)}


                                    onKeyDown={(event) => handleEnterToFilter(event, stateFilterInput,
                                        setStateFilterInput,
                                        'contains',
                                        'state')}
                                />
                                {filterMapState.state.filterType == "" ?  <button className='w-[30%] px-1 py-2' onClick={() => setStateFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> :  <button className='w-[30%] px-1 py-2' onClick={() => setStateFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>  }
                            </div>
                            {stateFilter && <CharacterFilter inputVariable={stateFilterInput} setInputVariable={setStateFilterInput} handleFilter={newHandleFilter} filterColumn='state' menuRef={menuRef} filterType={filterMapState.state.filterType} />}
                        </div>

                        <div className='w-[20%] px-3 py-2.5 ml-1'>
                            <div className="w-[50%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                <input className="w-[70%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" value={cityFilterInput} onChange={(e) => setCityFilterInput(e.target.value)}


                                    onKeyDown={(event) => handleEnterToFilter(event, cityFilterInput,
                                        setCityFilterInput,
                                        'contains',
                                        'city')}

                                />
                                {filterMapState.city.filterType == "" ?  <button className='w-[30%] px-1 py-2' onClick={() => setCityFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> :  <button className='w-[30%] px-1 py-2' onClick={() => setCityFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>  }
                            </div>
                            {cityFilter && <CharacterFilter inputVariable={cityFilterInput} setInputVariable={setCityFilterInput} handleFilter={newHandleFilter} filterColumn='city' menuRef={menuRef} filterType={filterMapState.city.filterType} />}
                        </div>
                        <div className='w-[20%] px-3 py-2.5 ml-[2px]'>
                            <div className="w-[50%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                <input className="w-[70%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" value={localityFilterInput} onChange={(e) => setLocalityFilterInput(e.target.value)}


                                    onKeyDown={(event) => handleEnterToFilter(event, localityFilterInput,
                                        setLocalityFilterInput,
                                        'contains',
                                        'locality')}
                                />
                                {filterMapState.locality.filterType == "" ?  <button className='w-[30%] px-1 py-2' onClick={() => setLocalityFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> :  <button className='w-[30%] px-1 py-2' onClick={() => setLocalityFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>  }
                            </div>
                            {localityFilter && <CharacterFilter inputVariable={localityFilterInput} setInputVariable={setLocalityFilterInput} handleFilter={newHandleFilter} filterColumn='locality' menuRef={menuRef} filterType={filterMapState.locality.filterType} />}
                        </div>
                    </div>
                    <div className='w-1/6 px-3 py-2.5 '>
                        <div className='w-[40%] flex  items-center bg-[#EBEBEB] rounded-[5px] ml-4'>
                            <input className="w-[70%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" value={idFilterInput} onChange={(e) => setidFilterInput(e.target.value)}

                                onKeyDown={(event) => handleEnterToFilter(event, idFilterInput,
                                    setidFilterInput,
                                    'equalTo',
                                    'id')}


                            />
                            {filterMapState.id.filterType == "" ?  <button className='w-[30%] px-1 py-2' onClick={() => setIdFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> :  <button className='w-[30%] px-1 py-2' onClick={() => setIdFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>  }
                        </div>
                        {idFilter && <NumericFilter inputVariable={idFilterInput} setInputVariable={setidFilterInput} handleFilter={newHandleFilter} columnName='id' menuRef={menuRef} filterType={filterMapState.id.filterType} />}
                        <div className='w-1/2 p-4'>
                        </div>
                    </div>
                </div>



                {/* main component */}
                <div className='h-[calc(100vh_-_14rem)] w-full text-[12px]'>
                    {/* clumns names */}
                    <div className='w-full h-12 bg-[#F0F6FF] flex justify-between'>
                        <div className='w-[85%] flex'>
                            <div className='w-[5%] p-4'>
                                <p>Sr. </p>
                            </div>
                            <div className='w-[15%]  p-4'>
                                <p>Country <button onClick={() => handleSort("name")}><span className="font-extrabold">↑↓</span></button></p>
                            </div>
                            <div className='w-[20%]  p-4'>
                                <p>State <button onClick={() => handleSort("state")}><span className="font-extrabold">↑↓</span></button></p>
                            </div>
                            <div className='w-[20%]  p-4'>
                                <p>City <button onClick={() => handleSort("city")}><span className="font-extrabold">↑↓</span></button></p>
                            </div>
                            <div className='w-[25%]  p-4'>
                                <p>Locality <button onClick={() => handleSort("locality")}><span className="font-extrabold">↑↓</span></button></p>
                            </div>
                        </div>
                        <div className='w-[15%] flex'>
                            <div className='w-1/2  p-4 '>
                                <p>ID<button onClick={() => handleSort("id")}>   
                                    <span className="font-extrabold ml-1">↑↓</span></button> 
                                 </p>
                            </div>
                            <div className='w-1/2 0 p-4'>
                                <p>Edit</p>
                            </div>
                        </div>
                    </div>

                    {/* main table */}
                    <div className='w-full h-[calc(100vh_-_17rem)] overflow-auto'>
                        {/* {pageLoading && <LinearProgress />} */}
                        {!pageLoading && existingLocalities && existingLocalities.length == 0 && <div className='h-10 border-gray-400 border-b-[1px] flex items-center'>
                            <h1 className='ml-10'>No Records To Show</h1>
                        </div>}
                        {!pageLoading && existingLocalities.map((item, index) => {
                            return <div className='w-full h-10  flex justify-between items-center border-gray-400 border-b-[1px]'>
                                <div className='w-[85%] flex items-center'>
                                    <div className='w-[5%] p-4'>
                                        <p>{index + 1 + (currentPage - 1) * currentPages}</p>
                                    </div>
                                    <div className='w-[15%]  p-4'>
                                        <p>{item.country}</p>
                                    </div>
                                    <div className='w-[20%]  p-4'>
                                        <p>{item.state}</p>
                                    </div>
                                    <div className='w-[20%]  p-4'>
                                        <p>{item.city}</p>
                                    </div>
                                    <div className='w-[25%]  p-4 ml-1'>
                                        <p>{item.locality}</p>
                                    </div>
                                </div>
                                <div className='w-[15%] flex items-center'>
                                    <div className='w-1/2  p-4 ml-1'>
                                        <p>{item.id}</p>
                                    </div>
                                    <div className='w-1/2 0 p-4 flex justify-between items-center'>
                                        <button onClick={() => handleOpenEdit(item)}><img className='w-5 h-5' src={Edit} alt="edit" /></button>
                                        <button onClick={() => handleDelete(item)}><img className='w-5 h-5' src={Trash} alt="trash" /></button>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
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
            <Modal open={isLocalityDialogue}
                fullWidth={true}
                maxWidth={'md'}
                className='flex justify-center items-center rounded-lg'
            >
                <>
                    <Draggable handle="div.move" >
                        <div className='flex justify-center bg-white rounded-lg'>
                            <div className=" w-[700px] h-auto bg-white rounded-lg ">
                                <div className='move cursor-move'>
                                <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-t-lg">
                                    <div className="mr-[250px] ml-[250px]">
                                        <div className="text-[16px]">Add New Locality</div>
                                    </div>
                                    <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                                        <button onClick={handleClose}><img className="w-[20px] h-[20px]" src={Cross} alt="cross" /></button>
                                    </div>
                                {/* </lol> */}
                                </div>
                                </div>
                                <div className="space-y-10 mb-3">
                                    <div className="h-auto w-full py-4 ">
                                        <div className="flex gap-[48px] justify-center items-center">
                                            <div className=" space-y-[12px] py-[20px] px-[10px]">
                                                <div className="mb-4">
                                                    <div className="text-[14px]">Select Country <label className="text-red-500">*</label></div>
                                                    <select className="w-[230px] border-[1px] border-[#C6C6C6] rounded-sm px-3 py-[2px] text-[11px]"
                                                        name="country"
                                                        value={formValues.country}
                                                        defaultValue="Select Country"
                                                        onChange={e => {

                                                            setCurrCountry(e.target.value);
                                                            fetchStateData(e.target.value);
                                                            setAllCity([]);
                                                            const existing = { ...formValues }
                                                            existing.state = ""
                                                            existing.city = null;
                                                            setFormValues(existing)
                                                            setFormValues((existing) => {
                                                                const newData = { ...existing, country: e.target.value }
                                                                return newData;
                                                            })
                                                        }}
                                                    >
                                                        {/* <option value="none" hidden={true}>Select a Country</option> */}
                                                        {allCountry && allCountry.map(item => {
                                                            return <option value={item.id}>
                                                                 {item.name}
                                                                </option>
                                                            // if (item[1] == 5) {
                                                            //     return <option value={item[0]} selected>
                                                            //         {item[1]}
                                                            //     </option>
                                                            // } else {
                                                            //     return <option value={item[0]}>
                                                            //         {item[1]}
                                                            //     </option>
                                                            // }
                                                        })}
                                                    </select>
                                                    <div className="text-[9px] text-[#CD0000] absolute ">{formErrors.country}</div>
                                                </div>
                                                <div className="mb-4">
                                                    <div className="text-[14px]">Select State <label className="text-red-500">*</label></div>
                                                    <select className="w-[230px] border-[1px] border-[#C6C6C6] rounded-sm px-3 py-[2px] text-[11px]"
                                                        name="state"
                                                        value={formValues.state}
                                                        defaultValue="Select State"
                                                        // defaultValue={formValues.state}
                                                        onChange={e => {
                                                            fetchCityData(e.target.value);
                                                            const existing = { ...formValues }
                                                            existing.state = e.target.value
                                                            existing.city = null
                                                            console.log(existing)
                                                            setFormValues(existing)
                                                        }}
                                                    >
                                                        <option value="" hidden> Select A State</option>
                                                        {allState && allState.map(item => {
                                                            return <option value={item[0]} >
                                                                {item[0]}
                                                            </option>
                                                        })}

                                                    </select>
                                                    <div className="text-[9px] text-[#CD0000] absolute ">{formErrors.state}</div>
                                                </div>
                                                <div className="mb-4">
                                                    <div className="text-[14px]">Select City<label className="text-red-500">*</label></div>
                                                    <select className="w-[230px] border-[1px] border-[#C6C6C6] rounded-sm px-3 py-[2px] text-[11px]"
                                                        name="country"
                                                        value={formValues.city}
                                                        defaultValue="Select City"
                                                        onChange={e => {
                                                            // fetchCityData(e.target.value);
                                                            console.log(e.target.value);
                                                            setFormValues((existing) => {
                                                                const newData = { ...existing, city: e.target.value }
                                                                return newData;
                                                            })

                                                        }}
                                                    >
                                                        <option value="none" hidden={true}>Select a City</option>
                                                        {allCity && allCity.map(item => (
                                                            <option value={item.id} >
                                                                {item.city}
                                                            </option>

                                                        ))}
                                                    </select>
                                                    <div className="text-[9px] text-[#CD0000] absolute ">{formErrors.city}</div>
                                                </div>
                                                <div className="">
                                                    <div className="text-[14px]">Locality Name<label className="text-red-500">*</label></div>
                                                    <input className="w-[230px] h-[22px] border-[1px] border-[#C6C6C6] rounded-sm px-3 py-[2px] text-[11px]" type="text" name="empName" value={formValues.locality} onChange={(e) => {
                                                        setFormValues((existing) => {
                                                            const newData = { ...existing, locality: e.target.value }
                                                            return newData;
                                                        })
                                                    }} />
                                                    <div className="text-[9px] text-[#CD0000] absolute ">{formErrors.locality}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" flex justify-center items-center gap-[10px] ">
                                        <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' type="submit" onClick={handleAddLocality}>Add</button>
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

export default Locality
