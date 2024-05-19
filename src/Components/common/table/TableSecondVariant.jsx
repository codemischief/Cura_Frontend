import {
  Backdrop,
  CircularProgress,
  LinearProgress,
  Modal,
} from "@mui/material";
import PropTypes from "prop-types";
import { Chip, Stack } from "@mui/material";
import {
  DateFilterField,
  NumberFilterField,
  TextFilterField,
} from "../../../Screens/Reports/OrderPaymentList/CustomFilterField";
import PaginationComponent from "./Pagination";

const columns = [
  // {
  //   title: "Sr No",
  //   width: "5%",
  //   sorting: false,
  //   render: (rowData) => {
  //     return (
  //       <Stack direction="row" sx={{ justifyContent: "center", width: "30px" }}>
  //         {rowData?.tableData.index + 1}
  //       </Stack>
  //     );
  //   },
  // },
  {
    filterComponent: TextFilterField,
    title: "Bank Name",
    field: "clientname",
    cellStyle: { minWidth: '270px' },

    // cellStyle: { ...cellStyleCommon, minWidth: 80 },
  },
  {
    filterComponent: TextFilterField,
    title: "Payments",
    field: "briefdescription",
    cellStyle: { minWidth: '270px' },

  },
  {
    title: "Receipts",
    field: "invoicedate",
    cellStyle: { minWidth: '270px' },
    
    filterComponent: DateFilterField,
    sorting: false,
  },
  {
    title: "Total Balance",
    field: "totalamt",
    type: "numeric",
    grouping: true,
    width: "20%",
    cellStyle: { minWidth: '270px' },
    
    filterComponent: NumberFilterField,
  },
];

const columnsTwo = [
  // {
  //   title: "Sr No",
  //   width: "5%",
  //   sorting: false,
  //   render: (rowData) => {
  //     return (
  //       <Stack direction="row" sx={{ justifyContent: "center", width: "30px" }}>
  //         {rowData?.tableData.index + 1}
  //       </Stack>
  //     );
  //   },
  // },
  {
    filterComponent: TextFilterField,
    title: "Bank Name",
    field: "clientname",
    cellStyle: { minWidth: '270px' },
  },
  {
    filterComponent: TextFilterField,
    title: "Payments (DR)",
    field: "briefdescription",
    cellStyle: { minWidth: '270px' },

  },
  {
    title: "Receipts (CR)",
    field: "invoicedate",
    cellStyle: { minWidth: '270px' },
    
    filterComponent: DateFilterField,
    sorting: false,
  },
  {
    title: "Total Balance",
    field: "totalamt",
    type: "numeric",
    grouping: true,
    filterComponent: NumberFilterField,
    cellStyle: { minWidth: '270px' },

  },
];

const data = [
  {
    id: 3251,
    clientid: 32,
    leavelicenseid: 12856,
    clientname: "Ashish Paranjape (PMA)",
    orderid: 431049,
    briefdescription: " Property Management for Varad Vinayak Jun-2023 Charges",
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
    invoicedate: "01-Jun-2023",
  },
  {
    id: 3252,
    clientid: 271,
    leavelicenseid: 12922,
    clientname: "Ajinkya Bhave(PMA)",
    orderid: 434406,
    briefdescription:
      " Property Management-A-604, Rohan Garima, SB Road, Pune-16. Jun-2023 Charges",
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
    invoicedate: "01-Jun-2023",
  },
  {
    id: 3258,
    clientid: 308,
    leavelicenseid: 12538,
    clientname: "Abhijeet Bhargaw (PMA)",
    orderid: 433742,
    briefdescription:
      " Property Management Office 218 Business Hub Jun-2023 Charges",
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
    invoicedate: "01-Jun-2023",
  },
  {
    id: 3259,
    clientid: 498,
    leavelicenseid: 12725,
    clientname: "Anjali Khambete(PMA)",
    orderid: 434461,
    briefdescription: " Property Management for Yutikha Jun-2023 Charges",
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
    invoicedate: "01-Jun-2023",
  },
  {
    id: 3262,
    clientid: 29745,
    leavelicenseid: 12688,
    clientname: "Manish  Kurhekar(PMA)",
    orderid: 434238,
    briefdescription: " Property Management  Jun-2023 Charges",
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
    invoicedate: "01-Jun-2023",
  },
  {
    id: 3264,
    clientid: 41427,
    leavelicenseid: 12812,
    clientname: "Manisha Tijare (PMA)",
    orderid: 434875,
    briefdescription: " Property Management for Yuthika Jun-2023 Charges",
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
    invoicedate: "01-Jun-2023",
  },
];

