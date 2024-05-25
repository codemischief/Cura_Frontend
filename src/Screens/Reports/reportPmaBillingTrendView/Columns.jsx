import { Stack } from "@mui/material";
import styleConst from "./styleConst";
import {
  DateFilterField,
  NumberFilterField,
  TextFilterField,
} from "./CustomFilterField";

export default function connectionDataColumn(onQuery) {
  const { cellStyleCommon } = styleConst;
  const columns = [
    {
      title: "Sr No",
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "10%" },
      sorting: false,
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
      title: "Client Name",
      field: "clientname",
      sorting: true,
      // cellStyle: { minWidth: "20px", },
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15%"  },
    },
    {
      title: "Jan",
      field: "jan",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15%" },
    },
    {
      title: "Feb",
      field: "feb",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15%" },
    },
    {
      title: "Mar",
      field: "mar",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15%" },
    },
    {
      title: "Apr",
      field: "apr",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15%" },
    },
    {
        title: "May",
        field: "may",
        sorting: true,
        filterComponent: NumberFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15%" },
      },
      {
        title: "Jun",
        field: "jun",
        sorting: true,
        filterComponent: NumberFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15%" },
      },
      {
        title: "Jul",
        field: "jul",
        sorting: true,
        filterComponent: NumberFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15%" },
      },
      {
        title: "Aug",
        field: "aug",
        sorting: true,
        filterComponent: NumberFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15%" },
      },
      {
        title: "Sep",
        field: "sep",
        sorting: true,
        filterComponent: NumberFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15%" },
      },
      {
        title: "Oct",
        field: "oct",
        sorting: true,
        filterComponent: NumberFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15%" },
      },
      {
        title: "Nov",
        field: "nov",
        sorting: true,
        filterComponent: NumberFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15%" },
      },
      {
        title: "Dec",
        field: "dec",
        sorting: true,
        filterComponent: NumberFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15%" },
      },
  ];
  return columns;
}
