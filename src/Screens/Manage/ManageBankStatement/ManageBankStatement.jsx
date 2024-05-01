import { CircularProgress, Modal, Pagination } from "@mui/material";
import React, { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";
import Navbar from "../../../Components/Navabar/Navbar";
import FailureModal from '../../../Components/modals/FailureModal';

import backLink from "../../../assets/back.png";
import Cross from "../../../assets/cross.png";
import downloadIcon from "../../../assets/download.png";
import Edit from "../../../assets/edit.png";
import refreshIcon from "../../../assets/refresh.png";
import searchIcon from "../../../assets/searchIcon.png";
import Trash from "../../../assets/trash.png";
import { APIService } from '../../../services/API';
import Delete from './Delete';
import Add from "./../../../assets/add.png";
import EditManageStatement from "./EditManagePayments";
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
import { authService } from "../../../services/authServices";
import Filter from "../../../assets/filter.png"
import SucessfullModal from "../../../Components/modals/SucessfullModal";
import Pdf from "../../../assets/pdf.png";
import Excel from "../../../assets/excel.png"
import Draggable from "react-draggable";
// import DayJS from 'react-dayjs';
const ManageBankStatement = () => {
    // we have the module here
    const menuRef = useRef();
    const [existingStatement, setExistingStatement] = useState([]);
    const [pageLoading, setPageLoading] = useState(false);
    const [showSucess, setShowSucess] = useState(false);
    const [showFailure, setShowFailure] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [currentStatement, setCurrentStatement] = useState({});
    const [currentStatementId, setCurrentStatementId] = useState();
    const [deleted, setDeleted] = useState(false);
    const [userId, setUserId] = useState(1234);
    const crdr = ["CR", "DR"];
    const [order, setOrder] = useState("asc");
    const [vendorList, setVendorList] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPages, setCurrentPages] = useState(15);
    const [currentPage, setCurrentPage] = useState(1);
    const [downloadModal, setDownloadModal] = useState(false);
    const [clientName, setClientName] = useState("");
    const [showCreditReceipt, setCreditReceipt] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [mode, setMode] = useState([])
    const [entity, setEntity] = useState([])
    const [howReceived, setHowReceived] = useState([])
    const [client, setClient] = useState([])
    const [successMessage, setSuccessMessage] = useState("")
    const [searchQuery, setSearchQuery] = useState("");
    const [modeEdit, setModeEdit] = useState(Number)
    const [receivedBy, setRecievedBy] = useState(Number);
    const [vendorId, setVendorId] = useState(Number);
    const [filterArray, setFilterArray] = useState([["modeofpayment", "contains", ""], ["date", "contains", ""], ["crdr", "contains", ""], ["amount", "contains", ""],["particulars", "contains", ""],["clientid", "contains", ""]]);
    const [sortField, setSortField] = useState("id");
    const [isSearchOn, setIsSearchOn] = useState(false);
    
    // const [selectedBuilder,setSelectedBuilder] = useState();
  
    const getEmployees = async () => {
        const data = {
            "user_id": userId || 1234,
            "rows": ["employeename"],
            "filters": [],
            "sort_by": [],
            "order": "asc",
            "pg_no": 0,
            "pg_size": 0
        }
        const employee = await APIService.getEmployees(data);

        const temp = await employee.json();
        const t = temp.total_count;
        const result = temp.data;
        setEmployees(result);
    }


    const getCRDetails = async () => {
        const data = {
            "user_id": userId || 1234,
        }
        const mode1 = await APIService.getModesAdmin(data);
        const howReceived1 = await APIService.getHowReceivedAdmin(data);
        const entity1 = await APIService.getEntityAdmin(data);
        const client1 = await APIService.getClientAdmin(data);
        setEntity((await entity1.json()).data)
        setHowReceived((await howReceived1.json()).data)
        setClient((await client1.json()).data)
        setMode((await mode1.json()).data)

    }
    const fetchUserId = async () => {
        const response = await authService.getUserID();
        setUserId(response)
    }
    const getVendorAdmin = async () => {
        const data = { "user_id": userId || 1234 }
        const response = await APIService.getVendorAdmin(data);
        const result = (await response.json()).data;
        setVendorList(result)
    }

    const openConfirmModal = () => {
        // set the state for true for some time
        if (isConfirmManageStatementDialogue) {
            setSuccessMessage("New Bank Statement created succesfully ")
        } else {
            setSuccessMessage("New Credit Receipt created succesfully ")
        }
        setShowSucess(true);
        setTimeout(function () {
            setShowSucess(false)
        }, 2000)
        setIsManageStatementDialogue(false);
        setIsConfirmManageStatementDialogue(false)
        // setShowSucess(true);
        
    }
    // const isCredit = (item) => {
    //     if (item === "CR                  ") {
    //         return true;
    //     } else return false;

    // }
    // const openSuccessModal = () => {
    //     // set the state for true for some time
    //     setIsManageStatementDialogue(false);
    //     setShowSucess(true);
    //     setTimeout(function () {
    //         setShowSucess(false)
    //     }, 2000)
    // }
    const openFailureModal = () => {
        setIsManageStatementDialogue(false);
        setShowFailure(true);
        setTimeout(function () {
            setShowFailure(false)
        }, 4000);
    }

    const fetchBankStatement = async () => {
        setPageLoading(true);
        const data = {
            "user_id": userId || 1234,
            "rows": ["id", "modeofpayment", "amount", "crdr", "chequeno", "date", "particulars", "clientid"],
            "filters": [],
            "sort_by": [sortField],
            "order": "desc",
            "pg_no": 1,
            "pg_size": 15,
            "search_key": isSearchOn ? searchQuery : ""
        }
        const response = await APIService.getBankStatement(data);
        const temp = await response.json();
        const t = temp.total_count;
        const result = temp.data;
        setTotalItems(t);
        setPageLoading(false);
        setExistingStatement(result);
        // existingStatement.map(ele => {
        //     client.map(item => {
        //         if (ele.clientid === item[0]) {
        //             console.log(item[1])
        //         }
        //     })
        // })
    }

    const deleteStatement = async (item) => {
        console.log(item)
        setShowDelete(true);
        setCurrentStatementId(item);
        setDeleted(true);
    }

    const addBankStatement = async () => {
        console.log(formValues.modeofpayment)
        setVendorId((formValues.vendor).split(",", 1)[0]);
        setModeEdit((formValues.modeofpayment).split(",", 1)[0])
        console.log(modeEdit, vendorId)
        const data = {
            "user_id": userId || 1234,
            "modeofpayment": Number(formValues.modeofpayment),
            "date": formValues.date,
            "amount": Number(formValues.amount),
            "particulars": formValues.particulars,
            "crdr": formValues.crdr,
            "vendorid": Number(vendorId),
            "createdby": userId || 1234
        }
       
        const response = await APIService.addBankStatement(data);
        if (response.ok) {
            setIsLoading(false);
            openConfirmModal();
        } else {
            setIsLoading(false);
            openFailureModal();
        }
        fetchBankStatement();
    }
    const addCreditRecipt = async () => {

        const data = {
            "user_id": userId || 1234,
            "receivedby": Number(formValues.employee),
            "paymentmode": Number(formValues.modeofpayment),
            "recddate": formValues.date,
            "entityid": Number(formValues.entity),
            "amount": Number(formValues.amount),
            "howreceivedid": Number(formValues.how),
            "clientid": Number(formValues.client),
            "receiptdesc": formValues.desc,
            "serviceamount": Number(formValues.serviceAmount),
            "reimbursementamount": Number(formValues.reimbAmount),
            "tds": Number(formValues.TDS)
        }
        setClientName(formValues.client);
        const response = await APIService.addClientReceipt(data);
        console.log(response)
        if (response.ok) {
            
            openConfirmModal();
        } else {
            
            openFailureModal();
        }
        fetchBankStatement();
        setCreditReceipt(false)
    }
    const fetchPageData = async (pageNumber) => {
        setPageLoading(true);
        setCurrentPage(pageNumber);
        const tempFilters = [];
        for (var i = 0; i < 4; i++) {
            if (filterArray[i][2] != "") {
                tempFilters.push(filterArray[i]);
            }
        }
        const data = {
            "user_id":  1234,
            "rows": ["id", "modeofpayment", "amount", "crdr", "chequeno", "date", "particulars", "clientid"],
            "filters": tempFilters,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": Number(pageNumber),
            "pg_size": Number(currentPages),
            "search_key": isSearchOn ? searchQuery : ""
        };
        const response = await APIService.getBankStatement(data)
        const temp = await response.json();
        const result = temp.data;
        const t = temp.total_count;
        setTotalItems(t);
        setExistingStatement(result);
        setPageLoading(false);
    }
    const fetchQuantityData = async (number) => {
        setPageLoading(true);
        setCurrentPages(number)
        const tempFilters = [];
        for (var i = 0; i < 4; i++) {
            if (filterArray[i][2] != "") {
                tempFilters.push(filterArray[i]);
            }
        }
        const data = {
            "user_id": 1234,
            "rows": ["id", "modeofpayment", "amount", "crdr", "chequeno", "date", "particulars", "clientid"],
            "filters": tempFilters,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": Number(currentPage),
            "pg_size": Number(number),
            "search_key": isSearchOn ? searchQuery : ""
        };
        const response = await APIService.getBankStatement(data)
        const temp = await response.json();
        const result = temp.data;
        const t = temp.total_count;
        setTotalItems(t);
        setExistingStatement(result);
        setPageLoading(false);
    }
    const handleSort = async (field) => {
        setPageLoading(true);
        setSortField(field);
        const tempFilters = [];
        for (var i = 0; i < 4; i++) {
            if (filterArray[i][2] != "") {
                tempFilters.push(filterArray[i]);
            }
        }
        const data = {
            "user_id": userId || 1234,
            "rows": ["id", "modeofpayment", "amount", "date", "particulars", "clientid", "crdr"],
            "filters": tempFilters,
            "sort_by": [field],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": isSearchOn ? searchQuery : ""
        };
        const response = await APIService.getBankStatement(data)
        const temp = await response.json();
        const result = temp.data;
        const t = temp.total_count;
        setTotalItems(t);
        setExistingStatement(result);
        setFlag((prev) => {
            return !prev;
        })
        setPageLoading(false);
    }

    useEffect(() => {

        fetchUserId();
        getCRDetails();
        getVendorAdmin();
        fetchBankStatement();
        getEmployees();
        const handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setModeFilter(false);
                setDateFilter(false);
                setAmountFilter(false);
                setClientFilter(false);
                setTypeFilter(false);
                setParticularsFilter(false);
                setCRFilter(false);

            }
        }

        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);
    //Validation of the form
    const initialValues = {
        modeofpayment: "",
        particulars: "",
        amount: "",
        vendor: "",
        date: "",
        crdr: "",
        how: ""
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});

    // handle changes in input form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!validate()) {
            return ;
        }
        // setFormErrors(validate(formValues));
        setIsConfirmManageStatementDialogue(true);
        setIsManageStatementDialogue(false);
        // setClientName((formValues.vendor).split(",", 1)[0])
        setClientName(formValues.vendor);
        // addBankStatement();
    };
    const [crValues, setCrValues]=useState(initialValues);
    const handleCR = (e) => {
        console.log("started");
        e.preventDefault();
        // if(!validateCR()) {
        //     return ;
        // }
       
        addCreditRecipt();
        setCreditReceipt(false)
    };
    // validate form and to throw Error message
    const validate = ()  => {
        var res = true;
        if(!formValues.modeofpayment) {
            setFormErrors((existing) => {
               return {...existing, modeofpayment: "Select a mode"}
            })
            res = false;
        }else {
            setFormErrors((existing) => {
                return {...existing,modeofpayment: ""}
             })
        }
        if(!formValues.particulars) {
            setFormErrors((existing) => {
               return  {...existing,particulars: "Enter particulars"}
            })
            res = false;
        }else {
            setFormErrors((existing) => {
                return  {...existing,particulars: ""}
             })
        }
        console.log(formValues.amount);
        // console.log(!Number.isInteger(formValues.amount));
        if(!formValues.amount ) {
            setFormErrors((existing) => {
                return {...existing,amount: "Amount is Mandatory"}
            })
            res = false;
        }else {
            setFormErrors((existing) => {
                return {...existing,amount: ""}
            })
        }
        if(!formValues.date) {
            setFormErrors((existing) => {
                return {...existing,date: "Select a date"}
            })
            res = false;
        }else {
            setFormErrors((existing) => {
                return {...existing,date: ""}
            })
        }
        if(!formValues.crdr) {
            setFormErrors((existing) => {
                return {...existing,crdr: "Select DR or CR"}
            })
            res = false;
        }else {
            setFormErrors((existing) => {
                return {...existing,crdr: ""}
            })
        }
        return res;
    }
    const validateCR = () => {
        var res = true;
        if(!formValues.modeofpayment) {
            setFormErrors((existing) => {
               return {...existing, modeofpayment: "Select a mode"}
            })
            res = false;
        }else {
            setFormErrors((existing) => {
                return {...existing,modeofpayment: ""}
             })
        }
        if(!formValues.employee) {
            setFormErrors((existing) => {
               return  {...existing,employee: "Enter Employee"}
            })
            res = false;
        }else {
            setFormErrors((existing) => {
                return  {...existing,particulars: ""}
             })
        }
        console.log(formValues.amount);
        // console.log(!Number.isInteger(formValues.amount));
        if(!formValues.amount ) {
            setFormErrors((existing) => {
                return {...existing,amount: "Amount is Mandatory"}
            })
            res = false;
        }else {
            setFormErrors((existing) => {
                return {...existing,amount: ""}
            })
        }
        if(!formValues.date) {
            setFormErrors((existing) => {
                return {...existing,date: "Select a date"}
            })
            res = false;
        }else {
            setFormErrors((existing) => {
                return {...existing,date: ""}
            })
        }
        if(!formValues.entity) {
            setFormErrors((existing) => {
                return {...existing,entity: "Select entity"}
            })
            res = false;
        }else {
            setFormErrors((existing) => {
                return {...existing,entity: ""}
            })
        }
        if(!formValues.how) {
            setFormErrors((existing) => {
                return {...existing,how: "Select How paid"}
            })
            res = false;
        }else {
            setFormErrors((existing) => {
                return {...existing,how: ""}
            })
        }
        if(!formValues.client) {
            setFormErrors((existing) => {
                return {...existing,client: "Enter Client"}
            })
            res = false;
        }else {
            setFormErrors((existing) => {
                return {...existing,client: ""}
            })
        }
        return res;
    };
    const [isConfirmManageStatementDialogue, setIsConfirmManageStatementDialogue] = React.useState(false);
    const [isManageStatementDialogue, setIsManageStatementDialogue] = React.useState(false);
    const handleOpen = () => {
        setFormValues(initialValues);
        setIsManageStatementDialogue(true);
        setIsConfirmManageStatementDialogue(false);
    };
    const handleClose = () => {
        setIsManageStatementDialogue(false);
        setIsConfirmManageStatementDialogue(false);
    }
    const handleCloseForConfirm = () => {
        setIsManageStatementDialogue(true);
        setIsConfirmManageStatementDialogue(false)
    }

    const [isEditDialogue, setIsEditDialogue] = React.useState(false);
    const editStatement = (item, vendor, howReceived, mode) => {
        const items = { item, "vendorList": vendor, "how": howReceived, "mode": mode }
        setCurrentStatement(items);
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
        await fetchBankStatement();
    }
    const handleDownload = () => {
        const worksheet = XLSX.utils.json_to_sheet(existingStatement);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "BankStatement.xlsx");
        FileSaver.saveAs(workbook, "demo.xlsx");
    }
    const [flag, setFlag] = useState(false);
    const handleSearch = async () => {
        setPageLoading(true);
        const data = {
            "user_id": userId || 1234,
            "rows": ["id", "modeofpayment", "amount", "date", "particulars", "clientid"],
            "filters": [],
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": Number(currentPage),
            "pg_size": Number(currentPages),
            "search_key": searchQuery
        };
        const response = await APIService.getBankStatement(data)
        const temp = await response.json();
        const result = temp.data;
        const t = temp.total_count;
        setTotalItems(t);
        setExistingStatement(result);
        setPageLoading(false);


    }
    const handleCloseSearch = async  () => {
        setPageLoading(true);
        setSearchQuery("");
        const data = {
            "user_id": userId || 1234,
            "rows": ["id", "modeofpayment", "amount", "crdr", "chequeno", "date", "particulars", "clientid"],
            "filters": [],
            "sort_by": [],
            "order": "asc",
            "pg_no": 1,
            "pg_size": 15
        }
        const response = await APIService.getBankStatement(data);
        const result = await response.json();
        setExistingStatement(result.data);
        setTotalItems(result.total_count);
        setPageLoading(false);
    }
    const [typeFilter, setTypeFilter] = useState(false);
    const [typeFilterInput, setTypeFilterInput] = useState("");
    const toggletypeFilter = () => {
        setTypeFilter((prev) => !prev)
    }
    const [modeFilter, setModeFilter] = useState(false);
    const [modeFilterInput, setModeFilterInput] = useState("");
    const toggleModeFilter = () => {
        setModeFilter((prev) => !prev)
    }
    const [dateFilter, setDateFilter] = useState(false);
    const [dateFilterInput, setDateFilterInput] = useState("");
    const toggleDateFilter = () => {
        setDateFilter((prev) => !prev)
    }
    const [amountFilter, setAmountFilter] = useState(false);
    const [amountFilterInput, setAmountFilterInput] = useState("");
    const toggleAmountFilter = () => {
        setAmountFilter((prev) => !prev)
    }
    const [clientFilter, setClientFilter] = useState(false);
    const [clientFilterInput, setClientFilterInput] = useState("");
    const toggleClientFilter = () => {
        setClientFilter((prev) => !prev)
    }
    const [particularsFilter, setParticularsFilter] = useState(false);
    const [particularsFilterInput, setParticularsFilterInput] = useState("");
    const toggleParticularsFilter = () => {
        setParticularsFilter((prev) => !prev)
    }
    const [crFilter, setCRFilter] = useState(false);
    const [crFilterInput, setCRFilterInput] = useState("");
    const toggleCRFilter = () => {
        setCRFilter((prev) => !prev)
    }
    const handleFilter = (type, columnNo) => {
        const existing = filterArray;
        switch (type){
            case 'noFilter': 
                            switch(columnNo){
                                case 0: 
                                        existing[columnNo][1] = type;
                                        setModeFilterInput("");
                                        existing[columnNo][2] = "";
                                        setFilterArray(existing);
                                         break;
                                case 1: 
                                        existing[columnNo][1] = type;
                                        setDateFilterInput("");
                                        existing[columnNo][2] = "";
                                        setFilterArray(existing);
                                        break;
                                case 2: 
                                        existing[columnNo][1] = type;
                                        setTypeFilterInput("");
                                        existing[columnNo][2] = "";
                                        setFilterArray(existing);
                                        break;
                                case 3: 
                                        existing[columnNo][1] = type;
                                        setAmountFilterInput("");
                                        existing[columnNo][2] = "";
                                        setFilterArray(existing);
                                        break;
                                case 4: 
                                        existing[columnNo][1] = type;
                                        setParticularsFilterInput("");
                                        existing[columnNo][2] = "";
                                        setFilterArray(existing);
                                        break;
                                case 5: 
                                        existing[columnNo][1] = type;
                                        setClientFilterInput("");
                                        existing[columnNo][2] = "";
                                        setFilterArray(existing);
                                        break;
                                case 6: 
                                        existing[columnNo][1] = type;
                                        setCRFilterInput("");
                                        existing[columnNo][2] = "";
                                        setFilterArray(existing);
                                        break;
                            }

                break;
            case 'startsWith':
                                switch(columnNo){
                                case 0: 
                                        existing[columnNo][1] = type;
                                        existing[columnNo][2] = modeFilterInput;
                                        setFilterArray(existing);
                                        break;
                                case 1: 
                                        existing[columnNo][1] = type;
                                        existing[columnNo][2] = dateFilterInput;
                                        setFilterArray(existing);
                                        break;
                                case 2: existing[columnNo][1] = type;
                                        existing[columnNo][2] = typeFilterInput;
                                        setFilterArray(existing);
                                        break;
                                case 3: existing[columnNo][1] = type;
                                        existing[columnNo][2] = amountFilterInput;
                                        setFilterArray(existing);
                                        break;
                                case 4: existing[columnNo][1] = type;
                                        existing[columnNo][2] = particularsFilterInput;
                                        setFilterArray(existing);
                                        break;
                                case 5: existing[columnNo][1] = type;
                                        existing[columnNo][2] = clientFilterInput ;
                                        setFilterArray(existing);
                                        break;
                                case 6: existing[columnNo][1] = type;
                                        existing[columnNo][2] = crFilterInput;
                                        setFilterArray(existing);
                                        break;
                            }
                break;
            case 'endsWith':
                            switch(columnNo){
                                case 0: 
                                        existing[columnNo][1] = type;
                                        existing[columnNo][2] = modeFilterInput;
                                        setFilterArray(existing);
                                        break;
                                case 1: 
                                        existing[columnNo][1] = type;
                                        existing[columnNo][2] = dateFilterInput;
                                        setFilterArray(existing);
                                        break;
                                case 2: existing[columnNo][1] = type;
                                        existing[columnNo][2] = typeFilterInput;
                                        setFilterArray(existing);
                                        break;
                                case 3: existing[columnNo][1] = type;
                                        existing[columnNo][2] = amountFilterInput;
                                        setFilterArray(existing);
                                        break;
                                case 4: existing[columnNo][1] = type;
                                        existing[columnNo][2] = particularsFilterInput;
                                        setFilterArray(existing);
                                        break;
                                case 5: existing[columnNo][1] = type;
                                        existing[columnNo][2] = clientFilterInput ;
                                        setFilterArray(existing);
                                        break;
                                case 6: existing[columnNo][1] = type;
                                        existing[columnNo][2] = crFilterInput;
                                        setFilterArray(existing);
                                        break;
                            }
                            break
            case 'contains':
                            switch(columnNo){
                                case 0: 
                                        existing[columnNo][1] = type;
                                        existing[columnNo][2] = modeFilterInput;
                                        setFilterArray(existing);
                                        break;
                                case 1: 
                                        existing[columnNo][1] = type;
                                        existing[columnNo][2] = dateFilterInput;
                                        setFilterArray(existing);
                                        break;
                                case 2: existing[columnNo][1] = type;
                                        existing[columnNo][2] = typeFilterInput;
                                        setFilterArray(existing);
                                        break;
                                case 3: existing[columnNo][1] = type;
                                        existing[columnNo][2] = amountFilterInput;
                                        setFilterArray(existing);
                                        break;
                                case 4: existing[columnNo][1] = type;
                                        existing[columnNo][2] = particularsFilterInput;
                                        setFilterArray(existing);
                                        break;
                                case 5: existing[columnNo][1] = type;
                                        existing[columnNo][2] =clientFilterInput ;
                                        setFilterArray(existing);
                                        break;
                                case 6: existing[columnNo][1] = type;
                                        existing[columnNo][2] = crFilterInput;
                                        setFilterArray(existing);
                                        break;
                            }
                break;
            case 'exactMatch':
                                switch(columnNo){
                                    case 0: 
                                            existing[columnNo][1] = type;
                                            existing[columnNo][2] = modeFilterInput;
                                            setFilterArray(existing);
                                            break;
                                    case 1: 
                                            existing[columnNo][1] = type;
                                            existing[columnNo][2] = dateFilterInput;
                                            setFilterArray(existing);
                                            break;
                                    case 2: existing[columnNo][1] = type;
                                            existing[columnNo][2] = typeFilterInput;
                                            setFilterArray(existing);
                                            break;
                                    case 3: existing[columnNo][1] = type;
                                            existing[columnNo][2] = amountFilterInput;
                                            setFilterArray(existing);
                                            break;
                                    case 4: existing[columnNo][1] = type;
                                            existing[columnNo][2] = particularsFilterInput ;
                                            setFilterArray(existing);
                                            break;
                                    case 5: existing[columnNo][1] = type;
                                            existing[columnNo][2] =clientFilterInput ;
                                            setFilterArray(existing);
                                            break;
                                    case 6: existing[columnNo][1] = type;
                                            existing[columnNo][2] = crFilterInput;
                                            setFilterArray(existing);
                                            break;
                                }
                break;
            case 'isNull':
                            switch(columnNo){
                                case 0: 
                                        existing[columnNo][1] = type;
                                        existing[columnNo][2] = modeFilterInput;
                                        setFilterArray(existing);
                                        break;
                                case 1: 
                                        existing[columnNo][1] = type;
                                        existing[columnNo][2] = dateFilterInput;
                                        setFilterArray(existing);
                                        break;
                                case 2: existing[columnNo][1] = type;
                                        existing[columnNo][2] = typeFilterInput;
                                        setFilterArray(existing);
                                        break;
                                case 3: existing[columnNo][1] = type;
                                        existing[columnNo][2] = amountFilterInput;
                                        setFilterArray(existing);
                                        break;
                                case 4: existing[columnNo][1] = type;
                                        existing[columnNo][2] = particularsFilterInput;
                                        setFilterArray(existing);
                                        break;
                                case 5: existing[columnNo][1] = type;
                                        existing[columnNo][2] =clientFilterInput ;
                                        setFilterArray(existing);
                                        break;
                                case 6: existing[columnNo][1] = type;
                                        existing[columnNo][2] = crFilterInput;
                                        setFilterArray(existing);
                                        break;
                            }
                break;
            case 'isNotNull':
                switch(columnNo){
                    case 0: 
                            existing[columnNo][1] = type;
                            existing[columnNo][2] = modeFilterInput;
                            setFilterArray(existing);
                            break;
                    case 1: 
                            existing[columnNo][1] = type;
                            existing[columnNo][2] = dateFilterInput;
                            setFilterArray(existing);
                            break;
                    case 2: existing[columnNo][1] = type;
                            existing[columnNo][2] = typeFilterInput;
                            setFilterArray(existing);
                            break;
                    case 3: existing[columnNo][1] = type;
                            existing[columnNo][2] = amountFilterInput;
                            setFilterArray(existing);
                            break;
                    case 4: existing[columnNo][1] = type;
                            existing[columnNo][2] = particularsFilterInput ;
                            setFilterArray(existing);
                            break;
                    case 5: existing[columnNo][1] = type;
                            existing[columnNo][2] = clientFilterInput;
                            setFilterArray(existing);
                            break;
                    case 6: existing[columnNo][1] = type;
                            existing[columnNo][2] = crFilterInput;
                            setFilterArray(existing);
                            break;
                }
                break;
            
        }
       fetchBankStatement();

    }
    const handleExcelDownload = async () => {
        const data = {
            "user_id": 1234,
            "rows": ["id", "modeofpayment", "amount", "crdr", "chequeno", "date", "particulars", "clientid"],
            "filters": [],
            "sort_by": [],
            "order": "asc",
            "pg_no": 0,
            "pg_size": 0
        };
        const response = await APIService.getBankStatement(data)
        const temp = await response.json();
        const result = temp.data;
        const worksheet = XLSX.utils.json_to_sheet(result);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "bankStatement.xlsx");
        FileSaver.saveAs(workbook, "demo.xlsx");
    }

    const openDownload = () => {
        setDownloadModal((prev) => !prev);
    }
    const handlePageChange = (event, value) => {

        setCurrentPage(value)
        fetchPageData(value);
    }
    const [currentMode,setCurrentMode]=useState("")
    const openCreditRecipt = (item) => {
        console.log(item)
        const modeOfThisItem=item.modeofpayment;
        mode.map(ele =>{
            if( modeOfThisItem == ele[0]){
                setCurrentMode(ele[1])
            }
        })
        const initialValues = {
            modeofpayment: currentMode,
            particulars: item.particulars,
            amount: item.amount,
            vendor: item.vendor,
            date: item.date,
            crdr: item.crdr,
            how: item.how,
        };
        setFormValues(initialValues);
        setCreditReceipt(true);

    }
    const handleCloseCR = () => {
        setCreditReceipt(false);
    }
    const [showEditSuccess,setShowEditSuccess] = useState(false);
    const openEditSuccess =() => {
        setIsEditDialogue(false);
        setShowEditSuccess(true);
        setTimeout(function () {
            setShowEditSuccess(false);
        },2000)
        fetchBankStatement();
      }
    return (
        <div className="h-screen">
            <Navbar/>
            <SucessfullModal isOpen={showSucess} message={successMessage} />
            <FailureModal isOpen={showFailure} message="Error! cannot create Bank Statement" />
            <Delete isOpen={showDelete} currentStatement={currentStatementId} closeDialog={setShowDelete} fetchData={fetchBankStatement} />
            {showEditSuccess && <SucessfullModal isOpen={showEditSuccess} message="successfully Updated Bank Statement"/>}
            <div className="w-full h-[calc(100vh_-_7rem)] px-10">
            <div className='h-16 w-full  flex justify-between items-center p-2  border-gray-300 border-b-2'>
                            <div className='flex items-center space-x-3'>
                                <div className='rounded-2xl  bg-[#EBEBEB] h-8 w-8 flex justify-center items-center'>
                                    <Link to="/dashboard"><img className='w-5 h-5' src={backLink} /></Link>
                                </div>
                                <div className='flex-col'>
                                    <h1 className="text-[18px]">Manage Bank Statement</h1>
                                    <p className="text-[14px]">Manage &gt; Manage Bank Statement</p>
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
                                        <img onClick={handleSearch} className="h-[26px] " src={searchIcon} alt="search-icon" />
                                    </div>
                                </div>

                                <div>
                                    {/* button */}
                                    <button className="bg-[#004DD7] text-white h-[36px] w-[280px] rounded-lg" onClick={handleOpen}>
                                        <div className="flex items-center justify-center gap-4">
                                            Add New Bank Statement
                                            <img className='h-[18px] w-[18px]' src={Add} alt="add" />
                                        </div>
                                    </button>
                                </div>

                            </div>

                        </div>


                        <div className='h-12 w-full bg-white'>
                            <div className='flex justify-between'>
                            <div className='w-[85%] flex'>
                                <div className='w-[5%] p-4'>

                                </div>
                                <div className='w-[10%]  p-3'>
                                    <div className="w-[90%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                        <input className="w-12 bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2" value={modeFilterInput} onChange={(e) => setModeFilterInput(e.target.value)} />
                                        <button className='p-1' onClick={() => setModeFilter((prev) => !prev)}><img src={Filter} className='h-[15px] w-[15px]' /></button>
                                    </div>
                                    {modeFilter && <div className='h-[270px] w-[150px] mt-3 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm' ref={menuRef}>
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
                                <div className='w-[10%] p-3'>
                                    <div className='w-[90%] flex items-center bg-[#EBEBEB] rounded-[5px]'>
                                        <input className="w-12 rounded-[5px] bg-[#EBEBEB] text-[11px] pl-2" value={dateFilterInput} onChange={(e) => setDateFilterInput(e.target.value)} />
                                        <button className='p-1' onClick={() => setDateFilter((prev) => !prev)}><img src={Filter} className='h-[15px] w-[15px]' /></button>
                                        {dateFilter && <div className='h-[270px] w-[150px] mt-3 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm' ref={menuRef}>
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
                                </div>
                                <div className='w-[10%] p-3'>
                                    <div className='w-[90%] flex items-center bg-[#EBEBEB] rounded-[5px]'>
                                        <input className="w-12 bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2" value={typeFilterInput} onChange={(e) => setTypeFilterInput(e.target.value)} />
                                        <button className='p-1' onClick={() => setTypeFilter((prev) => !prev)}><img src={Filter} className='h-[15px] w-[15px]' /></button>
                                        {typeFilter && <div className='h-[270px] w-[150px] mt-3 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm' ref={menuRef}>
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
                                </div>
                                <div className='w-[10%] p-3'>
                                    <div className='w-[90%] flex items-center bg-[#EBEBEB] rounded-[5px]'>
                                        <input className="w-12 bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2" value={amountFilterInput} onChange={(e) => setAmountFilterInput(e.target.value)} />
                                        <button className='p-1' onClick={() => setAmountFilter((prev) => !prev)}><img src={Filter} className='h-[16px] w-[16px]' /></button>
                                        {amountFilter && <div className='h-[270px] w-[150px] mt-3 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm' ref={menuRef}>
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
                                <div className='w-[30%] p-3'>
                                    <div className='w-[29%] flex items-center bg-[#EBEBEB] rounded-[5px]'>
                                        <input className="w-14 bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2" value={particularsFilterInput} onChange={(e) => setParticularsFilterInput(e.target.value)} />
                                        <button className='p-1' onClick={() => setParticularsFilter((prev) => !prev)}><img src={Filter} className='h-[16px] w-[14px]' /></button>
                                        {particularsFilter && <div className='h-[270px] w-[150px] mt-3 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm' ref={menuRef}>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => handleFilter('noFilter', 4)}><h1 >No Filter</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => handleFilter('contains', 4)}><h1 >Contains</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => handleFilter('contains', 4)}><h1 >DoesNotContain</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => handleFilter('startsWith', 4)}><h1 >StartsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                                                <button onClick={() => handleFilter('endsWith', 4)}><h1 >EndsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => handleFilter('exactMatch', 4)}><h1 >EqualTo</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => handleFilter('isNull', 4)}><h1 >isNull</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => handleFilter('isNotNull', 4)}><h1 >NotIsNull</h1></button>
                                            </div>
                                        </div>}
                                    </div>
                                </div>
                                <div className='w-[20%] p-3'>
                                    <div className='w-[44%] flex items-center bg-[#EBEBEB] rounded-[5px]'>
                                        <input className="w-14 bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2" value={clientFilterInput} onChange={(e) => setClientFilterInput(e.target.value)} />
                                        <button className='p-1' onClick={() => setClientFilter((prev) => !prev)}><img src={Filter} className='h-[15px] w-[20px]' /></button>
                                        {clientFilter && <div className='h-[270px] w-[150px] mt-3 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm' ref={menuRef}>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => handleFilter('noFilter', 5)}><h1 >No Filter</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => handleFilter('contains', 5)}><h1 >Contains</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => handleFilter('contains', 5)}><h1 >DoesNotContain</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => handleFilter('startsWith',5)}><h1 >StartsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                                                <button onClick={() => handleFilter('endsWith', 5)}><h1 >EndsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => handleFilter('exactMatch',5)}><h1 >EqualTo</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => handleFilter('isNull', 5)}><h1 >isNull</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => handleFilter('isNotNull', 5)}><h1 >NotIsNull</h1></button>
                                            </div>
                                        </div>}
                                    </div>
                                </div>
                                <div className='w-[10%] p-3'>
                                    <div className='w-[90%] flex items-center bg-[#EBEBEB] rounded-[5px]'>
                                        <input className="w-12 bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2" value={crFilterInput} onChange={(e) => setCRFilterInput(e.target.value)} />
                                        <button className='p-1' onClick={() => setCRFilter((prev) => !prev)}><img src={Filter} className='h-[15px] w-[15px]' /></button>
                                        {crFilter && <div className='h-[270px] w-[150px] mt-3 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm' ref={menuRef}>
                                        <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => handleFilter('noFilter', 6)}><h1 >No Filter</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => handleFilter('contains', 6)}><h1 >Contains</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => handleFilter('contains', 6)}><h1 >DoesNotContain</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => handleFilter('startsWith', 6)}><h1 >StartsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                                                <button onClick={() => handleFilter('endsWith', 6)}><h1 >EndsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => handleFilter('exactMatch', 6)}><h1 >EqualTo</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => handleFilter('isNull', 6)}><h1 >isNull</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => handleFilter('isNotNull', 6)}><h1 >NotIsNull</h1></button>
                                            </div>
                                        </div>}
                                    </div>
                                </div>

                            </div>
                            <div className='w-[15%] flex'>
                                {/* <div className='w-[100px] p-2 mt-2'>
                                   <input className="w-14 bg-[#EBEBEB]"/>
                                   <button className='p-1'><img src={Filter} className='h-[17px] w-[14px]'/></button>
                                </div> */}
                                <div className='w-1/2 0 p-4'>

                                </div>
                            </div>
                        </div>
                        </div>

                         <div className="w-full h-[calc(100vh_-_14rem)] text-[12px]">
                               
                         <div className='w-full h-12 bg-[#F0F6FF] flex justify-between'>
                            <div className='w-[85%] flex'>
                                <div className='w-[5%] p-4'>
                                    <p>Sr. </p>
                                </div>
                                <div className='w-[10%]  p-4'>
                                    <p onClick={() => handleSort("modeofpayment")}>Mode <span className="font-extrabold">↑↓</span></p>
                                </div>
                                <div className='w-[10%]  p-4'>
                                    <p onClick={() => handleSort("date")}>Date ↑↓</p>
                                </div>
                                <div className='w-[10%]  p-4'>
                                    <p onClick={() => handleSort("crdr")}>Type ↑↓</p>
                                </div>
                                <div className='w-[10%]  p-4'>
                                    <p onClick={() => handleSort("amount")}>Amount ↑↓ </p>
                                </div>
                                <div className='w-[30%]  p-4'>
                                    <p onClick={() => handleSort("particulars")}>Particulars ↑↓</p>
                                </div>
                                <div className='w-[20%] p-4 '>
                                    <p onClick={() => handleSort("clientid")}>Client Name ↑↓</p>
                                </div>

                                <div className='w-[12%] p-4 '>
                                    <p>Client Receipt</p>
                                </div>
                            </div>
                            <div className='w-[15%] flex'>
                                <div className='w-1/2  p-4'>
                                    <p onClick={() => handleSort("id")}>ID ↑↓</p>
                                </div>
                                <div className='w-1/2 0 p-4'>
                                    <p>Edit</p>
                                </div>
                            </div>
                        </div>
                          


                        <div className='w-full h-[calc(100vh_-_17rem)] overflow-auto'>
                            {pageLoading && <div className='ml-11 mt-9'>
                                <CircularProgress />
                            </div>}
                            {!pageLoading && existingStatement && existingStatement.map((item, index) => {
                                return <div className='w-full   flex justify-between border-gray-400 border-b-[1px]'>
                                    <div className='w-[85%] text-[11px] min-h-0  flex'>
                                        <div className='w-[5%] p-4'>
                                            <p>{index + 1 + (currentPage - 1) * currentPages} </p>
                                        </div>
                                        <div className='w-[10%]  p-4'>

                                            {mode && mode.map(ele => (
                                                (item.modeofpayment === ele[0]) ?
                                                    <p>{ele[1]}</p> : ""))}
                                        </div>
                                        <div className='w-[10%]  p-4'>
                                            {/* <p>{item.date}</p> */}
                                            {item.date}
                                            {/* <p>{dayjs(item.date, "dd-mmm-yyyy")}</p> */}
                                        </div>
                                        <div className='w-[10%]  p-4'>
                                            <p>{item.crdr === "CR" ? "Credit" : "Debit"}</p>
                                        </div>
                                        <div className='w-[10%]  p-4'>
                                            <p>{item.amount.toFixed(2)}</p>
                                        </div>
                                        <div className='w-[30%] break-all p-4 '>
                                            <p>{item.particulars}</p>
                                        </div>
                                        <div className='w-[20%] break-all p-4 '>
                                            {/* <p>{item.clientid}</p> */}
                                            {client && client.map(ele => (
                                                (item.clientid === ele[0]) ?
                                                    <p>{ele[1]}</p> : ""))}
                                        </div>

                                        <div className='w-[10%]  p-4 text-blue-500 cursor-pointer'>
                                            {(!(item.clientid) && item.crdr === "CR                  ") && <p onClick={() => openCreditRecipt(item)}>Enter CR</p>}

                                            {/* <p onClick={openCreditRecipt}>{item.crdr}</p> */}
                                        </div>
                                    </div>
                                    <div className='w-[15%] flex'>
                                        <div className='w-1/2  p-4'>
                                            <p>{item.id}</p>

                                        </div>
                                        <div className='w-1/2 0 p-4 flex justify-between items-center'>
                                            <img className='w-5 h-5 cursor-pointer' src={Edit} alt="edit" onClick={() => editStatement(item, vendorList, howReceived, mode)} />
                                            <img className='w-5 h-5 cursor-pointer' src={Trash} alt="trash" onClick={() => deleteStatement(item.id)} />
                                        </div>
                                    </div>
                                </div>
                            })}
                            {/* we get all the existing builders here */}
                            {isEditDialogue && <EditManageStatement openDialog={isEditDialogue} setOpenDialog={setIsEditDialogue} bankStatement={currentStatement} fetchData={fetchBankStatement} showSuccess={openEditSuccess} />}
                            {showDelete && <Delete openDialog={isDeleteDialogue} setOpenDialog={setIsDeleteDialogue} currentStatement={currentStatement} fetch={fetchBankStatement} />}
                        </div>







                         </div>







            </div>


            <div className='w-full h-12 flex justify-between px-6 '>
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



                    <Modal open={isManageStatementDialogue}
                fullWidth={true}
                maxWidth={'md'} >
                    <>
                    <Draggable>
                <div className='flex justify-center items-center mt-[70px]'>
                    <div className="w-[1050px] h-[500px] bg-white rounded-lg">
                        <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-lg">
                            <div className="mr-[410px] ml-[410px]">
                                <div className="text-[16px]">New Bank Statement</div>
                            </div>
                            <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                                <img onClick={handleClose} className="w-[20px] h-[20px] cursor-pointer" src={Cross} alt="cross" />
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="w-full mt-[5px] ">
                                <div className="flex gap-[48px] justify-center items-center">
                                    <div className=" space-y-[12px] py-[20px] px-[10px]">
                                        <div className="">
                                            <div className="text-[14px]">Mode<label className="text-red-500">*</label></div>
                                            <select className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="modeofpayment" value={formValues.modeofpayment} onChange={handleChange} required>
                                                <option value="none" hidden >Select Mode</option>
                                                {mode && mode.map(item => (
                                                    <option key={item[0]} value={item[0]}>
                                                        {item[1]}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.modeofpayment}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Particulars<label className="text-red-500">*</label></div>
                                            {/* <input className="w-[230px] h-[40px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="particulars" value={formValues.particulars} onChange={handleChange} /> */}
                                            <textarea className=" text-[12px] pl-4 break-all w-[230px] h-[40px] border-[1px] border-[#C6C6C6] rounded-sm text-xs " name="particulars" value={formValues.particulars} onChange={handleChange} required/>
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.particulars}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Amount<label className="text-red-500">*</label></div>
                                            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="amount" value={formValues.amount} onChange={handleChange} required />
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Vendor</div>
                                            <select className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="vendor" value={formValues.vendor} onChange={handleChange} >
                                                <option >Select Vendor List</option>
                                                {vendorList && vendorList.map(item => (
                                                    <option  value={item}>
                                                        {item[1]}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.vendor}</div>
                                        </div>
                                    </div>
                                    <div className="space-y-[40px] py-[20px] px-[10px]">
                                        <div className="">
                                            <div className="text-[14px]">Date <label className="text-red-500">*</label></div>
                                            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="date" name="date" value={formValues.date} onChange={handleChange} required/>
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.date}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">CR/DR <label className="text-red-500">*</label></div>
                                            <select className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="crdr" value={formValues.crdr} onChange={handleChange} >
                                                <option >Select CR/DR</option>
                                                {crdr && crdr.map(item => (
                                                    <option  value={item}>
                                                        {item}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.crdr}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">How Recieved(CR)?</div>
                                            <select className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="how" value={formValues.how} onChange={handleChange} >
                                                <option >Select how Received</option>
                                                {howReceived && howReceived.map(item => (
                                                    <option  value={item}>
                                                        {item[1]}
                                                    </option>
                                                ))}
                                            </select>

                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.how}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="my-[125px] flex justify-center items-center gap-[10px]">

                                <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' type="submit">Add</button>
                                <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleClose}>Cancel</button>
                                {isLoading && <CircularProgress />}
                            </div>
                        </form>
                    </div>
                </div>
                </Draggable>
                </>
            </Modal>
             


            <Modal open={showCreditReceipt}
                fullWidth={true}
                maxwidth={'md'} bankStatement={currentStatement}>
                {/* <h1>{currentStatement}</h1> */}
                <>
                    <Draggable>
                <div className='flex justify-center items-center mt-[70px]'>
                    <div className="w-[1050px] h-[500px] bg-white rounded-lg">
                        <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center">
                            <div className="mr-[410px] ml-[410px]">
                                <div className="text-[16px]">Enter CR</div>
                            </div>
                            <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                                <img onClick={handleCloseCR} className="w-[20px] h-[20px] cursor-pointer" src={Cross} alt="cross" />
                            </div>
                        </div>
                        <form onSubmit={handleCR} >
                            <div className="w-full mt-[5px] ">
                                <div className="flex gap-[48px] justify-center items-center">
                                    <div className=" space-y-[5px] py-[5px] px-[5px]">
                                        <div className="">
                                            <div className="text-[14px]">Cura Office<label className="text-red-500">*</label></div>
                                            <input className=" text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="Pune" value="Pune" disabled />
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Recieved By<label className="text-red-500">*</label></div>
                                            <select className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="employee" value={formValues.employee} onChange={handleChange} required >
                                                <option >Select Employee</option>
                                                {employees && employees.map(item => (
                                                    <option key={item} value={item.id}>
                                                        {item.employeename}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.employee}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Mode<label className="text-red-500">*</label></div>
                                            <select className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="modeofpayment" value={formValues.modeofpayment} onChange={handleChange} required>
                                               
                                                {mode && mode.map(item => (
                                                    <option key={item} value={item[0]}>
                                                        {item[1]}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.modeofpayment}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Recieved Date<label className="text-red-500">*</label></div>
                                            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="date" value={formValues.date} onChange={handleChange} disabled/>
                                            
                                            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.recddate}</div> */}
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Entity<label className="text-red-500">*</label></div>
                                            <select className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="entity" value={formValues.entity} onChange={handleChange} required >
                                                {entity && entity.map(item => (
                                                    <option key={item} value={item[0]}>
                                                       {item[1]}
                                                    </option>
                                                ))}
                                            </select>
                                            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Amount Recieved<label className="text-red-500">*</label></div>
                                            <input className=" text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text"  name="amount" value={formValues.amount} onChange={handleChange} required />
                                            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">How Recieved?<label className="text-red-500">*</label></div>
                                            <select className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="how" value={formValues.how} onChange={handleChange} required>
                                                <option >Select How Recieved</option>
                                                {howReceived && howReceived.map(item => (
                                                    <option key={item} value={item[0]}>
                                                        {item[1]}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.how}</div>
                                        </div>
                                    </div>
                                    <div className=" space-y-[12px] py-[20px] px-[10px]">

                                        <div className="">
                                            <div className="text-[14px]">Client <label className="text-red-500">*</label></div>
                                            <select className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="client" value={formValues.client} onChange={handleChange} required >
                                                <option >Select Client</option>
                                                {client && client.map(item => (
                                                    <option key={item[0]} value={item[0]}>
                                                        {item[1]}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.client}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Receipt Description</div>
                                            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="desc" value={formValues.desc} onChange={handleChange} />
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.desc}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Pending Amount </div>
                                            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="pending" value={formValues.pending} onChange={handleChange} disabled />
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.pending}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Service Amount</div>
                                            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="serviceAmount" value={formValues.serviceAmount} onChange={handleChange} />
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.serviceAmount}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Reimbursement Amount </div>
                                            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="reimbAmount" value={formValues.reimbAmount} onChange={handleChange}  />
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.reimbAmount}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">TDS </div>
                                            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="TDS" value={formValues.TDS} onChange={handleChange}  />
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.TDS}</div>
                                        </div>




                                    </div>
                                </div>
                            </div>

                            <div className="mt-[10px] flex justify-center items-center gap-[10px]">

                                <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' type="submit">Save</button>
                                <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleCloseCR}>Cancel</button>
                                {isLoading && <CircularProgress />}
                            </div>
                        </form>
                    </div>
                </div>
                    </Draggable>
                    </>
            </Modal>




            <Modal open={isConfirmManageStatementDialogue} >
                <>
                    <Draggable>
                <div className='w-2/4 h-64 rounded-xl bg-white mx-auto mt-48' >
                    <div className="h-[40px] flex justify-center items-center">
                        <div className="w-[150px] mt-10 w-full text-center">
                            <div className="text-[24px]">Save Bank Statement</div>
                            <hr class="w-60 h-1 mx-auto  bg-gray-100"></hr>
                        </div>

                        <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                            <img onClick={handleCloseForConfirm} className="w-[20px] h-[20px]" src={Cross} alt="cross" />
                        </div>
                    </div>
                    <div className="mt-8 w-full text-center">
                        <div className="text-[14px]">Client:{clientName}</div>
                    </div>
                    <div className="mt-4 w-full text-center">
                        <p className="text-[14px]">Are you sure you want to Add new Bank statement</p>
                    </div>
                    <div className="my-10 flex justify-center items-center gap-[10px]">
                        <button className='w-[132px] h-[48px] bg-[#004DD7] text-white rounded-md' onClick={addBankStatement}>Save</button>
                        <button className='w-[132px] h-[48px] border-[1px] border-[#282828] rounded-md' onClick={handleCloseForConfirm}>Cancel</button>
                    </div>
                </div>
                    </Draggable>
                </>
            </Modal>









        </div>
    )
}

export default ManageBankStatement
