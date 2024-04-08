import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import AddOwnerDetails from './AddOwnerDetails';
import { useState } from 'react';
import Add from "./../../../../assets/add.png"

const OwnerDetails = () => {
  const [addField, setAddFeild] = useState([]);
  const handleAdd = () => {
    const abc = [...addField, []];
    setAddFeild(abc);
  }
  return (
    <div className="h-[400px] w-full p-5 flex flex-col items-center overflow-auto">
      <div className="flex gap-10 justify-center mb-3">
        <div className="">
          <div className="text-[13px]">Owner 1 Name </div>
          <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="fullLegalName" />
          {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
        </div>
        <div className="">
          <div className="">
            <div className="text-[13px]">Owner 1 PAN NO </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="panno" />
            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="flex items-center text-[13px] font-semibold"><Checkbox label="Active" />Pan Softcopy Collected</div>
        </div>
        <div className="">
          <div className="">
            <div className="text-[13px]">Owner 1 Aadhar No </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="employeeName" />
            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="flex items-center text-[13px] font-semibold"><Checkbox label="Active"/>Aadhar Softcopy Collected</div>
        </div>
      </div>
      <div className="flex gap-10 justify-center mb-3">
        <div className="">
          <div className="text-[13px]">Owner 2 Name </div>
          <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="fullLegalName" />
          {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
        </div>
        <div className="">
          <div className="">
            <div className="text-[13px]">Owner 2 PAN NO </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="panno" />
            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="flex items-center text-[13px] font-semibold"><Checkbox label="Active" />Pan Softcopy Collected</div>
        </div>
        <div className="">
          <div className="">
            <div className="text-[13px]">Owner 2 Aadhar No </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="employeeName" />
            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="flex items-center text-[13px] font-semibold"><Checkbox label="Active" />Aadhar Softcopy Collected</div>
        </div>
      </div>
      <div className="flex gap-10 justify-center mb-3">
        <div className="">
          <div className="text-[13px]">Owner 3 Name </div>
          <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="fullLegalName" />
          {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
        </div>
        <div className="">
          <div className="">
            <div className="text-[13px]">Owner 3 PAN NO </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="panno" />
            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="flex items-center text-[13px] font-semibold"><Checkbox label="Active" />Pan Softcopy Collected</div>
        </div>
        <div className="">
          <div className="">
            <div className="text-[13px]">Owner 3 Aadhar No </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="employeeName" />
            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="flex items-center text-[13px] font-semibold"><Checkbox label="Active" />Aadhar Softcopy Collected</div>
        </div>
      </div>
      {addField.map((data, index) => {
          return (
            <AddOwnerDetails index={index} />
          )
      })}
      <button className='w-[240px] p-1 bg-[#282828] text-white rounded-md  flex justify-center items-center gap-3 mt-3' onClick={handleAdd} >
        <div className="text-[14px]">Add Owner</div>
        <img src={Add} alt="add" className='w-4 h-4'/>
        </button>
    </div>
  )
}

export default OwnerDetails
