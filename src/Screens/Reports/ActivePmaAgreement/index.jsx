import HeaderBreadcrum from "../../../Components/common/HeaderBreadcum";
import { useEffect, useMemo, useState, useRef } from "react";
import SucessfullModal from "../../../Components/modals/SucessfullModal";
// import SimpleTable from "../../../Components/common/table/CustomTable";
import connectionDataColumn from "./Columns";
import SearchBar from "../../../Components/common/SearchBar/SearchBar";
import { useDispatch } from "react-redux";
import RefreshReports from "../../../Components/common/buttons/RefreshReports";
import {
  downloadActivePmaAgreement,
  getActivePmaAgreement,
  setCountPerPage,
  setInitialState,
  setPageNumber,
  setSorting,
  resetFilters,
} from "../../../Redux/slice/reporting/ActivePmaAgreement";
import { useSelector } from "react-redux";
// import DatePicker from "../../../Components/common/select/CustomDate";
import { formatedFilterData } from "../../../utils/filters";
import SimpleTable from "../../../Components/common/table/CustomTable";
import Container from "../../../Components/common/Container";
import useAuth from "../../../context/JwtContext";

const PmaInvoiceList = () => {
  const dispatch = useDispatch();
  const isInitialMount = useRef(true);
  const { user } = useAuth();
  const {
    activePmaAgreement,
    status,
    totalCount,
    sorting,
    countPerPage,
    pageNo,
    filter,
  } = useSelector((state) => state.activePmaAgreement);

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
    let obj = {
      user_id: user.id,
      rows: [
        "clientname",
        "propertydescription",
        "description",
        "propertystatus",
        "electricitybillingunit",
        "electricityconsumernumber",
        "propertytaxnumber",
        "rentamount",
        "startdate",
        "enddate",
        "lnlstartdate",
        "lnlenddate",
        "poastartdate",
      ],
      sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
      order: sorting.sort_order ? sorting.sort_order : undefined,
      filters: formatedFilterData(filter),
      search_key: search,
      pg_no: +pageNo,
      pg_size: +countPerPage,
    };
    dispatch(getActivePmaAgreement(obj));
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
    if (isInitialMount.current) {
      dispatch(setInitialState());
      isInitialMount.current = false;
    } else {
      let obj = {
        user_id: user.id,
        rows: [
          "clientname",
          "propertydescription",
          "description",
          "propertystatus",
          "electricitybillingunit",
          "electricityconsumernumber",
          "propertytaxnumber",
          "rentamount",
          "startdate",
          "enddate",
          "lnlstartdate",
          "lnlenddate",
          "poastartdate",
        ],
        sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
        filters: formatedFilterData(filter),
        search_key: search,
        pg_no: +pageNo,
        pg_size: +countPerPage,
        order: sorting.sort_order ? sorting.sort_order : undefined,
      };
      dispatch(getActivePmaAgreement(obj));
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
        "clientname",
        "propertydescription",
        "description",
        "propertystatus",
        "electricitybillingunit",
        "propertytaxnumber",
        "rentamount",
        "startdate",
        "enddate",
        "lnlstartdate",
        "lnlenddate",
        "poastartdate",
      ],
      sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
      filters: formatedFilterData(filter),
      downloadType: "excel",
      colmap: {
        clientname: "Client Name",
        propertydescription: "Property Description",
        description: "Care Taking Description",
        propertystatus: "Property Status",
        propertytaxnumber: "Property Tax Number",
        electricitybillingunit: "Electricity Billing Unit",
        rentamount: "Rent",
        startdate: "PMA Start Date",
        enddate: "PMA End Date",
        lnlstartdate: "LnL Start Date",
        lnlenddate: "LnL End Date",
        poastartdate: "POA Start Date",
      },
      search_key: search,
      pg_no: 0,
      pg_size: 0,
      order: sorting.sort_order ? sorting.sort_order : undefined,
    };
    dispatch(downloadActivePmaAgreement(obj));
  };

  const downloadPdf = () => {
    let obj = {
      user_id: user.id,
      rows: [
        "clientname",
        "propertydescription",
        "description",
        "propertystatus",
        "electricitybillingunit",
        "propertytaxnumber",
        "rentamount",
        "startdate",
        "enddate",
        "lnlstartdate",
        "lnlenddate",
        "poastartdate",
      ],
      sort_by: sorting.sort_by ? [sorting.sort_by] : "",
      downloadType: "pdf",
      routename: "/reports/activePmaAgreement",
      colmap: {
        clientname: "Client Name",
        propertydescription: "Property Description",
        description: "Care Taking Description",
        propertystatus: "Property Status",
        propertytaxnumber: "Property Tax Number",
        electricitybillingunit: "Electricity Billing Unit",
        rentamount: "Rent",
        startdate: "PMA Start Date",
        enddate: "PMA End Date",
        lnlstartdate: "LnL Start Date",
        lnlenddate: "LnL End Date",
        poastartdate: "POA Start Date",
      },
      filters: formatedFilterData(filter),
      search_key: search,
      pg_no: 0,
      pg_size: 0,
      order: sorting.sort_order ? sorting.sort_order : "",
    };
    dispatch(downloadActivePmaAgreement(obj, "pdf"));
  };

  return (
    <Container>
      <div className="flex flex-col px-4 w-full">
        <div className="flex justify-between">
          <HeaderBreadcrum
            heading={"Active PMA Agreements"}
            path={["Reports", "PMA", "Active PMA Agreements"]}
          />

          <div className="flex justify-between gap-7 h-[36px]">
            <div className="flex p-2 items-center justify-center rounded border border-[#CBCBCB] text-base font-normal leading-relaxed">
              <p>
                Generated on: <span> {new Date().toLocaleString()}</span>
              </p>
            </div>

            {/* <div className="flex flex-col"> */}
            <SearchBar
              value={searchInput}
              handleSearchvalue={handleSearchvalue}
              handleSearch={handleSearch}
              removeSearchValue={removeSearchValue}
              onKeyDown={handleSearchEnterKey}
            />
            <RefreshReports onClick={() => dispatch(resetFilters())} />
          </div>
        </div>

        <SimpleTable
          columns={columns}
          data={activePmaAgreement}
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
          height="calc(100vh - 11rem)"
        />
      </div>
      {toast && (
        <SucessfullModal
          isOpen={toast}
          message="New Receipt Added Successfully"
        />
      )}
    </Container>
  );
};

export default PmaInvoiceList;
