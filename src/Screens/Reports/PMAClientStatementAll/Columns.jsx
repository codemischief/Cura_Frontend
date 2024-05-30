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
      title: "ID",
      field: "id",
      sorting: true,
      // cellStyle: { minWidth: "20px", },
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15%"  },
    },
    {
      title: "Entity",
      field: "entity",
      sorting: true,
      // cellStyle: { minWidth: "20px", },
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15%"  },
    },
    {
        title: "Client Name",
        field: "clientname",
        sorting: true,
        filterComponent: TextFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15%" },
    },
    {
      title: "Type",
      field: "type",
      sorting: true,
      // cellStyle: { minWidth: "20px", },
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15%"  },
    },
    {
        title: "Date",
        field: "date",
        sorting: true,
        // cellStyle: { minWidth: "20px", },
        filterComponent: DateFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15%"  },
      },
      {
        title: "Amount",
        field: "amount",
        sorting: true,
        // cellStyle: { minWidth: "20px", },
        filterComponent: NumberFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15%"  },
      },
      {
        title: "Order Details",
        field: "orderdetails",
        sorting: true,
        // cellStyle: { minWidth: "20px", },
        filterComponent: TextFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15%"  },
      },
      {
        title: "Lob Name",
        field: "lobname",
        sorting: true,
        // cellStyle: { minWidth: "20px", },
        filterComponent: TextFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15%"  },
      },
      {
        title: "Service",
        field: "service",
        sorting: true,
        // cellStyle: { minWidth: "20px", },
        filterComponent: TextFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15%"  },
      },
      {
        title: "FY",
        field: "fy",
        sorting: true,
        // cellStyle: { minWidth: "20px", },
        filterComponent: TextFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15%"  },
      },
      {
        title: "Mode",
        field: "mode",
        sorting: true,
        // cellStyle: { minWidth: "20px", },
        filterComponent: TextFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15%"  },
      },
  ];
  return columns;
}
