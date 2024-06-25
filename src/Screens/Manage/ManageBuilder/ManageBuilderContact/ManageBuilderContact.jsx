import { CircularProgress, Modal, Pagination, LinearProgress } from "@mui/material";
import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import Navbar from "../../../../Components/Navabar/Navbar";
import FailureModal from '../../../../Components/modals/FailureModal';
import SucessfullModal from '../../../../Components/modals/SucessfullModal';
import backLink from "../../../../assets/back.png";
import Cross from "../../../../assets/cross.png";
import downloadIcon from "../../../../assets/download.png";
import Edit from "../../../../assets/edit.png";
import nextIcon from "../../../../assets/next.png";
import refreshIcon from "../../../../assets/refresh.png";
import Add from "./../../../../assets/add.png";
import searchIcon from "../../../../assets/searchIcon.png";
import Trash from "../../../../assets/trash.png";
import { APIService } from '../../../../services/API';
import Delete from '../Delete';
import EditManageBuilder from '../EditManageBuilder';
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
import Filter from "../../../../assets/filter.png"
import Draggable from "react-draggable";
import useAuth from "../../../../context/JwtContext";
const ManageBuilderContact = () => {
    // we have the module here
    const menuRef = useRef()
    const { user } = useAuth()
    const params = useParams()
    let { state } = useLocation();
    
    
    // 
    const [existingProjects, setExistingProjects] = useState([]);
    const [existingContacts, setExistingContacts] = useState([])
    const [pageLoading, setPageLoading] = useState(false);
    const [showSucess, setShowSucess] = useState(false);
    const [showFailure, setShowFailure] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [currentBuilder, setCurrentBuilder] = useState({});
    const [currentBuilderId, setCurrentBuilderId] = useState();
    const [deleted, setDeleted] = useState(false);
    const [allCountry, setAllCountry] = useState([]);
    const [selectedCountry, setselectedCountry] = useState("");
    const [allState, setAllState] = useState([]);
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [allCity, setAllCity] = useState([]);
    const [countryId, setcountryId] = useState("");
    const [userId, setUserId] = useState(0);
    const [totalItems, setTotalItems] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [currentPages, setCurrentPages] = useState(15)
    const [currBuilderId, setCurrBuilderId] = useState(state.builderid)
    const fetchUserId = async () => {
        const response = await authService.getUserId()

        setUserId(response)

    }
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
        
        const data = {
            "user_id": user.id,
            "builderid": 101,
            "rows": [
                "id",
                "buildername",
                "builderid",
                "contactname",
                "jobtitle",
                "businessphone",
                "homephone",
                "mobilephone",
                "addressline1",
                "addressline2",
                "suburb",
                "city",
                "state",
                "country",
                "zip",
                "notes",
                "dated",
                "createdby",
                "isdeleted"
            ],
            "filters": [],
            "sort_by": [
                "id"
            ],
            "order": "desc",
            "pg_no": 0,
            "pg_size": 0
        }
        const response = await APIService.getBuilderContactsById(data);
        const res = await response.json()
        
        setPageLoading((prev) => false)
        setExistingContacts((prev) => res.data)
    }
    const fetchCountryData = async () => {
        setPageLoading(true);
        const data = { "user_id": user.id, "rows": ["id", "name"], "filters": [], "sort_by": [], "order": "asc", "pg_no": 0, "pg_size": 0 };
        const response = await APIService.getCountries(data)
        const result = (await response.json()).data;
        
        if (Array.isArray(result)) {
            setAllCountry(result);
        }
    }

    const fetchStateData = async (e) => {

        const data = { "user_id": userId || user.id, "country_id": 5 };
        const response = await APIService.getState(data);
        const result = (await response.json()).data;
        // 
        if (Array.isArray(result)) {
            setAllState(result)
        }
    }

    const fetchCityData = async (d) => {
        const data = { "user_id": userId || user.id, "country_id": 5, "state_name": "Maharashtra" };
        const response = await APIService.getCities(data);
        const result = (await response.json()).data;
        if (Array.isArray(result)) {
            setAllCity(result)
        }
    }

    const deleteBuilder = async (item) => {
        setShowDelete(true);
        setCurrentBuilderId(item);
        setDeleted(true);
    }

    const addNewBuilder = async () => {
        const data = {
            "user_id": userId || user.id,
            "buildername": formValues.builderName,
            "phone1": formValues.phone1,
            "phone2": formValues.phone2,
            "email1": formValues.email1,
            "addressline1": formValues.address1,
            "addressline2": formValues.address2,
            "suburb": "deccan",
            "city": 360,
            "state": "maharastra",
            "country": 5,
            "zip": formValues.zip,
            "website": formValues.website,
            "comments": formValues.comment,
            "dated": "10-03-2024 08:29:00",
            "createdby": user.id,
            "isdeleted": false
        };
        const response = await APIService.addNewBuilder(data);

        if (response.ok) {
            setIsLoading(false);
            openSuccessModal();
        } else {
            setIsLoading(false);
            openFailureModal();
        }
        fetchBuilderData();
    }

    useEffect(() => {
        // fetchUserId();
        fetchBuilderData();
        fetchCountryData();
        fetchCityData();
        fetchStateData();
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
        builderName: "",
        phone1: "",
        phone2: "",
        email1: "",
        email2: "",
        address1: "",
        address2: "",
        country: "",
        state: "",
        city: "",
        zip: "",
        website: "",
        comment: "",
        suburb: ""
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
        
        if (formValues.builderName == "") {
            return;
        }
        if (formValues.address1 == "") {
            return;
        }
        if (formValues.phone1 == "") {
            return;
        }

        // if(formValues.)
        setIsLoading(true);
        addNewBuilder();
    };
    // validate form and to throw Error message
    const validate = (values) => {
        const errors = {};
        if (!values.builderName) {
            errors.builderName = "Enter Builder name";
        }
        if (!values.phone1) {
            errors.phone1 = "Enter Phone number";
        }
        if (!values.email1) {
            errors.email1 = "Enter Email";
        }
        if (!values.address1) {
            errors.address1 = "Enter Builder Adress";
        }
        return errors;
    };

    const [isManageBuidlerDialogue, setIsManageBuidlerDialogue] = React.useState(false);
    const handleOpen = () => {
        setIsManageBuidlerDialogue(true);
    };
    const handleClose = () => {
        setIsManageBuidlerDialogue(false);
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
    const handleDownload = () => {
        const worksheet = XLSX.utils.json_to_sheet(existingBuilders);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "BuilderData.xlsx");
        FileSaver.saveAs(workbook, "demo.xlsx");
    }

    const handleSearch = async () => {
        setPageLoading(true);
        setCurrentPage(1)
        const data = {
            "user_id": user.id,
            "rows": [
                "id",
                "buildername",
                "builderid",
                "contactname",
                "jobtitle",
                "businessphone",
                "homephone",
                "mobilephone",
                "addressline1",
                "addressline2",
                "suburb",
                "city",
                "state",
                "country",
                "zip",
                "notes",
                "dated",
                "createdby",
                "isdeleted"
            ],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 0,
            "pg_size": 0,
            "search_key" : searchInput
        };
        const response = await APIService.getBuilderContactsById(data);
        const res = await response.json()
        
        setPageLoading((prev) => false)
        setExistingContacts((prev) => res.data)
    }

    const handleCloseSearch = async () => {
        setPageLoading(true);
        setSearchInput("");
        setIsSearchOn(false);
        setCurrentPage(1);
        const data = {
            "user_id": user.id,
            "rows": [
                "id",
                "buildername",
                "builderid",
                "contactname",
                "jobtitle",
                "businessphone",
                "homephone",
                "mobilephone",
                "addressline1",
                "addressline2",
                "suburb",
                "city",
                "state",
                "country",
                "zip",
                "notes",
                "dated",
                "createdby",
                "isdeleted"
            ],
            "filters": filterState,
            "sort_by": [sortField],
            "order": "desc",
            "pg_no": 0,
            "pg_size": 0,
            "search_key" : ""
        };
        const response = await APIService.getNewBuilderInfo(data)
        const res = await response.json()
        
        const result = res.data.builder_info;
        setTotalItems(res.total_count);
        
        setPageLoading(false);
        // 
        setExistingBuilders(result);
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

    const [searchInput, setSearchInput] = useState("")

    const handleSort = async (field) => {
        setPageLoading(true);
        const data = {
            "user_id": user.id,
            "rows": ["id", "buildername", "phone1", "phone2", "email1", "email2", "addressline1", "addressline2", "suburb", "city", "state", "country", "zip", "website", "comments", "dated", "createdby", "isdeleted"],
            "filters": filterState,
            "sort_by": [field],
            "order": !flag ? "asc" : "desc",
            "pg_no": Number(currentPage),
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

    return (
        <div className="h-screen">
            <div className='h-[calc(100vh_-_7rem)] w-full  px-10'>
                <div className='h-16 w-full  flex justify-between items-center p-2  border-gray-300 border-b-2'>
                    <div className='flex items-center space-x-3'>
                        <div className='rounded-2xl  bg-[#EBEBEB] h-8 w-8 flex justify-center items-center '>
                            <Link to="/dashboard"><img className='h-5 w-5' src={backLink} /></Link>
                        </div>

                        <div className='flex-col'>
                            <h1 className='text-[18px]'>Manage Builder Contact</h1>
                            <p className='text-[14px]'>Manage &gt;  Manage Builder &gt; Contact </p>
                        </div>
                    </div>
                    <div className='flex space-x-2 items-center'>

                        <div className='flex relative'>
                            {/* search button */}
                            <input
                                className="h-[36px] bg-[#EBEBEB] text-[#787878] pl-2"
                                type="text"
                                placeholder="  Search"
                                value={searchInput}
                                onChange={(e) => {
                                    setSearchInput(e.target.value);
                                }}
                            />
                            <button onClick={handleCloseSearch}><img src={Cross} className='absolute w-[20px] h-[20px] left-[160px] top-2' /></button>
                            <div className="h-[36px] w-[40px] bg-[#004DD7] flex items-center justify-center rounded-r-lg">
                                <button onClick={handleSearch}><img className="h-[26px] " src={searchIcon} alt="search-icon" /></button>
                            </div>
                        </div>

                        <div>
                            {/* button */}
                            <button className="bg-[#004DD7] text-white h-[36px] w-[250px] rounded-lg" onClick={handleOpen}>
                                <div className="flex items-center justify-center gap-4 text-[14px]">
                                    Add New Contact
                                    <img className='h-[18px] w-[18px]' src={Add} alt="add" />
                                </div>
                            </button>
                        </div>

                    </div>

                </div>




                <div className='h-12 w-full bg-white'>
                    <div className='w-full h-12 bg-white flex justify-between'>
                        <div className="w-[85%] flex">
                            <div className='w-[5%] flex'>
                                <div className='p-3'>
                                    {/* <p>Sr.</p> */}
                                </div>
                            </div>
                            <div className='w-[13%] px-3 py-2.5 '>
                                {/* <div className="w-[80%] flex items-center bg-[#EBEBEB] rounded-[5px] ">
                                    <input className="w-[75%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" value={clientNameInput} onChange={(e) => setClientNameInput(e.target.value)} />
                                    <button className='px-1 py-2 w-[25%]'><img src={Filter} className='h-3 w-3' onClick={() => { setClientNameFilter((prev) => !prev) }} /></button>
                                </div>

                                {clientNameFilter && <CharacterFilter inputVariable={clientNameInput} setInputVariable={setClientNameInput} handleFilter={newHandleFilter} filterColumn='clientname' menuRef={menuRef} />} */}

                            </div>

                            <div className='w-[11%] px-3 py-2.5 '>
                                {/* <div className="w-[90%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-[73%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" value={clientTypeNameInput} onChange={(e) => setClientTypeNameInput(e.target.value)} />
                                    <button className='px-1 py-2 w-[27%]'><img src={Filter} className='h-3 w-3' onClick={() => { setClientTypeNameFilter((prev) => !prev) }} /></button>
                                </div>
                                {clientTypeNameFilter && <CharacterFilter inputVariable={clientTypeNameInput} setInputVariable={setClientTypeNameInput} handleFilter={newHandleFilter} filterColumn='clienttypename' menuRef={menuRef} />} */}

                            </div>

                            <div className='w-[8%] px-3 py-2.5'>
                                {/* <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-[65%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" value={tenantOfTypeNameInput} onChange={(e) => setTenantOfTypeNameInput(e.target.value)} />
                                    <button className='px-1 py-2 w-[35%]'><img src={Filter} className='h-3 w-3' onClick={() => { setTenantOfTypeNameFilter((prev) => !prev) }} /></button>
                                </div>
                                {tenantOfTypeNameFilter && <CharacterFilter inputVariable={tenantOfTypeNameInput} setInputVariable={setTenantOfTypeNameInput} handleFilter={newHandleFilter} menuRef={menuRef} filterColumn='tenantofname' />} */}

                            </div>

                            <div className='w-[8%] px-3 py-2.5'>
                                {/* <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-[65%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" value={tenantOfPropertyInput} onChange={(e) => setTenantOfPropertyInput(e.target.value)} />
                                    <button className='px-1 py-2 w-[35%]'><img src={Filter} className='h-3 w-3' onClick={() => { setTenantOfPropertyFilter((prev) => !prev) }} /></button>
                                </div>
                                {tenantOfPropertyFilter && <CharacterFilter inputVariable={tenantOfPropertyInput} setInputVariable={setTenantOfPropertyInput} handleFilter={newHandleFilter} menuRef={menuRef} filterColumn='tenantofpropertyname' />} */}
                                {/* {tenantOfPropertyFilter && <CharacterFilter handleFilter={handleFilter} menuRef={menuRef} filterColumn='tenentof' />} } */}

                            </div>

                            <div className='w-[8%]  px-3 py-2.5'>
                                {/* <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-[65%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" value={countryInput} onChange={(e) => setCountryInput(e.target.value)} />
                                    <button className='px-1 py-2 w-[35%]'><img src={Filter} className='h-3 w-3' onClick={() => { setCountryFilter((prev) => !prev) }} /></button>
                                </div>
                                {countryFilter && <CharacterFilter inputVariable={countryInput} setInputVariable={setCountryInput} handleFilter={newHandleFilter} filterColumn='country' menuRef={menuRef} />} */}
                            </div>

                            <div className='w-[6%] px-3 py-2.5'>
                                {/* <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-[50%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" value={cityInput} onChange={(e) => setCityInput(e.target.value)} />
                                    <button className='px-1 py-2 w-[50%]'><img src={Filter} className='h-3 w-3' onClick={() => { setCityFilter((prev) => !prev) }} /></button>
                                </div>
                                {cityFilter && <CharacterFilter inputVariable={cityInput} setInputVariable={setCityInput} filterColumn='city' menuRef={menuRef} handleFilter={newHandleFilter} />} */}
                            </div>

                            <div className='w-[10%] px-3 py-2.5'>
                                {/* <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-[72%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" value={phoneInput} onChange={(e) => setPhoneInput(e.target.value)} />
                                    <button className='px-1 py-2 w-[28%]'><img src={Filter} className='h-3 w-3' onClick={() => { setPhoneFilter((prev) => !prev) }} /></button>
                                </div>
                                {phoneFilter && <CharacterFilter inputVariable={phoneInput} setInputVariable={setPhoneInput} filterColumn='mobilephone' handleFilter={newHandleFilter} menuRef={menuRef} />} */}

                            </div>

                            <div className='w-[11%] px-3 py-2.5'>
                                {/* <div className="w-[80%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-[70%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" value={email1Input} onChange={(e) => setEmail1Input(e.target.value)} />
                                    <button className='px-1 py-2 w-[30%]'><img src={Filter} className='h-3 w-3' onClick={() => { setEmail1Filter((prev) => !prev) }} /></button>
                                </div>
                                {email1Filter && <CharacterFilter inputVariable={email1Input} setInputVariable={setEmail1Input} filterColumn='email1' handleFilter={newHandleFilter} menuRef={menuRef} />} */}
                            </div>

                            <div className='w-[9%] px-3 py-2.5'>
                                {/* <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-[70%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" value={employerInput} onChange={(e) => setEmployerInput(e.target.value)} />
                                    <button className='px-1 py-2 w-[30%]'><img src={Filter} className='h-3 w-3' onClick={() => { setEmployerFilter((prev) => !prev) }} /></button>
                                </div>
                                {employerFilter && <CharacterFilter inputVariable={employerInput} setInputVariable={setEmployerInput} filterColumn='employername' handleFilter={newHandleFilter} menuRef={menuRef} />} */}
                            </div>

                        </div>
                        <div className="w-[15%] ">
                            <div className='w-1/2   p-3'>
                                {/* <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-[63%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" value={idFilterInput} onChange={(e) => setidFilterInput(e.target.value)} />
                                    <button className='px-1 py-2 w-[37%]'><img src={Filter} className='h-3 w-3' onClick={() => { setIdFilter((prev) => !prev) }} /></button>
                                </div>
                                {idFilter && <NumericFilter inputVariable={idFilterInput} setInputVariable={setidFilterInput} columnName='id' handleFilter={newHandleFilter} menuRef={menuRef} />} */}
                            </div>

                            <div className='w-1/2  flex'>
                                <div className='p-3'>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className='h-[calc(100vh_-_14rem)] w-full text-[12px]'>
                    <div className='w-full h-12 bg-[#F0F6FF] flex justify-between border-gray-400 border-b-[1px]'>
                        <div className="w-[85%] flex items-center">
                            <div className='w-[5%] flex '>
                                <div className='px-3'>
                                    <p>Sr.</p>
                                </div>
                            </div>
                            <div className='w-[19%]  flex'>
                                <div className='px-3'>
                                    <p>Contact Name <button onClick={() => handleSort('contactname')}> <span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[19%]  flex'>
                                <div className='px-3'>
                                    <p>Builder Name <button onClick={() => handleSort('buildername')}> <span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[19%] flex'>
                                <div className='px-3'>
                                    <p>Job Title <button onClick={() => handleSort('jobtitle')}> <span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[19%] flex'>
                                <div className='px-3 '>
                                    <p>Suburb
                                        <button onClick={() => handleSort('suburb')}> <span className="font-extrabold">↑↓</span></button>
                                    </p>
                                </div>
                            </div>
                            <div className='w-[19%] flex'>
                                <div className='px-3'>
                                    <p>City<button onClick={() => handleSort('city')}> <span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                        </div>
                        <div className="w-[15%] flex items-center">
                            <div className='w-1/2 flex'>
                                <div className='px-3 '>
                                    <p>ID <button onClick={() => handleSort('id')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-1/2 flex'>
                                <div className='px-3 '>
                                    <p>Edit</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full h-[calc(100vh_-_18rem)] overflow-y-auto overflow-x-hidden'>
                        {pageLoading && <div className=''><LinearProgress /></div>}
                        {!pageLoading && existingContacts && existingContacts.length == 0 && <div className='h-10 border-gray-400 border-b-[1px] flex items-center'>
                            <h1 className='ml-10'>No Records To Show</h1>
                        </div>}
                        {!pageLoading && existingContacts && existingContacts.map((item, index) => {
                            return <div className='w-full h-10 bg-white flex justify-between items-center border-gray-400 border-b-[1px]'>
                                <div className="w-[100%] flex items-center">
                                    <div className='w-[5%] flex'>
                                        <div className='px-3'>
                                            <p>{index + 1 + (currentPage - 1) * currentPages}</p>
                                        </div>
                                    </div>
                                    <div className='w-[19%] flex'>
                                        <div className='px-3'>
                                            <p>{item.contactname}</p>
                                        </div>
                                    </div>
                                    <div className='w-[19%] flex'>
                                        <div className='px-3'>
                                            <p>{item.buildername}</p>
                                        </div>
                                    </div>
                                    <div className='w-[19%] flex'>
                                        <div className='px-3'>
                                            <p>{item.jobtitle}</p>
                                        </div>
                                    </div>
                                    <div className='w-[19%] flex'>
                                        <div className='px-3'>
                                            <p>{item.suburb}</p>
                                        </div>
                                    </div>
                                    <div className='w-[19%] flex'>
                                        <div className='px-3'>
                                            <p>{item.city}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[15%] flex">
                                    <div className='w-1/2 flex'>
                                        <div className='p-3'>
                                            <p>{item.id}</p>
                                        </div>
                                    </div>
                                    <div className='w-1/2  flex'>
                                        <div className='px-3 flex space-x-2'>
                                            <img className='w-5 h-5 cursor-pointer' src={Edit} alt="edit" onClick={() => handleEdit(item.id)} />
                                            <img className='w-5 h-5 cursor-pointer' src={Trash} alt="trash" onClick={() => { openDelete(item.id) }} />
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
                    {/* <div className='flex items-center w-auto h-full'>
                        <Pagination count={Math.ceil(totalItems / currentPages)} onChange={handlePageChange} page={currentPage} />
                    </div> */}
                </div>
                <div className='flex mr-10 justify-center items-center space-x-2 '>
                    {/* <div className="flex mr-8 space-x-2 text-sm items-center">
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
                    </div> */}
                    {/* <div className="flex text-sm">
                        <p className="mr-11 text-gray-700">{totalItems} Items in {Math.ceil(totalItems / currentPages)} Pages</p>
                    </div> */}
                    {downloadModal && <div className='h-[120px] w-[220px] bg-white shadow-xl rounded-md absolute bottom-12 right-24 flex-col items-center justify-center  p-5'>
                        <button onClick={() => setDownloadModal(false)}><img src={Cross} className='absolute top-1 right-1 w-4 h-4' /></button>

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
                        <button onClick={() => { }}><p>Refresh</p></button>
                        <img src={refreshIcon} className="h-2/3" />
                    </div>
                    <div className='border-solid border-black border-[1px] w-28 rounded-md h-10 flex items-center justify-center space-x-1 p-2'>
                        {/* download */}
                        <button onClick={() => { }}><p>Download</p></button>
                        <img src={downloadIcon} className="h-2/3" />
                    </div>
                </div>
            </div>

            {/* modal goes here */}
            <Modal open={isManageBuidlerDialogue}
                fullWidth={true}
                maxWidth={'md'}
                className="flex justify-center items-center"
            >
                <div className='flex justify-center'>
                    <Draggable>
                        <div className="w-[1050px] h-auto bg-white rounded-lg">
                            <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-t-lg">
                                <div className="mr-[360px] ml-[360px]">
                                    <div className="text-[16px]">New Builder Contact</div>
                                </div>
                                <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                                    <img onClick={handleClose} className="w-[20px] h-[20px] cursor-pointer" src={Cross} alt="cross" />
                                </div>
                            </div>

                            <div className="h-auto w-full mt-[5px] ">
                                <div className="flex gap-[48px] justify-center">
                                    <div className=" space-y-[10px] pt-[20px] px-[10px]">
                                        <div className="">
                                            <div className="text-[13px]">Builder Name<label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="builderName" value={formValues.builderName} onChange={handleChange} />
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.builderName}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Contact Name <label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="phone1" value={formValues.phone1} onChange={handleChange} />
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.phone1}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Job Title <label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="phone2" value={formValues.phone2} onChange={handleChange} />
                                            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.phNo}</div> */}
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Email </div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="email" name="email1" value={formValues.email1} onChange={handleChange} />
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.email1}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Business Phone <label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="email" name="email2" value={formValues.email2} onChange={handleChange} />
                                            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.desc}</div> */}
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Mobile Phone </div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="address1" value={formValues.address1} onChange={handleChange} />
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.address1}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Address Line 1</div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="address2" value={formValues.address2} onChange={handleChange} />
                                            {/* <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text"  name="add"  /> */}
                                        </div>
                                    </div>
                                    <div className=" space-y-[12px] py-[20px] px-[10px]">
                                        <div className="">
                                            <div className="text-[13px]">Country <label className="text-red-500">*</label></div>
                                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                                                name="country"
                                                value={formValues.country}
                                                defaultValue="Select Country"
                                                onChange={e => {
                                                    setselectedCountry(e.target.value);
                                                    fetchStateData(e);
                                                    setFormValues((existing) => {
                                                        const newData = { ...existing, country: e.target.value }
                                                        return newData;
                                                    })
                                                    // fetchStateData(res);
                                                }}
                                            >
                                                {allCountry && allCountry.map(item => (
                                                    <option value={item}>
                                                        {item[1]}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.country}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">State <label className="text-red-500">*</label></div>
                                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                                                name="state"
                                                value={formValues.state}
                                                defaultValue="Select State"
                                                onChange={e => {
                                                    setSelectedState(e.target.value);
                                                    fetchCityData(e)
                                                    setFormValues((existing) => {
                                                        const newData = { ...existing, state: e.target.value }
                                                        return newData;
                                                    })
                                                    // fetchCityData(selectedState);
                                                }} >
                                                {allState && allState.map(item => (
                                                    <option value={item}>
                                                        {item}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.state}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">City <label className="text-red-500">*</label></div>
                                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" onChange={(e) => {
                                                setFormValues((existing) => {
                                                    const newData = { ...existing, city: e.target.value };
                                                    return newData;
                                                })
                                            }}>
                                                {allCity && allCity.map((item) => {
                                                    return <option value={item}>
                                                        {item.city}
                                                    </option>

                                                })}
                                            </select>

                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.city}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Suburb <label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="zip" value={formValues.zip} onChange={handleChange} />
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Zip Code </div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="website" value={formValues.website} onChange={handleChange} />

                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Home Phone</div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="comment" value={formValues.comment} onChange={handleChange} />
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Address Line 2</div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="comment" value={formValues.comment} onChange={handleChange} />
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Notes</div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="comment" value={formValues.comment} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="my-2 flex justify-center items-center gap-[10px]">

                                <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' type="submit" onClick={() => { }}>Save</button>
                                <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleClose}>Cancel</button>
                                {isLoading && <CircularProgress />}
                            </div>
                        </div>
                    </Draggable>
                </div>
            </Modal>
        </div>
    )
}

export default ManageBuilderContact
