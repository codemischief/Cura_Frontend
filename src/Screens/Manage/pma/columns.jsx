import { Chip, Stack } from "@mui/material";
import {
  TextFilterField,
  NumberFilterField,
  DateFilterField,
} from "./CustomFilterField";
import styleConst from "./styleConst";
import { useDispatch, useSelector } from "react-redux";
import { ArrowUpward } from "@mui/icons-material";

export function CustomSorting(props) {
  console.log(props, "props");
  return [<ArrowUpward fontSize="small" />];
}

export default function connectionDataColumn(onQuery) {
  const { cellStyleCommon } = styleConst;

  const columns = [
    {
      // filterComponent: TextFilterField,
      title: "Sr No",
      render: (rowData) => {
        // while grouping rowData will be just value not object
        return (
          <Stack direction="row" spacing={0.5}>
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
    },
    {
      title: "Invoice Date",
      field: "invoicedate",
      filterComponent: DateFilterField,
      // customFilterAndSearch: (term, rowData) => filterQuery(term, rowData.connectionName),
    },
    {
      title: "Invoice Amount",
      field: "totalamt",
      grouping: true,
      // lookup: "totalamt",
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
