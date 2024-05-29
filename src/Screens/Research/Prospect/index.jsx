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
import { useSelector } from "react-redux";
import DatePicker from "../../../Components/common/select/CustomDate";
import { formatedFilterData } from "../../../utils/filters";
import {
  deleteProspect,
  getPropect,
  setCountPerPage,
  setPageNumber,
  setSorting,
} from "../../../Redux/slice/Research/ProspectSlice";
import { PlusOutlined } from "@ant-design/icons";
import ProspectForm from "./ProspectForm";
import AlertModal, {
  alertVariant,
} from "../../../Components/modals/AlertModal";
import DeleteProspect from "./DeleteProspect";

const PropectusPage = () => {
  const dispatch = useDispatch();
  const {
    PropectusData,
    status,
    totalCount,
    sorting,
    countPerPage,
    pageNo,
    filter,
  } = useSelector((state) => state.prospect);
  const columns = useMemo(() => connectionDataColumn(), []);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [openSubmissionPrompt, SetOpenSubmissionPrompt] = useState(null);
  const [propmtType, setPromptType] = useState("");
  const [editData, setEditData] = useState({});
  const [isDeleteDialogue, setIsDeleteDialogue] = useState(null);
  const [deleteError,setDeleteError] = useState("")

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
      filters: filter,
      sort_by: sorting.sort_by ? [sorting.sort_by] : [],
      order: sorting.sort_order,
      pg_no: +pageNo,
      pg_size: +countPerPage,
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
    dispatch(setSorting({ sort_by: accessor, sort_order: sortOrder }));
  };

  const downloadExcel = async () => {
    let obj = {
      user_id: 1234,
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
      pg_no: 1,
      pg_size: 15,
      order: sorting.sort_order ? sorting.sort_order : undefined,
    };
    dispatch(downloadPaymentDataXls(obj));
  };

  const handleFormOpen = () => {
    setOpenForm(true);
    setEditData({});
  };

  const handleFormClose = () => {
    // if (Object.keys(editData).length > 0) {
    // SetOpenSubmissionPrompt(null);
    // setPromptType(alertVariant.cancel);
    // }
    setOpenForm(false);
    // setTimeout(() => {
    //   SetOpenSubmissionPrompt(null);
    // }, 5000);
  };

  const deleteProspects = async () => {
    try {
      const data = { user_id: 1234, id: isDeleteDialogue };
      await dispatch(deleteProspect(data));
      setIsDeleteDialogue(null);
      SetOpenSubmissionPrompt("Prospect Deleted Successfully");
      setPromptType(alertVariant.success);
    } catch (error) {
      if (error.response) {
        setDeleteError(error.response.data.detail);
      } else {
        setDeleteError("An unexpected error occurred.");
      }
    }
  };

  const handleDelete = (data) => {
    setIsDeleteDialogue(data.id);
  };

  useEffect(() => {
    if (openSubmissionPrompt) {
      setTimeout(() => {
        setPromptType("");
        SetOpenSubmissionPrompt(null);
      }, [2000]);
    }
  }, [openSubmissionPrompt]);

  const openSucess = (message) => {
    SetOpenSubmissionPrompt(message);
    setPromptType(alertVariant.success);
  };

  const openCancel = (message) => {
    SetOpenSubmissionPrompt(message);
    setPromptType(alertVariant.cancel);
    setOpenForm(false);
  };

  const handleEdit = (data) => {
    setEditData({ ...data });
    setOpenForm(true);
  };

  return (
    <Stack gap="1rem">
      {openForm && (
        <ProspectForm
          isOpen={openForm}
          handleClose={openCancel}
          editData={editData}
          openSucess={openSucess}
        />
      )}
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
              onClick={handleFormOpen}
            >
              <div className="flex items-center justify-center gap-4">
                Add New Prospect
                <PlusOutlined className="fill-white stroke-2" />
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
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>

      {openSubmissionPrompt && (
        <AlertModal
          isOpen={openSubmissionPrompt ? true : false}
          variant={propmtType}
          message={openSubmissionPrompt}
        />
      )}
      {isDeleteDialogue && (
        <DeleteProspect
          openDialog={isDeleteDialogue ? true : false}
          setOpenDialog={setIsDeleteDialogue}
          handleDelete={deleteProspects}
          deleteError={deleteError}

        />
      )}
    </Stack>
  );
};

export default PropectusPage;
