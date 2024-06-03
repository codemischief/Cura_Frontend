import { PATH_DASHBOARD } from "../route/path";

export const routeMapObj = Object.freeze({
  User: PATH_DASHBOARD.user,
  // admin
  Payment: PATH_DASHBOARD.admin.payments,
  BuilderInfo: PATH_DASHBOARD.admin.manageBuilder.root,
  LOB: PATH_DASHBOARD.admin.LOB,
  Locality: PATH_DASHBOARD.admin.locality,
  Country: PATH_DASHBOARD.admin.country,
  City: PATH_DASHBOARD.admin.city,
  Service: PATH_DASHBOARD.admin.service,
  ProjectInfo: PATH_DASHBOARD.admin.projectManagementInfo,
  Employee: PATH_DASHBOARD.admin.manageEmployees,

  // research - routes
  ResearchFriends: PATH_DASHBOARD.research.friends,
  ResearchMandals: PATH_DASHBOARD.research.mandals,
  ResearchArchitect: PATH_DASHBOARD.research.architect,
  ResearchApartments: PATH_DASHBOARD.research.serviceApartmentGuestHouse,
  ResearchEmployer: PATH_DASHBOARD.research.employer,
  ResearchCOCAndBusinessGroup: PATH_DASHBOARD.research.coc,
  ResearchProfessional: PATH_DASHBOARD.research.professionals,
  ResearchBanksAndBranches: PATH_DASHBOARD.research.banks,
  ResearchColleges: PATH_DASHBOARD.research.educational,
  ResearchGovtAgencies: PATH_DASHBOARD.research.governmentDepartment,
  ResearchRealEstateAgents: PATH_DASHBOARD.research.agent,
  ResearchProspect: PATH_DASHBOARD.research.prospect,
  ResearchOwners: PATH_DASHBOARD.research.owner,

  // manage
  PMABilling: PATH_DASHBOARD.manage.pmaBilling,
  BankStatement: PATH_DASHBOARD.manage.bankStatement,
  OrderReceipt: PATH_DASHBOARD.manage.orderReceipt,
  ClientProperty: PATH_DASHBOARD.manage.clientProperty,
  Vendor: PATH_DASHBOARD.manage.vendor,
  PMAAgreement: PATH_DASHBOARD.manage.pmaAgreement,
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
