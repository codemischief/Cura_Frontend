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
  companykey: PATH_DASHBOARD.admin.updateCompanyKey,
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
  ResearchCOCAndBusinessGroup: PATH_DASHBOARD.research.businessgroup,
  ResearchProfessional: PATH_DASHBOARD.research.professionals,
  ResearchMandals: PATH_DASHBOARD.research.mandals,
  ResearchArchitect: PATH_DASHBOARD.research.architect,
  ResearchColleges: PATH_DASHBOARD.research.educational,

  // manage
  BuilderInfo: PATH_DASHBOARD.manage.manageBuilder.root,
  ProjectInfo: PATH_DASHBOARD.manage.projectManagementInfo,
  // send client-statement is pending....
  ClientStatement: PATH_DASHBOARD.manage.ClientStatement,
  BankStatement: PATH_DASHBOARD.manage.bankStatement,
  Order: PATH_DASHBOARD.manage.manageOrder,
  OrderReceipt: PATH_DASHBOARD.manage.orderReceipt,
  ClientProperty: PATH_DASHBOARD.manage.clientProperty,
  Vendor: PATH_DASHBOARD.manage.vendor,
  PMAAgreement: PATH_DASHBOARD.manage.pmaAgreement,
  PMABilling: PATH_DASHBOARD.manage.pmaBilling,
  ClientInfo: PATH_DASHBOARD.manage.clientInfo,
  LLAgreement: PATH_DASHBOARD.manage.llAgreement,
  VendorPayment: PATH_DASHBOARD.manage.vendorPayment,
  // VendorPayment : PATH_DASHBOARD.manage.orderVendorPayment,
  ClientInvoice: PATH_DASHBOARD.manage.clientInvoice,
  ClientReceipt: PATH_DASHBOARD.manage.clientReceipt,
  VendorInvoice: PATH_DASHBOARD.manage.vendorInvoice,
  BuilderContact: "/manage/manageBuilder/contacts/",
});

export const replaceKeys = (access_rights) => {
  let accessRoute = Object.keys(access_rights).reduce((acc, key) => {
    const newKey = routeMapObj[key] || key;
    acc[newKey] = access_rights[key];
    return acc;
  }, {});

  allowSpecialRoutes(accessRoute);
  return accessRoute;
};
let defaultpermission = { add: true, delete: true, edit: true, get: true };

const deleteByIdEndpoints = [
  "deleteclient",
  "deleteorder",
  "deleteclientinvoice",
  "deleteordereceipt",
  "deleteorderpayment",
  "deleteclientreceipt",
  "deletevendorinvoice",
  "deletevendor",
  "deleteuser",
  "deleteemployee",
  "deletebankstatement",
];
const allowSpecialRoutes = (routes) => {
  routes["/dashboard"] = defaultpermission;
  routes["/changepassword"] = defaultpermission;
  if (routes[PATH_DASHBOARD.manage.manageBuilder.root]) {
    routes["/manage/managebuilder/manageproject/"] =
      routes[PATH_DASHBOARD.manage.projectManagementInfo];
    // routes["/manage/manageBuilder/contacts/"] = defaultpermission;
  }
  if (routes[PATH_DASHBOARD.manage.clientInfo]) {
    routes["/manage/manageclientinfo/properties/"] =
      routes[PATH_DASHBOARD.manage.clientProperty];
    routes["/manage/manageclientinfo/orders/"] =
      routes[PATH_DASHBOARD.manage.manageOrder];
  }
  if (routes[PATH_DASHBOARD.manage.clientProperty]) {
    routes["/manage/manageclientproperty/pmaagreement/"] =
      routes[PATH_DASHBOARD.manage.pmaAgreement];
    routes["/manage/manageclientproperty/llagreement/"] =
      routes[PATH_DASHBOARD.manage.llAgreement];
  }
  if (routes[PATH_DASHBOARD.manage.manageOrder]) {
    routes["/manage/managevendorpayment/"] =
      routes[PATH_DASHBOARD.manage.vendorPayment];
    routes["/manage/manageorderreceipt/"] =
      routes[PATH_DASHBOARD.manage.orderReceipt];
    routes["/manage/manageclientinvoice/"] =
      routes[PATH_DASHBOARD.manage.clientInvoice];
    routes["/manage/manageclientinfo/orders/showall/"] =
      routes[PATH_DASHBOARD.manage.manageOrder];
  }

  if (routes[PATH_DASHBOARD.admin.deleteId]) {
    deleteByIdEndpoints.forEach((endpoint) => {
      routes[`${PATH_DASHBOARD.admin.deleteId}/${endpoint}`] =
        routes[PATH_DASHBOARD.admin.deleteId];
    });
  }
  if (routes[PATH_DASHBOARD.admin.deleteId]) {
    routes["/admin/deleteById/"] = routes[PATH_DASHBOARD.admin.deleteId];
  }
};
