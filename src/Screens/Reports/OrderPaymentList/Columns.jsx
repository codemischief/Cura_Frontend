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
      filterDisabled: true,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "150px" },
      
    },
    {
      filterComponent: DateFilterField,

      title: "Payment Date",
      field: "paymentdate",
      filterDisabled: false,
      sorting: true,
      cellStyle: { ...cellStyleCommon, justifyContent: "center",minWidth: "150px" },
      
    },
    {
      title: "Fiscal Month",
      field: "monthyear",
      sorting: true,
      filterComponent: DateFilterField, 

      cellStyle: { ...cellStyleCommon, justifyContent: "center",minWidth: "150px" },    
      
    },
    {
      title: "Fiscal Year",
      field: "fy",
      sorting: true,
      type: "numeric",
      cellStyle: { ...cellStyleCommon, justifyContent: "center",minWidth: "150px" },
      filterComponent: NumberFilterField,
    },
    {
      title: "Amount",
      field: "amount",
      type: "numeric",
      sorting: true,
      cellStyle: { ...cellStyleCommon, justifyContent: "center",minWidth: "150px" },

      filterComponent: NumberFilterField,
      
    },

    {
      title: "Entity",
      field: "entityname",
      type: "numeric",
      sorting: true,
      cellStyle: { ...cellStyleCommon, justifyContent: "center",minWidth: "150px" },
      filterComponent: NumberFilterField,
    },
    {
      title: "Mode",
      field: "mode_of_payment",
      type: "numeric",
      sorting: true,
      cellStyle: { ...cellStyleCommon, justifyContent: "center",minWidth: "150px" },
      filterComponent: NumberFilterField,
     
    },
    {
      title: "Client ID",
      field: "clientid",
      type: "numeric",
      sorting: true,
      cellStyle: { ...cellStyleCommon, justifyContent: "center",minWidth: "150px" },
      filterComponent: NumberFilterField,
      
    },
    {
      title: "Client Name",
      field: "clientname",
      sorting: true,
      cellStyle: { ...cellStyleCommon, justifyContent: "center",minWidth: "150px" },
      type: "numeric",
      filterComponent: NumberFilterField,
     
    },
    // {
    //   title: "Vendor Name",
    //   field: "vendorname",
    //   sorting: true,
    //   cellStyle: { ...cellStyleCommon, justifyContent: "center", minWidth: "200px"},
    //   type: "numeric",
    //   filterComponent: NumberFilterField,
     
    //   sorting: true,
    // },
    {
      title: "Order Id",
      field: "orderid",
      sorting: true,
      cellStyle: { ...cellStyleCommon, justifyContent: "center",minWidth: "150px" },
      type: "numeric",
      filterComponent: NumberFilterField,
    },
    {
      title: "Service Id",
      field: "serviceid",
      type: "numeric",
      sorting: true,
      cellStyle: { ...cellStyleCommon, justifyContent: "center",minWidth: "150px" },
      filterComponent: NumberFilterField,
    },
    {
      title: "Service ",
      field: "service",
      sorting: true,
      type: "numeric",
      cellStyle: { ...cellStyleCommon, justifyContent: "center",minWidth: "150px" },

      filterComponent: NumberFilterField
    },
    {
      title: "LOB Name",
      field: "lobname",
      sorting: true,
      cellStyle: { ...cellStyleCommon, justifyContent: "center",minWidth: "150px" },
      type: "numeric",
      filterComponent: NumberFilterField,
      
    }
  ];
  return columns;
}
