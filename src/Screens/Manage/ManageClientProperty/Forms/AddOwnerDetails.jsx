import React from 'react'
import Checkbox from '@mui/material/Checkbox';
const AddOwnerDetails = (props) => {
  return (
    <div className="flex gap-10 justify-center mb-3">
        <div className="">
          <div className="text-[14px]">Owner {props.index+2} Name </div>
          <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="fullLegalName" />
          {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
        </div>
        <div className="">
          <div className="">
            <div className="text-[14px]">Owner {props.index+2} PAN NO </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="panno" />
            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="flex items-center"><Checkbox label="Active" />Pan Softcopy Collected</div>
        </div>
        <div className="">
          <div className="">
            <div className="text-[14px]">Owner {props.index+2} Aadhar No </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="employeeName" />
            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="flex items-center"><Checkbox label="Active" />Aadhar Softcopy Collected</div>
        </div>
      </div>
  )
}

export default AddOwnerDetails
