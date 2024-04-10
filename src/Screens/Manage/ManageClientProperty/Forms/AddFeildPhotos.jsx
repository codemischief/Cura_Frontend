import React from 'react'

const AddFeildPhotos = ({index,formValues,setFormValues}) => {
  const handlePhotoLinkChange = () => {
        const arrayClone = [...formValues.client_property_photos];
        arrayClone[index].photolink = e.target.value;
        setFormValues({...formValues,client_property_photos : arrayClone})
  }
  const handleDescriptionChange = () => {
    const arrayClone = [...formValues.client_property_photos];
    arrayClone[index].description = e.target.value;
    setFormValues({...formValues,client_property_photos : arrayClone})
  }
  const handleTakenWhenChange = () => {
    const arrayClone = [...formValues.client_property_photos];
    arrayClone[index].phototakenwhen = e.target.value;
    setFormValues({...formValues,client_property_photos : arrayClone})
  }
  return (
    <div className="w-full h-[40px] flex border-[#CBCBCB] border-b-[1px] ">
      <div className="w-[7%] h-full p-3 text-[11px]" >
        {index + 1}
      </div>
      <div className="w-[31%] h-full p-1 text-[11px]" >
        <input className='w-full h-full bg-[#F5F5F5]' type="text" placeholder=' Paste the hyperlink here' value={formValues.client_property_photos.photolink} onChange={handlePhotoLinkChange}/>
      </div>
      <div className="w-[31%] h-full p-1 text-[11px]" >
        <input className='w-full h-full bg-[#F5F5F5]' type="text" onChange={handleDescriptionChange} value={formValues.client_property_photos.description}/>
      </div>
      <div className="w-[31%] h-full p-1 text-[11px]" >
        <input className='w-full h-full bg-[#F5F5F5]' type="date" value={formValues.client_property_photos.phototakenwhen} onChange={handleTakenWhenChange} />
      </div>
    </div>
  )
}

export default AddFeildPhotos
