import HeaderBreadcrum from "../../../Components/common/HeaderBreadcum";
import { useEffect, useMemo, useState } from "react";
import SimpleTable from "../../../Components/common/table/CustomTable";
import connectionDataColumn from "./Columns";
import SearchBar from "../../../Components/common/SearchBar/SearchBar";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { formatedFilterData } from "../../../utils/filters";
import {
  deleteAgents,
  getAgentData,
  setCountPerPage,
  setPageNumber,
  setSorting
} from "../../../Redux/slice/Research/AgentSlice";
import { PlusOutlined } from "@ant-design/icons";
import EmployerForm from "./EmployerForm";
import AlertModal, {
  alertVariant,
} from "../../../Components/modals/AlertModal";
import CustomDeleteModal from "../../../Components/modals/CustomDeleteModal";

const ResearchAgent = () => {
  const dispatch = useDispatch();
  const {
    AgentData,
    status,
    totalCount,
    sorting,
    countPerPage,
    pageNo,
    filter,
  } = useSelector((state) => state.agent);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [openSubmissionPrompt, SetOpenSubmissionPrompt] = useState(null);
  const [propmtType, setPromptType] = useState("");
  const [editData, setEditData] = useState({});
  const [isDeleteDialogue, setIsDeleteDialogue] = useState(null);
  const [deleteError, setDeleteError] = useState("");

  const handleEdit = (data) => {
    setEditData({ ...data });
    setOpenForm(true);
  };
  const handleDelete = (data) => {
    setIsDeleteDialogue(data.id);
  };

  const columns = useMemo(
    () => connectionDataColumn(handleEdit, handleDelete),
    []
  );
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
      // dispatch(getOrderPaymentData(obj));
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
        "nameofagent",
        "agencyname",
        "emailid",
        "phoneno",
        "phoneno2",
        "localitiesdealing",
        "nameofpartners",
        "registered"
      ],
      filters: formatedFilterData(filter),
      sort_by: sorting.sort_by ? [sorting.sort_by] : [],
      order: sorting.sort_order,
      pg_no: +pageNo,
      pg_size: +countPerPage,
      search_key: searchInput,
    };
    dispatch(getAgentData(obj));
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
    // dispatch(downloadPaymentDataXls(obj));
  };

  const handleFormOpen = () => {
    setOpenForm(true);
    setEditData({});
  };

  const deleteAgents = async () => {
    try {
      const data = { user_id: 1234, id: isDeleteDialogue };
      await dispatch(deleteAgents(data));
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

  useEffect(() => {
    if (openSubmissionPrompt) {
      setTimeout(() => {
        setPromptType("");
        SetOpenSubmissionPrompt(null);
      }, [2000]);
    }
  }, [openSubmissionPrompt]);

  const openSucess = () => {
    let messageToUpdate = editData?.id
      ? "New Prospect updated successfully"
      : "New Prospect created successfully";
    SetOpenSubmissionPrompt(messageToUpdate);
    setPromptType(alertVariant.success);
    setOpenForm(false);
  };

  const openCancel = () => {
    let messageToUpdate = editData?.id
      ? "Process cancelled, no new Prospect updated."
      : "Process cancelled, no new Prospect created.";
    SetOpenSubmissionPrompt(messageToUpdate);
    setPromptType(alertVariant.cancel);
    setOpenForm(false);
  };

  return (
    <div className="h-[calc(100vh-7rem)]">
      {openForm && (
        <EmployerForm
          isOpen={openForm}
          handleClose={openCancel}
          editData={editData}
          openSucess={openSucess}
        />
      )}
      <div className="flex flex-col px-4 gap-[1.75rem]">
        <div className="flex justify-between mt-[10px]">
          <HeaderBreadcrum
            heading={"Real Estate Agents"}
            path={["Research ", "Real Estate Agents"]}
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
              onClick={handleFormOpen}
            >
              <div className="flex items-center justify-center gap-4">
                Add New Employer
                <PlusOutlined className="fill-white stroke-2" />
              </div>
            </button>
          </div>
        </div>
        <div className="w-full h-full overflow-y-auto">
          {console.log(AgentData)}
          <SimpleTable
            columns={columns}
            data={AgentData}
            pageNo={pageNo}
            isLoading={status === "loading"}
            totalCount={totalCount}
            style={"text-center"}
            countPerPage={countPerPage}
            height="calc(100vh - 15rem)"
            handlePageCountChange={handlePageCountChange}
            handlePageChange={handlePageChange}
            handleRefresh={handleRefresh}
            handleSortingChange={handleSortingChange}
            downloadExcel={downloadExcel}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>
      </div>

      {openSubmissionPrompt && (
        <AlertModal
          isOpen={openSubmissionPrompt ? true : false}
          variant={propmtType}
          message={openSubmissionPrompt}
        />
      )}
      {isDeleteDialogue && (
        <CustomDeleteModal
          openDialog={isDeleteDialogue ? true : false}
          setOpenDialog={setIsDeleteDialogue}
          handleDelete={deleteAgents}
          deleteError={deleteError}
        />
      )}
    </div>
  );
};

export default ResearchAgent;
