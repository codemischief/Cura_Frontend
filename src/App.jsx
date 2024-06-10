import Login from "./Screens/Login/Login";
import Dashboard from "./Screens/Dashboard/Dashboard";
import NotFound from "./Screens/NotFound/notFound";
import Country from "./Screens/Admin/Country";
import City from "./Screens/Admin/City";
import Locality from "./Screens/Admin/Locality";
import State from "./Screens/Admin/State";
import ManageUser from "./Screens/Manage/ManageUser/ManageUser";
import ManageProjectInfo from "./Screens/Manage/ManageProjectInfo/ManageProjectInfo";
import ManageOrder from "./Screens/Manage/ManageOrder/ManageOrder";
import ManageEmployees from "./Screens/Manage/ManageEmployee/ManageEmployees";
import ManageBuilder from "./Screens/Manage/ManageBuilder/ManageBuilder";
import Owner from "./Screens/Research/Owner/Owner";
import Educational from "./Screens/Research/Educational/Educational";
import Architect from "./Screens/Research/Architect/Architect";
import Mandals from "./Screens/Research/Mandals/Mandals";
import Professionals from "./Screens/Research/Professionals/Professionals";
import COC from "./Screens/Research/COC/COC";
import Banks from "./Screens/Research/Banks/Banks";
import Friends from "./Screens/Research/Friends/Friends";
import Payments from "./Screens/Manage/Payments/Payments";
import ManageClientInfo from "./Screens/Manage/ManageClientInfo/ManageClientInfo";
import ManageClientProperty from "./Screens/Manage/ManageClientProperty/ManageClientProperty";
import ManageClientReceipt from "./Screens/Manage/ManageClientReceipt/ManageClientReceipt";
import ManageLLAgreement from "./Screens/Manage/ManageLLAgreement/ManageLLAgreement";
import ManagePmaArgreement from "./Screens/Manage/ManagePmaAgreement/ManagePmaAgreement copy";
import ManageOrderReceipt from "./Screens/Manage/ManageOrderReceipt/ManageOrderReceipt";
import ManageClientInvoice from "./Screens/Manage/ManageClientInvoice/ManageClientInvoice";
import ManageVendor from "./Screens/Manage/ManageVendor/ManagerVendor";
import ManageVendorInvoice from "./Screens/Manage/ManageVendorInvoice/ManageVendorInvoice";
import ManageVendorPayment from "./Screens/Manage/ManageVendorPayment/ManageVendorPayment";

import { Route, Routes, Outlet } from "react-router-dom";
import Userscreen from "./Screens/UserScreens/Userscreen";
import LOB from "./Screens/Admin/LOB";
import Service from "./Screens/Admin/Service";
import ResearchAgent from "./Screens/Research/Agent/index.jsx";
// import Agent from "./Screens/Research/Agent/Agent";
// import Employer from "./Screens/Research/Employer/Employer";
import GovernmentDepartment from "./Screens/Research/Government Department/GovernmentDepartment";
import ManageBankStatement from "./Screens/Manage/ManageBankStatement/ManageBankStatement";
import ManageBuilderProject from "./Screens/Manage/ManageBuilder/ManageBuilderProject/ManageBuilderProject";
import ManageBuilderContact from "./Screens/Manage/ManageBuilder/ManageBuilderContact/ManageBuilderContact";
import Temp from "./Screens/Admin/temp";
import ManageClientPropertyByClientName from "./Screens/Manage/ManageClientInfo/ManageClientProperties/ManageClientPropertyByClientName";
import ClientPmaArgreement from "./Screens/Manage/ManageClientProperty/ClientPmaAgreement/ClientPmaAgreement";
import ClientLLAgreement from "./Screens/Manage/ManageClientProperty/ClientLLAgreement/ClientLLAgreement copy";
import PmaBilling from "./Screens/Manage/pma";
import OrderPaymentList from "./Screens/Reports/OrderPaymentList";
import OrderReceiptList from "./Screens/Reports/OrderReceiptList";
import OrderInvoiceList from "./Screens/Reports/OrderInvoiceList";
import LobReceiptPayments from "./Screens/Reports/LobReceiptPayments";
import EntityReceiptPayments from "./Screens/Reports/EntityReceiptPayments";
import LobReceiptPaymentsConsolidated from "./Screens/Reports/LobReceiptPaymentsConsolidated";

