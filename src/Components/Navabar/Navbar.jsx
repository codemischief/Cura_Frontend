import React from 'react';
import logo from '../../assets/logo-white1.jpg';
import LogoutIcon from '../../assets/logout.png';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { authService } from '../../services/authServices';

const Navbar = () => {

   const [isToggledDash, setIsToggledDash] = useState(false);
   const [isToggledAdmin, setIsToggledAdmin] = useState(false);
   const [isToggledManage, setIsToggledManage] = useState(false);
   const [isToggledReport, setIsToggledReport] = useState(false);
   const [isToggledResearch, setIsToggledResearch] = useState(false);
   // const [isToggledManage, setIsToggledManage] = useState(false);
   
   const menuRef = useRef();

   const logout = () => {
      authService.logOut();
   }
     const handleAdminChange = () => {
      if (isToggledDash) {
         handleDashChange();
      }
      else if (isToggledManage) {
         handleManageChange();
      }
      else if (isToggledResearch) {
         handleResearchChange();
      }
      else if (isToggledReport) {
         handleReportChange();
      }
      setIsToggledAdmin((toggle) => {
         return !toggle;
      })
   };

   const handleDashChange = () => {
      if (isToggledAdmin) {
         handleAdminChange();
      }
      else if (isToggledManage) {
         handleManageChange();
      }
      else if (isToggledResearch) {
         handleResearchChange();
      }  
      else if (isToggledReport) {
         handleReportChange();
      }
      setIsToggledDash((toggle) => {
         return !toggle;
      })
   }

   const handleReportChange= () => {
      if (isToggledAdmin) {
         handleAdminChange();
      }
      else if (isToggledManage) {
         handleManageChange();
      }
      else if (isToggledResearch) {
         handleResearchChange();
      }
      else if (isToggledDash) {
         handleDashChange();
      }
      setIsToggledReport((toggle) => {
         return !toggle;
      })
   }

   const handleManageChange = () => {
      if (isToggledAdmin) {
         handleAdminChange();
      }
      else if (isToggledDash) {
         handleDashChange();
      }
      else if (isToggledResearch) {
         handleResearchChange();
      }
      else if (isToggledReport) {
         handleReportChange();
      }
      setIsToggledManage((toggle) => {
         return !toggle;
      })
   }

   const handleResearchChange = () => {
      if (isToggledAdmin) {
         handleAdminChange();
      }
      else if (isToggledDash) {
         handleDashChange();
      }
      else if (isToggledManage) {
         handleManageChange();
      }
      else if (isToggledReport) {
         handleReportChange();
      }
      setIsToggledResearch((toggle) => {
         return !toggle;
      })
   }

   useEffect(() => {
            const handler = (e) => {
         if (!menuRef.current.contains(e.target)) {
            setIsToggledAdmin(false);
            setIsToggledDash(false);
            setIsToggledManage(false);
            setIsToggledResearch(false);
            setIsToggledReport(false);
         }
      }

      document.addEventListener("mousedown", handler);

      return () =>{
         document.removeEventListener("mousedown",handler);
      };
   })

   return (
      <>
         <div className='bg-accent-blue w-full  justify-between	 h-16 flex '>
            {/* this div is off the navbar */}
            {/* we have three parts here */}
            <div className='h-full w-16 flex justify-center items-center'>
               <img src={logo} className='h-1/3 ml-16' />
            </div>
            <div className='flex text-stone-50	space-x-9 items-center'>
               {/* this will have the center bar */}
            <div className={`w-24 h-7 flex items-center justify-center  rounded-sm  font-thin ${isToggledAdmin ? 'bg-white text-accent-blue' : ''}`}>
                  <button onClick={handleAdminChange}>
                     <p className=' font-sans text-md' >Admin</p>
                  </button>
               </div> 
               <div className={`w-24 h-7 flex items-center justify-center  rounded-sm  font-thin ${isToggledManage ? 'bg-white text-accent-blue' : ''}`}>
                  <button onClick={handleManageChange}>
                     <p className='font-thin font-sans text-md'>Manage</p>
                  </button>
               </div>
               <div className='w-24 h-7 flex items-center justify-center  rounded-sm  font-thin'>
               <button onClick={handleReportChange}>
                  <p className='font-thin font-sans text-md'>Report</p>
                  </button>
               </div>
               <div className={`w-24 h-7 flex items-center justify-center  rounded-sm  font-thin ${isToggledResearch ? 'bg-white text-accent-blue' : ''}`}>
                  <button onClick={handleResearchChange}>
                     <p className='font-thin font-sans text-md'>Research</p>
                  </button>
               </div>
            </div>
            <div className='flex  text-stone-50	space-x-5 items-center mr-4'>
               {/* this will have the right content */}
               <div className={`w-24 h-7 flex items-center justify-center  rounded-sm  font-thin ${isToggledDash ? 'bg-white text-accent-blue' : ''}`}>
                  <button onClick={handleDashChange}>
                     <p className=' font-sans text-md'>Dashboard</p>
                  </button>
               </div>


               <p className='font-thin font-sans text-md'>Change Password</p>
               <div className='flex just items-center ' onClick={() => logout()}>
                  <img src={LogoutIcon} className='h-4 m-1' />
                  <p className='font-thin font-sans text-md'><Link to="/" >Logout</Link> </p>
               </div>
            </div>
         </div>
         {isToggledAdmin && <div ref={menuRef} className='bg-white rounded-lg mt-2 w-5/6 h-[200px] flex font-sans ml-5 absolute top-16 shadow-2xl'>
            <div className=' w-1/5 h-full flex-col '>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-xl'>Personal</h1>
                  <p className='text-thin text-base'><Link to="/admin/manageuser">Users</Link></p>
                  <p className='text-thin text-base'> <Link to="/admin/manageemployees">Employees</Link></p>
                  <p className='text-thin text-base'>Contractuel Payment</p>

               </div>
            </div>
            <div class="  w-[2px] h-full bg-[#CBCBCB]"></div>
            <div className=' w-1/5 h-full'>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-xl	'>Offerings </h1>
                  <p className='text-thin text-base'><Link to="/admin/LOB" >LOB (Line of business)</Link></p>
                  <p className='text-thin text-base'><Link to="/admin/service">Services</Link></p>
               </div>
            </div>
            <div class="  w-[2px] h-full bg-[#CBCBCB]"></div>
            <div className=' w-1/5 h-full'>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-xl	'>Locations</h1>

                  <p className='text-thin text-base'><Link to="/admin/country">Country</Link></p>
                  <p className='text-thin text-base'><Link to="/admin/state">State</Link></p>
                  <p className='text-thin text-base'><Link to="/admin/city">City</Link></p>
                  <p className='text-thin text-base'><Link to="/admin/locality">Locality</Link></p>


               </div>
            </div>
            <div class="  w-[2px] h-full bg-[#CBCBCB]"></div>
            <div className=' w-1/5 h-full'>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-xl'>Data Management</h1>
                  <p className='text-thin text-base'>Delete by ID</p>
               </div>
            </div>
            <div class="  w-[2px] h-full bg-[#CBCBCB]"></div>
            <div className=' w-1/5 h-full'>
            <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-xl'>Margin Report</h1>
                  <p className='text-thin text-base'>LOB- Receipts - Payments</p>
                  <p className='text-thin text-base'>Entity-Receipts-Patments</p>
                  <p className='text-thin text-base'>LOB-Receipts-Payments</p>
               </div>
               </div>
         </div>}
         {isToggledDash && <div ref={menuRef} className='bg-white rounded-lg mt-2 w-5/6 h-[370px] flex font-sans right-8 absolute top-16 scroll-mr-7 shadow-2xl '>
            <div className=' w-1/5 h-full flex-col '>
               <div className='ml-5 mt-4 flex-col space-y-2 w-3/4'>
                  <h1 className='font-semibold text-xl	'>Home </h1>
                  <Link to="/dashboard"><p className='text-thin text-base'>Dashboard of all</p></Link>
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
         {isToggledManage && <div ref={menuRef} className='bg-white rounded-lg mt-2 w-5/6 h-[370px] flex font-sans right-32 absolute top-16 scroll-mr-7 shadow-2xl '>
            {/* <div className=' w-1/5 h-full flex-col '>
               <div className='ml-5 mt-4 flex-col space-y-2 w-3/4'>
                  <Link to="/admin/managebuilder"><h1 className='text-thin text-base'>Manage Builder</h1></Link>
               </div>
            </div>
            <div class="  w-[2px] h-full bg-[#CBCBCB]"></div> */}
             <div className=' w-1/5 h-full flex-col '>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-xl'>Builder</h1>
                  <p className='text-thin text-base'><Link to="/admin/managebuilder">Manage Builder</Link></p>
                  <p className='text-thin text-base'>Manage Report</p>
               </div>
               <div className='ml-5 mt-20 flex-col space-y-2'>
                  <h1 className='font-semibold text-xl'>Statement</h1>
                  <p className='text-thin text-base'>Bank Statement</p>
                  <p className='text-thin text-base'>Send Client Statement</p>
               </div>
            </div>
            
            <div class="  w-[2px] h-full bg-[#CBCBCB]"></div>
            <div className=' w-1/5 h-full flex-col '>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-xl'>Client</h1>
                  <p className='text-thin text-base'><Link to="/admin/managebuilder">Manage Client Property</Link></p>
                  <p className='text-thin text-base'>Manage Client Property</p>
                  <p className='text-thin text-base'>Manage Client Invoice</p>
                  <p className='text-thin text-base'>Manage Client Recipt</p>
               </div>
            </div>
            <div class="  w-[2px] h-full bg-[#CBCBCB]"></div>
            <div className=' w-1/5 h-full flex-col '>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-xl'>Order</h1>
                  <p className='text-thin text-base'><Link to="/admin/managebuilder">Manage Order</Link></p>
                  <p className='text-thin text-base'>Manage Order Recipt</p>
               </div>
            </div>
            <div class="  w-[2px] h-full bg-[#CBCBCB]"></div>
            <div className=' w-1/5 h-full flex-col '>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-xl'>Vendor</h1>
                  <p className='text-thin text-base'>Manage Vendor</p>
                  <p className='text-thin text-base'>Manage Vendor Invoice</p>
                  <p className='text-thin text-base'>Manage Vendor Payment</p>
               </div>
            </div>
            <div class="  w-[2px] h-full bg-[#CBCBCB]"></div>
            <div className=' w-1/5 h-full flex-col '>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-xl'>Service</h1>
                  <p className='text-thin text-base'>PMA Agreement</p>
                  <p className='text-thin text-base'>L&L Agreement</p>
                  <p className='text-thin text-base'>PMA Billing</p>
                  <p className='text-thin text-base'>Email PMA Statement</p>
               </div>
            </div>
            
         </div>
         }
         
        {isToggledReport && <div ref={menuRef} className='bg-white rounded-lg mt-2 w-5/6 h-[550px] flex font-sans right-32 absolute top-16 scroll-mr-7 shadow-2xl '>
            {/* <div className=' w-1/5 h-full flex-col '>
               <div className='ml-5 mt-4 flex-col space-y-2 w-3/4'>
                  <Link to="/admin/managebuilder"><h1 className='text-thin text-base'>Manage Builder</h1></Link>
               </div>
            </div>
            <div class="  w-[2px] h-full bg-[#CBCBCB]"></div> */}
             <div className=' w-1/5 h-full flex-col '>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-xl'>Bank Record</h1>
                  <p className='text-thin text-xs'>Client Order Recipt Mismatch Details</p>
                  <p className='text-thin text-xs'>Bank Balance Reconciliation</p>
                  <p className='text-thin text-xs'>Monthly Bank Summary</p>
                  <p className='text-thin text-xs'>Bank Transfer Reconciliation</p>
                  <p className='text-thin text-xs'>Daily Bank Receipts Reconciliation</p>
                  <p className='text-thin text-xs'>Daily Bank Payments Reconciliation</p>
               </div>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-xl'>Lists</h1>
                  <p className='text-thin text-xs'>Order Payment List</p>
                  <p className='text-thin text-xs'>Order Recipt List</p>
                  <p className='text-thin text-xs'>Order Invoice List</p>
                  <p className='text-thin text-xs'>Vendor Payment List</p>
                  <p className='text-thin text-xs'>Client Recipt List</p>
                  <p className='text-thin text-xs'>L and L List</p>
               </div>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-xl'>Monthly Margin</h1>
                  <p className='text-thin text-xs'>LOB-Recipts-Payments</p>
                  <p className='text-thin text-xs'>Entity-Recipt-Payments</p>
                  <p className='text-thin text-xs'>Client Statement-CI,CR and OR(All Entities)</p>
                  <p className='text-thin text-xs'>LOB-Recipts-Payments Consolidated</p>
               </div>
            </div>
            
            <div class="  w-[2px] h-full bg-[#CBCBCB]"></div>
            <div className=' w-1/5 h-full flex-col '>
            <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-xl'>Client</h1>
                  <p className='text-thin text-xs'>Client Statement</p>
                  <p className='text-thin text-xs'>Duplicate Client</p>
                  <p className='text-thin text-xs'>Client Bank Details</p>
                  <p className='text-thin text-xs'>CURA Non PMA Client Statement</p>
                  <p className='text-thin text-xs'>CURA Non PMA Client Receivables</p>
               </div>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-xl'>PMA</h1>
                  <p className='text-thin text-xs'>Active PMA Agreements</p>
                  <p className='text-thin text-xs'>All Project Contacts</p>
                  <p className='text-thin text-xs'>Details for Advance Holding Amount</p>
                  <p className='text-thin text-xs'>PMA Client Statement-CI,CR and OR(All Entities)</p>
                  <p className='text-thin text-xs'>CURA PMA Client Statement</p>
                  <p className='text-thin text-xs'>CURA PMA Client Receivables</p>
                  <p className='text-thin text-xs'>PMA Invoice List</p>
                  <p className='text-thin text-xs'>PMA Billing Trend Report</p>
                  <p className='text-thin text-xs'>Client Portal Report</p>
               </div>
            </div>
            <div class="  w-[2px] h-full bg-[#CBCBCB]"></div>
            <div className=' w-1/5 h-full flex-col '>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-xl'>Contact</h1>
                  <p className='text-thin text-xs'>All Owner Email Ids </p>
                  <p className='text-thin text-xs'>All Tenant Email Ids</p>
                  <p className='text-thin text-xs'>Client Contacts</p>
                  <p className='text-thin text-xs'>Owners Phone No's</p>
                  <p className='text-thin text-xs'>Clients Phone No's</p>
               </div>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-xl'>Tally Report</h1>
                  <p className='text-thin text-xs'>Client Receipt </p>
                  <p className='text-thin text-xs'>Order Payment-DD</p>
                  <p className='text-thin text-xs'>Order Payment-B2C</p>
                  <p className='text-thin text-xs'>Order Payment-B2B</p>
                  <p className='text-thin text-xs'>Order Receipt-C2B</p>
                  <p className='text-thin text-xs'>OR-Invoice-Service Tax/GST</p>
                  <p className='text-thin text-xs'>Order Payment Without TDS</p>
               </div>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-xl'>Report Trace</h1>
                  <p className='text-thin text-xs'>Client Trace</p>
                  <p className='text-thin text-xs'>Order Trace</p>
                  <p className='text-thin text-xs'>Vendor Trace</p>
               </div>
            </div>
            <div class="  w-[2px] h-full bg-[#CBCBCB]"></div>
            <div className=' w-1/5 h-full flex-col '>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-xl'>Exceptions</h1>
                  <p className='text-thin text-xs'>Manage Vendor</p>
                  <p className='text-thin text-xs'>Manage Vendor Invoice</p>
                  <p className='text-thin text-xs'>Manage Vendor Payment</p>
               </div>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-xl'>Vendor</h1>
                  <p className='text-thin text-xs'>Vendor Summary</p>
                  <p className='text-thin text-xs'>Vendor Statement</p>
               </div>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-xl'>Service Tax Reports</h1>
                  <p className='text-thin text-xs'>Agency Repair Service Receipts</p>
                  <p className='text-thin text-xs'>Service Tax Paid by Vendor</p>
               </div>
            </div>
            <div class="  w-[2px] h-full bg-[#CBCBCB]"></div>
            <div className=' w-1/5 h-full flex-col '>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-xl'>Orders</h1>
                  <p className='text-thin text-xs'>Aged Order</p>
                  <p className='text-thin text-xs'>Order Analysis</p>
               </div>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-xl'>Legal</h1>
                  <p className='text-thin text-xs'>Active L & L Agreement</p>
               </div>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-xl'>Statistics</h1>
                  <p className='text-thin text-xs'>Order Statistics</p>
                  <p className='text-thin text-xs'>Client Statistics</p>
                  <p className='text-thin text-xs'>Statistics Report</p>
                  <p className='text-thin text-xs'>Owners Statistics Report</p>
               </div>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-xl'>TDS Report</h1>
                  <p className='text-thin text-xs'>TDS Paid By Vendor</p>
                  <p className='text-thin text-xs'>Vendor Payment Summary For Period</p>
                  <p className='text-thin text-xs'>Paid Paid to Government</p>
               </div>
            </div>
         </div>
         }
         {isToggledResearch && <div ref={menuRef} className='bg-white rounded-lg mt-2 w-5/6 h-[250px] flex font-sans right-10 absolute top-16 scroll-mr-7 shadow-2xl '>
            <div className=' w-1/4 h-full flex-col '>
               <div className='ml-5 mt-4 flex-col space-y-2 w-3/4'>
                  <Link to="/research/prospect"><h1 className='text-thin text-base font-semibold'>Prospect</h1></Link>
               </div>
               <div className='ml-5 mt-4 flex-col space-y-2 w-3/4'>
                  <h1 className='text-thin text-base font-semibold'>Employer</h1>
               </div>
               <div className='ml-5 mt-4 flex-col space-y-2 w-3/4'>
               <h1 className='text-thin text-base font-semibold'>Manage Govt Department </h1>
               </div>
               <div className='ml-5 mt-4 flex-col space-y-2 w-3/4'>
               <h1 className='text-thin text-base font-semibold'>Real Estate Agent</h1>
               </div>
            </div>
            <div class="  w-[2px] h-full bg-[#CBCBCB]"></div>
            <div className=' w-1/4 h-full flex-col '>
               <div className='ml-5 mt-4 flex-col space-y-2 w-3/4'>
               <h1 className='text-thin text-base font-semibold'><Link to="/research/owner"></Link>Manage Owners</h1>
               </div>
               <div className='ml-5 mt-4 flex-col space-y-2 w-3/4'>
                  <h1 className='text-thin text-base font-semibold'>Service Appartments And Guest Houses </h1>
               </div>
               <div className='ml-5 mt-4 flex-col space-y-2 w-3/4'>
               <h1 className='text-thin text-base font-semibold'>Manage Govt Department </h1>
               </div>
               <div className='ml-5 mt-4 flex-col space-y-2 w-3/4'>
               <h1 className='text-thin text-base font-semibold'>Real Estate Agent</h1>
               </div>
            </div>
            <div class="  w-[2px] h-full bg-[#CBCBCB]"></div>
            <div className=' w-1/4 h-full flex-col '>
               <div className='ml-5 mt-4 flex-col space-y-2 w-3/4'>
               <h1 className='text-thin text-base font-semibold'>Bank and Branches</h1>
               </div>
               <div className='ml-5 mt-4 flex-col space-y-2 w-3/4'>
                  <h1 className='text-thin text-base font-semibold'>Business Group </h1>
               </div>
               <div className='ml-5 mt-4 flex-col space-y-2 w-3/4'>
               <h1 className='text-thin text-base font-semibold'>Professionals </h1>
               </div>
            </div>
            <div class="  w-[2px] h-full bg-[#CBCBCB]"></div>
            <div className=' w-1/4 h-full flex-col '>
               <div className='ml-5 mt-4 flex-col space-y-2 w-3/4'>
               <h1 className='text-thin text-base font-semibold'>Mandals</h1>
               </div>
               <div className='ml-5 mt-4 flex-col space-y-2 w-3/4'>
                  <h1 className='text-thin text-base font-semibold'><Link to="/research/architect">Architect</Link></h1>
               </div>
               <div className='ml-5 mt-4 flex-col space-y-2 w-3/4'>
               <h1 className='text-thin text-base font-semibold'><Link to="/research/educational">Educational Institute </Link></h1>
               </div>
            </div>
         </div>
         }
      </>
   )
}

export default Navbar