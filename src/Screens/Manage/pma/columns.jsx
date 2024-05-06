import { Chip, Stack } from "@mui/material";
import { TextFilterField, NumberFilterField } from "./CustomFilterField";
import styleConst from "./styleConst";
import { useDispatch, useSelector } from "react-redux";
import { ArrowUpward } from "@mui/icons-material";

export function CustomSorting(props) {
  console.log(props,"props");
  return [
    <ArrowUpward  fontSize="small" />,
  ]
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
      filterComponent: TextFilterField,
      // customFilterAndSearch: (term, rowData) => filterQuery(term, rowData.connectionName),
    },
    {
      title: "Invoice Amount",
      field: "totalamt",
      grouping: true,
      lookup: "totalamt",
      filterComponent: TextFilterField,
    },
    {
      title: "Total Base Amount",
      field: "totalbaseamt",
      filterComponent: TextFilterField,
    },

    {
      title: "Tax Amount",
      field: "totaltaxamt",
      filterComponent: TextFilterField,
    },
    {
      title: "Fixed Amount",
      field: "fixedamt",
      filterComponent: TextFilterField,
    },
    {
      title: "Fixed Tax Amount",
      field: "userName",
      filterComponent: TextFilterField,
      render: (rowData) => {
        return (
          <Stack direction="row" spacing={0.5}>
            {rowData.fixedtaxamt}
          </Stack>
        );
      },
    },
    {
      title: "Rented Amount",
      field: "rentedamt",
      filterComponent: TextFilterField,
    },
    {
      title: "Rented Tax Amount",
      field: "fixedtaxamt",
      filterComponent: TextFilterField,
    },
  ];
  return columns;
}
