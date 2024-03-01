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
import AddNewEmp from './Components/ManageUser/addNewEmp';

import { createBrowserRouter,RouterProvider } from 'react-router-dom';
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
    // {
    //   path: '/addnewuser',
    //   element: <AddNewUser />,
    // },
    {
      path: '/addnewemp',
      element: <AddNewEmp />,
    },
  ])
  return (
    <div className="app">
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
