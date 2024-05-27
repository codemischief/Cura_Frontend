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
        filterComponent: TextFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15%" },
    },
    {
      title: "Order Descriptions",
      field: "orderdescription",
      sorting: true,
      // cellStyle: { minWidth: "20px", },
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15%"  },
    },
    {
        title: "Invoice Date",
        field: "invoicedate",
        sorting: true,
        // cellStyle: { minWidth: "20px", },
        filterComponent: DateFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15%"  },
      },
      {
        title: "Base Amount",
        field: "baseamount",
        sorting: true,
        // cellStyle: { minWidth: "20px", },
        filterComponent: NumberFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15%"  },
      },
      {
        title: "Tax",
        field: "tax",
        sorting: true,
        // cellStyle: { minWidth: "20px", },
        filterComponent: NumberFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15%"  },
      },
      {
        title: "Invoice Amount",
        field: "invoiceamount",
        sorting: true,
        // cellStyle: { minWidth: "20px", },
        filterComponent: NumberFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15%"  },
      },
      {
        title: "Entity Name",
        field: "entityname",
        sorting: true,
        // cellStyle: { minWidth: "20px", },
        filterComponent: TextFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15%"  },
      },
      
  ];
  return columns;
}
