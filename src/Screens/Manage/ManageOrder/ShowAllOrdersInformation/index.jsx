import React, { useEffect, useState } from 'react'
import Navbar from '../../../../Components/Navabar/Navbar'
import { Stack, Typography } from '@mui/material'
import { ArrowLeftOutlined ,CloseCircleOutlined} from '@ant-design/icons'
import { APIService } from '../../../../services/API'
import { useLocation } from 'react-router-dom'
// import { useScroll } from 'framer-motion'
const ShowAllOdersInformation = () => {
    const [paymentsData,setPaymentsData] = useState([])
    const {state} = useLocation()
    console.log(state)
  const fetchPaymentData = async () => {
      const data = {
          "user_id": 1234,
          "rows": [
              "clientname",
              "propertydescription",
              "briefdescription",
              "vendorname",
              "amount",
              "paymentbyname",
              "paymentdate",
              "modeofpayment",
              'orderid'
        ],
        "filters": [],
        "sort_by": [],
        "order": 'desc',
        "pg_no": 0,
        "pg_size": 0
    }
    // ['orderid' , 'equalTo', state.orderid, 'Numeric']
    const response  = await APIService.getVendorPayment(data)
    const res = await response.json()
    setPaymentsData((prev) => res.data)

    console.log(res)
  }
  const fetchReceiptsData = async () => {
    const data = {
        "user_id": 1234,
        "rows": [
            "clientname",
            "clientproperty",
            "briefdescription",
            "amount",
            "tds",
            "receivedbyname",
            "recddate",
            "paymentmodename",
            "id",
            "receivedby",
            "paymentmode",
            "orderid",
            "dated",
            "createdby",
            "isdeleted",
            "createdon",
            "entityid",
            "entity",
            "officeid",
            "office",
            "clientid",
            "createdbyname",
            "clientpropertyid"
        ],
        "filters": [],
        "sort_by": [],
        "order": "desc",
        "pg_no": 0,
        "pg_size": 0,
        "search_key": ""
    }
        ;
    const response = await APIService.getOrderReceipt(data);
    const temp = await response.json();
  }
  const fetchInvoicesData = () => {

  }
  useEffect(() => {
    fetchPaymentData()
  },[])
  return (
    <div className='h-screen w-full'>
        <Navbar/>
        <Stack
        direction={"column"}
        className='p-8'
        >
         
         <Stack direction={'row'} justifyContent={'space-between'}>

            {/* this should the best the left Box  */}
            <Stack direction={'row'} gap={'10px'}>
                
                <ArrowLeftOutlined />
               <Typography className='text-4xl' fontSize={24} fontFamily={'Open Sans'} fontWeight={'600'}>Order Description : Leave license and PV</Typography>
            </Stack>
            

            <CloseCircleOutlined style={{ fontSize: '32px', cursor : 'pointer'}}/>
            {/* <Typography>Another Heading</Typography> */}
         </Stack>
          
        <Stack direction={'column'} gap={'100px'}>
            <Stack direction={'column'} justifyItems={'center'} justifyContent={'center'}>
                <div className='w-full h-12 bg-[#DAE7FF] flex flex-col justify-center pl-7'>
                    <p className='text-[18px] font-[600]'>Receipts</p>
                </div>
                <table>
                    <thead className='bg-[#EDF3FF] text-xs font-thin'>
                        <th>Client Name</th>
                        <th>Property</th>
                        <th>Order Description</th>
                        <th>Amount</th>
                        <th>TDS</th>
                        <th>Received By</th>
                        <th>Received Date</th>
                        <th>Payment Mode</th>
                        <th>Payment Status</th>
                    </thead>
                    <tbody className='text-xs font-thin'>
                        <tr> 
                            <td>Client Name</td>
                            <td>Property</td>
                            <td>Order Description</td>
                            <td>Amount</td>
                            <td>TDS</td>
                            <td>Received By</td>
                            <td>Received Date</td>
                            <td>Payment Mode</td>
                            <td>Payment Status</td>
                        </tr>
                        <tr> 
                            <td>Client Name</td>
                            <td>Property</td>
                            <td>Order Description</td>
                            <td>Amount</td>
                            <td>TDS</td>
                            <td>Received By</td>
                            <td>Received Date</td>
                            <td>Payment Mode</td>
                            <td>Payment Status</td>
                        </tr>
                        <tr> 
                            <td>Client Name</td>
                            <td>Property</td>
                            <td>Order Description</td>
                            <td>Amount</td>
                            <td>TDS</td>
                            <td>Received By</td>
                            <td>Received Date</td>
                            <td>Payment Mode</td>
                            <td>Payment Status</td>
                        </tr>
                    </tbody>
                </table>
            </Stack>





            <Stack direction={'column'} justifyItems={'center'} justifyContent={'center'}>
                <div className='w-full h-12 bg-[#DAE7FF] flex flex-col justify-center pl-7'>
                    <p className='text-[18px] font-[600]'>Payments</p>
                </div>
                <table>
                    <thead className='bg-[#EDF3FF] text-xs font-thin'>
                        <th>Client Name</th>
                        <th>Property</th>
                        <th>Order Description</th>
                        <th>Vendor Name</th>
                        <th>Amount</th>
                        <th>Payment By</th>
                        <th>Payment Date</th>
                        <th>Mode Of Payment</th>
                        
                    </thead>
                    <tbody className='text-xs font-thin'>
                        {paymentsData.length}
                        {paymentsData.map((item) => {
                            return <tr>
                                <td>{item.clientname}</td>
                                <td>{item.property}</td>
                                <td>{item.briefdescription}</td>
                                <td>{item.vendorname}</td>
                                <td>{item.amount}</td>
                                <td>{item.paymentbyname}</td>
                                <td>{item.paymentdate}</td>
                                <td>{item.modeofpayment}</td> 
                            </tr>
                        })}
                        
                    </tbody>
                </table>
            </Stack>





            <Stack direction={'column'} justifyItems={'center'} justifyContent={'center'}>
                <div className='w-full h-12 bg-[#DAE7FF] flex flex-col justify-center pl-7'>
                    <p className='text-[18px] font-[600]'>Invoices</p>
                </div>
                <table>
                    <thead className='bg-[#EDF3FF] text-xs font-thin'>
                        <th>Client Name</th>
                        <th>Order Description</th>
                        <th>Estimate Amount</th>
                        <th>Estimate Date</th>
                        <th>Invoice Amount</th>
                        <th>Invoice Date</th>
                       
                    </thead>
                    <tbody className='text-xs font-thin'>
                        <tr> 
                            <td>Client Name</td>
                            <td>Order Description</td>
                            <td>Estimate Amount</td>
                            <td>Estimate Date</td>
                            <td>Invoice Amount</td>
                            <td>Invoice Date</td>
                        </tr>
                        <tr> 
                            <td>Client Name</td>
                            <td>Order Description</td>
                            <td>Estimate Amount</td>
                            <td>Estimate Date</td>
                            <td>Invoice Amount</td>
                            <td>Invoice Date</td>
                        </tr>
                        <tr> 
                            <td>Client Name</td>
                            <td>Order Description</td>
                            <td>Estimate Amount</td>
                            <td>Estimate Date</td>
                            <td>Invoice Amount</td>
                            <td>Invoice Date</td>
                        </tr>
                    </tbody>
                </table>
            </Stack>
          </Stack>
        </Stack>
    </div>
  )
}

export default ShowAllOdersInformation
