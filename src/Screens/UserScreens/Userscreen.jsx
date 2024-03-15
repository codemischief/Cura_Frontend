import UserNav from "../../Components/Navabar/Navbar";
import React from "react";
import searchIcon from "../../assets/searchIcon.png";
import logo from '../../assets/logo-white1.jpg';
import LogoutIcon from '../../assets/logout.png';
import { Link } from 'react-router-dom';


const Userscreen = () => { 


      const logout = () =>{
        authService.logOut();
     }
    return (
        <div className="w-screen h-screen overflow-x-hidden">
            {/* ****************** user nav************ */}
          
            <div className='bg-accent-blue w-full  justify-between	 h-16 flex '>
            {/* this div is off the navbar */}
            {/* we have three parts here */}
            <div className='h-full w-16 flex justify-center items-center'>
               <img src={logo} className='h-1/3 ml-16' />
            </div>
            <div className='flex text-stone-50	space-x-9 items-center'>
               {/* this will have the center bar */}
               <div className={`w-24 h-7 flex items-center justify-center  rounded-sm  font-thin `}>
                  <button >
                     <p className=' font-sans text-md' >User</p>
                  </button>
               </div>
               <div className={`w-24 h-7 flex items-center justify-center  rounded-sm  font-thin `}>
                  <button >
                     <p className='font-thin font-sans text-md'>View</p>
                  </button>
               </div>
            </div>
            <div className='flex  text-stone-50	space-x-5 items-center mr-4'>
               {/* this will have the right content */}
                             <p className='font-thin font-sans text-md'>Change Password</p>
               <div className='flex just items-center 'onClick={() => logout()}>
                  <img src={LogoutIcon} className='h-4 m-1' />
                  <p className='font-thin font-sans text-md'><Link to="/" >Logout</Link> </p>
               </div>
            </div>
         </div>
            {/* **********************user nav end************** */}



            <div className="w-screen  p-5">
               {/* this is the background container */}
               <div className="w-full h-full ">
                  <div className="flex justify-between">
                    <div >
                       <h1 className="text-3xl font-sans">User DETAILS</h1>
                    </div>
                    <div className="flex w-[220px] h-[36px] items-center">
                        <input className="h-[36px]" type="text" placeholder="  Search" />
                        <div className="h-[36px] w-[40px] bg-[#004DD7] flex items-center justify-center rounded-r-lg">
                            <img className="h-[26px] " src={searchIcon} alt="search-icon" />
                        </div>
                    </div>
                  </div>

                
                  
               </div>
               
            </div>
            <div className="mt-2 bg-white w-full h-96 p-3  ">
                     <div className="w-full h-full">
                        {/* this is the internal div */}
                        <div className="w-full h-[55px] bg-[#DAE7FF] pl-5 pt-3 rounded-md">
                            {/* this will havw the header */}
                            <h1 className="font-sans text-2xl">User Details</h1>
                        </div>
                        <div className="w-full h-full "> 
                            {/* this will have the items */}
                             <div className=" w-full h-[45px] flex border-gray-400 border-b-[1px]">
                                {/* this will have the index */}
                                 <div className="w-[30%] h-full  p-3" >
                                    <h1>SR No</h1>
                                 </div>
                                 <div className="w-[50%] h-full  p-3">
                                    <h1>UserName</h1>
                                 </div>
                                 <div className="w-[20%] h-full  p-3">
                                   <h1>Projects </h1>
                                 </div>
                             </div>
                             <div className="h-64 overflow-auto">
                             <div className=" w-full h-[45px] flex border-gray-400 border-b-[1px]">
                             <div className="w-[30%] h-full  p-3" >
                                        <h1>1</h1>
                                    </div>
                                    <div className="w-[50%] h-full  p-3" >
                                        <h1>aryan_ashish</h1>
                                    </div>
                                    <div className="w-[20%] h-full  p-3" >
                                        <h1>cura</h1>
                                    </div>
                             </div>
                             <div className=" w-full h-[45px] flex border-gray-400 border-b-[1px]">
                             
                            </div>
                            <div className=" w-full h-[45px] flex border-gray-400 border-b-[1px]">
                            
                            </div>

                             </div>

                             {/* map the items here */}
                             
                        </div>
                     </div>
                        
                  </div>
        </div>
    );



}

export default Userscreen;