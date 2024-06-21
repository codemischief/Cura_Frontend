import React, { Suspense } from "react";
import Login from "./Screens/Login/Login";

import { Route, Routes, Outlet, useNavigate } from "react-router-dom";

import { setNavigate } from "./services/setNavigation.js";
import { setAccessToken } from "./utils/axios.js";
import useAuth from "./context/JwtContext.jsx";
import { CircularProgress } from "@mui/material";
import AuthGuard from "./context/AuthGuard";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Component {...props} />
    </Suspense>
  );
};

const App = () => {
  const { isInitialized, accessToken, user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  React.useEffect(() => {
    if (accessToken) setAccessToken(accessToken);
  }, [accessToken]);

  const ROLES = {
    Registered: "3",
    Public: "2",
    Admin: "1",
  };

  return (
    <div className="app">
      {/* <RouterProvider router={router}/> */}

      {isInitialized ? (
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route path="" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<UnAuthorized />} />
            <Route path="/reset/:token" element={<ResetPassword />} />
            <Route path="/reset" element={<RequestResetPassword />} />

            {/* <Route element={<RequireAuth />}> */}
            <Route
              element={
                <AuthGuard>
                  <PrivateLayout />
                </AuthGuard>
              }
            >
              <Route
                path="/dashboard"
                element={
                  <Suspense fallback={<div>..loading!</div>}>
                    <Dashboard />
                  </Suspense>
                }
              />
              <Route path="/changepassword" element={<ChangePassword />} />
              <Route path="/admin/manageuser" element={<ManageUser />} />
              <Route
                path="/admin/updatecompanykey"
                element={<UpdateCompanyKey />}
              />

              <Route
                path="/admin/manageemployees"
                element={<ManageEmployees />}
              />
              <Route path="/manage/managebuilder" element={<ManageBuilder />} />
              <Route
                path="/manage/manageprojectinfo"
                element={<ManageProjectInfo />}
              />
              <Route
                path="/manage/managebuilder/manageproject/:id"
                element={<ManageProjectInfo key="hyperlinked" />}
              />
              <Route path="/admin/deleteById" element={<DeleteById />} />
              <Route
                path="/admin/deleteById/:pagename"
                element={<DeletePage />}
              />
              <Route path="/manage/manageOrder" element={<ManageOrder />} />
              <Route path="/admin/manageuser" element={<ManageUser />} />
              <Route path="/admin/country" element={<Country />} />

              <Route path="/admin/city" element={<City />} />
              <Route path="/admin/locality" element={<Locality />} />
              <Route path="/admin/LOB" element={<LOB />} />
              <Route path="/admin/service" element={<Service />} />
              <Route path="/admin/payments" element={<Payments />} />

              <Route path="/research/prospect" element={<PropectusPage />} />
              <Route path="/research/employer" element={<ResearchEmployer />} />
              <Route path="/research/owner" element={<ResearchOwner />} />
              <Route
                path="/research/educational"
                element={<ResearchEducational />}
              />
              <Route
                path="/research/architect"
                element={<ResearchArchitect />}
              />
              <Route path="/research/mandals" element={<ResearchMandals />} />
              <Route
                path="/research/professionals"
                element={<ResearchProfessionals />}
              />
              <Route
                path="/research/businessgroup"
                element={<ResearchBusinessGroup />}
              />
              <Route path="/research/banks" element={<ResearchBanks />} />
              <Route path="/research/friends" element={<ResearchFriends />} />
              <Route
                path="/research/serviceapartment"
                element={<ResearchServiceApartments />}
              />
              <Route path="/research/agent" element={<ResearchAgent />} />
              {/* <Route path="/reasearch/employer" element={<Employer />} /> */}
              <Route
                path="/research/governmentdepartment"
                element={<ResearchGovernmentDepartment />}
              />
              <Route
                path="/manage/bankstatement"
                element={<ManageBankStatement />}
              />
              <Route
                path="/manage/manageclientinfo"
                element={<ManageClientInfo />}
              />
              <Route
                path="/manage/manageclientproperty"
                element={<ManageClientProperty />}
              />
              <Route
                path="/manage/manageclientreceipt"
                element={<ManageClientReceipt />}
              />
              <Route
                path="/manage/managellagreement"
                element={<ManageLLAgreement />}
              />
              <Route
                path="/manage/managepmaagreement"
                element={<ManagePmaArgreement />}
              />
              <Route
                path="/manage/manageorderreceipt"
                element={<ManageOrderReceipt />}
              />
              <Route
                path="/manage/manageclientinvoice"
                element={<ManageClientInvoice />}
              />
              <Route path="/manage/managevendor" element={<ManageVendor />} />
              <Route
                path="/manage/managevendorinvoice"
                element={<ManageVendorInvoice />}
              />
              <Route
                path="/manage/managevendorpayment"
                element={<ManageVendorPayment />}
              />
              <Route
                path="/manage/sendclientstatement"
                element={<SendClientStatement />}
              />

              <Route
                path="manage/managebuilder/projects/:buildername"
                element={<ManageBuilderProject />}
              />
              <Route
                path="/manage/managebuilder/contacts/:buildername"
                element={<ManageBuilderContact />}
              />

              <Route
                path="/manage/managevendorpayment/:orderid"
                element={<ManageVendorPayment key="hyperlinked" />}
              />
              <Route
                path="/manage/manageclientinvoice/:orderid"
                element={<ManageClientInvoice key="hyperlinked" />}
              />
              <Route
                path="/manage/manageorderreceipt/:orderid"
                element={<ManageOrderReceipt key="hyperlinked" />}
              />
              <Route
                path="/manage/manageclientinfo/orders/showall/:orderid"
                element={<ShowAllOdersInformation />}
              />
              <Route
                path="/manage/manageclientinfo/properties/:clientname"
                element={<ManageClientProperty key="hyperlinked" />}
              />
              <Route
                path="/manage/manageclientinfo/orders/:clientname"
                element={<ManageOrder key="hyperlinked" />}
              />
              <Route
                path="/manage/manageclientproperty/pmaagreement/:clientname"
                element={<ManagePmaArgreement key="hyperlinked" />}
              />
              <Route
                path="/manage/manageclientproperty/llagreement/:clientname"
                element={<ManageLLAgreement key="hyperlinked" />}
              />
              <Route
                path="/manage/manageclientinvoice/:orderid"
                element={<ManageClientInvoice />}
              />
              <Route
                path="/manage/manageorderreceipt/:orderid"
                element={<ManageOrderReceipt />}
              />
              <Route
                path="/manage /manageclientinfo/orders/showall/:orderid"
                element={<ShowAllOdersInformation />}
              />
              <Route
                path="/manage/manageclientinfo/properties/:clientname"
                element={<ManageClientProperty />}
              />
              <Route
                path="/manage/manageclientinfo/orders/:clientname"
                element={<ManageOrder />}
              />
              <Route
                path="/manage/manageclientproperty/pmaagreement/:clientname"
                element={<ManagePmaArgreement />}
              />
              <Route
                path="/manage/manageclientproperty/llagreement/:clientname"
                element={<ManageLLAgreement />}
              />
              <Route path="/manage/pmaBilling" element={<PmaBilling />} />

              <Route
                path="/reports/orderPaymentList"
                element={<OrderPaymentList />}
              />
              <Route
                path="/reports/orderReceiptList"
                element={<OrderReceiptList />}
              />
              <Route
                path="/reports/orderInvoiceList"
                element={<OrderInvoiceList />}
              />
              <Route
                path="/reports/clientReceiptList"
                element={<ClientReceiptList />}
              />
              <Route
                path="/reports/vendorPaymentsList"
                element={<VendorInvoiceList />}
              />
              <Route
                path="/admin/lobReceiptPayments"
                element={<LobReceiptPayments />}
              />
              <Route
                path="/admin/entityReceiptPayments"
                element={<EntityReceiptPayments />}
              />
              <Route
                path="/admin/lobReceiptPaymentsConsolidated"
                element={<LobReceiptPaymentsConsolidated />}
              />
              <Route
                path="/reports/pmaBillingTrendView"
                element={<PmaBillingTrendView />}
              />
              <Route
                path="/reports/pmaClientReport"
                element={<PmaClientReport />}
              />
              <Route
                path="/reports/pmaInvoiceList"
                element={<PmaInvoiceList />}
              />
              <Route
                path="/reports/pmaClientReceivable"
                element={<PmaClientReceivable />}
              />
              <Route
                path="/reports/activePmaAgreement"
                element={<ActivePmaAgreement />}
              />
              <Route
                path="/reports/projectContact"
                element={<ProjectContact />}
              />
              <Route
                path="/reports/advanceHoldingAmount"
                element={<AdvanceHoldingAmount />}
              />
              <Route
                path="/reports/pmaClientStatementAll"
                element={<PmaClientStatementAll />}
              />
              <Route
                path="/reports/pmaClientStatement"
                element={<PmaClientStatement />}
              />
              <Route
                path="/reports/nonPmaClientStatement"
                element={<NonPmaClientStatement />}
              />
              <Route
                path="/reports/nonPmaClientReceivables"
                element={<NonPmaClientReceivables />}
              />
              <Route
                path="/reports/clientStatementAll"
                element={<ClientStatementAll />}
              />
              <Route
                path="/reports/duplicateClientReport"
                element={<DuplicateClientReport />}
              />
              <Route
                path="/reports/clientBankDetails"
                element={<ClientBankDetails />}
              />
              <Route
                path="/reports/monthlyBankSummary"
                element={<MonthlyBankSummary />}
              />
              <Route
                path="/reports/bankTransferReconciliation"
                element={<BankTransferReconciliation />}
              />
              <Route
                path="/reports/clientOrderReceiptMismatchDetails"
                element={<ClientOrderReceiptMismatchDetails />}
              />
              <Route
                path="/reports/bankReceiptReconciliation"
                element={<BankReceiptReconciliation />}
              />
              <Route
                path="/reports/bankPaymentsReconciliation"
                element={<BankPaymentReconciliation />}
              />
              <Route
                path="/reports/clientTraceReport"
                element={<ClientTraceReport />}
              />
              <Route
                path="/reports/orderTraceReport"
                element={<OrderTraceReport />}
              />
              <Route
                path="/reports/vendorTraceReport"
                element={<VendorTraceReport />}
              />
              <Route
                path="/reports/clientReceipt"
                element={<ClientReceiptView />}
              />
              <Route
                path="/reports/orderpaymentDD"
                element={<OrderPaymentDDView />}
              />
              <Route
                path="/reports/orderpaymentbanktocash"
                element={<OrderPaymentB2CView />}
              />
              <Route
                path="reports/orderpaymentbanktobank"
                element={<OrderPaymentB2BView />}
              />
              <Route
                path="reports/orderpaymentwithtds"
                element={<OrderPaymentWithTdsView />}
              />
              <Route
                path="reports/orderpaymentwithouttds"
                element={<OrderPaymentWithoutTdsView />}
              />
              <Route
                path="reports/orderreceipttoinvoiceTax"
                element={<OrderReceiptToInvoiceServiceTax />}
              />
              <Route
                path="reports/tdspaidbyvendor"
                element={<TdsPaidByVendorView />}
              />
              <Route
                path="reports/vendorstatement"
                element={<VendorStatementView />}
              />
              <Route
                path="reports/tdsPaidToGovernment"
                element={<TdsPaidToGovernement />}
              />
              <Route
                path="reports/vendorpaymentsummary"
                element={<VendorPaymentPeriodView />}
              />
              <Route
                path="reports/clientStatistics"
                element={<ClientStatistics />}
              />
              <Route
                path="reports/statisticsReport"
                element={<StatisticsReport />}
              />
              <Route
                path="reports/serviceTaxPaidByVendor"
                element={<ServiceTaxPaidByVendor />}
              />
              <Route path="reports/tenantEmail" element={<TenantEmail />} />
              <Route path="reports/ownerMailId" element={<OwnerMailId />} />
              <Route
                path="reports/clientContactDetails"
                element={<ClientContactDetails />}
              />
              <Route
                path="/reports/orderStaticsView"
                element={<OrderStaticsView />}
              />
              <Route
                path="/reports/activellagreement"
                element={<ActiveLLAgreementView />}
              />
              <Route
                path="/reports/orderanalysis"
                element={<OrderAnalysis />}
              />
              <Route path="/reports/Lllist" element={<LLlistReport />} />
              <Route
                path="/reports/clientstatics"
                element={<ClientStatistics />}
              />
              <Route
                path="reports/clientStatementByDate"
                element={<ClientStatementByDate />}
              />
              <Route
                path="reports/paymentUnderSuspenseOrder"
                element={<PaymentUnderSuspenseOrder />}
              />
              <Route
                path="reports/receiptsUnderSuspenseOrder"
                element={<ReceiptsUnderSuspenseOrder />}
              />
              <Route
                path="reports/clientsWithOrderButNoEmail"
                element={<ClientsWithOrderButNoEmail />}
              />
              <Route
                path="reports/employeeWithoutVendor"
                element={<EmployeeWithoutVendor />}
              />
              <Route
                path="reports/bankTransactionsWithWrongUserName"
                element={<BankTransactionsWithWrongUserName />}
              />
              <Route
                path="reports/entityBlankReport"
                element={<EntityBlankReport />}
              />
              <Route
                path="reports/ownerwithnoproperty"
                element={<OwnerWithNoProperty />}
              />
              <Route
                path="reports/propertywithnoproject"
                element={<PropertyWithNoProjectView />}
              />
              <Route
                path="reports/serviceTaxReport"
                element={<ServiceTaxReport />}
              />
              <Route path="reports/vendorSummary" element={<VendorSummary />} />
              <Route path="reports/clientphoneno" element={<ClientPhoneNo />} />
              <Route path="reports/ownerphoneno" element={<OwnerPhoneNo />} />
              <Route
                path="reports/bankbalancereconciliation"
                element={<BankBalanceReconcilation />}
              />
              <Route path="reports/agedOrders" element={<AgedOrders />} />
            </Route>

            <Route path="/*" element={<NotFound />} />
          </Route>
        </Routes>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default App;

const Dashboard = Loadable(
  React.lazy(() => import("./Screens/Dashboard/Dashboard"))
);

const NotFound = Loadable(
  React.lazy(() => import("./Screens/NotFound/notFound"))
);
const Country = Loadable(React.lazy(() => import("./Screens/Admin/Country")));
const City = Loadable(React.lazy(() => import("./Screens/Admin/City")));
const Locality = Loadable(React.lazy(() => import("./Screens/Admin/Locality")));
const ManageUser = Loadable(
  React.lazy(() => import("./Screens/Manage/ManageUser/ManageUser"))
);
const ManageProjectInfo = Loadable(
  React.lazy(() =>
    import("./Screens/Manage/ManageProjectInfo/ManageProjectInfo")
  )
);

const ManageOrder = Loadable(
  React.lazy(() => import("./Screens/Manage/ManageOrder/ManageOrder"))
);
const ManageEmployees = Loadable(
  React.lazy(() => import("./Screens/Manage/ManageEmployee/ManageEmployees"))
);
const ManageBuilder = Loadable(
  React.lazy(() => import("./Screens/Manage/ManageBuilder/ManageBuilder"))
);
const Payments = Loadable(
  React.lazy(() => import("./Screens/Manage/Payments/Payments"))
);
const ManageClientInfo = Loadable(
  React.lazy(() => import("./Screens/Manage/ManageClientInfo/ManageClientInfo"))
);
const ManageClientProperty = Loadable(
  React.lazy(() =>
    import("./Screens/Manage/ManageClientProperty/ManageClientProperty")
  )
);
const ManageClientReceipt = Loadable(
  React.lazy(() =>
    import("./Screens/Manage/ManageClientReceipt/ManageClientReceipt")
  )
);
const ManageLLAgreement = Loadable(
  React.lazy(() =>
    import("./Screens/Manage/ManageLLAgreement/ManageLLAgreement")
  )
);
const ManagePmaArgreement = Loadable(
  React.lazy(() =>
    import("./Screens/Manage/ManagePmaAgreement/ManagePmaAgreement copy")
  )
);
const ManageOrderReceipt = Loadable(
  React.lazy(() =>
    import("./Screens/Manage/ManageOrderReceipt/ManageOrderReceipt")
  )
);
const ManageClientInvoice = Loadable(
  React.lazy(() =>
    import("./Screens/Manage/ManageClientInvoice/ManageClientInvoice")
  )
);
const ManageVendor = Loadable(
  React.lazy(() => import("./Screens/Manage/ManageVendor/ManagerVendor"))
);
const ManageVendorInvoice = Loadable(
  React.lazy(() =>
    import("./Screens/Manage/ManageVendorInvoice/ManageVendorInvoice")
  )
);
const ManageVendorPayment = Loadable(
  React.lazy(() =>
    import("./Screens/Manage/ManageVendorPayment/ManageVendorPayment")
  )
);
const LOB = Loadable(() => import("./Screens/Admin/LOB"));
const Service = Loadable(() => import("./Screens/Admin/Service"));
const ResearchAgent = Loadable(() =>
  import("./Screens/Research/Agent/index.jsx")
);
const ManageBankStatement = Loadable(() =>
  import("./Screens/Manage/ManageBankStatement/ManageBankStatement")
);
const ManageBuilderProject = Loadable(() =>
  import(
    "./Screens/Manage/ManageBuilder/ManageBuilderProject/ManageBuilderProject"
  )
);
const ManageBuilderContact = Loadable(() =>
  import("./Screens/Manage/ManageBuilder/ManageBuilderContact/index.jsx")
);
const PmaBilling = Loadable(React.lazy(() => import("./Screens/Manage/pma")));
const OrderPaymentList = Loadable(
  React.lazy(() => import("./Screens/Reports/OrderPaymentList"))
);
const OrderReceiptList = Loadable(
  React.lazy(() => import("./Screens/Reports/OrderReceiptList"))
);
const OrderInvoiceList = Loadable(
  React.lazy(() => import("./Screens/Reports/OrderInvoiceList"))
);
const LobReceiptPayments = Loadable(
  React.lazy(() => import("./Screens/Reports/LobReceiptPayments"))
);
const EntityReceiptPayments = Loadable(
  React.lazy(() => import("./Screens/Reports/EntityReceiptPayments"))
);
const LobReceiptPaymentsConsolidated = Loadable(
  React.lazy(() => import("./Screens/Reports/LobReceiptPaymentsConsolidated"))
);
const DeleteById = Loadable(
  React.lazy(() => import("./Screens/Admin/DeleteById/DeleteById"))
);
const SendClientStatement = Loadable(
  React.lazy(() => import("./Screens/Manage/SendClientStatement"))
);
const ClientReceiptList = Loadable(
  React.lazy(() => import("./Screens/Reports/ClientReceiptList"))
);
const VendorInvoiceList = Loadable(
  React.lazy(() => import("./Screens/Reports/VendorInvoiceList"))
);
const DeletePage = Loadable(
  React.lazy(() => import("./Screens/Admin/DeleteById/DeletePage"))
);
const PmaBillingTrendView = Loadable(() =>
  import("./Screens/Reports/reportPmaBillingTrendView")
);
const PmaClientReport = Loadable(() =>
  import("./Screens/Reports/pmaClientReport")
);
const PmaInvoiceList = Loadable(() =>
  import("./Screens/Reports/PmaInvoiceList")
);
const PmaClientReceivable = Loadable(() =>
  import("./Screens/Reports/PmaClientReceivables/index.jsx")
);
const ActivePmaAgreement = Loadable(() =>
  import("./Screens/Reports/ActivePmaAgreement")
);
const ProjectContact = Loadable(() =>
  import("./Screens/Reports/ProjectContacts")
);
const AdvanceHoldingAmount = Loadable(() =>
  import("./Screens/Reports/AdvanceHoldingAmount")
);
const PmaClientStatementAll = Loadable(() =>
  import("./Screens/Reports/PMAClientStatementAll")
);
const ShowAllOdersInformation = Loadable(
  React.lazy(() =>
    import("./Screens/Manage/ManageOrder/ShowAllOrdersInformation/index.jsx")
  )
);
const PmaClientStatement = Loadable(
  React.lazy(() => import("./Screens/Reports/PmaClientStatement"))
);
const NonPmaClientStatement = Loadable(
  React.lazy(() => import("./Screens/Reports/NonPmaClientStatement"))
);
const NonPmaClientReceivables = Loadable(
  React.lazy(() => import("./Screens/Reports/NonPmaClientReceivables"))
);
const ClientStatementAll = Loadable(
  React.lazy(() => import("./Screens/Reports/ClientStatement-CI,CRAndOR"))
);
const DuplicateClientReport = Loadable(
  React.lazy(() => import("./Screens/Reports/DupilcateClientsReport"))
);
const ClientBankDetails = Loadable(
  React.lazy(() => import("./Screens/Reports/ClientBankDetails"))
);
const MonthlyBankSummary = Loadable(
  React.lazy(() => import("./Screens/Reports/MonthlyBankSummary"))
);
const BankTransferReconciliation = Loadable(
  React.lazy(() => import("./Screens/Reports/BankTransferReconciliation"))
);
const ClientOrderReceiptMismatchDetails = Loadable(
  React.lazy(() =>
    import("./Screens/Reports/ClientOrderReceiptMismatchDetails")
  )
);
const BankReceiptReconciliation = Loadable(
  React.lazy(() => import("./Screens/Reports/BankReceiptsReconciliation"))
);
const BankPaymentReconciliation = Loadable(
  React.lazy(() => import("./Screens/Reports/BankPaymentReconciliation"))
);
const PrivateLayout = Loadable(
  React.lazy(() => import("./layout/Privatelayout"))
);

const PropectusPage = Loadable(
  React.lazy(() => import("./Screens/Research/Prospect"))
);
const ClientTraceReport = Loadable(
  React.lazy(() => import("./Screens/Reports/ReportTrace/ClientTraceReport"))
);
const OrderTraceReport = Loadable(
  React.lazy(() =>
    import("./Screens/Reports/ReportTrace/OrderTraceReport/index.jsx")
  )
);
const VendorTraceReport = Loadable(
  React.lazy(() =>
    import("./Screens/Reports/ReportTrace/VendorTraceReport/index.jsx")
  )
);
const UnAuthorized = Loadable(
  React.lazy(() => import("./Screens/UnAuthorized/UnAuthorized.jsx"))
);
const ClientReceiptView = Loadable(
  React.lazy(() =>
    import("./Screens/Reports/TallyReports/ClientReceipt/index.jsx")
  )
);
const OrderPaymentDDView = Loadable(
  React.lazy(() =>
    import("./Screens/Reports/TallyReports/OrderPaymentDD/index.jsx")
  )
);
const OrderPaymentB2CView = Loadable(
  React.lazy(() =>
    import("./Screens/Reports/TallyReports/OrderPaymentB2C/index.jsx")
  )
);
const OrderPaymentB2BView = Loadable(
  React.lazy(() =>
    import("./Screens/Reports/TallyReports/OrderPaymentB2B/index.jsx")
  )
);
const OrderPaymentWithTdsView = Loadable(
  React.lazy(() =>
    import("./Screens/Reports/TallyReports/OrderPaymentWithTds/index.jsx")
  )
);
const OrderPaymentWithoutTdsView = Loadable(
  React.lazy(() =>
    import("./Screens/Reports/TallyReports/OrderPaymentWithoutTds/index.jsx")
  )
);
const OrderReceiptToInvoiceServiceTax = Loadable(
  React.lazy(() =>
    import("./Screens/Reports/TallyReports/OrderReceiptToServiceTax/index.jsx")
  )
);
const ClientStatistics = Loadable(
  React.lazy(() =>
    import("./Screens/Reports/Statistics/ClientStatisticsReport/index.jsx")
  )
);
const ResearchEmployer = Loadable(
  React.lazy(() => import("./Screens/Research/Employer/index.jsx"))
);
const ResearchGovernmentDepartment = Loadable(
  React.lazy(() => import("./Screens/Research/Government Department/index.jsx"))
);

const ResearchOwner = Loadable(
  React.lazy(() => import("./Screens/Research/Owner/index.jsx"))
);
const ResearchFriends = Loadable(() =>
  React.lazy(import("./Screens/Research/Friends/index.jsx"))
);
const ResearchBanks = Loadable(() =>
  React.lazy(import("./Screens/Research/Banks/index.jsx"))
);
const ResearchBusinessGroup = Loadable(() =>
  React.lazy(import("./Screens/Research/COC/index.jsx"))
);
const ResearchProfessionals = Loadable(() =>
  React.lazy(import("./Screens/Research/Professionals/index.jsx"))
);
const ResearchMandals = Loadable(() =>
  React.lazy(import("./Screens/Research/Mandals/index.jsx"))
);
const ResearchArchitect = Loadable(() =>
  React.lazy(import("./Screens/Research/Architect/index.jsx"))
);
const ResearchEducational = Loadable(() =>
  React.lazy(import("./Screens/Research/Educational/index.jsx"))
);
const ResearchServiceApartments = Loadable(() =>
  React.lazy(import("./Screens/Research/ServiceApartment/index.jsx"))
);

const VendorStatementView = Loadable(() =>
  React.lazy(import("./Screens/Reports/VendorReport/VendorStatement/index.jsx"))
);
const TdsPaidToGovernement = Loadable(() =>
  React.lazy(
    import("./Screens/Reports/VendorReport/TdsPaidToGovernment/index.jsx")
  )
);
const TdsPaidByVendorView = Loadable(() =>
  React.lazy(import("./Screens/Reports/VendorReport/TDSPaidByvendor/index.jsx"))
);
const VendorPaymentPeriodView = Loadable(() =>
  React.lazy(
    import("./Screens/Reports/VendorReport/VendorPaymentPeriod/index.jsx")
  )
);
const StatisticsReport = Loadable(() =>
  React.lazy(import("./Screens/Reports/Statistics/StatisticsReport/index.jsx"))
);
const ServiceTaxPaidByVendor = Loadable(() =>
  React.lazy(
    import("./Screens/Reports/Statistics/ServiceTaxPaidByVendor/index.jsx")
  )
);
const TenantEmail = Loadable(() =>
  React.lazy(import("./Screens/Reports/Contacts/TenantEmail/index.jsx"))
);
const ResetPassword = Loadable(() =>
  React.lazy(import("./Screens/Login/ResetPassword.jsx"))
);
const RequestResetPassword = Loadable(() =>
  React.lazy(import("./Screens/Login/RequestResetPassword.jsx"))
);
const OwnerMailId = Loadable(() =>
  React.lazy(import("./Screens/Reports/Contacts/OwnerMailId/index.jsx"))
);
const ClientContactDetails = Loadable(() =>
  React.lazy(
    import("./Screens/Reports/Contacts/ClientContactsDetails/index.jsx")
  )
);
const OrderStaticsView = Loadable(() =>
  React.lazy(
    import("./Screens/Reports/Statistics/OrderStatisticsReport/index.jsx")
  )
);
const ActiveLLAgreementView = Loadable(() =>
  React.lazy(import("./Screens/Reports/ActiveLlAgreement/index.jsx"))
);
const OrderAnalysis = Loadable(() =>
  React.lazy(import("./Screens/Reports/OrderAnalysis/index.jsx"))
);
const LLlistReport = Loadable(() =>
  React.lazy(import("./Screens/Reports/LLlist/index.jsx"))
);
const ClientStatementByDate = Loadable(() =>
  React.lazy(import("./Screens/Reports/ClientStatementByDate/index.jsx"))
);
const PaymentUnderSuspenseOrder = Loadable(() =>
  React.lazy(
    import("./Screens/Reports/Group12/PaymentUnderSuspenseOrder/index.jsx")
  )
);
const ReceiptsUnderSuspenseOrder = Loadable(() =>
  React.lazy(
    import("./Screens/Reports/Group12/ReceiptsUnderSuspenseOrder/index.jsx")
  )
);
const ClientsWithOrderButNoEmail = Loadable(() =>
  React.lazy(
    import("./Screens/Reports/Group12/ClientsWithOrderButNoEmail/index.jsx")
  )
);
const EmployeeWithoutVendor = Loadable(() =>
  React.lazy(
    import("./Screens/Reports/Group12/EmployeeWithoutVendor/index.jsx")
  )
);
const BankTransactionsWithWrongUserName = Loadable(() =>
  React.lazy(
    import(
      "./Screens/Reports/Group12/BankTransactionsWithWrongUserName/index.jsx"
    )
  )
);
const EntityBlankReport = Loadable(() =>
  React.lazy(import("./Screens/Reports/Group12/EntityBlankReport/index.jsx"))
);
const OwnerWithNoProperty = Loadable(() =>
  React.lazy(import("./Screens/Reports/Group12/OwnerWIthNoProperty/index.jsx"))
);
const PropertyWithNoProjectView = Loadable(() =>
  React.lazy(
    import("./Screens/Reports/Group12/PropertyWithNoProject/index.jsx")
  )
);
const ServiceTaxReport = Loadable(() =>
  React.lazy(import("./Screens/Reports/Group12/ServiceTaxReport/index.jsx"))
);
const VendorSummary = Loadable(() =>
  React.lazy(import("./Screens/Reports/VendorReport/vendorSummary/index.jsx"))
);
const ClientPhoneNo = Loadable(() =>
  React.lazy(import("./Screens/Reports/Group13/ClientWithPhoneNo/index.jsx"))
);
const OwnerPhoneNo = Loadable(() =>
  React.lazy(import("./Screens/Reports/Group13/OwnerWithPhoneNo/index.jsx"))
);
const BankBalanceReconcilation = Loadable(() =>
  React.lazy(import("./Screens/Reports/BankBalanceReconcilation/index.jsx"))
);
const AgedOrders = Loadable(() =>
  React.lazy(import("./Screens/Reports/AgedOrders/index.jsx"))
);
const UpdateCompanyKey = Loadable(() =>
  React.lazy(import("./Screens/Admin/UpdateCompanyKey/index.jsx"))
);
const ChangePassword = Loadable(() =>
  React.lazy(import("./Screens/Login/ChangePassword.jsx"))
);
