// import jwt_decode  from 'jwt-decode';
import { useState } from "react";
import axios from "./axios";
const env_URL_SERVER="http://192.168.10.133:8000/"
// const env_URL_SERVER="http://192.168.10.183:8000/"



const setToken = (token) => {
       localStorage.setItem('token' ,token);
};


const getToken = ()=> {
   const token = localStorage.getItem('token');
   if(token){
       return token;
   }
   return null;
}



const login = async (userData) => {
   const response =await  axios.post(`${env_URL_SERVER}validateCredentials`, userData);
   sessionStorage.setItem("Role_ID" ,response.data.role_id);
   sessionStorage.setItem("User_ID" ,response.data.user_id);
   return response.data;
}



const getUserRole = () => {
  const Role_id =sessionStorage.getItem("Role_ID");
  return Role_id;
}

const getUserId = () => {
   const User_ID =sessionStorage.getItem("User_ID");
   return User_ID;
 }

// const isLoggedIn = () => {
//    const token = getToken();
//    if(token){
//        const payLoad = jwt_decode(token);
//        const isLogin = Date.now() < payLoad.exp * 1000;
//        return isLogin;

//    }
// }

const logOut = ()=> {
   sessionStorage.clear();
}


export  const authService = { logOut, getToken, setToken, getUserRole,login, getUserId};