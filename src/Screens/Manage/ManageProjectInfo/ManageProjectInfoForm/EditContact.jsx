import React from 'react'
import { useState } from 'react';
import AddFeildContacts from './AddFeildContacts';
const EditContact = ({formValues,setFormValues}) => {
    const [addField, setAddFeild] = useState([]);
    const handleAdd = () => {
      setFormValues({...formValues,project_contacts : [
        ...formValues.project_contacts, {
          "contactname": null,
            "phone": null,
            "email": null,
            "role": null,
            "effectivedate": null,
            "tenureenddate": null,
            "details": null
      }
      ]})
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
            
            {formValues.project_contacts.map((data, index) => {
              return (
                <AddFeildContacts index={index} formValues={formValues} setFormValues={setFormValues}/>
              )
            })}
            <div className="w-full h-full bg-[#E6ECF5] cursor-pointer p-2 mt-1 flex justify-center items-center">
              <button className='text-[15px]' onClick={() => handleAdd()}>ADD  +</button>
            </div>
          </div>
        </div>
  )
}

export default EditContact
