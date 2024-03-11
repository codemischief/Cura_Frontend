import React from 'react';
import Login from './Components/Login/Login';
import Navbar from './Components/Navabar/Navbar';
import Dashboard from "./Components/Dashboard/Dashboard";
import NotFound from './Components/NotFound/notFound';
import Country from './Components/Admin/Country';
import City from './Components/Admin/City';
import Locality from './Components/Admin/Locality';
import State from './Components/Admin/State';
import ManageUser from './Components/ManageUser/ManageUser';
import RequireAuth from './context/RequireAuth';


import AddNewUser from './Components/ManageUser/addNewUser';
import AddNewEmp from './Components/ManageUser/addNewEmp';


import { createBrowserRouter,RouterProvider, Routes ,Route, Outlet} from 'react-router-dom';
import ManageEmployees from './Components/ManageUser/ManageEmployees';
import UserPage from './Components/userPage/Userpage';
const App = () => {

  const router= createBrowserRouter([
    {
      path: '/',
      element: <Login />,
      errorElement: <NotFound />,
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
      children: [
        {
          path: '',
          element: <Navbar />
        },
      ],
    },
    {
      path: '/manageuser',
      element: <ManageUser />,
      children: [
        {
          path: '',
          element: <Navbar />
        },
      ],
    },
    {
      path: '/manageemployees',
      element: <ManageEmployees />,
      children: [
        {
          path: '',
          element: <Navbar />
        },
      ],
    },
    {
      path: '/Country',
      element: <Country />,
      children: [
        {
          path: '',
          element: <Navbar />
        },
      ],
    },
    {
      path: '/City',
      element: <City />,
      children: [
        {
          path: '',
          element: <Navbar />
        },
      ],
    },
    {
      path: '/Locality',
      element: <Locality />,
      children: [
        {
          path: '',
          element: <Navbar />
        },
      ],
    },
    {
      path: '/State',
      element: <State />,
      children: [
        {
          path: '',
          element: <Navbar />
        },
      ],
    },
    {
      path: '/addnewuser',
      element: <AddNewUser />,
    },
    {
      path: '/addnewemp',
      element: <AddNewEmp />,
    },
  ])

  const ROLES = {
    Registered: "3",
    Public : "2",
    Admin:"1"
  }

  
  return (
    <div className="app">
      <Routes>
      <Route  path="/" element={<Outlet/>}>
                {/* public routes */}
              <Route path="" element={<Login />} />
              <Route path="/user" element={<UserPage />} />
         
              {/* private routes */}
              <Route element={<RequireAuth allowedRoles={ROLES.Admin}/>}>
                    <Route path="/dashboard" element={<Dashboard />}/>
                    <Route path="/country" element={<Country />}/>
                    <Route path="/city" element={<City />}/>
                    <Route path="/state" element={<State />}/>
              </Route>

              <Route path="/*" element={<NotFound />}/>
        </Route>
      </Routes>
      {/* <RouterProvider router={router}/> */}
    </div>
  )
}

export default App
