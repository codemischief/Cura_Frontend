import React from 'react';
import { Outlet, Link, useLocation, useNavigate, useParams } from "react-router-dom";
import backLink from "../../../assets/back.png";
import searchIcon from "../../../assets/searchIcon.png";
import nextIcon from "../../../assets/next.png";
import refreshIcon from "../../../assets/refresh.png";
import downloadIcon from "../../../assets/download.png";
import { useState, useEffect, useRef } from 'react';
import Navbar from "../../../Components/Navabar/Navbar";
import Cross from "../../../assets/cross.png";
import { Modal, Pagination, LinearProgress, duration, CircularProgress, Backdrop , MenuItem, Tooltip} from "@mui/material";
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
import CancelModel from './../../../Components/modals/CancelModel';
import { Description } from '@mui/icons-material';
import AsyncSelect from "react-select/async"
import DeleteOrderReceipt from './DeleteOrderReceipt';
import SaveConfirmationOrderReceipt from './SaveConfirmationOrderReceipt';
// import EditPmaAgreement from './EditPmaAgreement';
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
import CharacterFilter from "../../../Components/Filters/CharacterFilter"
import DateFilter from '../../../Components/Filters/DateFilter';
import NumericFilter from '../../../Components/Filters/NumericFilter';
import EditOrderReceipt from './EditOrderReceipt';
import Draggable from 'react-draggable';
import OrderDropDown from '../../../Components/Dropdown/OrderDropdown';
import OrderCustomSelectNative from '../../../Components/common/select/OrderCustomSelectNative';
import { formatDate } from '../../../utils/formatDate';
import ActiveFilter from "../../../assets/active_filter.png";
import AddButton from '../../../Components/common/CustomButton';
import EditButton from '../../../Components/common/buttons/EditButton';
import DeleteButton from '../../../Components/common/buttons/deleteButton';
import useAuth from '../../../context/JwtContext';
import checkEditAccess from '../../../Components/common/checkRoleBase';
const env_URL_SERVER = import.meta.env.VITE_ENV_URL_SERVER
const ManageOrderReceipt = () => {
    const {user} = useAuth()
    const {orderid} = useParams()
    const menuRef = useRef();
    const {pathname} = useLocation();
    const [state,setState] = useState({})
    const canEdit = checkEditAccess();
    
    const navigate = useNavigate();
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
        // const data = { "user_id":  user.id };
        const data = {  "rows": ["id", "name"], "filters": [], "sort_by": [], "order": "asc", "pg_no": 0, "pg_size": 0 };
        const response = await APIService.getCountries({...data,user_id : user.id})
        const result = (await response.json()).data;
        
        if (Array.isArray(result.data)) {
            setAllCountry(result.data);
        }
    }
    const fetchStateData = async (id) => {
        
        const data = {  "country_id": id };
        // const data = {"user_id":user.id,"rows":["id","state"],"filters":[],"sort_by":[],"order":"asc","pg_no":0,"pg_size":0};
        const response = await APIService.getState({...data,user_id : user.id});
        const result = (await response.json()).data;
        
        if (Array.isArray(result)) {
            setAllState(result)
        }
    }
    const fetchCityData = async (id) => {
        const data = {  "state_name": id };
        const response = await APIService.getCities({...data,user_id : user.id});
        const result = (await response.json()).data;
        
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
        // const data = { "user_id":  user.id };
        const data = {  };
        const response = await APIService.getRoles({...data,user_id : user.id})
        const result = (await response.json());
        
        setFormValues((existing) => {
            return { ...existing, role: result.data[0].id }
        })
        if (Array.isArray(result.data)) {
            setAllRoles(result.data);
        }
    }

    const fetchEntitiesData = async () => {
        setPageLoading(true);
        // const data = { "user_id":  user.id };
        const data = {  };
        const response = await APIService.getEntityAdmin({...data,user_id : user.id})
        const result = (await response.json());
        
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
            
            "rows": ["id", "name", "lob_head", "company"],
            "filters": [],
            "sort_by": [],
            "order": "asc",
            "pg_no": Number(currentPage),
            "pg_size": Number(currentPages)
        };
        const response = await APIService.getLob({...data,user_id : user.id});
        const result = (await response.json());
        
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
            
        }
        const response = await APIService.getModesAdmin({...data,user_id : user.id})
        const res = await response.json()
        setModesData(res.data)
        
    }

    const [usersData, setUsersData] = useState([]);
    const fetchUsersData = async () => {
        const data = {
            
        }
        const response = await APIService.getUsers({...data,user_id : user.id})
        const res = await response.json()
        const existing = { ...formValues }
        existing.receivedBy = res.data[0].id,
            
        setUsersData(res.data)
    }

    const [sortField, setSortField] = useState("id")
    const [flag, setFlag] = useState(false)
    const [existingOrderReceipt, setExistingOrderReceipt] = useState([]);
    const fetchData = async () => {
        
        const tempArray = [];
        // we need to query thru the object
        
        Object.keys(filterMapState).forEach((key) => {
            if (filterMapState[key].filterType != "") {
                if (filterMapState[key].filterData == 'Numeric') {
                    tempArray.push([
                        key,
                        filterMapState[key].filterType,
                        Number(filterMapState[key].filterValue),
                        filterMapState[key].filterData,
                    ]);
                } else {
                    tempArray.push([
                        key,
                        filterMapState[key].filterType,
                        filterMapState[key].filterValue,
                        filterMapState[key].filterData,
                    ]);
                }
            }
        });
        setFilterState((prev) => tempArray)
        setPageLoading(true);
        setCurrentPage((prev) => 1)
        const data = {
            
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
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": searchInput
        }
            ;
        const response = await APIService.getOrderReceipt({...data,user_id : user.id});
        const temp = await response.json();
        const result = temp.data;
        
        const t = temp.total_count;
        setTotalItems(t);
        setExistingOrderReceipt(result);
        setPageLoading(false);
    }
    const fetchPageData = async (pageNumber) => {
        setPageLoading(true);
        
        setCurrentPage(() => pageNumber)
        const data = {
            
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
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": Number(pageNumber),
            "pg_size": Number(currentPages),
            "search_key": searchInput
        }
        const response = await APIService.getOrderReceipt({...data,user_id : user.id});
        const temp = await response.json();
        const result = temp.data;
        
        const t = temp.total_count;
        setTotalItems(t);
        setExistingOrderReceipt(result);
        setPageLoading(false);
    }
    const fetchQuantityData = async (quantity) => {
        setPageLoading(true);
        
        const data = {
            
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
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": Number(currentPage),
            "pg_size": Number(quantity),
            "search_key": searchInput
        }
            ;
        const response = await APIService.getOrderReceipt({...data,user_id : user.id});
        const temp = await response.json();
        const result = temp.data;
        
        const t = temp.total_count;
        setTotalItems(t);
        setExistingOrderReceipt(result);
        setPageLoading(false);
    }
    const [clientPropertyData, setClientPropertyData] = useState([]);
    const getClientPropertyByClientId = async (id) => {
        const data = {
            
            "client_id": id
        }

        const response = await APIService.getClientPropertyByClientId({...data,user_id : user.id})
        const res = await response.json()
        
        setClientPropertyData(res.data)
        //    if(res.data.length >= 1) {
        //     const existing = {...formValues}
        //     existing.clientProperty = res.data[0].id
        //     
        //     setFormValues(existing)
        //  } 
    }
    const [orders, setOrders] = useState([]);
    function convertToIdNameObject(items) {
        const idNameObject = {};
        items.forEach((item) => {
          idNameObject[item.id] = item.ordername;
        });
        return idNameObject;
    }
    const getOrdersByClientId = async (id) => {
        if(id == null) return 
        
        const data = {
            "client_id": id
        }
        const response = await APIService.getOrdersByClientId({...data,user_id : user.id})
        const res = await response.json()
        
        setOrders(convertToIdNameObject(res.data))

        // if(res.data.length >= 1) {
        //    const existing = {...formValues}
        //    existing.order = res.data[0].id
        //    
        //    setFormValues(existing)

        // } 
    }
    const addOrderReceipt = async () => {

        const data = {
            
            "clientid": Number(formValues.client),
            "receivedby": Number(formValues.receivedBy),
            "amount": Number(formValues.amountReceived),
            "tds": formValues.TDS ? Number(formValues.TDS): null,
            "recddate": formValues.receivedDate,
            "paymentmode": Number(formValues.receiptMode),
            "orderid": Number(formValues.order),
            "receiptdesc": formValues.receiptDescription,
            "entityid": 1,
            "officeid": 2
        }
        // "user_id":user.id,
        // "receivedby": user.id,
        // "amount": 20000,
        // "tds": null,
        // "recddate": "2014-04-14",
        // "paymentmode": 5,
        // "orderid": 34,
        // "entityid": 1,
        // "officeid": 1
        const response = await APIService.addOrderReceipt({...data,user_id : user.id})
        const res = await response.json()
        

        setOpenAddConfirmation(false);
        SetIsOrderReceiptDialogue(false);
        if (res.result == "success") {
            setFormValues(initialValues);
            initials();
            openAddSuccess();
        } else {
            openFailureModal();
            setErrorMessage(res.message)
        }
    }
    const [showEditModal, setShowEditModal] = useState(false);
    const handleEdit = (id) => {
        // we need to open the edit modal
        
        setCurrOrderReceipt((prev) => id)
        
        setShowEditModal(true);
    }
    const initialValues = {
        client: state?.clientid,
        order: state?.orderid,
        receiptMode: 5,
        receivedBy: user.id,
        TDS: null,
        receiptDescription: null,
        receivedDate: null,
        amountReceived: null
    };
    const [formValues, setFormValues] = useState(initialValues);
    const setHyperlinkData = async () => {
        if(orderid != null) {
                const data = {
                    user_id : user.id,
                    table_name : "get_orders_view",
                    item_id : orderid 
                }
                const response = await APIService.getItembyId(data)
                const res = await response.json()
                const v = {...selectedOption}
                v.label = res.data.clientname 
                v.value = res.data.clientid
                setSelectedOption(v)
                setState(prevState => ({
                    ...prevState,
                    hyperlinked: true,
                    clientname: res.data.clientname,
                    clientid: res.data.clientid,
                    orderid: orderid,
                    orderdescription : res.data.briefdescription
                  }));
                setFormValues(prevFormValues => ({
                    ...prevFormValues,
                    client: res.data.clientid,
                    order: orderid
                }));
        }
        // if(state != null) {
        //     const v = {...selectedOption}
        //     v.label = state.clientname 
        //     v.value = state.clientid 
        //     setSelectedOption(v)
        //     const temp = {...formValues}
        //     temp.client = state.clientid 
        //     temp.order = state.orderid 
        //     setFormValues(temp)
        //     getOrderData(state.orderid)
        // }
    }
    useEffect(() => {
        
        setHyperlinkData()
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
        
        setIsEditDialogue(true);
        setCurrItem(oldItem)
    };

    const handleOpen = () => {
        SetIsOrderReceiptDialogue(true);
    };

    const handleClose = () => {
        initials();
        SetIsOrderReceiptDialogue(false);
        openAddCancelModal();
    }
    const initials = () => {
        setHyperlinkData()
        setFormValues(initialValues);
        setFormErrors({});
        setSelectedOption({label : 'Select Client' , value : null})
    }

    // harcoded dropdown
    const clientProperty = [1, 2, 3, 4];

    const client = [1, 2, 3, 4];


    const handleAddClientReceipt = () => {
        
        if (!validate()) {
            
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
            
            "id": id
        }
        const response = await APIService.deleteEmployee({...data,user_id : user.id});
        showDeleteConfirmation(false);

        openDeleteSuccess();
    }
    const handlePageChange = (event, value) => {
        
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
        setPageLoading(true);
        const data = {
            
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
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 0,
            "pg_size": 0,
            "search_key": searchInput,
            "downloadType": type,
            "routename" : "/manage/manageorderreceipt",
            "colmap": {
                "clientname": "Client Name",
                "briefdescription": "Order Description",
                "clientproperty": "Property",
                "amount": "Amount",
                "recddate": "Received Date",
                "paymentmodename": "Receipt Mode",
                "receivedbyname": "Received By",
                "createdbyname": "Created By",
                "id": "ID"
            }
        };
        const response = await APIService.getOrderReceipt({...data,user_id : user.id})
        const temp = await response.json();
        const result = temp.data;
        
        if (temp.result == 'success') {
            const d = {
                "filename": temp.filename,
                "user_id" : user.id
            }
            fetch(`${env_URL_SERVER}download/${temp.filename}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(d)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.blob();
                })
                .then(result => {
                    if (type == "excel") {
                        FileSaver.saveAs(result, 'OrderReceiptData.xlsx');
                    } else if (type == "pdf") {
                        FileSaver.saveAs(result, 'OrderReceiptData.pdf');
                    }
                    
                })
                .catch(error => {
                    console.error('Error:', error);
                });

            setTimeout(() => {
                setPageLoading(false)
            }, 1000)
        }
    }
    const handleSearch = async () => {
        // 
        setPageLoading(true);
        setCurrentPage((prev) => 1)
        // setCurrentPages(15);
        setIsSearchOn(true);
        const data = {
            
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
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": searchInput
        };
        const response = await APIService.getOrderReceipt({...data,user_id : user.id});
        const temp = await response.json();
        const result = temp.data;
        
        const t = temp.total_count;
        setTotalItems(t);
        setExistingOrderReceipt(result);
        setPageLoading(false);
    }
    const handleCloseSearch = async () => {
        setIsSearchOn(false);
        setPageLoading(true);
        setSearchInput("");
        setCurrentPage((prev) => 1)
        const data = {
            
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
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": ""
        };
        const response = await APIService.getOrderReceipt({...data,user_id : user.id});
        const temp = await response.json();
        const result = temp.data;
        
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
            
            "id": id
        }
        const response = await APIService.deleteOrderReceipt({...data,user_id : user.id})
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
        SetIsOrderReceiptDialogue(false);
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
        
        setSelectedOption(e)
    }

    const loadOptions = async (e) => {
        
        if (e.length < 3) return;
        const data = {
            
            "pg_no": 0,
            "pg_size": 0,
            "search_key": e
        }
        const response = await APIService.getClientAdminPaginated({...data,user_id : user.id})
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
        id: {
            filterType: "",
            filterValue: null,
            filterData: "Numeric",
            filterInput: ""
        },
        orderid: {
            filterType: orderid ? "equalTo" : "",
            filterValue: orderid,
            filterData: "Numeric",
            filterInput: orderid
        }
    }
    const [filterMapState, setFilterMapState] = useState(filterMapping);

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
    const [filterState, setFilterState] = useState([]);
    const fetchFiltered = async (mapState) => {
        setFilterMapState(mapState)
        setClientNameFilter(false);
        setPropertyFilter(false);
        setOrderDescriptionFilter(false);
        setAmountFilter(false);
        setReceivedDateFilter(false);
        setReceiptModeFilter(false);
        setReceivedByFilter(false);
        setCreatedByFilter(false);
        setIdFilter(false);
        const tempArray = [];
        // we need to query thru the object
        // 
        
        Object.keys(mapState).forEach((key) => {
            if (mapState[key].filterType != "") {
                if (mapState[key].filterData == 'Numeric') {
                    tempArray.push([
                        key,
                        mapState[key].filterType,
                        Number(mapState[key].filterValue),
                        mapState[key].filterData,
                    ]);
                } else {
                    tempArray.push([
                        key,
                        mapState[key].filterType,
                        mapState[key].filterValue,
                        mapState[key].filterData,
                    ]);
                }
            }
        });
        setCurrentPage((prev) => 1)
        setFilterState(tempArray)
        setPageLoading(true);
        const data = {
            
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
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": isSearchOn ? searchInput : ""
        };
        const response = await APIService.getOrderReceipt({...data,user_id : user.id});
        const temp = await response.json();
        const result = temp.data;
        
        const t = temp.total_count;
        setTotalItems(t);
        setExistingOrderReceipt(result);
        setPageLoading(false);
    }



    const handleSort = async (field) => {
        setPageLoading(true);

        // we need to query thru the object
        setSortField(field)
        
        setFlag((prev) => !prev)
        const data = {
            
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
            "filters": filterState,
            "sort_by": [field],
            "order": !flag ? "asc" : "desc",
            "pg_no": Number(currentPage),
            "pg_size": Number(currentPages),
            "search_key": isSearchOn ? searchInput : ""
        };
        // setFlag((prev) => !prev);
        const response = await APIService.getOrderReceipt({...data,user_id : user.id});
        const temp = await response.json();
        const result = temp.data;
        
        const t = temp.total_count;
        setTotalItems(t);
        setExistingOrderReceipt(result);
        setPageLoading(false);
    }
    const [orderData, setOrderData] = useState({
        pendingamount: null,
        orderdate: null,
        orderstatus: null
    })
    const getOrderData = async (id) => {
        
        const data = {  "orderid": Number(id) }
        const response = await APIService.getOrderPending({...data,user_id : user.id})
        const res = await response.json()
        
        const temp = { ...orderData }
        temp.pendingamount = res.data.pending
        temp.orderdate = res.data.orderdate
        temp.orderstatus = res.data.orderstatus
        setOrderData(temp)
    
    }
    const [orderText, setOrderText] = useState("Select Order")


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
        <div className='font-medium'>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={pageLoading}
                onClick={() => { }}
            >

                <CircularProgress color="inherit" />

            </Backdrop>
            {showEditModal && <EditOrderReceipt handleClose={() => { setShowEditModal(false) }} receiptId={currOrderReceipt} clientPropertyData={clientPropertyData} showSuccess={openEditSuccess} modesData={modesData} usersData={usersData} showCancel={openCancelModal} />}
            {showAddSuccess && <SucessfullModal isOpen={showAddSuccess} message="Successfully Added Order Receipt" />}
            {showDeleteSuccess && <SucessfullModal isOpen={showDeleteSuccess} message=" Order Receipt Deleted Successfully" />}
            {showEditSuccess && <SucessfullModal isOpen={showEditSuccess} message="Changes Saved Successfully" />}
            {/* {openAddConfirmation && <SaveConfirmationEmployee handleClose={() => setOpenAddConfirmation(false)} currEmployee={formValues.employeeName} addEmployee={addEmployee} />} */}
            {openAddConfirmation && <SaveConfirmationOrderReceipt addOrderReceipt={addOrderReceipt} handleClose={() => setOpenAddConfirmation(false)} showCancel={openAddCancelModal} setDefault={initials} />}
            {isFailureModal && <FailureModal isOpen={isFailureModal} message={errorMessage} />}
            {showDeleteModal && <DeleteOrderReceipt handleClose={() => setShowDeleteModal(false)} item={currOrderReceipt} handleDelete={deletePma} showCancel={openCancelModal} />}
            {showCancelModelAdd && <CancelModel isOpen={showCancelModelAdd} message="Process cancelled, no new Order Receipt added." />}
            {showCancelModel && <CancelModel isOpen={showCancelModel} message="Process cancelled, no changes saved." />}
            <div className='h-[calc(100vh_-_123px)] w-full  px-10'>
                <div className='h-16 w-full  flex justify-between items-center p-2  border-gray-300 border-b-2'>
                    <div className='flex items-center space-x-3'>
                        <div className='rounded-2xl  bg-[#EBEBEB] h-8 w-8 flex justify-center items-center '>
                            <button onClick={() => navigate(-1)}> <img className='w-5 h-5' src={backLink} /></button>
                        </div>

                        <div className='flex-col'>
                            <h1 className='text-[18px]'>Manage Order Receipt </h1>
                            <p className='text-[14px]'>Manage &gt; Manage Order Receipt</p>
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
                            {/* <button className="bg-[#004DD7] text-white h-[36px] w-[300px] rounded-lg" onClick={handleOpen}>
                                <div className="flex items-center justify-center gap-4">
                                    Add New Order Receipt
                                    <img className='h-[18px] w-[18px]' src={Add} alt="add" />
                                </div>
                            </button> */}
                            <AddButton title="Add New Order Receipt" sx={{ width: "300px" }} onClick={handleOpen} />
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
                                <input className="w-[75%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={clientNameFilterInput} onChange={(e) => setClientNameFilterInput(e.target.value)}

                                    onKeyDown={(event) => handleEnterToFilter(event, clientNameFilterInput,
                                        setClientNameFilterInput,
                                        'contains',
                                        'clientname')}

                                />
                                {filterMapState.clientname.filterType == "" ? <button className='w-[25%] px-1 py-2' onClick={() => setClientNameFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> : <button className='w-[25%] px-1 py-2' onClick={() => setClientNameFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>}


                            </div>
                            {clientNameFilter && <CharacterFilter inputVariable={clientNameFilterInput} setInputVariable={setClientNameFilterInput} handleFilter={newHandleFilter} filterColumn='clientname' menuRef={menuRef} filterType={filterMapState.clientname.filterType} />}
                        </div>
                        <div className='w-[15%]  px-3 py-2 '>
                            <div className="w-[75%] flex items-center bg-[#EBEBEB] rounded-md">
                                <input className="w-[75%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={orderDescriptionFilterInput} onChange={(e) => setOrderDescriptionFilterInput(e.target.value)}

                                    onKeyDown={(event) => handleEnterToFilter(event, orderDescriptionFilterInput,
                                        setOrderDescriptionFilterInput,
                                        'contains',
                                        'briefdescription')}



                                />
                                {filterMapState.briefdescription.filterType == "" ? <button className='w-[25%] px-1 py-2' onClick={() => setOrderDescriptionFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> : <button className='w-[25%] px-1 py-2' onClick={() => setOrderDescriptionFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>}

                            </div>
                            {orderDescriptionFilter && <CharacterFilter inputVariable={orderDescriptionFilterInput} setInputVariable={setOrderDescriptionFilterInput} handleFilter={newHandleFilter} filterColumn='briefdescription' menuRef={menuRef} filterType={filterMapState.clientname.filterType} />}

                        </div>
                        <div className='w-[16%] px-3 py-2 ml-[-3px] '>
                            <div className="w-[70%] flex items-center bg-[#EBEBEB] rounded-md">
                                <input className="w-[75%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={propertyFilterInput} onChange={(e) => setPropertyFilterInput(e.target.value)}

                                    onKeyDown={(event) => handleEnterToFilter(event, propertyFilterInput,
                                        setPropertyFilterInput,
                                        'contains',
                                        'clientproperty')}

                                />
                                {filterMapState.clientproperty.filterType == "" ? <button className='w-[25%] px-1 py-2' onClick={() => setPropertyFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> : <button className='w-[25%] px-1 py-2' onClick={() => setPropertyFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>}
                            </div>
                            {propertyFilter && <CharacterFilter inputVariable={propertyFilterInput} setInputVariable={setPropertyFilterInput} handleFilter={newHandleFilter} filterColumn='clientproperty' menuRef={menuRef} filterType={filterMapState.clientproperty.filterType} />}
                        </div>

                        <div className='w-[8%] px-3 py-2 '>
                            <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                <input className="w-[65%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" type='number' value={amountFilterInput} onChange={(e) => setAmountFilterInput(e.target.value)}

                                    onKeyDown={(event) => handleEnterToFilter(event, amountFilterInput,
                                        setAmountFilterInput,
                                        'equalTo',
                                        'amount')}

                                />
                                {filterMapState.amount.filterType == "" ? <button className='w-[25%] px-1 py-2' onClick={() => setAmountFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> : <button className='w-[25%] px-1 py-2' onClick={() => setAmountFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>}
                                {/* <button className='w-[35%] px-1 py-2' onClick={() => { setAmountFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button> */}
                            </div>
                            {amountFilter && <NumericFilter columnName='amount' inputVariable={amountFilterInput} setInputVariable={setAmountFilterInput} handleFilter={newHandleFilter} menuRef={menuRef} filterType={filterMapState.amount.filterType} />}
                        </div>
                        <div className='w-[10%] px-3 py-2 '>
                            <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                <input className="w-[68%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={receivedDateFilterInput} onChange={(e) => setReceivedDateFilterInput(e.target.value)} type='date'

                                    onKeyDown={(event) => handleEnterToFilter(event, receivedDateFilterInput,
                                        setReceivedDateFilterInput,
                                        'equalTo',
                                        'recddate')}

                                />
                                {filterMapState.recddate.filterType == "" ? <button className='w-[25%] px-1 py-2' onClick={() => setReceivedDateFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> : <button className='w-[25%] px-1 py-2' onClick={() => setReceivedDateFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>}

                            </div>
                            {receivedDateFilter && <DateFilter inputVariable={receivedDateFilterInput} setInputVariable={setReceivedDateFilterInput} handleFilter={newHandleFilter} columnName='recddate' menuRef={menuRef} filterType={filterMapState.recddate.filterType} />}
                        </div>
                        <div className='w-[10%] px-3 py-2'>
                            <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                <input className="w-[70%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={receiptModeFilterInput} onChange={(e) => setReceiptModeFilterInput(e.target.value)}

                                    onKeyDown={(event) => handleEnterToFilter(event, receiptModeFilterInput,
                                        setReceiptModeFilterInput,
                                        'contains',
                                        'paymentmodename')}


                                />
                                {filterMapState.paymentmodename.filterType == "" ? <button className='w-[25%] px-1 py-2' onClick={() => setReceiptModeFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> : <button className='w-[25%] px-1 py-2' onClick={() => setReceiptModeFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>}

                            </div>
                            {receiptModeFilter && <CharacterFilter inputVariable={receiptModeFilterInput} setInputVariable={setReceiptModeFilterInput} handleFilter={newHandleFilter} filterColumn='paymentmodename' menuRef={menuRef} filterType={filterMapState.paymentmodename.filterType} />}
                        </div>
                        <div className='w-[12%] px-3 py-2 '>
                            <div className="w-[85%] flex items-center bg-[#EBEBEB] rounded-md">
                                <input className="w-[75%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={receivedByFilterInput} onChange={(e) => setReceivedByFilterInput(e.target.value)}

                                    onKeyDown={(event) => handleEnterToFilter(event, receivedByFilterInput,
                                        setReceivedByFilterInput,
                                        'contains',
                                        'receivedbyname')}


                                />
                                {filterMapState.receivedbyname.filterType == "" ? <button className='w-[25%] px-1 py-2' onClick={() => setReceivedByFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> : <button className='w-[25%] px-1 py-2' onClick={() => setReceivedByFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>}

                            </div>
                            {receivedByFilter && <CharacterFilter inputVariable={receivedByFilterInput} setInputVariable={setReceivedByFilterInput} handleFilter={newHandleFilter} filterColumn='receivedbyname' menuRef={menuRef} filterType={filterMapState.receivedbyname.filterType} />}
                        </div>
                        <div className='w-[12%] px-3 py-2  '>
                            <div className="w-[70] flex items-center bg-[#EBEBEB] rounded-md">
                                <input className="w-[75%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={createdByFilterInput} onChange={(e) => setCreatedByFilterInput(e.target.value)}

                                    onKeyDown={(event) => handleEnterToFilter(event, createdByFilterInput,
                                        setCreatedByFilterInput,
                                        'contains',
                                        'createdbyname')}


                                />
                                {filterMapState.createdbyname.filterType == "" ? <button className='w-[25%] px-1 py-2' onClick={() => setCreatedByFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> : <button className='w-[25%] px-1 py-2' onClick={() => setCreatedByFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>}

                            </div>
                            {createdByFilter && <CharacterFilter inputVariable={createdByFilterInput} setInputVariable={setCreatedByFilterInput} handleFilter={newHandleFilter} filterColumn='createdbyname' menuRef={menuRef} filterType={filterMapState.createdbyname.filterType} />}
                        </div>
                    </div>
                    <div className="w-[10%] flex">

                        <div className='w-[65%] px-3 py-2 ml-[-3px] '>
                            <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                <input className="w-[55%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" type="number" value={idFilterInput} onChange={(e) => setIdFilterInput(e.target.value)}

                                    onKeyDown={(event) => handleEnterToFilter(event, idFilterInput,
                                        setIdFilterInput,
                                        'equalTo',
                                        'id')}


                                />
                                {filterMapState.id.filterType == "" ? <button className='w-[25%] px-1 py-2' onClick={() => setIdFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> : <button className='w-[25%] px-1 py-2' onClick={() => setIdFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>}

                            </div>
                            {idFilter && <NumericFilter columnName='id' inputVariable={idFilterInput} setInputVariable={setIdFilterInput} handleFilter={newHandleFilter} menuRef={menuRef} filterType={filterMapState.id.filterType} />}
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
                                    <p>{canEdit ? "Edit" : ""}</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* 

                    
                     */}


                    <div className='w-full h-[calc(100vh_-_18rem)] overflow-auto'>


                        {/* we map our items here */}
                        {/* {pageLoading && <div className='ml-5 mt-5'><LinearProgress /></div>} */}
                        {!pageLoading && existingOrderReceipt && existingOrderReceipt.length == 0 && <div className='h-10 border-gray-400 border-b-[1px] flex items-center'>
                            <h1 className='ml-10'>No Records To Show</h1>
                        </div>}
                        {!pageLoading && existingOrderReceipt.map((item, index) => {
                            return <div className='w-full h-auto bg-white flex justify-between border-gray-400 border-b-[1px]'>
                                <div className="w-[90%] flex">
                                    <div className='w-[4%] flex'>
                                        <div className='px-3 py-5'>
                                            {}
                                            {/* { * currentPages)} */}
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
                                            <p>{item.amount ? item.amount.toFixed(2) : ""}</p>
                                        </div>
                                    </div>
                                    <div className='w-[10%]  flex'>
                                        <div className='px-3 py-5'>
                                            <p>{formatDate(item.recddate)}</p>
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
                                            <EditButton
                                               handleEdit={handleEdit}
                                               rowData={item.id}
                                            />
                                            <DeleteButton
                                               handleDelete={handleDelete}
                                               rowData={item.id}
                                            />
                                           
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

            <Modal open={isOrderReceiptDialogue}
                fullWidth={true}
                maxWidth={'md'}
                className='flex justify-center items-center'
            >
                <div className='flex justify-center'>
                    <Draggable handle="div.move">
                        <div className="w-[1050px] h-auto bg-white rounded-lg">
                            <div className="move cursor-move">

                                <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-t-lg relative">
                                    <div className="mr-[410px] ml-[410px]">
                                        <div className="text-[16px]">New Order Receipt</div>
                                    </div>
                                    <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white absolute right-2">
                                        <button onClick={handleClose}><img onClick={handleClose} className="w-[20px] h-[20px]" src={Cross} alt="cross" /></button>
                                    </div>
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
                                            <div className="text-[13px] mb-0.5">
                                                Client <label className="text-red-500">*</label>
                                            </div>
                                            {}
                                            {state?.hyperlinked ?
                                                <Tooltip title={state.clientname} arrow>
                                                       <div className="w-56 h-5 border-[1px] px-3 border-[#C6C6C6] rounded-sm  text-xs py-0.5 bg-[#F5F5F5] whitespace-nowrap overflow-hidden text-ellipsis" type="text" >{state.clientname}</div>
                                                </Tooltip>
                                                  :
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
                                                        // lineHeight: '0.8',
                                                        height: '20px',
                                                        width: 224,
                                                        fontSize: 12,
                                                        // padding: '1px'
                                                        borderRadius : '2px'
                                                    }),
                                                    indicatorSeparator: (provided, state) => ({
                                                      display : 'none'
                                                    }),
                                                    dropdownIndicator: (provided, state) => ({
                                                        ...provided,
                                                        padding: '1px',
                                                        paddingRight : '2px', // Adjust padding for the dropdown indicator
                                                        width: 15, // Adjust width to make it smaller
                                                        height: 15, // Adjust height to make it smaller
                                                        display: 'flex', // Use flex to center the icon
                                                        alignItems: 'center', // Center vertically
                                                        justifyContent: 'center'
                                                         // adjust padding for the dropdown indicator
                                                    }),
                                                    input: (provided, state) => ({
                                                        ...provided,
                                                        margin: 0, // Remove any default margin
                                                        padding: 0, // Remove any default padding
                                                        fontSize: 12, // Match the font size
                                                        height: 'auto', // Adjust input height
                                                      }),
                                                    // options: (provided, state) => ({
                                                    //     ...provided,
                                                    //     fontSize: 10// adjust padding for the dropdown indicator
                                                    // }),
                                                    option: (provided, state) => ({
                                                        ...provided,
                                                        padding: '2px 10px', // Adjust padding of individual options (top/bottom, left/right)
                                                        margin: 0, // Ensure no extra margin
                                                        fontSize: 12 // Adjust font size of individual options
                                                    }),
                                                    menu: (provided, state) => ({
                                                        ...provided,
                                                        width: 224, // Adjust the width of the dropdown menu
                                                        zIndex: 9999 // Ensure the menu appears above other elements
                                                    }),
                                                    menuList: (provided, state) => ({
                                                        ...provided,
                                                        padding: 0, // Adjust padding of the menu list
                                                        fontSize: 12,
                                                        maxHeight: 150 // Adjust font size of the menu list
                                                    }),
                                                    
                                                }}
                                            />}
                                            <div className="text-[9px] text-[#CD0000] absolute ">{formErrors.client}</div>
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
                                            <div className="text-[9px] text-[#CD0000] absolute ">{formErrors.receiptMode}</div>
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
                                            <div className="text-[9px] text-[#CD0000] absolute ">{formErrors.receivedBy}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">TDS </div>
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="number" name="TDS" value={formValues.TDS} onChange={handleChange} />
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Receipt Description </div>
                                            <textarea className="w-[224px] max-h-[70px] min-h-[70px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="receiptDescription" value={formValues.receiptDescription} onChange={handleChange} />
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

                                            {/* <select
                                            className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                                            name="order"
                                            value={formValues.order}
                                            onChange={(e) => {
                                                handleChange(e)
                                                getOrderData(e.target.value)
                                            }}
                                        >
                                            <option value="" >Select A Order</option>
                                            {orders.map((item) => (
                                                <option key={item.id} value={item.id}>
                                                    {item.ordername}
                                                </option>
                                            ))}
                                        </select> */}
                                        
                                           {state?.hyperlinked ?<Tooltip title={state.orderdescription}>
                                            <div className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs py-0.5 bg-[#F5F5F5] whitespace-nowrap overflow-hidden text-ellipsis" type="text" name="curaoffice" >{state.orderdescription}</div> 
                                           </Tooltip>  : <OrderCustomSelectNative
                                           data={Object.keys(orders)}
                                           value={orders?.[formValues.order] ? orders?.[formValues.order]:null}
                                           placeholder="Select Orders"
                                           isSticky={true}
                                           headerText={{
                                            first : 'Order Description',
                                            second : 'ID',
                                          }}
                                          renderData={(item) => {
                                            return (
                                              <MenuItem value={item} key={item} sx={{ width : '224px', gap : '5px', fontSize : '12px'}}>
                                                <p className="w-[80%] " style={{ overflowWrap: 'break-word', wordWrap: 'break-word', whiteSpace: 'normal', margin: 0 }}>
                                                   {orders[item]}
                                                </p>
                                                <p className='w-[20%]'>
                                                    {item}
                                                </p>
                                                
                                               
                                              </MenuItem>
                                            );
                                          }}
                                          onChange={(e) => {
                                            getOrderData(e.target.value)
                                            setFormValues({ ...formValues, order: e.target.value })
                                           }}
                                           
                                        
                                        />
                                             }
                                            <div className="text-[9px] text-[#CD0000] absolute ">{formErrors.order}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Received Date <label className="text-red-500">*</label></div>
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="date" name="receivedDate" value={formValues.receivedDate} onChange={handleChange} />
                                            <div className="text-[9px] text-[#CD0000] absolute ">{formErrors.receivedDate}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-sm">Amount Received <label className="text-red-500">*</label></div>
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs" type="number" name="amountReceived" value={formValues.amountReceived} onChange={handleChange} />
                                            <div className="text-[9px] text-[#CD0000] absolute ">{formErrors.amountReceived}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-sm text-[#787878]">Pending Amount </div>
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs py-0.5 bg-[#F5F5F5]" value={orderData.pendingamount} readOnly />
                                        </div>
                                        <div className="">
                                            <div className="text-sm text-[#787878]">Order Date </div>
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs py-0.5 bg-[#F5F5F5]" value={orderData.orderdate} readOnly />
                                        </div>
                                        <div className="">
                                            <div className="text-sm text-[#787878]">Order Status </div>
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs py-0.5 bg-[#F5F5F5]" value={orderData.orderstatus} readOnly />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="my-3 flex justify-center items-center gap-[10px]">
                                <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' onClick={handleAddClientReceipt} >Add</button>
                                <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleClose}>Cancel</button>
                            </div>
                        </div>
                    </Draggable>
                </div>
            </Modal>
        </div>
    )
}

export default ManageOrderReceipt;
