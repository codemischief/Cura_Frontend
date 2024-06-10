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
      title: "Username",
      field: "username",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "12rem",
        maxWidth: "20.813rem",

      },
    },
    {
      title: "User Status",
      field: "userstatus",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "20rem",
        maxWidth: "20.813rem",

      },
      render: (index, row) => {

        return (

          <Stack
            direction="row"
            sx={{ justifyContent: "start", width: "12rem" }}
          >
            {row['userstatus'] === "Inactive" ? (
              <div className="flex justify-center items-center gap-2">
                <FiberManualRecordIcon sx={{ width: "10px", height: "10px", color: "red", fill: "red" }} />
                {row['userstatus']}
              </div>
            ) : (
              <div className="flex justify-center items-center gap-2">
                <FiberManualRecordIcon sx={{ width: "10px", height: "10px", color: "red", fill: "green" }} />
                {row['userstatus']}
              </div>
            )}

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
        maxWidth: "20rem",
      },
    },
  ];
  return columns;
}
