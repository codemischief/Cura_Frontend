import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Backdrop, CircularProgress } from "@mui/material"
import Navbar from "../../../Components/Navabar/Navbar"
import backLink from "../../../assets/back.png"
const DeletePage = () => {
    const navigate = useNavigate(-1)
    const [pageLoading,setPageLoading] = useState(false)
    return (
        <div className='h-screen font-medium'>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={pageLoading}
                onClick={() => {}}
            >

               <CircularProgress color="inherit"/>

            </Backdrop>
            <Navbar />
            <div className="w-full h-[calc(100vh_-_4rem)] px-5 ">

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
                  <div className="w-full h-full bg-[#F0F6FF] rounded-lg shadow-md hover:bg-[#DAE7FF] cursor-pointer flex items-center justify-center">
                           <p>Delete Client</p>
                  </div>
                  <div className="w-full h-full bg-[#F0F6FF] rounded-lg shadow-md hover:bg-[#DAE7FF] cursor-pointer flex items-center justify-center">
                           <p>Delete Order</p>
                  </div>
                  <div className="w-full h-full bg-[#F0F6FF] rounded-lg shadow-md hover:bg-[#DAE7FF] cursor-pointer flex items-center justify-center">
                           <p>Delete Client Invoice</p>
                  </div>
                  <div className="w-full h-full bg-[#F0F6FF] rounded-lg shadow-md hover:bg-[#DAE7FF] cursor-pointer flex items-center justify-center">
                           <p>Delete Order Receipt</p>
                  </div>
                  <div className="w-full h-full bg-[#F0F6FF] rounded-lg shadow-md hover:bg-[#DAE7FF] cursor-pointer flex items-center justify-center">
                           <p>Delete Order Payment</p>
                  </div>
                  <div className="w-full h-full bg-[#F0F6FF] rounded-lg shadow-md hover:bg-[#DAE7FF] cursor-pointer flex items-center justify-center">
                           <p>Delete Order Task</p>
                  </div>
                  <div className="w-full h-full bg-[#F0F6FF] rounded-lg shadow-md hover:bg-[#DAE7FF] cursor-pointer flex items-center justify-center">
                           <p>Delete Client Receipt</p>
                  </div>
                  <div className="w-full h-full bg-[#F0F6FF] rounded-lg shadow-md hover:bg-[#DAE7FF] cursor-pointer flex items-center justify-center">
                           <p>Delete Vendor Invoice</p>
                  </div>
                  <div className="w-full h-full bg-[#F0F6FF] rounded-lg shadow-md hover:bg-[#DAE7FF] cursor-pointer flex items-center justify-center">
                           <p>Delete Vendor</p>
                  </div>
                  <div className="w-full h-full bg-[#F0F6FF] rounded-lg shadow-md hover:bg-[#DAE7FF] cursor-pointer flex items-center justify-center">
                           <p>Delete User</p>
                  </div>
                  <div className="w-full h-full bg-[#F0F6FF] rounded-lg shadow-md hover:bg-[#DAE7FF] cursor-pointer flex items-center justify-center">
                           <p>Delete Employee</p>
                  </div>
                  <div className="w-full h-full bg-[#F0F6FF] rounded-lg shadow-md hover:bg-[#DAE7FF] cursor-pointer flex items-center justify-center">
                           <p>Delete Bank Statement</p>
                  </div>

                </div>

            </div>

        </div>
    )
}

export default DeletePage
