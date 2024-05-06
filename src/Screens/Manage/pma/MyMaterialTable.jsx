import React, { useMemo, useState, useRef } from "react";
import { connectionTypeObj, connectionProtocolsObj } from "./data";
import connectionDataColumn from "./columns";
import Pdf from "../../../assets/pdf.png";
import Excel from "../../../assets/excel.png";
import MaterialTable from "@material-table/core";
import { MenuItem, Pagination, Popover } from "@mui/material";
import { Refresh, ArrowUpward } from "@mui/icons-material";
import { FilePdfOutlined } from "@ant-design/icons";
import { env_URL_SERVER } from "../../../Redux/helper";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import { useDispatch } from "react-redux";
import { getPmaBilling, setPageNumber } from "../../../Redux/slice/pmaSlice";
import { useSelector } from "react-redux";
// import "./styles.css";

export const CustomPaginationComponent = (props) => {
  const dispatch = useDispatch();
  const { pageNo } = useSelector((state) => state.pmaBilling);
  const {
    count,
    page,
    rowsPerPage,
    onPageChange,
    rowsPerPageOptions,
    onRowsPerPageChange,
    tableRef,
    handleQueryChange,
  } = props;

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
  let obj = {
    user_id: 1234,
    month: 2,
    year: 2021,
    filter: [],
    pg_no: page,
    add: false,
    pg_size: 30,
  };
  return (
    <div className="w-full h-12 flex justify-between justify-self-end px-6 ">
      {/* footer component */}
      <div className="ml-2">
        <div className="flex items-center w-auto h-full">
          <Pagination
            count={Math.ceil(count / rowsPerPage)}
            page={pageNo}
            variant="outlined"
            onChange={(e, value) => {
              // handleQueryChange(e, value);
              dispatch(setPageNumber(value));
              // onPageChange(e, value - 1);
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
            value={+rowsPerPage}
            onChange={onRowsPerPageChange}
          >
            {rowsPerPageOptions?.map((rowOption) => (
              <option key={rowOption}>{rowOption}</option>
            ))}
          </select>
        </div>
        <div className="flex text-sm">
          <p className="mr-11 text-gray-700">
            {+count} Items in {Math.ceil(+count / +rowsPerPage)} Pages
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
            tableRef?.current.onQueryChange();
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

export default function MyMaterialTable({ year, month }) {
  const [columnResizable, setColumnResizable] = useState(false);
  const tableRef = useRef();
  const columns = useMemo(
    () => connectionDataColumn({ connectionTypeObj, connectionProtocolsObj }),
    []
  );

  return (
    <div className="max-h-[501px]">
      <MaterialTable
        tableRef={tableRef}
        columns={columns}
        data={(query) =>
          new Promise((resolve, reject) => {
            let url = `${env_URL_SERVER}getPMABilling`;
            let pageNo = Number(query.page);
            let pageSize = Number(query.pageSize);
            let sort_by = [];
            let sort_order = [];
            if (query.orderBy) {
              sort_by.push(query.orderBy.field);
              sort_order.push(query.orderDirection);
            }
            const options = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                user_id: 1234,
                month: month,
                year: year,
                filter: query?.filters?.length ? query?.filters[0]?.value : [],
                pg_no: pageNo + 1,
                pg_size: pageSize,
                add: false,
                sort_by,
                sort_order,
              }),
            };
            fetch(url, options)
              .then((resp) => resp.json())
              .then((resp) => {
                resolve({
                  data: resp.data,
                  page: query.page,
                  totalCount: resp.total_count,
                });
              });
          })
        }
        title={""}
        options={{
          exportButton: {
            csv: true,
            pdf: false,
          },
          actionsColumnIndex: -1,
          addRowPosition: "first",
          emptyRowsWhenPaging: false,
          search: true,
          filtering: true,
          filterRowStyle: {
            position: "sticky",
            top: 80,
            background: "white",
            zIndex: 50 /* optionally */,
          },
          grouping: true,
          columnsButton: true,
          paging: true,
          pageSize: 15,
          pageSizeOptions: [15, 25, 50],
          padding: "default",
          headerStyle: {
            backgroundColor: "#F0F6FF",
            position: "sticky",
            zIndex: 90,
            top: 0,
            pt: 12,
            pb: 12,
          },
          maxBodyHeight: "650px",
          filterCellStyle: { padding: "4px" },
          selection: false,
          exportAllData: true,
          tableWidth: "variable",
          tableLayout: columnResizable ? "fixed" : "auto",
          toolbar: false,
          pagination: false,
          toolbacolumnResizablerButtonAlignment: "",
        }}
        icons={{
          SortArrow: (props) => <ArrowUpward {...props} fontSize="small" />,
        }}
        components={{
          Pagination: (props) => {
            return <CustomPaginationComponent {...props} tableRef={tableRef} />;
          },
        }}
      />
    </div>
  );
}
