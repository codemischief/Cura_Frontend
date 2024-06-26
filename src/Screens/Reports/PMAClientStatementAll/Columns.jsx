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
      cellStyle: { ...cellStyleCommon,justifyContent: "center",width: "4%" },
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
      title: "ID",
      field: "id",
      sorting: true,
      // cellStyle: { minWidth: "20px", },
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",width: "8.7%"  },
    },
    {
      title: "Entity",
      field: "entity",
      sorting: true,
      // cellStyle: { minWidth: "20px", },
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",width: "8.7%"   },
    },
    {
        title: "Client Name",
        field: "clientname",
        sorting: true,
        filterComponent: TextFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",width: "8.7%"  },
    },
    {
      title: "Type",
      field: "type",
      sorting: true,
      // cellStyle: { minWidth: "20px", },
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",width: "8.7%"   },
    },
    {
        title: "Date",
        field: "date",
        sorting: true,
        // cellStyle: { minWidth: "20px", },
        filterComponent: DateFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",width: "8.7%"   },
      },
      {
        title: "Amount",
        field: "amount",
        sorting: true,
        // cellStyle: { minWidth: "20px", },
        filterComponent: NumberFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",width: "8.7%"   },
      },
      {
        title: "Order Details",
        field: "orderdetails",
        sorting: true,
        // cellStyle: { minWidth: "20px", },
        filterComponent: TextFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",width: "8.7%"   },
      },
      {
        title: "Lob Name",
        field: "lobname",
        sorting: true,
        // cellStyle: { minWidth: "20px", },
        filterComponent: TextFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",width: "8.7%"   },
      },
      {
        title: "Service",
        field: "service",
        sorting: true,
        // cellStyle: { minWidth: "20px", },
        filterComponent: TextFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",width: "8.7%"   },
      },
      {
        title: "FY",
        field: "fy",
        sorting: true,
        // cellStyle: { minWidth: "20px", },
        filterComponent: TextFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",width: "8.7%"   },
      },
      {
        title: "Mode",
        field: "mode",
        sorting: true,
        // cellStyle: { minWidth: "20px", },
        filterComponent: TextFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",width: "8.7%"   },
      },
  ];
  return columns;
}
