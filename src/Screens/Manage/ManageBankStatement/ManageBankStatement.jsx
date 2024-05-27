import { CircularProgress, Modal, Pagination , LinearProgress, Backdrop} from "@mui/material";
import React, { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";
import Navbar from "../../../Components/Navabar/Navbar";
import FailureModal from '../../../Components/modals/FailureModal';
import AsyncSelect from "react-select/async"
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
import CancelModel from './../../../Components/modals/CancelModel';
import Pdf from "../../../assets/pdf.png";
import Excel from "../../../assets/excel.png"
import CharacterFilter from "../../../Components/Filters/CharacterFilter"
import DateFilter from '../../../Components/Filters/DateFilter';
import NumericFilter from '../../../Components/Filters/NumericFilter';
import Draggable from "react-draggable";
import DropDown from "../../../Components/Dropdown/Dropdown";
import { formatDate } from "../../../utils/formatDate";
// import DayJS from 'react-dayjs';
const env_URL_SERVER = import.meta.env.VITE_ENV_URL_SERVER
const ManageBankStatement = () => {
    // we have the module here
    const dataRows = [
        "mode",
        "date",
        "crdr",
        "amount",
        "particulars",
        "clientname",
        "id"
    ]
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
    const [filterArray, setFilterArray] = useState([["modeofpayment", "contains", ""], ["date", "contains", ""], ["crdr", "contains", ""], ["amount", "contains", ""], ["particulars", "contains", ""], ["clientid", "contains", ""]]);
    const [sortField, setSortField] = useState("id");
    const [isSearchOn, setIsSearchOn] = useState(false);

    // const [selectedBuilder,setSelectedBuilder] = useState();
    const [existingUsers,setExistingUsers] = useState([])
    const fetchUsersData = async () => {
        const data = {
        "user_id" : 1234
        }
        const response = await APIService.getUsers(data)
        const res = await response.json()
        setExistingUsers((prev) => res.data)
        
    }
   
    
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
    const [amountData,setAmountData] = useState(0);
    const fetchBankStatement = async () => {
        setPageLoading(true);
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
        setFilterState((prev) => tempArray);
        setCurrentPage((prev) => 1)
        setCurrentPages((prev) => 15)
        const data = {
            "user_id": userId || 1234,
            "rows": dataRows,
            "filters": tempArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": Number(currentPage),
            "pg_size": Number(currentPages),
            "search_key": searchQuery 
        }
        const response = await APIService.getBankStatement(data);
        const temp = await response.json();
         
        const t = temp.total_count;
        setAmountData(temp.total_amount)
        const curr = [...modeFooter]
        curr[5].modeamount = temp.total_amount
        setModeFooter(curr)
         const result = temp.data;
        // setAmountData(result.total_amount)
        setTotalItems(t);
        setPageLoading(false);
        setExistingStatement(result);
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
        setCurrentPage((prev) => pageNumber);
        const data = {
            "user_id": 1234,
            "rows": dataRows,
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": Number(pageNumber),
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
    const fetchQuantityData = async (number) => {
        setPageLoading(true);
        setCurrentPages((prev) => number);
        setCurrentPage((prev) => 1);
        const data = {
            "user_id": 1234,
            "rows": dataRows,
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(number),
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
    const handleSort = async (field) => {
        setPageLoading(true);
        setSortField(field);
        setFlag((prev) => {
            return !prev;
        })
        const data = {
            "user_id": userId || 1234,
            "rows": dataRows,
            "filters": filterState,
            "sort_by": [field],
            "order": !flag ? "asc" : "desc",
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

    useEffect(() => {
        fetchUsersData()
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
                setIdFilter(false);

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
        if (!validate()) {
            return;
        }
        // setFormErrors(validate(formValues));
        setIsConfirmManageStatementDialogue(true);
        setIsManageStatementDialogue(false);
        // setClientName((formValues.vendor).split(",", 1)[0])
        setClientName(formValues.vendor);
        // addBankStatement();
    };
    const [crValues, setCrValues] = useState(initialValues);
    const handleCR = (e) => {
        console.log("started");
        // e.preventDefault();
        // if(!validateCR()) {
        //     return ;
        // }
        if(!crValidate()) {
            return ;
        }
        // if()

        addCreditRecipt();
        setCreditReceipt(false)
    };
    // validate form and to throw Error message
    const validate = () => {
        var res = true;
        if (!formValues.modeofpayment) {
            setFormErrors((existing) => {
                return { ...existing, modeofpayment: "Select a mode" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, modeofpayment: "" }
            })
        }
        if (!formValues.particulars) {
            setFormErrors((existing) => {
                return { ...existing, particulars: "Enter particulars" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, particulars: "" }
            })
        }
        console.log(formValues.amount);
        // console.log(!Number.isInteger(formValues.amount));
        if (!formValues.amount) {
            setFormErrors((existing) => {
                return { ...existing, amount: "Amount is Mandatory" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, amount: "" }
            })
        }
        if (!formValues.date) {
            setFormErrors((existing) => {
                return { ...existing, date: "Select a date" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, date: "" }
            })
        }
        if (!formValues.crdr) {
            setFormErrors((existing) => {
                return { ...existing, crdr: "Select DR or CR" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, crdr: "" }
            })
        }
        return res;
    }
    const validateCR = () => {
        var res = true;
        if (!formValues.modeofpayment) {
            setFormErrors((existing) => {
                return { ...existing, modeofpayment: "Select a mode" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, modeofpayment: "" }
            })
        }
        if (!formValues.employee) {
            setFormErrors((existing) => {
                return { ...existing, employee: "Enter Employee" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, particulars: "" }
            })
        }
        console.log(formValues.amount);
        // console.log(!Number.isInteger(formValues.amount));
        if (!formValues.amount) {
            setFormErrors((existing) => {
                return { ...existing, amount: "Amount is Mandatory" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, amount: "" }
            })
        }
        if (!formValues.date) {
            setFormErrors((existing) => {
                return { ...existing, date: "Select a date" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, date: "" }
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
        if (!formValues.how) {
            setFormErrors((existing) => {
                return { ...existing, how: "Select How paid" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, how: "" }
            })
        }
        if (!formValues.client) {
            setFormErrors((existing) => {
                return { ...existing, client: "Enter Client" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, client: "" }
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
        initials();
        setIsManageStatementDialogue(false);
        setIsConfirmManageStatementDialogue(false);
        openAddCancelModal();
    }
    const initials = () => {
        setFormValues(initialValues);
        setFormErrors({});
    }
    const handleCloseForConfirm = () => {
        initials();
        setIsManageStatementDialogue(true);
        setIsConfirmManageStatementDialogue(false)
        openAddCancelModal();
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
    const handleDownload = async (type) => {
        setDownloadModal(false)
        setPageLoading(true)
        const data = {
            "user_id": 1234,
            "rows": dataRows,
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 0,
            "pg_size": 0,
            "search_key": searchInput,
            "downloadType": type,
            "colmap" : {
                "mode" : "Mode",
                "date" : "Date",
                "crdr"  : "Type",
                "amount" : "Amount",
                "particulars" : "Particulars", 
                "clientname" : "Client Name", 
                "id" : "ID"
            }
        };
        const response = await APIService.getProjectInfo(data)
        const temp = await response.json();
        const result = temp.data;
        console.log(temp)
        if (temp.result == 'success') {
            const d = {
                "filename": temp.filename,
                "user_id": 1234
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
                        FileSaver.saveAs(result, 'BankStatementData.xlsx');
                    } else if (type == "pdf") {
                        FileSaver.saveAs(result, 'BankStatementData.pdf');
                    }

                    console.log('Success:', result);
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
    const [flag, setFlag] = useState(false);
    const handleSearch = async () => {
        setPageLoading(true);
        setCurrentPage((prev) => 1);
        const data = {
            "user_id": userId || 1234,
            "rows": dataRows,
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
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
    const handleCloseSearch = async () => {
        setPageLoading(true);
        setSearchQuery("");
        setCurrentPage(1);
        const data = {
            "user_id": userId || 1234,
            "rows": dataRows,
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": ""
        }
        const response = await APIService.getBankStatement(data);
        const result = await response.json();
        setExistingStatement(result.data);
        setTotalItems(result.total_count);
        setPageLoading(false);
    }

    const [showCancelModelAdd, setShowCancelModelAdd] = useState(false);
    const [showCancelModel, setShowCancelModel] = useState(false);
    const openAddCancelModal = () => {
        // set the state for true for some time
        setIsManageStatementDialogue(false);
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
    
    const [typeFilter, setTypeFilter] = useState(false);
    const [typeFilterInput, setTypeFilterInput] = useState("");

    const [modeFilter, setModeFilter] = useState(false);
    const [modeFilterInput, setModeFilterInput] = useState("");

    const [dateFilter, setDateFilter] = useState(false);
    const [dateFilterInput, setDateFilterInput] = useState("");

    const [amountFilter, setAmountFilter] = useState(false);
    const [amountFilterInput, setAmountFilterInput] = useState("");

    const [clientFilter, setClientFilter] = useState(false);
    const [clientFilterInput, setClientFilterInput] = useState("");

    const [particularsFilter, setParticularsFilter] = useState(false);
    const [particularsFilterInput, setParticularsFilterInput] = useState("");

    const [crFilter, setCRFilter] = useState(false);
    const [crFilterInput, setCRFilterInput] = useState("");

    const [idFilter, setIdFilter] = useState(false)
    const [idFilterInput, setIdFilterInput] = useState("")

    const filterMapping = {
        mode: {
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
        crdr: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        date: {
            filterType: "",
            filterValue: null,
            filterData: "Date",
            filterInput: ""
        },
        particulars: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        clientname: {
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
        const tempArray = [];
        // we need to query thru the object
        // console.log(filterMapState);
        console.log(filterMapState)
        Object.keys(mapState).forEach(key => {
            if (mapState[key].filterType != "") {
                tempArray.push([key, mapState[key].filterType, mapState[key].filterValue, mapState[key].filterData]);
            }
        })
        setFilterState(tempArray);
        setCurrentPage(1);
        console.log('this is getting called')
        console.log(tempArray)
        const data = {
            "user_id": 1234,
            "rows": dataRows,
            "filters": tempArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": searchQuery
        };
        const response = await APIService.getBankStatement(data);
        const result = await response.json();
        setExistingStatement(result.data);
        setTotalItems(result.total_count);
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

    const handleExcelDownload = async () => {
        const data = {
            "user_id": 1234,
            "rows": ["modeofpayment", "date", "crdr", "amount", "particulars", "clientid", "id"],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 0,
            "pg_size": 0,
            "search_key": searchQuery
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
    const [currentMode, setCurrentMode] = useState("")
    const openCreditRecipt = (item) => {
        console.log(item)
        const modeOfThisItem = item.modeofpayment;
        mode.map(ele => {
            if (modeOfThisItem == ele[0]) {
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
    const [showEditSuccess, setShowEditSuccess] = useState(false);
    const openEditSuccess = () => {
        setIsEditDialogue(false);
        setShowEditSuccess(true);
        setTimeout(function () {
            setShowEditSuccess(false);
        }, 2000)
        fetchBankStatement();
    }



    const [crFormErrors,setCrFormErrors] = useState({})
    const crValidate = () => {
        var res = true;
        
        if (!formValues.employee) {
            setFormErrors((existing) => {
                return { ...existing, employee: "Select Received By" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, employee: "" }
            })
        }





        // if (!formValues.receivedDate) {
        //     setFormErrors((existing) => {
        //         return { ...existing, receivedDate: "Select Received Date" }
        //     })
        //     res = false;
        // } else {
        //     setFormErrors((existing) => {
        //         return { ...existing, receivedDate: "" }
        //     })
        // }
        // if (!formValues.howReceived) {
        //     setFormErrors((existing) => {
        //         return { ...existing, howreceived: "Select How Received" }
        //     })
        //     res = false;
        // } else {
        //     setFormErrors((existing) => {
        //         return { ...existing, howreceived: "" }
        //     })
        // }

        // if (!formValues.client) {
        //     setFormErrors((existing) => {
        //         return { ...existing, client: "Select Client" }
        //     })
        //     res = false;
        // } else {
        //     setFormErrors((existing) => {
        //         return { ...existing, client: "" }
        //     })
        // }
        // if (!formValues.amountReceived) {
        //     setFormErrors((existing) => {
        //         return { ...existing, amountReceived: "Enter Amount Received" }
        //     })
        //     res = false;
        // } else {
        //     setFormErrors((existing) => {
        //         return { ...existing, amountReceived: "" }
        //     })
        // }

        return res;
    }
    const [selectedOption, setSelectedOption] = useState({
        label: "Select Client Name",
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
        //    const temp = {...existing.client_info}
        //    getClientPropertyByClientId(e.value)
        //    temp.tenantof = e.value
        //    existing.client_info = temp;
        setFormValues(existing)
        console.log(formValues)
        setSelectedOption(e)
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
                fetchBankStatement()
            } else {
                newHandleFilter(inputVariable,
                    setInputVariable,
                    type,
                    columnName)
            }



        }
    }
    const [modeFooter,setModeFooter] = useState([
         {
            modename : "Z-ADSK-BOM",
            modeamount : 0.00
         },
         {
            modename : "Z-ADSK-AXIS",
            modeamount : 0.00
         },
         {
            modename : "Z-PRIME-ADSK",
            modeamount : 0.00
         },
         {
            modename : "Z-PRIME-HDFC",
            modeamount : 0.00
         },
         {
            modename : "Z-DAP-BOM",
            modeamount : 0.00
         },
         {
            modename : "DAP-ICICI-42",
            modeamount : 0.00
         },
         {
            modename : "DAP-ICICI-53",
            modeamount : 0.00
         },
         {
            modename : "DAP-ICICI-65-S",
            modeamount : 0.00
         }
    ])
    return (
        <div className="h-screen font-medium">
            <Navbar />
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={pageLoading}
                onClick={() => {}}
            >

               <CircularProgress color="inherit"/>

            </Backdrop>
            <SucessfullModal isOpen={showSucess} message={successMessage} />
            <FailureModal isOpen={showFailure} message="Error! cannot create Bank Statement" />
            <Delete isOpen={showDelete} currentStatement={currentStatementId} closeDialog={setShowDelete} fetchData={fetchBankStatement} showCancel={openCancelModal} />
            {showEditSuccess && <SucessfullModal isOpen={showEditSuccess} message="successfully Updated Bank Statement" />}
            {showCancelModelAdd && <CancelModel isOpen={showCancelModelAdd} message="Process cancelled, no new Bank Statement created." />}
            {showCancelModel && <CancelModel isOpen={showCancelModel} message="Process cancelled, no changes saved." />}
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
                        <div className='flex bg-[#EBEBEB]'>
                            {/* search button */}
                            <input
                                className="h-[36px] bg-[#EBEBEB] text-[#787878] pl-2 outline-none"
                                type="text"
                                placeholder="   Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDownCapture={handleKeyDown}
                            />
                            <button onClick={handleCloseSearch}><img src={Cross} className=' w-[20px] h-[20px] mx-2' /></button>
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
                            <div className='w-[5%] px-3'>

                            </div>
                            <div className='w-[10%] px-4 py-2.5'>
                                <div className="w-[90%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-[70%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" value={modeFilterInput} onChange={(e) => setModeFilterInput(e.target.value)} 
                                    onKeyDown={(event) => handleEnterToFilter(event,modeFilterInput,
                                        setModeFilterInput,
                                        'contains',
                                        'mode')}
                                    />
                                    <button className='px-1 py-2 w-[30%]' onClick={() => setModeFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button>
                                </div>
                                {modeFilter && <CharacterFilter inputVariable={modeFilterInput} setInputVariable={setModeFilterInput} handleFilter={newHandleFilter} filterColumn='mode' menuRef={menuRef} />}
                            </div>
                            <div className='w-[10%] px-4 py-2.5'>
                                <div className='w-[90%] flex items-center bg-[#EBEBEB] rounded-[5px]'>
                                    <input className="w-[70%] rounded-[5px] bg-[#EBEBEB] text-[11px] pl-2 outline-none" value={dateFilterInput} onChange={(e) => setDateFilterInput(e.target.value)}
                                    onKeyDown={(event) => handleEnterToFilter(event,dateFilterInput,
                                        setDateFilterInput,
                                        'equalTo',
                                        'date')}
                                     />
                                    <button className='px-1 py-2 w-[30%]' onClick={() => setDateFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button>
                                </div>
                                {dateFilter && <DateFilter inputVariable={dateFilterInput} setInputVariable={setDateFilterInput} handleFilter={newHandleFilter} columnName='date' menuRef={menuRef} />}
                            </div>
                            <div className='w-[10%] px-4 py-2.5'>
                                <div className='w-[90%] flex items-center bg-[#EBEBEB] rounded-[5px]'>
                                    <input className="w-[70%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" value={typeFilterInput} onChange={(e) => setTypeFilterInput(e.target.value)} 
                                    onKeyDown={(event) => handleEnterToFilter(event,typeFilterInput,
                                        setTypeFilterInput,
                                        'contains',
                                        'crdr')}
                                    />
                                    <button className='px-1 py-2 w-[30%]' onClick={() => setTypeFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button>
                                </div>
                                {typeFilter && <CharacterFilter inputVariable={typeFilterInput} setInputVariable={setTypeFilterInput} handleFilter={newHandleFilter} filterColumn='crdr' menuRef={menuRef} />}
                            </div>
                            <div className='w-[10%] px-4 py-2.5'>
                                <div className='w-[90%] flex items-center bg-[#EBEBEB] rounded-[5px]'>
                                    <input className="w-[70%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" value={amountFilterInput} onChange={(e) => setAmountFilterInput(e.target.value)}
                                    onKeyDown={(event) => handleEnterToFilter(event,amountFilterInput,
                                        setAmountFilterInput,
                                        'equalTo',
                                        'amount')}
                                     />
                                    <button className='px-1 py-2 w-[30%]' onClick={() => setAmountFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button>
                                </div>
                                {amountFilter && <NumericFilter inputVariable={amountFilterInput} setInputVariable={setAmountFilterInput} handleFilter={newHandleFilter} columnName='amount' menuRef={menuRef} />}
                            </div>
                            <div className='w-[30%] px-4 py-2.5'>
                                <div className='w-[29%] flex items-center bg-[#EBEBEB] rounded-[5px]'>
                                    <input className="w-[70%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" value={particularsFilterInput} onChange={(e) => setParticularsFilterInput(e.target.value)}
                                    onKeyDown={(event) => handleEnterToFilter(event,particularsFilterInput,
                                        setParticularsFilterInput,
                                        'contains',
                                        'particulars')}
                                     />
                                    <button className='px-1 py-2 w-[30%]' onClick={() => setParticularsFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button>
                                </div>
                                {particularsFilter && <CharacterFilter inputVariable={particularsFilterInput} setInputVariable={setParticularsFilterInput} handleFilter={newHandleFilter} filterColumn='particulars' menuRef={menuRef} />}
                            </div>
                            <div className='w-[20%] px-4 py-2.5'>
                                <div className='w-[44%] flex items-center bg-[#EBEBEB] rounded-[5px]'>
                                    <input className="w-[70%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" value={clientFilterInput} onChange={(e) => setClientFilterInput(e.target.value)} 
                                    onKeyDown={(event) => handleEnterToFilter(event,clientFilterInput,
                                        setClientFilterInput,
                                        'contains',
                                        'clientname')}
                                    />
                                    <button className='px-1 py-2 w-[30%]' onClick={() => setClientFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button>
                                </div>
                                {clientFilter && <CharacterFilter inputVariable={clientFilterInput} setInputVariable={setClientFilterInput} handleFilter={newHandleFilter} filterColumn='clientname' menuRef={menuRef} />}
                            </div>
                            <div className='w-[12%] px-4 py-2.5'>
                                {/* <div className='w-[90%] flex items-center bg-[#EBEBEB] rounded-[5px]'>
                                    <input className="w-[70%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" value={crFilterInput} onChange={(e) => setCRFilterInput(e.target.value)} />
                                    <button className='px-1 py-2 w-[30%]' onClick={() => setCRFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button>
                                </div> */}

                            </div>

                        </div>
                        <div className='w-[15%] flex'>
                            <div className='w-1/2  px-4 py-2.5'>
                                <div className=' flex items-center bg-[#EBEBEB] rounded-[5px]'>
                                    <input className="w-[67%] bg-[#EBEBEB] rounded-[5px] pl-2 outline-none text-[11px]" value={idFilterInput} onChange={(e) => { setIdFilterInput(e.target.value) }} 
                                    onKeyDown={(event) => handleEnterToFilter(event,idFilterInput,
                                        setIdFilterInput,
                                        'equalTo',
                                        'id')}
                                    />
                                    <button className='px-1 py-2 w-[33%]' onClick={() => { setIdFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                                </div>
                                {idFilter && <NumericFilter inputVariable={idFilterInput} setInputVariable={setIdFilterInput} handleFilter={newHandleFilter} columnName='id' menuRef={menuRef} />}
                            </div>
                            <div className='w-1/2 p-4'>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full h-[calc(100vh_-_14rem)] text-[12px] font-medium">

                    <div className='w-full h-12 bg-[#F0F6FF] flex justify-between'>
                        <div className='w-[85%] flex'>
                            <div className='w-[5%] p-4'>
                                <p>Sr. </p>
                            </div>
                            <div className='w-[10%]  p-4'>
                                <p>Mode <button onClick={() => handleSort("modeofpayment")}><span className="font-extrabold">↑↓</span></button></p>
                            </div>
                            <div className='w-[10%]  p-4'>
                                <p>Date <button onClick={() => handleSort("date")}><span className="font-extrabold">↑↓</span></button></p>
                            </div>
                            <div className='w-[10%]  p-4'>
                                <p>Type <button onClick={() => handleSort("crdr")}><span className="font-extrabold">↑↓</span></button></p>
                            </div>
                            <div className='w-[10%]  p-4'>
                                <p>Amount <button onClick={() => handleSort("amount")}><span className="font-extrabold">↑↓</span></button></p>
                            </div>
                            <div className='w-[30%]  p-4'>
                                <p>Particulars <button onClick={() => handleSort("particulars")}><span className="font-extrabold">↑↓</span></button></p>
                            </div>
                            <div className='w-[20%] p-4 '>
                                <p>Client Name <button onClick={() => handleSort("clientid")}><span className="font-extrabold">↑↓</span></button></p>
                            </div>

                            <div className='w-[12%] p-4 '>
                                <p>Client Receipt</p>
                            </div>
                        </div>
                        <div className='w-[15%] flex'>
                            <div className='w-1/2  p-4'>
                                <p>ID <button onClick={() => handleSort("id")}><span className="font-extrabold">↑↓</span></button></p>
                            </div>
                            <div className='w-1/2 0 p-4'>
                                <p>Edit</p>
                            </div>
                        </div>
                    </div>



                    <div className='w-full h-[calc(100vh_-_20rem)] overflow-auto'>
                        
                        {!pageLoading && existingStatement && existingStatement.length == 0 && <div className='h-10 border-gray-400 border-b-[1px] flex items-center'>
                                        <h1 className='ml-10'>No Records To Show</h1>
                            </div>}
                        {!pageLoading && existingStatement && existingStatement.map((item, index) => {
                            return <div className='w-full   flex justify-between border-gray-400 border-b-[1px] font-medium'>
                                <div className='w-[85%] text-[11px] min-h-0  flex'>
                                    <div className='w-[5%] px-3 py-4 overflow-x-auto'>
                                        <p>{index + 1 + (currentPage - 1) * currentPages} </p>
                                    </div>
                                    <div className='w-[10%]  p-4 ml-1'>
                                        <p>{item.mode}</p>
                                        {/* {mode && mode.map(ele => (
                                            (item.modeofpayment === ele[0]) ?
                                                <p>{ele[1]}</p> : ""))} */}
                                    </div>
                                    <div className='w-[10%]  p-4'>
                                        {/* <p>{item.date}</p> */}
                                        {formatDate(item.date)}
                                        {/* {item.date} */}
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
                                    <div className='w-[20%] break-all px-5 py-4  '>
                                       <p> {item.clientname}</p>
                                        {/* <p>{item.clientid}</p> */}
                                        {/* {client && client.map(ele => (
                                            (item.clientid === ele[0]) ?
                                                <p>{ele[1]}</p> : ""))} */}
                                    </div>

                                    <div className='w-[12%] px-6  py-4 text-blue-600 cursor-pointer font-medium '>
                                        {(!(item.clientid) && item.crdr === "CR") && <p onClick={() => openCreditRecipt(item)}>Enter CR</p>}

                                        {/* <p onClick={openCreditRecipt}>{item.crdr}</p> */}
                                    </div>
                                </div>
                                <div className='w-[15%] flex'>
                                    <div className='w-1/2  p-4 ml-1'>
                                        <p>{item.id}</p>
                                    </div>
                                    <div className='w-1/2 p-4 flex justify-between items-center'>
                                        <img className='w-5 h-5 cursor-pointer' src={Edit} alt="edit" onClick={() => editStatement(item, vendorList, howReceived, mode)} />
                                        <img className='w-5 h-5 cursor-pointer' src={Trash} alt="trash" onClick={() => deleteStatement(item.id)} />
                                    </div>
                                </div>
                            </div>
                        })}
                        {/* we get all the existing builders here */}
                        {isEditDialogue && <EditManageStatement openDialog={isEditDialogue} setOpenDialog={setIsEditDialogue} bankStatement={currentStatement} fetchData={fetchBankStatement} showSuccess={openEditSuccess} showCancel={openCancelModal} />}
                        {showDelete && <Delete openDialog={isDeleteDialogue} setOpenDialog={setIsDeleteDialogue} currentStatement={currentStatement} fetch={fetchBankStatement} showCancel={openCancelModal} />}
                    </div>
                        <div className="h-[3rem] w-full bg-[#F0F6FF] flex">
                            <div className='w-[85%] flex'>
                                <div className='w-[5%] p-4 border-[1px] border-gray-300'>
                                    
                                </div>
                                <div className='w-[10%]  p-4 '>
                                    
                                </div>
                                <div className='w-[10%]  p-4 border-[1px] border-gray-300'>
                                    
                                </div>
                                <div className='w-[10%]  p-4 '>
                                    
                                </div>
                                <div className='w-[10%]  p-1 border-[1px] border-gray-300 flex items-center justify-center'>
                                    Total : {amountData}
                                </div>
                                <div className='w-[30%]  p-4 '>
                                    
                                </div>
                                <div className='w-[20%] p-4 border-[1px] border-gray-300 '>
                                   
                                </div>

                                <div className='w-[12%] p-4  '>
                                    
                                </div>
                            </div>
                            <div className='w-[15%] flex'>
                                <div className='w-1/2  p-4 border-[1px] border-gray-300'>
                                    
                                </div>
                                <div className='w-1/2 0 p-4 '>
                                    
                                </div>
                            </div>
                        </div>
                </div>
            </div>
            

            <div className='w-full h-12 flex justify-between px-6 font-medium'>
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
                        <button onClick={() => setDownloadModal(false)}><img src={Cross} className='absolute top-1 right-1 w-4 h-4' /></button>

                        <button onClick={() => handleDownload('pdf')}>
                            <div className='flex space-x-2 justify-center items-center ml-3 mt-3'>

                                <p>Download as pdf</p>
                                <img src={Pdf} />
                            </div>
                        </button>
                        <button onClick={() => handleDownload('excel')}>
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
            <div className="px-6">
               <div className="bg-[#F5F5F5] w-full h-[120px] flex justify-around mt-6">
                   {/* <div className="h-[3rem] w-full bg-green-400 flex justify-between"> */}
                            {
                                modeFooter.map((item) => {
                                    return <div className="flex flex-col items-center justify-center">
                                               <h1 className="font-semibold">{item.modename}</h1>
                                               <p className="self-start text-xs text-gray-500">{item.modeamount.toFixed(2)}</p>
                                          </div>
                                })
                            }
                        {/* </div> */}
               </div>
            </div>
             

            <Modal open={isManageStatementDialogue}
                fullWidth={true}
                maxWidth={'md'} 
                className="flex justify-center items-center"
                >
                <>
                    {/* <Draggable> */}
                        <div className='flex justify-center items-center '>
                            <div className="w-[1050px] h-auto bg-white rounded-lg">
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
                                        <div className="flex gap-[48px] justify-center ">
                                            <div className=" space-y-[12px] py-[20px] px-[10px]">
                                                <div className="">
                                                    <div className="text-[13px]">Mode<label className="text-red-500">*</label></div>
                                                    <select className="text-[11px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm " name="modeofpayment" value={formValues.modeofpayment} onChange={handleChange} >
                                                        <option value="none" hidden >Select Mode</option>
                                                        {mode && mode.map(item => (
                                                            <option key={item[0]} value={item[0]}>
                                                                {item[1]}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <div className="text-[10px] text-[#CD0000] ">{formErrors.modeofpayment}</div>
                                                </div>
                                                <div className="">
                                                    <div className="text-[13px]">Particulars<label className="text-red-500">*</label></div>
                                                    {/* <input className="w-[230px] h-[40px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="particulars" value={formValues.particulars} onChange={handleChange} /> */}
                                                    <input className=" text-[11px] pl-4 break-all w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm text-xs " name="particulars" value={formValues.particulars} onChange={handleChange}  />
                                                    <div className="text-[10px] text-[#CD0000] ">{formErrors.particulars}</div>
                                                </div>
                                                <div className="">
                                                    <div className="text-[13px]">Amount<label className="text-red-500">*</label></div>
                                                    <input className="text-[11px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="amount" value={formValues.amount} onChange={handleChange}  />
                                                    <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div>
                                                </div>
                                                <div className="">
                                                    <div className="text-[13px]">Vendor</div>
                                                    <select className="text-[11px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" name="vendor" value={formValues.vendor} onChange={handleChange} >
                                                        <option >Select Vendor List</option>
                                                        {vendorList && vendorList.map(item => (
                                                            <option value={item}>
                                                                {item[1]}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    
                                                </div>
                                            </div>
                                            <div className="space-y-[12px] py-[20px] px-[10px]">
                                                <div className="">
                                                    <div className="text-[13px]">Date <label className="text-red-500">*</label></div>
                                                    <input className="text-[11px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="date" name="date" value={formValues.date} onChange={handleChange}  />
                                                    <div className="text-[10px] text-[#CD0000] ">{formErrors.date}</div>
                                                </div>
                                                <div className="">
                                                    <div className="text-[13px]">CR/DR <label className="text-red-500">*</label></div>
                                                    <select className="text-[11px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="crdr" value={formValues.crdr} onChange={handleChange} >
                                                        <option >Select CR/DR</option>
                                                        {crdr && crdr.map(item => (
                                                            <option value={item}>
                                                                {item}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <div className="text-[10px] text-[#CD0000] ">{formErrors.crdr}</div>
                                                </div>
                                                <div className="">
                                                    <div className="text-[13px]">How Recieved(CR)?</div>
                                                    <select className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="how" value={formValues.how} onChange={handleChange} >
                                                        <option >Select how Received</option>
                                                        {howReceived && howReceived.map(item => (
                                                            <option value={item}>
                                                                {item[1]}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="my-10 flex justify-center items-center gap-[10px]">

                                        <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' type="submit">Add</button>
                                        <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleClose}>Cancel</button>
                                        {isLoading && <CircularProgress />}
                                    </div>
                                </form>
                            </div>
                        </div>
                    {/* </Draggable> */}
                </>
            </Modal>



            <Modal open={showCreditReceipt}
                fullWidth={true}
                maxwidth={'md'} bankStatement={currentStatement}>
                {/* <h1>{currentStatement}</h1> */}
                <>
                    {/* <Draggable> */}
                        <div className='flex justify-center items-center mt-[100px]'>
                            <div className="w-[1050px] h-[500px] bg-white rounded-lg">
                                <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center">
                                    <div className="mr-[410px] ml-[410px]">
                                        <div className="text-[16px]">Enter CR</div>
                                    </div>
                                    <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                                        <img onClick={handleCloseCR} className="w-[20px] h-[20px] cursor-pointer" src={Cross} alt="cross" />
                                    </div>
                                </div>
                                {/* <form onSubmit={handleCR} > */}
                                    <div className="w-full mt-[5px] ">
                                        <div className="flex gap-[48px] justify-center items-center">
                                            <div className=" space-y-[5px] py-[5px] px-[5px]">
                                                <div className="">
                                                    <div className="text-[14px]">Cura Office<label className="text-red-500">*</label></div>
                                                    <input className=" text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="Pune" value="Pune" disabled />
                                                </div>
                                                <div className="">
                                                    <div className="text-[14px]">Recieved By<label className="text-red-500">*</label></div>
                                                    {/* <select className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="employee" value={formValues.employee} onChange={handleChange} required >
                                                        <option >Select Employee</option>
                                                        {existingUsers && existingUsers.map(item => (
                                                            <option key={item} value={item.id}>
                                                                {item.employeename}
                                                            </option>
                                                        ))}
                                                    </select> */}
                                                    
                                                    <DropDown options={existingUsers} initialValue="Select Received By" leftLabel="Name" rightLabel="Username" leftAttr="name" rightAttr="username" toSelect="name" handleChange={() => {}} formValueName="employee" value={formValues.employee} idName="id"/>
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
                                                    <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="date" value={formValues.date} onChange={handleChange} disabled />

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
                                                    <input className=" text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="amount" value={formValues.amount} onChange={handleChange} required />
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
                                                                minHeight: 23,
                                                                lineHeight: '0.8',
                                                                height: 4,
                                                                width: 230,
                                                                fontSize: 10,
                                                                // padding: '1px'
                                                            }),
                                                            // indicatorSeparator: (provided, state) => ({
                                                            //   ...provided,
                                                            //   lineHeight : '0.5',
                                                            //   height : 2,
                                                            //   fontSize : 12 // hide the indicator separator
                                                            // }),
                                                            dropdownIndicator: (provided, state) => ({
                                                                ...provided,
                                                                padding: '1px', // adjust padding for the dropdown indicator
                                                            }),
                                                            options: (provided, state) => ({
                                                                ...provided,
                                                                fontSize: 10// adjust padding for the dropdown indicator
                                                            }),
                                                            menu: (provided, state) => ({
                                                                ...provided,
                                                                width: 230, // Adjust the width of the dropdown menu
                                                            }),
                                                        }}
                                                    />
                                                    {/* <select className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="client" value={formValues.client} onChange={handleChange} required >
                                                <option >Select Client</option>
                                                {client && client.map(item => (
                                                    <option key={item[0]} value={item[0]}>
                                                        {item[1]}
                                                    </option>
                                                ))}
                                            </select> */}
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
                                                    <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="reimbAmount" value={formValues.reimbAmount} onChange={handleChange} />
                                                    <div className="text-[12px] text-[#CD0000] ">{formErrors.reimbAmount}</div>
                                                </div>
                                                <div className="">
                                                    <div className="text-[14px]">TDS </div>
                                                    <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="TDS" value={formValues.TDS} onChange={handleChange} />
                                                    <div className="text-[12px] text-[#CD0000] ">{formErrors.TDS}</div>
                                                </div>




                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-[10px] flex justify-center items-center gap-[10px]">

                                        <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' type="submit" onClick={addCreditRecipt}>Save</button>
                                        <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleCloseCR}>Cancel</button>
                                        {isLoading && <CircularProgress />}
                                    </div>
                                {/* </form> */}
                            </div>
                        </div>
                    {/* </Draggable> */}
                </>
            </Modal>




            <Modal open={isConfirmManageStatementDialogue} >
                <>
                    {/* <Draggable> */}
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
                                <button className='w-[132px] h-[48px] bg-[#004DD7] text-white rounded-md' onClick={handleCR}>Save</button>
                                <button className='w-[132px] h-[48px] border-[1px] border-[#282828] rounded-md' onClick={handleCloseForConfirm}>Cancel</button>
                            </div>
                        </div>
                    {/* </Draggable> */}
                </>
            </Modal>









        </div>
    )
}

export default ManageBankStatement
