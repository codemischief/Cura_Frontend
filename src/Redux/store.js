import { configureStore } from "@reduxjs/toolkit";
// import { pmaSlicing } from "./slice/pmaSlice";
import pmaReducer from "./slice/pmaSlice";
import orderPaymentReducer from "./slice/reporting/OrderPaymentSlice";
import OrderReceiptReducer from "./slice/reporting/OrderReceiptSlice";
import OrderInvoiceReducer from "./slice/reporting/OrderInvoiceSlice";
import ClientReceiptReducer from "./slice/reporting/ClientReceiptSlice";
import VendorInvoiceReducer from "./slice/reporting/VendorInvoiceSlice";
import LOBReceiptPaymentReducer from "./slice/reporting/LOBReceiptPaymentSlice";
import EntityReceiptPaymentReducer from "./slice/reporting/EntityReceiptPaymentSlice";
import LOBReceiptPaymentConsolidatedReducer from "./slice/reporting/LOBReceiptPaymentConsolidatedSlice";
// import { pmaBillingTrendView } from "./helper";
import pmaBillingTrendView from "./slice/reporting/pmaBillingTrendView";
import pmaClientReport from "./slice/reporting/pmaClientReport";
import pmaInvoiceList from "./slice/reporting/pmaInvoiceList";
// import { setPmaClientReceivables } from "./slice/reporting/ReportPmaClientReceivable";
import pmaClientReceivable from "./slice/reporting/ReportPmaClientReceivable";
import ActivePmaAgreement from "./slice/reporting/ActivePmaAgreement";
import ProjectContacts from "./slice/reporting/ProjectContacts";
import AdvanceHoldingAmount from "./slice/reporting/AdvanceHoldingAmount";
import pmaClientStatementAll from "./slice/reporting/pmaClientStatementAll";
import pmaClientStatement from "./slice/reporting/PmaClientStatement";
import NonPmaClientStAndRec from "./slice/reporting/NonPmaClientStAndRec";
import ClientStatementAllEntities from "./slice/reporting/ClientStatementAllEntities";
import DuplicateClientReports from "./slice/reporting/DuplicateClientReports";
import ClientBankDetails from "./slice/reporting/ClientBankDetails";
import MonthlyBankSummary from "./slice/reporting/MonthlyBankSummary";
import BankTransferReconciliation from "./slice/reporting/BankTransferReconciliation";
import ClientOrderReceiptMismatchDetails from "./slice/reporting/ClientOrderReceiptMismatchDetails";
import BankReceiptsReconciliation from "./slice/reporting/BankReceiptsReconciliation";
import BankPaymentsReconciliation from "./slice/reporting/BankPaymentsReconciliation";
import ProsPectReducer from "./slice/Research/ProspectSlice";
import ClientTraceReport from "./slice/reporting/ClientTraceReport";
import OrderTraceReport from "./slice/reporting/OrderTraceReport";
import VendorTraceReport from "./slice/reporting/VendorTraceReport";
import ClientReceiptReportReducer from "./slice/reporting/TallyReports/ClientReceipt/ClientReceipt";
import OrderPaymentDDReportReducer from "./slice/reporting/TallyReports/OrderPaymentDD/OrderPaymentDD";
import OrderPaymentB2CReducer from "./slice/reporting/TallyReports/OrderPaymentB2C/OrderPaymentB2C";
import OrderPaymentB2BReducer from "./slice/reporting/TallyReports/OrderPaymentB2B/OrderPaymentB2B";
import OrderPaymentWithTdsReducer from "./slice/reporting/TallyReports/OrderPaymentWithTds/OrderPaymentWithTds";
import OrderPaymentWithoutTdsReducer from "./slice/reporting/TallyReports/OrderPaymentWithoutTds/OrderPaymentWithoutTds";
import OrderReceiptToServiceTaxReducer from "./slice/reporting/TallyReports/OrderReceiptToInvoiceServiceTax/OrderReceiptToInvoiceServiceTax";
import employer from "./slice/Research/EmployerSlice";
import governmentdepartment from "./slice/Research/GovernmentDepartmentSlice";
import agent from "./slice/Research/AgentSlice";
import owner from "./slice/Research/OwnerSlice";
import serviceapartment from "./slice/Research/ServiceApartmentSlice";
import ClientStatistics from "./slice/reporting/Statistics/ClientStatistics";
// import GovernmentDepartment from "../Screens/Research/Government Department/GovernmentDepartment";
import VendorStatementReducer from "./slice/reporting/Group9/VendorStatement";
import TdsPaidByVendorReducer from "./slice/reporting/Group9/TdsByVendorSlice";
import TdsToGovtReducer from "./slice/reporting/Group9/tdsPaidToGovt";
import VendorPaymentPeriodReducer from "./slice/reporting/Group9/VendorPaymentPeriodSlice";
import friends from "./slice/Research/FriendsSlice";
import StatisticsReport from "./slice/reporting/Statistics/StatisticsReport";
import ServiceTaxPaidByVendor from "./slice/reporting/Statistics/ServiceTaxPaidByVendor";
import TenantEmail from "./slice/reporting/Contacts/TenantEmail";
import OwnerMailId from "./slice/reporting/Contacts/OwnerMailId";
import ClientContactsDetails from "./slice/reporting/Contacts/ClientContactsDetails";
import banksandbranches from "./slice/Research/BanksAndBranchesSlice";
import commonApiReducer from "./slice/commonApis";
import ActiveLLAgreementReducer from "./slice/reporting/ActiveLLAgreement/ActiveLLAgreement"
import orderStatisticsReportReducer from "./slice/reporting/Statistics/OrderStatisticsReport/OrderStatisticsReport"
import OrderAnalysisReducer from "./slice/reporting/OrderAnalysis/OrderAnalysis";
import LllistReducer from "./slice/reporting/LLlist/LllistSlice"
import ClientStatementByDate from "./slice/reporting/ClientStatementByDate";
import PaymentUnderSuspenseOrderSlice from "./slice/reporting/Group12/PaymentUnderSuspenseOrderSlice";
import ReceiptsUnderSuspenseOrderSlice from "./slice/reporting/Group12/ReceiptsUnderSuspenseOrderSlice";
import ClientsWithOrderButNoEmailSlice from "./slice/reporting/Group12/ClientsWithOrderButNoEmail";
import EmployeeWithoutVendor from "./slice/reporting/Group12/EmployeeWithoutVendor";
import BankTransactionsWithWrongUserNameReducer from "./slice/reporting/Group12/BankTransactionsWithWrongUserName";
import EntityBlankReportReducer from "./slice/reporting/Group12/EntityBlankReportSlice";
import OwnerWithNoPropertyReducer from "./slice/reporting/Group12/OwnerWithNoProperty"
import PropertyWithNoProjectReducer from "./slice/reporting/Group12/PropertyWithNoProject";
import VendorSummary from "./slice/reporting/Group9/VendorSummary";
import ClientPhoneNoReducer from "./slice/reporting/Group13/ClientPhoneNo"
import OwnerPhoneNoReducer from "./slice/reporting/Group13/OwnerPhoneNo"
import BankBalanceReconciliationReducer from "./slice/reporting/BankBalanceReconcilation";
import EducationalInstitute from "./slice/Research/EducationalInstitute";
import SendClientStatement from "./slice/SendClientStatement";

