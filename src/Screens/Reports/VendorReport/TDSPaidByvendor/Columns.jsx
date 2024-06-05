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
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "5rem",
      },
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
      title: "Vendor Name",
      field: "vendorname",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "9.813rem",
        minWidth: "14.813rem",

      },
    },
    {
      title: "Vendor Category",
      field: "vendorcategory",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "6rem",
        maxWidth:"11rem"
      },
    },
    {
      title: "Payment Mode",
      field: "paymentmode",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "6rem",
        maxWidth: "9rem",

      },
    },
    {
      title: "Registered",
      field: "registered",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "3rem",
        maxWidth: "8rem",

      },
    },
    {
      title: "TDS",
      field: "tds",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "5.063rem",
        maxWidth:"8rem"
      },
    },
    {
      title: "PAN No",
      field: "panno",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "5.063rem",
        maxWidth:"8.3rem"

      },
    },
    {
      title: "TDS Section",
      field: "tdssection",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "5.063rem",
        maxWidth: "8rem",

      },
    },
    {
      title: "Amount",
      field: "amount",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "6.063rem",
        maxWidth: "9rem",
      },
    },
    {
      title: "Payment Date",
      field: "paymentdate",
      sorting: true,
      filterComponent: DateFilterField,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "5.063rem",
        maxWidth: "11rem",
      },
    },
    {
      title: "Month Year",
      field: "monthyear",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "5.063rem",
        maxWidth: "11rem",
      },
    },
    {
      title: "Company Deductee",
      field: "companydeductee",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "5.063rem",
        maxWidth: "8rem",
      },
    },
    
  ];
  return columns;
}
