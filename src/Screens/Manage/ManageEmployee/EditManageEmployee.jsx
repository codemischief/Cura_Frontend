import React from 'react';
import { useState, useEffect } from 'react';
import Cross from "../../../assets/cross.png";
import { APIService } from '../../../services/API';
import { Modal, Pagination, LinearProgress, CircularProgress, MenuItem } from "@mui/material";
import Draggable from 'react-draggable';
import Checkbox from '@mui/material/Checkbox';
import DropDown from '../../../Components/Dropdown/Dropdown';
import UsernameDropDown from '../../../Components/Dropdown/UsernameDropDown';
import useAuth from '../../../context/JwtContext';
import ClientPropertySelectNative from '../../../Components/common/select/ClientPropertySelectNative';
const EditManageEmployee = (props) => {
    const {user} = useAuth()
    console.log(props.item);
    const [allCountry, setAllCountry] = useState([]);
    const [allState, setAllState] = useState([]);
    const [allCity, setAllCity] = useState([]);
    const [currCountry, setCurrCountry] = useState(-1);
    const [allUsername, setAllUsername] = useState([]);
    const [allRoles, setAllRoles] = useState([]);
    const [allEntities, setAllEntites] = useState([]);
    const [allLOB, setAllLOB] = useState([]);
    const [editPageLoading, setEditPageLoading] = useState(false);
    const [currentstate, setCurrentstate] = useState('')
    const [currentcity, setCurrentcity] = useState("");
    const [currentCountry, setCurrentCountry] = useState("");
    const [allItem, setAllItem] = useState([]);
    const fetchCountryData = async () => {
        const data = { "user_id": user.id, "rows": ["id", "name"], "filters": [], "sort_by": [], "order": "asc", "pg_no": 0, "pg_size": 0 };
        const response = await APIService.getCountries(data)
        const result = (await response.json()).data;
        setAllCountry(result)
    }
    const fetchStateData = async (id) => {
        // console.log(id);
        console.log(id);
        const data = { "user_id": user.id, "country_id": id };
        // const data = {"user_id":user.id,"rows":["id","state"],"filters":[],"sort_by":[],"order":"asc","pg_no":0,"pg_size":0};
        const response = await APIService.getState(data);
        const result = (await response.json()).data;
        console.log(result)
        setAllState(result)
    }
    const fetchCityData = async (name) => {
        // console.log("Maharashtra");
        // console.log("hy")
        if (name == null) return
        console.log(name);
        const data = { "user_id": user.id, "state_name": name };
        const response = await APIService.getCities(data);
        const result = (await response.json()).data;
        console.log(result);
        // console.log(result);
        setAllCity(result);
    }
    function convertToIdNameObject(items) {
        const idNameObject = {};
        items.forEach((item) => {
          idNameObject[item.id] = {
            name : item.name,
            username : item.username
          }
        });
        return idNameObject;
    }
    const fetchUsersData = async () => {
        // const data = { "user_id":  user.id };
        const data = { "user_id": user.id, };
        const response = await APIService.getUsers(data)
        const result = (await response.json()).data;
        setAllUsername(convertToIdNameObject(result))
    }

    const fetchRoleData = async () => {
        // const data = { "user_id":  user.id };
        const data = { "user_id": user.id, };
        const response = await APIService.getRoles(data)
        const result = (await response.json()).data;
        console.log(result);

        if (Array.isArray(result)) {
            setAllRoles(result);
        }
    }

    const fetchEntitiesData = async () => {
        // const data = { "user_id":  user.id };
        const data = { "user_id": user.id, };
        const response = await APIService.getEntityAdmin(data)
        const result = (await response.json()).data;
        console.log(result);

        if (Array.isArray(result)) {
            setAllEntites(result);
        }
    }

    const fetchLobData = async () => {
        const data = {
            "user_id": user.id,
            "rows": ["id", "name", "lob_head", "company"],
            "filters": [],
            "sort_by": [],
            "order": "asc",
            "pg_no": 0,
            "pg_size": 0
        };
        const response = await APIService.getLob(data);
        const result = (await response.json()).data;
        // console.log(result);

        if (Array.isArray(result)) {
            setAllLOB(result);
        }
    }
    const fetchEmployeeData = async () => {
        setEditPageLoading(true);
        const data = {
            "user_id": user.id,
            "table_name": "employee",
            "item_id": props.item.id
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
            return { ...existing, dateofjoining: result.data.dateofjoining ? result.data.dateofjoining.split('T')[0] : null }
        })
       
        setFormValues((existing) => {
            return { ...existing, dob: result.data.dob ? result.data.dob.split('T')[0] : null }
        })
        setFormValues((existing) => {
            return { ...existing, lastdateofworking: result.data.lastdateofworking ? result.data.lastdateofworking.split('T')[0] : null }
        })
        setFormValues((existing) => {
            return { ...existing, lob : result.data.lobid }
        })
        setFormValues((existing) => {
            return { ...existing, role : result.data.roleid }
        })
        setFormValues((existing) => {
            return { ...existing, userName : result.data.userid }
        })

        setFormValues((existing) => {
            return { ...existing, dated: result.data.dated ? result.data.dated.split('T')[0] : null }
        })
        await fetchStateData(result.data.country);
        await fetchCityData(result.data.state);
        setEditPageLoading(false);
        props.setPageLoading(false)
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
            "user_id": user.id,
            "id": formValues.id,
            "employeename": formValues.employeename,
            "employeeid": formValues.employeeid,
            "userid": formValues.userName,
            "roleid": formValues.role,
            "dateofjoining": formValues.dateofjoining,
            "dob": formValues.dob,
            "panno": formValues.panno,
            "status": formValues.status,
            "phoneno": formValues.phoneno,
            "email": formValues.email,
            "addressline1": formValues.addressline1,
            "addressline2": formValues.addressline2,
            "suburb": formValues.suburb,
            "city": formValues.city,
            "state": formValues.state,
            "country": Number(formValues.country),
            "lobid": formValues.lob,
            "zip": formValues.zip,
            "dated": formValues.dated,
            "createdby": user.id,
            "isdeleted": formValues.isdeleted,
            "entityid": Number(formValues.entityid),
            "lastdateofworking": formValues.lastdateofworking,
            "designation": formValues.designation
        }
        console.log(data);
        if (!validate()) {
            return;
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

    
    const initialValues = {
        employeeName: null,
        panNo: null,
        userName: user.id,
        doj: null,
        designation: null,
        email: null,
        addressLine1: null,
        employeeId: null,
        lob: null,
        dob: null,
        lastDOW: null,
        role: null,
        phNo: null,
        status: false,
        addressLine2: null,
        country: 5,
        state: "Maharashtra",
        city: 847,
        suburb: null,
        zipCode: null,
        entity: 1
    }
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const validate = () => {
        var res = true;
        if (!formValues.employeename) {
            setFormErrors((existing) => {
                return { ...existing, employeename: "Enter Employee Name" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, employeename: "" }
            })
        }
        if (!formValues.panno) {
            setFormErrors((existing) => {
                return { ...existing, panno: "Enter Pan Number" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, panno: "" }
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
        if (!formValues.dateofjoining) {
            setFormErrors((existing) => {
                return { ...existing, dateofjoining: "Enter Date Of Joining" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, dateofjoining: "" }
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
                return { ...existing, email: "Enter Email Address" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, email: "" }
            })
        }
        if (!formValues.employeeid) {
            setFormErrors((existing) => {
                return { ...existing, employeeid: "Enter Employee Id" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, employeeid: "" }
            })
        }
        if (!formValues.dob) {
            setFormErrors((existing) => {
                return { ...existing, dob: "Enter Date Of Birth" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, dob: "" }
            })
        }
        // if (!formValues.roleid) {
        //     setFormErrors((existing) => {
        //         return { ...existing, roleid: "Select Role" }
        //     })
        //     res = false;
        // } else {
        //     setFormErrors((existing) => {
        //         return { ...existing, roleid: "" }
        //     })
        // }
        if (!formValues.phoneno) {
            setFormErrors((existing) => {
                return { ...existing, phoneno: "Enter Phone Number" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, phoneno: "" }
            })
        }
        if (!formValues.country) {
            setFormErrors((existing) => {
                return { ...existing, country: "Select Country" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, country: "" }
            })
        }
        if (!formValues.state) {
            setFormErrors((existing) => {
                return { ...existing, state: "Select State" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, state: "" }
            })
        }
        if (!formValues.city) {
            setFormErrors((existing) => {
                return { ...existing, city: "Select City" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, city: "" }
            })
        }
        if (!formValues.entityid) {
            setFormErrors((existing) => {
                return { ...existing, entityid: "Select Entity" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, entityid: "" }
            })
        }
        if (!formValues.suburb) {
            setFormErrors((existing) => {
                return { ...existing, suburb: "Enter Suburb" }
            })
            res = false;
        } else {
            console.log('issue is in empname')
            setFormErrors((existing) => {
                return { ...existing, suburb: "" }
            })
        }
        if (!formValues.userName) {
            setFormErrors((existing) => {
                return { ...existing, username: "Select Username" }
            })
            res = false;
        } else {
            console.log('issue is in empname')
            setFormErrors((existing) => {
                return { ...existing, username: "" }
            })
        }
        return res;
    }
    const close = () =>{
        props.handleClose();
        props.showCancel();
    }
    return (
        <div>

            <Modal open={props.isOpen}
                fullWidth={true}
                maxWidth={'md'}
                className='flex justify-center items-center'
            >

                <div className='flex justify-center'>
                    <Draggable handle='div.move'>
                        <div className="w-[1050px] h-auto bg-white rounded-lg">
                            <div className='move cursor-move'>

                            <div className="h-[40px] bg-[#EDF3FF] justify-center flex items-center rounded-lg relative">
                                <div className="mr-[360px] ml-[360px]">
                                    <div className="text-[16px]">Edit Employee</div>
                                </div>
                                <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white absolute right-2">
                                    <button onClick={() => {close()}}><img className="w-[20px] h-[20px]" src={Cross} alt="cross" /></button>
                                </div>
                            </div>

                            </div>
                            {editPageLoading && <div className='flex justify-center items-center mt-9 space-x-7'><CircularProgress /><h1>Fetching Employee Data</h1></div>}
                            {!editPageLoading && <div className="h-auto w-full mt-[5px]">
                                <div className="flex gap-[48px] justify-center ">
                                    <div className=" space-y-5 py-[20px] px-[10px]">
                                        <div className="">
                                            <div className="text-[13px]">Employee Name <label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="employeename" value={formValues.employeename} onChange={handleChange} />
                                            <div className="height-[10px] w-full text-[9.5px] text-[#CD0000] absolute ">{formErrors.employeename}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Pan No <label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="panno" value={formValues.panno} onChange={handleChange} />
                                            <div className="height-[10px] w-full text-[9.5px] text-[#CD0000] absolute ">{formErrors.panno}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Username <label className="text-red-500">*</label></div>
                                            {/* <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                                                name="userName"
                                                value={formValues.userName}
                                                onChange={handleChange}
                                            >
                                                {allUsername && allUsername.map((item) => {
                                                    return <option value={item.id}>
                                                          {item.name}
                                                    </option>
                                                })}
                                            </select> */}
                                             <ClientPropertySelectNative
                        data={Object.keys(allUsername)}
                        value={allUsername?.[formValues.userName]?.name ? allUsername?.[formValues.userName]?.name:null}
                        placeholder="Select Username"
                        isSticky={true}
                        menuMaxHeight="18rem"
                        noDataText="Select Username"
                        headerText={{
                            first : 'Name',
                            second : 'Username'
                        }}
                        renderData={(item) => {
                            return (
                              <MenuItem value={item} key={item} sx={{ width : '230px', gap : '5px', fontSize : '12px'}}>
                                <p className="w-[50%] " style={{ overflowWrap: 'break-word', wordWrap: 'break-word', whiteSpace: 'normal', margin: 0 }}>
                                   {allUsername[item].name}
                                </p>
                                <p className='w-[50%]' style={{ overflowWrap: 'break-word', wordWrap: 'break-word', whiteSpace: 'normal', margin: 0 }}>
                                  {allUsername[item].username}
                                </p>
                                
                               
                              </MenuItem>
                            );
                          }}
                          onChange={(e) => {
                            const temp = {...formValues}
                            temp.userName = e.target.value 
                            setFormValues(temp)
                            
                           }}
                        />
                                            {/* <UsernameDropDown options={allUsername} initialValue="Select Username" leftLabel="User ID" rightLabel="Username" leftAttr="id" rightAttr="name" toSelect="name" handleChange={handleChange} formValueName="userName" value={formValues.userName} idName="id"/>
                                            <div className="height-[10px] w-full text-[9.5px] text-[#CD0000] absolute ">{formErrors.username}</div> */}
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Date of joining <label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="date" name="dateofjoining" value={formValues.dateofjoining} onChange={handleChange} />
                                            <div className="height-[10px] w-full text-[9.5px] text-[#CD0000] absolute  ">{formErrors.dateofjoining}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Designation <label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="designation" value={formValues.designation} onChange={handleChange} />
                                            <div className="height-[10px] w-full text-[9.5px] text-[#CD0000] absolute ">{formErrors.designation}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Email <label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="email" name="email" value={formValues.email} onChange={handleChange} />
                                            <div className="height-[10px] w-full text-[9.5px] text-[#CD0000] absolute ">{formErrors.email}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Address Line 1 </div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="addressline1" value={formValues.addressline1} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className=" space-y-5 py-[20px] px-[10px]">
                                        <div className="">
                                            <div className="text-[13px]">Employee ID <label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="employeeid" value={formValues.employeeid} onChange={handleChange} />
                                            <div className="height-[10px] w-full text-[9.5px] text-[#CD0000] absolute ">{formErrors.employeeid}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">LOB </div>
                                            {console.log(formValues.lob)}
                                            <select className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                                                name="lob"
                                                value={formValues.lob}
                                                defaultValue="Select lob"
                                                onChange={handleChange}
                                            >{allLOB && allLOB.map((item) => {
                                                return <option value={item.id} >
                                                        {item.name}
                                                    </option>
                                            })}
                                            </select>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Date of birth <label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="date" name="dob" value={formValues.dob} onChange={handleChange} />
                                            <div className="height-[10px] w-full text-[9.5px] text-[#CD0000] absolute ">{formErrors.dob}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Last Date of Working</div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="date" name="lastdateofworking" value={formValues.lastdateofworking} onChange={handleChange} />
                                        </div>
                                        {/* <div className="">
                                            <div className="text-[13px]">Assign Role <label className="text-red-500">*</label></div>
                                            <select className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                                                name="role"
                                                value={formValues.role}
                                                defaultValue="Select Role"
                                                onChange={handleChange}
                                            >
                                                {allRoles && allRoles.map((item) => {
                                                    return <option value={item.id}>
                                                         {item.name}
                                                    </option>
                                                }
                                                
                                                )}
                                            </select>
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.role}</div>
                                        </div> */}
                                        <div className="">
                                            <div className="text-[13px]">Zip Code</div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="zip" value={formValues.zip} onChange={handleChange} />
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Phone Number <label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="phoneno" value={formValues.phoneno} onChange={handleChange} />
                                            <div className="height-[10px] w-full text-[9.5px] text-[#CD0000] absolute ">{formErrors.phoneno}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Address Line 2</div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="addressline2" value={formValues.addressline2} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className=" space-y-5 py-[20px] px-[10px] ">
                                        <div className="">
                                            <div className="text-[13px]">Country <label className="text-red-500">*</label></div>
                                            <select className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
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
                                                    <option value={item.id} >
                                                        {item.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="height-[10px] w-full text-[9.5px] text-[#CD0000] absolute ">{formErrors.country}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">State <label className="text-red-500">*</label></div>
                                            <select className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
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
                                                <option value={null} hidden> Select A State</option>
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
                                            <div className="height-[10px] w-full text-[9.5px] text-[#CD0000] absolute ">{formErrors.state}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">City <label className="text-red-500">*</label></div>
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
                                                <option value={null} hidden> Select City</option>
                                                {allCity.map((item) => {
                                                    if (item.id == formValues.city) {

                                                        return <option value={item.id} selected>
                                                            {item.city}
                                                        </option>
                                                    } else {
                                                        return <option value={item.id}>
                                                            {item.city}
                                                        </option>
                                                    }
                                                    return <option value={item.id}>{item.city}</option>
                                                })}
                                            </select>
                                            <div className="height-[10px] w-full text-[9.5px] text-[#CD0000] absolute ">{formErrors.city}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Suburb <label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="suburb" value={formValues.suburb} onChange={handleChange} />
                                            <div className="height-[10px] w-full text-[9.5px] text-[#CD0000] absolute ">{formErrors.suburb}</div>
                                        </div>
                                        
                                        <div className="">
                                            <div className="text-[13px]">Entity <label className="text-red-500">*</label></div>
                                            <select className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
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
                                            <div className="height-[10px] w-full text-[9.5px] text-[#CD0000] absolute ">{formErrors.entityid}</div>
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
                                <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={() => {close()}}>Cancel</button>
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