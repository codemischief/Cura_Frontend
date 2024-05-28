import {
    Backdrop,
    CircularProgress,
    LinearProgress,
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
    height = "calc(100vh - 19rem)",
  }) => {
    return [
      
      <div
        className={`w-full text-[12px] h-[${height}] overflow-x-auto `}
        style={{ height: `${height}` }}
      >
        <table className="table-auto w-full">
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
                <th key={index} style={{ ...column.cellStyle } }  >
                  {/* {column.sorting ? } */}
                  {/* {column.title}
                  {column.sorting && (
                    <button onClick={() => handleSortingChange(column.field)}>
                      <span className="font-extrabold px-1">↑↓</span>
                    </button>
                  )} */}
                  {column.sorting
                        ? <div className="flex">
                             <p>{column.title}</p>
                             <button onClick={() => handleSortingChange(column.field)}>
                              <span className="font-extrabold px-1">↑↓</span>
                            </button>
                        </div> 
                    : <div className="flex justify-center">
                       <p >Sr No</p>
                    </div>}
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
            {data.length > 0 ? (
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
            ) : (
              <tr className="w-full flex justify-center items-center border border-b border-[#CBCBCB] text-[#282828] align-middle text-center">
                No records to display{" "}
              </tr>
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
                        
                        helper(colIndex,totalData,pageName)
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
  const helper = (index,obj,pageName) => {
    if(pageName == "lobreceiptpayments") {
      if(index == 3) {
        return ` Total: ${obj.totalreceipt}`
      }else if(index == 4) {
          return `Total: ${obj.totalpayment}`
      }else if(index == 5) {
      return `Total: ${obj.total_diff}`
      }else {
      return ""
      }
        
    }else if(pageName == "pmaBillingTrendView" ) {
      if(index == 1) {

      }else if(index == 2) {
           return `Total: ${obj.jan_sum}`
      }else if(index == 3) {
        return `Total: ${obj.feb_sum}`
      }else if(index == 4) {
        return `Total: ${obj.mar_sum}`
      }else if(index == 5) {
        return `Total: ${obj.apr_sum}`
      }else if(index == 6) {
        return `Total: ${obj.may_sum}`
      }else if(index == 7) {
        return `Total: ${obj.jun_sum}`
      }else if(index == 8) {
        return `Total: ${obj.jul_sum}`
      }else if(index == 9) {
        return `Total: ${obj.aug_sum}`
      }else if(index == 10) {
        return `Total: ${obj.sep_sum}`
      }else if(index == 11) {
        return `Total: ${obj.oct_sum}`
      }else if(index == 12) {
        return `Total: ${obj.nov_sum}`
      }else if(index == 13) {
        return `Total: ${obj.dec_sum}`
      }
  }else if(pageName == "lobreceiptpaymentconsolidated") {
      if(index == 2) {
        return ` Total: ${obj.total_orderreceiptamount}`
      }else if(index == 3) {
          return `Total: ${obj.total_paymentamount}`
      }else if(index == 4) {
      return `Total: ${obj.total_diff}`
      }else {
      return ""
      }
    }else if(pageName == "pmaClientReceivables") {
      // console.log(obj)
      if(index == 2) {
        return `Total: ${obj.total_amount}`
      }
    }
  }
  const helper2 = (index,obj,pageName) => {
    if(pageName == "lobreceiptpayments") {
      if(index == 3) {
        return ` Total: ${obj.totalreceipt}`
      }else if(index == 4) {
          return `Total: ${obj.totalpayment}`
      }else if(index == 5) {
      return `Total: ${obj.total_diff}`
      }else {
      return ""
      }
        
    }else if(pageName == "pmaBillingTrendView" ) {
        if(index == 1) {

        }else if(index == 2) {
             return `Total: ${obj.jan_sum}`
        }else if(index == 3) {

        }else if(index == 4) {

        }else if(index == 5) {

        }
    }else {
      if(index == 2) {
        return ` Total: ${obj.totalreceipt}`
      }else if(index == 3) {
          return `Total: ${obj.totalpayment}`
      }else if(index == 4) {
      return `Total: ${obj.total_diff}`
      }else {
      return ""
      }
    }
    
  } 