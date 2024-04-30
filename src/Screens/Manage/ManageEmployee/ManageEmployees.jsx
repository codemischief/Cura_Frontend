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
            // if (result.length > 0) {
            //     // setFormValues((existing) => {
            //     //     const newData = { ...existing, city: result[0].id }
            //     //     return newData;
            //     // })
            // }
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
    const [sortField, setSortField] = useState("id")
    const [flag, setFlag] = useState(false)
    const fetchData = async () => {
        console.log('ugm')
        const tempArray = [];
        // we need to query thru the object
        console.log(filterMapState);
        Object.keys(filterMapState).forEach(key=> {
            if(filterMapState[key].filterType != "") {
                tempArray.push([key,filterMapState[key].filterType,filterMapState[key].filterValue,filterMapState[key].filterData]);
            }
        })
        setPageLoading(true);
        const data = {
            "user_id": 1234,
            "rows": ["id", "employeename", "employeeid", "phoneno", "email", "userid", "roleid", "panno", "dateofjoining", "lastdateofworking", "status","role"],
            "filters": tempArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": Number(currentPage),
            "pg_size": Number(currentPages),
            "search_key": searchInput
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
        Object.keys(filterMapState).forEach(key=> {
            if(filterMapState[key].filterType != "") {
                tempArray.push([key,filterMapState[key].filterType,filterMapState[key].filterValue,filterMapState[key].filterData]);
            }
        })
        const data = {
            "user_id": 1234,
            "rows": ["id", "employeename", "employeeid", "phoneno", "email", "userid", "roleid", "panno", "dateofjoining", "lastdateofworking", "status","role"],
            "filters": tempArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": Number(pageNumber),
            "pg_size": Number(currentPages),
            "search_key": searchInput
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
        Object.keys(filterMapState).forEach(key=> {
            if(filterMapState[key].filterType != "") {
                tempArray.push([key,filterMapState[key].filterType,filterMapState[key].filterValue,filterMapState[key].filterData]);
            }
        })
        setCurrentPage((prev) => 1)
        console.log(searchInput);
        const data = {
            "user_id": 1234,
            "rows": ["id", "employeename", "employeeid", "phoneno", "email", "userid", "roleid", "panno", "dateofjoining", "lastdateofworking", "status","role"],
            "filters": tempArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
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
        fetchStateData(5)
        fetchCityData("Maharashtra");
        fetchEntitiesData();
        fetchRoleData();
        fetchUsersData();
        fetchLobData();

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
        setIsEmployeeDialogue(true);
    };

    const handleClose = () => {
        setIsEmployeeDialogue(false);
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
        setIsEmployeeDialogue(false);
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
        employeeName: "",
        panNo: "",
        userName: "",
        doj: null,
        designation: "",
        email: "",
        addressLine1: "",
        employeeId: "",
        lob: null,
        dob: "",
        lastDOW: null,
        role: "",
        phNo: "",
        status: false,
        addressLine2: "",
        country: 5,
        state: "Maharashtra",
        city: 847,
        suburb: "",
        zipCode: "",
        entity: 1
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
            console.log('issue is in empname')
            setFormErrors((existing) => {
                return { ...existing, employeeName: "" }
            })
        }
        console.log('employee ok')
        if (!formValues.panNo) {
            console.log('issue is in panno')
            setFormErrors((existing) => {
                return { ...existing, panNo: "Enter Pan Number" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, panNo: "" }
            })
        }
        console.log('panno ok')
        if (!formValues.doj) {
            console.log('issue is in doj')
            setFormErrors((existing) => {
                return { ...existing, doj: "Enter date of joining" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, doj: "" }
            })
        }
        console.log('date of joining okay')
        if (!formValues.designation) {
            console.log('issue is in designation')
            setFormErrors((existing) => {
                return { ...existing, designation: "Enter Designation" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, designation: "" }
            })
        }
        console.log('designation ok')
        if (!formValues.email) {
            console.log('issue is in email')
            setFormErrors((existing) => {
                return { ...existing, email: "Enter email address" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, email: "" }
            })
        }
        console.log('email ok')
        if (!formValues.employeeId) {
            console.log('issue is in empid')
            setFormErrors((existing) => {
                return { ...existing, employeeId: "Enter Employee Id" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, employeeId: "" }
            })
        }
        console.log('employeeId ok')
        if (!formValues.lob) {
            console.log('issue is in lob')
            setFormErrors((existing) => {
                return { ...existing, lob: "Select LOB" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, lob: "" }
            })
        }
        console.log('lob ok')
        if (!formValues.dob) {
            console.log('issue is in dob')
            setFormErrors((existing) => {
                return { ...existing, dob: "enter date of birth" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, dob: "" }
            })
        }
        console.log('dob ok')
        if (!formValues.role) {
            console.log('issue is in role')
            setFormErrors((existing) => {
                return { ...existing, role: "Select Role" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, role: "" }
            })
        }
        console.log('role ok')
        if (!formValues.phNo) {
            console.log('issue is in phoneno')
            setFormErrors((existing) => {
                return { ...existing, phNo: "Enter phone number" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, phNo: "" }
            })
        }
        console.log('phoneno ok')
        if (!formValues.country) {
            console.log('issue is in country')
            setFormErrors((existing) => {
                return { ...existing, country: "Select country" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, country: "" }
            })
        }
        console.log('country ok')
        if (formValues.state == "") {
            console.log('issue is in state')
            setFormErrors((existing) => {
                return { ...existing, state: "Select state" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, state: "" }
            })
        }
        console.log('state ok')
        if (!formValues.city) {
            console.log('issue is in city')
            setFormErrors((existing) => {
                return { ...existing, city: "Select city" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, city: "" }
            })
        }

        if (!formValues.entity) {
            console.log('issue is in entity')
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
        const tempArray = [];
        // we need to query thru the object
        console.log(filterMapState);
        Object.keys(filterMapState).forEach(key=> {
            if(filterMapState[key].filterType != "") {
                tempArray.push([key,filterMapState[key].filterType,filterMapState[key].filterValue,filterMapState[key].filterData]);
            }
        })
        const data = {
            "user_id": 1234,
            "rows": ["id", "employeename", "employeeid", "phoneno", "email", "userid", "roleid", "panno", "dateofjoining", "lastdateofworking", "status","role"],
            "filters": tempArray,
            "sort_by": [sortField],
            "order": "desc",
            "search_key" : searchInput,
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
        const tempArray = [];
        // we need to query thru the object
        console.log(filterMapState);
        Object.keys(filterMapState).forEach(key=> {
            if(filterMapState[key].filterType != "") {
                tempArray.push([key,filterMapState[key].filterType,filterMapState[key].filterValue,filterMapState[key].filterData]);
            }
        })
        setIsSearchOn(true);
        setCurrentPage((prev) => 1)
        const data = {
            "user_id": 1234,
            "rows": ["id", "employeename", "employeeid", "phoneno", "email", "userid", "roleid", "panno", "dateofjoining", "lastdateofworking", "status","role"],
            "filters": tempArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
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
        setSearchInput(() => "");
        const tempArray = [];
        // we need to query thru the object
        console.log(filterMapState);
        Object.keys(filterMapState).forEach(key=> {
            if(filterMapState[key].filterType != "") {
                tempArray.push([key,filterMapState[key].filterType,filterMapState[key].filterValue,filterMapState[key].filterData]);
            }
        })
        const data = {
            "user_id": 1234,
            "rows": ["id", "employeename", "employeeid", "phoneno", "email", "userid", "roleid", "panno", "dateofjoining", "lastdateofworking", "status","role"],
            "filters": tempArray,
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
        employeename : {
            filterType : "",
            filterValue : "",
            filterData : "String",
            filterInput : ""
        },
        employeeid : {
            filterType : "",
            filterValue : "",
            filterData : "String",
            filterInput : ""
        },
        phoneno : {
            filterType : "",
            filterValue : "",
            filterData : "String",
            filterInput : ""
        },
        panno : {
            filterType : "",
            filterValue : "",
            filterData : "String",
            filterInput : ""
        },
        email : {
            filterType : "",
            filterValue : "",
            filterData : "String",
            filterInput : ""
        },
        role : {
            filterType : "",
            filterValue : "",
            filterData : "String",
            filterInput : ""
        },
        dateofjoining : {
            filterType : "",
            filterValue : null,
            filterData : "Date",
            filterInput : ""
        },
        lastdateofworking : {
            filterType : "",
            filterValue : null,
            filterData : "Date",
            filterInput : ""
        },
        status : {
            filterType : "",
            filterValue : "",
            filterData : "Numeric",
            filterInput : ""
        },
        id : {
            filterType : "",
            filterValue : null,
            filterData : "Numeric",
            filterInput : ""
        }
    }
    const [filterMapState,setFilterMapState] = useState(filterMapping);
    const [employeeNameFilter,setEmployeeNameFilter] = useState(false)
    const [employeeNameInput,setEmployeeNameInput] = useState("");
    const [employeeIdFilter,setEmployeeIdFilter] = useState(false)
    const [employeeIdInput,setEmployeeIdInput] = useState("")
    const [phoneFilter,setPhoneFilter] = useState(false)
    const [phoneFilterInput,setPhoneFilterInput] = useState("");
    const [dateOfJoiningFilter,setDateOfJoiningFilter] = useState(false)
    const [dateOfJoiningInput,setDateOfJoiningInput] = useState(false)

    const fetchFiltered = async  (mapState) => {
       console.log(mapState)
       const tempArray = [];
       setCurrentPage((prev) => 1)
        // we need to query thru the object
        // console.log(filterMapState);
        console.log(filterMapState)
        Object.keys(mapState).forEach(key=> {
            if(mapState[key].filterType != "") {
            console.log(key)
            console.log(mapState[key])
                console.log(mapState[key].filterData)
                console.log(mapState[key])
                tempArray.push([key,mapState[key].filterType,mapState[key].filterValue,mapState[key].filterData]);
            }
        })
        setFilterMapState(mapState)
        setPageLoading(true);
        const data = {
            "user_id": 1234,
            "rows": ["id", "employeename", "employeeid", "phoneno", "email", "userid", "roleid", "panno", "dateofjoining", "lastdateofworking", "status","role"],
            "filters": tempArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
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
    const newHandleFilter = async (inputVariable,setInputVariable,type,columnName) => {
        console.log(columnName)
        console.log('hey')
        console.log(filterMapState);
        if(columnName == 'status') {
            var existing = filterMapState;
            if(type == 'noFilter') {
                setInputVariable(""); 
            }
            if(inputVariable.toLowerCase() == 'active') {
                existing = {...existing, [columnName] : {
                    ...existing[columnName],
                     filterValue : 'true'
                }}
                existing = {...existing,[columnName] : {
                    ...existing[columnName],
                     filterType : type == 'noFilter' ? "" : type
                }}
            }else if(inputVariable.toLowerCase() == 'inactive') {
                existing = {...existing, [columnName] : {
                    ...existing[columnName],
                     filterValue : 'false'
                }}
                existing = {...existing,[columnName] : {
                    ...existing[columnName],
                     filterType : type == 'noFilter' ? "" : type
                }}
            }else {
                return ;
            }
             
        }else {
            var existing = filterMapState;
            existing = {...existing,[columnName] : {
                ...existing[columnName],
                 filterType : type == 'noFilter' ? "" : type
            }}
            existing = {...existing, [columnName] : {
                ...existing[columnName],
                 filterValue : type == 'noFilter' ? "" : inputVariable
            }}

            if(type == 'noFilter') setInputVariable("");
        }
        
        fetchFiltered(existing);
    } 
    const handleSort = async (field) => {
        setPageLoading(true);
        setFlag((prev) => !prev);
        const tempArray = [];
        // we need to query thru the object
        setSortField(field)
        console.log(filterMapState);
        Object.keys(filterMapState).forEach(key=> {
            if(filterMapState[key].filterType != "") {
                tempArray.push([key,filterMapState[key].filterType,filterMapState[key].filterValue,filterMapState[key].filterData]);
            }
        })
        const data = {
            "user_id": 1234,
            "rows": ["id", "employeename", "employeeid", "phoneno", "email", "userid", "roleid", "panno", "dateofjoining", "lastdateofworking", "status","role"],
            "filters": tempArray,
            "sort_by": [field],
            "order": !flag ? "asc" : "desc",
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
                            <h1 className='text-lg'>Manage Employee</h1>
                            <p className='text-sm'>Admin &gt; Manage Employee</p>
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
                                    Add New Employee
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
                                    <button className='w-[32%] px-1 py-2' onClick={() => { setEmployeeNameFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3'  /></button>
                                </div>
                                {employeeNameFilter && <CharacterFilter inputVariable={employeeNameInput} setInputVariable={setEmployeeNameInput} handleFilter={newHandleFilter} filterColumn='employeename' menuRef={menuRef}/>}
                                
                            </div>

                            <div className='w-[13%]  p-3'>
                                <div className="w-[80%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[70%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={employeeIdInput} onChange={(e) => setEmployeeIdInput(e.target.value)} />
                                    <button className='W-[30%] px-1 py-2' onClick={() => { setEmployeeIdFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3'  /></button>
                                </div>
                                {employeeIdFilter && <CharacterFilter inputVariable={employeeIdInput} setInputVariable={setEmployeeIdInput} filterColumn='employeeid' handleFilter={newHandleFilter} menuRef={menuRef}/>}
                            </div>

                            <div className='w-[10%]  p-3'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[62%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={phoneFilterInput} onChange={(e) => setPhoneFilterInput(e.target.value)} />
                                    <button className='w-[38%] px-1 py-2'  onClick={() => { setPhoneFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                                </div>
                                {phoneFilter && <CharacterFilter inputVariable={phoneFilterInput} setInputVariable={setPhoneFilterInput} filterColumn="phoneno" menuRef={menuRef} handleFilter={newHandleFilter}/>}
                            </div>

                            <div className='w-[10%] p-3'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[66%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
                                    <button className='w-[34%] px-1 py-2' onClick={() => { setEmailFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                                </div>
                                {emailFilter &&<CharacterFilter inputVariable={emailInput} setInputVariable={setEmailInput}filterColumn='email' menuRef={menuRef} handleFilter={newHandleFilter}/>}
                            </div>

                            <div className='w-[10%]  p-3'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[70%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={roleInput} onChange={(e) => setRoleInput(e.target.value)} />
                                    <button className='w-[30%] px-1 py-2'><img src={Filter} className='h-3 w-3' onClick={() => { setRoleFilter((prev) => !prev) }} /></button>
                                </div>
                                {roleFilter && <CharacterFilter inputVariable={roleInput} setInputVariable={setRoleInput} filterColumn='role' handleFilter={newHandleFilter} menuRef={menuRef}/>}
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
                                    <input className="w-[70%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" type="date" value={dateOfJoiningInput} onChange={(e) => setDateOfJoiningInput(e.target.value)}  />
                                    <button className='px-1 py-2 w-[30%]'  onClick={() => { setDateOfJoiningFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                                </div>
                                {dateOfJoiningFilter && <DateFilter inputVariable={dateOfJoiningInput} setInputVariable={setLdowInput} columnName='dateofjoining' handleFilter={newHandleFilter} menuRef={menuRef}/>}
                            </div>

                            <div className='w-[17%]  p-3 '>
                                <div className="w-[80%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[80%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" type='date' value={ldowInput}onChange={(e) => setLdowInput(e.target.value)} />
                                    <button className='w-[20%] px-1 py-2' onClick={() => { setLdowFilter((prev) => !prev)}}> <img src={Filter} className='h-3 w-3' /></button>
                                </div>
                                {ldowFilter && <DateFilter inputVariable={ldowInput} setInputVariable={setLdowInput} handleFilter={newHandleFilter} columnName='lastdateofworking' menuRef={menuRef}/>}
                            </div>
                            <div className='w-[10%]  p-3 '>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[70%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" type='text' value={statusInput} onChange={(e) => setStatusInput(e.target.value)} />
                                    <button className='px-1 py-2 w-[30%]'><img src={Filter} className='h-3 w-3' onClick={() => { setStatusFilter((prev) => !prev) }} /></button>
                                </div>
                                {statusFilter && <CharacterFilter inputVariable={statusInput} setInputVariable={setStatusInput} filterColumn='status' handleFilter={newHandleFilter} menuRef={menuRef}/>}
                            </div>
                        </div>
                        <div className="w-[15%] flex">
                            <div className='w-1/2 p-3'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-[65%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" value={idInput} onChange={(e) => setIdInput(Number(e.target.value))} />
                                    <button className='px-1 py-2 w-[35%] '><img src={Filter} className='h-3 w-3' onClick={() => { setIdFilter((prev) => !prev) }} /></button>
                                </div>
                                {idFilter && <NumericFilter columnName='id' inputVariable={idInput} setInputVariable={setIdInput} handleFilter={newHandleFilter} menuRef={menuRef}/>}
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
                        <div className="w-[85%] flex">
                            <div className='w-[3%] flex'>
                                <div className='p-3'>
                                    <p>Sr.</p>
                                </div>
                            </div>
                            <div className='w-[10%]  flex'>
                                <div className='p-3'>
                                    <p>Employee <button onClick={() => handleSort('employeename')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[13%]  flex'>
                                <div className='p-3'>
                                    <p>Employee ID <button onClick={() => handleSort('employeeid')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[10%]  flex'>
                                <div className='p-3'>
                                    <p>Phone <button onClick={() => handleSort('phoneno')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[10%]  flex'>
                                <div className='p-3'>
                                    <p>Email <button onClick={() => handleSort('email')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[10%]  flex'>
                                <div className='p-3'>
                                    <p>Role <button onClick={() => handleSort('role')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[10%]  flex'>
                                <div className='p-3'>
                                    <p>Pan No <button onClick={() => handleSort('panno')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[14%]  flex'>
                                <div className='p-3'>
                                    <p>Date of joining <button onClick={() => handleSort('dateofjoining')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[17%]  flex'>
                                <div className='p-3'>
                                    <p>Last Date of working <button onClick={() => handleSort('lastdateofworking')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[10%]  flex'>
                                <div className='p-3'>
                                    <p> Status <button onClick={() => handleSort('status')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                        </div>
                        <div className="w-[15%] flex">
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
                                            <p>{item.dateofjoining ? item.dateofjoining.split('T')[0] : ""}</p>
                                        </div>
                                    </div>
                                    <div className='w-[17%]  flex  overflow-hidden'>
                                        <div className='p-3 ml-1'>
                                            <p>{item.lastdateofworking ? item.lastdateofworking.split('T')[0] : ""}</p>
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

            <Modal open={isEmployeeDialogue}
                fullWidth={true}
                maxWidth={'md'}
                className='flex justify-center items-center'
            >
                <div className='flex justify-center'>
                    <div className="w-[1050px] h-auto bg-white rounded-lg">
                        <div className="h-10 bg-[#EDF3FF]  justify-center flex items-center rounded-t-lg">
                            <div className="mr-[410px] ml-[410px]">
                                <div className="text-base">Add New Employee</div>
                            </div>
                            <div className="flex justify-center items-center rounded-full w-7 h-7 bg-white">
                                <button onClick={handleClose}><img onClick={handleClose} className="w-5 h-5" src={Cross} alt="cross" /></button>
                            </div>
                        </div>

                        <div className="h-auto w-full mt-1 ">
                            <div className="flex gap-12 justify-center">
                                <div className=" space-y-3 py-5">
                                    <div className="">
                                        <div className="text-sm">Employee Name <label className="text-red-500">*</label></div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="employeeName" value={formValues.employeeName} onChange={handleChange} />
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.employeeName}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-sm">Pan No <label className="text-red-500">*</label></div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="panNo" value={formValues.panNo} onChange={handleChange} />
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.panNo}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-sm">Username <label className="text-red-500">*</label></div>
                                        <select className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none"
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
                                        <div className="text-sm">Date of joining <label className="text-red-500">*</label></div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="date" name="doj" value={formValues.doj} onChange={handleChange} />
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.doj}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-sm">Designation <label className="text-red-500">*</label></div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="designation" value={formValues.designation} onChange={handleChange} />
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.designation}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-sm">Email <label className="text-red-500">*</label></div>
                                        <input className="w-56 h-4 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="email" name="email" value={formValues.email} onChange={handleChange} />
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.email}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-sm">Address Line 1</div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="addressLine1" value={formValues.addressLine1} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className=" space-y-3 py-5">
                                    <div className="">
                                        <div className="text-sm">Employee ID <label className="text-red-500">*</label></div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="employeeId" value={formValues.employeeId} onChange={handleChange} />
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.employeeId}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-sm">LOB <label className="text-red-500">*</label></div>
                                        <select className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs"
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
                                            {/* <option value="none" hidden={true}>Select a LOB</option> */}
                                            {allLOB && allLOB.map(item => (
                                                <option value={item.id} >
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="">
                                        <div className="text-sm">Date of birth <label className="text-red-500">*</label></div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="date" name="dob" value={formValues.dob} onChange={handleChange} />
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.dob}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-sm">Last Date of Working</div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="date" name="lastDOW" value={formValues.lastDOW} onChange={handleChange} />
                                    </div>
                                    <div className="">
                                        <div className="text-sm">Assign Role <label className="text-red-500">*</label></div>
                                        <select className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none"
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
                                        <div className="text-sm">Phone Number <label className="text-red-500">*</label></div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="phNo" value={formValues.phNo} onChange={handleChange} />
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.phNo}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-sm">Address Line 2</div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="addressLine2" value={formValues.addressLine2} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className=" space-y-3 py-5">
                                    <div className="">
                                        <div className="text-sm">Country Name <label className="text-red-500">*</label></div>
                                        <select className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none"
                                            name="country"
                                            value={formValues.country}
                                            defaultValue="Select Country"
                                            onChange={e => {
                                                setCurrCountry(e.target.value);
                                                fetchStateData(e.target.value);
                                                setAllCity([]);
                                                const existing = {...formValues}
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
                                                return <option value={item[0]}> {item[1]}</option>
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
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.country}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-sm">State Name<label className="text-red-500">*</label></div>
                                        <select className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none"
                                            name="state"
                                            value={formValues.state}
                                            defaultValue="Select State"
                                            onChange={e => {
                                                fetchCityData(e.target.value);
                                                const existing = {...formValues}
                                                existing.state = e.target.value
                                                existing.city = null
                                                console.log(existing)
                                                setFormValues(existing)
                                            }}
                                        >
                                            <option value="" > Select A State</option>
                                            {allState && allState.map(item => {
                                                
                                                
                                                    return <option value={item[0]} >
                                                        {item[0]}
                                                    </option>
                                                

                                            })}
                                        </select>
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.state}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-sm">City Name <label className="text-red-500">*</label></div>
                                        <select className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none"
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
                                            {/* <option value="none" hidden={true}>Select a City</option> */}
                                            <option value="none" hidden> Select A City</option>
                                            {allCity && allCity.map(item => (
                                                <option value={item.id} >
                                                    {item.city}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.city}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-sm">Suburb</div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="suburb" value={formValues.suburb} onChange={handleChange} />
                                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.suburb}</div> */}
                                    </div>
                                    <div className="">
                                        <div className="text-sm">Zip Code</div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="zipCode" value={formValues.zipCode} onChange={handleChange} />
                                    </div>
                                    <div className="">
                                        <div className="text-sm">Entities <label className="text-red-500">*</label></div>
                                        <select className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none"
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
                        <div className="mt-3 flex justify-center items-center text-sm font-semibold"><input
                            type="checkbox"
                            checked={formValues.status}
                            className='mr-3 h-4 w-4'
                            onClick={(e) => {
                                // console.log(e.target.checked)
                                const existing = { ...formValues };
                                existing.status = !existing.status;
                                setFormValues(existing)
                            }}
                        />Active</div>
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

export default ManageEmployees
