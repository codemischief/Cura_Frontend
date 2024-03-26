import React from 'react';
import { Outlet, Link } from "react-router-dom";
import backLink from "../../../assets/back.png";
import searchIcon from "../../../assets/searchIcon.png";
import nextIcon from "../../../assets/next.png";
import refreshIcon from "../../../assets/refresh.png";
import downloadIcon from "../../../assets/download.png";
import { useState, useEffect } from 'react';
import Navbar from "../../../Components/Navabar/Navbar";
import Cross from "../../../assets/cross.png";
import { Modal, Pagination, LinearProgress } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import { APIService } from '../../../services/API';
import Pdf from "../../../assets/pdf.png";
import Excel from "../../../assets/excel.png"
import Edit from "../../../assets/edit.png"
import Trash from "../../../assets/trash.png"
import Filter from "../../../assets/filter.png"
import ProjectInformation from "./ManageProjectInfoForm/ProjectInformation";
import ProjectDetails from "./ManageProjectInfoForm/ProjectDetails"
import BankDetails from "./ManageProjectInfoForm/BankDetails"
const ManageProjectInfo = () => {
    // we have the module here
    const [pageLoading, setPageLoading] = useState(false);
    const [existingProjectInfo, setExistingProjectInfo] = useState([]);
    const [currentPages, setCurrentPages] = useState(15);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [downloadModal, setDownloadModal] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [isSearchOn, setIsSearchOn] = useState(false);
    const [selectedDialogue, setSelectedDialogue] = useState(1);
    const selectFirst = () => {
        setSelectedDialogue(1);
     }
     const selectSecond = () => {
         setSelectedDialogue(2);
     }
     const selectThird = () => {
         setSelectedDialogue(3);
     }
     const selectFourth = () => {
         setSelectedDialogue(4);
     }
     const selectFifth = () => {
         setSelectedDialogue(5);
     }
    const fetchData = async () => {
        setPageLoading(true);
        const data = {
            "user_id": 1234,
            "rows": ["builderid","projectname","addressline1","addressline2","suburb","city","state","country","zip","nearestlandmark","project_type","mailgroup1","mailgroup2","website","project_legal_status","rules","completionyear","jurisdiction","taluka","corporationward","policechowkey","policestation","maintenance_details","numberoffloors","numberofbuildings","approxtotalunits","tenantstudentsallowed","tenantworkingbachelorsallowed","tenantforeignersallowed","otherdetails","duespayablemonth","dated","createdby","isdeleted","id"],
            "filters": [],
            "sort_by": [],
            "order": "asc",
            "pg_no": Number(currentPage),
            "pg_size": Number(currentPages),
            "search_key": isSearchOn ? searchInput : ""
        };
        const response = await APIService.getProjectInfo(data);
        const temp = await response.json();
        console.log(temp);
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingProjectInfo(result);
        console.log(result);
        setPageLoading(false);
    }
    const fetchPageData = async (pageNumber) => {
        setPageLoading(true);
        const data = {
            "user_id": 1234,
            "rows": ["id","buildername","projectname","addressline1","addressline2","suburb","city","state","country","zip","nearestlandmark","project_type","mailgroup1","mailgroup2","website","project_legal_status","rules","completionyear","jurisdiction","taluka","corporationward","policechowkey","policestation","maintenance_details","numberoffloors","numberofbuildings","approxtotalunits","tenantstudentsallowed","tenantworkingbachelorsallowed","tenantforeignersallowed","otherdetails","duespayablemonth","dated","createdby","isdeleted"],
            "filters": [],
            "sort_by": [],
            "order": "asc",
            "pg_no": Number(pageNumber),
            "pg_size": Number(currentPages),
            "search_key": isSearchOn ? searchInput : ""
        };
        const response = await APIService.getEmployees(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingProjectInfo(result);
        setPageLoading(false);
    }
    const fetchQuantityData = async (quantity) => {
        setPageLoading(true);
        console.log(searchInput);
        const data = {
            "user_id": 1234,
            "rows": ["id","buildername","projectname","addressline1","addressline2","suburb","city","state","country","zip","nearestlandmark","project_type","mailgroup1","mailgroup2","website","project_legal_status","rules","completionyear","jurisdiction","taluka","corporationward","policechowkey","policestation","maintenance_details","numberoffloors","numberofbuildings","approxtotalunits","tenantstudentsallowed","tenantworkingbachelorsallowed","tenantforeignersallowed","otherdetails","duespayablemonth","dated","createdby","isdeleted"
        ],
            "filters": [],
            "sort_by": [],
            "order": "asc",
            "pg_no": Number(currentPage),
            "pg_size": Number(quantity),
            "search_key": isSearchOn ? searchInput : ""
        };
        const response = await APIService.getEmployees(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingProjectInfo(result);
        setPageLoading(false);
    }
    useEffect(() => {
        fetchData();
    }, []);
    const selectedCountry = [
        "India", "USA", "UK", "Germany", "France", "Italy"
    ]
    const selectedState = [
        "State1", "State2", "State3", "State4"
    ]
    const selectedCity = [
        "City1", "City2", "City3", "City4"
    ]
    const entity = [
        "Entity1", "Entity1", "Entity1", "Entity1"
    ]
    const assignedRoles = [
        "Role1", "Role2", "Role3", "Role4"
    ]
    const userName = [
        "User1", "User2", "User3", "User4"
    ]
    // hardcoded for dropdown instances ********* End*************

    const initialValues = {
        employeeName: "",
        panNo: "",
        userName: "",
        doj: "",
        desc: "",
        email: "",
        employeeId: "",
        lob: "",
        dob: "",
        role: "",
        phNo: "",
        country: "",
        state: "",
        city: "",
        suburb: "",
        entity: ""

    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));

        // handle adding of data
        const data = {
            "user_id": 1234,
            "id": 100,
            "employeename": formValues.employeeName,
            "employeeid": formValues.employeeId,
            "roleid": 2,
            "dateofjoining": "13-01-2024 00:00:00",
            "dob": "13-01-2001 00:00:00",
            "panno": "abcd",
            "status": false,
            "phoneno": null,
            "email": null,
            "addressline1": "abcdefgh",
            "addressline2": "ijklmnop",
            "suburb": "Pune",
            "city": 847,
            "state": "Maharashta",
            "country": 5,
            "zip": null,
            "dated": "20-01-2020  00:00:00",
            "createdby": 1234,
            "isdeleted": false,
            "entityid": 10,
            "lobid": 100,
            "lastdateofworking": "20-02-2020 00:00:00",
            "designation": "New"
        }


    };
    // validate form and to throw Error message
    const validate = (values) => {
        const errors = {};
        if (!values.employeeName) {
            errors.employeeName = "Enter employee name";
        }
        if (!values.panNo) {
            errors.panNo = "Enter PAN number";
        }
        if (!values.userName) {
            errors.userName = "select userName";
        }
        if (!values.doj) {
            errors.doj = "Enter date of joining";
        }
        if (!values.desc) {
            errors.desc = "Enter Designamtion";
        }
        if (!values.email) {
            errors.email = "Enter email addresss";
        }
        if (!values.employeeId) {
            errors.employeeId = "Enter employee ID";
        }
        if (!values.lob) {
            errors.lob = "Select LOB";
        }
        if (!values.dob) {
            errors.dob = "Enter date of birth";
        }
        if (!values.role) {
            errors.role = "select role";
        }
        if (!values.phNo) {
            errors.phNo = "Enter phone number";
        }
        if (!values.country) {
            errors.country = " Select country";
        }
        if (!values.state) {
            errors.state = "Select state";
        }
        if (!values.city) {
            errors.city = "Select city";
        }
        if (!values.suburb) {
            errors.suburb = "Enter suburb";
        }
        if (!values.entity) {
            errors.entity = "Enter entity";
        }
        return errors;
    };

    const [isStateDialogue, setIsStateDialogue] = React.useState(false);
    const handleOpen = () => {
        setIsStateDialogue(true);
    };
    const handleClose = () => {
        setIsStateDialogue(false);
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
    const handleExcelDownload = async () => {
        const data = {
            "user_id": 1234,
            "rows": ["id", "employeename", "employeeid", "phoneno", "email", "userid", "roleid", "panno", "dateofjoining", "lastdateofworking", "status"],
            "filters": [],
            "sort_by": [],
            "order": "asc",
            "pg_no": 0,
            "pg_size": 0
        };
        const response = await APIService.getEmployees(data)
        const temp = await response.json();
        const result = temp.data;
        const worksheet = XLSX.utils.json_to_sheet(result);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "EmployeeData.xlsx");
        FileSaver.saveAs(workbook, "demo.xlsx");
    }
    const handleSearch = async () => {
        // console.log("clicked")
        setPageLoading(true);
        setIsSearchOn(true);
        const data = {
            "user_id": 1234,
            "rows": ["id", "employeename", "employeeid", "phoneno", "email", "userid", "roleid", "panno", "dateofjoining", "lastdateofworking", "status"],
            "filters": [],
            "sort_by": [],
            "order": "asc",
            "pg_no": 1,
            "pg_size": 15,
            "search_key": searchInput
        };
        const response = await APIService.getEmployees(data);
        const temp = await response.json();
        const result = temp.data;
        const t = temp.total_count;
        setTotalItems(t);
        setExistingEmployees(result);
        setPageLoading(false);
    }
    const handleCloseSearch = async () => {
        setIsSearchOn(false);
        setPageLoading(true);
        setSearchInput("");
        const data = {
            "user_id": 1234,
            "rows": ["id", "employeename", "employeeid", "phoneno", "email", "userid", "roleid", "panno", "dateofjoining", "lastdateofworking", "status"],
            "filters": [],
            "sort_by": [],
            "order": "asc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": ""
        };
        const response = await APIService.getEmployees(data);
        const temp = await response.json();
        const result = temp.data;
        const t = temp.total_count;
        setTotalItems(t);
        setExistingEmployees(result);
        setPageLoading(false);
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
                                <div className='rounded-2xl  bg-[#EBEBEB] h-8 w-8 flex justify-center items-center'>
                                    <img className='w-5 h-5 ' src={backLink} />
                                </div>

                                <div className='flex-col'>
                                    <h1 className='text-[18px]'>Manage Project</h1>
                                    <p className='text-[14px]'>Manage &gt; Manage Project</p>
                                </div>
                            </div>
                            <div className='flex space-x-2 items-center'>

                                <div className='flex relative'>
                                    {/* search button */}
                                    <input
                                        className="h-[36px] bg-[#EBEBEB] text-[#787878]"
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
                                    <button className="bg-[#004DD7] text-white h-[36px] w-[200px] rounded-lg" onClick={handleOpen}>
                                        Add New Project +
                                    </button>
                                </div>
                            </div>

                        </div>
                        <div className='h-12 w-full bg-white'>
                            <div className='w-full h-12 bg-white flex justify-between'>
                                <div className='w-[4.33%] flex'>
                                    <div className='p-2'>

                                    </div>
                                </div>
                                <div className='w-[8.33%]  flex'>
                                    <div className='p-2'>
                                        <input className="w-14 bg-[#EBEBEB]" />
                                        <button className='p-1'><img src={Filter} className='h-[17px] w-[17px]' /></button>
                                    </div>
                                </div>
                                <div className='w-[8.33%]  flex'>
                                    <div className='p-2'>
                                        <input className="w-14 bg-[#EBEBEB]" />
                                        <button className='p-1'><img src={Filter} className='h-[17px] w-[17px]' /></button>
                                    </div>
                                </div>
                                <div className='w-[8.33%]  flex'>
                                    <div className='p-2'>
                                        <input className="w-14 bg-[#EBEBEB]" />
                                        <button className='p-1'><img src={Filter} className='h-[17px] w-[17px]' /></button>
                                    </div>
                                </div>
                                <div className='w-[12.33%]  flex'>
                                    <div className='p-2'>
                                        <input className="w-14 bg-[#EBEBEB]" />
                                        <button className='p-1'><img src={Filter} className='h-[17px] w-[17px]' /></button>
                                    </div>
                                </div>
                                <div className='w-[8.33%]  flex'>
                                    <div className='p-2'>
                                        <input className="w-14 bg-[#EBEBEB]" />
                                        <button className='p-1'><img src={Filter} className='h-[17px] w-[17px]' /></button>
                                    </div>
                                </div>
                                <div className='w-[8.33%]  flex'>
                                    <div className='p-2'>
                                        <input className="w-14 bg-[#EBEBEB]" />
                                        <button className='p-1'><img src={Filter} className='h-[17px] w-[17px]' /></button>
                                    </div>
                                </div>
                                <div className='w-[8.33%]  flex'>
                                    <div className='p-2'>
                                        <input className="w-14 bg-[#EBEBEB]" />
                                        <button className='p-1'><img src={Filter} className='h-[17px] w-[17px]' /></button>
                                    </div>
                                </div>
                                <div className='w-[8.33%]  flex'>
                                    <div className='p-2'>
                                        <input className="w-14 bg-[#EBEBEB]" />
                                        <button className='p-1'><img src={Filter} className='h-[17px] w-[17px]' /></button>
                                    </div>
                                </div>
                                <div className='w-[8.33%]  flex'>
                                    <div className='p-2'>
                                        <input className="w-14 bg-[#EBEBEB]" />
                                        <button className='p-1'><img src={Filter} className='h-[17px] w-[17px]' /></button>
                                    </div>
                                </div>
                                <div className='w-[8.33%]  flex'>
                                    <div className='p-2 '>
                                        <input className="w-14 bg-[#EBEBEB]" />
                                        <button className='p-1'><img src={Filter} className='h-[17px] w-[17px]' /></button>
                                    </div>
                                </div>
                                <div className='w-[4.33%]  flex'>
                                    <div className='p-2'>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='w-full h-[400px] bg-white px-6'>
                        <div className='w-full h-12 bg-[#F0F6FF] flex justify-between'>
                            <div className='w-[3%] flex'>
                                <div className='p-3'>
                                    <p>Sr.</p>
                                </div>
                            </div>
                            <div className='w-[11%]  flex'>
                                <div className='p-3'>
                                    <p>Project Name </p>
                                </div>
                            </div>
                            <div className='w-[11%]  flex'>
                                <div className='p-3'>
                                    <p>Builder Name</p>
                                </div>
                            </div>
                            <div className='w-[10%]  flex'>
                                <div className='p-3'>
                                    <p>Suburb</p>
                                </div>
                            </div>
                            <div className='w-[14.4%]  flex'>
                                <div className='p-3'>
                                    <p>Other details/issues</p>
                                </div>
                            </div>
                            <div className='w-[10%]  flex'>
                                <div className='p-3'>
                                    <p>Mail Group</p>
                                </div>
                            </div>
                            <div className='w-[12.6%]  flex'>
                                <div className='p-3'>
                                    <p>Subscribed email</p>
                                </div>
                            </div>
                            <div className='w-[8%]  flex'>
                                <div className='p-3'>
                                    <p>Rules</p>
                                </div>
                            </div>
                            <div className='w-[8%]  flex'>
                                <div className='p-3'>
                                    <p>Tenet</p>
                                </div>
                            </div>
                            <div className='w-[4%]  flex'>
                                <div className='p-3'>
                                    <p>ID</p>
                                </div>
                            </div>
                            <div className='w-[8%]  flex'>
                                <div className='p-3'>
                                    <p>Edit</p>
                                </div>
                            </div>
                        </div>
                        <div className='w-full h-[450px] overflow-auto'>
                            {/* we map our items here */}
                            {pageLoading && <div className='ml-5 mt-5'><LinearProgress /></div>}
                            {!pageLoading && existingProjectInfo.map((item, index) => {
                                return <div className='w-full h-14 bg-white flex justify-between border-gray-400 border-b-[1px]' key={item.id}>
                                    <div className='w-[3%] flex overflow-hidden'>
                                        <div className='p-3'>
                                            <p>{index + 1}</p>
                                        </div>
                                    </div>
                                    <div className='w-[11%]  flex overflow-hidden'>
                                        <div className='p-3'>
                                            <p>{item.projectname}</p>
                                        </div>
                                    </div>
                                    <div className='w-[11%]  flex overflow-hidden'>
                                        <div className='p-3'>
                                            <p>{item.buildername}</p>
                                        </div>
                                    </div>
                                    <div className='w-[10%]  flex overflow-hidden'>
                                        <div className='p-3'>
                                            <p>{item.suburb}</p>
                                        </div>
                                    </div>
                                    <div className='w-[14.4%]  flex overflow-hidden'>
                                        <div className='p-3'>
                                            <p>{item.otherdetails}</p>
                                        </div>
                                    </div>
                                    <div className='w-[10%]  flex overflow-hidden'>
                                        <div className='p-3'>
                                            <p>{item.mailgroup1}</p>
                                        </div>
                                    </div>
                                    <div className='w-[12.6%]  flex overflow-hidden'>
                                        <div className='p-3'>
                                            <p></p>
                                        </div>
                                    </div>
                                    <div className='w-[8%]  flex overflow-hidden'>
                                        <div className='p-3'>
                                            <p>{item.rules}</p>
                                        </div>
                                    </div>
                                    <div className='w-[8%]  flex overflow-hidden'>
                                        <div className='p-3'>
                                            <p></p>
                                        </div>
                                    </div>
                                    <div className='w-[4%]  flex overflow-hidden'>
                                        <div className='p-3'>
                                            <p>{item.id}</p>
                                        </div>
                                    </div>
                                    <div className='w-[8%]  flex overflow-hidden items-center space-x-2 '>
                                        <img className=' w-5 h-5' src={Edit} alt="edit" />
                                        <button onClick={() => { }}><img className=' w-5 h-5' src={Trash} alt="trash" /></button>
                                    </div>
                                </div>
                            })}
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
                </div>

            </div>

            {/* modal goes here */}
            <Modal open={isStateDialogue}
                fullWidth={true}
                maxWidth={'md'} >
                <>
                    <div className='flex justify-center mt-[50px]'>
                        <div className="w-50 h-auto bg-white rounded-lg">
                            <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center">
                                <div className="mr-[410px] ml-[410px]">
                                    <div className="text-[16px]">New project</div>
                                </div>
                                <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white mr-2">
                                    <button onClick={handleClose}><img className="w-[20px] h-[20px] " src={Cross} alt="cross" /></button>
                                </div>
                            </div>
                            <div className="mt-1 flex bg-[#DAE7FF] justify-evenly items-center h-9">
                                <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-40" >
                                    <button onClick={selectFirst}><div>Project Information</div></button>
                                </div>
                                <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-40">
                                    <button onClick={selectSecond}><div>Project details</div></button>
                                </div>
                                <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-40">
                                    <button onClick={selectThird}><div>Bank details</div></button>
                                </div>
                                <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-40">
                                    <button  onClick={selectFourth}><div>Contacts</div></button>
                                </div>
                                <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-40">
                                    <button onClick={selectFifth}><div>Photos</div></button>
                                </div>
                            </div>
                            <form>
                                {selectedDialogue == 1 && <ProjectInformation />}
                                {selectedDialogue == 2 && <ProjectDetails />}
                                {selectedDialogue == 3 && <BankDetails />}
                                {selectedDialogue == 4 && <BankDetails />}
                                {selectedDialogue == 5 && <BankDetails />}

                                <div className="my-8 flex justify-center items-center gap-[10px]">
                                    <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' type="submit">Save</button>
                                    <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleClose}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            </Modal>
        </div>
    )
}

export default ManageProjectInfo
