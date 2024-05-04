import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { data } from "./data";
import { Box, Button, IconButton, Stack, Tooltip } from "@mui/material";
import Navbar from "../../../Components/Navabar/Navbar";
import HeaderBreadcum from "../../../Components/common/HeaderBreadcum";
import CustomButton from "../../../Components/common/CustomButton";
import Example from "./BillingTable";
import { Delete, Edit } from "@mui/icons-material";
import { MenuItem } from '@mui/material';
// const YEAR= ["2021", "2022", "2023, ""]
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
const PmaBillingTable = () => {
  const [showTable, setShowTable] = useState(false);
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Sr no.",
        enableEditing: false,
        size: 80,
      },
      {
        header: "Client Name",
        accessorKey: "firstName",
        columnFilterModeOptions: ['contains', 'startsWith', 'endsWith'],
      },
      {
        header: "Quote Description",
        accessorKey: "lastName",
        renderColumnFilterModeMenuItems: ({ onSelectFilterMode }) => [
          <MenuItem key="0" onClick={() => onSelectFilterMode('contains')}>
            <div>Contains</div>
          </MenuItem>,
          <MenuItem
            key="1"
            onClick={() => onSelectFilterMode('customFilterFn')}
          >
            <div>Custom Filter Fn</div>
          </MenuItem>,
        ],
      },
      {
        header: "Invoice Date",
        accessorKey: "age",
      },
      {
        header: "Invoice Amount",
        accessorKey: "gender",
      },
      {
        header: "Base Amount",
        accessorKey: "state",
      },
      {
        header: "Tax  Amount",
        accessorKey: "salary",
      },
    ],
    []
  );
  const [error, setError] = useState({ year: false, month: false });
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const tableData = useMemo(
    () => data.map((d, index) => ({ ...d, id: index + 1 })),
    []
  );
  //demo state
  const [groupedColumnMode, setGroupedColumnMode] = useState("reorder"); //default is 'reorder

  const table = useMaterialReactTable({
    columns,
    data: tableData,
    groupedColumnMode,
    // data:[],
    enableGrouping: true,
    // enableEditing: true,
    enableStickyHeader: true,
    enableColumnFilterModes: true, //enable changing filter mode for all columns unless explicitly disabled in a column def
    // initialState: { showColumnFilters: true }, //show filters by default
    filterFns: {
      customFilterFn: (row, id, filterValue) => {
        return row.getValue(id) === filterValue;
      },
    },
    localization: {
      filterCustomFilterFn: 'Custom Filter Fn',
    },
    positionActionsColumn: "last",
    
    muiTableBodyRowProps: ({ row }) => ({
      onClick: (event) => {
        // console.info("event", row.original);
      },
      sx: {
        cursor: "pointer", //you might want to change the cursor too when adding an onClick
      },
    }),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton
            onClick={() => {
              console.log("row", row.original);
              // table.setEditingRow(row);
            }}
          >
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            color="error"
            onClick={() => {
              // row;
            }}
          >
            <Delete />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    enableGlobalFilter: false,
    initialState: {
      expanded: true, //expand all groups by default
      grouping: [], //an array of columns to group by by default (can be multiple)
      pagination: { pageIndex: 0, pageSize: 20 },
    },
    muiTableContainerProps: { sx: { maxHeight: "440px" } },
    muiTableHeadCellProps: {
      //simple styling with the `sx` prop, works just like a style prop in this example
      sx: {
        fontWeight: 'normal',
        fontSize: '14px',
        backgroundColor:"#F0F6FF"
      },
    },

    // MRT_ToolbarDropZoneProps
  });
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
    // <Example/>
    <Stack gap="1rem">
      <Navbar />
      <Stack direction={"column"} paddingX={"14px"}>
        <HeaderBreadcum
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
        {showTable && <MaterialReactTable table={table} />}
      </Stack>
    </Stack>
  );
};

export default PmaBillingTable;
