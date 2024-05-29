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
      cellStyle: { ...cellStyleCommon, justifyContent: "center", minWidth: "10%" },
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
      cellStyle: { ...cellStyleCommon, justifyContent: "center", minWidth: "15%" },
    },
    {
      title: "Property Description",
      field: "propertydescription",
      sorting: true,
      // cellStyle: { minWidth: "20px", },
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", minWidth: "25%" },
    },
    {
      title: "Care Taking Description",
      field: "description",
      sorting: true,
      // cellStyle: { minWidth: "20px", },
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", minWidth: "15%" },
    },
    {
      title: "Property Status",
      field: "propertystatus",
      sorting: true,
      // cellStyle: { minWidth: "20px", },
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", minWidth: "15%" },
    },
    {
      title: "Electricity Billing Unit",
      field: "electricitybillingunit",
      sorting: true,
      // cellStyle: { minWidth: "20px", },
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", minWidth: "15%" },
    },
    {
      title: "Property Tax Number",
      field: "propertytaxnumber",
      sorting: true,
      // cellStyle: { minWidth: "20px", },
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", minWidth: "15%" },
    },
    {
      title: "Rent",
      field: "rentamount",
      sorting: true,
      // cellStyle: { minWidth: "20px", },
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", minWidth: "15%" },
    },
    {
      title: "PMA Start Date",
      field: "startdate",
      sorting: true,
      // cellStyle: { minWidth: "20px", },
      filterComponent: DateFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", minWidth: "15%" },
    },
    {
      title: "PMA End Date",
      field: "enddate",
      sorting: true,
      // cellStyle: { minWidth: "20px", },
      filterComponent: DateFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", minWidth: "15%" },
    },
    {
      title: "LnL Start Date",
      field: "lnlstartdate",
      sorting: true,
      // cellStyle: { minWidth: "20px", },
      filterComponent: DateFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", minWidth: "15%" },
    },
    {
      title: "LnL End Date",
      field: "lnlenddate",
      sorting: true,
      // cellStyle: { minWidth: "20px", },
      filterComponent: DateFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", minWidth: "15%" },
    },
    {
      title: "POA Start Date",
      field: "poastartdate",
      sorting: true,
      // cellStyle: { minWidth: "20px", },
      filterComponent: DateFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", minWidth: "15%" },
    },

  ];
  return columns;
}
