import React from "react";
import { useState } from "react";

import { CloseOutlined, SearchOutlined } from "@mui/icons-material";

const SearchBar = ({value,handleSearch}) => {
  const [searchInput, setSearchInput] = useState("");
  return (
    <div className="flex bg-[#EBEBEB] h-[36px] focus:!outline-none !focus:border-none">
      <input
        className="h-[36px] bg-[#EBEBEB] text-[#787878] pl-3 focus:!outline-none "
        type="text"
        placeholder="  Search"
        value={value}
        onChange={handleSearch}
      />
      <button>
        <CloseOutlined />
      </button>
      <div className="h-[36px] w-[40px] bg-[#004DD7] flex items-center justify-center rounded-r-lg">
        <button>
          <SearchOutlined className="m-2 fill-white text-white " />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
