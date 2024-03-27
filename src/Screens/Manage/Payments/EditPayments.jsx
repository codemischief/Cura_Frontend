import React from 'react';
import { useState, useEffect } from 'react';
import Cross from "../../../assets/cross.png";
import { APIService } from '../../../services/API';
import { Modal, Pagination, LinearProgress } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';

const EditPayments = (props) => {
    console.log(props.item);
    const [allCountry, setAllCountry] = useState([]);
    const [allState, setAllState] = useState([]);
    const [allCity, setAllCity] = useState([]);
    const [currCountry, setCurrCountry] = useState(-1);
    const [allUsername, setAllUsername] = useState([]);
    const [allRoles, setAllRoles] = useState([]);
    const [allEntities, setAllEntites] = useState([]);
    const [allLOB, setAllLOB] = useState([]);
    const [existingPayments, setExistingPayments] = useState([]);
    const [paymentFor, setPaymentFor] = useState([]);
    const [paymentMode, setPaymentMode] = useState([]);
    const [entity, setEntity] = useState([])
    const handleDialogClose = () => {
        props.setOpenDialog(false);
    };
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
    const fetchAllData = async () => {
        // setPageLoading(true);
        // const data = { "user_id":  1234 };
        const data = { "user_id": 1234 };
        const response = await APIService.getUsers(data)
        const result = (await response.json()).data;
        if (Array.isArray(result)) {
            setAllUsername(result);
        }
        const response1 = await APIService.getModesAdmin(data);
        const result1 = (await response1.json()).data;
        // console.log(result.data);
        setPaymentMode(result1);
        const response2 = await APIService.getPaymentFor(data);
        const result2 = (await response2.json()).data
        setPaymentFor(result2);
        // console.log(result.data);
        const response3 = await APIService.getEntityAdmin(data)
        const result3 = (await response3.json()).data;
        setEntity(result3)
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
        console.log(result);

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
        console.log(result);

        if (Array.isArray(result)) {
            setAllEntites(result);
        }
    }

    const fetchLobData = async () => {
        const data = {
            "user_id": 1234,
            "rows": ["id", "name", "lob_head", "company"],
            "filters": [],
            "sort_by": [],
            "order": "asc",
            "pg_no": 0,
            "pg_size": 0
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
        fetchAllData();
    }, []);

    const handleEdit = async () => {
        const data = {
            "user_id": 1234,
            "id": props.item.id,
            "paymentto" : formValues.paymentto,
            "paymentby" : formValues.paymentby,
            "amount" : Number(formValues.amount),
            "paidon" : formValues.paidon,
            "paymentmode" : formValues.paymentmode,
            "description" : formValues.description,
            "paymentfor" : formValues.paymentfor,
            "dated" : "2021-01-01 12:00:00",
            "createdby" : 1234,
            "isdeleted" : false,
            "entityid" : formValues.entity,
            "officeid" : 10,
            "tds" : formValues.tds,
            "professiontax" : formValues.professiontax,
            "month" : formValues.month,
            "deduction" : 10,
        }
        const response = await APIService.editPayment(data);
        console.log(response);
        props.handleClose();
        props.fetchData();
    }
    const handleClose = () => {
        props.setOpenDialog(false);
    };
    const initialValues = {
        curaoffice: "",
        paymentto: "",
        paymentby: "",
        amount: "",
        description: "",
        paymentfor: "",
        paymentmode: "",
        entity: "",
        paidon: "",
        month: "january",
        tds: "",
        professiontax: "",
    };
    const [formValues, setFormValues] = useState(initialValues);
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
    const selectedMonth = [
        {
            id: 1,
            month: "january"
        },
        {
            id: 2,
            month: "february"
        },
        {
            id: 3,
            month: "march"
        },
        {
            id: 4,
            month: "april"
        },
        {
            id: 5,
            month: "may"
        },
        {
            id: 6,
            month: "june"
        },
        {
            id: 7,
            month: "july"
        },
        {
            id: 8,
            month: "august"
        },
        {
            id: 9,
            month: "september"
        },
        {
            id: 10,
            month: "october"
        },
        {
            id: 11,
            month: "november"
        },
        {
            id: 12,
            month: "december"
        },
    ]
    return (
        <>
            <Modal open={props.isOpen}
                fullWidth={true}
                maxWidth={'md'}
                className='flex justify-center items-center'
            >
                <div className=''>
                    <div className="w-6/7  h-auto bg-white rounded-lg">
                        <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center">
                            <div className="mr-[410px] ml-[410px]">
                                <div className="text-[16px]">Edit Contractual Payments </div>
                            </div>
                            <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                                <img onClick={props.handleClose} className="w-[20px] h-[20px]" src={Cross} alt="cross" />
                            </div>
                        </div>
                        {/* <form onSubmit={handleSubmit} className='space-y-2'> */}
                        <div className="h-auto w-full mt-[5px] ">
                            <div className="flex gap-[48px] justify-center">
                                <div className=" space-y-[12px] py-[20px] px-[10px]">
                                    <div className="">
                                        <div className="text-[14px]">Cura Office </div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="curaoffice" value={formValues.curaoffice} onChange={handleChange} />
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Payment To <label className="text-red-500">*</label></div>
                                        <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="paymentto" value={formValues.paymentto} onChange={handleChange} >
                                            {allUsername.map(item => (
                                                <option key={item.id} value={item.id}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.PaymentTo}</div> */}
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Payment By <label className="text-red-500">*</label></div>
                                        <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="paymentby" value={formValues.paymentby} onChange={handleChange} >
                                            {allUsername.map(item => (
                                                <option key={item.id} value={item.id}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.PaymentBy}</div> */}
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Amount <label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="amount" value={formValues.amount} onChange={handleChange} />
                                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Description </div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="description" value={formValues.description} onChange={handleChange} />
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Payment For <label className="text-red-500">*</label></div>
                                        <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="paymentfor" value={formValues.paymentfor} onChange={handleChange} >
                                            {paymentFor.map(item => (
                                                <option key={item.id} value={item.id}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.tallyLedger}</div> */}
                                    </div>
                                </div>
                                <div className=" space-y-[12px] py-[20px] px-[10px]">
                                    <div className="">
                                        <div className="text-[14px]">Payment Mode <label className="text-red-500">*</label></div>
                                        <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="paymentmode" value={formValues.paymentmode} onChange={handleChange} >
                                            {paymentMode.map(item => (
                                                <option key={item[0]} value={item[0]}>
                                                    {item[1]}
                                                </option>
                                            ))}
                                        </select>
                                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.paymentMode}</div> */}
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Entity <label className="text-red-500">*</label></div>
                                        <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="entity" value={formValues.entity} onChange={handleChange} >
                                            {allEntities.map(item => (
                                                <option key={item[0]} value={item[1]}>
                                                    {item[1]}
                                                </option>
                                            ))}
                                        </select>
                                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.paymentMode}</div> */}
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Paid On <label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="date" name="paidon" value={formValues.paidon} onChange={handleChange} />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.paidOn}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Month <label className="text-red-500">*</label></div>
                                        <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="month" value={formValues.month} onChange={handleChange} >
                                            {selectedMonth.map(item => (
                                                <option key={item.id} value={item.month}>
                                                    {item.month}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.month}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">TDS <label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="tds" value={formValues.tds} onChange={handleChange} />
                                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.TDS}</div> */}
                                    </div>
                                    <div className="">
                                        <div className="text-[14px]">Profession Tax <label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="professiontax" value={formValues.professiontax} onChange={handleChange} />
                                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.professionTax}</div> */}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <div className="flex space-x-2 items-center">
                                <input type="checkbox" />
                                <div className="text-[13px] font-semibold">Exclude from Mailing List</div>
                            </div>
                            <div className=" mb-2 flex justify-center items-center gap-[10px]">
                                <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' type="submit" onClick={handleEdit}>Add</button>
                                <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={props.handleClose}>Cancel</button>
                            </div>
                        </div>
                        {/* </form> */}
                    </div>
                </div>
            </Modal>
        </>
    )
}
export default EditPayments