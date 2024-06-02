import { useEffect, useState } from "react";
import { Tooltip, Popover, MenuItem } from "@mui/material";
import { Close, FilterAlt } from "@mui/icons-material";
import PropTypes from "prop-types";
import {
  characterFilterData,
  dateFilterData,
  numericFilterData,
} from "../../Filters/data";

export const FilterField = (props) => {
  const { columnfield, type, onFilterChange, filter, isDisabled } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [search, setSearch] = useState("");
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    let copiedFilters = { ...filter };
    if (search === "" && copiedFilters?.hasOwnProperty(columnfield)) {
      delete copiedFilters[columnfield];
      onFilterChange(copiedFilters);
    }
  }, [search]);
  useEffect(() => {
    let copiedFilters = { ...filter };
    if (search && !copiedFilters.hasOwnProperty(columnfield)) {
      setSearch("");
    }
  }, [filter]);
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
        delete prevFilters[columnfield];
        onFilterChange(prevFilters);
        setSearch("");
      } else {
        const prevFilters = { ...filter };
        prevFilters[columnfield] = [filters, queryType, filterType[type]];
        onFilterChange({ ...prevFilters });
      }
    }
    if (!search && (filters === "isNull" || filters === "isNotNull")) {
      let filterType = {
        text: "String",
        number: "Numeric",
        date: "Date",
      };
      let queryType = type === "number" ? Number(search) : search;
      if (filters === "noFilter") {
        const prevFilters = { ...filter };
        delete prevFilters[columnfield];
        onFilterChange(prevFilters);
        setSearch("");
      } else {
        const prevFilters = { ...filter };
        prevFilters[columnfield] = [filters, queryType, filterType[type]];
        onFilterChange({ ...prevFilters });
      }
    }
    handleClose();
  };

  const handleResetFilter = () => {
    setSearch("");
    if (filter.hasOwnProperty(columnfield)) {
      const prevFilters = { ...filter };
      delete prevFilters[columnfield];
      onFilterChange(prevFilters);
    }
  };

  const handleEnterKeyPress = (e) => {
    if (search) {
      if (e.key === "Enter" || e.key === "Return" || e.key === 13) {
        let filters = {
          text: "contains",
          number: "equalTo",
          date: "equalTo",
        };
        let filterType = {
          text: "String",
          number: "Numeric",
          date: "Date",
        };
        let queryType = type === "number" ? Number(search) : search;
        const prevFilters = { ...filter };
        prevFilters[columnfield] = [filters[type], queryType, filterType[type]];
        onFilterChange({ ...prevFilters });
      }
    }
  };

  return (
    <>
      <div className="w-full h-full flex justify-start p-3">
        <div className="w-fit h-[1.75rem] flex justify-between items-center bg-[#F5F5F5] rounded-md">
          <input
            className="w-fit max-w-[50%] min-[3rem] h-full bg-[#F5F5F5] rounded-md text-xs pl-2 outline-none"
            type={type}
            disabled={isDisabled}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleEnterKeyPress}
            title={isDisabled ? "disabled" : ""}
          />

          <Close
            sx={{
              height: "12px",
              w: "12px",
              color: search ? "#C6C6C6" : "transparent",
              cursor: "pointer",
            }}
            onClick={handleResetFilter}
          />

          <Tooltip title={isDisabled ? "filter disabled" : "Filters"}>
            <button
              className="w-[2rem] h-full flex items-center justify-center"
              onClick={handleClick}
            >
              <FilterAlt
                sx={
                  filter && filter[columnfield] && filter[columnfield]?.[0]
                    ? { height: "16px", width: "16px", color: "#004DD7" }
                    : { height: "16px", width: "16px", color: "#C6C6C6" }
                }
                // color="#C6C6C6"
              />
            </button>
          </Tooltip>
        </div>
      </div>
      {!isDisabled && (
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
                ...(filter &&
                filter[columnfield] &&
                filter[columnfield]?.[0] &&
                filter[columnfield]?.[0] === option?.key &&
                option?.key !== "noFilter"
                  ? { background: "#dae7ff", color: "black" }
                  : {}),
                ":hover": {
                  background: "#dae7ff", // Change this to your desired hover background color
                  color: "black", // Change this to your desired hover text color
                },
                fontSize: "0.875rem",
                lineHeight: "1.25rem",
                fontWeight: "100",
              }}
              className={` ${
                filter &&
                filter[columnfield] &&
                filter[columnfield]?.[0] &&
                filter[columnfield]?.[0] &&
                " bg-blue-400 text-white"
              } `}
            >
              {option.title}
            </MenuItem>
          ))}
        </Popover>
      )}
    </>
  );
};

FilterField.propTypes = {
  columnfield: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "number", "date"]).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  filter: PropTypes.object.isRequired,
  isDisabled: PropTypes.bool,
};
