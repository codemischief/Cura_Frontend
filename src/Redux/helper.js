import { formatDate } from "../utils/formatDate";
export const getPmaBillingPayload = (obj) => {
  return { ...obj, user_id: obj.userId ?? 1234 };
};

function floorDecimal(number) {
  let floorValue = Math.floor(number * 100) / 100; // Get floor value with two decimal places
  return floorValue.toFixed(2); // Convert to string with exactly two decimal places
}

export const updatedResponsePmaData = (data, year, month) => {
  return data.map((billing, index) => ({
    ...billing,
    data: billing.data ? billing.date : "",
    totaltaxamt: billing.totaltaxamt ? floorDecimal(billing.totaltaxamt) : "",
    totalamt: billing.totalamt ? floorDecimal(billing.totalamt) : "",
    rentedtaxamt: billing.rentedtaxamt
      ? floorDecimal(billing.rentedtaxamt)
      : "",
    rentedamt: billing.rentedamt ? floorDecimal(billing.rentedamt) : "",
    totalbaseamt: billing.totalbaseamt
      ? floorDecimal(billing.totalbaseamt)
      : "",
    // invoicedate: `${year}${month}01`,
    fixedamt: billing?.fixedamt ? billing?.fixedamt : "",
    fixedtaxamt: billing?.fixedtaxamt ? floorDecimal(billing?.fixedtaxamt) : "",
  }));
};
export const updatedOrderPaymentData = (data, year, month) => {
  console.log(data);
  return data.map((billing, index) => ({
    ...billing,
    data: billing.data ? billing.date : "",
    amount: billing.amount ? floorDecimal(billing.amount) : "0.00",
    paymentdate: billing.paymentdate ? formatDate(billing.paymentdate) : "",
  }));
};
export const updatedOrderReceiptData = (data, year, month) => {
  return data.map((billing, index) => ({
    ...billing,
    data: billing.data ? billing.date : "",
    amount: billing.amount ? floorDecimal(billing.amount) : "0.00",
    recddate: billing.recddate ? formatDate(billing.recddate) : "",
  }));
};
export const updatedOrderInvoiceData = (data, year, month) => {
  console.log(data);
  return data.map((billing, index) => ({
    ...billing,
    invoicedate: billing.invoicedate ? formatDate(billing.invoicedate) : "",
    invoiceamount: billing.invoiceamount
      ? floorDecimal(billing.invoiceamount)
      : "0.00",
  }));
};
export const updatedClientReceiptData = (data, year, month) => {
  return data.map((billing, index) => ({
    ...billing,
    data: billing.data ? billing.date : "",
    amount: billing.amount ? floorDecimal(billing.amount) : "0.00",
    recddate: billing.recddate ? formatDate(billing.recddate) : "",
  }));
};
export const updatedVendorInvoiceData = (data, year, month) => {
  return data.map((billing, index) => ({
    ...billing,
    invoicedate: billing.invoicedate ? formatDate(billing.invoicedate) : "",
    invoiceamount: billing.invoiceamount
      ? floorDecimal(billing.invoiceamount)
      : "0.00",
  }));
};
export const updatedLobReceiptPaymentsData = (data, year, month) => {
  console.log(data);
  return data.map((billing, index) => ({
    ...billing,
    orderreceiptamount: billing.orderreceiptamount
      ? floorDecimal(billing.orderreceiptamount)
      : "0.00",
    paymentamount: billing.paymentamount
      ? floorDecimal(billing.paymentamount)
      : "0.00",
    diff: billing.diff ? floorDecimal(billing.diff) : "0.00",
  }));
};
export const updatedEntityReceiptPaymentsData = (data, year, month) => {
  console.log(data);
  return data.map((billing, index) => ({
    ...billing,
    orderreceiptamount: billing.orderreceiptamount
      ? floorDecimal(billing.orderreceiptamount)
      : "0.00",
    paymentamount: billing.paymentamount
      ? floorDecimal(billing.paymentamount)
      : "0.00",
    diff: billing.diff ? floorDecimal(billing.diff) : "0.00",
  }));
};
export const updatedLobReceiptPaymentConsolidatedData = (data, year, month) => {
  console.log(data);
  return data.map((billing, index) => ({
    ...billing,
    total_orderreceiptamount: billing.total_orderreceiptamount
      ? floorDecimal(billing.total_orderreceiptamount)
      : "0.00",
    total_paymentamount: billing.total_paymentamount
      ? floorDecimal(billing.total_paymentamount)
      : "0.00",
    total_diff: billing.total_diff ? floorDecimal(billing.total_diff) : "0.00",
  }));
};
export const pmaBillingTrendView = (data, year, month) => {
  console.log(data);
  return data.map((billing, index) => ({
    ...billing,
  }));
};
export const pmaClientReport = (data, year, month) => {
  console.log(data);
  return data.map((billing, index) => ({
    ...billing,
  }));
};
export const pmaInvoiceList = (data, year, month) => {
  console.log(data);
  return data.map((billing, index) => ({
    ...billing,
    invoicedate: billing.invoicedate ? formatDate(billing.invoicedate) : "",
    baseamount: billing.baseamount ? floorDecimal(billing.baseamount) : "0.00",
    tax: billing.tax ? floorDecimal(billing.tax) : "0.00",
    invoiceamount: billing.invoiceamount
      ? floorDecimal(billing.invoiceamount)
      : "0.00",
  }));
};
export const pmaClientReceivable = (data) => {
  console.log(data);
  return data.map((billing, index) => ({
    ...billing,
    amount: billing.amount ? floorDecimal(billing.amount) : "0.00",
  }));
};
export const activePmaAgreement = (data) => {
  console.log(data);
  return data.map((billing, index) => ({
    ...billing,
    startdate: billing.startdate ? formatDate(billing.startdate) : "",
    enddate: billing.enddate ? formatDate(billing.enddate) : "",
    lnlstartdate: billing.lnlstartdate ? formatDate(billing.lnlstartdate) : "",
    lnlenddate: billing.lnlenddate ? formatDate(billing.lnlenddate) : "",
    poastartdate: billing.poastartdate ? formatDate(billing.poastartdate) : "",
  }));
};
export const projectContacts = (data) => {
  console.log(data);
  return data.map((billing, index) => ({
    ...billing,
    tenureenddate: billing.tenureenddate
      ? formatDate(billing.tenureenddate)
      : "",
    effectivedate: billing.effectivedate
      ? formatDate(billing.effectivedate)
      : "",
  }));
};
export const advanceHoldingAmount = (data) => {
  console.log(data);
  return data.map((billing, index) => ({
    ...billing,
    payments: billing.payments ? floorDecimal(billing.payments) : "0.00",
    receipts: billing.receipts ? floorDecimal(billing.receipts) : "0.00",
  }));
};
export const pmaClientStatementAll = (data) => {
  console.log(data);
  return data.map((billing, index) => ({
    ...billing,
    date: billing.date ? formatDate(billing.date) : "",
    amount: billing.amount ? floorDecimal(billing.amount) : "0.00",
  }));
};
export const pmaClientStatement = (data) => {
  console.log(data);
  return data.map((billing, index) => ({
    ...billing,
    date: billing.date ? formatDate(billing.date) : "",
    amount: billing.amount ? floorDecimal(billing.amount) : "0.00",
  }));
};
export const nonPmaClientStAndRec = (data) => {
  console.log(data);
  return data.map((billing, index) => ({
    ...billing,
    date: billing.date ? formatDate(billing.date) : "",
    amount: billing.amount ? floorDecimal(billing.amount) : "0.00",
  }));
};

