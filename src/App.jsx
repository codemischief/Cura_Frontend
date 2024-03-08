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
      path: '/admin/manageuser',
      element: <ManageUser />,
      children: [
        {
          path: '',
          element: <Navbar />
        },
      ],
    },
    {
      path: '/admin/manageemployees',
      element: <ManageEmployees />,
      children: [
        {
          path: '',
          element: <Navbar />
        },
      ],
    },
    {
      path: '/admin/managebuilder',
      element: <ManageBuilder />,
      children: [
        {
          path: '',
          element: <Navbar />
        },
      ],
    },
    {
      path: '/admin/manageprojectinfo',
      element: <ManageProjectInfo />,
      children: [
        {
          path: '',
          element: <Navbar />
        },
      ],
    },
    {
      path: '/admin/manageOrder',
      element: <ManageOrder />,
      children: [
        {
          path: '',
          element: <Navbar />
        },
      ],
    },
    {
      path: '/admin/country',
      element: <Country />,
      children: [
        {
          path: '',
          element: <Navbar />
        },
      ],
    },
    {
      path: '/admin/city',
      element: <City />,
      children: [
        {
          path: '',
          element: <Navbar />
        },
      ],
    },
    {
      path: '/admin/locality',
      element: <Locality />,
      children: [
        {
          path: '',
          element: <Navbar />
        },
      ],
    },
    {
      path: '/admin/state',
      element: <State />,
      children: [
        {
          path: '',
          element: <Navbar />
        },
      ],
    },
    {
      path: '/research/prospect',
      element: <Prospect />,
    },
  ])
  return (
    <div className="app">
      <RouterProvider router={router}/>
    </div>
  )
}

export default App