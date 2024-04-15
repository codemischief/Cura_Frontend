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
import { Modal, Pagination, LinearProgress } from "@mui/material";
import { APIService } from '../../../services/API';
import ProjectInformation from "./Forms/ProjectInformation"
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
import Photos from "./Forms/Photos";
import POADetails from "./Forms/POADetails";
import OwnerDetails from "./Forms/OwnerDetails"
import Pdf from "../../../assets/pdf.png";
import Excel from "../../../assets/excel.png"
import Filter from "../../../assets/filter.png"
import Add from "../../../assets/add.png";
import CharacterFilter from '../../../Components/Filters/CharacterFilter';
import NumericFilter from '../../../Components/Filters/NumericFilter';
import SucessfullModal from '../../../Components/modals/SucessfullModal';
import Joystick from "../../../assets/four_direction_arrow.png";
import Trash from "../../../assets/trash.png"
import Edit from "../../../assets/edit.png"
import SaveConfirmationClientProperty from './Forms/SaveConfirmationClientProperty';
import EditClientProperty from './Forms/EditClientProperty';
import Select from "react-select"
import DeleteClientProperty from './DeleteClientProperty';
const ManageClientProperty = () => {
    const menuRef = useRef();
    // we have the module here
    const [pageLoading, setPageLoading] = useState(false);
    const [existingEmployees, setExistingEmployees] = useState([]);
    const [existingClientProperty, setExistingClientProperty] = useState([]);
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
    const [isClientPropertyDialogue, setIsClientPropertyDialogue] = useState(false);
    const [isEditDialogue, setIsEditDialogue] = React.useState(false);
    const [currItem, setCurrItem] = useState({});
    const [showAddSuccess, setShowAddSuccess] = useState(false);
    const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
    const [clientNameFilter, setClientNameFilter] = useState(false);
    const [clientNameFilterInput, setClientNameFilterInput] = useState("");
    const [propertyTypeFilter, setPropertyTypeFilter] = useState(false);
    const [propertyTypeFilterInput, setPropertyTypeFilterInput] = useState("");
    const [propertySuburbFilter, setPropertySuburbFilter] = useState(false);
    const [propertySuburbFilterInput, setPropertySuburbFilterInput] = useState("");
    const [propertyCityFilter, setPropertyCityFilter] = useState(false);
    const [propertyCityFilterInput, setPropertyCityFilterInput] = useState("");
    const [propertyStatusFilter, setPropertyStatusFilter] = useState(false);
    const [propertyStatusFilterInput, setPropertyStatusFilterInput] = useState("");
    const [propertyDescriptionFilter, setPropertyDescriptionFilter] = useState(false);
    const [propertyDescriptionFilterInput, setPropertyDescriptionFilterInput] = useState("");
    const [porjectNameFilter, setPorjectNameFilter] = useState(false);
    const [porjectNameFilterInput, setPorjectNameFilterInput] = useState("");
    const [idFilter, setIdFilter] = useState(false);
    const [idFilterInput, setIdFilterInput] = useState("");
    const [clientTypeData, setClientTypeData] = useState([]);

    const fetchCountryData = async () => {
        setPageLoading(true);
        const data = { "user_id": 1234, "rows": ["id", "name"], "filters": [], "sort_by": [], "order": "asc", "pg_no": 0, "pg_size": 0 };
        const response = await APIService.getCountries(data)
        const result = (await response.json()).data;
        console.log(result.data);
        if (Array.isArray(result.data)) {
            setAllCountry(result.data);
        }
    }
    const fetchClientTypeData = async () => {
        const data = {
            "user_id": 1234
        }
        const response = await APIService.getClientTypeAdmin(data);
        const res = await response.json()
        console.log(res)
        setClientTypeData(res.data)

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
            if (result.length > 0) {
                setFormValues((existing) => {
                    const newData = { ...existing, city: result[0].id }
                    return newData;
                })
            }
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
        // setFormValues((existing) => {
        //     return { ...existing, role: result.data[0].id }
        // })
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
    const [existingSociety, setExistingSociety] = useState([]);
    const getBuildersAndProjectsList = async () => {
        const data = { "user_id": 1234 };
        const response = await APIService.getBuildersAndProjectsList(data);
        const res = await response.json();
        console.log(res.data);
        setExistingSociety(res.data);
    }
    const [propertyStatus, setPropertyStatus] = useState([]);
    const fetchPropertyStatus = async () => {
        const data = { "user_id": 1234 };
        const response = await APIService.getPropertyStatusAdmin(data);
        const res = await response.json();
        console.log(res);
        setPropertyStatus(res);
    }
    const [levelOfFurnishing, setLevelOfFurnishing] = useState([]);
    const fetchLevelOfFurnishing = async () => {
        const data = { "user_id": 1234 }
        const response = await APIService.getLevelOfFurnishingAdmin(data);
        const res = await response.json()
        console.log(res);
        setLevelOfFurnishing(res);
    }
    const [propertyType, setPropertyType] = useState([]);
    const fetchPropertyType = async () => {
        const data = { "user_id": 1234 }
        const response = await APIService.getPropertyType(data)
        const res = await response.json();
        console.log(res);
        setPropertyType(res);
    }
    const [sortField, setSortField] = useState("id")
    const [flag, setFlag] = useState(false)
    const fetchData = async () => {
        // console.log('ugm')
        setPageLoading(true);
        const data = {
            "user_id": 1234,
            "rows": [
                "id",
                "client",
                "clientid",
                "project",
                "projectid",
                "propertytypeid",
                "propertytype",
                "suburb",
                "cityid",
                "city",
                "state",
                "countryid",
                "country",
                "layoutdetails",
                "numberofparkings",
                "internalfurnitureandfittings",
                "leveloffurnishing",
                "propertystatus",
                "status",
                "initialpossessiondate",
                "poagiven",
                "poaid",
                "electricityconsumernumber",
                "electricitybillingunit",
                "otherelectricitydetails",
                "gasconnectiondetails",
                "propertytaxnumber",
                "clientservicemanager",
                "propertymanager",
                "comments",
                "propertyownedbyclientonly",
                "textforposting",
                "dated",
                "createdby",
                "isdeleted",
                "electricitybillingduedate"
            ],
            "filters": [],
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": 15,
            "search_key": searchInput
        };
        const response = await APIService.getClientProperty(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result)
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingClientProperty(result.client_info);
        setPageLoading(false);
    }
    const fetchPageData = async (page) => {
        setPageLoading(true);
        setCurrentPage(page);
        const data = {
            "user_id": 1234,
            "rows": [
                "id",
                "client",
                "clientid",
                "project",
                "projectid",
                "propertytypeid",
                "propertytype",
                "suburb",
                "cityid",
                "city",
                "state",
                "countryid",
                "country",
                "layoutdetails",
                "numberofparkings",
                "internalfurnitureandfittings",
                "leveloffurnishing",
                "propertystatus",
                "status",
                "initialpossessiondate",
                "poagiven",
                "poaid",
                "electricityconsumernumber",
                "electricitybillingunit",
                "otherelectricitydetails",
                "gasconnectiondetails",
                "propertytaxnumber",
                "clientservicemanager",
                "propertymanager",
                "comments",
                "propertyownedbyclientonly",
                "textforposting",
                "dated",
                "createdby",
                "isdeleted",
                "electricitybillingduedate"
            ],
            "filters": [],
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": Number(page),
            "pg_size": Number(currentPages),
            "search_key": searchInput
        };
        const response = await APIService.getClientProperty(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result)
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        // setExistingClientProperty([1,2,3,4]);
        setExistingClientProperty(result.client_info);
        setPageLoading(false);
    }

    const fetchQuantityData = async (quantity) => {
        setPageLoading(true);
        setCurrentPages(quantity);
        const data = {
            "user_id": 1234,
            "rows": [
                "id",
                "client",
                "clientid",
                "project",
                "projectid",
                "propertytypeid",
                "propertytype",
                "suburb",
                "cityid",
                "city",
                "state",
                "countryid",
                "country",
                "layoutdetails",
                "numberofparkings",
                "internalfurnitureandfittings",
                "leveloffurnishing",
                "propertystatus",
                "status",
                "initialpossessiondate",
                "poagiven",
                "poaid",
                "electricityconsumernumber",
                "electricitybillingunit",
                "otherelectricitydetails",
                "gasconnectiondetails",
                "propertytaxnumber",
                "clientservicemanager",
                "propertymanager",
                "comments",
                "propertyownedbyclientonly",
                "textforposting",
                "dated",
                "createdby",
                "isdeleted",
                "electricitybillingduedate"
            ],
            "filters": [],
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": Number(currentPage),
            "pg_size": Number(quantity),
            "search_key": searchInput
        };
        const response = await APIService.getClientProperty(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result)
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingClientProperty(result.client_info);
        setPageLoading(false);
    }

    useEffect(() => {

        fetchClientData();
        fetchData();
        fetchStateData(5);

        fetchCityData("Maharashtra");
        fetchPropertyStatus();
        fetchPropertyType();
        fetchLevelOfFurnishing();
        fetchClientTypeData();
        getBuildersAndProjectsList();
        fetchCountryData();
        fetchEntitiesData();
        // fetchRoleData();
        fetchUsersData();
        fetchLobData();
        const handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setClientNameFilter(false);
                setPropertySuburbFilter(false);
                setPropertyCityFilter(false);
                setPropertyTypeFilter(false);
                setPropertyStatusFilter(false);
                setPropertyDescriptionFilter(false);
                setPorjectNameFilter(false);
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
        console.log(oldItem)
        setCurrItem(oldItem)
        setIsEditDialogue(true);

    };

    const handleOpen = () => {
        setIsClientPropertyDialogue(true);
    };

    const handleClose = () => {
        setIsClientPropertyDialogue(false);
    }

    const addEmployee = async () => {

        if (!validate()) {
            return;
        }
        // setPageLoading(true);
        const data = {
            "user_id": 1234,
            "employeename": formValues.employeeName,
            "employeeid": formValues.employeeId,
            "userid": 1236,
            "roleid": formValues.role,
            "dateofjoining": formValues.doj,
            "dob": formValues.dob,
            "panno": formValues.panNo,
            "status": false,
            "phoneno": Number(formValues.phNo),
            "email": formValues.email,
            "addressline1": formValues.addressLine1,
            "addressline2": formValues.addressLine2,
            "suburb": formValues.suburb,
            "city": formValues.city,
            "state": Number(formValues.state),
            "country": Number(formValues.country),
            "zip": formValues.zipCode,
            "dated": "20-01-2020  00:00:00",
            "createdby": 1234,
            "isdeleted": false,
            "entityid": formValues.entity,
            "lobid": formValues.lob == null ? "" : formValues.lob,
            "lastdateofworking": formValues.lastDOW,
            "designation": formValues.designation
        }
        const response = await APIService.addEmployee(data);

        const result = (await response.json())
        setIsClientInfoDialogue(false);
        openAddSuccess();
        console.log(data);
        console.log(result);
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
    const [clientData, setClientData] = useState([]);
    const fetchClientData = async () => {
        const data = {
            "user_id": 1234,
        }
        const response = await APIService.getClientAdmin(data)
        const res = await response.json();
        console.log(res)
        setClientData(res.data);
    }
    const initialValues = {
        "client_property": {
            "clientid": 44598,
            "propertytype": null,
            "leveloffurnishing": null,
            "numberofparkings": null,
            "state": "Maharashtra",
            "city": "Pune",
            "suburb": "",
            "country": 5,
            "projectid": null,
            "status": null,
            "propertydescription": "",
            "layoutdetails": "",
            "email": "",
            "website": "",
            "initialpossessiondate": null,
            "electricityconsumernumber": "",
            "otherelectricitydetails": "",
            "electricitybillingduedate": null,
            "comments": "",
            "propertytaxnumber": "",
            "clientservicemanager": null,
            "propertymanager": null,
            "propertyownedbyclientonly": false,
            "gasconnectiondetails": "",
            "internalfurnitureandfittings": "",
            "textforposting": "",
            "poagiven": true,
            "poaid": null,
            "electricitybillingunit": ""
        },
        "client_property_photos": [
            {
                "photolink": "",
                "description": "",
                "phototakenwhen": null
            }
        ],
        "client_property_owner": {
            "owner1name": "",
            "owner1addressline1": "",
            "owner1addressline2": "",
            "owner1suburb": "",
            "owner1city": "",
            "owner1state": "",
            "owner1country": null,
            "owner1zip": null,
            "owner1panno": "",
            "owner1occupation": null,
            "owner1employername": null,
            "owner1relation": null,
            "owner1birthyear": null,
            "owner1relationwith": null,
            "owner2name": "",
            "owner2addressline1": "",
            "owner2addressline2": "",
            "owner2suburb": "",
            "owner2city": null,
            "owner2state": null,
            "owner2country": null,
            "owner2zip": null,
            "owner2panno": "",
            "owner2occupation": "",
            "owner2employername": null,
            "owner2relation": null,
            "owner2relationwith": null,
            "owner2birthyear": null,
            "owner3name": "",
            "owner3panno": "",
            "otherownerdetails": "details"
        },
        "client_property_poa": {
            "poalegalname": "",
            "poapanno": "",
            "poaaddressline1": "",
            "poaaddressline2": "",
            "poasuburb": "",
            "poacity": "Mumbai",
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
    const [formErrors, setFormErrors] = useState({
        clientid: "",
        levelOfFurnishing: "",
        propertytype: "",
        status: "",
        city: "",
        state: "",
        suburb: "",
        electricitybillingduedate: "",
        projectid: ""
    });
    const [showEditSuccess, setShowEditSuccess] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };


    // validate form and to throw Error message
    const validate = () => {
        var res = true;
        if (!formValues.client_property.clientid) {
            setFormErrors((existing) => {
                return { ...existing, clientid: "Enter Client Name" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, clientid: "Enter Client Name" }
            })
        }
        if (!formValues.client_property.leveloffurnishing) {
            setFormErrors((existing) => {
                return { ...existing, leveloffurnishing: "Select Level Of Furnishing" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, leveloffurnishing: "Select Level Of Furnishing" }
            })
        }
        if (!formValues.client_property.propertydescription) {
            setFormErrors((existing) => {
                return { ...existing, propertydescription: "Enter Property Description" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, propertydescription: "" }
            })
        }
        if (!formValues.client_property.propertyid) {
            setFormErrors((existing) => {
                return { ...existing, propertyid: "Enter Project Name" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, propertyid: "" }
            })
        }
        if (!formValues.client_property.status) {
            setFormErrors((existing) => {
                return { ...existing, status: "Enter Project Status" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, status: "" }
            })
        }
        if (!formValues.client_property.city) {
            setFormErrors((existing) => {
                return { ...existing, city: "Enter City " }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, city: "" }
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
                "client",
                "clientid",
                "project",
                "projectid",
                "propertytypeid",
                "propertytype",
                "suburb",
                "cityid",
                "city",
                "state",
                "countryid",
                "country",
                "layoutdetails",
                "numberofparkings",
                "internalfurnitureandfittings",
                "leveloffurnishing",
                "propertystatus",
                "status",
                "initialpossessiondate",
                "poagiven",
                "poaid",
                "electricityconsumernumber",
                "electricitybillingunit",
                "otherelectricitydetails",
                "gasconnectiondetails",
                "propertytaxnumber",
                "clientservicemanager",
                "propertymanager",
                "comments",
                "propertyownedbyclientonly",
                "textforposting",
                "dated",
                "createdby",
                "isdeleted",
                "electricitybillingduedate"
            ],
            "filters": [],
            "sort_by": [],
            "order": "asc",
            "pg_no": 0,
            "pg_size": 0
        };
        const response = await APIService.getClientProperty(data);
        const temp = await response.json();
        const result = temp.data;
        const worksheet = XLSX.utils.json_to_sheet(result);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "ClientPropertyData.xlsx");
        FileSaver.saveAs(workbook, "demo.xlsx");
    }
    const handleSearch = async () => {
        // console.log("clicked")
        setPageLoading(true);
        const data = {
            "user_id": 1234,
            "rows": [
                "id",
                "client",
                "clientid",
                "project",
                "projectid",
                "propertytypeid",
                "propertytype",
                "suburb",
                "cityid",
                "city",
                "state",
                "countryid",
                "country",
                "layoutdetails",
                "numberofparkings",
                "internalfurnitureandfittings",
                "leveloffurnishing",
                "propertystatus",
                "status",
                "initialpossessiondate",
                "poagiven",
                "poaid",
                "electricityconsumernumber",
                "electricitybillingunit",
                "otherelectricitydetails",
                "gasconnectiondetails",
                "propertytaxnumber",
                "clientservicemanager",
                "propertymanager",
                "comments",
                "propertyownedbyclientonly",
                "textforposting",
                "dated",
                "createdby",
                "isdeleted",
                "electricitybillingduedate"
            ],
            "filters": [],
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": 15,
            "search_key": searchInput
        };
        const response = await APIService.getClientProperty(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result)
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingClientProperty(result.client_info);
        setPageLoading(false);
    }
    const handleCloseSearch = async () => {
        setPageLoading(true);
        setSearchInput("");
        const data = {
            "user_id": 1234,
            "rows": [
                "id",
                "client",
                "clientid",
                "project",
                "projectid",
                "propertytypeid",
                "propertytype",
                "suburb",
                "cityid",
                "city",
                "state",
                "countryid",
                "country",
                "layoutdetails",
                "numberofparkings",
                "internalfurnitureandfittings",
                "leveloffurnishing",
                "propertystatus",
                "status",
                "initialpossessiondate",
                "poagiven",
                "poaid",
                "electricityconsumernumber",
                "electricitybillingunit",
                "otherelectricitydetails",
                "gasconnectiondetails",
                "propertytaxnumber",
                "clientservicemanager",
                "propertymanager",
                "comments",
                "propertyownedbyclientonly",
                "textforposting",
                "dated",
                "createdby",
                "isdeleted",
                "electricitybillingduedate"
            ],
            "filters": [],
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": 15,
            "search_key": ""
        };
        const response = await APIService.getClientProperty(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result)
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingClientProperty(result.client_info);
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
            fetchData();
        }, 2000)
        fetchData();
    }

    const handleAddClientProperty = () => {
        console.log(formValues);
        // setIsClientInfoDialogue(false);
        setIsClientPropertyDialogue(false);
        setCurrClientProperty(formValues.client_property.clientid)
        showAddConfirmation(true);
    }
    const addClientProperty = async () => {
        const data = {
            "user_id": 1234,
            "client_property": {
                "clientid": formValues.client_property.clientid,
                "propertytype": Number(formValues.client_property.propertytype),
                "leveloffurnishing": Number(formValues.client_property.leveloffurnishing),
                "numberofparkings": Number(formValues.client_property.numberofparkings),
                "state": formValues.client_property.state,
                "city": formValues.client_property.city,
                "suburb": formValues.client_property.suburb,
                "country": 5,
                "projectid": formValues.client_property.projectid,
                "status": Number(formValues.client_property.status),
                "propertydescription": formValues.client_property.propertydescription,
                "layoutdetails": formValues.client_property.layoutdetails,
                "email": "",
                "website": "",
                "initialpossessiondate": formValues.client_property.initialpossessiondate,
                "electricityconsumernumber": formValues.client_property.electricityconsumernumber,
                "otherelectricitydetails": formValues.client_property.otherelectricitydetails,
                "electricitybillingduedate": Number(formValues.client_property.electricitybillingduedate),
                "comments": formValues.client_property.comments,
                "propertytaxnumber": formValues.client_property.propertytaxnumber,
                "clientservicemanager": formValues.client_property.clientservicemanager,
                "propertymanager": formValues.client_property.propertymanager,
                "propertyownedbyclientonly": formValues.client_property.propertyownedbyclientonly,
                "gasconnectiondetails": formValues.client_property.gasconnectiondetails,
                "internalfurnitureandfittings": formValues.client_property.internalfurnitureandfittings,
                "textforposting": formValues.client_property.textforposting,
                "poagiven": true,
                "poaid": 202,
                "electricitybillingunit": formValues.client_property.electricitybillingunit
            },
            "client_property_photos": formValues.client_property_photos,
            "client_property_owner": {
                "owner1name": formValues.client_property_owner.owner1name,
                "owner1addressline1": "",
                "owner1addressline2": " ",
                "owner1suburb": "",
                "owner1city": "",
                "owner1state": "",
                "owner1country": null,
                "owner1zip": "",
                "owner1panno": formValues.client_property_owner.owner1panno,
                "owner1occupation": "",
                "owner1employername": "",
                "owner1relation": 1,
                "owner1birthyear": null,
                "owner1relationwith": null,
                "owner2name": formValues.client_property_owner.owner2name,
                "owner2addressline1": "",
                "owner2addressline2": "",
                "owner2suburb": "",
                "owner2city": "",
                "owner2state": "",
                "owner2country": null,
                "owner2zip": "",
                "owner2panno": formValues.client_property_owner.owner2panno,
                "owner2occupation": "",
                "owner2employername": null,
                "owner2relation": null,
                "owner2relationwith": null,
                "owner2birthyear": null,
                "owner3name": formValues.client_property_owner.owner3name,
                "owner3panno": formValues.client_property_owner.owner3panno,
                "otherownerdetails": ""
            },
            "client_property_poa": {
                "poalegalname": formValues.client_property_poa.poalegalname,
                "poapanno": formValues.client_property_poa.poapanno,
                "poaaddressline1": formValues.client_property_poa.poaaddressline1,
                "poaaddressline2": formValues.client_property_poa.poaaddressline2,
                "poasuburb": formValues.client_property_poa.poasuburb,
                "poacity": formValues.client_property_poa.poacity,
                "poastate": formValues.client_property_poa.poastate,
                "poacountry": formValues.client_property_poa.poacountry,
                "poazip": formValues.client_property_poa.poazip,
                "poaoccupation": formValues.client_property_poa.poaoccupation,
                "poabirthyear": formValues.client_property_poa.poabirthyear,
                "poaphoto": formValues.client_property_poa.poaphoto,
                "poaemployername": formValues.client_property_poa.poaemployername,
                "poarelation": formValues.client_property_poa.poarelation,
                "poarelationwith": formValues.client_property_poa.poarelationwith,
                "poaeffectivedate": formValues.client_property_poa.poaeffectivedate,
                "poaenddate": formValues.client_property_poa.poaenddate,
                "poafor": formValues.client_property_poa.poafor,
                "scancopy": formValues.client_property_poa.scancopy
            }
        }

        console.log(data);

        console.log('hey')
        const response = await APIService.addClientProperty(data)
        const res = await (response.json())
        console.log(res);
        if (res.result == "success") {
            // we need to open the succcess modal
            showAddConfirmation(false);
            openAddSuccess();
        }
    }
    const handleDelete = (id) => {
        setCurrItem(id)
        setShowDeleteModal(true);
    }
    const deleteClientProperty = async (id) => {
        const data = {
            "user_id": 1234,
            "id": id
        }
        const response = await APIService.deleteClientProperty(data)
        const res = await response.json()
        console.log(res);
        if (res.result == 'success') {
            setShowDeleteModal(false)
            openDeleteSuccess();
        }
        fetchData();
    }
    // const [showDeleteSuccess,setShowDeleteSuccess] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [addConfirmation, showAddConfirmation] = useState(false);
    const [currClientProperty, setCurrClientProperty] = useState("");
    const [selectedOption, setSelectedOption] = useState("");

    const filterMapping = {
        client : {
            filterType : "",
            filterValue : "",
            filterData : "String",
            filterInput : ""
        },
        suburb : {
            filterType : "",
            filterValue : "",
            filterData : "String",
            filterInput : ""
        },
        city : {
            filterType : "",
            filterValue : "",
            filterData : "String",
            filterInput : ""
        },
        propertytype : {
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
        project : {
            filterType : "",
            filterValue : "",
            filterData : "String",
            filterInput : ""
        },
        propertyDescription : {
            filterType : "",
            filterValue : "",
            filterData : "String",
            filterInput : ""
        },
        id : {
            filterType : "",
            filterValue : null,
            filterData : "Numeric",
            filterInput : ""
        }
    }

    const [filterMapState,setFilterMapState] = useState(filterMapping);


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

    const fetchFiltered = async  (mapState) => {
        setPageLoading(true);
        const tempArray = [];
        // we need to query thru the object
        // console.log(filterMapState);
        setFilterMapState(mapState)
        console.log(filterMapState)
        Object.keys(mapState).forEach(key=> {
            if(mapState[key].filterType != "") {
                tempArray.push([key,mapState[key].filterType,mapState[key].filterValue,mapState[key].filterData]);
            }
        })
        console.log('this is getting called')
        console.log(tempArray)
        const data = {
            "user_id": 1234,
            "rows": [
                "id",
                "client",
                "clientid",
                "project",
                "projectid",
                "propertytypeid",
                "propertytype",
                "suburb",
                "cityid",
                "city",
                "state",
                "countryid",
                "country",
                "layoutdetails",
                "numberofparkings",
                "internalfurnitureandfittings",
                "leveloffurnishing",
                "propertystatus",
                "status",
                "initialpossessiondate",
                "poagiven",
                "poaid",
                "electricityconsumernumber",
                "electricitybillingunit",
                "otherelectricitydetails",
                "gasconnectiondetails",
                "propertytaxnumber",
                "clientservicemanager",
                "propertymanager",
                "comments",
                "propertyownedbyclientonly",
                "textforposting",
                "dated",
                "createdby",
                "isdeleted",
                "electricitybillingduedate"
            ],
            "filters": tempArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": 15,
            "search_key": isSearchOn ? searchInput : ""
        }
        const response = await APIService.getClientProperty(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result)
        const t = temp.total_count;
        setTotalItems(t);
        setExistingClientProperty(result.client_info);
        setPageLoading(false);
    }

    const handleSort = async (field) => {
        setPageLoading(true);
        const tempArray = [];
        // we need to query thru the object
        setSortField(field)
        console.log(filterMapState);
        Object.keys(filterMapState).forEach(key=> {
            if(filterMapState[key].filterType != "") {
                tempArray.push([key,filterMapState[key].filterType,filterMapState[key].filterValue,filterMapState[key].filterData]);
            }
        })
        const data = {
            "user_id": 1234,
            "rows": [
                "id",
                "client",
                "clientid",
                "project",
                "projectid",
                "propertytypeid",
                "propertytype",
                "suburb",
                "cityid",
                "city",
                "state",
                "countryid",
                "country",
                "layoutdetails",
                "numberofparkings",
                "internalfurnitureandfittings",
                "leveloffurnishing",
                "propertystatus",
                "status",
                "initialpossessiondate",
                "poagiven",
                "poaid",
                "electricityconsumernumber",
                "electricitybillingunit",
                "otherelectricitydetails",
                "gasconnectiondetails",
                "propertytaxnumber",
                "clientservicemanager",
                "propertymanager",
                "comments",
                "propertyownedbyclientonly",
                "textforposting",
                "dated",
                "createdby",
                "isdeleted",
                "electricitybillingduedate"
            ],
            "filters": tempArray,
            "sort_by": [field],
            "order": flag ? "asc" : "desc",
            "pg_no": Number(currentPage),
            "pg_size": Number(currentPages),
            "search_key": isSearchOn ? searchInput : ""
        };
        setFlag((prev) => !prev);
        const response = await APIService.getClientProperty(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result)
        const t = temp.total_count;
        setTotalItems(t);
        setExistingClientProperty(result.client_info);
        setPageLoading(false);
    }

    return (
        <div className="h-screen">
            <Navbar />
            {addConfirmation && <SaveConfirmationClientProperty handleClose={() => showAddConfirmation(false)} currClientProperty={currClientProperty} addClientProperty={addClientProperty} />}
            {isEditDialogue && <EditClientProperty isOpen={isEditDialogue} handleClose={() => setIsEditDialogue(false)} clientId={currItem} openEditSuccess={openEditSuccess} />}
            {/* {isEditDialogue && <EditManageEmployee isOpen={isEditDialogue} handleClose={() => setIsEditDialogue(false)} item={currItem} showSuccess={openEditSuccess} />} */}
            {showAddSuccess && <SucessfullModal isOpen={showAddSuccess} message="successfully Added Client Property" />}
            {showDeleteSuccess && <SucessfullModal isOpen={showDeleteSuccess} message="Successfully Deleted Client Property" />}
            {showEditSuccess && <SucessfullModal isOpen={showEditSuccess} message="Successfully Updated Client Property" />}
            {showDeleteModal && <DeleteClientProperty handleClose={() => setShowDeleteModal(false)} handleDelete={deleteClientProperty} item={currItem} />}
            <div className='h-[calc(100vh_-_7rem)] w-full px-10'>
                <div className='h-16 w-full  flex justify-between items-center p-2  border-gray-300 border-b-2'>
                    <div className='flex items-center space-x-3'>
                        <div className='rounded-2xl  bg-[#EBEBEB] h-8 w-8 flex justify-center items-center '>
                            <img className='w-5 h-5' src={backLink} />
                        </div>

                        <div className='flex-col'>
                            <h1 className='text-[18px]'>Manage Client Property</h1>
                            <p className='text-[14px]'>Manage &gt; Manage Client property</p>
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
                            />
                            <button onClick={handleCloseSearch}><img src={Cross} className=' w-5 h-5 mx-2' /></button>
                            <div className="h-[36px] w-[40px] bg-[#004DD7] flex items-center justify-center rounded-r-lg">
                                <button onClick={handleSearch}><img className="h-[26px] " src={searchIcon} alt="search-icon" /></button>
                            </div>
                        </div>

                        <div>
                            {/* button */}
                            <button className="bg-[#004DD7] text-white h-[36px] w-[290px] rounded-lg" onClick={handleOpen}>
                                <div className="flex items-center justify-center gap-2">
                                    <p className=''>Add New Client Property</p>
                                    <img className='h-[15px] w-[15px]' src={Add} alt="add" />
                                </div>
                            </button>
                        </div>

                    </div>

                </div>
                {/* <div className='h-7 w-full bg-[#EBEBEB] border-gray-300 border-b-2 flex space-x-2 items-center'>
                    <div className='ml-3'>
                       <img src={Joystick}/>
                    </div>
                    <div>
                        <p className='text-xs'> Drag a column header and drop it here to group by that column </p>
                    </div>
                </div> */}
                <div className='h-12 w-full bg-white'>
                    <div className='w-full h-12 bg-white flex justify-between text-xs '>
                        <div className="w-[85%] flex">
                            <div className='w-[3%] flex'>
                                <div className='p-3'>
                                    {/* <p>Sr.</p> */}
                                </div>
                            </div>
                            <div className='w-[10%]   p-3'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-[70%] bg-[#EBEBEB] rounded-[5px] outline-none pl-2" onChange={(e) => setClientNameFilterInput(e.target.value)} /> 
                                    <button className='px-1 py-2 w-[30%]'><img src={Filter} className='h-3 w-3' onClick={() => { setClientNameFilter((prev) => !prev) }} /></button>
                                </div>
                                {clientNameFilter && <CharacterFilter inputVariable={clientNameFilterInput} setInputVariable={setClientNameFilterInput} handleFilter={newHandleFilter} filterColumn='client' menuRef={menuRef} />}
                            </div>

                            <div className='w-[10%]   p-3'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-[70%] bg-[#EBEBEB] rounded-[5px] outline-none pl-2" onChange={(e) => setPropertySuburbFilterInput(e.target.value)} />
                                    <button className='px-1 py-2 w-[30%]'><img src={Filter} className='h-3 w-3' onClick={() => { setPropertySuburbFilter((prev) => !prev) }} /></button>
                                </div>
                                {propertySuburbFilter && <CharacterFilter inputVariable={propertySuburbFilterInput} setInputVariable={setPropertySuburbFilterInput} handleFilter={newHandleFilter} filterColumn='suburb' menuRef={menuRef} />}
                            </div>

                            <div className='w-[8%]   p-3'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-[65%] bg-[#EBEBEB] rounded-[5px] outline-none pl-2" onChange={(e) => setPropertyCityFilterInput(e.target.value)} />
                                    <button className='px-1 py-2 w-[35%]'><img src={Filter} className='h-3 w-3' onClick={() => { setPropertyCityFilter((prev) => !prev) }} /></button>
                                </div>
                                {propertyCityFilter && <CharacterFilter inputVariable={propertyCityFilterInput} setInputVariable={setPropertyCityFilterInput} handleFilter={newHandleFilter} filterColumn='city' menuRef={menuRef} />}
                            </div>

                            <div className='w-[10%]   p-3'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-[70%] bg-[#EBEBEB] rounded-[5px] outline-none pl-2" onChange={(e) => setPropertyTypeFilterInput(e.target.value)} />
                                    <button className='px-1 py-2 w-[30%]'><img src={Filter} className='h-3 w-3' onClick={() => { setPropertyTypeFilter((prev) => !prev) }} /></button>
                                </div>
                                {propertyTypeFilter && <CharacterFilter inputVariable={propertyTypeFilterInput} setInputVariable={setPropertyTypeFilterInput} handleFilter={newHandleFilter} filterColumn='propertytype' menuRef={menuRef} />}
                            </div>

                            <div className='w-[9%]   p-3'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-[70%] bg-[#EBEBEB] rounded-[5px] outline-none pl-2" onChange={(e) => setPropertyStatusFilterInput(e.target.value)} />
                                    <button className='px-1 py-2 w-[30%]'><img src={Filter} className='h-3 w-3' onClick={() => { setPropertyStatusFilter((prev) => !prev) }} /></button>
                                </div>
                                {propertyStatusFilter && <CharacterFilter inputVariable={propertyStatusFilterInput} setInputVariable={setPropertyStatusFilterInput} handleFilter={newHandleFilter} filterColumn='status' menuRef={menuRef} />}
                            </div>

                            <div className='w-[17%]   p-3'>
                                <div className="w-[75%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-[75%] bg-[#EBEBEB] rounded-[5px] outline-none pl-2" onChange={(e) => setPropertyDescriptionFilterInput(e.target.value)} />
                                    <button className='px-1 py-2 w-[25%]'><img src={Filter} className='h-3 w-3' onClick={() => { setPropertyDescriptionFilter((prev) => !prev) }} /></button>
                                </div>
                                {propertyDescriptionFilter && <CharacterFilter inputVariable={propertyDescriptionFilterInput} setInputVariable={setPropertyDescriptionFilterInput} handleFilter={newHandleFilter} filterColumn='propertyDescription' menuRef={menuRef} />}
                            </div>

                            <div className='w-[17%]   p-3'>
                                <div className="w-[75%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-[75%] bg-[#EBEBEB] rounded-[5px] outline-none pl-2" onChange={(e) => setPorjectNameFilterInput(e.target.value)} />
                                    <button className='px-1 py-2 w-[25%]'><img src={Filter} className='h-3 w-3' onClick={() => { setPorjectNameFilter((prev) => !prev) }} /></button>
                                </div>
                                {porjectNameFilter && <CharacterFilter inputVariable={porjectNameFilterInput} setInputVariable={setPorjectNameFilterInput} handleFilter={newHandleFilter} filterColumn='project' menuRef={menuRef} />}
                            </div>
                        </div>
                        <div className="w-[15%] ">
                            <div className='w-1/2   p-3'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-[65%] bg-[#EBEBEB] rounded-[5px] outline-none pl-2" onChange={(e) => setIdFilterInput(e.target.value)} />
                                    <button className='px-1 py-2 w-[35%]'><img src={Filter} className='h-3 w-3' onClick={() => { setIdFilter((prev) => !prev) }} /></button>
                                </div>
                                {idFilter && <NumericFilter inputVariable={idFilterInput} setInputVariable={setIdFilterInput}  handleFilter={newHandleFilter} columnName='id' menuRef={menuRef}/>}
                            </div>

                            <div className='w-1/2  flex'>
                                <div className='p-3'>

                                </div>
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
                            <div className='w-[10%]  flex'>
                                <div className='p-3 '>
                                    <p>Client  </p>
                                    <p>Name</p>
                                </div>
                                <button onClick={() => handleSort('client')}><span className="font-extrabold">↑↓</span></button>
                            </div>
                            <div className='w-[10%]  flex'>
                                <div className='p-3'>
                                    <p>Property</p>
                                    <p>Suburb</p>
                                </div>
                                <button onClick={() => handleSort('suburb')}><span className="font-extrabold">↑↓</span></button>
                            </div>
                            <div className='w-[8%]  flex'>
                                <div className='p-3'>
                                    <p>Property City </p>
                                </div>
                            </div>
                            <div className='w-[10%]  flex'>
                                <div className='p-3'>
                                    <p>Property  </p>
                                    <p>Type</p>
                                </div>
                                <button onClick={() => handleSort('propertytype')}><span className="font-extrabold">↑↓</span></button>
                            </div>
                            <div className='w-[9%]  flex'>
                                <div className='p-3'>
                                    <p>Property</p>
                                    <p>Status</p>
                                </div>
                                <button onClick={() => handleSort('status')}><span className="font-extrabold">↑↓</span></button>
                            </div>
                            <div className='w-[17%]  flex'>
                                <div className='px-3 py-5'>
                                    <p>Property Description <button onClick={() => handleSort('')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[17%]  flex'>
                                <div className='px-3 py-5'>
                                    <p>Society/Property Name<button onClick={() => handleSort('project')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[8%]  flex'>
                                <div className='p-3'>

                                </div>
                            </div>
                            <div className='w-[8%]  flex'>
                                <div className='p-3'>

                                </div>
                            </div>
                        </div>
                        <div className="w-[15%] flex">
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
                    {/* <h1>{existingClientProperty.length}</h1> */}
                    <div className='w-full h-[calc(100vh_-_18rem)] overflow-auto'>
                        {!pageLoading && existingClientProperty && existingClientProperty.map((item, index) => {
                            return <div className='w-full bg-white flex justify-between border-gray-400 border-b-[1px] text-xs'>
                                <div className="w-[85%] flex">
                                    <div className='w-[3%] flex'>
                                        <div className='px-3 py-5'>
                                            <p>{index + 1 + (currentPage - 1) * currentPages}</p>
                                        </div>
                                    </div>
                                    <div className='w-[10%]  flex'>
                                        <div className='p-3 '>
                                            <p>{item.client}</p>
                                        </div>

                                    </div>
                                    <div className='w-[10%]  flex'>
                                        <div className='p-3'>
                                            <p>{item.suburb}</p>
                                        </div>
                                    </div>
                                    <div className='w-[8%]  flex'>
                                        <div className='p-3'>
                                            <p>{item.city} </p>
                                        </div>
                                    </div>
                                    <div className='w-[10%]  flex'>
                                        <div className='p-3'>
                                            <p>{item.propertytype}</p>
                                        </div>

                                    </div>
                                    <div className='w-[9%]  flex'>
                                        <div className='p-3'>
                                            <p>{item.status}</p>
                                        </div>

                                    </div>
                                    <div className='w-[17%]  flex'>
                                        <div className='px-3 py-5'>
                                            <p>Property Description </p>
                                        </div>
                                    </div>
                                    <div className='w-[17%]  flex'>
                                        <div className='px-3 py-5'>
                                            <p>{item.project}</p>
                                        </div>
                                    </div>
                                    <div className='w-[8%]  flex'>
                                        <div className='p-3'>

                                        </div>
                                    </div>
                                    <div className='w-[8%]  flex'>
                                        <div className='p-3'>

                                        </div>
                                    </div>
                                </div>
                                <div className="w-[15%] flex">
                                    <div className='w-1/2  flex'>
                                        <div className='px-3 py-5'>
                                            <p>{item.id}</p>
                                        </div>
                                    </div>
                                    <div className='w-1/2  flex px-3 py-5 space-x-2'>
                                        <button onClick={() => { handleOpenEdit(item.id) }}><img className='w-5 h-5' src={Edit} alt="edit" /></button>
                                        <button onClick={() => handleDelete(item.id)}><img className='w-5 h-5' src={Trash} alt="trash" /></button>
                                    </div>
                                </div>

                            </div>
                        })}
                    </div>



                </div>


            </div>


            <div className='w-full h-12 flex justify-between px-6 bg-white '>
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

            <Modal open={isClientPropertyDialogue}
                fullWidth={true}
                maxWidth={'md'}
                className='flex justify-center items-center'
            >
                <div className='flex justify-center relative'>
                    <div className="w-[1150px] h-auto bg-white rounded-lg">
                        <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-lg">
                            <div className="mr-[410px] ml-[410px]">
                                <div className="text-[16px]">New Client</div>
                            </div>
                            <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white absolute right-2">
                                <button onClick={handleClose}><img onClick={handleClose} className="w-[20px] h-[20px]" src={Cross} alt="cross" /></button>
                            </div>
                        </div>

                        <div className="mt-1 flex bg-[#DAE7FF] justify-center space-x-4 items-center h-9">
                            <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-60 cursor-pointer" onClick={selectFirst}>
                                <div>Project Information</div>
                            </div>
                            <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-60 cursor-pointer" onClick={selectSecond}>
                                <div>Photos</div>
                            </div>
                            <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-60 cursor-pointer" onClick={selectThird}>
                                <div>POA Details</div>
                            </div>
                            <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-60 cursor-pointer" onClick={selectForth}>
                                <div>Owner Details</div>
                            </div>
                        </div>

                        {selectedDialog == 1 && <ProjectInformation clientData={clientData} initialCountries={allCountry} initialSociety={existingSociety} initialStates={allState} initialCities={allCity} clientTypeData={clientTypeData} formValues={formValues} setFormValues={setFormValues} propertyType={propertyType} levelOfFurnishing={levelOfFurnishing} propertyStatus={propertyStatus} />}
                        {selectedDialog == 2 && <Photos formValues={formValues} setFormValues={setFormValues} />}
                        {selectedDialog == 3 && <POADetails initialCountries={allCountry} initialStates={allState} initialCities={allCity} formValues={formValues} setFormValues={setFormValues} />}
                        {selectedDialog == 4 && <OwnerDetails formValues={formValues} setFormValues={setFormValues} />}

                        <div className="my-2 flex justify-center items-center gap-[10px]">
                            <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' onClick={handleAddClientProperty} >Add</button>
                            <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleClose}>Cancel</button>
                        </div>

                    </div>
                </div>
            </Modal>


        </div>
    )
}

export default ManageClientProperty;
