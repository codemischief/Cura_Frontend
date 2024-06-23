import { getToken, setAccessToken } from "../utils/axios";
import { redirectToLogin } from "./setNavigation";
import { toast } from "react-toastify";
let toastShown = false;
const env_URL_SERVER = import.meta.env.VITE_ENV_URL_SERVER;


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
  return handleResponse(response, { url:`${env_URL_SERVER}getCountries`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getStates`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getStatesAdmin`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getCitiesAdmin`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getCities`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}addCountry`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}editCountry`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getNewBuilderInfo`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}addBuilderInfo`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}editBuilder`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}deleteBuilderInfo`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}deleteCountry`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getLob`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}addLob`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}deleteLob`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}editLob`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getBankSt`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}addBankSt`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}editBankSt`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}deleteBankSt`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getVendorAdmin`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getEmployee`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}addEmployee`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getLocality`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getClientAdmin`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}deleteLocality`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getEntityAdmin`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getModesAdmin`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}addLocality`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getHowReceivedAdmin`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}addClientReceipt`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getPayment`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getProjects`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}editLocality`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getUsers`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getRolesAdmin`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}deleteEmployee`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}addPayment`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}deletePayment`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}editPayment`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}paymentForAdmin`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getModesAdmin`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getResearchProspect`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}addResearchProspect`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}editResearchProspecta`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}deleteResearchProspect`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}editEmployee`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getItembyId`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getItemByAttr`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getProjectsByBuilderId`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getClientInfo`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getClientProperty`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getClientTypeAdmin`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getTenantOfPropertyAdmin`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getRelationAdmin`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}addClientInfo`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}deleteClientInfo`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getClientInfoByClientId`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}editClientInfo`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getBuildersAndProjectsList`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getPropertyStatusAdmin`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getLevelOfFurnishingAdmin`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getPropertyType`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}addClientProperty`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getClientAdminPaginated`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getClientPropertyById`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}editClientProperty`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}deleteClientProperty`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getClientReceipt`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getClientPMAAgreement`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}deleteClientReceipt`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}editClientReceipt`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}deleteClientPMAAgreement`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  });    // localStorage.removeItem("accessToken");
  // localStorage.removeItem("user");
  // localStorage.removeItem("idleTimeOut");
  return handleResponse(response, { url:`${env_URL_SERVER}addClientPMAAgreement`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getClientLLAgreement`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}addClientLLAgreement`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}deleteClientLLAgreement`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getClientPropertyByClientId`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getOrdersByClientId`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}editClientPMAAgreement`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}editClientLLAgreement`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}addProject`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}deleteProject`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getOrders`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}addOrders`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getOrderStatusAdmin`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getClientPropertyAdmin`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getServiceAdmin`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getTallyLedgerAdmin`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}deleteOrders`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getOrderById`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getOrderReceipt`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}addOrderReceipt`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}deleteOrdersReceipt`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getOrdersInvoice`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}addOrdersInvoice`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}deleteOrdersInvoice`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getOrderStatusHistory`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}editOrders`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}editOrdersReceipt`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}editOrdersInvoice`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}addOrderStatusChange`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getVendors`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}addVendors`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}deleteVendors`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getBuildersAdmin`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getProjectTypeAdmin`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getProjectLegalStatusAdmin`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getProjectById`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getVendorInvoice`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}addVendorInvoice`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}editProject`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}deleteVendorInvoice`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}editVendorInvoice`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getVendorCategoryAdmin`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getVendorPayment`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}addVendorPayment`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}editVendorPayment`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}deleteVendorPayment`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}editVendors`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}addLLTenant`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}addCities`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}deleteCities`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}editCities`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getBuilderContactsById`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getOrderPending`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getUserInfo`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}addUser`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}editUser`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}deleteUser`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getServices`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}addService`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}editService`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}deleteService`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}deleteLLTenant`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getLLTenant`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getPaymentStatusAdmin`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getDepartmentTypeAdmin`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}download/${filename}`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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

const refreshToken = async () => {
  const token = getToken();
  const refresh_token = localStorage.getItem("refreshToken");
  const userId = JSON.parse(localStorage.getItem("user"))?.id;


  const response = await fetch(`${env_URL_SERVER}refreshToken`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
      refreshtoken: refresh_token
    },
    body: JSON.stringify({ user_id: userId })
  });

  const data = await response.json();


  if (response.ok) {
    localStorage.setItem("accessToken", data.data.token)
    setAccessToken(data.data.token); // Update the access token
    return data.data.token
  } else {
    setTimeout(() => (toastShown = false), 1000); // Reset after 1 second
      toast.error("Unauthorized")
      setAccessToken(null);
      localStorage.clear();
      redirectToLogin();
    
    throw new Error("Failed to refresh token");
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
  return handleResponse(response, { url:`${env_URL_SERVER}getProfessionalTypesAdmin`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
};

export const handleResponse = async (response,retryData) => {
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
      const newAccessToken = await refreshToken();
      // Retry the request with new token
      const retryResponse = await fetch(retryData.url, {
        method: retryData.method,
        headers: {
          ...retryData.headers,
          Authorization: `Bearer ${newAccessToken}`,
        },
        body: retryData.body,
      });

      return handleResponse(retryResponse, retryData);

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
  return handleResponse(response, { url:`${env_URL_SERVER}dashboardData`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) })
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
  return handleResponse(response, { url:`${env_URL_SERVER}getMandalAdmin`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}deleteFromTable`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getGroupsAdmin`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getCompanyKey`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}changeCompanyKey`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}getCollegeTypesAdmin`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}deleteFromClient`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
  return handleResponse(response, { url:`${env_URL_SERVER}deleteFromOrders`, method: "POST", headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  }, body: JSON.stringify(data) });
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
