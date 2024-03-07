import React from "react";
import searchIcon from "../assets/searchIcon.png";
import {Outlet} from "react-router-dom";
import { useEffect , useState } from "react";
import Navbar from "../Navabar/Navbar";
const Dashboard = () => {
    const [myOrder, setmyorder] = useState([]);
    const [cashBalance, setcashbalance] = useState([]);
    useEffect(() => {
        fetch("/myOrder")
                .then((res) => res.json())
                .then((data) =>{
                  setmyorder(data)
                  console.log(data);
                })
        fetch("/myCashBalance")
                .then((res) => res.json())
                .then((data) =>{
                    console.log(data)
                setcashbalance(data)
                })
              
      },[]);

//************ mock post request ************** */
    //   const [content, setContent] = useState('')

    //   const addCountryOnClick = (d) =>{
    //     d.preventDefault();
    //     fetch("/addCountry", { 
    //         method :"POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({content})
    //     });
    //   }

    
    return (
        <div className="w-screen h-screen overflow-x-hidden">
            <Navbar/>
            <div className="w-screen  p-5">
               {/* this is the background container */}
               <div className="w-full h-full ">
                  <div className="flex justify-between">
                    <div >
                       <h1 className="text-3xl font-sans">Dashboard</h1>
                    </div>
                    <div className="flex w-[220px] h-[36px] items-center">
                        <input className="h-[36px]" type="text" placeholder="  Search" />
                        <div className="h-[36px] w-[40px] bg-[#004DD7] flex items-center justify-center rounded-r-lg">
                            <img className="h-[26px] " src={searchIcon} alt="search-icon" />
                        </div>
                    </div>
                  </div>

                  <div className="mt-2 bg-white w-full h-96 p-3  ">
                     <div className="w-full h-full">
                        {/* this is the internal div */}
                        <div className="w-full h-[55px] bg-[#DAE7FF] pl-5 pt-3 rounded-md">
                            {/* this will havw the header */}
                            <h1 className="font-sans text-2xl">My Orders</h1>
                        </div>
                        <div className="w-full h-full "> 
                            {/* this will have the items */}
                             <div className=" w-full h-[45px] flex border-gray-400 border-b-[1px]">
                                {/* this will have the index */}
                                 <div className="w-[30%] h-full  p-3" >
                                    <h1>SR No</h1>
                                 </div>
                                 <div className="w-[50%] h-full  p-3">
                                    <h1>Order Status</h1>
                                 </div>
                                 <div className="w-[20%] h-full  p-3">
                                   <h1>Count </h1>
                                 </div>
                             </div>

                             {/* map the items here */}
                             <div className="h-64 overflow-auto">
                             {myOrder.map((item) => {
                                  return <div className=" w-full h-[45px] flex border-gray-400 border-b-[1px]">
                                        
                                    {/* this will have the index */}
                                    <div className="w-[30%] h-full  p-3" >
                                        <h1>{item.sl}</h1>
                                    </div>
                                    <div className="w-[50%] h-full  p-3">
                                        <h1>{item.order_status}</h1>
                                    </div>
                                    <div className="w-[20%] h-full  p-3">
                                    <h1>{item.count} </h1>
                                    </div>
                                    </div>
                             })}
                             </div>
                        </div>
                     </div>
                        
                  </div>
                  
               </div>
               <div className="mt-5 w-full h-full">
                            <div className="w-full h-[55px] bg-[#DAE7FF] pl-5 pt-3 rounded-lg">
                                {/* this will havw the header */}
                                <h1 className="font-sans text-2xl">Cash Balance</h1>
                            </div>
                            {/* map the data here */}
                            <div className="h-64 overflow-auto">
                            {cashBalance.map((item) => {
                                  return <div className=" w-full h-[45px] flex border-gray-400 border-b-[1px]">
                                        
                                    {/* this will have the index */}
                                    <div className="w-[30%] h-full  p-3" >
                                        <h1>{item.Sr}</h1>
                                    </div>
                                    <div className="w-[50%] h-full  p-3">
                                        <h1>{item.Username}</h1>
                                    </div>
                                    <div className="w-[20%] h-full  p-3">
                                    <h1>{item.Balance} </h1>
                                    </div>
                                    </div>
                             })}
                             </div>
                      {/* this will be the cash balances section */}
                        </div>
            </div>
        </div>
    );
};

export default Dashboard;
