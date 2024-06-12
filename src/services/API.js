const env_URL_SERVER = import.meta.env.VITE_ENV_URL_SERVER;
const accessToken = sessionStorage.getItem("accessToken");
// const env_URL_SERVER="http://192.168.10.183:8000/"
const API = {
  LOGIN: "$env_URL_SERVERvalidateCredentials",
};
import { userId } from "../utils/axios";
const USER_ID = "";
const METHOD_POST = (data) => ({
  method: "POST",
  body: JSON.stringify({...data,"user_id" : userId }),
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
});
const METHOD_POST_WITH_TOKEN = (data, token) => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `bearer ${token}`,
  },
  body: JSON.stringify(data),
});

const DOWNLOAD_POST = (data) => ({
  method: "POST",
  body: JSON.stringify(data),
  // headers: {
  //   'Content-Type': 'application/octet-stream',
  // }
});

const getCountries = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getCountries`,
    METHOD_POST(data)
  );
  return response;
};
const getState = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getStates`, METHOD_POST(data));
  return response;
};
const getStatesAdmin = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getStatesAdmin`,
    METHOD_POST(data)
  );
  return response;
};
const getCitiesAdmin = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getCitiesAdmin`,
    METHOD_POST(data)
  );
  return response;
};
const getCities = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getCities`, METHOD_POST(data));
  return response;
};

const addCountries = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}addCountry`,
    METHOD_POST(data)
  );
  return response;
};
const editCountry = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}editCountry`,
    METHOD_POST(data)
  );
  return response;
};
const getNewBuilderInfo = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getBuilderInfo`,
    METHOD_POST(data)
  );
  return response;
};
const addNewBuilder = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}addBuilderInfo`,
    METHOD_POST(data)
  );
  return response;
};
const editBuilderInfo = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}editBuilder`,
    METHOD_POST(data)
  );
  return response;
};
const deleteBuilderInfo = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}deleteBuilder`,
    METHOD_POST(data)
  );
  return response;
};
const deleteCountries = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}deleteCountry`,
    METHOD_POST(data)
  );
  return response;
};
const getLob = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getLob`, METHOD_POST(data));
  return response;
};
const addLob = async (data) => {
  const response = await fetch(`${env_URL_SERVER}addLob`, METHOD_POST(data));
  return response;
};
const deleteLob = async (data) => {
  const response = await fetch(`${env_URL_SERVER}deleteLob`, METHOD_POST(data));
  return response;
};
const editLob = async (data) => {
  const response = await fetch(`${env_URL_SERVER}editLob`, METHOD_POST(data));
  return response;
};
const getBankStatement = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getBankSt`, METHOD_POST(data));
  return response;
};
const addBankStatement = async (data) => {
  const response = await fetch(`${env_URL_SERVER}addBankSt`, METHOD_POST(data));
  return response;
};
const editBankStatement = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}editBankSt`,
    METHOD_POST(data)
  );
  return response;
};

const deleteBankStatement = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}deleteBankSt`,
    METHOD_POST(data)
  );
  return response;
};

const getVendorAdmin = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getVendorAdmin`,
    METHOD_POST(data)
  );
  return response;
};

const getEmployees = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getEmployee`,
    METHOD_POST(data)
  );
  return response;
};
const addEmployee = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}addEmployee`,
    METHOD_POST(data)
  );
  return response;
};
const getLocality = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getLocality`,
    METHOD_POST(data)
  );
  return response;
};
const getClientAdmin = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getClientAdmin`,
    METHOD_POST(data)
  );
  return response;
};
const deleteLocality = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}deleteLocality`,
    METHOD_POST(data)
  );
  return response;
};
const getEntityAdmin = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getEntityAdmin`,
    METHOD_POST(data)
  );
  return response;
};
const getModesAdmin = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getModesAdmin`,
    METHOD_POST(data)
  );
  return response;
};

