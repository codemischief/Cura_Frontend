import React from "react";
import { Outlet, Link } from "react-router-dom";
import Back from "../assets/back.png";
import {useState} from "react"
import searchIcon from "../assets/searchIcon.png";
import Next from "../assets/next.png";
import Refresh from "../assets/refresh.png";
import Download from "../assets/download.png";
// import DialogTitle from "@mui/material/DialogTitle";
// import Dialog from "@mui/material/Dialog";
import EmpDailog from "../modals/EmpDailog";
// import Cross from "../assets/cross.png";




const ManageEmployees = (props) => {

  const [ openDialog, setOpenDialog ] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };
  
  // const [openDialog, handleDisplay] = React.useState(false);

  // const handleClose = () => {
  //    handleDisplay(false);
  // };

  // const openDialogBox = () => {
  //    handleDisplay(true);
  // };
 


  return (
    <div>
      <div>
        <Outlet />
      </div>
      <EmpDailog openDialog={openDialog} setOpenDialog={setOpenDialog}></EmpDailog> 

   
      <div className="mx-[10px] mt-[10px] px-[20px] pt-[10xp] bg-white w-[1260px] h-[500px] rounded-sm">
        <div className="flex items-center gap-[600px] h-[45px]">
          <div className="flex items-center gap-[10px]">
            <div className=" w-[30px] h-[30px] bg-[#EBEBEB] rounded-full flex justify-center items-center">
              <Link to="/dashboard">
                <img className="w-[20px] h-[20px]" src={Back} alt="back" />
              </Link>
            </div>
            <div>
              <div className="text-md">Manage Employees</div>
              <div className="text-[12px]">Admin - Manage Employees</div>
            </div>
          </div>
          <div className="flex justify-center items-center gap-[20px]">
            <div className="flex justify-center items-center">
              <input
                className="h-[36px] bg-[#F5F5F5] text-[#787878]"
                type="text"
                placeholder="  Search"
              />
              <div className="h-[36px] w-[40px] bg-[#004DD7] flex items-center justify-center rounded-r-lg">
                <img className="h-[26px] " src={searchIcon} alt="search-icon" />
              </div>
            </div>
            <button className="bg-[#004DD7] text-white h-[30px] w-[200px] rounded-lg" onClick={handleOpenDialog}>
              Add New Employee   +
            </button>
          </div>
        </div>
        <hr className="m-[10px]" />
        <div className="flex justify-evenly items-center">
          <input
            className="bg-[#F5F5F5] h-[23px] w-[115px] rounded-md text-[11px]"
            type="text"
            placeholder=" Search Name"
          />
          <input
            className="bg-[#F5F5F5] h-[23px] w-[115px] rounded-md text-[11px]"
            type="text"
            placeholder=" Search Username"
          />

          <input
            className="bg-[#F5F5F5] h-[23px] w-[115px] rounded-md text-[11px]"
            type="text"
            placeholder=" Role"
          />
          <input
            className="bg-[#F5F5F5] h-[23px] w-[115px] rounded-md text-[11px]"
            type="text"
            placeholder=" Status"
          />
          <input
            className="bg-[#F5F5F5] h-[23px] w-[115px] rounded-md text-[11px]"
            type="text"
            placeholder=" Search Id"
          />
        </div>
        <footer >
          <hr className="bg-[#CBCBCB] h-[2px] my-[8px]" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[40px]">
              <div className="flex items-center gap-[30px]">
                <img className="w-[15px] h-[15px]" src={Back} alt="back" />
                <div className="flex items-center gap-[10px]">
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                </div>
                <img className="w-[15px] h-[15px]" src={Next} alt="next" />
              </div>
              <div className="flex items-center gap-[5px]">
                <span className="text-[11px] text-[#787878]">Item per page</span>
                <div className="w-[40px] h-[24px] border-[2px] rounded-md border-[#CBCBCB] text-[11px] text-[#787878] flex justify-center items-center">16</div>
              </div>
            </div>
            <div className="flex items-center gap-[10px]">
              <button className="w-[80px] h-[28px] border-[2px] border-[#505050] rounded-md bg-[#F5F5F5] flex justify-center items-center text-[11px] gap-[4px]">Refresh <img className="w-[11px] h-[11px]" src={Refresh} alt="refresh" /></button>
              <button className="w-[100px] h-[28px] border-[2px] border-[#505050] rounded-md bg-[#F5F5F5] flex justify-center items-center text-[11px] gap-[4px]">Download <img className="w-[11px] h-[11px]" src={Download} alt="download" /></button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ManageEmployees;
