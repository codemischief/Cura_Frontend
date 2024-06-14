import { CircularProgress, Modal, Pagination } from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import FailureModal from '../../../Components/modals/FailureModal';
import SucessfullModal from '../../../Components/modals/SucessfullModal';
import backLink from "../../../assets/back.png";
import Cross from "../../../assets/cross.png";
import downloadIcon from "../../../assets/download.png";
import Pdf from "../../../assets/pdf.png";
import Excel from "../../../assets/excel.png"
import refreshIcon from "../../../assets/refresh.png";
import searchIcon from "../../../assets/searchIcon.png";
import { APIService } from '../../../services/API';
import Delete from './Delete';
import EditManageBuilder from './EditManageBuilder';
import CharacterFilter from '../../../Components/Filters/CharacterFilter';
import NumericFilter from '../../../Components/Filters/NumericFilter';
import Filter from "../../../assets/filter.png"
import SaveConfirmationBuilder from "./SaveConfirmationBuilder";
import CancelModel from './../../../Components/modals/CancelModel';
import Draggable from "react-draggable";
import ActiveFilter from "../../../assets/active_filter.png";
import AddButton from "../../../Components/common/CustomButton";
import EditButton from "../../../Components/common/buttons/EditButton";
import DeleteButton from "../../../Components/common/buttons/deleteButton";
import useAuth from "../../../context/JwtContext";
import { handleError } from "../../../utils/ErrorHandler";
import { toast } from "react-toastify";
const env_URL_SERVER = import.meta.env.VITE_ENV_URL_SERVER
const ManageBuilder = () => {
    const {user} = useAuth()
    const {pathname} = useLocation()
    const menuRef = useRef();
    const navigate = useNavigate();
    const [existingBuilders, setExistingBuilders] = useState([]);
    const [pageLoading, setPageLoading] = useState(false);
    const [showSucess, setShowSucess] = useState(false);
    const [showFailure, setShowFailure] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [currentBuilder, setCurrentBuilder] = useState({});
    const [currentBuilderId, setCurrentBuilderId] = useState();
    const [deleted, setDeleted] = useState(false);
    const [allCountry, setAllCountry] = useState([]);
    const [currCountry, setCurrCountry] = useState(-1);
    const [allState, setAllState] = useState([]);
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [allCity, setAllCity] = useState([]);
    const [countryId, setcountryId] = useState("");
    const [userId, setUserId] = useState(0);
    const [totalItems, setTotalItems] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [currentPages, setCurrentPages] = useState(15)
    const [sortField, setSortField] = useState("id");
    const [searchInput, setSearchInput] = useState("");
    const [isSearchOn, setIsSearchOn] = useState(false);
    const openSuccessModal = () => {
        // set the state for true for some time
        setIsManageBuidlerDialogue(false);
        setShowSucess(true);
        setTimeout(function () {
            setShowSucess(false)
        }, 2000)
    }
    const openFailureModal = () => {
        setIsManageBuidlerDialogue(false);
        setShowFailure(true);
        setTimeout(function () {
            setShowFailure(false)
        }, 4000);
    }

    const fetchBuilderData = async () => {
        setPageLoading(true);
        const tempArray = [];
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
        try {
        const data = {
            "user_id": user.id,
            "rows": ["id", "buildername", "phone1", "phone2", "email1", "email2", "addressline1", "addressline2", "suburb", "city", "state", "country", "zip", "website", "comments", "dated", "createdby", "isdeleted"],
            "filters": tempArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": Number(currentPage),
            "pg_size": Number(currentPages),
            "search_key": searchInput
        };
            const response = await APIService.getNewBuilderInfo(data)
            const res = await response.json()
            
            const result = res.data.builder_info;
            setTotalItems(res.total_count);
            
            
            // 
            setExistingBuilders(result);
        }catch(err) {
            handleError(err)
            toast('Something Went Wrong, Please Refresh!')
        }
        setPageLoading(false);
        
    }
    const fetchPageData = async (page) => {
        setPageLoading(true);
        setCurrentPage(page)
        const data = {
            "user_id": user.id,
            "rows": ["id", "buildername", "phone1", "phone2", "email1", "email2", "addressline1", "addressline2", "suburb", "city", "state", "country", "zip", "website", "comments", "dated", "createdby", "isdeleted"],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": Number(page),
            "pg_size": Number(currentPages),
            "search_key": searchInput
        };
        const response = await APIService.getNewBuilderInfo(data)
        const res = await response.json()
        
        const result = res.data.builder_info;
        setTotalItems(res.total_count);
        
        setPageLoading(false);
        // 
        setExistingBuilders(result);
    }
    const fetchQuantityData = async (quantity) => {
        setPageLoading(true);
        setCurrentPages(quantity);
        setCurrentPage((prev) => 1);
        const data = {
            "user_id": user.id,
            "rows": ["id", "buildername", "phone1", "phone2", "email1", "email2", "addressline1", "addressline2", "suburb", "city", "state", "country", "zip", "website", "comments", "dated", "createdby", "isdeleted"],
            "filters": filterState,
            "sort_by": [sortField],
            "order": "desc",
            "pg_no": 1,
            "pg_size": Number(quantity),
            "search_key": searchInput
        };
        const response = await APIService.getNewBuilderInfo(data)
        const res = await response.json()
        
        const result = res.data.builder_info;
        setTotalItems(res.total_count);
        
        setPageLoading(false);
        // 
        setExistingBuilders(result);
    }

    const fetchCountryData = async () => {
        setPageLoading(true);
        // const data = { "user_id":  user.id };
        const data = { "user_id": user.id, "rows": ["id", "name"], "filters": [], "sort_by": [], "order": "asc", "pg_no": 0, "pg_size": 0 };
        const response = await APIService.getCountries(data)
        const result = (await response.json()).data;
        setAllCountry(result)
    }

    const fetchStateData = async (e) => {

        const data = { "user_id": user.id, "country_id": e };
        const response = await APIService.getState(data);
        const result = (await response.json()).data;
        // 
        if (Array.isArray(result)) {
            setAllState(result)
        }
    }

    const fetchCityData = async (d) => {
        const data = { "user_id": user.id, "state_name": d };
        const response = await APIService.getCities(data);
        const result = (await response.json()).data;
        if (Array.isArray(result)) {
            setAllCity(result)
        }
    }

    const handleSearch = async () => {
        setPageLoading(true);
        setIsSearchOn(true);
        setCurrentPage(1)
        const data = {
            "user_id": user.id,
            "rows": ["id", "buildername", "phone1", "phone2", "email1", "email2", "addressline1", "addressline2", "suburb", "city", "state", "country", "zip", "website", "comments", "dated", "createdby", "isdeleted"],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": searchInput
        };
        const response = await APIService.getNewBuilderInfo(data)
        const res = await response.json()
        
        const result = res.data.builder_info;
        setTotalItems(res.total_count);
        
        setPageLoading(false);
        // 
        setExistingBuilders(result);
    }

    const handleCloseSearch = async () => {
        setPageLoading(true);
        setSearchInput("");
        setIsSearchOn(false);
        setCurrentPage(1);
        const data = {
            "user_id": user.id,
            "rows": ["id", "buildername", "phone1", "phone2", "email1", "email2", "addressline1", "addressline2", "suburb", "city", "state", "country", "zip", "website", "comments", "dated", "createdby", "isdeleted"],
            "filters": filterState,
            "sort_by": [sortField],
            "order": "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": ""
        };
        const response = await APIService.getNewBuilderInfo(data)
        const res = await response.json()
        
        const result = res.data.builder_info;
        setTotalItems(res.total_count);
        
        setPageLoading(false);
        // 
        setExistingBuilders(result);
    }

    const deleteBuilder = async (item) => {
        setShowDelete(true);
        setCurrentBuilderId(item);
        setDeleted(true);
    }
    const [errorMessage, setErrorMessage] = useState("");
    const handleAddBuilder = async () => {
        
        setCurrentBuilder(formValues.builderName)
        setIsManageBuidlerDialogue(false)

        setAddConfirmation(true);

    }
    const addNewBuilder = async () => {
        const data = {
            "user_id": user.id,
            "buildername": formValues.builderName,
            "phone1": formValues.phone1,
            "phone2": formValues.phone2,
            "email1": formValues.email1,
            "email2": formValues.email2,
            "addressline1": formValues.address1,
            "addressline2": formValues.address2,
            "suburb": formValues.suburb,
            "city": Number(formValues.city),
            "state": formValues.state,
            "country": formValues.country,
            "zip": formValues.zip,
            "website": formValues.website,
            "comments": formValues.comment,
        };
        const response = await APIService.addNewBuilder(data);
        const res = await response.json();
        setAddConfirmation(false);
        if (res.result == "success") {
            setIsLoading(false);
            setFormValues(initialValues);
            openSuccessModal();
        } else {
            setIsLoading(false);
            setErrorMessage(res.message)
            openFailureModal();
        }
        fetchBuilderData();
    }

    useEffect(() => {
        // fetchUserId();
        fetchBuilderData();
        fetchCountryData();
        fetchStateData(5)
        fetchCityData("Maharashtra")
        const handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setCountryFilter(false)
                setBuilderFilter(false)
                setCityFilter(false)
                setSuburbFilter(false)
                setIdFilter(false)
            }
        }

        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);
    //Validation of the form
    const initialValues = {
        builderName: null,
        phone1: null,
        phone2: null,
        email1: null,
        email2: null,
        address1: null,
        address2: null,
        country: 5,
        state: "Maharashtra",
        city: 847,
        zip: null,
        website: null,
        comment: null,
        suburb: null
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});

    // handle changes in input form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        // 
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues)); // validate form and set error message
        
        if (!formValues.builderName || formValues.builderName == "") {
            return
        }
        if (!formValues.phone1 || formValues.phone1 == "") {
            return
        }
        if (!formValues.address1 || formValues.address1 == "") {
            return
        }
        if (!formValues.country || formValues.country == "") {
            return
        }
        if (!formValues.state || formValues.state == "") {
            return
        }
        if (!formValues.city || formValues.city == "") {
            return
        }
        if (!formValues.suburb || formValues.suburb == "") {
            return
        }


        // if(formValues.)
        setIsLoading(true);
        setCurrentBuilder(formValues.builderName)
        handleAddBuilder();
        // addNewBuilder();
    };
    // validate form and to throw Error message
    const validate = (values) => {
        const errors = {};
        if (!values.builderName || values.builderName == "") {
            errors.builderName = "Enter Builder name";
        }
        if (!values.phone1 || values.phone1 == "") {
            errors.phone1 = "Enter Phone number";
        }
        if (!values.email1 || values.email1 == "") {
            errors.email1 = "Enter Email";
        }
        if (!values.address1 || values.address1 == "") {
            errors.address1 = "Enter Builder Adress";
        }
        if (!values.country || values.country == "") {
            errors.country = "Select Country";
        }
        if (!values.state || values.state == "") {
            errors.state = "Select State";
        }
        if (!values.city || values.cty == "") {
            errors.city = "Select City";
        }
        if (!formValues.suburb || formValues.suburb == "") {
            errors.suburb = "Select suburb";
        }
        return errors;
    };

    const [isManageBuidlerDialogue, setIsManageBuidlerDialogue] = React.useState(false);
    const handleOpen = () => {
        setIsManageBuidlerDialogue(true);
    };
    const handleClose = () => {
        initials();
        setIsManageBuidlerDialogue(false);
        openAddCancelModal();
    }
    const initials = () => {
        setFormValues(initialValues);
        setFormErrors({});
    }
    const [isEditDialogue, setIsEditDialogue] = React.useState(false);
    const editBuilder = (item) => {
        setCurrentBuilder(item);
        setIsEditDialogue(true);
    }
    const [isDeleteDialogue, setIsDeleteDialogue] = React.useState(false);
    const handleOpenDelete = () => {
        setIsDeleteDialogue(true);
    };
    const handleCloseDelete = () => {
        setIsDeleteDialogue(false);
    }
    const handleRefresh = async () => {
        await fetchBuilderData();
    }
    const openDownload = () => {
        setDownloadModal(true);
    }
    const handleDownload = async (type) => {
        // setBackDropLoading(true)
        setDownloadModal(false)
        setPageLoading(true)
        const data = {
            "user_id": user.id,
            
            "rows": ["buildername", "country", "city", "suburb", "id"],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 0,
            "pg_size": 0,
            "search_key": searchInput,
            "downloadType": type,
            "routename" : pathname,
            "colmap": {
                "buildername": "Builder Name",
                "country": "Country",
                "city": "City",
                "suburb": "Suburb",
                "id": "ID"
            }
        };
        const response = await APIService.getNewBuilderInfo(data)
        const temp = await response.json();
        const result = temp.data;
        
        if (temp.result == 'success') {
            const d = {
                "filename": temp.filename,
                "user_id": user.id
            }
            fetch(`${env_URL_SERVER}download/${temp.filename}`, {
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
                        FileSaver.saveAs(result, 'BuilderData.xlsx');
                    } else if (type == "pdf") {
                        FileSaver.saveAs(result, 'BuilderData.pdf');
                    }

                    
                })
                .catch(error => {
                    console.error('Error:', error);
                });

            setTimeout(() => {
                // setBackDropLoading(false)
                setPageLoading(false)
            }, 1000)
        }
    }
    const handlePageChange = (event, value) => {
        setCurrentPage(value)
        fetchPageData(value)
    }

    const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
    const openDeleteSuccess = () => {
        setShowDeleteSuccess(true);
        setTimeout(function () {
            setShowDeleteSuccess(false);
        }, 2000)
        fetchData();
    }

    const [showCancelModelAdd, setShowCancelModelAdd] = useState(false);
    const [showCancelModel, setShowCancelModel] = useState(false);
    const openAddCancelModal = () => {
        // set the state for true for some time
        setIsManageBuidlerDialogue(false);
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

    const [downloadModal, setDownloadModal] = useState(false)
    const [builderFilter, setBuilderFilter] = useState(false)
    const [builderFilterInput, setBuilderFilterInput] = useState("")
    const [countryFilter, setCountryFilter] = useState(false)
    const [countryFilterInput, setCountryFilterInput] = useState("")
    const [cityFilter, setCityFilter] = useState(false)
    const [cityFilterInput, setCityFilterInput] = useState("")
    const [suburbFilter, setSuburbFilter] = useState(false)
    const [suburbFilterInput, setSuburbFilterInput] = useState("")
    const [idFilter, setIdFilter] = useState(false)
    const [idFilterInput, setIdFilterInput] = useState("")
    const [addConfirmation, setAddConfirmation] = useState(false);

    const filterMapping = {
        buildername: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        country: {
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
        suburb: {
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
        setPageLoading(true);
        setBuilderFilter(false);
        setCountryFilter(false);
        setCityFilter(false);
        setSuburbFilter(false);
        setIdFilter(false);
        const tempArray = [];
        // we need to query thru the object
        // 
        
        Object.keys(mapState).forEach(key => {
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
        })
        setFilterState(tempArray)
        setCurrentPage((prev) => 1)
        const data = {
            "user_id": user.id,
            "rows": ["id", "buildername", "phone1", "phone2", "email1", "email2", "addressline1", "addressline2", "suburb", "city", "state", "country", "zip", "website", "comments", "dated", "createdby", "isdeleted"],
            "filters": tempArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": searchInput
        };
        const response = await APIService.getNewBuilderInfo(data)
        const res = await response.json()
        
        const result = res.data.builder_info;
        setTotalItems(res.total_count);
        
        setPageLoading(false);
        // 
        setExistingBuilders(result);
    }
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
    
    const [flag, setFlag] = useState(false)
    
    const handleSort = async (field) => {
        setPageLoading(true);
        const tempArray = [];
        // we need to query thru the object
        setSortField(field)
        setFlag((prev) => {
            return !prev
        })
        
        Object.keys(filterMapState).forEach(key => {
            if (filterMapState[key].filterType != "") {
                tempArray.push([key, filterMapState[key].filterType, filterMapState[key].filterValue, filterMapState[key].filterData]);
            }
        })
        const data = {
            "user_id": user.id,
            "rows": ["id", "buildername", "phone1", "phone2", "email1", "email2", "addressline1", "addressline2", "suburb", "city", "state", "country", "zip", "website", "comments", "dated", "createdby", "isdeleted"],
            "filters": filterState,
            "sort_by": [field],
            "order": !flag ? "asc" : "desc",
            "pg_no": Number(currentPage),
            "pg_size": Number(currentPages),
            "search_key": isSearchOn ? searchInput : ""
        };
        const response = await APIService.getNewBuilderInfo(data)
        const res = await response.json()
        
        const result = res.data.builder_info;
        setTotalItems(res.total_count);
        
        setPageLoading(false);
        // 
        setExistingBuilders(result);

    }

    const [showEditSuccess, setShowEditSuccess] = useState(false)
    const openEditSuccess = () => {
        setIsEditDialogue(false);
        setShowEditSuccess(true);
        setTimeout(function () {
            setShowEditSuccess(false)
        }, 2000)
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
                fetchBuilderData()
            } else {
                newHandleFilter(inputVariable,
                    setInputVariable,
                    type,
                    columnName)
            }



        }
    }
    return (
        <div className="font-medium">
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={pageLoading}
                onClick={() => { }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <SucessfullModal isOpen={showSucess} message="New Builder created succesfully " />
            {showDeleteSuccess && <SucessfullModal isOpen={showDeleteSuccess} message="Builder Deleted Successfully" />}
            <FailureModal isOpen={showFailure} message={errorMessage} />
            <Delete isOpen={showDelete} currentBuilder={currentBuilderId} closeDialog={setShowDelete} fetchData={fetchBuilderData} showSuccess={openDeleteSuccess} showCancel={openCancelModal} />
            {addConfirmation && <SaveConfirmationBuilder handleClose={() => setAddConfirmation(false)} addBuilder={addNewBuilder} currentBuilder={currentBuilder} showCancel={openAddCancelModal} setDefault={initials} />}
            {showCancelModelAdd && <CancelModel isOpen={showCancelModelAdd} message="Process cancelled, no new builder created." />}
            {showEditSuccess && <SucessfullModal isOpen={showEditSuccess} message="Changes saved succesfully " />}
            {showCancelModel && <CancelModel isOpen={showCancelModel} message="Process cancelled, no changes saved." />}
            <div className='h-[calc(100vh_-_123px)] w-full px-10'>

                <div className='h-16 w-full  flex justify-between items-center p-2  border-gray-300 border-b-2'>
                    <div className='flex items-center space-x-3'>
                        <div className='rounded-2xl  bg-[#EBEBEB] h-8 w-8 flex justify-center items-center'>
                            <button onClick={() => navigate(-1)}><img className='w-5 h-5' src={backLink} /></button>
                        </div>
                        <div className='flex-col'>
                            <h1 className="text-[18px]">Manage Builder</h1>
                            <p className="text-[14px]">Manage &gt; Manage Builder</p>
                        </div>
                    </div>
                    <div className='flex space-x-2 items-center '>
                        <div className='flex bg-[#EBEBEB]'>
                            {/* search button */}
                            <input
                                className="h-[36px] bg-[#EBEBEB] text-[#787878] pl-3 outline-none"
                                type="text"
                                placeholder="  Search"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                onKeyDownCapture={handleKeyDown}
                            />
                            <button onClick={handleCloseSearch}><img src={Cross} className='w-5 h-5 mx-2' /></button>
                            <div className="h-[36px] w-[40px] bg-[#004DD7] flex items-center justify-center rounded-r-lg">
                                <button onClick={handleSearch}><img className="h-[26px] " src={searchIcon} alt="search-icon" /></button>
                            </div>
                        </div>

                        <div>
                            {/* button */}
                            {/* <button className="bg-[#004DD7] text-white h-[36px] w-[240px] rounded-lg" onClick={handleOpen}>
                                <div className="flex items-center justify-center gap-4">
                                    Add New Builder
                                    <img className='h-[18px] w-[18px]' src={Add} alt="add" />
                                </div>
                            </button> */}
                            <AddButton title="Add New Builder" onClick={handleOpen} />
                        </div>

                    </div>

                </div>

                <div className='h-12 w-full flex text-xs items-center'>
                    <div className="w-[85%] h-full flex items-center">
                        <div className='w-[5%] p-3'>
                            {/* <p>Sr. </p> */}
                        </div>
                        <div className='w-[25%]  px-3 py-2.5'>
                            <div className='w-[46%] flex items-center bg-[#EBEBEB] rounded-[5px]'>
                                <input className="w-[77%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" value={builderFilterInput} onChange={(e) => { setBuilderFilterInput(e.target.value) }}

                                    onKeyDown={(event) => handleEnterToFilter(event, builderFilterInput,
                                        setBuilderFilterInput,
                                        'contains',
                                        'buildername')}

                                />
                                {filterMapState.buildername.filterType == "" ? <button className='w-[22%] px-1 py-2' onClick={() => setBuilderFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> : <button className='w-[22%] px-1 py-2' onClick={() => setBuilderFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>}
                            </div>
                            {builderFilter && <CharacterFilter inputVariable={builderFilterInput} setInputVariable={setBuilderFilterInput} handleFilter={newHandleFilter} filterColumn='buildername' menuRef={menuRef} filterType={filterMapState.buildername.filterType} />}
                        </div>
                        <div className='w-[15%]  px-3 py-2.5'>
                            <div className='w-[66%] flex items-center bg-[#EBEBEB] rounded-[5px]'>
                                <input className="w-[72%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" value={countryFilterInput} onChange={(e) => { setCountryFilterInput(e.target.value) }}

                                    onKeyDown={(event) => handleEnterToFilter(event, countryFilterInput,
                                        setCountryFilterInput,
                                        'contains',
                                        'country')}

                                />

                                {filterMapState.country.filterType == "" ? <button className='w-[28%] px-1 py-2' onClick={() => setCountryFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> : <button className='w-[28%] px-1 py-2' onClick={() => setCountryFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>}

                            </div>
                            {countryFilter && <CharacterFilter inputVariable={countryFilterInput} setInputVariable={setCountryFilterInput} handleFilter={newHandleFilter} filterColumn='country' menuRef={menuRef} filterType={filterMapState.country.filterType} />}
                        </div>
                        <div className='w-[15%]  px-3 py-2.5'>
                            <div className='w-[66%] flex items-center bg-[#EBEBEB] rounded-[5px]'>
                                <input className="w-[75%] bg-[#EBEBEB] rounded-[5px] pl-2 outline-none " value={cityFilterInput} onChange={(e) => { setCityFilterInput(e.target.value) }}
                                    onKeyDown={(event) => handleEnterToFilter(event, cityFilterInput,
                                        setCityFilterInput,
                                        'contains',
                                        'city')}
                                />
                                {filterMapState.city.filterType == "" ? <button className='w-[30%] px-1 py-2' onClick={() => setCityFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> : <button className='w-[30%] px-1 py-2' onClick={() => setCityFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>}
                            </div>
                            {cityFilter && <CharacterFilter inputVariable={cityFilterInput} setInputVariable={setCityFilterInput} handleFilter={newHandleFilter} filterColumn='city' menuRef={menuRef} filterType={filterMapState.city.filterType} />}
                        </div>
                        <div className='w-[15%]  px-3 py-2.5'>
                            <div className='w-[66%] flex items-center bg-[#EBEBEB] rounded-[5px]'>
                                <input className="w-[75%] bg-[#EBEBEB] rounded-[5px] pl-2 outline-none" value={suburbFilterInput} onChange={(e) => { setSuburbFilterInput(e.target.value) }}
                                    onKeyDown={(event) => handleEnterToFilter(event, suburbFilterInput,
                                        setSuburbFilterInput,
                                        'contains',
                                        'suburb')}
                                />
                                {filterMapState.suburb.filterType == "" ? <button className='w-[25%] px-1 py-2' onClick={() => setSuburbFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> : <button className='w-[25%] px-1 py-2' onClick={() => setSuburbFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>}
                            </div>
                            {suburbFilter && <CharacterFilter inputVariable={suburbFilterInput} setInputVariable={setSuburbFilterInput} handleFilter={newHandleFilter} filterColumn='suburb' menuRef={menuRef} filterType={filterMapState.suburb.filterType} />}
                        </div>
                        <div className='w-[10%]  p-4'>
                            {/* <p>Contact</p> */}
                        </div>
                        <div className='w-[10%]  p-4'>
                            {/* <p>Projects</p> */}
                        </div>
                    </div>
                    <div className="w-[15%] flex items-center">
                        <div className='w-1/2  px-3 py-2.5'>
                            <div className='w-[90%] flex items-center bg-[#EBEBEB] rounded-[5px]'>
                                <input className="w-[67%] bg-[#EBEBEB] rounded-[5px] pl-2 outline-none" value={idFilterInput} onChange={(e) => { setIdFilterInput(e.target.value) }}
                                    onKeyDown={(event) => handleEnterToFilter(event, idFilterInput,
                                        setIdFilterInput,
                                        'equalTo',
                                        'id')}
                                />
                                {filterMapState.id.filterType == "" ? <button className='w-[33%] px-1 py-2' onClick={() => setIdFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> : <button className='w-[33%] px-1 py-2' onClick={() => setIdFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>}
                            </div>
                            {idFilter && <NumericFilter inputVariable={idFilterInput} setInputVariable={setIdFilterInput} handleFilter={newHandleFilter} menuRef={menuRef} columnName='id' filterType={filterMapState.id.filterType} />}
                        </div>

                        <div className='w-1/2 p-4'>
                            {/* <p>Edit</p> */}
                        </div>
                    </div>
                </div>


                <div className='h-[calc(100vh_-_14rem)] w-full text-[12px]'>

                    <div className='w-full h-12 bg-[#F0F6FF] flex justify-between items-center'>
                        <div className='w-[85%] flex items-center'>
                            <div className='w-[5%] p-4'>
                                <p>Sr. </p>
                            </div>
                            <div className='w-[25%]  p-4'>
                                <p>Builder Name <button onClick={() => handleSort('buildername')}><span className="font-extrabold">↑↓</span></button></p>
                            </div>
                            <div className='w-[15%]  p-4'>
                                <p>Country <button onClick={() => handleSort('country')}><span className="font-extrabold">↑↓</span></button></p>
                            </div>
                            <div className='w-[15%]  p-4'>
                                <p>City <button onClick={() => handleSort('city')}><span className="font-extrabold">↑↓</span></button></p>
                            </div>
                            <div className='w-[15%]  p-4'>
                                <p>Suburb <button onClick={() => handleSort('suburb')}><span className="font-extrabold">↑↓</span></button></p>
                            </div>
                            <div className='w-[10%]  p-4'>
                                {/* <p>Contact</p> */}
                            </div>
                            <div className='w-[10%]  p-4'>
                                {/* <p>Projects</p> */}
                            </div>
                        </div>
                        <div className='w-[15%] flex items-center'>
                            <div className='w-1/2  p-4'>
                                <p>ID <button onClick={() => handleSort('id')}><span className="font-extrabold">↑↓</span></button></p>
                            </div>
                            <div className='w-1/2 0 p-4'>
                                <p>Edit</p>
                            </div>
                        </div>
                    </div>



                    <div className='w-full h-[calc(100vh_-_17rem)] overflow-auto'>
                        {/* {pageLoading && <div className='ml-11 mt-9'>
                            <CircularProgress />
                        </div>} */}
                        {}
                        {}
                        {}
                        {!pageLoading && existingBuilders && existingBuilders.length == 0 &&
                         <div className='h-10 border-gray-400 border-b-[1px] flex items-center'>
                            <h1 className='ml-10'>No Records To Show</h1>
                        </div>}
                        {!pageLoading && existingBuilders && existingBuilders.map((item, index) => {
                            return <div className='w-full h-10  flex justify-between items-center border-gray-400 border-b-[1px]'>
                                <div className='w-[85%] flex items-center'>
                                    <div className='w-[5%] p-4'>
                                        <p>{index + 1 + (currentPage - 1) * currentPages}</p>
                                    </div>
                                    <div className='w-[25%]  p-4 ml-0.5'>
                                        <p>{item.buildername}</p>
                                    </div>
                                    <div className='w-[15%]  p-4 ml-0.5'>
                                        <p>{item.country}</p>
                                    </div>
                                    <div className='w-[15%]  p-4'>
                                        <p>{item.city}</p>
                                    </div>
                                    <div className='w-[15%]  p-4'>
                                        <p>{item.suburb}</p>
                                    </div>
                                    <div className='w-[10%]  p-4 text-blue-500 cursor-pointer'>
                                        <Link to={`contacts/${item.buildername.split(` `).join(`-`).toLowerCase()}`} state={{ builderid: item.id , buildername : item.buildername}}><p>Contacts</p></Link>
                                    </div>
                                    <div className='w-[10%]  p-4 text-blue-500 cursor-pointer'>
                                    {/* admin/managebuilder/projects/:buildername */}
                                    
                                        <Link to={`/manage/managebuilder/manageproject/${item.buildername}`} state={{builderid : item.id, buildername : item.buildername ,hyperlinked : true}}>
                                            Projects
                                        </Link>
                                        {/* <Link to={`projects/${item.buildername.split(` `).join(`-`).toLowerCase()}`} state={{ builderid: item.id }}><p>Projects</p></Link> */}
                                    </div>
                                </div>
                                <div className='w-[15%] flex items-center'>
                                    <div className='w-1/2  p-4 ml-1'>
                                        <p>{item.id}</p>
                                    </div>
                                    <div className='w-1/2 flex justify-center items-center gap-2 ml-0.5'>
                                        <EditButton handleEdit={editBuilder} rowData={item}/>
                                        <DeleteButton handleDelete={deleteBuilder} rowData={item.id}/>
                        
                                    </div>
                                </div>
                            </div>
                        })}
                        {/* we get all the existing builders here */}
                        {isEditDialogue && <EditManageBuilder openDialog={isEditDialogue} setOpenDialog={setIsEditDialogue} builder={currentBuilder} fetchData={fetchBuilderData} currBuilder={currentBuilder} initialCountries={allCountry} initialStates={allState} initialCities={allCity} showCancel={openCancelModal} showSuccess={openEditSuccess} />}
                        {showDelete && <Delete openDialog={isDeleteDialogue} setOpenDialog={setIsDeleteDialogue} currentBuilder={currentBuilder} fetchData={fetchBuilderData} />}
                    </div>
                </div>


            </div>


            <div className='w-full h-12 flex justify-between px-6 bg-white fixed'>
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
                                // setCurrentPages(e.target.value);
                                
                                fetchQuantityData(e.target.value);
                                // fetchPageCountryData(e.target.value)
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
                    {downloadModal && <div className='h-[120px] w-[220px] bg-white shadow-xl rounded-md absolute bottom-12 right-24 flex-col items-center  justify-center p-5' ref={menuRef}>

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

            <Modal open={isManageBuidlerDialogue}
                fullWidth={true}
                maxWidth={'md'}
                className='flex justify-center items-center'
            >
                <div className='flex justify-center'>
                    <Draggable handle='div.move'>
                        <div className="w-[1050px] h-auto bg-white rounded-lg">
                            <div className="move cursor-move">
                                <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-lg">
                                    <div className="mr-[410px] ml-[410px]">
                                        <div className="text-[16px]"> New Builder</div>
                                    </div>
                                    <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                                        <img onClick={handleClose} className="w-[20px] h-[20px] cursor-pointer" src={Cross} alt="cross" />
                                    </div>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="h-auto w-full mt-[5px] ">
                                    <div className="flex gap-[48px] justify-center items-center">
                                        <div className=" space-y-[12px] py-[20px] px-[10px]">
                                            <div className="">
                                                <div className="text-[13px]">Builder Name<label className="text-red-500">*</label></div>
                                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="builderName" value={formValues.builderName} onChange={handleChange} />
                                                <div className="h-[12px] w-[230px] text-[9px] text-[#CD0000] absolute">{formErrors.builderName}</div>
                                            </div>
                                            <div className="">
                                                <div className="text-[13px]">Phone 1 <label className="text-red-500">*</label></div>
                                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="phone1" value={formValues.phone1} onChange={handleChange} />
                                                <div className="h-[12px] w-[230px] text-[9px] text-[#CD0000] absolute">{formErrors.phone1}</div>
                                            </div>
                                            <div className="">
                                                <div className="text-[14px]">Phone 2</div>
                                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="phone2" value={formValues.phone2} onChange={handleChange} />
                                                {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.phNo}</div> */}
                                            </div>
                                            <div className="">
                                                <div className="text-[13px]">Email 1</div>
                                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="email" name="email1" value={formValues.email1} onChange={handleChange} />

                                            </div>
                                            <div className="">
                                                <div className="text-[13px]">Email 2</div>
                                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="email" name="email2" value={formValues.email2} onChange={handleChange} />
                                                {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.desc}</div> */}
                                            </div>
                                            <div className="">
                                                <div className="text-[13px]">Address 1 <label className="text-red-500">*</label></div>
                                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="address1" value={formValues.address1} onChange={handleChange} />
                                                <div className="h-[12px] w-[230px] text-[9px] text-[#CD0000] absolute">{formErrors.address1}</div>
                                            </div>
                                            <div className="">
                                                <div className="text-[13px]">Address Line 2</div>
                                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="address2" value={formValues.address2} onChange={handleChange} />
                                                {/* <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text"  name="add"  /> */}
                                            </div>
                                        </div>
                                        <div className=" space-y-[12px]  px-[10px]">
                                            <div className="">
                                                <div className="text-sm">Country <label className="text-red-500">*</label></div>
                                                <select className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none"
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
                                                        // fetchStateData(res);
                                                    }}
                                                >

                                                    {allCountry && allCountry.map(item => {
                                                        return <option value={item.id}> {item.name}</option>
                                                        // if (item[0] == 5) {
                                                        //     return <option value={item[0]} selected>
                                                        //         {item[1]}
                                                        //     </option>
                                                        // } else {
                                                        //     return <option value={item[0]} >
                                                        //         {item[1]}
                                                        //     </option>
                                                        // }
                                                    })}
                                                </select>
                                                <div className="height-[10px] w-full text-[9.5px] text-[#CD0000] absolute ">{formErrors.country}</div>
                                            </div>
                                            <div className="">
                                                <div className="text-sm">State <label className="text-red-500">*</label></div>
                                                <select className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none"
                                                    name="state"
                                                    value={formValues.state}
                                                    defaultValue="Select State"
                                                    onChange={e => {
                                                        fetchCityData(e.target.value);
                                                        const existing = { ...formValues }
                                                        existing.state = e.target.value
                                                        existing.city = null
                                                        
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
                                                <div className="height-[10px] w-full text-[9.5px] text-[#CD0000] absolute ">{formErrors.state}</div>
                                            </div>
                                            <div className="">
                                                <div className="text-sm">City <label className="text-red-500">*</label></div>
                                                <select className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none"
                                                    name="city"
                                                    value={formValues.city}
                                                    defaultValue="Select City"
                                                    onChange={e => {
                                                        // fetchCityData(e.target.value);
                                                        
                                                        setFormValues((existing) => {
                                                            const newData = { ...existing, city: e.target.value }
                                                            return newData;
                                                        })

                                                    }}
                                                >
                                                    {/* <option value="none" hidden={true}>Select a City</option> */}
                                                    <option value="none" hidden> Select A City</option>
                                                    {allCity && allCity.map(item => (
                                                        <option value={item.id} >
                                                            {item.city}
                                                        </option>
                                                    ))}
                                                </select>
                                                <div className="height-[10px] w-full text-[9.5px] text-[#CD0000] absolute ">{formErrors.city}</div>
                                            </div>
                                            <div className="">
                                                <div className="text-[13px]">Suburb <label className="text-red-500">*</label></div>
                                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="suburb" value={formValues.suburb} onChange={handleChange} />
                                                <div className="h-[10px] w-[230px] text-[9px] text-[#CD0000] absolute">{formErrors.suburb}</div>
                                            </div>
                                            <div className="">
                                                <div className="text-[13px]">ZIP Code</div>
                                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="zip" value={formValues.zip} onChange={handleChange} />
                                            </div>
                                            <div className="">
                                                <div className="text-[13px]">Website</div>
                                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="website" value={formValues.website} onChange={handleChange} />

                                            </div>
                                            <div className="">
                                                <div className="text-[13px]">Comment</div>
                                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="comment" value={formValues.comment} onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className=" my-2 flex justify-center items-center gap-[10px]">

                                    <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' type="submit">Add</button>
                                    <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleClose}>Cancel</button>

                                </div>
                            </form>
                        </div>
                    </Draggable>
                </div>
            </Modal>

        </div>
    )
}

export default ManageBuilder
