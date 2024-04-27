import React from 'react'

const AddFeildPhotos = ({index,formValues,setFormValues}) => {
  const handleChange = (e) => {
    const {name,value} = e.target;
    const arrayClone = [...formValues.project_photos];
    arrayClone[index][name] = value;
    setFormValues({...formValues,project_photos : arrayClone})
}
  return (
    <div className="w-full h-[40px] flex border-[#CBCBCB] border-b-[1px] ">
      <div className="w-[7%] h-full p-3 text-[11px]" >
        {index + 1}
      </div>
      <div className="w-[31%] h-full p-1 text-[11px]" >
        <input className='w-full h-full bg-[#F5F5F5]' type="text" placeholder=' Paste the hyperlink here' value={formValues.project_photos[index].photo_link} name="photo_link" onChange={handleChange}/>
      </div>
      <div className="w-[31%] h-full p-1 text-[11px]" >
        <input className='w-full h-full bg-[#F5F5F5]' type="text"  value={formValues.project_photos[index].description} name='description' onChange={handleChange}/>
      </div>
      <div className="w-[31%] h-full p-1 text-[11px]" >
        <input className='w-full h-full bg-[#F5F5F5]' type="date" value={formValues.project_photos[index].date_taken} name='date_taken' onChange={handleChange}/>
      </div>
    </div>
  )
}

export default AddFeildPhotos
