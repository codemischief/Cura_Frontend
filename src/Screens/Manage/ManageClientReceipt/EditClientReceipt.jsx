import React from 'react'
import { Modal } from '@mui/material'
import Cross from "../../../assets/cross.png"
import { useState } from 'react';
import { APIService } from '../../../services/API';
import { useEffect } from 'react';
import AsyncSelect from "react-select/async"
const EditClientReceipt = ({currClientReceipt,handleClose,showSuccess}) => {
    console.log(currClientReceipt)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const [formErrors,setFormErrors] = useState({})
    const [formValues,setFormValues] = useState({
        curaoffice : 1,
        receivedDate : currClientReceipt.recddate,
        receivedBy : currClientReceipt.receivedby,
        receiptMode : currClientReceipt.paymentmode,
        client : currClientReceipt.clientid,
        howreceived : currClientReceipt.howreceivedid,
        serviceamount : currClientReceipt.serviceamount,
        reimbursementAmount : currClientReceipt.reimbursementamount,
        amountReceived : currClientReceipt.amount,
        TDS : currClientReceipt.tds,
        receiptDescription : currClientReceipt.receiptdesc,
   })

    const [usersData,setUsersData] = useState([])
    const fetchUsersData = async () => {
        const data = {
            "user_id" : 1234
        }
        const response = await APIService.getUsers(data)
        const res = await response.json()
        setUsersData(res.data)
    }
    const [modesData,setModesData] = useState([])
    const fetchModesData = async () => {
        const data = {
            "user_id" : 1234
         }
         const response = await APIService.getModesAdmin(data)
         const res = await response.json()
         setModesData(res.data)
         console.log(res)
    }
    const [howReceivedData,setHowReceivedData] = useState([])
    const fetchHowReceivedData = async () => {
        const data = {
            "user_id" : 1234
        }
        const response = await APIService.getHowReceivedAdmin(data)
        const res = await response.json()
        console.log(res)
        setHowReceivedData(res.data)
    }
 
    const handleEdit = async () => {
        const data = {
            "user_id":1234,
            "receivedby":Number(formValues.receivedBy),
            "amount": Number(formValues.amountReceived),
            "tds":Number(formValues.TDS),
            "paymentmode":Number(formValues.receiptMode),
            "recddate":formValues.receivedDate,
            "clientid":formValues.client,
            "receiptdesc":formValues.receiptDescription,
            "serviceamount":Number(formValues.serviceamount),
            "reimbursementamount": Number(formValues.reimbursementAmount),
            "entityid":1,
            "howreceivedid": Number(formValues.howreceived),
            "officeid":1,
            "id":currClientReceipt.id
        }
        const response = await APIService.editClientReceipt(data)
        const res = await response.json()
        if(res.result == 'success') {
            console.log('updated')
            showSuccess()
        }
    }
    const [selectedOption,setSelectedOption] = useState({
        label : currClientReceipt.clientname,
        value : currClientReceipt.client
       });
       const [query,setQuery] = useState('')
       const handleClientNameChange = (e) => {
           console.log('hey')
           console.log(e)
          //  setFormValues({...formValues,client_property : {
          //   ...formValues.client_property,
          //   clientid : e.value
          //  }})
        //    setCurrClientName(e.label);
           const existing = {...formValues}
           existing.client = e.value
           setFormValues(existing)
           console.log(formValues)
           setSelectedOption(e)
       }
       const loadOptions = async (e) => {
          console.log(e)
          if(e.length < 3) return ;
          const data = {
            "user_id" : 1234,
            "pg_no" : 0,
            "pg_size" : 0,
            "search_key" : e
          }
          const response = await APIService.getClientAdminPaginated(data)
          const res = await response.json()
          const results = res.data.map(e => {
            return {
              label : e[1],
              value : e[0]
            }
          })
          if(results === 'No Result Found') {
            return []
          }
          return results
       }

    useEffect(() => {
        fetchUsersData()
        fetchModesData()
        fetchHowReceivedData()
    },[])
  return (
    <Modal open={true}
                fullWidth={true}
                maxWidth={'md'}
                className='flex justify-center items-center'
            >
                <div className='flex justify-center'>
                    <div className="w-[1050px] h-auto bg-white rounded-lg">
                        <div className="h-10 bg-[#EDF3FF]  justify-center flex items-center rounded-t-lg">
                            <div className="mr-[370px] ml-[370px]">
                                <div className="text-base">Edit Client Receipt</div>
                            </div>
                            <div className="flex justify-center items-center rounded-full w-7 h-7 bg-white">
                                <button onClick={handleClose}><img className="w-5 h-5" src={Cross} alt="cross" /></button>
                            </div>
                        </div>

                        <div className="h-auto w-full mt-1">
                            <div className="flex gap-12 justify-center ">
                                <div className=" space-y-3 py-5">
                                    <div className="">
                                        <div className="text-sm text-[#787878]">Cura Office </div>
                                        <div className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs py-0.5 bg-[#F5F5F5]" type="text" name="curaoffice" value={formValues.curaoffice} onChange={handleChange} >Pune</div>
                                    </div>
                                    <div className="">
                                        <div className="text-sm">Received Date<label className="text-red-500">*</label></div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs" type="date" value={formValues.receivedDate} name="receivedDate" onChange={handleChange} />
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.receivedDate}</div>
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
                                            {usersData.map((item) => (
                                                <option key={item.id} value={item.id}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.receivedBy}</div>
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
                                        <div className="text-sm">
                                            How received <label className="text-red-500">*</label>
                                        </div>
                                        <select
                                            className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs"
                                            name="howreceived"
                                            value={formValues.howreceived}
                                            onChange={handleChange}
                                        >
                                            {howReceivedData.map((item) => (
                                                <option key={item[0]} value={item[0]}>
                                                    {item[1]}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.howReceived}</div>
                                    </div>
                                </div>
                                <div className=" space-y-3 py-5">
                                    <div className="">
                                        <div className="text-sm">Service Amount </div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs" type="text" name="serviceamount" value={formValues.serviceamount} onChange={handleChange} />
                                    </div>
                                    <div className="">
                                        <div className="text-sm">Reimbursement Amount </div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs" type="text" name="reimbursementAmount" value={formValues.reimbursementAmount} onChange={handleChange} />
                                    </div>
                                    <div className="">
                                        <div className="text-sm">Amount Recived <label className="text-red-500">*</label></div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs" type="text" name="amountReceived" value={formValues.amountReceived} onChange={handleChange} />
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.amountReceived}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-sm">TDS </div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs" type="text" name="TDS" value={formValues.TDS} onChange={handleChange} />
                                    </div>
                                    <div className="">
                                        <div className="text-sm">Receipt Description</div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs" type="text" name="receiptDescription" value={formValues.receiptDescription} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="my-3 flex justify-center items-center gap-3">
                            <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' onClick={() => handleEdit()} >Update</button>
                            <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleClose}>Cancel</button>
                        </div>
                    </div>
                </div>
            </Modal>
  )
}

export default EditClientReceipt