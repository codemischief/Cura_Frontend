import React, { useState, useEffect, useRef } from "react";
import useDebounce from "../../../../utils/useDebounce";

const DropdownSearch = ({
  options,
  placeholder,
  onChange,
  defaultSearch = "",
  onSearch,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(defaultSearch);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const ref = useRef();

  useEffect(() => {
    if (defaultSearch) {
      setSearchTerm(defaultSearch);
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
      if (!ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.body.addEventListener("click", closeDropdown);
    return () => document.body.removeEventListener("click", closeDropdown);
  }, [isOpen]);

  useEffect(() => {
    if (debouncedSearchTerm && debouncedSearchTerm.length >= 3) {
      onSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="dropdown-search relative">
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearchChange}
        onClick={handleDropdownToggle}
        className="w-full rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      />
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
                className="hover:bg-gray-100 px-3 py-2"
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
