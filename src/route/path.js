

function path(root, sublink) {
  return `${root}${sublink}`;
}

export const ROOTS = {
  root: "/dashboard",
  admin: "/admin",

  research: "/research",
  manage: "/manage",
  report: "/reports",
};

export const PATH_DASHBOARD = {
  root: ROOTS.root,
  user: "/user",
  admin: {
    manageUsers: path(ROOTS.admin, "/manageuser"),
    manageEmployees: path(ROOTS.admin, "/manageemployees"),
    manageBuilder: {
      root: path(ROOTS.admin, "/manageBuilder"),
      contact: "/managebuilder/projects/:buildername",
      projects: "/managebuilder/contacts/:buildername",
    },
    projectManagementInfo: path(ROOTS.admin, "/manageprojectinfo"),
    country: path(ROOTS.admin, "/country"),
    state: path(ROOTS.admin, "/state"),
    city: path(ROOTS.admin, "/city"),
    locality: path(ROOTS.admin, "/locality"),
    LOB: path(ROOTS.admin, "/LOB"),
    service: path(ROOTS.admin, "/service"),
    payments: path(ROOTS.admin, "/payments"),
    deleteId: path(ROOTS.admin, "deleteById"),
    entityReceiptPayment: path(ROOTS.admin, "/entityReceiptPayments"),
    lobReceiptPayments: path(ROOTS.admin, "/lobReceiptPayments"),
    lobReceiptPaymentsConsolidated :path(ROOTS.admin, "/lobReceiptPaymentsConsolidated"),
  },
  research: {
    prospect: path(ROOTS.research, "/prospect"),
    owner: path(ROOTS.research, "/owner"),
    educational: path(ROOTS.research, "/educational"),
    architect: path(ROOTS.research, "/architect"),
    mandals: path(ROOTS.research, "/mandals"),
    professionals: path(ROOTS.research, "/professionals"),
    coc: path(ROOTS.research, "/coc"),
    banks: path(ROOTS.research, "/banks"),
    friends: path(ROOTS.research, "/friends"),
    agent: path(ROOTS.research, "/agent"),
    employer: path(ROOTS.research, "/employer"),
    governmentDepartment: path(ROOTS.research, "/governmentdepartment"),
    serviceApartmentGuestHouse: path(
      ROOTS.research,
      "/serviceApartmentGuestHouse"
    ),
  },
  manage: {
    bankStatement: path(ROOTS.manage, "/bankstatement"),
      manageOrder: path(ROOTS.manage, "/manageOrder"),
    clientInfo: path(ROOTS.manage, "/manageclientinfo"),
    clientProperty: path(ROOTS.manage, "/manageclientproperty"),
    clientReceipt: path(ROOTS.manage, "/manageclientreceipt"),
    llAgreement: path(ROOTS.manage, "/managellagreement"),
    pmaAgreement: path(ROOTS.manage, "/managepmaagreement"),
    orderReceipt: path(ROOTS.manage, "/manageorderreceipt"),
    clientInvoice: path(ROOTS.manage, "/manageclientinvoice"),
    vendor: path(ROOTS.manage, "/managevendor"),
    vendorInvoice: path(ROOTS.manage, "/managevendorinvoice"),
    vendorPayment: path(ROOTS.manage, "/managevendorpayment"),
    pmaBilling: path(ROOTS.manage, "/pmaBilling"),
  },
  report: {
    list: {
      orderPaymentList: path(ROOTS.report, "/orderPaymentList"),
      orderReceipt: path(ROOTS.report, "/orderReceiptList"),
      orderInvoiceList: path(ROOTS.report, "/orderInvoiceList"),
      clientReceiptList: path(ROOTS.report, "/clientReceiptList"),
      vendorPayment: path(ROOTS.report,"/vendorPaymentsList")
    },
    bankRecords: {
      clientOrderReceiptMismatchDetails : path(ROOTS.report,"/clientOrderReceiptMismatchDetails"),
      monthlyBankSummary :  path(ROOTS.report,"/monthlyBankSummary"),
      bankTransferReconsiliation : path(ROOTS.report,"/bankTransferReconciliation"),
      dailyBankReceiptsReconciliation : path(ROOTS.report,"/bankReceiptReconciliation"),
      dailyBankPaymentsReconciliation : path(ROOTS.report,"/bankPaymentsReconciliation"),
    },
    monthlyMargin: {
      clientStatementAll : path(ROOTS.report, "/clientStatementAll"),
    },
    reportTrace: {
      clientTrace : path(ROOTS.report, "/clientTraceReport"),
      orderTrace : path(ROOTS.report, "/orderTraceReport"),
      vendorTrace : path(ROOTS.report, "/vendorTraceReport"),
    },
    clients: {
      duplicateClients : path(ROOTS.report, "/duplicateClientReport"),
      clientBankDetails : path(ROOTS.report, "/clientBankDetails"),
      nonPmaClientStatements : path(ROOTS.report, "/nonPmaClientStatement"),
      nonPmaClientReceivables : path(ROOTS.report, "/nonPmaClientReceivables"),
    },
    pma : {
      activePmaAgreement: path(ROOTS.report, "/activePmaAgreement"),
      projectContacts: path(ROOTS.report,"/projectContact"),
      advanceHoldingAmont: path(ROOTS.report,"/advanceHoldingAmount"),
      pmaClientStatementAll: path(ROOTS.report,"/pmaClientStatementAll"),
      pmaClientStatement: path(ROOTS.report,"/pmaClientStatement"),
      pmaClientReceivables: path(ROOTS.report,"/pmaClientReceivable"),
      pmaInvoiceList: path(ROOTS.report,"/pmaInvoiceList"),
      pmaBillingTrendReport: path(ROOTS.report,"/pmaBillingTrendView"),
      clientPortalReport: path(ROOTS.report,"/pmaClientReport"),
    },
    tally: {
      ClientReceipt: path(ROOTS.report, "/clientReceipt"),
      OrderPaymentDD:path(ROOTS.report, "/OrderPaymentDD"),
      OrderPaymentBanktoCash:path(ROOTS.report,"/orderpaymentbanktocash"),
      OrderPaymentBanktoBank:path(ROOTS.report,"/orderpaymentbanktobank"),
      OrderPaymentWithTds:path(ROOTS.report,"/orderpaymentwithtds"),
      OrderPaymentWithoutTds:path(ROOTS.report,"/orderpaymentwithouttds"),
      OrderReceiptToInvoiceTax:path(ROOTS.report,"/orderreceipttoinvoiceTax")

    },
  },
};
