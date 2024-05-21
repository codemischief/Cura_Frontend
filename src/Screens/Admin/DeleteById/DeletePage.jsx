import React from "react"
import { useState } from "react"
import { useNavigate ,useLocation } from "react-router-dom"
import { Backdrop, CircularProgress } from "@mui/material"
import { Add } from "@mui/icons-material"
import Navbar from "../../../Components/Navabar/Navbar"
import backLink from "../../../assets/back.png"
const DeletePage = () => {
    let { state } = useLocation();
    console.log(state)
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
                            <p className='text-[14px]'>Admin &gt; Delete By ID &gt; {state.pagename}</p>
                        </div>
                    </div>
                    
                </div>

                <h1 className="mb-5">{state.pagename}</h1>
                 <div className="w-full h-40 bg-[#F5F5F5] rounded-lg p-10 flex items-center ">
                    <div className="flex space-x-4">
                        <select className="w-48 rounded-md"><option>Select </option></select>
                        <button
                            className={`bg-[#004DD7] text-white text-sm font-semibold leading-[135%] h-[36px] w-[170px] rounded-lg flex gap-4 justify-center items-center`}
                            onClick={() => {}}
                            >
                            <div className="flex items-center justify-center gap-4">Delete</div>
                              {/* <Add sx={{ height: "18px", width: "18px" }} /> */}
                            </button>
                    </div>
                    
                 </div>
            
               
            </div>

        </div>
    )
}

export default DeletePage
