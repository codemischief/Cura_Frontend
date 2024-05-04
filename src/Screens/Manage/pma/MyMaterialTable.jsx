import React, { useMemo, useState, useRef, forwardRef, useEffect } from "react";
import { data, connectionTypeObj, connectionProtocolsObj } from "./data";
import connectionDataColumn from "./columns";
import { Strings } from "./String";
import Pdf from "../../../assets/pdf.png";
import Excel from "../../../assets/excel.png";

import MaterialTable from "@material-table/core";
import {
  Box,
  Button,
  Grid,
  IconButton,
  MenuItem,
  Pagination,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import { clearFilterAll } from "./CustomFilterField";
import CustomButton from "../../../Components/common/CustomButton";
import {
  ViewArray,
  ViewHeadline,
  Visibility,
  DeleteOutline,
  AddCircle,
  RestartAlt,
  Search,
  Download,
  FilterList,
  Fullscreen,
  FullscreenExit,
  IosShare,
  Refresh,
  ArrowUpward,
} from "@mui/icons-material";
import Navbar from "../../../Components/Navabar/Navbar";
import HeaderBreadcrum from "../../../Components/common/HeaderBreadcum";
import { FilePdfOutlined } from "@ant-design/icons";
import {useDispatch} from 'react-redux'
import { example } from "../../../Redux/pmaSlicing";
const fullScreen = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  zIndex: 1200,
  backgroundColor: "#fff",
  overflow: "auto",
  padding: "8px",
};

const tableIcons = {
  ColumnResize: forwardRef((props, ref) => (
    <ViewArray {...props} ref={ref} fontSize="medium"></ViewArray>
  )),
  ColumnReset: forwardRef((props, ref) => (
    <ViewHeadline
      {...props}
      ref={ref}
      fontSize="medium"
      sx={{ transform: "rotate(90deg)" }}
    />
  )),
  View: forwardRef((props, ref) => (
    <Visibility
      {...props}
      ref={ref}
      color={props.color ?? "secondary"}
      fontSize="small"
    />
  )),
  // Edit: forwardRef((props, ref) => (
  //   <EditOutlined
  //     {...props}
  //     ref={ref}
  //     color={props.color ?? "secondary"}
  //     fontSize="small"
  //   />
  // )),
  Delete: forwardRef((props, ref) => (
    <DeleteOutline
      {...props}
      ref={ref}
      color={props.color ?? "secondary"}
      fontSize="small"
    />
  )),
  Add: forwardRef((props, ref) => (
    <AddCircle
      {...props}
      ref={ref}
      color={props.color ?? "secondary"}
      fontSize="large"
      sx={{ m: -0.75 }}
    />
  )),
  Reset: forwardRef((props, ref) => <RestartAlt {...props} ref={ref} />),
  Search: forwardRef((props, ref) => (
    <Search
      {...props}
      ref={ref}
      color={props.color ?? "secondary"}
      fontSize="small"
    />
  )),
  Download: forwardRef((props, ref) => (
    <Download {...props} ref={ref} fontSize="medium" sx={{ m: -0.75 }} />
  )),
  FilterList: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  Fullscreen: forwardRef((props, ref) => (
    <Fullscreen {...props} ref={ref} fontSize="large" sx={{ m: -0.75 }} />
  )),
  FullscreenExit: forwardRef((props, ref) => (
    <FullscreenExit {...props} ref={ref} fontSize="large" sx={{ m: -0.75 }} />
  )),
  IosShare: forwardRef((props, ref) => (
    <IosShare {...props} ref={ref} fontSize="large" sx={{ m: -0.75 }} />
  )),
  SortArrow: forwardRef((props, ref) => (
    <SyncAlt
      {...props}
      ref={ref}
      fontSize="large"
      sx={{ m: -0.75, rotate: "90" }}
    />
  )),
};

