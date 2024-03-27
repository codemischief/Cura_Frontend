

const env_URL_SERVER=import.meta.env.VITE_ENV_URL_SERVER
// const env_URL_SERVER="http://192.168.10.183:8000/"
const API={
    "LOGIN":"$env_URL_SERVERvalidateCredentials",

}

const USER_ID="";
const METHOD_POST = (data) => ({
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  });



const getCountries= async (data)=> {
    const response = await fetch(`${env_URL_SERVER}getCountries`, METHOD_POST(data));
  return response;
 }
const getState= async (data)=> {
    const response = await fetch(`${env_URL_SERVER}getStates`, METHOD_POST(data));
  return response;
 }
 const getStatesAdmin= async (data)=> {
  const response = await fetch(`${env_URL_SERVER}getStatesAdmin`, METHOD_POST(data));
return response;
}
const getCitiesAdmin= async (data)=> {
  const response = await fetch(`${env_URL_SERVER}getCitiesAdmin`, METHOD_POST(data));
return response;
}
 const getCities = async (data) => {
    const response = await fetch(`${env_URL_SERVER}getCities`, METHOD_POST(data));
    return response;
 }

 const addCountries= async (data)=> {
    const response = await fetch(`${env_URL_SERVER}addCountry`, METHOD_POST(data));
    return response;
 }
 const editCountry= async (data)=> {
    const response = await fetch(`${env_URL_SERVER}editCountry`, METHOD_POST(data));
    return response;
 } 
 const getNewBuilderInfo= async (data)=> {
    const response = await fetch(`${env_URL_SERVER}getBuilderInfo`, METHOD_POST(data));
  return response;
 }
 const addNewBuilder =async (data) => {
  const response = await fetch(`${env_URL_SERVER}addBuilderInfo`, METHOD_POST(data));
  return response;
 }
 const editBuilderInfo = async (data) => {
  const response = await fetch(`${env_URL_SERVER}editBuilder`, METHOD_POST(data));
  return response;
 }
 const deleteBuilderInfo = async (data) => {
  const response = await fetch(`${env_URL_SERVER}deleteBuilder`, METHOD_POST(data));
  return response;
 }
 const deleteCountries = async (data) => {
  const response = await fetch(`${env_URL_SERVER}deleteCountry`, METHOD_POST(data));
  return response;
 }
 const getLob = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getLob`, METHOD_POST(data));
  return response;
 }
 const addLob = async (data) => {
  const response = await fetch(`${env_URL_SERVER}addLob`, METHOD_POST(data));
  return response;
 }
 const deleteLob = async (data) => {
  const response = await fetch(`${env_URL_SERVER}deleteLob`, METHOD_POST(data));
  return response;
 }
 const editLob = async (data) => {
  const response = await fetch(`${env_URL_SERVER}editLob`, METHOD_POST(data));
  return response;
 }
 const getBankStatement = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getBankSt`, METHOD_POST(data));
  return response;
 }
 const addBankStatement = async (data) => {
  const response = await fetch(`${env_URL_SERVER}addBankSt`, METHOD_POST(data));
  return response;
 }
 const editBankStatement = async (data) => {
  const response = await fetch(`${env_URL_SERVER}editBankSt`, METHOD_POST(data));
  return response;
 }

 const deleteBankStatement = async (data) => {
  const response = await fetch(`${env_URL_SERVER}deleteBankSt`, METHOD_POST(data));
  return response;
 }

 const getVendorAdmin = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getVendorAdmin`, METHOD_POST(data));
  return response;
 }

 const getEmployees = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getEmployee`, METHOD_POST(data));
  return response;
 }
 const addEmployee = async (data) => {
  const response = await fetch(`${env_URL_SERVER}addEmployee`, METHOD_POST(data));
  return response;
 }
 const getLocality = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getLocality`, METHOD_POST(data));
  return response;
 }
 const getClientAdmin = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getClientAdmin`, METHOD_POST(data));
  return response;
 }
 const deleteLocality = async (data) => {
  const response = await fetch(`${env_URL_SERVER}deleteLocality`, METHOD_POST(data));
  return response;
 }
 const getEntityAdmin = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getEntityAdmin`, METHOD_POST(data));
  return response;
 }
 const getModesAdmin = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getModesAdmin`, METHOD_POST(data));
  return response;
 }

 const addLocality = async (data) => {
  const response = await fetch(`${env_URL_SERVER}addLocality`, METHOD_POST(data));
  return response;
 }

 const getHowReceivedAdmin = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getHowReceivedAdmin`, METHOD_POST(data));
  return response;
 }
 const addClientReceipt = async (data) => {
  const response = await fetch(`${env_URL_SERVER}addClientReceipt`, METHOD_POST(data));
  return response;
 }
 const getPayment = async  (data) => {
  const response = await fetch(`${env_URL_SERVER}getPayments`, METHOD_POST(data));
  return response;
 }
 const getProjectInfo = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getProjects`, METHOD_POST(data));
  return response;
 }
 const editLocality = async (data) => {
  const response = await fetch(`${env_URL_SERVER}editLocality`, METHOD_POST(data));
  return response;
 }
 const getUsers = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getUsersAdmin`, METHOD_POST(data));
  return response;
 }
 const getRoles = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getRolesAdmin`, METHOD_POST(data));
  return response;
 }
 const deleteEmployee = async (data) => {
  const response = await fetch(`${env_URL_SERVER}deleteEmployee`, METHOD_POST(data));
  return response;
 }
 const addPayment = async (data) => {
  const response = await fetch(`${env_URL_SERVER}addPayment`, METHOD_POST(data));
  return response;
 }
 const getPaymentFor = async (data) => {
  const response = await fetch(`${env_URL_SERVER}paymentForAdmin`, METHOD_POST(data));
  return response;
 }
 const getPaymentMode = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getModesAdmin`, METHOD_POST(data));
  return response;
 }
 const getProspects = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getResearchProspect`, METHOD_POST(data));
  return response;
 }
 const addProspects = async (data) => {
  const response = await fetch(`${env_URL_SERVER}addResearchProspect`, METHOD_POST(data));
  return response;
 }
 const editProspects = async (data) => {
  const response = await fetch(`${env_URL_SERVER}editResearchProspect`, METHOD_POST(data));
  return response;
 }
 const deleteProspects = async (data) => {
  const response = await fetch(`${env_URL_SERVER}deleteResearchProspect`, METHOD_POST(data));
  return response;
 }
 const editEmployee = async (data) => {
  const response = await fetch(`${env_URL_SERVER}editEmployee`, METHOD_POST(data));
  return response;
 }
 const getItembyId = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getItembyId`, METHOD_POST(data));
  return response;
 }
 export  const APIService = { getCountries, getNewBuilderInfo, editCountry, addCountries, getState, getCities,addNewBuilder,editBuilderInfo,deleteBuilderInfo,deleteCountries,
  getStatesAdmin, getCitiesAdmin,getLob,addLob,editLob,getBankStatement, editBankStatement,deleteBankStatement,getVendorAdmin,deleteLob,getEmployees,addEmployee,
  getLocality,addBankStatement,addLocality,deleteLocality,getModesAdmin,getEntityAdmin,getHowReceivedAdmin,getClientAdmin,addClientReceipt,getPayment,getProjectInfo,editLocality,getUsers,getRoles,deleteEmployee,getPaymentFor,getPaymentMode,addPayment,getProspects,addProspects,editProspects,deleteProspects,editEmployee,getItembyId};
  
