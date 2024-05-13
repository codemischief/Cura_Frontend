import React, { useEffect, useState } from 'react'
import { Modal } from '@mui/material'
import Cross from "../../../assets/cross.png"
import { APIService } from '../../../services/API'
import AsyncSelect from "react-select/async"
import Draggable from 'react-draggable'
const EditOrderReceipt = ({ handleClose, receiptId, showSuccess, modesData, usersData, showCancel }) => {
    const initialValues = {
        client: "",
        clientname: "",
        order: null,
        receiptMode: 5,
        receivedBy: 1,
        TDS: null,
        receiptDescription: "",
        receivedDate: null,
        amountReceived: "",
        orderdate: null,
        orderstatus: null,
        pendingAmount: null,
        ordername : null
    }
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    // const [modesData,setModesData] = useState([]);
    // const [usersData,setUsersData] = useState([]);
    const [orders, setOrders] = useState([]);
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
        if (!formValues.receiptMode) {
            setFormErrors((existing) => {
                return { ...existing, receiptMode: "Select Receipt Mode" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, receiptMode: "" }
            })
        }
        if (!formValues.receivedBy) {
            setFormErrors((existing) => {
                return { ...existing, receivedBy: "Select Received By" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, receivedBy: "" }
            })
        }
        if (!formValues.receivedDate) {
            setFormErrors((existing) => {
                return { ...existing, receivedDate: "Select Received Date" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, receivedDate: "" }
            })
        }
        if (!formValues.amountReceived) {
            setFormErrors((existing) => {
                return { ...existing, amountReceived: "Enter Amount Received" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, amountReceived: "" }
            })
        }
        if (!formValues.order || formValues.order == "") {
            setFormErrors((existing) => {
                return { ...existing, order: "Select Order" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, order: "" }
            })
        }

        return res;
    }
    const handleEdit = async () => {
        // we need to edit the order receipt here
        if (!validate()) {
            return
        }
        const data = {
            "user_id": 1234,
            "id": receiptId,
            "receivedby": formValues.receivedBy,
            "amount": formValues.pendingAmount - formValues.amountReceived,
            "tds": formValues.TDS,
            "recddate": formValues.receivedDate,
            "paymentmode": formValues.receiptMode,
            "receiptdesc": formValues.receiptDescription,
            "orderid": formValues.order,
            "entityid": 1,
            "officeid": 2
        }

        const response = await APIService.editOrdersReceipt(data);
        const res = await response.json();
        console.log(res)
        if (res.result == 'success') {
            showSuccess()
        }
    }
    const [pageLoading, setPageLoading] = useState(false);
    const fetchInitialData = async () => {
        setPageLoading(true);
        // we need to fetch the initial data here
        const data = {
            "user_id": 1234,
            "table_name": "get_orders_receipt_view",
            "item_id": receiptId
        }
        const response = await APIService.getItembyId(data);
        const res = await response.json();
        console.log(res)
        const existing = { ...formValues };
        existing.client = res.data.clientid
        existing.clientname = res.data.clientname
        getOrdersByClientId(res.data.clientid)
        existing.order = res.data.orderid
        existing.receiptMode = res.data.paymentmode
        existing.receivedBy = res.data.receivedby
        existing.TDS = res.data.tds
        existing.receiptDescription = res.data.receiptdesc
        existing.receivedDate = res.data.recddate
        existing.amountReceived = res.data.amount
        getOrderData(res.data.orderid)
        // existing.pendingAmount = res.data.amount
        existing.ordername = res.data.briefdescription
        existing.orderstatus = res.data.status
        existing.orderdate = res.data.orderdate
        setFormValues(existing)
        const temp = { ...selectedOption }
        temp.label = res.data.clientname
        temp.value = res.data.clientid
        setSelectedOption(temp)
        setPageLoading(false)
    }
    const [orderData,setOrderData] = useState({
        pendingamount : null,
        orderdate : null,
        orderstatus : null
    })
    useEffect(() => {

        fetchInitialData()

    }, [])



    // we need to fetch all utility routes here

    // const fetchModesData = async () => {
    //     const data = {
    //         "user_id": 1234
    //     }
    //     const response = await APIService.getModesAdmin(data)
    //     const res = await response.json()
    //     setModesData(res.data)
    //     console.log(res)
    // }
    // const fetchUsersData = async () => {
    //     const data = {
    //         "user_id": 1234
    //     }
    //     const response = await APIService.getUsers(data)
    //     const res = await response.json()
    //     const existing = { ...formValues }
    //     existing.receivedBy = res.data[0].id,
    //         console.log(existing.receivedBy)
    //     setFormValues(existing)
    //     setUsersData(res.data)
    // }
    const getOrdersByClientId = async (id) => {
        console.log('hello')
        const data = {
            "user_id": 1234,
            "client_id": id
        }
        const response = await APIService.getOrdersByClientId(data)
        const res = await response.json()
        console.log(res.data)
        setOrders(res.data)
    }


    // we finish utility routes here



    // client name
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
        setFormValues(existing)
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
    const close = () => {
        handleClose();
        showCancel();
    }
    const getOrderData = async  (id) => {
        const data = {"user_id":1234,"orderid": Number(id)}
        const response = await APIService.getOrderPending(data)
        const res = await response.json()
        console.log(res)
        const temp = {...orderData}
        temp.pendingamount = res.data.pending 
        temp.orderdate = res.data.orderdate
        temp.orderstatus = res.data.orderstatus
        setOrderData(temp)
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
                                <div className="text-[16px]">Edit Order Receipt</div>
                            </div>
                            <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                                <button onClick={() => { close() }}><img className="w-[20px] h-[20px]" src={Cross} alt="cross" /></button>
                            </div>
                        </div>
                        {!pageLoading &&
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
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs py-0.5 bg-[#F5F5F5]" type="text" name="curaoffice" value={formValues.clientname} readOnly />
                                        </div>
                                        <div className="">
                                            <div className="text-sm">
                                                Receipt Mode <label className="text-red-500">*</label>
                                            </div>
                                            <select
                                                className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs"
                                                name="receiptMode"
                                                value={formValues.receiptMode}
                                                onChange={handleChange}
                                            >
                                                {modesData.map((item) => (
                                                    <option key={item[0]} value={item[0]}>
                                                        {item[1]}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.receiptMode}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-sm">
                                                Received By <label className="text-red-500">*</label>
                                            </div>
                                            <select
                                                className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs"
                                                name="receivedBy"
                                                value={formValues.receivedBy}
                                                onChange={handleChange}
                                            >
                                                {/* <option value="none" hidden >Select Received By</option> */}
                                                {usersData.map((item) => (
                                                    <option key={item.id} value={item.id}>
                                                        {item.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.receivedBy}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">TDS </div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="TDS" value={formValues.TDS} onChange={handleChange} />
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Receipt Description </div>
                                            <textarea className="w-[230px] h-[70px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="receiptDescription" value={formValues.receiptDescription} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className=" space-y-3 py-5">
                                        <div className="">
                                            <div className="text-sm text-[#787878]">Receipt ID </div>
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs py-0.5 bg-[#F5F5F5]" type="text" name="curaoffice" value={receiptId} readOnly />
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">
                                                Order <label className="text-red-500">*</label>
                                            </div>
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs py-0.5 bg-[#F5F5F5]" value={formValues.ordername} readOnly />
                                            {/* <select
                                                className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                                                name="order"
                                                value={formValues.order}
                                                onChange={handleChange}
                                            >
                                                <option value="" >Select A Order</option>
                                                {orders.map((item) => (
                                                    <option key={item.id} value={item.id}>
                                                        {item.ordername}
                                                    </option>
                                                ))}
                                            </select> */}
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.order}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Received Date <label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="date" name="receivedDate" value={formValues.receivedDate} onChange={handleChange} />
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.receivedDate}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-sm">Amount Received <label className="text-red-500">*</label></div>
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs" type="text" name="amountReceived" value={formValues.amountReceived} onChange={handleChange} />
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.amountReceived}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-sm text-[#787878]">Pending Amount </div>
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs py-0.5 bg-[#F5F5F5]" type="text" name="curaoffice" value={orderData.pendingamount} readOnly />
                                        </div>
                                        <div className="">
                                            <div className="text-sm text-[#787878]">Order Date </div>
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs py-0.5 bg-[#F5F5F5]" type="text" name="curaoffice" value={orderData.orderdate} readOnly />
                                        </div>
                                        <div className="">
                                            <div className="text-sm text-[#787878]">Order Status </div>
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs py-0.5 bg-[#F5F5F5]" type="text" name="curaoffice" value={orderData.orderstatus} readOnly />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="my-3 flex justify-center items-center gap-[10px]">
                            <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' onClick={handleEdit} >Save</button>
                            <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={() => { close() }}>Cancel</button>
                        </div>
                    </div>
                </Draggable>
            </div>
        </Modal>
    )
}

export default EditOrderReceipt
