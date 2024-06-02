import { PATH_DASHBOARD, ROOTS } from "../../route/path";

export const navMenuConfig = [
  {
    title: "Admin",
    path: ROOTS.admin,

    children: [
      {
        subheader: "Personnel",
        items: [
          { title: "Users", path: PATH_DASHBOARD.admin.manageUsers },
          { title: "Employees", path: PATH_DASHBOARD.admin.manageEmployees },
          { title: "Contractual Payment", path: PATH_DASHBOARD.admin.payments },
        ],
      },
      {
        subheader: "Offerings",
        items: [
          { title: "LOB (Line of business)", path: PATH_DASHBOARD.admin.LOB },
          { title: "Services", path: PATH_DASHBOARD.admin.service },
          { title: "Grinding Machine ", path: PATH_DASHBOARD },
          { title: "Drilling Machine ", path: "#" },
          { title: "Milling Machine ", path: "#" },
        ],
      },
      {
        subheader: "Locations",
        items: [
          { title: "Country", path: PATH_DASHBOARD.admin.country },
          { title: "State", path: PATH_DASHBOARD.admin.state },
          { title: "City", path: PATH_DASHBOARD.admin.city },
          { title: "Locality", path: PATH_DASHBOARD.admin.locality },
        ],
      },
      {
        subheader: "Data Management",
        items: [{ title: "Delete by ID", path: PATH_DASHBOARD.admin.deleteId }],
      },
      {
        subheader: "Margin Report",
        items: [
          {
            title: "LOB- Receipts - Payments",
            path: PATH_DASHBOARD.admin.lobReceiptPayments,
          },
          {
            title: "Entity-Receipts-Payments",
            path: PATH_DASHBOARD.admin.entityReceiptPayment,
          },
          {
            title: "LOB - Receipts-Payments-Consolidated",
            path: PATH_DASHBOARD.admin.lobReceiptPaymentsConsolidated,
          },
        ],
      },
    ],
  },
  {
    title: "Manage",
    path: ROOTS.manage,
    children: [
      {
        subheader: "Builder",
        items: [
          {
            title: "Manage Builder",
            path: PATH_DASHBOARD.manage.bankStatement,
          },
          {
            title: "Manage Project",
            path: PATH_DASHBOARD.manage.projectManagementInfo,
          },
        ],
      },

      {
        subheader: "Client",
        items: [
          { title: "Manage Client", path: PATH_DASHBOARD.manage.clientInfo },
          {
            title: "Manage Client Property",
            path: PATH_DASHBOARD.manage.clientProperty,
          },
          {
            title: "Manage Client Invoice",
            path: PATH_DASHBOARD.manage.clientInvoice,
          },
          {
            title: "Manage Client Receipt",
            path: PATH_DASHBOARD.manage.clientReceipt,
          },
        ],
      },
      {
        subheader: "Order",
        items: [
          { title: "Manage Order", path: PATH_DASHBOARD.manage.manageOrder },
          {
            title: "Manage Order Receipt",
            path: PATH_DASHBOARD.manage.orderReceipt,
          },
        ],
      },
      {
        subheader: "Vendor",
        items: [
          { title: "Manage Vendor", path: PATH_DASHBOARD.manage.vendor },
          {
            title: "Manage Vendor Invoice",
            path: PATH_DASHBOARD.manage.vendorInvoice,
          },
          {
            title: "Manage Vendor Payment",
            path: PATH_DASHBOARD.manage.vendorPayment,
          },
        ],
      },
      {
        subheader: "Service",
        items: [
          { title: "PMA Agreement", path: PATH_DASHBOARD.manage.pmaAgreement },
          { title: "L&L Agreement", path: PATH_DASHBOARD.manage.llAgreement },
          { title: "PMA Billing", path: PATH_DASHBOARD.manage.pmaBilling },
          { title: "Email PMA Statement", path: "#" },
        ],
      },
      {
        subheader: "Statement",
        items: [
          {
            title: "Bank Statement",
            path: PATH_DASHBOARD.manage.bankStatement,
          },
          { title: "Send Client Statement", path: "#" },
        ],
      },
    ],
  },
  {
    title: "Reports",
    path: ROOTS.report,
    children: [
      {
        subheader: "Bank Record",
        items: [
          { title: "Client Order Receipt Mismatch Details", path: "" },
          { title: "Bank Balance Reconciliation", path: "" },
          { title: "Monthly Bank Summary", path: "" },
          { title: "Bank Transfer Reconciliation", path: "" },
          { title: "Daily Bank Receipts Reconciliation", path: "" },
          { title: "Daily Bank Payments Reconciliation", path: "" },
        ],
      },
      {
        subheader: "Lists",
        items: [
          {
            title: "Order Payment List",
            path: PATH_DASHBOARD?.report?.list?.orderPaymentList,
          },
          {
            title: "Order Receipt List",
            path: PATH_DASHBOARD.report.list.orderReceipt,
          },
          { title: "Order Invoice List", path: PATH_DASHBOARD.report.list.orderInvoiceList },
          { title: "Vendor Payment List", path: "" },
          { title: "Client Receipt List", path: PATH_DASHBOARD.report.list.clientReceiptList },
          { title: "L and L List", path: "" },
        ],
      },
      {
        subheader: "Monthly Margin",
        items: [
          { title: "LOB-Receipts-Payments", path: "" },
          { title: "Entity-Receipt-Payments", path: "" },
          { title: "Client Statement-CI,CR and OR(All Entities)", path: "" },
          { title: "LOB-Receipts-Payments Consolidated", path: "" },
        ],
      },
      {
        subheader: "Tally Report",
        items: [
          { title: "Client Receipt", path: "" },
          { title: "Order Payment-DD", path: "" },
          { title: "Order Payment-B2C", path: "" },
          { title: "Order Payment-B2B", path: "" },
          { title: "Order Receipt-C2B", path: "" },
          { title: "OR-Invoice-Service Tax/GST", path: "" },
          { title: "Order Payment Without TDS", path: "" },
        ],
      },
      {
        subheader: "Report Trace",
        items: [
          { title: "Client Trace", path: "" },
          { title: "Order Trace", path: "" },
          { title: "Vendor Trace", path: "" },
        ],
      },
      {
        subheader: "Exceptions",
        items: [
          { title: "Manage Vendor", path: "" },
          { title: "Manage Vendor Invoice", path: "" },
          { title: "Manage Vendor Payment", path: "" },
        ],
      },
      {
        subheader: "Vendor",
        items: [
          { title: "Vendor Summary", path: "" },
          { title: "Vendor Statement", path: "" },
        ],
      },
      {
        subheader: "Service Tax Reports",
        items: [
          { title: "Agency Repair Service Receipts", path: "" },
          { title: "Service Tax Paid by Vendor", path: "" },
        ],
      },
      {
        subheader: "Orders",
        items: [
          { title: "Aged Order", path: "" },
          { title: "Order Analysis", path: "" },
        ],
      },
      {
        subheader: "Legal",
        items: [{ title: "Active L & L Agreement", path: "" }],
      },
      {
        subheader: "Statistics",
        items: [
          { title: "Order Statistics", path: "" },
          { title: "Client Statistics", path: "" },
          { title: "Statistics Report", path: "" },
          { title: "Owners Statistics Report", path: "" },
        ],
      },
      {
        subheader: "TDS Report",
        items: [
          { title: "TDS Paid By Vendor", path: "" },
          { title: "Vendor Payment Summary For Period", path: "" },
          { title: "Paid Paid to Government", path: "" },
        ],
      },
    ],
  },
  {
    title: "Research",
    path: ROOTS.research,
    children: [
      { subheader: "Prospect", path: "" },
      { subheader: "Employer", path: "" },
      { subheader: "Manage Govt Department", path: "" },
      { subheader: "Real Estate Agents", path: "" },
      { subheader: "Manage Owners", path: "" },
      { subheader: "Service Appartments And Guest Houses", path: "" },
      { subheader: "Friends", path: "" },
      { subheader: "Bank and Branches", path: "" },
      { subheader: "Business Group", path: "" },
      { subheader: "Professionals", path: "" },
      { subheader: "Mandals", path: "" },
      { subheader: "Architect", path: "" },
      { subheader: "Educational Institute", path: "" },
    ],
  },
];
