// import jwt_decode  from 'jwt-decode';
import axios from "./axios";
const env_URL_SERVER="http://192.168.10.133:8000/"



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



const login = (userData) => {
   return axios.post(`${env_URL_SERVER}validateCredentials`, userData);
}



const getUserRole = () => {
 
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


export  const authService = { logOut, getToken, setToken, getUserRole};