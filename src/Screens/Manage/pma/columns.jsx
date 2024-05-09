import { Chip, Stack } from "@mui/material";
import {
  TextFilterField,
  NumberFilterField,
  DateFilterField,
} from "./CustomFilterField";
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
            {rowData?.tableData.index + 1}
          </Stack>
        );
      },
    },
    {
      filterComponent: TextFilterField,
      title: "Client Name",
      field: "clientname",
      cellStyle: { ...cellStyleCommon, minWidth: 80 },
    },
    {
      filterComponent: TextFilterField,
      title: "Quote Description",
      field: "briefdescription",
      width: "20%",
    },
    {
      title: "Invoice Date",
      field: "invoicedate",

      filterComponent: DateFilterField,
      sorting: false,
    },
    {
      title: "Invoice Amount",
      field: "totalamt",
      type: "numeric",
      grouping: true,
      filterComponent: NumberFilterField,
    },
    {
      title: "Total Base Amount",
      field: "totalbaseamt",
      type: "numeric",
      filterComponent: NumberFilterField,
    },

    {
      title: "Tax Amount",
      field: "totaltaxamt",
      type: "numeric",
      filterComponent: NumberFilterField,
    },
    {
      title: "Fixed Amount",
      field: "fixedamt",
      type: "numeric",
      filterComponent: NumberFilterField,
    },
    {
      title: "Fixed Tax Amount",
      field: "fixedtaxamt",
      type: "numeric",
      filterComponent: NumberFilterField,
    },
    {
      title: "Rented Amount",
      field: "rentedamt",
      type: "numeric",
      filterComponent: NumberFilterField,
    },
    {
      title: "Rented Tax Amount",
      field: "rentedtaxamt",
      type: "numeric",
      filterComponent: NumberFilterField,
    },
  ];
  return columns;
}
