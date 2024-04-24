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
import { Modal, Pagination, LinearProgress, duration } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import { APIService } from '../../../services/API';
import Pdf from "../../../assets/pdf.png";
import Excel from "../../../assets/excel.png"
import Edit from "../../../assets/edit.png"
import Trash from "../../../assets/trash.png"
import Filter from "../../../assets/filter.png"
import DateIcon from "../../../assets/dateFilter.png"
import Add from "../../../assets/add.png";
import SucessfullModal from '../../../Components/modals/SucessfullModal';
import FailureModal from '../../../Components/modals/FailureModal';
import { Description } from '@mui/icons-material';
import AsyncSelect from "react-select/async"
import DeletePmaAgreement from './DeletePmaAgreement';
import SaveConfirmationPmaAgreement from './SaveConfirmationPmaAgreement';
import EditPmaAgreement from './EditPmaAgreement';
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
import CharacterFilter from "../../../Components/Filters/CharacterFilter"
import DateFilter from '../../../Components/Filters/DateFilter';
import NumericFilter from '../../../Components/Filters/NumericFilter';
const ManageOrderReceipt = () => {

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
    const [isOrderReceiptDialogue, SetIsOrderReceiptDialogue] = useState(false);
    const [isEditDialogue, setIsEditDialogue] = React.useState(false);
    const [currItem, setCurrItem] = useState({});
    const [showAddSuccess, setShowAddSuccess] = useState(false);
    const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

    const [clientNameFilter, setClientNameFilter] = useState(false);
    const [clientNameFilterInput, setClientNameFilterInput] = useState("");
    const [propertyFilter, setPropertyFilter] = useState(false);
    const [propertyFilterInput, setPropertyFilterInput] = useState("");
    const [orderDescriptionFilter, setOrderDescriptionFilter] = useState(false);
    const [orderDescriptionFilterInput, setOrderDescriptionFilterInput] = useState("");
    const [amountFilter, setAmountFilter] = useState(false);
    const [amountFilterInput, setAmountFilterInput] = useState("");
    const [receivedDateFilter, setReceivedDateFilter] = useState(false);
    const [receivedDateFilterInput, setReceivedDateFilterInput] = useState("");
    const [receiptModeFilter, setReceiptModeFilter] = useState(false);
    const [receiptModeFilterInput, setReceiptModeFilterInput] = useState("");
    const [receivedByFilter, setReceivedByFilter] = useState(false);
    const [receivedByFilterInput, setReceivedByFilterInput] = useState("");
    const [createdByFilter, setCreatedByFilter] = useState(false);
    const [createdByFilterInput, setCreatedByFilterInput] = useState("");
    const [idFilter, setIdFilter] = useState(false);
    const [idFilterInput, setIdFilterInput] = useState("");

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

    const [sortField, setSortField] = useState("id")
    const [flag, setFlag] = useState(false)
    const [existingOrderReceipt, setExistingOrderReceipt] = useState([]);
    const fetchData = async () => {
        console.log('ugm')
        setPageLoading(true);
        const data = {
            "user_id": 1234,
            "rows": [
                "id",
                "receivedby",
                "receivedbyname",
                "amount",
                "tds",
                "recddate",
                "paymentmode",
                "paymentmodename",
                "orderid",
                "briefdescription",
                "dated",
                "createdby",
                "isdeleted",
                "createdon",
                "entityid",
                "entity",
                "officeid",
                "office",
                "clientname",
                "clientid",
                "createdbyname",
                "clientproperty",
                "clientpropertyid"
            ],
            "filters": [],
            "sort_by": ["id"],
            "order": "desc",
            "pg_no": 1,
            "pg_size": 15
        }
            ;
        const response = await APIService.getOrderReceipt(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingOrderReceipt(result);
        setPageLoading(false);
    }
    const fetchPageData = async (pageNumber) => {
        setPageLoading(true);
        setCurrentPage(pageNumber)
        const data = {
            "user_id": 1234,
            "rows": [
                "id",
                "receivedby",
                "receivedbyname",
                "amount",
                "tds",
                "recddate",
                "paymentmode",
                "paymentmodename",
                "orderid",
                "briefdescription",
                "dated",
                "createdby",
                "isdeleted",
                "createdon",
                "entityid",
                "entity",
                "officeid",
                "office",
                "clientname",
                "clientid",
                "createdbyname",
                "clientproperty",
                "clientpropertyid"
            ],
            "filters": [],
            "sort_by": ["id"],
            "order": "desc",
            "pg_no": Number(pageNumber),
            "pg_size": Number(currentPages)
        }
        const response = await APIService.getOrderReceipt(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingOrderReceipt(result);
        setPageLoading(false);
    }
    const fetchQuantityData = async (quantity) => {
        setPageLoading(true);
        console.log(searchInput);
        const data = {
            "user_id": 1234,
            "rows": [
                "id",
                "receivedby",
                "receivedbyname",
                "amount",
                "tds",
                "recddate",
                "paymentmode",
                "paymentmodename",
                "orderid",
                "briefdescription",
                "dated",
                "createdby",
                "isdeleted",
                "createdon",
                "entityid",
                "entity",
                "officeid",
                "office",
                "clientname",
                "clientid",
                "createdbyname",
                "clientproperty",
                "clientpropertyid"
            ],
            "filters": [],
            "sort_by": ["id"],
            "order": flag ? "asc" : "desc",
            "pg_no": Number(currentPage),
            "pg_size": Number(quantity),
            "search_key": searchInput
        }
            ;
        const response = await APIService.getOrderReceipt(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingOrderReceipt(result);
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
        //    if(res.data.length >= 1) {
        //     const existing = {...formValues}
        //     existing.clientProperty = res.data[0].id
        //     console.log(res.data[0].id)
        //     setFormValues(existing)
        //  } 
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
    const addOrderReceipt = async () => {

        const data = {
            "user_id": 1234,
            "receivedby": Number(formValues.receivedBy),
            "amount": Number(formValues.amountReceived),
            "tds": Number(formValues.TDS),
            "recddate": formValues.receivedDate,
            "paymentmode": Number(formValues.receiptMode),
            "orderid": Number(formValues.order),
            "quotedescription": formValues.receiptDescription,
            "dated": "2014-11-20T18:06:34.430000",
            "createdby": 95,
            "isdeleted": false,
            "createdon": null,
            "entityid": 1,
            "officeid": 1
        }
        const response = await APIService.addOrderReceipt(data)
        const res = await response.json()
        console.log(res)

        setOpenAddConfirmation(false);
        SetIsOrderReceiptDialogue(false);
        if (res.result == "success") {
            setFormValues(initialValues);
            openAddSuccess();
        } else {
            openFailureModal();
            setErrorMessage(res.message)
        }
    }
    const [showEditModal, setShowEditModal] = useState(false);
    const handleEdit = (id) => {
        // we need to open the edit modal
        setCurrOrderReceipt(id)
        setShowEditModal(true);
    }
    const initialValues = {
        client: "",
        order: null,
        receiptMode: 5,
        receivedBy: 1,
        TDS: null,
        receiptDescription: "",
        receivedDate: null,
        amountReceived: ""
    };
    const [formValues, setFormValues] = useState(initialValues);
    useEffect(() => {
        fetchData();
        fetchEntitiesData();
        fetchRoleData();
        fetchUsersData();
        fetchLobData();
        fetchModesData();

        const handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setClientNameFilter(false);
                setPropertyFilter(false);
                setOrderDescriptionFilter(false);
                setAmountFilter(false);
                setReceivedDateFilter(false);
                setReceiptModeFilter(false);
                setReceivedByFilter(false);
                setCreatedByFilter(false);
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
        SetIsOrderReceiptDialogue(true);
    };

    const handleClose = () => {
        SetIsOrderReceiptDialogue(false);
    }

    // harcoded dropdown
    const clientProperty = [1, 2, 3, 4];

    const client = [1, 2, 3, 4];


    const handleAddClientReceipt = () => {
        console.log(formValues)
        if (!validate()) {
            console.log('hu')
            return;
        }
        SetIsOrderReceiptDialogue(false);
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
        if (!formValues.receiptMode) {
            setFormErrors((existing) => {
                return { ...existing, receiptMode: "Select Receipt Mode" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, receiptMode: "" }
            })
        }
        if (!formValues.receivedBy) {
            setFormErrors((existing) => {
                return { ...existing, receivedBy: "Select Received By" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, receivedBy: "" }
            })
        }
        if (!formValues.receivedDate) {
            setFormErrors((existing) => {
                return { ...existing, receivedDate: "Select Received Date" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, receivedDate: "" }
            })
        }
        if (!formValues.amountReceived) {
            setFormErrors((existing) => {
                return { ...existing, amountReceived: "Enter Amount Received" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, amountReceived: "" }
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
            "rows": [
                "clientname",
                "briefdescription",
                "clientproperty",
                "amount",
                "recddate",
                "paymentmodename",
                "receivedbyname",
                "createdbyname",
                "id",
            ],
            "filters": [],
            "sort_by": ["id"],
            "order": "desc",
            "pg_no": 0,
            "pg_size": 0
        };
        const response = await APIService.getOrderReceipt(data);
        const temp = await response.json();
        const result = temp.data;
        const worksheet = XLSX.utils.json_to_sheet(result);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "OrderReceiptData.xlsx");
        FileSaver.saveAs(workbook, "demo.xlsx");
    }
    const handleSearch = async () => {
        // console.log("clicked")
        setPageLoading(true);
        setCurrentPage(1)
        setCurrentPages(15);
        setIsSearchOn(true);
        const data = {
            "user_id": 1234,
            "rows": [
                "id",
                "receivedby",
                "receivedbyname",
                "amount",
                "tds",
                "recddate",
                "paymentmode",
                "paymentmodename",
                "orderid",
                "briefdescription",
                "dated",
                "createdby",
                "isdeleted",
                "createdon",
                "entityid",
                "entity",
                "officeid",
                "office",
                "clientname",
                "clientid",
                "createdbyname",
                "clientproperty",
                "clientpropertyid"
            ],
            "filters": [],
            "sort_by": ["id"],
            "order": "desc",
            "pg_no": 1,
            "pg_size": 15,
            "search_key": searchInput
        };
        const response = await APIService.getOrderReceipt(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingOrderReceipt(result);
        setPageLoading(false);
    }
    const handleCloseSearch = async () => {
        setIsSearchOn(false);
        setPageLoading(true);
        setSearchInput("");
        const data = {
            "user_id": 1234,
            "rows": [
                "id",
                "receivedby",
                "receivedbyname",
                "amount",
                "tds",
                "recddate",
                "paymentmode",
                "paymentmodename",
                "orderid",
                "briefdescription",
                "dated",
                "createdby",
                "isdeleted",
                "createdon",
                "entityid",
                "entity",
                "officeid",
                "office",
                "clientname",
                "clientid",
                "createdbyname",
                "clientproperty",
                "clientpropertyid"
            ],
            "filters": [],
            "sort_by": ["id"],
            "order": "desc",
            "pg_no": 1,
            "pg_size": 15,
            "search_key": ""
        };
        const response = await APIService.getOrderReceipt(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingOrderReceipt(result);
        setPageLoading(false);
    }
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [currOrderReceipt, setCurrOrderReceipt] = useState("");
    const handleDelete = (id) => {
        setCurrOrderReceipt(id);
        setShowDeleteModal(true)
    }
    const deletePma = async (id) => {
        const data = {
            "user_id": 1234,
            "id": id
        }
        const response = await APIService.deleteOrderReceipt(data)
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
        setIsEditDialogue(false);
        setShowEditSuccess(true);
        setTimeout(function () {
            setShowEditSuccess(false);
        }, 2000)
        fetchData();
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
        clientproperty: {
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
        receivedbyname: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        paymentmodename: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        recddate: {
            filterType: "",
            filterValue: null,
            filterData: "Date",
            filterInput: ""
        },
        createdbyname: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        id : {
            filterType : "",
            filterValue : null,
            filterData : "Numeric",
            filterInput : ""
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
            "rows": [
                "id",
                "receivedby",
                "receivedbyname",
                "amount",
                "tds",
                "recddate",
                "paymentmode",
                "paymentmodename",
                "orderid",
                "briefdescription",
                "dated",
                "createdby",
                "isdeleted",
                "createdon",
                "entityid",
                "entity",
                "officeid",
                "office",
                "clientname",
                "clientid",
                "createdbyname",
                "clientproperty",
                "clientpropertyid"
            ],
            "filters": tempArray,
            "sort_by": ["id"],
            "order": "desc",
            "pg_no": Number(currentPage),
            "pg_size": Number(currentPages),
            "search_key": isSearchOn ? searchInput : ""
        };
        const response = await APIService.getOrderReceipt(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingOrderReceipt(result);
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
        const data = {
            "user_id": 1234,
            "rows": [
                "id",
                "receivedby",
                "receivedbyname",
                "amount",
                "tds",
                "recddate",
                "paymentmode",
                "paymentmodename",
                "orderid",
                "briefdescription",
                "dated",
                "createdby",
                "isdeleted",
                "createdon",
                "entityid",
                "entity",
                "officeid",
                "office",
                "clientname",
                "clientid",
                "createdbyname",
                "clientproperty",
                "clientpropertyid"
            ],
            "filters": tempArray,
            "sort_by": [field],
            "order": flag ? "asc" : "desc",
            "pg_no": Number(currentPage),
            "pg_size": Number(currentPages),
            "search_key": isSearchOn ? searchInput : ""
        };
        setFlag((prev) => !prev);
        const response = await APIService.getOrderReceipt(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingOrderReceipt(result);
        setPageLoading(false);
    }
    return (
        <div className='h-screen'>
            <Navbar />
            {/* {isEditDialogue && <EditManageEmployee isOpen={isEditDialogue} handleClose={() => setIsEditDialogue(false)} item={currItem} showSuccess={openEditSuccess} />} */}
            {showEditModal && <EditPmaAgreement handleClose={() => { setShowEditModal(false) }} currOrderReceipt={currOrderReceipt} clientPropertyData={clientPropertyData} showSuccess={openEditSuccess} />}
            {showAddSuccess && <SucessfullModal isOpen={showAddSuccess} message="successfully Added Order Receipt" />}
            {showDeleteSuccess && <SucessfullModal isOpen={showDeleteSuccess} message="Successfully Deleted Order Receipt" />}
            {showEditSuccess && <SucessfullModal isOpen={showEditSuccess} message="successfully Updated Order Receipt" />}
            {/* {openAddConfirmation && <SaveConfirmationEmployee handleClose={() => setOpenAddConfirmation(false)} currEmployee={formValues.employeeName} addEmployee={addEmployee} />} */}
            {openAddConfirmation && <SaveConfirmationPmaAgreement addOrderReceipt={addOrderReceipt} handleClose={() => setOpenAddConfirmation(false)} />}
            {isFailureModal && <FailureModal isOpen={isFailureModal} message={errorMessage} />}

            {showDeleteModal && <DeletePmaAgreement handleClose={() => setShowDeleteModal(false)} item={currOrderReceipt} handleDelete={deletePma} />}
            <div className='h-[calc(100vh_-_7rem)] w-full  px-10'>
                <div className='h-16 w-full  flex justify-between items-center p-2  border-gray-300 border-b-2'>
                    <div className='flex items-center space-x-3'>
                        <div className='rounded-2xl  bg-[#EBEBEB] h-8 w-8 flex justify-center items-center '>
                            <img className='w-5 h-5' src={backLink} />
                        </div>

                        <div className='flex-col'>
                            <h1 className='text-[18px]'>Manage Order Reciept </h1>
                            <p className='text-[14px]'>Manage &gt; Manage Order Reciept</p>
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
                                    Add New Order Receipt
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
                        <div className='w-[13%] px-3 py-2  '>
                            <div className="w-[80%] flex items-center bg-[#EBEBEB] rounded-md">
                                <input className="w-[75%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={clientNameFilterInput} onChange={(e) => setClientNameFilterInput(e.target.value)} />
                                <button className='w-[25%] px-1 py-2' onClick={() => { setClientNameFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                            </div>
                            {clientNameFilter && <CharacterFilter inputVariable={clientNameFilterInput} setInputVariable={setClientNameFilterInput} handleFilter={newHandleFilter} filterColumn='clientname' menuRef={menuRef} />}
                        </div>
                        <div className='w-[15%]  px-3 py-2 '>
                            <div className="w-[75%] flex items-center bg-[#EBEBEB] rounded-md">
                                <input className="w-[75%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={orderDescriptionFilterInput} onChange={(e) => setOrderDescriptionFilterInput(e.target.value)} />
                                <button className='w-[25%] px-1 py-2' onClick={() => { setOrderDescriptionFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                            </div>
                            {orderDescriptionFilter && <CharacterFilter inputVariable={orderDescriptionFilterInput} setInputVariable={setOrderDescriptionFilterInput} handleFilter={newHandleFilter} filterColumn='briefdescription' menuRef={menuRef} />}

                        </div>
                        <div className='w-[16%] px-3 py-2 '>
                            <div className="w-[70%] flex items-center bg-[#EBEBEB] rounded-md">
                                <input className="w-[75%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={propertyFilterInput} onChange={(e) => setPropertyFilterInput(e.target.value)} />
                                <button className='w-[25%] px-1 py-2' onClick={() => { setPropertyFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                            </div>
                            {propertyFilter && <CharacterFilter inputVariable={propertyFilterInput} setInputVariable={setPropertyFilterInput} handleFilter={newHandleFilter} filterColumn='clientproperty' menuRef={menuRef} />}
                        </div>

                        <div className='w-[8%] px-3 py-2 '>
                            <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                <input className="w-[65%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={amountFilterInput} onChange={(e) => setAmountFilterInput(e.target.value)} />
                                <button className='w-[35%] px-1 py-2' onClick={() => { setAmountFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                            </div>
                            {amountFilter && <NumericFilter columnName='amount' inputVariable={amountFilterInput} setInputVariable={setAmountFilterInput} handleFilter={newHandleFilter} menuRef={menuRef} />}
                        </div>
                        <div className='w-[10%] px-3 py-2 '>
                            <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                <input className="w-[68%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={receivedDateFilterInput} onChange={(e) => setReceivedDateFilterInput(e.target.value)} type='date' />
                                <button className='w-[32%] px-1 py-2' onClick={() => { setReceivedDateFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                            </div>
                            {receivedDateFilter && <DateFilter inputVariable={receivedDateFilterInput} setInputVariable={setReceivedDateFilterInput} handleFilter={newHandleFilter} columnName='recddate' menuRef={menuRef} />}
                        </div>
                        <div className='w-[10%] px-3 py-2'>
                            <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                <input className="w-[70%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={receiptModeFilterInput} onChange={(e) => setReceiptModeFilterInput(e.target.value)} />
                                <button className='w-[30%] px-1 py-2' onClick={() => { setReceiptModeFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                            </div>
                            {receiptModeFilter && <CharacterFilter inputVariable={receiptModeFilterInput} setInputVariable={setReceiptModeFilterInput} handleFilter={newHandleFilter} filterColumn='paymentmodename' menuRef={menuRef} />}
                        </div>
                        <div className='w-[12%] px-3 py-2 '>
                            <div className="w-[85%] flex items-center bg-[#EBEBEB] rounded-md">
                                <input className="w-[75%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={receivedByFilterInput} onChange={(e) => setReceivedByFilterInput(e.target.value)} />
                                <button className='w-[25%] px-1 py-2' onClick={() => { setReceivedByFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                            </div>
                            {receivedByFilter && <CharacterFilter inputVariable={receivedByFilterInput} setInputVariable={setReceivedByFilterInput} handleFilter={newHandleFilter} filterColumn='receivedbyname' menuRef={menuRef} />}
                        </div>
                        <div className='w-[12%] px-3 py-2  '>
                            <div className="w-[70] flex items-center bg-[#EBEBEB] rounded-md">
                                <input className="w-[75%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={createdByFilterInput} onChange={(e) => setCreatedByFilterInput(e.target.value)} />
                                <button className='w-[25%] px-1 py-2' onClick={() => { setCreatedByFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                            </div>
                            {createdByFilter && <CharacterFilter inputVariable={createdByFilterInput} setInputVariable={setCreatedByFilterInput} handleFilter={newHandleFilter} filterColumn='createdbyname' menuRef={menuRef} />}
                        </div>
                    </div>
                    <div className="w-[10%] flex">

                        <div className='w-[65%] px-3 py-2 '>
                            <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                <input className="w-[55%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" value={idFilterInput} onChange={(e) => setIdFilterInput(Number(e.target.value))} />
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
                            <div className='w-[13%]  flex'>
                                <div className='px-3 py-5'>
                                    <p>Client Name <button onClick={() => handleSort('clientname')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[15%]  flex'>
                                <div className='px-3 py-5'>
                                    <p>Order Description <button onClick={() => handleSort('briefdescription')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[16%]  flex '>
                                <div className='px-3 py-5'>
                                    <p>Property <button onClick={() => handleSort('clientproperty')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[8%]  flex'>
                                <div className='px-3 py-5'>
                                    <p>Amount <button onClick={() => handleSort('amount')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[10%]  flex'>
                                <div className='p-3'>
                                    <p>Received</p>
                                    <p>Date</p>
                                </div>
                                <button onClick={() => handleSort('recddate')}><span className="font-extrabold">↑↓</span></button>
                            </div>
                            <div className='w-[10%]  flex'>
                                <div className='p-3'>
                                    <p>Receipt</p>
                                    <p>Mode</p>
                                </div>
                                <button onClick={() => handleSort('paymentmodename')}><span className="font-extrabold">↑↓</span></button>
                            </div>
                            <div className='w-[12%]  flex'>
                                <div className='p-3'>
                                    <p>Received </p>
                                    <p>By</p>
                                </div>
                                <button onClick={() => handleSort('receivedbyname')}><span className="font-extrabold">↑↓</span></button>
                            </div>
                            <div className='w-[12%]  flex'>
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
                        {!pageLoading && existingOrderReceipt.map((item, index) => {
                            return <div className='w-full h-auto bg-white flex justify-between border-gray-400 border-b-[1px]'>
                                <div className="w-[90%] flex">
                                    <div className='w-[4%] flex'>
                                        <div className='px-3 py-5'>
                                            <p>{index + 1 + (currentPage - 1) * currentPages}</p>
                                        </div>
                                    </div>
                                    <div className='w-[13%]  flex'>
                                        <div className='px-3 py-5'>
                                            <p>{item.clientname}</p>
                                        </div>
                                    </div>
                                    <div className='w-[15%]  flex'>
                                        <div className='px-3 py-5'>
                                            <p>{item.briefdescription}</p>
                                        </div>
                                    </div>
                                    <div className='w-[16%]  flex '>
                                        <div className='px-3 py-5'>
                                            <p>{item.clientproperty}</p>
                                        </div>
                                    </div>
                                    <div className='w-[8%]  flex'>
                                        <div className='px-3 py-5'>
                                            <p>{item.amount}</p>
                                        </div>
                                    </div>
                                    <div className='w-[10%]  flex'>
                                        <div className='px-3 py-5'>
                                            <p>{item.recddate}</p>
                                        </div>
                                    </div>
                                    <div className='w-[10%]  flex'>
                                        <div className='px-3 py-5'>
                                            <p>{item.paymentmodename}</p>
                                        </div>
                                    </div>
                                    <div className='w-[12%]  flex'>
                                        <div className='px-3 py-5'>
                                            <p>{item.receivedbyname}</p>
                                        </div>
                                    </div>
                                    <div className='w-[12%]  flex'>
                                        <div className='px-3 py-5'>
                                            <p>{item.createdbyname}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[10%] flex">
                                    <div className='w-1/2  flex'>
                                        <div className='px-3 py-5'>
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

            <Modal open={isOrderReceiptDialogue}
                fullWidth={true}
                maxWidth={'md'}
                className='flex justify-center items-center'
            >
                <div className='flex justify-center'>
                    <div className="w-[1050px] h-auto bg-white rounded-lg">
                        <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-t-lg">
                            <div className="mr-[410px] ml-[410px]">
                                <div className="text-[16px]">New Order Receipt</div>
                            </div>
                            <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                                <button onClick={handleClose}><img onClick={handleClose} className="w-[20px] h-[20px]" src={Cross} alt="cross" /></button>
                            </div>
                        </div>

                        <div className="h-auto w-full mt-[5px]">
                            <div className="flex gap-[48px] justify-center ">
                                <div className=" space-y-3 py-5">
                                    <div className="">
                                        <div className="text-sm text-[#787878]">Cura Office </div>
                                        <div className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs py-0.5 bg-[#F5F5F5]" type="text" name="curaoffice" value={formValues.curaoffice} onChange={handleChange} >Pune</div>
                                    </div>
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
                                        <div className="text-sm">
                                            Receipt Mode <label className="text-red-500">*</label>
                                        </div>
                                        <select
                                            className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs"
                                            name="receiptMode"
                                            value={formValues.receiptMode}
                                            onChange={handleChange}
                                        >
                                            {modesData.map((item) => (
                                                <option key={item[0]} value={item[0]}>
                                                    {item[1]}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.receiptMode}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-sm">
                                            Received By <label className="text-red-500">*</label>
                                        </div>
                                        <select
                                            className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs"
                                            name="receivedBy"
                                            value={formValues.receivedBy}
                                            onChange={handleChange}
                                        >
                                            {/* <option value="none" hidden >Select Received By</option> */}
                                            {usersData.map((item) => (
                                                <option key={item.id} value={item.id}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.receivedBy}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">TDS </div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="TDS" value={formValues.TDS} onChange={handleChange} />
                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">Receipt Description </div>
                                        <textarea className="w-[230px] h-[70px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="receiptDescription" value={formValues.receiptDescription} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className=" space-y-3 py-5">
                                    <div className="">
                                        <div className="text-sm text-[#787878]">Receipt ID </div>
                                        <div className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs py-0.5 bg-[#F5F5F5]" type="text" name="curaoffice" value={formValues.curaoffice} onChange={handleChange} ></div>
                                    </div>
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
                                        <div className="text-[13px]">Received Date </div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="date" name="receivedDate" value={formValues.receivedDate} onChange={handleChange} />
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.receivedDate}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-sm">Amount Recived <label className="text-red-500">*</label></div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs" type="text" name="amountReceived" value={formValues.amountReceived} onChange={handleChange} />
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.amountReceived}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-sm text-[#787878]">Pending Amount </div>
                                        <div className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs py-0.5 bg-[#F5F5F5]" type="text" name="curaoffice" value={formValues.curaoffice} onChange={handleChange} ></div>
                                    </div>
                                    <div className="">
                                        <div className="text-sm text-[#787878]">Order Date </div>
                                        <div className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs py-0.5 bg-[#F5F5F5]" type="text" name="curaoffice" value={formValues.curaoffice} onChange={handleChange} ></div>
                                    </div>
                                    <div className="">
                                        <div className="text-sm text-[#787878]">Order Status </div>
                                        <div className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs py-0.5 bg-[#F5F5F5]" type="text" name="curaoffice" value={formValues.curaoffice} onChange={handleChange} ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="my-3 flex justify-center items-center gap-[10px]">
                            <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' onClick={handleAddClientReceipt} >Add</button>
                            <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleClose}>Cancel</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ManageOrderReceipt;
