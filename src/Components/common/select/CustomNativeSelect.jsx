import PropTypes from "prop-types";
import { MONTHS, getYearsRange } from "../../../utils/customDate";

const options = {
  month: MONTHS,
  year: getYearsRange(),
};
export const SelectYear = (props) => {
  return <SelectBox {...props} type="year" />;
};

export const SelectMonth = (props) => {
  return <SelectBox {...props} type="month" />;
};

const SelectBox = (props) => {
  let { label, type, selectContainerClass, ...selectProps } = props;
  return (
    <div className={`flex flex-col ${selectContainerClass}`}>
      <label className="font-sans text-sm font-normal leading-5">
        {label} <span className="text-[#CD0000]">*</span>
      </label>
      <select
        className="w-full max-h-[224px] h-8 border-[1px] border-[#C6C6C6] bg-white rounded-sm px-3 text-xs outline-none"
        {...selectProps}
      >
        <option value={""} className="hidden"></option>
        {options[type].map((item, index) => (
          <option value={item.value} key={index}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

SelectBox.propTypes = {
  label: PropTypes.string.isRequired,
  selectContainerClass: PropTypes.string,
  type: PropTypes.oneOf(["month", "year"]).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SelectBox;
