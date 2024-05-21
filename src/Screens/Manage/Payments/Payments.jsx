import React from 'react';
import { Outlet, Link } from "react-router-dom";
import backLink from "../../../assets/back.png";
import searchIcon from "../../../assets/searchIcon.png";
import nextIcon from "../../../assets/next.png";
import refreshIcon from "../../../assets/refresh.png";
import downloadIcon from "../../../assets/download.png";
import { useState, useEffect, useRef } from 'react';
import Navbar from "../../../Components/Navabar/Navbar";
import Edit from "../../../assets/edit.png";
import Trash from "../../../assets/trash.png";
import Cross from "../../../assets/cross.png";
import Add from "../../../assets/add.png";
import Filter from "../../../assets/filter.png"
import { Modal, Pagination, LinearProgress , CircularProgress } from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
import { APIService } from '../../../services/API';
import SucessfullModal from '../../../Components/modals/SucessfullModal';
import CharacterFilter from '../../../Components/Filters/CharacterFilter';
import NumericFilter from '../../../Components/Filters/NumericFilter';
import EditPayments from './EditPayments';
import Pdf from "../../../assets/pdf.png"
import Excel from "../../../assets/excel.png"
import SaveConfirmationPayments from './SaveConfirmationPayments';
import FailureModal from '../../../Components/modals/FailureModal';
import CancelModel from './../../../Components/modals/CancelModel';
import DeletePaymentModal from './DeletePaymentModal';
import DateFilter from '../../../Components/Filters/DateFilter';
import Draggable from 'react-draggable';
import PaymentDropDown from '../../../Components/Dropdown/PaymentDropDown.jsx';
import DropDown from '../../../Components/Dropdown/Dropdown';
import ActiveFilter from "../../../assets/active_filter.png"
import {formatDate} from "../../../utils/formatDate.js"
import { usernameByUserId } from '../../../utils/UsernameByUserId.js';
const Payments = () => {
    const menuRef = useRef();
    const [totalItems, setTotalItems] = useState(0);
    const [currentPages, setCurrentPages] = useState(15);
    const [currentPage, setCurrentPage] = useState(1);
    const [downloadModal, setDownloadModal] = useState(false);
    const [allUsername, setAllUsername] = useState([]);
    const [pageLoading, setPageLoading] = useState(false);
    const [allEntities, setAllEntites] = useState([]);
    const [currentStatement, setCurrentStatement] = useState({});
    const [currentStatementId, setCurrentStatementId] = useState();
    const [showDelete, setShowDelete] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [isSearchOn, setIsSearchOn] = useState(false);
    const [sortField, setSortField] = useState("id");
    const [openAddConfirmation, setOpenAddConfirmation] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isFailureModal, setIsFailureModal] = useState(false);
    const openDownload = () => {
        setDownloadModal(true);
    }
    // we have the module here
    const handlePageChange = (event, value) => {
        setCurrentPage(value)
        fetchPageData(value);
    }
    const fetchUsersData = async () => {
        // setPageLoading(true);
        // const data = { "user_id":  1234 };
        const data = { "user_id": 1234 };
        const response = await APIService.getUsers(data)
        const result = (await response.json());

        
        if (Array.isArray(result.data)) {
            setAllUsername(result.data);
        }
    }
    const fetchEntitiesData = async () => {
        // setPageLoading(true);
        // const data = { "user_id":  1234 };
        const data = { "user_id": 1234 };
        const response = await APIService.getEntityAdmin(data)
        const result = (await response.json());
        // console.log(result.data);
        setFormValues((existing) => {
            return { ...existing, entity: result.data[0][0] }
        })
        if (Array.isArray(result.data)) {
            setAllEntites(result.data);
        }
    }
    const [existingPayments, setExistingPayments] = useState([]);
    const [paymentFor, setPaymentFor] = useState([]);
    const [paymentMode, setPaymentMode] = useState([]);
    const fetchPaymentMode = async () => {
        const data = {
            "user_id": 1234
        }
        const response = await APIService.getModesAdmin(data);
        const result = (await response.json());
        // console.log(result.data);
        setPaymentMode(result.data);
        // setFormValues((existing) => {
        //     return { ...existing, paymentmode: result.data[0][0] }
        // })
    }
    const fetchPaymentFor = async () => {
        const data = {
            "user_id": 1234
        }
        const response = await APIService.getPaymentFor(data);
        const result = (await response.json())
        setPaymentFor(result.data);
        // console.log(result.data);
        // setFormValues((existing) => {
        //     return { ...existing, paymentfor: result.data[0].id }
        // })
        // console.log(result);
    }
    useEffect(() => {
        fetchData();
        fetchUsersData();
        fetchEntitiesData();
        fetchPaymentFor();
        fetchPaymentMode();
        const handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setPaymentByFilter(false);
                setPaymentToFilter(false);
                setAmountFilter(false);
                setPaidOnFilter(false);
                setPaymentModeFilter(false)
                setPaymentForFilter(false)
                setPaymentStatusFilter(false)
                setEntityFilter(false)
                setIdFilter(false)
                setDownloadModal(false)

            }
        }

        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);

    const [flag, setFlag] = useState(false)

    const fetchData = async () => {
        setPageLoading(true);
        const tempArray = [];
        // we need to query thru the object
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
                    tempArray.push([key, filterMapState[key].filterType, filterMapState[key].filterValue, filterMapState[key].filterData]);
                }

            }
        })
        setFilterState(tempArray)
        console.log(tempArray)
        const data = {
            "user_id": 1234,
            "rows": [
                "id",
                "paymentto",
                "paymentby",
                "amount",
                "paidon",
                "paymentmode",
                "paymentstatus",
                "description",
                "banktransactionid",
                "paymentfor",
                "dated",
                "createdby",
                "isdeleted",
                "entity",
                "officeid",
                "tds",
                "professiontax",
                "month",
                "deduction"
            ],
            "filters": tempArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": Number(currentPage),
            "pg_size": Number(currentPages),
            "search_key": isSearchOn ? searchInput : ""
        }
        const response = await APIService.getPayment(data);
        const result = (await response.json());
        setExistingPayments(result.data);
        setTotalItems(result.total_count)
        setPageLoading(false);
        // console.log(result);
    }
    const fetchQuantityData = async (quantity) => {
        const tempArray = [];
        // we need to query thru the object
        Object.keys(filterMapState).forEach(key => {
            if (filterMapState[key].filterType != "") {
                tempArray.push([key, filterMapState[key].filterType, filterMapState[key].filterValue, filterMapState[key].filterData]);
            }
        })
        console.log(tempArray)
        setCurrentPages(quantity);
        setCurrentPage((prev) => 1);
        setPageLoading(true);
        const data = {
            "user_id": 1234,
            "rows": [
                "id",
                "paymentto",
                "paymentby",
                "amount",
                "paidon",
                "paymentmode",
                "paymentstatus",
                "description",
                "banktransactionid",
                "paymentfor",
                "dated",
                "createdby",
                "isdeleted",
                "entity",
                "officeid",
                "tds",
                "professiontax",
                "month",
                "deduction"
            ],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(quantity),
            "search_key": isSearchOn ? searchInput : ""
        }
        const response = await APIService.getPayment(data);
        const result = (await response.json());
        setExistingPayments(result.data);
        setTotalItems(result.total_count)
        setPageLoading(false);
    }
    const fetchPageData = async (pageNumber) => {
        const tempArray = [];
        // we need to query thru the object
        Object.keys(filterMapState).forEach(key => {
            if (filterMapState[key].filterType != "") {
                tempArray.push([key, filterMapState[key].filterType, filterMapState[key].filterValue, filterMapState[key].filterData]);
            }
        })
        console.log(tempArray)
        setCurrentPage(pageNumber);
        setPageLoading(true);
        const data = {
            "user_id": 1234,
            "rows": [
                "id",
                "paymentto",
                "paymentby",
                "amount",
                "paidon",
                "paymentmode",
                "paymentstatus",
                "description",
                "banktransactionid",
                "paymentfor",
                "dated",
                "createdby",
                "isdeleted",
                "entity",
                "officeid",
                "tds",
                "professiontax",
                "month",
                "deduction"
            ],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": Number(pageNumber),
            "pg_size": Number(currentPages),
            "search_key": isSearchOn ? searchInput : ""
        }
        const response = await APIService.getPayment(data);
        const result = (await response.json());
        setExistingPayments(result.data);
        setTotalItems(result.total_count)
        setPageLoading(false);
    }
    //Validation of the form
    const initialValues = {
        curaoffice: "",
        paymentto: null,
        paymentby: null,
        amount: null,
        description: null,
        paymentfor: null,
        paymentmode: null,
        entity: 1,
        paidon: null,
        month: null,
        tds: null,
        professiontax: null,
        deduction: null
    };
    const [name1,setName1] = useState("")
    const [name2,setName2] = useState("")
    const handleAddPayment = async () => {
        console.log(formValues)
        
            allUsername.map((item) => {
                if(item.id == formValues.paymentto) {
                    console.log('here')
                    setName1((prev) => item.name)
                }
            })
        
       
            allUsername.map((item) => {
                if(item.id == formValues.paymentby) {
                    console.log('here')
                    setName2((prev) => item.name)
                }
            })
        
        console.log(name1)
        console.log(name2)

        if (!validate()) {
            return;
        }
        setPageLoading(true)
        setIsPaymentsDialogue(false)
        setTimeout(() => {
           setPageLoading(false)
           setOpenAddConfirmation(true)
        },1000)
    }
    const addPayment = async () => {



        const data = {
            "user_id": 1234,
            "paymentto": formValues.paymentto,
            "paymentby": formValues.paymentby,
            "amount": Number(formValues.amount),
            "paidon": formValues.paidon,
            "paymentmode": formValues.paymentmode,
            "description": formValues.description,
            "paymentfor": formValues.paymentfor,
            "entityid": formValues.entity,
            "officeid": 10,
            "tds": Number(formValues.tds),
            "professiontax": Number(formValues.professiontax),
            "month": formValues.month,
            "deduction": Number(formValues.deduction)
        }
        // console.log(data);
        const response = await APIService.addPayment(data);
        const result = await response.json();
        setOpenAddConfirmation(false)
        setIsPaymentsDialogue(false);

        if (result.result == "success") {
            setFormValues(initialValues);
            openSuccess();
        } else {
            setErrorMessage(result.message)
            openFailure();
        }

        fetchData();
        // console.log(result);
    }
    const [currPaymentId, setCurrPaymentId] = useState(-1);
    const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
    const handleDelete = (id) => {
        setCurrPaymentId(id);
        setDeleteConfirmationModal(true);
    }
    const deletePayments = async (id) => {
        console.log(id);
        const data = {
            "user_id": 1234,
            "id": Number(id)
        };
        const response = await APIService.deletePayment(data);
        const res = await response.json()
        console.log(response);
        setDeleteConfirmationModal(false);
        if (res.result == 'success') {
            openDeleteSuccess();
        }

    }
    const openDeleteSuccess = () => {

        setShowDeleteSuccess(true);
        setTimeout(function () {
            setShowDeleteSuccess(false);
        }, 2000)
        fetchData();
    }
    const selectedPaymentMode = [
        "1", "2", "3", "4"
    ]
    const selectedMonth = [
        {
            id: 1,
            month: "Jan"
        },
        {
            id: 2,
            month: "Feb"
        },
        {
            id: 3,
            month: "Mar"
        },
        {
            id: 4,
            month: "Apr"
        },
        {
            id: 5,
            month: "May"
        },
        {
            id: 6,
            month: "Jun"
        },
        {
            id: 7,
            month: "July"
        },
        {
            id: 8,
            month: "Aug"
        },
        {
            id: 9,
            month: "Sep"
        },
        {
            id: 10,
            month: "Oct"
        },
        {
            id: 11,
            month: "Nov"
        },
        {
            id: 12,
            month: "Dec"
        },
    ]

    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(value)
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues)); // validate form and set error message
        setIsSubmit(true);
    };

    const validate = () => {
        var res = true;
        if (!formValues.paymentto || formValues.paymentto == "") {
            setFormErrors((existing) => {
                return { ...existing, paymentto: "Select a name to pay" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, paymentto: "" }
            })
        }
        if (!formValues.paymentby || formValues.paymentby == "") {
            setFormErrors((existing) => {
                return { ...existing, paymentby: "Select a name to pay from" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, paymentby: "" }
            })
        }
        // console.log(formValues.amount);
        // const temp = Number(formValues.amount);

        if (!formValues.amount) {
            setFormErrors((existing) => {
                return { ...existing, amount: "Enter Amount to pay" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, amount: "" }
            })
        }
        if (!formValues.paymentfor) {
            setFormErrors((existing) => {
                return { ...existing, paymentfor: "Select Payment For" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, paymentfor: "" }
            })
        }
        if (!formValues.paymentmode) {
            setFormErrors((existing) => {
                return { ...existing, paymentmode: "Select a payment mode" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, paymentmode: "" }
            })
        }
        if (!formValues.entity) {
            setFormErrors((existing) => {
                return { ...existing, entity: "Select entity" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, entity: "" }
            })
        }
        if (!formValues.paidon) {
            setFormErrors((existing) => {
                return { ...existing, paidon: "Enter payment date" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, paidon: "" }
            })
        }
        if (!formValues.month) {
            setFormErrors((existing) => {
                return { ...existing, month: "Select payment month" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, month: "" }
            })
        }
        if (!formValues.tds) {
            setFormErrors((existing) => {
                return { ...existing, tds: "Enter Tds" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, tds: "" }
            })
        }
        if (!formValues.professiontax) {
            setFormErrors((existing) => {
                return { ...existing, professiontax: "Enter Profession Tax" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, professiontax: "" }
            })
        }
        return res;
    }

    const [isPaymentsDialogue, setIsPaymentsDialogue] = React.useState(false);
    const handleOpen = () => {
        setIsPaymentsDialogue(true);
    };
    const handleClose = () => {
        initials();
        setIsPaymentsDialogue(false);
        openAddCancelModal();
    }
    const initials = () => {
        setFormValues(initialValues);
        setFormErrors({});
    }

    const [isEditDialogue, setIsEditDialogue] = React.useState(false);
    const editStatement = (item) => {
        const items = { item }
        setCurrentStatement(items);
        setIsEditDialogue(true);
    }
    const handleOpenEdit = () => {
        setIsEditDialogue(true);
    };
    const handleCloseEdit = () => {
        setIsEditDialogue(false);
    }

    const [isDeleteDialogue, setIsDeleteDialogue] = React.useState(false);
    const handleOpenDelete = () => {
        setIsDeleteDialogue(true);
    };
    const handleCloseDelete = () => {
        setIsDeleteDialogue(false);
    }
    const handleRefresh = async () => {
        await fetchData();

    }
    const [showSuccess, setShowSuccess] = useState(false);
    const openSuccess = () => {
        setShowSuccess(true);
        setTimeout(function () {
            setShowSuccess(false);
        }, 2000)
    }
    const openFailure = () => {
        setIsFailureModal(true);
        setTimeout(function () {
            setIsFailureModal(false);
        }, 2000)
    }
    const [showEditSuccess, setShowEditSuccess] = useState(false);
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
        setIsPaymentsDialogue(false);
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

    const handleSearch = async () => {
        setPageLoading(true);
        setCurrentPage((prev) => 1)
        setIsSearchOn(true);
        const data = {
            "user_id": 1234,
            "rows": [
                "id",
                "paymentto",
                "paymentby",
                "amount",
                "paidon",
                "paymentmode",
                "paymentstatus",
                "description",
                "banktransactionid",
                "paymentfor",
                "dated",
                "createdby",
                "isdeleted",
                "entity",
                "officeid",
                "tds",
                "professiontax",
                "month",
                "deduction"
            ],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": searchInput
        }
        const response = await APIService.getPayment(data);
        const result = (await response.json());
        setExistingPayments(result.data);
        setTotalItems(result.total_count)
        setPageLoading(false);
    }
    const handleCloseSearch = async () => {
        setPageLoading(true);
        setIsSearchOn(false);
        setSearchInput("");
        setCurrentPage((prev) => 1)
        const data = {
            "user_id": 1234,
            "rows": [
                "id",
                "paymentto",
                "paymentby",
                "amount",
                "paidon",
                "paymentmode",
                "paymentstatus",
                "description",
                "banktransactionid",
                "paymentfor",
                "dated",
                "createdby",
                "isdeleted",
                "entity",
                "officeid",
                "tds",
                "professiontax",
                "month",
                "deduction"
            ],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": ""
        }
        const response = await APIService.getPayment(data);
        const result = (await response.json());
        setExistingPayments(result.data);
        setTotalItems(result.total_count);
        setPageLoading(false);
    }
    const [backDropLoading,setBackDropLoading] = useState(false)
    const handleDownload = async (type) => {
        // setBackDropLoading(true)
        setDownloadModal(false)
        setPageLoading(true);
        const data = {
            "user_id": 1234,
            "rows": [
                "paymentto",
                "paymentby",
                "amount",
                "paidon",
                "paymentmode",
                "paymentfor",
                "paymentstatus",
                "entity",
                "id",
            ],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 0,
            "pg_size": 0,
            "search_key": searchInput,
            "downloadType" : type,
            "colmap" : {
                "paymentto" : "Payment To",
                "paymentby" : "Payment By",
                "amount" : "Amount",
                "paidon" : "Paid On",
                "paymentmode" : "Payment Mode",
                "paymentfor" : "Payment For",
                "paymentstatus" : "Status",
                "entity" : "Entity",
                "id" : "ID"
            }
        };
        const response = await APIService.getPayment(data)
        const temp = await response.json();
        const result = temp.data;
        console.log(temp)
        if(temp.result == 'success') {
            const d = {
                "filename" : temp.filename,
                "user_id" : 1234
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
                if(type == "excel") {
                    FileSaver.saveAs(result, 'PaymentData.xlsx');
                }else if(type == "pdf") {
                    FileSaver.saveAs(result, 'PaymentData.pdf');
                }
                console.log('Success:', result);
            })
            .catch(error => {
                console.error('Error:', error);
            });
            
            setTimeout(() => {
                // setBackDropLoading(false)
                setPageLoading(false)
            },1000) 
        }
    }
    const [paymentToFilter, setPaymentToFilter] = useState(false);
    const [paymentToFilterInput, setPaymentToFilterInput] = useState("");
    const [paymentForFilter, setPaymentForFilter] = useState(false);
    const [paymentForFilterInput, setPaymentForFilterInput] = useState("");
    const [amountFilter, setAmountFilter] = useState(false)
    const [amountFilterInput, setAmountFilterInput] = useState("");
    const [paymentModeFilter, setPaymentModeFilter] = useState(false)
    const [paymentModeFilterInput, setPaymentModeFilterInput] = useState("")
    const [paymentByFilter, setPaymentByFilter] = useState(false)
    const [paymentByFilterInput, setPaymentByFilterInput] = useState("");
    const [paymentStatusFilter, setPaymentStatusFilter] = useState(false)
    const [paymentStatusFilterInput, setPaymentStatusFilterInput] = useState("")
    const [paidOnFilter, setPaidOnFilter] = useState(false)
    const [paidOnFilterInput, setPaidOnFilterInput] = useState("")
    const [entityFilter, setEntityFilter] = useState(false)
    const [entityFilterInput, setEntityFilterInput] = useState("");
    const [idFilter, setIdFilter] = useState(false)
    const [idFilterInput, setIdFilterInput] = useState("");
    const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
    const [filterState, setFilterState] = useState([]);
    const filterMapping = {
        paymentto: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        paymentby: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        amount: {
            filterType: "",
            filterValue: "",
            filterData: "Numeric",
            filterInput: ""
        },
        paidon: {
            filterType: "",
            filterValue: null,
            filterData: "Date",
            filterInput: ""
        },
        paymentmode: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        paymentfor: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        paymentstatus: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        entity: {
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

    const fetchFiltered = async (mapState) => {
        setPageLoading(true);
        setPaymentByFilter(false);
        setPaymentToFilter(false);
        setAmountFilter(false);
        setPaidOnFilter(false);
        setPaymentModeFilter(false)
        setPaymentForFilter(false)
        setPaymentStatusFilter(false)
        setEntityFilter(false)
        setIdFilter(false)
        setFilterMapState((prev) => mapState)
        const tempArray = [];
        // we need to query thru the object
        // console.log(filterMapState);
        console.log(filterMapState)
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
                    tempArray.push([key, mapState[key].filterType, mapState[key].filterValue, mapState[key].filterData]);
                }

            }
        })
        console.log('this is getting called')
        setCurrentPage((prev) => 1)
        setFilterState(tempArray)
        console.log(tempArray)
        const data = {
            "user_id": 1234,
            "rows": [
                "id",
                "paymentto",
                "paymentby",
                "amount",
                "paidon",
                "paymentmode",
                "paymentstatus",
                "description",
                "banktransactionid",
                "paymentfor",
                "dated",
                "createdby",
                "isdeleted",
                "entity",
                "officeid",
                "tds",
                "professiontax",
                "month",
                "deduction"
            ],
            "filters": tempArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": isSearchOn ? searchInput : ""
        }
        const response = await APIService.getPayment(data);
        const result = (await response.json());
        setExistingPayments(result.data);
        setTotalItems(result.total_count)
        setPageLoading(false);
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
        setFlag((prev) => !prev)
        const data = {
            "user_id": 1234,
            "rows": [
                "id",
                "paymentto",
                "paymentby",
                "amount",
                "paidon",
                "paymentmode",
                "paymentstatus",
                "description",
                "banktransactionid",
                "paymentfor",
                "dated",
                "createdby",
                "isdeleted",
                "entity",
                "officeid",
                "tds",
                "professiontax",
                "month",
                "deduction"
            ],
            "filters": filterState,
            "sort_by": [field],
            "order": !flag ? "asc" : "desc",
            "pg_no": Number(currentPage),
            "pg_size": Number(currentPages),
            "search_key": isSearchOn ? searchInput : ""
        };
        const response = await APIService.getPayment(data);
        const result = (await response.json());
        console.log(result);
        setExistingPayments(result.data);
        setTotalItems(result.total_count)
        setPageLoading(false);
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
            {showSuccess && <SucessfullModal isOpen={showSuccess} handleClose={() => setShowSuccess(false)} message="New Contractual Payment Created Successfully" />}
            {showEditSuccess && <SucessfullModal isOpen={showEditSuccess} handleClose={() => setShowEditSuccess(false)} message="Changes Saved Successfully" />}
            {showDeleteSuccess && <SucessfullModal isOpen={showDeleteSuccess} message="SuccessFully Deleted Payment" />}
            {openAddConfirmation && <SaveConfirmationPayments handleClose={() => setOpenAddConfirmation(false)} currPaymentby={name2} currPaymentto={name1} addPayment={addPayment} showCancel={openAddCancelModal} setDefault={initials} />}
            {isFailureModal && <FailureModal isOpen={isFailureModal} message={errorMessage} />}
            {deleteConfirmationModal && <DeletePaymentModal handleClose={() => setDeleteConfirmationModal(false)} item={currPaymentId} handleDelete={deletePayments} showCancel={openCancelModal} />}
            {showCancelModelAdd && <CancelModel isOpen={showCancelModelAdd} message="Process cancelled, No Contractual payment created" />}
            {showCancelModel && <CancelModel isOpen={showCancelModel} message="Process cancelled, no changes saved." />}
            <div className='h-[calc(100vh_-_14rem)] w-full px-10'>
                <div className='h-16 w-full  flex justify-between items-center p-2  border-gray-300 border-b-2'>
                    <div className='flex items-center space-x-3'>
                        <div className='rounded-2xl  bg-[#EBEBEB] h-8 w-8 flex justify-center items-center'>
                            <img className='h-5 w-5' src={backLink} />
                        </div>
                        <div className='flex-col'>
                            <h1 className='text-lg'>Manage Contractual Payments</h1>
                            <p className='text-sm'>Manage &gt; Contractual Payments</p>
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
                                onChange={(e) => setSearchInput(e.target.value)}
                                onKeyDownCapture={handleKeyDown}
                            />
                            <button onClick={handleCloseSearch}><img src={Cross} className=' w-5 h-5 mx-2' /></button>
                            <div className="h-9 w-10 bg-[#004DD7] flex items-center justify-center rounded-r-lg">
                                <button onClick={handleSearch}><img className="h-[26px] " src={searchIcon} alt="search-icon" /></button>
                            </div>
                        </div>

                        <div>
                            {/* button */}
                            <button className="bg-[#004DD7] text-white h-9 w-80 rounded-lg " onClick={handleOpen}>
                                <div className="flex items-center justify-center gap-4">
                                    Add Contractual Payments
                                    <img className='h-[18px] w-[18px]' src={Add} alt="add" />
                                </div>
                            </button>
                        </div>

                    </div>

                </div>




                {/* filters */}
                <div className='h-12 w-full bg-white'>
                    <div className='flex justify-between items-center '>
                        <div className='w-[85%] flex items-center'>
                            <div className='w-[5%] p-4'>
                                {/* <p>Sr. </p> */}
                            </div>
                            <div className='w-[13%]  px-4 py-3'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[75%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={paymentToFilterInput} onChange={(e) => setPaymentToFilterInput(e.target.value)}

                                        onKeyDown={(event) => handleEnterToFilter(event, paymentToFilterInput,
                                            setPaymentToFilterInput,
                                            'contains',
                                            'paymentto')}
                                    />
                                    {filterMapState.paymentto.filterType == "" ?  <button className='w-[25%] px-1 py-2' onClick={() => setPaymentToFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> :  <button className='w-[25%] px-1 py-2' onClick={() => setPaymentToFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>  }
                                </div>
                                {paymentToFilter && <CharacterFilter inputVariable={paymentToFilterInput} setInputVariable={setPaymentToFilterInput} handleFilter={newHandleFilter} filterColumn='paymentto' menuRef={menuRef} filterType={filterMapState.paymentto.filterType} />}
                            </div>
                            <div className='w-[13%]  px-4 py-3'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[75%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={paymentByFilterInput} onChange={(e) => setPaymentByFilterInput(e.target.value)}

                                        onKeyDown={(event) => handleEnterToFilter(event, paymentByFilterInput,
                                            setPaymentByFilterInput,
                                            'contains',
                                            'paymentby')}
                                    />
                                    {filterMapState.paymentby.filterType == "" ?  <button className='w-[25%] px-1 py-2' onClick={() => setPaymentByFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> :  <button className='w-[25%] px-1 py-2' onClick={() => setPaymentByFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>  }
                                </div>
                                {paymentByFilter && <CharacterFilter inputVariable={paymentByFilterInput} setInputVariable={setPaymentByFilterInput} handleFilter={newHandleFilter} filterColumn='paymentby' menuRef={menuRef} filterType={filterMapState.paymentby.filterType} />}
                            </div>
                            <div className='w-[10%] px-4 py-3'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[70%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={amountFilterInput} onChange={(e) => setAmountFilterInput(e.target.value)}

                                        onKeyDown={(event) => handleEnterToFilter(event, amountFilterInput,
                                            setAmountFilterInput,
                                            'equalTo',
                                            'amount')}
                                    />
                                    {filterMapState.amount.filterType == "" ?  <button className='w-[30%] px-1 py-2' onClick={() => setAmountFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> :  <button className='w-[30%] px-1 py-2' onClick={() => setAmountFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>  }
                                </div>
                                {amountFilter && <NumericFilter inputVariable={amountFilterInput} setInputVariable={setAmountFilterInput} handleFilter={newHandleFilter} columnName='amount' menuRef={menuRef} filterType={filterMapState.amount.filterType} />}
                            </div>
                            <div className='w-[10%]  px-4 py-3'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[70%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={paidOnFilterInput} onChange={(e) => setPaidOnFilterInput(e.target.value)} type='date'
                                        onKeyDown={(event) => handleEnterToFilter(event, paidOnFilterInput,
                                            setPaidOnFilterInput,
                                            'equalTo',
                                            'paidon')}
                                    />
                                    {filterMapState.paidon.filterType == "" ?  <button className='w-[30%] px-1 py-2' onClick={() => setPaidOnFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> :  <button className='w-[30%] px-1 py-2' onClick={() => setPaidOnFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>  }
                                </div>
                                {paidOnFilter && <DateFilter inputVariable={paidOnFilterInput} setInputVariable={setPaidOnFilterInput} handleFilter={newHandleFilter} columnName='paidon' menuRef={menuRef} filterType={filterMapState.paidon.filterType} />}
                            </div>
                            <div className='w-[14%]  px-4 py-3'>
                                <div className="w-[90%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[75%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={paymentModeFilterInput} onChange={(e) => setPaymentModeFilterInput(e.target.value)}

                                        onKeyDown={(event) => handleEnterToFilter(event, paymentModeFilterInput,
                                            setPaymentModeFilterInput,
                                            'contains',
                                            'paymentmode')}

                                    />
                                    {filterMapState.paymentmode.filterType == "" ?  <button className='w-[25%] px-1 py-2' onClick={() => setPaymentModeFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> :  <button className='w-[25%] px-1 py-2' onClick={() => setPaymentModeFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>  }
                                </div>
                                {paymentModeFilter && <CharacterFilter inputVariable={paymentModeFilterInput} setInputVariable={setPaymentModeFilterInput} handleFilter={newHandleFilter} filterColumn='paymentmode' menuRef={menuRef} filterType={filterMapState.paymentmode.filterType} />}
                            </div>
                            <div className='w-[13%]  px-4 py-3'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[75%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={paymentForFilterInput} onChange={(e) => setPaymentForFilterInput(e.target.value)}

                                        onKeyDown={(event) => handleEnterToFilter(event, paymentForFilterInput,
                                            setPaymentForFilterInput,
                                            'contains',
                                            'paymentfor')}
                                    />
                                    {filterMapState.paymentfor.filterType == "" ?  <button className='w-[25%] px-1 py-2' onClick={() => setPaymentForFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> :  <button className='w-[25%] px-1 py-2' onClick={() => setPaymentForFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>  }
                                </div>
                                {paymentForFilter && <CharacterFilter inputVariable={paymentForFilterInput} setInputVariable={setPaymentForFilterInput} handleFilter={newHandleFilter} filterColumn='paymentfor' menuRef={menuRef} filterType={filterMapState.paymentfor.filterType} />}
                            </div>
                            {/* <div className='w-[15%]  px-4 py-3'>
                                <div className="w-[80%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[75%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={paymentStatusFilterInput} onChange={(e) => setPaymentStatusFilterInput(e.target.value)} 

                                    onKeyDown={(event) => handleEnterToFilter(event,paymentStatusFilterInput,
                                        setPaymentStatusFilterInput,
                                        'contains',
                                        'paymentstatus')}
                                    
                                    />
                                    <button className='px-1 py-2 w-[25%]' onClick={() => setPaymentStatusFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button>
                                </div>
                                {paymentStatusFilter && <CharacterFilter inputVariable={paymentStatusFilterInput} setInputVariable={setPaymentStatusFilterInput} handleFilter={newHandleFilter} filterColumn='paymentstatus' menuRef={menuRef} />}
                            </div> */}
                            <div className='w-[10%]  px-4 py-3'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[70%] bg-[#EBEBEB] rounded-xs text-xs pl-2 outline-none" value={entityFilterInput} onChange={(e) => setEntityFilterInput(e.target.value)}
                                        onKeyDown={(event) => handleEnterToFilter(event, entityFilterInput,
                                            setEntityFilterInput,
                                            'contains',
                                            'entity')}
                                    />
                                    {filterMapState.entity.filterType == "" ?  <button className='w-[30%] px-1 py-2' onClick={() => setEntityFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> :  <button className='w-[30%] px-1 py-2' onClick={() => setEntityFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>  }
                                </div>
                                {entityFilter && <CharacterFilter inputVariable={entityFilterInput} setInputVariable={setEntityFilterInput} handleFilter={newHandleFilter} filterColumn='entity' menuRef={menuRef} filterType={filterMapState.entity.filterType} />}
                            </div>
                        </div>
                        <div className='w-[15%] flex'>
                            <div className='w-1/2  px-4 py-3'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[65%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={idFilterInput} onChange={(e) => setIdFilterInput(e.target.value)}

                                        onKeyDown={(event) => handleEnterToFilter(event, idFilterInput,
                                            setIdFilterInput,
                                            'equalTo',
                                            'id')}
                                    />
                                    {filterMapState.id.filterType == "" ?  <button className='w-[35%] px-1 py-2' onClick={() => setIdFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> :  <button className='w-[35%] px-1 py-2' onClick={() => setIdFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>  }
                                </div>
                                {idFilter && <NumericFilter inputVariable={idFilterInput} setInputVariable={setIdFilterInput} handleFilter={newHandleFilter} columnName='id' menuRef={menuRef} filterType={filterMapState.id.filterType} />}
                            </div>
                            <div className='w-1/2 p-4'>

                            </div>
                        </div>
                    </div>
                </div>


                <div className='h-[calc(100vh_-_14rem)] w-full text-xs'>
                    <div className='w-full h-12 bg-[#F0F6FF] flex justify-between'>
                        <div className='w-[85%] flex'>
                            <div className='w-[5%] p-4'>
                                <p>Sr. </p>
                            </div>
                            <div className='w-[13%]  p-4'>
                                <p>Payment To <button onClick={() => handleSort('paymentto')}><span className="font-extrabold">↑↓</span></button></p>
                            </div>
                            <div className='w-[13%]  p-4'>
                                <p>Payment By <button onClick={() => handleSort('paymentby')}><span className="font-extrabold">↑↓</span></button></p>
                            </div>
                            <div className='w-[10%]  p-4'>
                                <p>Amount <button onClick={() => handleSort('amount')}><span className="font-extrabold">↑↓</span></button></p>
                            </div>
                            <div className='w-[10%]  p-4'>
                                <p>Paid On <button onClick={() => handleSort('paidon')}><span className="font-extrabold">↑↓</span></button></p>
                            </div>
                            <div className='w-[14%]  p-4'>
                                <p>Payment Mode <button onClick={() => handleSort('paymentmode')}><span className="font-extrabold">↑↓</span></button></p>
                            </div>
                            <div className='w-[13%]  p-4'>
                                <p>Payment For <button onClick={() => handleSort('paymentfor')}><span className="font-extrabold">↑↓</span></button></p>
                            </div>
                            {/* <div className='w-[15%]  p-4'>
                                <p>Payment Status <button onClick={() => handleSort('paymentstatus')}><span className="font-extrabold">↑↓</span></button></p>
                            </div> */}
                            <div className='w-[10%]  p-4'>
                                <p>Entity <button onClick={() => handleSort('entity')}><span className="font-extrabold">↑↓</span></button></p>
                            </div>
                        </div>
                        <div className='w-[15%] flex'>
                            <div className='w-1/2  p-4'>
                                <p>ID <button onClick={() => handleSort('id')}><span className="font-extrabold">↑↓</span></button></p>
                            </div>
                            <div className='w-1/2 p-4'>
                                <p>Edit</p>
                            </div>
                        </div>
                    </div>
                    <div className=' w-full h-[calc(100vh_-_17rem)] overflow-auto'>
                        {/* {pageLoading && <LinearProgress />} */}
                        {!pageLoading && existingPayments && existingPayments.length == 0 && <div className='h-10 border-gray-400 border-b-[1px] flex items-center'>
                            <h1 className='ml-10'>No Records To Show</h1>
                        </div>}
                        {!pageLoading && existingPayments.map((item, index) => {
                            return <div className='w-full min-h-10 h-auto  flex justify-between items-center border-gray-400 border-b-[1px]'>
                                <div className='w-[85%] flex text-xs items-center'>
                                    <div className='w-[5%] h-[50%] px-4'>
                                        <p>{index + 1 + (currentPage - 1) * currentPages} </p>
                                    </div>
                                    <div className='w-[13%] h-[50%] px-4  '>
                                        <p>{item.paymentto}</p>
                                    </div>
                                    <div className='w-[13%] h-[50%] px-4  ml-1'>
                                        <p>{item.paymentby}</p>
                                    </div>
                                    <div className='w-[10%] h-[50%] px-4  '>
                                        <p>{item.amount.toFixed(2)}</p>
                                    </div>
                                    <div className='w-[10%] h-[50%] px-4  '>
                                        <p>{formatDate(item.paidon)}</p>
                                    </div>
                                    <div className='w-[14%] h-[50%] px-4  ml-[2px]'>
                                        <p>{item.paymentmode}</p>
                                    </div>
                                    <div className='w-[13%] h-[50%] px-4  '>
                                        <p>{item.paymentfor}</p>
                                    </div>
                                    {/* <div className='w-[15%] h-[50%] px-4 py-2 ml-1'>
                                        <p>{item.paymentstatus}</p>
                                    </div> */}
                                    <div className='w-[10%] h-[50%] pl-4  '>
                                        <p>{item.entity}</p>
                                    </div>
                                </div>
                                <div className='w-[15%] flex items-center'>
                                    <div className='w-1/2 h-[50%] px-4 ml-1'>
                                        <p>{item.id}</p>
                                    </div>
                                    <div className='w-1/2 0 px-4 flex space-x-2'>
                                        <button onClick={() => editStatement(item)}><img className=' w-5 h-5' src={Edit} alt="edit" /></button>
                                        <button onClick={() => handleDelete(item.id)}><img className=' w-5 h-5' src={Trash} alt="trash" /></button>
                                    </div>
                                </div>
                            </div>
                        })}
                        {/* we get all the existing prospect here */}
                        {isEditDialogue && <EditPayments isOpen={isEditDialogue} handleClose={() => setIsEditDialogue(false)} item={currentStatement}
                            fetchData={fetchData} openPrompt={openEditSuccess} showCancel={openCancelModal} />}
                        {showDelete && <Delete openDialog={isDeleteDialogue} setOpenDialog={setIsDeleteDialogue} currentStatement={currentStatement} fetchData={fetchData} showCancel={openCancelModal} />}
                    </div>


                </div>
            </div>


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
                                // console.log(e.target.value);
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
            <Modal open={isPaymentsDialogue}
                fullWidth={true}
                maxWidth={'md'}
                className='flex justify-center items-center'
            >
                <>
                    <Draggable handle='div.move'>
                        <div className=''>
                            <div className="w-[1100px]  h-auto bg-white rounded-lg ">
                                <div className='move cursor-move'>

                                <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-t-lg">
                                    <div className="mr-[410px] ml-[410px]">
                                        <div className="text-base">New Contractual Payment</div>
                                    </div>
                                    <div className="flex justify-center items-center rounded-full w-7 h-7 bg-white">
                                        <button onClick={handleClose}><img className="w-5 h-5" src={Cross} alt="cross" /></button>
                                    </div>
                                </div>
                                </div>
                                {/* <form onSubmit={handleSubmit} className='space-y-2'> */}
                                <div className="h-auto w-full mt-1 ">
                                    <div className="flex gap-12 justify-center">
                                        <div className=" space-y-5 py-5">
                                            <div className="">
                                                <div className="text-sm text-[#787878] mb-0.5">Cura Office </div>
                                                <div className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs py-0.5 bg-[#F5F5F5]" type="text" name="curaoffice" value={formValues.curaoffice} onChange={handleChange} >Pune</div>
                                            </div>
                                            <div className="pt-0.5">
                                                <div className="text-sm mb-1">Payment To <label className="text-red-500">*</label></div>
                                                {/* <select className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs" name="paymentto" value={formValues.paymentto} onChange={handleChange} >
                                                    <option value="" hidden >Select User</option>
                                                    <option value="" >Name &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  Username </option>
                                                    {allUsername.map(item => (
                                                        <option key={item.id} value={item.id}>
                                                            {item.name}
                                                            &nbsp;
                                                            &nbsp;
                                                            &nbsp;
                                                            &nbsp;
                                                            {item.username}
                                                        </option>
                                                    ))}
                                                </select> */}
                                                <PaymentDropDown options={allUsername} initialValue="Select Payment To" leftLabel="Name" rightLabel="Username" leftAttr="name" rightAttr="username" toSelect="name" handleChange={handleChange} formValueName="paymentto" value={formValues.paymentto} idName="id" />
                                                <div className="text-[9px] text-[#CD0000] absolute">{formErrors.paymentto}</div>
                                            </div>
                                            <div className="pt-0.5">
                                                <div className="text-sm mb-1">Payment By <label className="text-red-500">*</label></div>
                                                {/* <select className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs block" name="paymentby" value={formValues.paymentby} onChange={handleChange} >
                                                    <option value="" hidden >Select User</option>
                                                    <option value="">Name   Username </option>
                                                    {allUsername.map(item => (
                                                        <option key={item.id} value={item.id} className='flex'>
                                                            
                                                            
                                                            <p>
                                                            {item.name}
                                                            </p>
                                                             
                                                           
                                                            <p >

                                                               {item.username}
                                                            </p>  
                                                            
                                                            
                                                            
                                                        </option>
                                                    ))}
                                                </select> */}

                                                <PaymentDropDown options={allUsername} initialValue="Select Payment By" leftLabel="Name" rightLabel={"Username"} leftAttr="name" rightAttr="username" toSelect="name" handleChange={handleChange} formValueName="paymentby" value={formValues.paymentby} idName="id" />
                                                <div className="text-[9px] text-[#CD0000] absolute ">{formErrors.paymentby}</div>
                                                {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.PaymentBy}</div> */}
                                            </div>
                                            <div className="">
                                                <div className="text-sm">Amount <label className="text-red-500">*</label></div>
                                                <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs" type="number" name="amount" value={formValues.amount} onChange={handleChange} />
                                                <div className="text-[9px] text-[#CD0000] absolute">{formErrors.amount}</div>
                                            </div>
                                            <div className="">
                                                <div className="text-sm">Deduction </div>
                                                <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs" type="text" name="deduction" value={formValues.deduction} onChange={handleChange} />
                                            </div>
                                            <div className="">
                                                <div className="text-sm">Payment For <label className="text-red-500">*</label></div>
                                                <select className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs" name="paymentfor" value={formValues.paymentfor} onChange={handleChange} >
                                                    <option hidden>Select Payment For</option>
                                                    {paymentFor.map(item => (
                                                        <option key={item.id} value={item.id}>
                                                            {item.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                <div className="text-[9px] text-[#CD0000] absolute">{formErrors.paymentfor}</div>
                                            </div>
                                            <div className="">
                                                <div className="text-sm">Description </div>
                                                <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs" type="text" name="description" value={formValues.description} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className=" space-y-5 py-5">
                                            <div className="">
                                                <div className="text-sm">Payment Mode <label className="text-red-500">*</label></div>
                                                <select className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs" name="paymentmode" value={formValues.paymentmode} onChange={handleChange} >
                                                    <option hidden>Select Payment Mode</option>
                                                    {paymentMode.map(item => (
                                                        <option key={item[0]} value={item[0]}>
                                                            {item[1]}
                                                        </option>
                                                    ))}
                                                </select>
                                                <div className="text-[9px] text-[#CD0000] absolute">{formErrors.paymentmode}</div>
                                            </div>
                                            <div className="">
                                                <div className="text-sm">Entity <label className="text-red-500">*</label></div>
                                                <select className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs" name="entity" value={formValues.entity} onChange={handleChange} >
                                                    {allEntities.map(item => (
                                                        <option key={item[0]} value={item[0]}>
                                                            {item[1]}
                                                        </option>
                                                    ))}
                                                </select>
                                                {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.paymentMode}</div> */}
                                            </div>
                                            <div className="">
                                                <div className="text-sm">Paid On <label className="text-red-500">*</label></div>
                                                <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs" type="date" name="paidon" value={formValues.paidon} onChange={handleChange} />
                                                <div className="text-[10px] text-[#CD0000] absolute">{formErrors.paidon}</div>
                                            </div>
                                            <div className="">
                                                <div className="text-sm">Month <label className="text-red-500">*</label></div>
                                                <select className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" name="month" value={formValues.month} onChange={handleChange} >
                                                    <option hidden>Select Month</option>
                                                    {selectedMonth.map(item => (
                                                        <option key={item.id} value={item.month}>
                                                            {item.month}
                                                        </option>
                                                    ))}
                                                </select>
                                                <div className="text-[9px] text-[#CD0000] absolute">{formErrors.month}</div>
                                            </div>
                                            <div className="">
                                                <div className="text-sm">TDS <label className="text-red-500">*</label></div>
                                                <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs" type="number" name="tds" value={formValues.tds} onChange={handleChange} />
                                                <div className="text-[9px] text-[#CD0000] absolute">{formErrors.tds}</div>
                                            </div>
                                            <div className="">
                                                <div className="text-sm">Profession Tax <label className="text-red-500">*</label></div>
                                                <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs" type="number" name="professiontax" value={formValues.professiontax} onChange={handleChange} />
                                                <div className="text-[9px] text-[#CD0000] absolute">{formErrors.professiontax}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center gap-2">
                                    <div className=" mt-5 mb-3 flex justify-center items-center gap-[10px]">
                                        <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' type="submit" onClick={handleAddPayment}>Add</button>
                                        <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleClose}>Cancel</button>
                                    </div>
                                </div>
                                {/* </form> */}
                            </div>
                        </div>
                    </Draggable>
                </>
            </Modal>
        </div>
    )
}

export default Payments;

