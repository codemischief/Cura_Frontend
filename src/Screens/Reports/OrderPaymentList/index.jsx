import { Button, Stack, Typography } from "@mui/material";
import Navbar from "../../../Components/Navabar/Navbar";
import HeaderBreadcrum from "../../../Components/common/HeaderBreadcum";
import { useMemo, useState } from "react";
import AddButton from "../../../Components/common/CustomButton";
import ConfirmationModal from "../../../Components/common/ConfirmationModal";
import SucessfullModal from "../../../Components/modals/SucessfullModal";
import SimpleTable from "../../../Components/common/table/CustomTable";
import connectionDataColumn from "../Columns";
import SearchBar from '../../../Components/common/SearchBar/SearchBar'


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

const data = [
  {
    id: 3251,
    clientid: 32,
    leavelicenseid: 12856,
    clientname: "Ashish Paranjape (PMA)",
    orderid: 431049,
    briefdescription:
      " Property Management for Varad Vinayak Jun-2021 Charges",
    start_day: 1,
    vacatingdate: null,
    rentamount: 11000,
    rented: null,
    rentedtax: false,
    fixed: 1,
    fixedtax: false,
    entityid: 1,
    rentedamt: null,
    fixedamt: 1,
    rate: 18,
    rentedtaxamt: null,
    fixedtaxamt: 0.18,
    totalbaseamt: 1,
    totaltaxamt: 0.18,
    totalamt: 1.18,
    invoicedate: "01-Jun-2021",
  },
  {
    id: 3252,
    clientid: 271,
    leavelicenseid: 12922,
    clientname: "Ajinkya Bhave(PMA)",
    orderid: 434406,
    briefdescription:
      " Property Management-A-604, Rohan Garima, SB Road, Pune-16. Jun-2021 Charges",
    start_day: 20,
    vacatingdate: null,
    rentamount: 28000,
    rented: 18,
    rentedtax: true,
    fixed: null,
    fixedtax: false,
    entityid: 1,
    rentedamt: 1848,
    fixedamt: null,
    rate: 18,
    rentedtaxamt: 332.64,
    fixedtaxamt: null,
    totalbaseamt: 1848,
    totaltaxamt: 332.64,
    totalamt: 2180.64,
    invoicedate: "01-Jun-2021",
  },
  {
    id: 3258,
    clientid: 308,
    leavelicenseid: 12538,
    clientname: "Abhijeet Bhargaw (PMA)",
    orderid: 433742,
    briefdescription:
      " Property Management Office 218 Business Hub Jun-2021 Charges",
    start_day: 1,
    vacatingdate: null,
    rentamount: 19965,
    rented: 12,
    rentedtax: true,
    fixed: null,
    fixedtax: false,
    entityid: 1,
    rentedamt: 2395.8,
    fixedamt: null,
    rate: 18,
    rentedtaxamt: 431.244,
    fixedtaxamt: null,
    totalbaseamt: 2395.8,
    totaltaxamt: 431.244,
    totalamt: 2827.044,
    invoicedate: "01-Jun-2021",
  },
  {
    id: 3259,
    clientid: 498,
    leavelicenseid: 12725,
    clientname: "Anjali Khambete(PMA)",
    orderid: 434461,
    briefdescription: " Property Management for Yutikha Jun-2021 Charges",
    start_day: 24,
    vacatingdate: null,
    rentamount: 29960,
    rented: 16,
    rentedtax: true,
    fixed: null,
    fixedtax: false,
    entityid: 1,
    rentedamt: 1118.5066666666667,
    fixedamt: null,
    rate: 18,
    rentedtaxamt: 201.3312,
    fixedtaxamt: null,
    totalbaseamt: 1118.5066666666667,
    totaltaxamt: 201.3312,
    totalamt: 1319.8378666666667,
    invoicedate: "01-Jun-2021",
  },
  {
    id: 3262,
    clientid: 29745,
    leavelicenseid: 12688,
    clientname: "Manish  Kurhekar(PMA)",
    orderid: 434238,
    briefdescription: " Property Management  Jun-2021 Charges",
    start_day: 1,
    vacatingdate: null,
    rentamount: 22900,
    rented: 18,
    rentedtax: true,
    fixed: null,
    fixedtax: false,
    entityid: 1,
    rentedamt: 4122,
    fixedamt: null,
    rate: 18,
    rentedtaxamt: 741.96,
    fixedtaxamt: null,
    totalbaseamt: 4122,
    totaltaxamt: 741.96,
    totalamt: 4863.96,
    invoicedate: "01-Jun-2021",
  },
  {
    id: 3264,
    clientid: 41427,
    leavelicenseid: 12812,
    clientname: "Manisha Tijare (PMA)",
    orderid: 434875,
    briefdescription: " Property Management for Yuthika Jun-2021 Charges",
    start_day: 1,
    vacatingdate: null,
    rentamount: 42000,
    rented: 18,
    rentedtax: true,
    fixed: null,
    fixedtax: false,
    entityid: 1,
    rentedamt: 7560,
    fixedamt: null,
    rate: 18,
    rentedtaxamt: 1360.8,
    fixedtaxamt: null,
    totalbaseamt: 7560,
    totaltaxamt: 1360.8,
    totalamt: 8920.8,
    invoicedate: "01-Jun-2021",
  },
  {
    id: 3265,
    clientid: 41427,
    leavelicenseid: 12640,
    clientname: "Manisha Tijare (PMA)",
    orderid: 434020,
    briefdescription:
      " Property Management for Mont Vert Blair Jun-2021 Charges",
    start_day: 1,
    vacatingdate: null,
    rentamount: 18000,
    rented: 18,
    rentedtax: true,
    fixed: null,
    fixedtax: false,
    entityid: 1,
    rentedamt: 3240,
    fixedamt: null,
    rate: 18,
    rentedtaxamt: 583.2,
    fixedtaxamt: null,
    totalbaseamt: 3240,
    totaltaxamt: 583.2,
    totalamt: 3823.2,
    invoicedate: "01-Jun-2021",
  },
  {
    id: 4283,
    clientid: 1596,
    leavelicenseid: 12750,
    clientname: "Vikram Chhibber(PMA)",
    orderid: 433266,
    briefdescription:
      " Property Management -A-305-Geet Ganga Society Jun-2021 Charges",
    start_day: 4,
    vacatingdate: null,
    rentamount: 25920,
    rented: 10,
    rentedtax: true,
    fixed: null,
    fixedtax: false,
    entityid: 1,
    rentedamt: 2332.8,
    fixedamt: null,
    rate: 18,
    rentedtaxamt: 419.904,
    fixedtaxamt: null,
    totalbaseamt: 2332.8,
    totaltaxamt: 419.904,
    totalamt: 2752.704,
    invoicedate: "01-Jun-2021",
  },
  {
    id: 4285,
    clientid: 1736,
    leavelicenseid: 12908,
    clientname: "Meena Bachwani(PMA)",
    orderid: 435105,
    briefdescription:
      " Property Management-A 1901, Megapolis, Sangria,01/11/14-31/10/16 Jun-2021 Charges",
    start_day: 1,
    vacatingdate: null,
    rentamount: 24200,
    rented: 10,
    rentedtax: true,
    fixed: null,
    fixedtax: false,
    entityid: 1,
    rentedamt: 2420,
    fixedamt: null,
    rate: 18,
    rentedtaxamt: 435.6,
    fixedtaxamt: null,
    totalbaseamt: 2420,
    totaltaxamt: 435.6,
    totalamt: 2855.6,
    invoicedate: "01-Jun-2021",
  },
  {
    id: 4288,
    clientid: 373,
    leavelicenseid: 12829,
    clientname: "Thomas Antony(PMA)",
    orderid: 434800,
    briefdescription: " Property Management-Culture Crest Jun-2021 Charges",
    start_day: 3,
    vacatingdate: null,
    rentamount: 25000,
    rented: 14,
    rentedtax: true,
    fixed: null,
    fixedtax: false,
    entityid: 1,
    rentedamt: 3266.6666666666665,
    fixedamt: null,
    rate: 18,
    rentedtaxamt: 588,
    fixedtaxamt: null,
    totalbaseamt: 3266.6666666666665,
    totaltaxamt: 588,
    totalamt: 3854.6666666666665,
    invoicedate: "01-Jun-2021",
  },
  {
    id: 4289,
    clientid: 373,
    leavelicenseid: 12784,
    clientname: "Thomas Antony(PMA)",
    orderid: 434761,
    briefdescription: " Property Management-Peshwani Palace Jun-2021 Charges",
    start_day: 15,
    vacatingdate: null,
    rentamount: 21200,
    rented: 14,
    rentedtax: true,
    fixed: null,
    fixedtax: false,
    entityid: 1,
    rentedamt: 1582.9333333333334,
    fixedamt: null,
    rate: 18,
    rentedtaxamt: 284.928,
    fixedtaxamt: null,
    totalbaseamt: 1582.9333333333334,
    totaltaxamt: 284.928,
    totalamt: 1867.8613333333333,
    invoicedate: "01-Jun-2021",
  },
  {
    id: 4296,
    clientid: 1677,
    leavelicenseid: 12946,
    clientname: "Debarshi  Bhowal(PMA)",
    orderid: 435180,
    briefdescription: " Property Management-Prime Panache,  Jun-2021 Charges",
    start_day: 25,
    vacatingdate: null,
    rentamount: 28000,
    rented: 11,
    rentedtax: true,
    fixed: null,
    fixedtax: false,
    entityid: 1,
    rentedamt: 616,
    fixedamt: null,
    rate: 18,
    rentedtaxamt: 110.88,
    fixedtaxamt: null,
    totalbaseamt: 616,
    totaltaxamt: 110.88,
    totalamt: 726.88,
    invoicedate: "01-Jun-2021",
  },
  {
    id: 4310,
    clientid: 1564,
    leavelicenseid: 12929,
    clientname: "Vikas Karode(PMA)",
    orderid: 435150,
    briefdescription:
      " Property management-Whispering Winds I,  1 BHK -1/6/14 to 31/5/2016 Jun-2021 Charges",
    start_day: 1,
    vacatingdate: null,
    rentamount: 18000,
    rented: 14,
    rentedtax: true,
    fixed: null,
    fixedtax: false,
    entityid: 1,
    rentedamt: 2520,
    fixedamt: null,
    rate: 18,
    rentedtaxamt: 453.6,
    fixedtaxamt: null,
    totalbaseamt: 2520,
    totaltaxamt: 453.6,
    totalamt: 2973.6,
    invoicedate: "01-Jun-2021",
  },
  {
    id: 4312,
    clientid: 40669,
    leavelicenseid: 12801,
    clientname: "Ajay  Adhawade (PMA)",
    orderid: 434852,
    briefdescription:
      " Property Management for Shraddha Garden Jun-2021 Charges",
    start_day: 15,
    vacatingdate: null,
    rentamount: 10000,
    rented: 17,
    rentedtax: true,
    fixed: null,
    fixedtax: false,
    entityid: 1,
    rentedamt: 906.6666666666666,
    fixedamt: null,
    rate: 18,
    rentedtaxamt: 163.2,
    fixedtaxamt: null,
    totalbaseamt: 906.6666666666666,
    totaltaxamt: 163.2,
    totalamt: 1069.8666666666666,
    invoicedate: "01-Jun-2021",
  },
  {
    id: 4324,
    clientid: 1723,
    leavelicenseid: 12910,
    clientname: "Sanjay  Kallapur(PMA)",
    orderid: 435107,
    briefdescription: " Property Management-Blue Ridge Jun-2021 Charges",
    start_day: 25,
    vacatingdate: null,
    rentamount: 26000,
    rented: 14,
    rentedtax: true,
    fixed: null,
    fixedtax: false,
    entityid: 1,
    rentedamt: 728,
    fixedamt: null,
    rate: 18,
    rentedtaxamt: 131.04,
    fixedtaxamt: null,
    totalbaseamt: 728,
    totaltaxamt: 131.04,
    totalamt: 859.04,
    invoicedate: "01-Jun-2021",
  },
];
const OrderPaymentList = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [toast, setToast] = useState(false);
  const columns = useMemo(() => connectionDataColumn(), []);
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

 
  const handlePageChange = ()=>{

  }

  const handlePageCountChange = ()=>{

  }


  const handleRefresh = ()=>{

  }
 

  return (
    <Stack gap="1rem">
      <Navbar />
      <div className="flex flex-col">
        <div className="flex justify-between">
          <HeaderBreadcrum
            heading={"Order Payment List"}
            path={["Reports", "Lists", "Order Payment List"]}
          />
          <SearchBar value={searchInput} handleSearch={handleSearch}/>
        </div>

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
        </Stack>
        
        <SimpleTable columns={columns} data={data} pageNo={1} countPerPage={15} totalCount={150} />
      </div>
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
