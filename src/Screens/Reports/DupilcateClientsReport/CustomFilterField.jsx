import { useDispatch } from "react-redux";
import { FilterField } from "../../../Components/common/table/FilterField";
// import { setPmaClientReportFilters, setPageNumber } from "../../../Redux/slice/reporting/DuplicateClientReports";
import { setDuplicateClientsReportFilters , setPageNumber } from "../../../Redux/slice/reporting/DuplicateClientReports";
import { useSelector } from "react-redux";

export function CustomFilterField(props) {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.duplicateClientsReport);

  const handleFilterChange = (filters) => {
    dispatch(setDuplicateClientsReportFilters({...filters}));
    dispatch(setPageNumber(1))
  };

  return (
    <FilterField
      {...props}
      onFilterChange={handleFilterChange}
      filter={filter}
    />
  );
}

export function TextFilterField(props) {
  return <CustomFilterField {...props} type="text" />;
}

export function NumberFilterField(props) {
  return <CustomFilterField {...props} type="number" />;
}

export function DateFilterField(props) {
  return <CustomFilterField {...props} type="date" />;
}
