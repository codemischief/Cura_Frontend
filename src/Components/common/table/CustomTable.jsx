import { Backdrop, CircularProgress, Modal } from "@mui/material";
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
    <>
      <div
        className={`w-full text-[12px] overflow-x-auto `}
        style={{ height: height }}
      >
        <table className="table-auto " style={{width:"-webkit-fill-available"}}>
          <thead className="h-[115px] sticky top-0 z-100 bg-white">
            <tr className="h-[56px]">
              {columns.map((column, index) => (
                <th
                  key={index}
                  style={{ ...column.cellStyle }}
                  align={column?.align ?? "left"}
                >
                  {column.filterComponent && [
                    <column.filterComponent
                      filterStyle={column.cellStyle}
                      key={column.field}
                      columnfield={column.field}
                      isDisabled={column.filterDisabled || false}
                    />
                  ]}
                </th>
              ))}
            </tr>
            <tr className="bg-[#F0F6FF] h-[56px] ">
              {columns.map((column, index) => (
                <th
                  key={index}
                  style={{ ...column.cellStyle }}
                  align={column?.align ?? "left"}
                >
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

          <tbody className=" max-h-[calc(100vh-375px)]   overflow-y-auto">
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
            {data.length === 0 && (
              <tr className="w-full h-full">
                <td
                  className="w-full h-full"
                  colSpan={columns?.length + 1}
                  align="center"
                >
                  <div className="w-full h-full py-5 flex flex-col gap-3 items-start sm:items-center justify-center">
                    <p className="text-sm max-w-[10em] lg:max-w-none">
                      The Data you are looking for could not be found.
                    </p>
                  </div>
                </td>
              </tr>
            )}
            {data.length > 0 &&
              data?.map((rowData, rowIndex) => (
                <tr
                  key={rowData.id}
                  className="border-b dark:border-gray-700 h-[56px]"
                >
                  {columns.map((column, colIndex) => (
                    <td
                      align={column?.align ?? "left"}
                      key={colIndex}
                      colSpan={1}
                      style={{
                        ...column.cellStyle,
                        paddingTop: "4px",
                        paddingBottom: "4px",
                      }}
                      className="py-3 "
                    >
                      {column.render
                        ? column.field === "action"
                          ? column?.render(rowData)
                          : column?.render(
                              (pageNo - 1) * countPerPage + rowIndex
                            )
                        : rowData[column.field]}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <PaginationComponent
        pageNo={pageNo}
        countPerPage={countPerPage}
        totalCount={totalCount}
        handlePageChange={handlePageChange}
        handlePageCountChange={handlePageCountChange}
        handleRefresh={handleRefresh}
        downloadExcel={downloadExcel}
      />
    </>
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
