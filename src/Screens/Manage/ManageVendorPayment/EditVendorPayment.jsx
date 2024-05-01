import React, { useState ,useEffect} from 'react'
import { Modal, useScrollTrigger } from '@mui/material'
import Cross from "../../../assets/cross.png"
import { APIService } from '../../../services/API'
import AsyncSelect from "react-select/async"
import Draggable from 'react-draggable'
const EditVendorPayment = ({handleClose,currPayment,modesData,vendorData,usersData,showSuccess}) => {
    const initialValues = {
        client: null,
        paymentby: null,
        amount: null,
        paymentdate: null,
        orderid: null,
        ordername : null,
        vendorid: null,
        mode: null,
        description: null,
        tds: null,
        servicetaxamount: null,
        entityid: null,
        officeid: null,
        orderdate : null,
        orderstatus : null
    };
    const [formValues,setFormValues ] = useState(initialValues)
    const [formErrors,setFormErrors] = useState({})
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    
    // const [modesData,setModesData] = useState([])
    const [orders,setOrders] = useState([])
    // const [vendorData,setVendorData] = useState([])
    // const [usersData,setUsersData] = useState([])
    const fetchInitialData = async () => {
        const data = {
            "user_id" : 1234,
            "table_name" : "get_vendor_payment_view",
            "item_id" : currPayment
        }
        const response = await APIService.getItembyId(data)
        const res = await response.json()
        console.log(res.data)
        const existing = {...formValues}
        existing.client = res.data.clientid 
        getOrdersByClientId(res.data.clientid)
        
        existing.paymentby = res.data.paymentby
        existing.amount = res.data.amount 
        existing.paymentdate = res.data.paymentdate 
        existing.orderid = res.data.orderid 
        getOrdersData(res.data.orderid)
        existing.vendorid = res.data.vendorid 
        existing.mode = res.data.mode 
        existing.description = res.data.briefdescription 
        existing.tds = res.data.tds
        existing.servicetaxamount = res.data.servicetaxamount
        existing.ordername = res.data.briefdescription
        const temp = {...selectedOption}
        temp.label = res.data.clientname 
        temp.value = res.data.clientid
        setSelectedOption(temp)
        // existing.entityid = res.data 
        // existing.officeid = res.data.
        setFormValues(existing)
    }
    const getOrdersByClientId = async (id) => {
        // console.log('hello')
        const data = {
            "user_id": 1234,
            "client_id": id
        }
        const response = await APIService.getOrdersByClientId(data)
        const res = await response.json()
        console.log(res.data)
        setOrders(res.data)
    }
    const [tempFormValues,setTempFormValues] = useState({})
    const getOrdersData = async (id) => {
        const data = {"user_id":1234,"item_id": id,"table_name" : "get_orders_view"}
        const response = await APIService.getItembyId(data)
        const res = await response.json()
        const existing = {...tempFormValues}
        existing.orderdate = res.data.orderdate
        existing.orderstatus = res.data.orderstatus
        setTempFormValues(existing)
        console.log(res.data)
    }
    useEffect(() => {
       fetchInitialData()
    },[])



    const [selectedOption, setSelectedOption] = useState({
        label: "Enter Client Name",
        value: null
    });
    const [query, setQuery] = useState('')
    const handleClientNameChange = (e) => {
        console.log('hey')
        console.log(e)
        //  setFormValues({...formValues,client_property : {
        //   ...formValues.client_property,
        //   clientid : e.value
        //  }})
        const existing = { ...formValues }
        existing.client = e.value
        getOrdersByClientId(e.value)
        // getClientPropertyByClientId(e.value)
        setFormValues(existing)
        //    const existing = {...formValues}
        //    const temp = {...existing.client_property}
        //    temp.clientid = e.value
        //    existing.client_property = temp;
        //    setFormValues(existing)
        console.log(formValues)
        setSelectedOption(e)
    }

    const loadOptions = async (e) => {
        console.log(e)
        if (e.length < 3) return;
        const data = {
            "user_id": 1234,
            "pg_no": 0,
            "pg_size": 0,
            "search_key": e
        }
        const response = await APIService.getClientAdminPaginated(data)
        const res = await response.json()
        const results = res.data.map(e => {
            return {
                label: e[1],
                value: e[0]
            }
        })
        if (results === 'No Result Found') {
            return []
        }
        return results
    }
    const handleEdit  = async () => {
        console.log(formValues)
       const data = {
        "user_id" : 1234,
        "id" : currPayment,
        "paymentby": Number(formValues.paymentby),
            "amount": Number(formValues.amount),
            "paymentdate": formValues.paymentdate,
            "orderid": Number(formValues.orderid),
            "vendorid": Number(formValues.vendorid),
            "mode": Number(formValues.mode),
            "description": formValues.description,
            "tds": Number(formValues.tds),
            "servicetaxamount": Number(formValues.servicetaxamount),
            "entityid": 1,
            "officeid": 2
       }
       const response = await APIService.editVendorPayment(data)
       const res = await response.json()
       if(res.result == 'success') {
            showSuccess()
       }
    }
  return (
    <Modal open={true}
                fullWidth={true}
                maxWidth={'md'}
                className='flex justify-center items-center'
            >
                <div className='flex justify-center'>
                    <Draggable>
                    <div className="w-[1050px] h-auto bg-white rounded-lg">
                        <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-t-lg">
                            <div className="mr-[410px] ml-[410px]">
                                <div className="text-[16px]">Edit Vendor Payment</div>
                            </div>
                            <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                                <button onClick={handleClose}><img onClick={handleClose} className="w-[20px] h-[20px]" src={Cross} alt="cross" /></button>
                            </div>
                        </div>

                        <div className="h-auto w-full mt-[5px]">
                            <div className="flex gap-[48px] justify-center ">
                                <div className=" space-y-3 py-5">
                                    <div className="">
                                        <div className="text-sm text-[#787878]">Cura Office </div>
                                        <div className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs py-0.5 bg-[#F5F5F5]" type="text" name="curaoffice" value={formValues.curaoffice} onChange={handleChange} >Pune</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">
                                            Client <label className="text-red-500">*</label>
                                        </div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs py-0.5 bg-[#F5F5F5]" type="text" name="curaoffice" value={selectedOption.label} onChange={handleChange} readOnly/>
                                        {/* <AsyncSelect
                                            onChange={handleClientNameChange}
                                            value={selectedOption}
                                            loadOptions={loadOptions}
                                            cacheOptions
                                            defaultOptions
                                            onInputChange={(value) => setQuery(value)}

                                            styles={{
                                                control: (provided, state) => ({
                                                    ...provided,
                                                    minHeight: 25,
                                                    lineHeight: '1.3',
                                                    height: 2,
                                                    fontSize: 12,
                                                    padding: '1px'
                                                }),
                                                // indicatorSeparator: (provided, state) => ({
                                                //   ...provided,
                                                //   lineHeight : '0.5',
                                                //   height : 2,
                                                //   fontSize : 12 // hide the indicator separator
                                                // }),
                                                dropdownIndicator: (provided, state) => ({
                                                    ...provided,
                                                    padding: '3px', // adjust padding for the dropdown indicator
                                                }),
                                                options: (provided, state) => ({
                                                    ...provided,
                                                    fontSize: 12 // adjust padding for the dropdown indicator
                                                })
                                            }}
                                        /> */}
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.client}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-sm">
                                            Mode <label className="text-red-500">*</label>
                                        </div>
                                        <select
                                            className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs"
                                            name="mode"
                                            value={formValues.mode}
                                            onChange={handleChange}
                                        >
                                            {modesData.map((item) => (
                                                <option key={item[0]} value={item[0]}>
                                                    {item[1]}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.mode}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">Amount Paid <label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="amount" value={formValues.amount} onChange={handleChange} />
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">GST/ST </div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="servicetaxamount" value={formValues.servicetaxamount} onChange={handleChange} />
                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">Description </div>
                                        <textarea className="w-[230px] h-[80px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="description" value={formValues.description} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className=" space-y-3 py-5">
                                    <div className="">
                                        <div className="text-sm text-[#787878]">Payment ID </div>
                                        <div className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs py-0.5 bg-[#F5F5F5]" type="text" name="curaoffice" value={formValues.curaoffice} onChange={handleChange} ></div>
                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">
                                            Order <label className="text-red-500">*</label>
                                        </div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs py-0.5 bg-[#F5F5F5]" type="text" name="curaoffice" value={formValues.ordername} readOnly/>
                                        {/* <select
                                            className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                                            name="orderid"
                                            value={formValues.orderid}
                                            onChange={handleChange}
                                        >
                                            <option value="" >Select A Order</option>
                                            {orders.map((item) => (
                                                <option key={item.id} value={item.id}>
                                                    {item.ordername}
                                                </option>
                                            ))}
                                        </select> */}
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.orderid}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">Vendor <label className="text-red-500">*</label></div>
                                        <select className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" name="vendorid" value={formValues.vendorid} onChange={handleChange} >
                                            <option value={null}> Select Vendor</option>
                                            {vendorData.map(item => (
                                                <option key={item[0]} value={item[0]}>
                                                    {item[1]}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.vendorid}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">TDS Deduction </div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="tds" value={formValues.tds} onChange={handleChange} />
                                    </div>

                                    <div className="">
                                        <div className="text-[13px]">Payment Date <label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="date" name="paymentdate" value={formValues.paymentdate} onChange={handleChange} />
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.paymentdate}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-sm">Payment By <label className="text-red-500">*</label></div>
                                        <select className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs" name="paymentby" value={formValues.paymentby} onChange={handleChange} >
                                            {usersData.map(item => (
                                                <option key={item.id} value={item.id}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>

                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.PaymentBy}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-sm text-[#787878]">Order Date </div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs py-0.5 bg-[#F5F5F5]" type="text" name="curaoffice" value={tempFormValues.orderdate} readOnly />
                                    </div>
                                    <div className="">
                                        <div className="text-sm text-[#787878]">Order Status </div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs py-0.5 bg-[#F5F5F5]" type="text" name="curaoffice" value={tempFormValues.orderstatus} readOnly/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="my-3 flex justify-center items-center gap-[10px]">
                            <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' onClick={handleEdit} >Save</button>
                            <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleClose}>Cancel</button>
                        </div>
                    </div>
                    </Draggable>
                </div>
            </Modal>
  )
}

export default EditVendorPayment
