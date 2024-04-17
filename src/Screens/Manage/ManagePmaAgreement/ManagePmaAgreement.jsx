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
const ManagePmaArgreement = () => {

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
    const [isPmaAgreementDialogue, setIsPmaAgreementDialogue] = useState(false);
    const [isEditDialogue, setIsEditDialogue] = React.useState(false);
    const [currItem, setCurrItem] = useState({});
    const [showAddSuccess, setShowAddSuccess] = useState(false);
    const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

    const [clientNameFilter, setClientNameFilter] = useState(false);
    const [clientNameFilterInput, setClientNameFilterInput] = useState("");
    const [propertyDescriptionFilter, setPropertyDescriptionFilter] = useState(false);
    const [propertyDescriptionFilterInput, setPropertyDescriptionFilterInput] = useState("");
    const [orderDescriptionFilter, setOrderDescriptionFilter] = useState(false);
    const [orderDescriptionFilterInput, setOrderDescriptionFilterInput] = useState("");
    const [propertyStatusFilter, setPropertyStatusFilter] = useState(false);
    const [propertyStatusFilterInput, setPropertyStatusFilterInput] = useState("");
    const [descriptionFilter, setDescriptionFilter] = useState(false);
    const [descriptionFilterInput, setDescriptionFilterInput] = useState("");
    const [statusFilter, setStatusFilter] = useState(false);
    const [statusFilterInput, setStatusFilterInput] = useState("");
    const [pmaStartFilter, setPmaStartFilter] = useState(false);
    const [pmaStartFilterInput, setPmaStartFilterInput] = useState("");
    const [pmaEndFilter, setPmaEndFilter] = useState(false);
    const [pmaEndFilterInput, setPmaEndFilterInput] = useState("");
    const [poaStartFilter, setPoaStartFilter] = useState(false);
    const [poaStartFilterInput, setPoaStartFilterInput] = useState("");
    const [poaEndFilter, setPoaEndFilter] = useState(false);
    const [poaEndFilterInput, setPoaEndFilterInput] = useState("");
    const [poaHolderFilter, setPoaHolderFilter] = useState(false);
    const [poaHolderFilterInput, setPoaHolderFilterInput] = useState("");

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
    const fetchUsersData = async () => {
        setPageLoading(true);
        // const data = { "user_id":  1234 };
        const data = { "user_id": 1234 };
        const response = await APIService.getUsers(data)
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
    const [sortField, setSortField] = useState("id")
    const [flag, setFlag] = useState(false)
    const [existingPmaAgreement, setExistingPmaAgreement] = useState([]);
    const fetchData = async () => {
        console.log('ugm')
        setPageLoading(true);
        const data = {
            "user_id": 1234,
            "rows": [
                "id",
                "clientpropertyid",
                "startdate",
                "enddate",
                "actualenddate",
                "active",
                "scancopy",
                "reasonforearlyterminationifapplicable",
                "dated",
                "createdby",
                "isdeleted",
                "description",
                "rented",
                "fixed",
                "rentedtax",
                "fixedtax",
                "orderid",
                "orderdescription",
                "poastartdate",
                "poaenddate",
                "poaholder",
                "clientname",
                "status",
                "propertystatus",
                "propertydescription",
                "propertystatusname"
            ],
            "filters": [],
            "sort_by": ["id"],
            "order": "desc",
            "pg_no": 1,
            "pg_size": 15
        }
            ;
        const response = await APIService.getPmaAgreement(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingPmaAgreement(result);
        setPageLoading(false);
    }
    const fetchPageData = async (pageNumber) => {
        setPageLoading(true);
        setCurrentPage(pageNumber)
        const data = {
            "user_id": 1234,
            "rows": [
                "id",
                "clientpropertyid",
                "startdate",
                "enddate",
                "actualenddate",
                "active",
                "scancopy",
                "reasonforearlyterminationifapplicable",
                "dated",
                "createdby",
                "isdeleted",
                "description",
                "rented",
                "fixed",
                "rentedtax",
                "fixedtax",
                "orderid",
                "orderdescription",
                "poastartdate",
                "poaenddate",
                "poaholder",
                "clientname",
                "status",
                "propertystatus",
                "propertydescription"
            ],
            "filters": [],
            "sort_by": ["id"],
            "order": "desc",
            "pg_no": Number(pageNumber),
            "pg_size": Number(currentPages)
        }
        const response = await APIService.getPmaAgreement(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingPmaAgreement(result);
        setPageLoading(false);
    }
    const fetchQuantityData = async (quantity) => {
        setPageLoading(true);
        console.log(searchInput);
        const data = {
            "user_id": 1234,
            "rows": [
                "id",
                "clientpropertyid",
                "startdate",
                "enddate",
                "actualenddate",
                "active",
                "scancopy",
                "reasonforearlyterminationifapplicable",
                "dated",
                "createdby",
                "isdeleted",
                "description",
                "rented",
                "fixed",
                "rentedtax",
                "fixedtax",
                "orderid",
                "orderdescription",
                "poastartdate",
                "poaenddate",
                "poaholder",
                "clientname",
                "status",
                "propertystatus",
                "propertydescription"
            ],
            "filters": [],
            "sort_by": ["id"],
            "order": flag ? "asc" : "desc",
            "pg_no": Number(pageNumber),
            "pg_size": Number(quantity),
            "search_key": searchInput
        }
            ;
        const response = await APIService.getPmaAgreement(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingPmaAgreement(result);
        setPageLoading(false);
    }
    const [clientPropertyData,setClientPropertyData] = useState([]);
    const getClientPropertyByClientId = async (id) => {
       const data = {
        "user_id" : 1234,
        "client_id" : id
       }

       const response = await APIService.getClientPropertyByClientId(data)
       const res = await response.json()
       console.log(res)
       setClientPropertyData(res.data)
    }
    const [orders,setOrders] = useState([]);
    const getOrdersByClientId = async (id) => {
        console.log('hello')
        const data = {
            "user_id" :1234,
            "client_id" : id
        }
        const response = await APIService.getOrdersByClientId(data)
        const res = await response.json()
        console.log(res.data)
        setOrders(res.data)
    }
    const addPmaAgreement = async () => {
        const data = {
            "user_id": 1234,
            "clientpropertyid": 18196,
            "startdate": formValues.pmaStartDate,
            "enddate": formValues.pmaEndDate,
            "actualenddate": formValues.actualEndDate,
            "active": formValues.status,
            "scancopy": formValues.scan,
            "reasonforearlyterminationifapplicable": formValues.reason,
            "description": formValues.description,
            "rented": Number(formValues.rentFee),
            "fixed": Number(formValues.fixedfee),
            "rentedtax": formValues.rentFee == null ? "false" : "true",
            "fixedtax": formValues.fixedfee == null ? "false" : "true",
            "orderid": 435229,
            "poastartdate": formValues.poaStartDate,
            "poaenddate": formValues.poaEndDate,
            "poaholder": formValues.poaHolderName
        }
        const response = await APIService.addPmaAgreement(data)
        const res = await response.json()
        console.log(res)
    }
    const [showEditModal, setShowEditModal] = useState(false);
    const handleEdit = (id) => {
        // we need to open the edit modal
        setCurrPma(id)
        setShowEditModal(true);
    }
    useEffect(() => {
        fetchData();
        fetchCountryData();
        fetchStateData(5)
        // fetchClientPropertyData()
        fetchCityData("Maharashtra");
        fetchEntitiesData();
        fetchRoleData();
        fetchUsersData();
        fetchLobData();

        const handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setClientNameFilter(false);
                setPropertyDescriptionFilter(false);
                setOrderDescriptionFilter(false);
                setPropertyStatusFilter(false);
                setStatusFilter(false);
                setDescriptionFilter(false);
                setPmaStartFilter(false);
                setPmaEndFilter(false);
                setPoaStartFilter(false);
                setPoaEndFilter(false);
                setPoaHolderFilter(false);
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
        setIsPmaAgreementDialogue(true);
    };

    const handleClose = () => {
        setIsPmaAgreementDialogue(false);
    }

    // harcoded dropdown
    const clientProperty = [1, 2, 3, 4];
   
    const client = [1, 2, 3, 4];
    
    
    const handleAddPmaAgreement = () => {
        console.log(formValues)
        if (!validate()) {
            console.log('hu')
            return;
        }
        setIsPmaAgreementDialogue(false);
        // setIsLLAgreementDialogue(false);
        setOpenAddConfirmation(true)

    }
    const initialValues = {
        client: "",
        clientProperty: "",
        pmaStartDate: null,
        pmaEndDate: null,
        poaStartDate: null,
        poaEndDate: null,
        order: "",
        poaHolderName: "",
        actualEndDate: null,
        description: "",
        reason: "",
        scan: "",
        rentFee: "",
        fixedfee: "",
        gst1: false,
        gst2: false,
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
        if (!formValues.clientProperty) {
            setFormErrors((existing) => {
                return { ...existing, clientProperty: "Select Client Property" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, clientProperty: "" }
            })
        }
        if (!formValues.pmaStartDate) {
            setFormErrors((existing) => {
                return { ...existing, pmaStartDate: "Select PMA Start Date" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, pmaStartDate: "" }
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

        if (!formValues.pmaEndDate) {
            setFormErrors((existing) => {
                return { ...existing, pmaEndDate: "Select PMA End Date" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, pmaEndDate: "" }
            })
        }
        if (!formValues.poaStartDate) {
            setFormErrors((existing) => {
                return { ...existing, poaStartDate: "Select POA Start Date" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, poaStartDate: "" }
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
                "id",
                "clientpropertyid",
                "startdate",
                "enddate",
                "actualenddate",
                "active",
                "scancopy",
                "reasonforearlyterminationifapplicable",
                "dated",
                "createdby",
                "isdeleted",
                "description",
                "rented",
                "fixed",
                "rentedtax",
                "fixedtax",
                "orderid",
                "orderdescription",
                "poastartdate",
                "poaenddate",
                "poaholder",
                "clientname",
                "status",
                "propertystatus",
                "propertydescription",
                "propertystatusname"
            ],
            "filters": [],
            "sort_by": [],
            "order": "asc",
            "pg_no": 0,
            "pg_size": 0
        };
        const response = await APIService.getPmaAgreement(data);
        const temp = await response.json();
        const result = temp.data;
        const worksheet = XLSX.utils.json_to_sheet(result);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "PmaAgreemenetData.xlsx");
        FileSaver.saveAs(workbook, "demo.xlsx");
    }
    const handleSearch = async () => {
        // console.log("clicked")
        setPageLoading(true);
        setIsSearchOn(true);
        const data = {
            "user_id": 1234,
            "rows": [
                "id",
                "clientpropertyid",
                "startdate",
                "enddate",
                "actualenddate",
                "active",
                "scancopy",
                "reasonforearlyterminationifapplicable",
                "dated",
                "createdby",
                "isdeleted",
                "description",
                "rented",
                "fixed",
                "rentedtax",
                "fixedtax",
                "orderid",
                "orderdescription",
                "poastartdate",
                "poaenddate",
                "poaholder",
                "clientname",
                "status",
                "propertystatus",
                "propertydescription",
                "propertystatusname"
            ],
            "filters": [],
            "sort_by": [],
            "order": "asc",
            "pg_no": 1,
            "pg_size": 15,
            "search_key": searchInput
        };
        const response = await APIService.getPmaAgreement(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingPmaAgreement(result);
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
                "clientpropertyid",
                "startdate",
                "enddate",
                "actualenddate",
                "active",
                "scancopy",
                "reasonforearlyterminationifapplicable",
                "dated",
                "createdby",
                "isdeleted",
                "description",
                "rented",
                "fixed",
                "rentedtax",
                "fixedtax",
                "orderid",
                "orderdescription",
                "poastartdate",
                "poaenddate",
                "poaholder",
                "clientname",
                "status",
                "propertystatus",
                "propertydescription",
                "propertystatusname"
            ],
            "filters": [],
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": 15,
            "search_key": ""
        };
        const response = await APIService.getPmaAgreement(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingPmaAgreement(result);
        setPageLoading(false);
    }
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [currPma, setCurrPma] = useState("");
    const handleDelete = (id) => {
        setCurrPma(id);
        setShowDeleteModal(true)
    }
    const deletePma = async (id) => {
        const data = {
            "user_id": 1234,
            "id": id
        }
        const response = await APIService.deletePmaAgreement(data)
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
        clientname : {
            filterType : "",
            filterValue : "",
            filterData : "String",
            filterInput : ""
        },
        propertydescription : {
            filterType : "",
            filterValue : "",
            filterData : "String",
            filterInput : ""
        },
        orderdescription : {
            filterType : "",
            filterValue : "",
            filterData : "String",
            filterInput : ""
        },
        propertystatusname : {
            filterType : "",
            filterValue : "",
            filterData : "String",
            filterInput : ""
        },
        description : {
            filterType : "",
            filterValue : "",
            filterData : "String",
            filterInput : ""
        },
        status : {
            filterType : "",
            filterValue : "",
            filterData : "String",
            filterInput : ""
        },
        startdate : {
            filterType : "",
            filterValue : null,
            filterData : "Date",
            filterInput : ""
        },
        enddate : {
            filterType : "",
            filterValue : null,
            filterData : "Date",
            filterInput : ""
        },
        poastartdate : {
            filterType : "",
            filterValue : null,
            filterData : "Date",
            filterInput : ""
        },
        poaenddate : {
            filterType : "",
            filterValue : null,
            filterData : "Date",
            filterInput : ""
        },
        poaholder : {
            filterType : "",
            filterValue : "",
            filterData : "String",
            filterInput : ""
        },
    }
    const [filterMapState,setFilterMapState] = useState(filterMapping);

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

    const fetchFiltered = async  (mapState) => {
        setFilterMapState(mapState)
        const tempArray = [];
         // we need to query thru the object
         // console.log(filterMapState);
         console.log(filterMapState)
         Object.keys(mapState).forEach(key=> {
             if(mapState[key].filterType != "") {
                 tempArray.push([key,mapState[key].filterType,mapState[key].filterValue,mapState[key].filterData]);
             }
         })
         setPageLoading(true);
         const data = {
             "user_id": 1234,
             "rows": [
                "id",
                "clientpropertyid",
                "startdate",
                "enddate",
                "actualenddate",
                "active",
                "scancopy",
                "reasonforearlyterminationifapplicable",
                "dated",
                "createdby",
                "isdeleted",
                "description",
                "rented",
                "fixed",
                "rentedtax",
                "fixedtax",
                "orderid",
                "orderdescription",
                "poastartdate",
                "poaenddate",
                "poaholder",
                "clientname",
                "status",
                "propertystatus",
                "propertydescription",
                "propertystatusname"
            ],
             "filters": tempArray,
             "sort_by": [sortField],
             "order": flag ? "asc" : "desc",
             "pg_no": Number(currentPage),
             "pg_size": Number(currentPages),
             "search_key": isSearchOn ? searchInput : ""
         };
         const response = await APIService.getPmaAgreement(data);
         const temp = await response.json();
         const result = temp.data;
         console.log(result);
         const t = temp.total_count;
         setTotalItems(t);
         setExistingPmaAgreement(result);
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
                "clientpropertyid",
                "startdate",
                "enddate",
                "actualenddate",
                "active",
                "scancopy",
                "reasonforearlyterminationifapplicable",
                "dated",
                "createdby",
                "isdeleted",
                "description",
                "rented",
                "fixed",
                "rentedtax",
                "fixedtax",
                "orderid",
                "orderdescription",
                "poastartdate",
                "poaenddate",
                "poaholder",
                "clientname",
                "status",
                "propertystatus",
                "propertydescription",
                "propertystatusname"
            ],
            "filters": tempArray,
            "sort_by": [field],
            "order": flag ? "asc" : "desc",
            "pg_no": Number(currentPage),
            "pg_size": Number(currentPages),
            "search_key": isSearchOn ? searchInput : ""
        };
        setFlag((prev) => !prev);
        const response = await APIService.getPmaAgreement(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingPmaAgreement(result);
        setPageLoading(false);
    }
    return (
        <div className='h-screen'>
            <Navbar />
            {/* {isEditDialogue && <EditManageEmployee isOpen={isEditDialogue} handleClose={() => setIsEditDialogue(false)} item={currItem} showSuccess={openEditSuccess} />} */}
            {showEditModal && <EditPmaAgreement handleClose={() => { setShowEditModal(false) }} currPma={currPma} clientPropertyData={clientPropertyData}/>}
            {showAddSuccess && <SucessfullModal isOpen={showAddSuccess} message="successfully Added Pma Agreement" />}
            {showDeleteSuccess && <SucessfullModal isOpen={showDeleteSuccess} message="Successfully Deleted Pma Agreement" />}
            {showEditSuccess && <SucessfullModal isOpen={showEditSuccess} message="successfully Updated Employee" />}
            {/* {openAddConfirmation && <SaveConfirmationEmployee handleClose={() => setOpenAddConfirmation(false)} currEmployee={formValues.employeeName} addEmployee={addEmployee} />} */}
            {openAddConfirmation && <SaveConfirmationPmaAgreement addPmaAgreement={addPmaAgreement} handleClose={() => setOpenAddConfirmation(false)} />}
            {isFailureModal && <FailureModal isOpen={isFailureModal} message={errorMessage} />}

            {showDeleteModal && <DeletePmaAgreement handleClose={() => setShowDeleteModal(false)} item={currPma} handleDelete={deletePma} />}
            <div className='h-[calc(100vh_-_7rem)] w-full  px-10'>
                <div className='h-16 w-full  flex justify-between items-center p-2  border-gray-300 border-b-2'>
                    <div className='flex items-center space-x-3'>
                        <div className='rounded-2xl  bg-[#EBEBEB] h-8 w-8 flex justify-center items-center '>
                            <img className='w-5 h-5' src={backLink} />
                        </div>

                        <div className='flex-col'>
                            <h1 className='text-[18px]'>Manage PMA Agreement </h1>
                            <p className='text-[14px]'>Manage &gt; Manage PMA Agreement</p>
                        </div>
                    </div>
                    <div className='flex space-x-2 items-center'>

                        <div className='flex relative'>
                            {/* search button */}
                            <input
                                className="h-[36px] bg-[#EBEBEB] text-[#787878] pl-3"
                                type="text"
                                placeholder="  Search"
                                value={searchInput}
                                onChange={(e) => {
                                    setSearchInput(e.target.value);
                                }}
                            />
                            <button onClick={handleCloseSearch}><img src={Cross} className='absolute w-[20px] h-[20px] left-[160px] top-2' /></button>
                            <div className="h-[36px] w-[40px] bg-[#004DD7] flex items-center justify-center rounded-r-lg">
                                <button onClick={handleSearch}><img className="h-[26px] " src={searchIcon} alt="search-icon" /></button>
                            </div>
                        </div>

                        <div>
                            {/* button */}
                            <button className="bg-[#004DD7] text-white h-[36px] w-[300px] rounded-lg" onClick={handleOpen}>
                                <div className="flex items-center justify-center gap-4">
                                    Add New PMA Agreement
                                    <img className='h-[18px] w-[18px]' src={Add} alt="add" />
                                </div>
                            </button>
                        </div>

                    </div>

                </div>





                {/* filter component */}

                <div className='w-full h-12 flex justify-between border-gray-400 border-b-[1px] text-xs'>
                    <div className="w-[90%] flex">
                        <div className='w-[2%] flex'>
                            <div className='px-3 py-5'>
                                {/* <p>Sr.</p> */}
                            </div>
                        </div>
                        <div className='w-[10.8%] px-3 py-2  '>
                            <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                <input className="w-[68%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={clientNameFilterInput} onChange={(e) => setClientNameFilterInput(e.target.value)} />
                                <button className='w-[32%] px-1 py-2' onClick={() => { setClientNameFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                            </div>
                            {clientNameFilter && <CharacterFilter inputVariable={clientNameFilterInput} setInputVariable={setClientNameFilterInput} handleFilter={newHandleFilter} filterColumn='clientname' menuRef={menuRef} />}
                        </div>
                        <div className='w-[14.8%] px-3 py-2 '>
                            <div className="w-[80%] flex items-center bg-[#EBEBEB] rounded-md">
                                <input className="w-[75%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={propertyDescriptionFilterInput} onChange={(e) => setPropertyDescriptionFilterInput(e.target.value)} />
                                <button className='w-[25%] px-1 py-2' onClick={() => { setPropertyDescriptionFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                            </div>
                            {propertyDescriptionFilter && <CharacterFilter inputVariable={propertyDescriptionFilterInput} setInputVariable={setPropertyDescriptionFilterInput} handleFilter={newHandleFilter} filterColumn='propertydescription' menuRef={menuRef} />}
                        </div>
                        <div className='w-[9.8%]  px-3 py-2 '>
                            <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                <input className="w-[68%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={orderDescriptionFilterInput} onChange={(e) => setOrderDescriptionFilterInput(e.target.value)} />
                                <button className='w-[32%] px-1 py-2' onClick={() => { setOrderDescriptionFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                            </div>
                            {orderDescriptionFilter && <CharacterFilter inputVariable={orderDescriptionFilterInput} setInputVariable={setOrderDescriptionFilterInput} handleFilter={newHandleFilter} filterColumn='orderdescription' menuRef={menuRef} />}

                        </div>
                        <div className='w-[8.8%] px-3 py-2 '>
                            <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                <input className="w-[68%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={propertyStatusFilterInput} onChange={(e) => setPropertyStatusFilterInput(e.target.value)} />
                                <button className='w-[32%] px-1 py-2' onClick={() => { setPropertyStatusFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                            </div>
                            {propertyStatusFilter && <CharacterFilter inputVariable={propertyStatusFilterInput} setInputVariable={setPropertyStatusFilterInput} handleFilter={newHandleFilter} filterColumn='propertystatusname' menuRef={menuRef} />}
                        </div>
                        <div className='w-[9.8%] px-3 py-2 '>
                            <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                <input className="w-[68%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={descriptionFilterInput} onChange={(e) => setDescriptionFilterInput(e.target.value)} />
                                <button className='w-[32%] px-1 py-2' onClick={() => { setDescriptionFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                            </div>
                            {descriptionFilter && <CharacterFilter inputVariable={descriptionFilterInput} setInputVariable={setDescriptionFilterInput} handleFilter={newHandleFilter} filterColumn='description' menuRef={menuRef} />}
                        </div>
                        <div className='w-[7.8%] px-3 py-2'>
                            <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                <input className="w-[68%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={statusFilterInput} onChange={(e) => setStatusFilterInput(e.target.value)} />
                                <button className='w-[32%] px-1 py-2' onClick={() => { setStatusFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                            </div>
                            {statusFilter && <CharacterFilter inputVariable={statusFilterInput} setInputVariable={setStatusFilterInput} handleFilter={newHandleFilter} filterColumn='status' menuRef={menuRef} />}
                        </div>
                        <div className='w-[9.8%] px-3 py-2 '>
                            <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                <input className="w-[68%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={pmaStartFilterInput} onChange={(e) => setPmaStartFilterInput(e.target.value)} type='date' />
                                <button className='w-[32%] px-1 py-2' onClick={() => { setPmaStartFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                            </div>
                            {pmaStartFilter && <DateFilter inputVariable={pmaStartFilterInput} setInputVariable={setPmaStartFilterInput} handleFilter={newHandleFilter} columnName='startdate' menuRef={menuRef}/>}
                        </div>
                        <div className='w-[8.8%] px-3 py-2  '>
                            <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                <input className="w-[68%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={pmaEndFilterInput} onChange={(e) => setPmaEndFilterInput(e.target.value)} type='date' />
                                <button className='w-[32%] px-1 py-2' onClick={() => { setPmaEndFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                            </div>
                            {pmaEndFilter && <DateFilter inputVariable={pmaEndFilterInput} setInputVariable={setPmaEndFilterInput} handleFilter={newHandleFilter} columnName='enddate' menuRef={menuRef}/>}
                        </div>
                        <div className='w-[8.8%] px-3 py-2 '>
                            <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                <input className="w-[68%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={poaStartFilterInput} onChange={(e) => setPoaStartFilterInput(e.target.value)} type='date' />
                                <button className='w-[32%] px-1 py-2' onClick={() => { setPoaStartFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                            </div>
                            {poaStartFilter && <DateFilter inputVariable={poaStartFilterInput} setInputVariable={setPoaStartFilterInput} handleFilter={newHandleFilter} columnName='poastartdate' menuRef={menuRef}/>}
                        </div>
                        <div className='w-[8.8%] px-3 py-2'>
                            <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                <input className="w-[68%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={poaEndFilterInput} onChange={(e) => setPoaEndFilterInput(e.target.value)} type='date' />
                                <button className='w-[32%] px-1 py-2' onClick={() => { setPoaEndFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                            </div>
                            {poaEndFilter && <DateFilter inputVariable={poaEndFilterInput} setInputVariable={setPoaEndFilterInput} handleFilter={newHandleFilter} columnName='poaenddate' menuRef={menuRef}/>}
                        </div>
                    </div>
                    <div className="w-[10%] flex">

                        <div className='w-[65%] px-3 py-2 '>
                            <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                <input className="w-[68%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={poaHolderFilterInput} onChange={(e) => setPoaHolderFilterInput(e.target.value)} />
                                <button className='w-[32%] px-1 py-2' onClick={() => { setPoaHolderFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                            </div>
                            {poaHolderFilter && <CharacterFilter inputVariable={poaHolderFilterInput} setInputVariable={setPoaHolderFilterInput} handleFilter={newHandleFilter} filterColumn='poaholder' menuRef={menuRef} />}
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
                            <div className='w-[2%] flex'>
                                <div className='px-3 py-5'>
                                    <p>Sr.</p>
                                </div>
                            </div>
                            <div className='w-[10.8%]  flex'>
                                <div className='px-3 py-5'>
                                    <p>Client name <button onClick={() => handleSort('clientname')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[14.8%]  flex'>
                                <div className='px-3 py-5'>
                                    <p>Property Description <button onClick={() => handleSort('propertydescription')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[9.8%]  flex '>
                                <div className='p-3'>
                                    <p>Order</p>
                                    <p>Description</p>
                                </div>
                                <button onClick={() => handleSort('orderdescription')}><span className="font-extrabold ">↑↓</span></button>
                            </div>
                            <div className='w-[8.8%]  flex'>
                                <div className='p-3'>
                                    <p>Property</p>
                                    <p>Status</p>
                                </div>
                                <button onClick={() => handleSort('propertystatusname')}><span className="font-extrabold">↑↓</span></button>
                            </div>
                            <div className='w-[9.8%]  flex'>
                                <div className='px-3 py-5'>
                                    <p>Description <button onClick={() => handleSort('description')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[7.8%]  flex'>
                                <div className='px-3 py-5'>
                                    <p>Status <button onClick={() => handleSort('status')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[9.8%]  flex'>
                                <div className='p-3'>
                                    <p>PMA</p>
                                    <p>Start Date</p>
                                </div>
                                <button onClick={() => handleSort('startdate')}><span className="font-extrabold">↑↓</span></button>
                            </div>
                            <div className='w-[8.8%]  flex'>
                                <div className='p-3'>
                                    <p>PMA</p>
                                    <p>End Date</p>
                                </div>
                                <button onClick={() => handleSort('enddate')}><span className="font-extrabold">↑↓</span></button>
                            </div>
                            <div className='w-[8.8%]  flex'>
                                <div className='p-3'>
                                    <p>POA</p>
                                    <p>Start Date</p>
                                </div>
                                <button onClick={() => handleSort('poastartdate')}><span className="font-extrabold">↑↓</span></button>
                            </div>
                            <div className='w-[8.8%]  flex'>
                                <div className='p-3'>
                                    <p>POA</p>
                                    <p>End Date</p>
                                </div>
                                <button onClick={() => handleSort('poaenddate')}><span className="font-extrabold">↑↓</span></button>
                            </div>
                        </div>
                        <div className="w-[10%] flex">
                            <div className='w-[65%]  flex'>
                                <div className='p-3'>
                                    <p>POA</p>
                                    <p>Holder</p>
                                </div>
                                <button onClick={() => handleSort('poaholder')}><span className="font-extrabold">↑↓</span></button>
                            </div>
                            <div className='w-[35%]  flex'>
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
                        {!pageLoading && existingPmaAgreement.map((item, index) => {
                            return <div className='w-full h-auto bg-white flex justify-between border-gray-400 border-b-[1px]'>
                                <div className="w-[90%] flex">
                                    <div className='w-[2%] flex'>
                                        <div className='px-3 py-5'>
                                            <p>{index + 1 + (currentPage - 1) * currentPages}</p>
                                        </div>
                                    </div>
                                    <div className='w-[10.8%]  flex'>
                                        <div className='px-3 py-5'>
                                            <p>{item.clientname}</p>
                                        </div>
                                    </div>
                                    <div className='w-[14.8%]  flex'>
                                        <div className='px-3 py-5'>
                                            <p>{item.propertydescription}</p>
                                        </div>
                                    </div>
                                    <div className='w-[9.8%]  flex '>
                                        <div className='p-3'>
                                            <p>{item.orderdescription}</p>
                                        </div>

                                    </div>
                                    <div className='w-[8.8%]  flex'>
                                        <div className='p-3'>
                                            {item.propertystatusname}
                                        </div>

                                    </div>
                                    <div className='w-[9.8%]  flex'>
                                        <div className='px-3 py-5'>
                                            <p>{item.description}</p>
                                        </div>
                                    </div>
                                    <div className='w-[7.8%]  flex'>
                                        <div className='px-3 py-5'>
                                            <p>{item.status}</p>
                                        </div>
                                    </div>
                                    <div className='w-[9.8%]  flex'>
                                        <div className='p-3'>
                                            <p>{item.startdate}</p>
                                        </div>

                                    </div>
                                    <div className='w-[8.8%]  flex'>
                                        <div className='p-3'>
                                            <p>{item.enddate}</p>
                                        </div>

                                    </div>
                                    <div className='w-[8.8%]  flex'>
                                        <div className='p-3'>
                                            <p>{item.poastartdate}</p>
                                        </div>

                                    </div>
                                    <div className='w-[8.8%]  flex'>
                                        <div className='p-3'>
                                            <p>{item.poaenddate}</p>

                                        </div>

                                    </div>
                                </div>
                                <div className="w-[10%] flex">
                                    <div className='w-[65%]  flex'>
                                        <div className='p-3'>
                                            <p>{item.poaholder}</p>
                                        </div>
                                        {/* <div className="font-extrabold py-5">↑↓</div> */}
                                    </div>
                                    <div className='w-[35%] py-3  flex'>
                                        <div className='flex space-x-1'>
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

            <Modal open={isPmaAgreementDialogue}
                fullWidth={true}
                maxWidth={'md'}
                className='flex justify-center items-center'
            >
                <div className='flex justify-center'>
                    <div className="w-[1050px] h-auto bg-white rounded-lg">
                        <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-t-lg">
                            <div className="mr-[410px] ml-[410px]">
                                <div className="text-[16px]">New PMA Agreement</div>
                            </div>
                            <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                                <button onClick={handleClose}><img onClick={handleClose} className="w-[20px] h-[20px]" src={Cross} alt="cross" /></button>
                            </div>
                        </div>

                        <div className="h-auto w-full mt-[5px]">
                            <div className="flex gap-[48px] justify-center ">
                                <div className=" space-y-3 py-5">
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
                                        <div className="text-[13px]">PMA Start Date <label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="date" name="pmaStartDate" value={formValues.pmaStartDate} onChange={handleChange} />
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.pmaStartDate}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">POA Start Date <label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="date" name="poaStartDate" value={formValues.poaStartDate} onChange={handleChange} />
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.poaStartDate}</div>
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
                                            {orders.map((item) => (
                                                <option key={item.id} value={item.ordername}>
                                                    {item.ordername}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.order}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">Actual End Date </div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="date" name="actualEndDate" value={formValues.actualEndDate} onChange={handleChange} />
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.actualEndDate}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">Reason for Early Termination if Applicable </div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="reason" value={formValues.reason} onChange={handleChange} />

                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">Rented Fee in % </div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="rentFee" value={formValues.rentFee} onChange={handleChange} />
                                    </div>
                                    <div className=" flex items-center "><input
                                        type="checkbox"
                                        checked={formValues.gst1}
                                        className='mr-3 h-4 w-4'
                                        onClick={(e) => {
                                            // console.log(e.target.checked)
                                            const existing = { ...formValues };
                                            existing.gst1 = !existing.gst1;
                                            setFormValues(existing)
                                        }}
                                    />Gst Additional ?</div>
                                </div>
                                <div className=" space-y-3 py-5">
                                    <div className="">
                                        <div className="text-[13px]">
                                            Client Property <label className="text-red-500">*</label>
                                        </div>
                                        <select
                                            className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                                            name="clientProperty"
                                            value={formValues.clientProperty}
                                            onChange={handleChange}
                                        >
                                            {clientPropertyData.map((item) => (
                                                <option key={item.id} value={item.id}>
                                                    {item.id} 
                                                    &nbsp;
                                                    &nbsp;
                                                    {item.propertyname}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.clientProperty}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">PMA End Date <label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="date" name="pmaEndDate" value={formValues.pmaEndDate} onChange={handleChange} />
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.pmaEndDate}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">POA End Date </div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="date" name="poaEndDate" value={formValues.poaEndDate} onChange={handleChange} />
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.poaEndDate}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">POA Holder Name </div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="poaHolderName" value={formValues.poaHolderName} onChange={handleChange} />
                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">Description </div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="description" value={formValues.description} onChange={handleChange} />
                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">Scan Copy </div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="scan" value={formValues.scan} onChange={handleChange} />
                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">Fixed Fees in Rs </div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="fixedfee" value={formValues.fixedfee} onChange={handleChange} />
                                    </div>
                                    <div className=" flex items-center "><input
                                        type="checkbox"
                                        checked={formValues.gst2}
                                        className='mr-3 h-4 w-4'
                                        onClick={(e) => {
                                            // console.log(e.target.checked)
                                            const existing = { ...formValues };
                                            existing.gst2 = !existing.gst2;
                                            setFormValues(existing)
                                        }}
                                    />Gst Additional ?</div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 flex justify-center items-center "><input
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
                            <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' onClick={handleAddPmaAgreement} >Add</button>
                            <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleClose}>Cancel</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ManagePmaArgreement;
