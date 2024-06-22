import { getToken, setAccessToken } from "../utils/axios";
import { redirectToLogin } from "./setNavigation";
import { toast } from "react-toastify";
let toastShown = false;
const env_URL_SERVER = import.meta.env.VITE_ENV_URL_SERVER;

const API = {
  LOGIN: "$env_URL_SERVERvalidateCredentials",
};

const userId = 1234;

const METHOD_POST = (data) => {
  const accessToken = getToken();
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  };
};

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
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getCountries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getState = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getStates`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getStatesAdmin = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getStatesAdmin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getCitiesAdmin = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getCitiesAdmin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getCities = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getCities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const addCountries = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}addCountry`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const editCountry = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}editCountry`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getNewBuilderInfo = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getBuilderInfo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const addNewBuilder = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}addBuilderInfo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const editBuilderInfo = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}editBuilder`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const deleteBuilderInfo = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}deleteBuilder`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const deleteCountries = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}deleteCountry`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getLob = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getLob`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const addLob = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}addLob`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const deleteLob = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}deleteLob`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const editLob = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}editLob`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getBankStatement = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getBankSt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const addBankStatement = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}addBankSt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const editBankStatement = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}editBankSt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const deleteBankStatement = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}deleteBankSt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getVendorAdmin = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getVendorAdmin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getEmployees = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getEmployee`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const addEmployee = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}addEmployee`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getLocality = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getLocality`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getClientAdmin = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getClientAdmin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const deleteLocality = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}deleteLocality`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getEntityAdmin = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getEntityAdmin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getModesAdmin = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getModesAdmin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const addLocality = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}addLocality`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getHowReceivedAdmin = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getHowReceivedAdmin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const addClientReceipt = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}addClientReceipt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getPayment = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getPayments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getProjectInfo = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getProjects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const editLocality = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}editLocality`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getUsers = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getUsersAdmin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getRoles = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getRolesAdmin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const deleteEmployee = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}deleteEmployee`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const addPayment = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}addPayment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const deletePayment = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}deletePayment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const editPayment = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}editPayment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getPaymentFor = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}paymentForAdmin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getPaymentMode = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getModesAdmin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getProspects = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getResearchProspect`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const addProspects = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}addResearchProspect`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const editProspects = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}editResearchProspecta`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const deleteProspects = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}deleteResearchProspect`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const editEmployee = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}editEmployee`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getItembyId = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getItembyId`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getItemByAttr = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getItemByAttr`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getProjectsByBuilderId = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getProjectsByBuilderId`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getClientInfo = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getClientInfo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getClientProperty = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getClientProperty`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ ...data, routename: "temp" }),
  });
  return handleResponse(response);
};

const getClientTypeAdmin = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getClientTypeAdmin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getTenantOfPropertyAdmin = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getTenantOfPropertyAdmin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getRelationAdmin = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getRelationAdmin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const addClientInfo = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}addClientInfo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const deleteClientInfo = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}deleteClientInfo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getClientInfoByClientId = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getClientInfoByClientId`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const editCLientInfo = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}editClientInfo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getBuildersAndProjectsList = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getBuildersAndProjectsList`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getPropertyStatusAdmin = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getPropertyStatusAdmin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getLevelOfFurnishingAdmin = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getLevelOfFurnishingAdmin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getPropertyType = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getPropertyType`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const addClientProperty = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}addClientProperty`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getClientAdminPaginated = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getClientAdminPaginated`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getClientPropertyById = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getClientPropertyById`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const editClientProperty = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}editClientProperty`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const deleteClientProperty = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}deleteClientProperty`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getClientReceipt = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getClientReceipt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getPmaAgreement = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getClientPMAAgreement`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const deleteClientReceipt = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}deleteClientReceipt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const editClientReceipt = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}editClientReceipt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const deletePmaAgreement = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}deleteClientPMAAgreement`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const addPmaAgreement = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}addClientPMAAgreement`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getLLAgreement = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getClientLLAgreement`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const addLLAgreement = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}addClientLLAgreement`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const deleteLLAgreement = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}deleteClientLLAgreement`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getClientPropertyByClientId = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getClientPropertyByClientId`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getOrdersByClientId = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getOrdersByClientId`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const editClientPMAAgreement = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}editClientPMAAgreement`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const editClientLLAgreement = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}editClientLLAgreement`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const addProject = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}addProject`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const deleteProject = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}deleteProject`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getOrder = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getOrders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const addOrder = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}addOrders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getOrderStatusAdmin = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getOrderStatusAdmin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getClientPropertyAdmin = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getClientPropertyAdmin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getServiceAdmin = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getServiceAdmin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getTallyLedgerAdmin = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getTallyLedgerAdmin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const deleteOrders = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}deleteOrders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getOrderDataById = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getOrderById`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getOrderReceipt = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getOrderReceipt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const addOrderReceipt = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}addOrderReceipt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const deleteOrderReceipt = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}deleteOrdersReceipt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getClientInvoice = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getOrdersInvoice`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const addClientInvoice = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}addOrdersInvoice`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const deleteClientInvoice = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}deleteOrdersInvoice`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getOrderStatusHistory = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getOrderStatusHistory`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const editOrder = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}editOrders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const editOrdersReceipt = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}editOrdersReceipt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const editOrdersInvoice = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}editOrdersInvoice`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

