import React from "react";
import searchIcon from "./assets/searchIcon.png";

const Dashboard = () => {
    return (
        <div className=" ml-[35px]">
            <div className="w-[1200px] h-[300] absolute top-[65px] left-[35px] bg-white rounded-xl px-[25px] py-[15px] drop-shadow-md flex hidden">
                <div className="w-[240px] space-y-[15px] mr-[45px]">
                    <div className="text-[24px] ">Home</div>
                    <div>DashBoard of all</div>
                    <div>Monthly Margin-LOB-Receipt-Payments</div>
                    <div>Monthly Margin-Entity-Receipt-Payments</div>
                    <div>Monthly Margin-LOB-Receipt-Payments Consolidated</div>
                </div>
                <div class="absolute left-[264px] -ml-0.5 w-0.5 h-[257px] bg-[#CBCBCB]"></div>
                <div className="w-[240px] space-y-[15px]">
                    <div className="text-[24px]">Personnel</div>
                    <div>Users</div>
                    <div>Employees</div>
                    <div>Contractual Payment</div>
                </div>
                <div class="absolute left-[485px] -ml-0.5 w-0.5 h-[257px] bg-[#CBCBCB]"></div>
                <div className="w-[240px] space-y-[15px]">
                    <div className="text-[24px]">Offerrings</div>
                    <div>LOB (Line of Business)</div>
                    <div>Services</div>
                </div>
                <div class="absolute left-[700px] -ml-0.5 w-0.5 h-[257px] bg-[#CBCBCB]"></div>
                <div className="w-[240px] space-y-[15px]">
                    <div className="text-[24px]">Locations</div>
                    <div>Country</div>
                    <div>State</div>
                    <div>City</div>
                    <div>Locality</div>
                </div>
                <div class="absolute left-[920px] -ml-0.5 w-0.5 h-[257px] bg-[#CBCBCB]"></div>
                <div className="w-[240px] space-y-[15px]">
                    <div className="text-[24px]">Data management</div>
                    <div>Delete by ID</div>
                </div>
            </div>
            <div className="mt-[27px]">
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
                        <tbody>
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
                        </tbody>
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
                        <tbody>
                            <tr>
                                <td>01</td>
                                <td>Harshada</td>
                                <td>RS 72,719.00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
