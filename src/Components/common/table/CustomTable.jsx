import { LinearProgress} from "@mui/material";

// import connectionDataColumn from "./columns";

import PaginationComponent from "./Pagination";

const SimpleTable = ({
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
                  <column.filterComponent columnDef={{ field: column.field }} />
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
          {status === "loading" && <LinearProgress />}
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
