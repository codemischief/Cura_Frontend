import React from 'react';
import { Outlet, Link, useNavigate } from "react-router-dom";
import backLink from "../../../assets/back.png";
import searchIcon from "../../../assets/searchIcon.png";
import nextIcon from "../../../assets/next.png";
import refreshIcon from "../../../assets/refresh.png";
import downloadIcon from "../../../assets/download.png";
import { useState, useEffect, useRef } from 'react';
import Navbar from "../../../Components/Navabar/Navbar";
import Cross from "../../../assets/cross.png";
import { Modal, Pagination, LinearProgress, Select, CircularProgress } from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import Checkbox from '@mui/material/Checkbox';
import { APIService } from '../../../services/API';
import Pdf from "../../../assets/pdf.png";
import Excel from "../../../assets/excel.png"
import Edit from "../../../assets/edit.png"
import Trash from "../../../assets/trash.png"
import Filter from "../../../assets/filter.png"
import Add from "../../../assets/add.png";
import EyeHide from "./../../../assets/eyeHide.png";
import EditClientInvoice from './EditUser';
import SucessfullModal from '../../../Components/modals/SucessfullModal';
import CancelModel from './../../../Components/modals/CancelModel';
import SaveConfirmationUser from './SaveConfirmationUser';
import FailureModal from '../../../Components/modals/FailureModal';
import DeleteUserModal from './DeleteUserModal';
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
import CharacterFilter from "../../../Components/Filters/CharacterFilter"
import DateFilter from '../../../Components/Filters/DateFilter';
import NumericFilter from '../../../Components/Filters/NumericFilter';
import AsyncSelect from "react-select/async"
import EditUser from './EditUser';
import Draggable from 'react-draggable';
import eyeIcon from "../../../assets/eye.jpg";
import bcrypt from 'bcryptjs';
import ActiveFilter from "../../../assets/active_filter.png";
import AddButton from '../../../Components/common/CustomButton';

