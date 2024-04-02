import React, { useState } from 'react';

const AddClientPortal = (props) => {

    return (
        <div className="w-full h-[40px] flex border-[#CBCBCB] border-b-[1px] ">
            <div className="w-[7%] h-full p-3 text-[11px]" >
                {props.index + 2}
            </div>
            <div className="w-[31%] h-full p-1 text-[11px]" >
                <input className='w-full h-full bg-[#F5F5F5]' type="text" placeholder=' Paste the hyperlink here' />
            </div>
            <div className="w-[31%] h-full p-1 text-[11px]" >
                <input className='w-full h-full bg-[#F5F5F5]' type="text" />
            </div>
            <div className="w-[31%] h-full p-1 text-[11px]" >
                <input className='w-full h-full bg-[#F5F5F5]' type="date" />
            </div>
        </div>
    )
}

export default AddClientPortal;
