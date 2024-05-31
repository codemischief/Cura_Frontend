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
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "5%" },
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
      title: "Name",
      field: "clientname",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "10%" },
    },
    {
      title: "Online Mail ID",
      field: "onlinemailid",
      sorting: true,
      // cellStyle: { minWidth: "20px", },
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "10%" },
    },
    {
      title: "Bank Name",
      field: "bankname",
      sorting: true,
      // cellStyle: { minWidth: "20px", },
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "10%" },
    },
    {
      title: "Bank Branch",
      field: "bankbranch",
      sorting: true,
      // cellStyle: { minWidth: "20px", },
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "10%" },
    },{
      title: "Bank Account Number",
      field: "bankaccountno",
      sorting: true,
      // cellStyle: { minWidth: "20px", },
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "10%" },
    },{
      title: "Bank Account Holder",
      field: "bankaccountholdername",
      sorting: true,
      // cellStyle: { minWidth: "20px", },
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "10%" },
    },{
      title: "Bank City",
      field: "bankcity",
      sorting: true,
      // cellStyle: { minWidth: "20px", },
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width : '10%' },
    },{
      title: "Bank IFSC Holder",
      field: "bankifsccode",
      sorting: true,
      // cellStyle: { minWidth: "20px", },
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width : '10%' },
    },{
      title: "Bank Account Type",
      field: "bankaccounttype",
      sorting: true,
      // cellStyle: { minWidth: "20px", },
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width : '10%' },
    },
  ];
  return columns;
}
