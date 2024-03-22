import { CircularProgress, Modal } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Navbar from "../../../Components/Navabar/Navbar";
import FailureModal from '../../../Components/modals/FailureModal';
import SucessfullModal from '../../../Components/modals/SucessfullModal';
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
    const [userId,setUserId]=useState(0);
    const crdr =["CR","DR"]
    const [sortField, setSortField] = useState("");
    const [order, setOrder] = useState("asc");
    const [vendorList, setVendorList]=useState([]);
    // const [selectedBuilder,setSelectedBuilder] = useState();
   const handleSortingChange = (option)=>{


   }
    const fetchUserId = async() =>{
        const response = await authService.getUserId();
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
        setIsManageStatementDialogue(false);
        setShowSucess(true);
        setTimeout(function () {
            setShowSucess(false)
        }, 2000)
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
        const response = await APIService.getBankStatement(data)
        const result = (await response.json()).data;
        setPageLoading(false);
        setExistingStatement(result);
    }
    
    const deleteStatement = async (item) => {
        setShowDelete(true);
        setCurrentStatementId(item);
        setDeleted(true);
    }

    const addBankStatement = async () => {
        const data = {
            "user_id": userId || 1234,
            "id": null,
            "modeofpayment": formValues.modeofpayment,
            "date":formValues.date,
            "amount":formValues.amount,
            "particulars":formValues.particulars,
            "crdr":formValues.crdr,
            "chequeno":null,
            "availablebalance":null,
            "dateadded":null,
            "clientid": null,
            "orderid": null,
            "receivedby":null,
            "details":null,
            "vendorid":null,
            "createdby":userId || 1234
        }
        const response = await APIService.addBankStatement(data);
       console.log("here")
        if (response.ok) {
            setIsLoading(false);
            openConfirmModal();
        } else {
            setIsLoading(false);
            openFailureModal();
        }
        fetchBankStatement();
    }

    useEffect(() => {
        fetchUserId();
        getVendorAdmin();
        fetchBankStatement();
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
        addBankStatement();
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
    const [isConfirmManageStatementDialogue, setIsConfirmManageStatementDialogue] = React.useState(false);
    const [isManageStatementDialogue, setIsManageStatementDialogue] = React.useState(false);
    const handleOpen = () => {
        setIsManageStatementDialogue(true);
    };
    const handleClose = () => {
        setIsManageStatementDialogue(false);
    }
    const [isEditDialogue, setIsEditDialogue] = React.useState(false);
    const editStatement = (item) => {
        setCurrentStatement(item);
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
    return (
        <div >
            <Navbar />
            <SucessfullModal isOpen={showSucess} message="New Bank Statement created succesfully " />
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
                                    <button className="bg-[#004DD7] text-white h-[36px] w-[250px] rounded-lg" onClick={handleOpen}>
                                        Add New Bank Statement +
                                    </button>
                                </div>

                            </div>

                        </div>
                        <div className='h-12 w-full flex'>
                           <div className="w-[85%] h-full flex">
                               <div className='w-[5%] p-4'>
                                    {/* <p>Sr. </p> */}
                                </div>
                                <div className='w-[25%]  p-4'>
                                     <input className="w-14 bg-[#EBEBEB]"/>
                                </div>
                                <div className='w-[15%]  p-4'>
                                    <input className="w-14 bg-[#EBEBEB]"/>
                                </div>
                                <div className='w-[15%]  p-4'>
                                    <input className="w-14 bg-[#EBEBEB]"/>
                                </div>
                                <div className='w-[15%]  p-4'>
                                    < input className="w-14 bg-[#EBEBEB]"/>
                                </div>
                                <div className='w-[10%]  p-4'>
                                    {/* <p>Contact</p> */}
                                </div>
                                <div className='w-[10%]  p-4'>
                                    {/* <p>Projects</p> */}
                                </div>
                           </div>
                           <div className="w-[15%]  h-full flex">
                                <div className='w-1/2  p-4'>
                                     < input className="w-14 bg-[#EBEBEB]"/>
                                </div>
                                <div className='w-1/2 0 p-4'>
                                    {/* <p>Edit</p> */}
                                </div>
                           </div>
                        </div>
                        
                    </div>

                    <div className='w-full h-[500px] bg-white px-6 text-[12px]'>
                        <div className='w-full h-12 bg-[#F0F6FF] flex justify-between'>
                            <div className='w-[85%] flex'>
                                <div className='w-[5%] p-4'>
                                    <p>Sr. </p>
                                </div>
                                <div className='w-[20%]  p-4'>
                                    <p>Mode <span className="font-extrabold">↑↓</span></p>
                                </div>
                                <div className='w-[15%]  p-4'>
                                    <p onClick={() => handleSortingChange("date")}>Date ↑↓</p>
                                </div>
                                <div className='w-[15%]  p-4'>
                                    <p>Type ↑↓</p>
                                </div>
                                <div className='w-[10%]  p-4'>
                                    <p>Amount ↑↓</p>
                                </div>
                                <div className='w-[10%]  p-4'>
                                    <p>Client Name</p>
                                </div>
                                <div className='w-[20%]  p-4'>
                                    <p>Particulars</p>
                                </div>
                                <div className='w-[5%]  p-4'>
                                    <p>Client Receipt</p>
                                </div>
                            </div>
                            <div className='w-[10%] flex'>
                                <div className='w-1/2  p-4'>
                                    <p>ID ↑↓</p>
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
                                return <div className='w-full h-12  flex justify-between border-gray-400 border-b-[1px]'>
                                    <div className='w-[85%] flex'>
                                        <div className='w-[5%] p-4'>
                                            <p>{index + 1}</p>
                                        </div>
                                        <div className='w-[20%]  p-4'>
                                            <p>{item.modeofpayment}</p>
                                        </div>
                                        <div className='w-[15%]  p-4'>
                                            <p>{item.date}</p>
                                        </div>
                                        <div className='w-[15%]  p-4'>
                                            <p>{item.crdr}</p>
                                        </div>
                                        <div className='w-[10%]  p-4'>
                                            <p>{item.amount}</p>
                                        </div>
                                        <div className='w-[10%]  p-4 text-blue-500 cursor-pointer'>
                                            <p>{item.clientid}</p>
                                        </div>
                                        <div className='w-[20%]  p-4 text-blue-500 cursor-pointer'>
                                            <p>{item.particulars}</p>
                                        </div>
                                        <div className='w-[5%]  p-4 text-blue-500 cursor-pointer'>
                                            <p>{item.crdr}</p>
                                        </div>
                                    </div>
                                    <div className='w-[10%] flex'>
                                        <div className='w-1/2  p-4'>
                                            <p>{item.id}</p>
                                        </div>
                                        <div className='w-1/2 0 p-4 flex justify-between items-center'>
                                            <img className='w-5 h-5 cursor-pointer' src={Edit} alt="edit" onClick={() => editStatement(item)} />
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
                    <div className='w-full h-[250] flex justify-between justify-self-end px-6 '>
                        {/* footer component */}
                        <div className='ml-2'>
                            <div className='flex items-center w-auto h-full'>
                                {/* items */}
                                <div className='h-12 flex justify-center items-center'>
                                    <img src={backLink} className='h-2/4' />
                                </div>
                                <div className='flex space-x-1 mx-5'>
                                    {/* pages */}
                                    <div className='w-6 bg-[#DAE7FF] p-1 pl-2 rounded-md'>
                                        <p>1</p>
                                    </div>
                                    <div className='w-6  p-1 pl-2'>
                                        <p>2</p>
                                    </div>
                                    <div className='w-6 p-1 pl-2'>
                                        <p>3</p>
                                    </div>
                                    <div className='w-6  p-1 pl-2'>
                                        <p>4</p>
                                    </div>
                                </div>
                                <div className='h-12 flex justify-center items-center'>
                                    {/* right button */}
                                    <img src={nextIcon} className='h-2/4' />
                                </div>
                            </div>
                        </div>
                        <div className='flex mr-10 justify-center items-center space-x-2 '>
                            <div className="flex mr-8 space-x-2 text-sm items-center">
                               <p className="text-gray-400">Items Per page</p>
                               <select className="text-gray-400 border-black border-[1px] rounded-md p-1">
                                <option>
                                    12
                                </option>
                                <option>
                                    13
                                </option>
                                <option>
                                    14
                                </option>
                               </select>
                            </div>
                            <div className="flex text-sm">
                                <p className="mr-11 text-gray-400">219 Items in 19 Pages</p>
                            </div>
                            
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
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="modeofpayment" value={formValues.modeofpayment} onChange={handleChange} />
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.modeofpayment}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Particulars<label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="particulars" value={formValues.particulars} onChange={handleChange} />
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.particulars}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Amount</div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="amount" value={formValues.amount} onChange={handleChange} />
                                            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Vendor<label className="text-red-500">*</label></div>
                                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="vendor" value={formValues.vendor} onChange={handleChange} >
                                                {vendorList && vendorList.map(item => (
                                                    <option key={item} value={item}>
                                                        {item}
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
                                                {crdr && crdr.map(item => (
                                                    <option key={item} value={item}>
                                                        {item}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.crdr}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">How Recieved(CR)?<label className="text-red-500">*</label></div>
                                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="cr"
                                            defaultValue="Select CR or DR"
                                            value={formValues.cr}
                                            onChange={handleChange} >
                                            {crdr && crdr.map((item) => {
                                                return <option value={item}>
                                                      {item}
                                                </option>
                                                
                                            })}
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
          

            <Modal open={isConfirmManageStatementDialogue}
                fullWidth={true}
                maxWidth={'md'} className='w-2/4 h-64 rounded-xl bg-white mx-auto mt-48' >
                <div className='bg-white'>
                <div className="w-auto h-auto flex flex-col justify-center items-center ">
                    <div className="h-[40px] flex justify-center items-center">
                        <div className="ml-56 mr-52">
                            <div className="text-[16px]">Save Bank Statement</div>
                        </div>
                        <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                                  <div className="text-[8px]">Client</div>
                        </div>
                    </div>
                    {/* <div className="mt-2 h-20 w-20 flex justify-center items-center rounded-full bg-[#FFEAEA] ">
                        <img className="h-10 w-10" src={DeleteImage} alt="delete photo" />
                    </div> */}
                    <div className="mt-4 w-full text-center">
                        <p>Are you sure you want to Add Bank Statement</p>
                    </div>
                    <div className="my-5 flex justify-center items-center gap-[10px]">
                    <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' onClick={openSuccessModal}>Save</button>
                                <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleClose}>Cancel</button>
                    </div>
                </div>
            </div>
            </Modal>
        </div>
    )
}

export default ManageBankStatement
