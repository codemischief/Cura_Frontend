import React, { useState, useEffect, useRef } from "react";
import useDebounce from "../../../../utils/useDebounce";

const DropdownSearch = ({
  options,
  placeholder,
  onChange,
  defaultSearch = null,
  onSearch,
  onSelect,
  onKeyDown,
  name,
  setSelectedValue,
  loading
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(defaultSearch);
  const debouncedSearchTerm = useDebounce(searchTerm, 200);
  const ref = useRef();

  useEffect(() => {
    if (defaultSearch) {
      setSearchTerm(defaultSearch.label);
    }
  }, [defaultSearch]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const closeDropdown = (e) => {
      if (isOpen && ref.current && !ref.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.body.addEventListener("mousedown", closeDropdown);
    document.addEventListener("touchstart", closeDropdown);
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
      document.removeEventListener("touchstart", closeDropdown);
    }
  }, [isOpen]);


  useEffect(() => {
    if (!isOpen && !defaultSearch) {
      if (options.length > 0) {
        setSearchTerm(options[0].label)
        setSelectedValue(options[0])
        onSelect(options[0])
      }
      else {
        setSearchTerm('')
        setSelectedValue(null)
      }
    }

  }, [defaultSearch, isOpen])


  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <div className="dropdown-search relative">
      <div className="w-full px-3  border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
      <input
        type="text"
        placeholder={"Select Tenant Of"}
        value={searchTerm}
        onChange={handleSearchChange}
        onClick={handleDropdownToggle}
        onKeyDown={onKeyDown}
        // className="w-full rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      />
      {loading &&  (
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <div className="loader border-4 border-t-4 border-gray-200 border-t-gray-500 rounded-full w-4 h-4 animate-spin"></div>
        </div>
      )}
      </div>
      {isOpen && (
        <ul
          ref={ref}
          className="dropdown-menu absolute top-full left-0 right-0 z-50 bg-white rounded-md shadow-sm overflow-y-auto max-h-60"
        >
          {options?.length > 0 ? (
            options?.map((option) => (
              <li
                key={option.value}
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
                className="hover:bg-gray-100 px-3 py-2 cursor-pointer"
              >
                {option.label}
              </li>
            ))
          ) : (
            <li className="text-gray-400 px-3 py-2">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default DropdownSearch;
