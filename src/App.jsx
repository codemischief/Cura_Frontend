import React, { Suspense } from "react";
import { Route, Routes, Outlet, useNavigate } from "react-router-dom";
import {Backdrop} from "@mui/material";
import Login from "./Screens/Login/Login";
import { setNavigate } from "./services/setNavigation.js";
import { setAccessToken } from "./utils/axios.js";
import useAuth from "./context/JwtContext.jsx";
import AuthGuard from "./context/AuthGuard";


// Loading Backdrop

const LoadingBackdrop = () => (
  <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={true}
  >

  </Backdrop>
);
// Lazy-loaded components with Suspense
const NotFound = React.lazy(() => import("./Screens/NotFound/notFound"));
const Country = React.lazy(() => import("./Screens/Admin/Country"));
const City = React.lazy(() => import("./Screens/Admin/City"));
const Locality = React.lazy(() => import("./Screens/Admin/Locality"));
const ManageUser = React.lazy(() =>
  import("./Screens/Manage/ManageUser/ManageUser")
);
const ManageProjectInfo = React.lazy(() =>
  import("./Screens/Manage/ManageProjectInfo/ManageProjectInfo")
);
const ManageOrder = React.lazy(() =>
  import("./Screens/Manage/ManageOrder/ManageOrder")
);
const ManageEmployees = React.lazy(() =>
  import("./Screens/Manage/ManageEmployee/ManageEmployees")
);
const ManageBuilder = React.lazy(() =>
  import("./Screens/Manage/ManageBuilder/ManageBuilder")
);
const Payments = React.lazy(() => import("./Screens/Manage/Payments/Payments"));
const ManageClientInfo = React.lazy(() =>
  import("./Screens/Manage/ManageClientInfo/ManageClientInfo")
);
const ManageClientProperty = React.lazy(() =>
  import("./Screens/Manage/ManageClientProperty/ManageClientProperty")
);
const ManageClientReceipt = React.lazy(() =>
  import("./Screens/Manage/ManageClientReceipt/ManageClientReceipt")
);
const ManageLLAgreement = React.lazy(() =>
  import("./Screens/Manage/ManageLLAgreement/ManageLLAgreement")
);
const ManagePmaArgreement = React.lazy(() =>
  import("./Screens/Manage/ManagePmaAgreement/ManagePmaAgreement copy")
);
const ManageOrderReceipt = React.lazy(() =>
  import("./Screens/Manage/ManageOrderReceipt/ManageOrderReceipt")
);
const ManageClientInvoice = React.lazy(() =>
  import("./Screens/Manage/ManageClientInvoice/ManageClientInvoice")
);
const ManageVendor = React.lazy(() =>
  import("./Screens/Manage/ManageVendor/ManagerVendor")
);
const ManageVendorInvoice = React.lazy(() =>
  import("./Screens/Manage/ManageVendorInvoice/ManageVendorInvoice")
);
const ManageVendorPayment = React.lazy(() =>
  import("./Screens/Manage/ManageVendorPayment/ManageVendorPayment")
);
const LOB = React.lazy(() => import("./Screens/Admin/LOB"));
const Service = React.lazy(() => import("./Screens/Admin/Service"));
const ResearchAgent = React.lazy(() =>
  import("./Screens/Research/Agent/index.jsx")
);
const ManageBankStatement = React.lazy(() =>
  import("./Screens/Manage/ManageBankStatement/ManageBankStatement")
);
const ManageBuilderProject = React.lazy(() =>
  import(
    "./Screens/Manage/ManageBuilder/ManageBuilderProject/ManageBuilderProject"
  )
);
const ManageBuilderContact = React.lazy(() =>
  import("./Screens/Manage/ManageBuilder/ManageBuilderContact/index.jsx")
);
const PmaBilling = React.lazy(() => import("./Screens/Manage/pma"));
const OrderPaymentList = React.lazy(() =>
  import("./Screens/Reports/OrderPaymentList")
);
const OrderReceiptList = React.lazy(() =>
  import("./Screens/Reports/OrderReceiptList")
);
const OrderInvoiceList = React.lazy(() =>
  import("./Screens/Reports/OrderInvoiceList")
);
const LobReceiptPayments = React.lazy(() =>
  import("./Screens/Reports/LobReceiptPayments")
);
const EntityReceiptPayments = React.lazy(() =>
  import("./Screens/Reports/EntityReceiptPayments")
);
const LobReceiptPaymentsConsolidated = React.lazy(() =>
  import("./Screens/Reports/LobReceiptPaymentsConsolidated")
);
const DeleteById = React.lazy(() =>
  import("./Screens/Admin/DeleteById/DeleteById")
);
const SendClientStatement = React.lazy(() =>
  import("./Screens/Manage/SendClientStatement")
);
const ClientReceiptList = React.lazy(() =>
  import("./Screens/Reports/ClientReceiptList")
);
const VendorInvoiceList = React.lazy(() =>
  import("./Screens/Reports/VendorInvoiceList")
);
const DeletePage = React.lazy(() =>
  import("./Screens/Admin/DeleteById/DeletePage")
);
const PmaBillingTrendView = React.lazy(() =>
  import("./Screens/Reports/reportPmaBillingTrendView")
);
const PmaClientReport = React.lazy(() =>
  import("./Screens/Reports/pmaClientReport")
);
const PmaInvoiceList = React.lazy(() =>
  import("./Screens/Reports/PmaInvoiceList")
);
const PmaClientReceivable = React.lazy(() =>
  import("./Screens/Reports/PmaClientReceivables/index.jsx")
);
const ActivePmaAgreement = React.lazy(() =>
  import("./Screens/Reports/ActivePmaAgreement")
);
const ProjectContact = React.lazy(() =>
  import("./Screens/Reports/ProjectContacts")
);
const AdvanceHoldingAmount = React.lazy(() =>
  import("./Screens/Reports/AdvanceHoldingAmount")
);
const PmaClientStatementAll = React.lazy(() =>
  import("./Screens/Reports/PMAClientStatementAll")
);
const ShowAllOdersInformation = React.lazy(() =>
  import("./Screens/Manage/ManageOrder/ShowAllOrdersInformation/index.jsx")
);
const PmaClientStatement = React.lazy(() =>
  import("./Screens/Reports/PmaClientStatement")
);
const NonPmaClientStatement = React.lazy(() =>
  import("./Screens/Reports/NonPmaClientStatement")
);
const NonPmaClientReceivables = React.lazy(() =>
  import("./Screens/Reports/NonPmaClientReceivables")
);
const ClientStatementAll = React.lazy(() =>
  import("./Screens/Reports/ClientStatement-CI,CRAndOR")
);
const DuplicateClientReport = React.lazy(() =>
  import("./Screens/Reports/DupilcateClientsReport")
);
const ClientBankDetails = React.lazy(() =>
  import("./Screens/Reports/ClientBankDetails")
);
const MonthlyBankSummary = React.lazy(() =>
  import("./Screens/Reports/MonthlyBankSummary")
);
const BankTransferReconciliation = React.lazy(() =>
  import("./Screens/Reports/BankTransferReconciliation")
);
const ClientOrderReceiptMismatchDetails = React.lazy(() =>
  import("./Screens/Reports/ClientOrderReceiptMismatchDetails")
);
const BankReceiptReconciliation = React.lazy(() =>
  import("./Screens/Reports/BankReceiptsReconciliation")
);
const BankPaymentReconciliation = React.lazy(() =>
  import("./Screens/Reports/BankPaymentReconciliation")
);
const PrivateLayout = React.lazy(() => import("./layout/Privatelayout"));
const PropectusPage = React.lazy(() => import("./Screens/Research/Prospect"));
const ClientTraceReport = React.lazy(() =>
  import("./Screens/Reports/ReportTrace/ClientTraceReport")
);
const OrderTraceReport = React.lazy(() =>
  import("./Screens/Reports/ReportTrace/OrderTraceReport/index.jsx")
);
const VendorTraceReport = React.lazy(() =>
  import("./Screens/Reports/ReportTrace/VendorTraceReport/index.jsx")
);
const UnAuthorized = React.lazy(() =>
  import("./Screens/UnAuthorized/UnAuthorized.jsx")
);
const ClientReceiptView = React.lazy(() =>
  import("./Screens/Reports/TallyReports/ClientReceipt/index.jsx")
);
const OrderPaymentDDView = React.lazy(() =>
  import("./Screens/Reports/TallyReports/OrderPaymentDD/index.jsx")
);
const OrderPaymentB2CView = React.lazy(() =>
  import("./Screens/Reports/TallyReports/OrderPaymentB2C/index.jsx")
);
const OrderPaymentB2BView = React.lazy(() =>
  import("./Screens/Reports/TallyReports/OrderPaymentB2B/index.jsx")
);
const OrderPaymentWithTdsView = React.lazy(() =>
  import("./Screens/Reports/TallyReports/OrderPaymentWithTds/index.jsx")
);
const OrderPaymentWithoutTdsView = React.lazy(() =>
  import("./Screens/Reports/TallyReports/OrderPaymentWithoutTds/index.jsx")
);
const OrderReceiptToInvoiceServiceTax = React.lazy(() =>
  import("./Screens/Reports/TallyReports/OrderReceiptToServiceTax/index.jsx")
);
const ClientStatistics = React.lazy(() =>
  import("./Screens/Reports/Statistics/ClientStatisticsReport/index.jsx")
);
const ResearchEmployer = React.lazy(() =>
  import("./Screens/Research/Employer/index.jsx")
);
const ResearchGovernmentDepartment = React.lazy(() =>
  import("./Screens/Research/Government Department/index.jsx")
);
const ResearchOwner = React.lazy(() =>
  import("./Screens/Research/Owner/index.jsx")
);
const ResearchFriends = React.lazy(() =>
  import("./Screens/Research/Friends/index.jsx")
);
const ResearchBanks = React.lazy(() =>
  import("./Screens/Research/Banks/index.jsx")
);
const ResearchBusinessGroup = React.lazy(() =>
  import("./Screens/Research/COC/index.jsx")
);
const ResearchProfessionals = React.lazy(() =>
  import("./Screens/Research/Professionals/index.jsx")
);
const ResearchMandals = React.lazy(() =>
  import("./Screens/Research/Mandals/index.jsx")
);
const ResearchArchitect = React.lazy(() =>
  import("./Screens/Research/Architect/index.jsx")
);
const ResearchEducational = React.lazy(() =>
  import("./Screens/Research/Educational/index.jsx")
);
const ResearchServiceApartments = React.lazy(() =>
  import("./Screens/Research/ServiceApartment/index.jsx")
);
const VendorStatementView = React.lazy(() =>
  import("./Screens/Reports/VendorReport/VendorStatement/index.jsx")
);
const TdsPaidToGovernement = React.lazy(() =>
  import("./Screens/Reports/VendorReport/TdsPaidToGovernment/index.jsx")
);
const TdsPaidByVendorView = React.lazy(() =>
  import("./Screens/Reports/VendorReport/TDSPaidByvendor/index.jsx")
);
const VendorPaymentPeriodView = React.lazy(() =>
  import("./Screens/Reports/VendorReport/VendorPaymentPeriod/index.jsx")
);
const StatisticsReport = React.lazy(() =>
  import("./Screens/Reports/Statistics/StatisticsReport/index.jsx")
);
const ServiceTaxPaidByVendor = React.lazy(() =>
  import("./Screens/Reports/Statistics/ServiceTaxPaidByVendor/index.jsx")
);
const TenantEmail = React.lazy(() =>
  import("./Screens/Reports/Contacts/TenantEmail/index.jsx")
);
const ResetPassword = React.lazy(() =>
  import("./Screens/Login/ResetPassword.jsx")
);
const RequestResetPassword = React.lazy(() =>
  import("./Screens/Login/RequestResetPassword.jsx")
);
const OwnerMailId = React.lazy(() =>
  import("./Screens/Reports/Contacts/OwnerMailId/index.jsx")
);
const ClientContactDetails = React.lazy(() =>
  import("./Screens/Reports/Contacts/ClientContactsDetails/index.jsx")
);
const OrderStaticsView = React.lazy(() =>
  import("./Screens/Reports/Statistics/OrderStatisticsReport/index.jsx")
);
const ActiveLLAgreementView = React.lazy(() =>
  import("./Screens/Reports/ActiveLlAgreement/index.jsx")
);
const OrderAnalysis = React.lazy(() =>
  import("./Screens/Reports/OrderAnalysis/index.jsx")
);
const LLlistReport = React.lazy(() =>
  import("./Screens/Reports/LLlist/index.jsx")
);
const ClientStatementByDate = React.lazy(() =>
  import("./Screens/Reports/ClientStatementByDate/index.jsx")
);
const PaymentUnderSuspenseOrder = React.lazy(() =>
  import("./Screens/Reports/Group12/PaymentUnderSuspenseOrder/index.jsx")
);
const ReceiptsUnderSuspenseOrder = React.lazy(() =>
  import("./Screens/Reports/Group12/ReceiptsUnderSuspenseOrder/index.jsx")
);
const ClientsWithOrderButNoEmail = React.lazy(() =>
  import("./Screens/Reports/Group12/ClientsWithOrderButNoEmail/index.jsx")
);
const EmployeeWithoutVendor = React.lazy(() =>
  import("./Screens/Reports/Group12/EmployeeWithoutVendor/index.jsx")
);
const BankTransactionsWithWrongUserName = React.lazy(() =>
  import(
    "./Screens/Reports/Group12/BankTransactionsWithWrongUserName/index.jsx"
  )
);
const EntityBlankReport = React.lazy(() =>
  import("./Screens/Reports/Group12/EntityBlankReport/index.jsx")
);
const OwnerWithNoProperty = React.lazy(() =>
  import("./Screens/Reports/Group12/OwnerWIthNoProperty/index.jsx")
);
const PropertyWithNoProjectView = React.lazy(() =>
  import("./Screens/Reports/Group12/PropertyWithNoProject/index.jsx")
);
const ServiceTaxReport = React.lazy(() =>
  import("./Screens/Reports/Group12/ServiceTaxReport/index.jsx")
);
const VendorSummary = React.lazy(() =>
  import("./Screens/Reports/VendorReport/vendorSummary/index.jsx")
);
const ClientPhoneNo = React.lazy(() =>
  import("./Screens/Reports/Group13/ClientWithPhoneNo/index.jsx")
);
const OwnerPhoneNo = React.lazy(() =>
  import("./Screens/Reports/Group13/OwnerWithPhoneNo/index.jsx")
);
const BankBalanceReconcilation = React.lazy(() =>
  import("./Screens/Reports/BankBalanceReconcilation/index.jsx")
);
const AgedOrders = React.lazy(() =>
  import("./Screens/Reports/AgedOrders/index.jsx")
);
const UpdateCompanyKey = React.lazy(() =>
  import("./Screens/Admin/UpdateCompanyKey/index.jsx")
);
const ChangePassword = React.lazy(() =>
  import("./Screens/Login/ChangePassword.jsx")
);
const Dashboard = React.lazy(() => import("./Screens/Dashboard/Dashboard"));

