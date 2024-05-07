import React, { useState } from "react";
import { Tooltip, Popover, MenuItem } from "@mui/material";
import { Close, FilterAlt } from "@mui/icons-material";

import {
  characterFilterData,
  dateFilterData,
  numericFilterData,
} from "../../../Components/Filters/data";
import { useDispatch } from "react-redux";
import { setFilters } from "../../../Redux/slice/pmaSlice";
import { useSelector } from "react-redux";

export function clearFilterAll(noOfColumns, tableRef) {
  // i is column id which is assigned by Material Table;
  for (let i = 0; i < noOfColumns; i++) {
    tableRef.current.onFilterChange(i, "");
  }
}

export function TextFilterField(props) {
  return <FilterField {...props} type="text" />;
}

export function NumberFilterField(props) {
  return <FilterField {...props} type="number" />;
}
export function DateFilterField(props) {
  return <FilterField {...props} type="date" />;
}

const FilterField = (props) => {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.pmaBilling);
  const { columnDef, onFilterChanged, type } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [search, setSearch] = useState("");
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const optionType = {
    text: characterFilterData,
    number: numericFilterData,
    date: dateFilterData,
  };
  const handleFilter = (filter) => {
    if (search) {
      let filterType = {
        text: "String",
        number: "Numeric",
        date: "Date",
      };
      let queryType = type === "number" ? Number(search) : search;
      const query = [[columnDef.field, filter, queryType, filterType[type]]]
      dispatch(setFilters(query));
    }
    handleClose();
  };
  const handleResetFilter = () => {
    setSearch("");
    if (filter.length > 0) dispatch(setFilters([]));
  };
  return (
    <>
      <div className="w-fit  p-3">
        <div className="w-[100%] flex items-center bg-[#F5F5F5] rounded-md">
          <input
            className="w-[68%] bg-[#F5F5F5] rounded-md text-xs pl-2 outline-none"
            type={type}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <Close
              sx={{
                height: "12px",
                w: "12px",
                color: "#C6C6C6",
                cursor: "pointer",
              }}
              onClick={handleResetFilter}
            />
          )}
          <Tooltip title="Filters">
            <button className="w-[32%] px-1 py-2" onClick={handleClick}>
              <FilterAlt
                sx={{ height: "16px", w: "16px", color: "#C6C6C6" }}
                color="#C6C6C6"
              />
            </button>
          </Tooltip>
        </div>
      </div>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {optionType[type]?.map((option) => (
          <MenuItem key={option.key} onClick={() => handleFilter(option.key)}>
            {option.title}
          </MenuItem>
        ))}
      </Popover>
    </>
  );
};
