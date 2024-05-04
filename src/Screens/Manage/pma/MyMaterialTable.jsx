import React, { useMemo, useState, useRef, forwardRef } from "react";
import { data, connectionTypeObj, connectionProtocolsObj } from "./data";
import connectionDataColumn from "./columns";
import { Strings } from "./String";
import MaterialTable from "@material-table/core";
import { Box, Button, Stack } from "@mui/material";
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
} from "@mui/icons-material";
import Navbar from "../../../Components/Navabar/Navbar";
import HeaderBreadcrum from "../../../Components/common/HeaderBreadcum";


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

  console.log(tableIcons, "tableIcons");

  const actions = [
    // {
    //   icon: tableIcons.FilterList,
    //   tooltip: Strings.CLEAR_ALL_FILTER,
    //   isFreeAction: true,
    //   onClick: () => clearFilterAll(7, tableRef),
    // },
    // {
    //   icon: columnResizable ? tableIcons.ColumnReset : tableIcons?.ColumnResize,
    //   tooltip: columnResizable ? Strings.RESET_WIDTH : Strings.RESIZE_WIDTH,
    //   isFreeAction: true,
    //   onClick: () => {
    //     setColumnResizable(!columnResizable);
    //   },
    // },
    // {
    //   icon: fullscreenOpen ? tableIcons.FullscreenExit : tableIcons?.Fullscreen,
    //   tooltip: fullscreenOpen
    //     ? Strings.FULLSCREEN_EXIT_LABLE
    //     : Strings.FULLSCREEN_LABEL,
    //   isFreeAction: true,
    //   onClick: (event, rowData) => {
    //     setFullscreenOpen(!fullscreenOpen);
    //   },
    // },
    // {
    //   icon: tableIcons.Add,
    //   tooltip: "Add Connection",
    //   isFreeAction: true,
    //   onClick: (event, rowData) => window.alert("add"),
    // },
    // {
    //   icon: tableIcons.Edit,
    //   tooltip: "Edit Connection",
    //   onClick: (event, rowData) => window.alert("edit")
    // },
    // {
    //   icon: tableIcons.View,
    //   tooltip: "View Connection",
    //   onClick: (event, rowData) => window.alert("veiw"),
    // },
    {
      icon: tableIcons.Delete,
      tooltip: "Delete Connection",
      onClick: (event, rowData) => window.alert("delete"),
    },
  ];

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

          
          {/* {error.year && <p className="text-red-800">{error.year}</p>}
          {error.month && <p className="text-red-800">{error.month}</p>} */}
          <CustomButton title="Add New PMA Invoice" />
        </Stack>

        {/* {showTable &&  */}
        {/* } */}

        <MaterialTable
          tableRef={tableRef}
          columns={columns}
          data={data}
          title={""}
          actions={actions}
          
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
            filterCellStyle: { padding: "4px"},
            selection: false,
            exportAllData: true,
            columnResizable: columnResizable,
            tableWidth: "variable",
            tableLayout: columnResizable ? "fixed" : "auto",
            toolbar: false,
            // Customizing the toolbar to include filter input fields
            toolbarButtonAlignment: "",
            
          }}
        />
      </Stack>
    </Stack>
  );
}
