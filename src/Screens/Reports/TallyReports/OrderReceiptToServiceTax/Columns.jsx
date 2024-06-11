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
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "3rem" ,maxWidth:"5rem"},
      render: (index) => {
        return (
          <Stack
            direction="row"
            sx={{ justifyContent: "center", width: "20px" }}
          >
            {index + 1}
          </Stack>
        );
      },
    },
    {
      title: "Unique ID",
      field: "uniqueid",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "6rem" ,maxWidth:"9rem"  },
    },
    {
      title: "Base-Vch-Type",
      field: "base_vch_type",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "6rem" ,maxWidth:"9rem" },
    },
    {
      title: "Voucher Type",
      field: "vch_type",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "6rem" ,maxWidth:"9rem" },
    },
    {
      title: "Voucher Number",
      field: "vch_no",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "6rem" ,maxWidth:"13rem" },
    },
    {
      title: "Voucher Date",
      field: "vch_date",
      sorting: true,
      filterComponent: DateFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "6rem" ,maxWidth:"10.5rem" },
    },
    {
        title: "Ref No.",
        field: "ref_no",
        sorting: true,
        filterComponent: TextFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "6rem" ,maxWidth:"9rem" },
      },
      {
        title: "Ref Date",
        field: "ref_date",
        sorting: true,
        filterComponent: TextFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "6rem" ,maxWidth:"10.2rem" },
      },

      {
        title: "Party",
        field: "party",
        sorting: true,
        filterComponent: TextFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "6rem" ,maxWidth:"12rem" },
      },
      {
        title: "GTSIN",
        field: "gstin",
        sorting: true,
        filterComponent: TextFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "6rem" ,maxWidth:"9rem" },
      },
      {
        title: "State",
        field: "state",
        sorting: true,
        filterComponent: TextFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "6rem" ,maxWidth:"9rem" },
      },
      {
        title: "Item Name",
        field: "item_name",
        sorting: true,
        filterComponent: TextFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "6rem" ,maxWidth:"9rem" },
      },
      {
        title: "HSN Code",
        field: "item_hsn_code",
        sorting: true,
        filterComponent: TextFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "6rem" ,maxWidth:"9rem" },
      },
      {
        title: "Units",
        field: "item_units",
        sorting: true,
        filterComponent: TextFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "6rem" ,maxWidth:"9rem" },
      },
      {
        title: "Qty",
        field: "item_qty",
        sorting: true,
        filterComponent: TextFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "6rem" ,maxWidth:"9rem" },
      },
      {
        title: "Rate",
        field: "item_rate",
        sorting: true,
        filterComponent: TextFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "6rem" ,maxWidth:"9rem" },
      },
      {
        title: "Disc (%)",
        field: "item_discountpercentage",
        sorting: true,
        filterComponent: TextFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "6rem" ,maxWidth:"9rem" },
      }
  ];
  return columns;
}
