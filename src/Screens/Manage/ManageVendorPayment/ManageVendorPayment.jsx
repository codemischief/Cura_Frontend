import { LinearProgress, Modal, Pagination } from "@mui/material";
import React, { useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import AsyncSelect from "react-select/async";
import Navbar from "../../../Components/Navabar/Navbar";
import FailureModal from '../../../Components/modals/FailureModal';
import SucessfullModal from '../../../Components/modals/SucessfullModal';
import CancelModel from './../../../Components/modals/CancelModel';
import Add from "../../../assets/add.png";
import backLink from "../../../assets/back.png";
import Cross from "../../../assets/cross.png";
import downloadIcon from "../../../assets/download.png";
import Edit from "../../../assets/edit.png";
import Excel from "../../../assets/excel.png";
import Filter from "../../../assets/filter.png";
import Pdf from "../../../assets/pdf.png";
import refreshIcon from "../../../assets/refresh.png";
import searchIcon from "../../../assets/searchIcon.png";
import Trash from "../../../assets/trash.png";
import { APIService } from '../../../services/API';
import DeleteVendorPayment from './DeleteVendorPayment';
import SaveConfirmationVendorPayment from './SaveConfirmationVendorPayment';
// import EditPmaAgreement from './EditPmaAgreement';
import FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import CharacterFilter from "../../../Components/Filters/CharacterFilter";
import DateFilter from '../../../Components/Filters/DateFilter';
import NumericFilter from '../../../Components/Filters/NumericFilter';
// import EditOrderReceipt from './EditOrderReceipt';
// import EditVendorInvoice from './EditVendorPayment';
import EditVendorPayment from "./EditVendorPayment";
import Draggable from "react-draggable";
import OrderDropDown from '../../../Components/Dropdown/OrderDropdown';
import DropDown from '../../../Components/Dropdown/Dropdown';
const ManageVendorPayment = () => {

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
    const [isVendorPaymentDialogue, SetIsVendorPaymentDialogue] = useState(false);
    const [isEditDialogue, setIsEditDialogue] = React.useState(false);
    const [currItem, setCurrItem] = useState({});
    const [showAddSuccess, setShowAddSuccess] = useState(false);
    const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

    const [vendorNameFilter, setVendorNameFilter] = useState(false);
    const [vendorNameFilterInput, setVendorNameFilterInput] = useState("");
    const [clientNameFilter, setClientNameFilter] = useState(false);
    const [clientNameFilterInput, setClientNameFilterInput] = useState("");
    const [orderDescriptionFilter, setOrderDescriptionFilter] = useState(false);
    const [orderDescriptionFilterInput, setOrderDescriptionFilterInput] = useState("");
    const [propertyDescriptionFilter, setPropertyDescriptionFilter] = useState(false);
    const [propertyDescriptionFilterInput, setPropertyDescriptionFilterInput] = useState("");
    const [amountFilter, setAmountFilter] = useState(false);
    const [amountFilterInput, setAmountFilterInput] = useState("");
    const [paymentDateFilter, setPaymentDateFilter] = useState(false);
    const [paymentDateFilterInput, setPaymentDateFilterInput] = useState("");
    const [modeOfPaymentFilter, setModeOfPaymentFilter] = useState(false);
    const [modeOfPaymentFilterInput, setModeOfPaymentFilterInput] = useState("");
    const [createdByFilter, setCreatedByFilter] = useState(false);
    const [createdByFilterInput, setCreatedByFilterInput] = useState("");
    const [paymentByFilter, setPaymentByFilter] = useState(false);
    const [paymentByFilterInput, setPaymentByFilterInput] = useState("");
    const [idFilter, setIdFilter] = useState(false);
    const [idFilterInput, setIdFilterInput] = useState("");

    const [openAddConfirmation, setOpenAddConfirmation] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isFailureModal, setIsFailureModal] = useState(false)
    const [deleteConfirmation, showDeleteConfirmation] = useState(false);
    // const [filterArray,setFilterArray] = useState([]);
    const dataRows = [
        "id",
        "paymentby",
        "paymentbyname",
        "amount",
        "paymentdate",
        "orderid",
        "briefdescription",
        "vendorid",
        "vendorname",
        "mode",
        "modeofpayment",
        "description",
        "tds",
        "servicetaxamount",
        "dated",
        "createdby",
        "createdbyname",
        "isdeleted",
        "createdon",
        "entityid",
        "entity",
        "officeid",
        "office",
        "clientname",
        "propertydescription"
    ]
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

    const [modesData, setModesData] = useState([]);
    const fetchModesData = async () => {
        const data = {
            "user_id": 1234
        }
        const response = await APIService.getModesAdmin(data)
        const res = await response.json()
        setModesData(res.data)
        console.log(res)
    }

    const [usersData, setUsersData] = useState([]);
    const fetchUsersData = async () => {
        const data = {
            "user_id": 1234
        }
        const response = await APIService.getUsers(data)
        const res = await response.json()
        const existing = { ...formValues }
        existing.receivedBy = res.data[0].id,
            console.log(existing.receivedBy)
        setFormValues(existing)
        setUsersData(res.data)
    }

    const [vendorData, setVendorData] = useState([])
    const fetchVendorData = async () => {
        const data = { "user_id": 1234 }
        const response = await APIService.getVendorAdmin(data)
        const res = await response.json()
        console.log(res)
        setVendorData(res.data)
    }

    const [sortField, setSortField] = useState("id")
    const [flag, setFlag] = useState(false)
    const [existingVendorPayment, setExistingVendorPayment] = useState([]);
    const fetchData = async () => {
        console.log('ugm')
        setPageLoading(true);
        setCurrentPage((prev) => 1)
        const data = {
            "user_id": 1234,
            "rows": dataRows,
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": searchInput
        }
            ;
        const response = await APIService.getVendorPayment(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingVendorPayment(result);
        setPageLoading(false);
    }
    const fetchPageData = async (pageNumber) => {
        setPageLoading(true);
        console.log(pageNumber)
        setCurrentPage(() => pageNumber)
        const data = {
            "user_id": 1234,
            "rows": dataRows,
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": Number(pageNumber),
            "pg_size": Number(currentPages),
            "search_key": searchInput
        }
        const response = await APIService.getVendorPayment(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingVendorPayment(result);
        setPageLoading(false);
    }
    const fetchQuantityData = async (quantity) => {
        setPageLoading(true);
        console.log(searchInput);
        setCurrentPage((prev) => 1);
        const data = {
            "user_id": 1234,
            "rows": dataRows,
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(quantity),
            "search_key": searchInput
        }
            ;
        const response = await APIService.getVendorPayment(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingVendorPayment(result);
        setPageLoading(false);
    }
    const [clientPropertyData, setClientPropertyData] = useState([]);
    const getClientPropertyByClientId = async (id) => {
        const data = {
            "user_id": 1234,
            "client_id": id
        }

        const response = await APIService.getClientPropertyByClientId(data)
        const res = await response.json()
        console.log(res)
        setClientPropertyData(res.data)
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
    }
    const addVendorPayment = async () => {

        const data = {
            "user_id": 1234,
            "paymentby": Number(formValues.paymentby),
            "amount": Number(formValues.amount),
            "paymentdate": formValues.paymentdate,
            "orderid": Number(formValues.orderid),
            "vendorid": Number(formValues.vendorid),
            "mode": Number(formValues.mode),
            "description": formValues.description,
            "tds": Number(formValues.tds),
            "servicetaxamount": Number(formValues.servicetaxamount),
            "entityid": 1,
            "officeid": 2
        }
        // "user_id":1234,
        // "receivedby": 1234,
        // "amount": 20000,
        // "tds": null,
        // "recddate": "2014-04-14",
        // "paymentmode": 5,
        // "orderid": 34,
        // "entityid": 1,
        // "officeid": 1
        const response = await APIService.addVendorPayment(data)
        const res = await response.json()
        console.log(res)

        setOpenAddConfirmation(false);
        SetIsVendorPaymentDialogue(false);
        if (res.result == "success") {
            setFormValues(initialValues);
            openAddSuccess();
        } else {
            openFailureModal();
            setErrorMessage(res.message)
        }
    }
    const [showEditModal, setShowEditModal] = useState(false);
    const [currInvoice, setCurrInvoice] = useState(0);
    const handleEdit = (id) => {
        // we need to open the edit modal
        console.log(id)
        setCurrInvoice((prev) => id)
        // setCurrOrderReceipt((prev) => id)
        // console.log(currOrderReceipt)
        setShowEditModal(true);
    }
    const initialValues = {
        client: "",
        paymentby: null,
        amount: "",
        paymentdate: null,
        orderid: null,
        vendorid: null,
        mode: null,
        description: "",
        tds: null,
        servicetaxamount: null,
        entityid: null,
        officeid: null
    };
    const [formValues, setFormValues] = useState(initialValues);
    useEffect(() => {
        fetchData();
        // fetchUsersData();
        fetchModesData();
        fetchVendorData();
        fetchUsersData();

        const handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setVendorNameFilter(false);
                setClientNameFilter(false);
                setOrderDescriptionFilter(false);
                setPropertyDescriptionFilter(false);
                setAmountFilter(false);
                setPaymentDateFilter(false);
                setCreatedByFilter(false);
                setModeOfPaymentFilter(false);
                setPaymentByFilter(false);
                setIdFilter(false);
            }
        }

        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);



    const handleOpen = () => {
        SetIsVendorPaymentDialogue(true);
    };

    const handleClose = () => {
        initials();
        setSelectedOption(
            {
                label: "Select Client",
                value: null
            }
        )
        setOrders([]);
        setOrderText("Select Order");

        SetIsVendorPaymentDialogue(false);
        openAddCancelModal();
    }

    const initials = () => {
        setFormValues(initialValues);
        setFormErrors({});
    }

    const [orderText, setOrderText] = useState("Select Order")

    const handleAddVendorPayment = () => {
        console.log(formValues)
        if (!validate()) {
            console.log('hu')
            return;
        }
        SetIsVendorPaymentDialogue(false);
        // setIsLLAgreementDialogue(false);
        setOpenAddConfirmation(true)

    }

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
                return { ...existing, client: "Select Client" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, client: "" }
            })
        }
        if (formValues.orderid == null || formValues.orderid == "") {
            setFormErrors((existing) => {
                return { ...existing, orderid: "Select Order" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, orderid: "" }
            })
        }
        if (formValues.mode == null || formValues.mode == "") {
            setFormErrors((existing) => {
                return { ...existing, mode: "Select Mode" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, mode: "" }
            })
        }
        if (formValues.amount == null || formValues.amount == "") {
            setFormErrors((existing) => {
                return { ...existing, amount: "Enter Amount" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, amount: "" }
            })
        }
        if (formValues.vendorid == null || formValues.vendorid == "") {
            setFormErrors((existing) => {
                return { ...existing, vendorid: "Enter Vendor" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, vendorid: "" }
            })
        }
        if (formValues.paymentdate == null || formValues.paymentdate == "") {
            setFormErrors((existing) => {
                return { ...existing, paymentdate: "Enter Payment Date" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, paymentdate: "" }
            })
        }
        if (formValues.paymentby == null || formValues.paymentby == "") {
            setFormErrors((existing) => {
                return { ...existing, paymentby: "Enter Payment By" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, paymentby: "" }
            })
        }

        return res;
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
            "rows": [
                "id",
                "vendorname",
                "propertydescription",
                "briefdescription",
                "amount",
                "paymentdate",
                "modeofpayment",
                "paymentbyname",
                "createdbyname",
            ],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 0,
            "pg_size": 0,
            "search_key": searchInput
        };
        const response = await APIService.getVendorPayment(data);
        const temp = await response.json();
        const result = temp.data;
        const worksheet = XLSX.utils.json_to_sheet(result);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "VendorPaymentData.xlsx");
        FileSaver.saveAs(workbook, "demo.xlsx");
    }
    const handleSearch = async () => {
        // console.log("clicked")
        setPageLoading(true);
        setCurrentPage((prev) => 1)
        // setCurrentPages(15);
        setIsSearchOn(true);
        const data = {
            "user_id": 1234,
            "rows": dataRows,
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": searchInput
        };
        const response = await APIService.getVendorPayment(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingVendorPayment(result);
        setPageLoading(false);
    }
    const handleCloseSearch = async () => {
        setIsSearchOn(false);
        setPageLoading(true);
        setSearchInput("");
        setCurrentPage((prev) => 1)
        const data = {
            "user_id": 1234,
            "rows": dataRows,
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": ""
        };
        const response = await APIService.getVendorPayment(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingVendorPayment(result);
        setPageLoading(false);
    }
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [currVendorInvoice, setCurrVendorInvoice] = useState("");
    const handleDelete = (id) => {
        setCurrVendorInvoice(id);
        setShowDeleteModal(true)
    }
    const deleteVendorPayment = async (id) => {
        const data = {
            "user_id": 1234,
            "id": id
        }
        const response = await APIService.deleteVendorPayment(data)
        const res = await response.json()
        if (res.result == 'success') {
            setShowDeleteModal(false);
            openDeleteSuccess()
        }
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
        // setIsEditDialogue(false);
        setShowEditModal(false)
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
        SetIsVendorPaymentDialogue(false);
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
        getClientPropertyByClientId(e.value)
        setFormValues(existing)
        //    const existing = {...formValues}
        //    const temp = {...existing.client_property}
        //    temp.clientid = e.value
        //    existing.client_property = temp;
        //    setFormValues(existing)
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

    const filterMapping = {
        vendorname: {
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
        briefdescription: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        propertydescription: {
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
        paymentdate: {
            filterType: "",
            filterValue: null,
            filterData: "Date",
            filterInput: ""
        },
        modeofpayment: {
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
        paymentbyname: {
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
    const [filterState, setFilterState] = useState([]);
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
        setCurrentPage((prev) => 1)
        setFilterState(tempArray)
        setPageLoading(true);
        const data = {
            "user_id": 1234,
            "rows": dataRows,
            "filters": tempArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": isSearchOn ? searchInput : ""
        };
        const response = await APIService.getVendorPayment(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingVendorPayment(result);
        setPageLoading(false);
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
            "rows": dataRows,
            "filters": tempArray,
            "sort_by": [field],
            "order": !flag ? "asc" : "desc",
            "pg_no": Number(currentPage),
            "pg_size": Number(currentPages),
            "search_key": isSearchOn ? searchInput : ""
        };
        // setFlag((prev) => !prev);
        const response = await APIService.getVendorPayment(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingVendorPayment(result);
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
    const [orderData,setOrderData] = useState({
        orderdate : "",
        orderstatus : ""
    })
    const getOrderData = async (id) => {
        const data = {
            "user_id" : 1234,
            "orderid" : id
        }
        const response = await APIService.getOrderPending(data)
        const res = await response.json()
        const temp = {...orderData}
        temp.orderdate = res.data.orderdate 
        temp.orderstatus = res.data.orderstatus 
        setOrderData(temp)
    }
    

    return (
        <div className='h-screen'>
            <Navbar />
            {showEditModal && <EditVendorPayment handleClose={() => setShowEditModal(false)} currPayment={currInvoice} modesData={modesData} orders={orders} vendorData={vendorData} usersData={usersData} showSuccess={openEditSuccess} showCancel={openCancelModal} />}
            {/* {showEditModal && <EditVendorInvoice handleClose={() => { setShowEditModal(false) }} currInvoice={currInvoice} clientPropertyData={clientPropertyData} showSuccess={openEditSuccess} modesData={modesData} usersData={usersData} vendorData={vendorData} />} */}
            {showAddSuccess && <SucessfullModal isOpen={showAddSuccess} message="New Vendor Payment Created successfully" />}
            {showDeleteSuccess && <SucessfullModal isOpen={showDeleteSuccess} message="Vendor Payment Deleted successfully" />}
            {showEditSuccess && <SucessfullModal isOpen={showEditSuccess} message="Changes Saved Successfully" />}
            {/* {openAddConfirmation && <SaveConfirmationEmployee handleClose={() => setOpenAddConfirmation(false)} currEmployee={formValues.employeeName} addEmployee={addEmployee} />} */}
            {openAddConfirmation && <SaveConfirmationVendorPayment addVendorPayment={addVendorPayment} handleClose={() => setOpenAddConfirmation(false)} showCancel={openAddCancelModal} setDefault={initials} />}
            {isFailureModal && <FailureModal isOpen={isFailureModal} message={errorMessage} />}
            {showDeleteModal && <DeleteVendorPayment handleClose={() => setShowDeleteModal(false)} item={currVendorInvoice} handleDelete={deleteVendorPayment} showCancel={openCancelModal} />}
            {showCancelModelAdd && <CancelModel isOpen={showCancelModelAdd} message="Process cancelled, no Vendor Payment added." />}
            {showCancelModel && <CancelModel isOpen={showCancelModel} message="Process cancelled, no changes saved." />}
            <div className='h-[calc(100vh_-_7rem)] w-full  px-10'>
                <div className='h-16 w-full  flex justify-between items-center p-2  border-gray-300 border-b-2'>
                    <div className='flex items-center space-x-3'>
                        <div className='rounded-2xl  bg-[#EBEBEB] h-8 w-8 flex justify-center items-center '>
                            <Link to="/dashboard"><img className='w-5 h-5' src={backLink} /></Link>
                        </div>

                        <div className='flex-col'>
                            <h1 className='text-[18px]'>Manage Vendor Payment </h1>
                            <p className='text-[14px]'>Manage &gt; Manage Vendor Payment</p>
                        </div>
                    </div>
                    <div className='flex space-x-2 items-center'>

                        <div className='flex bg-[#EBEBEB] '>
                            {/* search button */}
                            <input
                                className="h-[36px] bg-[#EBEBEB] text-[#787878] pl-3 outline-none"
                                type="text"
                                placeholder="  Search"
                                value={searchInput}
                                onChange={(e) => {
                                    setSearchInput(e.target.value);
                                }}
                                onKeyDownCapture={handleKeyDown}
                            />
                            <button onClick={handleCloseSearch}><img src={Cross} className=' w-[20px] h-[20px] mx-2' /></button>
                            <div className="h-[36px] w-[40px] bg-[#004DD7] flex items-center justify-center rounded-r-lg">
                                <button onClick={handleSearch}><img className="h-[26px] " src={searchIcon} alt="search-icon" /></button>
                            </div>
                        </div>

                        <div>
                            {/* button */}
                            <button className="bg-[#004DD7] text-white h-[36px] w-[300px] rounded-lg" onClick={handleOpen}>
                                <div className="flex items-center justify-center gap-4">
                                    Add New Vendor Payment
                                    <img className='h-[18px] w-[18px]' src={Add} alt="add" />
                                </div>
                            </button>
                        </div>

                    </div>

                </div>



                {/* filter component */}

                <div className='w-full h-12 flex justify-between border-gray-400 border-b-[1px] text-xs'>
                    <div className="w-[90%] flex">
                        <div className='w-[4%] flex'>
                            <div className='px-3 py-5'>
                                {/* <p>Sr.</p> */}
                            </div>
                        </div>
                        <div className='w-[12%] px-3 py-2  '>
                            <div className="w-[80%] flex items-center bg-[#EBEBEB] rounded-md">
                                <input className="w-[70%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={vendorNameFilterInput} onChange={(e) => setVendorNameFilterInput(e.target.value)}
                                    onKeyDown={(event) => handleEnterToFilter(event, vendorNameFilterInput,
                                        setVendorNameFilterInput,
                                        'contains',
                                        'vendorname')}
                                />
                                <button className='w-[30%] px-1 py-2' onClick={() => { setVendorNameFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                            </div>
                            {vendorNameFilter && <CharacterFilter inputVariable={vendorNameFilterInput} setInputVariable={setVendorNameFilterInput} handleFilter={newHandleFilter} filterColumn='vendorname' menuRef={menuRef} />}
                        </div>
                        <div className='w-[11%]  px-3 py-2 '>
                            <div className="w-[85%] flex items-center bg-[#EBEBEB] rounded-md">
                                <input className="w-[70%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={clientNameFilterInput} onChange={(e) => setClientNameFilterInput(e.target.value)}
                                    onKeyDown={(event) => handleEnterToFilter(event, clientNameFilterInput,
                                        setClientNameFilterInput,
                                        'contains',
                                        'clientname')}
                                />
                                <button className='w-[30%] px-1 py-2' onClick={() => { setClientNameFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                            </div>
                            {clientNameFilter && <CharacterFilter inputVariable={clientNameFilterInput} setInputVariable={setClientNameFilterInput} handleFilter={newHandleFilter} filterColumn='clientname' menuRef={menuRef} />}
                        </div>
                        <div className='w-[12%] px-3 py-2 '>
                            <div className="w-[80%] flex items-center bg-[#EBEBEB] rounded-md">
                                <input className="w-[75%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={propertyDescriptionFilterInput} onChange={(e) => setPropertyDescriptionFilterInput(e.target.value)}
                                    onKeyDown={(event) => handleEnterToFilter(event, propertyDescriptionFilterInput,
                                        setPropertyDescriptionFilterInput,
                                        'contains',
                                        'propertydescription')}
                                />
                                <button className='w-[35%] px-1 py-2' onClick={() => { setPropertyDescriptionFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                            </div>
                            {propertyDescriptionFilter && <CharacterFilter filterColumn='propertydescription' inputVariable={propertyDescriptionFilterInput} setInputVariable={setPropertyDescriptionFilterInput} handleFilter={newHandleFilter} menuRef={menuRef} />}
                        </div>
                        <div className='w-[15%] px-3 py-2 '>
                            <div className="w-[80%] flex items-center bg-[#EBEBEB] rounded-md">
                                <input className="w-[75%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={orderDescriptionFilterInput} onChange={(e) => setOrderDescriptionFilterInput(e.target.value)}
                                    onKeyDown={(event) => handleEnterToFilter(event, orderDescriptionFilterInput,
                                        setOrderDescriptionFilterInput,
                                        'contains',
                                        'briefdescription')}
                                />
                                <button className='w-[25%] px-1 py-2' onClick={() => { setOrderDescriptionFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                            </div>
                            {orderDescriptionFilter && <CharacterFilter inputVariable={orderDescriptionFilterInput} setInputVariable={setOrderDescriptionFilterInput} handleFilter={newHandleFilter} filterColumn='briefdescription' menuRef={menuRef} />}
                        </div>
                        <div className='w-[9%] px-3 py-2 '>
                            <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                <input className="w-[68%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={amountFilterInput} onChange={(e) => setAmountFilterInput(e.target.value)}
                                    onKeyDown={(event) => handleEnterToFilter(event, amountFilterInput,
                                        setAmountFilterInput,
                                        'equalTo',
                                        'amount')}
                                />
                                <button className='w-[32%] px-1 py-2' onClick={() => { setAmountFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                            </div>
                            {amountFilter && <NumericFilter inputVariable={amountFilterInput} setInputVariable={setAmountFilterInput} handleFilter={newHandleFilter} columnName='amount' menuRef={menuRef} />}
                        </div>
                        <div className='w-[12%] px-3 py-2'>
                            <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                <input className="w-[75%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={paymentDateFilterInput} onChange={(e) => setPaymentDateFilterInput(e.target.value)} type="date"
                                    onKeyDown={(event) => handleEnterToFilter(event, paymentDateFilterInput,
                                        setPaymentDateFilterInput,
                                        'equalTo',
                                        'paymentdate')}
                                />
                                <button className='w-[25%] px-1 py-2' onClick={() => { setPaymentDateFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                            </div>
                            {paymentDateFilter && <DateFilter inputVariable={paymentDateFilterInput} setInputVariable={setPaymentDateFilterInput} handleFilter={newHandleFilter} columnName='paymentdate' menuRef={menuRef} />}
                        </div>
                        <div className='w-[11%] px-3 py-2 '>
                            <div className="w-[70] flex items-center bg-[#EBEBEB] rounded-md">
                                <input className="w-[75%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={modeOfPaymentFilterInput} onChange={(e) => setModeOfPaymentFilterInput(e.target.value)}
                                    onKeyDown={(event) => handleEnterToFilter(event, modeOfPaymentFilterInput,
                                        setModeOfPaymentFilterInput,
                                        'contains',
                                        'modeofpayment')}
                                />
                                <button className='w-[25%] px-1 py-2' onClick={() => { setModeOfPaymentFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                            </div>
                            {modeOfPaymentFilter && <CharacterFilter inputVariable={modeOfPaymentFilterInput} setInputVariable={setModeOfPaymentFilterInput} handleFilter={newHandleFilter} filterColumn='modeofpayment' menuRef={menuRef} />}
                        </div>
                        <div className='w-[11%] px-3 py-2'>
                            <div className="w-[70] flex items-center bg-[#EBEBEB] rounded-md">
                                <input className="w-[75%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={paymentByFilterInput} onChange={(e) => setPaymentByFilterInput(e.target.value)}
                                    onKeyDown={(event) => handleEnterToFilter(event, paymentByFilterInput,
                                        setPaymentByFilterInput,
                                        'contains',
                                        'paymentbyname')}
                                />
                                <button className='w-[25%] px-1 py-2' onClick={() => { setPaymentByFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                            </div>
                            {paymentByFilter && <CharacterFilter filterColumn='paymentbyname' inputVariable={paymentByFilterInput} setInputVariable={setPaymentByFilterInput} handleFilter={newHandleFilter} menuRef={menuRef} />}
                        </div>
                        <div className='w-[11%] px-3 py-2 '>
                            <div className="w-[70] flex items-center bg-[#EBEBEB] rounded-md">
                                <input className="w-[75%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={createdByFilterInput} onChange={(e) => setCreatedByFilterInput(e.target.value)}
                                    onKeyDown={(event) => handleEnterToFilter(event, createdByFilterInput,
                                        setCreatedByFilterInput,
                                        'contains',
                                        'createdbyname')}
                                />
                                <button className='w-[25%] px-1 py-2' onClick={() => { setCreatedByFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                            </div>
                            {createdByFilter && <CharacterFilter inputVariable={createdByFilterInput} setInputVariable={setCreatedByFilterInput} handleFilter={newHandleFilter} filterColumn='createdbyname' menuRef={menuRef} />}
                        </div>

                    </div>
                    <div className="w-[10%] flex">

                        <div className='w-[65%] px-3 py-2 '>
                            <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                <input className="w-[55%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" value={idFilterInput} onChange={(e) => setIdFilterInput(Number(e.target.value))}
                                    onKeyDown={(event) => handleEnterToFilter(event, idFilterInput,
                                        setIdFilterInput,
                                        'equalTo',
                                        'id')}
                                />
                                <button className='px-1 py-2 w-[45%] '><img src={Filter} className='h-3 w-3' onClick={() => { setIdFilter((prev) => !prev) }} /></button>
                            </div>
                            {idFilter && <NumericFilter columnName='id' inputVariable={idFilterInput} setInputVariable={setIdFilterInput} handleFilter={newHandleFilter} menuRef={menuRef} />}
                        </div>
                        <div className='w-[35%]  flex'>
                            <div className='px-3 py-5'>

                            </div>
                        </div>
                    </div>

                </div>


                <div className='h-[calc(100vh_-_14rem)] w-full text-[12px]'>
                    <div className='w-full h-16 bg-[#F0F6FF] flex justify-between border-gray-400 border-b-[1px]'>
                        <div className="w-[90%] flex">
                            <div className='w-[4%] flex'>
                                <div className='px-3 py-5'>
                                    <p>Sr.</p>
                                </div>
                            </div>
                            <div className='w-[12%]  flex'>
                                <div className='px-3 py-5'>
                                    <p>Vendor Name <button onClick={() => handleSort('vendorname')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[11%]  flex'>
                                <div className='px-3 py-5'>
                                    <p>Client Name <button onClick={() => handleSort('clientname')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[12%]  flex '>
                                <div className='px-3 py-5'>
                                    <p>Property <button onClick={() => handleSort('propertydescription')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[15%]  flex'>
                                <div className='px-3 py-5'>
                                    <p>Order Description <button onClick={() => handleSort('briefdescription')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[9%]  flex'>
                                <div className='px-3 py-5'>
                                    <p>Amount <button onClick={() => handleSort('amount')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[12%]  flex'>
                                <div className='px-3 py-5'>
                                    <p>Payment Date <button onClick={() => handleSort('paymentdate')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[11%]  flex'>
                                <div className='p-3'>
                                    <p>Mode of</p>
                                    <p>Payment</p>
                                </div>
                                <button onClick={() => handleSort('modeofpayment')}><span className="font-extrabold">↑↓</span></button>
                            </div>
                            <div className='w-[11%]  flex'>
                                <div className='px-3 py-5'>
                                    <p>Payment By <button onClick={() => handleSort('paymentbyname')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[11%]  flex'>
                                <div className='px-3 py-5'>
                                    <p>Created By <button onClick={() => handleSort('createdbyname')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                        </div>
                        <div className="w-[10%] flex">
                            <div className='w-1/2  flex'>
                                <div className='px-3 py-5'>
                                    <p>ID <button onClick={() => handleSort('id')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-1/2  flex'>
                                <div className='px-3 py-5'>
                                    <p>Edit</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* 

                    
                     */}


                    <div className='w-full h-[calc(100vh_-_18rem)] overflow-auto'>


                        {/* we map our items here */}
                        {pageLoading && <div className='ml-5 mt-5'><LinearProgress /></div>}
                        {!pageLoading && existingVendorPayment.map((item, index) => {
                            return <div className='w-full h-auto py-2 bg-white flex justify-between items-center border-gray-400 border-b-[1px]'>
                                <div className="w-[90%] flex">
                                    <div className='w-[4%] flex'>
                                        <div className='px-3 '>
                                            <p>{index + 1 + (currentPage - 1) * currentPages}</p>
                                        </div>
                                    </div>
                                    <div className='w-[12%]  flex'>
                                        <div className='px-3 '>
                                            <p>{item.vendorname}</p>
                                        </div>
                                    </div>
                                    <div className='w-[11%]  flex'>
                                        <div className='px-3'>
                                            <p>{item.clientname}</p>
                                        </div>
                                    </div>
                                    <div className='w-[12%]  flex '>
                                        <div className='px-3 '>
                                            <p>{item.propertydescription}</p>
                                        </div>
                                    </div>
                                    <div className='w-[15%]  flex pl-1'>
                                        <div className='px-3 '>
                                            <p>{item.briefdescription}</p>
                                        </div>
                                    </div>
                                    <div className='w-[9%]  flex pl-1'>
                                        <div className='px-3 '>
                                            <p>{item.amount ? item.amount.toFixed(2) : ""}</p>
                                        </div>
                                    </div>
                                    <div className='w-[12%]  flex pl-1'>
                                        <div className='px-3 '>
                                            <p>{item.paymentdate}</p>
                                        </div>
                                    </div>
                                    <div className='w-[11%]  flex pl-1'>
                                        <div className='px-3 '>
                                            <p>{item.modeofpayment}</p>
                                        </div>
                                    </div>
                                    <div className='w-[11%]  flex pl-1'>
                                        <div className='px-3 '>
                                            <p>{item.paymentbyname}</p>
                                        </div>
                                    </div>
                                    <div className='w-[11%]  flex pl-1'>
                                        <div className='px-3 '>
                                            <p>{item.createdbyname}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[10%] flex items-center">
                                    <div className='w-1/2  flex pl-1'>
                                        <div className='px-3 '>
                                            <p>{item.id}</p>
                                        </div>
                                    </div>
                                    <div className='w-1/2 py-5 flex ml-4'>
                                        <div className='flex space-x-2'>
                                            <img className='w-4 h-4 cursor-pointer' src={Edit} alt="edit" onClick={() => handleEdit(item.id)} />
                                            <img className='w-4 h-4 cursor-pointer' src={Trash} alt="trash" onClick={() => handleDelete(item.id)} />
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

            <Modal open={isVendorPaymentDialogue}
                fullWidth={true}
                maxWidth={'md'}
                className='flex justify-center items-center'
            >
                <>
                    <Draggable>
                        <div className='flex justify-center'>
                            <div className="w-[1050px] h-auto bg-white rounded-lg">
                                <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-t-lg">
                                    <div className="mr-[410px] ml-[410px]">
                                        <div className="text-[16px]">New Vendor Payment</div>
                                    </div>
                                    <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                                        <button onClick={handleClose}><img onClick={handleClose} className="w-[20px] h-[20px]" src={Cross} alt="cross" /></button>
                                    </div>
                                </div>

                                <div className="h-auto w-full mt-[5px]">
                                    <div className="flex gap-[48px] justify-center ">
                                        <div className=" space-y-3 py-5">
                                            <div className="">
                                                <div className="text-sm text-[#787878] mb-0.5">Cura Office </div>
                                                <div className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs py-0.5 bg-[#F5F5F5]" type="text" name="curaoffice" value={formValues.curaoffice} onChange={handleChange} >Pune</div>
                                            </div>
                                            <div className="">
                                                <div className="text-[13px] mb-0.5">
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
                                                <div className="text-[10px] text-[#CD0000] ">{formErrors.client}</div>
                                            </div>
                                            <div className="">
                                                <div className="text-sm">
                                                    Mode <label className="text-red-500">*</label>
                                                </div>
                                                <select
                                                    className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs"
                                                    name="mode"
                                                    value={formValues.mode}
                                                    onChange={handleChange}
                                                >
                                                    <option value="" hidden> Select Mode</option>
                                                    {modesData.map((item) => (
                                                        <option key={item[0]} value={item[0]}>
                                                            {item[1]}
                                                        </option>
                                                    ))}
                                                </select>
                                                <div className="text-[10px] text-[#CD0000] ">{formErrors.mode}</div>
                                            </div>
                                            <div className="">
                                                <div className="text-[13px]">Amount Paid <label className="text-red-500">*</label></div>
                                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="amount" value={formValues.amount} onChange={handleChange} />
                                                <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div>
                                            </div>
                                            <div className="">
                                                <div className="text-[13px]">GST/ST </div>
                                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="servicetaxamount" value={formValues.servicetaxamount} onChange={handleChange} />
                                            </div>
                                            <div className="">
                                                <div className="text-[13px] mb-0.5">Description </div>
                                                <textarea className="w-[230px] h-[75px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px] resize-none" type="text" name="description" value={formValues.description} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className=" space-y-3 py-5">
                                            <div className="">
                                                <div className="text-sm text-[#787878] mb-0.5">Payment ID </div>
                                                <div className="w-[230px] h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs py-0.5 bg-[#F5F5F5]" type="text" name="curaoffice" value={formValues.curaoffice} onChange={handleChange} ></div>
                                            </div>
                                            <div className="">
                                                <div className="text-[13px] mb-1">
                                                    Order <label className="text-red-500">*</label>
                                                </div>
                                                {/* <select
                                                    className="w-[230px] h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                                                    name="orderid"
                                                    value={formValues.orderid}
                                                    onChange={handleChange}
                                                >
                                                    <option value="" >Select A Order</option>
                                                    {orders.map((item) => (
                                                        <option key={item.id} value={item.id}>
                                                            {item.ordername}
                                                        </option>
                                                    ))}
                                                </select> */}
                                                <OrderDropDown options={orders} orderText={orderText} setOrderText={setOrderText} leftLabel="ID" rightLabel="OrderName" leftAttr="id" rightAttr="ordername" toSelect="ordername" handleChange={(e) => {
                                                    handleChange(e)
                                                    getOrderData(e.target.value)
                                                }} formValueName="orderid" value={formValues.orderid} />
                                                
                                                <div className="text-[10px] text-[#CD0000] ">{formErrors.orderid}</div>
                                            </div>
                                            <div className="">
                                                <div className="text-[13px]">Vendor <label className="text-red-500">*</label></div>
                                                <select className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" name="vendorid" value={formValues.vendorid} onChange={handleChange} >
                                                    <option value={null}> Select Vendor</option>
                                                    {vendorData.map(item => (
                                                        <option key={item[0]} value={item[0]}>
                                                            {item[1]}
                                                        </option>
                                                    ))}
                                                </select>
                                                <div className="text-[10px] text-[#CD0000] ">{formErrors.vendorid}</div>
                                            </div>
                                            <div className="">
                                                <div className="text-[13px]">TDS Deduction </div>
                                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="tds" value={formValues.tds} onChange={handleChange} />
                                            </div>
                                            <div className="">
                                                <div className="text-[13px]">Payment Date <label className="text-red-500">*</label></div>
                                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="date" name="paymentdate" value={formValues.paymentdate} onChange={handleChange} />
                                                <div className="text-[10px] text-[#CD0000] ">{formErrors.paymentdate}</div>
                                            </div>
                                            <div className="">
                                                <div className="text-sm mb-1">Payment By <label className="text-red-500">*</label></div>
                                                {/* <select className="w-[230px] h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs" name="paymentby" value={formValues.paymentby} onChange={handleChange} >
                                                    {usersData.map(item => (
                                                        <option key={item.id} value={item.id}>
                                                            {item.name}
                                                        </option>
                                                    ))}
                                                </select> */}
                                                <DropDown options={usersData} initialValue="Select Payment By" leftLabel="Name" rightLabel={"Username"} leftAttr="name" rightAttr="username" toSelect="name" handleChange={handleChange} formValueName="paymentby" value={formValues.paymentby} />
                                                <div className="text-[10px] text-[#CD0000] ">{formErrors.paymentby}</div>
                                            </div>
                                            <div className="">
                                                <div className="text-sm text-[#787878]">Order Date </div>
                                                <input className="w-[230px] h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs py-0.5 bg-[#F5F5F5]" type="text" name="curaoffice" value={orderData.orderdate}  readOnly/>
                                            </div>
                                            <div className="">
                                                <div className="text-sm text-[#787878]">Order Status </div>
                                                <input className="w-[230px] h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs py-0.5 bg-[#F5F5F5]" type="text" name="curaoffice" value={orderData.orderstatus} readOnly/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="my-3 flex justify-center items-center gap-[10px]">
                                    <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' onClick={handleAddVendorPayment} >Add</button>
                                    <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleClose}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </Draggable>
                </>
            </Modal>
        </div>
    )
}

export default ManageVendorPayment;
