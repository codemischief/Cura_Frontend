import React, { useState, useEffect } from 'react'
import { CircularProgress, Modal, useScrollTrigger, MenuItem, Tooltip } from '@mui/material'
import Cross from "../../../assets/cross.png"
import { APIService } from '../../../services/API'
import AsyncSelect from "react-select/async"
import DropDown from '../../../Components/Dropdown/Dropdown';
import Draggable from 'react-draggable'
import useAuth from '../../../context/JwtContext'
import ClientPropertySelectNative from '../../../Components/common/select/ClientPropertySelectNative'
import OrderCustomSelectNative from '../../../Components/common/select/OrderCustomSelectNative'
const EditVendorPayment = ({ handleClose, currPayment, vendorData, usersData, showSuccess, showCancel , state}) => {
    const {user} = useAuth()
    
    const initialValues = {
        client: null,
        paymentby: user.id,
        amount: null,
        paymentdate: null,
        orderid: null,
        ordername: null,
        vendorid: null,
        mode: null,
        description: null,
        tds: null,
        servicetaxamount: null,
        entityid: null,
        officeid: null,
        orderdate: null,
        orderstatus: null
    };
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const [modesData, setModesData] = useState([])
    const fetchModesData = async () => {
        const data = {
            "user_id": user.id
        }
        const response = await APIService.getModesAdmin(data)
        const res = await response.json()
        setModesData(res.data)
    }
    const [orders, setOrders] = useState([])
    // const [vendorData,setVendorData] = useState([])
    const [pageLoading, setPageLoading] = useState(false)
    // const [usersData,setUsersData] = useState([])
    const fetchInitialData = async () => {
        setPageLoading(true)
        const data = {
            "user_id": user.id,
            "table_name": "get_vendor_payment_view",
            "item_id": currPayment
        }
        const response = await APIService.getItembyId(data)
        const res = await response.json()
        
        const existing = { ...formValues }
        existing.client = res.data.clientid
        getOrdersByClientId(res.data.clientid)

        existing.paymentby = res.data.paymentby
        existing.amount = res.data.amount
        existing.paymentdate = res.data.paymentdate
        existing.orderid = res.data.orderid
        getOrdersData(res.data.orderid)

        existing.vendorid = res.data.vendorid
        existing.mode = res.data.mode
        existing.description = res.data.description
        existing.tds = res.data.tds
        existing.servicetaxamount = res.data.servicetaxamount
        existing.ordername = res.data.briefdescription
        const temp = { ...selectedOption }
        temp.label = res.data.clientname
        temp.value = res.data.clientid
        setSelectedOption(temp)
        // existing.entityid = res.data 
        // existing.officeid = res.data.
        setFormValues(existing)
        setTimeout(() => {
            setPageLoading(false)
        }, 1000)
    }
    const getOrdersByClientId = async (id) => {
        // 
        const data = {
            "user_id": user.id,
            "client_id": id,
            "mode":"edit"
        }
        const response = await APIService.getOrdersByClientId(data)
        const res = await response.json()
        
        setOrders((prev) => {
            const temp = {}
             res.data.forEach((item) => {
                temp[item.id] = item.ordername;
              });
            return temp
        })
    }
    const [tempFormValues, setTempFormValues] = useState({})
    const getOrdersData = async (id) => {
        const data = { "user_id": user.id, "orderid": id }
        const response = await APIService.getOrderPending(data)
        const res = await response.json()
        console.log(res.data)
        const existing = { ...tempFormValues }
        existing.orderdate = res.data.orderdate
        existing.orderstatus = res.data.orderstatus
        setTempFormValues(existing)
        
    }
    useEffect(() => {
        fetchModesData()
        fetchInitialData()
    }, [])



    const [selectedOption, setSelectedOption] = useState({
        label: "Enter Client Name",
        value: null
    });
    const [query, setQuery] = useState('')
    const handleClientNameChange = (e) => {
        
        
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
        
        setSelectedOption(e)
    }

    const loadOptions = async (e) => {
        
        if (e.length < 3) return;
        const data = {
            "user_id": user.id,
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
    const handleEdit = async () => {
        if (!validate()) {
            
            return;
        }
        
        const data = {
            "user_id": user.id,
            "id": currPayment,
            "paymentby": Number(formValues.paymentby),
            "amount": Number(formValues.amount),
            "paymentdate": formValues.paymentdate,
            "orderid": Number(formValues.orderid),
            "vendorid": Number(formValues.vendorid),
            "mode": Number(formValues.mode),
            "description": formValues.description,
            "tds": formValues.tds ? Number(formValues.tds) : null,
            "servicetaxamount": formValues.servicetaxamount ? Number(formValues.servicetaxamount) : null,
            "entityid": 1,
            "officeid": 2
        }
        const response = await APIService.editVendorPayment(data)
        const res = await response.json()
        if (res.result == 'success') {
            showSuccess()
        }
    }

    const validate = () => {
        var res = true;

        if (!formValues.client) {
            setFormErrors((existing) => {
                return { ...existing, client: "Select Client" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, client: "" }
            })
        }
        if (formValues.orderid == null || formValues.orderid == "") {
            setFormErrors((existing) => {
                return { ...existing, orderid: "Select Order" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, orderid: "" }
            })
        }
        if (formValues.mode == null || formValues.mode == "") {
            setFormErrors((existing) => {
                return { ...existing, mode: "Select Mode" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, mode: "" }
            })
        }
        if (formValues.amount == null || formValues.amount == "") {
            setFormErrors((existing) => {
                return { ...existing, amount: "Enter Amount" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, amount: "" }
            })
        }
        if (formValues.vendorid == null || formValues.vendorid == "") {
            setFormErrors((existing) => {
                return { ...existing, vendorid: "Enter Vendor" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, vendorid: "" }
            })
        }
        if (formValues.paymentdate == null || formValues.paymentdate == "") {
            setFormErrors((existing) => {
                return { ...existing, paymentdate: "Enter Payment Date" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, paymentdate: "" }
            })
        }
        if (formValues.paymentby == null || formValues.paymentby == "") {
            setFormErrors((existing) => {
                return { ...existing, paymentby: "Enter Payment By" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, paymentby: "" }
            })
        }

        return res;
    }

    const close = () => {
        handleClose();
        showCancel();
    }
    return (
        <Modal open={true}
            fullWidth={true}
            maxWidth={'md'}
            className='flex justify-center items-center'
        >
            <>
                <Draggable handle='div.move'>
                    <div className='flex justify-center'>
                        <div className="w-[1050px] h-auto bg-white rounded-lg">
                            <div className="move cursor-move">
                                <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-t-lg">
                                    <div className="mr-[410px] ml-[410px]">
                                        <div className="text-[16px]">Edit Vendor Payment</div>
                                    </div>
                                    <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                                        <button onClick={() => { close() }}><img onClick={handleClose} className="w-[20px] h-[20px]" src={Cross} alt="cross" /></button>
                                    </div>
                                </div>
                            </div>
                            {pageLoading && <div className='flex space-x-2 items-center justify-center py-4'>
                                <CircularProgress />
                                <h1>Fetching Data</h1>
                            </div>
                            }
                            {!pageLoading &&
                                <div className="h-auto w-full mt-[5px]">
                                    <div className="flex gap-[48px] justify-center ">
                                        <div className=" space-y-3 py-5">
                                            <div className="">
                                                <div className="text-sm text-[#787878] mb-1">Cura Office </div>
                                                <div className="w-[230px] h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs py-0.5 bg-[#F5F5F5]" type="text" name="curaoffice" value= {formValues.curaoffice} onChange={handleChange}>Pune</div>
                                            </div>
                                            <div className="">
                                                <div className="text-[13px] text-[#787878]">
                                                    Client
                                                </div>
                                                <Tooltip title={selectedOption.label} arrow>

                                                <input className="w-[230px] h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs py-0.5 bg-[#F5F5F5] whitespace-nowrap overflow-hidden text-ellipsis" type="text" name="curaoffice" value={selectedOption.label} onChange={handleChange} readOnly />
                                                </Tooltip>
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
                                                <div className="text-[9px] text-[#CD0000] absolute">{formErrors.client}</div>
                                            </div>
                                            <div className="">
                                                <div className="text-sm">
                                                    Mode <label className="text-red-500">*</label>
                                                </div>
                                                <select
                                                    className="w-[230px] h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs"
                                                    name="mode"
                                                    value={formValues.mode}
                                                    onChange={handleChange}
                                                >
                                                    {modesData.map((item) => {
                                                        return <option key={item[0]} value={item[0]}>
                                                                  {item[1]}
                                                        </option>
                                                        // if (item[0] == formValues.mode && item[1][0] == 'Z') {
                                                        //     return <option key={item[0]} value={item[0]} selected hidden>
                                                        //         {item[1]}
                                                        //     </option>
                                                        // } else if (item[0] == formValues.mode) {
                                                        //     <option key={item[0]} value={item[0]} selected >
                                                        //         {item[1]}
                                                        //     </option>
                                                        // } else if (item[1][0] == 'Z') {
                                                        //     return <option key={item[0]} value={item[0]} hidden>
                                                        //         {item[1]}
                                                        //     </option>
                                                        // }
                                                        // else {
                                                        //     return <option key={item[0]} value={item[0]} >
                                                        //         {item[1]}
                                                        //     </option>
                                                        // }
                                                    })}
                                                </select>
                                                <div className="text-[9px] text-[#CD0000] absolute ">{formErrors.mode}</div>
                                            </div>
                                            <div className="">
                                                <div className="text-[13px]">Amount Paid <label className="text-red-500">*</label></div>
                                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="number" name="amount" value={formValues.amount} onChange={handleChange} />
                                                <div className="text-[9px] text-[#CD0000] absolute ">{formErrors.amount}</div>
                                            </div>
                                            <div className="">
                                                <div className="text-[13px]">GST/ST </div>
                                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="number" name="servicetaxamount" value={formValues.servicetaxamount} onChange={handleChange} />
                                            </div>
                                            <div className="">
                                                <div className="text-[13px]">Description </div>
                                                <textarea className="w-[230px] h-[80px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px] resize-none" type="text" name="description" value={formValues.description} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className=" space-y-3 py-5">
                                            <div className="">
                                                <div className="text-sm text-[#787878]">Payment ID </div>
                                                <input className="w-[230px] h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs py-0.5 bg-[#F5F5F5]" type="text" name="curaoffice" value={currPayment} readOnly />
                                            </div>
                                            <div className="">
                                                <div className="text-[13px] text-[#787878]">
                                                    Order <label className="text-red-500">*</label>
                                                </div>
                                                {/* <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs py-0.5 bg-[#F5F5F5]" type="text" name="curaoffice" value={formValues.ordername} readOnly /> */}
                                                {state?.hyperlinked ? <Tooltip title={state.orderdescription} arrow>
                                                    <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs py-0.5 bg-[#F5F5F5] whitespace-nowrap overflow-hidden text-ellipsis" type="text" name="orderdescription" value={state.orderdescription} readOnly />
                                                </Tooltip>  : 
                                                <OrderCustomSelectNative
                                           data={Object.keys(orders)}
                                           value={orders?.[formValues.orderid] ? orders?.[formValues.orderid]:null}
                                           placeholder="Select Orders"
                                           isSticky={true}
                                           width={'230px'}
                                           headerText={{
                                            first : 'Order Description',
                                            second : 'ID',
                                          }}
                                          renderData={(item) => {
                                            return (
                                              <MenuItem value={item} key={item} sx={{ width : '230px', gap : '5px', fontSize : '12px'}}>
                                                <p className="w-[80%] " style={{ overflowWrap: 'break-word', wordWrap: 'break-word', whiteSpace: 'normal', margin: 0 }}>
                                                   {orders[item]}
                                                </p>
                                                <p className='w-[20%]'>
                                                    {item}
                                                </p>
                                                
                                               
                                              </MenuItem>
                                            );
                                          }}
                                          onChange={(e) => {
                                            setFormValues({ ...formValues, orderid: e.target.value })
                                           }}
                                           
                                        
                                        />}
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
                                        </select> 
                                                <div className="text-[9px] text-[#CD0000] ">{formErrors.orderid}</div> */}
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
                                                <div className="text-[9px] text-[#CD0000] absolute ">{formErrors.vendorid}</div>
                                            </div>
                                            <div className="">
                                                <div className="text-[13px]">TDS Deducted </div>
                                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="number" name="tds" value={formValues.tds} onChange={handleChange} />
                                            </div>

                                            <div className="">
                                                <div className="text-[13px]">Payment Date <label className="text-red-500">*</label></div>
                                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="date" name="paymentdate" value={formValues.paymentdate} onChange={handleChange} />
                                                <div className="text-[9px] text-[#CD0000] absolute ">{formErrors.paymentdate}</div>
                                            </div>
                                            <div className="">
                                                <div className="text-sm">Payment By <label className="text-red-500">*</label></div>
                                                {/* <select className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs" name="paymentby" value={formValues.paymentby} onChange={handleChange} >
                                            {usersData.map(item => (
                                                <option key={item.id} value={item.id}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select> */}
                                        <ClientPropertySelectNative
                        data={Object.keys(usersData)}
                        value={usersData?.[formValues.paymentby]?.name ? usersData?.[formValues.paymentby]?.name:null}
                        placeholder="Select Payment By"
                        isSticky={true}
                        menuMaxHeight="16rem"
                        noDataText="Select Username"
                        headerText={{
                            first : 'Name',
                            second : 'Username'
                        }}
                        renderData={(item) => {
                            return (
                              <MenuItem value={item} key={item} sx={{ width : '230px', gap : '5px', fontSize : '12px'}}>
                                <p className="w-[50%] " style={{ overflowWrap: 'break-word', wordWrap: 'break-word', whiteSpace: 'normal', margin: 0 }}>
                                   {usersData[item].name}
                                </p>
                                <p className='w-[50%]' style={{ overflowWrap: 'break-word', wordWrap: 'break-word', whiteSpace: 'normal', margin: 0 }}>
                                  {usersData[item].username}
                                </p>
                                
                               
                              </MenuItem>
                            );
                          }}
                          onChange={(e) => {
                            const temp = {...formValues}
                            temp.paymentby = e.target.value 
                            setFormValues(temp)
                            
                           }}
                        />
                                                {/* <DropDown options={usersData} initialValue="Select Payment By" leftLabel="Name" rightLabel={"Username"} leftAttr="name" rightAttr="username" toSelect="name" handleChange={handleChange} formValueName="paymentby" value={formValues.paymentby} idName="id" /> */}
                                                <div className="text-[9px] text-[#CD0000] absolute ">{formErrors.paymentBy}</div>
                                            </div>
                                            <div className="">
                                                <div className="text-sm text-[#787878]">Order Date </div>
                                                <input className="w-[230px] h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs py-0.5 bg-[#F5F5F5]" type="text" name="curaoffice" value={tempFormValues.orderdate} readOnly />
                                            </div>
                                            <div className="">
                                                <div className="text-sm text-[#787878]">Order Status </div>
                                                <input className="w-[230px] h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs py-0.5 bg-[#F5F5F5]" type="text" name="curaoffice" value={tempFormValues.orderstatus} readOnly />
                                            </div>
                                        </div>
                                    </div>
                                </div>}
                            <div className="my-3 flex justify-center items-center gap-[10px]">
                                <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' onClick={handleEdit} >Save</button>
                                <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={() => { close() }}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </Draggable>
            </>
        </Modal>
    )
}

export default EditVendorPayment
