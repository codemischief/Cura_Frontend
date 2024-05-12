import { CloseOutlined, SearchOutlined } from "@mui/icons-material";
import React, { useState } from "react";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  return (
    <div className="flex bg-[#EBEBEB]">
      <input
        className="h-[36px] bg-[#EBEBEB] text-[#787878] pl-3"
        type="text"
        placeholder="  Search"
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
      />
      <button>
        <CloseOutlined />
      </button>
      <div className="h-[36px] w-[40px] bg-[#004DD7] flex items-center justify-center rounded-r-lg">
        <button>
          <SearchOutlined className="m-2" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
