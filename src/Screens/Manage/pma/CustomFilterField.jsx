import React, { useEffect, useState } from "react";
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

  const handleFilter = (filters) => {
    if (search) {
      let filterType = {
        text: "String",
        number: "Numeric",
        date: "Date",
      };
      let queryType = type === "number" ? Number(search) : search;
      if (filters === "noFilter") {
        const prevFilters = { ...filter };
        delete prevFilters[columnDef.field];
        dispatch(setFilters(prevFilters));
        setSearch("");
      } else {
        const prevFilters = { ...filter };
        prevFilters[columnDef.field] = [filters, queryType, filterType[type]];
        dispatch(setFilters({ ...prevFilters }));
      }
    }
    handleClose();
  };

  const handleResetFilter = () => {
    setSearch("");
    if (filter.hasOwnProperty([columnDef.field])) {
      const prevFilters = { ...filter };
      delete prevFilters[columnDef.field];
      dispatch(setFilters(prevFilters));
    }
  };

  return (
    <>
      <div className="w-full  p-3">
        <div className="w-[100%] flex items-center bg-[#F5F5F5] rounded-md">
          <input
            className="w-[68%] bg-[#F5F5F5] rounded-md text-xs pl-2 outline-none"
            type={type}
            disabled={type === "date"}
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
          <Tooltip title={type === "date" ? "filter disabled" : "Filters"}>
            <button className="w-[32%] px-1 py-2" onClick={handleClick}>
              <FilterAlt
                sx={{ height: "16px", w: "16px", color: "#C6C6C6" }}
                color="#C6C6C6"
              />
            </button>
          </Tooltip>
        </div>
      </div>
      {type !== "date" && (
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
            <MenuItem
              key={option.key}
              onClick={() => handleFilter(option.key)}
              sx={{
                ...(filter[columnDef?.field]?.[0] === option?.key &&
                option?.key !== "noFilter"
                  ? { background: "lightblue", color: "black" }
                  : {}),
                ":hover": {
                  background: "#F0F6FF", // Change this to your desired hover background color
                  color: "black", // Change this to your desired hover text color
                },
              }}
              // className={` ${filter[columnDef.field][0] && bg-blue-400 text-white } `}
            >
              {option.title}
            </MenuItem>
          ))}
        </Popover>
      )}
    </>
  );
};
