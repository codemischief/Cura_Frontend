import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Backdrop, CircularProgress } from "@mui/material"
import Navbar from "../../../Components/Navabar/Navbar"
import backLink from "../../../assets/back.png"
import { Link } from "react-router-dom"
const DeleteById = () => {
    const navigate = useNavigate(-1)
    const [pageLoading,setPageLoading] = useState(false)
    return (
        <div className='font-medium'>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={pageLoading}
                onClick={() => {}}
            >

               <CircularProgress color="inherit"/>

            </Backdrop>
            {/* <Navbar /> */}
            <div className="w-full h-[calc(100vh_-_75px)] px-5 ">

                 <div className='h-16 w-full  flex justify-between items-center p-2  mb-36'>
                    <div className='flex items-center space-x-3'>
                        <div className='rounded-2xl  bg-[#EBEBEB] h-8 w-8 flex justify-center items-center '>
                            <button onClick={() => navigate(-1)}><img className='h-5 w-5' src={backLink} /></button>
                        </div>

                        <div className='flex-col'>
                            <h1 className='text-[18px]'>Delete By ID</h1>
                            <p className='text-[14px]'>Admin &gt; Delete By ID</p>
                        </div>
                    </div>
                    
                </div>

            <div class="grid grid-cols-3 grid-rows-4 gap-[18px] w-full h-60 ">
                  <Link to="deleteclient" state={{tablename : "client" }}><div className="w-full h-full bg-[#F0F6FF] rounded-lg shadow-md hover:bg-[#DAE7FF] cursor-pointer flex items-center justify-center">
                           <p>Delete Client</p>
                  </div>
                  </Link>
                  <Link to="deleteorder" state={{tablename : "orders"}}><div className="w-full h-full bg-[#F0F6FF] rounded-lg shadow-md hover:bg-[#DAE7FF] cursor-pointer flex items-center justify-center">
                           <p>Delete Order</p>
                  </div>
                  </Link>
                  <Link to="deleteclientinvoice" state={{ tablename : "order_invoice", entityname : "Client Invoice", fielduiname : "Quote Description", fieldbackendname : "quotedescription"}}><div className="w-full h-full bg-[#F0F6FF] rounded-lg shadow-md hover:bg-[#DAE7FF] cursor-pointer flex items-center justify-center">
                           <p>Delete Client Invoice</p>
                  </div>
                  </Link>
                  <Link to="deleteordereceipt" state={{ tablename : "get_orders_receipt_view", entityname : "Order Receipt" , fielduiname : "Order Description" , fieldbackendname : "briefdescription"}}><div className="w-full h-full bg-[#F0F6FF] rounded-lg shadow-md hover:bg-[#DAE7FF] cursor-pointer flex items-center justify-center">
                           <p>Delete Order Receipt</p>
                  </div>
                  </Link>
                  <Link to="deleteorderpayment" state={{  tablename : "order_payment", entityname : "Order Payment" , fielduiname : "Description" , fieldbackendname : "description"}}><div className="w-full h-full bg-[#F0F6FF] rounded-lg shadow-md hover:bg-[#DAE7FF] cursor-pointer flex items-center justify-center">
                           <p>Delete Order Payment</p>
                  </div>
                  </Link>
                  <Link to="deleteordertask" state={{  }}><div className="w-full h-full bg-[#F0F6FF] rounded-lg shadow-md hover:bg-[#DAE7FF] cursor-pointer flex items-center justify-center">
                           <p>Delete Order Task</p>
                  </div>
                  </Link>
                  <Link to="deleteclientreceipt" state={{ tablename : "client_receipt", entityname : "Client Receipt"}}><div className="w-full h-full bg-[#F0F6FF] rounded-lg shadow-md hover:bg-[#DAE7FF] cursor-pointer flex items-center justify-center">
                           <p>Delete Client Receipt</p>
                  </div>
                  </Link>
                  <Link to="deletevendorinvoice" state={{tablename : "vendor_invoice", entityname : "Vendor Invoice"}}><div className="w-full h-full bg-[#F0F6FF] rounded-lg shadow-md hover:bg-[#DAE7FF] cursor-pointer flex items-center justify-center">
                           <p>Delete Vendor Invoice</p>
                  </div>
                  </Link>
                  <Link to="deletevendor" state={{tablename : "vendor", entityname : "Vendor", fielduiname : "Vendor Name" , fieldbackendname : "vendorname"}}>
                  <div className="w-full h-full bg-[#F0F6FF] rounded-lg shadow-md hover:bg-[#DAE7FF] cursor-pointer flex items-center justify-center">
                           <p>Delete Vendor</p>
                  </div>
                  </Link>
                  <Link to="deleteuser" state={{tablename : "usertable" , entityname : "User", fielduiname : "Username", fieldbackendname : "username"}}>
                  <div className="w-full h-full bg-[#F0F6FF] rounded-lg shadow-md hover:bg-[#DAE7FF] cursor-pointer flex items-center justify-center">
                           <p>Delete User</p>
                  </div>
                  </Link>
                  <Link to="deleteemployee" state={{ tablename : "employee" , entityname : "Employee", fielduiname : "Employee Name" , fieldbackendname : "employeename"}}>
                  <div className="w-full h-full bg-[#F0F6FF] rounded-lg shadow-md hover:bg-[#DAE7FF] cursor-pointer flex items-center justify-center">
                           <p>Delete Employee</p>
                  </div>
                  </Link>
                  <Link to="deletebankstatement" state={{ tablename : "bankst" , entityname : "Bank Statement", fielduiname : "Particulars", fieldbackendname : "particulars"}}>
                  <div className="w-full h-full bg-[#F0F6FF] rounded-lg shadow-md hover:bg-[#DAE7FF] cursor-pointer flex items-center justify-center">
                           <p>Delete Bank Statement</p>
                  </div>
                  </Link>

                </div>

            </div>

        </div>
    )
}

export default DeleteById
