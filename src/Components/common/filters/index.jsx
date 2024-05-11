import React, { useEffect, useState } from "react";
import { Tooltip, Popover, MenuItem } from "@mui/material";
import { Close, FilterAlt } from "@mui/icons-material";

import { useDispatch } from "react-redux";
import { setFilters } from "../../../Redux/slice/pmaSlice";
import { useSelector } from "react-redux";
import {
  characterFilterData,
  dateFilterData,
  numericFilterData,
} from "../../Filters/data";

export function clearFilterAll(noOfColumns, tableRef) {
  // i is column id which is assigned by Material Table;
  for (let i = 0; i < noOfColumns; i++) {
    tableRef.current.onFilterChange(i, "");
  }
}

// HOC returning Filter types
export function TextFilterField(props) {
  return <FilterField {...props} type="text" />;
}

export function NumberFilterField(props) {
  return <FilterField {...props} type="number" />;
}
export function DateFilterField(props) {
  return <FilterField {...props} type="date" />;
}

// generic filterField

const FilterField = (props) => {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.pmaBilling);
  const { columnField, onFilterChanged, type } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [search, setSearch] = useState("");
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    let copiedFilters = { ...filter };
    if (search === "" && copiedFilters?.hasOwnProperty(columnField)) {
      delete copiedFilters[columnField];

      onFilterChanged(copiedFilters, search);
      //   dispatch(setFilters(copiedFilters));
    }
  }, [search]);

  const open = Boolean(anchorEl);
  const optionType = {
    text: characterFilterData,
    number: numericFilterData,
    date: dateFilterData,
  };

  const handleFilter = (filters) => {
    // if (search) {
    //   let filterType = {
    //     text: "String",
    //     number: "Numeric",
    //     date: "Date",
    //   };
    //   let queryType = type === "number" ? Number(search) : search;
    //   if (filters === "noFilter") {
    //     const prevFilters = { ...filter };
    //     delete prevFilters[columnField];
    //     dispatch(setFilters(prevFilters));
    //     setSearch("");
    //   } else {
    //     const prevFilters = { ...filter };
    //     prevFilters[columnField] = [filters, queryType, filterType[type]];
    //     dispatch(setFilters({ ...prevFilters }));
    //   }
    // }
    onFilterChanged(filters, search);
    handleClose();
  };

  const handleResetFilter = () => {
    setSearch("");
    if (filter.hasOwnProperty([columnField])) {
      const prevFilters = { ...filter };
      delete prevFilters[columnField];
      dispatch(setFilters(prevFilters));
    }
  };

  const handleEnterKeyPress = (e) => {
    console.log("e", e.key);
    if (search) {
      if (e.key === "Enter" || e.key === "Return" || e.key === 13) {
        let filters = {
          text: "contains",
          number: "equalTo",
        };
        let filterType = {
          text: "String",
          number: "Numeric",
          date: "Date",
        };
        let queryType = type === "number" ? Number(search) : search;
        const prevFilters = { ...filter };
        prevFilters[columnField] = [filters[type], queryType, filterType[type]];
        dispatch(setFilters({ ...prevFilters }));
      }
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
            onKeyDown={handleEnterKeyPress}
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
                ...(filter[columnField]?.[0] === option?.key &&
                option?.key !== "noFilter"
                  ? { background: "lightblue", color: "black" }
                  : {}),
                ":hover": {
                  background: "#F0F6FF", // Change this to your desired hover background color
                  color: "black", // Change this to your desired hover text color
                },
              }}
              // className={` ${filter[columnField][0] && bg-blue-400 text-white } `}
            >
              {option.title}
            </MenuItem>
          ))}
        </Popover>
      )}
    </>
  );
};
