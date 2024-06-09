import React, { useEffect, useState } from 'react'
import Navbar from '../../../../Components/Navabar/Navbar'
import { Stack, Typography } from '@mui/material'
import { ArrowLeftOutlined ,CloseOutlined } from '@ant-design/icons'
import { APIService } from '../../../../services/API'
import { useLocation, useNavigate } from 'react-router-dom'
// import { useScroll } from 'framer-motion'
const ShowAllOdersInformation = () => {
    const [paymentsData,setPaymentsData] = useState([])
    const [receiptsData,setReceiptsData] = useState([])
    const [invoicesData,setInvoicesData] = useState([])
    const {state} = useLocation()
    const navigate = useNavigate()
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
        "filters": [['orderid','equalTo',state?.orderid,'Numeric']],
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
            "orderid"
        ],
        "filters": [['orderid','equalTo',state?.orderid,'Numeric']],
        "sort_by": [],
        "order": "desc",
        "pg_no": 0,
        "pg_size": 0,
        "search_key": ""
    }
        ;
    const response = await APIService.getOrderReceipt(data);
    const temp = await response.json();
    console.log(temp)
    setReceiptsData(temp.data)
  }
  const fetchInvoicesData = async () => {
    const data = {
        "user_id": 1234,
        "rows": [
            "clientname",
            "quotedescription",
            "estimateamount",
            "estimatedate",
            "invoiceamount",
            "invoicedate",
            "id",
            'orderid'
        ],
        "filters": [['orderid','equalTo',state?.orderid,'Numeric']],
        "sort_by": [],
        "order":  "desc",
        "pg_no": 0,
        "pg_size": 0,
    };
    const response = await APIService.getClientInvoice(data);
    const temp = await response.json();
    setInvoicesData((prev) => temp.data)
  }
  useEffect(() => {
    fetchPaymentData()
    fetchReceiptsData()
    fetchInvoicesData()
  },[])
  const commonstyles = 'pl-4 border-r-[0.5px] border-gray-300'
  const commonStylesData =  'pl-4 border-r-[0.5px] border-gray-300 h-12 font-normal'
  return (
    <div className=' w-full bg-white'>
        <Stack
        direction={"column"}
        className='p-8'
        >
         <Stack direction={'row'} justifyContent={'space-between'}>

            {/* this should the best the left Box  */}
            <Stack direction={'row'} gap={'10px'}>
                
                <ArrowLeftOutlined onClick={() => navigate(-1)} style={{
                    background : '#EBEBEB',
                    padding : '10px',
                    borderRadius : '100px'
                }}/>
               <Typography className='text-4xl' fontSize={24} fontFamily={'Open Sans'} fontWeight={'600'}>Order Description : {state.orderdescription}</Typography>
            </Stack>
            

            <CloseOutlined style={{ fontSize: '18px', cursor : 'pointer' , background : '#D7D7D7', borderRadius : '200px', padding : '10px'}} onClick={() => navigate(-1)} />
            {/* <Typography>Another Heading</Typography> */}
         </Stack>
          
        <Stack direction={'column'} gap={'100px'} sx={{marginTop : '40px'}}>
            <Stack direction={'column'} justifyItems={'center'} justifyContent={'center'}>
                <div className='w-full h-12 bg-[#DAE7FF] flex flex-col justify-center pl-7'>
                    <p className='text-[18px] font-[600]'>Receipts</p>
                </div>
                <table className='bg-[#EDF3FF]'>
                    <thead className='bg-[#EDF3FF] text-xs font-thin h-12 text-left pl-4 border-black border-t-[0.8px] border-b-[0.8px]'>
                        <th className={commonstyles}>Client Name</th>
                        <th className={commonstyles}>Property</th>
                        <th className={commonstyles}>Order Description</th>
                        <th className={commonstyles}>Amount</th>
                        <th className={commonstyles}>TDS</th>
                        <th className={commonstyles}>Received By</th>
                        <th className={commonstyles}>Received Date</th>
                        <th className={commonstyles}>Payment Mode</th>
                        <th className={commonstyles}>Payment Status</th>
                    </thead>
                    {receiptsData && 
                    <tbody className='text-xs font-thin'>
                       
                        {receiptsData.map((item) => {
                            return <tr>
                                    <td className={commonStylesData}>{item.clientname}</td>
                                    <td className={commonStylesData}>Property</td>
                                    <td className={commonStylesData}>Order Description</td>
                                    <td className={commonStylesData}>{item.amount}</td>
                                    <td className={commonStylesData}>TDS</td>
                                    <td className={commonStylesData}>Received By</td>
                                    <td className={commonStylesData}>Received Date</td>
                                    <td className={commonStylesData}>Payment Mode</td>
                                    <td className={commonStylesData}>Payment Status</td>
                            </tr>
                        })}
                       
                    </tbody>
}
                   {receiptsData.length == 0 && <h1 className='pl-5 py-5'> No Records To Show</h1>}
                </table>
            </Stack>





            <Stack direction={'column'} justifyItems={'center'} justifyContent={'center'}>
                <div className='w-full h-12 bg-[#DAE7FF] flex flex-col justify-center pl-7'>
                    <p className='text-[18px] font-[600]'>Payments</p>
                </div>
                <table className='bg-[#EDF3FF]'>
                    <thead className='bg-[#EDF3FF] text-xs font-thin h-12 text-left border-black border-t-[0.8px] border-b-[0.8px]'>
                        <th className={commonstyles}>Client Name</th>
                        <th className={commonstyles}>Property</th>
                        <th className={commonstyles}>Order Description</th>
                        <th className={commonstyles}>Vendor Name</th>
                        <th className={commonstyles}>Amount</th>
                        <th className={commonstyles}>Payment By</th>
                        <th className={commonstyles}>Payment Date</th>
                        <th className={commonstyles}>Mode Of Payment</th>
                        
                    </thead>
                    {paymentsData && 
                    <tbody className='text-xs font-thin'>
                        
                        {paymentsData.map((item) => {
                            return <tr>
                                <td className={commonStylesData}>{item.clientname}</td>
                                <td className={commonStylesData}>{item.property}</td>
                                <td className={commonStylesData}>{item.briefdescription}</td>
                                <td className={commonStylesData}>{item.vendorname}</td>
                                <td className={commonStylesData}>{item.amount}</td>
                                <td className={commonStylesData}>{item.paymentbyname}</td>
                                <td className={commonStylesData}>{item.paymentdate}</td>
                                <td className={commonStylesData}>{item.modeofpayment}</td> 
                            </tr>
                        })}
                        
                    </tbody>
}
                    {paymentsData.length == 0 && <h1 className='pl-5 py-5'> No Records To Show</h1>}
                </table>
            </Stack>





            <Stack direction={'column'} justifyItems={'center'} justifyContent={'center'}>
                <div className='w-full h-12 bg-[#DAE7FF] flex flex-col justify-center pl-7'>
                    <p className='text-[18px] font-[600]'>Invoices</p>
                </div>
                <table className='bg-[#EDF3FF]'>
                    <thead className='bg-[#EDF3FF] text-xs font-thin h-12 text-left border-black border-t-[0.8px] border-b-[0.8px]'>
                        <th className={commonstyles} >Client Name</th>
                        <th className={commonstyles} >Order Description</th>
                        <th className={commonstyles} >Estimate Amount</th>
                        <th className={commonstyles} >Estimate Date</th>
                        <th className={commonstyles} >Invoice Amount</th>
                        <th className={commonstyles} >Invoice Date</th>
                       
                    </thead>
                    {invoicesData && 
                    <tbody className='text-xs font-thin'>
                        {invoicesData.map((item) => {
                            return <tr>
                                <td className={commonStylesData}>{item.clientname}</td>
                                <td className={commonStylesData}>Order Description</td>
                                <td className={commonStylesData}>Estimate Amount</td>
                                <td className={commonStylesData}>Estimate Date</td>
                                <td className={commonStylesData}>Invoice Amount</td>
                                <td className={commonStylesData}>Invoice Date</td>
                            </tr>
                        })}
                        
                    </tbody>}
                    {invoicesData.length == 0 && <h1 className='pl-5 py-5'> No Records To Show</h1>}
                </table>
            </Stack>
          </Stack>
        </Stack>
    </div>
  )
}

export default ShowAllOdersInformation
