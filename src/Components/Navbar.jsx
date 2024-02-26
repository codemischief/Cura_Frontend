import React from 'react'
import logo from './assets/logo-white1.jpg'
import LogoutIcon from './assets/logout.png'
import { Link } from 'react-router-dom';

const Navbar = () => {
  const display = () => {
    let element=document.getElementById("dashboard");
    // if(element.style.display=="hidden"){
      element.style.display="inline-block";
    // }
    // else{
    //   element.style.display="hidden";
    // }
  }
  return (
    <>
      <div className="bg-[#004DD7] h-[65px] flex items-center space-x-[240px]">
        <div className=" ml-[35px] flex space-x-[50px]">
          <img className="w-[68px]" src={logo} alt="company logo" />
          <div className="text-white space-x-[40px]">
            <button className=""><Link to="#">Admin</Link></button>
            <button><Link to="/manageuser">Manage</Link></button>
            <button><Link to="#">task</Link></button>
            <button><Link to="#">Report</Link></button>
            <button><Link to="#">Research</Link></button>
          </div>
        </div>
        <div className="flex items-center text-white space-x-[50px]">
          <button className="" onClick={display} ><Link to="/dashboard">DashBoard</Link></button>
          <button><Link to="#">Change Password</Link></button>
          <div className="flex items-center space-x-2">
            <img className="w-[18xp] h-[18px] " src={LogoutIcon} alt="logout-icon" />
            <Link to="/">Logout</Link>
          </div>
        </div>
      </div>
      <div className="w-[1200px] h-[300] absolute top-[65px] left-[35px] bg-white rounded-xl px-[25px] py-[15px] drop-shadow-md flex hidden" id="dashboard">
        <div className="w-[240px] space-y-[15px] mr-[45px]">
          <div className="text-[24px] ">Home</div>
          <div>DashBoard of all</div>
          <div>Monthly Margin-LOB-Receipt-Payments</div>
          <div>Monthly Margin-Entity-Receipt-Payments</div>
          <div>Monthly Margin-LOB-Receipt-Payments Consolidated</div>
        </div>
        <div class="absolute left-[264px] -ml-0.5 w-0.5 h-[257px] bg-[#CBCBCB]"></div>
        <div className="w-[240px] space-y-[15px]">
          <div className="text-[24px]">Personnel</div>
          <div>Users</div>
          <div>Employees</div>
          <div>Contractual Payment</div>
        </div>
        <div class="absolute left-[485px] -ml-0.5 w-0.5 h-[257px] bg-[#CBCBCB]"></div>
        <div className="w-[240px] space-y-[15px]">
          <div className="text-[24px]">Offerrings</div>
          <div>LOB (Line of Business)</div>
          <div>Services</div>
        </div>
        <div class="absolute left-[700px] -ml-0.5 w-0.5 h-[257px] bg-[#CBCBCB]"></div>
        <div className="w-[240px] space-y-[15px]">
          <div className="text-[24px]">Locations</div>
          <div>Country</div>
          <div>State</div>
          <div>City</div>
          <div>Locality</div>
        </div>
        <div class="absolute left-[920px] -ml-0.5 w-0.5 h-[257px] bg-[#CBCBCB]"></div>
        <div className="w-[240px] space-y-[15px]">
          <div className="text-[24px]">Data management</div>
          <div>Delete by ID</div>
        </div>
      </div>
    </>

  )
}

export default Navbar