export const clientStatementAllEntities = (data) => {
  console.log(data);
  return data.map((billing, index) => ({
    ...billing,
    date: billing.date ? formatDate(billing.date) : "",
    amount: billing.amount ? floorDecimal(billing.amount) : "0.00",
  }));
};
export const duplicateClientsReport = (data) => {
  console.log(data);
  return data.map((billing, index) => ({
    ...billing,
  }));
};
export const reportMonthlyBankSummary = (data) => {
  console.log(data);
  return data.map((billing, index) => ({
    ...billing,
    payments: billing.payments ? floorDecimal(billing.payments) : "0.00",
    bankpayments: billing.bankpayments
      ? floorDecimal(billing.bankpayments)
      : "0.00",
    bankreceipts: billing.bankreceipts
      ? floorDecimal(billing.bankreceipts)
      : "0.00",
    receipts: billing.receipts ? floorDecimal(billing.receipts) : "0.00",
  }));
};
export const bankTransferReconsiliation = (data) => {
  console.log(data);
  return data.map((billing, index) => ({
    ...billing,
    amount: billing.amount ? floorDecimal(billing.amount) : "0.00",
    date: billing.date ? formatDate(billing.date) : "",
  }));
};
export const clientOrderReceiptMismatchDetails = (data) => {
  return data.map((billing, index) => ({
    ...billing,
    diff: billing.diff ? floorDecimal(billing.diff) : "0.00",
    date: billing.date ? formatDate(billing.date) : "",
  }));
};
export const bankReceiptReconciliation = (data) => {
  return data.map((billing, index) => ({
    ...billing,
    bankst_cr: billing.bankst_cr ? floorDecimal(billing.bankst_cr) : "0.00",
    client_receipt: billing.client_receipt
      ? floorDecimal(billing.client_receipt)
      : "0.00",
    order_receipt: billing.order_receipt
      ? floorDecimal(billing.order_receipt)
      : "0.00",
    date: billing.date ? formatDate(billing.date) : "",
  }));
};
export const bankPaymentsReconciliation = (data) => {
  console.log(data);
  return data.map((billing, index) => ({
    ...billing,
    bankst_dr: billing.bankst_dr ? floorDecimal(billing.bankst_dr) : "0.00",
    order_payments: billing.order_payments
      ? floorDecimal(billing.order_payments)
      : "0.00",
    contractual_payments: billing.contractual_payments
      ? floorDecimal(billing.contractual_payments)
      : "0.00",
    contorderpayments: billing.contorderpayments
      ? floorDecimal(billing.contorderpayments)
      : "0.00",
    date: billing.date ? formatDate(billing.date) : "",
  }));
};
export const clientTraceReport = (data) => {
  console.log(data);
  return data.map((billing, index) => ({
    ...billing,
  }));
};
export const orderTraceReport = (data) => {
  console.log(data);
  return data.map((billing, index) => ({
    ...billing,
  }));
};

