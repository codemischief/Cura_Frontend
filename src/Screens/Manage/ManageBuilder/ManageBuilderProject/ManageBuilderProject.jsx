import { CircularProgress, Modal ,Pagination, LinearProgress} from "@mui/material";
import React, { useEffect, useState , useRef} from 'react';
import { Link , useLocation} from "react-router-dom";
import { useParams } from "react-router-dom";
import Navbar from "../../../../Components/Navabar/Navbar";
import FailureModal from '../../../../Components/modals/FailureModal';
import SucessfullModal from '../../../../Components/modals/SucessfullModal';
import backLink from "../../../../assets/back.png";
import Cross from "../../../../assets/cross.png";
import downloadIcon from "../../../../assets/download.png";
import Edit from "../../../../assets/edit.png";
import nextIcon from "../../../../assets/next.png";
import refreshIcon from "../../../../assets/refresh.png";
import searchIcon from "../../../../assets/searchIcon.png";
import Trash from "../../../../assets/trash.png";
import { APIService } from '../../../../services/API';
import Delete from '../Delete';
import EditManageBuilder from '../EditManageBuilder';
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
import Filter from "../../../../assets/filter.png"
import BuilderProjectInformation from "./BuilderProjectInformation";
import ProjectDetails from "../../ManageProjectInfo/ManageProjectInfoForm/ProjectDetails";
import BankDetails from "../../ManageProjectInfo/ManageProjectInfoForm/BankDetails";
import Contact from "../../ManageProjectInfo/ManageProjectInfoForm/Contact";
import Photos from "../../ManageProjectInfo/ManageProjectInfoForm/Photos";
import DeleteProjectBuilder from "./DeleteBuilderProject";
import Draggable from "react-draggable";
import useAuth from "../../../../context/JwtContext";
const ManageBuilderProject = () => {
    // we have the module here
    const menuRef = useRef()
    const { user} = useAuth()
    const params = useParams()
    let { state } = useLocation();
    console.log(state)
    console.log(params.builderid)
    // console.log(params)
    const [existingProjects, setExistingProjects] = useState([]);
    const [pageLoading, setPageLoading] = useState(false);
    const [showSuccess, setShowSucess] = useState(false);
    const [showFailure, setShowFailure] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [currentBuilder, setCurrentBuilder] = useState({});
    const [currentBuilderId,setCurrentBuilderId] = useState();
    const [deleted, setDeleted] = useState(false);
    const [allCountry, setAllCountry] = useState([]);
    const [selectedCountry, setselectedCountry] = useState("");
    const [allState, setAllState] = useState([]);
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity,setSelectedCity] = useState("");
    const [allCity, setAllCity] = useState([]);
    const [countryId,setcountryId]=useState("");
    const [userId,setUserId]=useState(0);
    const [totalItems,setTotalItems] = useState(0)
    const [currentPage,setCurrentPage] = useState(1)
    const [currentPages,setCurrentPages] = useState(15)
    const [currBuilderId,setCurrBuilderId] = useState(state.builderid)
    const fetchUserId = async() =>{
        const response = await authService.getUserId()
        
        setUserId(response)

    }
    const openSuccessModal = () => {
        // set the state for true for some time
        setIsManageBuilderDialogue(false);
        setShowSucess(true);
        setTimeout(function () {
            setShowSucess(false)
        }, 2000)
        fetchBuilderData()
    }
    const openFailureModal = () => {
        setIsManageBuilderDialogue(false);
        setShowFailure(true);
        setTimeout(function () {
            setShowFailure(false)
        }, 4000);
    }

    const fetchBuilderData = async () => {
        setPageLoading(true);
        const data = {
            "user_id": user.id,
            "rows": [
              "buildername",
              "builderid",
              "projectname",
              "addressline1",
              "addressline2",
              "suburb",
              "city",
              "state",
              "country",
              "zip",
              "nearestlandmark",
              "project_type",
              "mailgroup1",
              "mailgroup2",
              "website",
              "project_legal_status",
              "rules",
              "completionyear",
              "jurisdiction",
              "taluka",
              "corporationward",
              "policechowkey",
              "policestation",
              "maintenance_details",
              "numberoffloors",
              "numberofbuildings",
              "approxtotalunits",
              "tenantstudentsallowed",
              "tenantworkingbachelorsallowed",
              "tenantforeignersallowed",
              "otherdetails",
              "duespayablemonth",
              "dated",
              "createdby",
              "isdeleted",
              "id"
            ],
            "builderid": currBuilderId,
            "filters": [],
            "sort_by": [],
            "order": "asc",
            "pg_no": 0,
            "pg_size": 0
          };
        const response = await APIService.getProjectsByBuilderId(data)
        const res = await response.json()
        console.log(res)
        const result = res.data;
        setPageLoading(false);
        // console.log(result);
        setExistingProjects(result);
    }
    const fetchCountryData = async () => {
        setPageLoading(true);
        const data = { "user_id": user.id };
        const response = await APIService.getCountries(data)
        const result = (await response.json()).data;
        console.log(result);
        if(Array.isArray(result)) {
            setAllCountry(result);
        }
    }

    const fetchStateData = async (e) => {
       
        const data = { "user_id": userId || user.id, "country_id": 5 };
        const response = await APIService.getState(data);
        const result = (await response.json()).data;
        // console.log(result)
        if(Array.isArray(result)){
            setAllState(result)
        }
    }

    const fetchCityData = async (d) => {
        const data = { "user_id": userId || user.id, "country_id": 5, "state_name": "Maharashtra" };
        const response = await APIService.getCities(data);
        const result = (await response.json()).data;
        if(Array.isArray(result)){
            setAllCity(result)
        }
    }
   
    const deleteBuilder = async (item) => {
        setShowDelete(true);
        setCurrentBuilderId(item);
        setDeleted(true);
    }

    const addNewBuilder = async () => {
        const data = {
            "user_id": userId || user.id,
            "buildername": formValues.builderName,
            "phone1": formValues.phone1,
            "phone2": formValues.phone2,
            "email1": formValues.email1,
            "addressline1": formValues.address1,
            "addressline2": formValues.address2,
            "suburb": "deccan",
            "city": 360,
            "state": "maharastra",
            "country": 5,
            "zip": formValues.zip,
            "website": formValues.website,
            "comments": formValues.comment,
            "dated": "10-03-2024 08:29:00", 
            "createdby": user.id,
            "isdeleted": false
        };
        const response = await APIService.addNewBuilder(data);
       
        if (response.ok) {
            setIsLoading(false);
            openSuccessModal();
        } else {
            setIsLoading(false);
            openFailureModal();
        }
        fetchBuilderData();
    }

    useEffect(() => {
        // fetchUserId();
        fetchBuilderData();
        getProjectLegalData()
        getProjectTypeData()
        fetchCountryData();
        fetchCityData();
        fetchStateData();
        const handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setCountryFilter(false)
                setBuilderFilter(false)
                setCityFilter(false)
                setSuburbFilter(false)
                setIdFilter(false)
            }
        }
      
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);
    //Validation of the form
    const initialValues = {
        "project_info": {
            "builderid": state.builderid,
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
    const [formErrors, setFormErrors] = useState({});

    // handle changes in input form
    
    // validate form and to throw Error message
    

    const [isManageBuidlerDialogue, setIsManageBuilderDialogue] = React.useState(false);
    const handleOpen = () => {
        setIsManageBuilderDialogue(true);
    };
    const handleClose = () => {
        setIsManageBuilderDialogue(false);
    }
    const [isEditDialogue, setIsEditDialogue] = React.useState(false);
    const editBuilder = (item) => {
        setCurrentBuilder(item);
        setIsEditDialogue(true);
    }
    const [isDeleteDialogue, setIsDeleteDialogue] = React.useState(false);
    const handleOpenDelete = () => {
        setIsDeleteDialogue(true);
    };
    const handleCloseDelete = () => {
        setIsDeleteDialogue(false);
    }
    const handleRefresh = async  () => {
       await fetchBuilderData();
    }
    const handleDownload =  () => {
        const worksheet = XLSX.utils.json_to_sheet(existingBuilders);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook,worksheet,"Sheet1");
        XLSX.writeFile(workbook,"BuilderData.xlsx");
        FileSaver.saveAs(workbook,"demo.xlsx");
    }
    const handlePageChange = () => {

    }
    const [downloadModal,setDownloadModal] = useState(false)
    const [builderFilter,setBuilderFilter] = useState(false)
    const [builderFilterInput,setBuilderFilterInput] = useState("")
    const [countryFilter,setCountryFilter] = useState(false)
    const [countryFilterInput,setCountryFilterInput] = useState("")
    const [cityFilter,setCityFilter] = useState(false)
    const [cityFilterInput,setCityFilterInput] = useState("")
    const [suburbFilter,setSuburbFilter] = useState(false)
    const [suburbFilterInput,setSuburbFilterInput] = useState("")
    const [idFilter,setIdFilter] = useState(false)
    const [idFilterInput,setIdFilterInput] = useState("")
    const [selectedDialogue,setSelectedDialogue] = useState(1);
    const [builderNameData,setBuilderNameData] = useState([])
    const [projectTypeData,setProjectTypeData] = useState([])
    const [projectLegalData,setProjectLegalData] = useState([])
    const validate = () => {
        // var res = true
        let res = {
            status: true,
            page: 1
        }
        // if(formValues.project_info.)
        if (formValues.project_info.projectname == null || formValues.project_info.projectname == "") {
            // we need to set the formErrors
            setFormErrors((existing) => {
                return { ...existing, projectname: "Enter Project name" }
            })
            res.status = false
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
        } else {
            setFormErrors((existing) => {
                return { ...existing, builderid: "" }
            })
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
        return res
    }
    const addProjectInfo = async () => {
        console.log(formValues)
        let temp = validate()
        if (!temp.status) {
            console.log(formErrors)
            setSelectedDialogue(temp.page)
            return;
        }
        const data = {
            "user_id": user.id,
            "project_info": {
                "builderid": formValues.project_info.builderid,
                "projectname": formValues.project_info.projectname,
                "addressline1": formValues.project_info.addressline1,
                "addressline2": formValues.project_info.addressline2,
                "suburb": formValues.project_info.suburb,
                "city": formValues.project_info.city,
                "state": formValues.project_info.state,
                "country": formValues.project_info.country,
                "zip": formValues.project_info.zip,
                "nearestlandmark": formValues.project_info.nearestlandmark,
                "project_type": formValues.project_info.project_type,
                "mailgroup1": formValues.project_info.mailgroup1,
                "mailgroup2": formValues.project_info.mailgroup2,
                "website": formValues.project_info.website,
                "project_legal_status": formValues.project_info.project_legal_status,
                "rules": formValues.project_info.rules,
                "completionyear": formValues.project_info.completionyear,
                "jurisdiction": formValues.project_info.jurisdiction,
                "taluka": formValues.project_info.taluka,
                "corporationward": formValues.project_info.corporationward,
                "policechowkey": formValues.project_info.policechowkey,
                "maintenance_details": formValues.project_info.maintenance_details,
                "numberoffloors": formValues.project_info.numberoffloors,
                "numberofbuildings": formValues.project_info.numberofbuildings,
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
            setFormValues(initialValues)
            setIsManageBuilderDialogue(false)
            openSuccessModal()
            
        }
    }
    const [currProject,setCurrProject] = useState(0);
    const handleDelete = (id) => {
         setCurrProject((prev) => id)
         setShowDelete(true);
         

    }

    const deleteProject = async (id) => {
        // here we write the logic for deleting
        const data = {
            "user_id": user.id,
            "id":id}
            const response = await APIService.deleteProject(data)
            const res = await response.json()
            // showDelete(false)
            setShowDelete(false)
            if(res.result == 'success') {
                // we need the success modal
                openSuccessModal()
            }
    }



    const getProjectTypeData = async () => {
        const data = {
            "user_id": user.id
        }
        const response = await APIService.getProjectTypeAdmin(data)
        const res = await response.json();
        console.log(res.data)
        setProjectTypeData(res.data)
    }
    const getProjectLegalData = async () => {
        const data = {
            "user_id": user.id
        }
        const response = await APIService.getProjectLegalStatusAdmin(data)
        const res = await response.json();
        console.log(res.data)
        setProjectLegalData(res.data)
    }
    
     return (
        <div >
            <Navbar />
           {showSuccess &&  <SucessfullModal isOpen={showSuccess} message="Builder Project Added Successfully " />}
            {showFailure && <FailureModal isOpen={showFailure} message="Error! cannot create the builder" />}
            {/* {showDelete && <Delete isOpen={showDelete} currentBuilder={currentBuilderId} closeDialog={setShowDelete} fetchData={fetchBuilderData} />} */}
            {showDelete && <DeleteProjectBuilder handleDelete={deleteProject} handleClose={() => setShowDelete(false)} item={currProject} />}
            <div className='flex-col w-full h-full  bg-white'>
                <div className='flex-col'>
                    {/* this div will have all the content */}
                    <div className='w-full  flex-col px-6'>
                        {/* the top section of the div */}
                        <div className='h-1/2 w-full  flex justify-between items-center p-2  border-gray-300 border-b-2'>
                            <div className='flex items-center space-x-3'>
                                <div className='rounded-2xl  bg-[#EBEBEB] h-8 w-8 flex justify-center items-center'>
                                    <Link to="/admin/managebuilder"><img className='w-5 h-5' src={backLink} /></Link>
                                </div>
                                <div className='flex-col'>
                                    <h1>Manage Builder Project</h1>
                                    <p>Manage &gt; Manage Builder</p>
                                </div>
                            </div>
                            <div className='flex space-x-2 items-center'>
                                <div className='flex'>
                                    {/* search button */}
                                    <input
                                        className="h-[36px] bg-[#EBEBEB] text-[#787878]"
                                        type="text"
                                        placeholder="  Search"
                                    />
                                    <div className="h-[36px] w-[40px] bg-[#004DD7] flex items-center justify-center rounded-r-lg">
                                        <img className="h-[26px] " src={searchIcon} alt="search-icon" />
                                    </div>
                                </div>

                                <div>
                                    {/* button */}
                                    <button className="bg-[#004DD7] text-white h-[36px] w-[200px] rounded-lg" onClick={handleOpen}>
                                        Add New Project +
                                    </button>
                                </div>

                            </div>
                            
                        </div>
                        <div className="h-10 w-full flex items-center">
                              <h1>Builder Name : {params.buildername}</h1>
                        </div>
                        <div className='h-12 w-full bg-white'>
                            <div className='w-full h-12 bg-white flex justify-between'>
                                <div className="w-[85%] flex">
                                    <div className='w-[4%] flex'>

                                    </div>
                                    <div className='w-[12%]  flex p-3'>
                                        <div className="w-[73%] flex items-center bg-[#EBEBEB] rounded-[5px] ">
                                            <input className="w-12 bg-[#EBEBEB] rounded-[5px]" />
                                            <button className='p-1'><img src={Filter} className='h-[15px] w-[15px]' /></button>
                                        </div>
                                    </div>
                                    <div className='w-[12%]  flex p-3'>
                                    <div className="w-[73%] flex items-center bg-[#EBEBEB] rounded-[5px] ">
                                            <input className="w-12 bg-[#EBEBEB] rounded-[5px]" />
                                            <button className='p-1'><img src={Filter} className='h-[15px] w-[15px]' /></button>
                                        </div>
                                    </div>
                                    <div className='w-[12%]  flex p-3'>
                                    <div className="w-[73%] flex items-center bg-[#EBEBEB] rounded-[5px] ">
                                            <input className="w-12 bg-[#EBEBEB] rounded-[5px]" />
                                            <button className='p-1'><img src={Filter} className='h-[15px] w-[15px]' /></button>
                                        </div>
                                    </div>
                                    <div className='w-[14%]  flex p-3'>
                                    <div className="w-[60%] flex items-center bg-[#EBEBEB] rounded-[5px] ">
                                            <input className="w-12 bg-[#EBEBEB] rounded-[5px]" />
                                            <button className='p-1'><img src={Filter} className='h-[15px] w-[15px]' /></button>
                                        </div>
                                    </div>
                                    <div className='w-[12%]  flex p-3'>
                                    <div className="w-[73%] flex items-center bg-[#EBEBEB] rounded-[5px] ">
                                            <input className="w-12 bg-[#EBEBEB] rounded-[5px]" />
                                            <button className='p-1'><img src={Filter} className='h-[15px] w-[15px]' /></button>
                                        </div>
                                    </div>
                                    <div className='w-[12%]  flex p-3'>
                                    <div className="w-[73%] flex items-center bg-[#EBEBEB] rounded-[5px] ">
                                            <input className="w-12 bg-[#EBEBEB] rounded-[5px]" />
                                            <button className='p-1'><img src={Filter} className='h-[15px] w-[15px]' /></button>
                                        </div>
                                    </div>
                                    <div className='w-[10%]  flex p-3'>
                                    <div className="w-[87%] flex items-center bg-[#EBEBEB] rounded-[5px] ">
                                            <input className="w-12 bg-[#EBEBEB] rounded-[5px]" />
                                            <button className='p-1'><img src={Filter} className='h-[15px] w-[15px]' /></button>
                                        </div>
                                    </div>
                                    <div className='w-[12%]  flex p-3'>
                                    <div className="w-[71%] flex items-center bg-[#EBEBEB] rounded-[5px] ">
                                            <input className="w-12 bg-[#EBEBEB] rounded-[5px]" />
                                            <button className='p-1'><img src={Filter} className='h-[15px] w-[15px]' /></button>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[15%] flex p-3">
                                    <div className='w-1/2  flex'>
                                    <div className="w-[77%] flex items-center bg-[#EBEBEB] rounded-[5px] ">
                                            <input className="w-10 bg-[#EBEBEB] rounded-[5px]" />
                                            <button className='p-1'><img src={Filter} className='h-[15px] w-[15px]' /></button>
                                        </div>
                                    </div>
                                    <div className='w-1/2  flex'>
                                        <div className='p-3'>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>

                    <div className='w-full h-[400px] bg-white px-6  text-[12px]'>
                        <div className='w-full h-12 bg-[#F0F6FF] flex justify-between'>
                            <div className="w-[85%] flex">
                                <div className='w-[4%] flex'>
                                    <div className='p-3' draggable>
                                        <p>Sr.</p>
                                    </div>
                                </div>
                                <div className='w-[12%]  flex'>
                                    <div className='p-3 ' draggable>
                                        <p>Project Name <span className="font-extrabold">↑↓</span></p>
                                    </div>
                                </div>
                                <div className='w-[12%]  flex'>
                                    <div className='p-3 ' draggable>
                                        <p>Builder Name <span className="font-extrabold">↑↓</span></p>
                                    </div>
                                </div>
                                <div className='w-[12%]  flex'>
                                    <div className='p-3' draggable>
                                        <p>Suburb <span className="font-extrabold">↑↓</span></p>
                                    </div>
                                </div>
                                <div className='w-[14%]  flex'>
                                    <div className='p-3' draggable>
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
                                        <p>Rules <span className="font-extrabold">↑↓</span></p>
                                    </div>
                                </div>
                                <div className='w-[12%]  flex'>
                                    <div className='p-3'>
                                        <p>Tenet <span className="font-extrabold">↑↓</span></p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[15%] flex">
                                <div className='w-1/2  flex'>
                                    <div className='p-3'>
                                        <p>ID</p>
                                    </div>
                                </div>
                                <div className='w-1/2  flex'>
                                    <div className='p-3'>
                                        <p>Edit</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='w-full h-[400px] overflow-auto'>
                            {/* we map our items here */}
                            {pageLoading && <div className='ml-5 mt-5'><LinearProgress /></div>}
                            {!pageLoading && existingProjects.map((item, index) => {
                                return <div className='w-full bg-white flex justify-between border-gray-400 border-b-[1px]' key={item.id}>
                                    <div className="w-[85%] flex min-h-0">
                                        <div className='w-[4%] flex  overflow-hidden'>
                                            <div className='p-3'>
                                                <p>{index + 1}</p>
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
                                                <p></p>
                                            </div>
                                        </div>
                                        <div className='w-[10%]  flex overflow-hidden'>
                                            <div className='p-3'>
                                                <p>{item.rules}</p>
                                            </div>
                                        </div>
                                        <div className='w-[12%]  flex overflow-hidden'>
                                            <div className='p-3'>
                                                <p></p>
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
                                            <img className=' w-5 h-5' src={Edit} alt="edit" />
                                            <button onClick={() => handleDelete(item.id)}><img className=' w-5 h-5' src={Trash} alt="trash" /></button>
                                        </div>
                                    </div>

                                </div>
                            })}
                        </div>
                    </div>

                    <div className='w-full h-[250] flex justify-between justify-self-end px-6 fixed bottom-2 '>
                        {/* footer component */}
                        <div className='ml-2'>
                            <div className='flex items-center w-auto h-full'>
                                {/* items */}
                                {/* <Pagination count={Math.ceil(totalItems/currentPages)} onChange={handlePageChange} page={currentPage}/> */}
                                
                            </div>
                        </div>
                        <div className='flex mr-10 justify-center items-center space-x-2 '>
                            <div className="flex mr-8 space-x-2 text-sm items-center">
                               
                            </div>
                            <div className="flex text-sm">
                                {/* <p className="mr-11 text-gray-700">{totalItems} Items in {Math.ceil(totalItems/currentPages)} Pages</p> */}
                            </div>
                            {downloadModal && <div className='h-[130px] w-[200px] bg-red-800 absolute bottom-12 right-24 flex-col items-center  justify-center space-y-6 p-5'>
                               
                               <div className='flex'>
                                 <p>Download as pdf</p>
                                 {/* <img src=''/> */}
                               </div>
                               <div>
                                  <p>Download as Excel</p>
                               </div>
                            </div>}
                            
                            <div className='border-solid border-black border-[0.5px] rounded-md w-28 h-10 flex items-center justify-center space-x-1 p-2' >
                                {/* refresh */}
                                <button onClick={handleRefresh}><p>Refresh</p></button>
                                <img src={refreshIcon} className="h-2/3" />
                            </div>
                            <div className='border-solid border-black border-[1px] w-28 rounded-md h-10 flex items-center justify-center space-x-1 p-2'>
                                {/* download */}
                                <button onClick={handleDownload}><p>Download</p></button>
                                <img src={downloadIcon} className="h-2/3" />
                            </div>
                        </div> 
                    </div>
                </div>

            </div>

            {/* modal goes here */}
            <Modal open={isManageBuidlerDialogue}
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
                                    <button onClick={() => setIsManageBuilderDialogue(false)}><img className="w-[20px] h-[20px] " src={Cross} alt="cross" /></button>
                                </div>
                            </div>
                            <div className="mt-1 flex bg-[#DAE7FF] justify-evenly items-center h-9">
                                <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-40" >
                                    <button onClick={() => setSelectedDialogue(1)}><div>Project Information</div></button>
                                </div>
                                <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-40">
                                    <button onClick={() => setSelectedDialogue(2)}><div>Project details</div></button>
                                </div>
                                <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-40">
                                    <button onClick={() => setSelectedDialogue(3)}><div>Bank details</div></button>
                                </div>
                                <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-40">
                                    <button onClick={() => setSelectedDialogue(4)}><div>Contacts</div></button>
                                </div>
                                <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-40">
                                    <button onClick={() => setSelectedDialogue(5)}><div>Photos</div></button>
                                </div>
                            </div>
                            {selectedDialogue == 1 && <BuilderProjectInformation formValues={formValues} setFormValues={setFormValues} builderNameData={builderNameData} projectTypeData={projectTypeData} formErrors={formErrors} builderName={params.buildername}/>}
                            {selectedDialogue == 2 && <ProjectDetails formValues={formValues} setFormValues={setFormValues} projectLegalData={projectLegalData} formErrors={formErrors} />}
                            {selectedDialogue == 3 && <BankDetails formValues={formValues} setFormValues={setFormValues} />}
                            {selectedDialogue == 4 && <Contact formValues={formValues} setFormValues={setFormValues} />}
                            {selectedDialogue == 5 && <Photos formValues={formValues} setFormValues={setFormValues} />}
                            <div className="my-2 flex justify-center items-center gap-[10px]">
                                <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' onClick={addProjectInfo} >Add</button>
                                <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={() => setIsManageBuilderDialogue(false)}>Cancel</button>
                            </div>
                        </div>
                        </Draggable>
                    </div>
                </>
            </Modal>
           
        </div>
    )
}

export default ManageBuilderProject;
