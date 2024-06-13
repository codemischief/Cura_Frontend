import React, { useState } from 'react';
import AddFeildOrderStatusHistory from './AddFeildOrderStatusHistory';
import { useEffect } from 'react';
import { APIService } from '../../../../services/API';
import useAuth from '../../../../context/JwtContext';
const EditOrderStatusHistory = ({formValues,setFormValues,orderId}) => {
    const {user} = useAuth()
    const [orderStatusData,setOrderStatusData] = useState([]);
    const fetchOrderStatusData = async () => {
         const data = {"id":orderId}
         const response = await APIService.getOrderStatusHistory({...data,user_id : user.id});
         const res = await response.json();
         setOrderStatusData(res.data);
         console.log(res)
         setOrderStatusData(res.data)
    }
    // const handleAdd = () => {
    //     setFormValues({...formValues,order_photos: [
    //       ...formValues.order_photos, {
    //         "photolink":"Link1",
    //         "phototakenwhen":"2024-01-01",
    //         "description":"description"
    //     }
    //     ]})
    //   }
      useEffect(() => {
         fetchOrderStatusData()
      },[])
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
                        {orderStatusData.map((item,index) => {
                            return (
                                <AddFeildOrderStatusHistory index={index} item={item}/>
                            )
                        })}
                    
                    </div>
                </div>
                
            {/* </form> */}
        </div>
    )
}

export default EditOrderStatusHistory
