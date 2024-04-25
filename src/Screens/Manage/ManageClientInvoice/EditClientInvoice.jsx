import React, { useEffect, useState } from 'react'
import { Modal } from '@mui/material'
import Cross from "../../../assets/cross.png"
import { APIService } from '../../../services/API'
import AsyncSelect from "react-select/async"
const EditClientInvoice = ({handleClose,invoiceId}) => {
  const initialValues = {
        client: "",
        estimateAmount: "",
        baseAmount: "",
        invoiceAmount: "",
        invoiceDescription: "",
        order: null,
        estimateDate: null,
        gst: "",
        invoiceDate: null
  };
  const [formValues,setFormValues] = useState(initialValues)
  const [formErrors,setFormErrors] = useState({})
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
};
  const [orders,setOrders] = useState([])
  console.log(invoiceId)
  const fetchInitialData = async () => {
    const data = {
        "user_id" : 1234,
        "table_name" :  "get_orders_invoice_view",
        "item_id" : invoiceId 
    }
    const response = await APIService.getItembyId(data);
    const res = await response.json();
    console.log(res);
    const existing = {...formValues}
    if(res.data.clientid != null) {
        getOrdersByClientId(res.data.clientid)
    }
    existing.client = res.data.clientid 
    existing.estimateAmount = res.data.estimateamount 
    existing.baseAmount = res.data.baseamount 
    existing.invoiceAmount = res.data.invoiceamount
    existing.invoiceDescription = res.data.quotedescription
    existing.order = res.data.orderid 
    if(res.data.estimatedate != null) {
        existing.estimateDate = res.data.estimatedate.split('T')[0] 
    }
    
    existing.gst = res.data.tax
    existing.invoiceDate = res.data.invoicedate
    setFormValues(existing)
    const temp = {...selectedOption};
    temp.value = res.data.clientid 
    temp.label = res.data.clientname 
    setSelectedOption(temp)
  }
  useEffect(() => {
    fetchInitialData();
  },[])
  const handleEdit = async () => {
    const data = {

    }
    const response = await APIService.editOrdersInvoice(data);
    const res = await response.json();
    console.log(res)
  }











  // we have the client name here
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
    //    const existing = {...formValues}
    //    const temp = {...existing.client_property}
    //    temp.clientid = e.value
    //    existing.client_property = temp;
    //    setFormValues(existing)
    console.log(formValues)
    setSelectedOption(e)
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

    // if(res.data.length >= 1) {
    //    const existing = {...formValues}
    //    existing.order = res.data[0].id
    //    console.log(res.data[0].id)
    //    setFormValues(existing)

    // } 
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
            <div className="h-10 bg-[#EDF3FF]  justify-center flex items-center rounded-t-lg">
                <div className="mr-[410px] ml-[410px]">
                    <div className="text-base">Edit Client Invoice </div>
                </div>
                <div className="flex justify-center items-center rounded-full w-7 h-7 bg-white">
                    <button onClick={handleClose}><img onClick={handleClose} className="w-5 h-5" src={Cross} alt="cross" /></button>
                </div>
            </div>

            <div className="text-sm text-center mt-1 font-semibold">Invoice ID:</div>

            <div className="h-auto w-full mt-1 ">
                <div className="flex gap-12 justify-center">
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
                            <div className="text-sm">Estimate Amount</div>
                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="estimateAmount" value={formValues.estimateAmount} onChange={handleChange} />

                        </div>
                        <div className="">
                            <div className="text-sm">Base Amount</div>
                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="baseAmount" value={formValues.baseAmount} onChange={handleChange} />

                        </div>
                        <div className="">
                            <div className="text-sm">Invoice Amount</div>
                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="invoiceAmount" value={formValues.invoiceAmount} onChange={handleChange} />
                        </div>
                        <div className="">
                            <div className="text-sm">Quote/Invoice Description <label className="text-red-500">*</label></div>
                            <textarea className="w-56 h-16 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="invoiceDescription" value={formValues.invoiceDescription} onChange={handleChange} />
                            <div className="text-[10px] text-[#CD0000] ">{formErrors.invoiceDescription}</div>
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
                            <div className="text-sm">Estimate Date</div>
                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="date" name="estimateDate" value={formValues.estimateDate} onChange={handleChange} />
                        </div>
                        <div className="">
                            <div className="text-sm">GST/ST</div>
                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="gst" value={formValues.gst} onChange={handleChange} />
                        </div>
                        <div className="">
                            <div className="text-sm">Invoice Date</div>
                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="date" name="invoiceDate" value={formValues.invoiceDate} onChange={handleChange} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-3 flex justify-center items-center gap-3">
                <button className='w-28 h-10 bg-[#004DD7] text-white rounded-md text-lg' onClick={handleEdit} >Save</button>
                <button className='w-28 h-10 border-[1px] border-[#282828] rounded-md text-lg' onClick={handleClose}>Cancel</button>
            </div>

        </div>
    </div>
</Modal>
  )
}

export default EditClientInvoice
