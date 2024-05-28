import { Button, Stack, Typography } from "@mui/material";
import Navbar from "../../../Components/Navabar/Navbar";
import HeaderBreadcrum from "../../../Components/common/HeaderBreadcum";
import { useEffect, useMemo, useState } from "react";
import ConfirmationModal from "../../../Components/common/ConfirmationModal";
import SucessfullModal from "../../../Components/modals/SucessfullModal";
import SimpleTable from "../../../Components/common/table/CustomTable";
import connectionDataColumn from "./Columns";
import SearchBar from "../../../Components/common/SearchBar/SearchBar";
import { useDispatch } from "react-redux";
// import {
//   downloadPaymentDataXls,
//   getOrderPaymentData,
//   setCountPerPage,
//   setInitialState,
//   setPageNumber,
//   setSorting,
//   setStatus,
// } from "../../../Redux/slice/reporting/OrderPaymentSlice";
import { useSelector } from "react-redux";
import DatePicker from "../../../Components/common/select/CustomDate";
import { formatedFilterData } from "../../../utils/filters";
import { getPropect, setCountPerPage, setPageNumber } from "../../../Redux/slice/Research/ProspectSlice";
import { PlusCircleFilled } from "@ant-design/icons";
import ProspectForm from "./ProspectForm";

const PropectusPage = () => {
  const dispatch = useDispatch();
  const {
    PropectusData,
    formSubmissionStatus,
    status,
    totalCount,
    sorting,
    countPerPage,
    pageNo,
    filter,
  } = useSelector((state) => state.prospect);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [toast, setToast] = useState(false);
  const columns = useMemo(() => connectionDataColumn(), []);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [openSubmissionPrompt, SetOpenSubmissionPrompt] = useState(false);
  const [editData, setEditData] = useState({});

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
    if (startDate && endDate) {
      let obj = {
        user_id: 1234,
        startdate: startDate ?? "2021-01-01",
        enddate: endDate ?? "2022-01-01",
        rows: [
          "id",
          "type",
          "paymentdate",
          "monthyear",
          "fy",
          "amount",
          "entityname",
          "mode_of_payment",
          "clientid",
          "clientname",
          "vendorname",
          "orderid",
          "orderdescription",
          "serviceid",
          "service",
          "lobname",
        ],
        sort_by: ["id"],

        filters: formatedFilterData(filter),
        search_key: search,
        pg_no: +pageNo,
        pg_size: +countPerPage,
      };
      dispatch(getOrderPaymentData(obj));
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
    const obj = {
      user_id: 1234,
      rows: [
        "id",
        "personname",
        "suburb",
        "city",
        "state",
        "country",
        "propertylocation",
        "possibleservices",
      ],
      filters: [],
      sort_by: [],
      order: "desc",
      pg_no: 0,
      pg_size: +pageNo,
      search_key: searchInput,
    };

    dispatch(getPropect(obj));
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
    // dispatch(setSorting({ sort_by: accessor, sort_order: sortOrder }));
  };

  const downloadExcel = async () => {
    // let obj = {
    //   user_id: 1234,
    //   startdate: startDate ?? "2021-01-01",
    //   enddate: endDate ?? "2022-01-01",
    //   rows: [
    //     "type",
    //     "id",
    //     "paymentdate",
    //     "monthyear",
    //     "fy",
    //     "amount",
    //     "entityname",
    //     "mode_of_payment",
    //     "clientid",
    //     "clientname",
    //     "vendorname",
    //     "orderid",
    //     "orderdescription",
    //     "serviceid",
    //     "service",
    //     "lobname",
    //   ],
    //   sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,

    //   filters: formatedFilterData(filter),
    //   search_key: search,
    //   pg_no: 0,
    //   pg_size: 0,
    //   order: sorting.sort_order ? sorting.sort_order : undefined,
    // };
    // dispatch(downloadPaymentDataXls(obj)).then((response) => {
    //   const tableData = response.data;
    //   const worksheet = XLSX.utils.json_to_sheet(tableData);
    //   const workbook = XLSX.utils.book_new();
    //   XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    //   XLSX.writeFile(workbook, "orderPayment.xlsx");
    //   dispatch(setStatus("success"));
    // });
    let obj = {
      user_id: 1234,
      startdate: startDate ?? "2021-01-01",
      enddate: endDate ?? "2022-01-01",
      rows: [
        "id",
        "type",
        "paymentdate",
        "monthyear",
        "fy",
        "amount",
        "entityname",
        "mode_of_payment",
        "clientid",
        "clientname",
        "vendorname",
        "orderid",
        "orderdescription",
        "serviceid",
        "service",
        "lobname",
      ],
      sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
      downloadType: "excel",
      filters: formatedFilterData(filter),
      search_key: search,
      pg_no: 0,
      pg_size: 0,
      order: sorting.sort_order ? sorting.sort_order : undefined,
    };
    dispatch(downloadPaymentDataXls(obj));
  };
  const handleFormOpen = () => {
    setOpenForm(true);
  };
  const handleFormClose = () => {
    if (Object.keys(editData).length > 0) {
      SetOpenSubmissionPrompt(true);
    }
    setOpenForm(false);
  };
  useEffect(() => {
    if (formSubmissionStatus === "success") {
      handleFormClose();
      setTimeout(() => {
        SetOpenSubmissionPrompt(false);
      }, 3000);
    }
  }, [formSubmissionStatus]);

  return (
    <Stack gap="1rem">
      {/* <Navbar />
       */}
      <div className="flex flex-col px-4">
        <div className="flex justify-between mt-[10px]">
          <HeaderBreadcrum
            heading={"Prospect"}
            path={["Research ", "Prospect"]}
          />
          <div className="flex justify-between gap-7 h-[36px]">
            <SearchBar
              value={searchInput}
              handleSearchvalue={handleSearchvalue}
              handleSearch={handleSearch}
              removeSearchValue={removeSearchValue}
              onKeyDown={handleSearchEnterKey}
            />
            <button
              className="bg-[#004DD7] text-white h-[36px] w-[240px] rounded-lg"
              // onClick={handleOpen}
            >
              <div className="flex items-center justify-center gap-4">
                Add New Prospect
                <img
                  className="h-[18px] w-[18px]"
                  src={PlusCircleFilled}
                  alt="add"
                />
              </div>
            </button>
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
          ></Stack>
        </Stack>
        <SimpleTable
          columns={columns}
          data={PropectusData}
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
      {openForm && (
        <ProspectForm
          isOpen={openForm}
          handleClose={handleFormClose}
          editData={{}}
        />
      )}
      {openSubmissionPrompt && (
        <AlertSubmissionModal
          isOpen={openSubmissionPrompt}
          variant={editData?.id ? "warning" : "success"}
          message={
            editData?.id
              ? "Changes saved succesffuly"
              : "New Prospect Created Successfully"
          }
        />
      )}
    </Stack>
  );
};

export default PropectusPage;
