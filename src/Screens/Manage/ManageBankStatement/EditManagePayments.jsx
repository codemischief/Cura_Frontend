import React from 'react';
import Cross from "../../../assets/cross.png";
import { Link } from 'react-router-dom';
import { Modal, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import SucessfullModal from '../../../Components/modals/SucessfullModal';
import FailureModal from '../../../Components/modals/FailureModal';
import { APIService } from '../../../services/API';


const EditManageStatement = (props) => {
        const [pageLoading, setPageLoading] = useState(false);
    const [showSucess, setShowSucess] = useState(false);
    const [showFailure, setShowFailure] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const crdr =["Credit","Debit"];
    const [vendorList,setVendorList]= useState(props.bankStatement.vendorList)
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
            "user_id": 1234,
            "id": Number(props.bankStatement.item.id),
            "modeofpayment": formValues.modeofpayment,
            "date":String(formValues.date),
            "amount":formValues.amount,
            "particulars":String(formValues.particulars),
            "crdr":String(formValues.crdr),
            // "chequeno":"ABC123",
            // "availablebalance":99999.00,
            // "dateadded":"20-03-2024 00:00:01",
            // "clientid": 45000,
            // "orderid": 4040404,
            // "receivedby":100,
            // "details":"abcdefg",
            "vendorid":String(formValues.vendor),
            // "createdby":1234
        }
        const response = await APIService.editBankStatement(data);
        if (response.ok) {
            
            openSuccessModal();
        } else {
           
            openFailureModal();
        }
        
    }

    const handleDialogClose = () => {
        props.setOpenDialog(false);
    };
    console.log(props)
    const initialValues = {
        modeofpayment: props.bankStatement.item.modeofpayment ,
        particulars: props.bankStatement.item.particulars,
        amount: props.bankStatement.item.amount,
        // vendor: props.bankStatement,
        date: props.bankStatement.item.date,
        crdr: props.bankStatement.item.crdr,
        how: props.bankStatement.item.how,
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
        setFormErrors(validate(formValues)); // validate form and set error message
        setIsLoading(true);
        await editBankStatement();
         await props.fetchData();   
        setIsLoading(false);
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

    return (
        <>
            <SucessfullModal isOpen={showSucess} message="Bank Statement has been edited " />
            <FailureModal isOpen={showFailure} message="Error! cannot edit the Bank Statement" />
            <Modal open={props.openDialog}
                fullWidth={true}
                 >
                <div className='flex justify-center mt-[150px] rounded-lg'>
                    <div className="w-[1050px] h-[400px] bg-white ">
                        <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center">
                            <div className="mr-[410px] ml-[410px]">
                                <div className="text-[16px]">Edit Bank Statement</div>
                            </div>
                            <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                                <img onClick={handleDialogClose} className="w-[20px] h-[20px]" src={Cross} alt="cross" />
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="h-auto w-full">
                                <div className="flex gap-[48px] justify-center items-center">
                                    <div className=" space-y-[12px] py-[20px] px-[10px]">
                                        <div className="">
                                            <div className="text-[14px]">Payment Mode <label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="modeofpayment" value={formValues.modeofpayment} onChange={handleChange} />
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.modeofpayment}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Particulars <label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="particulars" value={formValues.particulars} onChange={handleChange} />
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.particulars}</div>

                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Amount </div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="amount" value={formValues.amount} onChange={handleChange} />
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Vendor</div> 
                                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="vendor" value={formValues.vendor} onChange={handleChange} >
                                                {vendorList && vendorList.map(item => (
                                                    <option key={item} value={item}>
                                                        {item}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                       
                                      
                                    </div>
                                    <div className=" space-y-[12px] py-[20px] px-[10px]">
                                        <div className="">
                                            <div className="text-[14px]">Date <label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="date" name="date" value={formValues.date} onChange={handleChange} />
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.date}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">DR/CR <label className="text-red-500">*</label></div>
                                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="state" value={formValues.state} onChange={handleChange} >
                                                {crdr && crdr.map(item => (
                                                    <option key={item} value={item}>
                                                        {item}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.crdr}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">How Recieved(CR)? <label className="text-red-500">*</label></div>
                                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" 
                                            defaultValue="Select CR or DR"
                                            value={formValues.cr}
                                            onChange={(e) => {
                                               setFormValues((existing) => {
                                                const newData = {...existing, city: e.target.value};
                                                 return newData;
                                               })
                                            }}>
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

                            <div className="my-[10px] flex justify-center items-center gap-[10px]">
                                <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' type="submit">Save</button>
                                <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleDialogClose}>Cancel</button>
                                {isLoading && <CircularProgress />}
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </>

    )
}

export default EditManageStatement
