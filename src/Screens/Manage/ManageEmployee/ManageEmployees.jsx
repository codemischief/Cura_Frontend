import React from 'react';
import { Outlet, Link } from "react-router-dom";
import backLink from "../../../assets/back.png";
import searchIcon from "../../../assets/searchIcon.png";
import nextIcon from "../../../assets/next.png";
import refreshIcon from "../../../assets/refresh.png";
import downloadIcon from "../../../assets/download.png";
import { useState ,useEffect } from 'react';
import Navbar from "../../../Components/Navabar/Navbar";
import Cross from "../../../assets/cross.png";
import { Modal , Pagination, LinearProgress} from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import { APIService } from '../../../services/API';
import Pdf from "../../../assets/pdf.png";
import Excel from "../../../assets/excel.png"
import Edit from "../../../assets/edit.png"
import Trash from "../../../assets/trash.png"
import Filter from "../../../assets/filter.png"
const ManageEmployees = () => {
  // we have the module here
    const [pageLoading,setPageLoading] = useState(false);
    const [existingEmployees,setExistingEmployees] = useState([]);
    const [currentPages,setCurrentPages] = useState(15);
    const [currentPage,setCurrentPage] = useState(1);
    const [totalItems,setTotalItems] = useState(0);
    const [downloadModal,setDownloadModal] = useState(false);
    const [searchInput,setSearchInput] = useState("");
    const fetchData = async () => {
        setPageLoading(true);
        const data = { 
            "user_id" : 1234,
            "rows" : ["id", "employeename","employeeid","phoneno","email","userid","roleid","panno", "dateofjoining","lastdateofworking","status"],
            "filters" : [],
            "sort_by" : [],
            "order" : "asc",
            "pg_no" : Number(currentPage),
            "pg_size" : Number(currentPages)
         };
         const response = await APIService.getEmployees(data);
         const temp = await response.json();
         const result = temp.data;
         console.log(result);
         const t = temp.total_count;
         setTotalItems(t);
         setExistingEmployees(result);
         setPageLoading(false);
    } 
    const fetchPageData = async (pageNumber) => {
        setPageLoading(true);
        const data = { 
            "user_id" : 1234,
            "rows" : ["id", "employeename","employeeid","phoneno","email","userid","roleid","panno", "dateofjoining","lastdateofworking","status"],
            "filters" : [],
            "sort_by" : [],
            "order" : "asc",
            "pg_no" : Number(pageNumber),
            "pg_size" : Number(currentPages)
         };
         const response = await APIService.getEmployees(data);
         const temp = await response.json();
         const result = temp.data;
         console.log(result);
         const t = temp.total_count;
         setTotalItems(t);
         setExistingEmployees(result);
         setPageLoading(false);
    }
    const fetchQuantityData = async (quantity) => {
        setPageLoading(true);
        const data = { 
            "user_id" : 1234,
            "rows" : ["id", "employeename","employeeid","phoneno","email","userid","roleid","panno", "dateofjoining","lastdateofworking","status"],
            "filters" : [],
            "sort_by" : [],
            "order" : "asc",
            "pg_no" : Number(currentPage),
            "pg_size" : Number(quantity)
         };
         const response = await APIService.getEmployees(data);
         const temp = await response.json();
         const result = temp.data;
         console.log(result);
         const t = temp.total_count;
         setTotalItems(t);
         setExistingEmployees(result);
         setPageLoading(false);
    }
    useEffect(()=> {
        fetchData();
    },[]);
    const selectedCountry = [
      "India", "USA", "UK", "Germany", "France", "Italy"
    ]
    const selectedState = [
        "State1", "State2", "State3", "State4"
    ]
    const selectedCity = [
        "City1", "City2", "City3", "City4"
    ]
    const entity = [
        "Entity1", "Entity1", "Entity1", "Entity1"
    ]
    const assignedRoles = [
        "Role1", "Role2", "Role3", "Role4"
    ]
    const userName = [
        "User1", "User2", "User3", "User4"
    ]
  // hardcoded for dropdown instances ********* End*************

  const initialValues = {
    employeeName: "",
    panNo: "",
    userName: "",
    doj: "",
    desc: "",
    email: "",
    employeeId: "",
    lob: "",
    dob: "",
    role: "",
    phNo: "",
    country: "",
    state: "",
    city: "",
    suburb: "",
    entity: ""

};
const [formValues, setFormValues] = useState(initialValues);
const [formErrors, setFormErrors] = useState({});

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
};
const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    
    // handle adding of data
    const data = {
        "user_id":1234,
        "id":100,
        "employeename":formValues.employeeName,
        "employeeid":formValues.employeeId,
        "roleid":2,
        "dateofjoining":"13-01-2024 00:00:00",
        "dob":"13-01-2001 00:00:00",
        "panno":"abcd",
        "status":false,
        "phoneno":null,
        "email":null,
        "addressline1":"abcdefgh",
        "addressline2":"ijklmnop",
        "suburb":"Pune",
        "city":847,
        "state":"Maharashta",
        "country":5,
        "zip":null,
        "dated":"20-01-2020  00:00:00",
        "createdby":1234,
        "isdeleted":false,
        "entityid":10,
        "lobid":100,
        "lastdateofworking":"20-02-2020 00:00:00",
        "designation":"New"}
    
    
};
// validate form and to throw Error message
const validate = (values) => {
    const errors = {};
    if (!values.employeeName) {
        errors.employeeName = "Enter employee name";
    }
    if (!values.panNo) {
        errors.panNo = "Enter PAN number";
    }
    if (!values.userName) {
        errors.userName = "select userName";
    }
    if (!values.doj) {
        errors.doj = "Enter date of joining";
    }
    if (!values.desc) {
        errors.desc = "Enter Designamtion";
    }
    if (!values.email) {
        errors.email = "Enter email addresss";
    }
    if (!values.employeeId) {
        errors.employeeId = "Enter employee ID";
    }
    if (!values.lob) {
        errors.lob = "Select LOB";
    }
    if (!values.dob) {
        errors.dob = "Enter date of birth";
    }
    if (!values.role) {
        errors.role = "select role";
    }
    if (!values.phNo) {
        errors.phNo = "Enter phone number";
    }
    if (!values.country) {
        errors.country = " Select country";
    }
    if (!values.state) {
        errors.state = "Select state";
    }
    if (!values.city) {
        errors.city = "Select city";
    }
    if (!values.suburb) {
        errors.suburb = "Enter suburb";
    }
    if (!values.entity) {
        errors.entity = "Enter entity";
    }
    return errors;
};
  
  const [isStateDialogue,setIsStateDialogue] = React.useState(false);
  const handleOpen = () => {
     setIsStateDialogue(true);
  };
  const handleClose = () => {
    setIsStateDialogue(false);
  }
  const handlePageChange = (event,value) => {
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
        "user_id" : 1234,
        "rows" : ["id", "employeename","employeeid","phoneno","email","userid","roleid","panno", "dateofjoining","lastdateofworking","status"],
        "filters" : [],
        "sort_by" : [],
        "order" : "asc",
        "pg_no" : 0,
        "pg_size" : 0
     };
    const response = await APIService.getEmployees(data)
    const temp = await response.json();
    const result = temp.data;
    const worksheet = XLSX.utils.json_to_sheet(result);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook,worksheet,"Sheet1");
    XLSX.writeFile(workbook,"EmployeeData.xlsx");
    FileSaver.saveAs(workbook,"demo.xlsx");
  }
  const handleSearch = async () => {
    console.log("clicked")
    setPageLoading(true);
    const data = { 
        "user_id" : 1234,
        "rows" : ["id", "employeename","employeeid","phoneno","email","userid","roleid","panno", "dateofjoining","lastdateofworking","status"],
        "filters" : [],
        "sort_by" : [],
        "order" : "asc",
        "pg_no" : 1,
        "pg_size" : 15,
        "search_key" : searchInput
     };
     const response = await APIService.getEmployees(data);
     const temp = await response.json();
     const result = temp.data;
     const t = temp.total_count;
     setTotalItems(t);
     setExistingEmployees(result);
     setPageLoading(false);
  }
  return (
    <div>
      <Navbar/>
      <div className='flex-col w-full h-full  bg-white'>
        <div className='flex-col'>
            {/* this div will have all the content */}
            <div className='w-full  flex-col px-6'>
                {/* the top section of the div */}
                <div className='h-1/2 w-full  flex justify-between items-center p-2  border-gray-300 border-b-2'>
                   <div className='flex items-center space-x-3'>
                      <div className='rounded-2xl  bg-[#EBEBEB] h-8 w-8 '>
                          <img src={backLink} />
                      </div>
                        
                      <div className='flex-col'>
                          <h1>Manage Employee</h1>
                          <p>Admin &gt; Manage Employee</p>
                      </div>
                   </div>
                   <div className='flex space-x-2 items-center'>

                        <div className='flex'>
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
                                <div className="h-[36px] w-[40px] bg-[#004DD7] flex items-center justify-center rounded-r-lg">
                                    <button onClick={handleSearch}><img className="h-[26px] " src={searchIcon} alt="search-icon" /></button>
                                </div>
                        </div>

                        <div>
                            {/* button */}
                            <button className="bg-[#004DD7] text-white h-[30px] w-[200px] rounded-lg" onClick={handleOpen}>
                                Add New Employee +
                            </button>
                        </div>

                   </div>
                   
                </div>
                <div className='h-12 w-full bg-white'>
                    <div className='w-full h-12 bg-white flex justify-between'>
                    <div className='w-[4.33%] flex'>
                        <div className='p-2'>
                            
                        </div>
                    </div>
                    <div className='w-[8.33%]  flex'>
                        <div className='p-2'>
                              <input className="w-14 bg-[#EBEBEB]"/>
                                   <button className='p-1'><img src={Filter} className='h-[17px] w-[17px]'/></button>
                        </div>
                    </div>
                    <div className='w-[8.33%]  flex'>
                        <div className='p-2'>
                             <input className="w-14 bg-[#EBEBEB]"/>
                                   <button className='p-1'><img src={Filter} className='h-[17px] w-[17px]'/></button>
                        </div>
                    </div>
                    <div className='w-[8.33%]  flex'>
                        <div className='p-2'>
                                  <input className="w-14 bg-[#EBEBEB]"/>
                                   <button className='p-1'><img src={Filter} className='h-[17px] w-[17px]'/></button>
                        </div>
                    </div>
                    <div className='w-[12.33%]  flex'>
                        <div className='p-2'>
                                  <input className="w-14 bg-[#EBEBEB]"/>
                                   <button className='p-1'><img src={Filter} className='h-[17px] w-[17px]'/></button>
                        </div>
                    </div>
                    <div className='w-[8.33%]  flex'>
                        <div className='p-2'>
                                <input className="w-14 bg-[#EBEBEB]"/>
                                   <button className='p-1'><img src={Filter} className='h-[17px] w-[17px]'/></button>
                        </div>
                    </div>
                    <div className='w-[8.33%]  flex'>
                        <div className='p-2'>
                             <input className="w-14 bg-[#EBEBEB]"/>
                                   <button className='p-1'><img src={Filter} className='h-[17px] w-[17px]'/></button>
                        </div>
                    </div>
                    <div className='w-[8.33%]  flex'>
                        <div className='p-2'>
                                 <input className="w-14 bg-[#EBEBEB]"/>
                                   <button className='p-1'><img src={Filter} className='h-[17px] w-[17px]'/></button>
                        </div>
                    </div>
                    <div className='w-[8.33%]  flex'>
                        <div className='p-2'>
                                <input className="w-14 bg-[#EBEBEB]"/>
                                   <button className='p-1'><img src={Filter} className='h-[17px] w-[17px]'/></button>
                        </div>
                    </div>
                    <div className='w-[8.33%]  flex'>
                        <div className='p-2'>
                              <input className="w-14 bg-[#EBEBEB]"/>
                                   <button className='p-1'><img src={Filter} className='h-[17px] w-[17px]'/></button>
                        </div>
                    </div>
                    <div className='w-[8.33%]  flex'>
                        <div className='p-2 '>
                            <input className="w-14 bg-[#EBEBEB]"/>
                            <button className='p-1'><img src={Filter} className='h-[17px] w-[17px]'/></button>
                        </div>
                    </div>
                    <div className='w-[4.33%]  flex'>
                        <div className='p-2'>
                            
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            <div className='w-full h-[400px] bg-white px-6'>
                <div className='w-full h-12 bg-[#F0F6FF] flex justify-between'>
                   <div className='w-[4.33%] flex'>
                      <div className='p-2'>
                         <p>Sr. No</p>
                      </div>
                   </div>
                   <div className='w-[8.33%]  flex'>
                      <div className='p-2'>
                          <p>Employee </p>
                      </div>
                   </div>
                   <div className='w-[8.33%]  flex'>
                      <div className='p-2'>
                          <p>Employee ID</p>
                      </div>
                   </div>
                   <div className='w-[8.33%]  flex'>
                      <div className='p-2'>
                          <p>Phone</p>
                      </div>
                   </div>
                   <div className='w-[12.33%]  flex'>
                      <div className='p-2'>
                          <p>Email</p>
                      </div>
                   </div>
                   <div className='w-[8.33%]  flex'>
                      <div className='p-2'>
                          <p>Role</p>
                      </div>
                   </div>
                   <div className='w-[8.33%]  flex'>
                      <div className='p-2'>
                          <p>Pan No</p>
                      </div>
                   </div>
                   <div className='w-[8.33%]  flex'>
                      <div className='p-2'>
                          <p>Join Date</p>
                      </div>
                   </div>
                   <div className='w-[8.33%]  flex'>
                      <div className='p-2'>
                          <p>Last Date</p>
                      </div>
                   </div>
                   <div className='w-[8.33%]  flex'>
                      <div className='p-2'>
                          <p> Status</p>
                      </div>
                   </div>
                   <div className='w-[4.33%]  flex'>
                      <div className='p-2'>
                          <p>ID</p>
                      </div>
                   </div>
                   <div className='w-[8.33%]  flex'>
                      <div className='p-2'>
                          <p>Edit</p>
                      </div>
                   </div>
                </div>
                <div className='w-full h-[450px] overflow-auto'> 
                {/* we map our items here */}
                {pageLoading && <div className='ml-5 mt-5'><LinearProgress/></div> }
                {!pageLoading && existingEmployees.map((item,index) => {
                    return  <div className='w-full h-14 bg-white flex justify-between border-gray-400 border-b-[1px]'>
                                <div className='w-[4.33%] flex'>
                                <div className='p-2'>
                                    <p>{index + 1 + (currentPage - 1)*currentPages}</p>
                                </div>
                                </div>
                                <div className='w-[8.33%]  flex overflow-hidden'>
                                <div className='p-2'>
                                    <p>{item.employeename} </p>
                                </div>
                                </div>
                                <div className='w-[8.33%]  flex overflow-hidden'>
                                <div className='p-2 '>
                                    <p className='ml-3'>{item.employeeid}</p>
                                </div>
                                </div>
                                <div className='w-[8.33%]  flex overflow-hidden'>
                                <div className='p-2'>
                                    <p>{item.phoneno}</p>
                                </div>
                                </div>
                                <div className='w-[12.33%]  flex overflow-hidden'>
                                <div className='p-2'>
                                    <p>{item.email}</p>
                                </div>
                                </div>
                                <div className='w-[8.33%]  flex overflow-hidden'>
                                <div className='p-2'>
                                    <p>{item.roleid}</p>
                                </div>
                                </div>
                                <div className='w-[8.33%]  flex overflow-hidden'>
                                <div className='p-2'>
                                    <p>{item.panno}</p>
                                </div>
                                </div>
                                <div className='w-[8.33%]  flex overflow-hidden'>
                                <div className='p-2 ml-2'>
                                    <p>{item.dateofjoining}</p>
                                </div>
                                </div>
                                <div className='w-[8.33%]  flex  overflow-hidden'>
                                <div className='p-2'>
                                    <p>{item.lastdateofworking}</p>
                                </div>
                                </div>
                                <div className='w-[8.33%]  flex overflow-hidden'>
                                <div className='p-2 ml-2 flex items-center space-x-2'>
                                    {item.status ? <><div className='w-[7px] h-[7px] rounded-xl bg-green-600'></div>
                                    <p>active</p></> : <><div className='w-[7px] h-[7px] rounded-xl bg-red-600'></div>
                                    <p> inactive</p></>}
                                    
                                </div>
                                </div>
                                <div className='w-[4.33%]  flex overflow-hidden'>
                                <div className='p-2 ml-3'>
                                    <p>{item.id}</p>
                                </div>
                                </div>
                                <div className='w-[8.33%]  flex overflow-hidden items-center space-x-4 ml-3'>
                                
                                          <img className=' h-5 ml-3' src={Edit} alt="edit" />
                                         <button onClick={() => {}}><img className=' h-5' src={Trash} alt="trash" /></button>
                               
                                </div>
                            </div>
                })}
            </div>
            </div>
            
            <div className='w-full h-12 flex justify-between justify-self-end px-6 mt-5 fixed bottom-0 bg-white '>
                {/* footer component */}
                <div className='ml-2'>
                            <div className='flex items-center w-auto h-full'>
                                {/* items */}
                                <Pagination count={Math.ceil(totalItems/currentPages)} onChange={handlePageChange} page={currentPage} />
                                
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
                                            c
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
    <Modal open={isStateDialogue} 
          fullWidth={true}
          maxWidth = {'md'} >
            <div className='flex justify-center mt-16'>
                <div className="w-[1050px] h-auto bg-white rounded-lg">
                    <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-lg">
                        <div className="mr-[410px] ml-[410px]">
                            <div className="text-[16px]">Add New Employee</div>
                        </div>
                        <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                            <button onClick={handleClose}><img onClick={handleClose} className="w-[20px] h-[20px]" src={Cross} alt="cross" /></button>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="h-auto w-full mt-[5px]">
                            <div className="flex gap-[48px] justify-center items-center">
                                <div className=" space-y-[12px] py-[20px] px-[10px]">
                                    <div className="">
                                        <div className="text-[14px]">Employee Name<label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="empName" value={formValues.employeeName} onChange={handleChange} />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.employeeName}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Pan No<label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="panNo" value={formValues.panNo} onChange={handleChange} />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.panNo}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Username<label className="text-red-500">*</label></div>
                                        <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="userName" value={formValues.userName} onChange={handleChange} >
                                            {userName.map(item => (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.userName}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Date of joining<label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="date" name="doj" value={formValues.doj} onChange={handleChange} />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.doj}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Designation<label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="desc" value={formValues.desc} onChange={handleChange} />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.desc}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Email<label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="email" name="email" value={formValues.email} onChange={handleChange} />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.email}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Address Line 1</div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="add" />
                                    </div>
                                </div>
                                <div className=" space-y-[12px] py-[20px] px-[10px]">
                                    <div className="">
                                        <div className="text-[14px]">Employee ID<label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="empId" value={formValues.employeeId} onChange={handleChange} />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.employeeId}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">LOB<label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="lob" value={formValues.lob} onChange={handleChange} />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.lob}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Date of birth<label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="date" name="dob" value={formValues.dob} onChange={handleChange} />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.dob}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Last Date of Working</div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="date" name="lwd" />
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Assign role<label className="text-red-500">*</label></div>
                                        <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="country" value={formValues.role} onChange={handleChange} >
                                            {assignedRoles.map(item => (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.country}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Phone Number<label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="phNo" value={formValues.phNo} onChange={handleChange} />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.phNo}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Address Line 2</div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="add2" />
                                    </div>
                                </div>
                                <div className=" space-y-[12px] py-[20px] px-[10px] ">
                                    <div className="">
                                        <div className="text-[14px]">Country</div>
                                        <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="country" value={formValues.country} onChange={handleChange} >
                                            {selectedCountry.map(item => (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.country}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">State</div>
                                        <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="state" value={formValues.state} onChange={handleChange} >
                                            {selectedState.map(item => (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.state}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">City</div>
                                        <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="city"> value={formValues.city} onChange={handleChange}
                                            {selectedCity.map(item => (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.city}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Suburb</div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="suburb" value={formValues.suburb} onChange={handleChange} />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.suburb}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Zip Code</div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="zipcode" />
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Entity</div>
                                        <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="entity" value={formValues.entity} onChange={handleChange} >
                                            {entity.map(item => (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.entity}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-[10px] flex justify-center items-center"><Checkbox label="Active" />Active</div>
                        <div className="my-[10px] flex justify-center items-center gap-[10px]">
                            <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' type="submit">Save</button>
                            <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleClose}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
    </Modal>
    </div>
  )
}

export default ManageEmployees
