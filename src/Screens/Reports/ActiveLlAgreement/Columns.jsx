import { Stack } from "@mui/material";
import styleConst from "./styleConst";
import {
  DateFilterField,
  NumberFilterField,
  TextFilterField,
} from "./CustomFilterField";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

export default function connectionDataColumn(onQuery) {
  const { cellStyleCommon } = styleConst;
  const columns = [
    {
      title: "Sr No",
      cellStyle: { ...cellStyleCommon, justifyContent: "center", minWidth: "2rem", maxWidth: "3rem" },
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
      cellStyle: { ...cellStyleCommon, justifyContent: "center", minWidth: "6rem", maxWidth: "8rem" },
    },
    {
      title: "Property Description",
      field: "propertydescription",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", minWidth: "17rem", maxWidth: "21rem" },

    },
    {
      title: "Start Date",
      field: "startdate",
      sorting: true,
      filterComponent: DateFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", minWidth: "5rem", maxWidth: "8rem" },

    },
    {
      title: "End Date",
      field: "actualenddate",
      sorting: true,
      filterComponent: DateFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", minWidth: "7rem", maxWidth: "12rem" },

    },
    {
      title: "Status",
      // field: "status",
      sorting: true,
      render: (index, row) => {

        return (

          <Stack
            direction="row"
            sx={{ justifyContent: "start", width: "12rem" }}
          >
            {row['status'] === "Inactive" ? (
              <div className="flex justify-center items-center gap-2">
                <FiberManualRecordIcon sx={{ width: "10px", height: "10px", color: "red", fill: "red" }} />
                {row['status']}
              </div>
            ) : (
              <div className="flex justify-center items-center gap-2">
                <FiberManualRecordIcon sx={{ width: "10px", height: "10px", color: "red", fill: "green" }} />
                {row['status']}
              </div>
            )}

          </Stack>
        );
      },
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", minWidth: "6rem", maxWidth: "12rem" },
    },
    {
      title: "Start Month-Year",
      field: "startdatemonthyear",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", minWidth: "6rem", maxWidth: "12rem" },
    },
    {
      title: "End Month-Year",
      field: "enddatemonthyear",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", minWidth: "6rem", maxWidth: "12rem" },
    },
    {
      title: "Order Status",
      field: "orderstatus",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", minWidth: "6rem", maxWidth: "12rem" },
    },
    {
      title: "Deposit Amount",
      field: "depositamount",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", minWidth: "7rem", maxWidth: "9rem" },
    },
    {
      title: "Rent Amount",
      field: "rentamount",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", minWidth: "7rem", maxWidth: "9rem" },
    }
  ];
  return columns;
}
