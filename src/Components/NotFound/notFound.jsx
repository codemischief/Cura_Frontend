import React from 'react';
import Logo from '../assets/logo.jpg';
import { Link } from 'react-router-dom';

const notFound = () => {
  return (
    <div className="flex gap-[70px] mt-[28px]">
      <img className="w-[152px] h-[64px] ml-[28px] " src={Logo} alt="company-logo" />
      <div className="bg-white w-[800px] h-[530px] rounded-lg flex flex-col justify-center items-center gap-[120px]">
        <div className="text-[40px]">
            404 PAGE NOT FOUND
        </div>
        <div className="flex items-center justify-center w-[140px] h-[40px] text-white bg-[#004DD7] rounded-xl">
        <Link to='/'>Refresh</Link>
        </div>
      </div>
    </div>
  )
}

export default notFound
