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
import Checkbox from '@mui/material/Checkbox';
import { APIService } from '../../../services/API';
import ClientInformation from "./Forms/ClientInformation"
import ClientPortal from "./Forms/ClientPortal";
import BankDetails from "./Forms/BankDetails";
import LegalInformation from "./Forms/LegalInformation"
import POADetails from "./Forms/POADetails"
import Pdf from "../../../assets/pdf.png";
import Excel from "../../../assets/excel.png"
import Edit from "../../../assets/edit.png"
import Trash from "../../../assets/trash.png"
import Filter from "../../../assets/filter.png"
import Add from "../../../assets/add.png";
import SucessfullModal from '../../../Components/modals/SucessfullModal';
import DeleteClientInfo from './Modals/DeleteClientInfoModal';
const ManageCountryInfo = () => {

    const menuRef = useRef();
    // we have the module here
    const [pageLoading, setPageLoading] = useState(false);
    const [existingEmployees, setExistingEmployees] = useState([]);
    const [existingClientInfo,setExistingClientInfo] = useState([])
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
    const [isClientInfoDialogue, setIsClientInfoDialogue] = useState(false);
    const [isEditDialogue, setIsEditDialogue] = React.useState(false);
    const [currItem, setCurrItem] = useState({});
    const [showAddSuccess, setShowAddSuccess] = useState(false);
    const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
    const [tenentOfData,setTenentOfData] = useState([])
    const [clientNameFilter, setClientNameFilter] = useState(false);
    const [ClientNameInput, setClientNameInput] = useState("");
    const [ClientTypeFilter, setClientTypeFilter] = useState(false);
    const [ClientTypeInput, setClientTypeInput] = useState("");
    const [tenentOfFilter, setTenentOfFilter] = useState(false);
    const [tenentOfInput, setTenentOfInput] = useState("");
    const [countryFilter, setCountryFilter] = useState(false);
    const [countryInput, setCountryInput] = useState("");
    const [cityFilter, setCityFilter] = useState(false);
    const [cityInput, setCityInput] = useState("");
    const [phoneFilter, setPhoneFilter] = useState(false);
    const [PhoneInput, setPhoneInput] = useState("");
    const [emailFilter, setEmailFilter] = useState(false);
    const [EmailInput, setEmailInput] = useState("");
    const [employeeNameFilter, setEmployeeNameFilter] = useState(false);
    const [EmployeeNameInput, setEmployeeNameInput] = useState("");
    const [idFilter, setIdFilter] = useState(false);
    const [idInput, setIdInput] = useState("");
    const [sortField,setSortField] = useState("id")
    const [relationData,setRelationData] = useState([]);
    const [showDelete,setShowDelete] = useState(false);
    const [buttonLoading,setButtonLoading] = useState(false);
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
    const fetchRelation = async () => {
        const data = {
            "user_id" : 1234
        }
        const response = await APIService.getRelationAdmin(data)
        const res = await response.json()
        console.log(res)
        setRelationData(res.data)
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
    // const [sortField, setSortField] = useState("id")
    const [flag, setFlag] = useState(false)
    const fetchData = async () => {
        // console.log('ugm')
        setPageLoading(true);
        const data = {
            "user_id": 1234,
            "rows": [
              "id",
              "firstname",
              "middlename",
              "lastname",
              "salutation",
              "clienttype",
              "clienttypename",
              "addressline1",
              "addressline2",
              "suburb",
              "city",
              "state",
              "country",
              "zip",
              "homephone",
              "workphone",
              "mobilephone",
              "email1",
              "email2",
              "employername",
              "comments",
              "photo",
              "onlineaccreated",
              "localcontact1name",
              "localcontact1address",
              "localcontact1details",
              "localcontact2name",
              "localcontact2address",
              "localcontact2details",
              "includeinmailinglist",
              "dated",
              "createdby",
              "isdeleted",
              "entityid",
              "tenantof"
            ],
            "filters": [],
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": 15
          };
        const response = await APIService.getClientInfo(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingClientInfo(result.client_info);
        setPageLoading(false);
    }
    const fetchPageData = async (pageNumber) => {
        setPageLoading(true);
        setCurrentPage(pageNumber)
        const data = {
            "user_id": 1234,
            "rows": [
              "id",
              "firstname",
              "middlename",
              "lastname",
              "salutation",
              "clienttype",
              "clienttypename",
              "addressline1",
              "addressline2",
              "suburb",
              "city",
              "state",
              "country",
              "zip",
              "homephone",
              "workphone",
              "mobilephone",
              "email1",
              "email2",
              "employername",
              "comments",
              "photo",
              "onlineaccreated",
              "localcontact1name",
              "localcontact1address",
              "localcontact1details",
              "localcontact2name",
              "localcontact2address",
              "localcontact2details",
              "includeinmailinglist",
              "dated",
              "createdby",
              "isdeleted",
              "entityid",
              "tenantof"
            ],
            "filters": [],
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": Number(pageNumber),
            "pg_size": Number(currentPages)
          };
        const response = await APIService.getClientInfo(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingClientInfo(result.client_info);
        setPageLoading(false);
    }
    const fetchQuantityData = async (quantity) => {
        setPageLoading(true);
        // console.log(searchInput);
        setCurrentPages(quantity)
        const data = {
            "user_id": 1234,
            "rows": [
              "id",
              "firstname",
              "middlename",
              "lastname",
              "salutation",
              "clienttype",
              "clienttypename",
              "addressline1",
              "addressline2",
              "suburb",
              "city",
              "state",
              "country",
              "zip",
              "homephone",
              "workphone",
              "mobilephone",
              "email1",
              "email2",
              "employername",
              "comments",
              "photo",
              "onlineaccreated",
              "localcontact1name",
              "localcontact1address",
              "localcontact1details",
              "localcontact2name",
              "localcontact2address",
              "localcontact2details",
              "includeinmailinglist",
              "dated",
              "createdby",
              "isdeleted",
              "entityid",
              "tenantof"
            ],
            "filters": [],
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": Number(currentPage),
            "pg_size": Number(quantity)
          };
        const response = await APIService.getClientInfo(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingClientInfo(result.client_info);
        setPageLoading(false);
    }
    useEffect(() => {
        fetchData();
        fetchCountryData();
        fetchStateData(5);
        fetchCityData("Maharashtra")
        fetchClientTypeData();
        fetchTenentOfData();
        fetchEntitiesData();
        fetchRelation();
        fetchRoleData();
        fetchUsersData();
        fetchLobData();
        const handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setClientNameFilter(false);
                setClientTypeFilter(false);
                setTenentOfFilter(false);
                setCountryFilter(false);
                setCityFilter(false);
                setPhoneFilter(false);
                setEmailFilter(false);
                setEmployeeNameFilter(false);
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
        setIsClientInfoDialogue(true);
    };

    const handleClose = () => {
        setIsClientInfoDialogue(false);
    }
    const [clientTypeData,setClientTypeData] = useState([]);
    const fetchClientTypeData = async () => {
        const data = {
            "user_id": 1234
        }
        const response = await APIService.getClientTypeAdmin(data);
        const res = await response.json()
        console.log(res)
        setClientTypeData(res.data)

    }
    const fetchTenentOfData = async () => {
        const data = {
            "user_id" : 1234
        }
        const response = await APIService.getTenantOfPropertyAdmin(data)
        const res = await response.json()
        console.log(res)
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
                "clientname" : "",
                "firstname":"",
                "middlename":"",
                "lastname":"",
                "salutation":"",
                "clienttype": null,
                "addressline1": "",
                "addressline2":"",
                "suburb":"",
                "city":"",
                "state":"Maharashtra",
                "country":5,
                "zip":"",
                "homephone":"",
                "workphone":"",
                "mobilephone":"",
                "email1":"",
                "email2":"",
                "employername":"",
                "comments":"",
                "photo":"",
                "onlineaccreated":null,
                "localcontact1name":"",
                "localcontact1address":"",
                "localcontact1details":"",
                "localcontact2name":"",
                "localcontact2address":"",
                "localcontact2details":"",
                "includeinmailinglist":null,
                "entityid":null,
                "tenentof":null,
                "tenentofproperty":null
            },
            "client_access":[
                {
                    "onlinemailid":"",
                    "onlinepwd":"",
                    "onlineclue":""
                }
            ],
            "client_bank_info":[{
                "bankname":"",
                "bankbranch":"",
                "bankcity":"",
                "bankaccountno":"",
                "bankaccountholdername":"",
                "bankifsccode":"",
                "bankmicrcode":"",
                "bankaccounttype":"",
                "description":""
            }],
            "client_legal_info":{
                "fulllegalname":"",
                "panno":"",
                "addressline1":"",
                "addressline2":"",
                "suburb":"",
                "city":"",
                "state":"",
                "country":null,
                "zip":"",
                "occupation":"",
                "birthyear":null,
                "employername":"",
                "relation":null,
                "relationwith":""
            },
            "client_poa":{
                "poalegalname":"",
                "poapanno":"",
                "poaaddressline1":"",
                "poaaddressline2":"",
                "poasuburb":"",
                "poacity":"",
                "poastate":"",
                "poacountry":null,
                "poazip":"",
                "poaoccupation":"",
                "poabirthyear":null,
                "poaphoto":"",
                "poaemployername":"",
                "poarelation":null,
                "poarelationwith":"",
                "poaeffectivedate":"",
                "poaenddate":"",
                "poafor":"",
                "scancopy":""
            }	
        
    }
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
        if (!formValues.employeeName) {
            setFormErrors((existing) => {
                return { ...existing, employeeName: "Enter Employee name" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, employeeName: "" }
            })
        }
        if (!formValues.panNo) {
            setFormErrors((existing) => {
                return { ...existing, panNo: "Enter Pan Number" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, panNo: "" }
            })
        }
        if (!formValues.doj) {
            setFormErrors((existing) => {
                return { ...existing, doj: "Enter date of joining" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, doj: "" }
            })
        }
        if (!formValues.designation) {
            setFormErrors((existing) => {
                return { ...existing, designation: "Enter Designation" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, designation: "" }
            })
        }
        if (!formValues.email) {
            setFormErrors((existing) => {
                return { ...existing, email: "Enter email address" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, email: "" }
            })
        }
        if (!formValues.employeeId) {
            setFormErrors((existing) => {
                return { ...existing, employeeId: "Enter Employee Id" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, employeeId: "" }
            })
        }
        if (!formValues.lob) {
            setFormErrors((existing) => {
                return { ...existing, lob: "Select LOB" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, lob: "" }
            })
        }
        if (!formValues.dob) {
            setFormErrors((existing) => {
                return { ...existing, dob: "enter date of birth" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, dob: "" }
            })
        }
        if (!formValues.role) {
            setFormErrors((existing) => {
                return { ...existing, role: "Select Role" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, role: "" }
            })
        }
        if (!formValues.phNo) {
            setFormErrors((existing) => {
                return { ...existing, phNo: "Enter phone number" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, phNo: "" }
            })
        }
        if (!formValues.country) {
            setFormErrors((existing) => {
                return { ...existing, country: "Select country" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, country: "" }
            })
        }
        if (formValues.state == "") {
            setFormErrors((existing) => {
                return { ...existing, state: "Select state" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, state: "" }
            })
        }
        if (!formValues.city) {
            setFormErrors((existing) => {
                return { ...existing, city: "Select city" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, city: "" }
            })
        }
        if (!formValues.suburb) {
            setFormErrors((existing) => {
                return { ...existing, suburb: "Enter suburb" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, suburb: "" }
            })
        }
        if (!formValues.entity) {
            setFormErrors((existing) => {
                return { ...existing, entity: "Select Entity" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, entity: "" }
            })
        }
        return res;
    }

    const deleteEmployee = async (id) => {
        const data = {
            "user_id": 1234,
            "id": id
        }
        const response = await APIService.deleteEmployee(data);
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
            "rows": ["id", "employeename", "employeeid", "phoneno", "email", "userid", "roleid", "panno", "dateofjoining", "lastdateofworking", "status"],
            "filters": [],
            "sort_by": [],
            "order": "asc",
            "pg_no": 0,
            "pg_size": 0
        };
        const response = await APIService.getEmployees(data)
        const temp = await response.json();
        const result = temp.data;
        const worksheet = XLSX.utils.json_to_sheet(result);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "ClientInfoData.xlsx");
        FileSaver.saveAs(workbook, "demo.xlsx");
    }
    const handleSearch = async () => {
        // console.log("clicked")
        setPageLoading(true);
        setIsSearchOn(true);
        const data = {
            "user_id": 1234,
            "rows": ["id", "employeename", "employeeid", "phoneno", "email", "userid", "roleid", "panno", "dateofjoining", "lastdateofworking", "status"],
            "filters": [],
            "sort_by": [],
            "order": "asc",
            "pg_no": 1,
            "pg_size": 15,
            "search_key": searchInput
        };
        const response = await APIService.getEmployees(data);
        const temp = await response.json();
        const result = temp.data;
        const t = temp.total_count;
        setTotalItems(t);
        setExistingEmployees(result);
        setPageLoading(false);
    }
    const handleCloseSearch = async () => {
        setIsSearchOn(false);
        setPageLoading(true);
        setSearchInput("");
        const data = {
            "user_id": 1234,
            "rows": ["id", "employeename", "employeeid", "phoneno", "email", "userid", "roleid", "panno", "dateofjoining", "lastdateofworking", "status"],
            "filters": [],
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": ""
        };
        const response = await APIService.getEmployees(data);
        const temp = await response.json();
        const result = temp.data;
        const t = temp.total_count;
        setTotalItems(t);
        setExistingEmployees(result);
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
    const openEditSuccess = () => {
        setIsEditDialogue(false);
        setShowEditSuccess(true);
        setTimeout(function () {
            setShowEditSuccess(false);
        }, 2000)
        fetchData();
    }
    const handleAddClientInfo = async () => {
        setButtonLoading(true);
        console.log(formValues);
        const temp = formValues.client_info.clientname.split(' ');
        console.log(temp)
        const  size = temp.length
        var firstname = "";
        var middlename = "";
        var lastname = "";
        if(size == 1) {
           firstname = temp[0];
        }else if(size == 2) {
           firstname = temp[0]
           lastname = temp[1]
        }else if(size == 3) {
            firstname = temp[0]
            middlename = temp[1]
            lastname = temp[2]
        }
        const data = {
            "user_id": 1234,
            "client_info": {
                "firstname":firstname,
                "middlename": middlename,
                "lastname": lastname,
                "salutation": formValues.client_info.salutation,
                "clienttype": Number(formValues.client_info.clienttype),
                "addressline1":formValues.client_info.addressline1,
                "addressline2":formValues.client_info.addressline2,
                "suburb":"sub",
                "city":"Mumbai",
                "state":"Maharashtra",
                "country":5,
                "zip":formValues.client_info.zip,
                "homephone":formValues.client_info.homephone,
                "workphone":formValues.client_info.workphone,
                "mobilephone":formValues.client_info.mobilephone,
                "email1":formValues.client_info.email1,
                "email2":formValues.client_info.email2,
                "employername":"Employer",
                "comments":formValues.client_info.comments,
                "photo":"efiufheu",
                "onlineaccreated":false,
                "localcontact1name":formValues.client_info.localcontact1name,
                "localcontact1address":formValues.client_info.localcontact1address,
                "localcontact1details":formValues.client_info.localcontact1details,
                "localcontact2name":formValues.client_info.localcontact2name,
                "localcontact2address":formValues.client_info.localcontact2address,
                "localcontact2details":formValues.client_info.localcontact2details,
                "includeinmailinglist":true,
                "entityid":Number(formValues.client_info.entityid),
                "tenantof":Number(formValues.client_info.tenentof),
                "tenantofproperty":0
            },
            "client_access": formValues.client_access,
            "client_bank_info":formValues.client_bank_info,
            "client_legal_info":{
                "fulllegalname":formValues.client_legal_info.fulllegalname,
                "panno":formValues.client_legal_info.panno,
                "addressline1":formValues.client_legal_info.addressline1,
                "addressline2":formValues.client_legal_info.addressline2,
                "suburb":formValues.client_legal_info.suburb,
                "city":"Mumbai",
                "state":"Maharashtra",
                "country":5,
                "zip":"zipcode",
                "occupation":"person",
                "birthyear":2004,
                "employername":"GHI JKL",
                "relation":1,
                "relationwith":"MNOP QRST"
            },
            "client_poa":{
                "poalegalname":"abcdef ghijkl",
                "poapanno":"647364873",
                "poaaddressline1":"eyge rfhrughur rf",
                "poaaddressline2":"jrijg fruhfur ijf",
                "poasuburb":"sub",
                "poacity":"Mumbai",
                "poastate":"Maharashtra",
                "poacountry":5,
                "poazip":"zipcode",
                "poaoccupation":"person",
                "poabirthyear":2003,
                "poaphoto":"fjr furhfusfufbrf",
                "poaemployername":"frijiurgh nfr",
                "poarelation":2,
                "poarelationwith":"ABC DEF",
                "poaeffectivedate":"2024-03-02",
                "poaenddate":"2024-03-03",
                "poafor":"ABC EFG",
                "scancopy":"dhegfhuefu"
            }	
        };
        const response = await APIService.addClientInfo(data)
        const res = await response.json();
        // console.log(res)
        if(res.result == 'success') {
           
           setIsClientInfoDialogue(false);
           openAddSuccess();
           setFormValues(initialValues)
        }else {
             console.log('np')
        } 
        setButtonLoading(false);
    }
    
    const handleDelete = async  (id) => {
        
        const data = {
            "user_id" : 1234,
            "id" : id
        }
        const response = await APIService.deleteClientInfo(data)
        const res = await response.json()
        console.log(res)
        setShowDelete(false); 
        fetchData()
    }
    const openDelete = (id) => {
        setCurrItem(id)
        setShowDelete(true);
    }
    // const [showAddSuccess,setShowAddSuccess] = useState(false);
    return(
        <div className='h-screen'>
            <Navbar/>
            {showAddSuccess && <SucessfullModal isOpen={showAddSuccess} message="Successfully Added Client"/>}
            {showDelete && <DeleteClientInfo handleDelete={handleDelete} item={currItem} handleClose={() => setShowDelete(false)}/>}
            <div className='h-[calc(100vh_-_7rem)] w-full  px-10'>
            <div className='h-16 w-full  flex justify-between items-center p-2  border-gray-300 border-b-2'>
                            <div className='flex items-center space-x-3'>
                                <div className='rounded-2xl  bg-[#EBEBEB] h-8 w-8 flex justify-center items-center '>
                                    <img className='w-5 h-5' src={backLink} />
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
                                        className="h-[36px] bg-[#EBEBEB] text-[#787878]"
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
                                    <button className="bg-[#004DD7] text-white h-[36px] w-[250px] rounded-lg" onClick={handleOpen}>
                                        <div className="flex items-center justify-center gap-4">
                                            Add New Client
                                            <img className='h-[18px] w-[18px]' src={Add} alt="add" />
                                        </div>
                                    </button>
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
                                    <div className='w-[12%]  flex p-3'>
                                        <div className="w-[72%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                            <input className="w-12 bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2" onChange={(e) => setClientNameInput(e.target.value)} />
                                            <button className='p-1'><img src={Filter} className='h-[15px] w-[15px]' onClick={() => { setClientNameFilter((prev) => !prev) }} /></button>
                                        </div>
                                        {clientNameFilter && <div className='h-[270px] w-[150px] mt-10 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm z-40' ref={menuRef} >
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >No Filter</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >Contains</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >DoesNotContain</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >StartsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                                                <button onClick={() => { }}><h1 >EndsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >EqualTo</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >isNull</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >NotIsNull</h1></button>
                                            </div>
                                        </div>}
                                    </div>

                                    <div className='w-[10%]  flex p-3'>
                                        <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                            <input className="w-14 bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2" onChange={(e) => setClientTypeInput(e.target.value)} />
                                            <button className='p-1'><img src={Filter} className='h-[15px] w-[15px]' onClick={() => { setClientTypeFilter((prev) => !prev) }} /></button>
                                        </div>
                                        {ClientTypeFilter && <div className='h-[270px] w-[150px] mt-10 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm z-40' ref={menuRef} >
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >No Filter</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >Contains</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >DoesNotContain</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >StartsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                                                <button onClick={() => { }}><h1 >EndsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >EqualTo</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >isNull</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >NotIsNull</h1></button>
                                            </div>
                                        </div>}
                                    </div>

                                    <div className='w-[9%]  flex p-3'>
                                        <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                            <input className="w-11 bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2" onChange={(e) => setTenentOfInput(e.target.value)} />
                                            <button className='p-1'><img src={Filter} className='h-[15px] w-[15px]' onClick={() => { setTenentOfFilter((prev) => !prev) }} /></button>
                                        </div>
                                        {tenentOfFilter && <div className='h-[270px] w-[150px] mt-10 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm z-40' ref={menuRef} >
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >No Filter</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >Contains</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >DoesNotContain</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >StartsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                                                <button onClick={() => { }}><h1 >EndsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >EqualTo</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >isNull</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >NotIsNull</h1></button>
                                            </div>
                                        </div>}
                                    </div>

                                    <div className='w-[10%]  flex p-3'>
                                        <div className="w-[90%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                            <input className="w-12 bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2" onChange={(e) => setCountryInput(e.target.value)} />
                                            <button className='p-1'><img src={Filter} className='h-[15px] w-[15px]' onClick={() => { setCountryFilter((prev) => !prev) }} /></button>
                                        </div>
                                        {countryFilter && <div className='h-[270px] w-[150px] mt-10 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm z-40' ref={menuRef} >
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >No Filter</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >Contains</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >DoesNotContain</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >StartsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                                                <button onClick={() => { }}><h1 >EndsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >EqualTo</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >isNull</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >NotIsNull</h1></button>
                                            </div>
                                        </div>}
                                    </div>

                                    <div className='w-[7%]  flex p-3'>
                                        <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                            <input className="w-7 bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2" onChange={(e) => setCityInput(e.target.value)} />
                                            <button className='p-1'><img src={Filter} className='h-[15px] w-[15px]' onClick={() => { setCityFilter((prev) => !prev) }} /></button>
                                        </div>
                                        {cityFilter && <div className='h-[270px] w-[150px] mt-10 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm z-40' ref={menuRef} >
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >No Filter</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >Contains</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >DoesNotContain</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >StartsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                                                <button onClick={() => { }}><h1 >EndsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >EqualTo</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >isNull</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >NotIsNull</h1></button>
                                            </div>
                                        </div>}
                                    </div>

                                    <div className='w-[10%]  flex p-3'>
                                        <div className="w-[90%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                            <input className="w-12 bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2" onChange={(e) => setPhoneInput(e.target.value)} />
                                            <button className='p-1'><img src={Filter} className='h-[15px] w-[15px]' onClick={() => { setPhoneFilter((prev) => !prev) }} /></button>
                                        </div>
                                        {phoneFilter && <div className='h-[270px] w-[150px] mt-10 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm z-40' ref={menuRef} >
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >No Filter</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >Contains</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >DoesNotContain</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >StartsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                                                <button onClick={() => { }}><h1 >EndsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >EqualTo</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >isNull</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >NotIsNull</h1></button>
                                            </div>
                                        </div>}
                                    </div>

                                    <div className='w-[14%]  flex p-3'>
                                        <div className="w-[65%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                            <input className="w-14 bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2" onChange={(e) => setEmailInput(e.target.value)} />
                                            <button className='p-1'><img src={Filter} className='h-[15px] w-[15px]' onClick={() => { setEmailFilter((prev) => !prev) }} /></button>
                                        </div>
                                        {emailFilter && <div className='h-[270px] w-[150px] mt-10 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm z-40' ref={menuRef} >
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >No Filter</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >Contains</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >DoesNotContain</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >StartsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                                                <button onClick={() => { }}><h1 >EndsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >EqualTo</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >isNull</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >NotIsNull</h1></button>
                                            </div>
                                        </div>}
                                    </div>

                                    <div className='w-[13%]  flex p-3'>
                                        <div className="w-[72%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                            <input className="w-14 bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2" onChange={(e) => setEmployeeNameInput(e.target.value)} />
                                            <button className='p-1'><img src={Filter} className='h-[15px] w-[15px]' onClick={() => { setEmployeeNameFilter((prev) => !prev) }} /></button>
                                        </div>
                                        {employeeNameFilter && <div className='h-[270px] w-[150px] mt-10 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm z-40' ref={menuRef} >
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >No Filter</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >Contains</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >DoesNotContain</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >StartsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                                                <button onClick={() => { }}><h1 >EndsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >EqualTo</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >isNull</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >NotIsNull</h1></button>
                                            </div>
                                        </div>}
                                    </div>

                                </div>
                                <div className="w-[15%] flex">
                                    <div className='w-1/2  flex p-3'>
                                        <div className="w-[97%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                            <input className="w-10 bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2" onChange={(e) => setIdInput(e.target.value)} />
                                            <button className='p-1'><img src={Filter} className='h-[15px] w-[15px]' onClick={() => { setIdFilter((prev) => !prev) }} /></button>
                                        </div>
                                        {idFilter && <div className='h-[270px] w-[150px] mt-10 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm z-40' ref={menuRef} >
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >No Filter</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >Contains</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >DoesNotContain</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >StartsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                                                <button onClick={() => { }}><h1 >EndsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >EqualTo</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >isNull</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                                <button onClick={() => { }}><h1 >NotIsNull</h1></button>
                                            </div>
                                        </div>}
                                    </div>

                                    <div className='w-1/2  flex'>
                                        <div className='p-3'>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>




                        <div className='h-[calc(100vh_-_14rem)] w-full text-[12px]'>
                        <div className='w-full h-12 bg-[#F0F6FF] flex justify-between border-gray-400 border-b-[1px]'>
                        <div className="w-[85%] flex">
                                <div className='w-[3%] flex'>
                                    <div className='p-3'>
                                        <p>Sr.</p>
                                    </div>
                                </div>
                                <div className='w-[12%]  flex'>
                                    <div className='p-3'>
                                        <p>Client Name <span className="font-extrabold">↑↓</span></p>
                                    </div>
                                </div>
                                <div className='w-[10%]  flex'>
                                    <div className='p-3'>
                                        <p>Client Type <span className="font-extrabold">↑↓</span></p>
                                    </div>
                                </div>
                                <div className='w-[9%]  flex'>
                                    <div className='p-3'>
                                        <p>Tenent of </p>
                                    </div>
                                </div>
                                <div className='w-[10%]  flex'>
                                    <div className='p-3'>
                                        <p>Country <span className="font-extrabold">↑↓</span></p>
                                    </div>
                                </div>
                                <div className='w-[7%]  flex'>
                                    <div className='p-3'>
                                        <p>City <span className="font-extrabold">↑↓</span></p>
                                    </div>
                                </div>
                                <div className='w-[10%]  flex'>
                                    <div className='p-3'>
                                        <p>Phone <span className="font-extrabold">↑↓</span></p>
                                    </div>
                                </div>
                                <div className='w-[14%]  flex'>
                                    <div className='p-3'>
                                        <p>Email <span className="font-extrabold">↑↓</span></p>
                                    </div>
                                </div>
                                <div className='w-[13%]  flex'>
                                    <div className='p-3'>
                                        <p>Employer name <span className="font-extrabold">↑↓</span></p>
                                    </div>
                                </div>
                                <div className='w-[6%]  flex'>
                                    <div className='p-3'>

                                    </div>
                                </div>
                                <div className='w-[6%]  flex'>
                                    <div className='p-3'>

                                    </div>
                                </div>
                            </div>
                            <div className="w-[15%] flex">
                                <div className='w-1/2  flex'>
                                    <div className='p-3'>
                                        <p>ID <span className="font-extrabold">↑↓</span></p>
                                    </div>
                                </div>
                                <div className='w-1/2  flex'>
                                    <div className='p-3'>
                                        <p>Edit</p>
                                    </div>
                                </div>
                            </div>

                        </div>



                        <div className='w-full h-[450px] overflow-auto'>

                            
                            {pageLoading && <div className='ml-5 mt-5'><LinearProgress /></div>}
                            {!pageLoading && existingClientInfo.map((item, index) => {
                                return <div className='w-full h-14 bg-white flex justify-between border-gray-400 border-b-[1px]'>
                                    <div className="w-[85%] flex">
                                <div className='w-[3%] flex'>
                                    <div className='p-3'>
                                        <p>{index + 1 + (currentPage - 1) * currentPages}</p>
                                    </div>
                                </div>
                                <div className='w-[12%]  flex'>
                                    <div className='p-3'>
                                        <p>{item.firstname + " " + item.middlename + " " + item.lastname} </p>
                                    </div>
                                </div>
                                <div className='w-[10%]  flex'>
                                    <div className='p-3'>
                                        <p> {item.clienttype}</p>
                                    </div>
                                </div>
                                <div className='w-[9%]  flex'>
                                    <div className='p-3'>
                                        <p>{item.tenantof} </p>
                                    </div>
                                </div>
                                <div className='w-[10%]  flex'>
                                    <div className='p-3'>
                                        <p>{item.country}</p>
                                    </div>
                                </div>
                                <div className='w-[7%]  flex'>
                                    <div className='p-3'>
                                        <p>{item.city}</p>
                                    </div>
                                </div>
                                <div className='w-[10%]  flex'>
                                    <div className='p-3'>
                                        <p>{item.mobilephone}</p>
                                    </div>
                                </div>
                                <div className='w-[14%]  flex'>
                                    <div className='p-3 overflow-hidden'>
                                        <p>{item.email1 || item.email2}</p>
                                    </div>
                                </div>
                                <div className='w-[13%]  flex'>
                                    <div className='p-3'>
                                        <p>{item.employername}</p>
                                    </div>
                                </div>
                                <div className='w-[6%]  flex'>
                                    <div className='p-3'>

                                    </div>
                                </div>
                                <div className='w-[6%]  flex'>
                                    <div className='p-3'>

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
                                           <img className='w-5 h-5 cursor-pointer' src={Edit} alt="edit" onClick={() => {}} />
                                            <img className='w-5 h-5 cursor-pointer' src={Trash} alt="trash" onClick={() => {openDelete(item.id)}} />
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



                    <Modal open={isClientInfoDialogue}
                fullWidth={true}
                maxWidth={'md'}
                className='flex justify-center items-center'
            >
                <div className='flex justify-center'>
                    <div className="w-[1200px] h-auto bg-white rounded-lg">
                        <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-lg">
                            <div className="mr-[410px] ml-[410px]">
                                <div className="text-[16px]">New Client</div>
                            </div>
                            <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                                <button onClick={handleClose}><img onClick={handleClose} className="w-[20px] h-[20px]" src={Cross} alt="cross" /></button>
                            </div>
                        </div>

                        <div className="mt-1 flex bg-[#DAE7FF] justify-center space-x-4 items-center h-9">
                            <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-60 cursor-pointer" onClick={selectFirst}>
                                <div>Client Information</div>
                            </div>
                            <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-60 cursor-pointer" onClick={selectSecond}>
                                <div>Client portal</div>
                            </div>
                            <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-60 cursor-pointer" onClick={selectThird}>
                                <div>Bank Details</div>
                            </div>
                            <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-60 cursor-pointer" onClick={selectForth}>
                                <div>Legal Information</div>
                            </div>
                            <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-60 cursor-pointer" onClick={selectFifth}>
                                <div>POA details</div>
                            </div>
                        </div>

                        {selectedDialog == 1 && <ClientInformation  formValues={formValues} setFormValues={setFormValues} allCountry={allCountry} clientTypeData={clientTypeData} tenentOfData={tenentOfData} allEntities={allEntities} initialStates={allState} initialCities={allCity} />}
                        {selectedDialog == 2 && <ClientPortal formValues={formValues} setFormValues={setFormValues}/>}
                        {selectedDialog == 3 && <BankDetails formValues={formValues} setFormValues={setFormValues}/>}
                        {selectedDialog == 4 && <LegalInformation formValues={formValues} setFormValues={setFormValues} relationData={relationData} allCountry={allCountry}/>}
                        {selectedDialog == 5 && <POADetails formValues={formValues} setFormValues={setFormValues} relationData={relationData}/>}

                        <div className="my-[10px] flex justify-center items-center gap-[10px]">
                            <button className={`${buttonLoading ? " bg-gray-600 cursor-not-allowed disabled"  : "bg-[#004DD7]" } w-[100px] h-[35px]  text-white rounded-md`} onClick={handleAddClientInfo} >Add</button>
                            <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleClose}>Cancel</button>
                        </div>

                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ManageCountryInfo;
