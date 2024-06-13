import React, { useEffect, useState } from 'react'
import Cross from "../../../assets/cross.png"
import { CircularProgress, Modal } from '@mui/material'
import { APIService } from '../../../services/API'
import AsyncSelect from "react-select/async"
import Draggable from 'react-draggable'
import OrderDropDown from '../../../Components/Dropdown/OrderDropdown';
import useAuth from '../../../context/JwtContext'
const EditPmaAgreement = ({ handleClose, currPma, showSuccess, showCancel }) => {
    const {user} = useAuth();
    console.log(currPma)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }
    const initialValues = {
        pmaStartDate: null,
        poaStartDate: null,
        actualEndDate: null,
        reason: "Bugs",
        rentFee: 100,
        pmaEndDate: null,
        poaEndDate: null,
        poaHolderName: "Abhishek",
        description: "spacious",
        scan: "example",
        fixedfee: 56,
        status: false,
        clientProperty: null,
        order: null,
        gst1: null,
        gst2: null,
    }
    const [pageLoading, setPageLoading] = useState(false)
    const fetchInitialData = async () => {
        setPageLoading(true)
        const data = {
            "item_id": currPma,
            "table_name": "get_client_property_pma_view"
        }
        const response = await APIService.getItembyId({...data,user_id : user.id})
        const res = await response.json()
        console.log(res)
        const existing = { ...formValues }
        getClientPropertyByClientId(res.data.clientid)
        getOrdersByClientId(res.data.clientid)
        existing.poaHolderName = res.data.poaholder
        existing.reason = res.data.reasonforearlyterminationifapplicable
        existing.rentFee = res.data.rented
        existing.description = res.data.description
        existing.scan = res.data.scancopy
        existing.fixedfee = res.data.fixed
        existing.status = res.data.active
        existing.clientProperty = res.data.clientpropertyid
        existing.actualEndDate = res.data.actualenddate
        existing.order = res.data.orderid
        existing.gst1 = res.data.rentedtax
        existing.gst2 = res.data.fixedtax
        if (res.data.startdate) {
            existing.pmaStartDate = res.data.startdate.split('T')[0]
        }
        if (res.data.enddate) {
            existing.pmaEndDate = res.data.enddate.split('T')[0]
        }
        if (res.data.poastartdate) {
            existing.poaStartDate = res.data.poastartdate.split('T')[0]
        }
        if (res.data.poaenddate) {
            existing.poaEndDate = res.data.poaenddate.split('T')[0]
        }
        if (res.data.actualenddate) {
            existing.actualEndDate = res.data.actualenddate.split('T')[0]
        }
        const temp = { ...selectedOption }
        temp.label = res.data.clientname
        temp.value = res.data.clientid
        setSelectedOption(temp)
        setFormValues(existing)
        setTimeout(() => {
            setPageLoading(false)
        }, 1000)

    }
    const [formErrors, setFormErrors] = useState({})
    const [formValues, setFormValues] = useState(initialValues)
    const order = [];
    const [clientProperty, setClientProperty] = useState([]);
    const validate = () => {
        var res = true;
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
        if (!formValues.pmaStartDate) {
            setFormErrors((existing) => {
                return { ...existing, pmaStartDate: "Select PMA Start Date" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, pmaStartDate: "" }
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

        if (!formValues.pmaEndDate) {
            setFormErrors((existing) => {
                return { ...existing, pmaEndDate: "Select PMA End Date" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, pmaEndDate: "" }
            })
        }
        // if (!formValues.poaStartDate) {
        //     setFormErrors((existing) => {
        //         return { ...existing, poaStartDate: "Select POA Start Date" }
        //     })
        //     res = false;
        // } else {
        //     setFormErrors((existing) => {
        //         return { ...existing, poaStartDate: "" }
        //     })
        // }
        return res;
    }

    const handleEdit = async () => {
        if (!validate()) {
            console.log('hu')
            return;
        }

        const data = {
            "clientpropertyid": formValues.clientProperty,
            "startdate": formValues.pmaStartDate,
            "enddate": formValues.pmaEndDate,
            "actualenddate": formValues.actualEndDate,
            "active": formValues.status,
            "scancopy": formValues.scan,
            "reasonforearlyterminationifapplicable": formValues.reason,
            "description": formValues.description,
            "rented": formValues.rentFee,
            "fixed": formValues.fixedfee,
            "rentedtax": formValues.gst1,
            "fixedtax": formValues.gst2,
            "orderid": formValues.order,
            "poastartdate": formValues.poaStartDate,
            "poaenddate": formValues.poaEndDate,
            "poaholder": formValues.poaHolderName,
            "id": currPma
        }
        const response = await APIService.editClientPMAAgreement({...data,user_id : user.id})
        const res = await response.json()
        console.log(res);
        handleClose();
        showSuccess();
    }
    const [clientPropertyData, setClientPropertyData] = useState([]);
    const [propertyText, setPropertyText] = useState("Select Client Property");
    const getClientPropertyByClientId = async (id) => {
        const data = {
            "client_id": id
        }

        const response = await APIService.getClientPropertyByClientId({...data,user_id : user.id})
        const res = await response.json()
        console.log(res)
        setClientPropertyData(res.data)
    }
    const [orders, setOrders] = useState([]);
    const [orderText, setOrderText] = useState("Select Order");
    const getOrdersByClientId = async (id) => {
        console.log('hello')
        const data = {
            "client_id": id
        }
        const response = await APIService.getOrdersByClientId({...data,user_id : user.id})
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
        setOrderText("Select Order")
        setPropertyText("Select Client Property")
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
            "pg_no": 0,
            "pg_size": 0,
            "search_key": e
        }
        const response = await APIService.getClientAdminPaginated({...data,user_id : user.id})
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

    }, [])

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
                            <div className='move cursor-move'>

                                <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-t-lg relative">
                                    <div className="mr-[410px] ml-[410px]">
                                        <div className="text-[16px]">Edit PMA Agreement</div>
                                    </div>
                                    <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white absolute right-2">
                                        <button onClick={() => { close() }}><img className="w-[20px] h-[20px]" src={Cross} alt="cross" /></button>
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
                                                            minHeight: 23,
                                                            lineHeight: '0.8',
                                                            height: 4,
                                                            width: 230,
                                                            fontSize: 10,
                                                            // padding: '1px'
                                                        }),
                                                        // indicatorSeparator: (provided, state) => ({
                                                        //   ...provided,
                                                        //   lineHeight : '0.5',
                                                        //   height : 2,
                                                        //   fontSize : 12 // hide the indicator separator
                                                        // }),
                                                        dropdownIndicator: (provided, state) => ({
                                                            ...provided,
                                                            padding: '1px', // adjust padding for the dropdown indicator
                                                        }),
                                                        // options: (provided, state) => ({
                                                        //     ...provided,
                                                        //     fontSize: 10// adjust padding for the dropdown indicator
                                                        // }),
                                                        option: (provided, state) => ({
                                                            ...provided,
                                                            padding: '2px 10px', // Adjust padding of individual options (top/bottom, left/right)
                                                            margin: 0, // Ensure no extra margin
                                                            fontSize: 10 // Adjust font size of individual options
                                                        }),
                                                        menu: (provided, state) => ({
                                                            ...provided,
                                                            width: 230, // Adjust the width of the dropdown menu
                                                            zIndex: 9999 // Ensure the menu appears above other elements
                                                        }),
                                                        menuList: (provided, state) => ({
                                                            ...provided,
                                                            padding: 0, // Adjust padding of the menu list
                                                            fontSize: 10,
                                                            maxHeight: 150 // Adjust font size of the menu list
                                                        }),
                                                        
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
                                                <div className="text-[13px]">POA Start Date</div>
                                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="date" name="poaStartDate" value={formValues.poaStartDate} onChange={handleChange} />
                                                <div className="text-[10px] text-[#CD0000] ">{formErrors.poaStartDate}</div>
                                            </div>
                                            <div className="">
                                                <div className="text-[13px]">
                                                    Order <label className="text-red-500">*</label>
                                                </div>
                                                {/* <select
                                                className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                                                name="order"
                                                value={formValues.order}
                                                onChange={handleChange}
                                            >
                                                <option value="" >
                                                    <div className='flex justify-between'>
                                                        <p className="float-left">Order Id</p>
                                                        &nbsp;
                                                        &nbsp;
                                                        &nbsp;
                                                        &nbsp;
                                                        <p className="float-right">Order Name</p>
                                                    </div>
                                                </option>
                                                {orders.map((item) => (
                                                    <option key={item.id} value={item.id}>
                                                        {item.id}
                                                        &nbsp;
                                                        &nbsp;
                                                        {item.ordername}
                                                    </option>
                                                ))}
                                            </select> */}
                                                <OrderDropDown options={orders} orderText={orderText} setOrderText={setOrderText} leftLabel="ID" rightLabel="OrderName" leftAttr="id" rightAttr="ordername" toSelect="ordername" handleChange={handleChange} formValueName="order" value={formValues.order} />
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
                                                <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="rentFee" value={formValues.rentFee} onChange={handleChange} min="0" max="100" onInput={(e) => {
                                                    if (parseInt(e.target.value) > parseInt(e.target.max)) {
                                                        e.target.value = e.target.max;
                                                    }
                                                }} />
                                            </div>
                                            <div className=" flex items-center text-[13px] "><input
                                                type="checkbox"
                                                checked={formValues.gst1}
                                                className='mr-3 h-4 w-4'
                                                onClick={(e) => {
                                                    // console.log(e.target.checked)
                                                    const existing = { ...formValues };
                                                    existing.gst1 = !existing.gst1;
                                                    setFormValues(existing)
                                                }}
                                            />GST Additional ?</div>
                                        </div>
                                        <div className=" space-y-3 py-5">
                                            <div className="">
                                                <div className="text-[13px]">
                                                    Client Property <label className="text-red-500">*</label>
                                                </div>
                                                {/* <select
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
                                            </select> */}
                                                <OrderDropDown options={clientPropertyData} orderText={propertyText} setOrderText={setPropertyText} leftLabel="ID" rightLabel="Property Description" leftAttr="id" rightAttr="propertyname" toSelect="propertyname" handleChange={handleChange} formValueName="clientProperty" value={formValues.clientProperty} />
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
                                            <div className=" flex items-center text-[13px]"><input
                                                type="checkbox"
                                                checked={formValues.gst2}
                                                className='mr-3 h-4 w-4'
                                                onClick={(e) => {
                                                    // console.log(e.target.checked)
                                                    const existing = { ...formValues };
                                                    existing.gst2 = !existing.gst2;
                                                    setFormValues(existing)
                                                }}
                                            />GST Additional ?</div>
                                        </div>
                                    </div>
                                </div>
                            }
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
                                <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' onClick={() => handleEdit()} >Save</button>
                                <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={() => { close() }}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </Draggable>
            </>
        </Modal>
    )
}

export default EditPmaAgreement
