import React from 'react'
import logo from './assets/logo-white1.jpg'
import LogoutIcon from './assets/logout.png'

const Navbar = () => {
  return (
    <div className="bg-[#004DD7] h-[65px] flex items-center space-x-[240px]">
      <div className=" ml-[35px] flex space-x-[50px]">
        <img className="w-[68px]" src={logo} alt="company logo" />
        <div className="text-white space-x-[40px]">
          <a href="#">Admin</a>
          <a href="#">Manage</a>
          <a href="#">task</a>
          <a href="#">Report</a>
          <a href="#">Research</a>
        </div>
      </div>
      <div className="flex items-center text-white space-x-[50px]">
        <a href="#">DashBoard</a>
        <a href="#">Change Password</a>
        <div className="flex items-center space-x-2">
          <img className="w-[18xp] h-[18px] " src={LogoutIcon} alt="logout-icon" />
          <a href="#">Logout</a>
        </div>
      </div>
    </div>
  )
}

export default Navbar
