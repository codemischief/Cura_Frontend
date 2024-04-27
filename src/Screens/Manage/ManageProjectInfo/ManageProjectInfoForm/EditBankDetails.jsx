import React from 'react';
import { useState } from 'react';
import AddFeildBank from './AddFeildBank'
const EditBankDetails = ({formValues,setFormValues}) => {
  const [addField, setAddFeild] = useState([]);
  const handleAdd = () => {
    setFormValues({...formValues,project_bank_details : [
      ...formValues.project_bank_details, {
        "bankname": null,
            "bankbranch": null,
            "bankcity": null,
            "bankaccountholdername": null,
            "bankaccountno": null,
            "bankifsccode": null,
            "banktypeofaccount": null,
            "bankmicrcode": null

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
              <div className="w-[12%] h-full p-3 text-[11px]" >
                Name
              </div>
              <div className="w-[12%] h-full p-3 text-[11px]" >
                Branch
              </div>
              <div className="w-[12%] h-full p-3 text-[11px]" >
                City
              </div>
              <div className="w-[14%] h-full p-3 text-[11px]" >
                Acc. Holder Name
              </div>
              <div className="w-[12%] h-full p-3 text-[11px]" >
                Acc. no
              </div>
              <div className="w-[12%] h-full p-3 text-[11px]" >
                Account type
              </div>
              <div className="w-[12%] h-full p-3 text-[11px]" >
                IFSC Code
              </div>
              <div className="w-[12%] h-full p-3 text-[11px]" >
                MICR Code
              </div>
            </div>
            
              
            {formValues.project_bank_details.map((data, index) => {
              return (
                <AddFeildBank index={index} formValues={formValues} setFormValues={setFormValues}/>
              )
            })}
            <div className="w-full h-full bg-[#E6ECF5] cursor-pointer p-2 mt-1 flex justify-center items-center">
              <button className='text-[15px]' onClick={() => handleAdd()}>ADD  +</button>
            </div>
          </div>
        </div>
  )
}

export default EditBankDetails
