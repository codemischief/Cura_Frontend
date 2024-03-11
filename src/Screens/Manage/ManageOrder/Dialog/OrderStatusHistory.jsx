import React from 'react';
import { useState } from 'react';
import AddFeildOrderStatusHistory from './AddFeildOrderStatusHistory';

const OrderStatusHistory = (props) => {
    const handleClose = () => {
        props.setIsStateDialogue(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    };
    const [addField,setAddFeild] = useState([]);
    const handleAdd = () =>{
        let abc=[...addField,[]];
        setAddFeild(abc);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='flex-col justify-center items-center mx-5 mt-10'>
                    <div className="w-full h-full">
                        <div className="w-full h-[40px] bg-[#EBEBEB] flex border-[#CBCBCB] border-b-[1px] ">
                            <div className="w-[7%] h-full p-3 text-[11px]" >
                                Sr.
                            </div>
                            <div className="w-[31%] h-full p-3 text-[11px]" >
                                Order description
                            </div>
                            <div className="w-[31%] h-full p-3 text-[11px]" >
                                Status 
                            </div>
                            <div className="w-[31%] h-full p-3 text-[11px]" >
                                Timestamp
                            </div>
                        </div>
                        <div className="w-full h-[40px] flex border-[#CBCBCB] border-b-[1px]">
                            <div className="w-[7%] h-full p-3 text-[11px]" >
                                1
                            </div>
                            <div className="w-[31%] h-full p-1 text-[11px]" >
                                <input className='w-full h-full bg-[#F5F5F5]' type="text"/>
                            </div>
                            <div className="w-[31%] h-full p-1 text-[11px]" >
                                <input className='w-full h-full bg-[#F5F5F5]' type="text" />
                            </div>
                            <div className="w-[31%] h-full p-1 text-[11px]" >
                                <input className='w-full h-full bg-[#F5F5F5]' type="text" />
                            </div>
                        </div>
                        {addField.map((item,index) => {
                            return (
                                <AddFeildOrderStatusHistory index={index}/>
                            )
                        })}
                        <div className="w-full h-full bg-[#E6ECF5] cursor-pointer p-2 mt-1 flex justify-center items-center">
                            <button className='text-[15px]' onClick={() => handleAdd()}>ADD  +</button>
                        </div>
                    </div>
                </div>
                <div className="my-10 flex justify-center items-center gap-[10px]">
                    <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' type="submit">Save</button>
                    <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleClose} >Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default OrderStatusHistory
