import React, { useRef } from 'react';
import { Outlet, Link } from "react-router-dom";
import backLink from "../../../assets/back.png";
import searchIcon from "../../../assets/searchIcon.png";
import nextIcon from "../../../assets/next.png";
import refreshIcon from "../../../assets/refresh.png";
import downloadIcon from "../../../assets/download.png";
import { useState, useEffect } from 'react';
import Navbar from "../../../Components/Navabar/Navbar";
import Cross from "../../../assets/cross.png";
import { Modal, Pagination, LinearProgress } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import { APIService } from '../../../services/API';
import Pdf from "../../../assets/pdf.png";
import Excel from "../../../assets/excel.png"
import Edit from "../../../assets/edit.png"
import Trash from "../../../assets/trash.png"
import Filter from "../../../assets/filter.png"
import Add from "../../../assets/add.png";
import ProjectInformation from "./ManageProjectInfoForm/ProjectInformation";
import ProjectDetails from "./ManageProjectInfoForm/ProjectDetails";
import BankDetails from "./ManageProjectInfoForm/BankDetails";
import Contact from './ManageProjectInfoForm/Contact';
import Photos from './ManageProjectInfoForm/Photos';
import EditProjectInfo from './EditProjectInfo';
import SucessfullModal from "../../../Components/modals/SucessfullModal"
import DeleteProjectInfo from './DeleteProjectInfo';
import CharacterFilter from '../../../Components/Filters/CharacterFilter';
import NumericFilter from '../../../Components/Filters/NumericFilter';
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
import SaveConfirmationProjectInfo from './SaveConfirmationProjectInfo';
import Draggable from 'react-draggable';
const ManageProjectInfo = () => {
    const dataRows = ["buildername", "builderid", "projectname", "addressline1", "addressline2", "suburb", "city", "state", "country", "zip", "nearestlandmark", "project_type", "mailgroup1", "mailgroup2", "website", "project_legal_status", "rules", "completionyear", "jurisdiction", "taluka", "corporationward", "policechowkey", "policestation", "maintenance_details", "numberoffloors", "numberofbuildings", "approxtotalunits", "tenantstudentsallowed", "tenantworkingbachelorsallowed", "tenantforeignersallowed", "otherdetails", "duespayablemonth", "dated", "createdby", "isdeleted", "id"]
    // we have the module here

    const menuRef = useRef();

    const [pageLoading, setPageLoading] = useState(false);
    const [existingProjectInfo, setExistingProjectInfo] = useState([]);
    const [currentPages, setCurrentPages] = useState(15);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [downloadModal, setDownloadModal] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [isSearchOn, setIsSearchOn] = useState(false);
    const [selectedDialogue, setSelectedDialogue] = useState(1);
    const [sortField, setSortField] = useState("id");
    const [flag, setFlag] = useState(false);
    const selectFirst = () => {
        setSelectedDialogue(1);
    }
    const selectSecond = () => {
        setSelectedDialogue(2);
    }
    const selectThird = () => {
        setSelectedDialogue(3);
    }
    const selectFourth = () => {
        setSelectedDialogue(4);
    }
    const selectFifth = () => {
        setSelectedDialogue(5);
    }
    const fetchData = async () => {
        setCurrentPage((prev) => 1)
        setPageLoading(true);
        const data = {
            "user_id": 1234,
            "rows": dataRows,
            "filters": stateArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": searchInput
        };
        const response = await APIService.getProjectInfo(data);
        const temp = await response.json();
        console.log(temp);
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingProjectInfo(result);
        console.log(result);
        setPageLoading(false);
    }
    const fetchPageData = async (pageNumber) => {
        setCurrentPage((prev) => pageNumber)
        setPageLoading(true);
        const data = {
            "user_id": 1234,
            "rows": dataRows,
            "filters": stateArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": Number(pageNumber),
            "pg_size": Number(currentPages),
            "search_key": searchInput
        };
        const response = await APIService.getProjectInfo(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingProjectInfo(result);
        setPageLoading(false);
    }
    const fetchQuantityData = async (quantity) => {
        setPageLoading(true);
        console.log(searchInput);
        setCurrentPages((prev) => quantity)
        setCurrentPage((prev) => 1)
        const data = {
            "user_id": 1234,
            "rows": dataRows,
            "filters": stateArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(quantity),
            "search_key": searchInput
        };
        const response = await APIService.getProjectInfo(data);
        const temp = await response.json();
        const result = temp.data;
        console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingProjectInfo(result);
        setPageLoading(false);
    }
    useEffect(() => {
        console.log('called')
        fetchData();
        const handler = (e) => {
            console.log(menuRef)
            if (menuRef.current == null || !menuRef.current.contains(e.target)) {
                setProjectNameFilter(false)
                setBuilderNameFilter(false)
                setSuburbFilter(false)
                setOtherDetailsFilter(false)
                setMailGroupFilter(false)
                setSubscribedEmailFilter(false)
                setRulesFilter(false)
                setIdFilter(false)
            }
        }

        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);



    const [formErrors, setFormErrors] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const handleDelete = (id) => {
        console.log(id)
        setCurrProject((prev) => id)
        setShowDeleteModal(true);
    }
    const deleteProject = async (id) => {

        const data = {
            "user_id": 1234,
            "id": id
        }
        const response = await APIService.deleteProject(data);
        const res = await response.json();
        setShowDeleteModal(false);
        if (res.result == 'success') {
            openDeleteSuccess()
            fetchData()
        }

    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // setFormErrors(validate(formValues));

        // handle adding of data



    };
    // const [formErrors,setFormErrors] = useState({});
    const validate = () => {
        // var res = true
        let res = {
            status: true,
            page: 1
        }
        if (formValues.project_info.project_legal_status == null || formValues.project_info.project_legal_status == "") {
            // we need to set the formErrors
            setFormErrors((existing) => {
                return { ...existing, project_legal_status: "Enter Project Legal Status" }
            })

            res.status = false
            res.page = 2
        } else {
            setFormErrors((existing) => {
                return { ...existing, project_legal_status: "" }
            })
        }
        // if(formValues.project_info.)
        if (formValues.project_info.projectname == null || formValues.project_info.projectname == "") {
            // we need to set the formErrors
            setFormErrors((existing) => {
                return { ...existing, projectname: "Enter Project name" }
            })
            res.status = false
            res.page = 1
        } else {
            setFormErrors((existing) => {
                return { ...existing, projectname: "" }
            })
        }
        if (formValues.project_info.project_type == null || formValues.project_info.project_type == "") {
            // we need to set the formErrors
            setFormErrors((existing) => {
                return { ...existing, project_type: "Select Project Type" }
            })
            res.status = false
        } else {
            setFormErrors((existing) => {
                return { ...existing, project_type: "" }
            })
        }
        if (formValues.project_info.addressline1 == null || formValues.project_info.addressline1 == "") {
            // we need to set the formErrors
            console.log('hey')
            setFormErrors((existing) => {
                return { ...existing, addressline1: "Enter Adress Line1" }
            })
            res.status = false
        } else {
            setFormErrors((existing) => {
                return { ...existing, addressline1: "" }
            })
        }

        if (formValues.project_info.suburb == null || formValues.project_info.suburb == "") {
            // we need to set the formErrors
            setFormErrors((existing) => {
                return { ...existing, suburb: "Enter Suburb" }
            })
            res.status = false
        } else {
            setFormErrors((existing) => {
                return { ...existing, suburb: "" }
            })
        }



        if (formValues.project_info.builderid == null || formValues.project_info.builderid == "") {
            // we need to set the formErrors
            setFormErrors((existing) => {
                return { ...existing, builderid: "Select Builder Name" }
            })

            res.status = false
            res.page = 1
        } else {
            setFormErrors((existing) => {
                return { ...existing, builderid: "" }
            })
        }
      
        return res
    }
    const handleAddProjectInfo = () => {
        console.log(formValues)
        let temp = validate()
        if (!temp.status) {
            console.log(formErrors)
            setSelectedDialogue(temp.page)
            return;
        }
        setIsStateDialogue(false)
        setCurrProject((prev) => formValues.project_info.projectname)
        setShowAddConfirmation(true)
    }
    const addProjectInfo = async () => {
        
        const data = {
            "user_id": 1234,
            "project_info": {
                "builderid": Number(formValues.project_info.builderid),
                "projectname": formValues.project_info.projectname,
                "addressline1": formValues.project_info.addressline1,
                "addressline2": formValues.project_info.addressline2,
                "suburb": formValues.project_info.suburb,
                "city": Number(formValues.project_info.city),
                "state": formValues.project_info.state,
                "country": Number(formValues.project_info.country),
                "zip": formValues.project_info.zip,
                "nearestlandmark": formValues.project_info.nearestlandmark,
                "project_type": Number(formValues.project_info.project_type),
                "mailgroup1": formValues.project_info.mailgroup1,
                "mailgroup2": formValues.project_info.mailgroup2,
                "website": formValues.project_info.website,
                "project_legal_status": Number(formValues.project_info.project_legal_status),
                "rules": formValues.project_info.rules,
                "completionyear": Number(formValues.project_info.completionyear),
                "jurisdiction": formValues.project_info.jurisdiction,
                "taluka": formValues.project_info.taluka,
                "corporationward": formValues.project_info.corporationward,
                "policechowkey": formValues.project_info.policechowkey,
                "maintenance_details": formValues.project_info.maintenance_details,
                "numberoffloors": Number(formValues.project_info.numberoffloors),
                "numberofbuildings": Number(formValues.project_info.numberofbuildings),
                "approxtotalunits": formValues.project_info.approxtotalunits,
                "tenantstudentsallowed": formValues.project_info.tenantstudentsallowed,
                "tenantworkingbachelorsallowed": formValues.project_info.tenantworkingbachelorsallowed,
                "tenantforeignersallowed": formValues.project_info.tenantforeignersallowed,
                "otherdetails": formValues.project_info.otherdetails,
                "duespayablemonth": formValues.project_info.duespayablemonth,
                "policestation": formValues.project_info.policestation
            },
            "project_amenities": {
                "swimmingpool": formValues.project_amenities.swimmingpool,
                "lift": formValues.project_amenities.lift,
                "liftbatterybackup": formValues.project_amenities.liftbatterybackup,
                "clubhouse": formValues.project_amenities.clubhouse,
                "gym": formValues.project_amenities.gym,
                "childrensplayarea": formValues.project_amenities.childrensplayarea,
                "pipedgas": formValues.project_amenities.pipedgas,
                "cctvcameras": formValues.project_amenities.cctvcameras,
                "otheramenities": formValues.project_amenities.otheramenities,
                "studio": formValues.project_amenities.studio,
                "1BHK": formValues.project_amenities['1BHK'],
                "2BHK": formValues.project_amenities['2BHK'],
                "3BHK": formValues.project_amenities['3BHK'],
                "4BHK": formValues.project_amenities['4BHK'],
                "RK": formValues.project_amenities['RK'],
                "penthouse": formValues.project_amenities.penthouse,
                "other": formValues.project_amenities.other,
                "duplex": formValues.project_amenities.duplex,
                "rowhouse": formValues.project_amenities.rowhouse,
                "otheraccomodationtypes": formValues.project_amenities.otheraccomodationtypes,
                "sourceofwater": formValues.project_amenities.sourceofwater
            },
            "project_bank_details": formValues.project_bank_details,
            "project_contacts": formValues.project_contacts,
            "project_photos": formValues.project_photos
        }
         
        const response = await APIService.addProject(data)
        const res = await response.json()
        if (res.result == 'success') {
            setShowAddConfirmation(false);
            setIsStateDialogue(false)
            setFormValues(initialValues);
            openAddSuccess();
            // we need to fetch the data and open the success modal
        }
    }
    // validate form and to throw Error message
    const [isStateDialogue, setIsStateDialogue] = React.useState(false);
    const handleOpen = () => {
        setIsStateDialogue(true);
    };
    const handleClose = () => {
        setSelectedDialogue(1);
        setIsStateDialogue(false);
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
            "rows": dataRows,
            "filters": stateArray,
            "sort_by": [sortField],
            "order": flag  ? "asc" : "desc",
            "pg_no": 0,
            "pg_size": 0,
            "search_key" : searchInput
        };
        const response = await APIService.getProjectInfo(data)
        const temp = await response.json();
        const result = temp.data;
        const worksheet = XLSX.utils.json_to_sheet(result);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "ProjectData.xlsx");
        FileSaver.saveAs(workbook, "demo.xlsx");
    }
    const handleSort = async (field) => {
        setPageLoading(true);
        setSortField((prev) => field)
        setFlag((prev) => !prev);
        const data = {
            "user_id": 1234,
            "rows": dataRows,
            "filters": stateArray,
            "sort_by": [sortField],
            "order": !flag ? "asc" : "desc",
            "pg_no": Number(currentPage),
            "pq_size": Number(currentPages),
            "search_key": searchInput
        }
        const response = await APIService.getProjectInfo(data)
        const res = await response.json();
        setExistingProjectInfo(res.data)
        setPageLoading(false)
    }
    const handleSearch = async () => {
        // console.log("clicked")
        setPageLoading(true);
        setIsSearchOn(true);
        setCurrentPage((prev) => 1)
        const data = {
            "user_id": 1234,
            "rows": dataRows,
            "filters": stateArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": searchInput
        };
        const response = await APIService.getProjectInfo(data);
        const temp = await response.json();
        const result = temp.data;
        const t = temp.total_count;
        setTotalItems(t);
        setExistingProjectInfo(result);
        setPageLoading(false);
    }
    const handleCloseSearch = async () => {
        setIsSearchOn(false)
        setPageLoading(true)
        setSearchInput("")
        setCurrentPage((prev) => 1)
        const data = {
            "user_id": 1234,
            "rows": dataRows,
            "filters": stateArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": ""
        };
        const response = await APIService.getProjectInfo(data);
        const temp = await response.json();
        const result = temp.data;
        const t = temp.total_count;
        setTotalItems(t);
        setExistingProjectInfo(result);
        setPageLoading(false);
    }
    const [isEditDialogue, setIsEditDialogue] = useState(false)
    const [showAddSuccess, setShowAddSuccess] = useState(false)
    const openAddSuccess = () => {
        // close the add modal
        setShowAddSuccess(true)
        setTimeout(function () {
            setShowAddSuccess(false);
        }, 2000)
        fetchData();
    }
    const initialValues = {
        "project_info": {
            "builderid": null,
            "projectname": null,
            "addressline1": null,
            "addressline2": null,
            "suburb": null,
            "city": 847,
            "state": 'Maharashtra',
            "country": 5,
            "zip": null,
            "nearestlandmark": null,
            "project_type": null,
            "mailgroup1": null,
            "mailgroup2": null,
            "website": null,
            "project_legal_status": null,
            "rules": null,
            "completionyear": null,
            "jurisdiction": null,
            "taluka": null,
            "corporationward": null,
            "policechowkey": null,
            "maintenance_details": null,
            "numberoffloors": null,
            "numberofbuildings": null,
            "approxtotalunits": null,
            "tenantstudentsallowed": null,
            "tenantworkingbachelorsallowed": null,
            "tenantforeignersallowed": null,
            "otherdetails": null,
            "duespayablemonth": null,
            "policestation": null,
        },
        "project_amenities": {
            "swimmingpool": null,
            "lift": null,
            "liftbatterybackup": null,
            "clubhouse": null,
            "gym": null,
            "childrensplayarea": null,
            "pipedgas": null,
            "cctvcameras": null,
            "otheramenities": null,
            "studio": null,
            "1BHK": null,
            "2BHK": null,
            "3BHK": null,
            "4BHK": null,
            "RK": null,
            "penthouse": null,
            "other": null,
            "duplex": null,
            "rowhouse": null,
            "otheraccomodationtypes": null,
            "sourceofwater": null
        },
        "project_bank_details": [

        ],
        "project_contacts": [

        ],
        "project_photos": [

        ]
    }
    const [formValues, setFormValues] = useState(initialValues);


    // utlity routes
    const [builderNameData, setBuilderNameData] = useState([])
    const [projectTypeData, setProjectTypeData] = useState([])
    const [projectLegalData, setProjectLegalData] = useState([])
    const getBuildersData = async () => {
        const data = {
            "user_id": 1234
        }
        const response = await APIService.getBuildersAdmin(data);
        const res = await response.json();
        console.log(res)
        setBuilderNameData(res.data)
    }
    const getProjectTypeData = async () => {
        const data = {
            "user_id": 1234
        }
        const response = await APIService.getProjectTypeAdmin(data)
        const res = await response.json();
        console.log(res.data)
        setProjectTypeData(res.data)
    }
    const getProjectLegalData = async () => {
        const data = {
            "user_id": 1234
        }
        const response = await APIService.getProjectLegalStatusAdmin(data)
        const res = await response.json();
        console.log(res.data)
        setProjectLegalData(res.data)
    }

    const [projectNameFilter, setProjectNameFilter] = useState(false);
    const [projectNameFilterInput, setProjectNameFilterInput] = useState("");
    const [builderNameFilter, setBuilderNameFilter] = useState(false);
    const [builderNameFilterInput, setBuilderNameFilterInput] = useState("");
    const [suburbFilter, setSuburbFilter] = useState(false);
    const [suburbFilterInput, setSuburbFilterInput] = useState("");
    const [otherDetailsFilter, setOtherDetailsFilter] = useState(false);
    const [otherDetailsFilterInput, setOtherDetailsFilterInput] = useState("");
    const [mailGroupFilter, setMailGroupFilter] = useState(false);
    const [mailGroupFilterInput, setMailGroupFilterInput] = useState("");
    const [subscribedEmailFilter, setSubscribedEmailFilter] = useState(false);
    const [subscribedEmailFilterInput, setSubscribedEmailFilterInput] = useState("");
    const [rulesFilter, setRulesFilter] = useState(false);
    const [rulesFilterInput, setRulesFilterInput] = useState("");
    const [idFilter, setIdFilter] = useState(false)
    const [idFilterInput, setIdFilterInput] = useState("");

    const filterMapping = {
        projectname: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        buildername: {
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
        otherdetails: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        mailgroup1: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        mailgroup2: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        rules: {
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

    const [stateArray, setStateArray] = useState([]);
    const fetchFiltered = async (mapState) => {
        setFilterMapState(mapState)
        const tempArray = [];
        // we need to query thru the object
        // console.log(filterMapState);
        console.log(filterMapState)
        Object.keys(mapState).forEach(key => {
            console.log(key)
            if (mapState[key].filterType != "") {
                console.log(key)
                tempArray.push([key, mapState[key].filterType, mapState[key].filterValue, mapState[key].filterData]);
            }
        })
        console.log(tempArray)

        setStateArray(tempArray)
        setCurrentPage((prev) => 1)
        setPageLoading(true);
        const data = {
            "user_id": 1234,
            "rows": dataRows,
            "filters": tempArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": searchInput
        };
        const response = await APIService.getProjectInfo(data);
        const temp = await response.json();
        const result = temp.data;
        const t = temp.total_count;
        setTotalItems(t);
        setExistingProjectInfo(result);
        console.log(result);
        setPageLoading(false);
    }


    // end utility routes here
    useEffect(() => {
        getBuildersData()
        getProjectTypeData()
        getProjectLegalData()
    }, [])
    const addProject = () => {

    }
    const [currProject, setCurrProject] = useState(0);
    const handleEdit = (id) => {
        console.log(id)
        setCurrProject((prev) => id)
        setIsEditDialogue(true)
    }
    const [showEditSuccess, setShowEditSuccess] = useState(false);
    const [showDeleteSuccess,setShowDeleteSuccess] = useState(false)
    const openEditSuccess = () => {
        setIsEditDialogue(false)
        setShowEditSuccess(true)
        setTimeout(function () {
            setShowEditSuccess(false);
        }, 2000)
        fetchData();
    }
    const openDeleteSuccess = () => {
        setShowDeleteModal(false)
        setShowDeleteSuccess(true)
        setTimeout(function () {
            setShowDeleteSuccess(false);
        }, 2000)
        fetchData();
    }
    const [showAddConfirmation,setShowAddConfirmation] = useState(false);
    return (
        <div className="h-screen">
            <Navbar />
            {isEditDialogue && <EditProjectInfo handleClose={() => setIsEditDialogue(false)} currProject={currProject} showSuccess={openEditSuccess} />}
            {showDeleteModal && <DeleteProjectInfo handleClose={() => setShowDeleteModal(false)} item={currProject} handleDelete={deleteProject} />}
            {showAddSuccess && <SucessfullModal isOpen={showAddSuccess} message="New Project Created Successfully" />}
            {showEditSuccess && <SucessfullModal isOpen={showEditSuccess} message="Changes Saved Successfully" />}
            {showDeleteSuccess && <SucessfullModal isOpen={showDeleteSuccess} message="Project Deleted Successfully" />}
            {showAddConfirmation && <SaveConfirmationProjectInfo currProject={currProject} handleClose={() => setShowAddConfirmation(false)} addProject={addProjectInfo}/>}
            
            <div className='h-[calc(100vh_-_7rem)] w-full px-10'>

                <div className='h-16 w-full  flex justify-between items-center p-2  border-gray-300 border-b-2'>
                    <div className='flex items-center space-x-3'>
                        <div className='rounded-2xl  bg-[#EBEBEB] h-8 w-8 flex justify-center items-center'>
                            <img className='w-5 h-5 ' src={backLink} />
                        </div>

                        <div className='flex-col'>
                            <h1 className='text-[18px]'>Manage Project</h1>
                            <p className='text-[14px]'>Manage &gt; Manage Project</p>
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
                            <button className="bg-[#004DD7] text-white h-[36px] w-[250px] rounded-lg" onClick={handleOpen}>
                                <div className="flex items-center justify-center gap-4">
                                    Add New Project
                                    <img className='h-[18px] w-[18px]' src={Add} alt="add" />
                                </div>
                            </button>
                        </div>
                    </div>

                </div>

                <div className='h-12 w-full bg-white'>
                    <div className='w-full h-12 bg-white flex justify-between'>
                        <div className="w-[85%] flex">
                            <div className='w-[4%] flex'>

                            </div>
                            <div className='w-[12%] px-3 py-2.5'>
                                <div className="w-[80%] flex items-center bg-[#EBEBEB] rounded-[5px] ">
                                    <input className="w-[70%] bg-[#EBEBEB] rounded-[5px] text-xs pl-2 outline-none" value={projectNameFilterInput} onChange={(e) => setProjectNameFilterInput(e.target.value)} />
                                    <button className='w-[30%] px-1 py-2' onClick={() => { setProjectNameFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                                </div>
                                {projectNameFilter && <CharacterFilter inputVariable={projectNameFilterInput} setInputVariable={setProjectNameFilterInput} handleFilter={newHandleFilter} filterColumn="projectname" menuRef={menuRef} />}
                            </div>
                            <div className='w-[12%] px-3 py-2.5'>
                                <div className="w-[80%] flex items-center bg-[#EBEBEB] rounded-[5px] ">
                                    <input className="w-[70%] bg-[#EBEBEB] rounded-[5px] text-xs pl-2 outline-none" value={builderNameFilterInput} onChange={(e) => setBuilderNameFilterInput(e.target.value)} />
                                    <button className='w-[30%] px-1 py-2' onClick={() => { setBuilderNameFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                                </div>
                                {builderNameFilter && <CharacterFilter inputVariable={builderNameFilterInput} setInputVariable={setBuilderNameFilterInput} handleFilter={newHandleFilter} filterColumn="buildername" menuRef={menuRef} />}
                            </div>
                            <div className='w-[12%] px-3 py-2.5'>
                                <div className="w-[80%] flex items-center bg-[#EBEBEB] rounded-[5px] ">
                                    <input className="w-[70%] bg-[#EBEBEB] rounded-[5px] text-xs pl-2 outline-none" value={suburbFilterInput} onChange={(e) => setSuburbFilterInput(e.target.value)} />
                                    <button className='w-[30%] px-1 py-2'  onClick={() => { setSuburbFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                                </div>
                                {suburbFilter && <CharacterFilter inputVariable={suburbFilterInput} setInputVariable={setSuburbFilterInput} handleFilter={newHandleFilter} filterColumn="suburb" menuRef={menuRef} />}
                            </div>
                            <div className='w-[14%] px-3 py-2.5'>
                                <div className="w-[80%] flex items-center bg-[#EBEBEB] rounded-[5px] ">
                                    <input className="w-[75%] bg-[#EBEBEB] rounded-[5px] text-xs pl-2 outline-none" value={otherDetailsFilterInput} onChange={(e) => setOtherDetailsFilterInput(e.target.value)} />
                                    <button className='w-[25%] px-1 py-2' onClick={() => { setOtherDetailsFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                                </div>
                                {otherDetailsFilter && <CharacterFilter inputVariable={otherDetailsFilterInput} setInputVariable={setOtherDetailsFilterInput} handleFilter={newHandleFilter} filterColumn="otherdetails" menuRef={menuRef} />}
                            </div>
                            <div className='w-[12%] px-3 py-2.5'>
                                <div className="w-[80%] flex items-center bg-[#EBEBEB] rounded-[5px] ">
                                    <input className="w-[70%] bg-[#EBEBEB] rounded-[5px] text-xs pl-2 outline-none" value={mailGroupFilterInput} onChange={(e) => setMailGroupFilterInput(e.target.value)} />
                                    <button className='w-[30%] px-1 py-2' onClick={() => { setMailGroupFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                                </div>
                                {mailGroupFilter && <CharacterFilter inputVariable={mailGroupFilterInput} setInputVariable={setMailGroupFilterInput} handleFilter={newHandleFilter} filterColumn="mailgroup1" menuRef={menuRef} />}
                            </div>
                            <div className='w-[12%] px-3 py-2.5'>
                                <div className="w-[80%] flex items-center bg-[#EBEBEB] rounded-[5px] ">
                                    <input className="w-[70%] bg-[#EBEBEB] rounded-[5px] text-xs pl-2 outline-none" value={subscribedEmailFilterInput} onChange={(e) => setSubscribedEmailFilterInput(e.target.value)} />
                                    <button className='w-[30%] px-1 py-2' onClick={() => { setSubscribedEmailFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                                </div>
                                {subscribedEmailFilter && <CharacterFilter inputVariable={subscribedEmailFilterInput} setInputVariable={setSubscribedEmailFilterInput} handleFilter={newHandleFilter} filterColumn="mailgroup2" menuRef={menuRef} />}
                            </div>
                            <div className='w-[10%] px-3 py-2.5'>
                                <div className="w-[90%] flex items-center bg-[#EBEBEB] rounded-[5px] ">
                                    <input className="w-[70%] bg-[#EBEBEB] rounded-[5px] text-xs pl-2 outline-none" value={rulesFilterInput} onChange={(e) => setRulesFilterInput(e.target.value)} />
                                    <button className='w-[30%] px-1 py-2'onClick={() => { setRulesFilter((prev) => !prev) }} ><img src={Filter} className='h-3 w-3' /></button>
                                </div>
                                {rulesFilter && <CharacterFilter inputVariable={rulesFilterInput} setInputVariable={setRulesFilterInput} handleFilter={newHandleFilter} filterColumn="rules" menuRef={menuRef} />}
                            </div>
                            <div className='w-[12%] px-3 py-2.5'>
                                <div className="w-[80%] flex items-center bg-[#EBEBEB] rounded-[5px] ">
                                    <input className="w-[70%] bg-[#EBEBEB] rounded-[5px] text-xs pl-2 outline-none" />
                                    <button className='w-[30%] px-1 py-2' ><img src={Filter} className='h-3 w-3' /></button>
                                </div>
                            </div>
                        </div>
                        <div className="w-[15%] px-3 py-2.5">
                            <div className='w-1/2  '>
                                <div className="w-[77%] flex items-center bg-[#EBEBEB] rounded-[5px] ">
                                    <input className="w-[70%] bg-[#EBEBEB] rounded-[5px] text-xs pl-2 outline-none"  value={idFilterInput} onChange={(e) => setIdFilterInput(Number(e.target.value))} />
                                    <button className='w-[30%] px-1 py-2' onClick={() => { setIdFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
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

                <div className='h-[calc(100vh_-_14rem)] w-full text-[12px]'>

                    <div className='w-full h-12 bg-[#F0F6FF] flex justify-between'>
                        <div className="w-[85%] flex">
                            <div className='w-[4%] flex'>
                                <div className='p-3'>
                                    <p>Sr.</p>
                                </div>
                            </div>
                            <div className='w-[12%]  flex'>
                                <div className='p-3'>
                                    <p>Project Name <button onClick={() => handleSort('projectname')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[12%]  flex'>
                                <div className='p-3'>
                                    <p>Builder Name <button onClick={() => handleSort('buildername')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[12%]  flex'>
                                <div className='p-3'>
                                    <p>Suburb <button onClick={() => handleSort('suburb')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[14%]  flex'>
                                <div className='p-3'>
                                    <p>Other details/issues </p>
                                </div>
                            </div>
                            <div className='w-[12%]  flex'>
                                <div className='p-3'>
                                    <p>Mail Group </p>
                                </div>
                            </div>
                            <div className='w-[12%]  flex'>
                                <div className='p-3'>
                                    <p>Subscribed email </p>
                                </div>
                            </div>
                            <div className='w-[10%]  flex'>
                                <div className='p-3'>
                                    <p>Rules <button onClick={() => handleSort('rules')}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-[12%]  flex'>
                                <div className='p-3'>
                                    <p>Tenant </p>
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
                        {!pageLoading && existingProjectInfo.map((item, index) => {
                            return <div className='w-full bg-white flex justify-between border-gray-400 border-b-[1px]' key={item.id}>
                                <div className="w-[85%] flex min-h-0">
                                    <div className='w-[4%] flex  overflow-hidden'>
                                        <div className='p-3'>
                                            <p>{index + 1 + (currentPage - 1) * currentPages}</p>
                                        </div>
                                    </div>
                                    <div className='w-[12%]  flex overflow-hidden'>
                                        <div className='p-3'>
                                            <p>{item.projectname}</p>
                                        </div>
                                    </div>
                                    <div className='w-[12%]  flex overflow-hidden'>
                                        <div className='p-3'>
                                            <p>{item.buildername}</p>
                                        </div>
                                    </div>
                                    <div className='w-[12%]  flex overflow-hidden'>
                                        <div className='p-3'>
                                            <p>{item.suburb}</p>
                                        </div>
                                    </div>
                                    <div className='w-[14%]  flex overflow-hidden'>
                                        <div className='p-3'>
                                            <p>{item.otherdetails}</p>
                                        </div>
                                    </div>
                                    <div className='w-[12%]  flex overflow-hidden'>
                                        <div className='p-3'>
                                            <p>{item.mailgroup1}</p>
                                        </div>
                                    </div>
                                    <div className='w-[12%]  flex overflow-hidden'>
                                        <div className='p-3'>
                                            <p>{item.mailgroup2}</p>
                                        </div>
                                    </div>
                                    <div className='w-[10%]  flex overflow-hidden'>
                                        <div className='p-3 '>
                                            <p>{item.rules}</p>
                                        </div>
                                    </div>
                                    <div className='w-[12%]  flex overflow-hidden'>
                                        <div className='p-3'>
                                            <p>{item.tenantworkingbachelorsallowed || item.tenantforeignersallowed || item.tenantstudentsallowed}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[15%] flex">
                                    <div className='w-1/2  flex overflow-hidden'>
                                        <div className='p-3 ml-1'>
                                            <p>{item.id}</p>
                                        </div>
                                    </div>
                                    <div className='w-1/2  flex overflow-hidden items-center p-3 justify-around '>
                                        <button onClick={() => handleEdit(item.id)}><img className=' w-5 h-5' src={Edit} alt="edit" /></button>
                                        <button onClick={() => handleDelete(item.id)}><img className=' w-5 h-5' src={Trash} alt="trash" /></button>
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

            <Modal open={isStateDialogue}
                fullWidth={true}
                maxWidth={'md'}
                className='flex justify-center items-center'
            >
                <>
                    <div className='flex justify-center'>
                        <Draggable>
                        <div className="w-[1050px] h-auto bg-white rounded-lg">
                            <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-lg">
                                <div className="mr-[410px] ml-[410px]">
                                    <div className="text-[16px]">New project</div>
                                </div>
                                <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white mr-2">
                                    <button onClick={handleClose}><img className="w-[20px] h-[20px] " src={Cross} alt="cross" /></button>
                                </div>
                            </div>
                            <div className="mt-1 flex bg-[#DAE7FF] justify-evenly items-center h-9">
                                <div className={`${selectedDialogue == 1 ? "bg-blue-200" : "bg-[#EBEBEB]"}  px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-40`} >
                                    <button onClick={selectFirst}><div>Project Information</div></button>
                                </div>
                                <div className={`${selectedDialogue == 2 ? "bg-blue-200" : "bg-[#EBEBEB]"}  px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-40`}>
                                    <button onClick={selectSecond}><div>Project details</div></button>
                                </div>
                                <div className={`${selectedDialogue == 3 ? "bg-blue-200" : "bg-[#EBEBEB]"}  px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-40`}>
                                    <button onClick={selectThird}><div>Bank details</div></button>
                                </div>
                                <div className={`${selectedDialogue == 4 ? "bg-blue-200" : "bg-[#EBEBEB]"}  px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-40`}>
                                    <button onClick={selectFourth}><div>Contacts</div></button>
                                </div>
                                <div className={`${selectedDialogue == 5 ? "bg-blue-200" : "bg-[#EBEBEB]"}  px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-40`}>
                                    <button onClick={selectFifth}><div>Photos</div></button>
                                </div>
                            </div>
                            {selectedDialogue == 1 && <ProjectInformation formValues={formValues} setFormValues={setFormValues} builderNameData={builderNameData} projectTypeData={projectTypeData} formErrors={formErrors} />}
                            {selectedDialogue == 2 && <ProjectDetails formValues={formValues} setFormValues={setFormValues} projectLegalData={projectLegalData} formErrors={formErrors} />}
                            {selectedDialogue == 3 && <BankDetails formValues={formValues} setFormValues={setFormValues} />}
                            {selectedDialogue == 4 && <Contact formValues={formValues} setFormValues={setFormValues} />}
                            {selectedDialogue == 5 && <Photos formValues={formValues} setFormValues={setFormValues} />}
                            <div className="my-2 flex justify-center items-center gap-[10px]">
                                <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' onClick={handleAddProjectInfo} >Add</button>
                                <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleClose}>Cancel</button>
                            </div>
                        </div>
                        </Draggable>
                    </div>
                </>
            </Modal>
        </div>
    )
}

export default ManageProjectInfo
