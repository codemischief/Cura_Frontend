import { LinearProgress, MenuItem, Pagination, Popover } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import connectionDataColumn from "./columns";
import { setCountPerPage, setPageNumber } from "../../../Redux/slice/pmaSlice";
import { Refresh } from "@mui/icons-material";
import { FilePdfOutlined } from "@ant-design/icons";
import Pdf from "../../../assets/pdf.png";
import { useState } from "react";

const SimpleTable = ({ columns,data }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const {
    pmaBillingData,
    status,
    totalCount,
    sorting,
    countPerPage,
    pageNo,
    filter,
  } = useSelector((state) => state.pmaBilling);

  return (
    <div className="w-full text-[12px]">
      <table className="w-full border-gray-400 border-b-[1px] table-auto">
        <thead className="h-[115px] block">
          <tr className="h-[56px]">
            {columns.map((column, index) => (
              <th key={index} style={{ width: column.width }}>
                {column.filterComponent && (
                  <column.filterComponent columnDef={{ field: column.field }} />
                )}
              </th>
            ))}
          </tr>
          <tr className="bg-[#F0F6FF] h-[56px] ">
            {columns.map((column, index) => (
              <th key={index} style={{ width: column.width }}>
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody  className="overflow-y-auto block max-h-[calc(100vh-375px)]" >
          {status === "loading" && <LinearProgress />}
          {data.map((rowData, rowIndex) => (
            <tr key={rowIndex} className='border-b dark:border-gray-700'>
              {columns.map((column, colIndex) => (
                <td key={colIndex} colSpan={1} style={{ width: column.width }} className="py-3 text-center px-2">
                  {column.render
                    ? column.render(rowData, rowIndex)
                    : rowData[column.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full h-12 flex justify-between justify-self-end px-6 ">
      
        <div className="ml-2">
          <div className="flex items-center w-auto h-full">
            <Pagination
              count={Math.ceil(totalCount / countPerPage)}
              page={pageNo}
              variant="outlined"
              onChange={(e, value) => {
                dispatch(setPageNumber(value));
              }}
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
              onChange={(e) => dispatch(setCountPerPage(e.target.value))}
            >
              <option key={15}>15</option>
              <option key={25}>25</option>
              <option key={50}>50</option>
            </select>
          </div>
          <div className="flex text-sm">
            <p className="mr-11 text-gray-700">
              {totalCount} Items in {Math.ceil(totalCount / +countPerPage)}{" "}
              Pages
            </p>
          </div>

          <div
            className="border-solid border-black border-[0.5px] rounded-md w-28 h-10 flex items-center justify-center space-x-1 p-2 cursor-pointer"
            onClick={() => {}}
          >
            <button>
              <p>Refresh</p>
            </button>
            <Refresh sx={{ height: "16px", width: "16px" }} />
          </div>
          <div className="border-solid border-black border-[1px] w-28 rounded-md h-10 flex items-center justify-center space-x-1 p-2">
           
            <button
              onClick={(e) => {
                // setAnchorEl(e.currentTarget);
              }}
            >
              <p>Download</p>
            </button>
            <FilePdfOutlined height={"16px"} width={"16px"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleTable;
