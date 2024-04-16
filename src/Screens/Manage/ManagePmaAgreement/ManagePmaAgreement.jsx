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
import DateFilter from "../../../assets/dateFilter.png"
import Add from "../../../assets/add.png";
import SucessfullModal from '../../../Components/modals/SucessfullModal';
import FailureModal from '../../../Components/modals/FailureModal';
import { Description } from '@mui/icons-material';
import AsyncSelect from "react-select/async"
import DeletePmaAgreement from './DeletePmaAgreement';
import SaveConfirmationPmaAgreement from './SaveConfirmationPmaAgreement';
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

    const [empNameFilter, setEmpNameFilter] = useState(false);
    const [empNameInput, setEmpNameInput] = useState("");
    const [empIdFilter, setEmpIdFilter] = useState(false);
    const [empIdInput, setEmpIdInput] = useState("");
    const [phoneFilter, setPhoneFilter] = useState(false);
    const [phoneInput, setPhoneInput] = useState("");
    const [emailFilter, setEmailFilter] = useState(false);
    const [emailInput, setEmailInput] = useState("");
    const [roleFilter, setRoleFilter] = useState(false);
    const [roleInput, setRoleInput] = useState("");
    const [pannoFilter, setPannoFilter] = useState(false);
    const [pannoInput, setPannoInput] = useState("");
    const [dojFilter, setDojFilter] = useState(false);
    const [dojInput, setDojInput] = useState("");
    const [ldowFilter, setLdowFilter] = useState(false);
    const [ldowInput, setLdowInput] = useState("");
    const [statusFilter, setStatusFilter] = useState(false);
    const [statusInput, setStatusInput] = useState("");
    const [idFilter, setIdFilter] = useState(false);
    const [idInput, setIdInput] = useState("");
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
    const [existingPmaAgreement,setExistingPmaAgreement] = useState([]);
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
            "search_key" : searchInput
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
    const addPmaAgreement = async () => {
        const data = {
            "user_id": 1234,
            "clientpropertyid":18196,
            "startdate":formValues.pmaStartDate,
            "enddate": formValues.pmaEndDate,
            "actualenddate":formValues.actualEndDate,
            "active":formValues.status,
            "scancopy":formValues.scan,
            "reasonforearlyterminationifapplicable":formValues.reason,
            "description":formValues.description,
            "rented": 10,
            "fixed":null,
            "rentedtax":Number(formValues.rentFee),
            "fixedtax":false,
            "orderid":435229,
            "poastartdate":formValues.poaStartDate,
            "poaenddate": formValues.poaEndDate,
            "poaholder": formValues.poaHolderName
        }
        const response = await APIService.addPmaAgreement(data)
        const res = await response.json()
        console.log(res)
    }
    useEffect(() => {
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
                setEmpNameFilter(false);
                setEmpIdFilter(false);
                setPhoneFilter(false);
                setEmailFilter(false);
                setRoleFilter(false);
                setPannoFilter(false);
                setDojFilter(false);
                setLdowFilter(false);
                setStatusFilter(false);
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
    const order = [1, 2, 3, 4];
    const client = [1, 2, 3, 4];
    //end

    const handleAddPmaAgreement = () => {
        console.log(formValues)
        // if (!validate()) {
        //     console.log('hu')
        //     return;
        // }
        setIsPmaAgreementDialogue(false);
        // setIsLLAgreementDialogue(false);
        setOpenAddConfirmation(true)

    }
    const addEmployee = async () => {
        // console.log('clicked')
        console.log(formValues)
        if (!validate()) {
            console.log('hu')
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
            "status": formValues.status,
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

        const result = await response.json()

        setOpenAddConfirmation(false);
        console.log(result)
        setIsPmaDialogue(false);
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
        if (!formValues.order) {
            setFormErrors((existing) => {
                return { ...existing, order: "Select Order" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, order: "" }
            })
        }

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
        XLSX.writeFile(workbook, "EmployeeData.xlsx");
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
    const [showDeleteModal,setShowDeleteModal] = useState(false)
    const [currPma,setCurrPma] = useState("");
    const handleDelete = (id) => {
        setCurrPma(id);
        setShowDeleteModal(true)
    }
    const deletePma = async (id) => {
        const data = {
            "user_id" : 1234,
            "id" : id
        }
        const response = await APIService.deletePmaAgreement(data)
        const res = await response.json()
        if(res.result == 'success') {
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


    const [selectedOption,setSelectedOption] = useState({
        label : "Enter Client Name",
        value : null
       });
       const [query,setQuery] = useState('')
       const handleClientNameChange = (e) => {
           console.log('hey')
           console.log(e)
          //  setFormValues({...formValues,client_property : {
          //   ...formValues.client_property,
          //   clientid : e.value
          //  }})
          const existing = {...formValues}
          existing.client = e.value
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
          if(e.length < 3) return ;
          const data = {
            "user_id" : 1234,
            "pg_no" : 0,
            "pg_size" : 0,
            "search_key" : e
          }
          const response = await APIService.getClientAdminPaginated(data)
          const res = await response.json()
          const results = res.data.map(e => {
            return {
              label : e[1],
              value : e[0]
            }
          })
          if(results === 'No Result Found') {
            return []
          }
          return results
       }
    return (
        <div className='h-screen'>
            <Navbar />
            {isEditDialogue && <EditManageEmployee isOpen={isEditDialogue} handleClose={() => setIsEditDialogue(false)} item={currItem} showSuccess={openEditSuccess} />}
            {showAddSuccess && <SucessfullModal isOpen={showAddSuccess} message="successfully Added Pma Agreement" />}
            {showDeleteSuccess && <SucessfullModal isOpen={showDeleteSuccess} message="Successfully Deleted Pma Agreement" />}
            {showEditSuccess && <SucessfullModal isOpen={showEditSuccess} message="successfully Updated Employee" />}
            {/* {openAddConfirmation && <SaveConfirmationEmployee handleClose={() => setOpenAddConfirmation(false)} currEmployee={formValues.employeeName} addEmployee={addEmployee} />} */}
            {openAddConfirmation && <SaveConfirmationPmaAgreement addPmaAgreement={addPmaAgreement} handleClose={() => setOpenAddConfirmation(false)}/>}
            {isFailureModal && <FailureModal isOpen={isFailureModal} message={errorMessage} />}
            
            {showDeleteModal && <DeletePmaAgreement handleClose={() => setShowDeleteModal(false)} item={currPma} handleDelete={deletePma}/>}
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
                <div className='h-12 w-full bg-white'>
                    <div className='w-full h-12 bg-white flex justify-between'>
                        <div className="w-[83%] flex">
                            <div className='w-[3%] flex'>
                                <div className='p-3'>
                                    {/* <p>Sr.</p> */}
                                </div>
                            </div>
                            <div className='w-[18%] flex p-3'>
                                <div className="w-[52%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-12 bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2" onChange={(e) => setEmpNameInput(e.target.value)} />
                                    <button className='p-1'><img src={Filter} className='h-[15px] w-[15px]' onClick={() => { setEmpNameFilter((prev) => !prev) }} /></button>
                                </div>
                                {empNameFilter && <div className='h-[270px] w-[150px] mt-10 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm z-40' ref={menuRef} >
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

                            <div className='w-[19%]  flex p-3'>
                                <div className="w-[52%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-14 bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2" onChange={(e) => setEmpIdInput(e.target.value)} />
                                    <button className='p-1'><img src={Filter} className='h-[15px] w-[15px]' onClick={() => { setEmpIdFilter((prev) => !prev) }} /></button>
                                </div>
                                {empIdFilter && <div className='h-[270px] w-[150px] mt-10 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm z-40' ref={menuRef} >
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

                            <div className='w-[15%]  flex p-3'>
                                <div className="w-[60%] flex items-center bg-[#EBEBEB] rounded-[5px]">
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

                            <div className='w-[15%]  flex p-3'>
                                <div className="w-[58%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-12 bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2" onChange={(e) => setEmailInput(e.target.value)} />
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

                            <div className='w-[15%]  flex p-3'>
                                <div className="w-[60%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-12 bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2" onChange={(e) => setRoleInput(e.target.value)} />
                                    <button className='p-1'><img src={DateFilter} className='h-[15px] w-[15px]' onClick={() => { setRoleFilter((prev) => !prev) }} /></button>
                                </div>
                                {roleFilter && <div className='h-[270px] w-[150px] mt-10 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm z-40' ref={menuRef} >
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

                            <div className='w-[15%]  flex p-3'>
                                <div className="w-[60%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-12 bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2" onChange={(e) => setPannoInput(e.target.value)} />
                                    <button className='p-1'><img src={DateFilter} className='h-[15px] w-[15px]' onClick={() => { setPannoFilter((prev) => !prev) }} /></button>
                                </div>
                                {pannoFilter && <div className='h-[270px] w-[150px] mt-10 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm z-40' ref={menuRef} >
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
                        <div className="w-[10%] flex">
                            <div className='w-1/2  flex p-3'>
                                <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                                    <input className="w-12 bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2" onChange={(e) => setIdInput(e.target.value)} />
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
                    <div className='w-full h-16 bg-[#F0F6FF] flex justify-between border-gray-400 border-b-[1px]'>
                        <div className="w-[90%] flex">
                            <div className='w-[2%] flex'>
                                <div className='px-3 py-5'>
                                    <p>Sr.</p>
                                </div>
                            </div>
                            <div className='w-[10.8%]  flex'>
                                <div className='px-3 py-5'>
                                    <p>Client name <span className="font-extrabold">↑↓</span></p>
                                </div>
                            </div>
                            <div className='w-[14.8%]  flex'>
                                <div className='px-3 py-5'>
                                    <p>Property Description <span className="font-extrabold">↑↓</span></p>
                                </div>
                            </div>
                            <div className='w-[9.8%]  flex '>
                                <div className='p-3'>
                                    <p>Order</p>
                                    <p>Description</p>
                                </div>
                                <div className="font-extrabold py-5">↑↓</div>
                            </div>
                            <div className='w-[8.8%]  flex'>
                                <div className='p-3'>
                                    <p>Property</p>
                                    <p>Status</p>
                                </div>
                                <div className="font-extrabold py-5">↑↓</div>
                            </div>
                            <div className='w-[9.8%]  flex'>
                                <div className='px-3 py-5'>
                                    <p>Description <span className="font-extrabold">↑↓</span></p>
                                </div>
                            </div>
                            <div className='w-[7.8%]  flex'>
                                <div className='px-3 py-5'>
                                    <p>Status <span className="font-extrabold">↑↓</span></p>
                                </div>
                            </div>
                            <div className='w-[9.8%]  flex'>
                                <div className='p-3'>
                                    <p>PMA</p>
                                    <p>Start Date</p>
                                </div>
                                <div className="font-extrabold py-5">↑↓</div>
                            </div>
                            <div className='w-[8.8%]  flex'>
                                <div className='p-3'>
                                    <p>PMA</p>
                                    <p>End Date</p>
                                </div>
                                <div className="font-extrabold py-5">↑↓</div>
                            </div>
                            <div className='w-[8.8%]  flex'>
                                <div className='p-3'>
                                    <p>POA</p>
                                    <p>Start Date</p>
                                </div>
                                <div className="font-extrabold py-5">↑↓</div>
                            </div>
                            <div className='w-[8.8%]  flex'>
                                <div className='p-3'>
                                    <p>POA</p>
                                    <p>End Date</p>
                                </div>
                                <div className="font-extrabold py-5">↑↓</div>
                            </div>
                        </div>
                        <div className="w-[10%] flex">
                            <div className='w-[65%]  flex'>
                                <div className='p-3'>
                                    <p>POA</p>
                                    <p>Holder</p>
                                </div>
                                <div className="font-extrabold py-5">↑↓</div>
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
                                      <img className='w-4 h-4 cursor-pointer' src={Edit} alt="edit" onClick={() => {}} />
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
                    minHeight : 25,
                    lineHeight : '1.3',
                    height : 2,
                    fontSize : 12,
                    padding : '1px'
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
                  options : (provided, state) => ({
                    ...provided,
                    fontSize : 12 // adjust padding for the dropdown indicator
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
                                            {order.map((item) => (
                                                <option key={item} value={item}>
                                                    {item}
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
                                            {clientProperty.map((item) => (
                                                <option key={item} value={item}>
                                                    {item}
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
