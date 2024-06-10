import { Stack } from "@mui/material";

import styleConst from "./styleConst";
import {
  DateFilterField,
  NumberFilterField,
  TextFilterField,
} from "./CustomFilterField";

export default function connectionDataColumn() {
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
            sx={{ justifyContent: "center", width: "50px" }}
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
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "8rem",maxWidth: "9rem" },
    },
    {
      filterComponent: NumberFilterField,
      title: "Id",
      field: "id",
      filterDisabled: false,
      sorting: true,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "8rem",maxWidth: "9rem" },
    },
    {
      title: "Start Date",
      field: "startdate",
      sorting: true,
      filterComponent: DateFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "8rem",maxWidth: "9rem" },
    },
    {
      title: "End Date",
      field: "actualenddate",
      sorting: true,
      filterComponent: DateFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "8rem",maxWidth: "9rem" },
    },
    {
      title: "StartDate Fiscal Month",
      field: "startdatemonthyear",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "11rem",maxWidth: "14rem" },
    },

    {
      
      title: "EndDate Fiscal Month",
      field:"enddatemonthyear",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "11rem",maxWidth: "14rem" },
    },
    {
      title: "Rent",
      field: "rentamount",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "8rem",maxWidth: "12rem" },
    },
    {
      title: "Deposit",
      field: "depositamount",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "8rem",maxWidth: "10rem" },
    },
    {
      title: "Entity",
      field: "entityname",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "8rem",maxWidth: "9rem" },
    },
    {
      title: "Client ID",
      field: "clientid",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "8rem",maxWidth: "9rem" },
    },
    {
      title: "Client Name",
      field: "clienttypename",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "8rem",maxWidth: "9rem" },
    },
    {
      title: "Property Description",
      field: "propertydescription",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "18rem",maxWidth: "20rem" },
    },
    {
      title: "Property Status",
      field: "property_status",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "8rem" },
    },
    {
      title: "Status",
      field: "status",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "8rem" },
    },
    {
      title: "Registration Type",
      field: "registrationtype",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "8rem" },
    },
    {
      title: "Payment Cycle",
      field: "paymentcycle",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "8rem" },
    },
    {
      title: "Notice Period In Days",
      field: "noticeperiodindays",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "12rem" },
    },
   
    {
      title: "Client Type",
      field: "totalinvoiceamt",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "8rem" },
    }
   
   
  ];
  return columns;
}
