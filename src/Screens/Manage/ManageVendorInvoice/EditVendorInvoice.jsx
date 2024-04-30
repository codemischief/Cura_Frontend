import React, { useEffect, useState } from 'react'
import { Modal } from '@mui/material'
import Cross from "../../../assets/cross.png"
import { APIService } from '../../../services/API'
import AsyncSelect from "react-select/async"
const EditVendorInvoice = ({handleClose,currInvoice,showSuccess,vendorData,}) => {
    const initialValues = {
        client: null,
        vendor: null,
        invoiceAmount: null,
        estimateDate: null,
        vat5: null,
        invoiceNumber: null,
        gst: null,
        estimateAmount: null,
        vat12: null,
        order: null,
        invoiceDate: null,
        invoicedescription: null,
        notes:null,
    };
    const [formValues,setFormValues] = useState(initialValues)
    const [formErrors,setFormErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const [orders,setOrders] = useState([])
    // const [vendorData,setVendorData] = useState([])
    const handleAddVendorInvoice = () => {
      
    }
    const fetchInitialData = async () => {
        const data = {
            "user_id" : 1234,
            "item_id" : currInvoice,
            "table_name" : "get_vendor_invoice_view"
        }
        // {"user_id":1234,"table_name":"employee","item_id":98}
        console.log('called')
        const response = await APIService.getItembyId(data)
        const res = await response.json()
        console.log(res)
        const existing = {...formValues}
        existing.client = res.data.clientid
        getOrdersByClientId(res.data.clientid) 
        existing.vendor = res.data.vendorid
        existing.invoiceAmount = res.data.invoiceamount 
        existing.gst = res.data.servicetax 
        existing.estimateDate = res.data.estimatedate 
        existing.vat5 = res.data.vat1 
        existing.vat12 = res.data.vat2 
        existing.invoiceNumber = res.data.invoicenumber 
        existing.estimateAmount = res.data.amount 
        existing.order = res.data.orderid 
        existing.invoiceDate = res.data.invoicedate
        // existing.invoicedescription = res.data 
        existing.invoicedescription = res.data.estimatedesc
        existing.notes = res.data.notes
        setFormValues(existing)
        const temp = {...selectedOption}
        temp.value = res.data.clientid 
        temp.label  = res.data.clientname 
        setSelectedOption(temp)
    }
    useEffect(() => {
        fetchInitialData()
    },[])
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
        if(!validate()) {
            return 
        }
        const data = {
            "user_id": 1234,
            "id":currInvoice,
            "estimatedate":formValues.estimateDate,
            "amount":formValues.estimateAmount,
            "estimatedesc":formValues.invoicedescription,
            "orderid":formValues.order,
            "vendorid":formValues.vendor,
            "invoicedate":formValues.invoiceDate,
            "invoiceamount":formValues.invoiceAmount,
            "notes":formValues.notes,
            "vat1":formValues.vat5,
            "vat2":formValues.vat12,
            "servicetax":formValues.gst,
            "invoicenumber":formValues.invoiceNumber,
            "entityid":1,
            "officeid":2
          }
          const response = await APIService.editVendorInvoice(data)
          const res  = await response.json()
          console.log(res)
          if(res.result == 'success') {
            showSuccess()
          }
    }



    
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
        existing.order = null
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



    return (
        <Modal open={true}
        fullWidth={true}
        maxWidth={'md'}
        className='flex justify-center items-center'
    >
        <div className='flex justify-center'>
            <div className="w-[1050px] h-auto bg-white rounded-lg">
                <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-t-lg">
                    <div className="mr-[410px] ml-[410px]">
                        <div className="text-[16px]">Edit Vendor Invoice</div>
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
                                <div className="text-[13px]">Vendor</div>
                                <select className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" name="vendor" value={formValues.vendor} onChange={handleChange} >
                                    <option value={null}> Select Vendor</option>
                                    {vendorData.map(item => (
                                        <option key={item[0]} value={item[0]}>
                                            {item[1]}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="">
                                <div className="text-[13px]">Invoice Amount </div>
                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="invoiceAmount" value={formValues.invoiceAmount} onChange={handleChange} />
                            </div>
                            <div className="">
                                <div className="text-[13px]">Estimate Date </div>
                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="date" name="estimateDate" value={formValues.estimateDate} onChange={handleChange} />
                            </div>
                            <div className="">
                                <div className="text-[13px]">Vat 5% </div>
                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="vat5" value={formValues.vat5} onChange={handleChange} />
                            </div>

                        </div>
                        <div className=" space-y-3 py-5">
                            <div className="">
                                <div className="text-[13px]">
                                    Client <label className="text-red-500">*</label>
                                </div>
                                <AsyncSelect
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
                                />
                                <div className="text-[10px] text-[#CD0000] ">{formErrors.client}</div>
                            </div>
                            <div className="">
                                <div className="text-[13px]">Invoice Number </div>
                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="invoiceNumber" value={formValues.invoiceNumber} onChange={handleChange} />
                            </div>
                            <div className="">
                                <div className="text-[13px]">GST/ST </div>
                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="gst" value={formValues.gst} onChange={handleChange} />
                            </div>
                            <div className="">
                                <div className="text-[13px]">Estimate Amount </div>
                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="estimateAmount" value={formValues.estimateAmount} onChange={handleChange} />
                            </div>
                            <div className="">
                                <div className="text-[13px]">VAT 12.5% </div>
                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="vat12" value={formValues.vat12} onChange={handleChange} />
                            </div>
                        </div>
                        <div className=" space-y-3 py-5">
                            <div className="">
                                <div className="text-[13px]">
                                    Order <label className="text-red-500">*</label>
                                </div>
                                <select
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
                                </select>
                                <div className="text-[10px] text-[#CD0000] ">{formErrors.order}</div>
                            </div>
                            <div className="">
                                <div className="text-[13px]">Invoice Date </div>
                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="date" name="invoiceDate" value={formValues.invoiceDate} onChange={handleChange} />
                            </div>
                            <div className="">
                                <div className="text-[13px]">Invoice/Estimate Description </div>
                                <textarea className="w-[230px] h-[80px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="invoicedescription" value={formValues.invoicedescription} onChange={handleChange} />
                            </div>
                            <div className="">
                                <div className="text-[13px]">Notes </div>
                                <textarea className="w-[230px] h-[80px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="notes" value={formValues.notes} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="my-3 flex justify-center items-center gap-[10px]">
                    <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' onClick={handleEdit} >Save</button>
                    <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleClose}>Cancel</button>
                </div>
            </div>
        </div>
    </Modal>
  )    
}

export default EditVendorInvoice