const addLocality = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}addLocality`,
    METHOD_POST(data)
  );
  return response;
};

const getHowReceivedAdmin = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getHowReceivedAdmin`,
    METHOD_POST(data)
  );
  return response;
};
const addClientReceipt = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}addClientReceipt`,
    METHOD_POST(data)
  );
  return response;
};
const getPayment = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getPayments`,
    METHOD_POST(data)
  );
  return response;
};
const getProjectInfo = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getProjects`,
    METHOD_POST(data)
  );
  return response;
};
const editLocality = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}editLocality`,
    METHOD_POST(data)
  );
  return response;
};
const getUsers = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getUsersAdmin`,
    METHOD_POST(data)
  );
  return response;
};
const getRoles = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getRolesAdmin`,
    METHOD_POST(data)
  );
  return response;
};
const deleteEmployee = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}deleteEmployee`,
    METHOD_POST(data)
  );
  return response;
};
const addPayment = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}addPayment`,
    METHOD_POST(data)
  );
  return response;
};
const deletePayment = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}deletePayment`,
    METHOD_POST(data)
  );
  return response;
};
const editPayment = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}editPayment`,
    METHOD_POST(data)
  );
  return response;
};
const getPaymentFor = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}paymentForAdmin`,
    METHOD_POST(data)
  );
  return response;
};
const getPaymentMode = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getModesAdmin`,
    METHOD_POST(data)
  );
  return response;
};
const getProspects = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getResearchProspect`,
    METHOD_POST(data)
  );
  return response;
};
const addProspects = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}addResearchProspect`,
    METHOD_POST(data)
  );
  return response;
};
const editProspects = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}editResearchProspecta`,
    METHOD_POST(data)
  );
  return response;
};
const deleteProspects = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}deleteResearchProspect`,
    METHOD_POST(data)
  );
  return response;
};
const editEmployee = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}editEmployee`,
    METHOD_POST(data)
  );
  return response;
};

const getItembyId = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getItembyId`,
    METHOD_POST(data)
  );
  return response;
};
const getItemByAttr = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getItemByAttr`,
    METHOD_POST(data)
  );
  return response;
};
const getProjectsByBuilderId = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getProjectsByBuilderId`,
    METHOD_POST(data)
  );
  return response;
};
const getClientInfo = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getClientInfo`,
    METHOD_POST(data)
  );
  return response;
};
const getClientProperty = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getClientProperty`,
    METHOD_POST({...data, routename : 'temp'})
  );
  return response;
};
const getClientTypeAdmin = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getClientTypeAdmin`,
    METHOD_POST(data)
  );
  return response;
};
const getTenantOfPropertyAdmin = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getTenantOfPropertyAdmin`,
    METHOD_POST(data)
  );
  return response;
};
const getRelationAdmin = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getRelationAdmin`,
    METHOD_POST(data)
  );
  return response;
};
const addClientInfo = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}addClientInfo`,
    METHOD_POST(data)
  );
  return response;
};
const deleteClientInfo = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}deleteClientInfo`,
    METHOD_POST(data)
  );
  return response;
};
const getClientInfoByClientId = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getClientInfoByClientId`,
    METHOD_POST(data)
  );
  return response;
};
const editCLientInfo = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}editClientInfo`,
    METHOD_POST(data)
  );
  return response;
};
const getBuildersAndProjectsList = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getBuildersAndProjectsList`,
    METHOD_POST(data)
  );
  return response;
};
const getPropertyStatusAdmin = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getPropertyStatusAdmin`,
    METHOD_POST(data)
  );
  return response;
};

const getLevelOfFurnishingAdmin = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getLevelOfFurnishingAdmin`,
    METHOD_POST(data)
  );
  return response;
};
const getPropertyType = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getPropertyType`,
    METHOD_POST(data)
  );
  return response;
};
const addClientProperty = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}addClientProperty`,
    METHOD_POST(data)
  );
  return response;
};
const getClientAdminPaginated = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getClientAdminPaginated`,
    METHOD_POST(data)
  );
  return response;
};
const getClientPropertyById = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getClientPropertyById`,
    METHOD_POST(data)
  );
  return response;
};
const editClientProperty = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}editClientProperty`,
    METHOD_POST(data)
  );
  return response;
};
const deleteClientProperty = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}deleteClientProperty`,
    METHOD_POST(data)
  );
  return response;
};
const getClientReceipt = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getClientReceipt`,
    METHOD_POST(data)
  );
  return response;
};
const getPmaAgreement = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getClientPMAAgreement`,
    METHOD_POST(data)
  );
  return response;
};
const deleteClientReceipt = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}deleteClientReceipt`,
    METHOD_POST(data)
  );
  return response;
};
const editClientReceipt = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}editClientReceipt`,
    METHOD_POST(data)
  );
  return response;
};
const deletePmaAgreement = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}deleteClientPMAAgreement`,
    METHOD_POST(data)
  );
  return response;
};
const addPmaAgreement = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}addClientPMAAgreement`,
    METHOD_POST(data)
  );
  return response;
};
const getLLAgreement = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getClientLLAgreement`,
    METHOD_POST(data)
  );
  return response;
};

const addLLAgreement = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}addClientLLAgreement`,
    METHOD_POST(data)
  );
  return response;
};

