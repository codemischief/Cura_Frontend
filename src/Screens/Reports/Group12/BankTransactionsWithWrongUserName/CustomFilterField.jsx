import { useDispatch } from "react-redux";
import { FilterField } from "../../../../Components/common/table/FilterField";
import { useSelector } from "react-redux";
import { setBankTransactionsWithWrongUserNameFilter,setPageNumber } from "../../../../Redux/slice/reporting/Group12/BankTransactionsWithWrongUserName";

export function CustomFilterField(props) {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.bankTransactionsWithWrongUserName);

  const handleFilterChange = (filters) => {
    dispatch(setBankTransactionsWithWrongUserNameFilter(filters));
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
