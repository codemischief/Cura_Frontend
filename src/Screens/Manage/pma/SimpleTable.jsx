import { LinearProgress, MenuItem, Pagination, Popover } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import connectionDataColumn from "./columns";
import { setCountPerPage, setPageNumber } from "../../../Redux/slice/pmaSlice";
import { Refresh } from "@mui/icons-material";
import { FilePdfOutlined } from "@ant-design/icons";
import Pdf from "../../../assets/pdf.png";
import { useState } from "react";

const SimpleTable = ({ columns }) => {
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

  const handleSort = () => {};
  const handleOpenEdit = () => {};
  const handleDelete = () => {};
  return (
    <div className="h-[calc(100vh_-_14rem)] w-full text-[12px]">
      <table className="w-full border-gray-400 border-b-[1px]">
        <thead className="">
          <tr className="h-[56px]">
            {columns.map((column, index) => (
              <th key={index} style={{ width: column.width }}>
                {column.filterComponent && (
                  <column.filterComponent columnDef={{ field: column.field }} />
                )}
              </th>
            ))}
          </tr>
          <tr className="bg-[#F0F6FF]">
            {columns.map((column, index) => (
              <th key={index} style={{ width: column.width }}>
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="overflow-auto h-[calc(100vh_-_18rem)]">
          {status === "loading" && <LinearProgress />}
          {pmaBillingData.map((rowData, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex} style={{ ...column.cellStyle }}>
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
        {/* footer component */}
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
            onClick={() => {
              // dispatch(setInitialState())
              //   onRefresh();
              //   console.log(" tableRef.current", tableRef.current);
              // tableRef.current.onQueryChange();
            }}
          >
            <button>
              <p>Refresh</p>
            </button>
            <Refresh sx={{ height: "16px", width: "16px" }} />
          </div>
          <div className="border-solid border-black border-[1px] w-28 rounded-md h-10 flex items-center justify-center space-x-1 p-2">
            {/* download */}
            <button
              onClick={(e) => {
                // setAnchorEl(e.currentTarget);
              }}
            >
              <p>Download</p>
            </button>
            {/* <img src={"downloadIcon"} className="h-2/3" /> */}
            <FilePdfOutlined height={"16px"} width={"16px"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleTable;