export default function MyMaterialTable(props) {
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const [columnResizable, setColumnResizable] = useState(false);
  const [error, setError] = useState({ year: false, month: false });
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const tableRef = useRef();
  const columns = useMemo(
    () => connectionDataColumn({ connectionTypeObj, connectionProtocolsObj }),
    []
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(example());
  }, []);



  function getYearsRange() {
    const currentYear = new Date().getFullYear();
    const yearsRange = [];

    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
      yearsRange.push(i.toString());
    }

    return yearsRange;
  }
  let YEARS = getYearsRange();
  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleShow = () => {
    if (selectedYear && selectedMonth) {
      setShowTable(true);
    } else {
      setError((prev) => ({
        ...prev,
        year: selectedYear ? prev.year : "please select a year first",
        month: selectedMonth ? prev.month : "please select a year first",
      }));
    }
  };

  const CustomPaginationComponent = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { page, rowsPerPage, count, onChangePage } = props;
    let from = rowsPerPage * page + 1;
    let to = rowsPerPage * (page + 1);
    if (to > count) {
      to = count;
    }
    const open = Boolean(anchorEl);
    return (
      <div className="w-full h-12 flex justify-between justify-self-end px-6 ">
        {/* footer component */}
        <div className="ml-2">
          <div className="flex items-center w-auto h-full">
          <Pagination count={10} />
          </div>
        </div>
        <div className="flex mr-10 justify-center items-center space-x-2 ">
          <div className="flex mr-8 space-x-2 text-sm items-center">
            <p className="text-gray-700">Items Per page</p>
            <select
              className="text-gray-700 border-black border-[1px] rounded-md p-1"
              name="currentPages"
              value={1}
              onChange={(e) => {}}
            >
              <option>15</option>
              <option>20</option>
              <option>25</option>
            </select>
          </div>
          <div className="flex text-sm">
            <p className="mr-11 text-gray-700">
              {10} Items in {Math.ceil(10 / 20)} Pages
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

  return (
    <Stack gap="1rem">
      <Navbar />
      <Stack direction={"column"} paddingX={"14px"}>
        <HeaderBreadcrum
          heading={"Manage PMA Billing"}
          path={["Manage", "Manage PMA Billing"]}
        />
        <Stack
          marginTop={"8px"}
          justifyContent={"space-between"}
          direction={"row"}
          // alignContent={"center"}
          alignItems={"center"}
        >
          <Stack
            direction={"row"}
            justifyContent={"space-around"}
            alignItems={"center"}
            gap={"24px"}
          >
            <div className="flex flex-col h-16 w-[281px]">
              <label className="font-sans text-sm font-normal leading-5">
                Select Year <span className="text-[#CD0000]">*</span>
              </label>
              <select
                className="w-full max-h-[224px] h-8 border-[1px] border-[#C6C6C6] bg-white rounded-sm px-3 text-xs outline-none"
                name="year"
                value={selectedYear}
                onChange={(e) => {
                  setSelectedYear(e.target.value);
                }}
              >
                <option selected value={""} className="hidden"></option>
                {YEARS.map((item, index) => {
                  return (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-col h-16 w-[281px]">
              <label className="font-sans text-sm font-normal leading-5">
                Select Month <span className="text-[#CD0000]">*</span>
              </label>
              <select
                className="w-[281px] h-8 border-[1px] border-[#C6C6C6] bg-white rounded-sm px-3 text-xs outline-none"
                name="year"
                value={selectedMonth}
                defaultValue="Select State"
                onChange={(e) => {
                  setSelectedMonth(e.target.value);
                }}
              >
                <option selected value={""} className="hidden"></option>
                {MONTHS.map((item, index) => {
                  return (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
          </Stack>
          <Button
            variant="outlined"
            onClick={handleShow}
            sx={{
              height: "36px",
              textTransform: "none",
              color: "#004DD7",
              borderRadius: "8px",
              width: "133px",
              fontSize: "14px",
              border: "1px solid #004DD7",
              fontWeight: "600px",
              lineHeight: "18.9px",
              "&:hover": {
                //you want this to be the same as the backgroundColor above
                backgroundColor: "#004DD7",
                color: "#fff",
              },
            }}
            disabled={!(selectedYear && selectedMonth)}
          >
            Show
          </Button>
          <CustomButton title="Add New PMA Invoice" />
        </Stack>
        <MaterialTable
          tableRef={tableRef}
          columns={columns}
          data={data}
          title={""}

          options={{
            actionsColumnIndex: -1,
            addRowPosition: "first",
            emptyRowsWhenPaging: false,
            search: true,
            filtering: true,
            grouping: true,
            columnsButton: true,
            pageSize: 5,
            pageSizeOptions: [5, 10, 20],
            padding: "default",
            headerStyle: {
              backgroundColor: "lightblue",
              pt: 12,
              pb: 12,
            },
            filterCellStyle: { padding: "4px" },
            selection: false,
            exportAllData: true,
            columnResizable: columnResizable,
            tableWidth: "variable",
            tableLayout: columnResizable ? "fixed" : "auto",
            toolbar: false,
            // Customizing the toolbar to include filter input fields
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
      </Stack>
    </Stack>
  );
}
