import React from 'react';
import logo from '../assets/logo-white1.jpg';
import LogoutIcon from '../assets/logout.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
const Navbar = () => {

  const navigationMenu = [
    {name:"Admin",link:""},
    {name:"Manage",link:"/manageuser"},
    {name:"task",link:"#"},
    {name:"Report",link:"#"},
    {name:"Research",link:"#"},
  ]
 
  const home =[
    "DashBoard of all", "Monthly Margin-LOB-Receipt-Payments","Monthly Margin-Entity-Receipt-Payments","Monthly Margin-LOB-Receipt-Payments Consolidated",
    "Monthly Margin-LOB-Receipt-Payments Consolidated"
  ]
  const Personnel = [ "Users","Employees","Contractual Payment"];
  const Offerrings = ["LOB (Line of Business)","Services"];
  const Locations = ["Country","State","City","Locality"];


  const [isToggledDash, setIsToggled] = useState(false);
  const [isToggledAdmin, setIsToggledAdmin] = useState(false);
  const [isToggledManage, setIsToggledManage] = useState(false);


  const handleChange = (e) => {
    switch(e.target.outerText){
      case 'DashBoard':
        setIsToggled(!isToggledDash);
        setIsToggledManage(false);
        setIsToggledAdmin(false);
        break;
      case 'Admin':
        setIsToggledAdmin(!isToggledAdmin);
        setIsToggled(false);
        setIsToggledManage(false);
        break;
      case 'Manage':
        setIsToggledManage(!isToggledManage);
        setIsToggled(false);
        setIsToggledAdmin(false);
        break;
      default:
        break;

    }
    
   
  };

  return (
    <>
      <div className="bg-[#004DD7] h-[65px] flex items-center space-x-[240px]">
        <div className=" ml-[35px] flex space-x-[50px]">
          <img className="w-[68px]" src={logo} alt="company logo" />
          <div className="text-white space-x-[40px]">
          {navigationMenu.map((item) => (
            <button className="" onClick={handleChange} ><Link to="">{item.name}</Link></button>
          ))}
          </div>
        </div>
        <div className="flex items-center text-white space-x-[50px]">
          <button className="" onClick={handleChange} id="dashboard"><Link to="/dashboard">DashBoard</Link></button>
          <button><Link to="#">Change Password</Link></button>
          <div className="flex items-center space-x-2">
            <img className="w-[18xp] h-[18px] " src={LogoutIcon} alt="logout-icon" />
            <Link to="/">Logout</Link>
          </div>
        </div>
      </div>

    {isToggledDash &&  <div className="w-[1200px] h-[300] absolute top-[65px] left-[35px] bg-white rounded-xl px-[25px] py-[15px] drop-shadow-md flex " id="dashboard">
        <div className="w-[240px] space-y-[15px] mr-[45px]">
          <div className="text-[24px] ">Home</div>
          {home.map((item) => (
            <div className='text-[14px]'>{item}</div>
          ))}
        </div>
        <div class="absolute left-[264px] -ml-0.5 w-[2px] h-[240px] bg-[#CBCBCB]"></div>
        <div className="w-[240px] space-y-[15px]">
          <div className="text-[24px]">Personnel</div>
          {
            Personnel.map((item) => (
              <div className='text-[14px]'>{item}</div>
            ))
          }
        </div>
        <div class="absolute left-[485px] -ml-0.5 w-[2px] h-[240px] bg-[#CBCBCB]"></div>
        <div className="w-[240px] space-y-[15px]">
          <div className="text-[24px]">Offerrings</div>
          {
            Offerrings.map((item) => (
              <div className='text-[14px]'>{item}</div>
            ))
          }
        </div>
        <div class="absolute left-[700px] -ml-0.5 w-[2px] h-[240px] bg-[#CBCBCB]"></div>
        <div className="w-[240px] space-y-[15px]">
          <div className="text-[24px]">Locations</div>
          {
            Locations.map((item) => (
              <div className='text-[14px]'>{item}</div>
            ))
          }
        </div>
        <div class="absolute left-[920px] -ml-0.5 w-[2px] h-[240px] bg-[#CBCBCB]"></div>
        <div className="w-[240px] space-y-[15px]">
          <div className="text-[24px]">Data management</div>
          <div className='text-[14px]'>Delete by ID</div>
        </div>
      </div>}

     {isToggledAdmin && <div className="w-[1200px] h-[300] absolute top-[65px] left-[35px] bg-white rounded-xl px-[25px] py-[15px] drop-shadow-md flex " id="admin">
        <div className="w-[300px] space-y-[15px]">
          <div className="text-[24px]">Personnel</div>
          {
            Personnel.map((item) => (
              <div className='text-[14px]'>{item}</div>
            ))
          }
          <div className="pt-[10px] w-[200px] space-y-[10px]">
            <div className="text-[24px]">Margin report</div>
            <div className='text-[14px]'>Monthly Margin-LOB-Receipt-Payments</div>
            <div className='text-[14px]'>Monthly Margin-Entity-Receipt-Payments</div>
            <div className='text-[14px]'>Monthly Margin-LOB-Receipt-Payments Consolidated</div>
          </div>
        </div>
        <div class="absolute left-[264px] -ml-0.5 w-[2px] h-[350px] bg-[#CBCBCB]"></div>
        <div className="w-[300px] space-y-[15px]">
          <div className="text-[24px]">Offerrings</div>
          {
            Offerrings.map((item) => (
              <div className='text-[14px]'>{item}</div>
            ))
          }
        </div>
        <div class="absolute left-[525px] -ml-0.5 w-[2px] h-[350px] bg-[#CBCBCB]"></div>
        <div className="w-[300px] space-y-[15px]">
          <div className="text-[24px]">Locations</div>
         {
            Locations.map((item) => (
              <div className='text-[14px]'>{item}</div>
            ))
          }
        </div>
        <div class="absolute left-[810px] -ml-0.5 w-[2px] h-[350px] bg-[#CBCBCB]"></div>
        <div className="w-[300px] space-y-[15px]">
          <div className="text-[24px]">Data management</div>
          <div className='text-[14px]'>Delete by ID</div>
        </div>
      </div>}
      {isToggledManage &&  <div className="w-[1200px] h-[300] absolute top-[65px] left-[35px] bg-white rounded-xl px-[25px] py-[15px] drop-shadow-md flex " id="dashboard">
        <div className="w-[240px] space-y-[15px] mr-[45px]">
          <div className="text-[24px] ">Home</div>
          <div className='text-[14px]'>DashBoard of all</div>
          <div className='text-[14px]'>Monthly Margin-LOB-Receipt-Payments</div>
          <div className='text-[14px]'>Monthly Margin-Entity-Receipt-Payments</div>
          <div className='text-[14px]'>Monthly Margin-LOB-Receipt-Payments Consolidated</div>
        </div>
        <div class="absolute left-[264px] -ml-0.5 w-[2px] h-[240px] bg-[#CBCBCB]"></div>
        <div className="w-[240px] space-y-[15px]">
          <div className="text-[24px]">Personnel</div>
          <div className='text-[14px]'>Users</div>
          <div className='text-[14px]'>Employees</div>
          <div className='text-[14px]'>Contractual Payment</div>
        </div>
        <div class="absolute left-[485px] -ml-0.5 w-[2px] h-[240px] bg-[#CBCBCB]"></div>
        <div className="w-[240px] space-y-[15px]">
          <div className="text-[24px]">Offerrings</div>
          <div className='text-[14px]'>LOB (Line of Business)</div>
          <div className='text-[14px]'>Services</div>
        </div>
        <div class="absolute left-[700px] -ml-0.5 w-[2px] h-[240px] bg-[#CBCBCB]"></div>
        <div className="w-[240px] space-y-[15px]">
          <div className="text-[24px]">Locations</div>
          <div className='text-[14px]'>Country</div>
          <div className='text-[14px]'>State</div>
          <div className='text-[14px]'>City</div>
          <div className='text-[14px]'>Locality</div>
        </div>
        <div class="absolute left-[920px] -ml-0.5 w-[2px] h-[240px] bg-[#CBCBCB]"></div>
        <div className="w-[240px] space-y-[15px]">
          <div className="text-[24px]">Data management</div>
          <div className='text-[14px]'>Delete by ID</div>
        </div>
      </div>}
    </>

  )
}

export default Navbar
