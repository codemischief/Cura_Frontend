import React from 'react';
import AddFeildOrderStatusHistory from './AddFeildOrderStatusHistory';

const OrderStatusHistory = ({formValues,setFormValues}) => {
     
    // const handleAdd = () => {
    //     setFormValues({...formValues,order_photos: [
    //       ...formValues.order_photos, {
    //         "photolink":"Link1",
    //         "phototakenwhen":"2024-01-01",
    //         "description":"description"
    //     }
    //     ]})
    //   }

    return (
        <div>
            {/* <form onSubmit={handleSubmit}> */}
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
                        {formValues.order_status_change.map((item,index) => {
                            return (
                                <AddFeildOrderStatusHistory index={index} formValues={formValues} setFormValues={setFormValues}/>
                            )
                        })}
                        {/* <div className="w-full h-full bg-[#E6ECF5] cursor-pointer p-2 mt-1 flex justify-center items-center">
                            <button className='text-[15px]' onClick={() => handleAdd()}>ADD  +</button>
                        </div> */}
                    </div>
                </div>
                
            {/* </form> */}
        </div>
    )
}

export default OrderStatusHistory
