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
import Agent from "./Screens/Research/Agent/Agent";
import Employer from "./Screens/Research/Employer/Employer";
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
import { CircularProgress } from "@mui/material";

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
            <Route path="/unauthorized" element={<>Unauthorized</>} />

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
              <Route path="/admin/managebuilder" element={<ManageBuilder />} />
              <Route
                path="/admin/manageprojectinfo"
                element={<ManageProjectInfo />}
              />
              <Route path="/admin/deleteById" element={<DeleteById />} />
              <Route
                path="/admin/deleteById/:pagename"
                element={<DeletePage />}
              />
              <Route path="/admin/manageOrder" element={<ManageOrder />} />
              <Route path="/admin/manageuser" element={<ManageUser />} />
              <Route path="/admin/country" element={<Country />} />
              <Route path="/admin/state" element={<State />} />
              <Route path="/admin/city" element={<City />} />
              <Route path="/admin/locality" element={<Locality />} />
              <Route path="/admin/LOB" element={<LOB />} />
              <Route path="/admin/service" element={<Service />} />
              <Route path="/admin/payments" element={<Payments />} />
              <Route path="/research/prospect" element={<PropectusPage />} />
              <Route path="/research/owner" element={<Owner />} />
              <Route path="/research/educational" element={<Educational />} />
              <Route path="/research/architect" element={<Architect />} />
              <Route path="/research/mandals" element={<Mandals />} />
              <Route
                path="/research/professionals"
                element={<Professionals />}
              />
              <Route path="/research/coc" element={<COC />} />
              <Route path="/research/banks" element={<Banks />} />
              <Route path="/research/friends" element={<Friends />} />
              <Route path="/reasearch/agent" element={<Agent />} />
              <Route path="/reasearch/employer" element={<Employer />} />
              <Route
                path="/reasearch/governmentdepartment"
                element={<GovernmentDepartment />}
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
                path="admin/managebuilder/projects/:buildername"
                element={<ManageBuilderProject />}
              />
              <Route
                path="admin/managebuilder/contacts/:buildername"
                element={<ManageBuilderContact />}
              />
              <Route
                path="/manage/manageclientinfo/properties/:clientname"
                element={<ManageClientPropertyByClientName />}
              />
              <Route
                path="/manage/manageclientproperty/pmaagreement/:clientname"
                element={<ClientPmaArgreement />}
              />
              <Route
                path="/manage/manageclientproperty/llagreement/:clientname"
                element={<ClientLLAgreement />}
              />
              <Route path="/manage/pmaBilling" element={<PmaBilling />} />
              <Route path="admin/temp" element={<Temp />} />
              <Route path="/orderPaymentList" element={<OrderPaymentList />} />
              <Route path="/orderReceiptList" element={<OrderReceiptList />} />
              <Route path="/orderInvoiceList" element={<OrderInvoiceList />} />
              <Route
                path="/clientReceiptList"
                element={<ClientReceiptList />}
              />
              <Route
                path="/vendorInvoiceList"
                element={<VendorInvoiceList />}
              />
              <Route
                path="/lobReceiptPayments"
                element={<LobReceiptPayments />}
              />
              <Route
                path="/entityReceiptPayments"
                element={<EntityReceiptPayments />}
              />
              <Route
                path="/lobReceiptPaymentsConsolidated"
                element={<LobReceiptPaymentsConsolidated />}
              />
              <Route
                path="/pmaBillingTrendView"
                element={<PmaBillingTrendView />}
              />
              <Route path="/pmaClientReport" element={<PmaClientReport />} />
              <Route path="/pmaInvoiceList" element={<PmaInvoiceList />} />
              <Route
                path="/pmaClientReceivable"
                element={<PmaClientReceivable />}
              />
              <Route
                path="/activePmaAgreement"
                element={<ActivePmaAgreement />}
              />
              <Route path="/projectContact" element={<ProjectContact />} />
              <Route
                path="/advanceHoldingAmount"
                element={<AdvanceHoldingAmount />}
              />
              <Route
                path="/pmaClientStatementAll"
                element={<PmaClientStatementAll />}
              />
              <Route
                path="/pmaClientStatement"
                element={<PmaClientStatement />}
              />
              <Route
                path="/nonPmaClientStatement"
                element={<NonPmaClientStatement />}
              />
              <Route
                path="/nonPmaClientReceivables"
                element={<NonPmaClientReceivables />}
              />
              <Route
                path="/clientStatementAll"
                element={<ClientStatementAll />}
              />
              <Route
                path="/duplicateClientReport"
                element={<DuplicateClientReport />}
              />
              <Route
                path="/clientBankDetails"
                element={<ClientBankDetails />}
              />
              <Route
                path="/monthlyBankSummary"
                element={<MonthlyBankSummary />}
              />
              <Route
                path="/bankTransferReconciliation"
                element={<BankTransferReconciliation />}
              />
              <Route
                path="/clientOrderReceiptMismatchDetails"
                element={<ClientOrderReceiptMismatchDetails />}
              />
              <Route
                path="/bankReceiptReconciliation"
                element={<BankReceiptReconciliation />}
              />
              <Route
                path="/bankPaymentReconciliation"
                element={<BankPaymentReconciliation />}
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
