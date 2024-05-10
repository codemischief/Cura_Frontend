import React, { useState } from "react";
import Pdf from "../../../assets/pdf.png";
import Excel from "../../../assets/excel.png";
import { MenuItem, Pagination, Popover } from "@mui/material";
import { Refresh } from "@mui/icons-material";
import { FilePdfOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import { useDispatch } from "react-redux";
import {
  setCountPerPage,
  setInitialState,
  setPageNumber,
} from "../../../Redux/slice/pmaSlice";
import { useSelector } from "react-redux";

export const CustomPaginationComponent = (props) => {
  const dispatch = useDispatch();
  const { pageNo, totalCount, countPerPage } = useSelector(
    (state) => state.pmaBilling
  );
  const { tableRef, onRefresh } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const downloadExcel = () => {
    const tableData = tableRef.current?.dataManager?.data;
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "pmaBilling.xlsx");
  };

  const downloadPDF = () => {
    const data = tableRef.current?.dataManager?.data;
    const pdf = new jsPDF("p", "pt", "a4");

    // Set the font for the entire table
    pdf.setFont("helvetica");

    // Set up the table headers
    const headers = Object.keys(data[0]);

    // Set up the table rows
    const rows = data.map((obj) => headers.map((key) => obj[key]));

    // Add a table with headers and rows
    pdf.autoTable({
      head: [headers],
      body: rows,
      startY: 60, // Adjust table starting Y position
      theme: "striped",
      styles: {
        cellPadding: 5,
        fontSize: 10,
        valign: "middle",
        halign: "center",
        overflow: "linebreak", // Overflow content to new line if needed
      },
      columnStyles: {
        // Adjust column width if needed
        0: { columnWidth: "auto" },
        1: { columnWidth: "auto" },
        // Add more column styles as needed
      },
      margin: { top: 50 },
      addPageContent: function (data) {
        // Add header to each page
        pdf.setFontSize(18);
        pdf.text("Table Title", data.settings.margin.left, 40);
      },
      didParseCell: function (data) {
        // Adjust row height based on content
        const cellHeight =
          pdf.internal.getLineHeight() * (data.row.raw.length / 50);
        if (data.row.raw.length > 50) {
          data.row.height = cellHeight;
        }
      },
    });

    // Save the PDF
    pdf.save("data.pdf");
  };

  const open = Boolean(anchorEl);

  return (
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
            onChange={(e) => {
              dispatch(setPageNumber(1));
              dispatch(setCountPerPage(e.target.value));
            }}
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
          sx={{ top: "-110px", left: "-20px" }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <MenuItem
            className="flex space-x-2 justify-center items-center ml-3 mt-3"
            onClick={downloadPDF}
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
          onClick={() => {
            // dispatch(setInitialState())
            onRefresh();
            console.log(" tableRef.current", tableRef.current);
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
              setAnchorEl(e.currentTarget);
            }}
          >
            <p>Download</p>
          </button>
          {/* <img src={"downloadIcon"} className="h-2/3" /> */}
          <FilePdfOutlined height={"16px"} width={"16px"} />
        </div>
      </div>
    </div>
  );
};
