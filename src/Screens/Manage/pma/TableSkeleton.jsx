import { useRef, useState } from "react";

import MaterialTable from "@material-table/core";
import { ArrowUpward } from "@mui/icons-material";
import { CustomPaginationComponent } from "./MyMaterialTable";
import { useDispatch } from "react-redux";
import { setSorting } from "../../../Redux/slice/pmaSlice";

export default function PmaBillingTable({
  column,
  data,
  loading,
  // handleQueryChange,
}) {
  const [columnResizable, setColumnResizable] = useState(false);
  const tableRef = useRef();
  const dispatch = useDispatch();

  return (
    <div className="max-h-[501px]">
      <MaterialTable
        isLoading={loading}
        tableRef={tableRef}
        columns={column}
        data={data}
        title={""}
        options={{
          exportButton: {
            csv: true,
            pdf: false,
          },
          actionsColumnIndex: -1,
          addRowPosition: "first",
          emptyRowsWhenPaging: false,
          search: true,
          filtering: true,
          filterRowStyle: {
            position: "sticky",
            top: 79,
            background: "white",
            zIndex: 36 /* optionally */,
          },
          grouping: true,
          columnsButton: true,
          paging: true,
          pageSize: 15,
          pageSizeOptions: [15, 25, 50],
          padding: "default",
          headerStyle: {
            backgroundColor: "#F0F6FF",
            position: "sticky",
            zIndex: 39,
            top: 0,
            pt: 12,
            pb: 12,
          },
          maxBodyHeight: "68vh",
          filterCellStyle: { padding: "4px" },
          selection: false,
          exportAllData: true,
          tableWidth: "variable",
          tableLayout: columnResizable ? "fixed" : "auto",
          toolbar: false,
          pagination: false,
          toolbacolumnResizablerButtonAlignment: "",
        }}
        icons={{
          SortArrow: (props) => <ArrowUpward {...props} />,
        }}
        onOrderChange={(orderBy, orderDirection) => {
          if (orderBy) {
            dispatch(
              setSorting({
                sort_by: [column[orderBy]?.field],
                sort_order: [orderDirection],
              })
            );
          }
        }}
        components={{
          Pagination: (props) => {
            return (
              <CustomPaginationComponent
                {...props}
                tableRef={tableRef}
                // handleQueryChange={handleQueryChange}
              />
            );
          },
        }}
      />
    </div>
  );
}
