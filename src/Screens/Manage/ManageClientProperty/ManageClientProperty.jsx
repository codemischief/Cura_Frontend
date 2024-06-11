import React from 'react';
import { Outlet, Link ,useNavigate , useLocation} from "react-router-dom";
import backLink from "../../../assets/back.png";
import searchIcon from "../../../assets/searchIcon.png";
import nextIcon from "../../../assets/next.png";
import refreshIcon from "../../../assets/refresh.png";
import downloadIcon from "../../../assets/download.png";
import { useState, useEffect, useRef } from 'react';
import Navbar from "../../../Components/Navabar/Navbar";
import Cross from "../../../assets/cross.png";
import { Modal, Pagination, LinearProgress, Backdrop, CircularProgress} from "@mui/material";
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
import CancelModel from './../../../Components/modals/CancelModel';
import Joystick from "../../../assets/four_direction_arrow.png";
import Trash from "../../../assets/trash.png"
import Edit from "../../../assets/edit.png"
import SaveConfirmationClientProperty from './Forms/SaveConfirmationClientProperty';
import EditClientProperty from './Forms/EditClientProperty';
import Select from "react-select"
import DeleteClientProperty from './DeleteClientProperty';
const env_URL_SERVER = import.meta.env.VITE_ENV_URL_SERVER
import Draggable from 'react-draggable';
import ActiveFilter from "../../../assets/active_filter.png";
import AddButton from '../../../Components/common/CustomButton';
const ManageClientProperty = () => {
    const menuRef = useRef();
    const { state, pathname } = useLocation()
    console.log(state)
    // we have the module here
    const navigate = useNavigate()
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
            // if (result.length > 0) {
            //     setFormValues((existing) => {
            //         const newData = { ...existing, city: result[0].id }
            //         return newData;
            //     })
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
        // setFormValues((existing) => {
        //     return { ...existing, userName: result.data[0].id }
        // })
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
        // setFormValues((existing) => {
        //     return { ...existing, entity: result.data[0][0] }
        // })
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
        // setFormValues((existing) => {
        //     return { ...existing, lob: result.data[0].id }
        // })
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
        const tempArray = [];
        // we need to query thru the object
        console.log(filterMapState);
        Object.keys(filterMapState).forEach(key => {
            if (filterMapState[key].filterType != "") {
                if(filterMapState[key].filterData == 'Numeric') {
                    tempArray.push([
                        key,
                        filterMapState[key].filterType,
                        filterMapState[key].filterValue,
                        filterMapState[key].filterData,
                    ]);
                }else {
                    tempArray.push([key, filterMapState[key].filterType, filterMapState[key].filterValue, filterMapState[key].filterData]);
                }
                
            }
        })
        setFilterState((prev) => tempArray)
        setCurrentPage((prev) => 1)
        setPageLoading(true);
        const data = {
            "user_id": 1234,
            "rows": [
                "client",
                "suburb",
                "city",
                "propertytype",
                "status",
                "description",
                "project",
                "id",
                "clientid",
                "projectid",
                "propertytypeid",
                "cityid",
                "state",
                "countryid",
                "country",
                "layoutdetails",
                "numberofparkings",
                "internalfurnitureandfittings",
                "leveloffurnishing",
                "propertystatus",
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
                "electricitybillingduedate",
            ],
            "filters": tempArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
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
        setExistingClientProperty(result.client_info);
        setPageLoading(false);
    }
    const fetchPageData = async (page) => {
        setPageLoading(true);
        setCurrentPage(() => page);
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
                "electricitybillingduedate",
                "description"
            ],
            "filters": filterState,
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
        setCurrentPage((prev) => 1)
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
                "electricitybillingduedate",
                "description"
            ],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
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
    const setHyperLinkData = () => {
        if(state != null) {
            console.log(state)
            setClientNameText(state.clientname)
            const temp = {...formValues}
            const ex = temp.client_property
            ex.clientid = state.clientid
            temp.client_property = ex 
            setFormValues(temp);
            // console.log(formValues)
        }
    }
    useEffect(() => {
        setHyperLinkData()
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
        initials();
        setIsClientPropertyDialogue(false);
        openAddCancelModal();
    }
    const initials = () => {
        setHyperLinkData()
        setFormValues(initialValues);
        setFormErrors({});
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
    // console.log(state.clientid)
    const initialValues = {
        "client_property": {
            "clientid": state?.clientid,
            "propertytype": null,
            "leveloffurnishing": null,
            "numberofparkings": null,
            "state": "Maharashtra",
            "city": "Pune",
            "suburb": null,
            "country": 5,
            "projectid": null,
            "status": null,
            "propertydescription": null,
            "layoutdetails": null,
            "email": null,
            "website": null,
            "initialpossessiondate": null,
            "electricityconsumernumber": null,
            "otherelectricitydetails": null,
            "electricitybillingduedate": null,
            "comments": null,
            "propertytaxnumber": null,
            "clientservicemanager": null,
            "propertymanager": null,
            "propertyownedbyclientonly": false,
            "gasconnectiondetails": null,
            "internalfurnitureandfittings": null,
            "textforposting": null,
            "poagiven": true,
            "poaid": null,
            "electricitybillingunit": null,
            "indexiicollected": false
        },
        "client_property_photos": [
            {
                "photolink": null,
                "description": null,
                "phototakenwhen": null
            }
        ],
        "client_property_owner": {
            "owner1name": null,
            "owner1panno": null,
            "owner1aadhaarno": null,
            "owner1pancollected": false,
            "owner1aadhaarcollected": false,
            "owner2name": null,
            "owner2panno": null,
            "owner2aadhaarno": null,
            "owner2pancollected": false,
            "owner2aadhaarcollected": null,
            "owner3name": null,
            "owner3panno": null,
            "owner3aadhaarno": null,
            "owner3pancollected": false,
            "owner3aadhaarcollected": false,
            "comments": null,
        },
        "client_property_poa": {
            "poalegalname": null,
            "poapanno": null,
            "poaaddressline1": null,
            "poaaddressline2": null,
            "poasuburb": null,
            "poacity": "Pune",
            "poastate": "Maharashtra",
            "poacountry": 5,
            "poazip": null,
            "poaoccupation": null,
            "poabirthyear": null,
            "poaphoto": null,
            "poaemployername": null,
            "poarelation": null,
            "poarelationwith": null,
            "poaeffectivedate": null,
            "poaenddate": null,
            "poafor": null,
            "scancopy": null
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
        console.log(formValues)
        var res = true;
        if (!formValues.client_property.clientid) {
            setFormErrors((existing) => {
                return { ...existing, clientid: "Enter Client Name" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, clientid: "" }
            })
        }
        if (!formValues.client_property.leveloffurnishing) {
            setFormErrors((existing) => {
                return { ...existing, leveloffurnishing: "Select Level Of Furnishing" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, leveloffurnishing: "" }
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
        console.log(formValues.client_property.projectid)
        if (!formValues.client_property.projectid) {
            setFormErrors((existing) => {
                return { ...existing, projectid: "Enter Project Name" }
            })
            res = false;
            // console.log('here')
        } else {
            setFormErrors((existing) => {
                return { ...existing, projectid: "" }
            })
            console.log('here')
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
        if (!formValues.client_property.propertytype) {
            setFormErrors((existing) => {
                return { ...existing, propertytype: "Enter Property Type " }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, propertytype: "" }
            })
        }
        if (!formValues.client_property.suburb) {
            setFormErrors((existing) => {
                return { ...existing, suburb: "Enter Suburb" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, suburb: "" }
            })
        }
        if (!formValues.client_property.state) {
            setFormErrors((existing) => {
                return { ...existing, state: "Enter State Name " }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, state: "" }
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
    const handleDownload = async (type) => {
        // setBackDropLoading(true)
        setDownloadModal(false)
        setPageLoading(true);
        const data = {
            "user_id": 1234,
            "rows": [
                "client",
                "suburb",
                "city",
                "propertytype",
                "status",
                "description",
                "project",
                "id",
            ],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 0,
            "pg_size": 0,
            "search_key": searchInput,
            
            "downloadType" : type,
            "colmap" : {
                "client" : "Client Name",
                "suburb" : "Property Suburb",
                "city" : "Property City",
                "propertytype" : "Property Type",
                "status" : "Property Status",
                "description" : "Property Description",
                "project" : "Society/Property Name",
                "id" : "ID",
            }
        };
        const response = await APIService.getClientProperty(data)
        const temp = await response.json();
        const result = temp.data;
        console.log(temp)
        if(temp.result == 'success') {
            const d = {
                "filename" : temp.filename,
                "user_id" : 1234
            }
            fetch(`${env_URL_SERVER}download/${temp.filename}`, {
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
                    FileSaver.saveAs(result, 'ClientPropertyData.xlsx');
                }else if(type == "pdf") {
                    FileSaver.saveAs(result, 'ClientPropertyData.pdf');
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
                "electricitybillingduedate",
                "description"
            ],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 0,
            "pg_size": 0,
            "search_key": searchInput
        };
        const response = await APIService.getClientProperty(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result)
        const worksheet = XLSX.utils.json_to_sheet(result.client_info);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "ClientPropertyData.xlsx");
        FileSaver.saveAs(workbook, "demo.xlsx");
    }
    const handleSearch = async () => {
        // console.log("clicked")
        setPageLoading(true);
        setCurrentPage((prev) => 1)
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
                "electricitybillingduedate",
                "description"
            ],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
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
        setExistingClientProperty(result.client_info);
        setPageLoading(false);
    }
    const handleCloseSearch = async () => {
        setPageLoading(true);
        setSearchInput("");
        setCurrentPage((prev) => 1)
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
                "electricitybillingduedate",
                "description"
            ],
            "filters": filterState,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
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
    const [currClientName, setCurrClientName] = useState("")
    const handleAddClientProperty = () => {
        console.log(formValues);
        // setIsClientInfoDialogue(false);
        if (!validate()) {
            setSelectedDialogue(1)
            console.log('here')
            return;
        }
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
                "projectid": Number(formValues.client_property.projectid),
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
                "electricitybillingunit": formValues.client_property.electricitybillingunit,
                "indexiicollected": formValues.client_property.indexiicollected
            },
            "client_property_photos": formValues.client_property_photos,
            "client_property_owner": {
                "owner1name": formValues.client_property_owner.owner1name,
                "owner1panno": formValues.client_property_owner.owner1panno,
                "owner1aadhaarno": formValues.client_property_owner.owner1aadhaarno,
                "owner1pancollected": formValues.client_property_owner.owner1pancollected,
                "owner1aadhaarcollected": formValues.client_property_owner.owner1aadhaarcollected,
                "owner2name": formValues.client_property_owner.owner2name,
                "owner2panno": formValues.client_property_owner.owner2panno,
                "owner2aadhaarno": formValues.client_property_owner.owner2aadhaarno,
                "owner2pancollected": formValues.client_property_owner.owner2pancollected,
                "owner2aadhaarcollected": formValues.client_property_owner.owner2aadhaarcollected,
                "owner3name": formValues.client_property_owner.owner3name,
                "owner3panno": formValues.client_property_owner.owner3panno,
                "owner3aadhaarno": formValues.client_property_owner.owner3aadhaarno,
                "owner3pancollected": formValues.client_property_owner.owner3pancollected,
                "owner3aadhaarcollected": formValues.client_property_owner.owner3aadhaarcollected,
                "comments": formValues.client_property_owner.comments,
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

    const [showCancelModelAdd, setShowCancelModelAdd] = useState(false);
    const [showCancelModel, setShowCancelModel] = useState(false);
    const openAddCancelModal = () => {
        // set the state for true for some time
        setIsClientPropertyDialogue(false);
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

    const filterMapping = {
        client: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        suburb: {
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
        propertytype: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        status: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        project: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        description: {
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
        console.log(type)
        if (type === 'noFilter') setInputVariable("");

        fetchFiltered(existing);
    }
    const [filterState, setFilterState] = useState([]);
    const fetchFiltered = async (mapState) => {
        setPageLoading(true);
        setClientNameFilter(false);
                setPropertySuburbFilter(false);
                setPropertyCityFilter(false);
                setPropertyTypeFilter(false);
                setPropertyStatusFilter(false);
                setPropertyDescriptionFilter(false);
                setPorjectNameFilter(false);
                setIdFilter(false);
        const tempArray = [];
        // we need to query thru the object
        // console.log(filterMapState);
        setFilterMapState(mapState)
        console.log(filterMapState)
        Object.keys(mapState).forEach(key => {
            if (mapState[key].filterType != "") {
                tempArray.push([key, mapState[key].filterType, mapState[key].filterValue, mapState[key].filterData]);
            }
        })
        setFilterState((prev) => tempArray)
        console.log('this is getting called')
        console.log(tempArray)
        setCurrentPage((prev) => 1)
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
                "electricitybillingduedate",
                "description"
            ],
            "filters": tempArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": searchInput
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
        Object.keys(filterMapState).forEach(key => {
            if (filterMapState[key].filterType != "") {
                tempArray.push([key, filterMapState[key].filterType, filterMapState[key].filterValue, filterMapState[key].filterData]);
            }
        })
        setFlag((prev) => !prev)
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
                "electricitybillingduedate",
                "description"
            ],
            "filters": filterState,
            "sort_by": [field],
            "order": !flag ? "asc" : "desc",
            "pg_no": Number(currentPage),
            "pg_size": Number(currentPages),
            "search_key": searchInput
        };
        // setFlag((prev) => !prev);
        const response = await APIService.getClientProperty(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result)
        const t = temp.total_count;
        setTotalItems(t);
        setExistingClientProperty(result.client_info);
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
      const [clientNameText,setClientNameText] = useState('Select Client')
    return (
        <div className="font-medium">
            
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={pageLoading}
                onClick={() => {}}
            >

               <CircularProgress color="inherit"/>

            </Backdrop>
            {addConfirmation && <SaveConfirmationClientProperty handleClose={() => showAddConfirmation(false)} currClientName={currClientName} addClientProperty={addClientProperty} showCancel={openAddCancelModal} setDefault={initials} />}
            {isEditDialogue && <EditClientProperty isOpen={isEditDialogue} handleClose={() => setIsEditDialogue(false)} clientId={currItem} openEditSuccess={openEditSuccess} showCancel={openCancelModal} />}
            {/* {isEditDialogue && <EditManageEmployee isOpen={isEditDialogue} handleClose={() => setIsEditDialogue(false)} item={currItem} showSuccess={openEditSuccess} />} */}
            {showAddSuccess && <SucessfullModal isOpen={showAddSuccess} message="New Property created successfully" />}
            {showDeleteSuccess && <SucessfullModal isOpen={showDeleteSuccess} message=" Property Deleted Successfully" />}
            {showEditSuccess && <SucessfullModal isOpen={showEditSuccess} message="Changes Saved Successfully" />}
            {showDeleteModal && <DeleteClientProperty handleClose={() => setShowDeleteModal(false)} handleDelete={deleteClientProperty}
                item={currItem} showCancel={openCancelModal} />}
            {showCancelModelAdd && <CancelModel isOpen={showCancelModelAdd} message="Process cancelled, no new property created." />}
            {showCancelModel && <CancelModel isOpen={showCancelModel} message="Process cancelled, no changes saved." />}
            <div className='h-[calc(100vh_-_123px)] w-full px-10'>
                <div className='h-16 w-full  flex justify-between items-center p-2  border-gray-300 border-b-2'>
                    <div className='flex items-center space-x-3'>
                        <div className='rounded-2xl  bg-[#EBEBEB] h-8 w-8 flex justify-center items-center '>
                            <button onClick={() => navigate(-1)}><img className='h-5 w-5' src={backLink} /></button>
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
                                onKeyDownCapture={handleKeyDown}
                            />
                            <button onClick={handleCloseSearch}><img src={Cross} className=' w-5 h-5 mx-2' /></button>
                            <div className="h-[36px] w-[40px] bg-[#004DD7] flex items-center justify-center rounded-r-lg">
                                <button onClick={handleSearch}><img className="h-[26px] " src={searchIcon} alt="search-icon" /></button>
                            </div>
                        </div>

                        <div>
                            {/* button */}
                            {/* <button className="bg-[#004DD7] text-white h-[36px] w-[290px] rounded-lg" onClick={handleOpen}>
                                <div className="flex items-center justify-center gap-2">
                                    <p className=''>Add New Client Property</p>
                                    <img className='h-[15px] w-[15px]' src={Add} alt="add" />
                                </div>
                            </button> */}
                            <AddButton title="Add New Client Property" sx={{ width: "290px" }} onClick={handleOpen} />
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
                            <div className='w-[12%]   p-3'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-[70%] bg-[#EBEBEB] rounded-[5px] outline-none pl-2" value={clientNameFilterInput} onChange={(e) => setClientNameFilterInput(e.target.value)} 
                                     onKeyDown={(event) => handleEnterToFilter(event,clientNameFilterInput,
                                        setClientNameFilterInput,
                                        'contains',
                                        'client')}
                                    
                                    />
                                    {filterMapState.client.filterType == "" ?  <button className='w-[25%] px-1 py-2' onClick={() => setClientNameFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> :  <button className='w-[25%] px-1 py-2' onClick={() => setClientNameFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>  }
                                    {/* <button className='px-1 py-2 w-[30%]'><img src={Filter} className='h-3 w-3' onClick={() => { setClientNameFilter((prev) => !prev) }} /></button> */}
                                </div>
                                {clientNameFilter && <CharacterFilter inputVariable={clientNameFilterInput} setInputVariable={setClientNameFilterInput} handleFilter={newHandleFilter} filterColumn='client' menuRef={menuRef} filterType={filterMapState.client.filterType}/>}
                            </div>

                            <div className='w-[9%]   p-3'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-[70%] bg-[#EBEBEB] rounded-[5px] outline-none pl-2" value={propertySuburbFilterInput} onChange={(e) => setPropertySuburbFilterInput(e.target.value)} 
                                    
                                    onKeyDown={(event) => handleEnterToFilter(event,propertySuburbFilterInput,
                                        setPropertySuburbFilterInput,
                                        'contains',
                                        'suburb')}
                                    
                                    />
                                    {filterMapState.suburb.filterType == "" ?  <button className='w-[25%] px-1 py-2' onClick={() => setPropertySuburbFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> :  <button className='w-[25%] px-1 py-2' onClick={() => setPropertySuburbFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>  }
                                    {/* <button className='px-1 py-2 w-[30%]'><img src={Filter} className='h-3 w-3' onClick={() => { setPropertySuburbFilter((prev) => !prev) }} /></button> */}
                                </div>
                                {propertySuburbFilter && <CharacterFilter inputVariable={propertySuburbFilterInput} setInputVariable={setPropertySuburbFilterInput} handleFilter={newHandleFilter} filterColumn='suburb' menuRef={menuRef} filterType={filterMapState.suburb.filterType}/>}
                            </div>

                            {/* <div className='w-[8%]   p-3'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-[65%] bg-[#EBEBEB] rounded-[5px] outline-none pl-2" value={propertyCityFilterInput} onChange={(e) => setPropertyCityFilterInput(e.target.value)} 
                                    
                                    onKeyDown={(event) => handleEnterToFilter(event,propertyCityFilterInput,
                                        setPropertyCityFilterInput,
                                        'contains',
                                        'city')}
                                    
                                    />
                                    <button className='px-1 py-2 w-[35%]'><img src={Filter} className='h-3 w-3' onClick={() => { setPropertyCityFilter((prev) => !prev) }} /></button>
                                </div>
                                {propertyCityFilter && <CharacterFilter inputVariable={propertyCityFilterInput} setInputVariable={setPropertyCityFilterInput} handleFilter={newHandleFilter} filterColumn='city' menuRef={menuRef} />}
                            </div> */}

                            <div className='w-[10%] p-3'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-[70%] bg-[#EBEBEB] rounded-[5px] outline-none pl-2" value={propertyTypeFilterInput} onChange={(e) => setPropertyTypeFilterInput(e.target.value)} 
                                    
                                    onKeyDown={(event) => handleEnterToFilter(event,propertyTypeFilterInput,
                                        setPropertyTypeFilterInput,
                                        'contains',
                                        'propertytype')}
                                    
                                    />
                                    {filterMapState.propertytype.filterType == "" ?  <button className='w-[25%] px-1 py-2' onClick={() => setPropertyTypeFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> :  <button className='w-[25%] px-1 py-2' onClick={() => setPropertyTypeFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>  }
                                    {/* <button className='px-1 py-2 w-[30%]'><img src={Filter} className='h-3 w-3' onClick={() => { setPropertyTypeFilter((prev) => !prev) }} /></button> */}
                                </div>
                                {propertyTypeFilter && <CharacterFilter inputVariable={propertyTypeFilterInput} setInputVariable={setPropertyTypeFilterInput} handleFilter={newHandleFilter} filterColumn='propertytype' menuRef={menuRef} filterType={filterMapState.propertytype.filterType}/>}
                            </div>

                            <div className='w-[9%]   p-3'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-[70%] bg-[#EBEBEB] rounded-[5px] outline-none pl-2" value={propertyStatusFilterInput} onChange={(e) => setPropertyStatusFilterInput(e.target.value)} 
                                    
                                    onKeyDown={(event) => handleEnterToFilter(event,propertyStatusFilterInput,
                                        setPropertyStatusFilterInput,
                                        'contains',
                                        'status')}
                                    />
                                    {filterMapState.status.filterType == "" ?  <button className='w-[25%] px-1 py-2' onClick={() => setPropertyStatusFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> :  <button className='w-[25%] px-1 py-2' onClick={() => setPropertyStatusFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>  }
                                    {/* <button className='px-1 py-2 w-[30%]'><img src={Filter} className='h-3 w-3' onClick={() => { setPropertyStatusFilter((prev) => !prev) }} /></button> */}
                                </div>
                                {propertyStatusFilter && <CharacterFilter inputVariable={propertyStatusFilterInput} setInputVariable={setPropertyStatusFilterInput} handleFilter={newHandleFilter} filterColumn='status' menuRef={menuRef} filterType={filterMapState.status.filterType}/>}
                            </div>

                            <div className='w-[18%]   p-3'>
                                <div className="w-[75%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-[75%] bg-[#EBEBEB] rounded-[5px] outline-none pl-2" value={propertyDescriptionFilterInput} onChange={(e) => setPropertyDescriptionFilterInput(e.target.value)} 
                                    
                                    onKeyDown={(event) => handleEnterToFilter(event,propertyDescriptionFilterInput,
                                        setPropertyDescriptionFilterInput,
                                        'contains',
                                        'description')}
                                    />

                                    {filterMapState.description.filterType == "" ?  <button className='w-[25%] px-1 py-2' onClick={() => setPropertyDescriptionFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> :  <button className='w-[25%] px-1 py-2' onClick={() => setPropertyDescriptionFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>  }
                                    {/* <button className='px-1 py-2 w-[25%]'><img src={Filter} className='h-3 w-3' onClick={() => { setPropertyDescriptionFilter((prev) => !prev) }} /></button> */}
                                </div>
                                {propertyDescriptionFilter && <CharacterFilter inputVariable={propertyDescriptionFilterInput} setInputVariable={setPropertyDescriptionFilterInput} handleFilter={newHandleFilter} filterColumn='description' menuRef={menuRef} filterType={filterMapState.description.filterType}/>}
                            </div>

                            <div className='w-[17%]   p-3'>
                                <div className="w-[75%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-[75%] bg-[#EBEBEB] rounded-[5px] outline-none pl-2" value={porjectNameFilterInput} onChange={(e) => setPorjectNameFilterInput(e.target.value)} 
                                    
                                    onKeyDown={(event) => handleEnterToFilter(event,porjectNameFilterInput,
                                        setPorjectNameFilterInput,
                                        'contains',
                                        'project')}
                                    
                                    />
                                    {filterMapState.project.filterType == "" ?  <button className='w-[25%] px-1 py-2' onClick={() => setPorjectNameFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> :  <button className='w-[25%] px-1 py-2' onClick={() => setPorjectNameFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>  }
                                    {/* <button className='px-1 py-2 w-[25%]'><img src={Filter} className='h-3 w-3' onClick={() => { setPorjectNameFilter((prev) => !prev) }} /></button> */}
                                </div>
                                {porjectNameFilter && <CharacterFilter inputVariable={porjectNameFilterInput} setInputVariable={setPorjectNameFilterInput} handleFilter={newHandleFilter} filterColumn='project' menuRef={menuRef} filterType={filterMapState.project.filterType} />}
                            </div>
                        </div>
                        <div className="w-[15%] ">
                            <div className='w-1/2   p-3'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-[65%] bg-[#EBEBEB] rounded-[5px] outline-none pl-2" value={idFilterInput} onChange={(e) => setIdFilterInput(e.target.value)} 
                                    
                                    onKeyDown={(event) => handleEnterToFilter(event,idFilterInput,
                                        setIdFilterInput,
                                        'equalTo',
                                        'id')}
                                    />
                                    {filterMapState.id.filterType == "" ?  <button className='w-[25%] px-1 py-2' onClick={() => setIdFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> :  <button className='w-[25%] px-1 py-2' onClick={() => setIdFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>  }
                                    {/* <button className='px-1 py-2 w-[35%]'><img src={Filter} className='h-3 w-3' onClick={() => { setIdFilter((prev) => !prev) }} /></button> */}
                                </div>
                                {idFilter && <NumericFilter inputVariable={idFilterInput} setInputVariable={setIdFilterInput} handleFilter={newHandleFilter} columnName='id' menuRef={menuRef} filterType={filterMapState.id.filterType}/>}
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
                                <div className='px-3 py-5 overflow-x-auto'>
                                    <p>Sr.</p>
                                </div>
                            </div>
                            <div className='w-[12%]  flex overflow-x-auto'>
                                <div className='p-3 '>
                                    <p>Client </p>
                                    <p>Name</p>
                                </div>
                                <button onClick={() => handleSort('client')}><span className="font-extrabold">↑↓</span></button>
                            </div>
                            <div className='w-[9%]  flex'>
                                <div className='p-3'>
                                    <p>Property</p>
                                    <p>Suburb</p>
                                </div>
                                <button onClick={() => handleSort('suburb')}><span className="font-extrabold">↑↓</span></button>
                            </div>
                            {/* <div className='w-[8%]  flex'>
                                <div className='p-3'>
                                    <p>Property City </p>
                                </div>
                                <button onClick={() => handleSort('city')}><span className="font-extrabold">↑↓</span></button>
                            </div> */}
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
                            <div className='w-[18%]  flex'>
                                <div className='px-3 py-5'>
                                    <p>Property Description <button onClick={() => handleSort('description')}><span className="font-extrabold">↑↓</span></button></p>
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
                    {/* {pageLoading && <div className=''>
                            <LinearProgress />
                        </div>} */}
                        {!pageLoading && existingClientProperty && existingClientProperty.length == 0 && <div className='h-10 border-gray-400 border-b-[1px] flex items-center'>
                            <h1 className='ml-10'>No Records To Show</h1>
                        </div>}
                    <div className='w-full h-[calc(100vh_-_18rem)] overflow-y-auto overflow-x-hidden'>
                        {!pageLoading && existingClientProperty && existingClientProperty.map((item, index) => {
                            return <div className='w-full h-11 overflow-hidden bg-white flex justify-between border-gray-400 border-b-[1px] text-xs'>
                                <div className="w-[85%] flex">
                                    <div className='w-[3%] flex items-center justify-center overflow-x-hidden'>
                                        <div className='px-3 flex items-center'>
                                            <p>{index + 1 + (currentPage - 1) * currentPages}</p>
                                        </div>
                                    </div>
                                    <div className='w-[12%]  flex items-center '>
                                        <div className='px-3 '>
                                            <p>{item.client}</p>
                                        </div>

                                    </div>
                                    <div className='w-[9%]  flex items-center'>
                                        <div className='px-3'>
                                            <p>{item.suburb}</p>
                                        </div>
                                    </div>
                                    {/* <div className='w-[8%]  flex items-center'>
                                        <div className='px-3'>
                                            <p>{item.city} </p>
                                        </div>
                                    </div> */}
                                    <div className='w-[10%]  flex items-center'>
                                        <div className='px-3'>
                                            <p>{item.propertytype}</p>
                                        </div>

                                    </div>
                                    <div className='w-[9%]  flex items-center'>
                                        <div className='px-3'>
                                            <p>{item.status}</p>
                                        </div>

                                    </div>
                                    <div className='w-[18%]  flex items-center'>
                                        <div className='px-3'>
                                            <p>{item.description} </p>
                                        </div>
                                    </div>
                                    <div className='w-[17%]  flex items-center'>
                                        <div className='px-3'>
                                            <p>{item.project}</p>
                                        </div>
                                    </div>
                                    <div className='w-[9%]  flex items-center'>
                                        <div className='px-1 text-[11px] text-blue-500'>
                                        {/* /manage/manageclientproperty/pmaagreement/:propertyid */}
                                        <Link to={`/manage/manageclientproperty/pmaagreement/${item.id}`} state={{ clientPropertyId: item.id , clientid : item.clientid, clientname : item.client , clientpropertydescription : item.description , hyperlinked : true}}>PMA Agreement </Link>
                                            {/* <Link to={`pmaagreement/${item.project.split(` `).join(`-`).toLowerCase()}`} state={{ clientPropertyId: item.id , clientid : item.clientid , clientname : item.client , description : item.description, project : item.project}}>PMA Agreement</Link> */}
                                        </div>
                                    </div>
                                    <div className='w-[9%]  flex items-center'>
                                        <div className='pl-1 text-[11px] text-blue-500'>
                                        <Link to={`/manage/manageclientproperty/llagreement/${item.id}`} state={{ clientPropertyId: item.id , clientid : item.clientid, clientname : item.client , clientpropertydescription : item.description , hyperlinked : true }}>L&L Agreement</Link>
                                            {/* <Link to={`llagreement/${item.project.split(` `).join(`-`).toLowerCase()}`} state={{ clientPropertyId: item.id }}>L&L Agreement</Link> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[15%] flex">
                                    <div className='w-1/2  flex items-center'>
                                        <div className='px-3 '>
                                            <p>{item.id}</p>
                                        </div>
                                    </div>
                                    <div className='w-1/2  flex items-center px-3 space-x-2'>
                                        <button onClick={() => { handleOpenEdit(item.id) }}><img className='w-5 h-5' src={Edit} alt="edit" /></button>
                                        <button onClick={() => handleDelete(item.id)}><img className='w-5 h-5' src={Trash} alt="trash" /></button>
                                    </div>
                                </div>

                            </div>
                        })}
                    </div>



                </div>


            </div>


            <div className='w-full h-12 flex justify-between px-6 bg-white fixed'>
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

            <Modal open={isClientPropertyDialogue}
                fullWidth={true}
                maxWidth={'md'}
                className='flex justify-center items-center'
            >
                <div className='flex justify-center relative'>
                    <Draggable handle='div.move'>
                        <div className="w-[1150px] h-auto bg-white rounded-lg">
                            <div className='move cursor-move'>
                                <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-lg">
                                    <div className="mr-[410px] ml-[410px]">
                                        <div className="text-[16px]">New Client Property</div>
                                    </div>
                                    <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white absolute right-2">
                                        <button onClick={handleClose}><img onClick={handleClose} className="w-[20px] h-[20px]" src={Cross} alt="cross" /></button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-1 flex bg-[#DAE7FF] justify-center space-x-4 items-center h-9">
                                <div className={`${selectedDialog == 1 ? "bg-blue-200" : "bg-[#EBEBEB]"} px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-60 cursor-pointer`} onClick={selectFirst}>
                                    <div>Project Information</div>
                                </div>
                                <div className={`${selectedDialog == 2 ? "bg-blue-200" : "bg-[#EBEBEB]"} px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-60 cursor-pointer`} onClick={selectSecond}>
                                    <div>Photos</div>
                                </div>
                                <div className={`${selectedDialog == 3 ? "bg-blue-200" : "bg-[#EBEBEB]"} px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-60 cursor-pointer`} onClick={selectThird}>
                                    <div>POA Details</div>
                                </div>
                                <div className={`${selectedDialog == 4 ? "bg-blue-200" : "bg-[#EBEBEB]"} px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-60 cursor-pointer`} onClick={selectForth}>
                                    <div>Owner Details</div>
                                </div>
                            </div>

                            {selectedDialog == 1 && <ProjectInformation clientData={clientData} initialCountries={allCountry} initialSociety={existingSociety} initialStates={allState} initialCities={allCity} clientTypeData={clientTypeData} formValues={formValues} setFormValues={setFormValues} propertyType={propertyType} levelOfFurnishing={levelOfFurnishing} propertyStatus={propertyStatus} formErrors={formErrors} setCurrClientName={setCurrClientName} clientname={clientNameText} setClientNameText={setClientNameText} clientid={state?.clientid} hyperlinkState={state}/>}
                            {selectedDialog == 2 && <Photos formValues={formValues} setFormValues={setFormValues} />}
                            {selectedDialog == 3 && <POADetails initialCountries={allCountry} initialStates={allState} initialCities={allCity} formValues={formValues} setFormValues={setFormValues} />}
                            {selectedDialog == 4 && <OwnerDetails formValues={formValues} setFormValues={setFormValues} />}

                            <div className="my-2 flex justify-center items-center gap-[10px]">
                                <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' onClick={handleAddClientProperty} >Add</button>
                                <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleClose}>Cancel</button>
                            </div>

                        </div>
                    </Draggable>
                </div>
            </Modal>


        </div>
    )
}

export default ManageClientProperty;