import DeleteById from "./Screens/Admin/DeleteById/DeleteById";
import SendClientStatement from "./Screens/Manage/SendClientStatement";

import ClientReceiptList from "./Screens/Reports/ClientReceiptList";
import VendorInvoiceList from "./Screens/Reports/VendorInvoiceList";
import DeletePage from "./Screens/Admin/DeleteById/DeletePage";
import PmaBillingTrendView from "./Screens/Reports/reportPmaBillingTrendView";
// import PmaClientReport from "./Redux/slice/reporting/pmaClientReport";
import PmaClientReport from "./Screens/Reports/pmaClientReport";
import PmaInvoiceList from "./Screens/Reports/PmaInvoiceList";
import PmaClientReceivable from "./Screens/Reports/PmaClientReceivables/index.jsx";
import ActivePmaAgreement from "./Screens/Reports/ActivePmaAgreement";
import ProjectContact from "./Screens/Reports/ProjectContacts";
import AdvanceHoldingAmount from "./Screens/Reports/AdvanceHoldingAmount";
import PmaClientStatementAll from "./Screens/Reports/PMAClientStatementAll";

import ShowAllOdersInformation from "./Screens/Manage/ManageOrder/ShowAllOrdersInformation/index.jsx";

import PmaClientStatement from "./Screens/Reports/PmaClientStatement";
import NonPmaClientStatement from "./Screens/Reports/NonPmaClientStatement";
import NonPmaClientReceivables from "./Screens/Reports/NonPmaClientReceivables";
import ClientStatementAll from "./Screens/Reports/ClientStatement-CI,CRAndOR";
import DuplicateClientReport from "./Screens/Reports/DupilcateClientsReport";
import ClientBankDetails from "./Screens/Reports/ClientBankDetails";
import MonthlyBankSummary from "./Screens/Reports/MonthlyBankSummary";
import BankTransferReconciliation from "./Screens/Reports/BankTransferReconciliation";
import ClientOrderReceiptMismatchDetails from "./Screens/Reports/ClientOrderReceiptMismatchDetails";
import BankReceiptReconciliation from "./Screens/Reports/BankReceiptsReconciliation";
import BankPaymentReconciliation from "./Screens/Reports/BankPaymentReconciliation";
import PrivateLayout from "./layout/Privatelayout";
import AuthGuard from "./context/AuthGuard";
import useAuth from "./context/JwtContext";
import PropectusPage from "./Screens/Research/Prospect";
import ClientTraceReport from "./Screens/Reports/ReportTrace/ClientTraceReport";
import OrderTraceReport from "./Screens/Reports/ReportTrace/OrderTraceReport/index.jsx";
import VendorTraceReport from "./Screens/Reports/ReportTrace/VendorTraceReport/index.jsx";
import { CircularProgress } from "@mui/material";
import UnAuthorized from "./Screens/UnAuthorized/UnAuthorized.jsx";
import ClientReceiptView from "./Screens/Reports/TallyReports/ClientReceipt/index.jsx";
import OrderPaymentDDView from "./Screens/Reports/TallyReports/OrderPaymentDD/index.jsx";
import OrderPaymentB2CView from "./Screens/Reports/TallyReports/OrderPaymentB2C/index.jsx";
import OrderPaymentB2BView from "./Screens/Reports/TallyReports/OrderPaymentB2B/index.jsx";
import OrderPaymentWithTdsView from "./Screens/Reports/TallyReports/OrderPaymentWithTds/index.jsx";
import OrderPaymentWithoutTdsView from "./Screens/Reports/TallyReports/OrderPaymentWithoutTds/index.jsx";
import OrderReceiptToInvoiceServiceTax from "./Screens/Reports/TallyReports/OrderReceiptToServiceTax/index.jsx";
import ClientStatistics from "./Screens/Reports/Statistics/ClientStatisticsReport/index.jsx";
import ResearchEmployer from "./Screens/Research/Employer/index.jsx";
import ResearchGovernmentDepartment from "./Screens/Research/Government Department/index.jsx";

