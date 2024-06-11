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
        minWidth: "8rem",
      },
    },
    {
      title: "Mode of Payment",
      field: "mode_of_payment",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "8rem",
        maxWidth:"11rem"
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
        minWidth: "8rem",
        maxWidth: "9rem",

      },
    },
    {
      title: "VAT Tin No",
      field: "vattinno",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "8rem",
        maxWidth: "9rem",

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
        minWidth: "8rem",
        maxWidth: "9rem",

      },
    },
    
   
    {
      title: "Service Tax No.",
      field: "gstservicetaxno",
      
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "8rem",
        maxWidth:"11rem"

      },
    },
    {
      title: "Total Payment",
      field: "amount",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "8rem",
        maxWidth: "7rem",

      },
    },
    {
      title: "Total TDS",
      field: "tds",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "8rem",
        maxWidth: "9rem",
      },
    },
    {
      title: "Total Service Tax",
      field: "servicetaxamount",

      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "8rem",
        maxWidth: "11rem",
      },
    },
  ];
  return columns;
}
