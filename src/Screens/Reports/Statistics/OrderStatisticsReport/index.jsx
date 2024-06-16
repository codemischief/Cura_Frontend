import { Button, Stack } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import HeaderBreadcrum from "../../../../Components/common/HeaderBreadcum";
import SearchBar from "../../../../Components/common/SearchBar/SearchBar";
import {
  downloadOrderStatisticsReport,
  getOrderStatisticsReport,
  setCountPerPage,
  setInitialState,
  setPageNumber,
  setSorting,
} from "../../../../Redux/slice/reporting/Statistics/OrderStatisticsReport/OrderStatisticsReport";
import connectionDataColumn from "./Columns";
import { APIService } from "../../../../services/API";
import { formatedFilterData } from "../../../../utils/filters";
import SimpleTable from "../../../../Components/common/table/CustomTable";
import SimpleTableWithFooter from "../../../../Components/common/table/CustomTableWithFooter";
import useAuth from "../../../../context/JwtContext";

const OrderStaticsView = () => {
  const dispatch = useDispatch();
  const {user} = useAuth();
  const {
    orderStatisticsReport,
    status,
    totalAmount,
    totalCount,
    sorting,
    countPerPage,
    pageNo,
    filter,
  } = useSelector((state) => state.orderStatisticsReport);

  const [showTable, setShowTable] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [lobData, setLobData] = useState([]);
  const [search, setSearch] = useState("");
  const [intialFields, setIntialFields] = useState({
    lob: "",
  });

  const columns = useMemo(() => connectionDataColumn(), []);

  const handleSearchvalue = (e) => {
    setSearchInput(e.target.value);
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setIntialFields({ ...intialFields, [name]: value });
  };

  const handlePageChange = (value) => {
    dispatch(setPageNumber(value));
  };

  const handlePageCountChange = (e) => {
    dispatch(setCountPerPage(e.target.value));
    dispatch(setPageNumber(1));
  };

  const getLob = async () => {
    const data = {
      user_id: user.id,
      rows: ["id", "name"],
      filters: [],
      sort_by: [],
      order: "asc",
      pg_no: 0,
      pg_size: 0,
    };
    const response = await APIService.getLob({...data , user_id:user.id});
    const result = await response.json();

    setLobData(result.data);
  };



  useState(() => {
    getLob();
    dispatch(setInitialState())
  }, []);

  const handleRefresh = () => {
    if (intialFields.lob) {
      let obj = {
        user_id: user.id,
        rows: [
          "service", "on_hold", "estimate_given", "cancelled", "closed"
          , "billed", "inquiry", "completed", "in_progress"
        ],
        lobName: intialFields.lob,
        sort_by: undefined,
        filters: formatedFilterData(filter),
        search_key: search,
        pg_no: +pageNo,
        pg_size: +countPerPage,
        order: undefined,
      };
      dispatch(getOrderStatisticsReport(obj));
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
    if (intialFields.lob) {
      let obj = {
        user_id: user.id,
        rows: [
          "service",
          "on_hold",
          "estimate_given",
          "cancelled",
          "closed",
          "billed",
          "inquiry",
          "completed",
          "in_progress",
        ],
        lobName: intialFields.lob,
        sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
        filters: formatedFilterData(filter),
        search_key: search,
        pg_no: +pageNo,
        pg_size: +countPerPage,
        order: sorting.sort_order ? sorting.sort_order : undefined,
      };
      dispatch(getOrderStatisticsReport(obj));
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
      user_id: user.id,
      rows: [
        "service",
        "on_hold",
        "estimate_given",
        "cancelled",
        "closed",
        "billed",
        "inquiry",
        "completed",
        "in_progress",
      ],
      lobName:intialFields.lob,

      downloadType: "excel",
      sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
      filters: formatedFilterData(filter),
      search_key: search,
      pg_no: 0,
      pg_size: 0,
      colmap: {
        service: "Service",
        on_hold: "On Hold",
        estimate_given: "Estimate Given",
        cancelled: "Cancelled",
        closed: "Closed",
        billed: "Billed",
        inquiry: "Inquiry",
        completed: "Completed",
        in_progress: "In Progress",
      },
      order: sorting.sort_order ? sorting.sort_order : undefined,
    };
    dispatch(downloadOrderStatisticsReport(obj));
  };

  const downloadPdf = () => {
    let obj = {
      user_id: user.id,
      rows: [
        "service",
        "on_hold",
        "estimate_given",
        "cancelled",
        "closed",
        "billed",
        "inquiry",
        "completed",
        "in_progress",
      ],
      lobName:intialFields.lob,
      sort_by: sorting.sort_by ? [sorting.sort_by] : "",
      downloadType: "pdf",
      routename: "/reports/orderStaticsView",
      colmap: {
        service: "Service",
        on_hold: "On Hold",
        estimate_given: "Estimate Given",
        cancelled: "Cancelled",
        closed: "Closed",
        billed: "Billed",
        inquiry: "Inquiry",
        completed: "Completed",
        in_progress: "In Progress",
      },
      filters: formatedFilterData(filter),
      search_key: search,
      pg_no: 0,
      pg_size: 0,
      order: sorting.sort_order ? sorting.sort_order : "",
    }; 
    dispatch(downloadOrderStatisticsReport(obj, 'pdf'))
  }

  const handleShow = () => {
    if (intialFields.lob) {
      dispatch(setInitialState());
      setShowTable(true);
    }
  };

  return (
    <Stack gap="1rem" sx={{ paddingTop: "20px" }}>
      <div className="flex flex-col px-4">
        <div className="flex justify-between">
          <HeaderBreadcrum
            heading={"Order Statistics Report"}
            path={["Reports", "Statistics", "Order Statistics Report"]}
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
            marginLeft={"30px"}
            justifyContent={"space-around"}
            alignItems={"center"}
            gap={"24px"}
          >
            <div className="flex flex-col h-16 w-[281px]">
              <label className="font-sans text-sm font-normal leading-5">
                LOB Name
              </label>

              <select
                className="w-full max-h-[224px] h-8 border-[1px] border-[#C6C6C6] bg-white rounded-sm px-3 text-xs outline-none"
                name="lob"
                value={intialFields.lob}
                onChange={handleChange}
              >
                <option selected className="hidden">Select Lob</option>
                <option value="all">all</option>
                {lobData.map((opt) => (
                  <option value={opt.name}>{opt.name}</option>
                ))}
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
              disabled={!intialFields.lob}
            >
              Show
            </Button>
          </Stack>
        </Stack>
        <SimpleTableWithFooter
          pageName={'orderStaticsReport'}
          columns={columns}
          data={orderStatisticsReport}
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

export default OrderStaticsView;
