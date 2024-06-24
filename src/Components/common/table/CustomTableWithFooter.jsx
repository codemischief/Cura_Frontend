import {
  Backdrop,
  CircularProgress,
  Modal,
} from "@mui/material";
import PropTypes from "prop-types";
import PaginationComponent from "./Pagination";

const SimpleTableWithFooter = ({
  isLoading,
  columns,
  data,
  totalData,
  pageNo,
  countPerPage,
  pageName,
  totalCount,
  handlePageChange,
  handlePageCountChange,
  handleRefresh,
  handleSortingChange,
  downloadExcel,
  downloadPdf= () => {},
  height = "calc(100vh - 19rem)",

}) => {
  return [

    <div
      className={`w-full text-[12px] h-[${height}] overflow-x-auto `}
      style={{ height: `${height}` }}
    >
      <table style={{ width: "-webkit-fill-available" }}>
        <thead className="h-[115px] sticky top-0 z-100 bg-white">
          <tr className="h-[56px] w-full ">
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
          <tr className="bg-[#F0F6FF] h-[56px] text-left">
            {columns.map((column, index) => (
              <th key={index} style={{ ...column.cellStyle }}  >

                {column.sorting
                  ? <div className="flex">
                    <p>{column.title}</p>
                    <button onClick={() => handleSortingChange(column.field)}>
                      <span className="font-extrabold px-1">↑↓</span>
                    </button>
                  </div>
                  :
                  <div className="flex justify-center">
                    <p >{column.title}</p>
                  </div>
                }
              </th>
            ))}
          </tr>
        </thead>
        <tbody className=" max-h-[calc(100vh-375px)]  overflow-y-auto">
          {isLoading && (
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
          <>
            {/* {console.log(data)} */}
            {data.length === 0 && (
              <tr className="w-full h-full">
                <td
                  className="w-full h-full"
                  colSpan={columns?.length + 1}
                  align="center"
                >
                  <div className="w-full h-full py-5 flex flex-col gap-3 items-start sm:items-center justify-center">
                    <p className="text-sm max-w-[10em] lg:max-w-none">
                      No Records To Show.
                    </p>
                  </div>
                </td>
              </tr>
            )}
            {data.length > 0 && (
              data?.map((rowData, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b dark:border-gray-700 h-[56px] w-full"
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
                      className="py-3 text-left "
                    >
                      {column.render
                        ? <div className=" flex justify-center items-center">
                          <p>{(pageNo - 1) * countPerPage + rowIndex + 1}</p>
                        </div>
                        : rowData[column.field]}
                    </td>
                  ))}
                </tr>
              ))
            )}
            {data.length > 0 && <tr className="sticky bottom-0 z-100 bg-[#F0F6FF]">
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  colSpan={1}
                  style={{
                    ...column.cellStyle,
                    paddingTop: "10px",
                    paddingBottom: "10px",
                  }}
                  className="py-3 text-left"
                >
                  {

                    helper(colIndex, totalData, pageName)
                  }
                </td>
              ))}
            </tr>}
          </>
        </tbody>

      </table>
      {console.log(totalData)}
    </div>,



    <PaginationComponent
      pageNo={pageNo}
      countPerPage={countPerPage}
      totalCount={totalCount}
      handlePageChange={handlePageChange}
      handlePageCountChange={handlePageCountChange}
      handleRefresh={handleRefresh}
      downloadExcel={downloadExcel}
      downloadPDF={downloadPdf}
    />,
  ];
};

export default SimpleTableWithFooter;

