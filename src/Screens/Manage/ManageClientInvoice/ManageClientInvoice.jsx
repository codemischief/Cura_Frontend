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
import SaveConfirmationEmployee from './SaveConfirmationManageEmployee';
import FailureModal from '../../../Components/modals/FailureModal';
import DeleteEmployeeModal from './DeleteEmployeeModal';
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
import CharacterFilter from "../../../Components/Filters/CharacterFilter"
import DateFilter from '../../../Components/Filters/DateFilter';
import NumericFilter from '../../../Components/Filters/NumericFilter';
import AsyncSelect from "react-select/async"

const ManageClientInvoice = () => {

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
    const [isClientInvoiceDialogue, setIsClientInvoiceDialogue] = useState(false);
    const [isEditDialogue, setIsEditDialogue] = React.useState(false);
    const [currItem, setCurrItem] = useState({});
    const [showAddSuccess, setShowAddSuccess] = useState(false);
    const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

    const [empNameFilter, setEmpNameFilter] = useState(false);
    const [empNameInput, setEmpNameInput] = useState("");
    const [empIdFilter, setEmpIdFilter] = useState(false);
    const [empIdInput, setEmpIdInput] = useState("");
    const [phoneInput, setPhoneInput] = useState("");
    const [emailFilter, setEmailFilter] = useState(false);
    const [emailInput, setEmailInput] = useState("");
    const [roleFilter, setRoleFilter] = useState(false);
    const [roleInput, setRoleInput] = useState("");
    const [pannoFilter, setPannoFilter] = useState(false);
    const [pannoInput, setPannoInput] = useState("");
    const [dojFilter, setDojFilter] = useState(false);
    const [dojInput, setDojInput] = useState("");
    const [ldowFilter, setLdowFilter] = useState(false);
    const [ldowInput, setLdowInput] = useState("");
    const [statusFilter, setStatusFilter] = useState(false);
    const [statusInput, setStatusInput] = useState("");
    const [idFilter, setIdFilter] = useState(false);
    const [idInput, setIdInput] = useState("");
    const [openAddConfirmation, setOpenAddConfirmation] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isFailureModal, setIsFailureModal] = useState(false)
    const [deleteConfirmation, showDeleteConfirmation] = useState(false);
    // const [filterArray,setFilterArray] = useState([]);


    const [selectedOption, setSelectedOption] = useState({
        label: "Enter Client Name",
        value: null
    });
    const [query, setQuery] = useState('')
    
    const handleClientNameChange = (e) => {
        console.log('hey')
        console.log(e)
        //  setFormValues({...formValues,client_property : {
        //   ...formValues.client_property,
        //   clientid : e.value
        //  }})
        const existing = { ...formValues }
        existing.client = e.value
        getOrdersByClientId(e.value)
        setFormValues(existing)
        //    const existing = {...formValues}
        //    const temp = {...existing.client_property}
        //    temp.clientid = e.value
        //    existing.client_property = temp;
        //    setFormValues(existing)
        console.log(formValues)
        setSelectedOption(e)
    }

    const [orders, setOrders] = useState([]);
    const getOrdersByClientId = async (id) => {
        console.log('hello')
        const data = {
            "user_id": 1234,
            "client_id": id
        }
        const response = await APIService.getOrdersByClientId(data)
        const res = await response.json()
        console.log(res.data)
        setOrders(res.data)

        // if(res.data.length >= 1) {
        //    const existing = {...formValues}
        //    existing.order = res.data[0].id
        //    console.log(res.data[0].id)
        //    setFormValues(existing)

        // } 
    }

    const loadOptions = async (e) => {
        console.log(e)
        if (e.length < 3) return;
        const data = {
            "user_id": 1234,
            "pg_no": 0,
            "pg_size": 0,
            "search_key": e
        }
        const response = await APIService.getClientAdminPaginated(data)
        const res = await response.json()
        const results = res.data.map(e => {
            return {
                label: e[1],
                value: e[0]
            }
        })
        if (results === 'No Result Found') {
            return []
        }
        return results
    }

    const [sortField, setSortField] = useState("id")
    const [flag, setFlag] = useState(false)
    const fetchData = async () => {
        console.log('ugm')
        const tempArray = [];
        // we need to query thru the object
        console.log(filterMapState);
        Object.keys(filterMapState).forEach(key => {
            if (filterMapState[key].filterType != "") {
                tempArray.push([key, filterMapState[key].filterType, filterMapState[key].filterValue, filterMapState[key].filterData]);
            }
        })
        setPageLoading(true);
        const data = {
            "user_id": 1234,
            "rows": ["id", "employeename", "employeeid", "phoneno", "email", "userid", "roleid", "panno", "dateofjoining", "lastdateofworking", "status", "role"],
            "filters": tempArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
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
        const tempArray = [];
        // we need to query thru the object
        console.log(filterMapState);
        Object.keys(filterMapState).forEach(key => {
            if (filterMapState[key].filterType != "") {
                tempArray.push([key, filterMapState[key].filterType, filterMapState[key].filterValue, filterMapState[key].filterData]);
            }
        })
        const data = {
            "user_id": 1234,
            "rows": ["id", "employeename", "employeeid", "phoneno", "email", "userid", "roleid", "panno", "dateofjoining", "lastdateofworking", "status", "role"],
            "filters": tempArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
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
        const tempArray = [];
        // we need to query thru the object
        console.log(filterMapState);
        Object.keys(filterMapState).forEach(key => {
            if (filterMapState[key].filterType != "") {
                tempArray.push([key, filterMapState[key].filterType, filterMapState[key].filterValue, filterMapState[key].filterData]);
            }
        })
        console.log(searchInput);
        const data = {
            "user_id": 1234,
            "rows": ["id", "employeename", "employeeid", "phoneno", "email", "userid", "roleid", "panno", "dateofjoining", "lastdateofworking", "status", "role"],
            "filters": tempArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
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

        const handler = (e) => {
            if (menuRef.current == null || !menuRef.current.contains(e.target)) {
                setEmployeeNameFilter(false)
                setEmployeeIdFilter(false)
                setPannoFilter(false)
                setPhoneFilter(false)
                setEmailFilter(false)
                setRoleFilter(false)
                setDateOfJoiningFilter(false)
                setLdowFilter(false)
                setStatusFilter(false)
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
        setIsClientInvoiceDialogue(true);
    };

    const handleClose = () => {
        setIsClientInvoiceDialogue(false);
    }
    const handleAddEmployee = () => {
        console.log(formValues)
        if (!validate()) {
            console.log('hu')
            return;
        }
        setIsEmployeeDialogue(false);
        setOpenAddConfirmation(true)

    }
    const addEmployee = async () => {
        // console.log('clicked')
        console.log(formValues)
        if (!validate()) {
            console.log('hu')
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
            "status": formValues.status,
            "phoneno": Number(formValues.phNo),
            "email": formValues.email,
            "addressline1": formValues.addressLine1,
            "addressline2": formValues.addressLine2,
            "suburb": formValues.suburb,
            "city": formValues.city,
            "state": formValues.state,
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

        setOpenAddConfirmation(false);
        console.log(result)
        setIsClientInvoiceDialogue(false);
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
        client: "",
        estimateAmount: "",
        baseAmount: "",
        invoiceAmount: "",
        invoiceDescription: "",
        order: null,
        estimateDate: null,
        gst: "",
        invoiceDate: null
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
        if (!formValues.client) {
            setFormErrors((existing) => {
                return { ...existing, client: "Enter Client name" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, client: "" }
            })
        }
        if (!formValues.invoiceDescription) {
            console.log('issue is in panno')
            setFormErrors((existing) => {
                return { ...existing, invoiceDescription: "Enter Invoice Description" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, invoiceDescription: "" }
            })
        }
        if (!formValues.order || formValues.order == "") {
            setFormErrors((existing) => {
                return { ...existing, order: "Select Order" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, order: "" }
            })
        }
        return res;
    }
    const [currEmployeeId, setCurrEmployeeId] = useState("");
    const handleDelete = (id) => {
        setCurrEmployeeId(id);
        showDeleteConfirmation(true);
    }
    const deleteEmployee = async (id) => {
        const data = {
            "user_id": 1234,
            "id": id
        }
        const response = await APIService.deleteEmployee(data);
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
    const handleExcelDownload = async () => {
        const data = {
            "user_id": 1234,
            "rows": ["id", "employeename", "employeeid", "phoneno", "email", "userid", "roleid", "panno", "dateofjoining", "lastdateofworking", "status", "role"],
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
            "rows": ["id", "employeename", "employeeid", "phoneno", "email", "userid", "roleid", "panno", "dateofjoining", "lastdateofworking", "status", "role"],
            "filters": [],
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
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
            "rows": ["id", "employeename", "employeeid", "phoneno", "email", "userid", "roleid", "panno", "dateofjoining", "lastdateofworking", "status", "role"],
            "filters": [],
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
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

    const filterMapping = {
        employeename: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        employeeid: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        phoneno: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        email: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        role: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        dateofjoining: {
            filterType: "",
            filterValue: null,
            filterData: "Date",
            filterInput: ""
        },
        lastdateofworking: {
            filterType: "",
            filterValue: null,
            filterData: "Date",
            filterInput: ""
        },
        status: {
            filterType: "",
            filterValue: "",
            filterData: "Numeric",
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
    const [employeeNameFilter, setEmployeeNameFilter] = useState(false)
    const [employeeNameInput, setEmployeeNameInput] = useState("");
    const [employeeIdFilter, setEmployeeIdFilter] = useState(false)
    const [employeeIdInput, setEmployeeIdInput] = useState("")
    const [phoneFilter, setPhoneFilter] = useState(false)
    const [phoneFilterInput, setPhoneFilterInput] = useState("");
    const [dateOfJoiningFilter, setDateOfJoiningFilter] = useState(false)
    const [dateOfJoiningInput, setDateOfJoiningInput] = useState(false)

    const fetchFiltered = async (mapState) => {
        setFilterMapState(mapState)
        const tempArray = [];
        // we need to query thru the object
        // console.log(filterMapState);
        console.log(filterMapState)
        Object.keys(mapState).forEach(key => {
            if (mapState[key].filterType != "") {
                tempArray.push([key, mapState[key].filterType, mapState[key].filterValue, mapState[key].filterData]);
            }
        })
        setPageLoading(true);
        const data = {
            "user_id": 1234,
            "rows": ["id", "employeename", "employeeid", "phoneno", "email", "userid", "roleid", "panno", "dateofjoining", "lastdateofworking", "status"],
            "filters": tempArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
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
    const newHandleFilter = async (inputVariable, setInputVariable, type, columnName) => {
        console.log(columnName)
        console.log('hey')
        console.log(filterMapState);
        if (columnName == 'status') {
            var existing = filterMapState;
            if (type == 'noFilter') {
                setInputVariable("");
            }
            if (inputVariable.toLowerCase() == 'active') {
                existing = {
                    ...existing, [columnName]: {
                        ...existing[columnName],
                        filterValue: 'true'
                    }
                }
                existing = {
                    ...existing, [columnName]: {
                        ...existing[columnName],
                        filterType: type == 'noFilter' ? "" : type
                    }
                }
            } else if (inputVariable.toLowerCase() == 'inactive') {
                existing = {
                    ...existing, [columnName]: {
                        ...existing[columnName],
                        filterValue: 'false'
                    }
                }
                existing = {
                    ...existing, [columnName]: {
                        ...existing[columnName],
                        filterType: type == 'noFilter' ? "" : type
                    }
                }
            } else {
                return;
            }

        } else {
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

            if (type == 'noFilter') setInputVariable("");
        }

        fetchFiltered(existing);
    }
    const handleSort = async (field) => {
        setPageLoading(true);
        const tempArray = [];
        // we need to query thru the object
        setSortField(field)
        console.log(filterMapState);
        Object.keys(filterMapState).forEach(key => {
            if (filterMapState[key].filterType != "") {
                tempArray.push([key, filterMapState[key].filterType, filterMapState[key].filterValue, filterMapState[key].filterData]);
            }
        })
        const data = {
            "user_id": 1234,
            "rows": ["id", "employeename", "employeeid", "phoneno", "email", "userid", "roleid", "panno", "dateofjoining", "lastdateofworking", "status", "role"],
            "filters": tempArray,
            "sort_by": [field],
            "order": flag ? "asc" : "desc",
            "pg_no": Number(currentPage),
            "pg_size": Number(currentPages),
            "search_key": isSearchOn ? searchInput : ""
        };
        setFlag((prev) => !prev);
        const response = await APIService.getEmployees(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingEmployees(result);
        setPageLoading(false);
    }
    return (
        <div className='h-screen'>
            <Navbar />
            {isEditDialogue && <EditManageEmployee isOpen={isEditDialogue} handleClose={() => setIsEditDialogue(false)} item={currItem} showSuccess={openEditSuccess} />}
            {showAddSuccess && <SucessfullModal isOpen={showAddSuccess} message="successfully Added Employee" />}
            {showDeleteSuccess && <SucessfullModal isOpen={showDeleteSuccess} message="Successfully Deleted Employee" />}
            {showEditSuccess && <SucessfullModal isOpen={showEditSuccess} message="successfully Updated Employee" />}
            {openAddConfirmation && <SaveConfirmationEmployee handleClose={() => setOpenAddConfirmation(false)} currEmployee={formValues.employeeName} addEmployee={addEmployee} />}
            {isFailureModal && <FailureModal isOpen={isFailureModal} message={errorMessage} />}
            {deleteConfirmation && <DeleteEmployeeModal handleClose={() => showDeleteConfirmation(false)} handleDelete={deleteEmployee} item={currEmployeeId} />}
            <div className='h-[calc(100vh_-_7rem)] w-full  px-10'>
                <div className='h-16 w-full  flex justify-between items-center p-2  border-gray-300 border-b-2'>
                    <div className='flex items-center space-x-3'>
                        <div className='rounded-2xl  bg-[#EBEBEB] h-8 w-8 flex justify-center items-center '>
                            <Link to="/dashboard"><img className='w-5 h-5' src={backLink} /></Link>
                        </div>

                        <div className='flex-col'>
                            <h1 className='text-lg'>Manage Client Invoice</h1>
                            <p className='text-sm'>Manage &gt; Manage Client Invoice</p>
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
                                    Add New Client Invoice
                                    <img className='h-4 w-4' src={Add} alt="add" />
                                </div>
                            </button>
                        </div>

                    </div>

                </div>





                {/* filter component */}
                <div className='h-12 w-full bg-white'>
                    <div className='w-full h-12 bg-white flex justify-between'>
                        <div className="w-[85%] flex">
                            <div className='w-[3%] flex'>
                                <div className='p-3'>
                                    {/* <p>Sr.</p> */}
                                </div>
                            </div>
                            <div className='w-[10%]  p-3'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[68%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={employeeNameInput} onChange={(e) => setEmployeeNameInput(e.target.value)} />
                                    <button className='w-[32%] px-1 py-2' onClick={() => { setEmployeeNameFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                                </div>
                                {employeeNameFilter && <CharacterFilter inputVariable={employeeNameInput} setInputVariable={setEmployeeNameInput} handleFilter={newHandleFilter} filterColumn='employeename' menuRef={menuRef} />}

                            </div>

                            <div className='w-[13%]  p-3'>
                                <div className="w-[80%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[70%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={employeeIdInput} onChange={(e) => setEmployeeIdInput(e.target.value)} />
                                    <button className='W-[30%] px-1 py-2' onClick={() => { setEmployeeIdFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                                </div>
                                {employeeIdFilter && <CharacterFilter inputVariable={employeeIdInput} setInputVariable={setEmployeeIdInput} filterColumn='employeeid' handleFilter={newHandleFilter} menuRef={menuRef} />}
                            </div>

                            <div className='w-[10%]  p-3'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[62%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={phoneFilterInput} onChange={(e) => setPhoneFilterInput(e.target.value)} />
                                    <button className='w-[38%] px-1 py-2' onClick={() => { setPhoneFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                                </div>
                                {phoneFilter && <CharacterFilter inputVariable={phoneFilterInput} setInputVariable={setPhoneFilterInput} filterColumn="phoneno" menuRef={menuRef} handleFilter={newHandleFilter} />}
                            </div>

                            <div className='w-[10%] p-3'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[66%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
                                    <button className='w-[34%] px-1 py-2' onClick={() => { setEmailFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                                </div>
                                {emailFilter && <CharacterFilter inputVariable={emailInput} setInputVariable={setEmailInput} filterColumn='email' menuRef={menuRef} handleFilter={newHandleFilter} />}
                            </div>

                            <div className='w-[10%]  p-3'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[70%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={roleInput} onChange={(e) => setRoleInput(e.target.value)} />
                                    <button className='w-[30%] px-1 py-2'><img src={Filter} className='h-3 w-3' onClick={() => { setRoleFilter((prev) => !prev) }} /></button>
                                </div>
                                {roleFilter && <CharacterFilter inputVariable={roleInput} setInputVariable={setRoleInput} filterColumn='role' handleFilter={newHandleFilter} menuRef={menuRef} />}
                            </div>

                            <div className='w-[10%] p-3'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[70%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={pannoInput} onChange={(e) => setPannoInput(e.target.value)} />
                                    <button className='w-[30%] px-1 py-2'><img src={Filter} className='h-3 w-3' onClick={() => { setPannoFilter((prev) => !prev) }} /></button>
                                </div>
                                {pannoFilter && <CharacterFilter inputVariable={pannoInput} setInputVariable={setPannoInput} menuRef={menuRef} filterColumn='panno' handleFilter={newHandleFilter} />}
                            </div>

                            <div className='w-[14%] p-3'>
                                <div className="w-[80%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[70%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" type="date" value={dateOfJoiningInput} onChange={(e) => setDateOfJoiningInput(e.target.value)} />
                                    <button className='px-1 py-2 w-[30%]' onClick={() => { setDateOfJoiningFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                                </div>
                                {dateOfJoiningFilter && <DateFilter inputVariable={dateOfJoiningInput} setInputVariable={setLdowInput} columnName='dateofjoining' handleFilter={newHandleFilter} menuRef={menuRef} />}
                            </div>

                            <div className='w-[17%]  p-3 '>
                                <div className="w-[80%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[80%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" type='date' value={ldowInput} onChange={(e) => setLdowInput(e.target.value)} />
                                    <button className='w-[20%] px-1 py-2' onClick={() => { setLdowFilter((prev) => !prev) }}> <img src={Filter} className='h-3 w-3' /></button>
                                </div>
                                {ldowFilter && <DateFilter inputVariable={ldowInput} setInputVariable={setLdowInput} handleFilter={newHandleFilter} columnName='lastdateofworking' menuRef={menuRef} />}
                            </div>
                            <div className='w-[10%]  p-3 '>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[70%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" type='text' onChange={(e) => setStatusInput(e.target.value)} />
                                    <button className='px-1 py-2 w-[30%]'><img src={Filter} className='h-3 w-3' onClick={() => { setStatusFilter((prev) => !prev) }} /></button>
                                </div>
                                {statusFilter && <NumericFilter inputVariable={statusInput} setInputVariable={setStatusInput} columnName='status' handleFilter={newHandleFilter} menuRef={menuRef} />}
                            </div>
                        </div>
                        <div className="w-[15%] flex">
                            <div className='w-1/2 p-3'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-[65%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" onChange={(e) => setIdInput(Number(e.target.value))} />
                                    <button className='px-1 py-2 w-[35%] '><img src={Filter} className='h-3 w-3' onClick={() => { setIdFilter((prev) => !prev) }} /></button>
                                </div>
                                {idFilter && <NumericFilter columnName='id' inputVariable={idInput} setInputVariable={setIdInput} handleFilter={newHandleFilter} menuRef={menuRef} />}
                            </div>

                            <div className='w-1/2  flex'>
                                <div className='p-3'>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='h-[calc(100vh_-_14rem)] w-full text-xs'>
                    <div className='w-full h-12 bg-[#F0F6FF] flex justify-between border-gray-400 border-b-[1px]'>
                        <div className="w-[90%] flex">
                            <div className='w-[4%] flex'>
                                <div className='p-3'>
                                    <p>Sr.</p>
                                </div>
                            </div>
                            <div className='w-[12%]  flex'>
                                <div className='p-3'>
                                    <p>Client Name <button onClick={() => handleSort('employeename')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[14%]  flex'>
                                <div className='p-3'>
                                    <p>Order Description <button onClick={() => handleSort('employeeid')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[13%]  flex'>
                                <div className='p-3'>
                                    <p>Estimate Amount <button onClick={() => handleSort('phoneno')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[12%]  flex'>
                                <div className='p-3'>
                                    <p>Estimate Date <button onClick={() => handleSort('email')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[13%]  flex'>
                                <div className='p-3'>
                                    <p>Invoice Amount <button onClick={() => handleSort('role')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[12%]  flex'>
                                <div className='p-3'>
                                    <p>Invoice Date <button onClick={() => handleSort('panno')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[8%]  flex'>
                                <div className='p-3'>
                                    <p>Entity <button onClick={() => handleSort('dateofjoining')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[12%]  flex'>
                                <div className='p-3'>
                                    <p>Created By <button onClick={() => handleSort('lastdateofworking')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                        </div>
                        <div className="w-[10%] flex">
                            <div className='w-1/2  flex'>
                                <div className='p-3'>
                                    <p>ID <button onClick={() => handleSort('id')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-1/2  flex'>
                                <div className='p-3'>
                                    <p>Edit</p>
                                </div>
                            </div>
                        </div>

                    </div>


                    <div className='w-full h-[calc(100vh_-_17rem)] overflow-auto'>
                        {/* we map our items here */}
                        {pageLoading && <div className='ml-5 mt-5'><LinearProgress /></div>}
                        {!pageLoading && existingEmployees.map((item, index) => {
                            return <div className='w-full bg-white flex justify-between border-gray-400 border-b-[1px]'>
                                <div className="w-[85%] flex min-h-0">
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
                                            <p>{item.role}</p>
                                        </div>
                                    </div>
                                    <div className='w-[10%]  flex overflow-hidden'>
                                        <div className='p-3 ml-[3px]'>
                                            <p>{item.panno}</p>
                                        </div>
                                    </div>
                                    <div className='w-[14%]  flex overflow-hidden'>
                                        <div className='p-3 ml-1'>
                                            <p>{item.dateofjoining ? item.dateofjoining.split('T')[0] : "NA"}</p>
                                        </div>
                                    </div>
                                    <div className='w-[17%]  flex  overflow-hidden'>
                                        <div className='p-3 ml-1'>
                                            <p>{item.lastdateofworking ? item.lastdateofworking.split('T')[0] : "NA"}</p>
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
                                        <button onClick={() => handleDelete(item.id)}><img className=' h-5' src={Trash} alt="trash" /></button>
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

            <Modal open={isClientInvoiceDialogue}
                fullWidth={true}
                maxWidth={'md'}
                className='flex justify-center items-center'
            >
                <div className='flex justify-center'>
                    <div className="w-[1050px] h-auto bg-white rounded-lg">
                        <div className="h-10 bg-[#EDF3FF]  justify-center flex items-center rounded-t-lg">
                            <div className="mr-[410px] ml-[410px]">
                                <div className="text-base">New Client Invoice </div>
                            </div>
                            <div className="flex justify-center items-center rounded-full w-7 h-7 bg-white">
                                <button onClick={handleClose}><img onClick={handleClose} className="w-5 h-5" src={Cross} alt="cross" /></button>
                            </div>
                        </div>

                        <div className="text-sm text-center mt-1 font-semibold">Invoice ID:</div>

                        <div className="h-auto w-full mt-1 ">
                            <div className="flex gap-12 justify-center">
                                <div className=" space-y-3 py-5">
                                    <div className="">
                                        <div className="text-[13px]">
                                            Client <label className="text-red-500">*</label>
                                        </div>
                                        <AsyncSelect
                                            onChange={handleClientNameChange}
                                            value={selectedOption}
                                            loadOptions={loadOptions}
                                            cacheOptions
                                            defaultOptions
                                            onInputChange={(value) => setQuery(value)}

                                            styles={{
                                                control: (provided, state) => ({
                                                    ...provided,
                                                    minHeight: 25,
                                                    lineHeight: '1.3',
                                                    height: 2,
                                                    fontSize: 12,
                                                    padding: '1px'
                                                }),
                                                // indicatorSeparator: (provided, state) => ({
                                                //   ...provided,
                                                //   lineHeight : '0.5',
                                                //   height : 2,
                                                //   fontSize : 12 // hide the indicator separator
                                                // }),
                                                dropdownIndicator: (provided, state) => ({
                                                    ...provided,
                                                    padding: '3px', // adjust padding for the dropdown indicator
                                                }),
                                                options: (provided, state) => ({
                                                    ...provided,
                                                    fontSize: 12 // adjust padding for the dropdown indicator
                                                })
                                            }}
                                        />
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.client}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-sm">Estimate Amount</div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="estimateAmount" value={formValues.estimateAmount} onChange={handleChange} />

                                    </div>
                                    <div className="">
                                        <div className="text-sm">Base Amount</div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="baseAmount" value={formValues.baseAmount} onChange={handleChange} />

                                    </div>
                                    <div className="">
                                        <div className="text-sm">Invoice Amount</div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="invoiceAmount" value={formValues.invoiceAmount} onChange={handleChange} />
                                    </div>
                                    <div className="">
                                        <div className="text-sm">Quote/Invoice Description <label className="text-red-500">*</label></div>
                                        <textarea className="w-56 h-16 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="invoiceDescription" value={formValues.invoiceDescription} onChange={handleChange} />
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.invoiceDescription}</div>
                                    </div>
                                </div>
                                <div className=" space-y-3 py-5">
                                    <div className="">
                                        <div className="text-[13px]">
                                            Order <label className="text-red-500">*</label>
                                        </div>
                                        <select
                                            className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                                            name="order"
                                            value={formValues.order}
                                            onChange={handleChange}
                                        >
                                            <option value="" >Select A Order</option>
                                            {orders.map((item) => (
                                                <option key={item.id} value={item.id}>
                                                    {item.ordername}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.order}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-sm">Estimate Date</div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="date" name="estimateDate" value={formValues.estimateDate} onChange={handleChange} />
                                    </div>
                                    <div className="">
                                        <div className="text-sm">GST/ST</div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="gst" value={formValues.gst} onChange={handleChange} />
                                    </div>
                                    <div className="">
                                        <div className="text-sm">Invoice Date</div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="date" name="invoiceDate" value={formValues.invoiceDate} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="my-3 flex justify-center items-center gap-3">
                            <button className='w-28 h-10 bg-[#004DD7] text-white rounded-md text-lg' onClick={handleAddEmployee} >Add</button>
                            <button className='w-28 h-10 border-[1px] border-[#282828] rounded-md text-lg' onClick={handleClose}>Cancel</button>
                        </div>

                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ManageClientInvoice