import ServiceTaxReportReducer from "./slice/reporting/Group12/ServiceTaxReportSlice";
import professionals  from "./slice/Research/ProfessionalsSlice";
import mandals  from "./slice/Research/MandalSlice";
import contact from "./slice/Manage/contact";
export const store = configureStore({
  reducer: {
    pmaBilling: pmaReducer,
    orderPayment: orderPaymentReducer,
    orderReceipt: OrderReceiptReducer,
    orderInvoice: OrderInvoiceReducer,
    clientReceipt: ClientReceiptReducer,
    vendorInvoice: VendorInvoiceReducer,
    lobReceiptPayments: LOBReceiptPaymentReducer,
    entityReceiptPayments: EntityReceiptPaymentReducer,
    lobReceiptPaymentConsolidated: LOBReceiptPaymentConsolidatedReducer,
    pmaBillingTrendView: pmaBillingTrendView,
    pmaClientReport: pmaClientReport,
    pmaInvoiceList: pmaInvoiceList,
    pmaClientReceivable: pmaClientReceivable,
    activePmaAgreement: ActivePmaAgreement,
    projectContacts: ProjectContacts,
    advanceHoldingAmount: AdvanceHoldingAmount,
    pmaClientStatementAll: pmaClientStatementAll,
    pmaClientStatement: pmaClientStatement,
    nonPmaClientStAndRec: NonPmaClientStAndRec,
    clientStatementAllEntities: ClientStatementAllEntities,
    duplicateClientsReport: DuplicateClientReports,
    clientBankDetails: ClientBankDetails,
    monthlyBankSummary: MonthlyBankSummary,
    bankTransferReconsiliation: BankTransferReconciliation,
    clientOrderReceiptMismatchDetails: ClientOrderReceiptMismatchDetails,
    bankReceiptReconciliation: BankReceiptsReconciliation,
    bankPaymentsReconciliation: BankPaymentsReconciliation,
    prospect: ProsPectReducer,
    clientTraceReport: ClientTraceReport,
    orderTraceReport: OrderTraceReport,
    vendorTraceReport: VendorTraceReport,
    serviceapartment: serviceapartment,
    employer: employer,
    governmentdepartment: governmentdepartment,
    agent: agent,
    owner: owner,
    friends: friends,
    banksandbranches: banksandbranches,
    professionals : professionals,
    clientStatistics: ClientStatistics,
    clientReceiptReport: ClientReceiptReportReducer,
    orderPaymentDDReport: OrderPaymentDDReportReducer,
    orderPaymentB2C: OrderPaymentB2CReducer,
    orderPaymentB2B: OrderPaymentB2BReducer,
    orderPaymentWithTds: OrderPaymentWithTdsReducer,
    orderPaymentWithoutTds: OrderPaymentWithoutTdsReducer,
    orderReceiptToServiceTax: OrderReceiptToServiceTaxReducer,
    vendorStatement: VendorStatementReducer,
    tdspaidByVendor: TdsPaidByVendorReducer,
    tdsToGovt: TdsToGovtReducer,
    vendorPaymentPeriod: VendorPaymentPeriodReducer,
    statisticsReport: StatisticsReport,
    serviceTaxPaidByVendor: ServiceTaxPaidByVendor,
    tenantEmail: TenantEmail,
    ownerMailId: OwnerMailId,
    clientContactsDetails: ClientContactsDetails,
    commonApi: commonApiReducer,
    orderStatisticsReport:orderStatisticsReportReducer,
    activeLLAgreement:ActiveLLAgreementReducer,
    orderAnalysis:OrderAnalysisReducer,
    LLlist:LllistReducer,
    clientStatementByDate:ClientStatementByDate,
    paymentUnserSuspenseOrder: PaymentUnderSuspenseOrderSlice,
    receiptsUnderSuspenseOrder: ReceiptsUnderSuspenseOrderSlice,
    clientsWithOrderButNoEmail: ClientsWithOrderButNoEmailSlice,
    employeeWithoutVendor: EmployeeWithoutVendor,
    bankTransactionsWithWrongUserName: BankTransactionsWithWrongUserNameReducer,
    entityBlankReport: EntityBlankReportReducer,
    ownerWithNoProperty:OwnerWithNoPropertyReducer,
    propertyWithNoProject:PropertyWithNoProjectReducer,
    serviceTaxReport: ServiceTaxReportReducer,
    vendorSummary:VendorSummary,
    mandals : mandals,
    clientPhoneNo:ClientPhoneNoReducer,
    ownerPhoneNo:OwnerPhoneNoReducer,
    bankBalanceReconcilation:BankBalanceReconciliationReducer,
    educationalInstitute:EducationalInstitute,
    sendClientStatement:SendClientStatement,
    contact : contact
  },
  // Add the RTK Query API middleware
});
