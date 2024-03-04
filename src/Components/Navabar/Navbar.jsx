import React from 'react';
import logo from '../assets/logo-white1.jpg';
import LogoutIcon from '../assets/logout.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
const Navbar = () => {
 
  const [isToggledDash, setIsToggledDash] = useState(false);
  const [isToggledAdmin, setIsToggledAdmin] = useState(false);
  // const [isToggledManage, setIsToggledManage] = useState(false);
 

  const handleAdminChange = () => {
      if(isToggledDash) {
        handleDashChange();
      }
      setIsToggledAdmin((toggle) => {
         return !toggle;
      })
  };
  const handleDashChange = () => {
    if(isToggledAdmin) {
      handleAdminChange();
    }
    setIsToggledDash((toggle) => {
      return !toggle;
    })
  }
  return (
    <>
      <div className='bg-accent-blue w-screen  justify-between	 h-16 flex '>
        {/* this div is off the navbar */}
        {/* we have three parts here */}
        <div className='h-full w-16 flex justify-center items-center'>
           <img src={logo} className='h-1/3 ml-16'/>
        </div>
        <div className='flex text-stone-50	space-x-9 items-center'>
          {/* this will have the center bar */}
          <div className='bg-white w-20 h-7 flex items-center justify-center text-accent-blue rounded-sm'>
             <button onClick={handleAdminChange}>
               <p className=' font-sans text-md' >Admin</p>
             </button>
             
          </div>
          <div>
             <p className='font-thin font-sans text-md'>Manage</p>
          </div>
         
          <p className='font-thin font-sans text-md'>Report</p>
          <p className='font-thin font-sans text-md'>Research</p>
        </div>
        <div className='flex  text-stone-50	space-x-4 items-center mr-4'>
          {/* this will have the right content */}
          <button onClick={handleDashChange}>
             <p className='font-thin font-sans text-md'>Dashboard</p>
          </button>
          
          <p className='font-thin font-sans text-md'>Change Password</p>
          <div className='flex just items-center '>
             <img src={LogoutIcon} className='h-4 m-1' />
             <p className='font-thin font-sans text-md'><Link to="/">Logout</Link> </p>
          </div>
        </div>
      </div>
      {isToggledAdmin && <div className='bg-white rounded-lg mt-2 w-5/6 h-[370px] flex font-sans ml-5 absolute top-16'>
         <div className=' w-1/4 h-full flex-col '>
            <div className='ml-5 mt-4 flex-col space-y-2'>
               <h1 className='font-semibold text-xl	'>Personal</h1>
               <p className='text-thin text-base	'>Users</p>
               <p className='text-thin text-base	'>Employees</p>
               <p className='text-thin text-base'>Contractuel Payment</p>

            </div>
            <div className='ml-5 mt-9 flex-col space-y-2'>
               <h1 className='font-semibold text-xl	'>Margin Report</h1>
               <p className='text-thin text-base'>LOB- Receipts - Payments</p>
               <p className='text-thin text-base'>Entity-Receipts-Patments</p>
               <p className='text-thin text-base'>LOB-Receipts-Payments</p>
            </div>
         </div>
         <div class="  w-[2px] h-full bg-[#CBCBCB]"></div>
         <div className=' w-1/4 h-full'>
            <div className='ml-5 mt-4 flex-col space-y-2'>
               <h1 className='font-semibold text-xl	'>Offerings </h1>
               <p className='text-thin text-base'>LOB (Line of business)</p>
               <p className='text-thin text-base'>Services</p>
            </div>
         </div>
         <div class="  w-[2px] h-full bg-[#CBCBCB]"></div>
         <div className=' w-1/4 h-full'>
            <div className='ml-5 mt-4 flex-col space-y-2'>
               <h1 className='font-semibold text-xl	'>Locations</h1>
               
               <p className='text-thin text-base'>Country</p>
               <p className='text-thin text-base'>State</p>
               <p className='text-thin text-base'>City</p>

            </div>
         </div>
         <div class="  w-[2px] h-full bg-[#CBCBCB]"></div>
         <div className=' w-1/4 h-full'>
            <div className='ml-5 mt-4 flex-col space-y-2'>
               <h1 className='font-semibold text-xl	'>Data Management</h1>
               <p className='text-thin text-base'>Delete by ID</p>
            </div>
         </div>
      </div>}
      {isToggledDash && <div className='bg-white rounded-lg mt-2 w-5/6 h-[370px] flex font-sans right-14 absolute top-16 scroll-mr-7'>
         <div className=' w-1/5 h-full flex-col '>
            <div className='ml-5 mt-4 flex-col space-y-2 w-3/4'>
               <h1 className='font-semibold text-xl	'>Home </h1>
               <p className='text-thin text-base'>Dashboard of all</p>
               <p className='text-thin text-base'>Monthly Margins - LOB Receipts Payments</p>
               <p className='text-thin text-base'>Monthly Margins - Entity Receipts-Paymen</p>
               <p className='text-thin text-base'>Monthly Margins - LOB Receipts Payments Consolidated</p>
            </div>
         </div>
         <div class="  w-[2px] h-full bg-[#CBCBCB]"></div>
         <div className=' w-1/5 h-full'>
            <div className='ml-5 mt-4 flex-col space-y-2'>
               <h1 className='font-semibold text-xl	'>Personnel </h1>
               <p className='text-thin text-base'>Users</p>
               <p className='text-thin text-base'>Employees</p>
               <p className='text-thin text-base'>Contractual Payment</p>
            </div>
         </div>
         <div class="  w-[2px] h-full bg-[#CBCBCB]"></div>
         <div className=' w-1/5 h-full'>
            <div className='ml-5 mt-4 flex-col space-y-2'>
               <h1 className='font-semibold text-xl	'>Offerings</h1>
               
               <p className='text-thin text-base'>LOB (Line of business)</p>
               <p className='text-thin text-base'>Services</p>
            </div>
         </div>
         <div class="  w-[2px] h-full bg-[#CBCBCB]"></div>
         <div className=' w-1/5 h-full'>
            <div className='ml-5 mt-4 flex-col space-y-2'>
               <h1 className='font-semibold text-xl	'>Locations</h1>
               <p className='text-thin text-base'>Country</p>
               <p className='text-thin text-base'>State</p>
               <p className='text-thin text-base'>City</p>
               <p className='text-thin text-base'>Locality</p>
            </div>
         </div>
         <div class="  w-[2px] h-full bg-[#CBCBCB]"></div>
         <div className=' w-1/5 h-full'>
            <div className='ml-5 mt-4 flex-col space-y-2'>
               <h1 className='font-semibold text-xl	'>Data Management</h1>
               <p className='text-thin text-base'>Delete by ID</p>
            </div>
         </div>
      </div>
      }
      
    </>

  )
}

export default Navbar