const data2 = [
  {
    id: 3265,
    clientid: 41427,
    leavelicenseid: 12640,
    clientname: "Manisha Tijare (PMA)",
    orderid: 434020,
    briefdescription:
      " Property Management for Mont Vert Blair Jun-2023 Charges",
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
    invoicedate: "01-Jun-2023",
  },
  {
    id: 4283,
    clientid: 1596,
    leavelicenseid: 12750,
    clientname: "Vikram Chhibber(PMA)",
    orderid: 433266,
    briefdescription:
      " Property Management -A-305-Geet Ganga Society Jun-2023 Charges",
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
    invoicedate: "01-Jun-2023",
  },
  {
    id: 4285,
    clientid: 1736,
    leavelicenseid: 12908,
    clientname: "Meena Bachwani(PMA)",
    orderid: 435105,
    briefdescription:
      " Property Management-A 1901, Megapolis, Sangria,01/11/14-31/10/16 Jun-2023 Charges",
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
    invoicedate: "01-Jun-2023",
  },
  {
    id: 4288,
    clientid: 373,
    leavelicenseid: 12829,
    clientname: "Thomas Antony(PMA)",
    orderid: 434800,
    briefdescription: " Property Management-Culture Crest Jun-2023 Charges",
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
    invoicedate: "01-Jun-2023",
  },
  {
    id: 4289,
    clientid: 373,
    leavelicenseid: 12784,
    clientname: "Thomas Antony(PMA)",
    orderid: 434761,
    briefdescription: " Property Management-Peshwani Palace Jun-2023 Charges",
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
    invoicedate: "01-Jun-2023",
  },
  {
    id: 4296,
    clientid: 1677,
    leavelicenseid: 12946,
    clientname: "Debarshi  Bhowal(PMA)",
    orderid: 435180,
    briefdescription: " Property Management-Prime Panache,  Jun-2023 Charges",
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
    invoicedate: "01-Jun-2023",
  },
  {
    id: 4310,
    clientid: 1564,
    leavelicenseid: 12929,
    clientname: "Vikas Karode(PMA)",
    orderid: 435150,
    briefdescription:
      " Property management-Whispering Winds I,  1 BHK -1/6/14 to 31/5/2016 Jun-2023 Charges",
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
    invoicedate: "01-Jun-2023",
  },
  {
    id: 4312,
    clientid: 40669,
    leavelicenseid: 12801,
    clientname: "Ajay  Adhawade (PMA)",
    orderid: 434852,
    briefdescription:
      " Property Management for Shraddha Garden Jun-2023 Charges",
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
    invoicedate: "01-Jun-2023",
  },
  {
    id: 4324,
    clientid: 1723,
    leavelicenseid: 12910,
    clientname: "Sanjay  Kallapur(PMA)",
    orderid: 435107,
    briefdescription: " Property Management-Blue Ridge Jun-2023 Charges",
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
    invoicedate: "01-Jun-2023",
  },
];

