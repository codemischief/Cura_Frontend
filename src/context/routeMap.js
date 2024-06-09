import { PATH_DASHBOARD } from "../route/path";

export const routeMapObj = Object.freeze({
  // dashbaord

  // admin

  User: PATH_DASHBOARD.admin.manageUsers,
  Payment: PATH_DASHBOARD.admin.payments,

  LOB: PATH_DASHBOARD.admin.LOB,
  Locality: PATH_DASHBOARD.admin.locality,
  Country: PATH_DASHBOARD.admin.country,
  City: PATH_DASHBOARD.admin.city,
  Service: PATH_DASHBOARD.admin.service,

  Employee: PATH_DASHBOARD.admin.manageEmployees,
  deletebyid: PATH_DASHBOARD.admin.deleteId,
  getLobEntityPayments: PATH_DASHBOARD.admin.lobReceiptPayments,
  EntityReceiptPayments: PATH_DASHBOARD.admin.entityReceiptPayment,
  LOBReceiptPayments: PATH_DASHBOARD.admin.lobReceiptPaymentsConsolidated,

  // research - routes
  ResearchProspect: PATH_DASHBOARD.research.prospect,
  ResearchEmployer: PATH_DASHBOARD.research.employer,
  ResearchGovtAgencies: PATH_DASHBOARD.research.governmentDepartment,
  ResearchRealEstateAgents: PATH_DASHBOARD.research.agent,
  ResearchOwners: PATH_DASHBOARD.research.owner,
  ResearchApartments: PATH_DASHBOARD.research.serviceApartmentGuestHouse,
  ResearchFriends: PATH_DASHBOARD.research.friends,
  ResearchBanksAndBranches: PATH_DASHBOARD.research.banks,
  ResearchCOCAndBusinessGroup: PATH_DASHBOARD.research.coc,
  ResearchProfessional: PATH_DASHBOARD.research.professionals,
  ResearchMandals: PATH_DASHBOARD.research.mandals,
  ResearchArchitect: PATH_DASHBOARD.research.architect,
  ResearchColleges: PATH_DASHBOARD.research.educational,

  // manage
  BuilderInfo: PATH_DASHBOARD.manage.manageBuilder.root,
  ProjectInfo: PATH_DASHBOARD.manage.projectManagementInfo,
  // send client-statement is pending....
  BankStatement: PATH_DASHBOARD.manage.bankStatement,
  manageOrder: PATH_DASHBOARD.manage.manageOrder,
  OrderReceipt: PATH_DASHBOARD.manage.orderReceipt,
  ClientProperty: PATH_DASHBOARD.manage.clientProperty,
  Vendor: PATH_DASHBOARD.manage.vendor,
  PMAAgreement: PATH_DASHBOARD.manage.pmaAgreement,
  PMABilling: PATH_DASHBOARD.manage.pmaBilling,
  ClientInfo: PATH_DASHBOARD.manage.clientInfo,
  LLAgreement: PATH_DASHBOARD.manage.llAgreement,
  VendorPayment: PATH_DASHBOARD.manage.vendorPayment,
  ClientInvoice: PATH_DASHBOARD.manage.clientInvoice,
  ClientReceipt: PATH_DASHBOARD.manage.clientReceipt,
  VendorInvoice: PATH_DASHBOARD.manage.vendorInvoice,
});

export const replaceKeys = (access_rights) => {
  return Object.keys(access_rights).reduce((acc, key) => {
    const newKey = routeMapObj[key] || key;
    acc[newKey] = access_rights[key];
    return acc;
  }, {});
};
