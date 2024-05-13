import { Chip, Stack } from "@mui/material";

import {
  DateFilterField,
  NumberFilterField,
  TextFilterField,
} from "../../Manage/pma/CustomFilterField";
import styleConst from "./styleConst";

export default function connectionDataColumn(onQuery) {
  const { cellStyleCommon } = styleConst;

  const columns = [
    {
      title: "Sr No",
      width: "5%",
      sorting: false,
      render: (rowData) => {
        return (
          <Stack
            direction="row"
            sx={{ justifyContent: "center", width: "30px" }}
          >
            1{/* {rowData?.tableData.index + 1} */}
          </Stack>
        );
      },
    },
    {
      filterComponent: TextFilterField,
      title: "Type",
      field: "clientname",
      cellStyle: { ...cellStyleCommon, minWidth: 80 },
      width: "10%",
    },
    {
      filterComponent: TextFilterField,
      title: "payment date",
      field: "briefdescription",
      width: "20%",
    },
    {
      title: "Fiscal Month",
      field: "invoicedate",

      filterComponent: DateFilterField,
      sorting: false,
      width: "10%",
    },
    {
      title: "Fiscal Year",
      field: "totalamt",
      type: "numeric",
      grouping: true,
      filterComponent: NumberFilterField,
      width: "8%",
    },
    {
      title: "Amount",
      field: "totalbaseamt",
      type: "numeric",
      filterComponent: NumberFilterField,
      width: "8%",
    },

    {
      title: "Entity",
      field: "totaltaxamt",
      type: "numeric",
      filterComponent: NumberFilterField,
      width: "8%",
    },
    {
      title: "Mode",
      field: "fixedamt",
      type: "numeric",
      filterComponent: NumberFilterField,
      width: "8%",
    },
    {
      title: "Client ID",
      field: "fixedtaxamt",
      type: "numeric",
      filterComponent: NumberFilterField,
      width: "8%",
    },
    {
      title: "Rented Amount",
      field: "rentedamt",
      type: "numeric",
      filterComponent: NumberFilterField,
      width: "8%",
    },
    {
      title: "Client Name",
      field: "rentedtaxamt",
      type: "numeric",
      filterComponent: NumberFilterField,
      width: "8%",
    },
  ];
  return columns;
}
