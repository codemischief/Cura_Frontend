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
const ManageBuilderContact = () => {
    // we have the module here
    const menuRef = useRef()
    const params = useParams()
    let { state } = useLocation();
    console.log(state)
    console.log(params.builderid)
    // console.log(params)
    const [existingProjects, setExistingProjects] = useState([]);
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
        setPageLoading(true);
        const data = {
            "user_id": 1234,
            "rows": [
                "buildername",
                "builderid",
                "projectname",
                "addressline1",
                "addressline2",
                "suburb",
                "city",
                "state",
                "country",
                "zip",
                "nearestlandmark",
                "project_type",
                "mailgroup1",
                "mailgroup2",
                "website",
                "project_legal_status",
                "rules",
                "completionyear",
                "jurisdiction",
                "taluka",
                "corporationward",
                "policechowkey",
                "policestation",
                "maintenance_details",
                "numberoffloors",
                "numberofbuildings",
                "approxtotalunits",
                "tenantstudentsallowed",
                "tenantworkingbachelorsallowed",
                "tenantforeignersallowed",
                "otherdetails",
                "duespayablemonth",
                "dated",
                "createdby",
                "isdeleted",
                "id"
            ],
            "builderid": currBuilderId,
            "filters": [],
            "sort_by": [],
            "order": "asc",
            "pg_no": 0,
            "pg_size": 0
        };
        const response = await APIService.getProjectsByBuilderId(data)
        const res = await response.json()
        console.log(res)
        const result = res.data;
        setPageLoading(false);
        // console.log(result);
        setExistingProjects(result);
    }
    const fetchCountryData = async () => {
        setPageLoading(true);
        const data = { "user_id": 1234, "rows": ["id", "name"], "filters": [], "sort_by": [], "order": "asc", "pg_no": 0, "pg_size": 0 };
        const response = await APIService.getCountries(data)
        const result = (await response.json()).data;
        console.log(result);
        if (Array.isArray(result)) {
            setAllCountry(result);
        }
    }

    const fetchStateData = async (e) => {

        const data = { "user_id": userId || 1234, "country_id": 5 };
        const response = await APIService.getState(data);
        const result = (await response.json()).data;
        // console.log(result)
        if (Array.isArray(result)) {
            setAllState(result)
        }
    }

    const fetchCityData = async (d) => {
        const data = { "user_id": userId || 1234, "country_id": 5, "state_name": "Maharashtra" };
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
            "user_id": userId || 1234,
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
            "createdby": 1234,
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
        // console.log(e.target.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues)); // validate form and set error message
        console.log(formErrors)
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
    const handlePageChange = () => {

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

    return (
        <div >
            <Navbar />
            <SucessfullModal isOpen={showSucess} message="New Builder created succesfully " />
            <FailureModal isOpen={showFailure} message="Error! cannot create the builder" />
            <Delete isOpen={showDelete} currentBuilder={currentBuilderId} closeDialog={setShowDelete} fetchData={fetchBuilderData} />
            <div className='flex-col w-full h-full  bg-white'>
                <div className='flex-col'>
                    {/* this div will have all the content */}
                    <div className='w-full  flex-col px-6'>
                        {/* the top section of the div */}
                        <div className='h-1/2 w-full  flex justify-between items-center p-2 '>
                            <div className='flex items-center space-x-3'>
                                <div className='rounded-2xl  bg-[#EBEBEB] h-8 w-8 flex justify-center items-center'>
                                    <Link to="/admin/managebuilder"><img className='w-5 h-5' src={backLink} /></Link>
                                </div>
                                <div className='flex-col'>
                                    <h1 className="text-[18px]">Manage Builder Contact</h1>
                                    <p className="text-[14px]">Manage &gt; Manage Builder &gt; Builder Contact</p>
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
                                    <button className="bg-[#004DD7] text-white h-[36px] w-[280px] rounded-lg" onClick={handleOpen}>
                                        <div className="flex items-center justify-center gap-4">
                                            Add New Buider Contact
                                            <img className='h-[18px] w-[18px]' src={Add} alt="add" />
                                        </div>
                                    </button>
                                </div>

                            </div>

                        </div>
                        <div className="h-10 w-full flex items-center border-gray-400 border-b-[1px]">
                            <h1 className="font-bold text-[18px]">Builder Name : {params.buildername}</h1>
                        </div>
                        <div className='h-12 w-full bg-white'>
                            <div className='w-full h-12 flex items-center gap-52'>
                                <div className=' flex '>
                                    <div className='p-3'>

                                    </div>
                                </div>
                                <div className="flex items-center gap-24 ml-7">
                                    <div className="w-[37%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                        <input className="w-14 bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2" />
                                        <button className='p-1'><img src={Filter} className='h-[15px] w-[15px]' /></button>
                                    </div>
                                    <div className="w-[37%] flex items-center bg-[#EBEBEB] rounded-[5px] ml-5">
                                        <input className="w-14 bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2" />
                                        <button className='p-1'><img src={Filter} className='h-[15px] w-[15px]' /></button>
                                    </div>
                                    <div className="w-[37%] flex items-center bg-[#EBEBEB] rounded-[5px] ml-5">
                                        <input className="w-14 bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2" />
                                        <button className='p-1'><img src={Filter} className='h-[15px] w-[15px]' /></button>
                                    </div>
                                    <div className="w-[37%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                        <input className="w-14 bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2" />
                                        <button className='p-1'><img src={Filter} className='h-[15px] w-[15px]' /></button>
                                    </div>
                                    <div className="w-[37%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                        <input className="w-14 bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2" />
                                        <button className='p-1'><img src={Filter} className='h-[15px] w-[15px]' /></button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='w-full h-[400px] bg-white px-6  text-[12px]'>
                        <div className='w-full h-12 bg-[#F0F6FF] flex items-center gap-52'>
                            <div className=' flex '>
                                <div className='p-3'>
                                    <p>Sr.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-20">
                                <div className='  flex'>
                                    <div className='p-3'>
                                        <p>Contact Name <span className="font-extrabold">↑↓</span></p>
                                    </div>
                                </div>
                                <div className='  flex'>
                                    <div className='p-3'>
                                        <p>Builder Name <span className="font-extrabold">↑↓</span></p>
                                    </div>
                                </div>
                                <div className='  flex'>
                                    <div className='p-3'>
                                        <p>Job Title <span className="font-extrabold">↑↓</span></p>
                                    </div>
                                </div>
                                <div className='  flex'>
                                    <div className='p-3'>
                                        <p>Suburb <span className="font-extrabold">↑↓</span></p>
                                    </div>
                                </div>
                                <div className='  flex'>
                                    <div className='p-3'>
                                        <p>City </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-full h-[400px] overflow-auto'>
                            {/* we map our items here */}
                            {pageLoading && <div className='ml-5 mt-5'><LinearProgress /></div>}
                            {!pageLoading && existingProjects.map((item, index) => {
                                return <div className='w-full bg-white flex justify-between border-gray-400 border-b-[1px]' key={item.id}>
                                    <div className="w-[85%] flex min-h-0">
                                        <div className='w-[4%] flex  overflow-hidden'>
                                            <div className='p-3'>
                                                <p>{index + 1}</p>
                                            </div>
                                        </div>
                                        <div className='w-[12%]  flex overflow-hidden'>
                                            <div className='p-3'>
                                                <p>{item.projectname}</p>
                                            </div>
                                        </div>
                                        <div className='w-[12%]  flex overflow-hidden'>
                                            <div className='p-3'>
                                                <p>{item.buildername}</p>
                                            </div>
                                        </div>
                                        <div className='w-[12%]  flex overflow-hidden'>
                                            <div className='p-3'>
                                                <p>{item.suburb}</p>
                                            </div>
                                        </div>
                                        <div className='w-[14%]  flex overflow-hidden'>
                                            <div className='p-3'>
                                                <p>{item.otherdetails}</p>
                                            </div>
                                        </div>
                                        <div className='w-[12%]  flex overflow-hidden'>
                                            <div className='p-3'>
                                                <p>{item.mailgroup1}</p>
                                            </div>
                                        </div>
                                        <div className='w-[12%]  flex overflow-hidden'>
                                            <div className='p-3'>
                                                <p></p>
                                            </div>
                                        </div>
                                        <div className='w-[10%]  flex overflow-hidden'>
                                            <div className='p-3'>
                                                <p>{item.rules}</p>
                                            </div>
                                        </div>
                                        <div className='w-[12%]  flex overflow-hidden'>
                                            <div className='p-3'>
                                                <p></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-[15%] flex">
                                        <div className='w-1/2  flex overflow-hidden'>
                                            <div className='p-3 ml-1'>
                                                <p>{item.id}</p>
                                            </div>
                                        </div>
                                        <div className='w-1/2  flex overflow-hidden items-center p-3 justify-around '>
                                            <img className=' w-5 h-5' src={Edit} alt="edit" />
                                            <button onClick={() => { }}><img className=' w-5 h-5' src={Trash} alt="trash" /></button>
                                        </div>
                                    </div>

                                </div>
                            })}
                        </div>
                    </div>

                    <div className='w-full h-[250] flex justify-between justify-self-end px-6 fixed bottom-2 '>
                        {/* footer component */}
                        <div className='ml-2'>
                            <div className='flex items-center w-auto h-full'>
                                {/* items */}
                                {/* <Pagination count={Math.ceil(totalItems/currentPages)} onChange={handlePageChange} page={currentPage}/> */}

                            </div>
                        </div>
                        <div className='flex mr-10 justify-center items-center space-x-2 '>
                            <div className="flex mr-8 space-x-2 text-sm items-center">

                            </div>
                            <div className="flex text-sm">
                                {/* <p className="mr-11 text-gray-700">{totalItems} Items in {Math.ceil(totalItems/currentPages)} Pages</p> */}
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
                </div>

            </div>

            {/* modal goes here */}
            <Modal open={isManageBuidlerDialogue}
                fullWidth={true}
                maxWidth={'md'}
                className="flex justify-center items-center"
                 >
                <div className='flex justify-center'>
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

                                <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' type="submit" onClick={() => {}}>Save</button>
                                <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleClose}>Cancel</button>
                                {isLoading && <CircularProgress />}
                            </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ManageBuilderContact
