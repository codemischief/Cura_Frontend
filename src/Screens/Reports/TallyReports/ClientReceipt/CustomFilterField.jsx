import { useDispatch } from "react-redux";
import { FilterField } from "../../../../Components/common/table/FilterField";
import { useSelector } from "react-redux";
import { setClientReceiptViewFilters,setPageNumber } from "../../../../Redux/slice/reporting/TallyReports/ClientReceipt/ClientReceipt";

export function CustomFilterField(props) {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.clientReceiptReport);

  const handleFilterChange = (filters) => {
    dispatch(setClientReceiptViewFilters({...filters}));
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
