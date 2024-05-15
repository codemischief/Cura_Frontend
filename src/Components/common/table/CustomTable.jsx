import { LinearProgress } from "@mui/material";
import PropTypes from "prop-types";
import PaginationComponent from "./Pagination";

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
  height = "calc(100vh - 19rem)",
}) => {
  return (
    <div
      className={`w-full text-[12px] h-[${height}]`}
      style={{ height: "calc(100vh - 18rem" }}
    >
      <table className="w-full border-gray-400 border-b-[1px] table-auto h-full">
        <thead className="h-[115px] block">
          <tr className="h-[56px]">
            {columns.map((column, index) => (
              <th key={index} style={{ width: column.width }}>
                {column.filterComponent && [
                  <column.filterComponent
                    key={column.field}
                    columnfield={column.field}
                  />,
                ]}
              </th>
            ))}
          </tr>
          <tr className="bg-[#F0F6FF] h-[56px] ">
            {columns.map((column, index) => (
              <th key={index} style={{ width: column.width }}>
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
        <tbody className="overflow-y-auto block max-h-[calc(100vh-375px)]">
          {isLoading && <LinearProgress />}

          {data.length > 0 ? (
            data.map((rowData, rowIndex) => (
              <tr key={rowIndex} className="border-b dark:border-gray-700">
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    colSpan={1}
                    style={{ width: column.width }}
                    className="py-3 text-center px-2"
                  >
                    {column.render
                      ? column.render(rowData, rowIndex)
                      : rowData[column.field]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr className="border border-b border-[#CBCBCB] text-[#282828]">No records to display.</tr>
          )}
        </tbody>
      </table>
      <PaginationComponent
        pageNo={pageNo}
        countPerPage={countPerPage}
        totalCount={totalCount}
        handlePageChange={handlePageChange}
        handlePageCountChange={handlePageCountChange}
        handleRefresh={handleRefresh}
        downloadExcel={downloadExcel}
      />
    </div>
  );
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
