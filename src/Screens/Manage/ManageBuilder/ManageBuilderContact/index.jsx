import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import HeaderBreadcrum from "../../../../Components/common/HeaderBreadcum";
import SimpleTable from "../../../../Components/common/table/CustomTable";
import SearchBar from "../../../../Components/common/SearchBar/SearchBar";
import { formatedFilterData } from "../../../../utils/filters";
import { APIService } from "../../../../services/API";
import { getCountries } from "../../../../Redux/slice/commonApis";
import {
  deleteContact,
  downloadContactData,
  getContactData,
  setCountPerPage,
  setPageNumber,
  setSorting,
} from "../../../../Redux/slice/Manage/contact";

import getColumns from "./Columns";
import AlertModal, {alertVariant} from "../../../../Components/modals/AlertModal";
import CustomDeleteModal from "../../../../Components/modals/CustomDeleteModal";
import errorHandler from "../../../../Components/common/ErrorHandler";
import ContactForm from "./ContactForm"
import { useLocation, useParams } from "react-router-dom";
import useAuth from "../../../../context/JwtContext";
import AddButton from "../../../../Components/common/CustomButton";
const ManageBuilderContact = () => {
  const {user} = useAuth()
  const dispatch = useDispatch();
  // const {state} = useLocation()
  const {builderid} = useParams()
  const [state,setState] = useState({})
  console.log(state)
  const {
    ContactData,
    status,
    totalCount,
    sorting,
    countPerPage,
    pageNo,
    filter,
  } = useSelector((state) => state.contact);
  const {
    countryData
  } = useSelector((state) => state.commonApi)
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
        table_name: "Builder_contacts",
        item_id: data.id,
      };
      const response = await APIService.getItembyId(dataItem);
      let updatedaresponse = await response.json();
     
      setEditData(
        {...updatedaresponse.data,buildername : state.buildername}
      );
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
      builderid : builderid,
      rows: [
        "contactname",
        "buildername",
        "jobtitle",
        "suburb",
        "city",
        "id",
      ],
      filters: formatedFilterData(filter),
      sort_by: sorting.sort_by ? [sorting.sort_by] : [],
      order: sorting.sort_order,
      pg_no: +pageNo,
      pg_size: +countPerPage,
      search_key: searchInput,
    };
    dispatch(getContactData(obj));
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
    if (countryData.length === 0) {
      dispatch(getCountries());
    }
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
      builderid :state.builderid,
      rows: [
        "contactname",
        "buildername",
        "jobtitle",
        "suburb",
        "city",
        "id",
      ],
      colmap : {
        "contactname" : "Contact Name",
        "buildername" : "Builder Name",
        "jobtitle" : "Job Title",
        "suburb" : "Suburb",
        "city" : "City",
        "id" : "ID"
      },
      // colmap: { ...colMap, state: "State", country: "Country", city: "City" },
      sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
      downloadType: "excel",
      filters: formatedFilterData(filter),
      search_key: search,
      pg_no: 0,
      pg_size: 0,
      order: sorting.sort_order ? sorting.sort_order : undefined,
    };
    dispatch(downloadContactData(obj));
  };

  const handleFormOpen = () => {
    setOpenForm(true);
    setEditData({buildername : state.buildername, builderid : state.builderid});
  };

  const deleteContactFnc = async () => {
    try {
      const data = { user_id: user.id, id: isDeleteDialogue };
      await dispatch(deleteContact(data));
      setIsDeleteDialogue(null);
      SetOpenSubmissionPrompt("Contact Deleted Successfully");
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
  const fetchHyperLinkData = async  () => {
       if(builderid != null) {
        const data = {
          user_id : user.id,
          table_name : "get_builder_view",
          item_id : builderid
        }
        const response = await APIService.getItembyId(data)
        const res = await response.json()
        console.log(res.data)
        setState(prev => ({
          ...prev,
          buildername : res.data.buildername,
          builderid : builderid
        }))
       }
  }
  useEffect(() => {
      fetchHyperLinkData()
  },[])
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
      : "New Contact created successfully";
    SetOpenSubmissionPrompt(messageToUpdate);
    setPromptType(alertVariant.success);
    setOpenForm(false);
    fetchData()
    
  };

  const openCancel = () => {
    let messageToUpdate = editData?.id
      ? "Process cancelled, No Changes Saved."
      : "Process cancelled, No New Contact Created.";
    SetOpenSubmissionPrompt(messageToUpdate);
    setPromptType(alertVariant.cancel);
    setOpenForm(false);
  };

  return (
    <div className="h-[calc(100vh-7rem)]">
      {openForm && (
        <ContactForm
          isOpen={openForm}
          handleClose={openCancel}
          editData={editData}
          openSucess={openSucess}
        />
      )}
      <div className="flex flex-col px-4 gap-[1rem]">
        <div className="flex justify-between mt-[10px] ">
          <HeaderBreadcrum
            heading={"Contact"}
            path={["Manage ","Manage Builder ", "Contact"]}
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
              <AddButton onClick={handleFormOpen} title="Add New Contact"/>
              
            </button>
          </div>
        </div>
        <div className="w-full px-5  h-12 flex items-center border-gray border-b-[1px]">
            <h1>Builder Name : {state?.buildername}</h1>
        </div>
        <div className="w-full px-5 h-full overflow-y-auto">
          <SimpleTable
            columns={columns}
            data={ContactData}
            pageNo={pageNo}
            isLoading={status === "loading"}
            totalCount={totalCount}
            style={"text-center"}
            countPerPage={countPerPage}
            height="calc(100vh - 18rem)"
            handlePageCountChange={handlePageCountChange}
            handlePageChange={handlePageChange}
            handleRefresh={fetchData}
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
          handleDelete={deleteContactFnc}
          deleteError={deleteError}
          text={'Contact'}
        />
      )}
    </div>
  );
};

export default ManageBuilderContact;
