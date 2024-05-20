import React from "react";
import logo from "../../assets/logo-white1.jpg";
import LogoutIcon from "../../assets/logout.png";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { authService } from "../../services/authServices";

const Navbar = () => {
  const [isToggledDash, setIsToggledDash] = useState(false);
  const [isToggledAdmin, setIsToggledAdmin] = useState(false);
  const [isToggledManage, setIsToggledManage] = useState(false);
  const [isToggledReport, setIsToggledReport] = useState(false);
  const [isToggledResearch, setIsToggledResearch] = useState(false);
  const [isFirstOpen, setIsisFirstOpen] = useState(true);
  // const [isToggledManage, setIsToggledManage] = useState(false);

  const menuRef = useRef();

  const logout = () => {
    authService.logOut();
  };
  const handleAdminChange = () => {
    if (isToggledDash) {
      handleDashChange();
    } else if (isToggledManage) {
      handleManageChange();
    } else if (isToggledResearch) {
      handleResearchChange();
    } else if (isToggledReport) {
      handleReportChange();
    }
    setIsToggledAdmin((toggle) => {
      return !toggle;
    });
    setIsisFirstOpen(false);
  };

  const handleDashChange = () => {
    if (isToggledAdmin) {
      handleAdminChange();
    } else if (isToggledManage) {
      handleManageChange();
    } else if (isToggledResearch) {
      handleResearchChange();
    } else if (isToggledReport) {
      handleReportChange();
    }
    setIsToggledDash((toggle) => {
      return !toggle;
    });
    setIsisFirstOpen(false);
  };

  const handleReportChange = () => {
    if (isToggledAdmin) {
      handleAdminChange();
    } else if (isToggledManage) {
      handleManageChange();
    } else if (isToggledResearch) {
      handleResearchChange();
    } else if (isToggledDash) {
      handleDashChange();
    }
    setIsToggledReport((toggle) => {
      return !toggle;
    });
    setIsisFirstOpen(false);
  };

  const handleManageChange = () => {
    if (isToggledAdmin) {
      handleAdminChange();
    } else if (isToggledDash) {
      handleDashChange();
    } else if (isToggledResearch) {
      handleResearchChange();
    } else if (isToggledReport) {
      handleReportChange();
    }
    setIsToggledManage((toggle) => {
      return !toggle;
    });
    setIsisFirstOpen(false);
  };

  const handleResearchChange = () => {
    if (isToggledAdmin) {
      handleAdminChange();
    } else if (isToggledDash) {
      handleDashChange();
    } else if (isToggledManage) {
      handleManageChange();
    } else if (isToggledReport) {
      handleReportChange();
    }
    setIsToggledResearch((toggle) => {
      return !toggle;
    });
    setIsisFirstOpen(false);
  };

  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current) {
        setIsToggledAdmin(false);
        setIsToggledDash(false);
        setIsToggledManage(false);
        setIsToggledResearch(false);
        setIsToggledReport(false);
      } else if (!menuRef.current.contains(e.target)) {
        setIsToggledAdmin(false);
        setIsToggledDash(false);
        setIsToggledManage(false);
        setIsToggledResearch(false);
        setIsToggledReport(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <>
      <div className="bg-accent-blue w-full  justify-between h-16 flex ">
        {/* this div is off the navbar */}
        {/* we have three parts here */}
        <div className="h-full w-16 flex justify-center items-center">
          <img src={logo} className="h-1/3 ml-16" />
        </div>
        <div className="flex text-stone-50	space-x-9 items-center">
          {/* this will have the center bar */}
          <div
            className={`w-24 h-7 flex items-center justify-center  rounded-sm  font-thin ${isToggledAdmin ? "bg-white text-accent-blue" : ""
              }`}
          >
            <button onClick={handleAdminChange}>
              <p className=" font-sans text-md">Admin</p>
            </button>
          </div>
          <div
            className={`w-24 h-7 flex items-center justify-center  rounded-sm  font-thin ${isToggledManage ? "bg-white text-accent-blue" : ""
              }`}
          >
            <button onClick={handleManageChange}>
              <p className="font-thin font-sans text-md">Manage</p>
            </button>
          </div>
          <div
            className={`w-24 h-7 flex items-center justify-center  rounded-sm  font-thin ${isToggledReport ? "bg-white text-accent-blue" : ""
              }`}
          >
            <button onClick={handleReportChange}>
              <p className="font-thin font-sans text-md">Report</p>
            </button>
          </div>
          <div
            className={`w-24 h-7 flex items-center justify-center  rounded-sm  font-thin ${isToggledResearch ? "bg-white text-accent-blue" : ""
              }`}
          >
            <button onClick={handleResearchChange}>
              <p className="font-thin font-sans text-md">Research</p>
            </button>
          </div>
        </div>
        <div className="flex  text-stone-50	space-x-5 items-center mr-4">
          {/* this will have the right content */}
          <div
            className={`w-24 h-7 flex items-center justify-center  rounded-sm  font-thin ${isToggledDash || isFirstOpen ? "bg-white text-accent-blue" : ""
              }`}
          >
            <button onClick={handleDashChange}>
              <p className=" font-sans text-md">Dashboard</p>
            </button>
          </div>

          <p className="font-thin font-sans text-md">Change Password</p>
          <div className="flex just items-center " onClick={() => logout()}>
            <img src={LogoutIcon} className="h-4 m-1" />
            <p className="font-thin font-sans text-md">
              <Link to="/">Logout</Link>{" "}
            </p>
          </div>
        </div>
      </div>
      {isToggledAdmin && (
        <div
          ref={menuRef}
          className="bg-white rounded-lg mt-2 w-[96.9%] h-[270px] flex font-sans ml-5 absolute top-16 shadow-2xl z-40"
        >
          <div className=" w-1/5 h-full flex-col ">
            <div className="ml-5 mt-4 flex-col space-y-6">
              <h1 className="font-semibold text-xl pl-1 hover:underline decoration-sky-500 decoration-4">
                Personnel
              </h1>
              <div className="space-y-2 text-[#505050] text-[11px]">
                <p className="text-thin text-base hover:bg-[#DAE7FF] w-[80%] rounded-md p-1">
                  <Link to="/admin/manageuser">Users</Link>
                </p>
                <p className="text-thin text-base hover:bg-[#DAE7FF] w-[80%] rounded-md p-1">
                  {" "}
                  <Link to="/admin/manageemployees">Employees</Link>
                </p>
                <p className="text-thin text-base hover:bg-[#DAE7FF] w-[80%] rounded-md p-1">
                  <Link to="/admin/payments">Contractual Payment</Link>
                </p>
              </div>
            </div>
          </div>
          <div class="  w-[1px] h-[90%] bg-[#CBCBCB] my-2"></div>
          <div className=" w-1/5 h-full">
            <div className="ml-5 mt-4 flex-col space-y-6">
              <h1 className="font-semibold text-xl pl-1 hover:underline decoration-sky-500 decoration-4">
                Offerings{" "}
              </h1>
              <div className="space-y-2 text-[#505050] text-[11px]">
                <p className="text-thin text-base hover:bg-[#DAE7FF] w-[80%] rounded-md p-1">
                  <Link to="/admin/LOB">LOB (Line of business)</Link>
                </p>
                <p className="text-thin text-base hover:bg-[#DAE7FF] w-[80%] rounded-md p-1">
                  <Link to="/admin/service">Services</Link>
                </p>
              </div>
            </div>
          </div>
          <div class="  w-[1px] h-[90%] bg-[#CBCBCB] my-2"></div>
          <div className=" w-1/5 h-full">
            <div className="ml-5 mt-4 flex-col space-y-6">
              <h1 className="font-semibold text-xl pl-1 hover:underline decoration-sky-500 decoration-4">
                Locations
              </h1>
              <div className="space-y-2 text-[#505050] text-[11px]">
                <p className="text-thin text-base hover:bg-[#DAE7FF] w-[80%] rounded-md p-1">
                  <Link to="/admin/country">Country</Link>
                </p>
                {/* <p className="text-thin text-base hover:bg-[#DAE7FF] w-[80%] rounded-md p-1">
                  <Link to="/admin/state">State</Link>
                </p> */}
                <p className="text-thin text-base hover:bg-[#DAE7FF] w-[80%] rounded-md p-1">
                  <Link to="/admin/city">City</Link>
                </p>
                <p className="text-thin text-base hover:bg-[#DAE7FF] w-[80%] rounded-md p-1">
                  <Link to="/admin/locality">Locality</Link>
                </p>
              </div>
            </div>
          </div>
          <div class="  w-[1px] h-[90%] bg-[#CBCBCB] my-2"></div>
          <div className=" w-1/5 h-full">
            <div className="ml-5 mt-4 flex-col space-y-6">
              <h1 className="font-semibold text-xl pl-1 hover:underline decoration-sky-500 decoration-4">
                Data Management
              </h1>
              <div className="space-y-2 text-[#505050] text-[11px]">
                <p className="text-thin text-base hover:bg-[#DAE7FF] w-[80%] rounded-md p-1">
                  Delete by ID
                </p>
              </div>
            </div>
          </div>
          <div class="  w-[1px] h-[90%] bg-[#CBCBCB] my-2"></div>
          <div className=" w-1/5 h-full">
            <div className="ml-5 mt-4 flex-col space-y-6">
              <h1 className="font-semibold text-xl pl-1 hover:underline decoration-sky-500 decoration-4">
                Margin Report
              </h1>
              <div className="space-y-2 text-[#505050] text-[11px]">
                <p className="text-thin text-base hover:bg-[#DAE7FF] w-[80%] rounded-md p-1">
                  LOB- Receipts - Payments
                </p>
                <p className="text-thin text-base hover:bg-[#DAE7FF] w-[80%] rounded-md p-1">
                  Entity-Receipts-Payments
                </p>
                <p className="text-thin text-base hover:bg-[#DAE7FF] w-[80%] rounded-md p-1">
                  LOB - Receipts-Payments-Consolidated
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* {isToggledDash && <div ref={menuRef} className='bg-white rounded-lg mt-2 w-[96.9%] h-[320px] flex font-sans ml-5 absolute top-16 shadow-2xl '>
            <div className=' w-1/5 h-full flex-col '>
               <div className='ml-5 mt-4 flex-col space-y-6'>
                  <h1 className='font-semibold text-xl'>Home </h1>
                  <div className="space-y-3 text-[#505050] text-[11px] w-[80%]">
                  <Link to="/dashboard"><p className='text-thin text-base'>Dashboard of all</p></Link>
                  <p className='text-thin text-base'>Monthly Margins - LOB Receipts Payments</p>
                  <p className='text-thin text-base'>Monthly Margins - Entity Receipts-Paymen</p>
                  <p className='text-thin text-base'>Monthly Margins - LOB Receipts Payments Consolidated</p>
                  </div>
               </div>
            </div>
            <div class="  w-[1px] h-[73%] mt-16 bg-[#CBCBCB]"></div>
            <div className=' w-1/5 h-full'>
               <div className='ml-5 mt-4 flex-col space-y-6'>
                  <h1 className='font-semibold text-xl'>Personnel </h1>
                  <div className="space-y-3 text-[#505050] text-[11px]">
                  <p className='text-thin text-base'>Users</p>
                  <p className='text-thin text-base'>Employees</p>
                  <p className='text-thin text-base'>Contractual Payment</p>
                  </div>
                  
               </div>
            </div>
            <div class="  w-[1px] h-[72%] mt-16 bg-[#CBCBCB]"></div>
            <div className=' w-1/5 h-full'>
               <div className='ml-5 mt-4 flex-col space-y-6'>
                  <h1 className='font-semibold text-xl'>Offerings</h1>
                  <div className="space-y-3 text-[#505050] text-[11px]">
                  <p className='text-thin text-base'>LOB (Line of business)</p>
                  <p className='text-thin text-base'>Services</p>
                  </div>
                  
               </div>
            </div>
            <div class="  w-[1px] h-[72%] mt-16 bg-[#CBCBCB]"></div>
            <div className=' w-1/5 h-full'>
               <div className='ml-5 mt-4 flex-col space-y-6'>
                  <h1 className='font-semibold text-xl	'>Locations</h1>
                  <div className="space-y-3 text-[#505050] text-[11px]">
                  <p className='text-thin text-base'>Country</p>
                  <p className='text-thin text-base'>State</p>
                  <p className='text-thin text-base'>City</p>
                  <p className='text-thin text-base'>Locality</p>
                  </div>
               </div>
            </div>
            <div class="  w-[1px] h-[72%] mt-16 bg-[#CBCBCB]"></div>
            <div className=' w-1/5 h-full'>
               <div className='ml-5 mt-4 flex-col space-y-6'>
                  <h1 className='font-semibold text-xl'>Data Management</h1>
                  <div className="space-y-3 text-[#505050] text-[11px]">
                  <p className='text-thin text-base'>Delete by ID</p>
                  </div>
               </div>
            </div>
         </div>
         } */}
      {isToggledManage && (
        <div
          ref={menuRef}
          className="bg-white rounded-lg mt-2 w-[96.9%] h-[340px] flex font-sans ml-5 absolute top-16 shadow-2xl z-40"
        >
          {/* <div className=' w-1/5 h-full flex-col '>
               <div className='ml-5 mt-4 flex-col space-y-2 w-3/4'>
                  <Link to="/admin/managebuilder"><h1 className='text-thin text-base'>Manage Builder</h1></Link>
               </div>
            </div>
            <div class="  w-[2px] h-full bg-[#CBCBCB]"></div> */}
          <div className=" w-1/5 h-full flex-col ">
            <div className="ml-5 mt-4 flex-col space-y-4">
              <h1 className="font-semibold text-[18px] text-[#282828] pl-1 hover:underline decoration-sky-500 decoration-4">
                Builder
              </h1>
              <div className="text-[11px] text-[#505050] space-y-1">
                <p className="text-thin text-base hover:bg-[#DAE7FF] w-[80%] rounded-md p-1">
                  <Link to="/admin/managebuilder">Manage Builder</Link>
                </p>
                <p className="text-thin text-base hover:bg-[#DAE7FF] w-[80%] rounded-md p-1">
                  <Link to="/admin/manageprojectinfo">Manage Project</Link>
                </p>
              </div>
            </div>
            <div className="ml-5 mt-20 flex-col space-y-4">
              <h1 className="font-semibold text-[18px] text-[#282828] pl-1 hover:underline decoration-sky-500 decoration-4 ">
                Statement
              </h1>
              <div className="text-[11px] text-[#505050] space-y-1">
                <p className="text-thin text-base hover:bg-[#DAE7FF] w-[80%] rounded-md p-1">
                  <Link to="/manage/bankstatement">Bank Statement</Link>
                </p>
                <p className="text-thin text-base hover:bg-[#DAE7FF] w-[80%] rounded-md p-1">
                  Send Client Statement
                </p>
              </div>
            </div>
          </div>

          <div class="  w-[1px] h-[90%] bg-[#CBCBCB] mt-4"></div>
          <div className=" w-1/5 h-full flex-col ">
            <div className="ml-5 mt-4 flex-col space-y-4">
              <h1 className="font-semibold text-[18px] text-[#282828] pl-1 hover:underline decoration-sky-500 decoration-4">
                Client
              </h1>
              <div className="text-[11px] text-[#505050] space-y-1">
                <p className="text-thin text-base hover:bg-[#DAE7FF] w-[80%] rounded-md p-1">
                  <Link to="/manage/manageclientinfo">Manage Client</Link>
                </p>
                <p className="text-thin text-base hover:bg-[#DAE7FF] w-[80%] rounded-md p-1">
                  <Link to="/manage/manageclientproperty">
                    Manage Client Property
                  </Link>
                </p>
                <p className="text-thin text-base hover:bg-[#DAE7FF] w-[80%] rounded-md p-1">
                  <Link to="/manage/manageclientinvoice">
                    Manage Client Invoice
                  </Link>
                </p>
                <p className="text-thin text-base hover:bg-[#DAE7FF] w-[80%] rounded-md p-1">
                  <Link to="/manage/manageclientreceipt">
                    Manage Client Receipt
                  </Link>{" "}
                </p>
              </div>
            </div>
          </div>
          <div class="  w-[1px] h-[90%] bg-[#CBCBCB] mt-4"></div>
          <div className=" w-1/5 h-full flex-col ">
            <div className="ml-5 mt-4 flex-col space-y-4">
              <h1 className="font-semibold text-[18px] text-[#282828] pl-1 hover:underline decoration-sky-500 decoration-4">
                Order
              </h1>
              <div className="text-[11px] text-[#505050] space-y-1">
                <p className="text-thin text-base hover:bg-[#DAE7FF] w-[80%] rounded-md p-1">
                  <Link to="/admin/manageorder">Manage Order</Link>
                </p>
                <p className="text-thin text-base hover:bg-[#DAE7FF] w-[80%] rounded-md p-1">
                  <Link to="/manage/manageorderreceipt">
                    Manage Order Receipt
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div class="  w-[1px] h-[90%] bg-[#CBCBCB] mt-4"></div>
          <div className=" w-1/5 h-full flex-col ">
            <div className="ml-5 mt-4 flex-col space-y-4">
              <h1 className="font-semibold text-[18px] text-[#282828] pl-1 hover:underline decoration-sky-500 decoration-4">
                Vendor
              </h1>
              <div className="text-[11px] text-[#505050] space-y-1">
                <p className="text-thin text-base hover:bg-[#DAE7FF] w-[80%] rounded-md p-1">
                  <Link to="/manage/managevendor">Manage Vendor</Link>
                </p>
                <p className="text-thin text-base hover:bg-[#DAE7FF] w-[80%] rounded-md p-1">
                  <Link to="/manage/managevendorinvoice">
                    Manage Vendor Invoice
                  </Link>
                </p>
                <p className="text-thin text-base hover:bg-[#DAE7FF] w-[80%] rounded-md p-1">
                  <Link to="/manage/managevendorpayment">
                    Manage Vendor Payment
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div class="  w-[1px] h-[90%] bg-[#CBCBCB] mt-4"></div>
          <div className=" w-1/5 h-full flex-col ">
            <div className="ml-5 mt-4 flex-col space-y-4">
              <h1 className="font-semibold text-[18px] text-[#282828] pl-1 hover:underline decoration-sky-500 decoration-4">
                Service
              </h1>
              <div className="text-[11px] text-[#505050] space-y-1">
                <p className="text-thin text-base hover:bg-[#DAE7FF] w-[80%] rounded-md p-1">
                  <Link to="/manage/managepmaagreement">PMA Agreement</Link>
                </p>
                <p className="text-thin text-base hover:bg-[#DAE7FF] w-[80%] rounded-md p-1">
                  <Link to="/manage/managellagreement">L&L Agreement</Link>{" "}
                </p>
                <p className="text-thin text-base hover:bg-[#DAE7FF] w-[80%] rounded-md p-1">
                  <Link to="/manage/pmaBilling">PMA Billing</Link>
                </p>
                <p className="text-thin text-base hover:bg-[#DAE7FF] w-[80%] rounded-md p-1">
                  Email PMA Statement
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {isToggledReport && (
        <div
          ref={menuRef}
          className="bg-white rounded-lg mt-2 w-[97.5%] h-[500px] flex font-sans ml-5 absolute top-16 shadow-2xl z-40 overflow-auto"
        >
          {/* <div className=' w-1/5 h-full flex-col '>
               <div className='ml-5 mt-4 flex-col space-y-2 w-3/4'>
                  <Link to="/admin/managebuilder"><h1 className='text-thin text-base'>Manage Builder</h1></Link>
               </div>
            </div>
            <div class="  w-[2px] h-full bg-[#CBCBCB]"></div> */}
          <div className=" w-1/5 h-full flex-col ">
            <div className="ml-5 mt-4 flex-col space-y-2">
              <h1 className="font-semibold text-[18px] text-[#282828] pl-1 hover:underline decoration-sky-500 decoration-4">
                Bank Record
              </h1>
              <div className="text-[11px] text-[#505050] space-y-[2px]">
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  Client Order Receipt Mismatch Details
                </p>
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  Bank Balance Reconciliation
                </p>
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  Monthly Bank Summary
                </p>
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  Bank Transfer Reconciliation
                </p>
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  Daily Bank Receipts Reconciliation
                </p>
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  Daily Bank Payments Reconciliation
                </p>
              </div>
            </div>
            <div className="ml-5 mt-4 flex-col space-y-2">
              <h1 className="font-semibold text-[18px] text-[#282828] pl-1 hover:underline decoration-sky-500 decoration-4">
                Lists
              </h1>
              <div className="text-[11px] text-[#505050] space-y-[2px]">
                <Link to={"/orderPaymentList"}>
                  <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                    Order Payment List
                  </p>
                </Link>
                <Link to={"/orderReceiptList"}>
                  <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                    Order Receipt List
                  </p>
                </Link>
                <Link to={"/OrderInvoiceList"}>
                  <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                    Order Invoice List
                  </p>
                </Link>
                <Link to={"/vendorInvoiceList"}>
                  <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                    Vendor Payment List
                  </p>
                </Link>
                <Link to={"/clientReceiptList"}>
                  <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                    Client Receipt List
                  </p>
                </Link>
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  L and L List
                </p>
              </div>
            </div>
            <div className="ml-5 mt-4 flex-col space-y-2">
              <h1 className="font-semibold text-[18px] text-[#282828] pl-1 hover:underline decoration-sky-500 decoration-4">
                Monthly Margin
              </h1>
              <div className="text-[11px] text-[#505050] space-y-[2px]">
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  LOB-Receipts-Payments
                </p>
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  Entity-Receipt-Payments
                </p>
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  Client Statement-CI,CR and OR(All Entities)
                </p>
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  LOB-Receipts-Payments Consolidated
                </p>
              </div>
            </div>
          </div>

          <div class="  w-[1px] h-[94%] bg-[#CBCBCB] mt-4"></div>
          <div className=" w-1/5 h-full flex-col ">
            <div className="ml-5 mt-4 flex-col space-y-2">
              <h1 className="font-semibold text-[18px] text-[#282828] pl-1 hover:underline decoration-sky-500 decoration-4">
                Client
              </h1>
              <div className="text-[11px] text-[#505050] space-y-[2px]">
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  Client Statement
                </p>
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  Duplicate Client
                </p>
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  Client Bank Details
                </p>
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  CURA Non PMA Client Statement
                </p>
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  CURA Non PMA Client Receivables
                </p>
              </div>
            </div>
            <div className="ml-5 mt-4 flex-col space-y-2">
              <h1 className="font-semibold text-[18px] text-[#282828] pl-1 hover:underline decoration-sky-500 decoration-4">
                PMA
              </h1>
              <div className="text-[11px] text-[#505050] space-y-[2px]">
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  Active PMA Agreements
                </p>
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  All Project Contacts
                </p>
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  Details for Advance Holding Amount
                </p>
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  PMA Client Statement-CI,CR and OR(All Entities)
                </p>
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  CURA PMA Client Statement
                </p>
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  CURA PMA Client Receivables
                </p>
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  PMA Invoice List
                </p>
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  PMA Billing Trend Report
                </p>
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  Client Portal Report
                </p>
              </div>
            </div>
          </div>
          <div class="  w-[1px] h-[94%] bg-[#CBCBCB] mt-4"></div>
          <div className=" w-1/5 h-full flex-col ">
            <div className="ml-5 mt-4 flex-col space-y-2">
              <h1 className="font-semibold text-[18px] text-[#282828] pl-1 hover:underline decoration-sky-500 decoration-4">
                Contact
              </h1>
              <div className="text-[11px] text-[#505050] space-y-[2px]">
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  All Owner Email Ids{" "}
                </p>
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  All Tenant Email Ids
                </p>
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  Client Contacts
                </p>
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  Owners Phone No's
                </p>
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  Clients Phone No's
                </p>
              </div>
            </div>
            <div className="ml-5 mt-4 flex-col space-y-2">
              <h1 className="font-semibold text-[18px] text-[#282828] hover:underline decoration-sky-500 decoration-4">
                Tally Report
              </h1>
              <div className="text-[11px] text-[#505050] space-y-[2px]">
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  Client Receipt{" "}
                </p>
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  Order Payment-DD
                </p>
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  Order Payment-B2C
                </p>
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  Order Payment-B2B
                </p>
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  Order Receipt-C2B
                </p>
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  OR-Invoice-Service Tax/GST
                </p>
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  Order Payment Without TDS
                </p>
              </div>
            </div>
            <div className="ml-5 mt-4 flex-col space-y-2">
              <h1 className="font-semibold text-[18px] text-[#282828] hover:underline decoration-sky-500 decoration-4">
                Report Trace
              </h1>
              <div className="text-[11px] text-[#505050] space-y-[2px]">
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  Client Trace
                </p>
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  Order Trace
                </p>
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  Vendor Trace
                </p>
              </div>
            </div>
          </div>
          <div class="  w-[1px] h-[94%] bg-[#CBCBCB] mt-4"></div>
          <div className=" w-1/5 h-full flex-col ">
            <div className="ml-5 mt-4 flex-col space-y-2">
              <h1 className="font-semibold text-[18px] text-[#282828] pl-1 hover:underline decoration-sky-500 decoration-4">
                Exceptions
              </h1>
              <div className="text-[11px] text-[#505050] space-y-[2px]">
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  Manage Vendor
                </p>
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  Manage Vendor Invoice
                </p>
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  Manage Vendor Payment
                </p>
              </div>
            </div>
            <div className="ml-5 mt-4 flex-col space-y-2">
              <h1 className="font-semibold text-[18px] text-[#282828] pl-1 hover:underline decoration-sky-500 decoration-4">
                Vendor
              </h1>
              <div className="text-[11px] text-[#505050] space-y-[2px]">
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  Vendor Summary
                </p>
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  Vendor Statement
                </p>
              </div>
            </div>
            <div className="ml-5 mt-4 flex-col space-y-2">
              <h1 className="font-semibold text-[18px] text-[#282828] pl-1 hover:underline decoration-sky-500 decoration-4 ">
                Service Tax Reports
              </h1>
              <div className="text-[11px] text-[#505050] space-y-[2px]">
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  Agency Repair Service Receipts
                </p>
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  Service Tax Paid by Vendor
                </p>
              </div>
            </div>
          </div>
          <div class="  w-[1px] h-[94%] bg-[#CBCBCB] mt-4"></div>
          <div className=" w-1/5 h-full flex-col ">
            <div className="ml-5 mt-4 flex-col space-y-2">
              <h1 className="font-semibold text-[18px] text-[#282828] pl-1 hover:underline decoration-sky-500 decoration-4">
                Orders
              </h1>
              <div className="text-[11px] text-[#505050] space-y-[2px]">
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  Aged Order
                </p>
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  Order Analysis
                </p>
              </div>
            </div>
            <div className="ml-5 mt-4 flex-col space-y-2">
              <h1 className="font-semibold text-[18px] text-[#282828] hover:underline decoration-sky-500 decoration-4">
                Legal
              </h1>
              <div className="text-[11px] text-[#505050] space-y-[2px]">
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  Active L & L Agreement
                </p>
              </div>
            </div>
            <div className="ml-5 mt-4 flex-col space-y-2">
              <h1 className="font-semibold text-[18px] text-[#282828] pl-1 hover:underline decoration-sky-500 decoration-4">
                Statistics
              </h1>
              <div className="text-[11px] text-[#505050] space-y-[2px]">
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  Order Statistics
                </p>
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  Client Statistics
                </p>
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  Statistics Report
                </p>
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  Owners Statistics Report
                </p>
              </div>
            </div>
            <div className="ml-5 mt-4 flex-col space-y-2">
              <h1 className="font-semibold text-[18px] text-[#282828] hover:underline decoration-sky-500 decoration-4">
                TDS Report
              </h1>
              <div className="text-[11px] text-[#505050] space-y-[2px]">
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  TDS Paid By Vendor
                </p>
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  Vendor Payment Summary For Period
                </p>
                <p className="text-thin text-xs hover:bg-[#DAE7FF] w-[94%] rounded-md p-1">
                  Paid Paid to Government
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {isToggledResearch && (
        <div
          ref={menuRef}
          className="bg-white rounded-[15px] mt-2 w-[96.9%] h-[260px] flex font-sans ml-5 absolute top-16 shadow-2xl px-32 text-[#282828] text-[15px] z-40"
        >
          <div className=" w-1/4 h-full flex-col space-y-4 ">
            <div className="ml-5 mt-4 flex-col space-y-2 w-3/4">
              <Link to="/research/prospect">
                <h1 className="text-thin text-base font-semibold hover:bg-[#DAE7FF] w-[80%] rounded-md p-1">
                  Prospect
                </h1>
              </Link>
            </div>
            <div className="ml-5 mt-4 flex-col space-y-2 ">
              <h1 className="text-thin text-base font-semibold hover:bg-[#DAE7FF] w-[80%] rounded-md p-1 ">
                Employer
              </h1>
            </div>
            <div className="ml-5 mt-4 flex-col space-y-2 w-3/4">
              <h1 className="text-thin text-base font-semibold hover:bg-[#DAE7FF] w-[100%] rounded-md p-1">
                Manage Govt Department{" "}
              </h1>
            </div>
            <div className="ml-5 mt-4 flex-col space-y-2 w-3/4">
              <h1 className="text-thin text-base font-semibold hover:bg-[#DAE7FF] w-[90%] rounded-md p-1">
                Real Estate Agents
              </h1>
            </div>
          </div>
          <div class="  w-[1px] h-[88%] bg-[#CBCBCB] mt-4 mx-4"></div>
          <div className=" w-[30%] h-full flex-col space-y-4 ">
            <div className="ml-5 mt-4 flex-col space-y-2 w">
              <h1 className="text-thin text-base font-semibold hover:bg-[#DAE7FF] w-[80%] rounded-md p-1">
                <Link to="/research/owner">Manage Owners</Link>
              </h1>
            </div>
            <div className="ml-5 mt-4 flex-col space-y-2 w-3/4">
              <h1 className="text-thin text-base font-semibold hover:bg-[#DAE7FF] w-[100%] rounded-md p-1">
                Service Appartments And Guest Houses{" "}
              </h1>
            </div>
            <div className="ml-5 mt-4 flex-col space-y-2 w-3/4">
              <h1 className="text-thin text-base font-semibold hover:bg-[#DAE7FF] w-[80%] rounded-md p-1">
                Friends{" "}
              </h1>
            </div>
          </div>
          <div class="  w-[1px] h-[88%] bg-[#CBCBCB] mt-4 mx-4 "></div>
          <div className=" w-1/4 h-full flex-col space-y-4">
            <div className="ml-5 mt-4 flex-col space-y-2 w-3/4">
              <h1 className="text-thin text-base font-semibold hover:bg-[#DAE7FF] w-[80%] rounded-md p-1">
                Bank and Branches
              </h1>
            </div>
            <div className="ml-5 mt-4 flex-col space-y-2 w-3/4">
              <h1 className="text-thin text-base font-semibold hover:bg-[#DAE7FF] w-[80%] rounded-md p-1">
                Business Group{" "}
              </h1>
            </div>
            <div className="ml-5 mt-4 flex-col space-y-2 w-3/4">
              <h1 className="text-thin text-base font-semibold hover:bg-[#DAE7FF] w-[80%] rounded-md p-1">
                Professionals{" "}
              </h1>
            </div>
          </div>
          <div class="  w-[1px] h-[88%] bg-[#CBCBCB] mt-4 mx-4"></div>
          <div className=" w-1/4 h-full flex-col space-y-4">
            <div className="ml-5 mt-4 flex-col space-y-2 w-3/4">
              <h1 className="text-thin text-base font-semibold hover:bg-[#DAE7FF] w-[80%] rounded-md p-1">
                Mandals
              </h1>
            </div>
            <div className="ml-5 mt-4 flex-col space-y-2 w-3/4">
              <h1 className="text-thin text-base font-semibold hover:bg-[#DAE7FF] w-[80%] rounded-md p-1">
                <Link to="/research/architect">Architect</Link>
              </h1>
            </div>
            <div className="ml-5 mt-4 flex-col space-y-2 w-3/4">
              <h1 className="text-thin text-base font-semibold hover:bg-[#DAE7FF] w-[80%] rounded-md p-1">
                <Link to="/research/educational">Educational Institute </Link>
              </h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
