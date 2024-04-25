import React from 'react'

const AddFeildOrderStatusHistory = ({index,formValues,setFormValues}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    const arrayClone = [...formValues.order_status_change];
    arrayClone[index][name] = e.target.value;
    setFormValues({...formValues,order_status_change : arrayClone})
}
  return (
    <div className="w-full h-[40px] flex border-[#CBCBCB] border-b-[1px] ">
      <div className="w-[7%] h-full p-3 text-[11px]" >
        {index+1}
      </div>
      <div className="w-[31%] h-full p-1 text-[11px]" >
        <input className='w-full h-full bg-[#F5F5F5]' type="text" readOnly/>
      </div>
      <div className="w-[31%] h-full p-1 text-[11px]" >
        <input className='w-full h-full bg-[#F5F5F5]' type="text" readOnly />
      </div>
      <div className="w-[31%] h-full p-1 text-[11px]" >
        <input className='w-full h-full bg-[#F5F5F5]' type="text" readOnly />
      </div>
    </div>
  )
}

export default AddFeildOrderStatusHistory