const CustomTable = ({
  // isLoading,
  // columns,
  // data,
  pageNo = 1,
  countPerPage = 50,
  // totalCount,
  // handlePageChange,
  // handlePageCountChange,
  // handleRefresh,
  // handleSortingChange,
  // downloadExcel,
  height = "calc(100vh - 19rem)",
}) => {
  return [
    <div className="flex flex-col">
      <h1 className="text-lg ml-5">Application Bank Balance</h1>
    <div
      className={`w-full text-[12px] h-[${height}] overflow-x-auto `}
      style={{ height: "400px" }}
    >
      <table className="table-auto w-full">
        <thead className="h-[115px] sticky top-0 z-100 bg-white">
          <tr className="h-[56px]">
            {columns.map((column, index) => (
              <th key={index} style={{ ...column.cellStyle }}>
                {column.filterComponent && [
                  <column.filterComponent
                    key={column.field}
                    columnfield={column.field}
                    isDisabled={column.filterDisabled || false}
                  />,
                ]}
              </th>
            ))}
          </tr>
          <tr className="bg-[#F0F6FF] h-[56px] ">
            {columns.map((column, index) => (
              <th key={index} style={{ ...column.cellStyle }}>
                {column.title}
                {column.sorting && (
                  <button onClick={() => handleSortingChange(column.field)}>
                    <span className="font-extrabold px-1">↑↓</span>
                  </button>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className=" max-h-[calc(100vh-375px)]  overflow-y-auto">
          {/* {isLoading && (
              <tr>
                <td colSpan={columns.length} className="text-center">
                  <Modal
                    open={isLoading}
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      invisible: true, // To make the backdrop invisible while loading
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                      }}
                    >
                      <CircularProgress sx={{ color: "white" }} />
                    </div>
                  </Modal>
                </td>
              </tr>
            )}
   */}
          {data.length > 0 ? (
            data?.map((rowData, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b dark:border-gray-700 h-[56px]"
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    colSpan={1}
                    style={{
                      ...column.cellStyle,
                      paddingTop: "4px",
                      paddingBottom: "4px",
                    }}
                    className="py-3 text-center "
                  >
                    {column.render
                      ? column.render((pageNo - 1) * countPerPage + rowIndex)
                      : rowData[column.field]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr className="w-full flex justify-center items-center border border-b border-[#CBCBCB] text-[#282828] align-middle text-center">
              No records to display{" "}
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>,
    <div className="flex flex-col">
       <h1 className="text-lg ml-5">Passbook Bank Balance</h1>
    <div
      className={`w-full text-[12px] h-[${height}] overflow-x-auto `}
      style={{ height: "400px" }}
    >
      <table className="table-auto w-full">
        <thead className="h-[115px] sticky top-0 z-100 bg-white">
          <tr className="h-[56px]">
            {columns.map((column, index) => (
              <th key={index} style={{ ...column.cellStyle }}>
                {column.filterComponent && [
                  <column.filterComponent
                    key={column.field}
                    columnfield={column.field}
                    isDisabled={column.filterDisabled || false}
                  />,
                ]}
              </th>
            ))}
          </tr>
          <tr className="bg-[#F0F6FF] h-[56px] ">
            {columns.map((column, index) => (
              <th key={index} style={{ ...column.cellStyle }}>
                {column.title}
                {column.sorting && (
                  <button onClick={() => handleSortingChange(column.field)}>
                    <span className="font-extrabold px-1">↑↓</span>
                  </button>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className=" max-h-[calc(100vh-375px)]  overflow-y-auto">
          {/* {isLoading && (
              <tr>
                <td colSpan={columns.length} className="text-center">
                  <Modal
                    open={isLoading}
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      invisible: true, // To make the backdrop invisible while loading
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                      }}
                    >
                      <CircularProgress sx={{ color: "white" }} />
                    </div>
                  </Modal>
                </td>
              </tr>
            )}
   */}
          {data.length > 0 ? (
            data?.map((rowData, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b dark:border-gray-700 h-[56px]"
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    colSpan={1}
                    style={{
                      ...column.cellStyle,
                      paddingTop: "4px",
                      paddingBottom: "4px",
                    }}
                    className="py-3 text-center "
                  >
                    {column.render
                      ? column.render((pageNo - 1) * countPerPage + rowIndex)
                      : rowData[column.field]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr className="w-full flex justify-center items-center border border-b border-[#CBCBCB] text-[#282828] align-middle text-center">
              No records to display{" "}
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>,
    <PaginationComponent
      pageNo={pageNo}
      countPerPage={countPerPage}
      totalCount={600}
      // handlePageChange={handlePageChange}
      // handlePageCountChange={handlePageCountChange}
      // handleRefresh={handleRefresh}
      // downloadExcel={downloadExcel}
    />,
  ];
};

export default CustomTable;

CustomTable.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      field: PropTypes.string.isRequired,
      width: PropTypes.string.isRequired,
      render: PropTypes.func,
      filterComponent: PropTypes.elementType,
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  pageNo: PropTypes.number.isRequired,
  countPerPage: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  handlePageCountChange: PropTypes.func.isRequired,
  handleRefresh: PropTypes.func.isRequired,
  handleSortingChange: PropTypes.func,
  downloadExcel: PropTypes.func,
  height: PropTypes.string,
};
