import React from 'react';
import Cross from "../../../assets/cross.png";
import { Link } from 'react-router-dom';
import { Modal, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import SucessfullModal from '../../../Components/modals/SucessfullModal';
import FailureModal from '../../../Components/modals/FailureModal';
import { APIService } from '../../../services/API';
import Draggable from 'react-draggable';
import useAuth from '../../../context/JwtContext';


const EditManageStatement = (props) => {
    const { user } = useAuth()
        const [pageLoading, setPageLoading] = useState(false);
    const [showSucess, setShowSucess] = useState(false);
    const [showFailure, setShowFailure] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [employeeId, setEmployeeId] =useState(Number);
    const crdr =[
        {
            'id' : 1,
            'label' : "Credit",
            'value' : 'CR'
        },
        {
            'id' : 2,
            'label' : "Debit",
            'value' : 'DR'
        }
    ];
    const [vendorList,setVendorList]= useState(props.bankStatement.vendorList)
    const [howReceived,sethowReceived]=useState(props.bankStatement.how)
    const [mode,setMode]=useState(props.bankStatement.mode)
    const [modeEdit,setModeEdit]=useState(Number)
    // const[receivedBy,setRecievedBy]=useState(Number);
    // const[vendorId,setVendorId]=useState(Number);

    const openSuccessModal = () => {
        // set the state for true for some time
        props.setOpenDialog(false);
        setShowSucess(true);
        setTimeout(function () {
            setShowSucess(false)
        }, 2000)
    }
    const openFailureModal = () => {
        props.setOpenDialog(false);
        setShowFailure(true);
        setTimeout(function () {
            setShowFailure(false)
        }, 4000);
    }

    const editBankStatement = async () => {
            const data = {
            "user_id": user.id,
            "id": props.bankStatement.item.id,
            "modeofpayment": formValues.modeofpayment,
            "date":formValues.date,
            "amount":formValues.amount,
            "particulars":formValues.particulars,
            "crdr": formValues.crdr,
            "receivedby":formValues.how,
            "vendorid":formValues.vendor,
            "howreceived" : formValues.how
        }
        const response = await APIService.editBankStatement(data);
        if (response.ok) {
            props.showSuccess();
        } else {
            openFailureModal();
        }
        
    }

    const handleDialogClose = () => {
        props.setOpenDialog(false);
        props.showCancel();
    };
    console.log(props)
    const initialValues = {
        modeofpayment: props.bankStatement.item?.modeofpayment ,
        particulars: props.bankStatement.item?.particulars,
        amount: props.bankStatement.item?.amount,
        vendor: props.bankStatement.item?.vendorid,
        date: props.bankStatement.item?.date,
        crdr: props.bankStatement.item?.crdr,
        how: props.bankStatement.item?.receivedhow,
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});

    // handle changes in input form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async  (e) => {
        e.preventDefault();
        if(!validate()) {
            return ;
        }
        // setFormErrors(validate(formValues)); // validate form and set error message
        setIsLoading(true);
        await editBankStatement();
        await props.fetchData();   
        setIsLoading(false);
    };
    const [currentMode,setCurrentMode]=useState("")
    useEffect(() => {
        const modeOfThisItem=props.bankStatement.item.modeofpayment;
        mode.map(ele =>{
            if( modeOfThisItem == ele[0]){
                setCurrentMode(ele[1])
            }
        })
    }, []);
    // validate form and to throw Error message
    const validate = ()  => {
        var res = true;
        if(!formValues.modeofpayment) {
            setFormErrors((existing) => {
               return {...existing, modeofpayment: "Select a mode"}
            })
            res = false;
        }else {
            setFormErrors((existing) => {
                return {...existing,modeofpayment: ""}
             })
        }
        if(!formValues.particulars) {
            setFormErrors((existing) => {
               return  {...existing,particulars: "Enter particulars"}
            })
            res = false;
        }else {
            setFormErrors((existing) => {
                return  {...existing,particulars: ""}
             })
        }
        if(!formValues.amount ) {
            setFormErrors((existing) => {
                return {...existing,amount: "Enter Amount"}
            })
            res = false;
        }else {
            setFormErrors((existing) => {
                return {...existing,amount: ""}
            })
        }
        if(!formValues.date) {
            setFormErrors((existing) => {
                return {...existing,date: "Select a date"}
            })
            res = false;
        }else {
            setFormErrors((existing) => {
                return {...existing,date: ""}
            })
        }
        if(!formValues.crdr) {
            setFormErrors((existing) => {
                return {...existing,crdr: "Select DR or CR"}
            })
            res = false;
        }else {
            setFormErrors((existing) => {
                return {...existing,crdr: ""}
            })
        }
        return res;
    }

    return (
        <>
            <SucessfullModal isOpen={showSucess} message="Bank Statement has been edited " />
            <FailureModal isOpen={showFailure} message="Error! cannot edit the Bank Statement" />
            <Modal open={props.openDialog}
                fullWidth={true}
                className='flex justify-center items-center'
                 >
                    <>
                    <Draggable handle='div.move'>
                <div className='flex justify-center items-center  '>
                    <div className="w-[1050px] h-auto bg-white rounded-lg relative">
                        <div className='move cursor-move'>
                            <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-lg">
                                <div className="mr-[410px] ml-[410px]">
                                    <div className="text-[16px]">Edit Bank Statement</div>
                                </div>
                                <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white absolute right-2">
                                    <button onClick={handleDialogClose}>
                                    <img className="w-[20px] h-[20px]" src={Cross} alt="cross" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="h-auto w-full">
                                <div className="flex gap-[48px] justify-center ">
                                    <div className=" space-y-[12px] py-[20px] px-[10px]">
                                        <div className="">
                                            <div className="text-[13px]"> Mode <label className="text-red-500">*</label></div>
                                            <select className="text-[11px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="modeofpayment" value={formValues.modeofpayment} onChange={handleChange} >
                                            {/* <option>{currentMode}</option> */}
                                                {mode && mode.map(item => (
                                                    <option key={item[0]} value={item[0]}>
                                                        {item[1]}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.modeofpayment}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Particulars <label className="text-red-500">*</label></div>
                                            {/* <input className="break-all w-[230px] h-[40px] border-[1px] border-[#C6C6C6] rounded-sm text-xs "  name="particulars" value={formValues.particulars} onChange={handleChange} /> */}
                                            <input className=" text-[12px] pl-4 break-all w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm text-xs " name="particulars" value={formValues.particulars} onChange={handleChange} />
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.particulars}</div>

                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Amount <label className="text-red-500">*</label> </div>
                                            <input className="text-[11px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="amount" value={formValues.amount} onChange={handleChange} />
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Vendor</div> 
                                            <select className=" text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text"  name="vendor" value={formValues.vendor} onChange={handleChange} >
                                                <option hidden>Select A Vendor</option>
                                                {vendorList && vendorList.map(item => (
                                                    <option value={item[0]}>
                                                        {item[1]}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                       
                                      
                                    </div>
                                    <div className=" space-y-[12px] py-[20px] px-[10px]">
                                        <div className="">
                                            <div className="text-[13px]">Date <label className="text-red-500">*</label></div>
                                            <input className="text-[11px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="date" name="date" value={formValues.date} onChange={handleChange} required />
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.date}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">DR/CR <label className="text-red-500">*</label></div>
                                            <select className="text-[11px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="crdr" value={formValues.crdr} onChange={handleChange} required>
                                                {crdr && crdr.map(item => (
                                                    <option key={item.id} value={item.value}>
                                                        {item.label}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.crdr}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">How Received(CR)? </div>
                                            <select className="text-[11px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="how" value={formValues.how} onChange={handleChange} >
                                                <option hidden>Select How Received</option>
                                                {howReceived && howReceived.map(item => (
                                                    <option value={item[0]}>
                                                        {item[1]}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.how}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="my-10 flex justify-center items-center gap-[10px]">
                                <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' type="submit">Save</button>
                                <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleDialogClose}>Cancel</button>
                                
                            </div>
                        </form>
                    </div>
                </div>
                    </Draggable>
                    </>
            </Modal>
        </>

    )
}

export default EditManageStatement
