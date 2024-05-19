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
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "50px" },
      sorting: false,
      render: (index) => {
        return (
          <Stack
            direction="row"
            sx={{ justifyContent: "center", minWidth: "50px" }}
          >
            {index + 1}
          </Stack>
        );
      },
    },
    {
      // filterComponent: TextFilterField,
      title: "Type",
      field: "type",
      sorting: false,
      
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "150px" },
      
    },
    {
      filterComponent: NumberFilterField,
      title: "ID",
      field: "id",
      sorting: true,
      cellStyle: { ...cellStyleCommon, justifyContent: "center",minWidth: "150px" },
      
    },
    {
      title: "Invoice Date",
      field: "invoicedate",
      sorting: true,
      filterComponent: DateFilterField, 
      cellStyle: { ...cellStyleCommon, justifyContent: "center",minWidth: "150px" },    
    },
    {
      title: "Fiscal Month",
      field: "monthyear",
      sorting: true,
      filterComponent: TextFilterField, 
      cellStyle: { ...cellStyleCommon, justifyContent: "center",minWidth: "150px" },    
    },
    {
      title: "Fiscal Year",
      field: "fy",
      sorting: true,
      cellStyle: { ...cellStyleCommon, justifyContent: "center",minWidth: "150px" },
      filterComponent: TextFilterField,
    },
    {
      title: "Amount",
      field: "invoiceamount",
      sorting: true,
      cellStyle: { ...cellStyleCommon, justifyContent: "center",minWidth: "150px" },
      filterComponent: NumberFilterField,
      
    },
    {
      title: "Entity",
      field: "entityname",
      sorting: true,
      cellStyle: { ...cellStyleCommon, justifyContent: "center",minWidth: "150px" },
      filterComponent: TextFilterField,
    },
    {
      title: "Mode",
      field: "mode",
      sorting: true,
      cellStyle: { ...cellStyleCommon, justifyContent: "center",minWidth: "150px" },
      filterComponent: TextFilterField,
     
    },
    {
      title: "Client ID",
      field: "clientid",
      sorting: true,
      cellStyle: { ...cellStyleCommon, justifyContent: "center",minWidth: "150px" },
      filterComponent: NumberFilterField,
      
    },
    {
      title: "Client Name",
      field: "clientname",
      sorting: true,
      cellStyle: { ...cellStyleCommon, justifyContent: "center",minWidth: "150px" },
      filterComponent: TextFilterField,
     
    },
    {
      title: "Vendor Name",
      field: "vendorname",
      sorting: true,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", minWidth: "200px"},
      filterComponent: TextFilterField,
      sorting: true,
    },
    {
      title: "Order Id",
      field: "orderid",
      sorting: true,
      cellStyle: { ...cellStyleCommon, justifyContent: "center",minWidth: "150px" },
      filterComponent: NumberFilterField,
    },
    {
      title: "Order Description",
      field: "orderdescription",
      sorting: true,
      cellStyle: { ...cellStyleCommon, justifyContent: "center",minWidth: "150px" },
      filterComponent: TextFilterField,
    },
    {
      title: "Service Id",
      field: "serviceid",
      sorting: true,
      cellStyle: { ...cellStyleCommon, justifyContent: "center",minWidth: "150px" },
      filterComponent: NumberFilterField,
    },
    {
      title: "Service ",
      field: "service",
      sorting: true,
      cellStyle: { ...cellStyleCommon, justifyContent: "center",minWidth: "150px" },
      filterComponent: TextFilterField
    },
    {
      title: "LOB Name",
      field: "lobname",
      sorting: true,
      cellStyle: { ...cellStyleCommon, justifyContent: "center",minWidth: "150px" },
      filterComponent: TextFilterField,
    }
  ];
  return columns;
}
