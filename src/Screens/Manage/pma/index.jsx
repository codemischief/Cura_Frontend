import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, LinearProgress, Stack, Typography } from "@mui/material";
import Navbar from "../../../Components/Navabar/Navbar";
import HeaderBreadcum from "../../../Components/common/HeaderBreadcum";
import CustomButton from "../../../Components/common/CustomButton";
import { addNewInvoices, getPmaBilling } from "../../../Redux/slice/pmaSlice";
import connectionDataColumn from "./columns";
import PmaBillingTable from "./TableSkeleton";
import ConfirmationModal from "../../../Components/common/ConfirmationModal";
import SucessfullModal from "../../../Components/modals/SucessfullModal";

function getYearsRange() {
  const currentYear = new Date().getFullYear();
  const yearsRange = [];
  for (let i = currentYear - 10; i <= currentYear + 10; i++) {
    yearsRange.push(i.toString());
  }
  return yearsRange;
}
let YEARS = getYearsRange();
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const PmaBilling = () => {
  const dispatch = useDispatch();
  const {
    pmaBillingData,
    status,
    totalCount,
    sorting,
    countPerPage,
    pageNo,
    filter,
  } = useSelector((state) => state.pmaBilling);
  const [showTable, setShowTable] = useState(false);
  const [error, setError] = useState({ year: false, month: false });
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [toast, setToast] = useState(false);
  const columns = useMemo(() => connectionDataColumn(), []);

  function convertData(obj) {
    return Object.entries(obj).map(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        return [key, ...value];
      } else {
        return [];
      }
    });
  }

  useEffect(() => {
    if (selectedMonth && selectedYear) {
      let obj = {
        user_id: 1234,
        month: +selectedMonth,
        year: +selectedYear,
        filters: convertData(filter),
        pg_no: +pageNo,
        insertIntoDB: false,
        pg_size: +countPerPage,
        sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
        order: sorting.sort_order ? sorting.sort_order : undefined,
      };
      dispatch(getPmaBilling(obj, selectedYear, selectedMonth, countPerPage));
    }
  }, [pageNo, filter, countPerPage, sorting.sort_by, sorting.sort_order]);
  

  console.log("filter", filter);
  // useEffect(() => {
  //   if (status === "success") {
  //     setOpenModal(false);
  //   }
  // }, [status]);

  const handleSelectMonth = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleSelectYear = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleShow = () => {
    if (selectedYear && selectedMonth) {
      let obj = {
        user_id: 1234,
        month: +selectedMonth,
        year: +selectedYear,
        filters: [],
        pg_no: 1,
        insertIntoDB: false,
        pg_size: +countPerPage,
      };
      dispatch(getPmaBilling(obj, selectedYear, selectedMonth));
      setShowTable(true);
    } else {
      setError((prev) => ({
        ...prev,
        year: selectedYear ? prev.year : "please select a year first",
        month: selectedMonth ? prev.month : "please select a year first",
      }));
    }
  };
  const hadleConfirm = () => {
    if (selectedYear && selectedMonth) {
      let obj = {
        user_id: 1234,
        month: +selectedMonth,
        year: selectedYear,
        filters: [],
        pg_no: 1,
        insertIntoDB: true,
        pg_size: 30,
      };
      dispatch(addNewInvoices(obj)).then((res) => {
        if (res.result === "success") {
          setOpenModal(false);
          setToast(true);
          setTimeout(function () {
            setToast(false);
          }, 2000);
        }
      });
    }
  };

  const handleRefresh = () => {
    if (selectedMonth && selectedYear) {
      let obj = {
        user_id: 1234,
        month: +selectedMonth,
        year: +selectedYear,
        filters: convertData(filter),
        pg_no: +pageNo,
        insertIntoDB: false,
        pg_size: +countPerPage,
        sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
        order: sorting.sort_order ? sorting.sort_order : undefined,
      };
      dispatch(getPmaBilling(obj, selectedYear, selectedMonth, countPerPage));
    }
  };
  return (
    <Stack gap="1rem">
      <Navbar />
      <Stack direction={"column"} paddingX={"14px"}>
        <HeaderBreadcum
          heading={"Manage PMA Billing"}
          path={["Manage", "Manage PMA Billing"]}
        />
        <Stack
          marginTop={"8px"}
          justifyContent={"space-between"}
          direction={"row"}
          alignItems={"center"}
        >
          <Stack
            direction={"row"}
            justifyContent={"space-around"}
            alignItems={"center"}
            gap={"24px"}
          >
            <div className="flex flex-col h-16 w-[281px]">
              <label className="font-sans text-sm font-normal leading-5">
                Select Year <span className="text-[#CD0000]">*</span>
              </label>
              <select
                className="w-full max-h-[224px] h-8 border-[1px] border-[#C6C6C6] bg-white rounded-sm px-3 text-xs outline-none"
                name="year"
                value={selectedYear}
                onChange={handleSelectYear}
              >
                <option selected value={""} className="hidden"></option>
                {YEARS.map((item) => {
                  return (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-col h-16 w-[281px]">
              <label className="font-sans text-sm font-normal leading-5">
                Select Month <span className="text-[#CD0000]">*</span>
              </label>
              <select
                className="w-[281px] h-8 border-[1px] border-[#C6C6C6] bg-white rounded-sm px-3 text-xs outline-none"
                name="year"
                value={selectedMonth}
                defaultValue="Select State"
                onChange={handleSelectMonth}
              >
                <option selected value={""} className="hidden"></option>
                {MONTHS.map((item, index) => {
                  return (
                    <option value={index + 1} key={index}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
            <Button
              variant="outlined"
              onClick={handleShow}
              sx={{
                height: "36px",
                textTransform: "none",
                color: "#004DD7",
                borderRadius: "8px",
                width: "133px",
                fontSize: "14px",
                border: "1px solid #004DD7",
                fontWeight: "600px",
                lineHeight: "18.9px",
                marginTop: "4px",
                "&:hover": {
                  //you want this to be the same as the backgroundColor above
                  backgroundColor: "#004DD7",
                  color: "#fff",
                },
              }}
              disabled={!(selectedYear && selectedMonth)}
            >
              Show
            </Button>
          </Stack>

          <CustomButton
            title="Add New PMA Invoice"
            onClick={() => {
              selectedYear && selectedMonth && showTable && setOpenModal(true);
            }}
          />
        </Stack>

        {pmaBillingData && (
          <PmaBillingTable
            data={pmaBillingData}
            column={columns}
            loading={status === "loading"}
            onRefresh={handleRefresh}
          />
        )}
      </Stack>
      <ConfirmationModal
        open={openModal}
        loading={status === "loading"}
        btnTitle="Confirm"
        onClose={() => {
          setOpenModal(false);
        }}
        onSubmit={() => {
          hadleConfirm();
        }}
        title="Generate New Invoices"
        description={
          <Typography
            sx={{
              fontFamily: "Open Sans",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "150%" /* 21px */,
              color: "#282828",
            }}
          >
            Are you sure you want to generate new invoices?
          </Typography>
        }
      />
      {toast && (
        <SucessfullModal
          isOpen={toast}
          message="New Invoice Added Successfully"
        />
      )}
    </Stack>
  );
};
export default PmaBilling;
