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
         {isToggledAdmin && <div ref={menuRef} className='bg-white rounded-lg mt-2 w-5/6 h-[200px] w-[1330px]  flex font-sans ml-5 absolute top-16 shadow-2xl'>
            <div className=' w-1/5 h-full flex-col '>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-[18px] text-[#282828] '>Personnel</h1>
                  <p className='text-thin text-[11px] text-[#505050]'><Link to="/admin/manageuser">Users</Link></p>
                  <p className='text-thin text-[11px] text-[#505050]'> <Link to="/admin/manageemployees">Employees</Link></p>
                  <p className='text-thin text-[11px] text-[#505050]'>Contractual Payment</p>

               </div>
            </div>
            <div class="  w-[2px] h-full bg-[#CBCBCB]"></div>
            <div className=' w-1/5 h-full'>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-[18px]	'>Offerings </h1>
                  <p className='text-thin text-[11px] text-[#505050]'><Link to="/admin/LOB" >LOB (Line of business)</Link></p>
                  <p className='text-thin text-[11px] text-[#505050]'><Link to="/admin/service">Services</Link></p>
               </div>
            </div>
            <div class="  w-[2px] h-full bg-[#CBCBCB]"></div>
            <div className=' w-1/5 h-full'>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-[18px]	'>Locations</h1>

                  <p className='text-thin text-[11px] text-[#505050]'><Link to="/admin/country">Country</Link></p>
                  <p className='text-thin text-[11px] text-[#505050]'><Link to="/admin/state">State</Link></p>
                  <p className='text-thin text-[11px] text-[#505050]'><Link to="/admin/city">City</Link></p>
                  <p className='text-thin text-[11px] text-[#505050]'><Link to="/admin/locality">Locality</Link></p>


               </div>
            </div>
            <div class="  w-[2px] h-full bg-[#CBCBCB]"></div>
            <div className=' w-1/5 h-full'>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-[18px]'>Data Management</h1>
                  <p className='text-thin text-[11px] text-[#505050]'>Delete by ID</p>
               </div>
            </div>
            <div class="  w-[2px] h-full bg-[#CBCBCB]"></div>
            <div className=' w-1/5 h-full'>
            <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-[18px]'>Margin Report</h1>
                  <p className='text-thin text-[11px] text-[#505050]'>LOB- Receipts - Payments</p>
                  <p className='text-thin text-[11px] text-[#505050]'>Entity-Receipts-Patments</p>
                  <p className='text-thin text-[11px] text-[#505050]'>LOB - Receipts-Payments-Consolidated</p>
               </div>
               </div>
         </div>}
         {isToggledDash && <div ref={menuRef} className='bg-white rounded-lg mt-2 w-5/6 h-[370px] w-[1330px] flex font-sans ml-5 absolute top-16 shadow-2xl'>
            <div className=' w-1/5 h-full flex-col '>
               <div className='ml-5 mt-4 flex-col space-y-2 w-3/4'>
                  <h1 className='font-semibold text-[18px]	'>Home </h1>
                  <Link to="/dashboard"><p className='text-thin text-[11px]'>Dashboard of all</p></Link>
                  <p className='text-thin text-[11px] text-[#505050]'>Monthly Margins - LOB Receipts Payments</p>
                  <p className='text-thin text-[11px]text-[#505050]'>Monthly Margins - Entity Receipts-Paymen</p>
                  <p className='text-thin text-[11px] text-[#505050]'>Monthly Margins - LOB Receipts Payments Consolidated</p>
               </div>
            </div>
            <div class="  w-[2px] h-full bg-[#CBCBCB]"></div>
            <div className=' w-1/5 h-full'>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-[18px]'>Personnel </h1>
                  <p className='text-thin text-[11px] text-[#505050]'>Users</p>
                  <p className='text-thin text-[11px] text-[#505050]'>Employees</p>
                  <p className='text-thin text-[11px] text-[#505050]'>Contractual Payment</p>
               </div>
            </div>
            <div class="  w-[2px] h-full bg-[#CBCBCB]"></div>
            <div className=' w-1/5 h-full'>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-[18px]	'>Offerings</h1>

                  <p className='text-thin text-[11px] text-[#505050]'>LOB (Line of business)</p>
                  <p className='text-thin text-[11px] text-[#505050]'>Services</p>
               </div>
            </div>
            <div class="  w-[2px] h-full bg-[#CBCBCB]"></div>
            <div className=' w-1/5 h-full'>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-[18px]	'>Locations</h1>
                  <p className='text-thin text-[11px] text-[#505050]'>Country</p>
                  <p className='text-thin text-[11px] text-[#505050]'>State</p>
                  <p className='text-thin text-[11px] text-[#505050]'>City</p>
                  <p className='text-thin text-[11px] text-[#505050]'>Locality</p>
               </div>
            </div>
            <div class="  w-[2px] h-full bg-[#CBCBCB]"></div>
            <div className=' w-1/5 h-full'>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-[18px]	'>Data Management</h1>
                  <p className='text-thin text-[11px] text-[#505050]'>Delete by ID</p>
               </div>
            </div>
         </div>
         }
         {isToggledManage && <div ref={menuRef} className='bg-white rounded-lg mt-2 w-5/6 h-[370px] w-[1330px] flex font-sans ml-5 absolute top-16 shadow-2xl'>
            {/* <div className=' w-1/5 h-full flex-col '>
               <div className='ml-5 mt-4 flex-col space-y-2 w-3/4'>
                  <Link to="/admin/managebuilder"><h1 className='text-thin text-[11px]'>Manage Builder</h1></Link>
               </div>
            </div>
            <div class="  w-[2px] h-full bg-[#CBCBCB]"></div> */}
             <div className=' w-1/5 h-full flex-col '>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-[18px]'>Builder</h1>
                  <p className='text-thin text-[11px] text-[#505050]'><Link to="/admin/managebuilder">Manage Builder</Link></p>
                  <p className='text-thin text-[11px] text-[#505050]'>Manage Report</p>
               </div>
               <div className='ml-5 mt-20 flex-col space-y-2'>
                  <h1 className='font-semibold text-[18px]'>Statement</h1>
                  <p className='text-thin text-[11px] text-[#505050]'><Link to="/manage/bankstatement">Bank Statement</Link></p>
                  <p className='text-thin text-[11px] text-[#505050]'>Send Client Statement</p>
               </div>
            </div>
            
            <div class="  w-[2px] h-full bg-[#CBCBCB]"></div>
            <div className=' w-1/5 h-full flex-col '>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-[18px]'>Client</h1>
                  <p className='text-thin text-[11px] text-[#505050]'><Link to="/admin/managebuilder">Manage Client</Link></p>
                  <p className='text-thin text-[11px] text-[#505050]'>Manage Client Property</p>
                  <p className='text-thin text-[11px] text-[#505050]'>Manage Client Invoice</p>
                  <p className='text-thin text-[11px] text-[#505050]'>Manage Client Recipt</p>
               </div>
            </div>
            <div class="  w-[2px] h-full bg-[#CBCBCB]"></div>
            <div className=' w-1/5 h-full flex-col '>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-[18px]'>Order</h1>
                  <p className='text-thin text-[11px] text-[#505050]'><Link to="/admin/managebuilder">Manage Order</Link></p>
                  <p className='text-thin text-[11px] text-[#505050]'>Manage Order Recipt</p>
               </div>
            </div>
            <div class="  w-[2px] h-full bg-[#CBCBCB]"></div>
            <div className=' w-1/5 h-full flex-col '>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-[18px]'>Vendor</h1>
                  <p className='text-thin text-[11px] text-[#505050]'>Manage Vendor</p>
                  <p className='text-thin text-[11px] text-[#505050]'>Manage Vendor Invoice</p>
                  <p className='text-thin text-[11px] text-[#505050]'>Manage Vendor Payment</p>
               </div>
            </div>
            <div class="  w-[2px] h-full bg-[#CBCBCB]"></div>
            <div className=' w-1/5 h-full flex-col '>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-[18px]'>Service</h1>
                  <p className='text-thin text-[11px] text-[#505050]'>PMA Agreement</p>
                  <p className='text-thin text-[11px] text-[#505050]'>L&L Agreement</p>
                  <p className='text-thin text-[11px] text-[#505050]'>PMA Billing</p>
                  <p className='text-thin text-[11px] text-[#505050]'>Email PMA Statement</p>
               </div>
            </div>
            
         </div>
         }
         
        {isToggledReport && <div ref={menuRef} className='bg-white rounded-lg mt-2 w-5/6 h-[550px] w-[1330px] flex font-sans ml-5 absolute top-16 shadow-2xl'>
            {/* <div className=' w-1/5 h-full flex-col '>
               <div className='ml-5 mt-4 flex-col space-y-2 w-3/4'>
                  <Link to="/admin/managebuilder"><h1 className='text-thin text-[11px]'>Manage Builder</h1></Link>
               </div>
            </div>
            <div class="  w-[2px] h-full bg-[#CBCBCB]"></div> */}
             <div className=' w-1/5 h-full flex-col '>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-[18px]'>Bank Record</h1>
                  <p className='text-thin text-[11px] text-[#505050]'>Client Order Recipt Mismatch Details</p>
                  <p className='text-thin text-[11px] text-[#505050]'>Bank Balance Reconciliation</p>
                  <p className='text-thin text-[11px] text-[#505050]'>Monthly Bank Summary</p>
                  <p className='text-thin text-[11px] text-[#505050]'>Bank Transfer Reconciliation</p>
                  <p className='text-thin text-[11px] text-[#505050]'>Daily Bank Receipts Reconciliation</p>
                  <p className='text-thin text-[11px] text-[#505050]'>Daily Bank Payments Reconciliation</p>
               </div>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-[18px]'>Lists</h1>
                  <p className='text-thin text-[11px] text-[#505050]'>Order Payment List</p>
                  <p className='text-thin text-[11px]text-[#505050]'>Order Receipt List</p>
                  <p className='text-thin text-[11px] text-[#505050]'>Order Invoice List</p>
                  <p className='text-thin text-[11px] text-[#505050]'>Vendor Payment List</p>
                  <p className='text-thin text-[11px] text-[#505050]'>Client Receipt List</p>
                  <p className='text-thin text-[11px] text-[#505050]'>L and L List</p>
               </div>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-[18px]'>Monthly Margin</h1>
                  <p className='text-thin text-[11px] text-[#505050]'>LOB-Receipts-Payments</p>
                  <p className='text-thin text-[11px] text-[#505050]'>Entity-Receipt-Payments</p>
                  <p className='text-thin text-[11px] text-[#505050]'>Client Statement-CI,CR and OR(All Entities)</p>
                  <p className='text-thin text-[11px] text-[#505050]'>LOB-Receipts-Payments-Consolidated</p>
               </div>
            </div>
            
            <div class="  w-[2px] h-full bg-[#CBCBCB]"></div>
            <div className=' w-1/5 h-full flex-col '>
            <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-[18px]'>Client</h1>
                  <p className='text-thin text-[11px] text-[#505050]'>Client Statement</p>
                  <p className='text-thin text-[11px] text-[#505050]'>Duplicate Client</p>
                  <p className='text-thin text-[11px] text-[#505050]'>Client Bank Details</p>
                  <p className='text-thin text-[11px] text-[#505050]'>CURA Non PMA Client Statement</p>
                  <p className='text-thin text-[11px] text-[#505050]'>CURA Non PMA Client Receivables</p>
               </div>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-[18px] '>PMA</h1>
                  <p className='text-thin text-[11px] text-[#505050]'>Active PMA Agreements</p>
                  <p className='text-thin text-[11px] text-[#505050]'>All Project Contacts</p>
                  <p className='text-thin text-[11px] text-[#505050]'>Details for Advance Holding Amount</p>
                  <p className='text-thin text-[11px] text-[#505050]'>PMA Client Statement-CI,CR and OR(All Entities)</p>
                  <p className='text-thin text-[11px] text-[#505050]'>CURA PMA Client Statement</p>
                  <p className='text-thin text-[11px] text-[#505050]'>CURA PMA Client Receivables</p>
                  <p className='text-thin text-[11px] text-[#505050]'>PMA Invoice List</p>
                  <p className='text-thin text-[11px] text-[#505050]'>PMA Billing Trend Report</p>
                  <p className='text-thin text-[11px] text-[#505050]'>Client Portal Report</p>
               </div>
            </div>
            <div class="  w-[2px] h-full bg-[#CBCBCB]"></div>
            <div className=' w-1/5 h-full flex-col '>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-[18px]'>Contact</h1>
                  <p className='text-thin text-[11px] text-[#505050]'>All Owner Email Ids </p>
                  <p className='text-thin text-[11px] text-[#505050]'>All Tenant Email Ids</p>
                  <p className='text-thin text-[11px] text-[#505050]'>Client Contacts</p>
                  <p className='text-thin text-[11px] text-[#505050]'>Owners Phone No's</p>
                  <p className='text-thin text-[11px] text-[#505050]'>Clients Phone No's</p>
               </div>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-[18px]'>Tally Report</h1>
                  <p className='text-thin text-[11px] text-[#505050]'>Client Receipt </p>
                  <p className='text-thin text-[11px] text-[#505050]'>Order Payment-DD</p>
                  <p className='text-thin text-[11px] text-[#505050]'>Order Payment-B2C</p>
                  <p className='text-thin text-[11px] text-[#505050]'>Order Payment-B2B</p>
                  <p className='text-thin text-[11px] text-[#505050]'>Order Receipt-C2B</p>
                  <p className='text-thin text-[11px] text-[#505050]'>OR-Invoice-Service Tax/GST</p>
                  <p className='text-thin text-[11px] text-[#505050]'>Order Payment Without TDS</p>
               </div>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-[18px]'>Report Trace</h1>
                  <p className='text-thin text-[11px] text-[#505050]'>Client Trace</p>
                  <p className='text-thin text-[11px] text-[#505050]'>Order Trace</p>
                  <p className='text-thin text-[11px] text-[#505050]'>Vendor Trace</p>
               </div>
            </div>
            <div class="  w-[2px] h-full bg-[#CBCBCB]"></div>
            <div className=' w-1/5 h-full flex-col '>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-[18px]'>Exceptions</h1>
                  <p className='text-thin text-[11px] text-[#505050]'>Manage Vendor</p>
                  <p className='text-thin text-[11px] text-[#505050]'>Manage Vendor Invoice</p>
                  <p className='text-thin text-[11px] text-[#505050]'>Manage Vendor Payment</p>
               </div>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-[18px]'>Vendor</h1>
                  <p className='text-thin text-[11px] text-[#505050]'>Vendor Summary</p>
                  <p className='text-thin text-[11px] text-[#505050]'>Vendor Statement</p>
               </div>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-[18px]'>Service Tax Reports</h1>
                  <p className='text-thin text-[11px] text-[#505050]'>Agency Repair Service Receipts</p>
                  <p className='text-thin text-[11px] text-[#505050]'>Service Tax Paid by Vendor</p>
               </div>
            </div>
            <div class="  w-[2px] h-full bg-[#CBCBCB]"></div>
            <div className=' w-1/5 h-full flex-col '>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-[18px]'>Orders</h1>
                  <p className='text-thin text-[11px] text-[#505050]'>Aged Order</p>
                  <p className='text-thin text-[11px] text-[#505050]'>Order Analysis</p>
               </div>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-[18px]'>Legal</h1>
                  <p className='text-thin text-[11px] text-[#505050]'>Active L & L Agreement</p>
               </div>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-[18px]'>Statistics</h1>
                  <p className='text-thin text-[11px] text-[#505050]'>Order Statistics</p>
                  <p className='text-thin text-[11px]text-[#505050]'>Client Statistics</p>
                  <p className='text-thin text-[11px] text-[#505050]'>Statistics Report</p>
                  <p className='text-thin text-[11px] text-[#505050]'>Owners Statistics Report</p>
               </div>
               <div className='ml-5 mt-4 flex-col space-y-2'>
                  <h1 className='font-semibold text-[18px]'>TDS Report</h1>
                  <p className='text-thin text-[11px] text-[#505050]'>TDS Paid By Vendor</p>
                  <p className='text-thin text-[11px] text-[#505050]'>Vendor Payment Summary For Period</p>
                  <p className='text-thin text-[11px] text-[#505050]'>Paid Paid to Government</p>
               </div>
            </div>
         </div>
         }
         {isToggledResearch && <div ref={menuRef} className='bg-white rounded-lg mt-2 w-5/6 h-[250px] w-[1330px] flex font-sans ml-5 absolute top-16 shadow-2xl'>
            <div className=' w-1/4 h-full flex-col '>
               <div className='ml-5 mt-4 flex-col space-y-2 w-3/4'>
                  <Link to="/research/prospect"><h1 className='text-thin text-[11px] font-semibold'>Prospect</h1></Link>
               </div>
               <div className='ml-5 mt-4 flex-col space-y-2 w-3/4'>
                  <h1 className='text-thin text-[11px] font-semibold'>Employer</h1>
               </div>
               <div className='ml-5 mt-4 flex-col space-y-2 w-3/4'>
               <h1 className='text-thin text-[11px] font-semibold'>Manage Govt Department </h1>
               </div>
               <div className='ml-5 mt-4 flex-col space-y-2 w-3/4'>
               <h1 className='text-thin text-[11px] font-semibold'>Real Estate Agents</h1>
               </div>
            </div>
            <div class="  w-[2px] h-full bg-[#CBCBCB]"></div>
            <div className=' w-1/4 h-full flex-col '>
               <div className='ml-5 mt-4 flex-col space-y-2 w-3/4'>
               <h1 className='text-thin text-[11px] font-semibold'><Link to="/research/owner"></Link>Manage Owners</h1>
               </div>
               <div className='ml-5 mt-4 flex-col space-y-2 w-3/4'>
                  <h1 className='text-thin text-[11px] font-semibold'>Service Appartments And Guest Houses </h1>
               </div>
               <div className='ml-5 mt-4 flex-col space-y-2 w-3/4'>
               <h1 className='text-thin text-[11px] font-semibold'>Friends</h1>
               </div>
              
            </div>
            <div class="  w-[2px] h-full bg-[#CBCBCB]"></div>
            <div className=' w-1/4 h-full flex-col '>
               <div className='ml-5 mt-4 flex-col space-y-2 w-3/4'>
               <h1 className='text-thin text-[11px] font-semibold'>Bank and Branches</h1>
               </div>
               <div className='ml-5 mt-4 flex-col space-y-2 w-3/4'>
                  <h1 className='text-thin text-[11px] font-semibold'>Business Group </h1>
               </div>
               <div className='ml-5 mt-4 flex-col space-y-2 w-3/4'>
               <h1 className='text-thin text-[11px] font-semibold'>Professionals </h1>
               </div>
            </div>
            <div class="  w-[2px] h-full bg-[#CBCBCB]"></div>
            <div className=' w-1/4 h-full flex-col '>
               <div className='ml-5 mt-4 flex-col space-y-2 w-3/4'>
               <h1 className='text-thin text-[11px] font-semibold'>Mandals</h1>
               </div>
               <div className='ml-5 mt-4 flex-col space-y-2 w-3/4'>
                  <h1 className='text-thin text-[11px] font-semibold'><Link to="/research/architect">Architect</Link></h1>
               </div>
               <div className='ml-5 mt-4 flex-col space-y-2 w-3/4'>
               <h1 className='text-thin text-[11px] font-semibold'><Link to="/research/educational">Educational Institute </Link></h1>
               </div>
            </div>
         </div>
         }
      </>
   )
}

export default Navbar