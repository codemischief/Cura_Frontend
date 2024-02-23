import React from 'react'
import {Outlet} from "react-router-dom";
import Back from "./assets/back.png"

const ManageUser = () => {
  return (
    <div>
      <div>
        <Outlet />
      </div>
      <div className="mx-[10px] mt-[10px] px-[10px] pt-[10xp] bg-white w-[1260px] h-[500px] rounded-sm">
        <div className="flex items-center gap-[70px]">
            <div className="flex items-center">
                <img className="" src={Back} alt="back" />
            </div>
        </div>
      </div>
    </div>
  )
}

export default ManageUser