const ManageUser = () => {

    const menuRef = useRef();
    const navigate = useNavigate();
    // we have the module here
    const [pageLoading, setPageLoading] = useState(false);
    const [existingUsers, setExistingUser] = useState([]);
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
    const [isUserDialogue, setIsUserDialogue] = useState(false);
    const [isEditDialogue, setIsEditDialogue] = React.useState(false);
    const [currItem, setCurrItem] = useState({});
    const [showAddSuccess, setShowAddSuccess] = useState(false);
    const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
    const [openAddConfirmation, setOpenAddConfirmation] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isFailureModal, setIsFailureModal] = useState(false)
    const [deleteConfirmation, showDeleteConfirmation] = useState(false);

    const [nameFilter, setNameFilter] = useState(false)
    const [nameFilterInput, setNameFilterInput] = useState("");
    const [usernameFilter, setUsernameFilter] = useState(false)
    const [usernameFilterInput, setUsernameFilterInput] = useState("");
    const [roleFilter, setRoleFilter] = useState(false)
    const [roleFilterInput, setRoleFilterInput] = useState("");
    const [statusFilter, setStatusFilter] = useState(false)
    const [statusFilterInput, setStatusFilterInput] = useState("");
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
        setBackDropLoading(true)
        setPageLoading(true);
        const tempArray = [];
        // we need to query thru the object
        // console.log(filterMapState);
        console.log(filterMapState)
        Object.keys(filterMapState).forEach(key => {
            if (filterMapState[key].filterType != "") {
                tempArray.push([key, filterMapState[key].filterType, filterMapState[key].filterValue, filterMapState[key].filterData]);
            }
        })
        // setCurrentPage((prev) => 1)
        setFilterState(tempArray)
        setCurrentPage((prev) => 1)
        // we need to query thru the object
        // setPageLoading(true);
        const data = {
            "user_id": 1234,
            "rows": [
                "fullname",
                "username",
                "role_name",
                "status",
                "id"
            ],
            "filters": tempArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": searchInput
        };
        const response = await APIService.getUser(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingUser(result);
        setBackDropLoading(false)
        setPageLoading(false);
    }
    const fetchPageData = async (pageNumber) => {
        setPageLoading(true);

        // we need to query thru the object
        setCurrentPage((prev) => pageNumber)
        const data = {
            "user_id": 1234,
            "rows": [
                "fullname",
                "username",
                "role_name",
                "status",
                "id"
            ],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": Number(pageNumber),
            "pg_size": Number(currentPages),
            "search_key": searchInput
        };
        const response = await APIService.getUser(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingUser(result);
        setPageLoading(false);
    }
    const fetchQuantityData = async (quantity) => {
        setPageLoading(true);
        setCurrentPage((prev) => 1)
        console.log(searchInput);
        const data = {
            "user_id": 1234,
            "rows": [
                "fullname",
                "username",
                "role_name",
                "status",
                "id"
            ],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(quantity),
            "search_key": searchInput
        };
        const response = await APIService.getUser(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingUser(result);
        setPageLoading(false);
    }
    useEffect(() => {
        fetchData();
        fetchCityData('Maharashtra')
        fetchTallyLedgerData();
        getVendorCategoryAdmin();
        fetchRoleData();
        fetchLobData();
        const handler = (e) => {
            if (menuRef.current == null || !menuRef.current.contains(e.target)) {
                setNameFilter(false)
                setUsernameFilter(false)
                setRoleFilter(false)
                setStatusFilter(false)
                setIdFilter(false)
                setDownloadModal(false)
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
        setIsUserDialogue(true);
    };

    const handleClose = () => {
        initials();
        setIsUserDialogue(false);
        openAddCancelModal();
    }
    const initials = () => {
        setFormValues(initialValues);
        setFormErrors({});
    }
    const handleAddUser = () => {
        console.log(formValues)
        if (!validate()) {
            console.log('hu')
            return;
        }
        setIsUserDialogue(false);
        setOpenAddConfirmation(true);

    }
    const addUser = async () => {

        let arr = (formValues.nameOfTheUser).split(" ");
        let firstName = arr[0];
        let lastName = "";
        if (arr.length >= 1) {
            lastName = arr[1];
            for (let i = 2; i < arr.length; i++) {
                lastName += " ";
                lastName += arr[i];
            }
        }
        setIsUserDialogue(false);


        const data = {
            "user_id": 1234,
            "username": formValues.userName,
            "roleid": Number(formValues.role),
            "password": btoa(formValues.password),
            "officeid": 2,
            "lobid": Number(formValues.lob),
            "usercode": "code",
            "firstname": firstName,
            "lastname": lastName ? lastName : "",
            "status": formValues.status,
            "effectivedate": formValues.effectiveDate,
            "homephone": formValues.homePhone,
            "workphone": formValues.workPhone,
            "email1": formValues.email1,
            "email2": formValues.email2,
            "addressline1": formValues.addressLine1,
            "addressline2": formValues.addressLine2,
            "suburb": formValues.suburb,
            "city": Number(formValues.city),
            "state": "Maharashtra",
            "country": 5,
            "zip": formValues.zipCode,
            "entityid": 1
        }
        const response = await APIService.addUser(data);

        const result = (await response.json())

        setOpenAddConfirmation(false);
        console.log(result)
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
        nameOfTheUser: null,
        userName: null,
        password: null,
        lob: null,
        email1: null,
        workPhone: null,
        addressLine1: null,
        effectiveDate: null,
        confirmPassword: null,
        role: null,
        email2: null,
        homePhone: null,
        addressLine2: null,
        city: 847,
        suburb: null,
        zipCode: null,
        status: false

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

        if (!formValues.nameOfTheUser) {
            setFormErrors((existing) => {
                return { ...existing, nameOfTheUser: "Enter The Name Of The User" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, nameOfTheUser: "" }
            })
        }

        if (!formValues.userName) {
            setFormErrors((existing) => {
                return { ...existing, userName: "Enter UserName" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, userName: "" }
            })
        }

        if (!formValues.password) {
            setFormErrors((existing) => {
                return { ...existing, password: "Enter Password" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, password: "" }
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
        if (!formValues.email1) {
            setFormErrors((existing) => {
                return { ...existing, email1: "Enter Email" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, email1: "" }
            })
        }
        if (!formValues.addressLine1) {
            setFormErrors((existing) => {
                return { ...existing, addressLine1: "Enter Address" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, addressLine1: "" }
            })
        }
        if (!formValues.effectiveDate) {
            setFormErrors((existing) => {
                return { ...existing, effectiveDate: "Select Effective Date" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, effectiveDate: "" }
            })
        }
        if (!formValues.confirmPassword) {
            console.log("whyyyy")
            setFormErrors((existing) => {
                return { ...existing, confirmPassword: "Enter Confirm Password" }
            })
            res = false;
        } else if (formValues.password && formValues.confirmPassword && formValues.password !== formValues.confirmPassword) {
            console.log("ayoo")
            setFormErrors((existing) => {
                return { ...existing, confirmPassword: "Password does not match" }
            })
            res = false;
        }
        else {
            console.log("good");
            setFormErrors((existing) => {
                return { ...existing, confirmPassword: "" }
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
        if (!formValues.homePhone) {
            setFormErrors((existing) => {
                return { ...existing, homePhone: "Enter home phone number" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, homePhone: "" }
            })
        }
        if (!formValues.city) {
            setFormErrors((existing) => {
                return { ...existing, city: "Select City" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, city: "" }
            })
        }
        if (!formValues.suburb) {
            setFormErrors((existing) => {
                return { ...existing, suburb: "Enter Suburb" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, suburb: "" }
            })
        }
        if (!formValues.zipCode) {
            setFormErrors((existing) => {
                return { ...existing, zipCode: "Enter Zip Code" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, zipCode: "" }
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
        const response = await APIService.deleteUser(data);
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
        setDownloadModal(false)
        setBackDropLoading(true)
        const data = {
            "user_id": 1234,
            "rows": [
                "fullname",
                "username",
                "role_name",
                "status",
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
                "fullname" : "Name",
                "username" : "Username",
                "role_name" : "Role",
                "status" : "Status",
                "id" : "ID"
            }
        };
        const response = await APIService.getUser(data)
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
                        FileSaver.saveAs(result, 'UserData.xlsx');
                    } else if (type == "pdf") {
                        FileSaver.saveAs(result, 'UserData.pdf');
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
                "fullname",
                "username",
                "role_name",
                "status",
                "id"
            ],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": searchInput
        };
        const response = await APIService.getUser(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingUser(result);
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
                "fullname",
                "username",
                "role_name",
                "status",
                "id"
            ],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": ""
        };
        const response = await APIService.getUser(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingUser(result);
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
        setIsUserDialogue(false);
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
        fullname: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        username: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        role_name: {
            filterType: "",
            filterValue: "",
            filterData: "String",
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
    const [filterState, setFilterState] = useState([]);
    const fetchFiltered = async (mapState) => {
        setFilterMapState(mapState)
        const tempArray = [];
        setNameFilter(false)
        setUsernameFilter(false)
        setRoleFilter(false)
        setStatusFilter(false)
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
                "fullname",
                "username",
                "role_name",
                "status",
                "id"
            ],
            "filters": tempArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": isSearchOn ? searchInput : ""
        };
        const response = await APIService.getUser(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingUser(result);
        setPageLoading(false);
    }
    const newHandleFilter = async (inputVariable, setInputVariable, type, columnName) => {

        console.log(columnName)
        console.log(inputVariable)
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
                existing = {
                    ...existing, [columnName]: {
                        ...existing[columnName],
                        filterValue: ''
                    }
                }
                console.log(type)
                existing = {
                    ...existing, [columnName]: {
                        ...existing[columnName],
                        filterType: type == 'noFilter' ? "" : type
                    }
                }
            }

        }
        else {
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
        }

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
                "fullname",
                "username",
                "role_name",
                "status",
                "id"
            ],
            "filters": filterState,
            "sort_by": [field],
            "order": !flag ? "asc" : "desc",
            "pg_no": Number(currentPage),
            "pg_size": Number(currentPages),
            "search_key": isSearchOn ? searchInput : ""
        };
        // setFlag((prev) => !prev);
        const response = await APIService.getUser(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingUser(result);
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
        console.log(inputVariable)
        if (event.keyCode === 13) {
            // if its empty then we remove that 
            // const temp = {...filterMapState};
            // temp[columnName].type = "".
            // setFilterMapState(temp)
            if (inputVariable == "") {
                console.log('here')
                const temp = { ...filterMapState }
                temp[columnName].filterType = ""
                // temp[key].filterValue
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
    const [type1, setType1] = useState("password");
    const [type2, setType2] = useState("password");
    const [openEyeIconPass, setOpenEyeIconPass] = useState(true);
    const [openEyeIconCon, setOpenEyeIconCon] = useState(true);

    // password visibility
    const passwordToggle = () => {
        if (type1 === "password") {
            setType1("text");
        } else {
            setType1("password");
        }
        setOpenEyeIconPass((prev) => { return !prev });
    };

    const confirmPasswordToggle = () => {
        if (type2 === "password") {
            setType2("text");
        } else {
            setType2("password");
        }
        setOpenEyeIconCon((prev) => { return !prev });
    };
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
            {isEditDialogue && <EditUser handleClose={() => setIsEditDialogue(false)} currUser={editId} allCity={allCity} allLOB={allLOB} allRoles={allRoles} showSuccess={openEditSuccess} showCancel={openCancelModal} openFailureModal={openFailureModal} setErrorMessage={setErrorMessage} />}
            {showAddSuccess && <SucessfullModal isOpen={showAddSuccess} message="New User created succesfully" />}
            {showDeleteSuccess && <SucessfullModal isOpen={showDeleteSuccess} message="User deleted succesfully" />}
            {showEditSuccess && <SucessfullModal isOpen={showEditSuccess} message="Changes saved successfully" />}
            {openAddConfirmation && <SaveConfirmationUser handleClose={() => setOpenAddConfirmation(false)} currName={formValues.nameOfTheUser} addUser={addUser} showCancel={openAddCancelModal} setDefault={initials} />}
            {isFailureModal && <FailureModal isOpen={isFailureModal} message={errorMessage} />}
            {deleteConfirmation && <DeleteUserModal handleClose={() => showDeleteConfirmation(false)} handleDelete={deleteUser} item={currId} showCancel={openCancelModal} name={currName} />}
            {showCancelModelAdd && <CancelModel isOpen={showCancelModelAdd} message="Process cancelled, no new user created." />}
            {showCancelModel && <CancelModel isOpen={showCancelModel} message="Process cancelled, no changes saved." />}
            <div className='h-[calc(100vh_-_7rem)] w-full  px-10'>
                <div className='h-16 w-full  flex justify-between items-center p-2  border-gray-300 border-b-2'>
                    <div className='flex items-center space-x-3'>
                        <div className='rounded-2xl  bg-[#EBEBEB] h-8 w-8 flex justify-center items-center '>
                            <button onClick={() => navigate(-1)}><img className='w-5 h-5' src={backLink} /></button>
                        </div>

                        <div className='flex-col'>
                            <h1 className='text-lg'>Manage User</h1>
                            <p className='text-sm'>Admin &gt; Manage User</p>
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
                            {/* <button className="bg-[#004DD7] text-white h-9 w-72 rounded-lg" onClick={handleOpen}>
                                <div className="flex items-center justify-center gap-4">
                                    Add New User
                                    <img className='h-4 w-4' src={Add} alt="add" />
                                </div>
                            </button> */}
                            <AddButton title="Add New User" onClick={handleOpen} />
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
                            <div className='w-[24%]  px-3 py-2.5'>
                                <div className="w-[55%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[75%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={nameFilterInput} onChange={(e) => setNameFilterInput(e.target.value)}
                                        onKeyDown={(event) => handleEnterToFilter(event, nameFilterInput,
                                            setNameFilterInput,
                                            'contains',
                                            'fullname')}
                                    />
                                    {filterMapState.fullname.filterType == "" ? <button className='w-[30%] px-1 py-2' onClick={() => setNameFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> : <button className='w-[30%] px-1 py-2' onClick={() => setNameFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>}
                                </div>
                                {nameFilter && <CharacterFilter inputVariable={nameFilterInput} setInputVariable={setNameFilterInput} handleFilter={newHandleFilter} filterColumn='fullname' menuRef={menuRef} filterType={filterMapState.fullname.filterType} />}
                            </div>

                            <div className='w-[30%]  px-3 py-2.5 mx-[-2px]'>
                                <div className="w-[45%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[75%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={usernameFilterInput} onChange={(e) => setUsernameFilterInput(e.target.value)}

                                        onKeyDown={(event) => handleEnterToFilter(event, usernameFilterInput,
                                            setUsernameFilterInput,
                                            'contains',
                                            'username')}

                                    />
                                    {filterMapState.username.filterType == "" ? <button className='w-[30%] px-1 py-2' onClick={() => setUsernameFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> : <button className='w-[30%] px-1 py-2' onClick={() => setUsernameFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>}
                                </div>
                                {usernameFilter && <CharacterFilter inputVariable={usernameFilterInput} setInputVariable={setUsernameFilterInput} filterColumn='username' handleFilter={newHandleFilter} menuRef={menuRef} filterType={filterMapState.username.filterType} />}
                            </div>

                            <div className='w-[20%]  px-3 py-2.5 '>
                                <div className="w-[60%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[75%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={roleFilterInput} onChange={(e) => setRoleFilterInput(e.target.value)}


                                        onKeyDown={(event) => handleEnterToFilter(event, roleFilterInput,
                                            setRoleFilterInput,
                                            'contains',
                                            'role_name')}


                                    />
                                    {filterMapState.role_name.filterType == "" ? <button className='w-[30%] px-1 py-2' onClick={() => setRoleFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> : <button className='w-[30%] px-1 py-2' onClick={() => setRoleFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>}
                                </div>
                                {roleFilter && <CharacterFilter inputVariable={roleFilterInput} setInputVariable={setRoleFilterInput} filterColumn='role_name' handleFilter={newHandleFilter} menuRef={menuRef} filterType={filterMapState.role_name.filterType} />}
                            </div>

                            <div className='w-[20%]  px-3 py-2.5'>
                                <div className="w-[60%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[75%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={statusFilterInput} onChange={(e) => setStatusFilterInput(e.target.value)}

                                        onKeyDown={(event) => handleEnterToFilter(event, statusFilterInput,
                                            setStatusFilterInput,
                                            'equalTo',
                                            'status')}

                                    />
                                    {filterMapState.status.filterType == "" ? <button className='w-[30%] px-1 py-2' onClick={() => setStatusFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> : <button className='w-[30%] px-1 py-2' onClick={() => setStatusFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>}
                                </div>
                                {statusFilter && <NumericFilter inputVariable={statusFilterInput} setInputVariable={setStatusFilterInput} columnName='status' handleFilter={newHandleFilter} menuRef={menuRef} filterType={filterMapState.status.filterType} />}
                            </div>
                        </div>
                        <div className="w-[30%] flex">
                            <div className='w-[75%] px-3 py-2.5 mx-[-3px]'>
                                <div className="w-[30%] flex items-center bg-[#EBEBEB] rounded-[5px]">
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
                            <div className='w-[24%]  flex'>
                                <div className='px-3 py-3.5'>
                                    <p>Name <button onClick={() => handleSort('fullname')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[30%]  flex'>
                                <div className='px-3 py-3.5'>
                                    <p>Username <button onClick={() => handleSort('username')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[20%]  flex'>
                                <div className='px-3 py-3.5'>
                                    <p>Role <button onClick={() => handleSort('role_name')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[20%]  flex'>
                                <div className='px-3 py-3.5'>
                                    <p>Status <button onClick={() => handleSort('status')}><span className="font-extrabold">↑↓</span></button></p>
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
                        {!pageLoading && existingUsers && existingUsers.length == 0 && <div className='h-10 border-gray-400 border-b-[1px] flex items-center'>
                            <h1 className='ml-10'>No Records To Show</h1>
                        </div>}
                        {!pageLoading && existingUsers.map((item, index) => {
                            return <div className='w-full h-10 bg-white flex justify-between items-center border-gray-400 border-b-[1px]'>
                                <div className="w-[70%] flex items-center">
                                    <div className='w-[6%] flex'>
                                        <div className='px-3 overflow-x-hidden'>
                                            <p>{index + 1 + (currentPage - 1) * currentPages}</p>
                                        </div>
                                    </div>
                                    <div className='w-[24%] flex'>
                                        <div className='px-3 overflow-x-hidden'>
                                            <p>{item.fullname}</p>
                                        </div>
                                    </div>
                                    <div className='w-[30%]  flex'>
                                        <div className='px-3 overflow-x-hidden'>
                                            <p>{item.username}</p>
                                        </div>
                                    </div>
                                    <div className='w-[20%]  flex pl-0.5'>
                                        <div className='px-3 overflow-x-hidden'>
                                            <p>{item.role_name}</p>
                                        </div>
                                    </div>
                                    <div className='w-[20%]  flex pl-0.5'>
                                        <div className='px-3 flex items-center space-x-2'>
                                            {item.status ? <><div className='w-[7px] h-[7px] rounded-xl bg-green-600'></div>
                                                <p>active</p></> : <><div className='w-[7px] h-[7px] rounded-xl bg-red-600'></div>
                                                <p> inactive</p></>}
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
                                        <div className=' py-5 flex ml-4'>
                                            <div className='flex space-x-5'>
                                                <button onClick={() => { handleEdit(item.id) }}> <img className='w-4 h-4 cursor-pointer' src={Edit} alt="edit" /></button>
                                                <button onClick={() => handleDelete(item.id, item.fullname)}><img className='w-4 h-4 cursor-pointer' src={Trash} alt="trash" /></button>
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
                    {downloadModal && <div className='h-[120px] w-[220px] bg-white shadow-xl rounded-md absolute bottom-12 right-24 flex-col items-center justify-center  p-5' ref={menuRef}>
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

            <Modal open={isUserDialogue}
                fullWidth={true}
                maxWidth={'md'}
                className='flex justify-center items-center'
            >
                <>
                    <Draggable handle='div.move'>
                        <div className='flex justify-center '>
                            <div className="w-[1050px] h-auto bg-white rounded-lg">
                                <div className='move cursor-move'>
                                    <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-lg">
                                        <div className="mr-[410px] ml-[410px]">
                                            <div className="text-[16px]">Add New User</div>
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
                                                <div className="text-[13px]">Name of the User <label className="text-red-500">*</label></div>
                                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="nameOfTheUser" value={formValues.nameOfTheUser} onChange={handleChange} />
                                                <div className="text-[9px] text-[#CD0000] absolute">{formErrors.nameOfTheUser}</div>
                                            </div>
                                            <div className="">
                                                <div className="text-[13px]">Create Username <label className="text-red-500">*</label></div>
                                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="userName" value={formValues.userName} onChange={handleChange} />
                                                <div className="text-[9px] text-[#CD0000] absolute">{formErrors.userName}</div>
                                            </div>
                                            <div className="">
                                                <div className="text-[13px]">Create Password <label className="text-red-500">*</label></div>
                                                <div className="m-0 p-0 relative">
                                                    <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type={type1} name="password" value={formValues.password} onChange={handleChange} />
                                                    {openEyeIconPass &&
                                                        <span className="w-4 h-4 absolute right-1 top-2">
                                                            <img
                                                                className='cursor-pointer'
                                                                onClick={passwordToggle}
                                                                src={eyeIcon}
                                                                alt="eye-icon"
                                                            />
                                                        </span>
                                                    }
                                                    {!openEyeIconPass &&
                                                        <span className="w-4 h-4 absolute right-1 top-1.5">
                                                            <img
                                                                className='cursor-pointer'
                                                                onClick={passwordToggle}
                                                                src={EyeHide}
                                                                alt="eye-icon"
                                                            />
                                                        </span>
                                                    }
                                                </div>
                                                <div className="text-[9px] text-[#CD0000] absolute">{formErrors.password}</div>
                                            </div>
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
                                                <div className="text-[13px]">Email 1 <label className="text-red-500">*</label></div>
                                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="email1" value={formValues.email1} onChange={handleChange} />
                                                <div className="text-[9px] text-[#CD0000] absolute">{formErrors.email1}</div>
                                            </div>
                                            <div className="">
                                                <div className="text-[13px]">Work Phone</div>
                                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="email" name="workPhone" value={formValues.workPhone} onChange={handleChange} />
                                            </div>
                                            <div className="">
                                                <div className="text-[13px]">Address Line 1 <label className="text-red-500">*</label></div>
                                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="addressLine1" value={formValues.addressLine1} onChange={handleChange} />
                                                <div className="text-[9px] text-[#CD0000] absolute">{formErrors.addressLine1}</div>
                                            </div>
                                        </div>
                                        <div className=" space-y-[12px] py-[20px] px-[10px]">
                                            <div className="">
                                                <div className="text-sm text-[#787878] mb-0.5">Office </div>
                                                <div className="w-[230px] h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs py-0.5 bg-[#F5F5F5]" type="text" name="curaoffice" value={formValues.curaoffice} onChange={handleChange} >Pune</div>
                                            </div>
                                            <div className="">
                                                <div className="text-[13px]">Effective Date <label className="text-red-500">*</label></div>
                                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="date" name="effectiveDate" value={formValues.effectiveDate} onChange={handleChange} />
                                                <div className="text-[9px] text-[#CD0000] absolute">{formErrors.effectiveDate}</div>
                                            </div>
                                            <div className="">
                                                <div className="text-[13px]">Confirm Password <label className="text-red-500">*</label></div>
                                                <div className="m-0 p-0 relative">
                                                    <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type={type2} name="confirmPassword" value={formValues.confirmPassword} onChange={handleChange} />
                                                    {openEyeIconCon &&
                                                        <span className="w-4 h-4 absolute right-1 top-2">
                                                            <img
                                                                className='cursor-pointer'
                                                                onClick={confirmPasswordToggle}
                                                                src={eyeIcon}
                                                                alt="eye-icon"
                                                            />
                                                        </span>
                                                    }
                                                    {!openEyeIconCon &&
                                                        <span className="w-4 h-4 absolute right-1 top-1.5">
                                                            <img
                                                                className='cursor-pointer'
                                                                onClick={confirmPasswordToggle}
                                                                src={EyeHide}
                                                                alt="eye-icon"
                                                            />
                                                        </span>
                                                    }
                                                </div>
                                                <div className="text-[9px] text-[#CD0000] absolute">{formErrors.confirmPassword}</div>
                                            </div>
                                            <div className="">
                                                <div className="text-[13px]">Assign Role <label className="text-red-500">*</label></div>
                                                <select className="w-[230px] h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none"
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
                                                    <option value="none" hidden>Select a Role</option>
                                                    {allRoles && allRoles.map(item => (
                                                        <option value={item.id} >
                                                            {item.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                <div className="text-[9px] text-[#CD0000] absolute">{formErrors.role}</div>
                                            </div>
                                            <div className="">
                                                <div className="text-[13px]">Email 2</div>
                                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="email2" value={formValues.email2} onChange={handleChange} />
                                            </div>
                                            <div className="">
                                                <div className="text-[13px]">Home Phone <label className="text-red-500">*</label></div>
                                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="homePhone" value={formValues.homePhone} onChange={handleChange} />
                                                <div className="text-[9px] text-[#CD0000] absolute">{formErrors.homePhone}</div>
                                            </div>
                                            <div className="">
                                                <div className="text-[13px]">Address Line 2</div>
                                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="addressLine2" value={formValues.addressLine2} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className=" space-y-[12px] py-[20px] px-[10px] ">
                                            <div className="">
                                                <div className="text-[13px] ">City <label className="text-red-500">*</label></div>
                                                <select className="w-[230px] h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none"
                                                    name="city"
                                                    value={formValues.city}
                                                    defaultValue="Select City"
                                                    onChange={handleChange}
                                                >
                                                    {/* <option value="none" hidden={true}>Select a City</option> */}
                                                    <option value="none" hidden> Select A City</option>
                                                    {allCity && allCity.map(item => (
                                                        <option value={item.id} >
                                                            {item.city}
                                                        </option>
                                                    ))}
                                                </select>
                                                <div className="text-[9px] text-[#CD0000] absolute">{formErrors.city}</div>
                                            </div>
                                            <div className="">
                                                <div className="text-[13px]">Suburb <label className="text-red-500">*</label></div>
                                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="suburb" value={formValues.suburb} onChange={handleChange} />
                                                <div className="text-[9px] text-[#CD0000] absolute">{formErrors.suburb}</div>
                                            </div>
                                            <div className="">
                                                <div className="text-[13px]">Zip Code <label className="text-red-500">*</label></div>
                                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="zipCode" value={formValues.zipCode} onChange={handleChange} />
                                                <div className="text-[9px] text-[#CD0000] absolute">{formErrors.zipCode}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2 flex justify-center items-center text-sm font-semibold"><input
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
                                <div className="my-2 flex justify-center items-center gap-[10px]">
                                    <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' onClick={handleAddUser}>Add</button>
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
export default ManageUser
