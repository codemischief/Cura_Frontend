// import jwt_decode  from 'jwt-decode';
import { useState } from "react";
import axios from "./axios";
const env_URL_SERVER=import.meta.env.VITE_ENV_URL_SERVER




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
   // const response =await  axios.post(`${env_URL_SERVER}validateCredentials`, userData);
   // localStorage.setItem("Role" ,response.data.role_id);
   // localStorage.setItem("User_id" ,response.data.user_id);
   // return response.data;
}



const getUserRole = () => {
  const Role_id =localStorage.getItem("Role");
  return Role_id;
}

const getUserID = () => {
   const User_id =localStorage.getItem("User_id");
   return User_id;
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
   localStorage.clear();
}


export  const authService = { logOut, getToken, setToken, getUserRole,login, getUserID};