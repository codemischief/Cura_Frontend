import React from 'react';
import { Outlet, Link } from "react-router-dom";
import backLink from "../../../assets/back.png";
import searchIcon from "../../../assets/searchIcon.png";
import nextIcon from "../../../assets/next.png";
import refreshIcon from "../../../assets/refresh.png";
import downloadIcon from "../../../assets/download.png";
import { useState, useEffect,useRef } from 'react';
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
import Add from "../../../assets/add.png";
import EditManageEmployee from './EditManageEmployee';
import SucessfullModal from '../../../Components/modals/SucessfullModal';
const ManageEmployees = () => {

    const menuRef = useRef();
    // we have the module here
    const [pageLoading, setPageLoading] = useState(false);
    const [existingEmployees, setExistingEmployees] = useState([]);
    const [currentPages, setCurrentPages] = useState(15);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [downloadModal, setDownloadModal] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [isSearchOn, setIsSearchOn] = useState(false);
    const [allCountry, setAllCountry] = useState([]);
    const [allState, setAllState] = useState([]);
    const [allCity, setAllCity] = useState([]);
    const [allUsername, setAllUsername] = useState([]);
    const [allRoles, setAllRoles] = useState([]);
    const [allEntities, setAllEntites] = useState([]);
    const [allLOB, setAllLOB] = useState([]);
    const [currCountry, setCurrCountry] = useState(-1);
    const [isEmployeeDialogue, setIsEmployeeDialogue] = useState(false);
    const [isEditDialogue, setIsEditDialogue] = React.useState(false);
    const [currItem, setCurrItem] = useState({});
    const [showAddSuccess, setShowAddSuccess] = useState(false);
    const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

    const [empNameFilter,setEmpNameFilter] = useState(false); 
    const [empNameInput,setEmpNameInput] = useState(""); 
    const [empIdFilter,setEmpIdFilter] = useState(false); 
    const [empIdInput,setEmpIdInput] = useState(""); 
    const [phoneFilter,setPhoneFilter] = useState(false); 
    const [phoneInput,setPhoneInput] = useState(""); 
    const [emailFilter,setEmailFilter] = useState(false); 
    const [emailInput,setEmailInput] = useState(""); 
    const [roleFilter,setRoleFilter] = useState(false); 
    const [roleInput,setRoleInput] = useState(""); 
    const [pannoFilter,setPannoFilter] = useState(false); 
    const [pannoInput,setPannoInput] = useState(""); 
    const [dojFilter,setDojFilter] = useState(false); 
    const [dojInput,setDojInput] = useState(""); 
    const [ldowFilter,setLdowFilter] = useState(false); 
    const [ldowInput,setLdowInput] = useState(""); 
    const [statusFilter,setStatusFilter] = useState(false); 
    const [statusInput,setStatusInput] = useState(""); 
    const [idFilter,setIdFilter] = useState(false); 
    const [idInput,setIdInput] = useState(""); 
    // const [filterArray,setFilterArray] = useState([]);

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
    const fetchUsersData = async () => {
        setPageLoading(true);
        // const data = { "user_id":  1234 };
        const data = { "user_id": 1234 };
        const response = await APIService.getUsers(data)
        const result = (await response.json());

        console.log(result.data);
        console.log('hey')
        setFormValues((existing) => {
            return { ...existing, userName: result.data[0].id }
        })
        if (Array.isArray(result.data)) {
            setAllUsername(result.data);
        }
    }

    const fetchRoleData = async () => {
        setPageLoading(true);
        // const data = { "user_id":  1234 };
        const data = { "user_id": 1234 };
        const response = await APIService.getRoles(data)
        const result = (await response.json());
        console.log(result.data);
        setFormValues((existing) => {
            return { ...existing, role: result.data[0].id }
        })
        if (Array.isArray(result.data)) {
            setAllRoles(result.data);
        }
    }

    const fetchEntitiesData = async () => {
        setPageLoading(true);
        // const data = { "user_id":  1234 };
        const data = { "user_id": 1234 };
        const response = await APIService.getEntityAdmin(data)
        const result = (await response.json());
        console.log(result.data);
        setFormValues((existing) => {
            return { ...existing, entity: result.data[0][0] }
        })
        if (Array.isArray(result.data)) {
            setAllEntites(result.data);
        }
    }

    const fetchLobData = async () => {
        setPageLoading(true);
        const data = {
            "user_id": 1234,
            "rows": ["id", "name", "lob_head", "company"],
            "filters": [],
            "sort_by": [],
            "order": "asc",
            "pg_no": Number(currentPage),
            "pg_size": Number(currentPages)
        };
        const response = await APIService.getLob(data);
        const result = (await response.json());
        console.log(result.data);
        setFormValues((existing) => {
            return { ...existing, lob: result.data[0].id }
        })
        if (Array.isArray(result.data)) {
            setAllLOB(result.data);
        }
    }

    const fetchData = async () => {
        setPageLoading(true);
        const data = {
            "user_id": 1234,
            "rows": ["id", "employeename", "employeeid", "phoneno", "email", "userid", "roleid", "panno", "dateofjoining", "lastdateofworking", "status"],
            "filters": [],
            "sort_by": [],
            "order": "asc",
            "pg_no": Number(currentPage),
            "pg_size": Number(currentPages),
            "search_key": isSearchOn ? searchInput : ""
        };
        const response = await APIService.getEmployees(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingEmployees(result);
        setPageLoading(false);
    }
    const fetchPageData = async (pageNumber) => {
        setPageLoading(true);
        const data = {
            "user_id": 1234,
            "rows": ["id", "employeename", "employeeid", "phoneno", "email", "userid", "roleid", "panno", "dateofjoining", "lastdateofworking", "status"],
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
        setExistingEmployees(result);
        setPageLoading(false);
    }
    const fetchQuantityData = async (quantity) => {
        setPageLoading(true);
        console.log(searchInput);
        const data = {
            "user_id": 1234,
            "rows": ["id", "employeename", "employeeid", "phoneno", "email", "userid", "roleid", "panno", "dateofjoining", "lastdateofworking", "status"],
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
        setExistingEmployees(result);
        setPageLoading(false);
    }
    useEffect(() => {
        fetchData();
        fetchCountryData();
        fetchEntitiesData();
        fetchRoleData();
        fetchUsersData();
        fetchLobData();

        const handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setEmpNameFilter(false);
                setEmpIdFilter(false);
                setPhoneFilter(false);
                setEmailFilter(false);
                setRoleFilter(false);
                setPannoFilter(false);
                setDojFilter(false);
                setLdowFilter(false);
                setStatusFilter(false);
                setIdFilter(false);
            }
        }

        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);

    const handleOpenEdit = (oldItem) => {
        console.log('called');
        setIsEditDialogue(true);
        setCurrItem(oldItem)
    };

    const handleOpen = () => {
        setIsEmployeeDialogue(true);
    };

    const handleClose = () => {
        setIsEmployeeDialogue(false);
    }

    const addEmployee = async () => {
        if (!validate()) {
            return;
        }
        // setPageLoading(true);
        const data = {
            "user_id": 1234,
            "employeename": formValues.employeeName,
            "employeeid": formValues.employeeId,
            "userid": 1236,
            "roleid": formValues.role,
            "dateofjoining": formValues.doj,
            "dob": formValues.dob,
            "panno": formValues.panNo,
            "status": false,
            "phoneno": Number(formValues.phNo),
            "email": formValues.email,
            "addressline1": formValues.addressLine1,
            "addressline2": formValues.addressLine2,
            "suburb": formValues.suburb,
            "city": formValues.city,
            "state": Number(formValues.state),
            "country": Number(formValues.country),
            "zip": formValues.zipCode,
            "dated": "20-01-2020  00:00:00",
            "createdby": 1234,
            "isdeleted": false,
            "entityid": formValues.entity,
            "lobid": formValues.lob == null ? "" : formValues.lob,
            "lastdateofworking": formValues.lastDOW,
            "designation": formValues.designation
        }
        const response = await APIService.addEmployee(data);

        const result = (await response.json())
        setIsEmployeeDialogue(false);
        openAddSuccess();
        console.log(data);
        console.log(result);
    }

    const initialValues = {
        employeeName: "",
        panNo: "",
        userName: "",
        doj: "",
        designation: "",
        email: "",
        addressLine1: "",
        employeeId: "",
        lob: "",
        dob: "",
        lastDOW: "",
        role: "",
        phNo: "",
        addressLine2: "",
        country: "",
        state: "",
        city: "",
        suburb: "",
        zipCode: "",
        entity: ""

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
        if (!formValues.employeeName) {
            setFormErrors((existing) => {
                return { ...existing, employeeName: "Enter Employee name" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, employeeName: "" }
            })
        }
        if (!formValues.panNo) {
            setFormErrors((existing) => {
                return { ...existing, panNo: "Enter Pan Number" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, panNo: "" }
            })
        }
        if (!formValues.doj) {
            setFormErrors((existing) => {
                return { ...existing, doj: "Enter date of joining" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, doj: "" }
            })
        }
        if (!formValues.designation) {
            setFormErrors((existing) => {
                return { ...existing, designation: "Enter Designation" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, designation: "" }
            })
        }
        if (!formValues.email) {
            setFormErrors((existing) => {
                return { ...existing, email: "Enter email address" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, email: "" }
            })
        }
        if (!formValues.employeeId) {
            setFormErrors((existing) => {
                return { ...existing, employeeId: "Enter Employee Id" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, employeeId: "" }
            })
        }
        if (!formValues.lob) {
            setFormErrors((existing) => {
                return { ...existing, lob: "Select LOB" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, lob: "" }
            })
        }
        if (!formValues.dob) {
            setFormErrors((existing) => {
                return { ...existing, dob: "enter date of birth" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, dob: "" }
            })
        }
        if (!formValues.role) {
            setFormErrors((existing) => {
                return { ...existing, role: "Select Role" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, role: "" }
            })
        }
        if (!formValues.phNo) {
            setFormErrors((existing) => {
                return { ...existing, phNo: "Enter phone number" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, phNo: "" }
            })
        }
        if (!formValues.country) {
            setFormErrors((existing) => {
                return { ...existing, country: "Select country" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, country: "" }
            })
        }
        if (formValues.state == "") {
            setFormErrors((existing) => {
                return { ...existing, state: "Select state" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, state: "" }
            })
        }
        if (!formValues.city) {
            setFormErrors((existing) => {
                return { ...existing, city: "Select city" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, city: "" }
            })
        }
        if (!formValues.suburb) {
            setFormErrors((existing) => {
                return { ...existing, suburb: "Enter suburb" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, suburb: "" }
            })
        }
        if (!formValues.entity) {
            setFormErrors((existing) => {
                return { ...existing, entity: "Select Entity" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, entity: "" }
            })
        }
        return res;
    }

    const deleteEmployee = async (id) => {
        const data = {
            "user_id": 1234,
            "id": id
        }
        const response = await APIService.deleteEmployee(data);
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
    const openAddSuccess = () => {
        // (false);
        setShowAddSuccess(true);
        setTimeout(function () {
            setShowAddSuccess(false);
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
    return (
        <div>
            <Navbar />
            {isEditDialogue && <EditManageEmployee isOpen={isEditDialogue} handleClose={() => setIsEditDialogue(false)} item={currItem} showSuccess={openEditSuccess} />}
            {showAddSuccess && <SucessfullModal isOpen={showAddSuccess} message="successfully Added Employee" />}
            {showDeleteSuccess && <SucessfullModal isOpen={showDeleteSuccess} message="Successfully Deleted Employee" />}
            {showEditSuccess && <SucessfullModal isOpen={showEditSuccess} message="successfully Updated Employee" />}
            <div className='flex-col w-full h-full  bg-white'>
                <div className='flex-col'>
                    {/* this div will have all the content */}
                    <div className='w-full  flex-col px-6'>
                        {/* the top section of the div */}
                        <div className='h-1/2 w-full  flex justify-between items-center p-2  border-gray-300 border-b-2'>
                            <div className='flex items-center space-x-3'>
                                <div className='rounded-2xl  bg-[#EBEBEB] h-8 w-8 flex justify-center items-center '>
                                    <img className='w-5 h-5' src={backLink} />
                                </div>

                                <div className='flex-col'>
                                    <h1 className='text-[18px]'>Manage Employee</h1>
                                    <p className='text-[14px]'>Admin &gt; Manage Employee</p>
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
                                    <button className="bg-[#004DD7] text-white h-[36px] w-[250px] rounded-lg" onClick={handleOpen}>
                                        <div className="flex items-center justify-center gap-4">
                                            Add New Employee
                                            <img className='h-[18px] w-[18px]' src={Add} alt="add" />
                                        </div>
                                    </button>
                                </div>

                            </div>

                        </div>
                        <div className='h-12 w-full bg-white'>
                            <div className='w-full h-12 bg-white flex justify-between'>
                                <div className="w-[85%] flex">
                                    <div className='w-[3%] flex'>
                                        <div className='p-3'>
                                            {/* <p>Sr.</p> */}
                                        </div>
                                    </div>
                                    <div className='w-[10%]  flex p-3'>
                                        <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                            <input className="w-12 bg-[#EBEBEB] rounded-[5px]" onChange={(e) => setEmpNameInput(e.target.value)}/>
                                            <button className='p-1'><img src={Filter} className='h-[15px] w-[15px]'  onClick={() => {setEmpNameFilter((prev) => !prev)}} /></button>
                                        </div>
                                    </div>
                                    {empNameFilter && <div className='h-[270px] w-[150px] mt-3 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm z-40' ref={menuRef} >
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >No Filter</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >Contains</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >DoesNotContain</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >StartsWith</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                                            <button onClick={() => {}}><h1 >EndsWith</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >EqualTo</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >isNull</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >NotIsNull</h1></button>
                                        </div>
                                    </div>}
                                    <div className='w-[13%]  flex p-3'>
                                        <div className="w-[80%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                            <input className="w-14 bg-[#EBEBEB] rounded-[5px]" onChange={(e) => setEmpIdInput(e.target.value)}/>
                                            <button className='p-1'><img src={Filter} className='h-[15px] w-[15px]' onClick={() => {setEmpIdFilter((prev) => !prev)}}/></button>
                                        </div>
                                    </div>
                                    {empIdFilter && <div className='h-[270px] w-[150px] mt-3 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm z-40' ref={menuRef} >
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >No Filter</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >Contains</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >DoesNotContain</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >StartsWith</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                                            <button onClick={() => {}}><h1 >EndsWith</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >EqualTo</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >isNull</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >NotIsNull</h1></button>
                                        </div>
                                    </div>}
                                    <div className='w-[10%]  flex p-3'>
                                        <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                            <input className="w-12 bg-[#EBEBEB] rounded-[5px]" onChange={(e) => setPhoneInput(e.target.value)}/>
                                            <button className='p-1'><img src={Filter} className='h-[15px] w-[15px]' onClick={() => {setPhoneFilter((prev) => !prev)}}/></button>
                                        </div>
                                    </div>
                                    {phoneFilter && <div className='h-[270px] w-[150px] mt-3 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm z-40' ref={menuRef} >
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >No Filter</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >Contains</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >DoesNotContain</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >StartsWith</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                                            <button onClick={() => {}}><h1 >EndsWith</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >EqualTo</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >isNull</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >NotIsNull</h1></button>
                                        </div>
                                    </div>}
                                    <div className='w-[10%]  flex p-3'>
                                        <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                            <input className="w-12 bg-[#EBEBEB] rounded-[5px]" onChange={(e) => setEmailInput(e.target.value)}/>
                                            <button className='p-1'><img src={Filter} className='h-[15px] w-[15px]' onClick={() => {setEmailFilter((prev) => !prev)}}/></button>
                                        </div>
                                    </div>
                                    {emailFilter && <div className='h-[270px] w-[150px] mt-3 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm z-40' ref={menuRef} >
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >No Filter</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >Contains</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >DoesNotContain</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >StartsWith</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                                            <button onClick={() => {}}><h1 >EndsWith</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >EqualTo</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >isNull</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >NotIsNull</h1></button>
                                        </div>
                                    </div>}
                                    <div className='w-[10%]  flex p-3'>
                                        <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                            <input className="w-12 bg-[#EBEBEB] rounded-[5px]" onChange={(e) => setRoleInput(e.target.value)}/>
                                            <button className='p-1'><img src={Filter} className='h-[15px] w-[15px]' onClick={() => {setRoleFilter((prev) => !prev)}}/></button>
                                        </div>
                                    </div>
                                    {roleFilter && <div className='h-[270px] w-[150px] mt-3 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm z-40' ref={menuRef} >
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >No Filter</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >Contains</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >DoesNotContain</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >StartsWith</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                                            <button onClick={() => {}}><h1 >EndsWith</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >EqualTo</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >isNull</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >NotIsNull</h1></button>
                                        </div>
                                    </div>}
                                    <div className='w-[10%]  flex p-3'>
                                        <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                            <input className="w-12 bg-[#EBEBEB] rounded-[5px]" onChange={(e) => setPannoInput(e.target.value)}/>
                                            <button className='p-1'><img src={Filter} className='h-[15px] w-[15px]' onClick={() => {setPannoFilter((prev) => !prev)}}/></button>
                                        </div>
                                    </div>
                                    {pannoFilter && <div className='h-[270px] w-[150px] mt-3 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm z-40' ref={menuRef} >
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >No Filter</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >Contains</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >DoesNotContain</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >StartsWith</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                                            <button onClick={() => {}}><h1 >EndsWith</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >EqualTo</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >isNull</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >NotIsNull</h1></button>
                                        </div>
                                    </div>}
                                    <div className='w-[14%]  flex p-3'>
                                        <div className="w-[72%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                            <input className="w-14 bg-[#EBEBEB] rounded-[5px]" onChange={(e) => setDojInput(e.target.value)}/>
                                            <button className='p-1'><img src={Filter} className='h-[15px] w-[15px]' onClick={() => {setDojFilter((prev) => !prev)}}/></button>
                                        </div>
                                    </div>
                                    {dojFilter && <div className='h-[270px] w-[150px] mt-3 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm z-40' ref={menuRef} >
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >No Filter</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >Contains</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >DoesNotContain</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >StartsWith</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                                            <button onClick={() => {}}><h1 >EndsWith</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >EqualTo</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >isNull</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >NotIsNull</h1></button>
                                        </div>
                                    </div>}
                                    <div className='w-[17%]  flex p-3'>
                                        <div className="w-[57%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                            <input className="w-14 bg-[#EBEBEB] rounded-[5px]" onChange={(e) => setLdowInput(e.target.value)}/>
                                            <button className='p-1'><img src={Filter} className='h-[15px] w-[15px]' onClick={() => {setLdowFilter((prev) => !prev)}}/></button>
                                        </div>
                                    </div>
                                    {ldowFilter && <div className='h-[270px] w-[150px] mt-3 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm z-40' ref={menuRef} >
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >No Filter</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >Contains</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >DoesNotContain</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >StartsWith</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                                            <button onClick={() => {}}><h1 >EndsWith</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >EqualTo</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >isNull</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >NotIsNull</h1></button>
                                        </div>
                                    </div>}
                                    <div className='w-[10%]  flex p-3'>
                                        <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                            <input className="w-12 bg-[#EBEBEB] rounded-[5px]" onChange={(e) => setStatusInput(e.target.value)}/>
                                            <button className='p-1'><img src={Filter} className='h-[15px] w-[15px]' onClick={() => {setStatusFilter((prev) => !prev)}}/></button>
                                        </div>
                                    </div>
                                    {statusFilter && <div className='h-[270px] w-[150px] mt-3 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm z-40' ref={menuRef} >
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >No Filter</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >Contains</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >DoesNotContain</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >StartsWith</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                                            <button onClick={() => {}}><h1 >EndsWith</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >EqualTo</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >isNull</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >NotIsNull</h1></button>
                                        </div>
                                    </div>}
                                </div>
                                <div className="w-[15%] flex">
                                    <div className='w-1/2  flex p-3'>
                                        <div className="w-[97%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                            <input className="w-10 bg-[#EBEBEB] rounded-[5px]" onChange={(e) => setIdInput(e.target.value)}/>
                                            <button className='p-1'><img src={Filter} className='h-[15px] w-[15px]' onClick={() => {setIdFilter((prev) => !prev)}}/></button>
                                        </div>
                                    </div>
                                    {idFilter && <div className='h-[270px] w-[150px] mt-3 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm z-40' ref={menuRef} >
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >No Filter</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >Contains</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >DoesNotContain</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >StartsWith</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                                            <button onClick={() => {}}><h1 >EndsWith</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >EqualTo</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >isNull</h1></button>
                                        </div>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => {}}><h1 >NotIsNull</h1></button>
                                        </div>
                                    </div>}
                                    <div className='w-1/2  flex'>
                                        <div className='p-3'>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='w-full h-[400px] bg-white px-6 text-[12px]'>
                        <div className='w-full h-12 bg-[#F0F6FF] flex justify-between border-gray-400 border-b-[1px]'>
                            <div className="w-[85%] flex">
                                <div className='w-[3%] flex'>
                                    <div className='p-3'>
                                        <p>Sr.</p>
                                    </div>
                                </div>
                                <div className='w-[10%]  flex'>
                                    <div className='p-3'>
                                        <p>Employee <span className="font-extrabold">↑↓</span></p>
                                    </div>
                                </div>
                                <div className='w-[13%]  flex'>
                                    <div className='p-3'>
                                        <p>Employee ID <span className="font-extrabold">↑↓</span></p>
                                    </div>
                                </div>
                                <div className='w-[10%]  flex'>
                                    <div className='p-3'>
                                        <p>Phone <span className="font-extrabold">↑↓</span></p>
                                    </div>
                                </div>
                                <div className='w-[10%]  flex'>
                                    <div className='p-3'>
                                        <p>Email <span className="font-extrabold">↑↓</span></p>
                                    </div>
                                </div>
                                <div className='w-[10%]  flex'>
                                    <div className='p-3'>
                                        <p>Role <span className="font-extrabold">↑↓</span></p>
                                    </div>
                                </div>
                                <div className='w-[10%]  flex'>
                                    <div className='p-3'>
                                        <p>Pan No <span className="font-extrabold">↑↓</span></p>
                                    </div>
                                </div>
                                <div className='w-[14%]  flex'>
                                    <div className='p-3'>
                                        <p>Date of joining <span className="font-extrabold">↑↓</span></p>
                                    </div>
                                </div>
                                <div className='w-[17%]  flex'>
                                    <div className='p-3'>
                                        <p>Last Date of working <span className="font-extrabold">↑↓</span></p>
                                    </div>
                                </div>
                                <div className='w-[10%]  flex'>
                                    <div className='p-3'>
                                        <p> Status <span className="font-extrabold">↑↓</span></p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[15%] flex">
                                <div className='w-1/2  flex'>
                                    <div className='p-3'>
                                        <p>ID <span className="font-extrabold">↑↓</span></p>
                                    </div>
                                </div>
                                <div className='w-1/2  flex'>
                                    <div className='p-3'>
                                        <p>Edit</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='w-full h-[450px] overflow-auto'>
                            {/* we map our items here */}
                            {pageLoading && <div className='ml-5 mt-5'><LinearProgress /></div>}
                            {!pageLoading && existingEmployees.map((item, index) => {
                                return <div className='w-full h-14 bg-white flex justify-between border-gray-400 border-b-[1px]'>
                                    <div className="w-[85%] flex">
                                        <div className='w-[3%] flex'>
                                            <div className='p-3'>
                                                <p>{index + 1 + (currentPage - 1) * currentPages}</p>
                                            </div>
                                        </div>
                                        <div className='w-[10%]  flex overflow-hidden'>
                                            <div className='p-3'>
                                                <p>{item.employeename} </p>
                                            </div>
                                        </div>
                                        <div className='w-[13%]  flex overflow-hidden'>
                                            <div className='p-3 '>
                                                <p >{item.employeeid}</p>
                                            </div>
                                        </div>
                                        <div className='w-[10%]  flex overflow-hidden'>
                                            <div className='p-3'>
                                                <p>{item.phoneno}</p>
                                            </div>
                                        </div>
                                        <div className='w-[10%]  flex overflow-hidden'>
                                            <div className='p-3'>
                                                <p>{item.email}</p>
                                            </div>
                                        </div>
                                        <div className='w-[10%]  flex overflow-hidden'>
                                            <div className='p-3'>
                                                <p>{item.roleid}</p>
                                            </div>
                                        </div>
                                        <div className='w-[10%]  flex overflow-hidden'>
                                            <div className='p-3 ml-[3px]'>
                                                <p>{item.panno}</p>
                                            </div>
                                        </div>
                                        <div className='w-[14%]  flex overflow-hidden'>
                                            <div className='p-3 ml-1'>
                                                <p>{item.dateofjoining}</p>
                                            </div>
                                        </div>
                                        <div className='w-[17%]  flex  overflow-hidden'>
                                            <div className='p-3 ml-1'>
                                                <p>{item.lastdateofworking}</p>
                                            </div>
                                        </div>
                                        <div className='w-[10%]  flex overflow-hidden'>
                                            <div className='p-3 ml-1 flex items-center space-x-2'>
                                                {item.status ? <><div className='w-[7px] h-[7px] rounded-xl bg-green-600'></div>
                                                    <p>active</p></> : <><div className='w-[7px] h-[7px] rounded-xl bg-red-600'></div>
                                                    <p> inactive</p></>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-[15%] flex">
                                    <div className='w-1/2  flex overflow-hidden'>
                                        <div className='p-3 ml-[6px]'>
                                            <p>{item.id}</p>
                                        </div>
                                    </div>
                                    <div className='w-1/2  flex overflow-hidden items-center space-x-4 ml-3'>
                                        <button onClick={() => handleOpenEdit(item)}><img className=' h-5 ml-3' src={Edit} alt="edit" /></button>
                                        <button onClick={() => deleteEmployee(item.id)}><img className=' h-5' src={Trash} alt="trash" /></button>
                                    </div>
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
            <Modal open={isEmployeeDialogue}
                fullWidth={true}
                maxWidth={'md'}
                className='flex justify-center items-center'
            >
                <div className='flex justify-center'>
                    <div className="w-[1050px] h-auto bg-white rounded-lg">
                        <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-lg">
                            <div className="mr-[410px] ml-[410px]">
                                <div className="text-[16px]">Add New Employee</div>
                            </div>
                            <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                                <button onClick={handleClose}><img onClick={handleClose} className="w-[20px] h-[20px]" src={Cross} alt="cross" /></button>
                            </div>
                        </div>

                        <div className="h-auto w-full mt-[5px]">
                            <div className="flex gap-[48px] justify-center items-center">
                                <div className=" space-y-[12px] py-[20px] px-[10px]">
                                    <div className="">
                                        <div className="text-[14px]">Employee Name<label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="employeeName" value={formValues.employeeName} onChange={handleChange} />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.employeeName}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Pan No<label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="panNo" value={formValues.panNo} onChange={handleChange} />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.panNo}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Username <label className="text-red-500">*</label></div>
                                        <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm"
                                            name="userName"
                                            value={formValues.userName}
                                            defaultValue="Select Username"
                                            onChange={e => {
                                                // fetchCityData(e.target.value);
                                                console.log(e.target.value);
                                                setFormValues((existing) => {
                                                    const newData = { ...existing, userName: e.target.value }
                                                    return newData;
                                                })

                                            }}
                                        >
                                            {allUsername && allUsername.map(item => (
                                                <option value={item.id} >
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Date of joining<label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="date" name="doj" value={formValues.doj} onChange={handleChange} />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.doj}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Designation<label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="designation" value={formValues.designation} onChange={handleChange} />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.designation}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Email<label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="email" name="email" value={formValues.email} onChange={handleChange} />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.email}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Address Line 1</div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="addressLine1" value={formValues.addressLine1} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className=" space-y-[12px] py-[20px] px-[10px]">
                                    <div className="">
                                        <div className="text-[14px]">Employee ID<label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="employeeId" value={formValues.employeeId} onChange={handleChange} />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.employeeId}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">LOB <label className="text-red-500">*</label></div>
                                        <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm"
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
                                            {allLOB && allLOB.map(item => (
                                                <option value={item.id} >
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Date of birth<label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="date" name="dob" value={formValues.dob} onChange={handleChange} />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.dob}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Last Date of Working</div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="date" name="lastDOW" value={formValues.lastDOW} onChange={handleChange} />
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Assign Role <label className="text-red-500">*</label></div>
                                        <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm"
                                            name="role"
                                            value={formValues.role}
                                            defaultValue="Select Role"
                                            onChange={e => {
                                                // fetchCityData(e.target.value);
                                                console.log(e.target.value);
                                                setFormValues((existing) => {
                                                    const newData = { ...existing, role: e.target.value }
                                                    return newData;
                                                })

                                            }}
                                        >
                                            {allRoles && allRoles.map(item => (
                                                <option value={item.id} >
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Phone Number<label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="phNo" value={formValues.phNo} onChange={handleChange} />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.phNo}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Address Line 2</div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="addressLine2" value={formValues.addressLine2} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className=" space-y-[12px] py-[20px] px-[10px] ">
                                    <div className="">
                                        <div className="text-[14px]">Country Name<label className="text-red-500">*</label></div>
                                        <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm"
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
                                                // fetchStateData(res);
                                            }}
                                        >
                                            <option value="none" hidden={true}>Select a Country</option>
                                            {allCountry && allCountry.map(item => (
                                                <option value={item[0]} >
                                                    {item[1]}
                                                </option>

                                            ))}
                                        </select>
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.country}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">State Name<label className="text-red-500">*</label></div>
                                        <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm"
                                            name="state"
                                            value={formValues.state}
                                            defaultValue="Select State"
                                            onChange={e => {
                                                fetchCityData(e.target.value);
                                                setFormValues((existing) => {
                                                    const newData = { ...existing, state: e.target.value }
                                                    return newData;
                                                })

                                            }}
                                        >
                                            <option value="none" hidden={true}>Select a State</option>
                                            {allState && allState.map(item => (
                                                <option value={item[1]} >
                                                    {item[1]}
                                                </option>

                                            ))}
                                        </select>
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.state}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">City Name <label className="text-red-500">*</label></div>
                                        <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm"
                                            name="city"
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
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.city}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Suburb</div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="suburb" value={formValues.suburb} onChange={handleChange} />
                                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.suburb}</div> */}
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Zip Code</div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="zipCode" value={formValues.zipCode} onChange={handleChange} />
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Entities <label className="text-red-500">*</label></div>
                                        <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm"
                                            name="entity"
                                            value={formValues.entity}
                                            defaultValue="Select entity"
                                            onChange={e => {
                                                console.log(e.target.value);
                                                setFormValues((existing) => {
                                                    const newData = { ...existing, entity: e.target.value }
                                                    return newData;
                                                })
                                            }}
                                        >
                                            {allEntities && allEntities.map(item => (
                                                <option value={item[0]} >
                                                    {item[1]}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-[10px] flex justify-center items-center"><Checkbox label="Active" />Active</div>
                        <div className="my-[10px] flex justify-center items-center gap-[10px]">
                            <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' onClick={addEmployee} >Save</button>
                            <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleClose}>Cancel</button>
                        </div>

                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ManageEmployees