const DatePicker = ({ label, selectContainerClass, ...dateProps }) => {
  return (
    <div className={`flex flex-col ${selectContainerClass}`}>
      <label className="font-sans text-sm font-normal leading-5">
        {label} <span className="text-[#CD0000]">*</span>
      </label>
      <input
        type="date"
        {...dateProps}
        className="border border-[#C6C6C6] text-[#505050] p-1 text-sm"
      />
    </div>
  );
};

export default DatePicker;
