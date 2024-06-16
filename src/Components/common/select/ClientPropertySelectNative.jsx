import PropTypes from "prop-types";

import { FormControl, Select, MenuItem, Tooltip } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const ClientPropertySelectNative = ({
  value,
  onChange,
  data,
  placeholder,
  menuMaxHeight = "9rem",
  renderData,
  isSticky = false,
  width1 = '50%',
  width2 = '50%',
  noDataText = 'Select Client With Properties',
  headerText = {
    first : 'ID',
    second : 'Order Description',
  },
  ...props
}) => {
  return (
    <FormControl sx={{ minWidth: 120  }}>
      <Select
        className="orderSelectBoxField orderInputFieldValue text-sm !text-[#505050] border-[#C6C6C6] "
        value={value}
        onChange={onChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        renderValue={(selected) => {
          if (!selected) {
            return <span className="text-[#C6C6C6]">{placeholder}</span>;
          }
          return (
            <Tooltip title={selected} arrow>
              <span>{selected}</span>
            </Tooltip>
          );
          
        }}
        MenuProps={{
          slotProps: {
            paper: {
              sx: {
                maxHeight: menuMaxHeight,
                borderRadius: "0.9375rem",
                color: "#505050",
                // paddingTop: "1rem",
                // fontSize : '30px',
                marginTop: "0.2rem",
                
              },
            },
          },
        }}
        IconComponent={(props) => (
          <KeyboardArrowDownIcon
            {...props}
            sx={{
              alignSelf: "center",
              height: 20,
              width: 20,
            }}
          />
        )}
        sx={{
          boxShadow: "none",
          "&.MuiOutlinedInput-root": {
            "& fieldset": {
              border: "none", // Default border color
              borderRadius: 0,
            },
            
            fontSize: "0.6875rem",
            color: "#505050",
            paddingLeft: "8px",
            fontWeight: 400,
            fontFamily: "Open Sans",
            lineHeight: "3em",
            width:"230px",
            height:'23px'
          },
          paddingTop: "0px",
          paddingBottom : "0px",
          borderRadius: 0,
        }}
        {...props}
      >
        {isSticky && <MenuItem disabled style={{opacity:"1.2"}} sx={{ position: "sticky", top: 0, backgroundColor: "gray", zIndex: 99, color:"black",display:"flex", opacity : '0.5', fontSize : '12px'}}>
          <p className={`w-[${width1}]`} style={{ overflowWrap: 'break-word', wordWrap: 'break-word', whiteSpace: 'normal', margin: 0 }}>
              {headerText.first}
          </p>
          <p className={`w-[${width2}]`}>
              {headerText.second}
          </p>
         {/* <span>{headerText.first}</span>
         <span>{headerText.second}</span> */}

        </MenuItem>}
        {data?.length === 0 && (
          <MenuItem value="" disabled style={{
            fontSize : '12px'
          }}>
            {noDataText}
          </MenuItem>
        )}
        {data?.length > 0 && data?.map((item) => renderData(item))}
      </Select>
    </FormControl>
  );
};

ClientPropertySelectNative.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.string,
  menuMaxHeight: PropTypes.string,
  renderData: PropTypes.func,
};
export default ClientPropertySelectNative