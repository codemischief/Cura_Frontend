import React from 'react';
import Login from './Screens/Login/Login'
import Navbar from './Components/Navabar/Navbar';
import Dashboard from "./Screens/Dashboard/Dashboard";
import NotFound from './Screens/NotFound/notFound';
import Country from './Screens/Admin/Country';
import City from './Screens/Admin/City';
import Locality from './Screens/Admin/Locality';
import State from './Screens/Admin/State';
import ManageUser from './Screens/Manage/ManageUser/ManageUser';
import ManageProjectInfo from './Screens/Manage/ManageProjectInfo/ManageProjectInfo';
import ManageOrder from './Screens/Manage/ManageOrder/ManageOrder';
import ManageEmployees from './Screens/Manage/ManageEmployee/ManageEmployees';
import ManageBuilder from './Screens/Manage/ManageBuilder/ManageBuilder';
import Prospect from './Screens/Research/Prospect/Prospect';
import Owner from './Screens/Research/Owner/Owner';
import Educational from './Screens/Research/Educational/Educational'
import Architect from './Screens/Research/Architect/Architect'
import RequireAuth from './context/RequireAuth';


import { createBrowserRouter,RouterProvider,Route, Routes, Outlet } from 'react-router-dom';
import Userscreen from './Screens/UserScreens/Userscreen';
import LOB from './Screens/Admin/LOB';
import Service from './Screens/Admin/Service';

const App = () => {
  const ROLES = {
    Registered: "3",
    Public : "2",
    Admin:"1"
  }

 
  return (
    <div className="app">
     
      {/* <RouterProvider router={router}/> */}


      <Routes>
      <Route  path="/" element={<Outlet/>}>
                
              <Route path="" element={<Login />} />
              <Route path="/user" element={<Userscreen />} />
           
         
           
               <Route element={<RequireAuth/>}> 
                    <Route path="/dashboard" element={<Dashboard />}/>
                    <Route path="/admin/manageuser" element={<ManageUser />}/>
                    <Route path="/admin/manageemployees" element={<ManageEmployees />}/>
                    <Route path="/admin/managebuilder" element={<ManageBuilder />}/>
                    <Route path="/admin/manageprojectinfo" element={<ManageProjectInfo />}/>
                    <Route path="/admin/manageOrder" element={<ManageOrder />}/>
                    <Route path="/admin/manageuser" element={<ManageUser />}/>
                    <Route path="/admin/country" element={<Country />}/>
                    <Route path="/admin/state" element={<State />}/>
                    <Route path="/admin/city" element={<City />}/>
                    <Route path="/admin/locality" element={<Locality />}/>
                    <Route path="/admin/LOB" element={<LOB />}/>
                    <Route path="/admin/service" element={<Service />}/>
                    <Route path="/research/prospect" element={<Prospect />}/>
                    <Route path="/research/owner" element={<Owner />}/>
                    <Route path="/research/educational" element={<Educational />}/>
                    <Route path="/research/architect" element={<Architect />}/>
               </Route> 

              <Route path="/*" element={<NotFound />}/>
        </Route>
      </Routes>

      
    </div>
  )
}

export default App
