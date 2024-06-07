import { Stack } from "@mui/material";
import styleConst from "./styleConst";
import {
  NumberFilterField,
  TextFilterField,
} from "./CustomFilterField";

export default function connectionDataColumn(onQuery) {
  const { cellStyleCommon } = styleConst;
  const columns = [
    {
      title: "Sr No",
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "0.5rem",maxWidth:"3rem" },
      render: (index) => {
        return (
          <Stack
            direction="row"
            sx={{ justifyContent: "center", width: "50px" }}
          >
            {index + 1}
          </Stack>
        );
      },
    },
    {
      title: "Service",
      field: "service",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "2rem",maxWidth:"6rem"},
    },
    {
      title: "On Hold",
      field: "on_hold",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "2rem",maxWidth:"6rem"},

    },
    {
      title: "Estimate Given",
      field: "estimate_given",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "2rem",maxWidth:"6rem"},

    },
    {
      title: "Cancelled",
      field: "cancelled",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "2rem",maxWidth:"6rem" },

    },
    {
      title: "Closed",
      field: "closed",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "2rem",maxWidth:"6rem"},
    },
    {
        title: "Billed",
        field: "billed",
        sorting: true,
        filterComponent: NumberFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "2rem",maxWidth:"6rem" },
      },
      {
        title: "Inquiry",
        field: "inquiry",
        sorting: true,
        filterComponent: NumberFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "2rem",maxWidth:"8rem" },
      },
      {
        title: "Completed",
        field: "completed",
        sorting: true,
        filterComponent: NumberFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "2rem",maxWidth:"6rem"},
      },
      {
        title: "in_progress",
        field: "narration",
        sorting: true,
        filterComponent: NumberFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "2rem",maxWidth:"8rem" },
      }
  ];
  return columns;
}
