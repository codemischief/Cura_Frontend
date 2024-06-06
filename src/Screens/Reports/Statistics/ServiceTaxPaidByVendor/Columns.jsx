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
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "4%" },
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
      title: "Vendor Name",
      field: "vendorname",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "12%" },
    },
    {
      title: "Service Type",
      field: "vendorcategory",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "12%" },
    },
    {
      title: "Service Tax Amount",
      field: "servicetaxamount",
      sorting: true,
      // cellStyle: { width: "20px", },
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "12%" },
    },
    {
      title: "Amount",
      field: "amount",
      sorting: true,
      // cellStyle: { width: "20px", },
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "12%" },
    },
    {
      title: "Payment Mode",
      field: "paymentmode",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "12%" },
    },
    {
      title: "Registered",
      field: "registered",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "12%" },
    },
    {
      title: "Payment Date",
      field: "paymentdate",
      sorting: true,
      filterComponent: DateFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "12%" },
    },
    {
      title: "Month Year",
      field: "monthyear",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "12%" },
    },
  ];
  return columns;
}
