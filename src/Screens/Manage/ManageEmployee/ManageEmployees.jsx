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
import { Modal } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';

const ManageEmployees = () => {
  // we have the module here
    const [existingEmployees,setExistingEmployees] = useState([]);
    useEffect(()=> {
        fetch("/getEmployees")
        .then((res) => res.json())
        .then((data) =>{
        setExistingEmployees(data)
        
        })
    },[]);
    // hardcoded for dropdown instances ********* start*************
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

// handle changes in input form
const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
};
const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues)); // validate form and set error message
    setIsSubmit(true);
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
                                />
                                <div className="h-[36px] w-[40px] bg-[#004DD7] flex items-center justify-center rounded-r-lg">
                                    <img className="h-[26px] " src={searchIcon} alt="search-icon" />
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
                          <p> Pan No</p>
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
                <div className='w-full h-[350px] overflow-auto'> 
                {/* we map our items here */}
                {existingEmployees.map((item,index) => {
                    return  <div className='w-full h-12 bg-white flex justify-between'>
                                <div className='w-[4.33%] flex'>
                                <div className='p-2'>
                                    <p>{index+1}</p>
                                </div>
                                </div>
                                <div className='w-[8.33%]  flex'>
                                <div className='p-2'>
                                    <p>{item.empName} </p>
                                </div>
                                </div>
                                <div className='w-[8.33%]  flex'>
                                <div className='p-2'>
                                    <p>{item.empId}</p>
                                </div>
                                </div>
                                <div className='w-[8.33%]  flex'>
                                <div className='p-2'>
                                    <p>{item.phoneNo}</p>
                                </div>
                                </div>
                                <div className='w-[12.33%]  flex'>
                                <div className='p-2'>
                                    <p>{item.empEmail}</p>
                                </div>
                                </div>
                                <div className='w-[8.33%]  flex'>
                                <div className='p-2'>
                                    <p>{item.role}</p>
                                </div>
                                </div>
                                <div className='w-[8.33%]  flex'>
                                <div className='p-2'>
                                    <p>{item.panNo}</p>
                                </div>
                                </div>
                                <div className='w-[8.33%]  flex'>
                                <div className='p-2'>
                                    <p>{item.dateJoining}</p>
                                </div>
                                </div>
                                <div className='w-[8.33%]  flex'>
                                <div className='p-2'>
                                    <p>{item.lastDate}</p>
                                </div>
                                </div>
                                <div className='w-[8.33%]  flex'>
                                <div className='p-2'>
                                    <p> {item.empStatus}</p>
                                </div>
                                </div>
                                <div className='w-[4.33%]  flex'>
                                <div className='p-2'>
                                    <p>{item.empId}</p>
                                </div>
                                </div>
                                <div className='w-[8.33%]  flex'>
                                <div className='p-2'>
                                    <p>Edit</p>
                                </div>
                                </div>
                            </div>
                })}
            </div>
            </div>
            
            <div className='w-full h-12 flex justify-between justify-self-end px-6 '>
                {/* footer component */}
                <div className='ml-2'>
                    <div className='flex items-center w-auto h-full'>
                       {/* items */}
                       <div className='h-12 flex justify-center items-center'>
                          <img src={backLink} className='h-2/4'/>
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
                           <img src={nextIcon} className='h-2/4'/>
                       </div>
                    </div>
                    <div>
                        {/* items per page */}
                    </div>
                </div>
                <div className='flex mr-10 justify-center items-center space-x-2 '>
                    <div className='border-solid border-black border-[0.5px] rounded-md w-28 h-10 flex items-center justify-center space-x-1' >
                       {/* refresh */}
                       <p>Refresh</p>
                       <img src={refreshIcon} className='h-1/2'/>
                    </div>
                    <div className='border-solid border-black border-[1px] w-28 rounded-md h-10 flex items-center justify-center space-x-1'>
                        {/* download */}
                        <p>Download</p>
                        <img src={downloadIcon} className='h-1/2'/>
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
                            <Link to="/manageemployees"><img onClick={handleClose} className="w-[20px] h-[20px]" src={Cross} alt="cross" /></Link>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="h-auto w-full mt-[5px] ">
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
