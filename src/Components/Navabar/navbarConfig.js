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
          { title: "Services", path: PATH_DASHBOARD.admin.service }
          
        ],
      },
      {
        subheader: "Locations",
        items: [
          { title: "Country", path: PATH_DASHBOARD.admin.country },
          { title: "State", path: PATH_DASHBOARD.admin.state},
          { title: "City", path: PATH_DASHBOARD.admin.city},
          { title: "Locality", path: PATH_DASHBOARD.admin.locality },
        ],
      },
      {
        subheader: "Data Management",
        items: [{ title: "Delete by ID", path: "#" }],
      },
      {
        subheader: "Margin Report",
        items: [
          { title: "LOB- Receipts - Payments", path: "#" },
          { title: "Entity-Receipts-Payments", path: "#" },
          { title: "LOB - Receipts-Payments-Consolidated", path: "#" },
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
          { title: "Manage Builder", path: PATH_DASHBOARD.manage.manageBuilder.root },
          { title: "Manage Project", path: PATH_DASHBOARD.manage.projectManagementInfo },
        ],
      },
      {
        subheader: "Statement",
        items: [
          { title: "Bank Statement", path: PATH_DASHBOARD.manage.bankStatement },
          { title: "Send Client Statement", path: "#" },
        ],
      },
      {
        subheader: "Client",
        items: [
          { title: "Manage Client", path: PATH_DASHBOARD.manage.clientInfo },
          { title: "Manage Client Property", path: PATH_DASHBOARD.manage.clientProperty },
          { title: "Manage Client Invoice", path: PATH_DASHBOARD.manage.clientInvoice },
          { title: "Manage Client Receipt", path: PATH_DASHBOARD.manage.clientReceipt },
        ],
      },
      {
        subheader: "Order",
        items: [
          { title: "Manage Order", path: PATH_DASHBOARD.manage.manageOrder },
          { title: "Manage Order Receipt", path: PATH_DASHBOARD.manage.orderReceipt },
        ],
      },
      {
        subheader: "Vendor",
        items: [
          { title: "Manage Vendor", path: PATH_DASHBOARD.manage.vendor },
          { title: "Manage Vendor Invoice", path: PATH_DASHBOARD.manage.vendorInvoice },
          { title: "Manage Vendor Payment", path: PATH_DASHBOARD.manage.vendorPayment},
        ],
      },
      {
        subheader: "Service",
        items: [
          { title: "PMA Agreement", path: PATH_DASHBOARD.manage.pmaAgreement },
          { title: "L&L Agreement", path: PATH_DASHBOARD.manage.llAgreement },
          { title: "PMA Billing", path: '#' },
          { title: "Email PMA Statement", path: "#" },
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
          { title: "Client Order Receipt Mismatch Details", path: PATH_DASHBOARD.reports },
          { title: "Bank Balance Reconciliation", path: PATH_DASHBOARD.reports },
          { title: "Monthly Bank Summary", path: PATH_DASHBOARD.reports },
          { title: "Bank Transfer Reconciliation", path: PATH_DASHBOARD.reports },
          { title: "Daily Bank Receipts Reconciliation", path: PATH_DASHBOARD.reports },
          { title: "Daily Bank Payments Reconciliation", path: PATH_DASHBOARD.reports },
        ],
      },
      {
        subheader: "Vendor",
        items: [
          { title: "Vendor Summary", path: PATH_DASHBOARD.reports },
          { title: "Vendor Statement", path: PATH_DASHBOARD.reports },
        ],
      },
      {
        subheader: "Monthly Margin",
        items: [
          { title: "LOB-Receipts-Payments", path: PATH_DASHBOARD.reports.lobReceiptPayments},
          { title: "Entity-Receipt-Payments", path: PATH_DASHBOARD.reports.entityReceiptPayments },
          { title: "Client Statement-CI,CR and OR(All Entities)", path: PATH_DASHBOARD.reports },
          { title: "LOB-Receipts-Payments Consolidated", path: PATH_DASHBOARD.reports.lobReceiptPaymentsConsolidated },
        ],
      },
      {
        subheader: "Tally Report",
        items: [
          { title: "Client Receipt", path: PATH_DASHBOARD.reports },
          { title: "Order Payment-DD", path: PATH_DASHBOARD.reports },
          { title: "Order Payment-B2C", path: PATH_DASHBOARD.reports },
          { title: "Order Payment-B2B", path: PATH_DASHBOARD.reports },
          { title: "Order Receipt-C2B", path: PATH_DASHBOARD.reports },
          { title: "OR-Invoice-Service Tax/GST", path: PATH_DASHBOARD.reports },
          { title: "Order Payment Without TDS", path: PATH_DASHBOARD.reports },
        ],
      },
      {
        subheader: "Report Trace",
        items: [
          { title: "Client Trace", path: PATH_DASHBOARD.reports },
          { title: "Order Trace", path: PATH_DASHBOARD.reports },
          { title: "Vendor Trace", path: PATH_DASHBOARD.reports },
        ],
      },
      {
        subheader: "Exceptions",
        items: [
          { title: "Manage Vendor", path: PATH_DASHBOARD.reports },
          { title: "Manage Vendor Invoice", path: PATH_DASHBOARD.reports },
          { title: "Manage Vendor Payment", path: PATH_DASHBOARD.reports },
        ],
      },
      
      {
        subheader: "Lists",
        items: [
          { title: "Order Payment List", path: PATH_DASHBOARD.reports.orderPaymentList },
          { title: "Order Receipt List", path: PATH_DASHBOARD.reports.orderReceiptList },
          { title: "Order Invoice List", path: PATH_DASHBOARD.reports.orderInvoiceList },
          { title: "Vendor Invoice List", path: PATH_DASHBOARD.reports.vendorInvoiceList },
          { title: "Client Receipt List", path: PATH_DASHBOARD.reports.clientReceiptList },
          { title: "L and L List", path: PATH_DASHBOARD.reports },
        ],
      },
      {
        subheader: "Service Tax Reports",
        items: [
          { title: "Agency Repair Service Receipts", path: PATH_DASHBOARD.reports },
          { title: "Service Tax Paid by Vendor", path: PATH_DASHBOARD.reports },
        ],
      },
      {
        subheader: "Orders",
        items: [
          { title: "Aged Order", path: PATH_DASHBOARD.reports },
          { title: "Order Analysis", path: PATH_DASHBOARD.reports },
        ],
      },
      {
        subheader: "Legal",
        items: [{ title: "Active L & L Agreement", path: PATH_DASHBOARD.reports }],
      },
      {
        subheader: "Statistics",
        items: [
          { title: "Order Statistics", path: PATH_DASHBOARD.reports },
          { title: "Client Statistics", path: PATH_DASHBOARD.reports },
          { title: "Statistics Report", path: PATH_DASHBOARD.reports },
          { title: "Owners Statistics Report", path: PATH_DASHBOARD.reports },
        ],
      },
      {
        subheader: "TDS Report",
        items: [
          { title: "TDS Paid By Vendor", path: PATH_DASHBOARD.reports },
          { title: "Vendor Payment Summary For Period", path: PATH_DASHBOARD.reports },
          { title: "Paid Paid to Government", path: PATH_DASHBOARD.reports },
        ],
      },
    ],
  },
  {
    title: "Research",
    path: ROOTS.research,
    children: [
      { subheader: "Prospect", path: PATH_DASHBOARD.reports },
      { subheader: "Employer", path: PATH_DASHBOARD.reports },
      { subheader: "Manage Govt Department", path: PATH_DASHBOARD.reports },
      { subheader: "Real Estate Agents", path: PATH_DASHBOARD.reports },
      { subheader: "Manage Owners", path: PATH_DASHBOARD.reports },
      { subheader: "Service Appartments And Guest Houses", path: PATH_DASHBOARD.reports },
      { subheader: "Friends", path: PATH_DASHBOARD.reports },
      { subheader: "Bank and Branches", path: PATH_DASHBOARD.reports },
      { subheader: "Business Group", path: PATH_DASHBOARD.reports },
      { subheader: "Professionals", path: PATH_DASHBOARD.reports },
      { subheader: "Mandals", path: PATH_DASHBOARD.reports },
      { subheader: "Architect", path: PATH_DASHBOARD.reports },
      { subheader: "Educational Institute", path: PATH_DASHBOARD.reports },
    ],
  },
];
