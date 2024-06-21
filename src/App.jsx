import React, { Suspense } from "react";
import { Route, Routes, Outlet, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Login from "./Screens/Login/Login";
import { setNavigate } from "./services/setNavigation.js";
import { setAccessToken } from "./utils/axios.js";
import useAuth from "./context/JwtContext.jsx";
import AuthGuard from "./context/AuthGuard";

// Lazy-loaded components with Suspense
const NotFound = React.lazy(() => import("./Screens/NotFound/notFound"));
const Country = React.lazy(() => import("./Screens/Admin/Country"));
const City = React.lazy(() => import("./Screens/Admin/City"));
const Locality = React.lazy(() => import("./Screens/Admin/Locality"));
const ManageUser = React.lazy(() => import("./Screens/Manage/ManageUser/ManageUser"));
const ManageProjectInfo = React.lazy(() => import("./Screens/Manage/ManageProjectInfo/ManageProjectInfo"));
const ManageOrder = React.lazy(() => import("./Screens/Manage/ManageOrder/ManageOrder"));
const ManageEmployees = React.lazy(() => import("./Screens/Manage/ManageEmployee/ManageEmployees"));
const ManageBuilder = React.lazy(() => import("./Screens/Manage/ManageBuilder/ManageBuilder"));
const Payments = React.lazy(() => import("./Screens/Manage/Payments/Payments"));
const ManageClientInfo = React.lazy(() => import("./Screens/Manage/ManageClientInfo/ManageClientInfo"));
const ManageClientProperty = React.lazy(() => import("./Screens/Manage/ManageClientProperty/ManageClientProperty"));
const ManageClientReceipt = React.lazy(() => import("./Screens/Manage/ManageClientReceipt/ManageClientReceipt"));
const ManageLLAgreement = React.lazy(() => import("./Screens/Manage/ManageLLAgreement/ManageLLAgreement"));
const ManagePmaArgreement = React.lazy(() => import("./Screens/Manage/ManagePmaAgreement/ManagePmaAgreement copy"));
const ManageOrderReceipt = React.lazy(() => import("./Screens/Manage/ManageOrderReceipt/ManageOrderReceipt"));
const ManageClientInvoice = React.lazy(() => import("./Screens/Manage/ManageClientInvoice/ManageClientInvoice"));
const ManageVendor = React.lazy(() => import("./Screens/Manage/ManageVendor/ManagerVendor"));
const ManageVendorInvoice = React.lazy(() => import("./Screens/Manage/ManageVendorInvoice/ManageVendorInvoice"));
const ManageVendorPayment = React.lazy(() => import("./Screens/Manage/ManageVendorPayment/ManageVendorPayment"));
const LOB = React.lazy(() => import("./Screens/Admin/LOB"));
const Service = React.lazy(() => import("./Screens/Admin/Service"));
const ResearchAgent = React.lazy(() => import("./Screens/Research/Agent/index.jsx"));
const ManageBankStatement = React.lazy(() => import("./Screens/Manage/ManageBankStatement/ManageBankStatement"));
const ManageBuilderProject = React.lazy(() => import("./Screens/Manage/ManageBuilder/ManageBuilderProject/ManageBuilderProject"));
const ManageBuilderContact = React.lazy(() => import("./Screens/Manage/ManageBuilder/ManageBuilderContact/index.jsx"));
const PmaBilling = React.lazy(() => import("./Screens/Manage/pma"));
const OrderPaymentList = React.lazy(() => import("./Screens/Reports/OrderPaymentList"));
const OrderReceiptList = React.lazy(() => import("./Screens/Reports/OrderReceiptList"));
const OrderInvoiceList = React.lazy(() => import("./Screens/Reports/OrderInvoiceList"));
const LobReceiptPayments = React.lazy(() => import("./Screens/Reports/LobReceiptPayments"));
const EntityReceiptPayments = React.lazy(() => import("./Screens/Reports/EntityReceiptPayments"));
const LobReceiptPaymentsConsolidated = React.lazy(() => import("./Screens/Reports/LobReceiptPaymentsConsolidated"));
const DeleteById = React.lazy(() => import("./Screens/Admin/DeleteById/DeleteById"));
const SendClientStatement = React.lazy(() => import("./Screens/Manage/SendClientStatement"));
const ClientReceiptList = React.lazy(() => import("./Screens/Reports/ClientReceiptList"));
const VendorInvoiceList = React.lazy(() => import("./Screens/Reports/VendorInvoiceList"));
const DeletePage = React.lazy(() => import("./Screens/Admin/DeleteById/DeletePage"));
const PmaBillingTrendView = React.lazy(() => import("./Screens/Reports/reportPmaBillingTrendView"));
const PmaClientReport = React.lazy(() => import("./Screens/Reports/pmaClientReport"));
const PmaInvoiceList = React.lazy(() => import("./Screens/Reports/PmaInvoiceList"));
const PmaClientReceivable = React.lazy(() => import("./Screens/Reports/PmaClientReceivables/index.jsx"));
const ActivePmaAgreement = React.lazy(() => import("./Screens/Reports/ActivePmaAgreement"));
const ProjectContact = React.lazy(() => import("./Screens/Reports/ProjectContacts"));
const AdvanceHoldingAmount = React.lazy(() => import("./Screens/Reports/AdvanceHoldingAmount"));
const PmaClientStatementAll = React.lazy(() => import("./Screens/Reports/PMAClientStatementAll"));
const ShowAllOdersInformation = React.lazy(() => import("./Screens/Manage/ManageOrder/ShowAllOrdersInformation/index.jsx"));
const PmaClientStatement = React.lazy(() => import("./Screens/Reports/PmaClientStatement"));
const NonPmaClientStatement = React.lazy(() => import("./Screens/Reports/NonPmaClientStatement"));
const NonPmaClientReceivables = React.lazy(() => import("./Screens/Reports/NonPmaClientReceivables"));
const ClientStatementAll = React.lazy(() => import("./Screens/Reports/ClientStatement-CI,CRAndOR"));
const DuplicateClientReport = React.lazy(() => import("./Screens/Reports/DupilcateClientsReport"));
const ClientBankDetails = React.lazy(() => import("./Screens/Reports/ClientBankDetails"));
const MonthlyBankSummary = React.lazy(() => import("./Screens/Reports/MonthlyBankSummary"));
const BankTransferReconciliation = React.lazy(() => import("./Screens/Reports/BankTransferReconciliation"));
const ClientOrderReceiptMismatchDetails = React.lazy(() => import("./Screens/Reports/ClientOrderReceiptMismatchDetails"));
const BankReceiptReconciliation = React.lazy(() => import("./Screens/Reports/BankReceiptsReconciliation"));
const BankPaymentReconciliation = React.lazy(() => import("./Screens/Reports/BankPaymentReconciliation"));
const PrivateLayout = React.lazy(() => import("./layout/Privatelayout"));
const PropectusPage = React.lazy(() => import("./Screens/Research/Prospect"));
const ClientTraceReport = React.lazy(() => import("./Screens/Reports/ReportTrace/ClientTraceReport"));
const OrderTraceReport = React.lazy(() => import("./Screens/Reports/ReportTrace/OrderTraceReport/index.jsx"));
const VendorTraceReport = React.lazy(() => import("./Screens/Reports/ReportTrace/VendorTraceReport/index.jsx"));
const UnAuthorized = React.lazy(() => import("./Screens/UnAuthorized/UnAuthorized.jsx"));
const ClientReceiptView = React.lazy(() => import("./Screens/Reports/TallyReports/ClientReceipt/index.jsx"));
const OrderPaymentDDView = React.lazy(() => import("./Screens/Reports/TallyReports/OrderPaymentDD/index.jsx"));
const OrderPaymentB2CView = React.lazy(() => import("./Screens/Reports/TallyReports/OrderPaymentB2C/index.jsx"));
const OrderPaymentB2BView = React.lazy(() => import("./Screens/Reports/TallyReports/OrderPaymentB2B/index.jsx"));
const OrderPaymentWithTdsView = React.lazy(() => import("./Screens/Reports/TallyReports/OrderPaymentWithTds/index.jsx"));
const OrderPaymentWithoutTdsView = React.lazy(() => import("./Screens/Reports/TallyReports/OrderPaymentWithoutTds/index.jsx"));
const OrderReceiptToInvoiceServiceTax = React.lazy(() => import("./Screens/Reports/TallyReports/OrderReceiptToServiceTax/index.jsx"));
const ClientStatistics = React.lazy(() => import("./Screens/Reports/Statistics/ClientStatisticsReport/index.jsx"));
const ResearchEmployer = React.lazy(() => import("./Screens/Research/Employer/index.jsx"));
const ResearchGovernmentDepartment = React.lazy(() => import("./Screens/Research/Government Department/index.jsx"));
const ResearchOwner = React.lazy(() => import("./Screens/Research/Owner/index.jsx"));
const ResearchFriends = React.lazy(() => import("./Screens/Research/Friends/index.jsx"));
const ResearchBanks = React.lazy(() => import("./Screens/Research/Banks/index.jsx"));
const ResearchBusinessGroup = React.lazy(() => import("./Screens/Research/COC/index.jsx"));
const ResearchProfessionals = React.lazy(() => import("./Screens/Research/Professionals/index.jsx"));
const ResearchMandals = React.lazy(() => import("./Screens/Research/Mandals/index.jsx"));
const ResearchArchitect = React.lazy(() => import("./Screens/Research/Architect/index.jsx"));
const ResearchEducational = React.lazy(() => import("./Screens/Research/Educational/index.jsx"));
const ResearchServiceApartments = React.lazy(() => import("./Screens/Research/ServiceApartment/index.jsx"));
const VendorStatementView = React.lazy(() => import("./Screens/Reports/VendorReport/VendorStatement/index.jsx"));
const TdsPaidToGovernement = React.lazy(() => import("./Screens/Reports/VendorReport/TdsPaidToGovernment/index.jsx"));
const TdsPaidByVendorView = React.lazy(() => import("./Screens/Reports/VendorReport/TDSPaidByvendor/index.jsx"));
const VendorPaymentPeriodView = React.lazy(() => import("./Screens/Reports/VendorReport/VendorPaymentPeriod/index.jsx"));
const StatisticsReport = React.lazy(() => import("./Screens/Reports/Statistics/StatisticsReport/index.jsx"));
const ServiceTaxPaidByVendor = React.lazy(() => import("./Screens/Reports/Statistics/ServiceTaxPaidByVendor/index.jsx"));
const TenantEmail = React.lazy(() => import("./Screens/Reports/Contacts/TenantEmail/index.jsx"));
const ResetPassword = React.lazy(() => import("./Screens/Login/ResetPassword.jsx"));
const RequestResetPassword = React.lazy(() => import("./Screens/Login/RequestResetPassword.jsx"));
const OwnerMailId = React.lazy(() => import("./Screens/Reports/Contacts/OwnerMailId/index.jsx"));
const ClientContactDetails = React.lazy(() => import("./Screens/Reports/Contacts/ClientContactsDetails/index.jsx"));
const OrderStaticsView = React.lazy(() => import("./Screens/Reports/Statistics/OrderStatisticsReport/index.jsx"));
const ActiveLLAgreementView = React.lazy(() => import("./Screens/Reports/ActiveLlAgreement/index.jsx"));
const OrderAnalysis = React.lazy(() => import("./Screens/Reports/OrderAnalysis/index.jsx"));
const LLlistReport = React.lazy(() => import("./Screens/Reports/LLlist/index.jsx"));
const ClientStatementByDate = React.lazy(() => import("./Screens/Reports/ClientStatementByDate/index.jsx"));
const PaymentUnderSuspenseOrder = React.lazy(() => import("./Screens/Reports/Group12/PaymentUnderSuspenseOrder/index.jsx"));
const ReceiptsUnderSuspenseOrder = React.lazy(() => import("./Screens/Reports/Group12/ReceiptsUnderSuspenseOrder/index.jsx"));
const ClientsWithOrderButNoEmail = React.lazy(() => import("./Screens/Reports/Group12/ClientsWithOrderButNoEmail/index.jsx"));
const EmployeeWithoutVendor = React.lazy(() => import("./Screens/Reports/Group12/EmployeeWithoutVendor/index.jsx"));
const BankTransactionsWithWrongUserName = React.lazy(() => import("./Screens/Reports/Group12/BankTransactionsWithWrongUserName/index.jsx"));
const EntityBlankReport = React.lazy(() => import("./Screens/Reports/Group12/EntityBlankReport/index.jsx"));
const OwnerWithNoProperty = React.lazy(() => import("./Screens/Reports/Group12/OwnerWIthNoProperty/index.jsx"));
const PropertyWithNoProjectView = React.lazy(() => import("./Screens/Reports/Group12/PropertyWithNoProject/index.jsx"));
const ServiceTaxReport = React.lazy(() => import("./Screens/Reports/Group12/ServiceTaxReport/index.jsx"));
const VendorSummary = React.lazy(() => import("./Screens/Reports/VendorReport/vendorSummary/index.jsx"));
const ClientPhoneNo = React.lazy(() => import("./Screens/Reports/Group13/ClientWithPhoneNo/index.jsx"));
const OwnerPhoneNo = React.lazy(() => import("./Screens/Reports/Group13/OwnerWithPhoneNo/index.jsx"));
const BankBalanceReconcilation = React.lazy(() => import("./Screens/Reports/BankBalanceReconcilation/index.jsx"));
const AgedOrders = React.lazy(() => import("./Screens/Reports/AgedOrders/index.jsx"));
const UpdateCompanyKey = React.lazy(() => import("./Screens/Admin/UpdateCompanyKey/index.jsx"));
const ChangePassword = React.lazy(() => import("./Screens/Login/ChangePassword.jsx"));
const Dashboard = React.lazy(() => import("./Screens/Dashboard/Dashboard"));


const App = () => {
  const { isInitialized, accessToken } = useAuth();
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
      {isInitialized ? (
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route path="" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<UnAuthorized/>} />
            <Route path="/reset/:token" element={<ResetPassword />} />
            <Route path="/reset" element={<RequestResetPassword />} />

            <Route element={<AuthGuard><PrivateLayout /></AuthGuard>}>
              <Route path="/dashboard" element={<Suspense fallback={<CircularProgress />}><Dashboard /></Suspense>} />
              <Route path="/changepassword" element={<Suspense fallback={<CircularProgress />}><ChangePassword /></Suspense>} />
              <Route path="/admin/manageuser" element={<Suspense fallback={<CircularProgress />}><ManageUser /></Suspense>} />
              <Route path="/admin/updatecompanykey" element={<Suspense fallback={<CircularProgress />}><UpdateCompanyKey /></Suspense>} />
              <Route path="/admin/manageemployees" element={<Suspense fallback={<CircularProgress />}><ManageEmployees /></Suspense>} />
              <Route path="/manage/managebuilder" element={<Suspense fallback={<CircularProgress />}><ManageBuilder /></Suspense>} />
              <Route path="/manage/manageprojectinfo" element={<Suspense fallback={<CircularProgress />}><ManageProjectInfo /></Suspense>} />
              <Route path="/manage/managebuilder/manageproject/:id" element={<Suspense fallback={<CircularProgress />}><ManageProjectInfo key="hyperlinked" /></Suspense>} />
              <Route path="/admin/deleteById" element={<Suspense fallback={<CircularProgress />}><DeleteById /></Suspense>} />
              <Route path="/admin/deleteById/:pagename" element={<Suspense fallback={<CircularProgress />}><DeletePage /></Suspense>} />
              <Route path="/manage/manageOrder" element={<Suspense fallback={<CircularProgress />}><ManageOrder /></Suspense>} />
              <Route path="/admin/manageuser" element={<Suspense fallback={<CircularProgress />}><ManageUser /></Suspense>} />
              <Route path="/admin/country" element={<Suspense fallback={<CircularProgress />}><Country /></Suspense>} />
              <Route path="/admin/city" element={<Suspense fallback={<CircularProgress />}><City /></Suspense>} />
              <Route path="/admin/locality" element={<Suspense fallback={<CircularProgress />}><Locality /></Suspense>} />
              <Route path="/admin/LOB" element={<Suspense fallback={<CircularProgress />}><LOB /></Suspense>} />
              <Route path="/admin/service" element={<Suspense fallback={<CircularProgress />}><Service /></Suspense>} />
              <Route path="/admin/payments" element={<Suspense fallback={<CircularProgress />}><Payments /></Suspense>} />
              <Route path="/research/prospect" element={<Suspense fallback={<CircularProgress />}><PropectusPage /></Suspense>} />
              <Route path="/research/employer" element={<Suspense fallback={<CircularProgress />}><ResearchEmployer /></Suspense>} />
              <Route path="/research/owner" element={<Suspense fallback={<CircularProgress />}><ResearchOwner /></Suspense>} />
              <Route path="/research/educational" element={<Suspense fallback={<CircularProgress />}><ResearchEducational /></Suspense>} />
              <Route path="/research/architect" element={<Suspense fallback={<CircularProgress />}><ResearchArchitect /></Suspense>} />
              <Route path="/research/mandals" element={<Suspense fallback={<CircularProgress />}><ResearchMandals /></Suspense>} />
              <Route path="/research/professionals" element={<Suspense fallback={<CircularProgress />}><ResearchProfessionals /></Suspense>} />
              <Route path="/research/businessgroup" element={<Suspense fallback={<CircularProgress />}><ResearchBusinessGroup /></Suspense>} />
              <Route path="/research/banks" element={<Suspense fallback={<CircularProgress />}><ResearchBanks /></Suspense>} />
              <Route path="/research/friends" element={<Suspense fallback={<CircularProgress />}><ResearchFriends /></Suspense>} />
              <Route path="/research/serviceapartment" element={<Suspense fallback={<CircularProgress />}><ResearchServiceApartments /></Suspense>} />
              <Route path="/research/agent" element={<Suspense fallback={<CircularProgress />}><ResearchAgent /></Suspense>} />
              <Route path="/research/governmentdepartment" element={<Suspense fallback={<CircularProgress />}><ResearchGovernmentDepartment /></Suspense>} />
              <Route path="/manage/bankstatement" element={<Suspense fallback={<CircularProgress />}><ManageBankStatement /></Suspense>} />
              <Route path="/manage/manageclientinfo" element={<Suspense fallback={<CircularProgress />}><ManageClientInfo /></Suspense>} />
              <Route path="/manage/manageclientproperty" element={<Suspense fallback={<CircularProgress />}><ManageClientProperty /></Suspense>} />
              <Route path="/manage/manageclientreceipt" element={<Suspense fallback={<CircularProgress />}><ManageClientReceipt /></Suspense>} />
              <Route path="/manage/managellagreement" element={<Suspense fallback={<CircularProgress />}><ManageLLAgreement /></Suspense>} />
              <Route path="/manage/managepmaagreement" element={<Suspense fallback={<CircularProgress />}><ManagePmaArgreement /></Suspense>} />
              <Route path="/manage/manageorderreceipt" element={<Suspense fallback={<CircularProgress />}><ManageOrderReceipt /></Suspense>} />
              <Route path="/manage/manageclientinvoice" element={<Suspense fallback={<CircularProgress />}><ManageClientInvoice /></Suspense>} />
              <Route path="/manage/managevendor" element={<Suspense fallback={<CircularProgress />}><ManageVendor /></Suspense>} />
              <Route path="/manage/managevendorinvoice" element={<Suspense fallback={<CircularProgress />}><ManageVendorInvoice /></Suspense>} />
              <Route path="/manage/managevendorpayment" element={<Suspense fallback={<CircularProgress />}><ManageVendorPayment /></Suspense>} />
              <Route path="/manage/sendclientstatement" element={<Suspense fallback={<CircularProgress />}><SendClientStatement /></Suspense>} />
              <Route path="manage/managebuilder/projects/:buildername" element={<Suspense fallback={<CircularProgress />}><ManageBuilderProject /></Suspense>} />
              <Route path="/manage/managebuilder/contacts/:buildername" element={<Suspense fallback={<CircularProgress />}><ManageBuilderContact /></Suspense>} />
              <Route path="/manage/managevendorpayment/:orderid" element={<Suspense fallback={<CircularProgress />}><ManageVendorPayment key="hyperlinked" /></Suspense>} />
              <Route path="/manage/manageclientinvoice/:orderid" element={<Suspense fallback={<CircularProgress />}><ManageClientInvoice key="hyperlinked" /></Suspense>} />
              <Route path="/manage/manageorderreceipt/:orderid" element={<Suspense fallback={<CircularProgress />}><ManageOrderReceipt key="hyperlinked" /></Suspense>} />
              <Route path="/manage/manageclientinfo/orders/showall/:orderid" element={<Suspense fallback={<CircularProgress />}><ShowAllOdersInformation /></Suspense>} />
              <Route path="/manage/manageclientinfo/properties/:clientname" element={<Suspense fallback={<CircularProgress />}><ManageClientProperty key="hyperlinked" /></Suspense>} />
              <Route path="/manage/manageclientinfo/orders/:clientname" element={<Suspense fallback={<CircularProgress />}><ManageOrder key="hyperlinked" /></Suspense>} />
              <Route path="/manage/manageclientproperty/pmaagreement/:clientname" element={<Suspense fallback={<CircularProgress />}><ManagePmaArgreement key="hyperlinked" /></Suspense>} />
              <Route path="/manage/manageclientproperty/llagreement/:clientname" element={<Suspense fallback={<CircularProgress />}><ManageLLAgreement key="hyperlinked" /></Suspense>} />
              <Route path="/manage/pmaBilling" element={<Suspense fallback={<CircularProgress />}><PmaBilling /></Suspense>} />
              <Route path="/reports/orderPaymentList" element={<Suspense fallback={<CircularProgress />}><OrderPaymentList /></Suspense>} />
              <Route path="/reports/orderReceiptList" element={<Suspense fallback={<CircularProgress />}><OrderReceiptList /></Suspense>} />
              <Route path="/reports/orderInvoiceList" element={<Suspense fallback={<CircularProgress />}><OrderInvoiceList /></Suspense>} />
              <Route path="/reports/clientReceiptList" element={<Suspense fallback={<CircularProgress />}><ClientReceiptList /></Suspense>} />
              <Route path="/reports/vendorPaymentsList" element={<Suspense fallback={<CircularProgress />}><VendorInvoiceList /></Suspense>} />
              <Route path="/admin/lobReceiptPayments" element={<Suspense fallback={<CircularProgress />}><LobReceiptPayments /></Suspense>} />
              <Route path="/admin/entityReceiptPayments" element={<Suspense fallback={<CircularProgress />}><EntityReceiptPayments /></Suspense>} />
              <Route path="/admin/lobReceiptPaymentsConsolidated" element={<Suspense fallback={<CircularProgress />}><LobReceiptPaymentsConsolidated /></Suspense>} />
              <Route path="/reports/pmaBillingTrendView" element={<Suspense fallback={<CircularProgress />}><PmaBillingTrendView /></Suspense>} />
              <Route path="/reports/pmaClientReport" element={<Suspense fallback={<CircularProgress />}><PmaClientReport /></Suspense>} />
              <Route path="/reports/pmaInvoiceList" element={<Suspense fallback={<CircularProgress />}><PmaInvoiceList /></Suspense>} />
              <Route path="/reports/pmaClientReceivable" element={<Suspense fallback={<CircularProgress />}><PmaClientReceivable /></Suspense>} />
              <Route path="/reports/activePmaAgreement" element={<Suspense fallback={<CircularProgress />}><ActivePmaAgreement /></Suspense>} />
              <Route path="/reports/projectContact" element={<Suspense fallback={<CircularProgress />}><ProjectContact /></Suspense>} />
              <Route path="/reports/advanceHoldingAmount" element={<Suspense fallback={<CircularProgress />}><AdvanceHoldingAmount /></Suspense>} />
              <Route path="/reports/pmaClientStatementAll" element={<Suspense fallback={<CircularProgress />}><PmaClientStatementAll /></Suspense>} />
              <Route path="/reports/pmaClientStatement" element={<Suspense fallback={<CircularProgress />}><PmaClientStatement /></Suspense>} />
              <Route path="/reports/nonPmaClientStatement" element={<Suspense fallback={<CircularProgress />}><NonPmaClientStatement /></Suspense>} />
              <Route path="/reports/nonPmaClientReceivables" element={<Suspense fallback={<CircularProgress />}><NonPmaClientReceivables /></Suspense>} />
              <Route path="/reports/clientStatementAll" element={<Suspense fallback={<CircularProgress />}><ClientStatementAll /></Suspense>} />
              <Route path="/reports/duplicateClientReport" element={<Suspense fallback={<CircularProgress />}><DuplicateClientReport /></Suspense>} />
              <Route path="/reports/clientBankDetails" element={<Suspense fallback={<CircularProgress />}><ClientBankDetails /></Suspense>} />
              <Route path="/reports/monthlyBankSummary" element={<Suspense fallback={<CircularProgress />}><MonthlyBankSummary /></Suspense>} />
              <Route path="/reports/bankTransferReconciliation" element={<Suspense fallback={<CircularProgress />}><BankTransferReconciliation /></Suspense>} />
              <Route path="/reports/clientOrderReceiptMismatchDetails" element={<Suspense fallback={<CircularProgress />}><ClientOrderReceiptMismatchDetails /></Suspense>} />
              <Route path="/reports/bankReceiptReconciliation" element={<Suspense fallback={<CircularProgress />}><BankReceiptReconciliation /></Suspense>} />
              <Route path="/reports/bankPaymentsReconciliation" element={<Suspense fallback={<CircularProgress />}><BankPaymentReconciliation /></Suspense>} />
              <Route path="/reports/clientTraceReport" element={<Suspense fallback={<CircularProgress />}><ClientTraceReport /></Suspense>} />
              <Route path="/reports/orderTraceReport" element={<Suspense fallback={<CircularProgress />}><OrderTraceReport /></Suspense>} />
              <Route path="/reports/vendorTraceReport" element={<Suspense fallback={<CircularProgress />}><VendorTraceReport /></Suspense>} />
              <Route path="/reports/clientReceipt" element={<Suspense fallback={<CircularProgress />}><ClientReceiptView /></Suspense>} />
              <Route path="/reports/orderpaymentDD" element={<Suspense fallback={<CircularProgress />}><OrderPaymentDDView /></Suspense>} />
              <Route path="/reports/orderpaymentbanktocash" element={<Suspense fallback={<CircularProgress />}><OrderPaymentB2CView /></Suspense>} />
              <Route path="reports/orderpaymentbanktobank" element={<Suspense fallback={<CircularProgress />}><OrderPaymentB2BView /></Suspense>} />
              <Route path="reports/orderpaymentwithtds" element={<Suspense fallback={<CircularProgress />}><OrderPaymentWithTdsView /></Suspense>} />
              <Route path="reports/orderpaymentwithouttds" element={<Suspense fallback={<CircularProgress />}><OrderPaymentWithoutTdsView /></Suspense>} />
              <Route path="reports/orderreceipttoinvoiceTax" element={<Suspense fallback={<CircularProgress />}><OrderReceiptToInvoiceServiceTax /></Suspense>} />
              <Route path="reports/tdspaidbyvendor" element={<Suspense fallback={<CircularProgress />}><TdsPaidByVendorView /></Suspense>} />
              <Route path="reports/vendorstatement" element={<Suspense fallback={<CircularProgress />}><VendorStatementView /></Suspense>} />
              <Route path="reports/tdsPaidToGovernment" element={<Suspense fallback={<CircularProgress />}><TdsPaidToGovernement /></Suspense>} />
              <Route path="reports/vendorpaymentsummary" element={<Suspense fallback={<CircularProgress />}><VendorPaymentPeriodView /></Suspense>} />
              <Route path="reports/clientStatistics" element={<Suspense fallback={<CircularProgress />}><ClientStatistics /></Suspense>} />
              <Route path="reports/statisticsReport" element={<Suspense fallback={<CircularProgress />}><StatisticsReport /></Suspense>} />
              <Route path="reports/serviceTaxPaidByVendor" element={<Suspense fallback={<CircularProgress />}><ServiceTaxPaidByVendor /></Suspense>} />
              <Route path="reports/tenantEmail" element={<Suspense fallback={<CircularProgress />}><TenantEmail /></Suspense>} />
              <Route path="reports/ownerMailId" element={<Suspense fallback={<CircularProgress />}><OwnerMailId /></Suspense>} />
              <Route path="reports/clientContactDetails" element={<Suspense fallback={<CircularProgress />}><ClientContactDetails /></Suspense>} />
              <Route path="/reports/orderStaticsView" element={<Suspense fallback={<CircularProgress />}><OrderStaticsView /></Suspense>} />
              <Route path="/reports/activellagreement" element={<Suspense fallback={<CircularProgress />}><ActiveLLAgreementView /></Suspense>} />
              <Route path="/reports/orderanalysis" element={<Suspense fallback={<CircularProgress />}><OrderAnalysis /></Suspense>} />
              <Route path="/reports/Lllist" element={<Suspense fallback={<CircularProgress />}><LLlistReport /></Suspense>} />
              <Route path="/reports/clientstatics" element={<Suspense fallback={<CircularProgress />}><ClientStatistics /></Suspense>} />
              <Route path="/reports/clientStatementByDate" element={<Suspense fallback={<CircularProgress />}><ClientStatementByDate /></Suspense>} />
              <Route path="/reports/paymentUnderSuspenseOrder" element={<Suspense fallback={<CircularProgress />}><PaymentUnderSuspenseOrder /></Suspense>} />
              <Route path="/reports/receiptsUnderSuspenseOrder" element={<Suspense fallback={<CircularProgress />}><ReceiptsUnderSuspenseOrder /></Suspense>} />
              <Route path="/reports/clientsWithOrderButNoEmail" element={<Suspense fallback={<CircularProgress />}><ClientsWithOrderButNoEmail /></Suspense>} />
              <Route path="/reports/employeeWithoutVendor" element={<Suspense fallback={<CircularProgress />}><EmployeeWithoutVendor /></Suspense>} />
              <Route path="/reports/bankTransactionsWithWrongUserName" element={<Suspense fallback={<CircularProgress />}><BankTransactionsWithWrongUserName /></Suspense>} />
              <Route path="/reports/entityBlankReport" element={<Suspense fallback={<CircularProgress />}><EntityBlankReport /></Suspense>} />
              <Route path="/reports/ownerwithnoproperty" element={<Suspense fallback={<CircularProgress />}><OwnerWithNoProperty /></Suspense>} />
              <Route path="/reports/propertywithnoproject" element={<Suspense fallback={<CircularProgress />}><PropertyWithNoProjectView /></Suspense>} />
              <Route path="/reports/serviceTaxReport" element={<Suspense fallback={<CircularProgress />}><ServiceTaxReport /></Suspense>} />
              <Route path="/reports/vendorSummary" element={<Suspense fallback={<CircularProgress />}><VendorSummary /></Suspense>} />
              <Route path="/reports/clientphoneno" element={<Suspense fallback={<CircularProgress />}><ClientPhoneNo /></Suspense>} />
              <Route path="/reports/ownerphoneno" element={<Suspense fallback={<CircularProgress />}><OwnerPhoneNo /></Suspense>} />
              <Route path="/reports/bankbalancereconciliation" element={<Suspense fallback={<CircularProgress />}><BankBalanceReconcilation /></Suspense>} />
              <Route path="/reports/agedOrders" element={<Suspense fallback={<CircularProgress />}><AgedOrders /></Suspense>} />
            </Route>
            <Route path="/*" element={<Suspense fallback={<CircularProgress />}><NotFound /></Suspense>} />
          </Route>
        </Routes>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default App;

