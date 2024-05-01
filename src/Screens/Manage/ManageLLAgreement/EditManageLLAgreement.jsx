import { useScrollTrigger } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Modal } from '@mui/material'
import Cross from "../../../assets/cross.png"
import { APIService } from '../../../services/API'
import AsyncSelect from "react-select/async"
const EditManageLLAgreement = ({handleClose, currItem,openEditSuccess}) => {
    const initialValues = {
        client: "",
        clientProperty: null,
        startDate: null,
        rentAmount: "",
        depositeAmount: "",
        scan: "",
        order: null,
        durationInMonth: "",
        endDate: null,
        rentPaymentDate: "",
        noticePeriod: "",
        registrationType: "",
        status: false
    };
    const rentPaymentDate = [
        {
            id: 1,
            day: 1
        },
        {
            id: 2,
            day: 2
        },
        {
            id: 3,
            day: 3
        },
        {
            id: 4,
            day: 4
        },
        {
            id: 5,
            day: 5
        },
        {
            id: 6,
            day: 6
        },
        {
            id: 7,
            day: 7
        },
        {
            id: 8,
            day: 8
        },
        {
            id: 9,
            day: 9
        },
        {
            id: 10,
            day: 10
        },
        {
            id: 11,
            day: 11
        },
        {
            id: 12,
            day: 12
        },
        {
            id: 13,
            day: 13
        },
        {
            id: 14,
            day: 14
        },
        {
            id: 15,
            day: 15
        },
        {
            id: 16,
            day: 16
        },
        {
            id: 17,
            day: 17
        },
        {
            id: 18,
            day: 18
        },
        {
            id: 19,
            day: 19
        },
        {
            id: 20,
            day: 20
        },
        {
            id: 21,
            day: 21
        },
        {
            id: 22,
            day: 22
        },
        {
            id: 23,
            day: 23
        },
        {
            id: 24,
            day: 24
        },
        {
            id: 25,
            day: 25
        },
        {
            id: 26,
            day: 26
        },
        {
            id: 27,
            day: 27
        },
        {
            id: 28,
            day: 28
        },
        {
            id: 29,
            day: 29
        },
        {
            id: 30,
            day: 30
        },
        {
            id: 31,
            day: 31
        },
    ];
    const registrationType = [
        {
            id: 1,
            type: "Registered"
        },
        {
            id: 2,
            type: "Notarized"
        }
    ];
    const [formValues,setFormValues] = useState(initialValues)
    const [formErrors,setFormErrors] = useState({})
    // const handleClose = () => {

    // }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const [clientPropertyData,setClientPropertyData] = useState([])
    const [orders,setOrders] = useState([])
    // const [rentPaymentDate,setRentPaymentDate] = useState([])
    // const [registrationType,setRegistrationType] = useState([])
    const handleAddLLAgreement = () => {

    }
    const fetchInitialData = async (id) => {
        const data = {
            "user_id" : 1234,
            "item_id" : id,
            "table_name" : "get_client_property_lla_view"
        }
        const response = await APIService.getItembyId(data)
        const res = await response.json()
        console.log(res)
        console.log('temp')
        const existing = {...formValues}
        existing.depositeAmount = res.data.depositamount
        existing.endDate  = res.data.actualenddate
        existing.durationInMonth = res.data.durationinmonth
        existing.noticePeriod = res.data.noticeperiodindays
        existing.status = res.data.active
        existing.scan = res.data.llscancopy
        existing.rentPaymentDate = res.data.rentpaymentdate
        existing.rentAmount = res.data.rentamount
        existing.registrationType = res.data.registrationtype
        existing.startDate = res.data.startdate
        existing.clientProperty = res.data.clientpropertyid
        existing.order = res.data.orderid
        const temp = {...selectedOption}
        temp.label = res.data.clientname
        temp.value = res.data.clientid 
        getClientPropertyByClientId(res.data.clientid)
        getOrdersByClientId(res.data.clientid)
        setSelectedOption(temp)
        setFormValues(existing)
        
        

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
        if (!formValues.clientProperty || formValues.clientProperty == "") {
            setFormErrors((existing) => {
                return { ...existing, clientProperty: "Select Client Property" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, clientProperty: "" }
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
        if (!formValues.startDate) {
            setFormErrors((existing) => {
                return { ...existing, startDate: "Select Start Date" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, startDate: "" }
            })
        }
        // if (!formValues.order) {
        //     setFormErrors((existing) => {
        //         return { ...existing, order: "Select Order" }
        //     })
        //     res = false;
        // } else {
        //     setFormErrors((existing) => {
        //         return { ...existing, order: "" }
        //     })
        // }

        if (!formValues.durationInMonth) {
            setFormErrors((existing) => {
                return { ...existing, durationInMonth: "Enter Month Duration" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, durationInMonth: "" }
            })
        }
        if (!formValues.endDate) {
            setFormErrors((existing) => {
                return { ...existing, endDate: "Enter End Date" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, endDate: "" }
            })
        }
        return res;
    }
    const handleEdit = async () => {
        if(!validate()) {
            return ;
        }
        const data = {
            "user_id":1234,
            "id": currItem.id,
            "clientpropertyid":formValues.clientProperty,
            "orderid":formValues.order,
            "durationinmonth":formValues.durationInMonth,
            "depositamount":formValues.depositeAmount,
            "startdate":formValues.startDate,
            "actualenddate":formValues.endDate,
            "rentamount":formValues.rentAmount,
            "registrationtype":formValues.registrationType,
            "rentpaymentdate":formValues.rentPaymentDate,
            "noticeperiodindays":formValues.noticePeriod,
            "active":formValues.status,
            "llscancopy":formValues.scan
        }
        const response = await APIService.editClientLLAgreement(data)
        const res = await response.json()
        if(res.result == 'success') {
            openEditSuccess()
        }
        console.log(res.data)
    }
    useEffect(() => {
        fetchInitialData(currItem.id)
    },[])
    const getClientPropertyByClientId = async (id) => {
        const data = {
            "user_id": 1234,
            "client_id": id
        }

        const response = await APIService.getClientPropertyByClientId(data)
        const res = await response.json()
        console.log(res)
        setClientPropertyData(res.data)
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
        existing.client = e.value
        getOrdersByClientId(e.value)
        getClientPropertyByClientId(e.value)
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
                                <div className="text-[16px]">Edit L&L Agreement</div>
                            </div>
                            <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                                <button onClick={handleClose}><img onClick={handleClose} className="w-[20px] h-[20px]" src={Cross} alt="cross" /></button>
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
                                        <div className="text-[8px] text-[#CD0000] absolute">{formErrors.client}</div>
                                    </div>
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
                                                    {item.id}
                                                    &nbsp;
                                                    &nbsp;
                                                    {item.propertyname}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="text-[8px] text-[#CD0000] absolute">{formErrors.clientProperty}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">Start Date<label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="date" name="startDate" value={formValues.startDate} onChange={handleChange} />
                                        <div className="text-[8px] text-[#CD0000] absolute ">{formErrors.startDate}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">Rent Amount </div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="rentAmount" value={formValues.rentAmount} onChange={handleChange} />

                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">Deposite Amount </div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="depositeAmount" value={formValues.depositeAmount} onChange={handleChange} />

                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">LL & PV Scan Copy </div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="scan" value={formValues.scan} onChange={handleChange} />
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
                                            {orders.map((item) => (
                                                <option key={item.id} value={item.id}>
                                                    {item.ordername}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="text-[8px] text-[#CD0000] absolute">{formErrors.order}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">Duration in Month <label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="durationInMonth" value={formValues.durationInMonth} onChange={handleChange} />
                                        <div className="text-[8px] text-[#CD0000] absolute">{formErrors.durationInMonth}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">End Date <label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="date" name="endDate" value={formValues.endDate} onChange={handleChange} />
                                        <div className="text-[8px] text-[#CD0000] absolute">{formErrors.endDate}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">
                                            Rent payment Date
                                        </div>
                                        <select
                                            className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                                            name="rentPaymentDate"
                                            value={formValues.rentPaymentDate}
                                            onChange={handleChange}
                                        >
                                            {rentPaymentDate.map((item) => (
                                                <option key={item.id} value={item.day}>
                                                    {item.day}
                                                </option>
                                            ))}
                                        </select>

                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">Notice Period in Days </div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="noticePeriod" value={formValues.noticePeriod} onChange={handleChange} />
                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">
                                            Registeration Type
                                        </div>
                                        <select
                                            className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                                            name="registrationType"
                                            value={formValues.registrationType}
                                            onChange={handleChange}
                                        >
                                            {registrationType.map(item => (
                                                <option key={item.id} value={item.type}>
                                                    {item.type}
                                                </option>
                                            ))}
                                        </select>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-[10px] flex justify-center items-center "><input
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
                            <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' onClick={handleEdit} >Save</button>
                            <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleClose}>Cancel</button>
                        </div>
                    </div>
                </div>
            </Modal>
  )
}

export default EditManageLLAgreement