const deleteLLAgreement = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}deleteClientLLAgreement`,
    METHOD_POST(data)
  );
  return response;
};

const getClientPropertyByClientId = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getClientPropertyByClientId`,
    METHOD_POST(data)
  );
  return response;
};
const getOrdersByClientId = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getOrdersByClientId`,
    METHOD_POST(data)
  );
  return response;
};
const editClientPMAAgreement = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}editClientPMAAgreement`,
    METHOD_POST(data)
  );
  return response;
};
const editClientLLAgreement = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}editClientLLAgreement`,
    METHOD_POST(data)
  );
  return response;
};
const addProject = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}addProject`,
    METHOD_POST(data)
  );
  return response;
};
const deleteProject = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}deleteProject`,
    METHOD_POST(data)
  );
  return response;
};
const getOrder = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getOrders`, METHOD_POST(data));
  return response;
};
const addOrder = async (data) => {
  const response = await fetch(`${env_URL_SERVER}addOrders`, METHOD_POST(data));
  return response;
};
const getOrderStatusAdmin = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getOrderStatusAdmin`,
    METHOD_POST(data)
  );
  return response;
};
const getClientPropertyAdmin = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getClientPropertyAdmin`,
    METHOD_POST(data)
  );
  return response;
};
const getServiceAdmin = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getServiceAdmin`,
    METHOD_POST(data)
  );
  return response;
};
const getTallyLedgerAdmin = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getTallyLedgerAdmin`,
    METHOD_POST(data)
  );
  return response;
};

const deleteOrders = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}deleteOrders`,
    METHOD_POST(data)
  );
  return response;
};

const getOrderDataById = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getOrderById`,
    METHOD_POST(data)
  );
  return response;
};
const getOrderReceipt = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getOrderReceipt`,
    METHOD_POST(data)
  );
  return response;
};
const addOrderReceipt = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}addOrderReceipt`,
    METHOD_POST(data)
  );
  return response;
};
const deleteOrderReceipt = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}deleteOrdersReceipt`,
    METHOD_POST(data)
  );
  return response;
};
const getClientInvoice = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getOrdersInvoice`,
    METHOD_POST(data)
  );
  return response;
};
const addClientInvoice = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}addOrdersInvoice`,
    METHOD_POST(data)
  );
  return response;
};
const deleteClientInvoice = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}deleteOrdersInvoice`,
    METHOD_POST(data)
  );
  return response;
};
const getOrderStatusHistory = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getOrderStatusHistory`,
    METHOD_POST(data)
  );
  return response;
};
const editOrder = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}editOrders`,
    METHOD_POST(data)
  );
  return response;
};
const editOrdersReceipt = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}editOrdersReceipt`,
    METHOD_POST(data)
  );
  return response;
};

const editOrdersInvoice = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}editOrdersInvoice`,
    METHOD_POST(data)
  );
  return response;
};
// if status update == true
const addOrderStatusChange = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}addOrderStatusChange`,
    METHOD_POST(data)
  );
  return response;
};

const getVendors = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getVendors`,
    METHOD_POST(data)
  );
  return response;
};

const addVendors = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}addVendors`,
    METHOD_POST(data)
  );
  return response;
};
const deleteVendors = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}deleteVendors`,
    METHOD_POST(data)
  );
  return response;
};
const getBuildersAdmin = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getBuildersAdmin`,
    METHOD_POST(data)
  );
  return response;
};
const getProjectTypeAdmin = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getProjectTypeAdmin`,
    METHOD_POST(data)
  );
  return response;
};
const getProjectLegalStatusAdmin = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getProjectLegalStatusAdmin`,
    METHOD_POST(data)
  );
  return response;
};

const getProjectById = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getProjectById`,
    METHOD_POST(data)
  );
  return response;
};
const getVendorsInvoice = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getVendorInvoice`,
    METHOD_POST(data)
  );
  return response;
};
const addVendorsInvoice = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}addVendorInvoice`,
    METHOD_POST(data)
  );
  return response;
};

