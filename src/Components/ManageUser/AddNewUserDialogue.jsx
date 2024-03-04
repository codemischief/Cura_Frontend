// import React from 'react'
import React from "react";
import Cross from "../assets/cross.png";
import { Link } from "react-router-dom";
import Imp from "../assets/important.png";

const AddNewUserDialogue = () => {
  return (
    <>
      <div className="flex justify-center ">
        <div className="w-[1000px] h-[540px] bg-white rounded-lg">
          <form>
            <div className="h-auto w-full mt-[5px] ">
              <div className="flex gap-[48px] justify-center items-center">
                <div className=" space-y-[12px] py-[20px] px-[10px]">
                  <div className="">
                    <div className="flex space-x-1 items-center">
                      <div className="text-[14px]">Name of the user</div>
                      <img
                        className="w-[10px] h-[10px]"
                        src={Imp}
                        alt="important"
                      />
                    </div>
                    <input
                      className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
                      type="text"
                    />
                  </div>
                  <div className="">
                    <div className="flex space-x-1 items-center">
                      <div className="text-[14px]">Create Username</div>
                      <img
                        className="w-[10px] h-[10px]"
                        src={Imp}
                        alt="important"
                      />
                    </div>
                    <input
                      className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
                      type="text"
                    />
                  </div>
                  <div className="">
                    <div className="flex space-x-1 items-center">
                      <div className="text-[14px]">Create Password</div>
                      <img
                        className="w-[10px] h-[10px]"
                        src={Imp}
                        alt="important"
                      />
                    </div>
                    <input
                      className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
                      type="text"
                    />
                  </div>
                  <div className="">
                    <div className="flex space-x-1 items-center">
                      <div className="text-[14px]">LOB</div>
                      <img
                        className="w-[10px] h-[10px]"
                        src={Imp}
                        alt="important"
                      />
                    </div>
                    <input
                      className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
                      type="text"
                    />
                  </div>
                  <div className="">
                    <div className="flex space-x-1 items-center">
                      <div className="text-[14px]">Email 1</div>
                      <img
                        className="w-[10px] h-[10px]"
                        src={Imp}
                        alt="important"
                      />
                    </div>
                    <input
                      className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
                      type="text"
                    />
                  </div>
                  <div className="">
                    <div className="text-[14px]">Work Phone</div>
                    <input
                      className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
                      type="text"
                    />
                  </div>
                  <div className="">
                    <div className="flex space-x-1 items-center">
                      <div className="text-[14px]">Address Line 1</div>
                      <img
                        className="w-[10px] h-[10px]"
                        src={Imp}
                        alt="important"
                      />
                    </div>
                    <input
                      className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
                      type="text"
                    />
                  </div>
                </div>
                <div className=" space-y-[12px] py-[20px] px-[10px]">
                  <div className="">
                    <div className="text-[14px]">Office</div>
                    <input
                      className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
                      type="text"
                    />
                  </div>
                  <div className="">
                    <div className="flex space-x-1 items-center">
                      <div className="text-[14px]">Effective Date</div>
                      <img
                        className="w-[10px] h-[10px]"
                        src={Imp}
                        alt="important"
                      />
                    </div>
                    <input
                      className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
                      type="text"
                    />
                  </div>
                  <div className="">
                    <div className="flex space-x-1 items-center">
                      <div className="text-[14px]">Confirm password</div>
                      <img
                        className="w-[10px] h-[10px]"
                        src={Imp}
                        alt="important"
                      />
                    </div>
                    <input
                      className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
                      type="text"
                    />
                  </div>
                  <div className="">
                    <div className="flex space-x-1 items-center">
                      <div className="text-[14px]">Role</div>
                      <img
                        className="w-[10px] h-[10px]"
                        src={Imp}
                        alt="important"
                      />
                    </div>
                    <input
                      className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
                      type="text"
                    />
                  </div>
                  <div className="">
                    <div className="text-[14px]">Email 2</div>
                    <input
                      className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
                      type="text"
                    />
                  </div>
                  <div className="">
                    <div className="flex space-x-1 items-center">
                      <div className="text-[14px]">Home Phone</div>
                      <img
                        className="w-[10px] h-[10px]"
                        src={Imp}
                        alt="important"
                      />
                    </div>
                    <input
                      className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
                      type="text"
                    />
                  </div>
                  <div className="">
                    <div className="text-[14px]">Address Line 2</div>
                    <input
                      className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
                      type="text"
                    />
                  </div>
                </div>
                <div className=" space-y-[12px] py-[20px] px-[10px] my-[113px]">
                  <div className="">
                    <div className="flex space-x-1 items-center">
                      <div className="text-[14px]">City 1</div>
                      <img
                        className="w-[10px] h-[10px]"
                        src={Imp}
                        alt="important"
                      />
                    </div>
                    <input
                      className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
                      type="text"
                    />
                  </div>
                  <div className="">
                    <div className="flex space-x-1 items-center">
                      <div className="text-[14px]">Suburb</div>
                      <img
                        className="w-[10px] h-[10px]"
                        src={Imp}
                        alt="important"
                      />
                    </div>
                    <input
                      className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
                      type="text"
                    />
                  </div>
                  <div className="">
                    <div className="flex space-x-1 items-center">
                      <div className="text-[14px]">Zip Code</div>
                      <img
                        className="w-[10px] h-[10px]"
                        src={Imp}
                        alt="important"
                      />
                    </div>
                    <input
                      className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className=" mt-[30px] flex flex-col gap-3">
                <div className="text-center space-x-1">
                    <input type="checkbox" />
                    <label htmlFor="">Active</label>
                </div>
              <div className=" flex justify-center items-center gap-[20px]">
                <button className="w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md">
                  Save
                </button>
                <button className="w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md">
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNewUserDialogue;
