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
import { FilterList } from "@mui/icons-material";
import Filter from "../../../assets/filter.png";



import styleConst from "./styleConst";
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

const FilterField = (props) => {
  const { columnDef, onFilterChanged, type } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);

  let value = columnDef?.tableData?.filterValue;
  value =
    (value !== null && typeof value === "object" ? "Advance Filter" : value) ??
    "";
  return (
    <>
      {/* <FormControl variant="outlined">
        <OutlinedInput
          value={value}
          onChange={(e) =>
            onFilterChanged(columnDef.tableData.id, e.target.value)
          }
          startAdornment={
            <InputAdornment position="start">
              <Tooltip title="Advance filter">
                <IconButton
                  sx={{ p: 0 }}
                  aria-label="advance filter"
                  edge="end"
                  onClick={handleClick}
                >
                  <FilterList />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          }
          aria-describedby="filter-input"
          inputProps={{
            "aria-label": columnDef?.title ?? "Na",
            sx: { padding: "8px 4px" },
          }}
        />
      </FormControl> */}
      <div className="w-fit  p-3">
        <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
          <input
            className="w-[68%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none"
            // value={employeeNameInput}
            // onChange={(e) => setEmployeeNameInput(e.target.value)}
          />
          <button
            className="w-[32%] px-1 py-2"
            // onClick={() => {
            //   setEmployeeNameFilter((prev) => !prev);
            // }}
          >
            <img src={Filter} className="h-3 w-3" />
          </button>
        </div>
        {/* {employeeNameFilter && (
          <CharacterFilter
            inputVariable={employeeNameInput}
            setInputVariable={setEmployeeNameInput}
            handleFilter={newHandleFilter}
            filterColumn="employeename"
            menuRef={menuRef}
          />
        )} */}
      </div>
      {/* <MyPopover
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        onFilterChanged={onFilterChanged}
        columnId={columnDef.tableData.id}
        type={type}
        value={columnDef?.tableData?.filterValue}
      /> */}
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
  const {
    setAnchorEl,
    anchorEl,
    onFilterChanged,
    columnId,
    type,
    value,
  } = props;
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
    // <Popover
    //   open={!!anchorEl}
    //   anchorEl={anchorEl}
    //   onClose={handleClose}
    //   anchorOrigin={{
    //     vertical: "bottom",
    //     horizontal: "left"
    //   }}
    // >
    //   <Box
    //     elementType={"div"}
    //     sx={{
    //       ...columnFlex,
    //       maxWidth: 250
    //     }}
    //   >
    //     {type === "number" && (
    //       <>
    //         <Box elementType={"div"} sx={{ display: "flex" }}>
    //           <FormControl variant="outlined" sx={{ m: 1 }}>
    //             <TextField
    //               type="number"
    //               name="min"
    //               value={min}
    //               label="Min"
    //               onChange={handleChange}
    //             />
    //           </FormControl>
    //           <FormControl variant="outlined" sx={{ m: 1 }}>
    //             <TextField
    //               type="number"
    //               name="max"
    //               value={max}
    //               label="Max"
    //               onChange={handleChange}
    //             />
    //           </FormControl>
    //         </Box>
    //         <Divider />
    //       </>
    //     )}
    //     <FormControl variant="outlined" sx={customFilterFCCommon}>
    //       <TextField
    //         select
    //         name="condition1"
    //         value={condition1}
    //         label="Condition 1"
    //         onChange={handleChange}
    //       >
    //         {options[type].map((obj) => (
    //           <MenuItem key={obj.value} value={obj.value}>
    //             {obj.label}
    //           </MenuItem>
    //         ))}
    //       </TextField>
    //     </FormControl>
    //     <FormControl variant="outlined" sx={customFilterFCCommon}>
    //       <TextField
    //         type={type}
    //         name="input1"
    //         value={input1}
    //         label="Value"
    //         onChange={handleChange}
    //       />
    //     </FormControl>
    //     {input1 && (
    //       <>
    //         <FormControl>
    //           <FormLabel id="JoinCondition">Join Condition</FormLabel>
    //           <RadioGroup
    //             row
    //             aria-labelledby="JoinCondition"
    //             defaultValue="and"
    //             name="jointConditions"
    //             onChange={handleChange}
    //             value={jointConditions}
    //           >
    //             <FormControlLabel value="and" control={<Radio />} label="And" />
    //             <FormControlLabel value="or" control={<Radio />} label="Or" />
    //           </RadioGroup>
    //         </FormControl>
    //         <FormControl variant="outlined" sx={customFilterFCCommon}>
    //           <TextField
    //             select
    //             name="condition2"
    //             value={condition2}
    //             label="Condition 2"
    //             onChange={handleChange}
    //           >
    //             {options[type].map((obj) => (
    //               <MenuItem key={obj.value} value={obj.value}>
    //                 {obj.label}
    //               </MenuItem>
    //             ))}
    //           </TextField>
    //         </FormControl>
    //         <FormControl variant="outlined" sx={customFilterFCCommon}>
    //           <TextField
    //             type={type}
    //             name="input2"
    //             value={input2}
    //             label="Value"
    //             onChange={handleChange}
    //           />
    //         </FormControl>
    //       </>
    //     )}
    //     <Box elementType="div" sx={{ display: "flex" }}>
    //       <Button
    //         color="secondary"
    //         fullWidth
    //         onClick={showClose ? handleClose : handleClear}
    //       >
    //         {showClose ? "Close" : "Clear"}
    //       </Button>
    //       <Button
    //         color="primary"
    //         fullWidth
    //         onClick={handleApply}
    //         disabled={showClose}
    //       >
    //         Apply
    //       </Button>
    //     </Box>
    //   </Box>
    // </Popover>
    <></>
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

const filterFunctionObject = {
  startswith: (value, str) => str?.startsWith(value),
  endwith: (value, str) => str?.endsWith(value),
  contains: (value, str) => str?.includes(value),
  nContains: (value, str) => !str?.includes(value),
  exact: (value, str) => str === value,
  nexact: (value, str) => str !== value,
  and: (value1, value2) => value1 && value2,
  or: (value1, value2) => value1 || value2,
  min: (compareTo, value) => compareTo <= value,
  max: (compareTo, value) => value <= compareTo,
  gt: (compareTo, value) => compareTo < value,
  gte: (compareTo, value) => compareTo <= value,
  lt: (compareTo, value) => value < compareTo,
  lte: (compareTo, value) => value <= compareTo,
};

export const filterQuery = (query, haystack) => {
  haystack = typeof haystack === "string" ? haystack?.toLowerCase() : haystack;
  if (haystack === null || haystack === undefined) haystack = "";
  if (typeof query !== "object") {
    haystack = haystack?.toString();
    return haystack?.includes(query?.toLowerCase());
  }
  const conditions = query.conditions;
  const jointConditions = query.jointConditions;

  let found = filterFunctionObject[conditions[0].type](
    conditions[0].value,
    haystack
  );

  if (jointConditions !== "") {
    if (found && jointConditions === "and") {
      found = filterFunctionObject[conditions[1].type](
        conditions[1].value,
        haystack
      );
    } else if (!found && jointConditions === "or") {
      found = filterFunctionObject[conditions[1].type](
        conditions[1].value,
        haystack
      );
    }
  }
  return found;
};

// for more then two conditions
/* query = {
    conditions : [
        {type:"startswith",value:"ABC"},
        {type:"contain",value:"OP"},
        {type:"endwith",value:"XYZ"},
        ...
    ],
    jointConditions:['and','or',...]
}
export const filterQuery = (query, haystack) => {
    let found = false;
    const conditions = query.conditions;
    const jointConditions = query.jointConditions;
    let jointConditionsLeft = jointConditions.slice(0);//TO create copy
    
    found = filterFunctionObject[conditions[0].type](conditions[0].value,haystack)
    for(let i=1 ; i<conditions.length ;i++){
        if(!found && !jointConditionsLeft.includes('or')){ //it will never true
            return found
        }else if(found && !jointConditionsLeft.includes('and'){//it will never false
            return found
        }
        found = filterFunctionObject[jointConditions[i-1]](
            found,
            filterFunctionObject[conditions[i].type](conditions[i].value,haystack)
        )
        jointConditionsLeft.splice(0,1)
    }
    return found
}
*/