const editProject = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}editProject`,
    METHOD_POST(data)
  );
  return response;
};
const deleteVendorsInvoice = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}deleteVendorInvoice`,
    METHOD_POST(data)
  );
  return response;
};
const editVendorInvoice = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}editVendorInvoice`,
    METHOD_POST(data)
  );
  return response;
};
const getVendorCategoryAdmin = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getVendorCategoryAdmin`,
    METHOD_POST(data)
  );
  return response;
};
const getVendorPayment = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getVendorPayment`,
    METHOD_POST(data)
  );
  return response;
};
const addVendorPayment = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}addVendorPayment`,
    METHOD_POST(data)
  );
  return response;
};
const editVendorPayment = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}editVendorPayment`,
    METHOD_POST(data)
  );
  return response;
};
const deleteVendorPayment = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}deleteVendorPayment`,
    METHOD_POST(data)
  );
  return response;
};
const editVendors = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}editVendors`,
    METHOD_POST(data)
  );
  return response;
};
const addLLTenant = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}addLLTenant`,
    METHOD_POST(data)
  );
  return response;
};
const addCities = async (data) => {
  const response = await fetch(`${env_URL_SERVER}addCities`, METHOD_POST(data));
  return response;
};
const deleteCities = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}deleteCities`,
    METHOD_POST(data)
  );
  return response;
};
const editCities = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}editCities`,
    METHOD_POST(data)
  );
  return response;
};
const getBuilderContactsById = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getBuilderContactsById`,
    METHOD_POST(data)
  );
  return response;
};

const getOrderPending = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getOrderPending`,
    METHOD_POST(data)
  );
  return response;
};
const getUser = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getUserInfo`,
    METHOD_POST(data)
  );
  return response;
};
const addUser = async (data) => {
  const response = await fetch(`${env_URL_SERVER}addUser`, METHOD_POST(data));
  return response;
};
const editUser = async (data) => {
  const response = await fetch(`${env_URL_SERVER}editUser`, METHOD_POST(data));
  return response;
};
const deleteUser = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}deleteUser`,
    METHOD_POST(data)
  );

  return response;
};

