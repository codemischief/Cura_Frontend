import React from "react";
import searchIcon from "../../assets/searchIcon.png";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

import { APIService } from "../../services/API";

import useAuth from "../../context/JwtContext";
const Dashboard = () => {
  const {user} = useAuth()
  const [pageLoading,setPageLoading] = useState(false)
  const [searchText,setSearchText] = useState("")
  const [myOrder, setmyorder] = useState([]);
  const [cashBalance, setcashbalance] = useState([]);
  const fetchDashboardData = async (id) => {
    setPageLoading(true)
    const data = {"user_id" : user.id}
    const response = await APIService.dashboardData(data)
    const res = await response.json()
    console.log(res)
    setmyorder(res.data)
    setPageLoading(false)
  }
  const handleSearch = async () => {
    setPageLoading(true)
    const data = {"user_id" : user.id, "search_key" : searchText}
    const response = await APIService.dashboardData(data)
    const res = await response.json()
    console.log(res)
    setmyorder(res.data)
    setPageLoading(false)
  }
  useEffect(() => {
     
     console.log("render")
     fetchDashboardData()
  },[])
  return (
    <div className="w-full flex flex-col h-[calc(100vh-6.2rem)] overflow-x-hidden bg-[#F5F5F5]">
       <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={pageLoading}
                onClick={() => {}}
            >

               <CircularProgress color="inherit"/>

        </Backdrop>
      <div className="flex flex-col gap-2 h-full w-full px-[2.25rem] py-[2.5rem]">
        {/* this is the background container */}
        <div className="flex justify-between">
          <div>
            <h1 className="text-3xl font-sans">Dashboard</h1>
          </div>
            <form onSubmit={(e) => {
              e.preventDefault()
              handleSearch()
            }}>
          <div className="flex w-[230px] h-[36px] items-center">
            <input
              className="h-[36px] bg-[#EBEBEB] text-[#787878] pl-2  "
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              
              />
            <div className="h-[36px] w-[42px] bg-[#004DD7] flex items-center justify-center rounded-r-[5px]">
              <button type="submit"><img className="h-[26px] " src={searchIcon} alt="search-icon" /></button>
            </div>
          </div>
            </form>
        </div>

        <div className="bg-white w-full h-full p-3 rounded-[5px] ">
          <div className="w-full h-full">
            {/* this is the internal div */}
            <div className="w-full h-[55px] bg-[#DAE7FF] pl-5 pt-3 rounded-md">
              {/* this will havw the header */}
              <h1 className="font-sans text-2xl">My Orders</h1>
            </div>
            <div className="w-full">
              {/* this will have the items */}
              <div className=" w-full h-[45px] flex border-gray-400 border-b-[1px] font-semibold">
                {/* this will have the index */}
                <div className="w-[30%] h-full  px-3 py-3">
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
                {myOrder?.map((item,index) => {
                  return (
                    <div className=" w-full h-[35px] flex border-gray-400 border-b-[1px] text-[14px]">
                      {/* this will have the index */}
                      <div className="w-[30.4%] h-full  px-3 py-2">
                        <h1>{index + 1}</h1>
                      </div>
                      <div className="w-[50.7%] h-full  px-3 py-2">
                        <h1>{item.order_status}</h1>
                      </div>
                      <div className="w-[15%] h-full  px-3 py-2">
                        <h1>{item.count_orders} </h1>
                      </div>
                    </div>
                    
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  );
};

export default Dashboard;
