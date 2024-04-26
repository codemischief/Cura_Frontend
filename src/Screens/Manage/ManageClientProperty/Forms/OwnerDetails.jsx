import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import AddOwnerDetails from './AddOwnerDetails';
import { useState } from 'react';
import Add from "./../../../../assets/add.png"

const OwnerDetails = ({formValues,setFormValues}) => {
  const handleChange = (e) => {
    const {name,value} = e.target;
     setFormValues({...formValues,client_property_owner : {
         ...formValues.client_property_owner,
         [name] : value
     }})
   }
  return (
    <div className="mb-20">
      <div className="h-auto w-full pt-5 pr-5 flex flex-col items-center ">


        <div className="flex  gap-4 mb-3">
          <div className="font-semibold text-[14px] pt-5 mr-2">Owner 1</div>
          <div className="">
            <div className="text-[13px]">Full Name </div>
            <input className="text-[12px] pl-4 w-[160px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="owner1name" onChange={handleChange} value={formValues.client_property_owner.owner1name}/>
            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]"> PAN NO </div>
            <input className="text-[12px] pl-4 w-[160px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="owner1panno" onChange={handleChange} value={formValues.client_property_owner.owner1panno}/>
            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]"> Aadhar No </div>
            <input className="text-[12px] pl-4 w-[160px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" value={formValues.client_property_owner.owner1aadhaarno} name="owner1aadhaarno" onChange={handleChange}/>
            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          
          <div className="flex items-center text-[14px] pt-3">
            <input type='checkbox' className='mr-3 h-4 w-4' checked={formValues.client_property_owner.owner1pancollected}  onClick={(e) => {
                              
                              const existing = {...formValues};
                              const temp = {...existing.client_property_owner};
                              temp.owner1pancollected = !temp.owner1pancollected
                              existing.client_property_owner = temp;
                              setFormValues(existing) 
            }}/>
            Pan Collected</div>
          <div className="flex items-center text-[14px] pt-3">
          <input type='checkbox' className='mr-3 h-4 w-4' checked={formValues.client_property_owner.owner1aadhaarcollected}  onClick={(e) => {
                              
                              const existing = {...formValues};
                              const temp = {...existing.client_property_owner};
                              temp.owner1aadhaarcollected = !temp.owner1aadhaarcollected
                              existing.client_property_owner = temp;
                              setFormValues(existing) 
            }}/>
            Aadhar Collected</div>
        </div>

        <div className="flex  gap-4 mb-3">
          <div className="font-semibold text-[14px] pt-5 mr-2">Owner 2</div>
          <div className="">
            <div className="text-[13px]">Full Name </div>
            <input className="text-[12px] pl-4 w-[160px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="owner2name" value={formValues.client_property_owner.owner2name} onChange={handleChange}/>
            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]"> PAN NO </div>
            <input className="text-[12px] pl-4 w-[160px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="owner2panno" onChange={handleChange} value={formValues.client_property_owner.owner2panno} />
            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]"> Aadhar No </div>
            <input className="text-[12px] pl-4 w-[160px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" value={formValues.client_property_owner.owner2aadhaarno} name="owner2aadhaarno" onChange={handleChange}/>
            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="flex items-center text-[14px] pt-3">
          <input type='checkbox' className='mr-3 h-4 w-4' checked={formValues.client_property_owner.owner2pancollected}  onClick={(e) => {
                              
                              const existing = {...formValues};
                              const temp = {...existing.client_property_owner};
                              temp.owner2pancollected = !temp.owner2pancollected
                              existing.client_property_owner = temp;
                              setFormValues(existing) 
            }}/>
            
            Pan Collected</div>
          <div className="flex items-center text-[14px] pt-3">
          <input type='checkbox' className='mr-3 h-4 w-4' checked={formValues.client_property_owner.owner2aadhaarcollected}  onClick={(e) => {
                              
                              const existing = {...formValues};
                              const temp = {...existing.client_property_owner};
                              temp.owner2aadhaarcollected = !temp.owner2aadhaarcollected
                              existing.client_property_owner = temp;
                              setFormValues(existing) 
            }}/>
            
            Aadhar Collected</div>
        </div>

        <div className="flex  gap-4 mb-3">
          <div className="font-semibold text-[14px] pt-5 mr-2">Owner 3</div>
          <div className="">
            <div className="text-[13px]">Full Name </div>
            <input className="text-[12px] pl-4 w-[160px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="owner3name" onChange={handleChange} value={formValues.client_property_owner.owner3name}/>
            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]"> PAN NO </div>
            <input className="text-[12px] pl-4 w-[160px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="owner3panno" onChange={handleChange} value={formValues.client_property_owner.owner3panno} />
            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]"> Aadhar No </div>
            <input className="text-[12px] pl-4 w-[160px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" value={formValues.client_property_owner.owner3aadhaarno} name="owner3aadhaarno" onChange={handleChange}/>
            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="flex items-center text-[14px] pt-3">
          <input type='checkbox' className='mr-3 h-4 w-4' checked={formValues.client_property_owner.owner3pancollected}  onClick={(e) => {
                              
                              const existing = {...formValues};
                              const temp = {...existing.client_property_owner};
                              temp.owner3pancollected = !temp.owner3pancollected
                              existing.client_property_owner = temp;
                              setFormValues(existing) 
            }}/>
            
            
            
            Pan Collected</div>
          <div className="flex items-center text-[14px] pt-3">
          <input type='checkbox' className='mr-3 h-4 w-4' checked={formValues.client_property_owner.owner3aadhaarcollected}  onClick={(e) => {
                              
                              const existing = {...formValues};
                              const temp = {...existing.client_property_owner};
                              temp.owner3aadhaarcollected = !temp.owner3aadhaarcollected
                              existing.client_property_owner = temp;
                              setFormValues(existing) 
            }}/>
            
            Aadhar Collected</div>
        </div>
      </div>
      <div className="ml-48">
          <div className="text-[13px]"> Comments </div>
          <input className="text-[12px] pl-4 w-[300px] h-[60px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="comments" value={formValues.client_property_owner.comments} onChange={handleChange}/>
        </div>
    </div>

  )
}

export default OwnerDetails
