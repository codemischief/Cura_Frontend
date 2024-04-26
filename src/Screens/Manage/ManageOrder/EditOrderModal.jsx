import React, { useEffect, useState } from 'react'
import { Modal } from '@mui/material'
import Cross  from "../../../assets/cross.png"
import EditOrderInformation from './Dialog/EditOrderInformation'
import EditPhotos from './Dialog/EditPhotos'
import EditOrderStatusHistory from './Dialog/EditOrderStatusHistory'
import { APIService } from '../../../services/API';
const EditOrderModal = ({currOrderId,handleClose,showSuccess}) => {
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
          "tallyledgerid":null,
          "clientname" : null
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
    const [pageLoading,setPageLoading] = useState(false);
    


    // const [initialOrderData,setInitialOrderData] = useState({...initialValues});
    function helper1(updateArrayPhotos,insertArrayPhotos) {
        var size = formValues.order_photos.length
        for(var i=0;i<size;i++) {
          const tempObj = formValues.order_photos[i]
          if(tempObj.hasOwnProperty('id')) {
              // it has a property id
              var weNeed = {};
              for(var j=0;j<initialOrderData.order_photos.length;j++) {
                   if(tempObj.id === initialOrderData.order_photos[j].id) {
                       weNeed = initialOrderData.order_photos[j]
                   }
              }
              const str1 = JSON.stringify(weNeed)
              const str2 = JSON.stringify(tempObj);
              console.log(str1,str2)
              if(str1 !== str2) {
                updateArrayPhotos.push(tempObj);
              }
          }else {
            insertArrayPhotos.push(tempObj);
          }
        }
    }
    const handleEdit = async () => {
        console.log(formValues);
        if (!validate()) {
            setSelectedDialogue(1);
            return
        }
        const updateArrayPhotos = []
        const insertArrayPhotos = []
        helper1(updateArrayPhotos,insertArrayPhotos)

        const data = {
            "user_id":1234,
            "order_info":{
              "id":currOrderId,
              "clientid":formValues.order_info.clientid,
              "briefdescription":formValues.order_info.briefdescription,
              "orderdate":formValues.order_info.orderdate,
              "earlieststartdate":formValues.order_info.earlieststartdate,
              "expectedcompletiondate":formValues.order_info.expectedcompletiondate,
              "actualcompletiondate": formValues.order_info.actualcompletiondate,
              "owner":formValues.order_info.owner,
              "comments":formValues.order_info.comments,
              "additionalcomments":formValues.order_info.additionalcomments,
              "status":formValues.order_info.status,
              "service":formValues.order_info.service,
              "clientpropertyid":formValues.order_info.clientpropertyid,
              "vendorid":formValues.order_info.vendorid,
              "assignedtooffice":1,
              "entityid":1,
              "tallyledgerid":formValues.order_info.tallyledgerid
            },
            "order_photos":{
              "update": updateArrayPhotos,
              "insert": insertArrayPhotos
            }
          }
        
          const response = await APIService.editOrder(data);
          const res = await response.json()
          console.log(res);
          if(res.result == 'success') {
              showSuccess()
          }
          
    } 
    const [initialOrderData,setInitialOrderData] = useState({...initialValues})
    // var initialOrderData = {...initialValues};

    const fetchInitialData = async () => {
        setPageLoading(true);
        const data = {"user_id":1234,"id": currOrderId}
        
        const response = await APIService.getOrderDataById(data)
        const res = await response.json()
        console.log(res)
        // setFormValues(res.data)
        const existing = {...formValues}
        existing.order_info = res.data.order_info;
        existing.order_photos = res.data.order_photos;
        await fetchClientName(res.data.order_info.clientid)
        setFormValues(existing);
        // const temp = {...res.data};
        // initialOrderData = {...res.data};
        var temp = initialOrderData;
        temp = res.data;
        setInitialOrderData(temp)
        // setInitialOrderData((prev) => {
        //     return {...res.data}
        // })
        // setInitialOrderData((prev) =>{...res.data})
        setPageLoading(false)
    }
    const [clientName,setClientName] = useState("");
    const fetchClientName = async (id) => {
        const data = {
            "user_id":1234,
            "table_name":"get_client_info_view",
            "item_id": id
        }
        const response = await APIService.getItembyId(data)
        const res = await (response.json());
        console.log(res);
        if(id != null) {
            console.log(res.data);
            setClientName(res.data.clientname);
            console.log(clientName)
        }
      }
    // const fetchInitialData = async () => {
    //    const data = {"user_id":1234,"id": currOrderId}
    // //    console.log(data)
    //    const response = await APIService.getOrderById(data);
    //    const res = await response.json()
    //    console.log(res)
    //    console.log(res.data)
    //    setFormValues(res.data)
    
    // }

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

    const [formErrors, setFormErrors] = useState({});
    const validate = () => {
        var res = true
        if (formValues.order_info.owner === "" || formValues.order_info.owner === null) {
            res = false
            setFormErrors((existing) => ({
                ...existing,
                owner: "Select Assigned To"
            }))

        } else {
            setFormErrors((existing) => ({
                ...existing,
                owner: ""
            }))
        }

        if (formValues.order_info.status === "" || formValues.order_info.status === null) {
            res = false
            setFormErrors((existing) => ({
                ...existing,
                status: "Select Status"
            }))

        } else {
            setFormErrors((existing) => ({
                ...existing,
                status: ""
            }))
        }

        if (formValues.order_info.service === "" || formValues.order_info.service === null) {
            res = false
            setFormErrors((existing) => ({
                ...existing,
                service: "Select Service"
            }))

        } else {
            setFormErrors((existing) => ({
                ...existing,
                service: ""
            }))
        }

        if (formValues.order_info.clientid === "" || formValues.order_info.clientid === null ) {
            res = false
            setFormErrors((existing) => ({
                ...existing,
                clientid: "Select Client"
            }))

        } else {
            setFormErrors((existing) => ({
                ...existing,
                clientid: ""
            }))
        }

        if (formValues.order_info.briefdescription === "" || formValues.order_info.briefdescription === null) {
            res = false
            setFormErrors((existing) => ({
                ...existing,
                briefdescription: "Enter Order Description"
            }))

        } else {
            setFormErrors((existing) => ({
                ...existing,
                briefdescription: ""
            }))
        }


        return res;
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
                        {!pageLoading && <>
                        {selectedDialog == 1 && <EditOrderInformation formValues={formValues} setFormValues={setFormValues} usersData={usersData} orderStatusData={orderStatusData} clientPropertyData={clientPropertyData} serviceData={serviceData} vendorData={vendorData} tallyLedgerData={tallyLedgerData} clientName={clientName} formErrors={formErrors} setClientName={setClientName}/> }
                        {selectedDialog == 2 && <EditPhotos formValues={formValues} setFormValues={setFormValues} currOrderId={currOrderId}/>}
                        {selectedDialog == 3 && <EditOrderStatusHistory formValues={formValues} setFormValues={setFormValues} orderId={currOrderId}/>}
                        </>
                        }
                        <div className="my-[10px] flex justify-center items-center gap-[10px]">
                            <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' onClick={handleEdit} >Save</button>
                            <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleClose} >Cancel</button>
                        </div>
                    </div>
                   
                </div>
            </Modal>
  )
}

export default EditOrderModal
