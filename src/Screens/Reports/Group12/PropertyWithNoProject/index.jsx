import { Button, Stack } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import HeaderBreadcrum from "../../../../Components/common/HeaderBreadcum";
import SearchBar from "../../../../Components/common/SearchBar/SearchBar";
import RefreshReports from "../../../../Components/common/buttons/RefreshReports";
import {
  downloadPropertyWithNoProject,
  getPropertyWithNoProject,
  setCountPerPage,
  setPageNumber,
  setSorting,
  setInitialState,
  resetFilters
} from "../../../../Redux/slice/reporting/Group12/PropertyWithNoProject";
import connectionDataColumn from "./Columns";
import { formatedFilterData } from "../../../../utils/filters";
import SimpleTable from "../../../../Components/common/table/CustomTable";
import useAuth from "../../../../context/JwtContext";
import Container from "../../../../Components/common/Container";

const PropertyWithNoProjectView = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const {
    propertyWithNoProject,
    status,
    totalAmount,
    totalCount,
    sorting,
    countPerPage,
    pageNo,
    filter,
  } = useSelector((state) => state.propertyWithNoProject);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const isInitialMount = useRef(true);

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

  const handleRefresh = () => {
    let obj = {
      user_id: user.id,
      "rows": [
        "clientname", "propertydescription", "propertytype", "level_of_furnishing"
      ],
      sort_by: undefined,
      filters: formatedFilterData(filter),
      search_key: search,
      pg_no: +pageNo,
      pg_size: +countPerPage,
      order: undefined,
    };
    dispatch(getPropertyWithNoProject(obj));
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
    }
    else {
      let obj = {
        user_id: user.id,
        rows: [
          "clientname", "propertydescription", "propertytype", "level_of_furnishing"
        ],
        sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
        filters: formatedFilterData(filter),
        search_key: search,
        pg_no: +pageNo,
        pg_size: +countPerPage,
        order: sorting.sort_order ? sorting.sort_order : undefined,
      };
      dispatch(getPropertyWithNoProject(obj));
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
        "clientname", "propertydescription", "propertytype", "level_of_furnishing"
      ],
      downloadType: "excel",
      sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
      filters: formatedFilterData(filter),
      search_key: search,
      pg_no: 0,
      pg_size: 0,
      colmap: {
        clientname: "Client Name",
        propertydescription: "Property Description",
        propertytype: "Property Type",
        level_of_furnishing: "Level of furnishing"
      },
      order: sorting.sort_order ? sorting.sort_order : undefined,
    };
    dispatch(downloadPropertyWithNoProject(obj));
  };

  const downloadPdf = () => {
    let obj = {
      user_id: user.id,
      rows: [
        "clientname", "propertydescription", "propertytype", "level_of_furnishing"
      ],
      sort_by: sorting.sort_by ? [sorting.sort_by] : "",
      downloadType: "pdf",
      routename: "/reports/propertywithnoproject",
      colmap: {
        clientname: "Client Name",
        propertydescription: "Property Description",
        propertytype: "Property Type",
        level_of_furnishing: "Level of furnishing"
      },
      filters: formatedFilterData(filter),
      search_key: search,
      pg_no: 0,
      pg_size: 0,
      order: sorting.sort_order ? sorting.sort_order : "",
    }; 
    dispatch(downloadPropertyWithNoProject(obj, 'pdf'))
  }

  return (
    <Container>

      <div className="flex flex-col px-4">
        <div className="flex justify-between">
          <HeaderBreadcrum
            heading={"PMA Properties With No Projects "}
            path={["Reports", "Exceptions", "PMA Properties With No Projects "]}
          />
          <div className="flex justify-between gap-7 h-[36px]">
            <div className="flex p-2 items-center justify-center rounded border border-[#CBCBCB] text-base font-normal leading-relaxed">
              <p>
                Generated on: <span> {new Date().toLocaleString()}</span>
              </p>
            </div>

            <SearchBar
              value={searchInput}
              handleSearchvalue={handleSearchvalue}
              handleSearch={handleSearch}
              removeSearchValue={removeSearchValue}
              onKeyDown={handleSearchEnterKey}
            />
            <RefreshReports onClick={() => dispatch(resetFilters())}/>
          </div>
        </div>

        <SimpleTable
          columns={columns}
          data={propertyWithNoProject}
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
          height="calc(100vh - 11rem)"
        />
      </div>
    </Container>
  );
};

export default PropertyWithNoProjectView;
