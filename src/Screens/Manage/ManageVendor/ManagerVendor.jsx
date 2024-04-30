import React from 'react';
import { Outlet, Link } from "react-router-dom";
import backLink from "../../../assets/back.png";
import searchIcon from "../../../assets/searchIcon.png";
import nextIcon from "../../../assets/next.png";
import refreshIcon from "../../../assets/refresh.png";
import downloadIcon from "../../../assets/download.png";
import { useState, useEffect, useRef } from 'react';
import Navbar from "../../../components/Navabar/Navbar";
import Cross from "../../../assets/cross.png";
import { Modal, Pagination, LinearProgress, Select } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import { APIService } from '../../../services/API';
import Pdf from "../../../assets/pdf.png";
import Excel from "../../../assets/excel.png"
import Edit from "../../../assets/edit.png"
import Trash from "../../../assets/trash.png"
import Filter from "../../../assets/filter.png"
import Add from "../../../assets/add.png";
import EditClientInvoice from './EditClientInvoice';
import SucessfullModal from '../../../components/modals/SucessfullModal';
import SaveConfirmationVendor from './SaveConfirmationVendor';
import FailureModal from '../../../components/modals/FailureModal';
import DeleteVendorModal from './DeleteVendorModal';
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
import CharacterFilter from "../../../components/Filters/CharacterFilter"
import DateFilter from '../../../components/Filters/DateFilter';
import NumericFilter from '../../../components/Filters/NumericFilter';
import AsyncSelect from "react-select/async"

