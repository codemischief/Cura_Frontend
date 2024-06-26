import { Backdrop, CircularProgress, Modal, Pagination } from "@mui/material";
import FileSaver from 'file-saver';
import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { Link, useLocation, useNavigate } from "react-router-dom";
import CharacterFilter from '../../../Components/Filters/CharacterFilter';
import NumericFilter from '../../../Components/Filters/NumericFilter';
import AddButton from '../../../Components/common/CustomButton';
import EditButton from '../../../Components/common/buttons/EditButton';
import RefreshFilterButton from '../../../Components/common/buttons/RefreshFilterButton';
import DeleteButton from '../../../Components/common/buttons/deleteButton';
import checkEditAccess from '../../../Components/common/checkRoleBase';
import SucessfullModal from '../../../Components/modals/SucessfullModal';
import ActiveFilter from "../../../assets/active_filter.png";
import backLink from "../../../assets/back.png";
import Cross from "../../../assets/cross.png";
import downloadIcon from "../../../assets/download.png";
import Excel from "../../../assets/excel.png";
import Filter from "../../../assets/filter.png";
import Pdf from "../../../assets/pdf.png";
import refreshIcon from "../../../assets/refresh.png";
import searchIcon from "../../../assets/searchIcon.png";
import useAuth from '../../../context/JwtContext';
import { APIService } from '../../../services/API';
import CancelModel from './../../../Components/modals/CancelModel';
import BankDetails from "./Forms/BankDetails";
import ClientInformation from "./Forms/ClientInformation";
import ClientPortal from "./Forms/ClientPortal";
import LegalInformation from "./Forms/LegalInformation";
import POADetails from "./Forms/POADetails";
import DeleteClientInfo from './Modals/DeleteClientInfoModal';
import EditClientInfoModal from './Modals/EditClientInfoModal';
import SaveConfirmationClient from './Modals/SaveConfirmationClient';
const env_URL_SERVER = import.meta.env.VITE_ENV_URL_SERVER
const ManageClientInfo = () => {
    // const Navigate = useNavigate()

    const { user } = useAuth()
    const canEdit = checkEditAccess();
    
    const { pathname } = useLocation()
    const dataRows = [
        "clientname",
        "clienttypename",
        "tenantofname",
        "tenantofpropertyname",
        "country",
        "city",
        "mobilephone",
        "email1",
        "employername",
        "id"
    ]
    // const history = useHistory()
    const navigate = useNavigate();
    const menuRef = useRef();
    // we have the module here
    const [pageLoading, setPageLoading] = useState(false);
    const [existingEmployees, setExistingEmployees] = useState([]);
    const [existingClientInfo, setExistingClientInfo] = useState([])
    const [currentPages, setCurrentPages] = useState(15);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [downloadModal, setDownloadModal] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [isSearchOn, setIsSearchOn] = useState(false);
    const [allCountry, setAllCountry] = useState([]);
    const [allState, setAllState] = useState([]);
    const [allCity, setAllCity] = useState([]);
   
    const [allEntities, setAllEntites] = useState([]);
    const [currCountry, setCurrCountry] = useState(-1);
    const [isClientInfoDialogue, setIsClientInfoDialogue] = useState(false);
    const [isEditDialogue, setIsEditDialogue] = React.useState(false);
    const [currItem, setCurrItem] = useState({});
    const [showAddSuccess, setShowAddSuccess] = useState(false);
    const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
    const [tenentOfData, setTenentOfData] = useState([])

    const [sortField, setSortField] = useState("id")
    const [relationData, setRelationData] = useState([]);
    const [showDelete, setShowDelete] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    // const [filterArray,setFilterArray] = useState([]);

    const filterMapping = {
        clientname: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        clienttypename: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },

        tenantofname: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        tenantofpropertyname: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        country: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        city: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        mobilephone: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        email1: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        employername: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },

        id: {
            filterType: "",
            filterValue: "",
            filterData: "Numeric",
            filterInput: ""
        }
    }

    const [filterMapState, setFilterMapState] = useState(filterMapping);


    const fetchCountryData = async () => {
        setPageLoading(true);
        // const data = { "user_id":  user.id };
        const data = { "rows": ["id", "name"], "filters": [], "sort_by": [], "order": "asc", "pg_no": 0, "pg_size": 0 };
        const response = await APIService.getCountries({ ...data, user_id: user.id })
        const result = (await response.json()).data;
        setAllCountry(result)
    }
    const fetchStateData = async (id) => {
        
        const data = { "country_id": id };
        // const data = {"user_id":user.id,"rows":["id","state"],"filters":[],"sort_by":[],"order":"asc","pg_no":0,"pg_size":0};
        const response = await APIService.getState({ ...data, user_id: user.id });
        const result = (await response.json()).data;
        
        if (Array.isArray(result)) {
            setAllState(result)
        }
    }
    const fetchCityData = async (id) => {
        const data = { "state_name": id };
        const response = await APIService.getCities({ ...data, user_id: user.id });
        const result = (await response.json()).data;
        
        if (Array.isArray(result)) {
            setAllCity(result)
            if (result.length > 0) {
                setFormValues((existing) => {
                    const newData = { ...existing, city: result[0].id }
                    return newData;
                })
            }
        }
    }
    

   

    const fetchEntitiesData = async () => {
        setPageLoading(true);
        // const data = { "user_id":  user.id };
        const data = {};
        const response = await APIService.getEntityAdmin({ ...data, user_id: user.id })
        const result = (await response.json());
        
        setFormValues((existing) => {
            return { ...existing, entity: result.data[0][0] }
        })
        if (Array.isArray(result.data)) {
            setAllEntites(result.data);
        }
    }
    const fetchRelation = async () => {
        const data = {

        }
        const response = await APIService.getRelationAdmin({ ...data, user_id: user.id })
        const res = await response.json()
        
        setRelationData(res.data)
    }
    const [flag, setFlag] = useState(false)
    const fetchData = async () => {
        // 
        setPageLoading(true);
        const tempArray = [];
        // we need to query thru the object
        Object.keys(filterMapState).forEach(key => {
            if (filterMapState[key].filterType != "") {
                tempArray.push([key, filterMapState[key].filterType, filterMapState[key].filterValue, filterMapState[key].filterData]);
            }
        })
        
        
        setFilterState((prev) => tempArray)
        setCurrentPage((prev) => 1)
        const data = {

            "rows": dataRows,
            "filters": tempArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": searchInput
        };
        const response = await APIService.getClientInfo({ ...data, user_id: user.id });
        const temp = await response.json();
        const result = temp.data;
        
        const t = temp.total_count;
        setTotalItems(t);
        setExistingClientInfo(result.client_info);
        setPageLoading(false);
    }
    const fetchPageData = async (pageNumber) => {
        setPageLoading(true);

        setCurrentPage((prev) => pageNumber)
        const data = {

            "rows": dataRows,
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": Number(pageNumber),
            "pg_size": Number(currentPages),
            "search_key": searchInput
        };
        const response = await APIService.getClientInfo({ ...data, user_id: user.id });
        const temp = await response.json();
        const result = temp.data;
        
        const t = temp.total_count;
        setTotalItems(t);
        setExistingClientInfo(result.client_info);
        setPageLoading(false);
    }
    const fetchQuantityData = async (quantity) => {
        setPageLoading(true);

        // 
        setCurrentPage((prev) => 1)
        setCurrentPages((prev) => quantity)
        const data = {

            "rows": dataRows,
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(quantity),
            "search_key": searchInput
        };
        const response = await APIService.getClientInfo({ ...data, user_id: user.id });
        const temp = await response.json();
        const result = temp.data;
        
        const t = temp.total_count;
        setTotalItems(t);
        setExistingClientInfo(result.client_info);
        setPageLoading(false);
    }
    useEffect(() => {
        fetchData()
    },[filterMapState])

    useEffect(() => {
        fetchData();
        fetchCountryData();
        fetchStateData(5);
        fetchCityData("Maharashtra")
        fetchClientTypeData();
        fetchTenentOfData();
        fetchEntitiesData();
        fetchRelation();
        const handler = (e) => {
            
            if (menuRef.current == null || !menuRef.current.contains(e.target)) {
                // setOverAllFilter(false);
                setTenantOfPropertyFilter(false);
                setIdFilter(false)
                setEmployerFilter(false);
                setEmail1Filter(false);
                setPhoneFilter(false)
                setCityFilter(false)
                setClientNameFilter(false);
                setCountryFilter(false)
                setClientNameFilter(false);
                setTenantOfTypeNameFilter(false)
                setEmployerFilter(false);
                setClientTypeNameFilter(false)
                setTenantOfTypeNameFilter(false)
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
        setIsClientInfoDialogue(true);
    };

    const handleClose = () => {
        initials();
        setSelectedDialogue(1)
        setIsClientInfoDialogue(false);
        openAddCancelModal();
    }
    const initials = () => {
        
        setFormValues(initialValues);
        setFormErrorsClientInfo({})
        setFormErrors({});
    }
    const [clientTypeData, setClientTypeData] = useState([]);
    const fetchClientTypeData = async () => {
        const data = {

        }
        const response = await APIService.getClientTypeAdmin({ ...data, user_id: user.id });
        const res = await response.json()
        
        setClientTypeData(res.data)

    }
    const fetchTenentOfData = async () => {
        const data = {

        }
        const response = await APIService.getTenantOfPropertyAdmin({ ...data, user_id: user.id })
        const res = await response.json()
        
        setTenentOfData(res.data)
    }
    const [selectedDialog, setSelectedDialogue] = useState(1);

    const selectFirst = () => {
        setSelectedDialogue(1);
    }

    const selectSecond = () => {
        setSelectedDialogue(2);
    }

    const selectThird = () => {
        setSelectedDialogue(3);
    }

    const selectForth = () => {
        setSelectedDialogue(4);
    }

    const selectFifth = () => {
        setSelectedDialogue(5);
    }
    const initialValues = {
        "client_info": {
            "clientname": "",
            "firstname": "",
            "middlename": "",
            "lastname": "",
            "salutation": "",
            "clienttype": null,
            "addressline1": "",
            "addressline2": "",
            "suburb": "",
            "city": "Pune",
            "state": "Maharashtra",
            "country": 5,
            "zip": "",
            "homephone": "",
            "workphone": "",
            "mobilephone": "",
            "email1": "",
            "email2": "",
            "employername": "",
            "comments": "",
            "photo": "",
            "onlineaccreated": null,
            "localcontact1name": "",
            "localcontact1address": "",
            "localcontact1details": "",
            "localcontact2name": "",
            "localcontact2address": "",
            "localcontact2details": "",
            "includeinmailinglist": false,
            "entityid": 1,
            "tenantof": null,
            "tenentofproperty": null,
            "tenantofname": "Select Tenant Of "
        },
        "client_access": [],
        "client_bank_info": [],
        "client_legal_info": {
            "fulllegalname": "",
            "panno": "",
            "addressline1": "",
            "addressline2": "",
            "suburb": "",
            "city": "Pune",
            "state": "Maharashtra",
            "country": 5,
            "zip": "",
            "occupation": "",
            "birthyear": null,
            "employername": "",
            "relation": null,
            "relationwith": ""
        },
        "client_poa": {
            "poalegalname": "",
            "poapanno": "",
            "poaaddressline1": "",
            "poaaddressline2": "",
            "poasuburb": "",
            "poacity": "Pune",
            "poastate": "Maharashtra",
            "poacountry": 5,
            "poazip": "",
            "poaoccupation": "",
            "poabirthyear": null,
            "poaphoto": "",
            "poaemployername": "",
            "poarelation": null,
            "poarelationwith": "",
            "poaeffectivedate": null,
            "poaenddate": null,
            "poafor": "",
            "scancopy": ""
        }

    }
    const [formValues, setFormValues] = useState(initialValues);
    // const [formErrors, setFormErrors] = useState({});
    const [showEditSuccess, setShowEditSuccess] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
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
        // setBackDropLoading(true)
        setDownloadModal(false)
        setPageLoading(true);
        const data = {

            "rows": [
                "clientname",
                "clienttypename",
                "tenantofname",
                "tenantofpropertyname",
                "country",
                "city",
                "mobilephone",
                "email1",
                "id",
            ],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 0,
            "pg_size": 0,
            "search_key": searchInput,
            "downloadType": type,
            "routename": pathname,
            "colmap": {
                "clientname": "Client Name",
                "clienttypename": "Client Type",
                "tenantofname": "Tenant Of",
                "tenantofpropertyname": "Tenant Of Property",
                "country": "Country",
                "city" : "City",
                "mobilephone": "Phone",
                "email1": "Email",
                "id": "ID",
            }
        };
        const response = await APIService.getClientInfo({ ...data, user_id: user.id })
        const temp = await response.json();
        const result = temp.data;
        
        if (temp.result == 'success') {
            const d = {
                "filename": temp.filename,

            }
            fetch(`${env_URL_SERVER}download/${temp.filename}`, {
                method: 'POST', // or the appropriate HTTP method
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...d, user_id: user.id }) // Convert the object to a JSON string
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.blob();
                })
                .then(result => {
                    if (type == "excel") {
                        FileSaver.saveAs(result, 'ClientInfoData.xlsx');
                    } else if (type == "pdf") {
                        FileSaver.saveAs(result, 'ClientInfoData.pdf');
                    }
                    
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
    const handleExcelDownload = async () => {
        const data = {

            "rows": [
                "clientname",
                "clienttypename",
                "tenantofname",
                "tenantofpropertyname",
                "country",
                "city",
                "mobilephone",
                "email1",
                "employername",
                "id",
            ],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 0,
            "pg_size": 0,
            "search_key": searchInput
        };
        // window.open("https://stackoverflow.com/questions/31079081/how-to-programmatically-navigate-using-react-router", '_blank');
        // Navigate.call()

    }
    const handleSearch = async () => {
        // 
        setPageLoading(true);
        setCurrentPage(1)

        setIsSearchOn(true);
        const data = {

            "rows": dataRows,
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": searchInput
        };
        const response = await APIService.getClientInfo({ ...data, user_id: user.id });
        const temp = await response.json();
        const result = temp.data;
        
        const t = temp.total_count;
        setTotalItems(t);
        setExistingClientInfo(result.client_info);
        setPageLoading(false);
    }
    const handleCloseSearch = async () => {
        // setIsSearchOn(false);
        setPageLoading(true);
        setSearchInput("");
        setCurrentPage((prev) => 1)
        const data = {

            "rows": dataRows,
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages)
        };
        const response = await APIService.getClientInfo({ ...data, user_id: user.id });
        const temp = await response.json();
        const result = temp.data;
        
        const t = temp.total_count;
        setTotalItems(t);
        setExistingClientInfo(result.client_info);
        setPageLoading(false);
    }
    const openAddSuccess = () => {
        setShowAddSuccess(true);
        setTimeout(function () {
            setShowAddSuccess(false);
            fetchData();
        }, 2000)

    }
    const openDeleteSuccess = () => {
        setShowDeleteSuccess(true);
        setTimeout(function () {
            setShowDeleteSuccess(false);
        }, 2000)
        fetchData();
    }
    const [formErrors, setFormErrors] = useState({

    });
    const [formErrorsClientInfo, setFormErrorsClientInfo] = useState({});
    const validate = () => {
        let res = {
            status: true,
            page: 1
        }
        if (formValues.client_info.salutation === "" || formValues.client_info.salutation === null) {
            setFormErrorsClientInfo((existing) => ({
                ...existing,
                salutation: "Select Saluation"
            }))
            res.status = false
            res.page = 1

        } else {
            setFormErrorsClientInfo((existing) => ({
                ...existing,
                salutation: ""
            }))
        }


        if (formValues.client_info.firstname === "" || formValues.client_info.firstname === null) {
            setFormErrorsClientInfo((existing) => ({
                ...existing,
                firstname: "Enter First Name"
            }))
            res.status = false
            res.page = 1

        } else {
            setFormErrorsClientInfo((existing) => ({
                ...existing,
                firstname: ""
            }))
        }

        if (formValues.client_info.lastname === "" || formValues.client_info.lastname === null) {
            setFormErrorsClientInfo((existing) => ({
                ...existing,
                lastname: "Enter Last Name"
            }))
            res.status = false
            res.page = 1
        } else {
            setFormErrorsClientInfo((existing) => ({
                ...existing,
                lastname: ""
            }))
        }

        if (formValues.client_info.clienttype === null || formValues.client_info.clienttype === "") {
            setFormErrorsClientInfo((existing) => ({
                ...existing,
                clienttype: "Select Client Type "
            }))
            res.status = false
            res.page = 1
        } else {
            setFormErrorsClientInfo((existing) => ({
                ...existing,
                clienttype: ""
            }))
        }
        if (formValues.client_info.state === "" || formValues.client_info.state == null) {
            setFormErrorsClientInfo((existing) => ({
                ...existing,
                state: "Select State "
            }))
            res.status = false
            res.page = 1
        } else {
            setFormErrorsClientInfo((existing) => ({
                ...existing,
                state: ""
            }))
        }
        if (formValues.client_info.city === "" || formValues.client_info.city == null) {
            setFormErrorsClientInfo((existing) => ({
                ...existing,
                city: "Select City "
            }))
            res.status = false
            res.page = 1
        } else {
            setFormErrorsClientInfo((existing) => ({
                ...existing,
                city: ""
            }))
        }

        if (formValues.client_info.email1 != "" && formValues.client_info.email1 != null && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formValues.client_info.email1)) {
            // we need to set the formErrors
            setFormErrorsClientInfo((existing) => {
                return { ...existing, email1: "Enter a valid email address" }
            })
            res.status = false
            res.page = 1
        } else {
            setFormErrorsClientInfo((existing) => {
                return { ...existing, email2: "" }
            })
        }

        if (formValues.client_info.email2 != "" && formValues.client_info.email2 != null && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formValues.client_info.email2)) {
            // we need to set the formErrors
            setFormErrorsClientInfo((existing) => {
                return { ...existing, email2: "Enter a valid email address" }
            })
            res.status = false
            res.page = 1
        } else {
            setFormErrorsClientInfo((existing) => {
                return { ...existing, email2: "" }
            })
        }

        return res;
    }
    const [showAddConfirmation, setShowAddConfirmation] = useState(false);
    const handleAddClientInfo = () => {
        let temp = validate()
        if (!temp.status) {
            setSelectedDialogue(temp.page);
            return
        }
        setIsClientInfoDialogue(false);
        setCurrClientName(formValues.client_info.firstname);
        setShowAddConfirmation(true);

    }
    [
        {

        },
        {

        }
    ]
    const arrayHelper = (arr) => {
        const temp = []
        
        for(var i=0;i <arr.length ; i++) {
            
            let flag = false;
            Object.keys(arr[i]).forEach((key) => {
                // 
                // 
               if(arr[i][key] != null && arr[i][key] != "" && arr[i][key] != '') {
                flag = true
               }
            })
            
            if(flag) temp.push(arr[i])
        }
        return temp
    }
    const addClientInfo = async () => {
        // setButtonLoading(true);
        
        const data = {

            "client_info": {
                "firstname": formValues.client_info.firstname,
                "middlename": formValues.client_info.middlename,
                "lastname": formValues.client_info.lastname,
                "salutation": formValues.client_info.salutation,
                "clienttype": Number(formValues.client_info.clienttype),
                "addressline1": formValues.client_info.addressline1,
                "addressline2": formValues.client_info.addressline2,
                "suburb": formValues.client_info.suburb,
                "city": formValues.client_info.city,
                "state": formValues.client_info.state,
                "country": Number(formValues.client_info.country),
                "zip": formValues.client_info.zip,
                "homephone": formValues.client_info.homephone,
                "workphone": formValues.client_info.workphone,
                "mobilephone": formValues.client_info.mobilephone,
                "email1": formValues.client_info.email1,
                "email2": formValues.client_info.email2,
                "employername": formValues.client_info.employername,
                "comments": formValues.client_info.comments,
                "photo": "efiufheu",
                "onlineaccreated": false,
                "localcontact1name": formValues.client_info.localcontact1name,
                "localcontact1address": formValues.client_info.localcontact1address,
                "localcontact1details": formValues.client_info.localcontact1details,
                "localcontact2name": formValues.client_info.localcontact2name,
                "localcontact2address": formValues.client_info.localcontact2address,
                "localcontact2details": formValues.client_info.localcontact2details,
                "includeinmailinglist": !formValues.client_info.includeinmailinglist,
                "entityid": Number(formValues.client_info.entityid),
                "tenantof": formValues.client_info.tenantof,
                "tenantofproperty": formValues.client_info.tenentofproperty ? Number(formValues.client_info.tenentofproperty) : formValues.client_info.tenentofproperty
            },
            "client_access": arrayHelper(formValues.client_access),
            "client_bank_info": arrayHelper(formValues.client_bank_info),
            "client_legal_info": {
                "fulllegalname": formValues.client_legal_info.fulllegalname,
                "panno": formValues.client_legal_info.panno,
                "addressline1": formValues.client_legal_info.addressline1,
                "addressline2": formValues.client_legal_info.addressline2,
                "suburb": formValues.client_legal_info.suburb,
                "city": formValues.client_legal_info.city,
                "state": formValues.client_legal_info.state,
                "country": formValues.client_legal_info.country,
                "zip": formValues.client_legal_info.zip,
                "occupation": formValues.client_legal_info.occupation,
                "birthyear": formValues.client_legal_info.birthyear,
                "employername": formValues.client_legal_info.employername,
                "relation": formValues.client_legal_info.relation,
                "relationwith": formValues.client_legal_info.relationwith
            },
            "client_poa": {
                "poalegalname": formValues.client_poa.poalegalname,
                "poapanno": formValues.client_poa.poapanno,
                "poaaddressline1": formValues.client_poa.poaaddressline1,
                "poaaddressline2": formValues.client_poa.poaaddressline2,
                "poasuburb": formValues.client_poa.poasuburb,
                "poacity": formValues.client_poa.poacity ,
                "poastate": formValues.client_poa.poastate,
                "poacountry": formValues.client_poa.poacountry,
                "poazip": formValues.client_poa.poazip,
                "poaoccupation": formValues.client_poa.poaoccupation,
                "poabirthyear": formValues.client_poa.poabirthyear,
                "poaphoto": formValues.client_poa.poaphoto,
                "poaemployername": formValues.client_poa.poaemployername,
                "poarelation": formValues.client_poa.poarelation,
                "poarelationwith": formValues.client_poa.poarelationwith,
                "poaeffectivedate": formValues.client_poa.poaeffectivedate,
                "poaenddate": formValues.client_poa.poaenddate,
                "poafor": formValues.client_poa.poafor,
                "scancopy": formValues.client_poa.scancopy
            }
        };
        
        const response = await APIService.addClientInfo({ ...data, user_id: user.id })
        const res = await response.json();
        setShowAddConfirmation(false)

        if (res.result == 'success') {

            setIsClientInfoDialogue(false);
            openAddSuccess();
            setFormValues(initialValues)
        } else {


        }
        setButtonLoading(false);
    }

    const handleDelete = async (id) => {

        const data = {

            "id": id
        }
        const response = await APIService.deleteClientInfo({ ...data, user_id: user.id })
        const res = await response.json()
        
        setShowDelete(false);
        if (res.result == 'success') {
            openDeleteSuccess()
        }
        fetchData()
    }
    const openDelete = (item) => {
        setCurrItem(item)
        setShowDelete(true);
    }
    // const [showAddSuccess,setShowAddSuccess] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currClient, setCurrClient] = useState(-1);
    const [currClientName, setCurrClientName] = useState("");
    const handleEdit = (id) => {
        setCurrClient(id);
        setShowEditModal(true);
    }
    const openEditSuccess = () => {
        setShowEditModal(false);
        setShowEditSuccess(true);
        setTimeout(function () {
            setShowEditSuccess(false);
            fetchData();
        }, 2000)
    }

    const [showCancelModelAdd, setShowCancelModelAdd] = useState(false);
    const [showCancelModel, setShowCancelModel] = useState(false);
    const openAddCancelModal = () => {
        // set the state for true for some time
        setIsClientInfoDialogue(false);
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
    const [clientNameFilter, setClientNameFilter] = useState(false)
    const [clientNameInput, setClientNameInput] = useState("");
    const [clientTypeNameFilter, setClientTypeNameFilter] = useState(false)
    const [clientTypeNameInput, setClientTypeNameInput] = useState("");
    const [tenantOfTypeNameFilter, setTenantOfTypeNameFilter] = useState(false)
    const [tenantOfTypeNameInput, setTenantOfTypeNameInput] = useState("");
    const [tenantOfPropertyFilter, setTenantOfPropertyFilter] = useState(false)
    const [tenantOfPropertyInput, setTenantOfPropertyInput] = useState("");
    const [countryFilter, setCountryFilter] = useState(false)
    const [countryInput, setCountryInput] = useState("");
    const [cityFilter, setCityFilter] = useState(false)
    const [cityInput, setCityInput] = useState("");
    const [phoneFilter, setPhoneFilter] = useState(false)
    const [phoneInput, setPhoneInput] = useState("");
    const [email1Filter, setEmail1Filter] = useState(false)
    const [email1Input, setEmail1Input] = useState("");
    const [employerFilter, setEmployerFilter] = useState(false)
    const [employerInput, setEmployerInput] = useState("");
    const [idFilter, setIdFilter] = useState(false);
    const [idFilterInput, setidFilterInput] = useState("");
    const resetAllInputs = () => {
        // toast.success('Filters Resetted!')

        setClientNameInput("");
        setClientTypeNameInput("");
        setTenantOfTypeNameInput("");
        setTenantOfPropertyInput("");
        setCountryInput("");
        setCityInput("");
        setPhoneInput("");
        setEmail1Input("");
        setEmployerInput("");
        setidFilterInput("");
    };
    const handleSort = async (field) => {
        setPageLoading(true)
        setSortField(field);
        setFlag((prev) => !prev)
        const data = {

            "rows": dataRows,
            "filters": filterState,
            "sort_by": [field],
            "order": !flag ? "asc" : "desc",
            "pg_no": Number(currentPage),
            "pg_size": Number(currentPages),
            "search_key": searchInput
        };

        const response = await APIService.getClientInfo({ ...data, user_id: user.id });
        const temp = await response.json();
        const result = temp.data;
        
        const t = temp.total_count;
        setTotalItems(t);
        setExistingClientInfo(result.client_info);
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
        if (type == 'noFilter') setInputVariable("");
        fetchFiltered(existing);
    }
    const [filterState, setFilterState] = useState([])
    const fetchFiltered = async (mapState) => {
        setTenantOfPropertyFilter(false);
        setIdFilter(false)
        setEmployerFilter(false);
        setEmail1Filter(false);
        setPhoneFilter(false)
        setCityFilter(false)
        setClientNameFilter(false);
        setCountryFilter(false)
        setClientNameFilter(false);
        setTenantOfTypeNameFilter(false)
        setEmployerFilter(false);
        setClientTypeNameFilter(false)
        setTenantOfTypeNameFilter(false)
        setPageLoading(true);
        const tempArray = [];
        // we need to query thru the object
        // 
        setFilterMapState(mapState)
        
        Object.keys(mapState).forEach(key => {
            if (mapState[key].filterType != "") {
                tempArray.push([key, mapState[key].filterType, mapState[key].filterValue, mapState[key].filterData]);
            }
        })
        setFilterState((prev) => tempArray)
        setCurrentPage((prev) => 1)
        const data = {

            "rows": dataRows,
            "filters": tempArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages)
        };
        const response = await APIService.getClientInfo({ ...data, user_id: user.id });
        const temp = await response.json();
        const result = temp.data;
        
        const t = temp.total_count;
        setTotalItems(t);
        setExistingClientInfo(result.client_info);
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
    const [orderText, setOrderText] = useState('Select Tenant Of Property')
    return (
        <div className='font-medium'>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={pageLoading}
                onClick={() => { }}
            >

                <CircularProgress color="inherit" />

            </Backdrop>
            {showEditModal && <EditClientInfoModal handleClose={() => setShowEditModal(false)} currClient={currClient} openEditSuccess={openEditSuccess} showCancel={openCancelModal} />}
            {showDeleteSuccess && <SucessfullModal isOpen={showDeleteSuccess} message="Client Deleted Successfully" />}
            {showAddSuccess && <SucessfullModal isOpen={showAddSuccess} message="New Client Created Successfully" />}
            {showEditSuccess && <SucessfullModal isOpen={showEditSuccess} message="Changes Saved Successfully" />}
            {showDelete && <DeleteClientInfo handleDelete={handleDelete} item={currItem} handleClose={() => setShowDelete(false)} showCancel={openCancelModal} />}
            {showAddConfirmation && <SaveConfirmationClient addClient={addClientInfo} handleClose={() => { setShowAddConfirmation(false) }} currClient={currClientName} showCancel={openAddCancelModal} setDefault={initials} />}
            {showCancelModelAdd && <CancelModel isOpen={showCancelModelAdd} message="Process Cancelled, No New Client Created." />}
            {showCancelModel && <CancelModel isOpen={showCancelModel} message="Process cancelled, no changes saved." />}
            <div className='h-[calc(100vh_-_7rem)] w-full  px-10'>
                <div className='h-16 w-full  flex justify-between items-center p-2  border-gray-300 border-b-2'>
                    <div className='flex items-center space-x-3'>
                        <div className='rounded-2xl  bg-[#EBEBEB] h-8 w-8 flex justify-center items-center '>
                            <button onClick={() => { navigate(-1) }}><img className='h-5 w-5' src={backLink} /></button>
                        </div>

                        <div className='flex-col'>
                            <h1 className='text-[18px]'>Manage Client</h1>
                            <p className='text-[14px]'>Manage &gt; Manage Client</p>
                        </div>
                    </div>
                    <div className='flex space-x-2 items-center'>

                        <div className='flex relative'>
                            {/* search button */}
                            <input
                                className="h-[36px] bg-[#EBEBEB] text-[#787878] pl-2"
                                type="text"
                                placeholder="  Search"
                                value={searchInput}
                                onChange={(e) => {
                                    setSearchInput(e.target.value);
                                }}
                                onKeyDownCapture={handleKeyDown}
                            />
                            <button onClick={handleCloseSearch}><img src={Cross} className='absolute w-[20px] h-[20px] left-[160px] top-2' /></button>
                            <div className="h-[36px] w-[40px] bg-[#004DD7] flex items-center justify-center rounded-r-lg">
                                <button onClick={handleSearch}><img className="h-[26px] " src={searchIcon} alt="search-icon" /></button>
                            </div>
                        </div>

                        <div>
                            {/* button */}
                            {/* <button className="bg-[#004DD7] text-white h-[36px] w-[250px] rounded-lg" onClick={handleOpen}>
                                <div className="flex items-center justify-center gap-4 text-[14px]">
                                    Add New Client
                                    <img className='h-[18px] w-[18px]' src={Add} alt="add" />
                                </div>
                            </button> */}
                            <AddButton title="Add New Client" onClick={handleOpen} />
                        </div>

                    </div>

                </div>




                <div className='h-12 w-full bg-white'>
                    <div className='w-full h-12 bg-white flex justify-between'>
                        <div className="w-[85%] flex">
                            <div className='w-[3%] flex'>
                                <div className='p-3'>
                                    {/* <p>Sr.</p> */}
                                </div>
                            </div>
                            <div className='w-[13%] px-3 py-2.5 '>
                                <div className="w-[80%] flex items-center bg-[#EBEBEB] rounded-[5px] ">
                                    <input className="w-[75%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" value={clientNameInput} onChange={(e) => setClientNameInput(e.target.value)}
                                        onKeyDown={(event) => handleEnterToFilter(event, clientNameInput,
                                            setClientNameInput,
                                            'contains',
                                            'clientname')}
                                    />
                                    {filterMapState.clientname.filterType == "" ? <button className='w-[25%] px-1 py-2' onClick={() => setClientNameFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> : <button className='w-[25%] px-1 py-2' onClick={() => setClientNameFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>}
                                    {/* <button className='px-1 py-2 w-[25%]'><img src={Filter} className='h-3 w-3' onClick={() => { setClientNameFilter((prev) => !prev) }} /></button> */}
                                </div>

                                {clientNameFilter && <CharacterFilter inputVariable={clientNameInput} setInputVariable={setClientNameInput} handleFilter={newHandleFilter} filterColumn='clientname' menuRef={menuRef} filterType={filterMapState.clientname.filterType} />}

                            </div>

                            <div className='w-[11%] px-3 py-2.5 '>
                                <div className="w-[90%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-[73%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" value={clientTypeNameInput} onChange={(e) => setClientTypeNameInput(e.target.value)}

                                        onKeyDown={(event) => handleEnterToFilter(event, clientTypeNameInput,
                                            setClientTypeNameInput,
                                            'contains',
                                            'clienttypename')}

                                    />
                                    {filterMapState.clienttypename.filterType == "" ? <button className='w-[25%] px-1 py-2' onClick={() => setClientTypeNameFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> : <button className='w-[25%] px-1 py-2' onClick={() => setClientTypeNameFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>}
                                    {/* <button className='px-1 py-2 w-[27%]'><img src={Filter} className='h-3 w-3' onClick={() => { setClientTypeNameFilter((prev) => !prev) }} /></button> */}
                                </div>
                                {clientTypeNameFilter && <CharacterFilter inputVariable={clientTypeNameInput} setInputVariable={setClientTypeNameInput} handleFilter={newHandleFilter} filterColumn='clienttypename' menuRef={menuRef} filterType={filterMapState.clienttypename.filterType} />}

                            </div>

                            <div className='w-[10%] px-3 py-2.5'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-[65%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" value={tenantOfTypeNameInput} onChange={(e) => setTenantOfTypeNameInput(e.target.value)}

                                        onKeyDown={(event) => handleEnterToFilter(event, tenantOfTypeNameInput,
                                            setTenantOfTypeNameInput,
                                            'contains',
                                            'tenantofname')}

                                    />
                                    {filterMapState.tenantofname.filterType == "" ? <button className='w-[25%] px-1 py-2' onClick={() => setTenantOfTypeNameFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> : <button className='w-[25%] px-1 py-2' onClick={() => setTenantOfTypeNameFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>}
                                    {/* <button className='px-1 py-2 w-[35%]'><img src={Filter} className='h-3 w-3' onClick={() => { setTenantOfTypeNameFilter((prev) => !prev) }} /></button> */}
                                </div>
                                {tenantOfTypeNameFilter && <CharacterFilter inputVariable={tenantOfTypeNameInput} setInputVariable={setTenantOfTypeNameInput} handleFilter={newHandleFilter} menuRef={menuRef} filterColumn='tenantofname' filterType={filterMapState.tenantofname.filterType} />}

                            </div>

                            <div className='w-[12%] px-3 py-2.5'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-[65%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" value={tenantOfPropertyInput} onChange={(e) => setTenantOfPropertyInput(e.target.value)}

                                        onKeyDown={(event) => handleEnterToFilter(event, tenantOfPropertyInput,
                                            setTenantOfPropertyInput,
                                            'contains',
                                            'tenantofpropertyname')}
                                    />
                                    {filterMapState.tenantofpropertyname.filterType == "" ? <button className='w-[25%] px-1 py-2' onClick={() => setTenantOfPropertyFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> : <button className='w-[25%] px-1 py-2' onClick={() => setTenantOfPropertyFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>}
                                    {/* <button className='px-1 py-2 w-[35%]'><img src={Filter} className='h-3 w-3' onClick={() => { setTenantOfPropertyFilter((prev) => !prev) }} /></button> */}
                                </div>
                                {tenantOfPropertyFilter && <CharacterFilter inputVariable={tenantOfPropertyInput} setInputVariable={setTenantOfPropertyInput} handleFilter={newHandleFilter} menuRef={menuRef} filterColumn='tenantofpropertyname' filterType={filterMapState.tenantofpropertyname.filterType} />}
                                {/* {tenantOfPropertyFilter && <CharacterFilter handleFilter={handleFilter} menuRef={menuRef} filterColumn='tenentof' />} } */}

                            </div>

                            <div className='w-[8%]  px-3 py-2.5'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-[65%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" value={countryInput} onChange={(e) => setCountryInput(e.target.value)}

                                        onKeyDown={(event) => handleEnterToFilter(event, countryInput,
                                            setCountryInput,
                                            'contains',
                                            'country')}

                                    />
                                    {filterMapState.country.filterType == "" ? <button className='w-[25%] px-1 py-2' onClick={() => setCountryFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> : <button className='w-[25%] px-1 py-2' onClick={() => setCountryFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>}
                                    {/* <button className='px-1 py-2 w-[35%]'><img src={Filter} className='h-3 w-3' onClick={() => { setCountryFilter((prev) => !prev) }} /></button> */}
                                </div>
                                {countryFilter && <CharacterFilter inputVariable={countryInput} setInputVariable={setCountryInput} handleFilter={newHandleFilter} filterColumn='country' menuRef={menuRef} filterType={filterMapState.country.filterType} />}
                            </div>

                            <div className='w-[8%] px-3 py-2.5'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-[50%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" value={cityInput} onChange={(e) => setCityInput(e.target.value)}

                                        onKeyDown={(event) => handleEnterToFilter(event, cityInput,
                                            setCityInput,
                                            'contains',
                                            'city')}

                                    />
                                    {filterMapState.city.filterType == "" ? <button className='w-[25%] px-1 py-2' onClick={() => setCityFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> : <button className='w-[25%] px-1 py-2' onClick={() => setCityFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>}
                                    {/* <button className='px-1 py-2 w-[50%]'><img src={Filter} className='h-3 w-3' onClick={() => { setCityFilter((prev) => !prev) }} /></button> */}
                                </div>
                                {cityFilter && <CharacterFilter inputVariable={cityInput} setInputVariable={setCityInput} filterColumn='city' menuRef={menuRef} handleFilter={newHandleFilter} filterType={filterMapState.city.filterType} />}
                            </div>

                            <div className='w-[10%] px-3 py-2.5'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-[72%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" value={phoneInput} onChange={(e) => setPhoneInput(e.target.value)}


                                        onKeyDown={(event) => handleEnterToFilter(event, phoneInput,
                                            setPhoneInput,
                                            'contains',
                                            'mobilephone')}

                                    />
                                    {filterMapState.mobilephone.filterType == "" ? <button className='w-[25%] px-1 py-2' onClick={() => setPhoneFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> : <button className='w-[25%] px-1 py-2' onClick={() => setPhoneFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>}
                                    {/* <button className='px-1 py-2 w-[28%]'><img src={Filter} className='h-3 w-3' onClick={() => { setPhoneFilter((prev) => !prev) }} /></button> */}
                                </div>
                                {phoneFilter && <CharacterFilter inputVariable={phoneInput} setInputVariable={setPhoneInput} filterColumn='mobilephone' handleFilter={newHandleFilter} menuRef={menuRef} filterType={filterMapState.mobilephone.filterType} />}

                            </div>

                            <div className='w-[11%] px-3 py-2.5'>
                                <div className="w-[80%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-[70%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" value={email1Input} onChange={(e) => setEmail1Input(e.target.value)}

                                        onKeyDown={(event) => handleEnterToFilter(event, email1Input,
                                            setEmail1Input,
                                            'contains',
                                            'email1')}


                                    />
                                    {filterMapState.email1.filterType == "" ? <button className='w-[25%] px-1 py-2' onClick={() => setEmail1Filter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> : <button className='w-[25%] px-1 py-2' onClick={() => setEmail1Filter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>}
                                    {/* <button className='px-1 py-2 w-[30%]'><img src={Filter} className='h-3 w-3' onClick={() => { setEmail1Filter((prev) => !prev) }} /></button> */}
                                </div>
                                {email1Filter && <CharacterFilter inputVariable={email1Input} setInputVariable={setEmail1Input} filterColumn='email1' handleFilter={newHandleFilter} menuRef={menuRef} filterType={filterMapState.email1.filterType} />}
                            </div>

                            {/* <div className='w-[9%] px-3 py-2.5'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-[70%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" value={employerInput} onChange={(e) => setEmployerInput(e.target.value)} />
                                    <button className='px-1 py-2 w-[30%]'><img src={Filter} className='h-3 w-3' onClick={() => { setEmployerFilter((prev) => !prev) }} /></button>
                                </div>
                                {employerFilter && <CharacterFilter inputVariable={employerInput} setInputVariable={setEmployerInput} filterColumn='employername' handleFilter={newHandleFilter} menuRef={menuRef} />}
                            </div> */}

                        </div>
                        <div className="w-[15%] flex">
                            <div className='w-1/2   p-3'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-[63%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" type="number" value={idFilterInput} onChange={(e) => setidFilterInput(e.target.value)}

                                        onKeyDown={(event) => handleEnterToFilter(event, idFilterInput,
                                            setidFilterInput,
                                            'equalTo',
                                            'id')}

                                    />
                                    {filterMapState.id.filterType == "" ? <button className='w-[25%] px-1 py-2' onClick={() => setIdFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> : <button className='w-[25%] px-1 py-2' onClick={() => setIdFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>}
                                    {/* <button className='px-1 py-2 w-[37%]'><img src={Filter} className='h-3 w-3' onClick={() => { setIdFilter((prev) => !prev) }} /></button> */}
                                </div>
                                {idFilter && <NumericFilter inputVariable={idFilterInput} setInputVariable={setidFilterInput} columnName='id' handleFilter={newHandleFilter} menuRef={menuRef} filterType={filterMapState.id.filterType} />}
                            </div>

                            <div className='w-1/2 p-3 flex items-center'>
                                 <RefreshFilterButton
                                   
                                    resetAllInputs={resetAllInputs}
                                    setFilterMapState={setFilterMapState}
                                    filterMapping={filterMapping}
                                /> 
                            </div>
                        </div>
                    </div>
                </div>


                <div className='h-[calc(100vh_-_14rem)] w-full text-[12px]'>
                    <div className='w-full h-16 bg-[#F0F6FF] flex justify-between border-gray-400 border-b-[1px]'>
                        <div className="w-[85%] flex">
                            <div className='w-[3%] flex'>
                                <div className='px-3 py-5'>
                                    <p>Sr.</p>
                                </div>
                            </div>
                            <div className='w-[13%]  flex'>
                                <div className='px-3 py-5'>
                                    <p>Client Name <button onClick={() => handleSort('clientname')}> <span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[11%]  flex'>
                                <div className='px-3 py-5'>
                                    <p>Client Type <button onClick={() => handleSort('clienttypename')}> <span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[10%]  flex'>
                                <div className='px-3 py-5'>
                                    <p>Tenant of <button onClick={() => handleSort('tenantofname')}> <span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[12%]  flex'>
                                <div className='px-3 py-3.5 flex space-x-2'>
                                    <div>

                                        <p>Tenant of </p>
                                        <p>Property</p>

                                    </div>
                                    <button onClick={() => handleSort('tenantofpropertyname')}> <span className="font-extrabold">↑↓</span></button>
                                </div>
                            </div>
                            <div className='w-[8%]  flex'>
                                <div className='px-3 py-5'>
                                    <p>Country<button onClick={() => handleSort('country')}> <span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[8%]  flex'>
                                <div className='px-3 py-5'>
                                    <p>City<button onClick={() => handleSort('city')}> <span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[10%]  flex'>
                                <div className='px-3 py-5'>
                                    <p>Phone <button onClick={() => handleSort('mobilephone')}> <span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[11%]  flex'>
                                <div className='px-3 py-5'>
                                    <p>Email <button onClick={() => handleSort('email1')}> <span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            {/* <div className='w-[9%]  flex'>
                                <div className='px-3 py-3.5 flex space-x-2'>
                                    <div>
                                        <p>Employer </p>
                                        <p>Name </p>
                                    </div>
                                    <button onClick={() => handleSort('employername')}> <span className="font-extrabold">↑↓</span></button>
                                </div>
                            </div> */}
                            <div className='w-[5%]  flex'>
                                <div className='p-3'>

                                </div>
                            </div>
                            <div className='w-[5%]  flex'>
                                <div className='p-3'>

                                </div>
                            </div>
                        </div>
                        <div className="w-[15%] flex">
                            <div className='w-1/2  flex'>
                                <div className='px-3 py-5'>
                                    <p>ID <button onClick={() => handleSort('id')}> <span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-1/2  flex'>
                                <div className='px-3 py-5'>
                                    <p>{canEdit ? "Edit" : ""}</p>
                                </div>
                            </div>
                        </div>

                    </div>



                    <div className='w-full h-[calc(100vh_-_18rem)] overflow-y-auto overflow-x-hidden'>

                         {!pageLoading &&
              existingClientInfo &&
              existingClientInfo.length == 0 && (
                <div className="h-10 border-gray-400 border-b-[1px] flex items-center">
                  <h1 className="ml-10">No Records To Show</h1>
                </div>
              )}
                        {/* {pageLoading && <div className='ml-5 mt-5'><LinearProgress /></div>} */}
                        {!pageLoading && existingClientInfo && existingClientInfo.map((item, index) => {
                            return <div className='w-full h-12 overflow-hidden bg-white flex justify-between border-gray-400 border-b-[1px]'>
                                <div className="w-[85%] flex items-center">
                                    <div className='w-[3%] flex overflow-x-hidden'>
                                        <div className='p-3'>
                                            <p>{index + 1 + (currentPage - 1) * currentPages}</p>
                                        </div>
                                    </div>
                                    <div className='w-[13%]  flex items-center'>
                                        <div className='p-3'>
                                            <p>{item.clientname} </p>
                                        </div>
                                    </div>
                                    <div className='w-[11%]  flex items-center'>
                                        <div className='p-3'>
                                            <p> {item.clienttypename}</p>
                                        </div>
                                    </div>
                                    <div className='w-[10%]  flex items-center'>
                                        <div className='p-3'>
                                            <p>{item.tenantofname} </p>
                                        </div>
                                    </div>
                                    <div className='w-[12%]  flex items-center'>
                                        <div className='p-3'>
                                            <p>{item.tenantofpropertyname}</p>
                                        </div>
                                    </div>
                                    <div className='w-[8%]  flex items-center '>
                                        <div className='p-3 ml-2'>
                                            <p>{item.country}</p>
                                        </div>
                                    </div>
                                    <div className='w-[8%]  flex overflow-hidden items-center'>
                                        <div className='p-3 ml-1'>
                                            <p>{item.city}</p>
                                        </div>
                                    </div>
                                    <div className='w-[10%]  flex overflow-hidden items-center'>
                                        <div className='p-3'>
                                            <p>{item.mobilephone}</p>
                                        </div>
                                    </div>
                                    <div className='w-[11%]  flex items-center '>
                                        <div className='p-3 overflow-hidden '>
                                            <p>{item.email1}</p>
                                        </div>
                                    </div>
                                    {/* <div className='w-[9%]  flex ml-2 items-center justify-center'>
                                        <div className='p-3'>
                                            <p>{item.employername}</p>
                                        </div>
                                    </div> */}
                                    <div className='w-[7%]  flex'>
                                        <div className='p-3 text-[11px] text-blue-500 font-semibold'>
                                            {/* /manage/manageclientinfo/properties/:clientname */}
                                            <Link to={`/manage/manageclientinfo/properties/${item.id}`}><p>Properties</p></Link>
                                            {/* <Link to={`properties/${item.clientname.split(` `).join(`-`).toLowerCase()}`} state={{ clientid: item.id , clientname : item.clientname}}><p>Properties</p></Link> */}
                                        </div>
                                    </div>
                                    <div className='w-[6%]  flex'>
                                        <div className='p-3 text-[11px] text-blue-500 font-semibold'>
                                            {/* /manage/manageclientinfo/orders/:clientname */}
                                            <Link to={`/manage/manageclientinfo/orders/${item.id}`}>Orders</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[15%] flex">
                                    <div className='w-1/2  flex'>
                                        <div className='p-3'>
                                            <p>{item.id}</p>
                                        </div>
                                    </div>
                                    <div className='w-1/2  flex'>
                                        <div className='p-3 flex space-x-2'>
                                            <EditButton
                                                rowData={item.id}
                                                handleEdit={handleEdit}
                                            />
                                            <DeleteButton

                                                handleDelete={openDelete}
                                                rowData={item}
                                            />
                                            {/* <img className='w-5 h-5 cursor-pointer' src={Trash} alt="trash" onClick={() => { openDelete(item.id) }} /> */}
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



            <Modal open={isClientInfoDialogue}
                fullWidth={true}
                maxWidth={'md'}
                className='flex justify-center items-center'
            >
                <div className='flex justify-center'>
                    <Draggable handle='div.move'>
                        <div className="w-[1200px] h-auto bg-white rounded-lg">
                            <div className="move cursor-move">

                                <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-lg relative">
                                    <div className="mr-[410px] ml-[410px]">
                                        <div className="text-[16px]">New Client</div>
                                    </div>
                                    <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white absolute right-2">
                                        <button onClick={handleClose}><img onClick={handleClose} className="w-[20px] h-[20px] " src={Cross} alt="cross" /></button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-1 flex bg-[#DAE7FF] justify-center space-x-4 items-center h-9">
                                <div className={`${selectedDialog == 1 ? "bg-blue-200" : "bg-[#EBEBEB]"} px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-60 cursor-pointer`} onClick={selectFirst}>
                                    <div>Client Information</div>
                                </div>
                                <div className={`${selectedDialog == 2 ? "bg-blue-200" : "bg-[#EBEBEB]"} px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-60 cursor-pointer`} onClick={selectSecond}>
                                    <div>Client Portal</div>
                                </div>
                                <div className={`${selectedDialog == 3 ? "bg-blue-200" : "bg-[#EBEBEB]"} px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-60 cursor-pointer`} onClick={selectThird}>
                                    <div>Bank Details</div>
                                </div>
                                <div className={`${selectedDialog == 4 ? "bg-blue-200" : "bg-[#EBEBEB]"} px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-60 cursor-pointer`} onClick={selectForth}>
                                    <div>Legal Information</div>
                                </div>
                                <div className={`${selectedDialog == 5 ? "bg-blue-200" : "bg-[#EBEBEB]"} px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-60 cursor-pointer`} onClick={selectFifth}>
                                    <div>POA details</div>
                                </div>
                            </div>

                            {selectedDialog == 1 && <ClientInformation formValues={formValues} setFormValues={setFormValues} allCountry={allCountry} clientTypeData={clientTypeData} tenentOfData={tenentOfData} allEntities={allEntities} initialStates={allState} initialCities={allCity} formErrors={formErrorsClientInfo} orderText={orderText} setOrderText={setOrderText} />}
                            {selectedDialog == 2 && <ClientPortal formValues={formValues} setFormValues={setFormValues} />}
                            {selectedDialog == 3 && <BankDetails formValues={formValues} setFormValues={setFormValues} />}
                            {selectedDialog == 4 && <LegalInformation formValues={formValues} setFormValues={setFormValues} relationData={relationData} allCountry={allCountry} allState={allState} initialCities={allCity} />}
                            {selectedDialog == 5 && <POADetails formValues={formValues} setFormValues={setFormValues} relationData={relationData} allCountries={allCountry} initialStates={allState} initialCities={allCity} />}

                            <div className="my-[10px] flex justify-center items-center gap-[10px]">
                                <button className={`${buttonLoading ? " bg-gray-600 cursor-not-allowed disabled" : "bg-[#004DD7]"} w-[100px] h-[35px]  text-white rounded-md`} onClick={handleAddClientInfo} >Add</button>
                                <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleClose}>Cancel</button>
                            </div>

                        </div>
                    </Draggable>
                </div>
            </Modal>
        </div>
    )
}

export default ManageClientInfo;