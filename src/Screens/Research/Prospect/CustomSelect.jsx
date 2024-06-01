import React, { useState, useEffect, useRef } from "react";

const CustomSelect = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  const dropdownRef = useRef(null);
  const optionRefs = useRef([]);

  useEffect(() => {
    if (isOpen) {
      setSearchTerm("");
      setActiveIndex(-1);
      dropdownRef.current.focus();
    }
  }, [isOpen, options]);

  useEffect(() => {
    if (isOpen && activeIndex >= 0 && optionRefs.current[activeIndex]) {
      optionRefs.current[activeIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeIndex, isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        setActiveIndex((prevIndex) =>
          Math.min(prevIndex + 1, options.length - 1)
        );
        setSelectedOption(
          options[Math.min(activeIndex + 1, options.length - 1)]
        );
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      setSelectedOption(options[Math.max(activeIndex - 1, 0)]);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (isOpen && activeIndex >= 0 && activeIndex < options.length) {
        setSelectedOption(options[activeIndex]);
      }

      setIsOpen(false);
    } else if (e.key.length === 1) {
      const newSearchTerm = searchTerm + e.key;
      //   setSearchTerm(newSearchTerm);

      const findById = options.find((option) =>
        option.name.toLowerCase().startsWith(newSearchTerm.toLowerCase())
      );
      if (findById) setSelectedOption(findById);

      const firstIndex = options.findIndex((option) =>
        option.name.toLowerCase().startsWith(newSearchTerm.toLowerCase())
      );

      if (firstIndex !== -1) {
        setActiveIndex(firstIndex);
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    }
  };
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
   
  return (
    <div className="relative inline-block text-left w-64">
      <div>
        <button
          type="button"
          className="inline-flex justify-between w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          onClick={toggleDropdown}
          onKeyDown={handleKeyDown}
          ref={dropdownRef}
          tabIndex="0"
        >
          {selectedOption ? selectedOption.name : "Select an option"}
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10.293 14.293a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L10 11.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="rounded-md ring-1 ring-black ring-opacity-5">
            <div className="py-1 max-h-60 overflow-y-auto">
              {options.map((option, index) => (
                <div
                  key={option.id}
                  ref={(el) => (optionRefs.current[index] = el)}
                  className={`cursor-pointer select-none relative py-2 pl-3 pr-9 ${
                    activeIndex === index ? "bg-indigo-100" : ""
                  }`}
                //   onMouseDown={() => selectOption(option)}
                >
                  {option.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
