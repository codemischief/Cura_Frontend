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
      cellStyle: { ...cellStyleCommon},
      render: (rowData) => {
        return (
          <Stack
            direction="row"
            sx={{ justifyContent: "center", width: "30px" }}
          >
            {console.log(rowData)}
            {rowData + 1}
            {/* {rowData?.tableData?.index + 1} */}
          </Stack>
        );
      },
    },
    {
      filterComponent: TextFilterField,
      title: "Client Name",
      field: "clientname",
      cellStyle: { ...cellStyleCommon, minWidth: 80 },
      sorting : true
    },
    {
      filterComponent: TextFilterField,
      title: "Quote Description",
      field: "briefdescription",
      width: "20%",
      cellStyle: { ...cellStyleCommon, minWidth: 80 },
      sorting : true
    },
    {
      title: "Invoice Date",
      field: "invoicedate",
      cellStyle: { ...cellStyleCommon, minWidth: 80 },
      sorting: false,
    },
    {
      title: "Invoice Amount",
      field: "totalamt",
      type: "numeric",
      // grouping: true,
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon, minWidth: 80 },
      sorting : true
    },
    {
      title: "Total Base Amount",
      field: "totalbaseamt",
      type: "numeric",
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon, minWidth: 80 },
      sorting : true
    },

    {
      title: "Tax Amount",
      field: "totaltaxamt",
      type: "numeric",
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon, minWidth: 80 },
      sorting : true
    },
    {
      title: "Fixed Amount",
      field: "fixedamt",
      type: "numeric",
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon, minWidth: 80 },
      sorting : true
    },
    {
      title: "Fixed Tax Amount",
      field: "fixedtaxamt",
      type: "numeric",
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon, minWidth: 80 },
      sorting : true
    },
    {
      title: "Rented Amount",
      field: "rentedamt",
      type: "numeric",
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon, minWidth: 80 },
      sorting : true
    },
    {
      title: "Rented Tax Amount",
      field: "rentedtaxamt",
      type: "numeric",
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon, minWidth: 80 },
      sorting : true
    },
  ];
  return columns;
}
