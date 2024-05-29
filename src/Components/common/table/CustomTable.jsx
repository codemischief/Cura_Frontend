import {
  Backdrop,
  CircularProgress,
  LinearProgress,
  Modal,
} from "@mui/material";
import PropTypes from "prop-types";
import PaginationComponent from "./Pagination";
import { Create, Delete } from "@mui/icons-material";

const SimpleTable = ({
  isLoading,
  columns,
  data,
  pageNo,
  countPerPage,
  totalCount,
  handlePageChange,
  handlePageCountChange,
  handleRefresh,
  handleSortingChange,
  downloadExcel,
  height = "calc(100vh - 18rem)",
}) => {
  return [
    <div
      className={`w-full text-[12px] h-[${height}] overflow-x-auto `}
      style={{ height: `${height}` }}
    >
      <table className="table-auto ">
        <thead className="h-[115px] sticky top-0 z-100 bg-white">
          <tr className="h-[56px]">
            {columns.map((column, index) => (
              
              <th key={index} style={{ ...column.cellStyle }}>
                 {console.log(column.cellStyle)}
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
          <tr className="bg-[#F0F6FF] h-[56px] text-left ">
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

          {data.length > 0 ? (
            data?.map((rowData, rowIndex) => (
              <tr
                key={rowData.id}
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
                      textAlign : "left"
                    }}
                    className="py-3 text-center "
                  >
                    {column.render
                      ? column.render((pageNo - 1) * countPerPage + rowIndex)
                      : column.field === "action"
                      ? render(rowData)
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

export default SimpleTable;

SimpleTable.propTypes = {
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