// if status update == true
const addOrderStatusChange = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}addOrderStatusChange`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getVendors = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getVendors`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const addVendors = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}addVendors`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const deleteVendors = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}deleteVendors`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getBuildersAdmin = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getBuildersAdmin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getProjectTypeAdmin = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getProjectTypeAdmin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getProjectLegalStatusAdmin = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getProjectLegalStatusAdmin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getProjectById = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getProjectById`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getVendorsInvoice = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getVendorInvoice`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const addVendorsInvoice = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}addVendorInvoice`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const editProject = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}editProject`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const deleteVendorsInvoice = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}deleteVendorInvoice`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const editVendorInvoice = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}editVendorInvoice`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getVendorCategoryAdmin = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getVendorCategoryAdmin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getVendorPayment = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getVendorPayment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const addVendorPayment = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}addVendorPayment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const editVendorPayment = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}editVendorPayment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const deleteVendorPayment = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}deleteVendorPayment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const editVendors = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}editVendors`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const addLLTenant = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}addLLTenant`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const addCities = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}addCities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const deleteCities = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}deleteCities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const editCities = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}editCities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getBuilderContactsById = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getBuilderContactsById`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getOrderPending = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getOrderPending`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getUser = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getUserInfo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const addUser = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}addUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const editUser = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}editUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const deleteUser = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}deleteUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getService = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getServices`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const addService = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}addService`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const editService = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}editService`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const deleteService = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}deleteService`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const deleteLLTenant = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}deleteLLTenant`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getLLTenant = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getLLTenant`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getPaymentStatusAdmin = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getPaymentStatusAdmin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getDepartmentTypeAdmin = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getDepartmentTypeAdmin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const download = async (data, filename) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}download/${filename}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const logOut = async () => {
  const refreshToken = localStorage.getItem("refreshToken")
  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  const response = await fetch(`${env_URL_SERVER}logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "RefreshToken": refreshToken,
    },
    body: JSON.stringify({ "user_id": userId })

  });
  return response

}

const responseInterceptor = async (response) => {
  console.log(response)
  if (!response.ok) {
    // Handle HTTP errors
    const statusCode = response.status;
    if (statusCode === 400) {
      if (!toastShown) {
        toastShown = true;
        setTimeout(() => (toastShown = false), 1000); // Reset after 1 second
        toast.error("Bad Request: The request was invalid.");
      }
      throw new Error("Bad Request: The request was invalid.");
    } else if (statusCode === 401) {
      if (!toastShown) {
        toastShown = true;
        setTimeout(() => (toastShown = false), 1000); // Reset after 1 second
        toast.error(
          "Unauthorized: Authentication failed or credentials are missing."
        );
      }
      throw new Error(
        "Unauthorized: Authentication failed or credentials are missing."
      );
    } else if (response.status === 498) {
      if (!toastShown) {
        toastShown = true;
        setTimeout(() => (toastShown = false), 1000); // Reset after 1 second
        toast.error("Unauthorized");
        setAccessToken(null)
        localStorage.clear();
        redirectToLogin(); // Redirect to login page
        return;


      }
    } else if (statusCode === 403) {
      if (!toastShown) {
        toastShown = true;
        setTimeout(() => (toastShown = false), 1000); // Reset after 1 second
        toast.error("Forbidden: Access token expired");
      }
      throw new Error("Forbidden: Access token expired");
    } else if (statusCode === 404) {
      if (!toastShown) {
        toastShown = true;
        setTimeout(() => (toastShown = false), 1000); // Reset after 1 second
        toast.error("Not Found: The resource was not found.");
      }
      throw new Error("Not Found: The resource was not found.");
    } else {
      if (!toastShown) {
        toastShown = true;
        setTimeout(() => (toastShown = false), 1000); // Reset after 1 second
        toast.error(`HTTP Error: ${statusCode}`);
      }
      throw new Error(`HTTP Error: ${statusCode}`);
    }
  }
  let updatedResponse = await response.json();
  return { data: updatedResponse, status: 200 };
};

const resetPassword = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return responseInterceptor(response);
};

const changePassword = async (data, token) => {

  const response = await fetch(`${env_URL_SERVER}changePassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  const responseData = await response.json();

  if (response.status === 200) {
    return responseData; // Return the parsed data
  } else if (response.status === 401) {
    throw new Error(responseData.detail);
  } else if (response.status === 498) {
    setAccessToken(null)
    localStorage.clear();
    redirectToLogin();
    return;


  } else {
    throw new Error(responseData.detail || "An error occurred");
  }

};

const resetOldPassword = async (data, token) => {

  const response = await fetch(
    `${env_URL_SERVER}reset`,
    METHOD_POST_WITH_TOKEN(data, token)
  );

  const responseData = await response.json(); // Parse the response body as JSON

  if (response.status === 200) {
    return responseData; // Return the parsed data
  } else if (response.status === 401) {
    throw new Error(responseData.detail);
  } else if (response.status === 498) {
    setAccessToken(null)
    localStorage.clear();
    redirectToLogin();
    return;

  } else {
    throw new Error(responseData.detail || "An error occurred");
  }

};

const getProfessionalTypesAdmin = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getProfessionalTypesAdmin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

export const handleResponse = async (response) => {
  if (response.ok) return response;

  // Handle HTTP errors
  const statusCode = response.status;
  const errorMessages = {
    400: "Bad Request: The request was invalid.",
    401: "Unauthorized: Authentication failed or credentials are missing.",
    403: "Forbidden: Access token expired",
    404: "Not Found: The resource was not found.",
    498: "Unauthorized"
  };
  const showToast = (message) => {
    if (!toastShown) {
      toastShown = true;
      setTimeout(() => (toastShown = false), 1000); // Reset after 1 second
      toast.error(message);
    }
  };

  if (statusCode in errorMessages) {
    showToast(errorMessages[statusCode]);

    if (statusCode === 498) {
      setAccessToken(null)
      localStorage.clear();
      redirectToLogin();
      return;

    }
    throw new Error(errorMessages[statusCode]);
  } else {
    const message = await response.json()
    showToast(`${message.detail}`);
    throw new Error(`HTTP Error: ${statusCode}${message.detail}`);
  }
};

const dashboardData = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}dashboardData`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getMandalAdmin = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getMandalAdmin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const deleteFromTable = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}deleteFromTable`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getGroupsAdmin = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getGroupsAdmin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const getCompanyKey = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getCompanyKey`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const changeCompanyKey = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}changeCompanyKey`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};
const getCollegeTypesAdmin = async (data) => {
  const accessToken = getToken();
  const response = await fetch(`${env_URL_SERVER}getCollegeTypesAdmin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}
const deleteFromClient = async (data) => {
  const accessToken = getToken();

  const response = await fetch(`${env_URL_SERVER}deleteFromClient`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}
const deleteFromOrders = async (data) => {
  const accessToken = getToken();

  const response = await fetch(`${env_URL_SERVER}deleteFromOrders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
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
  resetOldPassword,
  getPaymentStatusAdmin,
  getProfessionalTypesAdmin,
  dashboardData,
  getMandalAdmin,
  deleteFromTable,
  getGroupsAdmin,
  getCompanyKey,
  changeCompanyKey,
  getCollegeTypesAdmin,
  deleteFromClient,
  deleteFromOrders,
  logOut
};