const getService = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getServices`,
    METHOD_POST(data)
  );
  return response;
};
const addService = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}addService`,
    METHOD_POST(data)
  );
  return response;
};
const editService = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}editService`,
    METHOD_POST(data)
  );
  return response;
};
const deleteService = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}deleteService`,
    METHOD_POST(data)
  );

  return response;
};
const deleteLLTenant = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}deleteLLTenant`,
    METHOD_POST(data)
  );

  return response;
};
const getLLTenant = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getLLTenant`,
    METHOD_POST(data)
  );

  return response;
};
const getPaymentStatusAdmin = async(data)=>{
  const response = await fetch(
    `${env_URL_SERVER}getPaymentStatusAdmin`,
    METHOD_POST(data)
  );

  return response;
}
const getDepartmentTypeAdmin = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getDepartmentTypeAdmin`,
    METHOD_POST(data)
  );

  return response;
};
const download = async (data, filename) => {
  const response = await fetch(
    `${env_URL_SERVER}download/${filename}`,
    METHOD_POST(data)
  );
  return response;
};

const responseInterceptor = async (response) => {
  if (!response.ok) {
    // Handle HTTP errors
    const statusCode = response.status;
    if (statusCode === 400) {
      throw new Error("Bad Request: The request was invalid.");
    } else if (statusCode === 401) {
      throw new Error(
        "Unauthorized: Authentication failed or credentials are missing."
      );
    } else if (statusCode === 403) {
      throw new Error("Forbidden: Access token expired");
    } else if (statusCode === 404) {
      throw new Error("Not Found: The resource was not found.");
    } else {
      throw new Error(`HTTP Error: ${statusCode}`);
    }
  }
  let updatedResponse = await response.json();
  return { data: updatedResponse, status: 200 };
};
const resetPassword = async (data) => {
  const response = await fetch(`${env_URL_SERVER}token`, METHOD_POST(data));
  return responseInterceptor(response);
};
const changePassword = async (data, token) => {
  const response = await fetch(
    `${env_URL_SERVER}reset`,
    METHOD_POST_WITH_TOKEN(data, token)
  );
  return responseInterceptor(response);
};
const getProfessionalTypesAdmin = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getProfessionalTypesAdmin`,
    METHOD_POST(data)
  );

  return response;
}
const dashboardData = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}dashboardData`,
    METHOD_POST(data)
  );

  return response;
}
const getMandalAdmin = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}getMandalAdmin`,
    METHOD_POST(data)
  );

  return response;
}
const deleteFromTable = async (data) => {
  const response = await fetch(
    `${env_URL_SERVER}deleteFromTable`,
    METHOD_POST(data)
  );

  return response;
}
export const APIService = {
  getCountries,
  getNewBuilderInfo,
  editCountry,
  addCountries,
  getState,
  getCities,
  addNewBuilder,
  editBuilderInfo,
  deleteBuilderInfo,
  deleteCountries,
  getStatesAdmin,
  getCitiesAdmin,
  getLob,
  addLob,
  editLob,
  getBankStatement,
  editBankStatement,
  deleteBankStatement,
  getVendorAdmin,
  deleteLob,
  getEmployees,
  addEmployee,
  getLocality,
  addBankStatement,
  addLocality,
  deleteLocality,
  getModesAdmin,
  getEntityAdmin,
  getHowReceivedAdmin,
  getClientAdmin,
  addClientReceipt,
  getPayment,
  getProjectInfo,
  editLocality,
  getUsers,
  getRoles,
  deleteEmployee,
  getPaymentFor,
  getPaymentMode,
  addPayment,
  getProspects,
  addProspects,
  editProspects,
  deleteProspects,
  editEmployee,
  getItembyId,
  editPayment,
  deletePayment,
  getItemByAttr,
  getProjectsByBuilderId,
  getClientInfo,
  getClientProperty,
  getClientTypeAdmin,
  getTenantOfPropertyAdmin,
  getRelationAdmin,
  addClientInfo,
  deleteClientInfo,
  getClientInfoByClientId,
  editCLientInfo,
  getBuildersAndProjectsList,
  getPropertyStatusAdmin,
  getLevelOfFurnishingAdmin,
  getPropertyType,
  addClientProperty,
  getClientAdminPaginated,
  getClientPropertyById,
  editClientProperty,
  deleteClientProperty,
  getClientReceipt,
  getPmaAgreement,
  deleteClientReceipt,
  editClientReceipt,
  deletePmaAgreement,
  addPmaAgreement,
  getLLAgreement,
  getClientPropertyByClientId,
  getOrdersByClientId,
  editClientPMAAgreement,
  addLLAgreement,
  deleteLLAgreement,
  editClientLLAgreement,
  addProject,
  deleteProject,
  getOrder,
  addOrder,
  getOrderStatusAdmin,
  getClientPropertyAdmin,
  getServiceAdmin,
  getTallyLedgerAdmin,
  deleteOrders,
  getOrderDataById,

  getOrderReceipt,
  addOrderReceipt,
  getClientInvoice,
  deleteOrderReceipt,
  addClientInvoice,
  deleteClientInvoice,
  getOrderStatusHistory,
  editOrder,
  editOrdersReceipt,
  editOrdersInvoice,
  addOrderStatusChange,
  getVendors,
  addVendors,
  getBuildersAdmin,
  getProjectTypeAdmin,
  getProjectLegalStatusAdmin,
  deleteVendors,
  getVendorsInvoice,
  addVendorsInvoice,
  getProjectById,
  editProject,
  deleteVendorsInvoice,
  editVendorInvoice,
  getVendorCategoryAdmin,
  getVendorPayment,
  addVendorPayment,
  editVendorPayment,
  deleteVendorPayment,
  editVendors,
  addLLTenant,
  addCities,
  deleteCities,
  editCities,
  getBuilderContactsById,
  getUser,
  addUser,
  editUser,
  deleteUser,
  getOrderPending,
  getService,
  addService,
  editService,
  deleteService,
  deleteLLTenant,
  getLLTenant,
  download,
  getDepartmentTypeAdmin,
  resetPassword,
  changePassword,
  getPaymentStatusAdmin,
  getProfessionalTypesAdmin,
  dashboardData,
  getMandalAdmin,
  deleteFromTable
};
