import React from 'react'
const AddFeildPhotos = ({index,formValues,setFormValues}) => {
  const handleChange = (e) => {
        const { name, value } = e.target;
        const arrayClone = [...formValues.order_photos];
        arrayClone[index][name] = e.target.value;
        setFormValues({...formValues,order_photos : arrayClone})
  }
  return (
    <div className="w-full h-[40px] flex border-[#CBCBCB] border-b-[1px] ">
      <div className="w-[7%] h-full p-3 text-[11px]" >
        {index + 1}
      </div>
      <div className="w-[31%] h-full p-1 text-[11px]" >
        <input className='w-full h-full bg-[#F5F5F5]' type="text" placeholder=' Paste the hyperlink here' name='photolink' value={formValues.order_photos[index].photolink} onChange={handleChange} />
      </div>
      <div className="w-[31%] h-full p-1 text-[11px]" >
        <input className='w-full h-full bg-[#F5F5F5]' type="text" placeholder='Enter Description' name="description" value={formValues.order_photos[index].description} onChange={handleChange}/>
      </div>
      <div className="w-[31%] h-full p-1 text-[11px]" >
        <input className='w-full h-full bg-[#F5F5F5]' type="date" name="phototakenwhen" value={formValues.order_photos[index].phototakenwhen} onChange={handleChange} />
      </div>
    </div>
  )
}
export default AddFeildPhotos
