import React from 'react'
import Login from './Components/Login/login'
import Navbar from './Components/Navbar'
import Dashboard from './Components/Dashboard'
const App = () => {
  return (
    <div className="app">
      {/* <Login /> */}
      <Navbar />
      <Dashboard />
    </div>
  )
}

export default App