const App = () => {
  const { isInitialized, accessToken } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  React.useEffect(() => {
    if (accessToken) {  
      setAccessToken(accessToken);
    }
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
            <Route path="/unauthorized" element={<UnAuthorized />} />
            <Route
              path="/reset/:token"
              element={
                <Suspense fallback={<LoadingBackdrop />}>
                  <ResetPassword />
                </Suspense>
              }
            />
            <Route path="/reset" element={<Suspense fallback={<LoadingBackdrop />}> 
             <RequestResetPassword />
            </Suspense>} />

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
                  <Suspense fallback={<LoadingBackdrop />}>
                    <Dashboard />
                  </Suspense>
                }
              />
              <Route
                path="/changepassword"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ChangePassword />
                  </Suspense>
                }
              />
              <Route
                path="/admin/manageuser"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ManageUser />
                  </Suspense>
                }
              />
              <Route
                path="/admin/updatecompanykey"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <UpdateCompanyKey />
                  </Suspense>
                }
              />
              <Route
                path="/admin/manageemployees"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ManageEmployees />
                  </Suspense>
                }
              />
              <Route
                path="/manage/managebuilder"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ManageBuilder />
                  </Suspense>
                }
              />
              <Route
                path="/manage/manageprojectinfo"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ManageProjectInfo />
                  </Suspense>
                }
              />
              <Route
                path="/manage/managebuilder/manageproject/:builderid"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ManageProjectInfo key="hyperlinked" />
                  </Suspense>
                }
              />
              <Route
                path="/admin/deleteById"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <DeleteById />
                  </Suspense>
                }
              />
              <Route
                path="/admin/deleteById/:pagename"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <DeletePage />
                  </Suspense>
                }
              />
              <Route
                path="/manage/manageOrder"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ManageOrder />
                  </Suspense>
                }
              />
              <Route
                path="/admin/manageuser"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ManageUser />
                  </Suspense>
                }
              />
              <Route
                path="/admin/country"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <Country />
                  </Suspense>
                }
              />
              <Route
                path="/admin/city"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <City />
                  </Suspense>
                }
              />
              <Route
                path="/admin/locality"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <Locality />
                  </Suspense>
                }
              />
              <Route
                path="/admin/LOB"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <LOB />
                  </Suspense>
                }
              />
              <Route
                path="/admin/service"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <Service />
                  </Suspense>
                }
              />
              <Route
                path="/admin/payments"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <Payments />
                  </Suspense>
                }
              />
              <Route
                path="/research/prospect"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <PropectusPage />
                  </Suspense>
                }
              />
              <Route
                path="/research/employer"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ResearchEmployer />
                  </Suspense>
                }
              />
              <Route
                path="/research/owner"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ResearchOwner />
                  </Suspense>
                }
              />
              <Route
                path="/research/educational"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ResearchEducational />
                  </Suspense>
                }
              />
              <Route
                path="/research/architect"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ResearchArchitect />
                  </Suspense>
                }
              />
              <Route
                path="/research/mandals"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ResearchMandals />
                  </Suspense>
                }
              />
              <Route
                path="/research/professionals"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ResearchProfessionals />
                  </Suspense>
                }
              />
              <Route
                path="/research/businessgroup"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ResearchBusinessGroup />
                  </Suspense>
                }
              />
              <Route
                path="/research/banks"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ResearchBanks />
                  </Suspense>
                }
              />
              <Route
                path="/research/friends"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ResearchFriends />
                  </Suspense>
                }
              />
              <Route
                path="/research/serviceapartment"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ResearchServiceApartments />
                  </Suspense>
                }
              />
              <Route
                path="/research/agent"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ResearchAgent />
                  </Suspense>
                }
              />
              <Route
                path="/research/governmentdepartment"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ResearchGovernmentDepartment />
                  </Suspense>
                }
              />
              <Route
                path="/manage/bankstatement"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ManageBankStatement />
                  </Suspense>
                }
              />
              <Route
                path="/manage/manageclientinfo"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ManageClientInfo />
                  </Suspense>
                }
              />
              <Route
                path="/manage/manageclientproperty"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ManageClientProperty />
                  </Suspense>
                }
              />
              <Route
                path="/manage/manageclientreceipt"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ManageClientReceipt />
                  </Suspense>
                }
              />
              <Route
                path="/manage/managellagreement"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ManageLLAgreement />
                  </Suspense>
                }
              />
              <Route
                path="/manage/managepmaagreement"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ManagePmaArgreement />
                  </Suspense>
                }
              />
              <Route
                path="/manage/manageorderreceipt"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ManageOrderReceipt />
                  </Suspense>
                }
              />
              <Route
                path="/manage/manageclientinvoice"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ManageClientInvoice />
                  </Suspense>
                }
              />
              <Route
                path="/manage/managevendor"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ManageVendor />
                  </Suspense>
                }
              />
              <Route
                path="/manage/managevendorinvoice"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ManageVendorInvoice />
                  </Suspense>
                }
              />
              <Route
                path="/manage/managevendorpayment"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ManageVendorPayment />
                  </Suspense>
                }
              />
              <Route
                path="/manage/sendclientstatement"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <SendClientStatement />
                  </Suspense>
                }
              />
              <Route
                path="manage/managebuilder/projects/:buildername"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ManageBuilderProject />
                  </Suspense>
                }
              />
              <Route
                path="/manage/managebuilder/contacts/:builderid"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ManageBuilderContact />
                  </Suspense>
                }
              />
              <Route
                path="/manage/managevendorpayment/:orderid"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ManageVendorPayment key="hyperlinked" />
                  </Suspense>
                }
              />
              <Route
                path="/manage/manageclientinvoice/:orderid"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ManageClientInvoice key="hyperlinked" />
                  </Suspense>
                }
              />
              <Route
                path="/manage/manageorderreceipt/:orderid"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ManageOrderReceipt key="hyperlinked" />
                  </Suspense>
                }
              />
              <Route
                path="/manage/manageclientinfo/orders/showall/:orderid"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ShowAllOdersInformation />
                  </Suspense>
                }
              />
              <Route
                path="/manage/manageclientinfo/properties/:clientid"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ManageClientProperty key="hyperlinked" />
                  </Suspense>
                }
              />
              <Route
                path="/manage/manageclientinfo/orders/:clientid"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ManageOrder key="hyperlinked" />
                  </Suspense>
                }
              />
              <Route
                path="/manage/manageclientproperty/pmaagreement/:clientPropertyId"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ManagePmaArgreement key="hyperlinked" />
                  </Suspense>
                }
              />
              <Route
                path="/manage/manageclientproperty/llagreement/:clientPropertyId"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ManageLLAgreement key="hyperlinked" />
                  </Suspense>
                }
              />
              <Route
                path="/manage/pmaBilling"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <PmaBilling />
                  </Suspense>
                }
              />
              <Route
                path="/reports/orderPaymentList"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <OrderPaymentList />
                  </Suspense>
                }
              />
              <Route
                path="/reports/orderReceiptList"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <OrderReceiptList />
                  </Suspense>
                }
              />
              <Route
                path="/reports/orderInvoiceList"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <OrderInvoiceList />
                  </Suspense>
                }
              />
              <Route
                path="/reports/clientReceiptList"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ClientReceiptList />
                  </Suspense>
                }
              />
              <Route
                path="/reports/vendorPaymentsList"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <VendorInvoiceList />
                  </Suspense>
                }
              />
              <Route
                path="/admin/lobReceiptPayments"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <LobReceiptPayments />
                  </Suspense>
                }
              />
              <Route
                path="/admin/entityReceiptPayments"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <EntityReceiptPayments />
                  </Suspense>
                }
              />
              <Route
                path="/admin/lobReceiptPaymentsConsolidated"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <LobReceiptPaymentsConsolidated />
                  </Suspense>
                }
              />
              <Route
                path="/reports/pmaBillingTrendView"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <PmaBillingTrendView />
                  </Suspense>
                }
              />
              <Route
                path="/reports/pmaClientReport"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <PmaClientReport />
                  </Suspense>
                }
              />
              <Route
                path="/reports/pmaInvoiceList"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <PmaInvoiceList />
                  </Suspense>
                }
              />
              <Route
                path="/reports/pmaClientReceivable"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <PmaClientReceivable />
                  </Suspense>
                }
              />
              <Route
                path="/reports/activePmaAgreement"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ActivePmaAgreement />
                  </Suspense>
                }
              />
              <Route
                path="/reports/projectContact"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ProjectContact />
                  </Suspense>
                }
              />
              <Route
                path="/reports/advanceHoldingAmount"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <AdvanceHoldingAmount />
                  </Suspense>
                }
              />
              <Route
                path="/reports/pmaClientStatementAll"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <PmaClientStatementAll />
                  </Suspense>
                }
              />
              <Route
                path="/reports/pmaClientStatement"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <PmaClientStatement />
                  </Suspense>
                }
              />
              <Route
                path="/reports/nonPmaClientStatement"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <NonPmaClientStatement />
                  </Suspense>
                }
              />
              <Route
                path="/reports/nonPmaClientReceivables"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <NonPmaClientReceivables />
                  </Suspense>
                }
              />
              <Route
                path="/reports/clientStatementAll"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ClientStatementAll />
                  </Suspense>
                }
              />
              <Route
                path="/reports/duplicateClientReport"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <DuplicateClientReport />
                  </Suspense>
                }
              />
              <Route
                path="/reports/clientBankDetails"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ClientBankDetails />
                  </Suspense>
                }
              />
              <Route
                path="/reports/monthlyBankSummary"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <MonthlyBankSummary />
                  </Suspense>
                }
              />
              <Route
                path="/reports/bankTransferReconciliation"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <BankTransferReconciliation />
                  </Suspense>
                }
              />
              <Route
                path="/reports/clientOrderReceiptMismatchDetails"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ClientOrderReceiptMismatchDetails />
                  </Suspense>
                }
              />
              <Route
                path="/reports/bankReceiptReconciliation"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <BankReceiptReconciliation />
                  </Suspense>
                }
              />
              <Route
                path="/reports/bankPaymentsReconciliation"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <BankPaymentReconciliation />
                  </Suspense>
                }
              />
              <Route
                path="/reports/clientTraceReport"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ClientTraceReport />
                  </Suspense>
                }
              />
              <Route
                path="/reports/orderTraceReport"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <OrderTraceReport />
                  </Suspense>
                }
              />
              <Route
                path="/reports/vendorTraceReport"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <VendorTraceReport />
                  </Suspense>
                }
              />
              <Route
                path="/reports/clientReceipt"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ClientReceiptView />
                  </Suspense>
                }
              />
              <Route
                path="/reports/orderpaymentDD"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <OrderPaymentDDView />
                  </Suspense>
                }
              />
              <Route
                path="/reports/orderpaymentbanktocash"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <OrderPaymentB2CView />
                  </Suspense>
                }
              />
              <Route
                path="reports/orderpaymentbanktobank"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <OrderPaymentB2BView />
                  </Suspense>
                }
              />
              <Route
                path="reports/orderpaymentwithtds"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <OrderPaymentWithTdsView />
                  </Suspense>
                }
              />
              <Route
                path="reports/orderpaymentwithouttds"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <OrderPaymentWithoutTdsView />
                  </Suspense>
                }
              />
              <Route
                path="reports/orderreceipttoinvoiceTax"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <OrderReceiptToInvoiceServiceTax />
                  </Suspense>
                }
              />
              <Route
                path="reports/tdspaidbyvendor"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <TdsPaidByVendorView />
                  </Suspense>
                }
              />
              <Route
                path="reports/vendorstatement"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <VendorStatementView />
                  </Suspense>
                }
              />
              <Route
                path="reports/tdsPaidToGovernment"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <TdsPaidToGovernement />
                  </Suspense>
                }
              />
              <Route
                path="reports/vendorpaymentsummary"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <VendorPaymentPeriodView />
                  </Suspense>
                }
              />
              <Route
                path="reports/clientStatistics"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ClientStatistics />
                  </Suspense>
                }
              />
              <Route
                path="reports/statisticsReport"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <StatisticsReport />
                  </Suspense>
                }
              />
              <Route
                path="reports/serviceTaxPaidByVendor"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ServiceTaxPaidByVendor />
                  </Suspense>
                }
              />
              <Route
                path="admin/tenantEmail"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <TenantEmail />
                  </Suspense>
                }
              />
              <Route
                path="admin/ownerMailId"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <OwnerMailId />
                  </Suspense>
                }
              />
              <Route
                path="admin/clientContactDetails"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ClientContactDetails />
                  </Suspense>
                }
              />
              <Route
                path="/reports/orderStaticsView"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <OrderStaticsView />
                  </Suspense>
                }
              />
              <Route
                path="/reports/activellagreement"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ActiveLLAgreementView />
                  </Suspense>
                }
              />
              <Route
                path="/reports/orderanalysis"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <OrderAnalysis />
                  </Suspense>
                }
              />
              <Route
                path="/reports/Lllist"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <LLlistReport />
                  </Suspense>
                }
              />
              <Route
                path="/reports/clientstatics"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ClientStatistics />
                  </Suspense>
                }
              />
              <Route
                path="/reports/clientStatementByDate"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ClientStatementByDate />
                  </Suspense>
                }
              />
              <Route
                path="/reports/paymentUnderSuspenseOrder"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <PaymentUnderSuspenseOrder />
                  </Suspense>
                }
              />
              <Route
                path="/reports/receiptsUnderSuspenseOrder"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ReceiptsUnderSuspenseOrder />
                  </Suspense>
                }
              />
              <Route
                path="/reports/clientsWithOrderButNoEmail"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ClientsWithOrderButNoEmail />
                  </Suspense>
                }
              />
              <Route
                path="/reports/employeeWithoutVendor"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <EmployeeWithoutVendor />
                  </Suspense>
                }
              />
              <Route
                path="/reports/bankTransactionsWithWrongUserName"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <BankTransactionsWithWrongUserName />
                  </Suspense>
                }
              />
              <Route
                path="/reports/entityBlankReport"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <EntityBlankReport />
                  </Suspense>
                }
              />
              <Route
                path="/reports/ownerwithnoproperty"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <OwnerWithNoProperty />
                  </Suspense>
                }
              />
              <Route
                path="/reports/propertywithnoproject"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <PropertyWithNoProjectView />
                  </Suspense>
                }
              />
              <Route
                path="/reports/serviceTaxReport"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ServiceTaxReport />
                  </Suspense>
                }
              />
              <Route
                path="/reports/vendorSummary"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <VendorSummary />
                  </Suspense>
                }
              />
              <Route
                path="/admin/clientphoneno"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <ClientPhoneNo />
                  </Suspense>
                }
              />
              <Route
                path="/admin/ownerphoneno"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <OwnerPhoneNo />
                  </Suspense>
                }
              />
              <Route
                path="/reports/bankbalancereconciliation"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <BankBalanceReconcilation />
                  </Suspense>
                }
              />
              <Route
                path="/reports/agedOrders"
                element={
                  <Suspense fallback={<LoadingBackdrop />}>
                    <AgedOrders />
                  </Suspense>
                }
              />
            </Route>
            <Route
              path="/*"
              element={
                <Suspense fallback={<LoadingBackdrop />}>
                  <NotFound />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      ) : (
        <LoadingBackdrop />
      )}
    </div>
  );
};

export default App;
