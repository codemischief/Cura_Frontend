import React from 'react';
import { Outlet, Link } from "react-router-dom";
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
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
import { APIService } from '../../services/API';
import Filter from "../../assets/filter.png"
import Pdf from "../../assets/pdf.png";
import Excel from "../../assets/excel.png"
import EditLocalityModal from './Modals/EditLocalityModal';
import SucessfullModal from '../../Components/modals/SucessfullModal';
import DeleteLocalityModal from './Modals/DeleteLocalityModal';
import FailureModal from '../../Components/modals/FailureModal';
import SaveConfirmationLocality from './Modals/SaveConfirmationLocality';
const Locality = () => {
    const menuRef = useRef();
    const [existingLocalities, setExistingLocalities] = useState([]);
    const [currentPages, setCurrentPages] = useState(15);
    const [currentPage, setCurrentPage] = useState(1);
    const [addConfirmation,setAddConfirmation] = useState(false)
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
    const [failureModal,setFailureModal] = useState(false);
    const [errorMessage,setErrorMessage] = useState("");
    const [filterArray, setFilterArray] = useState([["country", "contains", ""], ["state", "contains", ""], ["city", "contains", ""], ["locality", "contains", ""]]);
    const filterMapping = {
        country : {
            filterType : "",
            filterValue : "",
            filterData : "String"
        },
        state : {
            filterType : "",
            filterValue : "",
            filterData : "String"
        },
        city : {
            filterType : "",
            filterValue : "",
            filterData : "String"
        },
        locality : {
            filterType : "",
            filterValue : "",
            filterData : "String"
        },
        id : {
            filterType : "",
            filterValue : "",
            filterData : "Numeric"
        }
    }
    const [sortField, setSortField] = useState("id");
    const initialValues = {
        country: 5,
        state: "Maharashtra",
        city: 0,
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
        console.log(result.data);

        if (Array.isArray(result.data)) {
            setAllCountry(result.data);
        }
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
            if (result.length > 0) {
                setFormValues((existing) => {
                    const newData = { ...existing, city: result[0].id }
                    return newData;
                })
            }
        }
    }
    useEffect(() => {
        fetchData();
        fetchCountryData();
        fetchStateData(5);
        fetchCityData("Maharashtra")
        const handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setCountryFilter(false);
                setStateFilter(false);
                setCityFilter(false);
                setLocalityFilter(false);
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
        setCurrentPage(pageNumber);
        const data = {
            "user_id": 1234,
            "rows": ["id", "country", "cityid", "city", "state", "locality"],
            "filters": filterArray,
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
        const data = {
            "user_id": 1234,
            "rows": ["id", "country", "cityid", "city", "state", "locality"],
            "filters": filterArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": Number(currentPage),
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
        Object.keys(filterMapping).forEach(key=> {
            if(filterMapping[key].filterType != "") {
                tempArray.push([key,filterMapping[key].filterType,filterMapping[key].filterInput,filterMapping[key].filterData]);
            }
        }) 
        console.log(tempArray)
        const data = {
            "user_id": 1234,
            "rows": ["id", "country", "cityid", "city", "state", "locality"],
            "filters": filterArray,
            "sort_by": [sortField],
            "order": "desc",
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
        setSortField(field);
        const data = {
            "user_id": 1234,
            "rows": ["id", "country", "cityid", "city", "state", "locality"],
            "filters": filterArray,
            "sort_by": [field],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
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

        // console.log(res);

        
        if(res.result == "success") {
            openSuccess();
        }else {
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
    const openFailure = () => {
        setFailureModal(true);
        setTimeout(function () {
            setFailureModal(false);
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
    const deleteLob = async (name) => {

    }
    const [isLocalityDialogue, setIsLocalityDialogue] = React.useState(false);
    const handleOpen = () => {
        setIsLocalityDialogue(true);
    };
    const handleClose = () => {
        setIsLocalityDialogue(false);
    }
    const handleExcelDownload = async () => {
        const data = {
            "user_id": 1234,
            "rows": ["id", "country", "cityid", "city", "state", "locality"],
            "filters": [],
            "sort_by": [],
            "order": "asc",
            "pg_no": 0,
            "pg_size": 0,
            "search_key": isSearchOn ? searchQuery : ""
        };
        const response = await APIService.getLob(data)
        const temp = await response.json();
        const result = temp.data;
        const worksheet = XLSX.utils.json_to_sheet(result);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "LobData.xlsx");
        FileSaver.saveAs(workbook, "demo.xlsx");
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
        const data = {
            "user_id": 1234,
            "rows": ["id", "country", "cityid", "city", "state", "locality"],
            "filters": [],
            "sort_by": ["id"],
            "order": "desc",
            "pg_no": Number(currentPage),
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
    const fetchFiltered = async (filterType, filterField) => {
        const filterArray = [];
        // we need to query thru the object
        Object.keys(filterMapping).forEach(key=> {
            if(filterMapping[key].filterType != "") {
                filterArray.push([key,filterMapping[key].filterType,filterMapping[key].filterInput,filterMapping[key].filterData]);
            }
        }) 
        
        setPageLoading(true);
        const data = {
            "user_id": 1234,
            "rows": ["id", "name"],
            "filters": filterArray,
            "sort_by": [],
            "order": "asc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": isSearchOn ? searchQuery : ""
        };
        const response = await APIService.getLob(data)
        const temp = await response.json();
        const result = temp.data;
        const t = temp.total_count;
        setTotalItems(t);
        // setExistingLOB(result);
        setFlag((prev) => {
            return !prev;
        })
        setPageLoading(false);
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
        setSortField("id");
        setFlag(false)
        const data = {
            "user_id": 1234,
            "rows": ["id", "country", "cityid", "city", "state", "locality"],
            "filters": [],
            "sort_by": ["id"],
            "order": "desc",
            "pg_no": Number(currentPage),
            "pg_size": Number(currentPages),
            "search_key": ""
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
    //   const [filterArray,setFilterArray] = useState([["country","nofilter",""],["state","nofilter",""],["city","nofilter",""],["locality","nofilter",""]]);
    const handleFilter = (type,columnName) => {
        console.log(type,columnName)
        if(columnName == "country") {
            if(type == "noFilter") {
               filterMapping.country.filterType = "";
               filterMapping.country.filterValue = "";
               countryFilterInput("");
            }else {
                filterMapping.country.filterType = type;
                filterMapping.country.filterValue = countryFilterInput;
            }
        }else if(columnName == "state") {
            if(type == "noFilter") {
                filterMapping.state.filterType = "";
                filterMapping.state.filterValue = "";
                stateFilterInput("");
             }else {
                filterMapping.state.filterType = type;
                filterMapping.state.filterValue = stateFilterInput;
             }
        }else if(columnName == "city") {
            if(type == "noFilter") {
                filterMapping.city.filterType = "";
                filterMapping.city.filterValue = "";
                cityFilterInput("");
             }else {
                filterMapping.city.filterType = type;
                filterMapping.city.filterValue = cityFilterInput;
             }
        }else if(columnName == "locality") {
            if(type == "noFilter") {
                filterMapping.locality.filterType = "";
                filterMapping.locality.filterValue = "";
                localityFilterInput("");
             }else {
                filterMapping.locality.filterType = type;
                filterMapping.locality.filterValue = localityFilterInput;
             }
        }else if(columnName == "id") {
            if(type == "noFilter") {
                filterMapping.id.filterType = "";
                filterMapping.id.filterValue = "";
                idFilterInput("");
             }else {
                filterMapping.id.filterType = type;
                filterMapping.id.filterValue = idFilterInput;
             }
        }
        fetchData();
    }
    const handleFiltering = (type, columnNo) => {
        const existing = filterArray;
        
        if (type == "noFilter") {
            const existing = filterArray;
            if (columnNo == 0) {
                existing[columnNo][1] = type;
                setCountryFilterInput("");
                existing[columnNo][2] = "";
                setFilterArray(existing);
            } else if (columnNo == 1) {
                existing[columnNo][1] = type;
                setStateFilterInput("");
                existing[columnNo][2] = "";
                setFilterArray(existing);
            } else if (columnNo == 2) {
                existing[columnNo][1] = type;
                setCityFilterInput("");
                existing[columnNo][2] = "";
                setFilterArray(existing);
            } else if (columnNo == 3) {
                existing[columnNo][1] = type;
                setLocalityFilterInput("");
                existing[columnNo][2] = "";
                setFilterArray(existing);
            }
        } else if (type == "startsWith") {
            if (columnNo == 0) {
                existing[columnNo][1] = type;
                existing[columnNo][2] = countryFilterInput;
                setFilterArray(existing);
            } else if (columnNo == 1) {
                existing[columnNo][1] = type;
                existing[columnNo][2] = stateFilterInput;
                setFilterArray(existing);
            } else if (columnNo == 2) {
                existing[columnNo][1] = type;
                existing[columnNo][2] = cityFilterInput;
                setFilterArray(existing);
            } else if (columnNo == 3) {
                existing[columnNo][1] = type;
                existing[columnNo][2] = localityFilterInput;
                setFilterArray(existing);
            }
        } else if (type == "endsWith") {
            if (columnNo == 0) {
                existing[columnNo][1] = type;
                existing[columnNo][2] = countryFilterInput;
                setFilterArray(existing);
            } else if (columnNo == 1) {
                existing[columnNo][1] = type;
                existing[columnNo][2] = stateFilterInput;
                setFilterArray(existing);
            } else if (columnNo == 2) {
                existing[columnNo][1] = type;
                existing[columnNo][2] = cityFilterInput;
                setFilterArray(existing);
            } else if (columnNo == 3) {
                existing[columnNo][1] = type;
                existing[columnNo][2] = localityFilterInput;
                setFilterArray(existing);
            }
        } else if (type == "contains") {
            if (columnNo == 0) {
                existing[columnNo][1] = type;
                existing[columnNo][2] = countryFilterInput;
                setFilterArray(existing);
            } else if (columnNo == 1) {
                existing[columnNo][1] = type;
                existing[columnNo][2] = stateFilterInput;
                setFilterArray(existing);
            } else if (columnNo == 2) {
                existing[columnNo][1] = type;
                existing[columnNo][2] = cityFilterInput;
                setFilterArray(existing);
            } else if (columnNo == 3) {
                existing[columnNo][1] = type;
                existing[columnNo][2] = localityFilterInput;
                setFilterArray(existing);
            }
        } else if (type == "exactMatch") {
            if (columnNo == 0) {
                existing[columnNo][1] = type;
                existing[columnNo][2] = countryFilterInput;
                setFilterArray(existing);
            } else if (columnNo == 1) {
                existing[columnNo][1] = type;
                existing[columnNo][2] = stateFilterInput;
                setFilterArray(existing);
            } else if (columnNo == 2) {
                existing[columnNo][1] = type;
                existing[columnNo][2] = cityFilterInput;
                setFilterArray(existing);
            } else if (columnNo == 3) {
                existing[columnNo][1] = type;
                existing[columnNo][2] = localityFilterInput;
                setFilterArray(existing);
            }
        } else if (type == "isNull") {
            if (columnNo == 0) {
                existing[columnNo][1] = type;
                existing[columnNo][2] = countryFilterInput;
                setFilterArray(existing);
            } else if (columnNo == 1) {
                existing[columnNo][1] = type;
                existing[columnNo][2] = stateFilterInput;
                setFilterArray(existing);
            } else if (columnNo == 2) {
                existing[columnNo][1] = type;
                existing[columnNo][2] = cityFilterInput;
                setFilterArray(existing);
            } else if (columnNo == 3) {
                existing[columnNo][1] = type;
                existing[columnNo][2] = localityFilterInput;
                setFilterArray(existing);
            }
        } else if (type == "isNotNull") {
            if (columnNo == 0) {
                existing[columnNo][1] = type;
                existing[columnNo][2] = countryFilterInput;
                setFilterArray(existing);
            } else if (columnNo == 1) {
                existing[columnNo][1] = type;
                existing[columnNo][2] = stateFilterInput;
                setFilterArray(existing);
            } else if (columnNo == 2) {
                existing[columnNo][1] = type;
                existing[columnNo][2] = cityFilterInput;
                setFilterArray(existing);
            } else if (columnNo == 3) {
                existing[columnNo][1] = type;
                existing[columnNo][2] = localityFilterInput;
                setFilterArray(existing);
            }
        }
        fetchData();
    }
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const handleDelete = (item) => {
        setCurrItem(item)
        setShowDeleteModal(true);

    }
    return (
        <div className='h-screen'>
            <Navbar/>
            {editModal && <EditLocalityModal isOpen={editModal} handleClose={() => setEditModal(false)} item={currItem} fetchData={fetchData} openPrompt={openEditSuccess} />}
            {showSuccess && <SucessfullModal isOpen={showSuccess} handleClose={() => setShowSuccess(false)} message="Successfully Added Locality" />}
            {failureModal && <FailureModal isOpen={failureModal} message={errorMessage}/>}
            {showEditSuccess && <SucessfullModal isOpen={showEditSuccess} handleClose={() => setShowEditSuccess(false)} message="Successfully Updated Locality" />}
            {showDeleteSuccess && <SucessfullModal isOpen={showDeleteSuccess} handleClose={() => setShowDeleteSuccess(false)} message="Successfully Deleted Locality" />}
            {showDeleteModal && <DeleteLocalityModal isOpen={showDeleteModal} handleDelete={deleteLocality} handleClose={() => setShowDeleteModal(false)} item={currItem} />}
            {addConfirmation && <SaveConfirmationLocality handleClose={() => setAddConfirmation(false)} currentLocality={formValues.locality} addLocality={addLocality}/>}
            <div className='h-[calc(100vh_-_7rem)] w-full px-7'>
                    {/* search component */}
                    <div className='h-16 w-full  flex justify-between items-center p-2  border-gray-300 border-b-2'>
                                    <div className='flex items-center space-x-3'>
                                        <div className='rounded-2xl  bg-[#EBEBEB] h-8 w-8 flex justify-center items-center '>
                                            <Link to="/dashboard"><img className='h-5 w-5' src={backLink} /></Link>
                                        </div>

                                        <div className='flex-col'>
                                            <h1 className='text-[18px]'>Locality</h1>
                                            <p className='text-[14px]'>Admin &gt; Localities</p>
                                        </div>
                                    </div>
                                    <div className='flex space-x-2 items-center'>

                                        <div className='flex relative'>
                                            {/* search button */}
                                            <input
                                                className="h-[36px] bg-[#EBEBEB] text-[#787878] pl-2"
                                                type="text"
                                                placeholder="Search"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                            />
                                            <button onClick={handleCloseSearch}><img src={Cross} className='absolute w-[20px] h-[20px] left-[160px] top-2' /></button>
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
                                <div className='w-[15%] p-3'>
                                    <div className="w-[60%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                        <input className="w-14 bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2" value={countryFilterInput} onChange={(e) => setCountryFilterInput(e.target.value)} />
                                        <button className='p-1' onClick={() => setCountryFilter((prev) => !prev)}><img src={Filter} className='h-[15px] w-[15px]' /></button>
                                    </div>
                                    {countryFilter && <div className='h-[270px] w-[150px] mt-3 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm' ref={menuRef}>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => handleFilter('noFilter', 0)}><h1 >No Filter</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => handleFilter('contains', 0)}><h1 >Contains</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => handleFilter('contains', 0)}><h1 >DoesNotContain</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => handleFilter('startsWith', 0)}><h1 >StartsWith</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                                            <button onClick={() => handleFilter('endsWith', 0)}><h1 >EndsWith</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => handleFilter('exactMatch', 0)}><h1 >EqualTo</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => handleFilter('isNull', 0)}><h1 >isNull</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => handleFilter('isNotNull', 0)}><h1 >NotIsNull</h1></button>
                                        </div>
                                    </div>}
                                </div>
                                <div className='w-[20%] p-3 ml-1'>
                                    <div className="w-[44%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                        <input className="w-14 bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2" value={stateFilterInput} onChange={(e) => setStateFilterInput(e.target.value)} />
                                        <button className='p-1' onClick={() => setStateFilter((prev) => !prev)}><img src={Filter} className='h-[15px] w-[15px]' /></button>
                                    </div>
                                    {stateFilter && <div className='h-[270px] w-[150px] mt-3 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm' ref={menuRef}>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => handleFilter('noFilter', 1)}><h1 >No Filter</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => handleFilter('contains', 1)}><h1 >Contains</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => handleFilter('contains', 1)}><h1 >DoesNotContain</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => handleFilter('startsWith', 1)}><h1 >StartsWith</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                                            <button onClick={() => handleFilter('endsWith', 1)}><h1 >EndsWith</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => handleFilter('exactMatch', 1)}><h1 >EqualTo</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => handleFilter('isNull', 1)}><h1 >isNull</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => handleFilter('isNotNull', 1)}><h1 >NotIsNull</h1></button>
                                        </div>
                                    </div>}
                                </div>

                                <div className='w-[20%] p-3 ml-1'>
                                    <div className="w-[44%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                        <input className="w-14 bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2" value={cityFilterInput} onChange={(e) => setCityFilterInput(e.target.value)} />
                                        <button className='p-1' onClick={() => setCityFilter((prev) => !prev)}><img src={Filter} className='h-[15px] w-[15px]' /></button>
                                    </div>
                                    {cityFilter && <div className='h-[270px] w-[150px] mt-3 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm' ref={menuRef}>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => handleFilter('noFilter', 2)}><h1 >No Filter</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => handleFilter('contains', 2)}><h1 >Contains</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => handleFilter('contains', 2)}><h1 >DoesNotContain</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => handleFilter('startsWith', 2)}><h1 >StartsWith</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                                            <button onClick={() => handleFilter('endsWith', 2)}><h1 >EndsWith</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => handleFilter('exactMatch', 2)}><h1 >EqualTo</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => handleFilter('isNull', 2)}><h1 >isNull</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => handleFilter('isNotNull', 2)}><h1 >NotIsNull</h1></button>
                                        </div>
                                    </div>}
                                </div>
                                <div className='w-[20%] p-3 ml-[2px]'>
                                    <div className="w-[44%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                        <input className="w-14 bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2" value={localityFilterInput} onChange={(e) => setLocalityFilterInput(e.target.value)} />
                                        <button className='p-1' onClick={() => setLocalityFilter((prev) => !prev)}><img src={Filter} className='h-[15px] w-[15px]' /></button>
                                    </div>
                                    {localityFilter && <div className='h-[270px] w-[150px] mt-3 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm' ref={menuRef}>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => handleFilter('noFilter', 3)}><h1 >No Filter</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => handleFilter('contains', 3)}><h1 >Contains</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => handleFilter('contains', 3)}><h1 >DoesNotContain</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => handleFilter('startsWith', 3)}><h1 >StartsWith</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                                            <button onClick={() => handleFilter('endsWith', 3)}><h1 >EndsWith</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => handleFilter('exactMatch', 3)}><h1 >EqualTo</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => handleFilter('isNull', 3)}><h1 >isNull</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => handleFilter('isNotNull', 3)}><h1 >NotIsNull</h1></button>
                                        </div>
                                    </div>}
                                </div>
                            </div>
                            <div className='w-1/6 p-3 '>
                                <div className='w-[37%] flex  items-center bg-[#EBEBEB] rounded-[5px] ml-4'>
                                    <input className="w-10 bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2" value={idFilterInput} onChange={(e) => setidFilterInput(e.target.value)} />
                                    <button className='p-1' onClick={() => setIdFilter((prev) => !prev)}><img src={Filter} className='h-[15px] w-[15px]' /></button>
                                </div>
                                {idFilter && <div className='h-[360px] w-[150px] mt-3 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm z-40' ref={menuRef}>
                                    <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                        <button onClick={() => handleFilter('noFilter', 0)}><h1 >No Filter</h1></button>
                                    </div>
                                    <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                        <button onClick={() => handleFilter('contains', 0)}><h1 >EqualTo</h1></button>
                                    </div>
                                    <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                        <button onClick={() => handleFilter('contains', 0)}><h1 >NotEqualTo</h1></button>
                                    </div>
                                    <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                        <button onClick={() => handleFilter('startsWith', 0)}><h1 >GreaterThan</h1></button>
                                    </div>
                                    <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                                        <button onClick={() => handleFilter('endsWith', 0)}><h1 >LessThan</h1></button>
                                    </div>
                                    <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                        <button onClick={() => handleFilter('exactMatch', 0)}><h1 >GreaterThanOrEqualTo</h1></button>
                                    </div>
                                    <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                        <button onClick={() => handleFilter('isNull', 0)}><h1 >LessThanOrEqualTo</h1></button>
                                    </div>
                                    <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                        <button onClick={() => handleFilter('isNotNull', 0)}><h1 >Between</h1></button>
                                    </div>
                                    <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                        <button onClick={() => handleFilter('isNotNull', 0)}><h1 >NotBetween</h1></button>
                                    </div>
                                    <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                        <button onClick={() => handleFilter('isNotNull', 0)}><h1 >isNull</h1></button>
                                    </div>
                                    <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                        <button onClick={() => handleFilter('isNotNull', 0)}><h1 >NotIsNull</h1></button>
                                    </div>
                                </div>}
                                <div className='w-1/2 0 p-4'>

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
                                        <div className='w-1/2  p-4'>
                                            <p>ID<button onClick={() => handleSort("id")}><span className="font-extrabold">↑↓</span></button> </p>
                                        </div>
                                        <div className='w-1/2 0 p-4'>
                                            <p>Edit</p>
                                        </div>
                                    </div>
                                </div>

                                {/* main table */}
                                <div className='w-full h-[calc(100vh_-_17rem)] overflow-auto'>
                                        {pageLoading && <LinearProgress />}
                                        {!pageLoading && existingLocalities.map((item, index) => {
                                            return <div className='w-full h-10  flex justify-between border-gray-400 border-b-[1px]'>
                                                <div className='w-[85%] flex'>
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
                                                <div className='w-[15%] flex'>
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
            <Modal open={isLocalityDialogue}
                fullWidth={true}
                maxWidth={'md'}
                className='flex justify-center items-center rounded-lg'
            >
                <div className='flex justify-center bg-white rounded-lg'>
                    <div className=" w-[700px] h-auto bg-white rounded-lg ">
                        <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-t-lg">
                            <div className="mr-[250px] ml-[250px]">
                                <div className="text-[16px]">Add New Locality</div>
                            </div>
                            <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                                <button onClick={handleClose}><img className="w-[20px] h-[20px]" src={Cross} alt="cross" /></button>
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
                                                    setFormValues((existing) => {
                                                        const newData = { ...existing, country: e.target.value }
                                                        return newData;
                                                    })
                                                }}
                                            >
                                                {/* <option value="none" hidden={true}>Select a Country</option> */}
                                                {allCountry && allCountry.map(item => {
                                                    if(item[1] == 5) {
                                                      return <option value={item[0]} selected>
                                                            {item[1]}
                                                        </option>
                                                    }else {
                                                        return <option value={item[0]}>
                                                              {item[1]}
                                                        </option>
                                                    }
                                              })}
                                            </select>
                                            <div className="text-[11px] text-[#CD0000] ">{formErrors.country}</div>
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
                                                    setFormValues((existing) => {
                                                        const newData = { ...existing, state: e.target.value }
                                                        return newData;
                                                    })

                                                }}
                                            >
                                                {/* <option value="none" hidden={true}>Select a State</option> */}
                                                {allState.map(item => {
                                                
                                                    if(item[0] === "Maharashtra") {
                                                        return <option value={item[0]} selected>
                                                                  {item[0]}
                                                            </option>
                                                    }else {
                                                          return <option value={item[0]}>
                                                            {item[0]}
                                                          </option>
                                                    //     return <option value={item[0]} >
                                                    //     {item[0]}
                                                    // </option>
                                                    }
})}
                                            </select>
                                            <div className="text-[11px] text-[#CD0000] ">{formErrors.state}</div>
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
                                            <div className="text-[11px] text-[#CD0000] ">{formErrors.city}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Locality Name<label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[22px] border-[1px] border-[#C6C6C6] rounded-sm px-3 py-[2px] text-[11px]" type="text" name="empName" value={formValues.locality} onChange={(e) => {

                                                setFormValues((existing) => {
                                                    const newData = { ...existing, locality: e.target.value }
                                                    return newData;
                                                })
                                            }} />
                                            <div className="text-[11px] text-[#CD0000] ">{formErrors.locality}</div>
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
            </Modal>
        </div>
    )
}

export default Locality
