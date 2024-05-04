import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  CircularProgress,
  LinearProgress,
  Stack,
} from "@mui/material";
import Navbar from "../../../Components/Navabar/Navbar";
import HeaderBreadcum from "../../../Components/common/HeaderBreadcum";
import CustomButton from "../../../Components/common/CustomButton";
import MyMaterialTable from "./MyMaterialTable";
import { getPmaBilling } from "../../../Redux/slice/pmaSlice";

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
const PmaBillingTable = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.pmaBilling);
  const [showTable, setShowTable] = useState(false);
  const [error, setError] = useState({ year: false, month: false });
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

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
        year: selectedYear,
        filter: [],
        pg_no: 1,
        pg_size: 30,
      };
      dispatch(getPmaBilling(obj));
      setShowTable(true);
    } else {
      setError((prev) => ({
        ...prev,
        year: selectedYear ? prev.year : "please select a year first",
        month: selectedMonth ? prev.month : "please select a year first",
      }));
    }
  };

  // console.log("status", status);
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
          // alignContent={"center"}
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
                {YEARS.map((item, index) => {
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
          </Stack>
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
          {/* {error.year && <p className="text-red-800">{error.year}</p>}
          {error.month && <p className="text-red-800">{error.month}</p>} */}
          <CustomButton title="Add New PMA Invoice" />
        </Stack>
        {status === "loading" && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
        {status === "success" && showTable && <MyMaterialTable />}
      </Stack>
    </Stack>
  );
};

export default PmaBillingTable;
