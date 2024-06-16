import React from 'react';
import { Outlet, Link , useLocation, useNavigate } from "react-router-dom";
import backLink from "../../../assets/back.png";
import searchIcon from "../../../assets/searchIcon.png";
import nextIcon from "../../../assets/next.png";
import refreshIcon from "../../../assets/refresh.png";
import downloadIcon from "../../../assets/download.png";
import { useState, useEffect, useRef } from 'react';
import Navbar from "../../../Components/Navabar/Navbar";
import Cross from "../../../assets/cross.png";
import { Modal, Pagination, LinearProgress, duration , Backdrop , CircularProgress , MenuItem } from "@mui/material";
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
import SaveConfirmationLLAgreement from './SaveConfirmationLLAgreement';
import DeleteLLAgreement from './DeleteLLAgreement';
import AsyncSelect from "react-select/async"
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
import CharacterFilter from "../../../Components/Filters/CharacterFilter";
import DateFilter from '../../../Components/Filters/DateFilter';
import NumericFilter from '../../../Components/Filters/NumericFilter';
import EditManageLLAgreement from './EditManageLLAgreement';
import Draggable from "react-draggable"
import OrderDropDown from '../../../Components/Dropdown/OrderDropdown';
import { formatDate } from '../../../utils/formatDate';
import ActiveFilter from "../../../assets/active_filter.png";
import AddButton from '../../../Components/common/CustomButton';
import EditButton from '../../../Components/common/buttons/EditButton';
import DeleteButton from '../../../Components/common/buttons/deleteButton';
import useAuth from '../../../context/JwtContext';
import checkEditAccess from '../../../Components/common/checkRoleBase';
import OrderCustomSelectNative from '../../../Components/common/select/OrderCustomSelectNative';
import ClientPropertySelectNative from '../../../Components/common/select/ClientPropertySelectNative';
const env_URL_SERVER = import.meta.env.VITE_ENV_URL_SERVER
const ManageLLAgreement = () => {
    const {user} = useAuth()
    const navigate = useNavigate();
    const canEdit = checkEditAccess();
    const { state , pathname} =  useLocation();
    console.log(pathname)
    console.log(state)

    // const initialRows = [
    //     "id",
    //     "clientpropertyid",
    //     "orderid",
    //     "orderdescription",
    //     "startdate",
    //     "durationinmonth",
    //     "depositamount",
    //     "rentpaymentdate",
    //     "rentamount",
    //     "registrationtype",
    //     "noticeperiodindays",
    //     "active",
    //     "llscancopy",
    //     "dated",
    //     "createdby",
    //     "isdeleted"
    // ]
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
    const [isLLAgreementDialogue, setIsLLAgreementDialogue] = useState(false);
    const [isEditDialogue, setIsEditDialogue] = React.useState(false);
    const [currItem, setCurrItem] = useState({});
    const [showAddSuccess, setShowAddSuccess] = useState(false);
    const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

    const [clientNameFilter, setClientNameFilter] = useState(false);
    const [clientNameFilterInput, setClientNameFilterInput] = useState("");
    const [propertyDescriptionFilter, setPropertyDescriptionFilter] = useState(false);
    const [propertyDescriptionFilterInput, setPropertyDescriptionFilterInput] = useState("");
    const [propertyStatusFilter, setPropertyStatusFilter] = useState(false);
    const [propertyStatusFilterInput, setPropertyStatusFilterInput] = useState("");
    const [statusFilter, setStatusFilter] = useState(false);
    const [statusFilterInput, setStatusFilterInput] = useState("");
    const [startFilter, setStartFilter] = useState(false);
    const [startFilterInput, setStartFilterInput] = useState("");
    const [endFilter, setEndFilter] = useState(false);
    const [endFilterInput, setEndFilterInput] = useState("");
    const [idFilter,setIdFilter] = useState(false)
    const [idFilterInput,setIdFilterInput] = useState("")
    const [openAddConfirmation, setOpenAddConfirmation] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isFailureModal, setIsFailureModal] = useState(false)
    const [deleteConfirmation, showDeleteConfirmation] = useState(false);
    const [tenantDetails, setTenantDetails] = useState(false);
    // const [filterArray,setFilterArray] = useState([]);
    const dataRows = [
        "id",
        "clientpropertyid",
        "orderid",
        "clientname",
        "propertydescription",
        "propertystatus",
        "propertystatusname",
        "orderdescription",
        "startdate",
        "durationinmonth",
        "depositamount",
        "rentpaymentdate",
        "rentamount",
        "registrationtype",
        "noticeperiodindays",
        "activemap",
        "llscancopy",
        "dated",
        "createdby",
        "isdeleted",
        "actualenddate"
    ]
    const fetchCountryData = async () => {
        setPageLoading(true);
        // const data = { "user_id":  user.id };
        const data = {  "rows": ["id", "name"], "filters": [], "sort_by": [], "order": "asc", "pg_no": 0, "pg_size": 0 };
        const response = await APIService.getCountries({...data,user_id : user.id})
        const result = (await response.json()).data;
        console.log(result.data);
        if (Array.isArray(result.data)) {
            setAllCountry(result.data);
        }
    }
    const fetchStateData = async (id) => {
        console.log(id);
        const data = {  "country_id": id };
        // const data = {"rows":["id","state"],"filters":[],"sort_by":[],"order":"asc","pg_no":0,"pg_size":0};
        const response = await APIService.getState({...data,user_id : user.id});
        const result = (await response.json()).data;
        console.log(result)
        if (Array.isArray(result)) {
            setAllState(result)
        }
    }
    const fetchCityData = async (id) => {
        const data = {  "state_name": id };
        const response = await APIService.getCities({...data,user_id : user.id});
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
    const fetchUsersData = async () => {
        setPageLoading(true);
        // const data = { "user_id":  user.id };
        const data = {  };
        const response = await APIService.getUsers({...data,user_id : user.id})
        const result = (await response.json());

        console.log(result.data);
        console.log('hey')
        setFormValues((existing) => {
            return { ...existing, userName: result.data[0].id }
        })
        if (Array.isArray(result.data)) {
            setAllUsername(result.data);
        }
    }

    const fetchRoleData = async () => {
        setPageLoading(true);
        // const data = { "user_id":  user.id };
        const data = {  };
        const response = await APIService.getRoles({...data,user_id : user.id})
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
        // const data = { "user_id":  user.id };
        const data = {  };
        const response = await APIService.getEntityAdmin({...data,user_id : user.id})
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
            
            "rows": ["id", "name", "lob_head", "company"],
            "filters": [],
            "sort_by": [],
            "order": "asc",
            "pg_no": Number(currentPage),
            "pg_size": Number(currentPages)
        };
        const response = await APIService.getLob({...data,user_id : user.id});
        const result = (await response.json());
        console.log(result.data);
        setFormValues((existing) => {
            return { ...existing, lob: result.data[0].id }
        })
        if (Array.isArray(result.data)) {
            setAllLOB(result.data);
        }
    }

    const [orders, setOrders] = useState([]);

    const getOrdersByClientId = async (id) => {
        console.log('hello')
        const data = {
            
            "client_id": id
        }
        const response = await APIService.getOrdersByClientId({...data,user_id : user.id})
        const res = await response.json()
        console.log(res.data)
        setOrders((prev) => {
            const temp = {}
             res.data.forEach((item) => {
                temp[item.id] = item.ordername;
              });
            return temp
        })
    }
    function convertToIdNameObject(items) {
        const idNameObject = {};
        items.forEach((item) => {
          idNameObject[item.id] = {
            buildername : item.buildername,
            propertyname : item.propertyname
          }
        });
        return idNameObject;
    }
    const [clientPropertyData, setClientPropertyData] = useState([]);
    const getClientPropertyByClientId = async (id) => {
        const data = {
            
            "client_id": id
        }

        const response = await APIService.getClientPropertyByClientId({...data,user_id : user.id})
        const res = await response.json()
        console.log(res)
        setClientPropertyData(convertToIdNameObject(res.data))
    }

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
        const existing = { ...formValues }
        existing.client = e.value
        getOrdersByClientId(e.value)
        getClientPropertyByClientId(e.value)
        setFormValues(existing)
        setOrderText("Select Order")
        setPropertyText("Select Client Property")
        //    const existing = {...formValues}
        //    const temp = {...existing.client_property}
        //    temp.clientid = e.value
        //    existing.client_property = temp;
        //    setFormValues(existing)
        console.log(formValues)
        setSelectedOption(e)
    }
    const handleTenantClientNameChange = (e, index) => {
        const temp = [...selectedOptions]

        temp[index] = e;
        setSelectedOptions(temp);
    }
    const loadOptions = async (e) => {
        console.log(e)
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

    const [sortField, setSortField] = useState("id")
    const [flag, setFlag] = useState(false)
    const [existingLLAgreement, setExistingLLAgreement] = useState([])
    const fetchData = async () => {
        console.log('ugm')
        setPageLoading(true);
        setCurrentPage((prev) => 1)
        const tempArray = [];
        // we need to query thru the object
        // console.log(filterMapState);
        console.log(filterMapState)
        Object.keys(filterMapState).forEach(key => {
            if (filterMapState[key].filterType != "") {
                tempArray.push([key, filterMapState[key].filterType, filterMapState[key].filterValue, filterMapState[key].filterData]);
            }
        })
        setFilterState((prev) => tempArray)
        const data = {
            
            "rows": dataRows,
            "filters": tempArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": searchInput
        };
        const response = await APIService.getLLAgreement({...data,user_id : user.id});
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingLLAgreement(result);
        setPageLoading(false);
    }
    const fetchPageData = async (pageNumber) => {
        setPageLoading(true);
        const data = {
            
            "rows": dataRows,
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": Number(pageNumber),
            "pg_size": Number(currentPages),
            "search_key": searchInput
        };
        const response = await APIService.getLLAgreement({...data,user_id : user.id});
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingLLAgreement(result);
        setPageLoading(false);
    }
    const fetchQuantityData = async (quantity) => {
        setPageLoading(true);
        console.log(searchInput);
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
        const response = await APIService.getLLAgreement({...data,user_id : user.id});
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingLLAgreement(result);
        setPageLoading(false);
    }
    const setHyperlinkData = () => {
        if(state != null) {
            const v = {...selectedOption}
            v.label = state.clientname 
            v.value = state.clientid 
            setSelectedOption(v)
            getOrdersByClientId(state.clientid)
            const temp = {...formValues}
            temp.client = state.clientid 
            temp.clientProperty = state.clientPropertyId
            setFormValues(temp)
        }

    }
    useEffect(() => {
        setHyperlinkData()
        fetchData();
        fetchCountryData();
        fetchStateData(5)
        fetchCityData("Maharashtra");
        fetchEntitiesData();
        fetchRoleData();
        fetchUsersData();
        fetchLobData();

        const handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setClientNameFilter(false);
                setPropertyDescriptionFilter(false);
                setPropertyStatusFilter(false);
                setStatusFilter(false);
                setStartFilter(false);
                setEndFilter(false);
                setDownloadModal(false)
                setIdFilter(false)
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
        setIsLLAgreementDialogue(true);
    };

    const handleClose = () => {
        initials();
        setIsLLAgreementDialogue(false);
        openAddCancelModal();
    }
    const initials = () => {
        setHyperlinkData()
        setFormValues(initialValues);
        setFormErrors({});
        setSelectedOption(
            {
                label: "Select Client",
                value: null
            }
        )
        setOrders([]);
        setClientPropertyData([]);
        setOrderText("Select Order");
        setPropertyText("Select Client Property")
    }

    const handleOpenTenantDetails = async  (id) => {
        setCurrItem(id);
        // here we need to fetch the existing data as well
        const data = {"leavelicenseid":id}
        const response = await APIService.getLLTenant({...data,user_id : user.id})
        const res  = await response.json()
        const tempArray = []
        if(res.result == 'success') {
            for(var i=0;i<res.data.length;i++) {
                tempArray.push({
                    label : res.data[i].tenantname,
                    value : res.data[i].tenantid
                })
            }
        }
        setSelectedOptions((prev) => tempArray)

        console.log(res)
        
        // now we need to set the data



        setTenantDetails(true);
    }

    const handleCloseTenantDetails = () => {
        setTenantDetails(false);
    }

    // harcoded dropdown
    const rentPaymentDate = [
        {
            id: 1,
            day: 1
        },
        {
            id: 2,
            day: 2
        },
        {
            id: 3,
            day: 3
        },
        {
            id: 4,
            day: 4
        },
        {
            id: 5,
            day: 5
        },
        {
            id: 6,
            day: 6
        },
        {
            id: 7,
            day: 7
        },
        {
            id: 8,
            day: 8
        },
        {
            id: 9,
            day: 9
        },
        {
            id: 10,
            day: 10
        },
        {
            id: 11,
            day: 11
        },
        {
            id: 12,
            day: 12
        },
        {
            id: 13,
            day: 13
        },
        {
            id: 14,
            day: 14
        },
        {
            id: 15,
            day: 15
        },
        {
            id: 16,
            day: 16
        },
        {
            id: 17,
            day: 17
        },
        {
            id: 18,
            day: 18
        },
        {
            id: 19,
            day: 19
        },
        {
            id: 20,
            day: 20
        },
        {
            id: 21,
            day: 21
        },
        {
            id: 22,
            day: 22
        },
        {
            id: 23,
            day: 23
        },
        {
            id: 24,
            day: 24
        },
        {
            id: 25,
            day: 25
        },
        {
            id: 26,
            day: 26
        },
        {
            id: 27,
            day: 27
        },
        {
            id: 28,
            day: 28
        },
        {
            id: 29,
            day: 29
        },
        {
            id: 30,
            day: 30
        },
        {
            id: 31,
            day: 31
        },
    ];


    const registrationType = [
        {
            id: 1,
            type: "Registered"
        },
        {
            id: 2,
            type: "Notarized"
        }
    ];
    //end

    const handleAddLLAgreement = () => {
        console.log(formValues)
        if (!validate()) {
            console.log('hu')
            return;
        }
        setIsLLAgreementDialogue(false);
        setOpenAddConfirmation(true)

    }

    const addLLAgreement = async () => {
        // console.log('clicked')
        console.log(formValues)
        // setPageLoading(true);
        const data = {
            
            "clientpropertyid": Number(formValues.clientProperty),
            "orderid": Number(formValues.order),
            "durationinmonth": Number(formValues.durationInMonth),
            "depositamount": Number(formValues.depositeAmount),
            "startdate": formValues.startDate,
            "actualenddate": formValues.endDate,
            "rentamount": Number(formValues.rentAmount),
            "registrationtype": formValues.registrationType,
            "rentpaymentdate": Number(formValues.rentPaymentDate),
            "noticeperiodindays": formValues.noticePeriod,
            "active": formValues.status,
            "llscancopy": formValues.scan
        }
        const response = await APIService.addLLAgreement({...data,user_id : user.id});

        const result = (await response.json())

        setOpenAddConfirmation(false);
        console.log(result)
        setIsLLAgreementDialogue(false);
        if (result.result == "success") {
            const temp = { ...selectedOption }
            temp.label = "Select Client"
            temp.value = null
            setSelectedOption(temp)
            setOrderText("Select Order")
            setPropertyText("Select Client Property")
            setFormValues(initialValues);
            openAddSuccess();
        } else {
            setFormValues(initialValues);
            setSelectedOption({

                label: "Enter Client Name",
                value: null

            })
            openFailureModal();
            setErrorMessage(result.message)
        }

        console.log({...data,user_id : user.id});
        console.log(result);
    }

    const initialValues = {
        client: "",
        clientProperty: null,
        startDate: null,
        rentAmount: null,
        depositeAmount: null,
        scan: "",
        order: null,
        durationInMonth: null,
        endDate: null,
        rentPaymentDate: 1,
        noticePeriod: null,
        registrationType: "Registered",
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
        if (!formValues.clientProperty || formValues.clientProperty == "") {
            setFormErrors((existing) => {
                return { ...existing, clientProperty: "Select Client Property" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, clientProperty: "" }
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
        if (!formValues.startDate) {
            setFormErrors((existing) => {
                return { ...existing, startDate: "Select Start Date" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, startDate: "" }
            })
        }
        // if (!formValues.order) {
        //     setFormErrors((existing) => {
        //         return { ...existing, order: "Select Order" }
        //     })
        //     res = false;
        // } else {
        //     setFormErrors((existing) => {
        //         return { ...existing, order: "" }
        //     })
        // }

        if (!formValues.durationInMonth) {
            setFormErrors((existing) => {
                return { ...existing, durationInMonth: "Enter duration" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, durationInMonth: "" }
            })
        }
        if (!formValues.endDate) {
            setFormErrors((existing) => {
                return { ...existing, endDate: "Select End Date" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, endDate: "" }
            })
        }
        return res;
    }
    const [currLL, setCurrLL] = useState("");
    const handleDelete = (id) => {
        setCurrLL(id);
        showDeleteConfirmation(true);
    }
    const deleteLLAgreement = async (id) => {
        const data = {
            
            "id": id
        }
        const response = await APIService.deleteLLAgreement({...data,user_id : user.id});
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
        setDownloadModal(false)
        setPageLoading(true);
        const data = {
            
            "rows": [
                "clientname" ,
                "propertydescription" ,
                "propertystatusname",
                "activemap",
                "startdate" ,
                "actualenddate" ,
                "id",
            ],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 0,
            "pg_size": 0,
            "search_key": searchInput,
            "downloadType" : type,
            "routename" : '/manage/managellagreement',
            "colmap" : {
                "clientname" : "Client Name",
                "propertydescription" : "Property Description",
                "propertystatusname" : "Property Status",
                "activemap" : "Status",
                "startdate" : "Start Date",
                "actualenddate" : "End Date",
                "id" : "ID",
            }
        };
        const response = await APIService.getLLAgreement({...data,user_id : user.id})
        const temp = await response.json();
        const result = temp.data;
        console.log(temp)
        if(temp.result == 'success') {
            const d = {
                "filename" : temp.filename,
                "user_id" : user.id
            }
            APIService.download(d,temp.filename).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.blob();
            })
            .then(result => {
                if(type == "excel") {
                    FileSaver.saveAs(result, 'LLAgreementData.xlsx');
                }else if(type == "pdf") {
                    FileSaver.saveAs(result, 'LLAgreementData.pdf');
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
        const data = {
            
            "rows": dataRows,
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 0,
            "pg_size": 0,
            "search_key": searchInput
        };
        const response = await APIService.getLLAgreement({...data,user_id : user.id});
        const temp = await response.json();
        const result = temp.data;
        const worksheet = XLSX.utils.json_to_sheet(result);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "LLAgreementData.xlsx");
        FileSaver.saveAs(workbook, "demo.xlsx");
    }
    const handleSearch = async () => {
        // console.log("clicked")
        setPageLoading(true);
        setCurrentPage((prev) => 1)
        // setCurrentPages(15)
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
        const response = await APIService.getLLAgreement({...data,user_id : user.id});
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingLLAgreement(result);
        setPageLoading(false);
    }
    const handleCloseSearch = async () => {
        setIsSearchOn(false);
        setPageLoading(true);
        setSearchInput("");
        setCurrentPage((prev) => 1)
        const data = {
            
            "rows": dataRows,
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": ""
        };
        const response = await APIService.getLLAgreement({...data,user_id : user.id});
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingLLAgreement(result);
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
        setIsLLAgreementDialogue(false);
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

    const handleSort = async (field) => {
        setPageLoading(true);
        // const tempArray = [];
        // we need to query thru the object
        setSortField(field)
        // console.log(filterMapState);
        // Object.keys(filterMapState).forEach(key => {
        //     if (filterMapState[key].filterType != "") {
        //         tempArray.push([key, filterMapState[key].filterType, filterMapState[key].filterValue, filterMapState[key].filterData]);
        //     }
        // })
        setFlag((prev) => !prev);
        const data = {
            
            "rows": dataRows,
            "filters": filterState,
            "sort_by": [field],
            "order": !flag ? "asc" : "desc",
            "pg_no": Number(currentPage),
            "pg_size": Number(currentPages),
            "search_key": searchInput
        };

        const response = await APIService.getLLAgreement({...data,user_id : user.id});
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingLLAgreement(result);
        setPageLoading(false);
    }

    const filterMapping = {
        clientname: {
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
        propertystatusname: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        activemap: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        startdate: {
            filterType: "",
            filterValue: null,
            filterData: "Date",
            filterInput: ""
        },
        actualenddate: {
            filterType: "",
            filterValue: null,
            filterData: "Date",
            filterInput: ""
        },
        id : {
            filterType: "",
            filterValue: "",
            filterData: "Numeric",
            filterInput: ""
        },
        clientpropertyid : {
            filterType: state ? "equalTo" : "",
            filterValue: state?.clientPropertyId,
            filterData: "Numeric",
            filterInput: state?.clientPropertyId
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
        setClientNameFilter(false);
        setPropertyDescriptionFilter(false);
        setPropertyStatusFilter(false);
        setStatusFilter(false);
        setStartFilter(false);
        setEndFilter(false);
        setIdFilter(false)
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
        setFilterState((prev) => tempArray)
        setCurrentPage((prev) => 1)
        setPageLoading(true);
        const data = {
            "rows": dataRows,
            "filters": tempArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": searchInput
        };
        const response = await APIService.getLLAgreement({...data,user_id : user.id});
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingLLAgreement(result);
        setPageLoading(false);
    }
    const [selectedOptions, setSelectedOptions] = useState([
        {
            label: "Select Client",
            value: null
        }
    ])

    const handleAddClient = () => {
        console.log('called')
        const temp = [...selectedOptions];
        temp.push({
            label: "Select Client",
            value: null
        })
        setSelectedOptions(temp)
    }
    const handleDeleteAtIndex = (index) => {
        const temp = [...selectedOptions];

        temp.splice(index, 1);
        setSelectedOptions(temp)
    }
    const handleAddTenant = async () => {
        // we need the id here as well
        // in this we need to firstly delete the elements of the current id

        const d = {"leavelicenseid":currItem}

        const r = await APIService.deleteLLTenant({...d,user_id : user.id})

        const rs = await r.json()

        if(rs.result == 'success') {

            const temp = []
            for (var i = 0; i < selectedOptions.length; i++) {
                if(selectedOptions[i].value != null) {
                    temp.push({ "tenantid": selectedOptions[i].value })
                }
                
            }
            const data = {
                
                "leavelicenseid": currItem,
                "tenants": temp
            }
            const response = await APIService.addLLTenant({...data,user_id : user.id})
            const res = await response.json()
            console.log(res)
            setTenantDetails(false)
            openAddTenantConfirmation()
        }else {

        } 
        
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

    const [orderText, setOrderText] = useState("Select Order");
    const [propertyText , setPropertyText] = useState("Select Client Property");
    const [addTenantConfirmationSuccess,setAddTenantAddConfirmationSuccess] = useState(false)
    const openAddTenantConfirmation = () => {
        setAddTenantAddConfirmationSuccess(true);
        setTimeout(function () {
            setAddTenantAddConfirmationSuccess(false)
        }, 2000)
    }
    return (
        <div className='font-medium'>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={pageLoading}
                onClick={() => {}}
            >

               <CircularProgress color="inherit"/>

            </Backdrop>
            {isEditDialogue && <EditManageLLAgreement handleClose={() => setIsEditDialogue(false)} currItem={currItem} openEditSuccess={openEditSuccess} showCancel={openCancelModal} />}
            {/* {isEditDialogue && <EditManageEmployee isOpen={isEditDialogue} handleClose={() => setIsEditDialogue(false)} item={currItem} showSuccess={openEditSuccess} />} */}
            {showAddSuccess && <SucessfullModal isOpen={showAddSuccess} message="New L&L Agreement Created Successfully" />}
            {showDeleteSuccess && <SucessfullModal isOpen={showDeleteSuccess} message="L&L Agreement Deleted Successfully" />}
            {showEditSuccess && <SucessfullModal isOpen={showEditSuccess} message="Changes Saved Successfully" />}
            {addTenantConfirmationSuccess && <SucessfullModal isOpen={addTenantConfirmationSuccess} message="Tenants Added Successfully" />}
            {openAddConfirmation && <SaveConfirmationLLAgreement handleClose={() => setOpenAddConfirmation(false)} addLLAgreement={addLLAgreement} showCancel={openAddCancelModal} setDefault={initials} />}
            {isFailureModal && <FailureModal isOpen={isFailureModal} message={errorMessage} />}
            {deleteConfirmation && <DeleteLLAgreement handleClose={() => showDeleteConfirmation(false)} handleDelete={deleteLLAgreement} item={currLL} showCancel={openCancelModal} />}
            {showCancelModelAdd && <CancelModel isOpen={showCancelModelAdd} message="Process cancelled, No ll agreement created" />}
            {showCancelModel && <CancelModel isOpen={showCancelModel} message="Process cancelled, no changes saved." />}
            <div className='h-[calc(100vh_-_123px)] w-full  px-10'>
                <div className='h-16 w-full  flex justify-between items-center p-2  border-gray-300 border-b-2'>
                    <div className='flex items-center space-x-3'>
                        <div className='rounded-2xl  bg-[#EBEBEB] h-8 w-8 flex justify-center items-center '>
                            <button onClick={() => navigate(-1)}><img className='w-5 h-5' src={backLink} /></button>
                        </div>

                        <div className='flex-col'>
                            <h1 className='text-[18px]'>Manage L&L Agreement </h1>
                            <p className='text-[14px]'>Manage &gt; Manage L&L Agreement</p>
                        </div>
                    </div>
                    <div className='flex space-x-2 items-center'>

                        <div className='flex bg-[#EBEBEB]'>
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
                            <button onClick={handleCloseSearch}><img src={Cross} className='w-5 h-5 mx-2' /></button>
                            <div className="h-[36px] w-[40px] bg-[#004DD7] flex items-center justify-center rounded-r-lg">
                                <button onClick={handleSearch}><img className="h-[26px] " src={searchIcon} alt="search-icon" /></button>
                            </div>
                        </div>

                        <div>
                            {/* button */}
                            {/* <button className="bg-[#004DD7] text-white h-[36px] w-[300px] rounded-lg" onClick={handleOpen}>
                                <div className="flex items-center justify-center gap-4">
                                    Add New L&L Agreement
                                    <img className='h-[18px] w-[18px]' src={Add} alt="add" />
                                </div>
                            </button> */}
                            <AddButton title="Add New L&L Agreement" sx={{ width: "300px" }} onClick={handleOpen} />
                        </div>

                    </div>

                </div>





                {/* filter component */}
                <div className='h-12 w-full bg-white'>
                    <div className='w-full h-12 bg-white flex justify-between'>
                        <div className="w-[78%] flex">
                            <div className='w-[3%] flex'>
                                <div className='p-3'>
                                    {/* <p>Sr.</p> */}
                                </div>
                            </div>
                            <div className='w-[18%]  px-3 py-2.5'>
                                <div className="w-[60%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-[70%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" value={clientNameFilterInput} onChange={(e) => setClientNameFilterInput(e.target.value)}
                                    onKeyDown={(event) => handleEnterToFilter(event,clientNameFilterInput,
                                        setClientNameFilterInput,
                                        'contains',
                                        'clientname')}
                                         />
                                          {filterMapState.clientname.filterType == "" ?  <button className='w-[25%] px-1 py-2' onClick={() => setClientNameFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> :  <button className='w-[25%] px-1 py-2' onClick={() => setClientNameFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>  }
                                    
                                </div>
                                {clientNameFilter && <CharacterFilter inputVariable={clientNameFilterInput} setInputVariable={setClientNameFilterInput} handleFilter={newHandleFilter} filterColumn='clientname' menuRef={menuRef} type={filterMapState.clientname.filterType}/>}
                            </div>

                            <div className='w-[19%]  px-3 py-2.5'>
                                <div className="w-[55%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-[70%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" value={propertyDescriptionFilterInput} onChange={(e) => setPropertyDescriptionFilterInput(e.target.value)}
                                    onKeyDown={(event) => handleEnterToFilter(event,propertyDescriptionFilterInput,
                                        setPropertyDescriptionFilterInput,
                                        'contains',
                                        'propertydescription')}
                                         />
                                         {filterMapState.propertydescription.filterType == "" ?  <button className='w-[25%] px-1 py-2' onClick={() => setPropertyDescriptionFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> :  <button className='w-[25%] px-1 py-2' onClick={() => setPropertyDescriptionFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>  }
                                    {/* <button className='px-1 py-2 w-[30%]'><img src={Filter} className='h-3 w-3' onClick={() => { setPropertyDescriptionFilter((prev) => !prev) }} /></button> */}
                                </div>
                                {propertyDescriptionFilter && <CharacterFilter inputVariable={propertyDescriptionFilterInput} setInputVariable={setPropertyDescriptionFilterInput} handleFilter={newHandleFilter} filterColumn='propertydescription' menuRef={menuRef} type={filterMapState.propertydescription.filterType}/>}
                            </div>

                            <div className='w-[15%]  px-3 py-2.5'>
                                <div className="w-[60%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-[70%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" value={propertyStatusFilterInput} onChange={(e) => setPropertyStatusFilterInput(e.target.value)} 
                                    onKeyDown={(event) => handleEnterToFilter(event,propertyStatusFilterInput,
                                        setPropertyStatusFilterInput,
                                        'contains',
                                        'propertystatusname')}
                                        />
                                        {filterMapState.propertystatusname.filterType == "" ?  <button className='w-[25%] px-1 py-2' onClick={() => setPropertyStatusFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> :  <button className='w-[25%] px-1 py-2' onClick={() => setPropertyStatusFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>  }
                                    
                                </div>
                                {propertyStatusFilter && <CharacterFilter inputVariable={propertyStatusFilterInput} setInputVariable={setPropertyStatusFilterInput} handleFilter={newHandleFilter} filterColumn='propertystatusname' menuRef={menuRef} type={filterMapState.propertystatusname.filterType}/>}
                            </div>

                            <div className='w-[15%]  px-3 py-2.5'>
                                <div className="w-[60%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-[70%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" value={statusFilterInput} onChange={(e) => setStatusFilterInput(e.target.value)}
                                    onKeyDown={(event) => handleEnterToFilter(event,statusFilterInput,
                                        setStatusFilterInput,
                                        'contains',
                                        'activemap')}
                                         />
                                         {filterMapState.activemap.filterType == "" ?  <button className='w-[25%] px-1 py-2' onClick={() => setStatusFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> :  <button className='w-[25%] px-1 py-2' onClick={() => setStatusFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>  }
                                    
                                </div>
                                {statusFilter && <CharacterFilter inputVariable={statusFilterInput} setInputVariable={setStatusFilterInput} filterColumn='activemap' handleFilter={newHandleFilter} menuRef={menuRef} type={filterMapState.activemap.filterType}/>}
                            </div>

                            <div className='w-[15%]  px-3 py-2.5'>
                                <div className="w-[60%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-[70%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" type="date" value={startFilterInput} onChange={(e) => setStartFilterInput(e.target.value)}
                                    onKeyDown={(event) => handleEnterToFilter(event,startFilterInput,
                                        setStartFilterInput,
                                        'equalTo',
                                        'startdate')}
                                         />
                                         {filterMapState.startdate.filterType == "" ?  <button className='w-[25%] px-1 py-2' onClick={() => setStartFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> :  <button className='w-[25%] px-1 py-2' onClick={() => setStartFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>  }
                                    {/* <button className='px-1 py-2 w-[30%]'><img src={DateIcon} className='h-3 w-3' onClick={() => { setStartFilter((prev) => !prev) }} /></button> */}
                                </div>
                                {startFilter && <DateFilter inputVariable={startFilterInput} setInputVariable={setStartFilterInput} handleFilter={newHandleFilter} columnName='startdate' menuRef={menuRef} type={filterMapState.startdate.filterType}/>}
                            </div>

                            <div className='w-[10%]  px-3 py-2.5'>
                                <div className="w-[60%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-[70%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" type="date" value={endFilterInput} onChange={(e) => setEndFilterInput(e.target.value)} 
                                    onKeyDown={(event) => handleEnterToFilter(event,endFilterInput,
                                        setEndFilterInput,
                                        'equalTo',
                                        'actualenddate')}
                                        />
                                        {filterMapState.actualenddate.filterType == "" ?  <button className='w-[25%] px-1 py-2' onClick={() => setEndFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> :  <button className='w-[25%] px-1 py-2' onClick={() => setEndFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>  }
                                    {/* <button className='px-1 py-2 w-[30%]'><img src={DateIcon} className='h-3 w-3' onClick={() => { setEndFilter((prev) => !prev) }} /></button> */}
                                </div>
                                {endFilter && <DateFilter inputVariable={endFilterInput} setInputVariable={setEndFilterInput} handleFilter={newHandleFilter} columnName='actualenddate' menuRef={menuRef} type={filterMapState.actualenddate.filterType}/>}
                            </div>

                        </div>
                        <div className="w-[23%] flex">
                            <div className='w-[35%]'>

                            </div>
                            <div className='w-[45%]   p-3 '>
                              <div className="w-[60%] flex items-center bg-[#EBEBEB] rounded-[5px] ">
                                    <input className="w-[70%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" value={idFilterInput} onChange={(e) => setIdFilterInput(e.target.value)}
                                    onKeyDown={(event) => handleEnterToFilter(event,idFilterInput,
                                        setIdFilterInput,
                                        'equalTo',
                                        'id')}
                                         />
                                         {filterMapState.id.filterType == "" ?  <button className='w-[25%] px-1 py-2' onClick={() => setIdFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> :  <button className='w-[25%] px-1 py-2' onClick={() => setIdFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>  }
                                    
                                </div>
                                {idFilter && <NumericFilter inputVariable={idFilterInput} setInputVariable={setIdFilterInput} columnName='id' handleFilter={newHandleFilter} menuRef={menuRef} type={filterMapState.id.filterType}/>}
                            </div>
                            
                            {/* <div className='w-1/2  flex'>
                                <div className='p-3'>

                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>

                <div className='h-[calc(100vh_-_14rem)] w-full text-[12px]'>
                    <div className='w-full h-16 bg-[#F0F6FF] flex justify-between border-gray-400 border-b-[1px]'>
                        <div className="w-[78%] flex">
                            <div className='w-[3%] flex'>
                                <div className='px-3 py-5'>
                                    <p>Sr.</p>
                                </div>
                            </div>
                            <div className='w-[18%]  flex'>
                                <div className='px-3 py-5'>
                                    <p>Client Name <button onClick={() => handleSort('clientname')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[19%]  flex'>
                                <div className='px-3 py-5'>
                                    <p>Property Description <button onClick={() => handleSort('propertydescription')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[15%]  flex'>
                                <div className='p-3'>
                                    <p>Property</p>
                                    <p>Status</p>
                                </div>
                                <button onClick={() => handleSort('propertystatusname')}><span className="font-extrabold">↑↓</span></button>
                            </div>
                            <div className='w-[15%]  flex'>
                                <div className='px-3 py-5'>
                                    <p>Status <button onClick={() => handleSort('activemap')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[15%]  flex'>
                                <div className='px-3 py-5'>
                                    <p>Start date <button onClick={() => handleSort('startdate')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[10%]  flex'>
                                <div className='px-3 py-5'>
                                    <p>End date <button onClick={() => handleSort('clientname')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                        </div>
                        <div className="w-[23%] flex">
                            <div className='w-[30%]  flex'>
                                <div className='px-3 py-5'>
                                    <p>Tenant</p>
                                </div>
                            </div>
                            <div className='w-[35%] flex items-center pl-12'>
                                  ID
                            </div>
                            <div className='w-[35%]  flex'>
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
                        {!pageLoading && existingLLAgreement && existingLLAgreement.length == 0 && <div className='h-10 border-gray-400 border-b-[1px] flex items-center'>
                            <h1 className='ml-10'>No Records To Show</h1>
                        </div>}
                        {!pageLoading && existingLLAgreement.map((item, index) => {
                            return <div className='w-full bg-white flex justify-between items-center border-gray-400 border-b-[1px] py-1'>
                                <div className="w-[78%] flex items-center">
                                    <div className='w-[3%] flex'>
                                        <div className='px-3'>
                                            <p>{index + 1 + (currentPage - 1) * currentPages}</p>
                                        </div>
                                    </div>
                                    <div className='w-[18%]  flex'>
                                        <div className='px-3'>
                                            {item.clientname}
                                        </div>
                                    </div>
                                    <div className='w-[19%]  flex'>
                                        <div className='px-3'>
                                            {item.propertydescription}
                                        </div>
                                    </div>
                                    <div className='w-[15%]  flex pl-0.5'>
                                        <div className='px-3'>
                                            {item.propertystatusname}
                                        </div>

                                    </div>
                                    <div className='w-[15%]  flex'>
                                        <div className='px-3 ml-1 flex items-center space-x-2'>
                                            {item.activemap == 'Active' ? <><div className='w-[7px] h-[7px] rounded-xl bg-green-600'></div>
                                                <p>{item.activemap}</p></> : <><div className='w-[7px] h-[7px] rounded-xl bg-red-600'></div>
                                                <p> {item.activemap}</p></>}
                                        </div>
                                    </div>
                                    <div className='w-[15%]  flex pl-1'>
                                        <div className='px-3'>
                                            {formatDate(item.startdate)}
                                        </div>
                                    </div>
                                    <div className='w-[10%]  flex pl-1'>
                                        <div className='px-3'>
                                            {formatDate(item.actualenddate)}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[23%] flex">
                                    <div className='w-[30%]  flex'>
                                        <button onClick={() => handleOpenTenantDetails(item.id)} >
                                            <div className=' text-blue-400 cursor-pointer'>
                                                Tenant Details
                                            </div>
                                        </button>

                                    </div>
                                    <div className='w-[35%] flex items-center justify-center pl-2'>
                                        {item.id}
                                    </div>
                                    <div className='w-[35%]  flex overflow-hidden items-center space-x-4 ml-3'>
                                        <EditButton
                                           handleEdit={handleOpenEdit}
                                           rowData={item}
                                        />
                                        <DeleteButton
                                           handleDelete={handleDelete}
                                           rowData={item.id}
                                         />
                                        {/* <button onClick={() => handleOpenEdit(item)}><img className=' h-4 w-4 ml-3' src={Edit} alt="edit" /></button>
                                        <button onClick={() => handleDelete(item.id)}><img className=' h-4 w-4' src={Trash} alt="trash" /></button> */}
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

            <Modal open={isLLAgreementDialogue}
                fullWidth={true}
                maxWidth={'md'}
                className='flex justify-center items-center'
            >
                <>
                    <Draggable handle='div.move'>
                        <div className='flex justify-center'>
                            <div className="w-[1050px] h-auto bg-white rounded-lg">
                                <div className='move cursor-move'>
                                    <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-t-lg relative">
                                        <div className="mr-[410px] ml-[410px]">
                                            <div className="text-[16px]">New L&L Agreement</div>
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
                                                <div className="text-[13px]">
                                                    Client <label className="text-red-500">*</label>
                                                </div>
                                                {state?.hyperlinked ?
                                                 <div className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs py-0.5 bg-[#F5F5F5]" type="text" name="curaoffice" >{state.clientname}</div> : 
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
                                                            width: 230,
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
                                                            width: 230, // Adjust the width of the dropdown menu
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
                                                <div className="text-[8px] text-[#CD0000] absolute">{formErrors.client}</div>
                                            </div>
                                            <div className="">
                                                <div className="text-[13px] mb-1">
                                                    Client Property <label className="text-red-500">*</label>
                                                </div>
                                                {/* <select
                                                    className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                                                    name="clientProperty"
                                                    value={formValues.clientProperty}
                                                    onChange={handleChange}
                                                >
                                                    <option value="" >Select A Client Property</option>
                                                    {clientPropertyData.map((item) => (
                                                        <option key={item.id} value={item.id}>
                                                            {item.id}
                                                            &nbsp;
                                                            &nbsp;
                                                            {item.propertyname}
                                                        </option>
                                                    ))}
                                                </select> */}
                                                
                                                {state?.hyperlinked ? <div className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs py-0.5 bg-[#F5F5F5]" type="text" name="curaoffice" >{state.clientpropertydescription}</div>  : 
                                               
                                               <ClientPropertySelectNative
                                               data={Object.keys(clientPropertyData)}
                                               value={clientPropertyData?.[formValues.clientProperty]?.propertyname ? clientPropertyData?.[formValues.clientProperty]?.propertyname:null}
                                               placeholder="Select Client Property"
                                               isSticky={true}
                                               headerText={{
                                                   first : 'Property',
                                                   second : 'Builder'
                                               }}
                                               renderData={(item) => {
                                                   return (
                                                     <MenuItem value={item} key={item} sx={{ width : '230px', gap : '5px', fontSize : '12px'}}>
                                                       <p className="w-[50%] " style={{ overflowWrap: 'break-word', wordWrap: 'break-word', whiteSpace: 'normal', margin: 0 }}>
                                                          {clientPropertyData[item].propertyname}
                                                       </p>
                                                       <p className='w-[50%]' style={{ overflowWrap: 'break-word', wordWrap: 'break-word', whiteSpace: 'normal', margin: 0 }}>
                                                         {clientPropertyData[item].buildername}
                                                       </p>
                                                       
                                                      
                                                     </MenuItem>
                                                   );
                                                 }}
                                                 onChange={(e) => {
                                                   const temp = {...formValues}
                                                   temp.clientProperty = e.target.value 
                                                   setFormValues(temp)
                                                  }}
                                               />
                                               
                                               }
                                                <div className="text-[8px] text-[#CD0000] absolute">{formErrors.clientProperty}</div>
                                            </div>
                                            <div className="">
                                                <div className="text-[13px]">Start Date<label className="text-red-500">*</label></div>
                                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="date" name="startDate" value={formValues.startDate} onChange={handleChange} />
                                                <div className="text-[8px] text-[#CD0000] absolute">{formErrors.startDate}</div>
                                            </div>
                                            <div className="">
                                                <div className="text-[13px]">Rent Amount </div>
                                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="rentAmount" value={formValues.rentAmount} onChange={handleChange} />

                                            </div>
                                            <div className="">
                                                <div className="text-[13px]">Deposit Amount </div>
                                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="depositeAmount" value={formValues.depositeAmount} onChange={handleChange} />

                                            </div>
                                            <div className="">
                                                <div className="text-[13px]">LL & PV Scan Copy </div>
                                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="scan" value={formValues.scan} onChange={handleChange} placeholder='Please paste the link here' />
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
                                                    <option value="" hidden >Select Client Order</option>
                                                    <option value="" >ID &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Order Description</option>
                                                    {orders.map((item) => (
                                                        <option key={item.id} value={item.id}>
                                                            {item.id}
                                                            &nbsp;
                                                            &nbsp;
                                                            {item.ordername}
                                                        </option>
                                                    ))}
                                                </select> */}
                                                 <OrderCustomSelectNative
                                                        data={Object.keys(orders)}
                                                        value={orders?.[formValues.order] ? orders?.[formValues.order]:null}
                                                        placeholder="Select Orders"
                                                        isSticky={true}
                                                        width={'230px'}
                                                        headerText={{
                                                            first : 'Order Description',
                                                            second : 'ID',
                                                        }}
                                                        renderData={(item) => {
                                                            return (
                                                            <MenuItem value={item} key={item} sx={{ width : '230px', gap : '5px', fontSize : '12px'}}>
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
                                                            setFormValues({ ...formValues, order: e.target.value })
                                                        }}
                                                        
                                                        
                                                />
                                                {/* <OrderDropDown options={orders} orderText={orderText} setOrderText={setOrderText} leftLabel="ID" rightLabel="OrderName" leftAttr="id" rightAttr="ordername" toSelect="ordername" handleChange={handleChange} formValueName="order" value={formValues.order} /> */}
                                                <div className="text-[8px] text-[#CD0000] absolute">{formErrors.order}</div>
                                            </div>
                                            <div className="">
                                                <div className="text-[13px]">Duration in Months <label className="text-red-500">*</label></div>
                                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="durationInMonth" value={formValues.durationInMonth} onChange={handleChange} />
                                                <div className="text-[8px] text-[#CD0000] absolute">{formErrors.durationInMonth}</div>
                                            </div>
                                            <div className="">
                                                <div className="text-[13px]">End Date <label className="text-red-500">*</label></div>
                                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="date" name="endDate" value={formValues.endDate} onChange={handleChange} />
                                                <div className="text-[8px] text-[#CD0000] absolute">{formErrors.endDate}</div>
                                            </div>
                                            <div className="">
                                                <div className="text-[13px]">
                                                    Rent Payment Date
                                                </div>
                                                <select
                                                    className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                                                    name="rentPaymentDate"
                                                    value={formValues.rentPaymentDate}
                                                    onChange={handleChange}
                                                >
                                                    {rentPaymentDate.map((item) => (
                                                        <option key={item.id} value={item.day}>
                                                            {item.day}
                                                        </option>
                                                    ))}
                                                </select>

                                            </div>
                                            <div className="">
                                                <div className="text-[13px]">Notice Period in Days </div>
                                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="noticePeriod" value={formValues.noticePeriod} onChange={handleChange} />
                                            </div>
                                            <div className="">
                                                <div className="text-[13px]">
                                                    Registration Type
                                                </div>
                                                <select
                                                    className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                                                    name="registrationType"
                                                    value={formValues.registrationType}
                                                    onChange={handleChange}
                                                >
                                                    {registrationType.map(item => (
                                                        <option key={item.id} value={item.type}>
                                                            {item.type}
                                                        </option>
                                                    ))}
                                                </select>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-[10px] flex justify-center items-center "><input
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
                                <div className="my-3 flex justify-center items-center gap-[10px]">
                                    <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' onClick={handleAddLLAgreement} >Add</button>
                                    <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleClose}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </Draggable>
                </>
            </Modal>

            <Modal open={tenantDetails}
                fullWidth={true}
                maxWidth={'md'}
                className='flex justify-center items-center'
            >
                <>
                    <Draggable handle='div.tenantmove'>
                        <div className='flex justify-center'>
                            <div className="w-[700px] h-auto bg-white rounded-lg">
                                <div className='tenantmove cursor-move'>
                                    <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-t-lg relative">
                                        <div className="mr-[250px] ml-[250px]">
                                            <div className="text-[16px]">Tenant Details</div>
                                        </div>
                                        <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white absolute right-2">
                                            <button onClick={() => {
                                                openCancelModal()
                                                handleCloseTenantDetails()
                                                
                                            }}><img className="w-[20px] h-[20px]" src={Cross} alt="cross" /></button>
                                        </div>
                                    </div>
                                </div>
                                

                                <div className="h-auto w-full mt-[5px]">
                                    <div className="flex gap-[48px] justify-center ">
                                        <div className=" space-y-3 py-5">
                                            <div className="">
                                                {/* this should a list */}
                                                {selectedOptions.map((item, index) => {
                                                    return <div className='mb-2'>
                                                        <div className="text-[13px] mb-2">
                                                            Tenant {index + 1}
                                                        </div>
                                                        <div className='flex space-x-2'>
                                                        
                                                        <AsyncSelect
                                                            onChange={(e) => handleTenantClientNameChange(e, index)}
                                                            value={selectedOptions[index]}
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
                                                                    width: 270,
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
                                                                    width: 270, // Adjust the width of the dropdown menu
                                                                    zIndex: 9999 // Ensure the menu appears above other elements
                                                                }),
                                                                menuList: (provided, state) => ({
                                                                    ...provided,
                                                                    padding: 0, // Adjust padding of the menu list
                                                                    fontSize: 10,
                                                                    maxHeight: 150 // Adjust font size of the menu list
                                                                }),
                                                                
                                                            }}
                                                            />
                                                            <button onClick={() => handleDeleteAtIndex(index)}>
                                                                <div className='bg-[#F5F5F5] rounded-lg w-6 h-6 flex items-center justify-center'>
                                                                    <img src={Cross} className='w-4 h-4'/>
                                                                </div>
                                                            </button>
                                                        </div>
                                                    </div>
                                                })}
                                                {/* <div className="text-[13px]">
                                                    Client
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
                                                /> */}
                                            </div>
                                            <button className="bg-[#004DD7] text-white h-[36px] w-[300px] rounded-lg" onClick={handleAddClient}>

                                                <div className="flex items-center justify-center gap-4">
                                                    Add Tenant (Client)
                                                    <img className='h-[18px] w-[18px]' src={Add} alt="add" />
                                                </div>
                                            </button>
                                        </div>


                                    </div>
                                </div>

                                <div className="my-3 flex justify-center items-center gap-[10px]">
                                    <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' onClick={handleAddTenant} >Add</button>
                                    <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={() => {
                                        openCancelModal()
                                        handleCloseTenantDetails()
                                    }}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </Draggable>
                </>
            </Modal>
        </div>
    )
}

export default ManageLLAgreement;
