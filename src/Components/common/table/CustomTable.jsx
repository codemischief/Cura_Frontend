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
}) => {
  return (
    <div className="w-full text-[12px]">
      <table className="w-full border-gray-400 border-b-[1px] table-auto">
        <thead className="h-[115px] block">
          <tr className="h-[56px]">
            {columns.map((column, index) => (
              <th key={index} style={{ width: column.width }}>
                {column.filterComponent && (
                  <column.filterComponent columnfield={column.field} />
                )}
              </th>
            ))}
          </tr>
          <tr className="bg-[#F0F6FF] h-[56px] ">
            {columns.map((column, index) => (
              <th key={index} style={{ width: column.width }}>
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="overflow-y-auto block max-h-[calc(100vh-375px)]">
          {isLoading && <LinearProgress />}
          {data.map((rowData, rowIndex) => (
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
          ))}
        </tbody>
      </table>
      <PaginationComponent
        pageNo={pageNo}
        countPerPage={countPerPage}
        totalCount={totalCount}
        handlePageChange={handlePageChange}
        handlePageCountChange={handlePageCountChange}
        handleRefresh={handleRefresh}
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
};
