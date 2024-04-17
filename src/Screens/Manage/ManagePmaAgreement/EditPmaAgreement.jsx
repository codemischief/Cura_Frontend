import React, { useEffect, useState } from 'react'
import Cross from "../../../assets/cross.png"
import { Modal } from '@mui/material'
import { APIService } from '../../../services/API'
import AsyncSelect from "react-select/async"
const EditPmaAgreement = ({handleClose,currPma}) => {
    console.log(currPma)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }
    const initialValues = {
        pmaStartDate : null,
        poaStartDate : null,
        actualEndDate : null,
        reason : "Bugs",
        rentFee : 100,
        pmaEndDate : null,
        poaEndDate : null,
        poaHolderName : "Abhishek",
        description : "spacious",
        scan : "example",
        fixedfee : 56,
        status : false,
        clientProperty : null
    }
    const fetchInitialData = async () => {
        const data = {
            "user_id" : 1234,
            "item_id" : currPma,
            "table_name" : "get_client_property_pma_view"
        }
        const response = await APIService.getItembyId(data)
        const res = await response.json()
        console.log(res)
        const existing = {...formValues}
        existing.poaHolderName = res.data.poaholder
        existing.reason = res.data.reasonforearlyterminationifapplicable
        existing.rentFee = res.data.rented
        existing.description = res.data.description
        existing.scan = res.data.scancopy
        existing.fixedfee = res.data.fixed
        existing.status = res.data.active
        existing.clientProperty = res.data.clientpropertyid
        existing.actualEndDate = res.data.actualenddate
        if(res.data.startdate) {
            existing.pmaStartDate = res.data.startdate.split('T')[0]
        }
        if(res.data.enddate) {
            existing.pmaEndDate = res.data.enddate.split('T')[0]
        }
        if(res.data.poastartdate) {
            existing.poaStartDate = res.data.poastartdate.split('T')[0]
        }
        if(res.data.poaenddate) {
            existing.poaEndDate = res.data.poaenddate.split('T')[0]
        }
        if(res.data.actualenddate) {
            existing.actualEndDate = res.data.actualenddate.split('T')[0]
        }
        const temp = {...selectedOption}
        temp.label = res.data.clientname
        temp.value = res.data.clientid
        setSelectedOption(temp)
        setFormValues(existing)
        getClientPropertyByClientId(res.data.clientid)
        getOrdersByClientId(res.data.clientid)
    }
    const [formErrors,setFormErrors] = useState({})
    const [formValues,setFormValues] = useState(initialValues)
    const order = [];
    const [clientProperty,setClientProperty] = useState([]);
    const handleEdit = async () => {
        const data = {
            "user_id": 1234,
            "clientpropertyid": formValues.clientProperty,
            "startdate":formValues.pmaStartDate,
            "enddate":formValues.pmaEndDate,
            "actualenddate":formValues.actualEndDate,            
            "active":formValues.status,
            "scancopy":formValues.scan,
            "reasonforearlyterminationifapplicable":formValues.reason,
            "description":formValues.description,
            "rented":formValues.rentFee,
            "fixed":formValues.fixedfee,
            "rentedtax":false,
            "fixedtax":false,
            "orderid":435229,
            "poastartdate":formValues.poaStartDate,
            "poaenddate":formValues.poaEndDate,
            "poaholder":formValues.poaHolderName,
            "id":currPma
        }
        const response = await APIService.editClientPMAAgreement(data)
        const res = await response.json()
        console.log(res)
    }
    const [clientPropertyData,setClientPropertyData] = useState([]);
    const getClientPropertyByClientId = async (id) => {
       const data = {
        "user_id" : 1234,
        "client_id" : id
       }

       const response = await APIService.getClientPropertyByClientId(data)
       const res = await response.json()
       console.log(res)
       setClientPropertyData(res.data)
    }
    const [orders,setOrders] = useState([]);
    const getOrdersByClientId = async (id) => {
        console.log('hello')
        const data = {
            "user_id" :1234,
            "client_id" : id
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
        existing.client = e.value
        // getOrdersByClientId(e.value)
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

    useEffect(() => {
      fetchInitialData()
       
    },[])
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
                    <div className="text-[16px]">Edit PMA Agreement</div>
                </div>
                <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                    <button onClick={handleClose}><img  className="w-[20px] h-[20px]" src={Cross} alt="cross" /></button>
                </div>
            </div>

            <div className="h-auto w-full mt-[5px]">
                <div className="flex gap-[48px] justify-center ">
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
        minHeight : 25,
        lineHeight : '1.3',
        height : 2,
        fontSize : 12,
        padding : '1px'
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
      options : (provided, state) => ({
        ...provided,
        fontSize : 12 // adjust padding for the dropdown indicator
      })
     }}