import ResearchOwner from "./Screens/Research/Owner/index.jsx";
import ResearchFriends from "./Screens/Research/Friends/index.jsx";
import ResearchBanks from "./Screens/Research/Banks/index.jsx";
import ResearchBusinessGroup from "./Screens/Research/COC/index.jsx";
import ResearchProfessionals from "./Screens/Research/Professionals/index.jsx";
import ResearchMandals from "./Screens/Research/Mandals/index.jsx";
import ResearchArchitect from "./Screens/Research/Architect/index.jsx";
import ResearchEducational from "./Screens/Research/Educational/index.jsx";
import ResearchServiceApartments from "./Screens/Research/ServiceApartment/index.jsx";

import VendorStatementView from "./Screens/Reports/VendorReport/VendorStatement/index.jsx";
import TdsPaidToGovernement from "./Screens/Reports/VendorReport/TdsPaidToGovernment/index.jsx";
import TdsPaidByVendorView from "./Screens/Reports/VendorReport/TDSPaidByvendor/index.jsx";
import VendorPaymentPeriodView from "./Screens/Reports/VendorReport/VendorPaymentPeriod/index.jsx";
import StatisticsReport from "./Screens/Reports/Statistics/StatisticsReport/index.jsx";
import ServiceTaxPaidByVendor from "./Screens/Reports/Statistics/ServiceTaxPaidByVendor/index.jsx";
import TenantEmail from "./Screens/Reports/Contacts/TenantEmail/index.jsx";
import ResetPassword from "./Screens/Login/ResetPassword.jsx";
import RequestResetPassword from "./Screens/Login/RequestResetPassword.jsx";
import OwnerMailId from "./Screens/Reports/Contacts/OwnerMailId/index.jsx";
import ClientContactDetails from "./Screens/Reports/Contacts/ClientContactsDetails/index.jsx";
import OrderStaticsView from "./Screens/Reports/Statistics/OrderStatisticsReport/index.jsx";
import ActiveLLAgreementView from "./Screens/Reports/ActiveLlAgreement/index.jsx";
import OrderAnalysis from "./Screens/Reports/OrderAnalysis/index.jsx";
import LLlistReport from "./Screens/Reports/LLlist/index.jsx";
import ClientStatementByDate from "./Screens/Reports/ClientStatementByDate/index.jsx";

const App = () => {
  const { isInitialized } = useAuth();
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
            <Route path="/user" element={<Userscreen />} />
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
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin/manageuser" element={<ManageUser />} />
              <Route
                path="/admin/manageemployees"
                element={<ManageEmployees />}
              />
              <Route path="/manage/managebuilder" element={<ManageBuilder />} />
              <Route
                path="/manage/manageprojectinfo"
                element={<ManageProjectInfo />}
              />
              <Route path="/admin/deleteById" element={<DeleteById />} />
              <Route
                path="/admin/deleteById/:pagename"
                element={<DeletePage />}
              />
              <Route path="/manage/manageOrder" element={<ManageOrder />} />
              <Route path="/admin/manageuser" element={<ManageUser />} />
              <Route path="/admin/country" element={<Country />} />
              <Route path="/admin/state" element={<State />} />
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
                path="manage/managebuilder/projects/:buildername"
                element={<ManageBuilderProject />}
              />
              <Route
                path="/manage/managebuilder/contacts/:buildername"
                element={<ManageBuilderContact />}
              />

              <Route
                path="/manage/managevendorpayment/:orderid"
                element={<ManageVendorPayment />}
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
                path="/manage/manageclientinfo/orders/showall/:orderid"
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
              <Route path="admin/temp" element={<Temp />} />
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
              <Route
                path="reports/tenantEmail"
                element={<TenantEmail />}
              />
              <Route
                path="reports/ownerMailId"
                element={<OwnerMailId />}
              />
              <Route
                path="reports/clientContactDetails"
                element={<ClientContactDetails />}
              />
              <Route 
                path="/reports/orderStaticsView"
                element={<OrderStaticsView/>}
              />
               <Route 
                path="/reports/activellagreement"
                element={<ActiveLLAgreementView/>}
              />
               <Route 
                path="/reports/orderanalysis"
                element={<OrderAnalysis/>}
              />
               <Route 
                path="/reports/Lllist"
                element={<LLlistReport/>}
              />
              <Route 
               path="/reports/clientstatics"
               element={<ClientStatistics/>}
              />
              <Route
                path="reports/clientStatementByDate"
                element={<ClientStatementByDate />}
              />
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
