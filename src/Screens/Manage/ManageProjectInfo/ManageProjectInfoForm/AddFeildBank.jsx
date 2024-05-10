import React from 'react'

const AddFeildBank = ({index,formValues,setFormValues}) => {
  const handleChange = (e) => {
    const {name,value} = e.target;
    const arrayClone = [...formValues.project_bank_details];
    arrayClone[index][name] = value;
    setFormValues({...formValues,project_bank_details : arrayClone})
}
  return (
    <div className="w-full h-[40px] flex border-[#CBCBCB] border-b-[1px]">
              <div className="w-[2%] h-full p-3 text-[11px]" >
              {index + 1}
              </div>
              <div className="w-[12%] h-full py-1 px-3 text-[11px] " >
                <input className='w-full h-full bg-[#F5F5F5] pl-1 outline-none' type="text" name="bankname" value={formValues.project_bank_details[index].bankname} onChange={handleChange}/>
              </div>
              <div className="w-[12%] h-full py-1 px-3 text-[11px]" >
                <input className='w-full h-full bg-[#F5F5F5] pl-1 outline-none' type="text" value={formValues.project_bank_details[index].bankbranch} name="bankbranch" onChange={handleChange}/>
              </div>
              <div className="w-[12%] h-full py-1 px-3 text-[11px]" >
                <input className='w-full h-full bg-[#F5F5F5] pl-1 outline-none' type="text" value={formValues.project_bank_details[index].bankcity}  name="bankcity" onChange={handleChange}/>
              </div>
              <div className="w-[14%] h-full py-1 px-3 text-[11px]" >
                <input className='w-full h-full bg-[#F5F5F5] pl-1 outline-none' type="text" value={formValues.project_bank_details[index].bankaccountholdername} name="bankaccountholdername"  onChange={handleChange}/>
              </div>
              <div className="w-[12%] h-full py-1 px-3 text-[11px]" >
                <input className='w-full h-full bg-[#F5F5F5] pl-1 outline-none' type="text" value={formValues.project_bank_details[index].bankaccountno} name="bankaccountno" onChange={handleChange}/>
              </div>
              <div className="w-[12%] h-full py-1 px-3 text-[11px]" >
                <input className='w-full h-full bg-[#F5F5F5] pl-1 outline-none' type="text" value={formValues.project_bank_details[index].bankifsccode} name="bankifsccode"  onChange={handleChange}/>
              </div>
              <div className="w-[12%] h-full py-1 px-3 text-[11px]" >
                <input className='w-full h-full bg-[#F5F5F5] pl-1 outline-none' type="text" value={formValues.project_bank_details[index].banktypeofaccount} name="banktypeofaccount" onChange={handleChange}/>
              </div>
              <div className="w-[12%] h-full py-1 px-3 text-[11px]" >
              <input className='w-full h-full bg-[#F5F5F5] pl-1 outline-none' type="text" value={formValues.project_bank_details[index].bankmicrcode} name="bankmicrcode" onChange={handleChange}/>
              </div>
            </div>
  )
}

export default AddFeildBank
