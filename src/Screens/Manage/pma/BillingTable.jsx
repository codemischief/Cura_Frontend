import {
  MRT_GlobalFilterTextField,
  MRT_ShowHideColumnsButton,
  MRT_TableContainer,
  MRT_TablePagination,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFiltersButton,
  MRT_ToolbarAlertBanner,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { data } from "./data";
import { Delete, Edit } from "@mui/icons-material";

const BillingTable = () => {
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
      },
      {
        header: "Quote Description",
        accessorKey: "lastName",
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

  const tableData = useMemo(
    () => data.map((d, index) => ({ ...d, id: index + 1 })),
    []
  );
  const [groupedColumnMode, setGroupedColumnMode] = useState("reorder");
  const table = useMaterialReactTable({
    columns,
    data: tableData,
    // data:[],
    enableGrouping: true,
    enableEditing: true,
    enableStickyHeader: true,
    positionActionsColumn: "last",
    groupedColumnMode,
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

    // MRT_ToolbarDropZoneProps
  });

  return (
    <Box sx={{ border: "gray 2px dashed", padding: "16px" }}>
      {/* Our Custom External Top Toolbar */}
      <Box
        sx={(theme) => ({
          display: "flex",
          backgroundColor: "inherit",
          borderRadius: "4px",
          flexDirection: "row",
          gap: "16px",
          justifyContent: "space-between",
          padding: "24px 16px",
          "@media max-width: 768px": {
            flexDirection: "column",
          },
        })}
      >
        {/* <Box>
          <Button
            color="primary"
            onClick={() => {
              alert("Add User");
            }}
            variant="contained"
          >
            Create New Account
          </Button>
        </Box> */}
        <MRT_GlobalFilterTextField table={table} />
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <MRT_ToggleFiltersButton table={table} />
          <MRT_ShowHideColumnsButton table={table} />
          <MRT_ToggleDensePaddingButton table={table} />
          {/* <Tooltip title="Print">
          <IconButton onClick={() => window.print()}>
            <PrintIcon />
          </IconButton>
        </Tooltip> */}
        </Box>
      </Box>
      {/* Some Page Content */}
      {/* <Typography p="16px 4px">
        {
          "Hey I'm some page content. I'm just one of your normal components between your custom toolbar and the MRT Table below"
        }
      </Typography> */}
      {/* The MRT Table with no toolbars built-in */}
      <MRT_TableContainer table={table} />
      {/* Our Custom Bottom Toolbar */}
      <Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <MRT_TablePagination table={table} />
        </Box>
        <Box sx={{ display: "grid", width: "100%" }}>
          <MRT_ToolbarAlertBanner stackAlertBanner table={table} />
        </Box>
      </Box>
    </Box>
  );
};

export default BillingTable;
