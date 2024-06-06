import { Button, Stack, Typography } from "@mui/material";
import HeaderBreadcrum from "../../../../Components/common/HeaderBreadcum";
import { useEffect, useMemo, useState } from "react";
import ConfirmationModal from "../../../../Components/common/ConfirmationModal";
import SucessfullModal from "../../../../Components/modals/SucessfullModal";
// import SimpleTable from "../../../Components/common/table/CustomTable";
import SimpleTable from "../../../../Components/common/table/ClientPortalTable";
import connectionDataColumn from "./Columns";
import SearchBar from "../../../../Components/common/SearchBar/SearchBar";
import { APIService } from "../../../../services/API";
import { useDispatch } from "react-redux";
import AsyncSelect from "react-select/async";
import {
  downloadDataXls,
  getData,
  setCountPerPage,
  setInitialState,
  setPageNumber,
  setSorting,
} from "../../../../Redux/slice/reporting/OrderTraceReport";
import { useSelector } from "react-redux";
import DatePicker from "../../../../Components/common/select/CustomDate";
import { formatedFilterData } from "../../../../utils/filters";
import * as XLSX from "xlsx";
import Container from "../../../../Components/common/Container";

const OrderTraceReport = () => {
  const dispatch = useDispatch();
  const {
    data,
    status,
    totalAmount,
    totalCount,
    sorting,
    countPerPage,
    pageNo,
    filter,
  } = useSelector((state) => state.orderTraceReport);
  const [openModal, setOpenModal] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [toast, setToast] = useState(false);
  const columns = useMemo(() => connectionDataColumn(), []);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

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

  const handleRefresh = () => {
    if (selectedOption.value) {
      let obj = {
        user_id: 1234,
        orderID: selectedOption.value,
        rows: ["type", "orderid"],
        sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
        order: sorting.sort_order ? sorting.sort_order : undefined,
        filters: formatedFilterData(filter),
        search_key: search,
        pg_no: +pageNo,
        pg_size: +countPerPage,
      };
      dispatch(getData(obj));
    }
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
    if (selectedOption.value) {
      let obj = {
        user_id: 1234,
        orderID: selectedOption.value,
        rows: ["type", "orderid"],
        sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
        filters: formatedFilterData(filter),
        search_key: search,
        pg_no: +pageNo,
        pg_size: +countPerPage,
        order: sorting.sort_order ? sorting.sort_order : undefined,
      };
      dispatch(getData(obj));
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

  const downloadExcel = async () => {
    let obj = {
      user_id: 1234,
      orderID: selectedOption.value,
      rows: ["type", "orderid"],
      sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
      filters: formatedFilterData(filter),
      downloadType: "excel",
      colmap: {
        "type": "Type",
        "orderid": "ID",
      },
      search_key: search,
      pg_no: 0,
      pg_size: 0,
      order: sorting.sort_order ? sorting.sort_order : undefined,
    };
    dispatch(downloadDataXls(obj));
  };

  const handleShow = () => {
    if (selectedOption.value) {

      dispatch(setInitialState())

      setShowTable(true);
    } else {
      // setError((prev) => ({
      //   ...prev,
      //   year: selectedYear ? prev.year : "please select a year first",
      //   month: selectedMonth ? prev.month : "please select a year first",
      // }));
    }
  };

  const [selectedOption, setSelectedOption] = useState({
    label: "Select Order ID",
    value: null
  });
  const [query, setQuery] = useState('')
  const handleOrderIDChange = (e) => {
    console.log(e)
    setSelectedOption(e)
  }
  const loadOptions = async (e) => {
    console.log(e)
    if (e.length < 2) return;
    const data = {
      "user_id": 1234,
      "rows": ["id"],
      "pg_no": 0,
      "pg_size": 0,
      "search_key": e
    }
    const response = await APIService.getOrder(data)
    const res = await response.json()
    const results = res.data.map(e => {
      return {
        label: e.id,
        value: e.id
      }
    })
    if (results === 'No Result Found') {
      return []
    }
    return results
  }

  return (
    <Container>

      <Stack gap="1rem">
        <div className="flex flex-col px-4">
          <div className="flex justify-between">
            <HeaderBreadcrum
              heading={"Order Trace Report"}
              path={["Reports", "Report Trace", "Order Trace Report"]}
            />
            <div className="flex justify-between gap-7 h-[36px]">
              {showTable && (
                <div className="flex p-2 items-center justify-center rounded border border-[#CBCBCB] text-base font-normal leading-relaxed">
                  <p>
                    Generated on: <span> {new Date().toLocaleString()}</span>
                  </p>
                </div>
              )}
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
              justifyContent={"space-around"}
              alignItems={"center"}
              gap={"24px"}
            >
              <div className="">
                <div className="text-[13px]">Order ID </div>
                <AsyncSelect
                  onChange={handleOrderIDChange}
                  value={selectedOption}
                  loadOptions={loadOptions}
                  cacheOptions
                  defaultOptions
                  onInputChange={(value) => setQuery(value)}

                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      minHeight: 30,
                      lineHeight: '0.8',
                      height: 8,
                      width: 180,
                      fontSize: 10,
                      // padding: '1px'
                    }),
                    // indicatorSeparator: (provided, state) => ({
                    //   ...provided,
                    //   lineHeight : '0.5',
                    //   height : 2,
                    //   fontSize : 12 // hide the indicator separator
                    // }),
                    dropdownIndicator: (provided, state) => ({
                      ...provided,
                      padding: '1px', // adjust padding for the dropdown indicator
                    }),
                    // options: (provided, state) => ({
                    //     ...provided,
                    //     fontSize: 10// adjust padding for the dropdown indicator
                    // }),
                    option: (provided, state) => ({
                      ...provided,
                      padding: '2px 10px', // Adjust padding of individual options (top/bottom, left/right)
                      margin: 0, // Ensure no extra margin
                      fontSize: 10 // Adjust font size of individual options
                    }),
                    menu: (provided, state) => ({
                      ...provided,
                      width: 180, // Adjust the width of the dropdown menu
                      zIndex: 9999 // Ensure the menu appears above other elements
                    }),
                    menuList: (provided, state) => ({
                      ...provided,
                      padding: 0, // Adjust padding of the menu list
                      fontSize: 10,
                      maxHeight: 150 // Adjust font size of the menu list
                    }),

                  }}
                />
              </div>
              <Button
                variant="outlined"
                //   onClick={handleShow}
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
                  marginTop: "14px",
                  "&:hover": {
                    //you want this to be the same as the backgroundColor above
                    backgroundColor: "#004DD7",
                    color: "#fff",
                  },
                }}
                onClick={handleShow}
                disabled={!(selectedOption.value)}
              >
                Show
              </Button>
            </Stack>
          </Stack>

          <SimpleTable
            columns={columns}
            data={data}
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

          />
        </div>
        {toast && (
          <SucessfullModal
            isOpen={toast}
            message="New Receipt Added Successfully"
          />
        )}
      </Stack>
    </Container>
  );
};

export default OrderTraceReport;
