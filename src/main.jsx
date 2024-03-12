import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider.jsx'


async function deferRender(){
  const {worker} = await import('./mocks/browser.js');
  return worker.start();
}

deferRender().then( () =>{
  ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
    //   <App />
    // </React.StrictMode>,

 <React.StrictMode>
    <BrowserRouter>
  
    <AuthProvider>
    <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
    </AuthProvider>
    </BrowserRouter>

  </React.StrictMode>, 

  )
}

)

