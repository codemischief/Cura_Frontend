import PropTypes from "prop-types";

import { FormControl, Select, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const CustomSelectNative = ({
  value,
  onChange,
  data,
  placeholder,
  menuMaxHeight = "14rem",
  renderData,
  isSticky = false,
  headerText = {
    first : 'ID',
    second : 'Order Description',
  },
  ...props
}) => {
  return (
    <FormControl sx={{ minWidth: 120 }}>
      <Select
        className="selectBoxField inputFieldValue text-sm !text-[#505050] border-[#C6C6C6] "
        value={value}
        onChange={onChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        renderValue={(selected) => {
          if (!selected) {
            return <span className="text-[#C6C6C6]">{placeholder}</span>;
          }
          return selected;
        }}
        MenuProps={{
          slotProps: {
            paper: {
              sx: {
                maxHeight: menuMaxHeight,
                borderRadius: "0.9375rem",
                color: "#505050",
                // paddingTop: "1rem",
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
            lineHeight: "1.3125rem",
          },
          paddingTop: "0px",
          paddingBottom : "0px",
          borderRadius: 0,
        }}
        {...props}
      >
        {isSticky && <MenuItem disabled style={{opacity:"1.2"}} sx={{ position: "sticky", top: 0, backgroundColor: "gray", zIndex: 99, color:"black",display:"flex", opacity : '0.5', gap : '45px' , }}>
         <span>{headerText.first}</span>
         <span>{headerText.second}</span>

        </MenuItem>}
        {data?.length === 0 && (
          <MenuItem value="" disabled>
            No data
          </MenuItem>
        )}
        {data?.length > 0 && data?.map((item) => renderData(item))}
      </Select>
    </FormControl>
  );
};

CustomSelectNative.propTypes = {
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

export default CustomSelectNative;
