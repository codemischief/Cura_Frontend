import { Button, Stack, Typography } from "@mui/material";
import Navbar from "../../../Components/Navabar/Navbar";
import HeaderBreadcrum from "../../../Components/common/HeaderBreadcum";
import { useState } from "react";
import AddButton from "../../../Components/common/CustomButton";
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
const OrderPaymentList = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [toast, setToast] = useState(false);
  return (
    <Stack gap="1rem">
      <Navbar />
      <Stack direction={"column"} paddingX={"14px"}>
        <HeaderBreadcrum
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
                // value={selectedYear}
                // onChange={handleSelectYear}
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
                // onChange={handleSelectMonth}
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
            //   onClick={handleShow}
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

          <AddButton
            title="Add New PMA Invoice"
            onClick={() => {
              selectedYear && selectedMonth && showTable && setOpenModal(true);
            }}
          />
        </Stack>

        {/* {pmaBillingData && (
          <PmaBillingTable
            data={pmaBillingData}
            column={columns}
            loading={status === "loading"}
            onRefresh={handleRefresh}
          />
        )} */}
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

export default OrderPaymentList;
