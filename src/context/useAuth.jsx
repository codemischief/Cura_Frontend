import { useContext } from "react";
import AuthContext, { AuthProvider } from "./AuthProvider";


const useAuth = () => {
    return useContext(AuthContext);

}

export default useAuth;