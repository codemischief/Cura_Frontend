import React, { useState } from 'react';

const AddClientPortal = ({index,formValues,setFormValues}) => {
    const handleMailChange = (e) => {
        // we update the state variab;
        const arrayClone = [...formValues.client_access];
        arrayClone[index].onlinemailid = e.target.value;
        setFormValues({...formValues,client_access : arrayClone})
    }
    const handlePassChange = (e) => {
        const arrayClone = [...formValues.client_access];
        arrayClone[index].onlinepwd = e.target.value;
        setFormValues({...formValues,client_access : arrayClone})
    }
    const handleOnlineClueChange = (e) => {

        // const newDate = moment(new Date(e.target.value)).format('YYYY-MM-DD');
        const arrayClone = [...formValues.client_access];
        arrayClone[index].onlineclue = e.target.value;
        setFormValues({...formValues,client_access : arrayClone})
    }
    return (
        <div className="w-full h-[40px] flex border-[#CBCBCB] border-b-[1px] ">
            <div className="w-[7%] h-full p-3 text-[11px]" >
                {index + 1}
            </div>
            <div className="w-[31%] h-full p-1 text-[11px]" >
                <input className='w-full h-full bg-[#F5F5F5] pl-3 outline-none' type="text" placeholder=' Paste the hyperlink here' value={formValues.client_access[index].onlinemailid} onChange={handleMailChange}/>
            </div>
            <div className="w-[31%] h-full p-1 text-[11px]" >
                <input className='w-full h-full bg-[#F5F5F5] pl-3 outline-none' type="text" placeholder=' Enter Password here' value={formValues.client_access[index].onlinepwd} onChange={handlePassChange} />
            </div>
            <div className="w-[31%] h-full p-1 text-[11px]" >
                <input className='w-full h-full bg-[#F5F5F5] pl-3 outline-none' value={formValues.client_access[index].onlineclue} type="text" onChange={handleOnlineClueChange}/>
            </div>
        </div>
    )
}

export default AddClientPortal;
