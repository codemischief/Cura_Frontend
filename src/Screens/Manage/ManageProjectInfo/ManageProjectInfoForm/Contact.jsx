import React from 'react'
import { useState } from 'react';
import AddFeildContacts from './AddFeildContacts';
const Contact = () => {
    const [addField, setAddFeild] = useState([]);
    const handleAdd = () => {
    const abc = [...addField, []];
    setAddFeild(abc);
  }
  return (
    <div className='flex-col justify-center items-center mx-5 mt-10'>
          <div className="w-full h-full">
            <div className="w-full h-[40px] bg-[#EBEBEB] flex border-[#CBCBCB] border-b-[1px] ">
              <div className="w-[2%] h-full p-3 text-[11px]" >
                Sr.
              </div>
              <div className="w-[13%] h-full p-3 text-[11px]" >
                Contact Name
              </div>
              <div className="w-[13%] h-full p-3 text-[11px]" >
                Phone 
              </div>
              <div className="w-[13%] h-full p-3 text-[11px]" >
                Email
              </div>
              <div className="w-[13%] h-full p-3 text-[11px]" >
                Role
              </div>
              <div className="w-[16%] h-full p-3 text-[11px]" >
                Effective Date
              </div>
              <div className="w-[17%] h-full p-3 text-[11px]" >
                Tenure End Date
              </div>
              <div className="w-[13%] h-full p-3 text-[11px]" >
                Details
              </div>
            </div>
            <div className="w-full h-[40px] flex border-[#CBCBCB] border-b-[1px]">
              <div className="w-[2%] h-full p-3 text-[11px]" >
                1
              </div>
              <div className="w-[13%] h-full py-1 px-3 text-[11px]" >
                <input className='w-full h-full bg-[#F5F5F5]' type="text" />
              </div>
              <div className="w-[13%] h-full py-1 px-3 text-[11px]" >
                <input className='w-full h-full bg-[#F5F5F5]' type="text" />
              </div>
              <div className="w-[13%] h-full py-1 px-3 text-[11px]" >
                <input className='w-full h-full bg-[#F5F5F5]' type="text" />
              </div>
              <div className="w-[13%] h-full py-1 px-3 text-[11px]" >
                <input className='w-full h-full bg-[#F5F5F5]' type="text" />
              </div>
              <div className="w-[16%] h-full py-1 px-3 text-[11px]" >
                <input className='w-full h-full bg-[#F5F5F5]' type="text" />
              </div>
              <div className="w-[17%] h-full py-1 px-3 text-[11px]" >
                <input className='w-full h-full bg-[#F5F5F5]' type="text" />
              </div>
              <div className="w-[13%] h-full py-1 px-3 text-[11px]" >
                <input className='w-full h-full bg-[#F5F5F5]' type="text" />
              </div>
            </div>
            {addField.map((data, index) => {
              return (
                <AddFeildContacts index={index} />
              )
            })}
            <div className="w-full h-full bg-[#E6ECF5] cursor-pointer p-2 mt-1 flex justify-center items-center">
              <button className='text-[15px]' onClick={() => handleAdd()}>ADD  +</button>
            </div>
          </div>
        </div>
  )
}

export default Contact
