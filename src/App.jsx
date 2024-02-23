import React from 'react'
import Login from './Components/Login/login'
import Navbar from './Components/Navbar'
import Dashboard from './Components/Dashboard'
import NotFound from "./Components/notFound";
import ManageUser from './Components/ManageUser';
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
  ])
  return (
    <div className="app">
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
