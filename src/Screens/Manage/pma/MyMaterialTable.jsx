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

const CustomPaginationComponent = (props) => {
  // console.log("props", props);
  const {
    count,
    page,
    rowsPerPage,
    onPageChange,
    rowsPerPageOptions,
    onRowsPerPageChange,
  } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  return (
    <div className="w-full h-12 flex justify-between justify-self-end px-6 ">
      {/* footer component */}
      <div className="ml-2">
        <div className="flex items-center w-auto h-full">
          <Pagination
            count={Math.ceil(count / rowsPerPage)} // Calculate total pages
            page={page + 1} // Page is zero-indexed, so add 1
            variant="outlined"
            onChange={(e, value) => {
              onPageChange(e, value - 1);
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
          <MenuItem className="flex space-x-2 justify-center items-center ml-3 mt-3">
            <p>Download as Pdf</p>
            <img src={Pdf} />
          </MenuItem>
          <MenuItem className="flex space-x-2 justify-center items-center ml-3 mt-3">
            <p> Download as Excel</p>
            <img src={Excel} />
          </MenuItem>
        </Popover>

        <div className="border-solid border-black border-[0.5px] rounded-md w-28 h-10 flex items-center justify-center space-x-1 p-2">
          <button onClick={() => {}}>
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
  // const dispatch = useDispatch();

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
        // data={tableData}
        data={(query) =>
          new Promise((resolve, reject) => {
            console.log("query", query);
            // prepare your data and then call resolve like this:
            let url = `${env_URL_SERVER}getPMABilling`;
            let pageNo = Number(query.page);
            let pageSize = Number(query.pageSize);
            //searching
            if (query.search) {
              url += `q=${query.search}`;
            }
            //sorting
            if (query.orderBy) {
              url += `&_sort=${query.orderBy.field}&_order=${query.orderDirection}`;
            }
            //filtering
            if (query.filters.length) {
              // const filter = query.filters.map((filter) => {
              //   return `&${filter.column.field}${filter.operator}${filter.value}`;
              // });
              // url += filter.join("");
              // console.log("query.filters.value", query.filters[0].value);
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
              }),
            };
            //pagination
            // url += `&_page=${query.page + 1}`;
            // url += `&_limit=${query.pageSize}`;

            fetch(url, options)
              .then((resp) => resp.json())
              .then((resp) => {
                resolve({
                  data: resp.data, // your data array
                  page: query.page, // current page number
                  totalCount: resp.total_count, // total row number
                });
              });
          })
        }
        title={""}
        options={{
          actionsColumnIndex: -1,
          addRowPosition: "first",
          emptyRowsWhenPaging: false,
          search: true,
          filtering: true,
          grouping: true,
          columnsButton: true,
          paging: true,
          // pageNo: 1,
          pageSize: 15,
          pageSizeOptions: [15, 25, 50],
          padding: "default",
          headerStyle: {
            backgroundColor: "lightblue",
            position: "sticky",
            top: 0,
            pt: 12,
            pb: 12,
          },
          maxBodyHeight: "650px",
          filterCellStyle: { padding: "4px" },
          selection: false,
          exportAllData: true,
          columnResizable: columnResizable,
          tableWidth: "variable",
          tableLayout: columnResizable ? "fixed" : "auto",
          toolbar: false,
          pagination: false,
          toolbarButtonAlignment: "",
        }}
        icons={{
          SortArrow: (props) => <ArrowUpward {...props} fontSize="small" />,
        }}
        components={{
          Pagination: (props) => {
            return <CustomPaginationComponent {...props} />;
          },
        }}
      />
    </div>
  );
}
