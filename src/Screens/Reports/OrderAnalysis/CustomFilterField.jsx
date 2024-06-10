import { useDispatch } from "react-redux";
import { FilterField } from "../../../Components/common/table/FilterField";
import { useSelector } from "react-redux";
import { setFilters,setPageNumber } from "../../../Redux/slice/reporting/OrderAnalysis/OrderAnalysis";

export function CustomFilterField(props) {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.orderAnalysis);

  const handleFilterChange = (filters) => {
    dispatch(setFilters({...filters}));
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