export const StatisticsReport = (data) => {
  console.log(data);
  return data.map((billing, index) => ({
    ...billing,
    amount: billing.amount
      ? floorDecimal(billing.amount)
      : "0.00",
  }));
};

export const vendorStatementReport = (data) => {
  return data.map((ele, index) => ({
    ...ele,
    invoicedate_orderpaymentdate: formatDate(ele.invoicedate_orderpaymentdate) ? formatDate(ele.invoicedate_orderpaymentdate) : "",
    invoiceamount_orderpaymentamount: floorDecimal(ele.invoiceamount_orderpaymentamount) ? floorDecimal(ele.invoiceamount_orderpaymentamount) : "0.00",
  }));
};

export const tdsPaidByVendorReport = (data) => {
  return data.map((ele, index) => ({
    ...ele,
    tds: floorDecimal(ele.tds) ? floorDecimal(ele.tds) : "0.00",
    amount: floorDecimal(ele.amount) ? floorDecimal(ele.amount) : "0.00",
    paymentdate: formatDate(ele.paymentdate) ? formatDate(ele.paymentdate) : "",
  }));
};

export const vendorPaymentPeriodReport = (data) => {
  return data.map((ele, index) => ({
    ...ele,
    servicetaxamount: floorDecimal(ele.servicetaxamount) ? floorDecimal(ele.servicetaxamount) : "0.00",
    amount: floorDecimal(ele.amount) ? floorDecimal(ele.amount) : "0.00",
    tds: floorDecimal(ele.tds) ? floorDecimal(ele.tds) : "0.00",
  }));
};
export const tdsPaidGovtFormat = (data) => {
  return data.map((ele, index) => ({
    ...ele,
    amount: floorDecimal(ele.amount) ? floorDecimal(ele.amount) : "0.00",
  }));
};

export const clientReceiptFormatData = (data) => {
  return data.map((ele, index) => ({
    ...ele,
    date: formatDate(ele.date) ? formatDate(ele.date) : "",
    ledgeramount: floorDecimal(ele.ledgeramount) ? floorDecimal(ele.ledgeramount) : "0.00"

  }));
};
export const updatedEmployerData = (data) => {
  console.log(data);
  return data.map((billing, index) => ({
    ...billing,
  }));
};
export const updatedGovernmentDepartmentData = (data) => {
  console.log(data);
  return data.map((billing, index) => ({
    ...billing,
  }));
};
export const updatedAgentData = (data) => {
  return data.map((billing, index) => ({
    ...billing,
  }));
};

export const updatedOwnerData = (data) => {
  console.log(data)
  return data.map((billing, index) => ({
    ...billing,
  }));
}
export const updatedServiceApartmentData = (data) => {
  console.log(data)
  return data.map((billing, index) => ({
    ...billing,
  }));
}


