import { Button, Stack } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import HeaderBreadcrum from "../../../../Components/common/HeaderBreadcum";
import SearchBar from "../../../../Components/common/SearchBar/SearchBar";
import {
  downloadOwnersPhoneNo,
  getOwnersPhoneNo,
  setCountPerPage,
  setPageNumber,
  setSorting,
  setInitialState
} from "../../../../Redux/slice/reporting/Group13/OwnerPhoneNo";
import connectionDataColumn from "./Columns";
import { formatedFilterData } from "../../../../utils/filters";
import SimpleTable from "../../../../Components/common/table/CustomTable";
import useAuth from "../../../../context/JwtContext";

const OwnerPhoneNo = () => {
  const dispatch = useDispatch();
  const {user} = useAuth();
  const {
    ownersPhoneNo,
    status,
    totalAmount,
    totalCount,
    sorting,
    countPerPage,
    pageNo,
    filter,
  } = useSelector((state) => state.ownerPhoneNo);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [phoneNoType, setPhoneNoType] = useState("")
  const [showTable, setShowTable] = useState(false);
  const columns = useMemo(() => connectionDataColumn(), []);

  const handleSearchvalue = (e) => {
    setSearchInput(e.target.value);
  };

  const handlePageChange = (value) => {
    dispatch(setPageNumber(value));
  };

  const handlePageCountChange = (e) => {
    dispatch(setCountPerPage(e.target.value));
    dispatch(setPageNumber(1));
  };

  useEffect(() => {
    dispatch(setInitialState())
  }, [])

  const handleRefresh = () => {
    let obj = {
      user_id: user.id,
      rows: [
        "name", "phoneno", "phoneno1", "phoneno2"
      ],
      type:phoneNoType,
      sort_by: undefined,
      filters: formatedFilterData(filter),
      search_key: search,
      pg_no: +pageNo,
      pg_size: +countPerPage,
      order: undefined,
    };
    dispatch(getOwnersPhoneNo(obj));
  };

  const handleSearch = () => {
    setSearch(searchInput);
    dispatch(setPageNumber(1));
  };

  const handleSearchEnterKey = (e) => {
    if (searchInput) {
      if (e.key === "Enter" || e.key === "Return" || e.key === 13) {
        handleSearch();
      }
    }
  };
  const removeSearchValue = () => {
    setSearch("");
    setSearchInput("");
  };

  useEffect(() => {
    if (searchInput === "") setSearch("");
  }, [searchInput]);

  useEffect(() => {
    if (phoneNoType) {
      let obj = {
        user_id: user.id,
        rows: [
          "name", "phoneno", "phoneno1", "phoneno2"
        ],
        type:phoneNoType,
        sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
        filters: formatedFilterData(filter),
        search_key: search,
        pg_no: +pageNo,
        pg_size: +countPerPage,
        order: sorting.sort_order ? sorting.sort_order : undefined,
      };
      dispatch(getOwnersPhoneNo(obj));
    }
  }, [
    filter,
    countPerPage,
    pageNo,
    search,
    sorting.sort_order,
    sorting.sort_by,
  ]);

  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sorting.sort_by && sorting.sort_order === "asc"
        ? "desc"
        : "asc";
    dispatch(setSorting({ sort_by: accessor, sort_order: sortOrder }));
  };

  const handleShow = () => {
    if (phoneNoType) {
      setShowTable(true)
      dispatch(setInitialState())
    }
  }

  const downloadExcel = async () => {
    let obj = {
      user_id: user.id,
      rows: ["name", "phoneno", "phoneno1", "phoneno2"

      ],
      type:phoneNoType,
      downloadType: "excel",
      sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
      filters: formatedFilterData(filter),
      search_key: search,
      pg_no: 0,
      pg_size: 0,
      colmap: {
        name: "Name",
        phoneno: "Phone Number",
        phoneno1: "Phone Number 1",
        phoneno2: "Phone Number 2"
      },
      order: sorting.sort_order ? sorting.sort_order : undefined,
    };
    dispatch(downloadOwnersPhoneNo(obj));
  };

  const downloadPdf = () => {
    let obj = {
      user_id: user.id,
      rows: [
        "name", "phoneno", "phoneno1", "phoneno2"
      ],
      type:phoneNoType,
      sort_by: sorting.sort_by ? [sorting.sort_by] : "",
      downloadType: "pdf",
      routename: "/reports/ownerphoneno",
      colmap: {
        name: "Name",
        phoneno: "Phone Number",
        phoneno1: "Phone Number 1",
        phoneno2: "Phone Number 2"
      },
      filters: formatedFilterData(filter),
      search_key: search,
      pg_no: 0,
      pg_size: 0,
      order: sorting.sort_order ? sorting.sort_order : "",
    };
    dispatch(downloadOwnersPhoneNo(obj, 'pdf'))
  }

  return (
    <Stack gap="1rem" sx={{ paddingTop: "20px" }}>
      <div className="flex flex-col px-4">
        <div className="flex justify-between">
          <HeaderBreadcrum
            heading={"Owners Phone No.s"}
            path={["Reports", "Contacts", "Owners Phone No.s"]}
          />
          <div className="flex justify-between gap-7 h-[36px]">
            {showTable && <div className="flex p-2 items-center justify-center rounded border border-[#CBCBCB] text-base font-normal leading-relaxed">
              <p>
                Generated on: <span> {new Date().toLocaleString()}</span>
              </p>
            </div>}
            <SearchBar
              value={searchInput}
              handleSearchvalue={handleSearchvalue}
              handleSearch={handleSearch}
              removeSearchValue={removeSearchValue}
              onKeyDown={handleSearchEnterKey}
            />
          </div>
        </div>
        <Stack
          marginTop={"8px"}
          justifyContent={"space-between"}
          direction={"row"}
          alignItems={"center"}
          height={"3.875rem"}
        >
          <Stack
            direction={"row"}
            marginLeft={"30px"}
            justifyContent={"space-around"}
            alignItems={"center"}
            gap={"24px"}
          >
            <div className="flex flex-col h-16 w-[281px]">
              <label className="font-sans text-sm font-normal leading-5">
                Phone Number Type
              </label>

              <select
                className="w-full max-h-[224px] h-8 border-[1px] border-[#C6C6C6] bg-white rounded-sm px-3 text-xs outline-none"
                name="lob"
                value={phoneNoType}
                onChange={(e) => setPhoneNoType(e.target.value)}
              >
                <option selected className="hidden">Select Type</option>
                <option value={"int"} >International Number</option>
                <option value={"mobile"} >Mobile Number</option>
                <option  value={"phone"}>Phone Number</option>
              </select>
            </div>

            <Button
              variant="outlined"
              onClick={handleShow}
              sx={{
                height: "36px",
                textTransform: "none",
                color: "#004DD7",
                borderRadius: "8px",
                width: "133px",
                fontSize: "14px",
                border: "1px solid #004DD7",
                fontWeight: "600px",
                lineHeight: "18.9px",
                marginTop: "12px",
                "&:hover": {
                  //you want this to be the same as the backgroundColor above
                  backgroundColor: "#004DD7",
                  color: "#fff",
                },
              }}
              disabled={!phoneNoType}
            >
              Show
            </Button>
          </Stack>
        </Stack>
        <SimpleTable
          columns={columns}
          data={ownersPhoneNo}
          totalData={totalAmount}
          pageNo={pageNo}
          isLoading={status === "loading"}
          totalCount={totalCount}
          style={"text-center"}
          countPerPage={countPerPage}
          handlePageCountChange={handlePageCountChange}
          handlePageChange={handlePageChange}
          handleRefresh={handleRefresh}
          handleSortingChange={handleSortingChange}
          downloadExcel={downloadExcel}
          downloadPdf={downloadPdf}
          height="calc(100vh - 16rem)"
        />
      </div>
    </Stack>
  );
};

export default OwnerPhoneNo;
