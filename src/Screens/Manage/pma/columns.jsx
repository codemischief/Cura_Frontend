import { Chip, Stack } from "@mui/material";
import {
  TextFilterField,
  NumberFilterField,
  DateFilterField,
} from "./CustomFilterField";
import styleConst from "./styleConst";
import { ArrowUpward } from "@mui/icons-material";

export default function connectionDataColumn(onQuery) {
  const { cellStyleCommon } = styleConst;

  const columns = [
    {
      title: "Sr No",
      width: "5%",
      sorting:false,
      render: (rowData) => {
        console.log(rowData,"rowData");
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
      sorting:false,
    },
    {
      title: "Invoice Amount",
      field: "totalamt",
      grouping: true,
      filterComponent: NumberFilterField,
    },
    {
      title: "Total Base Amount",
      field: "totalbaseamt",
      filterComponent: NumberFilterField,
    },

    {
      title: "Tax Amount",
      field: "totaltaxamt",
      filterComponent: NumberFilterField,
    },
    {
      title: "Fixed Amount",
      field: "fixedamt",
      filterComponent: NumberFilterField,
    },
    {
      title: "Fixed Tax Amount",
      field: "fixedtaxamt",
      filterComponent: NumberFilterField,
    },
    {
      title: "Rented Amount",
      field: "rentedamt",
      filterComponent: NumberFilterField,
    },
    {
      title: "Rented Tax Amount",
      field: "rentedtaxamt",
      filterComponent: NumberFilterField,
    },
  ];
  return columns;
}