SimpleTableWithFooter.propTypes = {
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
const helper = (index, obj, pageName) => {
  if (pageName == "lobreceiptpayments") {
    if (index == 3) {
      return ` Total: ${obj.totalreceipt}`
    } else if (index == 4) {
      return `Total: ${obj.totalpayment}`
    } else if (index == 5) {
      return `Total: ${obj.total_diff}`
    } else {
      return ""
    }

  } else if (pageName == "entityreceiptpayments") {
    if (index == 2) {
      return ` Total: ${obj.totalreceipt}`
    } else if (index == 3) {
      return `Total: ${obj.totalpayment}`
    } else if (index == 4) {
      return `Total: ${obj.total_diff}`
    } else {
      return ""
    }

  } else if (pageName == "pmaBillingTrendView") {
    if (index == 1) {

    } else if (index == 2) {
      return `Total: ${obj[0].jan}`
    } else if (index == 3) {
      return `Total: ${obj[0].feb}`
    } else if (index == 4) {
      return `Total: ${obj[0].mar}`
    } else if (index == 5) {
      return `Total: ${obj[0].apr}`
    } else if (index == 6) {
      return `Total: ${obj[0].may}`
    } else if (index == 7) {
      return `Total: ${obj[0].jun}`
    } else if (index == 8) {
      return `Total: ${obj[0].jul}`
    } else if (index == 9) {
      return `Total: ${obj[0].aug}`
    } else if (index == 10) {
      return `Total: ${obj[0].sep}`
    } else if (index == 11) {
      return `Total: ${obj[0].oct}`
    } else if (index == 12) {
      return `Total: ${obj[0].nov}`
    } else if (index == 13) {
      return `Total: ${obj[0].dec}`
    }
  } else if (pageName == "lobreceiptpaymentconsolidated") {
    if (index == 2) {
      return ` Total: ${obj.total_orderreceiptamount}`
    } else if (index == 3) {
      return `Total: ${obj.total_paymentamount}`
    } else if (index == 4) {
      return `Total: ${obj.total_diff}`
    } else {
      return ""
    }
  } else if (pageName == "pmaClientReceivables") {
    // console.log(obj)
    if (index == 2) {
      return `Total: ${obj.total_amount}`
    }
  } else if (pageName == 'pmaClientStatement') {
    console.log(obj)
    if (index == 5) {
      return `Total : ${obj?.sumamount}`
    }
  } else if (pageName == 'nonPmaClientReceivables') {
    if (index == 2) {
      return `Total : ${obj?.sumamount}`
    }
  } else if (pageName == 'nonPmaClientStatement') {
    if (index == 6) {
      return `Total : ${obj?.sumamount}`
    }
  }
  else if (pageName == "bankReceiptReconciliation") {
    if (index == 2) {
      return ` Total: ${obj.bankst_cr}`
    } else if (index == 3) {
      return `Total: ${obj.client_receipt}`
    } else if (index == 4) {
      return `Total: ${obj.order_receipt}`
    } else {
      return ""
    }
  }
  else if (pageName == "bankPaymentsReconciliation") {
    if (index == 2) {
      return ` Total: ${obj[0].bankst_dr}`
    } else if (index == 3) {
      return `Total: ${obj[0].contorderpayments}`
    } else if (index == 4) {
      return `Total: ${obj[0].order_payments}`
    } else if (index == 5) {
      return `Total: ${obj[0].contractual_payments}`
    } else {
      return ""
    }
  }
  else if (pageName === "ClientReciptReports") {
    if (index === 8) {
      return `Total: ${obj?.total_amount}`
    }
  }
  else if (pageName === "clientStatement-CLCRAndOR") {
    if (index === 6) {
      return `Total: ${obj[0].sumamount}`
    }
  }
  else if (pageName === "vendorStatement") {
    if (index === 5) {
      return `Total:${obj.invoiceamount_orderpaymentamount}`
    }
  }
  else if (pageName === "clientStatementByDate") {
    if (index === 5) {
      return `Total:${obj.totalamount}`
    }
  }
  else if (pageName === "entityBlankReport") {
    if (index === 5) {
      return `Total:${obj.totalamount}`
    }
  }
  else if (pageName === "vendorSummaryReport") {
    if (index === 6) {
      return `Total:${obj.estimateamount}`
    }
    if (index === 7) {
      return `Total:${obj.invoiceamount} `
    }
    if (index === 8) {
      return `Total:${obj.paymentamount}`
    }
    if (index === 9) {
      return `Total:${obj.computedpending} `
    }
  }
  else if (pageName === 'orderStaticsReport') {
    if (index === 2) {
      return `Total:${obj.on_hold}`
    }
    if (index === 3) {
      return `Total:${obj.estimate_given}`
    }
    if (index === 4) {
      return `Total:${obj.cancelled}`
    }
    if (index === 5) {
      return `Total:${obj.closed}`
    }
    if (index === 6) {
      return `Total:${obj.billed}`
    }
    if (index === 7) {
      return `Total:${obj.inquiry}`
    }
    if (index === 8) {
      return `Total:${obj.completed}`
    }
    if (index === 9) {
      return `Total:${obj.in_progress}`
    }
  }

}
const helper2 = (index, obj, pageName) => {
  if (pageName == "lobreceiptpayments") {
    if (index == 3) {
      return ` Total: ${obj.totalreceipt}`
    } else if (index == 4) {
      return `Total: ${obj.totalpayment}`
    } else if (index == 5) {
      return `Total: ${obj.total_diff}`
    } else {
      return ""
    }

  } else if (pageName == "pmaBillingTrendView") {
    if (index == 1) {

    } else if (index == 2) {
      return `Total: ${obj.jan_sum}`
    } else if (index == 3) {

    } else if (index == 4) {

    } else if (index == 5) {

    }
  } else if (pageName == "bankReceiptReconciliation") {
    return ""
  } else {
    if (index == 2) {
      return ` Total: ${obj.totalreceipt}`
    } else if (index == 3) {
      return `Total: ${obj.totalpayment}`
    } else if (index == 4) {
      return `Total: ${obj.total_diff}`
    } else {
      return ""
    }
  }

} 