/>
                            <div className="text-[10px] text-[#CD0000] ">{formErrors.client}</div>
                        </div>
                        <div className="">
                            <div className="text-[13px]">PMA Start Date <label className="text-red-500">*</label></div>
                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="date" name="pmaStartDate" value={formValues.pmaStartDate} onChange={handleChange} />
                            <div className="text-[10px] text-[#CD0000] ">{formErrors.pmaStartDate}</div>
                        </div>
                        <div className="">
                            <div className="text-[13px]">POA Start Date <label className="text-red-500">*</label></div>
                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="date" name="poaStartDate" value={formValues.poaStartDate} onChange={handleChange} />
                            <div className="text-[10px] text-[#CD0000] ">{formErrors.poaStartDate}</div>
                        </div>
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
                                {orders.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.ordername}
                                    </option>
                                ))}
                            </select>
                            <div className="text-[10px] text-[#CD0000] ">{formErrors.order}</div>
                        </div>
                        <div className="">
                            <div className="text-[13px]">Actual End Date </div>
                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="date" name="actualEndDate" value={formValues.actualEndDate} onChange={handleChange} />
                            <div className="text-[10px] text-[#CD0000] ">{formErrors.actualEndDate}</div>
                        </div>
                        <div className="">
                            <div className="text-[13px]">Reason for Early Termination if Applicable </div>
                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="reason" value={formValues.reason} onChange={handleChange} />

                        </div>
                        <div className="">
                            <div className="text-[13px]">Rented Fee in % </div>
                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="rentFee" value={formValues.rentFee} onChange={handleChange} />
                        </div>
                        <div className=" flex items-center "><input
                            type="checkbox"
                            checked={formValues.gst1}
                            className='mr-3 h-4 w-4'
                            onClick={(e) => {
                                // console.log(e.target.checked)
                                const existing = { ...formValues };
                                existing.gst1 = !existing.gst1;
                                setFormValues(existing)
                            }}
                        />Gst Additional ?</div>
                    </div>
                    <div className=" space-y-3 py-5">
                        <div className="">
                            <div className="text-[13px]">
                                Client Property <label className="text-red-500">*</label>
                            </div>
                            <select
                                className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                                name="clientProperty"
                                value={formValues.clientProperty}
                                onChange={handleChange}
                            >
                                {clientPropertyData.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.propertyname}
                                    </option>
                                ))}
                            </select>
                            <div className="text-[10px] text-[#CD0000] ">{formErrors.clientProperty}</div>
                        </div>
                        <div className="">
                            <div className="text-[13px]">PMA End Date <label className="text-red-500">*</label></div>
                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="date" name="pmaEndDate" value={formValues.pmaEndDate} onChange={handleChange} />
                            <div className="text-[10px] text-[#CD0000] ">{formErrors.pmaEndDate}</div>
                        </div>
                        <div className="">
                            <div className="text-[13px]">POA End Date </div>
                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="date" name="poaEndDate" value={formValues.poaEndDate} onChange={handleChange} />
                            <div className="text-[10px] text-[#CD0000] ">{formErrors.poaEndDate}</div>
                        </div>
                        <div className="">
                            <div className="text-[13px]">POA Holder Name </div>
                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="poaHolderName" value={formValues.poaHolderName} onChange={handleChange} />
                        </div>
                        <div className="">
                            <div className="text-[13px]">Description </div>
                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="description" value={formValues.description} onChange={handleChange} />
                        </div>
                        <div className="">
                            <div className="text-[13px]">Scan Copy </div>
                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="scan" value={formValues.scan} onChange={handleChange} />
                        </div>
                        <div className="">
                            <div className="text-[13px]">Fixed Fees in Rs </div>
                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="fixedfee" value={formValues.fixedfee} onChange={handleChange} />
                        </div>
                        <div className=" flex items-center "><input
                            type="checkbox"
                            checked={formValues.gst2}
                            className='mr-3 h-4 w-4'
                            onClick={(e) => {
                                // console.log(e.target.checked)
                                const existing = { ...formValues };
                                existing.gst2 = !existing.gst2;
                                setFormValues(existing)
                            }}
                        />Gst Additional ?</div>
                    </div>
                </div>
            </div>
            <div className="mt-2 flex justify-center items-center "><input
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
            <div className="my-3 flex justify-center items-center gap-[10px]">
                <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' onClick={() => handleEdit()} >Update</button>
                <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleClose}>Cancel</button>
            </div>
        </div>
    </div>
</Modal>
  )
}

export default EditPmaAgreement
