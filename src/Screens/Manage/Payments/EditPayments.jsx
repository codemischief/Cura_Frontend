import React from 'react';
import { useState, useEffect } from 'react';
import Cross from "../../../assets/cross.png";
import { APIService } from '../../../services/API';
import { Modal,CircularProgress } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import Draggable from 'react-draggable';
import DropDown from '../../../Components/Dropdown/Dropdown';
// import { Modal, Pagination, LinearProgress, CircularProgress } from "@mui/material";
const EditPayments = (props) => {
    console.log(props.item.item);
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
    const [pageLoading,setPageLoading] = useState(false); 
    const handleDialogClose = () => {
        props.setOpenDialog(false);
    };
    
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
    const fetchPaymentData = async () => {
        setPageLoading(true);
       const data = {"user_id":1234,"table_name":"ref_contractual_payments","item_id": props.item.item.id};
       const response = await APIService.getItembyId(data);
       const result = await response.json();
       setFormValues((existing) => result.data);
    //    setFormValues((existing) => {
    //     return {...existing, paidon : result.data.paidon.split('T')[0]}
    //  })
     setTimeout(() => {
         setPageLoading(false)
     },1000)
    //  setPageLoading(false);
       console.log(result)
    }
    useEffect(() => {
        fetchPaymentData();
        fetchEntitiesData();
        fetchUsersData();
        fetchLobData();
        fetchAllData();
    }, []);

    const handleEdit = async () => {
        if(!validate()) {
            console.log('here')
            return ;
        }
        const data = {
            "user_id": 1234,
            "id": props.item.item.id,
            "paymentto" : formValues.paymentto,
            "paymentby" : formValues.paymentby,
            "amount" : Number(formValues.amount),
            "paidon" : formValues.paidon,
            "paymentmode" : formValues.paymentmode,
            "description" : formValues.description,
            "paymentfor" : formValues.paymentfor,
            "entityid" : Number(formValues.entityid),
            "officeid" : 10,
            "tds" : Number(formValues.tds),
            "professiontax" : Number(formValues.professiontax),
            "month" : formValues.month,
            "deduction" : formValues.deduction,
        }
        const response = await APIService.editPayment(data);
        const result = await response.json();
        console.log(result);
        props.openPrompt();
        // props.handleClose();
        // props.fetchData();
    }
    const handleClose = () => {
        props.setOpenDialog(false);
    };
    const initialValues = {
        curaoffice: "",
        paymentto: props.item.item.paymentto,
        paymentby: props.item.item.paymentby,
        amount: props.item.item.amount,
        description: "",
        deduction: "",
        paymentfor: "",
        paymentmode: "",
        entityid : "",
        paidon: "",
        month: "january",
        tds: "",
        professiontax: "",
    };
    const [formValues, setFormValues] = useState({});
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const validate = ()  => {
        var res = true;
        if (!formValues.paymentto || formValues.paymentto == "") {
            setFormErrors((existing) => {
                return { ...existing, paymentto: "Select a name to pay" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, paymentto: "" }
            })
        }
        if (!formValues.paymentby || formValues.paymentby == "") {
            setFormErrors((existing) => {
                return { ...existing, paymentby: "Select a name to pay from" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, paymentby: "" }
            })
        }
        // console.log(formValues.amount);
        // const temp = Number(formValues.amount);
        
        if(!formValues.amount) {
            setFormErrors((existing) => {
                return {...existing,amount: "Amount is Mandatory"}
            })
            console.log('here')
            res = false;
        }else {
            setFormErrors((existing) => {
                return {...existing,amount: ""}
            })
        }
        if(!formValues.paymentfor) {
            setFormErrors((existing) => {
                return {...existing,paymentfor: "This Feild is mandatory"}
            })
            console.log('here')
            res = false;
        }else {
            setFormErrors((existing) => {
                return {...existing,paymentfor: ""}
            })
        }
        if(!formValues.paymentmode) {
            setFormErrors((existing) => {
                return {...existing,paymentmode: "Select a payment mode"}
            })
            console.log('here')
            res = false;
        }else {
            setFormErrors((existing) => {
                return {...existing,paymentmode: ""}
            })
        }
        // if(!formValues.entity) {
        //     setFormErrors((existing) => {
        //         return {...existing,entity: "Select entity"}
        //     })
        //     console.log('here')
        //     res = false;
        // }else {
        //     setFormErrors((existing) => {
        //         return {...existing,entity: ""}
        //     })
        // }
        if(!formValues.paidon) {
            setFormErrors((existing) => {
                return {...existing,paidon: "Enter payment date"}
            })
            console.log('here')
            res = false;
        }else {
            setFormErrors((existing) => {
                return {...existing,paidon: ""}
            })
        }
        if(!formValues.month) {
            setFormErrors((existing) => {
                return {...existing,month: "Select payment month"}
            })
            console.log('here')
            res = false;
        }else {
            setFormErrors((existing) => {
                return {...existing,month: ""}
            })
        }
        
        return res;
    }
    const selectedMonth = [
        {
            id: 1,
            month: "Jan"
        },
        {
            id: 2,
            month: "Feb"
        },
        {
            id: 3,
            month: "Mar"
        },
        {
            id: 4,
            month: "Apr"
        },
        {
            id: 5,
            month: "May"
        },
        {
            id: 6,
            month: "Jun"
        },
        {
            id: 7,
            month: "July"
        },
        {
            id: 8,
            month: "Aug"
        },
        {
            id: 9,
            month: "Sep"
        },
        {
            id: 10,
            month: "Oct"
        },
        {
            id: 11,
            month: "Nov"
        },
        {
            id: 12,
            month: "Dec"
        },
    ]

    const close = () =>{
        props.handleClose();
        props.showCancel();
    }
    return (
        <>
            <Modal open={props.isOpen}
                fullWidth={true}
                maxWidth={'md'}
                className='flex justify-center items-center'
            >
                <>
                    {/* <Draggable> */}
                <div className=''>
                    <div className="w-[1100px]  h-auto bg-white rounded-lg">
                        <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-t-lg">
                            <div className="mr-[410px] ml-[410px]">
                                <div className="text-[16px]">Edit Contractual Payments </div>
                            </div>
                            <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                                <img onClick={() => {close()}} className="w-[20px] h-[20px]" src={Cross} alt="cross" />
                            </div>
                        </div>
                        {pageLoading && <div className='flex justify-center items-center mt-9 space-x-7 mb-6'><CircularProgress/><h1>Fetching Payment Data</h1></div>}
                        {/* <form onSubmit={handleSubmit} className='space-y-2'> */}
                        {!pageLoading && <div className="h-auto w-full mt-[5px] ">
                            <div className="flex gap-[48px] justify-center">
                                <div className=" space-y-[12px] py-[20px] px-[10px]">
                                    <div className="">
                                        <div className="text-[13px] text-[#787878] mb-0.5">Cura Office </div>
                                        <div className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px] py-0.5 bg-[#F5F5F5]" type="text" name="curaoffice" value={formValues.curaoffice} onChange={handleChange} >Pune</div>
                                    </div>
                                    <div className="pt-0.5">
                                        <div className="text-[13px] mb-1">Payment To <label className="text-red-500">*</label></div>
                                        {/* <select className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" name="paymentto" value={formValues.paymentto} onChange={handleChange} >
                                        <option value="" hidden >Select User</option>
                                            <option value="" >Name &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  Username </option>
                                        {allUsername.map(item => (
                                                <option key={item.id} value={item.id}>
                                                    {item.name}
                                                    &nbsp;
                                                    &nbsp;
                                                    &nbsp;
                                                    &nbsp;
                                                    {item.username}
                                                </option>
                                            ))}
                                        </select> */}
                                        <DropDown options={allUsername} initialValue="Select Payment To" leftLabel="Name" rightLabel={"Username"} leftAttr="name" rightAttr="username" toSelect="name" handleChange={handleChange} formValueName="paymentto" value={formValues.paymentto}/>
                                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.PaymentTo}</div> */}
                                    </div>
                                    <div className="pt-0.5">
                                        <div className="text-[13px] mb-1">Payment By <label className="text-red-500">*</label></div>
                                        {/* <select className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" name="paymentby" value={formValues.paymentby} onChange={handleChange} >
                                        <option value="" hidden >Select User</option>
                                            <option value="" >Name &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  Username </option>
                                            {allUsername.map(item => (
                                                <option key={item.id} value={item.id}>
                                                    <option key={item.id} value={item.id}>
                                                    {item.name}
                                                    &nbsp;
                                                    &nbsp;
                                                    &nbsp;
                                                    &nbsp;
                                                    {item.username}
                                                </option>
                                                </option>
                                            ))}
                                        </select> */}
                                        <DropDown options={allUsername} initialValue="Select Payment By" leftLabel="Name" rightLabel={"Username"} leftAttr="name" rightAttr="username" toSelect="name" handleChange={handleChange} formValueName="paymentby" value={formValues.paymentby} />
                                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.PaymentBy}</div> */}
                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">Amount <label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="number" name="amount" value={formValues.amount} onChange={handleChange} />
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">Deduction </div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="deduction" value={formValues.deduction} onChange={handleChange} />
                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">Payment For </div>
                                        <select className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" name="paymentfor" value={formValues.paymentfor} onChange={handleChange} >
                                            <option hidden>Select Payment For</option>
                                            {paymentFor.map(item => (
                                                <option key={item.id} value={item.id}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.tallyLedger}</div> */}
                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">Description </div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="description" value={formValues.description} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className=" space-y-[12px] py-[20px] px-[10px]">
                                    <div className="">
                                        <div className="text-[13px]">Payment Mode <label className="text-red-500">*</label></div>
                                        <select className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" name="paymentmode" value={formValues.paymentmode} onChange={handleChange} >
                                            {paymentMode.map(item => (
                                                <option key={item[0]} value={item[0]}>
                                                    {item[1]}
                                                </option>
                                            ))}
                                        </select>
                                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.paymentMode}</div> */}
                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">Entity <label className="text-red-500">*</label></div>
                                        <select className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" name="entityid" value={formValues.entityid} onChange={handleChange} >
                                            {allEntities.map(item => (
                                                <option key={item[0]} value={item[0]}>
                                                    {item[1]}
                                                </option>
                                            ))}
                                        </select>
                                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.paymentMode}</div> */}
                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">Paid On <label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="date" name="paidon" value={formValues.paidon} onChange={handleChange} />
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.paidon}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">Month <label className="text-red-500">*</label></div>
                                        <select className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" name="month" value={formValues.month} onChange={handleChange} >
                                            {selectedMonth.map(item => (
                                                <option key={item.id} value={item.month}>
                                                    {item.month}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.month}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">TDS </div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="number" name="tds" value={formValues.tds} onChange={handleChange} />
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.tds}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">Profession Tax </div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="number" name="professiontax" value={formValues.professiontax} onChange={handleChange} />
                                        
                                    </div>
                                </div>
                            </div>
                        </div>}

                        <div className="flex flex-col items-center gap-2">
                            
                            <div className=" mb-2 flex justify-center items-center gap-[10px]">
                                <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' type="submit" onClick={handleEdit}>Save</button>
                                <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={() => {close()}}>Cancel</button>
                            </div>
                        </div>
                        {/* </form> */}
                    </div>
                </div>
                    {/* </Draggable> */}
                    </>
            </Modal>
        </>
    )
}
export default EditPayments