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
    manageOrder: path(ROOTS.admin, "/manageOrder"),
    country: path(ROOTS.admin, "/country"),
    state: path(ROOTS.admin, "/state"),
    city: path(ROOTS.admin, "/city"),
    locality: path(ROOTS.admin, "/locality"),
    LOB: path(ROOTS.admin, "/LOB"),
    service: path(ROOTS.admin, "/service"),
    payments: path(ROOTS.admin, "/payments"),
    deleteId: path(ROOTS.admin, "deleteById"),
    entityReceiptPayment: "entityReceiptPayments",
    lobReceiptPayments: "lobReceiptPayments",
    lobReceiptPaymentsConsolidated: "lobReceiptPaymentsConsolidated",
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
    },
  },
};
