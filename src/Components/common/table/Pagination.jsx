import { FilePdfOutlined } from "@ant-design/icons";
import { Refresh } from "@mui/icons-material";
import { MenuItem, Pagination, Popover } from "@mui/material";
import React, { useState } from "react";
import Pdf from "../../../assets/pdf.png";
import Excel from "../../../assets/excel.png";

const PaginationComponent = ({  pageNo,countPerPage,totalCount,handlePageChange,handlePageCountChange,handleRefresh,downloadExcel }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  return (
    <div className="w-full h-12 flex justify-between justify-self-end px-6 ">
      <div className="ml-2">
        <div className="flex items-center w-auto h-full">
          <Pagination
            count={Math.ceil(totalCount / countPerPage)}
            page={pageNo}
            variant="outlined"
            onChange={(e, value) => handlePageChange(value)}
          />
        </div>
      </div>
      <div className="flex mr-10 justify-center items-center space-x-2 ">
        <div className="flex mr-8 space-x-2 text-sm items-center">
          <p className="text-gray-700">Items Per page</p>
          <select
            className="text-gray-700 border-black border-[1px] rounded-md p-1"
            name="currentPages"
            value={countPerPage}
            onChange={handlePageCountChange}
          >
            <option key={15}>15</option>
            <option key={25}>25</option>
            <option key={50}>50</option>
          </select>
        </div>
        <div className="flex text-sm">
          <p className="mr-11 text-gray-700">
            {totalCount} Items in {Math.ceil(totalCount / +countPerPage)} Pages
          </p>
        </div>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          sx={{ top: "-50px", left: "-20px" }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <MenuItem
            className="flex space-x-2 justify-center items-center ml-3 mt-3"
            // onClick={downloadPDF}/
          >
            <p>Download as Pdf</p>
            <img src={Pdf} />
          </MenuItem>
          <MenuItem
            className="flex space-x-2 justify-center items-center ml-3 mt-3"
            onClick={downloadExcel}
          >
            <p> Download as Excel</p>
            <img src={Excel} />
          </MenuItem>
        </Popover>

        <div
          className="border-solid border-black border-[0.5px] rounded-md w-28 h-10 flex items-center justify-center space-x-1 p-2 cursor-pointer"
          onClick={handleRefresh}
        >
          <button>
            <p>Refresh</p>
          </button>
          <Refresh sx={{ height: "16px", width: "16px" }} />
        </div>
        <div className="border-solid border-black border-[1px] w-28 rounded-md h-10 flex items-center justify-center space-x-1 p-2">
          <button
            onClick={(e) => {
              setAnchorEl(e.currentTarget);
            }}
          >
            <p>Download</p>
          </button>
          <FilePdfOutlined height={"16px"} width={"16px"} />
        </div>
      </div>
    </div>
  );
};

export default PaginationComponent;
