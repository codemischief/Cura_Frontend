import React from 'react'
import { Modal } from '@mui/material'
import Cross from "../../../assets/cross.png"
import { useState } from 'react';
import { APIService } from '../../../services/API';
import { useEffect } from 'react';
import AsyncSelect from "react-select/async"
import Draggable from 'react-draggable';
const EditClientReceipt = ({currClientReceipt,handleClose,showSuccess , showCancel}) => {
    console.log(currClientReceipt)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const [formErrors,setFormErrors] = useState({})
    const [formValues,setFormValues] = useState({
        curaoffice : 1,
        receivedDate : null,
        receivedBy : null,
        receiptMode : null,
        client : null,
        howreceived : null,
        serviceamount : null,
        reimbursementAmount : null,
        amountReceived : null,
        TDS : null,
        receiptDescription : null,
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
    const validate = () => {
        console.log(formValues)
        var res = true;
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
        if (!formValues.howreceived) {
            setFormErrors((existing) => {
                return { ...existing, howreceived: "Select How Received" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, howreceived: "" }
            })
        }

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
        
        return res;
    } 
    const handleEdit = async () => {
        if(!validate()) {
            console.log("heyyy")
            return ;
        }
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
            "officeid":2,
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
    const fetchInitialData = async  () => {
        const d = {
            "user_id" : 1234,
            "table_name" : "client_receipt",
            "item_id" : currClientReceipt.id
        }
        const response = await APIService.getItembyId(d)
        const res = await response.json()
        console.log(res.data)
        const temp = {...formValues}
        temp.receivedBy = res.data.receivedby 
        temp.receivedDate = res.data.recddate
        temp.receiptMode = res.data.paymentmode
        temp.howreceived = res.data.howreceivedid
        temp.serviceamount = res.data.serviceamount 
        temp.reimbursementAmount = res.data.reimbursementamount 
        temp.amountReceived = res.data.amount
        temp.TDS = res.data.tds 
        temp.client = res.data.clientid
        temp.receiptDescription = res.data.receiptdesc
        setFormValues(temp)
        

    }
    useEffect(() => {
        fetchInitialData()
        fetchUsersData()
        fetchModesData()
        fetchHowReceivedData()
    },[])

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
                <div className='flex justify-center'>
                    <Draggable handle='div.move'>
                    <div className="w-[1050px] h-auto bg-white rounded-lg relative">
                        <div className='move cursor-move'>
                            <div className="h-10 bg-[#EDF3FF]  justify-center flex items-center rounded-t-lg">
                                <div className="mr-[370px] ml-[370px]">
                                    <div className="text-base">Edit Client Receipt : {currClientReceipt.id}</div>
                                </div>
                                <div className="flex justify-center items-center rounded-full w-7 h-7 bg-white absolute right-2">
                                    <button onClick={() => {close()}}><img className="w-5 h-5" src={Cross} alt="cross" /></button>
                                </div>
                            </div>
                        </div>

                        <div className="h-auto w-full mt-1">
                            <div className="flex gap-12 justify-center ">
                                <div className=" space-y-4 py-5">
                                    <div className="">
                                        <div className="text-sm text-[#787878]">Cura Office </div>
                                        <div className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs py-0.5 bg-[#F5F5F5]" type="text" name="curaoffice"  onChange={handleChange} >Pune</div>
                                    </div>
                                    <div className="">
                                        <div className="text-sm">Received Date<label className="text-red-500">*</label></div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs" type="date" value={formValues.receivedDate} name="receivedDate" onChange={handleChange} />
                                        <div className="text-[10px] text-[#CD0000] absolute">{formErrors.receivedDate}</div>
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
                                            <option value={""} hidden>Select Received By</option>
                                            {usersData.map((item) => (
                                                <option key={item.id} value={item.id}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="text-[10px] text-[#CD0000] absolute">{formErrors.receivedBy}</div>
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
                                            <option value="" hidden>Select Receipt Mode</option>
                                            {modesData.map((item) => (
                                                <option key={item[0]} value={item[0]}>
                                                    {item[1]}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="text-[10px] text-[#CD0000] absolute ">{formErrors.receiptMode}</div>
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
                                                    minHeight: 23,
                                                    lineHeight: '0.8',
                                                    height: 4,
                                                    width: 225,
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
                                        <div className="text-[10px] text-[#CD0000] absolute">{formErrors.client}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-sm">
                                            How Received <label className="text-red-500">*</label>
                                        </div>
                                        <select
                                            className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs"
                                            name="howreceived"
                                            value={formValues.howreceived}
                                            onChange={handleChange}
                                        >
                                            <option value="" hidden> Select How Received</option>
                                            {howReceivedData.map((item) => (
                                                <option key={item[0]} value={item[0]}>
                                                    {item[1]}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="text-[10px] text-[#CD0000] absolute">{formErrors.howReceived}</div>
                                    </div>
                                </div>
                                <div className=" space-y-4 py-5">
                                    <div className="">
                                        <div className="text-sm">Service Amount </div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs" type="text" name="serviceamount" value={formValues.serviceamount} onChange={handleChange} />
                                    </div>
                                    <div className="">
                                        <div className="text-sm">Reimbursement Amount </div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs" type="text" name="reimbursementAmount" value={formValues.reimbursementAmount} onChange={handleChange} />
                                    </div>
                                    <div className="">
                                        <div className="text-sm">Amount Received <label className="text-red-500">*</label></div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs" type="text" name="amountReceived" value={formValues.amountReceived} onChange={handleChange} />
                                        <div className="text-[10px] text-[#CD0000] absolute">{formErrors.amountReceived}</div>
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
                            <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' onClick={() => handleEdit()} >Save</button>
                            <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={() => {close()}}>Cancel</button>
                        </div>
                    </div>
                    </Draggable>
                </div>
            </Modal>
  )
}

export default EditClientReceipt
