import axios, { Axios } from "axios";

export default axios.create({
    baseURL:"http://localhost:5173/",
    // baseURL:"http://192.168.10.133:5173/",
    // loginURL:"http://192.168.133:5152/validateCredentials"
})