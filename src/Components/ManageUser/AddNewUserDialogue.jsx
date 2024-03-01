// import React from 'react'
import React from 'react';
import Cross from "../assets/cross.png";
import { Link } from 'react-router-dom';
const AddNewUserDialogue = () => {
  return (
    <>
      <div className='flex justify-center '>
            <div className="w-[1000px] h-[540px] bg-white rounded-lg">
                <form>
                    <div className="h-auto w-full mt-[5px] ">
                        <div className="flex gap-[48px] justify-center items-center">
                            <div className=" space-y-[12px] py-[20px] px-[10px]">
                                <div className="">
                                    <div className="text-[14px]">Name</div>
                                    <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" />
                                </div>
                                <div className="">
                                    <div className="text-[14px]">Create Username</div>
                                    <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" />
                                </div>
                                <div className="">
                                    <div className="text-[14px]">Create Password</div>
                                    <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" />
                                </div>
                                <div className="">
                                    <div className="text-[14px]">LOB</div>
                                    <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" />
                                </div>
                                <div className="">
                                    <div className="text-[14px]">Email 1</div>
                                    <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" />
                                </div>
                                <div className="">
                                    <div className="text-[14px]">Work Phone</div>
                                    <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" />
                                </div>
                                <div className="">
                                    <div className="text-[14px]">Address Line 1</div>
                                    <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" />
                                </div>
                            </div>
                            <div className=" space-y-[12px] py-[20px] px-[10px]">
                                <div className="">
                                    <div className="text-[14px]">Office</div>
                                    <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" />
                                </div>
                                <div className="">
                                    <div className="text-[14px]">Effective Date</div>
                                    <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" />
                                </div>
                                <div className="">
                                    <div className="text-[14px]">Confirm Password</div>
                                    <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" />
                                </div>
                                <div className="">
                                    <div className="text-[14px]">Assign role</div>
                                    <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" />
                                </div>
                                <div className="">
                                    <div className="text-[14px]">Email 2</div>
                                    <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" />
                                </div>
                                <div className="">
                                    <div className="text-[14px]">Home Phone</div>
                                    <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" />
                                </div>
                                <div className="">
                                    <div className="text-[14px]">Address Line 2</div>
                                    <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" />
                                </div>
                            </div>
                            <div className=" space-y-[12px] py-[20px] px-[10px] my-[113px]">
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
    </>
  )
}

export default AddNewUserDialogue
