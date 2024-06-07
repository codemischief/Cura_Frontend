import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { CircularProgress } from "@mui/material";

const CustomSelect = ({
  isLoading,
  options,
  value,
  onSelect,
  dropdownClass,
}) => {
  const dropdownRef = useRef(null);
  const optionRefs = useRef([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);

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

        onSelect(options[Math.min(activeIndex + 1, options.length - 1)]);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      onSelect(options[Math.max(activeIndex - 1, 0)]);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (isOpen && activeIndex >= 0 && activeIndex < options.length) {
        onSelect(options[activeIndex]);
      }

      setIsOpen(false);
    } else if (e.key.length === 1) {
      const newSearchTerm = searchTerm + e.key;
      //   setSearchTerm(newSearchTerm);

      const findById = options?.find((option) =>
        option.name.toLowerCase().startsWith(newSearchTerm.toLowerCase())
      );
      if (findById) onSelect(findById);
      // if (findById) setSelectedOption(findById);

      const firstIndex = options?.findIndex((option) =>
        option.name.toLowerCase().startsWith(newSearchTerm.toLowerCase())
      );

      if (firstIndex !== -1) {
        setActiveIndex(firstIndex);
        setIsOpen(true);
      } else {
        // setIsOpen(false);
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
    <div className="relative inline-block text-left h-[1.5rem] w-[17.5625rem]">
      <div className="w-full h-full flex item">
        <button
          type="button"
          className="h-full inline-flex justify-between items-center text-[#505050] w-full border border-gray-300 px-4 bg-white text-xs font-medium
         hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          onClick={toggleDropdown}
          onKeyDown={handleKeyDown}
          ref={dropdownRef}
          tabIndex="0"
        >
          {value ?? "Select an option"}
          <svg
            className=""
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.53026 5.53319C5.38962 5.6738 5.19889 5.75278 5.00001 5.75278C4.80114 5.75278 4.61041 5.6738 4.46976 5.53319L0.227013 1.29044C0.155381 1.22126 0.0982438 1.1385 0.058937 1.047C0.0196303 0.955493 -0.00105945 0.857078 -0.00192481 0.757494C-0.00279017 0.657909 0.0161863 0.55915 0.053897 0.466978C0.0916076 0.374805 0.147297 0.291066 0.217717 0.220646C0.288137 0.150227 0.371875 0.094537 0.464047 0.0568263C0.55622 0.0191156 0.65498 0.000139518 0.754564 0.00100488C0.854149 0.00187024 0.952563 0.02256 1.04407 0.0618667C1.13557 0.101173 1.21833 0.15831 1.28751 0.229943L5.00001 3.94244L8.71251 0.229943C8.85397 0.093324 9.04342 0.0177282 9.24006 0.019437C9.43671 0.0211458 9.62482 0.100022 9.76388 0.239078C9.90293 0.378135 9.98181 0.566244 9.98352 0.762892C9.98523 0.959539 9.90963 1.14899 9.77301 1.29044L5.53026 5.53319Z"
              fill="#505050"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className={`origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${dropdownClass}`}
        >
          <div className="rounded-md ring-1 ring-black ring-opacity-5">
            <div className="py-1 max-h-60 overflow-y-auto">
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <CircularProgress size={20} />
                </div>
              ) : options?.length > 0 ? (
                options?.map((option, index) => (
                  <div
                    key={option.id}
                    ref={(el) => (optionRefs.current[index] = el)}
                    className={`cursor-pointer select-none relative py-2 pl-3 pr-9 ${
                      activeIndex === index ? "bg-indigo-100" : ""
                    }`}
                    onMouseDown={() => selectOption(option)}
                    // onClick={() => selectOption(option)}
                  >
                    {option?.name}
                  </div>
                ))
              ) : (
                <p>No data </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

CustomSelect.propTypes = {
  isLoading: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.any,
  onSelect: PropTypes.func.isRequired,
  dropdownClass: PropTypes.string,
};

export default CustomSelect;
