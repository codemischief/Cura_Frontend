// import jwt_decode  from 'jwt-decode';
import axios from '../Components/Config/axios';
import Login from '../Components/Login/Login';



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
   return axios.post("http://192.168.10.133:8000/validateCredentials", userData);
}



const getUserRole = () => {
   const data= Login.getUserId()
   console.log(data);
   const role = fetch('http://192.168.10.133:8000/getRoleId', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
   if(token){
       const payLoad = token;
       return payLoad?.role;
   }
   return "1";
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


export  const authService = { logOut, getToken, setToken, getUserRole, login};