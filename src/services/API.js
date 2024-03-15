

const env_URL_SERVER = "http://192.168.10.133:8000/"
const env_URL_LOCAL = "http://192.168.10.133:8000/"
const API = {
  "LOGIN": "$env_URL_SERVERvalidateCredentials",

}

const USER_ID = "";
const METHOD_POST = (data) => ({
  method: 'POST',
  body: JSON.stringify(data),
  headers: {
    'Content-Type': 'application/json'
  }
});



const getCountries = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getCountries`, METHOD_POST(data));
  return response;
}
const getState = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getStates`, METHOD_POST(data));
  return response;
}
const getCity = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getCities`, METHOD_POST(data));
  return response;
}

const addCountries = async (data) => {
  const response = await fetch(`${env_URL_SERVER}addCountry`, METHOD_POST(data));
  return response;
}
const editCountry = async (data) => {
  const response = await fetch(`${env_URL_SERVER}editCountry`, METHOD_POST(data));
  return response;
}
const deleteCountry = async (data) => {
  const response = await fetch(`${env_URL_SERVER}deleteCountry`, METHOD_POST(data));
  return response;
}
const getNewBuilderInfo = async (data) => {
  const response = await fetch(`${env_URL_SERVER}getBuilderInfo`, METHOD_POST(data));
  return response;
}




export const APIService = { getCountries, getNewBuilderInfo, editCountry, deleteCountry, addCountries, getState, getCity };