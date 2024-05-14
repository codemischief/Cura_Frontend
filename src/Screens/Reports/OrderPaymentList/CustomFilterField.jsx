import { useDispatch } from "react-redux";
import { FilterField } from "../../../Components/common/table/FilterField";
import { setOrderPayFilters } from "../../../Redux/slice/reporting/OrderPaymentSlice";
import { useSelector } from "react-redux";

export function CustomFilterField(props) {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.orderPayment);

  const handleFilterChange = (filter) => {
    console.log("filter", filter);
    dispatch(setOrderPayFilters(filter));
  };

  return (
    <FilterField
      {...props}
      onFilterChange={handleFilterChange}
      filters={filter}
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
