import React from 'react';
import { useState, useEffect } from 'react';
import Cross from "../../../assets/cross.png";
import { APIService } from '../../../services/API';
import { Modal, Pagination, LinearProgress } from "@mui/material";
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
    const fetchCountryData = async () => {
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
        const data = { "user_id": 1234, "state_id": id };
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
        // const data = { "user_id":  1234 };
        const data = { "user_id": 1234, };
        const response = await APIService.getUsers(data)
        const result = (await response.json()).data;
        console.log(result.data);
        
        if (Array.isArray(result.data)) {
            setAllUsername(result.data);
        }
    }

    const fetchRoleData = async () => {
        // const data = { "user_id":  1234 };
        const data = { "user_id": 1234, };
        const response = await APIService.getRoles(data)
        const result = (await response.json()).data;
        console.log(result.data);

        if (Array.isArray(result.data)) {
            setAllRoles(result.data);
        }
    }

    const fetchEntitiesData = async () => {
        // const data = { "user_id":  1234 };
        const data = { "user_id": 1234, };
        const response = await APIService.getEntityAdmin(data)
        const result = (await response.json()).data;
        console.log(result.data);

        if (Array.isArray(result.data)) {
            setAllEntites(result.data);
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
        console.log(result.data);

        if (Array.isArray(result.data)) {
            setAllLOB(result.data);
        }
    }

    useEffect(() => {
        fetchCountryData();
        fetchEntitiesData();
        fetchRoleData();
        fetchUsersData();
        fetchLobData();
    }, []);

    const handleEdit = async () => {
        const data = {
            "user_id": 1234,
            "id": props.item.id,
            "personname": formValues.personname,
            "suburb": formValues.suburb,
            "city": formValues.city,
            "state": formValues.state,
            "country": formValues.country,
            "propertylocation": formValues.propertyLocation,
            "possibleservices": formValues.possibleServices,
            "dated": "2024-01-01 00:00:00",
            "createdby": 1234,
            "isdeleted": false

        }
        const response = await APIService.editProspects(data);
        props.handleClose();
        props.fetchData();
    }

    const initialValues = {
        employeeName: "",
        panNo: "",
        userName: "",
        doj: "",
        designation: "",
        email: "",
        addressLine1:"",
        employeeId: "",
        lob: "",
        dob: "",
        lastDOW:"",
        role: "",
        phNo: "",
        addressLine2:"",
        country: "",
        state: "",
        city: "",
        suburb: "",
        zipCode:"",
        entity: ""

    };
    const [formValues, setFormValues] = useState(props.item);
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

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
    return (
        <div>
            <Modal open={props.isOpen}
                fullWidth={true}
                maxWidth={'md'}
                className='flex justify-center items-center'
            >
                <div className='flex justify-center'>
                    <div className="w-[1050px] h-auto bg-white rounded-lg">
                        <div className="h-[40px] bg-[#EDF3FF] justify-center flex items-center rounded-lg">
                            <div className="mr-[410px] ml-[410px]">
                                <div className="text-[16px]">Update Employee Details</div>
                            </div>
                            <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                                <button onClick={props.handleClose}><img className="w-[20px] h-[20px]" src={Cross} alt="cross" /></button>
                            </div>
                        </div>
                        <form >
                            <div className="h-auto w-full mt-[5px]">
                                <div className="flex gap-[48px] justify-center items-center">
                                    <div className=" space-y-[12px] py-[20px] px-[10px]">
                                        <div className="">
                                            <div className="text-[14px]">Employee Name<label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="employeename" value={formValues.employeename} onChange={handleChange} />
                                            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.employeeName}</div> */}
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Pan No<label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="panno" value={formValues.panno} onChange={handleChange} />
                                            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.panNo}</div> */}
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Username <label className="text-red-500">*</label></div>
                                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm"
                                                name="userName"
                                                value={formValues.userid}
                                                defaultValue="Select Username"
                                                onChange={e => {
                                                    // fetchCityData(e.target.value);
                                                    console.log(e.target.value);
                                                    setFormValues((existing) => {
                                                        const newData = { ...existing, entity: e.target.value }
                                                        return newData;
                                                    })

                                                }}
                                            >
                                                {allUsername && allUsername.map(item => (
                                                    <option value={item.id} >
                                                        {item.city}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Date of joining<label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="date" name="doj" value={formValues.doj} onChange={handleChange} />
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.doj}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Designation<label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="designation" value={formValues.designation} onChange={handleChange} />
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.desc}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Email<label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="email" name="email" value={formValues.email} onChange={handleChange} />
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.email}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Address Line 1</div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="addressLine1" value={formValues.addressLine1} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className=" space-y-[12px] py-[20px] px-[10px]">
                                        <div className="">
                                            <div className="text-[14px]">Employee ID<label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="employeeId" value={formValues.employeeId} onChange={handleChange} />
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.employeeId}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">LOB <label className="text-red-500">*</label></div>
                                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm"
                                                name="lob"
                                                value={formValues.lob}
                                                defaultValue="Select lob"
                                                onChange={e => {
                                                    // fetchCityData(e.target.value);
                                                    console.log(e.target.value);
                                                    setFormValues((existing) => {
                                                        const newData = { ...existing, entity: e.target.value }
                                                        return newData;
                                                    })

                                                }}
                                            >
                                                {allLOB && allLOB.map(item => (
                                                    <option value={item.id} >
                                                        {item.city}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Date of birth<label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="date" name="dob" value={formValues.dob} onChange={handleChange} />
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.dob}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Last Date of Working</div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="date" name="lastDOW" value={formValues.lastDOW} onChange={handleChange} />
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Assign Role <label className="text-red-500">*</label></div>
                                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm"
                                                name="role"
                                                value={formValues.role}
                                                defaultValue="Select Role"
                                                onChange={e => {
                                                    // fetchCityData(e.target.value);
                                                    console.log(e.target.value);
                                                    setFormValues((existing) => {
                                                        const newData = { ...existing, entity: e.target.value }
                                                        return newData;
                                                    })

                                                }}
                                            >
                                                {allRoles && allRoles.map(item => (
                                                    <option value={item.id} >
                                                        {item.city}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Phone Number<label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="phNo" value={formValues.phNo} onChange={handleChange} />
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.phNo}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Address Line 2</div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="addressLine2" value={formValues.addressLine2} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className=" space-y-[12px] py-[20px] px-[10px] ">
                                        <div className="">
                                            <div className="text-[14px]">Country Name<label className="text-red-500">*</label></div>
                                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm"
                                                name="country"
                                                value={formValues.country}
                                                defaultValue="Select Country"
                                                onChange={e => {
                                                    // setselectedCountry(e.target.value);
                                                    // fetchStateData(e);
                                                    // console.log(e.target.value);
                                                    setCurrCountry(e.target.value);
                                                    fetchStateData(e.target.value);
                                                    setFormValues((existing) => {
                                                        const newData = { ...existing, country: e.target.value }
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
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">State Name<label className="text-red-500">*</label></div>
                                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm"
                                                name="country"
                                                value={formValues.state}
                                                defaultValue="Select State"
                                                onChange={e => {
                                                    fetchCityData(e.target.value);
                                                    setFormValues((existing) => {
                                                        const newData = { ...existing, state: e.target.value }
                                                        return newData;
                                                    })

                                                }}
                                            >
                                                {allState && allState.map(item => (
                                                    <option value={item[0]} >
                                                        {item[1]}
                                                    </option>

                                                ))}
                                            </select>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">City Name <label className="text-red-500">*</label></div>
                                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm"
                                                name="country"
                                                value={formValues.city}
                                                defaultValue="Select State"
                                                onChange={e => {
                                                    // fetchCityData(e.target.value);
                                                    console.log(e.target.value);
                                                    setFormValues((existing) => {
                                                        const newData = { ...existing, city: e.target.value }
                                                        return newData;
                                                    })

                                                }}
                                            >
                                                {allCity && allCity.map(item => (
                                                    <option value={item.id} >
                                                        {item.city}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Suburb</div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="suburb" value={formValues.suburb} onChange={handleChange} />
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.suburb}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Zip Code</div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="zipcode" value={formValues.zipCode} onChange={handleChange} />
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Entities <label className="text-red-500">*</label></div>
                                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm"
                                                name="entity"
                                                value={formValues.entity}
                                                defaultValue="Select entity"
                                                onChange={e => {
                                                    // fetchCityData(e.target.value);
                                                    console.log(e.target.value);
                                                    setFormValues((existing) => {
                                                        const newData = { ...existing, entity: e.target.value }
                                                        return newData;
                                                    })

                                                }}
                                            >
                                                {allEntities && allEntities.map(item => (
                                                    <option value={item.id} >
                                                        {item.city}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-[10px] flex justify-center items-center"><Checkbox label="Active" />Active</div>
                            <div className="my-[10px] flex justify-center items-center gap-[10px]">
                                <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' onClick={handleEdit} >Save</button>
                                <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={props.handleClose}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
export default EditManageEmployee