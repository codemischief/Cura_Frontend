import React from 'react'

const AddFeildContacts = ({index,formValues,setFormValues}) => {
  const handleChange = (e) => {
    const {name,value} = e.target;
    const arrayClone = [...formValues.project_contacts];
    arrayClone[index][name] = value;
    setFormValues({...formValues,project_contacts : arrayClone})
  }
  return (
    <div className="w-full h-[40px] flex border-[#CBCBCB] border-b-[1px]">
              <div className="w-[2%] h-full p-3 text-[11px]" >
                {index+1}
              </div>
              <div className="w-[13%] h-full py-1 px-3 text-[11px]" >
                <input className='w-full h-full bg-[#F5F5F5]' type="text" value={formValues.project_contacts[index].contactname} name='contactname' onChange={handleChange}/>
              </div>
              <div className="w-[13%] h-full py-1 px-3 text-[11px]" >
                <input className='w-full h-full bg-[#F5F5F5]' type="text" name='phone' value={formValues.project_contacts[index].phone} onChange={handleChange}/>
              </div>
              <div className="w-[13%] h-full py-1 px-3 text-[11px]" >
                <input className='w-full h-full bg-[#F5F5F5]' type="text" value={formValues.project_contacts[index].email} name='email' onChange={handleChange}/>
              </div>
              <div className="w-[13%] h-full py-1 px-3 text-[11px]" >
                <input className='w-full h-full bg-[#F5F5F5]' type="text" name='role' value={formValues.project_contacts[index].role} onChange={handleChange}/>
              </div>
              <div className="w-[16%] h-full py-1 px-3 text-[11px]" >
                <input className='w-full h-full bg-[#F5F5F5]' type="date" value={formValues.project_contacts[index].effectivedate} name='effectivedate' onChange={handleChange}/>
              </div>
              <div className="w-[17%] h-full py-1 px-3 text-[11px]" >
                <input className='w-full h-full bg-[#F5F5F5]' type="date" value={formValues.project_contacts[index].tenureenddate} name='tenureenddate' onChange={handleChange}/>
              </div>
              <div className="w-[13%] h-full py-1 px-3 text-[11px]" >
                <input className='w-full h-full bg-[#F5F5F5]' type="text" value={formValues.project_contacts[index].details} name='details' onChange={handleChange}/>
              </div>
            </div>
  )
}

export default AddFeildContacts
