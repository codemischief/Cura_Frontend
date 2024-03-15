import React from 'react';
import logo from '../../assets/logo-white1.jpg';
import LogoutIcon from '../../assets/logout.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { authService } from '../../services/authServices';

const UserNav = () => {

   const [isToggledDash, setIsToggledDash] = useState(false);
   const [isToggledAdmin, setIsToggledAdmin] = useState(false);
   const [isToggledManage, setIsToggledManage] = useState(false);
   const [isToggledResearch, setIsToggledResearch] = useState(false);
   // const [isToggledManage, setIsToggledManage] = useState(false);

const logout = () =>{
   authService.logOut();
}
//    const handleAdminChange = () => {
//       if (isToggledDash) {
//          handleDashChange();
//       }
//       else if (isToggledManage) {
//          handleManageChange();
//       }
//       else if (isToggledResearch) {
//          handleResearchChange();
//       }
//       setIsToggledAdmin((toggle) => {
//          return !toggle;
//       })
//    };

//    const handleDashChange = () => {
//       if (isToggledAdmin) {
//          handleAdminChange();
//       }
//       else if (isToggledManage) {
//          handleManageChange();
//       }
//       else if (isToggledResearch) {
//          handleResearchChange();
//       }
//       setIsToggledDash((toggle) => {
//          return !toggle;
//       })
//    }

//    const handleManageChange = () => {
//       if (isToggledAdmin) {
//          handleAdminChange();
//       }
//       else if (isToggledDash) {
//          handleDashChange();
//       }
//       else if (isToggledResearch) {
//          handleResearchChange();
//       }
//       setIsToggledManage((toggle) => {
//          return !toggle;
//       })
//    }

//    const handleResearchChange = () => {
//       if (isToggledAdmin) {
//          handleAdminChange();
//       }
//       else if (isToggledDash) {
//          handleDashChange();
//       }
//       else if (isToggledManage) {
//          handleManageChange();
//       }
//       setIsToggledResearch((toggle) => {
//          return !toggle;
//       })
//    }
   return (
      <>
         <div className='bg-accent-blue w-full  justify-between	 h-16 flex '>
        
         </div>      
      </>
   )
}

export default UserNav
