import { useMemo, useRef, useState } from "react";
import connectionDataColumn from "./columns";
import { connectionTypeObj, connectionProtocolsObj } from "./data";
import MaterialTable from "@material-table/core";
import { ArrowUpward } from "@mui/icons-material";
import { CustomPaginationComponent } from "./MyMaterialTable";

export default function BillingTableSekeleton() {
  const [columnResizable, setColumnResizable] = useState(false);
  const tableRef = useRef();
  const columns = useMemo(
    () => connectionDataColumn({ connectionTypeObj, connectionProtocolsObj }),
    []
  );

  return (
    <div className="max-h-[501px]">
      <MaterialTable
        tableRef={tableRef}
        columns={columns}
        data={[]}
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
            top: 80,
            background: "white",
            zIndex: 50 /* optionally */,
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
            zIndex: 90,
            top: 0,
            pt: 12,
            pb: 12,
          },
          maxBodyHeight: "650px",
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
          SortArrow: (props) => <ArrowUpward {...props} fontSize="small" />,
        }}
        components={{
          Pagination: (props) => {
            return <CustomPaginationComponent {...props} tableRef={tableRef} />;
          },
        }}
      />
    </div>
  );
}
