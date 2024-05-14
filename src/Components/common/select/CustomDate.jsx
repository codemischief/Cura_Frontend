const DatePicker = ({ label, selectContainerClass, ...dateProps }) => {
  return (
    <div className={`flex flex-col ${selectContainerClass}`}>
      <label className="font-sans text-sm font-normal leading-5">
        {label} <span className="text-[#CD0000]">*</span>
      </label>
      <input type="date" {...dateProps} />
      {/* <select
        className="w-full max-h-[224px] h-8 border-[1px] border-[#C6C6C6] bg-white rounded-sm px-3 text-xs outline-none"
        {...dateProps}
      >
        <option value={""} className="hidden"></option>
        {options[type].map((item, index) => (
          <option value={item.value} key={index}>
            {item}
          </option>
        ))}
      </select> */}
    </div>
  );
};

export default DatePicker