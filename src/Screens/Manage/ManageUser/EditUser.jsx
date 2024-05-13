import React, { useState, useEffect } from 'react'
import { Modal, responsiveFontSizes } from '@mui/material'
import Cross from "../../../assets/cross.png"
import { APIService } from '../../../services/API'
import Draggable from 'react-draggable';
import eyeIcon from "../../../assets/eye.jpg";

const EditUser = ({ handleClose, currUser, allCity, allRoles, allLOB , showSuccess, showCancel }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const initialValues = {
        nameOfTheUser: null,
        userName: null,
        password: null,
        lob: null,
        email1: null,
        workPhone: null,
        addressLine1: null,
        effectiveDate: null,
        confirmPassword: null,
        role: null,
        email2: null,
        homePhone: null,
        addressLine2: null,
        city: null,
        suburb: null,
        zipCode: null,
        status: false
    };
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    // const [typeOfOrganization,setTypeOfOrganization] = useState([])
    // const [allCategory,setAllCategory] = useState([])
    // const [tallyLedgerData,setTallyLedgerData] = useState([])
    // const [allCity,setAllCity] = useState([])
    const fetchInitialData = async () => {
        console.log(currUser)
        const data = {
            "user_id": 1234,
            "item_id": currUser,
            "table_name": "get_users_view"
        }
        const response = await APIService.getItembyId(data)
        const res = await response.json()
        console.log(res)
        const existing = { ...formValues }
        existing.nameOfTheUser = res.data.fullname
        existing.userName = res.data.username
        existing.password = res.data.password
        existing.confirmPassword = res.data.password
        existing.lob = res.data.lobid
        existing.email1 = res.data.email1
        existing.email2 = res.data.email2
        existing.workPhone = res.data.workphone
        existing.homePhone = res.data.homephone
        existing.addressLine1 = res.data.addressline1
        existing.addressLine2 = res.data.addressline2
        existing.effectiveDate = res.data.effectivedate
        existing.role = res.data.roleid
        existing.city = res.data.cityid
        existing.suburb = res.data.suburb
        existing.zipCode = res.data.zip
        setFormValues(existing)
    }
    useEffect(() => {
        fetchInitialData()
    }, [])
    const validate = () => {
        var res = true;

        if (!formValues.nameOfTheUser) {
            setFormErrors((existing) => {
                return { ...existing, nameOfTheUser: "Enter The Name Of The User" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, nameOfTheUser: "" }
            })
        }

        if (!formValues.userName) {
            setFormErrors((existing) => {
                return { ...existing, userName: "Enter UserName" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, userName: "" }
            })
        }

        if (!formValues.password) {
            setFormErrors((existing) => {
                return { ...existing, password: "Enter Password" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, password: "" }
            })
        }

        if (!formValues.lob) {
            setFormErrors((existing) => {
                return { ...existing, lob: "Enter Lob" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, lob: "" }
            })
        }
        if (!formValues.email1) {
            setFormErrors((existing) => {
                return { ...existing, email1: "Enter Email" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, email1: "" }
            })
        }
        if (!formValues.addressLine1) {
            setFormErrors((existing) => {
                return { ...existing, addressLine1: "Enter Address" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, addressLine1: "" }
            })
        }
        if (!formValues.effectiveDate) {
            setFormErrors((existing) => {
                return { ...existing, effectiveDate: "Select Effective Date" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, effectiveDate: "" }
            })
        }
        if (!formValues.confirmPassword) {
            setFormErrors((existing) => {
                return { ...existing, confirmPassword: "Enter Confirm Password" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, confirmPassword: "" }
            })
        }
        if (!formValues.role) {
            setFormErrors((existing) => {
                return { ...existing, role: "select Role" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, role: "" }
            })
        }
        if (!formValues.homePhone) {
            setFormErrors((existing) => {
                return { ...existing, homePhone: "Enter home phone number" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, homePhone: "" }
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
        if (!formValues.suburb) {
            setFormErrors((existing) => {
                return { ...existing, suburb: "Enter Suburb" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, suburb: "" }
            })
        }
        if (!formValues.zipCode) {
            setFormErrors((existing) => {
                return { ...existing, zipCode: "Enter Zip Code" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, zipCode: "" }
            })
        }

        return res;
    }
    const handleEdit = async () => {
        // we handle edit here
        if (!validate()) {
            return;
        }
        const data = {
            "user_id": 1234,
            "username": formValues.userName,
            "roleid": Number(formValues.role),
            "password": formValues.password,
            "officeid": 2,
            "lobid": Number(formValues.lob),
            "usercode": "code",
            "firstname": "New",
            "lastname": "User",
            "status": formValues.status,
            "effectivedate": formValues.effectiveDate,
            "homephone": formValues.homePhone,
            "workphone": formValues.workPhone,
            "email1": formValues.email1,
            "email2": formValues.email2,
            "addressline1": formValues.addressLine1,
            "addressline2": formValues.addressLine2,
            "suburb": formValues.suburb,
            "city": Number(formValues.city),
            "state": "Maharashtra",
            "country": 5,
            "zip": formValues.zipCode,
            "entityid": 1
        }
        const response = await APIService.editUser(data)
        const res = await response.json()
        if (res.result == 'success') {
            //  we need to open edit Modal
            showSuccess()
        }
    }

    const close = () => {
        handleClose();
        showCancel();
    }

    const [type1, setType1] = useState("password");
    const [type2, setType2] = useState("password");

    // password visibility
    const passwordToggle = () => {
        if (type1 === "password") {
            setType1("text");
        } else {
            setType1("password");
        }
    };

    const confirmPasswordToggle = () => {
        if (type2 === "password") {
            setType2("text");
        } else {
            setType2("password");
        }
    };

    // end utility routes here
    return (
        <Modal open={true}
            fullWidth={true}
            maxWidth={'md'}
            className='flex justify-center items-center'
        >
            <>
                <Draggable>
                    <div className='flex justify-center '>
                        <div className="w-[1050px] h-auto bg-white rounded-lg">
                            <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-lg">
                                <div className="mr-[410px] ml-[410px]">
                                    <div className="text-[16px]">Edit User</div>
                                </div>
                                <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                                    <button onClick={() => { close() }}>
                                        <img className="w-[20px] h-[20px]" src={Cross} alt="cross" />
                                    </button>
                                </div>
                            </div>

                            <div className="h-auto w-full">
                                <div className="flex gap-[48px] justify-center items-center">
                                    <div className=" space-y-[12px] py-[20px] px-[10px]">
                                        <div className="">
                                            <div className="text-[13px]">Name of the User <label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="nameOfTheUser" value={formValues.nameOfTheUser} onChange={handleChange} />
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.nameOfTheUser}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Create Username <label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="userName" value={formValues.userName} onChange={handleChange} />
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.userName}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Create Password <label className="text-red-500">*</label></div>
                                            <div className="m-0 p-0 relative">
                                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type={type1} name="password" value={formValues.password} onChange={handleChange} />
                                                <span className="w-4 h-4 absolute right-1 bottom-0.5">
                                                    <img
                                                        className='cursor-pointer'
                                                        onClick={passwordToggle}
                                                        src={eyeIcon}
                                                        alt="eye-icon"
                                                    />
                                                </span>
                                            </div>
                                            <div className="text-[10px] text-[#CD0000]">{formErrors.password}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-sm">LOB <label className="text-red-500">*</label></div>
                                            <select className="w-[230px] h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs"
                                                name="lob"
                                                value={formValues.lob}
                                                defaultValue="Select lob"
                                                onChange={e => {
                                                    // fetchCityData(e.target.value);
                                                    console.log(e.target.value);
                                                    setFormValues((existing) => {
                                                        const newData = { ...existing, lob: e.target.value }
                                                        return newData;
                                                    })

                                                }}
                                            >
                                                <option value="none" hidden>Select a LOB</option>
                                                {allLOB && allLOB.map(item => (
                                                    <option value={item.id} >
                                                        {item.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.lob}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Email 1 <label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="email1" value={formValues.email1} onChange={handleChange} />
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.email1}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Work Phone</div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="email" name="workPhone" value={formValues.workPhone} onChange={handleChange} />
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Address Line 1 <label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="addressLine1" value={formValues.addressLine1} onChange={handleChange} />
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.addressLine1}</div>
                                        </div>
                                    </div>
                                    <div className=" space-y-[12px] py-[20px] px-[10px]">
                                        <div className="">
                                            <div className="text-sm text-[#787878] mb-0.5">Office </div>
                                            <div className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs py-0.5 bg-[#F5F5F5]" type="text" name="curaoffice" value={formValues.curaoffice} onChange={handleChange} >Pune</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Effective Date <label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="date" name="effectiveDate" value={formValues.effectiveDate} onChange={handleChange} />
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.effectiveDate}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Confirm Password <label className="text-red-500">*</label></div>
                                            <div className="m-0 p-0 relative">
                                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type={type2} name="confirmPassword" value={formValues.confirmPassword} onChange={handleChange} />
                                                <span className="w-4 h-4 absolute right-1 bottom-0.5">
                                                    <img
                                                        className='cursor-pointer'
                                                        onClick={confirmPasswordToggle}
                                                        src={eyeIcon}
                                                        alt="eye-icon"
                                                    />
                                                </span>
                                            </div>
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.confirmPassword}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Assign Role <label className="text-red-500">*</label></div>
                                            <select className="w-[230px] h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none"
                                                name="role"
                                                value={formValues.role}
                                                defaultValue="Select Role"
                                                onChange={e => {
                                                    // fetchCityData(e.target.value);
                                                    console.log(e.target.value);
                                                    setFormValues((existing) => {
                                                        const newData = { ...existing, role: e.target.value }
                                                        return newData;
                                                    })

                                                }}
                                            >
                                                <option value="none" hidden>Select a Role</option>
                                                {allRoles && allRoles.map(item => (
                                                    <option value={item.id} >
                                                        {item.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.role}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Email 2</div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="email2" value={formValues.email2} onChange={handleChange} />
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Home Phone <label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="homePhone" value={formValues.homePhone} onChange={handleChange} />
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.homePhone}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Address Line 2</div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="addressLine2" value={formValues.addressLine2} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className=" space-y-[12px] py-[20px] px-[10px] ">
                                        <div className="">
                                            <div className="text-[13px] ">City <label className="text-red-500">*</label></div>
                                            <select className="w-[230px] h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none"
                                                name="city"
                                                value={formValues.city}
                                                defaultValue="Select City"
                                                onChange={handleChange}
                                            >
                                                {/* <option value="none" hidden={true}>Select a City</option> */}
                                                <option value="none" hidden> Select A City</option>
                                                {allCity && allCity.map(item => (
                                                    <option value={item.id} >
                                                        {item.city}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.city}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Suburb <label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="suburb" value={formValues.suburb} onChange={handleChange} />
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.suburb}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Zip Code <label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="zipCode" value={formValues.zipCode} onChange={handleChange} />
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.zipCode}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 flex justify-center items-center text-sm font-semibold"><input
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
                            <div className="my-2 flex justify-center items-center gap-[10px]">
                                <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' onClick={handleEdit}>Add</button>
                                <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={() => { close() }}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </Draggable>
            </>
        </Modal>
    )
}

export default EditUser