export const receiptToInvoice = (data) => {
  return data.map((ele, index) => ({
    ...ele,
    date: formatDate(ele.date) ? formatDate(ele.date) : ""
  }));
};

export const activeLLAgreement = (data) => {
  return data.map((ele, index) => ({
    ...ele,
    start_date: formatDate(ele.startdate),
    actualenddate: formatDate(ele.actualenddate),
    rentamount: floorDecimal(ele.rentamount) ? floorDecimal(ele.rentamount) : "0.00",
    depositamount: floorDecimal(ele.depositamount) ? floorDecimal(ele.depositamount) : "0.00",
  }));
};

export const orderAnalysisFromat = (data) => {
  return data.map((ele, index) => ({
    ...ele,
    totalorderpayment: formatDate(ele.totalorderpayment),
    totalinvoiceamt: floorDecimal(ele.totalinvoiceamt) ? floorDecimal(ele.totalinvoiceamt) : "0.00",
    totalorderreceipt: floorDecimal(ele.totalorderreceipt) ? floorDecimal(ele.totalorderreceipt) : "0.00",
  }));
}
export const updatedFriendsData = (data) => {
  return data.map((ele, index) => ({
    ...ele,
  }));
}
export const serviceTaxPaidByVendor = (data) => {
  return data.map((billing, index) => ({
    ...billing,
    servicetaxamount: billing.servicetaxamount ? floorDecimal(billing.servicetaxamount) : "0.00",
    amount: billing.amount
      ? floorDecimal(billing.amount)
      : "0.00",
    paymentdate: billing.paymentdate ? formatDate(billing.paymentdate) : "",
  }));
}
export const TenantEmail = (data) => {
  return data.map((billing, index) => ({
    ...billing,
  }));
}
export const updatedBanksAndBranchesData = (data) => {
  return data.map((billing, index) => ({
    ...billing,
  }));
}
export const updatedOrderPaymentDD = (data) => {
  return data.map((billing, index) => ({
    ...billing,
    ledgeramount: billing.ledgeramount ? floorDecimal(billing.ledgeramount) : "0.00",
    date: billing.date ? formatDate(billing.date) : "",
  }));
}

export const paymentUnderSuspensReportFormat = (data) => {
  return data.map((ele, index) => ({
    ...ele,
    amount: floorDecimal(ele.amount)?floorDecimal(ele.amount):"0.00",
    paymentdate: formatDate(ele.paymentdate)?formatDate(ele.paymentdate):"",
  }));
};

export const formatUnderSuspensen = (data) => {
  return data.map((billing, index) => ({
    ...billing,
    recddate: billing.recddate ? formatDate(billing.recddate) : "",
    amount: billing.amount ? floorDecimal(billing.amount) :"0.00"
  }));
}
  export const entityBlankReportFormat = (data) => {
    return data.map((billing, index) => ({
      ...billing,
      amount: billing.amount ? floorDecimal(billing.amount) : "0.00",
      date: billing.date ? formatDate(billing.date) : "",

    }));
  }
  export const ServiceTaxReportFormat = (data) => {
    return data.map((billing, index) => ({
      ...billing,
      amount: billing.amount ? floorDecimal(billing.amount) : "0.00",
      recddate: billing.recddate ? formatDate(billing.recddate) : "",
    }));
  }
  export const bankTransferWithWrongUserNameFormat = (data) => {
    return data.map((billing, index) => ({
      ...billing,
      amount: billing.amount ? floorDecimal(billing.amount) : "0.00",
    }));
  }
  export const vendorSummary = (data) => {
    return data.map((billing, index) => ({
      ...billing,
      estimateamount: billing.estimateamount ? floorDecimal(billing.estimateamount) : "0.00",
      invoiceamount: billing.invoiceamount ? floorDecimal(billing.invoiceamount) : "0.00",
      paymentamount: billing.paymentamount ? floorDecimal(billing.paymentamount) : "0.00",
      computedpending: billing.computedpending ? floorDecimal(billing.computedpending) : "0.00",
    }));
  }

export const LLlistFormat = (data)=>{
  return data.map((billing, index) => ({
    ...billing,
    depositamount: billing.depositamount ? floorDecimal(billing.depositamount) : "0.00",
    rentamount: billing.rentamount ? floorDecimal(billing.rentamount) : "0.00",
    startdate:billing.startdate ? formatDate(billing.startdate) :"",
    enddate:billing.enddate ? formatDate(billing.enddate) :"",
  }));

}

export const env_URL_SERVER = import.meta.env.VITE_ENV_URL_SERVER;
