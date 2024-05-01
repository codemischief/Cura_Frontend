import React from 'react';
import { useState, useEffect } from 'react';
import Cross from "../../../assets/cross.png";
import { APIService } from '../../../services/API';
import { Modal, Pagination, LinearProgress, CircularProgress } from "@mui/material";
import Draggable from 'react-draggable';
import Checkbox from '@mui/material/Checkbox';

const EditManageEmployee = (props) => {
    console.log(props.item);
    const [allCountry, setAllCountry] = useState([]);
    const [allState, setAllState] = useState([]);
    const [allCity, setAllCity] = useState([]);
    const [currCountry, setCurrCountry] = useState(-1);
    const [allUsername, setAllUsername] = useState([]);
    const [allRoles, setAllRoles] = useState([]);
    const [allEntities, setAllEntites] = useState([]);
    const [allLOB, setAllLOB] = useState([]);
    const [pageLoading,setPageLoading] = useState(false);
    const [currentstate, setCurrentstate] = useState('')
    const [currentcity, setCurrentcity] = useState("");
    const [currentCountry, setCurrentCountry] = useState("");
    const [allItem, setAllItem] = useState([]);
    const fetchCountryData = async () => {
        const data = { "user_id": 1234, "rows": ["id", "name"], "filters": [], "sort_by": [], "order": "asc", "pg_no": 0, "pg_size": 0 };
        const response = await APIService.getCountries(data)
        const result = (await response.json()).data;
        if (Array.isArray(result.data)) {
            setAllCountry(result.data);
        }
    }
    const fetchStateData = async (id) => {
        // console.log(id);
        console.log(id);
        const data = { "user_id": 1234, "country_id":  id};
        // const data = {"user_id":1234,"rows":["id","state"],"filters":[],"sort_by":[],"order":"asc","pg_no":0,"pg_size":0};
        const response = await APIService.getState(data);
        const result = (await response.json()).data;
        console.log(result)
        setAllState(result)
    }
    const fetchCityData = async (name) => {
        // console.log("Maharashtra");
        // console.log("hy")
        if(name == null) return 
        console.log(name);
        const data = { "user_id": 1234, "state_name" : name };
        const response = await APIService.getCities(data);
        const result = (await response.json()).data;
        console.log(result);
        // console.log(result);
        setAllCity(result);
    }

    const fetchUsersData = async () => {
        // const data = { "user_id":  1234 };
        const data = { "user_id": 1234, };
        const response = await APIService.getUsers(data)
        const result = (await response.json()).data;
        // console.log(result);
        
        if (Array.isArray(result)) {
            setAllUsername(result);
        }
    }

    const fetchRoleData = async () => {
        // const data = { "user_id":  1234 };
        const data = { "user_id": 1234, };
        const response = await APIService.getRoles(data)
        const result = (await response.json()).data;
        console.log(result);

        if (Array.isArray(result)) {
            setAllRoles(result);
        }
    }

    const fetchEntitiesData = async () => {
        // const data = { "user_id":  1234 };
        const data = { "user_id": 1234, };
        const response = await APIService.getEntityAdmin(data)
        const result = (await response.json()).data;
        console.log(result);

        if (Array.isArray(result)) {
            setAllEntites(result);
        }
    }

    const fetchLobData = async () => {
        const data = { 
            "user_id" : 1234,
            "rows" : ["id","name","lob_head","company"],
            "filters" : [],
            "sort_by" : [],
            "order" : "asc",
            "pg_no" : 0,
            "pg_size" : 0
         };
        const response = await APIService.getLob(data);
        const result = (await response.json()).data;
        // console.log(result);

        if (Array.isArray(result)) {
            setAllLOB(result);
        }
    }
    const fetchEmployeeData = async () => {
        setPageLoading(true);
        const data = {
            "user_id" : 1234,
            "table_name" : "employee",
            "item_id" : props.item.id
        }
        console.log(data);
        const response = await APIService.getItembyId(data);
        const result = await response.json();
        setFormValues(result.data);
        console.log(result.data)
        // console.log(formValues.state);
        await fetchCountryData();
        // console.log(result.data.dateofjoining.split('T')[0]);
       setFormValues((existing) => {
          return {...existing, dateofjoining : result.data.dateofjoining ? result.data.dateofjoining.split('T')[0] : null}
       })
       setFormValues((existing) => {
        return {...existing, dob : result.data.dob ? result.data.dob.split('T')[0] : null}
     })
     setFormValues((existing) => {
        return {...existing, lastdateofworking : result.data.lastdateofworking ? result.data.lastdateofworking.split('T')[0] : null}
     })
     setFormValues((existing) => {
        return {...existing, dated :result.data.dated ?  result.data.dated.split('T')[0] : null}
     })
        await fetchStateData(result.data.country);
        await fetchCityData(result.data.state);
        setPageLoading(false);
        console.log(result);
    }
    useEffect(() => {
        fetchEmployeeData();
        fetchCityData(formValues.state);
        fetchEntitiesData();
        fetchRoleData();
        fetchUsersData();
        fetchLobData();
    }, []);

    const handleEdit = async () => {
        const data = {
            "user_id": 1234,
            "id" : formValues.id,
            "employeename": formValues.employeename,
            "employeeid": formValues.employeeid,
            "userid": 1236,
            "roleid": formValues.roleid ,
            "dateofjoining": formValues.dateofjoining,
            "dob": formValues.dob,
            "panno": formValues.panno,
            "status": formValues.status,
            "phoneno": formValues.phoneno,
            "email": formValues.email,
            "addressline1": formValues.addressline1,
            "addressline2": formValues.addressline2,
            "suburb": formValues.suburb , 
            "city": formValues.city,
            "state": formValues.state,
            "country": Number(formValues.country),
            "lobid": formValues.lobid,
            "zip": formValues.zip ,
            "dated": formValues.dated,
            "createdby": 1234,
            "isdeleted": formValues.isdeleted,
            "entityid": Number(formValues.entityid),
            "lastdateofworking": formValues.lastdateofworking,
            "designation": formValues.designation 
        }
        console.log(data);
        if(!validate()) {
            return ;
        }
        console.log('here');
        console.log(data);
        const response = await APIService.editEmployee(data);
        const result = await response.json();
        props.showSuccess();
        console.log(result);
        // props.fetchData();
        // props.handleClose();
    }
    console.log(props.item);
    const [formValues, setFormValues] = useState({});
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const validate = ()  => {
        var res = true;
        if(!formValues.employeename) {
            setFormErrors((existing) => {
               return {...existing,employeename: "Enter Employee name"}
            })
            res = false;
        }else {
            setFormErrors((existing) => {
                return {...existing,employeename: ""}
             })
        }
        if(!formValues.panno) {
            setFormErrors((existing) => {
               return  {...existing,panno: "Enter Pan Number"}
            })
            res = false;
        }else {
            setFormErrors((existing) => {
                return  {...existing,panno: ""}
             })
        }
        // if(!formValues.userName) {
        //     setFormErrors((existing) => {
        //         return {...existing,userName: "Select username"}
        //     })
        //     res = false;
        // }else {
        //     setFormErrors((existing) => {
        //         return {...existing,userName: ""}
        //     })
        // }
        if(!formValues.dateofjoining) {
            setFormErrors((existing) => {
                return {...existing,dateofjoining: "Enter date of joining"}
            })
            res = false;
        }else {
            setFormErrors((existing) => {
                return {...existing,dateofjoining: ""}
            })
        }
        if(!formValues.designation) {
            setFormErrors((existing) => {
                return {...existing,designation: "Enter Designation"}
            })
            res = false;
        }else {
            setFormErrors((existing) => {
                return {...existing,designation: ""}
            })
        }
        if(!formValues.email) {
            setFormErrors((existing) => {
                return {...existing,email: "Enter email address"}
            })
            res = false;
        }else {
            setFormErrors((existing) => {
                return {...existing,email: ""}
            })
        }
        if(!formValues.employeeid) {
            setFormErrors((existing) => {
                return {...existing,employeeid: "Enter Employee Id"}
            })
            res = false;
        }else {
            setFormErrors((existing) => {
                return {...existing,employeeid: ""}
            })
        }
        if(!formValues.lobid) {
            setFormErrors((existing) => {
                return {...existing,lobid: "Select LOB"}
            })
            res = false;
        }else {
            setFormErrors((existing) => {
                return {...existing,lobid: ""}
            })
        }
        if(!formValues.dob) {
            setFormErrors((existing) => {
                return {...existing,dob: "enter date of birth"}
            })
            res = false;
        }else {
            setFormErrors((existing) => {
                return {...existing,dob: ""}
            })
        }
        if(!formValues.roleid) {
            setFormErrors((existing) => {
                return {...existing,roleid: "Select Role"}
            })
            res = false;
        }else {
            setFormErrors((existing) => {
                return {...existing,roleid: ""}
            })
        }
        if(!formValues.phoneno) {
            setFormErrors((existing) => {
                return {...existing,phoneno: "Enter phone number"}
            })
            res = false;
        }else {
            setFormErrors((existing) => {
                return {...existing,phoneno: ""}
            })
        }
        if(!formValues.country) {
            setFormErrors((existing) => {
                return {...existing,country: "Select country"}
            })
            res = false;
        }else {
            setFormErrors((existing) => {
                return {...existing,country: ""}
            })
        }
        if(!formValues.state) {
            setFormErrors((existing) => {
                return {...existing,state: "Select state"}
            })
            res = false;
        }else {
            setFormErrors((existing) => {
                return {...existing,state: ""}
            })
        }
        if(!formValues.city) {
            setFormErrors((existing) => {
                return {...existing,city: "Select city"}
            })
            res = false;
        }else {
            setFormErrors((existing) => {
                return {...existing,city: ""}
            })
        }
        if(!formValues.entityid) {
            setFormErrors((existing) => {
                return {...existing,entityid: "Select Entity"}
            })
            res = false;
        }else {
            setFormErrors((existing) => {
                return {...existing,entityid: ""}
            })
        }
        return res;
    }
    return (
        <div>
            
            <Modal open={props.isOpen}
                fullWidth={true}
                maxWidth={'md'}
                className='flex justify-center items-center'
            >
                
                <div className='flex justify-center'>
                    <Draggable>
                    <div className="w-[1050px] h-auto bg-white rounded-lg">
                        
                        <div className="h-[40px] bg-[#EDF3FF] justify-center flex items-center rounded-lg">
                            <div className="mr-[360px] ml-[360px]">
                                <div className="text-[16px]">Update Employee Details</div>
                            </div>
                            <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                                <button onClick={props.handleClose}><img className="w-[20px] h-[20px]" src={Cross} alt="cross" /></button>
                            </div>
                        </div>
                        
                        {pageLoading  &&  <div className='flex justify-center items-center mt-9 space-x-7'><CircularProgress/><h1>Fetching Employee Data</h1></div>  }
                        {!pageLoading && <div className="h-auto w-full mt-[5px]">
                                <div className="flex gap-[48px] justify-center ">
                                    <div className=" space-y-[12px] py-[20px] px-[10px]">
                                        <div className="">
                                            <div className="text-[13px]">Employee Name<label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="employeename" value={formValues.employeename} onChange={handleChange} />
                                            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.employeeName}</div> */}
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Pan No<label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="panno" value={formValues.panno} onChange={handleChange} />
                                            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.panNo}</div> */}
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Username: <label className="text-red-500">*</label></div>
                                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                                                name="userName"
                                                value={formValues.userName}
                                                onChange={handleChange}
                                            >{allUsername &&allUsername.map(ele => (
                                                (formValues.userid === ele.id)?
                                                <option>{ele.name}</option>:""))}
                                                {allUsername && allUsername.map(item => (
                                                    <option value={item.name} >
                                                        {item.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Date of joining<label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="date" name="dateofjoining" value={formValues.dateofjoining} onChange={handleChange} />
                                            
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Designation<label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="designation" value={formValues.designation} onChange={handleChange} />
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.desc}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Email<label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="email" name="email" value={formValues.email} onChange={handleChange} />
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.email}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Address Line 1</div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="addressline1" value={formValues.addressline1} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className=" space-y-[12px] py-[20px] px-[10px]">
                                        <div className="">
                                            <div className="text-[13px]">Employee ID<label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="employeeid" value={formValues.employeeid} onChange={handleChange} />
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.employeeid}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">LOB <label className="text-red-500">*</label></div>
                                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                                                name="lob"
                                                value={formValues.lob}
                                                defaultValue="Select lob"
                                                onChange={handleChange}
                                            >{allLOB &&allLOB.map(ele => (
                                                (formValues.lob === ele.id)?
                                                <option>{ele.name}</option>:""))}
                                                {allLOB && allLOB.map(item => (
                                                    <option value={item.name} >
                                                        {item.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Date of birth<label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="date" name="dob" value={formValues.dob} onChange={handleChange} />
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.dob}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Last Date of Working</div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="date" name="lastdateofworking" value={formValues.lastdateofworking} onChange={handleChange} />
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Assign Role<label className="text-red-500">*</label></div>
                                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                                                name="roleid"
                                                value={formValues.roleid}
                                                defaultValue="Select Role"
                                                onChange={handleChange}
                                            >{allRoles &&allRoles.map(ele => (
                                                (formValues.roleid === ele.name)?
                                                <option>{ele.name}</option>:((formValues.roleid === "NA_None")?<option>NA_None</option>:" ")))}
                                                {allRoles && allRoles.map(item => (
                                                    <option value={item.name} >
                                                        {item.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.role}</div> */}
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Phone Number<label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="phoneno" value={formValues.phoneno} onChange={handleChange} />
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.phoneno}</div>
                                            
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Address Line 2</div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="addressline2" value={formValues.addressline2} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className=" space-y-[12px] py-[20px] px-[10px] ">
                                        <div className="">
                                            <div className="text-[13px]">Country Name<label className="text-red-500">*</label></div>
                                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                                                name="country"
                                                value={formValues.country}
                                                defaultValue="Select Country"
                                                onChange={e => {
                                                    setCurrCountry(e.target.value);
                                                    setAllState([])
                                                    fetchStateData(e.target.value);
                                                    setAllCity([])
                                                    
                                                    setFormValues((existing) => {
                                                        const newData = { ...existing, country: e.target.value }
                                                        return newData;
                                                    })
                                                    setFormValues((existing) => {
                                                        const newData = { ...existing, state: null }
                                                        return newData;
                                                    })
                                                    setFormValues((existing) => {
                                                        const newData = { ...existing, city: null }
                                                        return newData;
                                                    })
                                                     
                                                    // fetchStateData(res);
                                                }}
                                            >
                                                <option value="none" hidden={true}>Select a Country</option>
                                                {allCountry && allCountry.map(item => (
                                                    <option value={item[0]} >
                                                        {item[1]}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.country}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">State Name<label className="text-red-500">*</label></div>
                                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                                                name="state"
                                                value={formValues.state}
                                                onChange={e => {
                                                    fetchCityData(e.target.value);
                                                    setFormValues((existing) => {
                                                        const newData = { ...existing, state: e.target.value }
                                                        return newData;
                                                    })

                                                }}
                                            >
                                                {console.log(formValues.state)}
                                                <option value={null} > Select A State</option>
                                                {allState && allState.map((item) => {
                                                    // if(item[0])
                                                    return <option value={item[0]}>
                                                        {item[0]}
                                                    </option>
                                                    // if(item[0] == formValues.state) {
                                                    //     return <option value={item[0]} selected>
                                                    //         {item[0]}
                                                    //     </option>
                                                    // }else {
                                                    //     return (<option value={item[0]} >
                                                    //         {item[0]}
                                                    //     </option>);
                                                    // }
                                                 })}
                                            </select>
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.state}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">City Name <label className="text-red-500">*</label></div>
                                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                                                name="city"
                                                value={formValues.city}
                                                onChange={e => {
                                                    setFormValues((existing) => {
                                                        const newData = { ...existing, city: e.target.value }
                                                        return newData;
                                                    })

                                                }}
                                            >
                                                <option value={null}> Select City</option>
                                                {allCity.map((item) => {
                                                    if(item.id == formValues.city) {

                                                        return <option value={item.id} selected>
                                                            {item.city}
                                                        </option>
                                                    }else {
                                                        return <option value={item.id}>
                                                              {item.city}
                                                        </option>
                                                    }
                                                    return <option value={item.id}>{item.city}</option>
                                                 })}
                                            </select>
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.city}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Suburb</div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="suburb" value={formValues.suburb} onChange={handleChange} />
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.suburb}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Zip Code</div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="zip" value={formValues.zip} onChange={handleChange} />
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Entities <label className="text-red-500">*</label></div>
                                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                                                name="entityid"
                                                value={formValues.entityid}
                                                defaultValue="Select entity"
                                                onChange={handleChange}
                                            ><option>Select Entity</option>
                                                {allEntities && allEntities.map(item => (
                                                    <option value={item[0]} >
                                                        {item[1]}
                                                    </option>
                                                ))}
                                            </select>
                                            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.entity}</div> */}
                                        </div>
                                    </div>
                                </div>
                                </div>}
                            <div className="mt-[10px] flex justify-center items-center"><input
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
                            <div className="my-[10px] flex justify-center items-center gap-[10px]">
                                <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' onClick={handleEdit} >Save</button>
                                <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={props.handleClose}>Cancel</button>
                            </div>
                        {/* </form> */}
                    </div>
                    </Draggable>
                </div>
            </Modal>
        </div>
    )
}
export default EditManageEmployee