import React from "react";
import searchIcon from "../assets/searchIcon.png";
import {Outlet} from "react-router-dom";
import { useEffect , useState } from "react";

const Dashboard = () => {
    const [myOrder, setmyorder] = useState([]);
    const [cashBalance, setcashbalance] = useState([]);
    
    
    
    
    useEffect(() => {
        fetch("/myOrder")
                .then((res) => res.json())
                .then((data) =>{
                  setmyorder(data)
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
        <div>
            <div >
                <Outlet />
            </div>
            <div className="ml-[35px] mt-[27px]">
                
            {/* //************ mock post request ************** */ }
            {/* <input value={content} onChange={(c) => {setContent(c.target.value)}}/>
                <button onClick={addCountryOnClick}>ADD</button> */}
                <div className="flex space-x-[820px]">
                    <div className="text-[28px]">Dashboard</div>
                    <div className="flex w-[304px] h-[36px] items-center">
                        <input className="h-[36px]" type="text" placeholder="  Search" />
                        <div className="h-[36px] w-[40px] bg-[#004DD7] flex items-center justify-center rounded-r-lg">
                            <img className="h-[26px] " src={searchIcon} alt="search-icon" />
                        </div>
                    </div>
                </div>
                <div className="mt-[15px] px-[27px] py-[15px] h-[240px] w-[1200px] bg-white rounded-md">
                    <div className=" w-full h-[36px] bg-[#F0F6FF] rounded-lg flex items-center pl-[30px] text-[18px]">
                        My Order
                    </div>
                    <table className="ml-[15px] mt-[7px] w-[1100px] h-[170px] ">
                        <thead className="text-left">
                            <tr>
                                <th>Sr.</th>
                                <th>Order Status</th>
                                <th>Count</th>
                            </tr>
                        </thead> 
                        {myOrder.map((item) => (
                               <tbody>
                                <tr>
                                    <td>{item.sl}</td>
                                    <td>{item.order_status}</td>
                                    <td>{item.count}</td>
                                </tr>
                                </tbody> 
                             ))}
                        {/* <tbody>
                            <tr>
                                <td>01</td>
                                <td>billed</td>
                                <td>37</td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>02</td>
                                <td>Closed</td>
                                <td>2898</td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>03</td>
                                <td>Cancelled</td>
                                <td>28</td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>04</td>
                                <td>In progress</td>
                                <td>182</td>
                            </tr>
                        </tbody> */}
                    </table>
                </div>
                <div className="mt-[15px] px-[27px] py-[15px] h-[130px] w-[1200px] bg-white rounded-md">
                    <div className=" w-full h-[36px] bg-[#F0F6FF] rounded-lg flex items-center pl-[30px] text-[18px]">
                        My Cash Balance
                    </div>
                    <table className="ml-[15px] mt-[7px] w-[1500px] h-[60px] ">
                        <thead className="text-left">
                            <tr>
                                <th>Sr.</th>
                                <th>Username</th>
                                <th>Balance</th>
                            </tr>
                        </thead>
                        {cashBalance.map((item) => (
                               <tbody>
                                <tr>
                                    <td>{item.Sr}</td>
                                    <td>{item.Username}</td>
                                    <td>{item.Balance}</td>
                                </tr>
                                </tbody> 
                             ))}
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
