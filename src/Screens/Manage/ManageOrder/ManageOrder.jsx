import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import backLink from "../../../assets/back.png";
import searchIcon from "../../../assets/searchIcon.png";
import nextIcon from "../../../assets/next.png";
import refreshIcon from "../../../assets/refresh.png";
import downloadIcon from "../../../assets/download.png";
import { useState, useEffect, useRef } from 'react';
import Navbar from "../../../Components/Navabar/Navbar";
import Cross from "../../../assets/cross.png";
import Add from "./../../../assets/add.png";
import Pdf from "../../../assets/pdf.png";
import Excel from "../../../assets/excel.png"
import Filter from "../../../assets/filter.png"
import { Modal } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import { CircularProgress, Pagination, LinearProgress, Backdrop } from "@mui/material";
import { APIService } from '../../../services/API';
import Edit from "../../../assets/edit.png"
import Trash from "../../../assets/trash.png";
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
import OrderInformation from './Dialog/OrderInformation';
import Photos from './Dialog/Photos';
import OrderStatusHistory from './Dialog/OrderStatusHistory';
import CharacterFilter from "../../../Components/Filters/CharacterFilter"
import DateFilter from '../../../Components/Filters/DateFilter';
import NumericFilter from '../../../Components/Filters/NumericFilter';
import SucessfullModal from "../../../Components/modals/SucessfullModal";
import CancelModel from './../../../Components/modals/CancelModel';
import SaveConfirmationOrder from './SaveConfirmationOrder';
import DeleteOrder from './DeleteOrderModal';
import EditOrderModal from './EditOrderModal';
import Draggable from 'react-draggable';
import { formatDate } from '../../../utils/formatDate';
const env_URL_SERVER = import.meta.env.VITE_ENV_URL_SERVER
import ActiveFilter from "../../../assets/active_filter.png";
import AddButton from '../../../Components/common/CustomButton';
import EditButton from '../../../Components/common/buttons/EditButton';
import DeleteButton from '../../../Components/common/buttons/deleteButton';
import { userId } from '../../../utils/axios';
const ManageOrder = () => {
    // we have the module here
    const menuRef = useRef();
    const navigate = useNavigate()
    const { state , pathname} = useLocation()
    console.log(pathname)
    console.log(state)
    const [existingOrder, setExistingOrder] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPages, setCurrentPages] = useState(15);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedDialog, setSelectedDialogue] = useState(1);
    const [pageLoading, setPageLoading] = useState(false);
    const [downloadModal, setDownloadModal] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [isSearchOn, setIsSearchOn] = useState(false);
    const [stateArray, setStateArray] = useState([]);
    const [sortField, setSortField] = useState("id");
    const handlePageChange = (event, value) => {

        setCurrentPage(value)
        fetchPageData(value);
    }

    const [flag, setFlag] = useState(false)

    const fetchData = async () => {
        console.log('ugm')
        const tempArray = [];
        // we need to query thru the object
        // console.log(filterMapState);
        // console.log(filterMapState)
        Object.keys(filterMapState).forEach(key => {
            if (filterMapState[key].filterType != "") {
                tempArray.push([key, filterMapState[key].filterType, filterMapState[key].filterValue, filterMapState[key].filterData]);
            }
        })
        setStateArray(tempArray)
        setPageLoading(true);
        const data = {
            "rows": [
                "id",
                "clientid",
                "clientname",
                "orderdate",
                "earlieststartdate",
                "expectedcompletiondate",
                "actualcompletiondate",
                "owner",
                "ownername",
                "comments",
                "status",
                "orderstatus",
                "briefdescription",
                "additionalcomments",
                "service",
                "servicename",
                "clientpropertyid",
                "clientproperty",
                "vendorid",
                "vendorname",
                "assignedtooffice",
                "officename",
                "dated",
                "createdby",
                "isdeleted",
                "entityid",
                "entity",
                "tallyledgerid",
                "ageing",
                "createdbyname"
            ],
            "filters": tempArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": Number(currentPage),
            "pg_size": Number(currentPages),
            "search_key": searchInput
        }
            ;
        const response = await APIService.getOrder(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingOrder(result);
        setPageLoading(false);
    }
    const fetchPageData = async (pageNumber) => {
        setPageLoading(true);
        setCurrentPage(pageNumber)
        const data = {
            "rows": [
                "id",
                "clientid",
                "clientname",
                "orderdate",
                "earlieststartdate",
                "expectedcompletiondate",
                "actualcompletiondate",
                "owner",
                "ownername",
                "comments",
                "status",
                "orderstatus",
                "briefdescription",
                "additionalcomments",
                "service",
                "servicename",
                "clientpropertyid",
                "clientproperty",
                "vendorid",
                "vendorname",
                "assignedtooffice",
                "officename",
                "dated",
                "createdby",
                "isdeleted",
                "entityid",
                "entity",
                "tallyledgerid",
                "ageing",
                "createdbyname"
            ],
            "filters": stateArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": Number(pageNumber),
            "pg_size": Number(currentPages),
            "search_key": searchInput
        }
        const response = await APIService.getOrder(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingOrder(result);
        setPageLoading(false);
    }
    const fetchQuantityData = async (quantity) => {
        setPageLoading(true);
        setCurrentPage((prev) => 1)
        const data = {
            "rows": [
                "id",
                "clientid",
                "clientname",
                "orderdate",
                "earlieststartdate",
                "expectedcompletiondate",
                "actualcompletiondate",
                "owner",
                "ownername",
                "comments",
                "status",
                "orderstatus",
                "briefdescription",
                "additionalcomments",
                "service",
                "servicename",
                "clientpropertyid",
                "clientproperty",
                "vendorid",
                "vendorname",
                "assignedtooffice",
                "officename",
                "dated",
                "createdby",
                "isdeleted",
                "entityid",
                "entity",
                "tallyledgerid",
                "ageing",
                "createdbyname"
            ],
            "filters": stateArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(quantity),
            "search_key": searchInput
        }
            ;
        const response = await APIService.getOrder(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingOrder(result);
        setPageLoading(false);
    }

    useEffect(() => {
        const temp = {...formValues}
        const ex = temp.order_info 
        ex.clientname = state?.clientname 
        ex.clientid = state?.clientid 
        temp.order_info = ex 
        setFormValues(temp)
        fetchData();
        fetchUsersData()
        fetchOrderStatusData()
        fetchClientPropertyData()
        fetchServiceData()
        fetchVendorData()
        fetchTallyLedgerData()
        const handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setClientNameFilter(false);
                setAssignedToFilter(false);
                setOrderDescriptionFilter(false);
                setPropertyDescriptionFilter(false);
                setServiceFilter(false);
                setOrderStatusFilter(false);
                setStartDateFilter(false);
                setCompletionDateFilter(false);
                setOrderDateFilter(false);
                setAgingFilter(false);
                setCreatedByFilter(false);
                setIdFilter(false);
            }
        }

        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);
    const initialValues = {
        "order_info": {
            "clientid": null,
            "briefdescription": null,
            "orderdate": null,
            "earlieststartdate": null,
            "expectedcompletiondate": null,
            "actualcompletiondate": null,
            "owner": userId,
            "comments": null,
            "additionalcomments": null,
            "status": null,
            "service": null,
            "clientpropertyid": null,
            "vendorid": null,
            "assignedtooffice": 1,
            "entityid": 1,
            "tallyledgerid": null,
            "clientname": "Select Client",
        },
        "order_photos": [

        ],
        "order_status_change": [{
            "orderid": 435231,
            "statusid": 1,
            "timestamp": "2024-01-01 10:00:00"
        }]
    }
    const [formErrors, setFormErrors] = useState({});
    const validate = () => {
        var res = true
        if (formValues.order_info.owner === "" || formValues.order_info.owner === null) {
            res = false
            setFormErrors((existing) => ({
                ...existing,
                owner: "Select Assigned To"
            }))
            console.log('he')

        } else {
            setFormErrors((existing) => ({
                ...existing,
                owner: ""
            }))
        }

        if (formValues.order_info.status === "" || formValues.order_info.status === null) {
            res = false
            setFormErrors((existing) => ({
                ...existing,
                status: "Select Status"
            }))

        } else {
            setFormErrors((existing) => ({
                ...existing,
                status: ""
            }))
        }

        if (formValues.order_info.service === "" || formValues.order_info.service === null) {
            res = false
            setFormErrors((existing) => ({
                ...existing,
                service: "Select Service"
            }))

        } else {
            setFormErrors((existing) => ({
                ...existing,
                service: ""
            }))
        }

        if (formValues.order_info.clientid === "" || formValues.order_info.clientid === null) {
            res = false
            setFormErrors((existing) => ({
                ...existing,
                clientid: "Select Client"
            }))

        } else {
            setFormErrors((existing) => ({
                ...existing,
                clientid: ""
            }))
        }

        if (formValues.order_info.briefdescription === "" || formValues.order_info.briefdescription === null) {
            res = false
            setFormErrors((existing) => ({
                ...existing,
                briefdescription: "Enter Order Description"
            }))

        } else {
            setFormErrors((existing) => ({
                ...existing,
                briefdescription: ""
            }))
        }


        return res;
    }
    const [formValues, setFormValues] = useState(initialValues)
    const [currOrderName, setCurrOrderName] = useState(-1);
    const handleAddOrder = () => {
        console.log(formErrors);
        if (!validate()) {
            setSelectedDialogue(1);
            return
        }
        setIsStateDialogue(false)
        setShowAddConfirmation(true)

    }
    const addOrder = async () => {
        console.log(formValues)
        const data = {
            "order_info": {
                "clientid": Number(formValues.order_info.clientid),
                "briefdescription": formValues.order_info.briefdescription,
                "orderdate": formValues.order_info.orderdate,
                "earlieststartdate": formValues.order_info.earlieststartdate,
                "expectedcompletiondate": formValues.order_info.expectedcompletiondate,
                "actualcompletiondate": formValues.order_info.actualcompletiondate,
                "owner": Number(formValues.order_info.owner),
                "comments": formValues.order_info.comments,
                "additionalcomments": formValues.order_info.additionalcomments,
                "status": Number(formValues.order_info.status),
                "service": Number(formValues.order_info.service),
                "clientpropertyid": Number(formValues.order_info.clientpropertyid),
                "vendorid": Number(formValues.order_info.vendorid),
                "assignedtooffice": 1,
                "entityid": 1,
                "tallyledgerid": Number(formValues.order_info.tallyledgerid)
            },
            "order_photos": formValues.order_photos
        }
        const d = {
            "orderid": currOrderId,
            "statusid": Number(formValues.order_info.status)
        }
        const statusresponse = await APIService.addOrderStatusChange(d);
        const statusres = await statusresponse.json();
        // console.log(res)
        const response = await APIService.addOrder(data);
        const res = await response.json();
        if (res.result == 'success') {
            const d = {
                "orderid": res.data['inserted data'],
                "statusid": Number(formValues.order_info.status)
            }
            const statusresponse = await APIService.addOrderStatusChange(d);
            const statusres = await statusresponse.json();
            // we need to open add success
            setShowAddConfirmation(false);
            setFormValues(initialValues);
            openAddSuccess();
        } else {
            // we need to open failure modal

        }
        // we get the success prompt

    }
    const handleEdit = (id) => {
        // we need to open the edit modal
        // setCurrPma(id)
        setCurrOrderId(id)
        setShowEditModal(true)
        // setShowEditModal(true);
    }
    const [currOrderId, setCurrOrderId] = useState(-1)
    const handleDelete = (id) => {
        // setCurrPma(id);
        setCurrOrderId(id)
        setShowDeleteModal(true)
    }
    const deleteOrder = async (id) => {
        const data = {
            "order_id": id
        }
        const response = await APIService.deleteOrders(data)
        const res = await response.json()
        if (res.result == 'success') {
            setShowDeleteModal(false)
            openDeleteSuccess();
        }
    }

    const [backDropLoading, setBackDropLoading] = useState(false)
    const handleDownload = async (type) => {
        setBackDropLoading(true);
        console.log('ugm')
        const data = {
            "rows": [
                "clientname",
                "ownername",
                "briefdescription",
                "clientproperty",
                "servicename",
                "orderstatus",
                "earlieststartdate",
                "expectedcompletiondate",
                "orderdate",
                "ageing",
                "createdbyname",
                "id",
                // "clientid",
                // "actualcompletiondate",
                // "owner",
                // "comments",
                // "status",
                // "additionalcomments",
                // "service",
                // "clientpropertyid",
                // "vendorid",
                // "vendorname",
                // "assignedtooffice",
                // "officename",
                // "dated",
                // "createdby",
                // "isdeleted",
                // "entityid",
                // "entity",
                // "tallyledgerid",
            ],
            "filters": stateArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 0,
            "pg_size": 0,
            "search_key": searchInput,
            "downloadType": type,
            "routename" : '/manage/manageOrder',
            "colmap": {
                "clientname": "Client Name",
                "ownername": "Assigned To",
                "briefdescription": "Order Description",
                "clientproperty": "Property Description",
                "servicename": "Service",
                "orderstatus": "Order Status",
                "earlieststartdate": "Start Date",
                "expectedcompletiondate": "Completion Date",
                "orderdate": "Order Date",
                "ageing": "Ageing",
                "createdbyname": "Created By",
                "id": "ID",
            }
        }

        const response = await APIService.getOrder(data);
        const temp = await response.json();
        const result = temp.data;
        if (temp.result == "success") {
            const d = {
                "filename": temp.filename,
                "user_id": 1234
            }
            APIService.download(d,temp.filename).then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.blob();
                })
                .then(result => {
                    if (type == "excel") {
                        FileSaver.saveAs(result, 'OrderData.xlsx');
                    } else if (type == "pdf") {
                        FileSaver.saveAs(result, 'OrderData.pdf');
                    }

                    console.log('Success:', result);
                })
                .catch(error => {
                    console.error('Error:', error);
                });

            setTimeout(() => {
                setBackDropLoading(false)
            }, 1000)
        }
    }

    const handleSearch = async () => {
        // console.log("clicked")
        setPageLoading(true);
        setCurrentPage(1);
        setIsSearchOn(true);
        const data = {
            "rows": [
                "id",
                "clientid",
                "clientname",
                "orderdate",
                "earlieststartdate",
                "expectedcompletiondate",
                "actualcompletiondate",
                "owner",
                "ownername",
                "comments",
                "status",
                "orderstatus",
                "briefdescription",
                "additionalcomments",
                "service",
                "servicename",
                "clientpropertyid",
                "clientproperty",
                "vendorid",
                "vendorname",
                "assignedtooffice",
                "officename",
                "dated",
                "createdby",
                "isdeleted",
                "entityid",
                "entity",
                "tallyledgerid",
                "ageing",
                "createdbyname"
            ],
            "filters": stateArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": searchInput
        };
        const response = await APIService.getOrder(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingOrder(result);
        setPageLoading(false);
    }
    const handleCloseSearch = async () => {
        setIsSearchOn(false);
        setPageLoading(true);
        setCurrentPage(1);
        setSearchInput("");
        const data = {
            
            "rows": [
                "id",
                "clientid",
                "clientname",
                "orderdate",
                "earlieststartdate",
                "expectedcompletiondate",
                "actualcompletiondate",
                "owner",
                "ownername",
                "comments",
                "status",
                "orderstatus",
                "briefdescription",
                "additionalcomments",
                "service",
                "servicename",
                "clientpropertyid",
                "clientproperty",
                "vendorid",
                "vendorname",
                "assignedtooffice",
                "officename",
                "dated",
                "createdby",
                "isdeleted",
                "entityid",
                "entity",
                "tallyledgerid",
                "ageing",
                "createdbyname"
            ],
            "filters": stateArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": ""
        };
        const response = await APIService.getOrder(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingOrder(result);
        setPageLoading(false);
    }

    // const [sortField, setSortField] = useState("id");

    const [clientNameFilter, setClientNameFilter] = useState(false);
    const [clientNameFilterInput, setClientNameFilterInput] = useState("");
    const [assignedToFilter, setAssignedToFilter] = useState(false);
    const [assignedToFilterInput, setAssignedToFilterInput] = useState("");
    const [orderDescriptionFilter, setOrderDescriptionFilter] = useState(false);
    const [orderDescriptionFilterInput, setOrderDescriptionFilterInput] = useState("");
    const [propertyDescriptionFilter, setPropertyDescriptionFilter] = useState(false);
    const [propertyDescriptionFilterInput, setPropertyDescriptionFilterInput] = useState("");
    const [serviceFilter, setServiceFilter] = useState(false);
    const [serviceFilterInput, setServiceFilterInput] = useState("");
    const [orderStatusFilter, setOrderStatusFilter] = useState(false);
    const [orderStatusFilterInput, setOrderStatusFilterInput] = useState("");
    const [startDateFilter, setStartDateFilter] = useState(false);
    const [startDateFilterInput, setStartDateFilterInput] = useState("");
    const [completionDateFilter, setCompletionDateFilter] = useState(false);
    const [completionDateFilterInput, setCompletionDateFilterInput] = useState("");
    const [orderDateFilter, setOrderDateFilter] = useState(false);
    const [orderDateFilterInput, setOrderDateFilterInput] = useState("");
    const [agingFilter, setAgingFilter] = useState(false);
    const [agingFilterInput, setAgingFilterInput] = useState("");
    const [createdByFilter, setCreatedByFilter] = useState(false);
    const [createdByFilterInput, setCreatedByFilterInput] = useState("");
    const [idFilter, setIdFilter] = useState(false);
    const [idFilterInput, setIdFilterInput] = useState("");

    const filterMapping = {
        clientname: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        ownername: {
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
        servicename: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        orderstatus: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        earlieststartdate: {
            filterType: "",
            filterValue: null,
            filterData: "Date",
            filterInput: ""
        },
        expectedcompletiondate: {
            filterType: "",
            filterValue: null,
            filterData: "Date",
            filterInput: ""
        },
        orderdate: {
            filterType: "",
            filterValue: null,
            filterData: "Date",
            filterInput: ""
        },
        ageing: {
            filterType: "",
            filterValue: "",
            filterData: "Numeric",
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
        clientid: {
            filterType: state ? "equalTo" : "",
            filterValue: state?.clientid,
            filterData: "Numeric",
            filterInput: state?.clientid
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
        setClientNameFilter(false);
                setAssignedToFilter(false);
                setOrderDescriptionFilter(false);
                setPropertyDescriptionFilter(false);
                setServiceFilter(false);
                setOrderStatusFilter(false);
                setStartDateFilter(false);
                setCompletionDateFilter(false);
                setOrderDateFilter(false);
                setAgingFilter(false);
                setCreatedByFilter(false);
                setIdFilter(false);
        const tempArray = [];
        // we need to query thru the object
        // console.log(filterMapState);
        console.log(filterMapState)
        Object.keys(mapState).forEach(key => {
            if (mapState[key].filterType != "") {
                tempArray.push([key, mapState[key].filterType, mapState[key].filterValue, mapState[key].filterData]);
            }
        })
        setStateArray(tempArray)
        setCurrentPage((prev) => 1)
        setPageLoading(true);
        const data = {
            
            "rows": [
                "id",
                "clientid",
                "clientname",
                "orderdate",
                "earlieststartdate",
                "expectedcompletiondate",
                "actualcompletiondate",
                "owner",
                "ownername",
                "comments",
                "status",
                "orderstatus",
                "briefdescription",
                "additionalcomments",
                "service",
                "servicename",
                "clientpropertyid",
                "clientproperty",
                "vendorid",
                "vendorname",
                "assignedtooffice",
                "officename",
                "dated",
                "createdby",
                "isdeleted",
                "entityid",
                "entity",
                "tallyledgerid",
                "ageing",
                "createdbyname"
            ],
            "filters": tempArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": searchInput
        };
        const response = await APIService.getOrder(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingOrder(result);
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
        setFlag((prev) => !prev);
        const data = {
            
            "rows": [
                "id",
                "clientid",
                "clientname",
                "orderdate",
                "earlieststartdate",
                "expectedcompletiondate",
                "actualcompletiondate",
                "owner",
                "ownername",
                "comments",
                "status",
                "orderstatus",
                "briefdescription",
                "additionalcomments",
                "service",
                "servicename",
                "clientpropertyid",
                "clientproperty",
                "vendorid",
                "vendorname",
                "assignedtooffice",
                "officename",
                "dated",
                "createdby",
                "isdeleted",
                "entityid",
                "entity",
                "tallyledgerid",
                "ageing",
                "createdbyname"
            ],
            "filters": tempArray,
            "sort_by": [field],
            "order": !flag ? "asc" : "desc",
            "pg_no": Number(currentPage),
            "pg_size": Number(currentPages),
            "search_key": isSearchOn ? searchInput : ""
        };

        const response = await APIService.getOrder(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingOrder(result);
        setPageLoading(false);
    }

    const openDownload = () => {
        setDownloadModal(true);
    }

    const handleRefresh = () => {
        fetchData();
    }

    const selectFirst = () => {
        setSelectedDialogue(1);
    }

    const selectSecond = () => {
        setSelectedDialogue(2);
    }

    const selectThird = () => {
        setSelectedDialogue(3);
    }

    const [isStateDialogue, setIsStateDialogue] = React.useState(false);
    const handleOpen = () => {
        setIsStateDialogue(true);
    };
    const handleClose = () => {
        initials();
        setSelectedDialogue(1)
        openAddCancelModal();
        setIsStateDialogue(false);
    }
    const initials = () => {
        setOrderText('Select Client Property')
        setFormValues(initialValues);
        setFormErrors({});
    }
    const [showCancelModelAdd, setShowCancelModelAdd] = useState(false);
    const [showCancelModel, setShowCancelModel] = useState(false);
    const openAddCancelModal = () => {
        // set the state for true for some time
        setIsStateDialogue(false);
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
    const [showAddSuccess, setShowAddSuccess] = useState(false);
    const openAddSuccess = () => {
        setShowAddSuccess(true);
        setTimeout(function () {
            setShowAddSuccess(false);
            fetchData();
        }, 2000)
    }
    const [showDeleteSuccess, setShowDeleteSuccess] = useState(false)
    const openDeleteSuccess = () => {
        setShowDeleteSuccess(true);
        setTimeout(function () {
            setShowDeleteSuccess(false);
            fetchData();
        }, 2000)
    }
    const [showAddConfirmation, setShowAddConfirmation] = useState(false);







    // fetching all utility data
    const [usersData, setUsersData] = useState([])
    const fetchUsersData = async () => {
        const data = {
            "user_id": 1234
        }
        const response = await APIService.getUsers(data)
        const res = await response.json()
        setUsersData(res.data);
    }

    const [orderStatusData, setOrderStatusData] = useState([])
    const fetchOrderStatusData = async () => {
        const data = { "user_id": 1234 }
        const response = await APIService.getOrderStatusAdmin(data)
        const res = await response.json()
        console.log(res)
        setOrderStatusData(res.data)
    }
    const [clientPropertyData, setClientPropertyData] = useState([])
    const fetchClientPropertyData = async () => {
        const data = { "user_id": 1234 }
        const response = await APIService.getClientPropertyAdmin(data)
        const res = await response.json()
        console.log(res)
        setClientPropertyData(res.data)
    }
    const [serviceData, setServiceData] = useState([])
    const fetchServiceData = async () => {
        const data = { "user_id": 1234 }
        const response = await APIService.getServiceAdmin(data)
        const res = await response.json()
        console.log(res)
        setServiceData(res.data)
    }
    const [vendorData, setVendorData] = useState([])
    const fetchVendorData = async () => {
        const data = { "user_id": 1234 }
        const response = await APIService.getVendorAdmin(data)
        const res = await response.json()
        console.log(res)
        setVendorData(res.data)
    }
    const [tallyLedgerData, setTallyLedgerData] = useState([])
    const fetchTallyLedgerData = async () => {
        const data = { "user_id": 1234 }
        const response = await APIService.getTallyLedgerAdmin(data)
        const res = await response.json()
        console.log(res)
        setTallyLedgerData(res.data)
    }











    // finish all utiltiy data
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false);
    const [showEditSuccess, setShowEditSuccess] = useState(false);
    const openEditSuccess = () => {
        setShowEditModal(false)
        setShowEditSuccess(true);
        setTimeout(function () {
            setShowEditSuccess(false);
            fetchData();
        }, 2000)
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
    const [orderText,setOrderText] = useState('Select Client Property')
    return (
        <div className=" font-medium">
            {/* <Navbar/> */}
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={pageLoading}
                onClick={() => { }}
            >

                <CircularProgress color="inherit" />

            </Backdrop>
            {showAddSuccess && <SucessfullModal isOpen={showAddSuccess} message="New Order Created Successfully" />}
            {showEditSuccess && <SucessfullModal isOpen={showEditSuccess} message="Changes Saved Successfully" />}
            {showDeleteSuccess && <SucessfullModal isOpen={showDeleteSuccess} message=" Order Deleted Successfully" />}
            {showAddConfirmation && <SaveConfirmationOrder handleClose={() => setShowAddConfirmation(false)} addOrder={addOrder} showCancel={openAddCancelModal} setDefault={initials} />}
            {showDeleteModal && <DeleteOrder handleClose={() => setShowDeleteModal(false)} handleDelete={deleteOrder} item={currOrderId} showCancel={openCancelModal} />}
            {showEditModal && <EditOrderModal currOrderId={currOrderId} handleClose={() => setShowEditModal(false)} showSuccess={openEditSuccess} showCancel={openCancelModal} />}
            {showCancelModelAdd && <CancelModel isOpen={showCancelModelAdd} message="Process cancelled, no new Order created." />}
            {showCancelModel && <CancelModel isOpen={showCancelModel} message="Process cancelled, no changes saved." />}
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={backDropLoading}
                onClick={() => { }}
            >

                <CircularProgress color="inherit" />

            </Backdrop>

            <div className='h-[calc(100vh_-_123px)] w-full px-10'>
                <div className='h-16 w-full  flex justify-between items-center p-2  border-gray-300 border-b-2 '>
                    <div className='flex items-center space-x-3'>
                        <div className='rounded-2xl  bg-[#EBEBEB] h-8 w-8 flex justify-center items-center'>
                            <button onClick={() => navigate(-1)}><img className='h-5 w-5' src={backLink} /></button>
                        </div>

                        <div className='flex-col'>
                            <h1 className='text-[18px]'>Manage Order</h1>
                            <p className='text-[14px]'>Manage &gt; Manage Order</p>
                        </div>
                    </div>
                    <div className='flex space-x-2 items-center '>
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
                            {/* <button className="bg-[#004DD7] text-white h-[36px] w-[240px] rounded-lg" onClick={handleOpen}>
                                <div className="flex items-center justify-center gap-4">
                                    Add New Order
                                    <img className='h-[18px] w-[18px]' src={Add} alt="add" />
                                </div>
                            </button> */}
                            <AddButton title="Add New Order" onClick={handleOpen} />
                        </div>

                    </div>

                </div>

                {/* from here we need to divide the page into two parts */}

                <div className='h-[calc(100vh_-_11rem)] w-full text-[12px] flex mb-60'>
                    {/* this has everything */}
                    <div className='w-full h-full  overflow-x-auto overflow-y-hidden grid  grid-flow-row ordergrid relative'>
                        <div className='w-full h-12 bg-white grid grid-flow-col auto-cols-max '>
                            <div className='w-[40px] '>

                            </div>
                            <div className='w-[165px] px-4  py-2.5'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[72%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={clientNameFilterInput} onChange={(e) => setClientNameFilterInput(e.target.value)}

                                        onKeyDown={(event) => handleEnterToFilter(event, clientNameFilterInput,
                                            setClientNameFilterInput,
                                            'contains',
                                            'clientname')}

                                    />
                                    {filterMapState.clientname.filterType == "" ? <button className='w-[30%] px-1 py-2' onClick={() => setClientNameFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> : <button className='w-[30%] px-1 py-2' onClick={() => setClientNameFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>}

                                    {/* <button className='w-[28%] px-1 py-2' onClick={() => { setClientNameFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button> */}
                                </div>
                                {clientNameFilter && <CharacterFilter inputVariable={clientNameFilterInput} setInputVariable={setClientNameFilterInput} handleFilter={newHandleFilter} filterColumn='clientname' menuRef={menuRef} filterType={filterMapState.clientname.filterType} />}

                            </div>
                            <div className='w-[150px] px-4  py-2.5'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[72%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={assignedToFilterInput} onChange={(e) => setAssignedToFilterInput(e.target.value)}


                                        onKeyDown={(event) => handleEnterToFilter(event, assignedToFilterInput,
                                            setAssignedToFilterInput,
                                            'contains',
                                            'ownername')}


                                    />

                                    {filterMapState.ownername.filterType == "" ? <button className='w-[30%] px-1 py-2' onClick={() => setAssignedToFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> : <button className='w-[30%] px-1 py-2' onClick={() => setAssignedToFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>}
                                    {/* <button className='w-[28%] px-1 py-2' onClick={() => { setAssignedToFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button> */}
                                </div>
                                {assignedToFilter && <CharacterFilter inputVariable={assignedToFilterInput} setInputVariable={setAssignedToFilterInput} handleFilter={newHandleFilter} filterColumn='ownername' menuRef={menuRef} filterType={filterMapState.ownername.filterType} />}
                            </div>
                            <div className='w-[175px] px-4  py-2.5'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[72%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={orderDescriptionFilterInput} onChange={(e) => setOrderDescriptionFilterInput(e.target.value)}

                                        onKeyDown={(event) => handleEnterToFilter(event, orderDescriptionFilterInput,
                                            setOrderDescriptionFilterInput,
                                            'contains',
                                            'briefdescription')}

                                    />
                                    {filterMapState.briefdescription.filterType == "" ? <button className='w-[30%] px-1 py-2' onClick={() => setOrderDescriptionFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> : <button className='w-[30%] px-1 py-2' onClick={() => setOrderDescriptionFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>}
                                    {/* <button className='w-[28%] px-1 py-2' onClick={() => { setOrderDescriptionFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button> */}
                                </div>
                                {orderDescriptionFilter && <CharacterFilter inputVariable={orderDescriptionFilterInput} setInputVariable={setOrderDescriptionFilterInput} handleFilter={newHandleFilter} filterColumn='briefdescription' menuRef={menuRef} filterType={filterMapState.briefdescription.filterType} />}
                            </div>
                            <div className='w-[215px]  px-4 py-2.5'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[72%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={propertyDescriptionFilterInput} onChange={(e) => setPropertyDescriptionFilterInput(e.target.value)}
                                        onKeyDown={(event) => handleEnterToFilter(event, propertyDescriptionFilterInput,
                                            setPropertyDescriptionFilterInput,
                                            'contains',
                                            'clientproperty')}

                                    />
                                    {filterMapState.clientproperty.filterType == "" ? <button className='w-[30%] px-1 py-2' onClick={() => setPropertyDescriptionFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> : <button className='w-[30%] px-1 py-2' onClick={() => setPropertyDescriptionFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>}
                                    {/* <button className='w-[28%] px-1 py-2' onClick={() => { setPropertyDescriptionFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button> */}
                                </div>
                                {propertyDescriptionFilter && <CharacterFilter inputVariable={propertyDescriptionFilterInput} setInputVariable={setPropertyDescriptionFilterInput} handleFilter={newHandleFilter} filterColumn='clientproperty' menuRef={menuRef} filterType={filterMapState.clientproperty.filterType} />}
                            </div>
                            <div className='w-[150px] px-4  py-2.5'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[72%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={serviceFilterInput} onChange={(e) => setServiceFilterInput(e.target.value)}

                                        onKeyDown={(event) => handleEnterToFilter(event, serviceFilterInput,
                                            setServiceFilterInput,
                                            'contains',
                                            'servicename')}

                                    />
                                    {filterMapState.servicename.filterType == "" ? <button className='w-[30%] px-1 py-2' onClick={() => setServiceFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> : <button className='w-[30%] px-1 py-2' onClick={() => setServiceFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>}
                                    {/* <button className='w-[28%] px-1 py-2' onClick={() => { setServiceFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button> */}
                                </div>
                                {serviceFilter && <CharacterFilter inputVariable={serviceFilterInput} setInputVariable={setServiceFilterInput} handleFilter={newHandleFilter} filterColumn='servicename' menuRef={menuRef} filterType={filterMapState.servicename.filterType} />}
                            </div>
                            <div className='w-[130px] px-4  py-2.5'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[72%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={orderStatusFilterInput} onChange={(e) => setOrderStatusFilterInput(e.target.value)}

                                        onKeyDown={(event) => handleEnterToFilter(event, orderStatusFilterInput,
                                            setOrderStatusFilterInput,
                                            'contains',
                                            'orderstatus')}

                                    />
                                    {filterMapState.orderstatus.filterType == "" ? <button className='w-[30%] px-1 py-2' onClick={() => setOrderStatusFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> : <button className='w-[30%] px-1 py-2' onClick={() => setOrderStatusFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>}
                                    {/* <button className='w-[28%] px-1 py-2' onClick={() => { setOrderStatusFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button> */}
                                </div>
                                {orderStatusFilter && <CharacterFilter inputVariable={orderStatusFilterInput} setInputVariable={setOrderStatusFilterInput} handleFilter={newHandleFilter} filterColumn='orderstatus' menuRef={menuRef} filterType={filterMapState.orderstatus.filterType} />}
                            </div>
                            <div className='w-[120px] px-4  py-2.5'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[72%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={startDateFilterInput} onChange={(e) => setStartDateFilterInput(e.target.value)} type='date'

                                        onKeyDown={(event) => handleEnterToFilter(event, startDateFilterInput,
                                            setStartDateFilterInput,
                                            'equalTo',
                                            'earlieststartdate')}

                                    />
                                    {filterMapState.earlieststartdate.filterType == "" ? <button className='w-[30%] px-1 py-2' onClick={() => setStartDateFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> : <button className='w-[30%] px-1 py-2' onClick={() => setStartDateFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>}
                                    {/* <button className='w-[28%] px-1 py-2' onClick={() => { setStartDateFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button> */}
                                </div>
                                {startDateFilter && <DateFilter inputVariable={startDateFilterInput} setInputVariable={setStartDateFilterInput} handleFilter={newHandleFilter} columnName='earlieststartdate' menuRef={menuRef} filterType={filterMapState.earlieststartdate.filterType} />}
                            </div>
                            <div className='w-[170px] px-4  py-2.5'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[72%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={completionDateFilterInput} onChange={(e) => setCompletionDateFilterInput(e.target.value)} type='date'

                                        onKeyDown={(event) => handleEnterToFilter(event, completionDateFilterInput,
                                            setCompletionDateFilterInput,
                                            'equalTo',
                                            'expectedcompletiondate')}

                                    />
                                    {filterMapState.expectedcompletiondate.filterType == "" ? <button className='w-[30%] px-1 py-2' onClick={() => setCompletionDateFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> : <button className='w-[30%] px-1 py-2' onClick={() => setCompletionDateFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>}
                                    {/* <button className='w-[28%] px-1 py-2' onClick={() => { setCompletionDateFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button> */}
                                </div>
                                {completionDateFilter && <DateFilter inputVariable={completionDateFilterInput} setInputVariable={setCompletionDateFilterInput} handleFilter={newHandleFilter} columnName='expectedcompletiondate' menuRef={menuRef} filterType={filterMapState.expectedcompletiondate.filterType} />}
                            </div>
                            <div className='w-[130px] px-4  py-2.5'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[72%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={orderDateFilterInput} onChange={(e) => setOrderDateFilterInput(e.target.value)} type='date'

                                        onKeyDown={(event) => handleEnterToFilter(event, orderDateFilterInput,
                                            setOrderDateFilterInput,
                                            'equalTo',
                                            'orderdate')}

                                    />
                                    {filterMapState.orderdate.filterType == "" ? <button className='w-[30%] px-1 py-2' onClick={() => setOrderDateFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> : <button className='w-[30%] px-1 py-2' onClick={() => setOrderDateFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>}
                                    {/* <button className='w-[28%] px-1 py-2' onClick={() => { setOrderDateFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button> */}
                                </div>
                                {orderDateFilter && <DateFilter inputVariable={orderDateFilterInput} setInputVariable={setOrderDateFilterInput} handleFilter={newHandleFilter} columnName='orderdate' menuRef={menuRef} filterType={filterMapState.orderdate.filterType} />}
                            </div>
                            <div className='w-[120px] px-4  py-2.5'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[72%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={agingFilterInput} onChange={(e) => setAgingFilterInput(e.target.value)}

                                        onKeyDown={(event) => handleEnterToFilter(event, agingFilterInput,
                                            setAgingFilterInput,
                                            'equalTo',
                                            'ageing')}


                                    />
                                    {filterMapState.ageing.filterType == "" ? <button className='w-[30%] px-1 py-2' onClick={() => setAgingFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> : <button className='w-[30%] px-1 py-2' onClick={() => setAgingFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>}
                                    {/* <button className='w-[28%] px-1 py-2' onClick={() => { setAgingFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button> */}
                                </div>
                                {agingFilter && <NumericFilter inputVariable={agingFilterInput} setInputVariable={setAgingFilterInput} handleFilter={newHandleFilter} columnName='ageing' menuRef={menuRef} type={filterMapState.ageing.filterType} />}
                            </div>
                            <div className='w-[120px] px-4  py-2.5'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[72%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={createdByFilterInput} onChange={(e) => setCreatedByFilterInput(e.target.value)}


                                        onKeyDown={(event) => handleEnterToFilter(event, createdByFilterInput,
                                            setCreatedByFilterInput,
                                            'contains',
                                            'createdbyname')}

                                    />
                                    {filterMapState.createdbyname.filterType == "" ? <button className='w-[30%] px-1 py-2' onClick={() => setCreatedByFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> : <button className='w-[30%] px-1 py-2' onClick={() => setCreatedByFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>}
                                    {/* <button className='w-[28%] px-1 py-2' onClick={() => { setCreatedByFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button> */}
                                </div>
                                {createdByFilter && <CharacterFilter inputVariable={createdByFilterInput} setInputVariable={setCreatedByFilterInput} handleFilter={newHandleFilter} filterColumn='createdbyname' menuRef={menuRef} filterType={filterMapState.createdbyname.filterType} />}
                            </div>
                            <div className='w-[70px]  px-4  py-2.5'>
                                {/* <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[72%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={clientNameFilterInput} onChange={(e) => setClientNameFilterInput(e.target.value)} />
                                    <button className='w-[28%] px-1 py-2' onClick={() => { setClientNameFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                                </div> */}

                            </div>
                            <div className='w-[70px] px-4  py-2.5'>
                                {/* <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[72%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={clientNameFilterInput} onChange={(e) => setClientNameFilterInput(e.target.value)} />
                                    <button className='w-[28%] px-1 py-2' onClick={() => { setClientNameFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                                </div> */}

                            </div>
                            <div className='w-[70px] px-4  py-2.5'>
                                {/* <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[72%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={clientNameFilterInput} onChange={(e) => setClientNameFilterInput(e.target.value)} />
                                    <button className='w-[28%] px-1 py-2' onClick={() => { setClientNameFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                                </div> */}

                            </div>
                            <div className='w-[100px] px-4  py-2.5'>
                                {/* <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[72%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={clientNameFilterInput} onChange={(e) => setClientNameFilterInput(e.target.value)} />
                                    <button className='w-[28%] px-1 py-2' onClick={() => { setClientNameFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                                </div> */}
                            </div>

                            <div className='w-[110px] px-4  py-2.5'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[72%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={idFilterInput} onChange={(e) => setIdFilterInput(e.target.value)}

                                        onKeyDown={(event) => handleEnterToFilter(event, idFilterInput,
                                            setIdFilterInput,
                                            'equalTo',
                                            'id')}

                                    />
                                    {filterMapState.id.filterType == "" ? <button className='w-[30%] px-1 py-2' onClick={() => setIdFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> : <button className='w-[30%] px-1 py-2' onClick={() => setIdFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>}
                                    {/* <button className='w-[28%] px-1 py-2' onClick={() => { setIdFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button> */}
                                </div>
                                {idFilter && <NumericFilter inputVariable={idFilterInput} setInputVariable={setIdFilterInput} handleFilter={newHandleFilter} columnName='id' menuRef={menuRef} filterType={filterMapState.id.filterType} />}
                            </div>
                        </div>
                        {/* pending space here */}
                        <div className='h-12 w-full bg-[#F0F6FF] flex'>
                            <div className='w-[40px] p-4'>
                                <p>Sr. </p>
                            </div>
                            <div className='w-[165px] p-4'>
                                <p> Client Name <button onClick={() => handleSort('clientname')}><span className="font-extrabold">↑↓</span></button></p>
                            </div>
                            <div className='w-[150px] p-4'>
                                <p> Assigned To <button onClick={() => handleSort('ownername')}><span className="font-extrabold">↑↓</span></button></p>
                            </div>
                            <div className='w-[175px] p-4'>
                                <p> Order Description <button onClick={() => handleSort('briefdescription')}><span className="font-extrabold">↑↓</span></button></p>
                            </div>
                            <div className='w-[215px] p-4'>
                                <p> Proper Description <button onClick={() => handleSort('clientproperty')}><span className="font-extrabold">↑↓</span></button></p>
                            </div>
                            <div className='w-[150px] p-4'>
                                <p> Service <button onClick={() => handleSort('servicename')}><span className="font-extrabold">↑↓</span></button></p>
                            </div>
                            <div className='w-[130px] p-4'>
                                <p> Order Status <button onClick={() => handleSort('orderstatus')}><span className="font-extrabold">↑↓</span></button></p>
                            </div>
                            <div className='w-[120px] p-4'>
                                <p> Start Date <button onClick={() => handleSort('earlieststartdate')}><span className="font-extrabold">↑↓</span></button></p>
                            </div>
                            <div className='w-[170px] p-4'>
                                <p> Completion Date <button onClick={() => handleSort('expectedcompletiondate')}><span className="font-extrabold">↑↓</span></button></p>
                            </div>
                            <div className='w-[130px] p-4'>
                                <p>Order Date <button onClick={() => handleSort('orderdate')}><span className="font-extrabold">↑↓</span></button></p>
                            </div>
                            <div className='w-[120px] p-4'>
                                <p>Ageing <button onClick={() => handleSort('ageing')}><span className="font-extrabold">↑↓</span></button></p>
                            </div>
                            <div className='w-[120px] p-4'>
                                <p>Created By <button onClick={() => handleSort('createdbyname')}><span className="font-extrabold">↑↓</span></button></p>
                            </div>
                            <div className='w-[70px] p-4'>
                                {/* <p>Temp</p> */}
                            </div>
                            <div className='w-[70px] p-4'>
                                {/* <p>Temp</p> */}
                            </div>
                            <div className='w-[70px] p-4'>
                                {/* <p>Temp</p> */}
                            </div>
                            <div className='w-[100px] p-4'>
                                {/* <p>Temp</p> */}
                            </div>
                            <div className='w-[110px] p-4'>
                                <p>ID <button onClick={() => handleSort('id')}><span className="font-extrabold">↑↓</span></button></p>
                            </div>
                            <div className='w-[110px] p-4'>
                                <p>Edit</p>
                            </div>
                        </div>
                        <div className='h-[calc(100vh_-_17rem)] w-full overflow-auto bg-white'>
                            {/* {pageLoading && <div className='ml-5 mt-5'><LinearProgress /></div>} */}
                            {!pageLoading && existingOrder.length == 0 && <div className='h-10 border-gray-400 border-b-[1px] flex items-center'>
                                <h1 className='ml-10'>No Records To Show</h1>
                            </div>}
                            {!pageLoading && existingOrder.map((item, index) => {
                                return <div className='w-full h-auto bg-white flex justify-between border-gray-400 border-b-[1px] '>
                                    <div className='w-full flex'>
                                        <div className='w-[40px] p-4'>
                                            <p>{index + 1 + (currentPage - 1) * currentPages}</p>
                                        </div>
                                        <div className='w-[165px] p-4'>
                                            <p> {item.clientname}</p>
                                        </div>
                                        <div className='w-[150px] p-4'>
                                            <p>{item.ownername}</p>
                                        </div>
                                        <div className='w-[175px] p-4'>
                                            <p> {item.briefdescription}</p>
                                        </div>
                                        <div className='w-[215px] p-4'>
                                            <p> {item.clientproperty}</p>
                                        </div>
                                        <div className='w-[150px] p-4 '>
                                            <p> {item.servicename}</p>
                                        </div>
                                        <div className='w-[130px] p-4'>
                                            <p> {item.orderstatus}</p>
                                        </div>
                                        <div className='w-[120px] p-4'>
                                            <p>{formatDate(item.earlieststartdate)}</p>
                                        </div>
                                        <div className='w-[170px] p-4'>
                                            <p>{formatDate(item.expectedcompletiondate)}</p>
                                        </div>
                                        <div className='w-[130px] p-4'>
                                            <p>{formatDate(item.orderdate)}</p>
                                        </div>
                                        <div className='w-[120px] p-4'>
                                            <p>{item.ageing}</p>
                                        </div>
                                        <div className='w-[120px] p-4'>
                                            <p>{item.createdbyname}</p>
                                        </div>
                                        <Link to={`/manage/managevendorpayment/${item.id}`} state={{ orderid: item.id,clientid : item.clientid, clientname : item.clientname , orderdescription : item.briefdescription , hyperlinked : true }}>

                                            <div className='w-[70px] p-4 text-blue-500 cursor-pointer'>
                                                <p>Payments</p>
                                            </div>

                                        </Link>
                                        <Link to={`/manage/manageorderreceipt/${item.id}`} state={{ orderid: item.id ,clientid : item.clientid, clientname : item.clientname , orderdescription : item.briefdescription , hyperlinked : true  }}>
                                            <div className='w-[70px] p-4 text-blue-500 cursor-pointer'>
                                                <p>Receipts</p>
                                            </div>
                                        </Link>
                                        <Link to={`/manage/manageclientinvoice/${item.id}`} state={{ orderid: item.id ,clientid : item.clientid, clientname : item.clientname , orderdescription : item.briefdescription , hyperlinked : true  }}>

                                            <div className='w-[70px] p-4 text-blue-500 cursor-pointer'>
                                                <p>Invoices</p>
                                            </div>
                                        </Link>
                                        <Link to={`/manage/manageclientinfo/orders/showall/${item.id}`} state={{orderid : item.id , orderdescription : item.briefdescription}}>

                                        
                                        <div className='w-[100px] p-4 text-blue-500 cursor-pointer'>
                                            <p>Show All</p>
                                        </div>
                                        </Link>
                                        <div className='w-[110px] p-4'>
                                            <p>{item.id}</p>
                                        </div>
                                        <div className='w-[110px] p-4'>
                                            <div className='flex space-x-3'>
                                                <EditButton
                                                   handleEdit={handleEdit}
                                                   rowData={item.id}
                                                />
                                                <DeleteButton
                                                  handleDelete={handleDelete}
                                                  rowData={item.id}
                                                />
                                                {/* <button onClick={() => handleEdit(item.id)}> <img className='w-4 h-4 cursor-pointer' src={Edit} alt="edit" /></button>
                                                <button onClick={() => handleDelete(item.id)}><img className='w-4 h-4 cursor-pointer' src={Trash} alt="trash" /></button> */}
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            })}
                        </div>
                    </div>

                </div>





            </div>


            <div className='w-full h-12 flex justify-between px-6 fixed bottom-0 '>
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

            <Modal open={isStateDialogue}
                fullWidth={true}
                maxWidth={'md'}
                className='flex justify-center items-center'
            >
                <div className='flex justify-center'>
                    <Draggable handle='div.move'>
                        <div className="w-[1050px] h-auto bg-white  rounded-lg">
                            <div className="move cursor-move">
                                <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-lg relative">
                                    <div className="mr-[410px] ml-[410px]">
                                        <div className="text-[16px]">New Order</div>
                                    </div>
                                    <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white absolute right-2">
                                        <img onClick={handleClose} className="w-[20px] h-[20px]" src={Cross} alt="cross" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-1 flex bg-[#DAE7FF] justify-center space-x-4 items-center h-9">
                                <div className={`${selectedDialog == 1 ? "bg-blue-200" : "bg-[#EBEBEB]"} px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-60 cursor-pointer`} onClick={selectFirst}>
                                    <div>Order Information</div>
                                </div>
                                <div className={` ${selectedDialog == 2 ? "bg-blue-200" : "bg-[#EBEBEB]"} px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-60 cursor-pointer`} onClick={selectSecond}>
                                    <div>Photos</div>
                                </div>
                                <div className={`${selectedDialog == 3 ? "bg-blue-200" : "bg-[#EBEBEB]"} px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-60 cursor-pointer`} onClick={selectThird}>
                                    <div>Order Status history</div>
                                </div>
                            </div>
                            {selectedDialog == 1 && <OrderInformation setIsStateDialogue={setIsStateDialogue} formValues={formValues} setFormValues={setFormValues} usersData={usersData} orderStatusData={orderStatusData} clientPropertyData={clientPropertyData} serviceData={serviceData} vendorData={vendorData} tallyLedgerData={tallyLedgerData} formErrors={formErrors} hyperlinkstate={state} orderText={orderText} setOrderText={setOrderText}/>}
                            {selectedDialog == 2 && <Photos formValues={formValues} setFormValues={setFormValues} />}
                            {selectedDialog == 3 && <OrderStatusHistory formValues={formValues} setFormValues={setFormValues} />}
                            <div className="my-[10px] flex justify-center items-center gap-[10px]">
                                <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' onClick={handleAddOrder} >Add</button>
                                <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleClose} >Cancel</button>
                            </div>
                        </div>
                    </Draggable>
                </div>
            </Modal>

        </div>
    )
}


export default ManageOrder
