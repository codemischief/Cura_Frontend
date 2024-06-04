import { Stack } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import HeaderBreadcrum from "../../../../Components/common/HeaderBreadcum";
import SimpleTableWithFooter from "../../../../Components/common/table/CustomTableWithFooter";
import SearchBar from "../../../../Components/common/SearchBar/SearchBar";
import {
  downloadVendorStatementReport,
  getVendorStatementView,
  setCountPerPage,
  setPageNumber,
  setSorting,
} from "../../../../Redux/slice/reporting/Group9/VendorStatement";
import connectionDataColumn from "./Columns";
import { APIService } from "../../../../services/API";
import { formatedFilterData } from "../../../../utils/filters";
import { getTdsPaidGovtData } from "../../../../Redux/slice/reporting/Group9/tdsPaidToGovt";

const TdsPaidToGovernement = () => {
  const dispatch = useDispatch();
  const {
    vendorStatementView,
    status,
    totalAmount,
    totalCount,
    sorting,
    countPerPage,
    pageNo,
    filter,
  } = useSelector((state) => state.vendorStatement);

  const [showTable, setShowTable] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [vendorData, setVendor] = useState([]);
  const [search, setSearch] = useState("");
  const [intialFields, setIntialFields] = useState({
    start_date: "",
    end_date: "",
    vendor: "",
  });

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

  const getVendor = async () => {
    const data = {
      user_id: 1234,
    };
    const vendor = await APIService.getVendorAdmin(data);
    console.log(vendor, "vendor");
    setVendor((await vendor.json()).data);
  };

  useState(() => {
    getVendor();
  }, []);

  const handleRefresh = () => {
    if (
      intialFields.start_date &&
      intialFields.end_date &&
      intialFields.vendor
    ) {
      let obj = {
        user_id: 1234,
        rows: [
          "type",
          "id",
          "clientname",
          "invoicedate_orderpaymentdate",
          "invoiceamount_orderpaymentamount",
          "estimatedescription_orderdescription",
          "monthyear",
          "modeofpayment",
          "entityname",
        ],
        vendorID: !isNaN(+intialFields.vendor)
          ? +intialFields.vendor
          : intialFields.vendor,

        startdate: intialFields.start_date,
        enddate: intialFields.end_date,
        sort_by: undefined,
        filters: formatedFilterData(filter),
        search_key: search,
        pg_no: +pageNo,
        pg_size: +countPerPage,
        order: undefined,
      };
      dispatch(getVendorStatementView(obj));
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
    if (
      intialFields.start_date &&
      intialFields.end_date &&
      intialFields.vendor
    ) {
      let obj = {
        user_id: 1234,
        rows: [
          "type",
          "id",
          "clientname",
          "invoicedate_orderpaymentdate",
          "invoiceamount_orderpaymentamount",
          "estimatedescription_orderdescription",
          "monthyear",
          "modeofpayment",
          "entityname",
        ],
        vendorID: !isNaN(+intialFields.vendor)
          ? +intialFields.vendor
          : intialFields.vendor,

        startdate: intialFields.start_date,
        enddate: intialFields.end_date,
        sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
        filters: formatedFilterData(filter),
        search_key: search,
        pg_no: +pageNo,
        pg_size: +countPerPage,
        order: sorting.sort_order ? sorting.sort_order : undefined,
      };
      dispatch(getTdsPaidGovtData(obj));
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
      rows: [
        "type",
        "id",
        "clientname",
        "invoicedate_orderpaymentdate",
        "invoiceamount_orderpaymentamount",
        "estimatedescription_orderdescription",
        "monthyear",
        "modeofpayment",
        "entityname",
      ],
      paymentMode: !isNaN(+intialFields.vendor)
        ? +intialFields.vendor
        : intialFields.vendor,

      startdate: intialFields.start_date,
      downloadType: "excel",
      enddate: intialFields.end_date,
      sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
      filters: formatedFilterData(filter),
      search_key: search,
      pg_no: 0,
      pg_size: 0,
      colmap: {
        type: "Type",
        id: "ID",
        clientname: "Client Name",

        invoicedate_orderpaymentdate: "Date",
        invoiceamount_orderpaymentamount: "Amount",
        estimatedescription_orderdescription: "Estimate / Order Description",
        monthyear: "Month-Year",
        modeofpayment: "Mode of Payment",
        entityname: "Entity",
      },
      order: sorting.sort_order ? sorting.sort_order : undefined,
    };
    dispatch(downloadVendorStatementReport(obj));
  };

  return (
    <Stack gap="1rem" sx={{ paddingTop: "20px" }}>
      <div className="flex flex-col px-4">
        <div className="flex justify-between">
          <HeaderBreadcrum
            heading={"TDS Paid to Government"}
            path={["Reports", "TDS Report", "TDS Paid to Government"]}
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

        <SimpleTableWithFooter
          pageName={"vendorStatement"}
          columns={columns}
          data={vendorStatementView}
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
          height="calc(100vh - 18rem)"
        />
      </div>
    </Stack>
  );
};

export default TdsPaidToGovernement;
