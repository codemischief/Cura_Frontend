import React, { useState, useEffect } from "react";
import {
  Tooltip,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Button,
  IconButton,
  Divider,
  Popover,
  Box,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  MenuItem,
} from "@mui/material";
import { Close, FilterAlt, FilterList } from "@mui/icons-material";
import Filter from "../../../assets/filter.png";

import styleConst from "./styleConst";
import {
  characterFilterData,
  dateFilterData,
  numericFilterData,
} from "../../../Components/Filters/data";
const { customFilterFCCommon, columnFlex } = styleConst;

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
  const { columnDef, onFilterChanged, type } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [search, setSearch] = useState("");
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => {
    setAnchorEl(null);
  };
  let value = columnDef?.tableData?.filterValue;
  value =
    (value !== null && typeof value === "object" ? "Advance Filter" : value) ??
    "";
  const open = Boolean(anchorEl);
  const optionType = {
    text: characterFilterData,
    number: numericFilterData,
    date: dateFilterData,
  };
  const handleFilter = (filter) => {
    if (search) {
      const query = [[columnDef.field], [search], [filter], [""]];
      onFilterChanged(columnDef.tableData.id, query);
    }
    handleClose();
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
            <IconButton
              onClick={() => setSearch("")}
              sx={{ height: "16px", w: "16px", color: "#C6C6C6" }}
            >
              <Close sx={{ height: "16px", w: "16px", color: "#C6C6C6" }} />
            </IconButton>
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

const destructureQuery = ({ conditions, jointConditions }) => {
  return {
    condition1:
      conditions?.[0]?.type === "min" || conditions?.[0]?.type === "max"
        ? "exact"
        : conditions?.[0]?.type,
    condition2:
      conditions?.[1]?.type === "max" ? "exact" : conditions?.[1]?.type,
    input1:
      conditions?.[0]?.type === "min" || conditions?.[0]?.type === "max"
        ? ""
        : conditions?.[0]?.value ?? "",
    input2: conditions?.[1]?.type !== "max" ? conditions?.[1]?.value : "" ?? "",
    min: conditions?.[0]?.type === "min" ? conditions?.[0]?.value : "",
    max:
      conditions?.[0]?.type === "max"
        ? conditions?.[0]?.value
        : conditions?.[1]?.type === "max"
        ? conditions?.[1]?.value
        : "",
    jointConditions: jointConditions === "" ? "and" : jointConditions ?? "and",
  };
};
const MyPopover = (props) => {
  const { setAnchorEl, anchorEl, onFilterChanged, columnId, type, value } =
    props;
  const [condition1, setCondition1] = useState(
    type === "number" ? "exact" : "contains"
  );
  const [condition2, setCondition2] = useState(
    type === "number" ? "exact" : "contains"
  );
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [jointConditions, setJointConditions] = useState("and");

  const handleChange = (event) => {
    const name = event.target.name;
    if (name === "condition1") setCondition1(event.target.value);
    else if (name === "condition2") setCondition2(event.target.value);
    else if (name === "input1") {
      setInput1(event.target.value);
      setMin("");
      setMax("");
    } else if (name === "input2") setInput2(event.target.value);
    else if (name === "min") {
      setMin(event.target.value);
      setInput1("");
    } else if (name === "max") {
      setMax(event.target.value);
      setInput1("");
    } else if (name === "jointConditions")
      setJointConditions(event.target.value);
  };

  const handleApply = () => {
    const query = { conditions: [], jointConditions: "" };
    if (min === "") {
      if (max !== "")
        query.conditions.push({ type: "max", value: Number(max) });
      else {
        query.conditions.push(
          {
            type: condition1,
            value: type === "number" ? Number(input1) : input1.toLowerCase(),
          },
          {
            type: condition2,
            value: type === "number" ? Number(input2) : input2.toLowerCase(),
          }
        );
        query.jointConditions = input2 ? jointConditions : "";
      }
    } else {
      if (max !== "") {
        query.conditions.push(
          { type: "min", value: Number(min) },
          { type: "max", value: Number(max) }
        );
        query.jointConditions = "and";
      } else query.conditions.push({ type: "min", value: Number(min) });
    }
    onFilterChanged(columnId, query);
    handleClose();
  };

  const handleClear = () => {
    onFilterChanged(columnId, "");
    setCondition1(type === "number" ? "exact" : "contains");
    setCondition2(type === "number" ? "exact" : "contains");
    setInput1("");
    setInput2("");
    setJointConditions("and");
    setMin("");
    setMax("");
  };

  const handleClose = () => setAnchorEl(null);

  useEffect(() => {
    if (value !== null && typeof value === "object") {
      const prevQuery = destructureQuery(value, type);
      setCondition1(prevQuery.condition1);
      setCondition2(prevQuery.condition2);
      setInput1(prevQuery.input1);
      setInput2(prevQuery.input2);
      setMin(prevQuery.min);
      setMax(prevQuery.max);
      setJointConditions(prevQuery.jointConditions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showClose = input1 === "" && min === "" && max === "";
  return (
    <Popover
      open={!!anchorEl}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <Box
        elementType={"div"}
        sx={{
          ...columnFlex,
          maxWidth: 250,
        }}
      >
        {type === "number" && (
          <>
            <Box elementType={"div"} sx={{ display: "flex" }}>
              <FormControl variant="outlined" sx={{ m: 1 }}>
                <TextField
                  type="number"
                  name="min"
                  value={min}
                  label="Min"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl variant="outlined" sx={{ m: 1 }}>
                <TextField
                  type="number"
                  name="max"
                  value={max}
                  label="Max"
                  onChange={handleChange}
                />
              </FormControl>
            </Box>
            <Divider />
          </>
        )}
        <FormControl variant="outlined" sx={customFilterFCCommon}>
          <TextField
            select
            name="condition1"
            value={condition1}
            label="Condition 1"
            onChange={handleChange}
          >
            {options[type].map((obj) => (
              <MenuItem key={obj.value} value={obj.value}>
                {obj.label}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
        <FormControl variant="outlined" sx={customFilterFCCommon}>
          <TextField
            type={type}
            name="input1"
            value={input1}
            label="Value"
            onChange={handleChange}
          />
        </FormControl>
        {input1 && (
          <>
            <FormControl>
              <FormLabel id="JoinCondition">Join Condition</FormLabel>
              <RadioGroup
                row
                aria-labelledby="JoinCondition"
                defaultValue="and"
                name="jointConditions"
                onChange={handleChange}
                value={jointConditions}
              >
                <FormControlLabel value="and" control={<Radio />} label="And" />
                <FormControlLabel value="or" control={<Radio />} label="Or" />
              </RadioGroup>
            </FormControl>
            <FormControl variant="outlined" sx={customFilterFCCommon}>
              <TextField
                select
                name="condition2"
                value={condition2}
                label="Condition 2"
                onChange={handleChange}
              >
                {options[type].map((obj) => (
                  <MenuItem key={obj.value} value={obj.value}>
                    {obj.label}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
            <FormControl variant="outlined" sx={customFilterFCCommon}>
              <TextField
                type={type}
                name="input2"
                value={input2}
                label="Value"
                onChange={handleChange}
              />
            </FormControl>
          </>
        )}
        <Box elementType="div" sx={{ display: "flex" }}>
          <Button
            color="secondary"
            fullWidth
            onClick={showClose ? handleClose : handleClear}
          >
            {showClose ? "Close" : "Clear"}
          </Button>
          <Button
            color="primary"
            fullWidth
            onClick={handleApply}
            disabled={showClose}
          >
            Apply
          </Button>
        </Box>
      </Box>
    </Popover>
  );
};

const options = {
  text: [
    { value: "contains", label: "Contains" },
    { value: "nContains", label: "Not contains" },
    { value: "exact", label: "Equals" },
    { value: "nexact", label: "Not Equal" },
    { value: "startswith", label: "Start with" },
    { value: "endwith", label: "End with" },
  ],
  number: [
    { value: "exact", label: "= (Equals to)" },
    { value: "nexact", label: "!= (Not equal to)" },
    { value: "gt", label: "> (Greater then)" },
    { value: "gte", label: ">= (Greater then or Equals to)" },
    { value: "lt", label: "< (Less then)" },
    { value: "lte", label: "<= (Less then or Equals to)" },
  ],
};
