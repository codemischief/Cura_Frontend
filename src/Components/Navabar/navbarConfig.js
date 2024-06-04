import { PATH_DASHBOARD, ROOTS } from "../../route/path";

export const navMenuConfig = [
  {
    title: "Admin",
    path: ROOTS.admin,

    children: [
      [
        {
          subheader: "Personnel",
          items: [
            { title: "Users", path: PATH_DASHBOARD.admin.manageUsers },
            { title: "Employees", path: PATH_DASHBOARD.admin.manageEmployees },
            {
              title: "Contractual Payment",
              path: PATH_DASHBOARD.admin.payments,
            },
          ],
        },
      ],
      [
        {
          subheader: "Offerings",
          items: [
            { title: "LOB (Line of business)", path: PATH_DASHBOARD.admin.LOB },
            { title: "Services", path: PATH_DASHBOARD.admin.service },
          ],
        },
      ],
      [
        {
          subheader: "Locations",
          items: [
            { title: "Country", path: PATH_DASHBOARD.admin.country },
            { title: "City", path: PATH_DASHBOARD.admin.city },
            { title: "Locality", path: PATH_DASHBOARD.admin.locality },
          ],
        },
      ],
      [
        {
          subheader: "Data Management",
          items: [
            { title: "Delete by ID", path: PATH_DASHBOARD.admin.deleteId },
          ],
        },
      ],
      [
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
    ],
  },
  {
    title: "Manage",
    path: ROOTS.manage,
    children: [
      [
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

      [
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
      ],
      [
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
      ],
      [
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
      ],
      [
        {
          subheader: "Service",
          items: [
            {
              title: "PMA Agreement",
              path: PATH_DASHBOARD.manage.pmaAgreement,
            },
            { title: "L&L Agreement", path: PATH_DASHBOARD.manage.llAgreement },
            { title: "PMA Billing", path: PATH_DASHBOARD.manage.pmaBilling },
          ],
        },
      ],
    ],
  },
  {
    title: "Reports",
    path: ROOTS.report,
    children: [
      [
        {
          subheader: "Bank Record",
          items: [
            {
              title: "Client Order Receipt Mismatch Details",
              path: PATH_DASHBOARD.report.bankRecords
                .clientOrderReceiptMismatchDetails,
            },
            { title: "Bank Balance Reconciliation", path: "" },
            {
              title: "Monthly Bank Summary",
              path: PATH_DASHBOARD.report.bankRecords.monthlyBankSummary,
            },
            {
              title: "Bank Transfer Reconciliation",
              path: PATH_DASHBOARD.report.bankRecords
                .bankTransferReconsiliation,
            },
            {
              title: "Daily Bank Receipts Reconciliation",
              path: PATH_DASHBOARD.report.bankRecords
                .dailyBankReceiptsReconciliation,
            },
            {
              title: "Daily Bank Payments Reconciliation",
              path: PATH_DASHBOARD.report.bankRecords
                .dailyBankPaymentsReconciliation,
            },
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
            {
              title: "Order Invoice List",
              path: PATH_DASHBOARD.report.list.orderInvoiceList,
            },
            {
              title: "Vendor Payment List",
              path: PATH_DASHBOARD.report.list.vendorPayment,
            },
            {
              title: "Client Receipt List",
              path: PATH_DASHBOARD.report.list.clientReceiptList,
            },
            { title: "L and L List", path: "" },
          ],
        },
        {
          subheader: "Monthly Margin",
          items: [
            {
              title: "Client Statement-CI,CR and OR(All Entities)",
              path: PATH_DASHBOARD.report.monthlyMargin.clientStatementAll,
            },
          ],
        },
      ],
      [
        {
          subheader: "Client",
          items: [
            { title: "Client Statement", path: "" },
            {
              title: "Duplicate Clients ",
              path: PATH_DASHBOARD.report.clients.duplicateClients,
            },
            {
              title: "Client Bank Details",
              path: PATH_DASHBOARD.report.clients.clientBankDetails,
            },
            {
              title: "Cura Non PMA Statements",
              path: PATH_DASHBOARD.report.clients.nonPmaClientStatements,
            },
            {
              title: "Cura Non PMA Receivables",
              path: PATH_DASHBOARD.report.clients.nonPmaClientReceivables,
            },
          ],
        },
        {
          subheader: "PMA",
          items: [
            {
              title: "Active PMA Agreement",
              path: PATH_DASHBOARD?.report?.pma.activePmaAgreement,
            },
            {
              title: "All Project Contacts",
              path: PATH_DASHBOARD.report.pma.projectContacts,
            },
            {
              title: "Details For Advance Holding Amount",
              path: PATH_DASHBOARD.report.pma.advanceHoldingAmont,
            },
            {
              title: "PMA Client Statement-CL,CR and OR(All Entities)",
              path: PATH_DASHBOARD.report.pma.pmaClientStatementAll,
            },
            {
              title: "Cura PMA Client Statement",
              path: PATH_DASHBOARD.report.pma.pmaClientStatement,
            },
            {
              title: "Cura PMA Client Receivables",
              path: PATH_DASHBOARD.report.pma.pmaClientReceivables,
            },
            {
              title: "PMA Invoice List",
              path: PATH_DASHBOARD.report.pma.pmaInvoiceList,
            },
            {
              title: "PMA Billing Treand Report",
              path: PATH_DASHBOARD.report.pma.pmaBillingTrendReport,
            },
            {
              title: "Client Portal Report",
              path: PATH_DASHBOARD.report.pma.clientPortalReport,
            },
          ],
        },
      ],
      [
        {
          subheader: "Contacts",
          items: [
            { title: "All Owner Email Ids", path: "" },
            { title: "All Tenants Email Ids", path: "" },
            { title: "Client Contacts", path: "" },
            { title: "Owners Phone No's", path: "" },
            { title: "Clients Phone No's", path: "" },
          ],
        },
        {
          subheader: "Tally Report",
          items: [
            {
              title: "Client Receipt",
              path: PATH_DASHBOARD.report.tally.ClientReceipt,
            },
            {
              title: "Order Payment-DD",
              path: PATH_DASHBOARD.report.tally.OrderPaymentDD,
            },
            {
              title: "Order Payment-B2C",
              path: PATH_DASHBOARD.report.tally.OrderPaymentBanktoCash,
            },
            {
              title: "Order Payment-B2B",
              path: PATH_DASHBOARD.report.tally.OrderPaymentBanktoBank,
            },
            {
              title: "Order Receipt-C2B",
              path: PATH_DASHBOARD.report.tally.OrderPaymentWithTds,
            },
            {
              title: "OR-Invoice-Service Tax/GST",
              path: PATH_DASHBOARD.report.tally.OrderReceiptToInvoiceTax,
            },
            {
              title: "Order Payment Without TDS",
              path: PATH_DASHBOARD.report.tally.OrderPaymentWithoutTds,
            },
          ],
        },
        {
          subheader: "Report Trace",
          items: [
            {
              title: "Client Trace",
              path: PATH_DASHBOARD.report.reportTrace.clientTrace,
            },
            {
              title: "Order Trace",
              path: PATH_DASHBOARD.report.reportTrace.orderTrace,
            },
            {
              title: "Vendor Trace",
              path: PATH_DASHBOARD.report.reportTrace.vendorTrace,
            },
          ],
        },
      ],
      [
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
      ],
      [
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
    ],
  },
  {
    title: "Research",
    path: ROOTS.research,
    children: [
      // col-1
      [
        { subheader: "Prospect", path: "" },
        { subheader: "Employer", path: "" },
        { subheader: "Manage Govt Department", path: "" },
        { subheader: "Real Estate Agents", path: "" },
      ],
      // col-2
      [
        { subheader: "Manage Owners", path: "" },
        { subheader: "Service Appartments And Guest Houses", path: "" },
        { subheader: "Friends", path: "" },
      ],
      [
        { subheader: "Bank and Branches", path: "" },
        { subheader: "Business Group", path: "" },
        { subheader: "Professionals", path: "" },
      ],
      [
        { subheader: "Mandals", path: "" },
        { subheader: "Architect", path: "" },
        { subheader: "Educational Institute", path: "" },
      ],
    ],
  },
];
