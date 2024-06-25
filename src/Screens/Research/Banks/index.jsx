import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";

import HeaderBreadcrum from "../../../Components/common/HeaderBreadcum";
import SimpleTable from "../../../Components/common/table/CustomTable";
import SearchBar from "../../../Components/common/SearchBar/SearchBar";
import { formatedFilterData } from "../../../utils/filters";
import { APIService } from "../../../services/API";
import {
  deleteBanksAndBranches,
  downloadBanksAndBranchesDataXls,
  getBanksAndBranches,
  setCountPerPage,
  setPageNumber,
  setSorting,
} from "../../../Redux/slice/Research/BanksAndBranchesSlice";

import getColumns from "./Columns";
import AlertModal, {
  alertVariant,
} from "../../../Components/modals/AlertModal";
import CustomDeleteModal from "../../../Components/modals/CustomDeleteModal";
import errorHandler from "../../../Components/common/ErrorHandler";
import BankAndBranchesForm from "./BankAndBranchesForm";
import useAuth from "../../../context/JwtContext";
const ResearchBanks = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const {
    BankAndBranchesData,
    status,
    totalCount,
    sorting,
    countPerPage,
    pageNo,
    filter,
  } = useSelector((state) => state.banksandbranches);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [openSubmissionPrompt, SetOpenSubmissionPrompt] = useState(null);
  const [propmtType, setPromptType] = useState("");
  const [editData, setEditData] = useState({});
  const [isDeleteDialogue, setIsDeleteDialogue] = useState(null);
  const [deleteError, setDeleteError] = useState("");

  const handleEdit = async (data) => {
    try {
      let dataItem = {
        user_id: user.id,
        table_name: "banksandbranches",
        item_id: data.id,
      };
      const response = await APIService.getItembyId(dataItem);
      let updatedaresponse = await response.json();
      setEditData(updatedaresponse?.data);
      setOpenForm(true);
    } catch (error) {
      errorHandler(error, "Failed to fetch Please try again later");
    }
  };

  const handleDelete = (data) => {
    setIsDeleteDialogue(data.id);
  };

  const columns = useMemo(() => getColumns(handleEdit, handleDelete), []);
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

  const fetchData = () => {
    let obj = {
      user_id: user.id,

      rows: [
        "id",
        "name",
        "bankaddress",
        "emailid",
        "phoneno",
        "website",
        "contactperson"
      ],
      filters: formatedFilterData(filter),
      sort_by: sorting.sort_by ? [sorting.sort_by] : [],
      order: sorting.sort_order,
      pg_no: +pageNo,
      pg_size: +countPerPage,
      search_key: searchInput,
    };
    dispatch(getBanksAndBranches(obj));
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
    fetchData();
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
        "name",
        "bankaddress",
        "emailid",
        "phoneno",
        "website",
        "contactperson",
        "id",
      ],
      colmap: {
        "name": "Name",
        "bankaddress" : "Branch Address",
        "emailid": "Email ID",
        "phoneno": "Phone Number",
        "website": "Website",
        "contactperson": "Contact",
        "id": "ID",
      },
      sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
      downloadType: "excel",
      filters: formatedFilterData(filter),
      search_key: search,
      pg_no: 0,
      pg_size: 0,
      order: sorting.sort_order ? sorting.sort_order : undefined,
    };
    dispatch(downloadBanksAndBranchesDataXls(obj));
  };

  const downloadPdf = () => {

    let obj = {
      user_id: user.id,
      rows: [
        "name",
        "bankaddress",
        "emailid",
        "phoneno",
        "website",
        "contactperson",
        "id",
      ],
      colmap: {
        "name": "Name",
        "bankaddress" : "Bank Address",
        "emailid": "Email ID",
        "phoneno": "Phone Number",
        "website": "Website",
        "contactperson": "Contact",
        "id": "ID",
      },
      sort_by: sorting.sort_by ? [sorting.sort_by] : "",
      downloadType: "pdf",
      routename: "/research/banks",
      filters: formatedFilterData(filter),
      search_key: search,
      pg_no: 0,
      pg_size: 0,
      order: sorting.sort_order ? sorting.sort_order : "",
    };
    dispatch(downloadBanksAndBranchesDataXls(obj, 'pdf'))
  }

  const handleFormOpen = () => {
    setOpenForm(true);
    setEditData({});
  };

  const deleteBanksAndBranchesfnc = async () => {
    try {
      const data = { user_id: user.id, id: isDeleteDialogue };
      await dispatch(deleteBanksAndBranches(data));
      setIsDeleteDialogue(null);
      SetOpenSubmissionPrompt("Banks And Branch Deleted Successfully");
      setPromptType(alertVariant.success);
      fetchData()
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
      ? "Changes Saved Successfully"
      : "New Bank And Branch created successfully";
    SetOpenSubmissionPrompt(messageToUpdate);
    setPromptType(alertVariant.success);
    setOpenForm(false);
    fetchData()

  };

  const openCancel = () => {
    let messageToUpdate = editData?.id
      ? "Process cancelled, No Changes Saved."
      : "Process cancelled, no new Bank And Branch created.";
    SetOpenSubmissionPrompt(messageToUpdate);
    setPromptType(alertVariant.cancel);
    setOpenForm(false);
  };

  return (
    <div className="h-[calc(100vh-7rem)]">
      {openForm && (
        <BankAndBranchesForm
          isOpen={openForm}
          handleClose={openCancel}
          editData={editData}
          openSucess={openSucess}
        />
      )}
      <div className="flex flex-col px-4 gap-[1.75rem]">
        <div className="flex justify-between mt-[10px]">
          <HeaderBreadcrum
            heading={"Banks And Branches"}
            path={["Research ", "Banks And Branches"]}
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
              className="bg-[#004DD7] text-white h-[36px] w-[340px] rounded-lg"
              onClick={handleFormOpen}
            >
              <div className="flex items-center justify-center gap-4">
                Add New Banks And Branches
                <PlusOutlined className="fill-white stroke-2" />
              </div>
            </button>
          </div>
        </div>
        <div className="w-full h-full overflow-y-auto">
          <SimpleTable
            columns={columns}
            data={BankAndBranchesData}
            pageNo={pageNo}
            isLoading={status === "loading"}
            totalCount={totalCount}
            style={"text-center"}
            countPerPage={countPerPage}
            height="calc(100vh - 13rem)"
            handlePageCountChange={handlePageCountChange}
            handlePageChange={handlePageChange}
            handleRefresh={fetchData}
            handleSortingChange={handleSortingChange}
            downloadExcel={downloadExcel}
            downloadPdf={downloadPdf}
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
          handleDelete={deleteBanksAndBranchesfnc}
          deleteError={deleteError}
          text={'Banks And Branches'}
        />
      )}
    </div>
  );
};

export default ResearchBanks;
