import React from 'react';
import Cross from "../assets/cross.png";
import { Link } from 'react-router-dom';

const addNewEmp = () => {
  return (
    <div className='flex justify-center mt-[20px]'>
            <div className="w-[1000px] h-[540px] bg-white rounded-lg">
                <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center">
                    <div className="mr-[410px] ml-[410px]">
                        <div className="text-[16px]">Add New Employee</div>
                    </div>
                    <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                        <Link to="/manageemployees"><img className="w-[20px] h-[20px]" src={Cross} alt="cross" /></Link>
                    </div>
                </div>
                <form>
                    <div className="h-auto w-full mt-[5px] ">
                        <div className="flex gap-[48px] justify-center items-center">
                            <div className=" space-y-[12px] py-[20px] px-[10px]">
                                <div className="">
                                    <div className="text-[14px]">Employee Name</div>
                                    <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" />
                                </div>
                                <div className="">
                                    <div className="text-[14px]">Pan No</div>
                                    <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" />
                                </div>
                                <div className="">
                                    <div className="text-[14px]">Username</div>
                                    <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" />
                                </div>
                                <div className="">
                                    <div className="text-[14px]">Date of joining</div>
                                    <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" />
                                </div>
                                <div className="">
                                    <div className="text-[14px]">Designation</div>
                                    <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" />
                                </div>
                                <div className="">
                                    <div className="text-[14px]">Email</div>
                                    <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" />
                                </div>
                                <div className="">
                                    <div className="text-[14px]">Address Line 1</div>
                                    <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" />
                                </div>
                            </div>
                            <div className=" space-y-[12px] py-[20px] px-[10px]">
                                <div className="">
                                    <div className="text-[14px]">Employee ID</div>
                                    <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" />
                                </div>
                                <div className="">
                                    <div className="text-[14px]">LOB</div>
                                    <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" />
                                </div>
                                <div className="">
                                    <div className="text-[14px]">Date of birth</div>
                                    <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" />
                                </div>
                                <div className="">
                                    <div className="text-[14px]">Last Date of Working</div>
                                    <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" />
                                </div>
                                <div className="">
                                    <div className="text-[14px]">Assign role</div>
                                    <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" />
                                </div>
                                <div className="">
                                    <div className="text-[14px]">Phone Number</div>
                                    <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" />
                                </div>
                                <div className="">
                                    <div className="text-[14px]">Address Line 2</div>
                                    <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" />
                                </div>
                            </div>
                            <div className=" space-y-[12px] py-[20px] px-[10px] ">
                            <div className="">
                                    <div className="text-[14px]">Country</div>
                                    <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" />
                                </div>
                                <div className="">
                                    <div className="text-[14px]">State</div>
                                    <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" />
                                </div>
                                <div className="">
                                    <div className="text-[14px]">City</div>
                                    <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" />
                                </div>
                                <div className="">
                                    <div className="text-[14px]">Suburb</div>
                                    <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" />
                                </div>
                                <div className="">
                                    <div className="text-[14px]">Zip Code</div>
                                    <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" />
                                </div>
                                <div className="">
                                    <div className="text-[14px]">Entity</div>
                                    <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-[20px] flex justify-center items-center gap-[20px]">
                        <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md'>Save</button>
                        <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md'>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default addNewEmp
