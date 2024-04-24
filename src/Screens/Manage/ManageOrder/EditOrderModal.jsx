import React, { useEffect, useState } from 'react'
import { Modal } from '@mui/material'
import Cross  from "../../../assets/cross.png"
import EditOrderInformation from './Dialog/EditOrderInformation'
import EditPhotos from './Dialog/EditPhotos'
import EditOrderStatusHistory from './Dialog/EditOrderStatusHistory'
import { APIService } from '../../../services/API'
const EditOrderModal = ({currOrderId,handleClose}) => {
    const initialValues = {
        "order_info":{
          "clientid":null,
          "briefdescription":null,
          "orderdate":null,
          "earlieststartdate":null,
          "expectedcompletiondate":null,
          "actualcompletiondate":null,
          "owner":null,
          "comments":null,
          "additionalcomments":null,
          "status":null,
          "service":null,
          "clientpropertyid":null,
          "vendorid":null,
          "assignedtooffice":1,
          "entityid":1,
          "tallyledgerid":null
        },
        "order_photos":[

        ],
        "order_status_change":[{
          "orderid":435231,
          "statusid":1,
          "timestamp":"2024-01-01 10:00:00"
        }]
    }
    const [selectedDialog,setSelectedDialogue] = useState(1);
    const [formValues,setFormValues] = useState(initialValues)
    const [usersData,setUsersData] = useState([])
    const [orderStatusData,setOrderStatusData] = useState([])
    const [clientPropertyData,setClientPropertyData] = useState([])
    const [serviceData,setServiceData] = useState([])
    const [vendorData,setVendorData] = useState([])
    const [tallyLedgerData,setTallyLedgerData] = useState([])
    const fetchInitialData = async () => {
       const data = {"user_id":1234,"id": currOrderId}
       const response = await APIService.getOrderById(data)
       const res = await response.json()
       console.log(res.data)
       setFormValues(res.data)
    }

    // we need to fetch the utility routes here
    // const [usersData,setUsersData] = useState([])
    const fetchUsersData = async () => {
        const data = {
            "user_id" : 1234
        }
        const response =  await APIService.getUsers(data)
        const res = await response.json()
        setUsersData(res.data);
    }

    // const [orderStatusData,setOrderStatusData] = useState([])
    const fetchOrderStatusData = async () => {
        const data = {"user_id" : 1234}
        const response = await APIService.getOrderStatusAdmin(data)
        const res = await response.json()
        console.log(res)
        setOrderStatusData(res.data)
    }
    // const [clientPropertyData,setClientPropertyData] = useState([])
    const fetchClientPropertyData = async () => {
        const data = {"user_id" : 1234}
        const response = await APIService.getClientPropertyAdmin(data)
        const res = await response.json()
        console.log(res)
        setClientPropertyData(res.data)
    }
    // const [serviceData,setServiceData] = useState([])
    const fetchServiceData = async () => {
        const data = {"user_id" : 1234}
        const response = await APIService.getServiceAdmin(data)
        const res = await response.json()
        console.log(res)
        setServiceData(res.data)
    }
    // const [vendorData,setVendorData] = useState([])
    const fetchVendorData = async () => {
        const data = {"user_id" : 1234}
        const response = await APIService.getVendorAdmin(data)
        const res = await response.json()
        console.log(res)
        setVendorData(res.data)
    }
    // const [tallyLedgerData,setTallyLedgerData] = useState([])
    const fetchTallyLedgerData = async () => {
        const data = {"user_id" : 1234}
        const response = await APIService.getTallyLedgerAdmin(data)
        const res = await response.json()
        console.log(res)
        setTallyLedgerData(res.data)
    }




















    // finish it here
    useEffect(() => {
      fetchInitialData()
      fetchUsersData()
        fetchOrderStatusData()
        fetchClientPropertyData()
        fetchServiceData()
        fetchVendorData()
        fetchTallyLedgerData()
    },[])
  return (
    <Modal open={true}
                fullWidth={true}
                maxWidth={'md'}
                className='flex justify-center items-center'
            >
                <div className='flex justify-center'>
                    <div className="w-[1050px] h-auto bg-white  rounded-lg">
                        <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-lg">
                            <div className="mr-[410px] ml-[410px]">
                                <div className="text-[16px]">Edit Order</div>
                            </div>
                            <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                               <button onClick={handleClose}><img  className="w-[20px] h-[20px]" src={Cross} alt="cross" /></button> 
                            </div>
                        </div>
                        <div className="mt-1 flex bg-[#DAE7FF] justify-center space-x-4 items-center h-9">
                            <div className={`${selectedDialog == 1 ? "bg-blue-200" : "bg-[#EBEBEB]"} px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-60 cursor-pointer`} onClick={() => setSelectedDialogue(1)}>
                                <div>Order Information</div>
                            </div>
                            <div className={` ${ selectedDialog == 2 ? "bg-blue-200" : "bg-[#EBEBEB]"} px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-60 cursor-pointer`} onClick={() => setSelectedDialogue(2)}>
                                <div>Photos</div>
                            </div>
                            <div className={`${selectedDialog == 3 ? "bg-blue-200" :"bg-[#EBEBEB]" } px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-60 cursor-pointer`} onClick={() => setSelectedDialogue(3)}>
                                <div>Order Status history</div>
                            </div>
                        </div>
                        {selectedDialog == 1 && <EditOrderInformation formValues={formValues} setFormValues={setFormValues} usersData={usersData} orderStatusData={orderStatusData} clientPropertyData={clientPropertyData} serviceData={serviceData} vendorData={vendorData} tallyLedgerData={tallyLedgerData} />}
                        {selectedDialog == 2 && <EditPhotos formValues={formValues} setFormValues={setFormValues} />}
                        {selectedDialog == 3 && <EditOrderStatusHistory formValues={formValues} setFormValues={setFormValues} />}
                        <div className="my-[10px] flex justify-center items-center gap-[10px]">
                            <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' onClick={() => {}} >Save</button>
                            <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleClose} >Cancel</button>
                        </div>
                    </div>
                   
                </div>
            </Modal>
  )
}

export default EditOrderModal
