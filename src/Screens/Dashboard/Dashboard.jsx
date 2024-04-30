import React from "react";
import searchIcon from "../../assets/searchIcon.png";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navabar/Navbar";
const Dashboard = () => {
    const [myOrder, setmyorder] = useState([]);
    const [cashBalance, setcashbalance] = useState([]);
    useEffect(() => {
        fetch("/myOrder")
            .then((res) => res.json())
            .then((data) => {
                setmyorder(data)

            })
        fetch("/myCashBalance")
            .then((res) => res.json())
            .then((data) => {

                setcashbalance(data)
            })

    }, []);

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
        <div className="w-screen h-screen overflow-x-hidden bg-[#F5F5F5]">
            <Navbar />
            <div className="w-screen p-5">
                {/* this is the background container */}
                <div className="flex justify-between">
                    <div >
                        <h1 className="text-3xl font-sans">Dashboard</h1>
                    </div>
                    <div className="flex w-[230px] h-[36px] items-center">
                        <input className="h-[36px] bg-[#EBEBEB] text-[#787878] pl-2  " type="text" placeholder="  Search" />
                        <div className="h-[36px] w-[42px] bg-[#004DD7] flex items-center justify-center rounded-r-[5px]">
                            <img className="h-[26px] " src={searchIcon} alt="search-icon" />
                        </div>
                    </div>
                </div>

                <div className="mt-2 bg-white w-full h-auto p-3 rounded-[5px] ">
                    <div className="w-full h-full">
                        {/* this is the internal div */}
                        <div className="w-full h-[55px] bg-[#DAE7FF] pl-5 pt-3 rounded-md">
                            {/* this will havw the header */}
                            <h1 className="font-sans text-2xl">My Orders</h1>
                        </div>
                        <div className="w-full h-full ">
                            {/* this will have the items */}
                            <div className=" w-full h-[45px] flex border-gray-400 border-b-[1px] font-semibold">
                                {/* this will have the index */}
                                <div className="w-[30%] h-full  px-3 py-3" >
                                    <h1>Sr .</h1>
                                </div>
                                <div className="w-[50%] h-full px-3 py-3">
                                    <h1>Order Status</h1>
                                </div>
                                <div className="w-[20%] h-full  px-3 py-3">
                                    <h1>Count </h1>
                                </div>
                            </div>

                            {/* map the items here */}
                            <div className="h-44 overflow-auto">
                                {myOrder.map((item) => {
                                    return <div className=" w-full h-[35px] flex border-gray-400 border-b-[1px] text-[14px]">

                                        {/* this will have the index */}
                                        <div className="w-[30.4%] h-full  px-3 py-2" >
                                            <h1>{item.sl}</h1>
                                        </div>
                                        <div className="w-[50.7%] h-full  px-3 py-2">
                                            <h1>{item.order_status}</h1>
                                        </div>
                                        <div className="w-[15%] h-full  px-3 py-2">
                                            <h1>{item.count} </h1>
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-2 bg-white w-full h-auto p-3 rounded-[5px] ">
                    <div className="w-full h-full">
                        {/* this is the internal div */}
                        <div className="w-full h-[55px] bg-[#DAE7FF] pl-5 pt-3 rounded-md">
                            {/* this will havw the header */}
                            <h1 className="font-sans text-2xl">My Cash balance</h1>
                        </div>
                        <div className="w-full h-full ">
                            {/* this will have the items */}
                            <div className=" w-full h-[45px] flex border-gray-400 border-b-[1px] font-semibold">
                                {/* this will have the index */}
                                <div className="w-[30%] h-full  px-3 py-3" >
                                    <h1>Sr .</h1>
                                </div>
                                <div className="w-[50%] h-full px-3 py-3">
                                    <h1>Username</h1>
                                </div>
                                <div className="w-[20%] h-full  px-3 py-3">
                                    <h1>Balance </h1>
                                </div>
                            </div>

                            {/* map the items here */}
                            <div className="h-20 overflow-auto">
                                {cashBalance.map((item) => {
                                    return <div className=" w-full h-[35px] flex border-gray-400 border-b-[1px] text-[14px]">

                                        {/* this will have the index */}
                                        <div className="w-[30.4%] h-full  px-3 py-2" >
                                            <h1>{item.Sr}</h1>
                                        </div>
                                        <div className="w-[50.7%] h-full  px-3 py-2">
                                            <h1>{item.Username}</h1>
                                        </div>
                                        <div className="w-[15%] h-full  px-3 py-2">
                                            <h1>{item.Balance} </h1>
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-2 bg-white w-full h-auto p-3 rounded-[5px] ">
                    <div className="w-full h-full">
                        {/* this is the internal div */}
                        <div className="w-full h-[55px] bg-[#DAE7FF] pl-5 pt-3 rounded-md">
                            {/* this will havw the header */}
                            <h1 className="font-sans text-2xl">My Task</h1>
                        </div>
                        <div className="w-full h-full ">
                            {/* this will have the items */}
                            <div className=" w-full h-[45px] flex border-gray-400 border-b-[1px] font-semibold">
                                {/* this will have the index */}
                                <div className="w-[30%] h-full  px-3 py-3" >
                                    <h1>Sr .</h1>
                                </div>
                                <div className="w-[50%] h-full px-3 py-3">
                                    <h1>My Task</h1>
                                </div>
                                <div className="w-[20%] h-full  px-3 py-3">
                                    <h1>Count </h1>
                                </div>
                            </div>

                            {/* map the items here */}
                            <div className="h-10 overflow-auto">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
