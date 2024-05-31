import React from 'react';
import { Outlet, Link , useNavigate, useLocation} from "react-router-dom";
import backLink from "../../../assets/back.png";
import searchIcon from "../../../assets/searchIcon.png";
import nextIcon from "../../../assets/next.png";
import refreshIcon from "../../../assets/refresh.png";
import downloadIcon from "../../../assets/download.png";
import { useState, useEffect, useRef } from 'react';
import Navbar from "../../../Components/Navabar/Navbar";
import Cross from "../../../assets/cross.png";
import { Modal, Pagination, LinearProgress , Backdrop, CircularProgress} from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import { APIService } from '../../../services/API';
import Pdf from "../../../assets/pdf.png";
import Excel from "../../../assets/excel.png"
import Edit from "../../../assets/edit.png"
import Trash from "../../../assets/trash.png"
import Filter from "../../../assets/filter.png"
import Add from "../../../assets/add.png";
import EditClientInvoice from './EditClientInvoice';
import SucessfullModal from '../../../Components/modals/SucessfullModal';
import CancelModel from './../../../Components/modals/CancelModel';
import SaveConfirmationClientInvoice from './SaveConfirmationClientInvoice';
import FailureModal from '../../../Components/modals/FailureModal';
import DeleteClientInvoiceModal from './DeleteClientInvoiceModal';
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
import CharacterFilter from "../../../Components/Filters/CharacterFilter"
import DateFilter from '../../../Components/Filters/DateFilter';
import NumericFilter from '../../../Components/Filters/NumericFilter';
import AsyncSelect from "react-select/async"
import Draggable from 'react-draggable';
import ActiveFilter from "../../../assets/active_filter.png"
// import DropDown from '../../../Components/Dropdown/Dropdown';
import OrderDropDown from '../../../Components/Dropdown/OrderDropdown';
import { formatDate } from '../../../utils/formatDate';
const ManageClientInvoice = () => {

    const menuRef = useRef();
    const navigate = useNavigate(-1)
    const {state} = useLocation()
    // we have the module here
    const [pageLoading, setPageLoading] = useState(false);
    const [existingClientInvoice, setExistingClientInvoice] = useState([]);
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
    const [openAddConfirmation, setOpenAddConfirmation] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isFailureModal, setIsFailureModal] = useState(false)
    const [deleteConfirmation, showDeleteConfirmation] = useState(false);

    const [clientNameFilter, setClientNameFilter] = useState(false)
    const [clientNameFilterInput, setClientNameFilterInput] = useState("");
    const [orderDescriptionFilter, setOrderDescriptionFilter] = useState(false)
    const [orderDescriptionFilterInput, setOrderDescriptionFilterInput] = useState("");
    const [estimateAmountFilter, setEstimateAmountFilter] = useState(false)
    const [estimateAmountFilterInput, setEstimateAmountFilterInput] = useState("");
    const [estimateDateFilter, setEstimateDateFilter] = useState(false)
    const [estimateDateFilterInput, setEstimateDateFilterInput] = useState("");
    const [invoiceAmountFilter, setInvoiceAmountFilter] = useState(false)
    const [invoiceAmountFilterInput, setInvoiceAmountFilterInput] = useState("");
    const [invoiceDateFilter, setInvoiceDateFilter] = useState(false)
    const [invoiceDateFilterInput, setInvoiceDateFilterInput] = useState("");
    const [entityFilter, setEntityFilter] = useState(false)
    const [entityFilterInput, setEntityFilterInput] = useState("");
    const [createdByFilter, setCreatedByFilter] = useState(false)
    const [createdByFilterInput, setCreatedByFilterInput] = useState("");
    const [idFilter, setIdFilter] = useState(false)
    const [idFilterInput, setIdFilterInput] = useState("");
    // const [filterArray,setFilterArray] = useState([]);


    const [selectedOption, setSelectedOption] = useState({
        label: "Select Client",
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
        setOrderText((prev) => "Select Order")
        const existing = { ...formValues }
        existing.client = e.value
        existing.order = null
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
        // const tempArray = [];
        // // we need to query thru the object
        // console.log(filterMapState);
        // Object.keys(filterMapState).forEach(key => {
        //     if (filterMapState[key].filterType != "") {
        //         tempArray.push([key, filterMapState[key].filterType, filterMapState[key].filterValue, filterMapState[key].filterData]);
        //     }
        // })
        const tempArray = [];
        // we need to query thru the object
        console.log(filterMapState);
        Object.keys(filterMapState).forEach(key => {
            if (filterMapState[key].filterType != "") {
                tempArray.push([key, filterMapState[key].filterType, filterMapState[key].filterValue, filterMapState[key].filterData]);
            }
        })
        setFilterState((prev) => tempArray)
        setPageLoading(true);
        const data = {
            "user_id": 1234,
            "rows": [
                "id",
                "clientid",
                "clientname",
                "orderid",
                "ordername",
                "estimatedate",
                "estimateamount",
                "invoicedate",
                "invoiceamount",
                "quotedescription",
                "createdon",
                "baseamount",
                "tax",
                "entityid",
                "entityname",
                "createdbyname"
            ],
            "filters": tempArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": Number(currentPage),
            "pg_size": Number(currentPages),
        };
        const response = await APIService.getClientInvoice(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingClientInvoice(result);
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
        setCurrentPage((prev) => pageNumber)
        const data = {
            "user_id": 1234,
            "rows": [
                "id",
                "clientid",
                "clientname",
                "orderid",
                "ordername",
                "estimatedate",
                "estimateamount",
                "invoicedate",
                "invoiceamount",
                "quotedescription",
                "createdon",
                "baseamount",
                "tax",
                "entityid",
                "entityname",
                "createdbyname"
            ],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": Number(pageNumber),
            "pg_size": Number(currentPages),
            "search_key": searchInput
        };
        const response = await APIService.getClientInvoice(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingClientInvoice(result);
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
        setCurrentPage((prev) => 1)
        console.log(searchInput);
        const data = {
            "user_id": 1234,
            "rows": [
                "id",
                "clientid",
                "clientname",
                "orderid",
                "ordername",
                "estimatedate",
                "estimateamount",
                "invoicedate",
                "invoiceamount",
                "quotedescription",
                "createdon",
                "baseamount",
                "tax",
                "entityid",
                "entityname",
                "createdbyname"
            ],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(quantity),
            "search_key": isSearchOn ? searchInput : ""
        };
        const response = await APIService.getClientInvoice(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingClientInvoice(result);
        setPageLoading(false);
    }
    const setHyperLinkData = () => {
        if(state != null) {
            const v = {...selectedOption}
            v.label = state.clientname
            v.value = state.clientid 
            setSelectedOption(v)
            const temp = {...formValues}
            temp.client = state.clientid 
            temp.order = state.orderid 
            setFormValues(temp)

        }
    }
    useEffect(() => {
        setHyperLinkData()
        fetchData();

        const handler = (e) => {
            if (menuRef.current == null || !menuRef.current.contains(e.target)) {
                setClientNameFilter(false)
                setOrderDescriptionFilter(false)
                setEstimateAmountFilter(false)
                setEstimateDateFilter(false)
                setInvoiceDateFilter(false)
                setInvoiceAmountFilter(false)
                setEntityFilter(false)
                setCreatedByFilter(false)
                setIdFilter(false)
                setDownloadModal(false)
            }
        }

        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);
    const [invoiceId, setInvoiceId] = useState(0);
    const handleEdit = (id) => {
        setInvoiceId(id)
        console.log(id);
        console.log(invoiceId)
        setIsEditDialogue(true)
    }
    const handleOpenEdit = (oldItem) => {
        console.log('called');
        setIsEditDialogue(true);
        setCurrItem(oldItem)
    };

    const handleOpen = () => {
        setIsClientInvoiceDialogue(true);
    };

    const handleClose = () => {
        setFormValues(initialValues)
        setFormErrors({})
        setSelectedOption(
            {
                label: "Select Client",
                value: null
            }
        )
        setOrders([]);
        setOrderText("Select Order");

        setIsClientInvoiceDialogue(false);
        openAddCancelModal();
    }
    const initials = () => {
        setFormValues(initialValues);
        setFormErrors({});
    }
    const handleAddClientInvoice = () => {
        console.log(formValues)
        if (!validate()) {
            console.log('hu')
            return;
        }
        setIsClientInvoiceDialogue(false);
        setOpenAddConfirmation(true)

    }
    const addClientInvoice = async () => {
        // console.log('clicked')
        console.log(formValues)
        if (!validate()) {
            console.log('hu')
            return;
        }
        // setPageLoading(true);
        const data = {

            "user_id": 1234,
            "clientid": Number(formValues.client),
            "orderid": Number(formValues.order),
            "estimatedate": formValues.estimateDate,
            "estimateamount": Number(formValues.estimateAmount),
            "invoicedate": formValues.invoiceDate,
            "invoiceamount": Number(formValues.invoiceAmount),
            "quotedescription": formValues.invoiceDescription,
            "createdon": "2024-10-09",
            "baseamount": Number(formValues.baseAmount),
            "tax": Number(formValues.gst),
            "entity": 1

        }
        const response = await APIService.addClientInvoice(data);

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
        client: state?.clientid,
        estimateAmount: "",
        baseAmount: "",
        invoiceAmount: "",
        invoiceDescription: "",
        order: state?.orderid,
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
                return { ...existing, client: "Enter Client Name" }
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
    const [currClientInvoiceId, setCurrClientInvoiceId] = useState("");
    const handleDelete = (id) => {
        setCurrClientInvoiceId(id);
        showDeleteConfirmation(true);
    }
    const deleteClientInvoice = async (id) => {
        const data = {
            "user_id": 1234,
            "id": id
        }
        const response = await APIService.deleteClientInvoice(data);
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
    const handleDownload = async (type) => {
        // setBackDropLoading(true)
        setDownloadModal(false)
        setPageLoading(true);
        const data = {
            "user_id": 1234,
            "rows": [
                "clientname",
                "quotedescription",
                "invoiceamount",
                "invoicedate",
                "entityname",
                "createdbyname",
                "id",
            ],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 0,
            "pg_size": 0,
            "downloadType" : type,
            "search_key": searchInput,
            "colmap" : {
                "clientname" : "Client Name",
                "quotedescription" : "Quote/Invoice Description",
                "invoiceamount" : "Invoice Amount",
                "invoicedate" : "Invoice Date",
                "entityname" : "Entity",
                "createdbyname" : "Created By",
                "id" : "ID",
            }
        };
        const response = await APIService.getClientInvoice(data)
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
                    FileSaver.saveAs(result, 'ClientInvoiceData.xlsx');
                }else if(type == "pdf") {
                    FileSaver.saveAs(result, 'ClientInvoiceData.pdf');
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
    const handleExcelDownload = async () => {
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
            "rows": [
                "clientname",
                "quotedescription",
                "estimateamount",
                "estimatedate",
                "invoiceamount",
                "invoicedate",
                "entityname",
                "createdbyname",
                "id",

            ],
            "filters": tempArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 0,
            "pg_size": 0,
            "search_key": searchInput
        };
        const response = await APIService.getClientInvoice(data);
        const temp = await response.json();
        const result = temp.data;
        const worksheet = XLSX.utils.json_to_sheet(result);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "ClientInvoicecData.xlsx");
        FileSaver.saveAs(workbook, "demo.xlsx");
    }
    const handleSearch = async () => {
        // console.log("clicked")
        setPageLoading(true);
        setIsSearchOn(true);
        setCurrentPage((prev) => 1);
        const data = {
            "user_id": 1234,
            "rows": [
                "id",
                "clientid",
                "clientname",
                "orderid",
                "ordername",
                "estimatedate",
                "estimateamount",
                "invoicedate",
                "invoiceamount",
                "quotedescription",
                "createdon",
                "baseamount",
                "tax",
                "entityid",
                "entityname",
                "createdbyname"
            ],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": searchInput
        };
        const response = await APIService.getClientInvoice(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingClientInvoice(result);
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
                "id",
                "clientid",
                "clientname",
                "orderid",
                "ordername",
                "estimatedate",
                "estimateamount",
                "invoicedate",
                "invoiceamount",
                "quotedescription",
                "createdon",
                "baseamount",
                "tax",
                "entityid",
                "entityname",
                "createdbyname"
            ],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": ""
        };
        const response = await APIService.getClientInvoice(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingClientInvoice(result);
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
    const [showCancelModelAdd, setShowCancelModelAdd] = useState(false);
    const [showCancelModel, setShowCancelModel] = useState(false);
    const openAddCancelModal = () => {
        // set the state for true for some time
        setIsClientInvoiceDialogue(false);
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
        clientname: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        quotedescription: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        estimateamount: {
            filterType: "",
            filterValue: "",
            filterData: "Numeric",
            filterInput: ""
        },
        estimatedate: {
            filterType: "",
            filterValue: null,
            filterData: "Date",
            filterInput: ""
        },
        invoiceamount: {
            filterType: "",
            filterValue: "",
            filterData: "Numeric",
            filterInput: ""
        },
        invoicedate: {
            filterType: "",
            filterValue: null,
            filterData: "Date",
            filterInput: ""
        },
        entityname: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        createdbyname: {
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
        },
        orderid : {
            filterType: state ? "equalTo" : "" ,
            filterValue: state?.orderid,
            filterData: "Numeric",
            filterInput: state?.orderid
        }
    }
    const [filterMapState, setFilterMapState] = useState(filterMapping);
    const [filterState, setFilterState] = useState([]);
    const fetchFiltered = async (mapState) => {
        setFilterMapState(mapState)
        setClientNameFilter(false)
        setOrderDescriptionFilter(false)
        setEstimateAmountFilter(false)
        setEstimateDateFilter(false)
        setInvoiceDateFilter(false)
        setInvoiceAmountFilter(false)
        setEntityFilter(false)
        setCreatedByFilter(false)
        setIdFilter(false)
        const tempArray = [];
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
                "id",
                "clientid",
                "clientname",
                "orderid",
                "ordername",
                "estimatedate",
                "estimateamount",
                "invoicedate",
                "invoiceamount",
                "quotedescription",
                "createdon",
                "baseamount",
                "tax",
                "entityid",
                "entityname",
                "createdbyname"
            ],
            "filters": tempArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": isSearchOn ? searchInput : ""
        };
        const response = await APIService.getClientInvoice(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingClientInvoice(result);
        setPageLoading(false);
    }
    const newHandleFilter = async (inputVariable, setInputVariable, type, columnName) => {
        console.log(columnName)
        console.log('hey')
        console.log(filterMapState);

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
        setFlag((prev) => !prev);
        const data = {
            "user_id": 1234,
            "rows": [
                "id",
                "clientid",
                "clientname",
                "orderid",
                "ordername",
                "estimatedate",
                "estimateamount",
                "invoicedate",
                "invoiceamount",
                "quotedescription",
                "createdon",
                "baseamount",
                "tax",
                "entityid",
                "entityname",
                "createdbyname"
            ],
            "filters": tempArray,
            "sort_by": [field],
            "order": !flag ? "asc" : "desc",
            "pg_no": Number(currentPage),
            "pg_size": Number(currentPages),
            "search_key": isSearchOn ? searchInput : ""
        };
        // setFlag((prev) => !prev);
        const response = await APIService.getClientInvoice(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingClientInvoice(result);
        setPageLoading(false);
    }
    function handleKeyDown(event) {
        if (event.keyCode === 13) {
          handleSearch()
        }
    }
    const handleEnterToFilter = (event,inputVariable,
        setInputVariable,
        type,
        columnName) => {
            if (event.keyCode === 13) {
                    // if its empty then we remove that 
                    // const temp = {...filterMapState};
                    // temp[columnName].type = "".
                    // setFilterMapState(temp)
                    console.log(inputVariable)
                    if(inputVariable == "") {
                        const temp = {...filterMapState}
                        temp[columnName].filterType = ""
                        setFilterMapState(temp)
                        // fetchCityData()
                        fetchData()
                    }else {
                        newHandleFilter(inputVariable,
                            setInputVariable,
                            type,
                            columnName)
                    }
              }
      }

    const [orderText, setOrderText] = useState("Select Order")
    return (
        <div className='h-screen font-medium'>
            <Navbar />
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={pageLoading}
                onClick={() => {}}
            >

               <CircularProgress color="inherit"/>

            </Backdrop>
            {isEditDialogue && <EditClientInvoice isOpen={isEditDialogue} handleClose={() => setIsEditDialogue(false)} invoiceId={invoiceId} showSuccess={openEditSuccess} showCancel={openCancelModal} />}
            {showAddSuccess && <SucessfullModal isOpen={showAddSuccess} message="New Client Invoice created successfully" />}
            {showDeleteSuccess && <SucessfullModal isOpen={showDeleteSuccess} message="Client Invoice Deleted Successfully" />}
            {showEditSuccess && <SucessfullModal isOpen={showEditSuccess} message="Changes saved successfully" />}
            {openAddConfirmation && <SaveConfirmationClientInvoice handleClose={() => setOpenAddConfirmation(false)} currClient={selectedOption.label} addClientInvoice={addClientInvoice} showCancel={openAddCancelModal} setDefault={initials} />}
            {isFailureModal && <FailureModal isOpen={isFailureModal} message={errorMessage} />}
            {deleteConfirmation && <DeleteClientInvoiceModal handleClose={() => showDeleteConfirmation(false)} handleDelete={deleteClientInvoice} item={currClientInvoiceId} showCancel={openCancelModal} />}
            {showCancelModelAdd && <CancelModel isOpen={showCancelModelAdd} message="Process cancelled, no new Client Invoice added." />}
            {showCancelModel && <CancelModel isOpen={showCancelModel} message="Process cancelled, no changes saved." />}
            <div className='h-[calc(100vh_-_7rem)] w-full  px-10'>
                <div className='h-16 w-full  flex justify-between items-center p-2  border-gray-300 border-b-2'>
                    <div className='flex items-center space-x-3'>
                        <div className='rounded-2xl  bg-[#EBEBEB] h-8 w-8 flex justify-center items-center '>
                            <button onClick={() => navigate(-1)}><img className='w-5 h-5' src={backLink} /></button>
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
                                onKeyDownCapture={handleKeyDown}
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
                        <div className="w-[90%] flex">
                            <div className='w-[4%] flex'>
                                <div className='p-3'>
                                    {/* <p>Sr.</p> */}
                                </div>
                            </div>
                            <div className='w-[21%]  p-3 '>
                                <div className="w-[60%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[75%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={clientNameFilterInput} onChange={(e) => setClientNameFilterInput(e.target.value)}
                                    onKeyDown={(event) => handleEnterToFilter(event,clientNameFilterInput,
                                        setClientNameFilterInput,
                                        'contains',
                                        'clientname')} />
                                       {filterMapState.clientname.filterType == "" ?  <button className='w-[25%] px-1 py-2' onClick={() => setClientNameFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> :  <button className='w-[25%] px-1 py-2' onClick={() => setClientNameFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>  }
                                </div>
                                {clientNameFilter && <CharacterFilter inputVariable={clientNameFilterInput} setInputVariable={setClientNameFilterInput} handleFilter={newHandleFilter} filterColumn='clientname' menuRef={menuRef} filterType={filterMapState.clientname.filterType}/>}
                            </div>

                            <div className='w-[26%]  p-3 '>
                                <div className="w-[50%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[75%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={orderDescriptionFilterInput} onChange={(e) => setOrderDescriptionFilterInput(e.target.value)}
                                    onKeyDown={(event) => handleEnterToFilter(event,orderDescriptionFilterInput,
                                        setOrderDescriptionFilterInput,
                                        'contains',
                                        'quotedescription')}
                                     />
                                     {filterMapState.quotedescription.filterType == "" ?  <button className='w-[25%] px-1 py-2' onClick={() => setOrderDescriptionFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> :  <button className='w-[25%] px-1 py-2' onClick={() => setOrderDescriptionFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>  }
                                    
                                </div>
                                {orderDescriptionFilter && <CharacterFilter inputVariable={orderDescriptionFilterInput} setInputVariable={setOrderDescriptionFilterInput} filterColumn='quotedescription' handleFilter={newHandleFilter} menuRef={menuRef} filterType={filterMapState.quotedescription.filterType} />}
                            </div>

                            {/* <div className='w-[13%]  p-3'>
                                <div className="w-[80%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[75%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={estimateAmountFilterInput} onChange={(e) => setEstimateAmountFilterInput(e.target.value)}
                                    onKeyDown={(event) => handleEnterToFilter(event,estimateAmountFilterInput,
                                        setEstimateAmountFilterInput,
                                        'equalTo',
                                        'estimateamount')}
                                     />
                                    <button className='w-[25%] px-1 py-2' onClick={() => { setEstimateAmountFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                                </div>
                                {estimateAmountFilter && <NumericFilter inputVariable={estimateAmountFilterInput} setInputVariable={setEstimateAmountFilterInput} columnName="estimateamount" menuRef={menuRef} handleFilter={newHandleFilter} />}
                            </div> */}

                            {/* <div className='w-[12%] p-3'>
                                <div className="w-[80%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[75%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={estimateDateFilterInput} onChange={(e) => setEstimateDateFilterInput(e.target.value)} type="date"
                                    onKeyDown={(event) => handleEnterToFilter(event,estimateDateFilterInput,
                                        setEstimateDateFilterInput,
                                        'equalTo',
                                        'estimatedate')}
                                     />
                                    <button className='w-[25%] px-1 py-2' onClick={() => { setEstimateDateFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                                </div>
                                {estimateDateFilter && <DateFilter inputVariable={estimateDateFilterInput} setInputVariable={setEstimateDateFilterInput} handleFilter={newHandleFilter} columnName='estimatedate' menuRef={menuRef} />}
                            </div> */}

                            <div className='w-[14%]  p-3'>
                                <div className="w-[80%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[75%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={invoiceAmountFilterInput} onChange={(e) => setInvoiceAmountFilterInput(e.target.value)} 
                                    onKeyDown={(event) => handleEnterToFilter(event,invoiceAmountFilterInput,
                                        setInvoiceAmountFilterInput,
                                        'equalTo',
                                        'invoiceamount')}
                                    />
                                    {filterMapState.invoiceamount.filterType == "" ?  <button className='w-[25%] px-1 py-2' onClick={() => setInvoiceAmountFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> :  <button className='w-[25%] px-1 py-2' onClick={() => setInvoiceAmountFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>  }
                                   
                                </div>
                                {invoiceAmountFilter && <NumericFilter inputVariable={invoiceAmountFilterInput} setInputVariable={setInvoiceAmountFilterInput} columnName='invoiceamount' handleFilter={newHandleFilter} menuRef={menuRef} filterType={filterMapState.invoiceamount.filterType} />}
                            </div>

                            <div className='w-[13%] p-3'>
                                <div className="w-[80%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[75%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={invoiceDateFilterInput} onChange={(e) => setInvoiceDateFilterInput(e.target.value)} type="date" 
                                    onKeyDown={(event) => handleEnterToFilter(event,invoiceDateFilterInput,
                                        setInvoiceDateFilterInput,
                                        'equalTo',
                                        'invoicedate')}
                                    />
                                    {filterMapState.invoicedate.filterType == "" ?  <button className='w-[25%] px-1 py-2' onClick={() => setInvoiceDateFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> :  <button className='w-[25%] px-1 py-2' onClick={() => setInvoiceDateFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>  }
                                    
                                </div>
                                {invoiceDateFilter && <DateFilter inputVariable={invoiceDateFilterInput} setInputVariable={setInvoiceDateFilterInput} handleFilter={newHandleFilter} columnName='invoicedate' menuRef={menuRef} filterType={filterMapState.invoicedate.filterType}/>}
                            </div>

                            <div className='w-[10%] p-3'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[75%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={entityFilterInput} onChange={(e) => setEntityFilterInput(e.target.value)} 
                                    onKeyDown={(event) => handleEnterToFilter(event,entityFilterInput,
                                        setEntityFilterInput,
                                        'contains',
                                        'entityname')}
                                    />
                                    {filterMapState.entityname.filterType == "" ?  <button className='w-[25%] px-1 py-2' onClick={() => setEntityFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> :  <button className='w-[25%] px-1 py-2' onClick={() => setEntityFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>  }
                                    
                                </div>
                                {entityFilter && <CharacterFilter inputVariable={entityFilterInput} setInputVariable={setEntityFilterInput} filterColumn='entityname' handleFilter={newHandleFilter} menuRef={menuRef} filterType={filterMapState.entityname.filterType}/>}
                            </div>

                            <div className='w-[12%]  p-3 '>
                                <div className="w-[85%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[75%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={createdByFilterInput} onChange={(e) => setCreatedByFilterInput(e.target.value)}
                                    onKeyDown={(event) => handleEnterToFilter(event,createdByFilterInput,
                                        setCreatedByFilterInput,
                                        'contains',
                                        'createdbyname')}
                                     />
                                     {filterMapState.createdbyname.filterType == "" ?  <button className='w-[25%] px-1 py-2' onClick={() => setCreatedByFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> :  <button className='w-[25%] px-1 py-2' onClick={() => setCreatedByFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>  }
                                    
                                </div>
                                {createdByFilter && <CharacterFilter inputVariable={createdByFilterInput} setInputVariable={setCreatedByFilterInput} filterColumn='createdbyname' handleFilter={newHandleFilter} menuRef={menuRef} filterType={filterMapState.createdbyname.filterType}/>}
                            </div>
                        </div>
                        <div className="w-[10%] flex">
                            <div className='w-[65%] p-3'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-[55%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" value={idFilterInput} onChange={(e) => setIdFilterInput(e.target.value)}
                                    onKeyDown={(event) => handleEnterToFilter(event,idFilterInput,
                                        setIdFilterInput,
                                        'equalTo',
                                        'id')}
                                     />
                                     {filterMapState.id.filterType == "" ?  <button className='w-[25%] px-1 py-2' onClick={() => setIdFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> :  <button className='w-[25%] px-1 py-2' onClick={() => setIdFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>  }
                                    
                                </div>
                                {idFilter && <NumericFilter columnName='id' inputVariable={idFilterInput} setInputVariable={setIdFilterInput} handleFilter={newHandleFilter} menuRef={menuRef} filterType={filterMapState.id.filterType}/>}
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
                        <div className="w-[90%] flex">
                            <div className='w-[4%] flex'>
                                <div className='px-3 py-3.5'>
                                    <p>Sr.</p>
                                </div>
                            </div>
                            <div className='w-[21%]  flex'>
                                <div className='px-3 py-3.5'>
                                    <p>Client Name <button onClick={() => handleSort('clientname')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[26%]  flex'>
                                <div className='px-3 py-3.5'>
                                    <p>Quote/Invoice Description <button onClick={() => handleSort('quotedescription')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            {/* <div className='w-[13%]  flex'>
                                <div className='px-3 py-3.5'>
                                    <p>Estimate Amount <button onClick={() => handleSort('estimateamount')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[12%]  flex'>
                                <div className='px-3 py-3.5'>
                                    <p>Estimate Date <button onClick={() => handleSort('estimatedate')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div> */}
                            <div className='w-[14%]  flex'>
                                <div className='px-3 py-3.5'>
                                    <p>Invoice Amount <button onClick={() => handleSort('invoiceamount')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[13%]  flex'>
                                <div className='px-3 py-3.5'>
                                    <p>Invoice Date <button onClick={() => handleSort('invoicedate')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[10%]  flex'>
                                <div className='px-3 py-3.5'>
                                    <p>Entity <button onClick={() => handleSort('entityname')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[12%]  flex'>
                                <div className='px-3 py-3.5'>
                                    <p>Created By <button onClick={() => handleSort('createdbyname')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                        </div>
                        <div className="w-[10%] flex">
                            <div className='w-1/2  flex'>
                                <div className='px-3 py-3.5'>
                                    <p>ID <button onClick={() => handleSort('id')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-1/2  flex'>
                                <div className='px-3 py-3.5'>
                                    <p>Edit</p>
                                </div>
                            </div>
                        </div>

                    </div>


                    <div className='w-full h-[calc(100vh_-_17rem)] overflow-auto'>
                        {/* we map our items here */}
                        {/* {pageLoading && <div className='ml-5 mt-5'><LinearProgress /></div>} */}
                        {!pageLoading && existingClientInvoice && existingClientInvoice.length == 0 && <div className='h-10 border-gray-400 border-b-[1px] flex items-center'>
                                        <h1 className='ml-10'>No Records To Show</h1>
                            </div>}
                        {!pageLoading && existingClientInvoice.map((item, index) => {
                            return <div className='w-full bg-white flex justify-between border-gray-400 border-b-[1px]'>
                                <div className="w-[90%] flex">
                                    <div className='w-[4%] flex'>
                                        <div className='p-3'>
                                            <p>{index + 1 + (currentPage - 1) * currentPages}</p>
                                        </div>
                                    </div>
                                    <div className='w-[21%] flex'>
                                        <div className='p-3'>
                                            <p>{item.clientname}</p>
                                        </div>
                                    </div>
                                    <div className='w-[26%]  flex'>
                                        <div className='p-3'>
                                            <p>{item.quotedescription}</p>
                                        </div>
                                    </div>
                                    {/* <div className='w-[13%]  flex pl-0.5'>
                                        <div className='p-3'>
                                            <p>{item.estimateamount ? item.estimateamount.toFixed(2) : null}</p>
                                        </div>
                                    </div>
                                    <div className='w-[12%]  flex pl-0.5'>
                                        <div className='p-3'>
                                            <p>{item.estimatedate ? item.estimatedate.split('T')[0] : ""}</p>
                                        </div>
                                    </div> */}
                                    <div className='w-[14%]  flex pl-0.5'>
                                        <div className='p-3'>
                                            <p>{item.invoiceamount ? item.invoiceamount.toFixed(2) : null}</p>
                                        </div>
                                    </div>
                                    <div className='w-[13%]  flex pl-1'>
                                        <div className='p-3'>
                                            <p>{formatDate(item.invoicedate)}</p>
                                        </div>
                                    </div>
                                    <div className='w-[10%]  flex pl-1'>
                                        <div className='p-3'>
                                            <p>{item.entityname}</p>
                                        </div>
                                    </div>
                                    <div className='w-[12%]  flex'>
                                        <div className='p-3'>
                                            <p>{item.createdbyname}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[10%] flex">
                                    <div className='w-1/2  flex'>
                                        <div className='p-3'>
                                            <p>{item.id}</p>
                                        </div>
                                    </div>
                                    <div className='w-1/2  flex ml-4'>
                                        <div className='flex space-x-1'>
                                            <button onClick={() => { handleEdit(item.id) }}> <img className='w-4 h-4 cursor-pointer' src={Edit} alt="edit" /></button>
                                            <button onClick={() => handleDelete(item.id)}><img className='w-4 h-4 cursor-pointer' src={Trash} alt="trash" /></button>
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

                        <div className="h-auto w-full mt-1 ">
                            <div className="flex gap-12 justify-center">
                                <div className=" space-y-3 py-5">
                                    <div className="">
                                        <div className="text-[13px] pb-0.5">
                                            Client Name<label className="text-red-500">*</label>
                                        </div>
                                        {state?.hyperlinked ?
                                                 <div className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs py-0.5 bg-[#F5F5F5]" type="text" >{state.clientname}</div> :
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
                                                // options: (provided, state) => ({
                                                //     ...provided,
                                                //     fontSize: 10// adjust padding for the dropdown indicator
                                                // }),
                                                option: (provided, state) => ({
                                                    ...provided,
                                                    padding: '2px 10px', // Adjust padding of individual options (top/bottom, left/right)
                                                    margin: 0, // Ensure no extra margin
                                                    fontSize: 10 // Adjust font size of individual options
                                                }),
                                                menu: (provided, state) => ({
                                                    ...provided,
                                                    width: 230, // Adjust the width of the dropdown menu
                                                    zIndex: 9999 // Ensure the menu appears above other elements
                                                }),
                                                menuList: (provided, state) => ({
                                                    ...provided,
                                                    padding: 0, // Adjust padding of the menu list
                                                    fontSize: 10,
                                                    maxHeight: 150 // Adjust font size of the menu list
                                                }),
                                                
                                            }}
                                        />}
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
                                        <textarea className="w-56 h-16 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none resize-none" type="text" name="invoiceDescription" value={formValues.invoiceDescription} onChange={handleChange} />
                                        <p className="text-[10px] text-[#CD0000] mt-[-5px] ">{formErrors.invoiceDescription}</p>
                                    </div>
                                </div>
                                <div className=" space-y-3 py-5">
                                    <div className="">
                                        <div className="text-[13px] mb-1">
                                            Order <label className="text-red-500">*</label>
                                        </div>
                                        {/* <select
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
                                        </select> */}
                                        {state?.hyperlinked ? <div className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs py-0.5 bg-[#F5F5F5]" type="text" name="curaoffice" >{state.orderdescription}</div>  : 
                                        <OrderDropDown options={orders} orderText={orderText} setOrderText={setOrderText} leftLabel="ID" rightLabel="OrderName" leftAttr="id" rightAttr="ordername" toSelect="ordername" handleChange={handleChange} formValueName="order" value={formValues.order}  />}
                                        {/* <DropDown options={orders} initialValue="Select Order" leftLabel="ID" rightLabel="OrderName" leftAttr="id" rightAttr="ordername" toSelect="ordername" handleChange={handleChange} formValueName="order" value={formValues.order}/> */}
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.order}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-sm">Estimate Date</div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="date" name="estimateDate" value={formValues.estimateDate} onChange={handleChange} />
                                    </div>
                                    <div className="">
                                        <div className="text-sm">GST / ST</div>
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
                            <button className='w-28 h-10 bg-[#004DD7] text-white rounded-md text-lg' onClick={handleAddClientInvoice} >Add</button>
                            <button className='w-28 h-10 border-[1px] border-[#282828] rounded-md text-lg' onClick={handleClose}>Cancel</button>
                        </div>

                    </div>

                </div>
            </Modal>
        </div>
    )
}

export default ManageClientInvoice
