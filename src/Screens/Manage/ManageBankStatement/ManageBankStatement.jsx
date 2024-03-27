import { CircularProgress, Modal ,LinearProgress , Pagination } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Navbar from "../../../Components/Navabar/Navbar";
import FailureModal from '../../../Components/modals/FailureModal';
import SaveModal from "../../../Components/modals/SaveModal";
import backLink from "../../../assets/back.png";
import Cross from "../../../assets/cross.png";
import downloadIcon from "../../../assets/download.png";
import Edit from "../../../assets/edit.png";
import nextIcon from "../../../assets/next.png";
import refreshIcon from "../../../assets/refresh.png";
import searchIcon from "../../../assets/searchIcon.png";
import Trash from "../../../assets/trash.png";
import { APIService } from '../../../services/API';
import Delete from './Delete';
import EditManageStatement from "./EditManagePayments";
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
import { authService } from "../../../services/authServices";
import Filter from "../../../assets/filter.png"
import SucessfullModal from "../../../Components/modals/SucessfullModal";
import dayjs from "dayjs";
import DayJS from 'react-dayjs';
const ManageBankStatement = () => {
    // we have the module here
    const [existingStatement, setExistingStatement] = useState([]);
    const [pageLoading, setPageLoading] = useState(false);
    const [showSucess, setShowSucess] = useState(false);
    const [showFailure, setShowFailure] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [currentStatement, setCurrentStatement] = useState({});
    const [currentStatementId,setCurrentStatementId] = useState();
    const [deleted, setDeleted] = useState(false);
    const [userId,setUserId]=useState(1234);
    const crdr =["CR","DR"]
    const [sortField, setSortField] = useState("");
    const [order, setOrder] = useState("asc");
    const [vendorList, setVendorList]=useState([]);
    const [totalItems,setTotalItems] = useState(0);
    const [currentPages,setCurrentPages] = useState(15);
    const [currentPage,setCurrentPage] = useState(1);
    const [downloadModal,setDownloadModal] = useState(false);
    const [clientName,setClientName]= useState("");
    const [showCreditReceipt, setCreditReceipt]=useState(false);
    const[employees, setEmployees]=useState([]);
    const [mode,setMode]=useState([])
    const [entity,setEntity]=useState([])
    const [howReceived,setHowReceived]=useState([])
    const [client,setClient]=useState([])
    const [successMessage,setSuccessMessage]=useState("")
    const [searchQuery,setSearchQuery] = useState("");
    const [modeEdit,setModeEdit]=useState(Number)
    const[receivedBy,setRecievedBy]=useState(Number);
    const[vendorId,setVendorId]=useState(Number);
    
    // const [selectedBuilder,setSelectedBuilder] = useState();
    const convertDate = (data)=>{

    }
    const getEmployees = async () => {
        const data = {
            "user_id": 1234,
            "rows": ["employeename"],
            "filters": [],
            "sort_by": [],
            "order": "asc",
            "pg_no": 0,
            "pg_size": 0
        }
        const employee = await APIService.getEmployees(data);
        
        const temp = await employee.json();
        const t = temp.total_count;
        const result = temp.data;
        setEmployees(result);
      
    }
    const getCRDetails = async()=>{
        const data = { 
            "user_id" : 1234}
        const mode1 = await APIService.getModesAdmin(data);
        const howReceived1 = await APIService.getHowReceivedAdmin(data);
        const entity1 = await APIService.getEntityAdmin(data);
        const client1 = await APIService.getClientAdmin(data);
        setEntity((await entity1.json()).data)
        setHowReceived((await howReceived1.json()).data)
        setClient((await client1.json()).data)
        setMode((await mode1.json()).data)

    }
    const fetchUserId = async() =>{
        const response = await authService.getUserID();
        setUserId(response)
    }
    const getVendorAdmin = async() =>{
        const data = {"user_id": userId || 1234}
        const response = await APIService.getVendorAdmin(data);
        const result = (await response.json()).data;        
        setVendorList(result)
    }

    const openConfirmModal = () => {
        // set the state for true for some time
        if(isConfirmManageStatementDialogue){
            setSuccessMessage("New Bank Statement created succesfully ")
        }else{
            setSuccessMessage("New Credit Receipt created succesfully ")
        }
        setShowSucess(true);
        setIsManageStatementDialogue(false);
        setIsConfirmManageStatementDialogue(false)
        // setShowSucess(true);
        setTimeout(function () {
            setShowSucess(false)
        }, 2000)
    }
    const isCredit=(item)=>{
        if(item === "CR                  "){
            return true;
        }else return false;

    }
    const openSuccessModal = () => {
        // set the state for true for some time
        setIsManageStatementDialogue(false);
        setShowSucess(true);
        setTimeout(function () {
            setShowSucess(false)
        }, 2000)
    }
    const openFailureModal = () => {
        setIsManageStatementDialogue(false);
        setShowFailure(true);
        setTimeout(function () {
            setShowFailure(false)
        }, 4000);
    }

    const fetchBankStatement = async () => {
        setPageLoading(true);
        const data = {
            "user_id": userId || 1234,
            "rows": ["id", "modeofpayment", "amount", "crdr", "chequeno","date","particulars", "clientid"],
            "filters": [],
            "sort_by": [],
            "order": "asc",
            "pg_no": 1,
            "pg_size": 15
          }
        const response = await APIService.getBankStatement(data);
        const temp = await response.json();
        const t = temp.total_count;
        const result = temp.data;
        setTotalItems(t);
        setPageLoading(false);
        setExistingStatement(result);
        existingStatement.map(ele =>{
            client.map(item =>{
                if(ele.clientid === item[0]){
                    console.log(item[1])
                }
            })
        })
    }
    
    const deleteStatement = async (item) => {
        console.log(item)
        setShowDelete(true);
        setCurrentStatementId(item);
        setDeleted(true);
    }

    const addBankStatement = async () => {
        console.log(formValues.modeofpayment)
        setVendorId((formValues.vendor).split(",", 1)[0]);
        setModeEdit((formValues.modeofpayment).split(",", 1)[0])
  
        console.log(modeEdit, vendorId)
        const data = {
            "user_id": userId || 1234,
            "modeofpayment":Number(modeEdit),
            "date":formValues.date,
            "amount":Number(formValues.amount),
            "particulars":formValues.particulars,
            "crdr":formValues.crdr,
            "vendorid":Number(vendorId),
            "createdby":userId || 1234
        }
        setClientName(formValues.particulars);
        const response = await APIService.addBankStatement(data);
        if (response.ok) {
            setIsLoading(false);
            openConfirmModal();
        } else {
            setIsLoading(false);
            openFailureModal();
        }
        fetchBankStatement();
    }
    const addCreditRecipt = async () => {
       
        const data = {
            "user_id": userId || 1234,
            "receivedby": Number(formValues.employee),
            "paymentmode": Number(formValues.modeofpayment),
            "recddate": formValues.recddate,
            "entityid": Number(formValues.entity),
            "amount": Number(formValues.amount),
            "howreceivedid":Number(formValues.how),
            "clientid": Number(formValues.client),
            "receiptdesc": formValues.desc,
            "serviceamount":Number(formValues.serviceAmount),
            "reimbursementamount":Number(formValues.reimbAmount),
            "tds":Number(formValues.TDS)
        }
        setClientName(formValues.particulars);
        const response = await APIService.addClientReceipt(data);
        if (await response.json().result === "success") {
            setIsLoading(false);
            openConfirmModal();
        } else {
            setIsLoading(false);
            openFailureModal();
        }
        fetchBankStatement();
    }
    const fetchPageData = async (pageNumber) => {
        setPageLoading(true);
        setCurrentPage(pageNumber);
        const data = { 
            "user_id" : 1234,
            "rows" : ["id", "modeofpayment", "amount", "crdr", "chequeno","date","particulars", "clientid"],
            "filters" : [],
            "sort_by" : [],
            "order" : "asc",
            "pg_no" : Number(pageNumber),
            "pg_size" : Number(currentPages)
         };
        const response = await APIService.getBankStatement(data)
        const temp = await response.json();
        const result = temp.data;
        const t = temp.total_count;
        setTotalItems(t);
        setExistingStatement(result);
        setPageLoading(false);
    }
    const fetchQuantityData = async (number) => {
        setPageLoading(true);
        const data = { 
            "user_id" : 1234,
            "rows" : ["id", "modeofpayment", "amount", "crdr", "chequeno","date","particulars", "clientid"],
            "filters" : [],
            "sort_by" : [],
            "order" : "asc",
            "pg_no" : Number(currentPage),
            "pg_size" : Number(number)
         };
        const response = await APIService.getBankStatement(data)
        const temp = await response.json();
        const result = temp.data;
        const t = temp.total_count;
        setTotalItems(t);
        setExistingStatement(result);
        setPageLoading(false);
    }
    const handleSort = async (field) => {
        setPageLoading(true);
        const data = { 
            "user_id" : 1234,
            "rows" : ["id", "modeofpayment", "amount","date","particulars", "clientid","crdr"],
            "filters" : [],
            "sort_by" : [field],
            "order" : flag ? "asc" : "desc",
            "pg_no" : 1,
            "pg_size" : Number(currentPages)
        };
        const response = await APIService.getBankStatement(data)
        const temp = await response.json();
        const result = temp.data;
        const t = temp.total_count;
        setTotalItems(t);
        setExistingStatement(result);
        setFlag((prev) => {
            return !prev;
        })
        setPageLoading(false);
}

    useEffect(() => {

        fetchUserId();
        getCRDetails();
        getVendorAdmin();
        fetchBankStatement();
        getEmployees();
        
    }, []);
    //Validation of the form
    const initialValues = {
        modeofpayment: "",
        particulars: "",
        amount: "",
        vendor: "",
        date: "",
        crdr: "",
        how: ""
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});

    // handle changes in input form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
       
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues)); 
        setIsConfirmManageStatementDialogue(true);
        setIsManageStatementDialogue(false);
        // addBankStatement();
    };
    const handleCR = (e) => {
        e.preventDefault();
        setFormErrors(validateCR(formValues)); 
        setCreditReceipt(false)
        addCreditRecipt();
    };
    // validate form and to throw Error message
    const validate = (values) => {
        const errors = {};
        if (!values.modeofpayment) {
            errors.modeofpayment = "Select a Mode";
        }
        if (!values.particulars) {
            errors.particulars = "Enter particulars";
        }
        if (!values.amount) {
            errors.amount = "Enter Amount";
        }
        if (!values.date) {
            errors.date = "Select a Date";
        }
        if (!values.crdr) {
            errors.crdr = "Select CR or DR";
        }
        return errors;
    };
    const validateCR = (values) => {
        const errors = {};
        if (!values.modeofpayment) {
            errors.modeofpayment = "Select a Mode";
        }
        if (!values.recieved) {
            errors.recieved = "Enter recieved";
        }
        if (!values.amount) {
            errors.amount = "Enter Amount";
        }
        if (!values.entity) {
            errors.entity = "Select a entity";
        }
        if (!values.how) {
            errors.how = "Select how recieved";
        }
        if (!values.client) {
            errors.client = "Select how client";
        }
        return errors;
    };
    const [isConfirmManageStatementDialogue, setIsConfirmManageStatementDialogue] = React.useState(false);
    const [isManageStatementDialogue, setIsManageStatementDialogue] = React.useState(false);
    const handleOpen = () => {
        setIsManageStatementDialogue(true);
        setIsConfirmManageStatementDialogue(false);
    };
    const handleClose = () => {
        setIsManageStatementDialogue(false);
        setIsConfirmManageStatementDialogue(false);
    }
    const handleCloseForConfirm = () => {
        setIsManageStatementDialogue(true);
        setIsConfirmManageStatementDialogue(false)
    }

    const [isEditDialogue, setIsEditDialogue] = React.useState(false);
    const editStatement = (item,vendor,howReceived,mode) => {
        const items={item,"vendorList":vendor,"how":howReceived,"mode":mode}
        setCurrentStatement(items);
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
       await fetchBankStatement();
    }
    const handleDownload =  () => {
        const worksheet = XLSX.utils.json_to_sheet(existingStatement);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook,worksheet,"Sheet1");
        XLSX.writeFile(workbook,"BankStatement.xlsx");
        FileSaver.saveAs(workbook,"demo.xlsx");
    }
    const [flag,setFlag] = useState(true);
    const handleSearch = async () => {
            setPageLoading(true);
            const data = { 
                "user_id" : 1234,
                "rows" : ["id", "modeofpayment", "amount","date","particulars", "clientid"],
                "filters" : [],
                "sort_by" : [],
                "order" : "asc",
                "pg_no" : Number(currentPage),
                "pg_size" : Number(currentPages),
                "search_key" : searchQuery
             };
             const response = await APIService.getBankStatement(data)
             const temp = await response.json();
             const result = temp.data;
             const t = temp.total_count;
             setTotalItems(t);
             setExistingStatement(result);
             setPageLoading(false);
          
      
    }
    const [lobFilter,setLobFilter] = useState(false);
    const [lobFilterInput,setLobFilterInput] = useState("");
    const toggleLobFilter = () => {
         setLobFilter((prev) => !prev)
    }
    const [modeFilter,setModeFilter] = useState(false);
    const [modeFilterInput,setModeFilterInput] = useState("");
    const toggleModeFilter = () => {
         setModeFilter((prev) => !prev)
    }
    const [dateFilter,setDateFilter] = useState(false);
    const [dateFilterInput,setDateFilterInput] = useState("");
    const toggleDateFilter = () => {
         setDateFilter((prev) => !prev)
    }
    const [amountFilter,setAmountFilter] = useState(false);
    const [amountFilterInput,setAmountFilterInput] = useState("");
    const toggleAmountFilter = () => {
         setAmountFilter((prev) => !prev)
    }
    const [clientFilter,setClientFilter] = useState(false);
    const [clientFilterInput,setClientFilterInput] = useState("");
    const toggleClientFilter = () => {
         setClientFilter((prev) => !prev)
    }
    const [particularsFilter,setParticularsFilter] = useState(false);
    const [particularsFilterInput,setParticularsFilterInput] = useState("");
    const toggleParticularsFilter = () => {
         setParticularsFilter((prev) => !prev)
    }
    const [crFilter,setCRFilter] = useState(false);
    const [crFilterInput,setCRFilterInput] = useState("");
    const toggleCRFilter = () => {
         setCRFilter((prev) => !prev)
    }
    const fetchFilteredMode = async (filterType,filterField) => {
        const filterArray = [];
        
        setPageLoading(true);
        const data = { 
            "user_id" : 1234,
            "rows" : ["id","name"],
            "filters" : [["name",String(filterType),filterField]],
            "sort_by" : [],
            "order" : "asc",
            "pg_no" : 1,
            "pg_size" : Number(currentPages)
         };
        const response = await APIService.getBankStatement(data)
        const temp = await response.json();
        const result = temp.data;
        const t = temp.total_count;
        setTotalItems(t);
        setExistingStatement(result);
        setFlag((prev) => {
            return !prev;
        })
        setPageLoading(false);
        existingBankSta
      }
    const handleExcelDownload = async () => {
        const data = { 
            "user_id" : 1234,
            "rows" : ["id", "modeofpayment", "amount", "crdr", "chequeno","date","particulars", "clientid"],
            "filters" : [],
            "sort_by" : [],
            "order" : "asc",
            "pg_no" : 0,
            "pg_size" : 0
         };
        const response = await APIService.getBankStatement(data)
        const temp = await response.json();
        const result = temp.data;
        const worksheet = XLSX.utils.json_to_sheet(result);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook,worksheet,"Sheet1");
        XLSX.writeFile(workbook,"bankStatement.xlsx");
        FileSaver.saveAs(workbook,"demo.xlsx");
      }
   
    const openDownload = () => {
        setDownloadModal((prev) => !prev);
      }
    const handlePageChange = (event,value) => {
      
       setCurrentPage(value)
       fetchPageData(value);
    }
 const openCreditRecipt = ()=>{
    setCreditReceipt(true);

 }
 const handleCloseCR=()=>{
    setCreditReceipt(false);
 }
    return (
        <div >
            <Navbar />
            <SucessfullModal isOpen={showSucess} message={successMessage} />
            <FailureModal isOpen={showFailure} message="Error! cannot create Bank Statement" />
            <Delete isOpen={showDelete} currentStatement={currentStatementId} closeDialog={setShowDelete} fetchData={fetchBankStatement} />
            <div className='flex-col w-full h-full  bg-white'>
                <div className='flex-col'>
                    {/* this div will have all the content */}
                    <div className='w-full  flex-col px-6'>
                        {/* the top section of the div */}
                        <div className='h-1/2 w-full  flex justify-between items-center p-2  border-gray-300 border-b-2'>
                            <div className='flex items-center space-x-3'>
                                <div className='rounded-2xl  bg-[#EBEBEB] h-8 w-8 flex justify-center items-center'>
                                    <Link to="/dashboard"><img className='w-5 h-5' src={backLink} /></Link>
                                </div>
                                <div className='flex-col'>
                                    <h1>Manage Bank Statement</h1>
                                    <p>Manage &gt; Manage Bank Statement</p>
                                </div>
                            </div>
                            <div className='flex space-x-2 items-center'>
                                <div className='flex'>
                                    {/* search button */}
                                    <input
                                       className="h-[36px] bg-[#EBEBEB] text-[#787878] pl-2"
                                       type="text"
                                       placeholder="Search"
                                       value={searchQuery}
                                       onChange={(e) => setSearchQuery(e.target.value) }
                                    />
                                    <div className="h-[36px] w-[40px] bg-[#004DD7] flex items-center justify-center rounded-r-lg">
                                        <img onClick={handleSearch} className="h-[26px] " src={searchIcon} alt="search-icon" />
                                    </div>
                                </div>

                                <div>
                                    {/* button */}
                                    <button className="bg-[#004DD7] text-white h-[36px] w-[250px] rounded-lg" onClick={handleOpen}>
                                        Add New Bank Statement +
                                    </button>
                                </div>

                            </div>

                        </div>
                        <div className='h-12 w-full bg-white flex justify-between'>
                             <div className='w-5/6 flex'>
                                <div className='w-[5px] p-4'>
                                    
                                </div>
                                <div className='w-[120px] p-4'>
                                   <input className="w-11 bg-[#EBEBEB]" value={modeFilterInput} onChange={(e) => setModeFilterInput(e.target.value)}/>
                                   <button className='p-1' onClick={toggleModeFilter}><img src={Filter} className='h-[17px] w-[17px]'/></button>
                                   {modeFilter && <div className='h-[270px] w-[150px] mt-3 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm'>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                              <h1 >No Filter</h1>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                              <button onClick={() => fetchFilteredMode('contains',modeFilterInput)}><h1 >Contains</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => fetchFilteredMode('contains',modeFilterInput)}><h1 >DoesNotContain</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => fetchFilteredMode('startsWith',modeFilterInput)}><h1 >StartsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                                            <button onClick={() => fetchFilteredMode('endsWith',modeFilterInput)}><h1 >EndsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => fetchFilteredMode('exactMatch',modeFilterInput)}><h1 >EqualTo</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                               <button onClick={() => fetchFilteredMode('isNull',modeFilterInput)}><h1 >isNull</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                               <button onClick={() => fetchFilteredMode('isNotNull',modeFilterInput)}><h1 >NotIsNull</h1></button>
                                            </div>
                                        </div>} 
                                </div>
                                <div className='w-[120px] p-4'>
                                   <input className="w-11 bg-[#EBEBEB]" value={dateFilterInput} onChange={(e) => setDateFilterInput(e.target.value)}/>
                                   <button className='p-1' onClick={toggleDateFilter}><img src={Filter} className='h-[17px] w-[17px]'/></button>
                                   {dateFilter && <div className='h-[270px] w-[150px] mt-3 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm'>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                              <h1 >No Filter</h1>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                              <button onClick={() => fetchFilteredMode('contains',dateFilterInput)}><h1 >Contains</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => fetchFilteredMode('contains',dateFilterInput)}><h1 >DoesNotContain</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => fetchFilteredMode('startsWith',dateFilterInput)}><h1 >StartsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                                            <button onClick={() => fetchFilteredMode('endsWith',dateFilterInput)}><h1 >EndsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => fetchFilteredMode('exactMatch',dateFilterInput)}><h1 >EqualTo</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                               <button onClick={() => fetchFilteredMode('isNull',dateFilterInput)}><h1 >isNull</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                               <button onClick={() => fetchFilteredMode('isNotNull',dateFilterInput)}><h1 >NotIsNull</h1></button>
                                            </div>
                                        </div>} 
                                </div>
                                <div className='w-[100px] p-4'>
                                   <input className="w-8 bg-[#EBEBEB]" value={lobFilterInput} onChange={(e) => setLobFilterInput(e.target.value)}/>
                                   <button className='p-1' onClick={toggleLobFilter}><img src={Filter} className='h-[10px] w-[10px]'/></button>
                                   {lobFilter && <div className='h-[270px] w-[150px] mt-3 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm'>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                              <h1 >No Filter</h1>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                              <button onClick={() => fetchFilteredMode('contains')}><h1 >Contains</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => fetchFilteredMode('contains')}><h1 >DoesNotContain</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => fetchFilteredMode('startsWith')}><h1 >StartsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                                            <button onClick={() => fetchFilteredMode('endsWith')}><h1 >EndsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => fetchFilteredMode('exactMatch')}><h1 >EqualTo</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                               <button onClick={() => fetchFilteredMode('isNull')}><h1 >isNull</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                               <button onClick={() => fetchFilteredMode('isNotNull')}><h1 >NotIsNull</h1></button>
                                            </div>
                                        </div>} 
                                </div>
                                <div className='w-[120px] p-4'>
                                   <input className="w-8 bg-[#EBEBEB]" value={amountFilterInput} onChange={(e) => setAmountFilterInput(e.target.value)}/>
                                   <button className='p-1' onClick={toggleAmountFilter}><img src={Filter} className='h-[12px] w-[12px]'/></button>
                                   {amountFilter && <div className='h-[270px] w-[150px] mt-3 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm'>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                              <h1 >No Filter</h1>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                              <button onClick={() => fetchFilteredMode('contains',amountFilterInput)}><h1 >Contains</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => fetchFilteredMode('contains',amountFilterInput)}><h1 >DoesNotContain</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => fetchFilteredMode('startsWith',amountFilterInput)}><h1 >StartsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                                            <button onClick={() => fetchFilteredMode('endsWith',amountFilterInput)}><h1 >EndsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => fetchFilteredMode('exactMatch',amountFilterInput)}><h1 >EqualTo</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                               <button onClick={() => fetchFilteredMode('isNull',amountFilterInput)}><h1 >isNull</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                               <button onClick={() => fetchFilteredMode('isNotNull',amountFilterInput)}><h1 >NotIsNull</h1></button>
                                            </div>
                                        </div>} 
                                </div>
                                <div className='w-[500px] p-4'>
                                   <input className="w-14 bg-[#EBEBEB]" value={clientFilterInput} onChange={(e) => setClientFilterInput(e.target.value)}/>
                                   <button className='p-1' onClick={toggleClientFilter}><img src={Filter} className='h-[17px] w-[17px]'/></button>
                                   {clientFilter && <div className='h-[270px] w-[150px] mt-3 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm'>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                              <h1 >No Filter</h1>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                              <button onClick={() => fetchFilteredMode('contains',clientFilterInput)}><h1 >Contains</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => fetchFilteredMode('contains',clientFilterInput)}><h1 >DoesNotContain</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => fetchFilteredMode('startsWith',clientFilterInput)}><h1 >StartsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                                            <button onClick={() => fetchFilteredMode('endsWith',clientFilterInput)}><h1 >EndsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => fetchFilteredMode('exactMatch',clientFilterInput)}><h1 >EqualTo</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                               <button onClick={() => fetchFilteredMode('isNull',clientFilterInput)}><h1 >isNull</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                               <button onClick={() => fetchFilteredMode('isNotNull',clientFilterInput)}><h1 >NotIsNull</h1></button>
                                            </div>
                                        </div>} 
                                </div>
                                <div className='w-[180px] p-4'>
                                   <input className="w-14 bg-[#EBEBEB]" value={particularsFilterInput} onChange={(e) => setParticularsFilterInput(e.target.value)}/>
                                   <button className='p-1' onClick={toggleParticularsFilter}><img src={Filter} className='h-[17px] w-[17px]'/></button>
                                   {particularsFilter && <div className='h-[270px] w-[150px] mt-3 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm'>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                              <h1 >No Filter</h1>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                              <button onClick={() => fetchFilteredMode('contains',particularsFilterInput)}><h1 >Contains</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => fetchFilteredMode('contains',particularsFilterInput)}><h1 >DoesNotContain</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => fetchFilteredMode('startsWith',particularsFilterInput)}><h1 >StartsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                                            <button onClick={() => fetchFilteredMode('endsWith',particularsFilterInput)}><h1 >EndsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => fetchFilteredMode('exactMatch',particularsFilterInput)}><h1 >EqualTo</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                               <button onClick={() => fetchFilteredMode('isNull',particularsFilterInput)}><h1 >isNull</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                               <button onClick={() => fetchFilteredMode('isNotNull',particularsFilterInput)}><h1 >NotIsNull</h1></button>
                                            </div>
                                        </div>} 
                                </div>
                                <div className='w-[120px] p-4'>
                                   <input className="w-11 bg-[#EBEBEB]" value={crFilterInput} onChange={(e) => setCRFilterInput(e.target.value)}/>
                                   <button className='p-1' onClick={toggleCRFilter}><img src={Filter} className='h-[17px] w-[17px]'/></button>
                                   {crFilter && <div className='h-[270px] w-[150px] mt-3 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm'>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                              <h1 >No Filter</h1>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                              <button onClick={() => fetchFilteredMode('contains',crFilterInput)}><h1 >Contains</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => fetchFilteredMode('contains',crFilterInput)}><h1 >DoesNotContain</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => fetchFilteredMode('startsWith',crFilterInput)}><h1 >StartsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                                            <button onClick={() => fetchFilteredMode('endsWith',crFilterInput)}><h1 >EndsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => fetchFilteredMode('exactMatch',crFilterInput)}><h1 >EqualTo</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                               <button onClick={() => fetchFilteredMode('isNull',crFilterInput)}><h1 >isNull</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                               <button onClick={() => fetchFilteredMode('isNotNull',crFilterInput)}><h1 >NotIsNull</h1></button>
                                            </div>
                                        </div>} 
                                </div>
                                
                            </div>
                            <div className='w-1/6  flex'>
                                {/* <div className='w-[100px] p-2 mt-2'>
                                   <input className="w-14 bg-[#EBEBEB]"/>
                                   <button className='p-1'><img src={Filter} className='h-[17px] w-[14px]'/></button>
                                </div> */}
                                <div className='w-1/2 0 p-4'>
                                     
                                </div>
                            </div>
                        </div>
                        
                    </div>

                    <div className='w-full h-[500px] bg-white px-6 text-[12px]'>
                        <div className='w-full h-12 bg-[#F0F6FF] flex justify-between'>
                            <div className='w-[90%]  flex'>
                                <div className='w-[5px] p-4'>
                                    <p>Sr. </p>
                                </div>
                                <div className='w-[120px]  p-4'>
                                    <p onClick={() => handleSort("modeofpayment")}>Mode <span className="font-extrabold">↑↓</span></p>
                                </div>
                                <div className='w-[100px]  p-4'>
                                    <p onClick={() => handleSort("date")}>Date ↑↓</p>
                                </div>
                                <div className='w-[50px]  p-4'>
                                    <p onClick={() => handleSort("crdr")}>Type</p>
                                </div>
                                <div className='w-[100px]  p-4'>
                                    <p onClick={() => handleSort("amount")}>Amount </p>
                                </div>
                                <div className='w-[400px] p-4 '>
                                    <p onClick={() => handleSort("particulars")}>Particulars</p>
                                </div>
                                <div className='w-[200px] p-4 '>
                                    <p onClick={() => handleSort("clientid")}>Client Name ↑↓</p>
                                </div>
                              
                                <div className='w-[150px] p-4 '>
                                    <p>Client Receipt</p>
                                </div>
                            </div>
                            <div className='w-[10%] flex'>
                                <div className='w-1/2  p-4'>
                                    <p onClick={() => handleSort("id")}>ID ↑↓</p>
                                </div>
                                <div className='w-1/2 0 p-4'>
                                    <p>Edit</p>
                                </div>
                            </div>
                        </div>
                        <div className='w-full h-80 overflow-auto'>
                            {pageLoading && <div className='ml-11 mt-9'>
                                <CircularProgress />
                            </div>}
                            {existingStatement && existingStatement.map((item, index) => {
                                return <div className='w-full   flex justify-between border-gray-400 border-b-[1px]'>
                                    <div className='w-[85%] text-[11px]  flex'>
                                        <div className='w-[5px] p-4'>
                                            <p>{index + 1}</p>
                                        </div>
                                        <div className='w-[150px]  p-4'>
                                            
                                            {mode &&mode.map(ele => (
                                                (item.modeofpayment === ele[0])?
                                                    <p>{ele[1]}</p> :""))}
                                        </div>
                                        <div className='w-[150px]  p-4'>
                                            {/* <p>{item.date}</p> */}
                                            <DayJS format="DD-MMM-YYYY">{item.date}</DayJS>
                                            {/* <p>{dayjs(item.date, "dd-mmm-yyyy")}</p> */}
                                        </div>
                                        <div className='w-[60px]  p-4'>
                                            <p>{item.crdr ==="CR                  "?"Credit" : "Debit"}</p>
                                        </div>
                                        <div className='w-[100px]  p-4'>
                                            <p>{item.amount}</p>
                                        </div>
                                        <div className='w-[600px] break-all p-4 '>
                                            <p>{item.particulars}</p>
                                        </div>
                                        <div className='w-[300px] break-all p-4 '>
                                            {/* <p>{item.clientid}</p> */}
                                            {client &&client.map(ele => (
                                                (item.clientid === ele[0])?
                                                    <p>{ele[1]}</p> :""))}
                                        </div>
                                        
                                        <div className='w-[100px]  p-4 text-blue-500 cursor-pointer'>
                                            {(!(item.clientid) && item.crdr ==="CR                  " )&& <p onClick={openCreditRecipt}>Enter CR</p>}
                                           
                                            {/* <p onClick={openCreditRecipt}>{item.crdr}</p> */}
                                        </div>
                                    </div>
                                    <div className='w-[150px] flex'>
                                        <div className='w-1/2  p-4'>
                                            <p>{item.id}</p>
                                            
                                        </div>
                                        <div className='w-1/2 0 p-4 flex justify-between items-center'>
                                            <img className='w-5 h-5 cursor-pointer' src={Edit} alt="edit" onClick={() => editStatement(item,vendorList,howReceived,mode)} />
                                            <img className='w-5 h-5 cursor-pointer' src={Trash} alt="trash" onClick={() => deleteStatement(item.id)} />
                                        </div>
                                    </div>
                                </div>
                            })}
                            {/* we get all the existing builders here */}
                            {isEditDialogue && <EditManageStatement openDialog={isEditDialogue} setOpenDialog={setIsEditDialogue} bankStatement={currentStatement} fetchData={fetchBankStatement}/>}
                            {showDelete && <Delete openDialog={isDeleteDialogue} setOpenDialog={setIsDeleteDialogue} currentStatement={currentStatement} fetchData={fetchBankStatement}/> }
                        </div>
                    </div>
                    <div className='w-full h-12 flex justify-between justify-self-end px-6 mt-5 fixed bottom-0 '>
                        {/* footer component */}
                        <div className='ml-2'>
                            <div className='flex items-center w-auto h-full'>
                                {/* items */}
                                <Pagination count={Math.ceil(totalItems/currentPages)} onChange={handlePageChange} page={currentPage}/>
                                
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
                                <p className="mr-11 text-gray-700">{totalItems} Items in {Math.ceil(totalItems/currentPages)} Pages</p>
                            </div>
                            {downloadModal && <div className='h-[120px] w-[220px] bg-white shadow-xl rounded-md absolute bottom-12 right-24 flex-col items-center justify-center  p-5'>
                                <button onClick={() => setDownloadModal(false)}><img src={Cross} className='absolute top-1 left-1 w-4 h-4'/></button>
                                
                               <button>
                                <div className='flex space-x-2 justify-center items-center ml-3 mt-3'>
                                    
                                    <p>Download as pdf</p>
                                    <img src={Pdf}/>
                                </div>
                               </button>
                               <button onClick={handleExcelDownload}>
                                <div className='flex space-x-2 justify-center items-center mt-5 ml-3'>
                                    <p>Download as Excel</p>
                                    <img src={Excel}/>
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
                </div>

            </div>

            {/* modal goes here */}
            <Modal open={isManageStatementDialogue}
                fullWidth={true}
                maxWidth={'md'} >
                <div className='flex justify-center mt-[150px]'>
                    <div className="w-[1100px] h-[400px] bg-white rounded-lg">
                        <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center">
                            <div className="mr-[410px] ml-[410px]">
                                <div className="text-[16px]">New Bank Statement</div>
                            </div>
                            <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                                <img onClick={handleClose} className="w-[20px] h-[20px] cursor-pointer" src={Cross} alt="cross" />
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="h-auto w-full mt-[5px] ">
                                <div className="flex gap-[48px] justify-center items-center">
                                    <div className=" space-y-[12px] py-[20px] px-[10px]">
                                        <div className="">
                                            <div className="text-[14px]">Mode<label className="text-red-500">*</label></div>
                                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="modeofpayment" value={formValues.modeofpayment} onChange={handleChange} >
                                            <option >Select Mode</option>
                                                {mode && mode.map(item => (
                                                    <option key={item} value={item}>
                                                        {item[1]}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.modeofpayment}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Particulars<label className="text-red-500">*</label></div>
                                            {/* <input className="w-[230px] h-[40px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="particulars" value={formValues.particulars} onChange={handleChange} /> */}
                                            <textarea className="break-all w-[230px] h-[40px] border-[1px] border-[#C6C6C6] rounded-sm text-xs " name="particulars" value={formValues.particulars} onChange={handleChange} />
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.particulars}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Amount<label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="amount" value={formValues.amount} onChange={handleChange} />
                                            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Vendor</div>
                                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="vendor" value={formValues.vendor} onChange={handleChange} >
                                            <option >Select Vendor List</option>
                                                {vendorList && vendorList.map(item => (
                                                    <option key={item} value={item}>
                                                        {item[1]}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.vendor}</div>
                                        </div>
                                    </div>
                                    <div className=" space-y-[12px] py-[20px] px-[10px]">
                                        <div className="">
                                            <div className="text-[14px]">Date <label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="date" name="date" value={formValues.date} onChange={handleChange} />
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.date}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">CR/DR <label className="text-red-500">*</label></div>
                                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="crdr" value={formValues.crdr} onChange={handleChange} >
                                            <option >Select CR/DR</option>
                                                {crdr && crdr.map(item => (
                                                    <option key={item} value={item}>
                                                        {item}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.crdr}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">How Recieved(CR)?</div>
                                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="how" value={formValues.h0w} onChange={handleChange} >
                                            <option >Select how Received</option>
                                                {howReceived && howReceived.map(item => (
                                                    <option key={item} value={item}>
                                                        {item[1]}
                                                    </option>
                                                ))}
                                            </select>
                                           
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.how}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-[10px] flex justify-center items-center gap-[10px]">

                                <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' type="submit">Save</button>
                                <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleClose}>Cancel</button>
                                {isLoading && <CircularProgress />}
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>


            <Modal open={showCreditReceipt}
                fullWidth={true}
                maxwidth={'md'} bankStatement={currentStatement}>
                    {/* <h1>{currentStatement}</h1> */}
                <div className='flex justify-center mt-[20px]'>
                    <div className="w-[1100px] h-[600px] bg-white rounded-lg">
                        <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center">
                            <div className="mr-[410px] ml-[410px]">
                                <div className="text-[16px]">Enter CR</div>
                            </div>
                            <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                                <img onClick={handleCloseCR} className="w-[20px] h-[20px] cursor-pointer" src={Cross} alt="cross" />
                            </div>
                        </div>
                        <form onSubmit={handleCR} >
                            <div className="h-auto w-full mt-[5px] ">
                                <div className="flex gap-[48px] justify-center items-center">
                                    <div className=" space-y-[12px] py-[20px] px-[10px]">
                                    <div className="">
                                            <div className="text-[14px]">Cura Office<label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="Pune" value="Pune" disabled />
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Recieved By<label className="text-red-500">*</label></div>
                                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="employee" value={formValues.employee} onChange={handleChange} >
                                            <option >Select Employee</option>
                                                {employees && employees.map(item => (
                                                    <option key={item} value={item}>
                                                        {item.employeename}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.employee}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Mode<label className="text-red-500">*</label></div>
                                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="modeofpayment" value={formValues.modeofpayment} onChange={handleChange} >
                                            <option >Select Mode</option>
                                                {mode && mode.map(item => (
                                                    <option key={item} value={item}>
                                                        {item[0]}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.modeofpayment}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Recieved Date<label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="date" name="recddate" value={formValues.recddate} onChange={handleChange} />
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.recddate}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Entity</div>
                                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="entity" value={formValues.entity} onChange={handleChange} >
                                            <option >Select Entity</option>
                                                {entity && entity.map(item => (
                                                    <option key={item} value={item}>
                                                        {item[0]} {item[1]}
                                                    </option>
                                                ))}
                                            </select>
                                            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Amount Recieved</div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="amount" value={formValues.amount} onChange={handleChange} />
                                            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">How Recieved?<label className="text-red-500">*</label></div>
                                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="how" value={formValues.how} onChange={handleChange} >
                                            <option >Select How Recieved</option>
                                                {howReceived && howReceived.map(item => (
                                                    <option key={item} value={item}>
                                                        {item[1]}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.how}</div>
                                        </div>
                                    </div>
                                    <div className=" space-y-[12px] py-[20px] px-[10px]">
                                        
                                        <div className="">
                                            <div className="text-[14px]">Client <label className="text-red-500">*</label></div>
                                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="client" value={formValues.client} onChange={handleChange} >
                                            <option >Select Client</option>
                                                {client && client.map(item => (
                                                    <option key={item} value={item}>
                                                        {item}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.client}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Receipt Description <label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="desc" value={formValues.desc} onChange={handleChange} />
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.desc}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Pending Amount <label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="pending" value={formValues.pending} onChange={handleChange} />
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.pending}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Service Amount <label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="serviceAmount" value={formValues.serviceAmount} onChange={handleChange} />
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.serviceAmount}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Reimbursement Amount <label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="reimbAmount" value={formValues.reimbAmount} onChange={handleChange} />
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.reimbAmount}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">TDS <label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="TDS" value={formValues.TDS} onChange={handleChange} />
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.TDS}</div>
                                        </div>
                                       
                                        
                                        
                                       
                                    </div>
                                </div>
                            </div>

                            <div className="mt-[10px] flex justify-center items-center gap-[10px]">

                                <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' >Save</button>
                                <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleCloseCR}>Cancel</button>
                                {isLoading && <CircularProgress />}
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
          

            <Modal open={isConfirmManageStatementDialogue} >
                        <div className='w-2/4 h-64 rounded-xl bg-white mx-auto mt-48' >
                        <div className="h-[40px] flex justify-center items-center">
                        <div className="w-[150px] mt-10 w-full text-center">
                        <div className="text-[24px]">Save Bank Statement</div>
                        <hr class="w-60 h-1 mx-auto  bg-gray-100"></hr>
                        </div>
                        
                        <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                            <img onClick={handleCloseForConfirm} className="w-[20px] h-[20px]" src={Cross} alt="cross" />
                        </div>
                    </div>
                            <div className="mt-8 w-full text-center">
                                      <div className="text-[14px]">Client:{clientName}</div>
                              </div>
                                    <div className="mt-4 w-full text-center">
                                        <p className="text-[14px]">Are you sure you want to Add new Bank statement</p>
                                    </div>
                                <div className="my-10 flex justify-center items-center gap-[10px]">
                                <button className='w-[132px] h-[48px] bg-[#004DD7] text-white rounded-md' onClick={addBankStatement}>Save</button>
                                <button className='w-[132px] h-[48px] border-[1px] border-[#282828] rounded-md' onClick={handleCloseForConfirm}>Cancel</button>
                                </div>
                            </div>
            </Modal>
        </div>
    )
}

export default ManageBankStatement