const ManageVendor = () => {

    const menuRef = useRef();
    // we have the module here
    const [pageLoading, setPageLoading] = useState(false);
    const [existingVendors, setExistingVendors] = useState([]);
    const [currentPages, setCurrentPages] = useState(15);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [downloadModal, setDownloadModal] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [isSearchOn, setIsSearchOn] = useState(false);
    const [allCountry, setAllCountry] = useState([]);
    const [allState, setAllState] = useState([]);
    const [allCity, setAllCity] = useState([]);
    const [allCategory,setAllCategory] = useState([]);
    const [allUsername, setAllUsername] = useState([]);
    const [allRoles, setAllRoles] = useState([]);
    const [allEntities, setAllEntites] = useState([]);
    const [allLOB, setAllLOB] = useState([]);
    const [currCountry, setCurrCountry] = useState(-1);
    const [isVendorDialogue, setIsVendorDialogue] = useState(false);
    const [isEditDialogue, setIsEditDialogue] = React.useState(false);
    const [currItem, setCurrItem] = useState({});
    const [showAddSuccess, setShowAddSuccess] = useState(false);
    const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
    const [openAddConfirmation, setOpenAddConfirmation] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isFailureModal, setIsFailureModal] = useState(false)
    const [deleteConfirmation, showDeleteConfirmation] = useState(false);

    const [vendorNameFilter, setVendorNameFilter] = useState(false)
    const [vendorNameFilterInput, setVendorNameFilterInput] = useState("");
    const [tdsSectionFilter, setTdsSectionFilter] = useState(false)
    const [tdsSectionFilterInput, setTdsSectionFilterInput] = useState("");
    const [tallyLedgerFilter, setTallyLedgerFilter] = useState(false)
    const [tallyLedgerFilterInput, setTallyLedgerFilterInput] = useState("");
    const [categoryFilter, setCategoryFilter] = useState(false)
    const [categoryFilterInput, setCategoryFilterInput] = useState("");
    const [cityFilter, setCityFilter] = useState(false)
    const [cityFilterInput, setCityFilterInput] = useState("");
    const [idFilter, setIdFilter] = useState(false)
    const [idFilterInput, setIdFilterInput] = useState("");
    // const [filterArray,setFilterArray] = useState([]);

    const [typeOfOrganization, setTypeOfOrganization] = useState([
        {
            id: 1,
            type: "Proprietorship"
        },
        {
            id: 2,
            type: "Trust"
        },
        {
            id: 3,
            type: "PVT. Ltd Company"
        },
        {
            id: 4,
            type: "Pub. Ltd Company"
        },
        {
            id: 5,
            type: "Partnership"
        },
    ])


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

    const getVendorCategoryAdmin = async () => {
        const data = {
            "user_id": 1234,
        }
        const response = await APIService.getVendorCategoryAdmin(data);
        const res = await response.json()
        console.log(res.data);
        setAllCategory(res.data)
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
        setPageLoading(true);
        const data = {
            "user_id": 1234,
            "rows": [
                "id",
                "vendorname",
                "addressline1",
                "addressline2",
                "suburb", "city",
                "state",
                "country",
                "type",
                "details",
                "category",
                "phone1",
                "email",
                "ownerinfo",
                "panno",
                "tanno",
                "gstservicetaxno",
                "tdssection",
                "bankname",
                "bankbranch",
                "bankcity",
                "bankacctno",
                "bankcity",
                "bankbranch",
                "bankacctholdername",
                "bankifsccode",
                "bankaccttype",
                "dated",
                "createdby",
                "isdeleted",
                "companydeductee",
                "tallyledgerid",
                "tallyledger"
            ],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": Number(currentPage),
            "pg_size": Number(currentPages),
        };
        const response = await APIService.getVendors(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingVendors(result);
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
                "vendorname",
                "addressline1",
                "addressline2",
                "suburb", "city",
                "state",
                "country",
                "type",
                "details",
                "category",
                "phone1",
                "email",
                "ownerinfo",
                "panno",
                "tanno",
                "gstservicetaxno",
                "tdssection",
                "bankname",
                "bankbranch",
                "bankcity",
                "bankacctno",
                "bankcity",
                "bankbranch",
                "bankacctholdername",
                "bankifsccode",
                "bankaccttype",
                "dated",
                "createdby",
                "isdeleted",
                "companydeductee",
                "tallyledgerid",
                "tallyledger"
            ],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": Number(pageNumber),
            "pg_size": Number(currentPages),
            "search_key": searchInput
        };
        const response = await APIService.getVendors(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingVendors(result);
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
                "vendorname",
                "addressline1",
                "addressline2",
                "suburb", "city",
                "state",
                "country",
                "type",
                "details",
                "category",
                "phone1",
                "email",
                "ownerinfo",
                "panno",
                "tanno",
                "gstservicetaxno",
                "tdssection",
                "bankname",
                "bankbranch",
                "bankcity",
                "bankacctno",
                "bankcity",
                "bankbranch",
                "bankacctholdername",
                "bankifsccode",
                "bankaccttype",
                "dated",
                "createdby",
                "isdeleted",
                "companydeductee",
                "tallyledgerid",
                "tallyledger"
            ],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(quantity),
            "search_key": isSearchOn ? searchInput : ""
        };
        const response = await APIService.getVendors(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingVendors(result);
        setPageLoading(false);
    }
    useEffect(() => {
        fetchData();
        fetchCityData('Maharashtra')
        fetchTallyLedgerData();
        getVendorCategoryAdmin();
        const handler = (e) => {
            if (menuRef.current == null || !menuRef.current.contains(e.target)) {
                setVendorNameFilter(false)
                setTdsSectionFilter(false)
                setTallyLedgerFilter(false)
                setCategoryFilter(false)
                setCityFilter(false)
                setIdFilter(false)
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
        setIsVendorDialogue(true);
    };

    const handleClose = () => {
        setIsVendorDialogue(false);
    }
    const handleAddVendor = () => {
        console.log(formValues)
        if (!validate()) {
            console.log('hu')
            return;
        }
        setIsVendorDialogue(false);
        setOpenAddConfirmation(true);

    }
    const addVendor = async () => {
        // console.log('clicked')
        // console.log(formValues)
        // setPageLoading(true);
        // const data = {

        //     "user_id": 1234,
        //     "vendorname": formValues.vendorName,
        //     "addressline1": formValues.addressLine1,
        //     "addressline2": formValues.addressLine2,
        //     "suburb": formValues.suburb,
        //     "city": 847,
        //     "state": "Maharashtra",
        //     "country": 5,
        //     "type": formValues.typeOfOrganization,
        //     "details": formValues.details,
        //     "category": formValues.category,
        //     "phone1": formValues.phone,
        //     "email": formValues.email,
        //     "ownerinfo": formValues.ownerDetails,
        //     "panno": formValues.pan,
        //     "tanno": formValues.tan,
        //     "gstservicetaxno": formValues.gstin,
        //     "tdssection": formValues.tdsSection,
        //     "bankname": formValues.bankName,
        //     "bankbranch": formValues.bankBranch,
        //     "bankcity": formValues.bankBranchCity,
        //     "bankacctholdername": formValues.accountHolderName,
        //     "bankacctno": formValues.accountNumber,
        //     "bankifsccode": formValues.ifscCode,
        //     "bankaccttype": formValues.accountType,
        //     "companydeductee": formValues.companydeductee,
        //     "tallyledgerid": formValues.tallyLedger
        // }
        const data = {
            "user_id": 1234,
            "vendorname": formValues.vendorName,
            "addressline1": formValues.addressLine1,
            "addressline2": formValues.addressLine2,
            "suburb": formValues.suburb,
            "city": Number(formValues.city),
            "state": "Maharashtra",
            "country": 5,
            "type": formValues.typeOfOrganization,
            "details": formValues.details,
            "category": Number(formValues.category),
            "phone1": formValues.phone,
            "email": formValues.email,
            "ownerinfo": formValues.ownerDetails,
            "panno": formValues.pan,
            "tanno": formValues.tan,
            "gstservicetaxno": formValues.gstin,
            "tdssection": formValues.tdsSection,
            "bankname": formValues.bankName,
            "bankbranch": formValues.bankBranch,
            "bankcity": formValues.bankBranchCity,
            "bankacctholdername": formValues.accountHolderName,
            "bankacctno": formValues.accountNumber,
            "bankifsccode": formValues.ifscCode,
            "bankaccttype": formValues.accountType,
            "companydeductee": true,
            "tallyledgerid": Number(formValues.tallyLedger)
        }
        const response = await APIService.addVendors(data);

        const result = (await response.json())

        setOpenAddConfirmation(false);
        console.log(result)
        setIsVendorDialogue(false);
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
        vendorName: "",
        addressLine1: "",
        suburb: "",
        phone: "",
        ownerDetails: "",
        category: "",
        addressLine2: "",
        city: "",
        email: "",
        details: "",
        typeOfOrganization: "",
        pan: "",
        gstin: "",
        tallyLedger: "",
        tan: "",
        tdsSection: "",
        accountHolderName: "",
        accountNumber: "",
        accountType: "",
        bankName: "",
        bankBranch: "",
        ifscCode: "",
        bankBranchCity: "",
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

        if (!formValues.vendorName) {
            setFormErrors((existing) => {
                return { ...existing, vendorName: "Enter Vendor name" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, vendorName: "" }
            })
        }

        if (!formValues.phone) {
            setFormErrors((existing) => {
                return { ...existing, phone: "Enter Phone Number" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, phone: "" }
            })
        }

        if (!formValues.category) {
            setFormErrors((existing) => {
                return { ...existing, category: "Select Category" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, category: "" }
            })
        }

        if (!formValues.email) {
            setFormErrors((existing) => {
                return { ...existing, email: "Enter Email" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, email: "" }
            })
        }

        return res;
    }
    const [currVendorId, setCurrVendorId] = useState("");
    const handleDelete = (id) => {
        setCurrVendorId(id);
        showDeleteConfirmation(true);
    }
    const deleteVendor = async (id) => {
        const data = {
            "user_id": 1234,
            "id": id
        }
        const response = await APIService.deleteVendors(data);
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
        const tempArray = [];
        // we need to query thru the object
        console.log(filterMapState);
        Object.keys(filterMapState).forEach(key => {
            if (filterMapState[key].filterType != "") {
                tempArray.push([key, filterMapState[key].filterType, filterMapState[key].filterValue, filterMapState[key].filterData]);
            }
        })
        console.log(tempArray)
        const data = {
            "user_id": 1234,
            "rows": [
                "vendorname",
                "tdssection",
                "tallyledger",
                "category",
                "city",
                "id",
            ],
            "filters": tempArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 0,
            "pg_size": 0,
            "search_key": searchInput
        };
        const response = await APIService.getVendors(data);
        const temp = await response.json();
        const result = temp.data;
        const worksheet = XLSX.utils.json_to_sheet(result);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "VendorData.xlsx");
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
                "vendorname",
                "addressline1",
                "addressline2",
                "suburb", "city",
                "state",
                "country",
                "type",
                "details",
                "category",
                "phone1",
                "email",
                "ownerinfo",
                "panno",
                "tanno",
                "gstservicetaxno",
                "tdssection",
                "bankname",
                "bankbranch",
                "bankcity",
                "bankacctno",
                "bankcity",
                "bankbranch",
                "bankacctholdername",
                "bankifsccode",
                "bankaccttype",
                "dated",
                "createdby",
                "isdeleted",
                "companydeductee",
                "tallyledgerid",
                "tallyledger"
            ],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": searchInput
        };
        const response = await APIService.getVendors(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingVendors(result);
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
                "vendorname",
                "addressline1",
                "addressline2",
                "suburb", "city",
                "state",
                "country",
                "type",
                "details",
                "category",
                "phone1",
                "email",
                "ownerinfo",
                "panno",
                "tanno",
                "gstservicetaxno",
                "tdssection",
                "bankname",
                "bankbranch",
                "bankcity",
                "bankacctno",
                "bankcity",
                "bankbranch",
                "bankacctholdername",
                "bankifsccode",
                "bankaccttype",
                "dated",
                "createdby",
                "isdeleted",
                "companydeductee",
                "tallyledgerid",
                "tallyledger"
            ],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": ""
        };
        const response = await APIService.getVendors(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingVendors(result);
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

    const filterMapping = {
        vendorname: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        tdssection: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        tallyledger: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        category: {
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
        setCurrentPage(() => 1)

        setFilterState(tempArray)
        setPageLoading(true);
        const data = {
            "user_id": 1234,
            "rows": [
                "id",
                "vendorname",
                "addressline1",
                "addressline2",
                "suburb", "city",
                "state",
                "country",
                "type",
                "details",
                "category",
                "phone1",
                "email",
                "ownerinfo",
                "panno",
                "tanno",
                "gstservicetaxno",
                "tdssection",
                "bankname",
                "bankbranch",
                "bankcity",
                "bankacctno",
                "bankcity",
                "bankbranch",
                "bankacctholdername",
                "bankifsccode",
                "bankaccttype",
                "dated",
                "createdby",
                "isdeleted",
                "companydeductee",
                "tallyledgerid",
                "tallyledger"
            ],
            "filters": tempArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": isSearchOn ? searchInput : ""
        };
        const response = await APIService.getVendors(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingVendors(result);
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
                "vendorname",
                "addressline1",
                "addressline2",
                "suburb", "city",
                "state",
                "country",
                "type",
                "details",
                "category",
                "phone1",
                "email",
                "ownerinfo",
                "panno",
                "tanno",
                "gstservicetaxno",
                "tdssection",
                "bankname",
                "bankbranch",
                "bankcity",
                "bankacctno",
                "bankcity",
                "bankbranch",
                "bankacctholdername",
                "bankifsccode",
                "bankaccttype",
                "dated",
                "createdby",
                "isdeleted",
                "companydeductee",
                "tallyledgerid",
                "tallyledger"
            ],
            "filters": tempArray,
            "sort_by": [field],
            "order": !flag ? "asc" : "desc",
            "pg_no": Number(currentPage),
            "pg_size": Number(currentPages),
            "search_key": isSearchOn ? searchInput : ""
        };
        // setFlag((prev) => !prev);
        const response = await APIService.getVendors(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingVendors(result);
        setPageLoading(false);
    }


    //    const [allCity,setAllCity] = useState([]);
    // we need to fetch the city data
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
    const [tallyLedgerData, setTallyLedgerData] = useState([])
    const fetchTallyLedgerData = async () => {
        const data = {
            "user_id": 1234
        }
        const response = await APIService.getTallyLedgerAdmin(data);
        const res = await response.json()
        console.log(res);
        setTallyLedgerData(res.data)
    }


    // fetching utility routes end here
    return (
        <div className='h-screen'>
            <Navbar />
            {isEditDialogue && <EditClientInvoice isOpen={isEditDialogue} handleClose={() => setIsEditDialogue(false)} invoiceId={invoiceId} showSuccess={openEditSuccess} />}
            {showAddSuccess && <SucessfullModal isOpen={showAddSuccess} message="New Vendor Created Succesfully" />}
            {showDeleteSuccess && <SucessfullModal isOpen={showDeleteSuccess} message="Vendor Deleted Succesfully" />}
            {showEditSuccess && <SucessfullModal isOpen={showEditSuccess} message="Changes Saved Successfully" />}
            {openAddConfirmation && <SaveConfirmationVendor handleClose={() => setOpenAddConfirmation(false)} currVendor={formValues.vendorName} addVendor={addVendor} />}
            {isFailureModal && <FailureModal isOpen={isFailureModal} message={errorMessage} />}
            {deleteConfirmation && <DeleteVendorModal handleClose={() => showDeleteConfirmation(false)} handleDelete={deleteVendor} item={currVendorId} />}
            <div className='h-[calc(100vh_-_7rem)] w-full  px-10'>
                <div className='h-16 w-full  flex justify-between items-center p-2  border-gray-300 border-b-2'>
                    <div className='flex items-center space-x-3'>
                        <div className='rounded-2xl  bg-[#EBEBEB] h-8 w-8 flex justify-center items-center '>
                            <Link to="/dashboard"><img className='w-5 h-5' src={backLink} /></Link>
                        </div>

                        <div className='flex-col'>
                            <h1 className='text-lg'>Manage Vendor</h1>
                            <p className='text-sm'>Manage &gt; Manage Vendor</p>
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
                                    Add New Vendor
                                    <img className='h-4 w-4' src={Add} alt="add" />
                                </div>
                            </button>
                        </div>

                    </div>

                </div>





                {/* filter component */}
                <div className='h-12 w-full bg-white'>
                    <div className='w-full h-12 bg-white flex justify-between'>
                        <div className="w-[85%] flex">
                            <div className='w-[4%] flex'>
                                <div className='p-3'>
                                    {/* <p>Sr.</p> */}
                                </div>
                            </div>
                            <div className='w-[16%]  px-3 py-2.5'>
                                <div className="w-[70%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[75%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={vendorNameFilterInput} onChange={(e) => setVendorNameFilterInput(e.target.value)} />
                                    <button className='w-[25%] px-1 py-2' onClick={() => { setVendorNameFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                                </div>
                                {vendorNameFilter && <CharacterFilter inputVariable={vendorNameFilterInput} setInputVariable={setVendorNameFilterInput} handleFilter={newHandleFilter} filterColumn='vendorname' menuRef={menuRef} />}
                            </div>

                            <div className='w-[16%]  px-3 py-2.5'>
                                <div className="w-[65%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[75%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={tdsSectionFilterInput} onChange={(e) => setTdsSectionFilterInput(e.target.value)} />
                                    <button className='W-[25%] px-1 py-2' onClick={() => { setTdsSectionFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                                </div>
                                {tdsSectionFilter && <CharacterFilter inputVariable={tdsSectionFilterInput} setInputVariable={setTdsSectionFilterInput} filterColumn='tdssection' handleFilter={newHandleFilter} menuRef={menuRef} />}
                            </div>

                            <div className='w-[16%]  px-3 py-2.5'>
                                <div className="w-[70%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[75%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={tallyLedgerFilterInput} onChange={(e) => setTallyLedgerFilterInput(e.target.value)} />
                                    <button className='w-[25%] px-1 py-2' onClick={() => { setTallyLedgerFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                                </div>
                                {tallyLedgerFilter && <CharacterFilter inputVariable={tallyLedgerFilterInput} setInputVariable={setTallyLedgerFilterInput} filterColumn='tallyledger' handleFilter={newHandleFilter} menuRef={menuRef} />}
                            </div>

                            <div className='w-[16%]  px-3 py-2.5'>
                                <div className="w-[70%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[75%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={categoryFilterInput} onChange={(e) => setCategoryFilterInput(e.target.value)} />
                                    <button className='w-[25%] px-1 py-2'><img src={Filter} className='h-3 w-3' onClick={() => { setCategoryFilter((prev) => !prev) }} /></button>
                                </div>
                                {categoryFilter && <CharacterFilter inputVariable={categoryFilterInput} setInputVariable={setCategoryFilterInput} filterColumn='category' handleFilter={newHandleFilter} menuRef={menuRef} />}
                            </div>

                            <div className='w-[14%] px-3 py-2.5'>
                                <div className="w-[70%] flex items-center bg-[#EBEBEB] rounded-md">
                                    <input className="w-[75%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none" value={cityFilterInput} onChange={(e) => setCityFilterInput(e.target.value)} />
                                    <button className='w-[25%] px-1 py-2'><img src={Filter} className='h-3 w-3' onClick={() => { setCityFilter((prev) => !prev) }} /></button>
                                </div>
                                {cityFilter && <CharacterFilter inputVariable={cityFilterInput} setInputVariable={setCityFilterInput} filterColumn='city' handleFilter={newHandleFilter} menuRef={menuRef} />}
                            </div>
                        </div>
                        <div className="w-[15%] flex">
                            <div className='w-1/2 px-3 py-2.5'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-[65%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" value={idFilterInput} onChange={(e) => setIdFilterInput(Number(e.target.value))} />
                                    <button className='px-1 py-2 w-[35%] '><img src={Filter} className='h-3 w-3' onClick={() => { setIdFilter((prev) => !prev) }} /></button>
                                </div>
                                {idFilter && <NumericFilter columnName='id' inputVariable={idFilterInput} setInputVariable={setIdFilterInput} handleFilter={newHandleFilter} menuRef={menuRef} />}
                            </div>

                            <div className='w-1/2  flex'>
                                <div className='p-3'>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='h-[calc(100vh_-_14rem)] w-full text-xs'>
                    <div className='w-full h-12 bg-[#F0F6FF] flex justify-between border-gray-400 border-b-[1px]'>
                        <div className="w-[85%] flex">
                            <div className='w-[4%] flex'>
                                <div className='p-3'>
                                    <p>Sr.</p>
                                </div>
                            </div>
                            <div className='w-[16%]  flex'>
                                <div className='p-3'>
                                    <p>Vendor Name <button onClick={() => handleSort('vendorname')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[16%]  flex'>
                                <div className='p-3'>
                                    <p>TDS Section <button onClick={() => handleSort('tdssection')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[16%]  flex'>
                                <div className='p-3'>
                                    <p>TallyLedger </p>
                                </div>
                            </div>
                            <div className='w-[16%]  flex'>
                                <div className='p-3'>
                                    <p>Category <button onClick={() => handleSort('category')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[14%]  flex'>
                                <div className='p-3'>
                                    <p>City <button onClick={() => handleSort('city')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                        </div>
                        <div className="w-[15%] flex">
                            <div className='w-1/2  flex'>
                                <div className='p-3'>
                                    <p>ID <button onClick={() => handleSort('id')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-1/2  flex'>
                                <div className='p-3'>
                                    <p>Edit</p>
                                </div>
                            </div>
                        </div>

                    </div>


                    <div className='w-full h-[calc(100vh_-_17rem)] overflow-auto'>
                        {/* we map our items here */}
                        {pageLoading && <div className='ml-5 mt-5'><LinearProgress /></div>}
                        {!pageLoading && existingVendors.map((item, index) => {
                            return <div className='w-full bg-white flex justify-between items-center border-gray-400 border-b-[1px]'>
                                <div className="w-[85%] flex">
                                    <div className='w-[4%] flex'>
                                        <div className='px-3 py-2'>
                                            <p>{index + 1 + (currentPage - 1) * currentPages}</p>
                                        </div>
                                    </div>
                                    <div className='w-[16%] flex'>
                                        <div className='px-3 py-2'>
                                            <p>{item.vendorname}</p>
                                        </div>
                                    </div>
                                    <div className='w-[16%]  flex'>
                                        <div className='px-3 py-2'>
                                            <p>{item.tdssection}</p>
                                        </div>
                                    </div>
                                    <div className='w-[16%]  flex'>
                                        <div className='px-3 py-2'>
                                            <p>{item.tallyledger}</p>
                                        </div>
                                    </div>
                                    <div className='w-[16%]  flex'>
                                        <div className='px-3 py-2'>
                                            <p>{item.category}</p>
                                        </div>
                                    </div>
                                    <div className='w-[14%]  flex'>
                                        <div className='px-3 py-2'>
                                            <p>{item.city}</p>
                                        </div>
                                    </div>

                                </div>
                                <div className="w-[15%] flex items-center">
                                    <div className='w-1/2  flex'>
                                        <div className='px-3 py-2'>
                                            <p>{item.id}</p>
                                        </div>
                                    </div>
                                    <div className='w-1/2  flex'>
                                        <div className='w-1/2 py-5 flex ml-4'>
                                            <div className='flex space-x-3'>
                                                <button onClick={() => { handleEdit(item.id) }}> <img className='w-4 h-4 cursor-pointer' src={Edit} alt="edit" /></button>
                                                <button onClick={() => handleDelete(item.id)}><img className='w-4 h-4 cursor-pointer' src={Trash} alt="trash" /></button>
                                            </div>
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

            <Modal open={isVendorDialogue}
                fullWidth={true}
                maxWidth={'md'}
                className='flex justify-center items-center'
            >
                <div className='flex justify-center'>
                    <div className="w-[1050px] h-auto bg-white rounded-lg">
                        <div className="h-10  justify-center flex items-center rounded-t-lg">
                            <div className="mr-[410px] ml-[410px]">
                                <div className="text-base">Add New Vendor </div>
                            </div>
                            <div className="flex justify-center items-center rounded-full w-7 h-7 bg-[#EBEBEB]">
                                <button onClick={handleClose}><img onClick={handleClose} className="w-5 h-5" src={Cross} alt="cross" /></button>
                            </div>
                        </div>

                        <div className="h-auto w-full mt-1 ">
                            <div className="flex gap-12 justify-center">
                                <div className="">
                                    <div className=" space-y-1 py-1">
                                        <div className="font-semibold text-sm">Basic Information</div>
                                        <div className="">
                                            <div className="text-sm">Vendor Name <label className="text-red-500">*</label></div>
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="vendorName" value={formValues.vendorName} onChange={handleChange} />
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.vendorName}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-sm">Address Line 1</div>
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="addressLine1" value={formValues.addressLine1} onChange={handleChange} />

                                        </div>
                                        <div className="">
                                            <div className="text-sm">Suburb</div>
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="suburb" value={formValues.suburb} onChange={handleChange} />

                                        </div>
                                        <div className="">
                                            <div className="text-sm">Phone <label className="text-red-500">*</label></div>
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="phone" value={formValues.phone} onChange={handleChange} />
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.phone}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-sm">Owner Details </div>
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="ownerDetails" value={formValues.ownerDetails} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className=" space-y-1 py-1 mt-2">
                                        <div className="font-semibold text-sm">Accounting Information</div>
                                        <div className="">
                                            <div className="text-[13px]">Type Of Organization </div>
                                            <select className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px] outline-none" name="typeOfOrganization"
                                                value={formValues.typeOfOrganization}
                                                onChange={
                                                    handleChange
                                                }>
                                                <option >Select Type Of Organization</option>
                                                {typeOfOrganization && typeOfOrganization.map(item => (
                                                    <option key={item.id} value={item.type}>
                                                        {item.type}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="">
                                            <div className="text-sm">PAN </div>
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="pan" value={formValues.pan} onChange={handleChange} />

                                        </div>
                                        <div className="">
                                            <div className="text-sm">GSTIN</div>
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="gstin" value={formValues.gstin} onChange={handleChange} />

                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <div className=" space-y-1 py-1 mt-6">
                                        <div className="">
                                            <div className="text-sm">Category <label className="text-red-500">*</label></div>
                                            <select className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none"
                                                name="category"
                                                value={formValues.category}
                                                defaultValue="Select Category"
                                                onChange={handleChange}
                                            >
                                                {/* <option value="none" hidden={true}>Select a City</option> */}
                                                <option value="none" hidden> Select Category</option>
                                                {allCategory && allCategory.map(item => (
                                                    <option key={item.id} value={item.name} >
                                                        {item.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.category}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-sm">Address Line 2</div>
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" name="addressLine2" value={formValues.addressLine2} onChange={handleChange} />
                                        </div>
                                        <div className="">
                                            <div className="text-sm">City</div>
                                            <select className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none"
                                                name="city"
                                                value={formValues.city}
                                                defaultValue="Select City"
                                                onChange={handleChange}
                                            >
                                                {/* <option value="none" hidden={true}>Select a City</option> */}
                                                <option value="none" hidden> Select A City</option>
                                                {allCity && allCity.map(item => (
                                                    <option value={item.id} >
                                                        {item.city}
                                                    </option>
                                                ))}
                                            </select>
                                            {/* <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" name="city" value={formValues.city} onChange={handleChange} /> */}
                                        </div>
                                        <div className="">
                                            <div className="text-sm">Email <label className="text-red-500">*</label></div>
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" name="email" value={formValues.email} onChange={handleChange} />
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.email}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-sm">Details </div>
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" name="details" value={formValues.details} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className=" space-y-1 py-1 mt-8">

                                        <div className="">
                                            <div className="text-sm">Tally Ledger </div>
                                            <select className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none"
                                                name="tallyLedger"
                                                value={formValues.tallyLedger}
                                                defaultValue="Select Tally Ledger"
                                                onChange={handleChange}
                                            >
                                                {/* <option value="none" hidden={true}>Select a City</option> */}
                                                <option value="none" hidden> Select Tally Ledger</option>
                                                {tallyLedgerData && tallyLedgerData.map(item => (
                                                    <option value={item[0]} >
                                                        {item[1]}
                                                    </option>
                                                ))}
                                            </select>



                                            {/* <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="tallyLedger" value={formValues.tallyLedger} onChange={handleChange} /> */}

                                        </div>
                                        <div className="">
                                            <div className="text-sm">TAN</div>
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="tan" value={formValues.tan} onChange={handleChange} />

                                        </div>
                                        <div className="">
                                            <div className="text-sm">TDS Section</div>
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="tdsSection" value={formValues.tdsSection} onChange={handleChange} />

                                        </div>

                                    </div>
                                </div>
                                <div className=" space-y-1 py-1">
                                    <div className="font-semibold text-sm">Vendor Bank Details </div>
                                    <div className="">
                                        <div className="text-sm">Account Holder Name </div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="accountHolderName" value={formValues.accountHolderName} onChange={handleChange} />

                                    </div>
                                    <div className="">
                                        <div className="text-sm">Account Number</div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="accountNumber" value={formValues.accountNumber} onChange={handleChange} />

                                    </div>
                                    <div className="">
                                        <div className="text-sm">Account Type</div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="accountType" value={formValues.accountType} onChange={handleChange} />

                                    </div>
                                    <div className="">
                                        <div className="text-sm">Bank Name </div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="bankName" value={formValues.bankName} onChange={handleChange} />

                                    </div>
                                    <div className="">
                                        <div className="text-sm">Bank Branch </div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="bankBranch" value={formValues.bankBranch} onChange={handleChange} />
                                    </div>
                                    <div className="">
                                        <div className="text-sm">IFSC Code </div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="ifscCode" value={formValues.ifscCode} onChange={handleChange} />
                                    </div>
                                    <div className="">
                                        <div className="text-sm">Bank Branch City </div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="bankBranchCity" value={formValues.bankBranchCity} onChange={handleChange} />
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="my-3 flex justify-center items-center gap-3">
                            <button className='w-28 h-10 bg-[#505050] text-white rounded-md text-lg' onClick={handleAddVendor} >Add</button>
                            <button className='w-28 h-10 border-[1px] border-[#282828] rounded-md text-lg' onClick={handleClose}>Cancel</button>
                        </div>

                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ManageVendor
