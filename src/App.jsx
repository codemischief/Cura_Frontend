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


import { createBrowserRouter,RouterProvider, Routes ,Route} from 'react-router-dom';
import ManageEmployees from './Components/ManageUser/ManageEmployees';
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

  const User = {
    Registered: "registered",
    Public : "public",
    Admin:"admin"
  }

  const Current_User = User.Registered;
  return (
    <div className="app">
      <Routes>
        {/* public routes */}
      <Route path="" element={<Login />} />

      {/* private routes */}
      <Route element={<RequireAuth/>}>
      <Route path="/dashboard" element={<Dashboard />}/>
      </Route>

      <Route path="/*" element={<NotFound />}/>
      </Routes>
      {/* <RouterProvider router={router}/> */}
    </div>
  )
}

export default App
