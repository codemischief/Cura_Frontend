import { useLocation,Navigate,Outlet } from "react-router";
// import useAuth from "./useAuth";
import { APIService } from "../services/API";
import { authService } from "../services/authServices";
// import Dashboard from "../Components/Dashboard/Dashboard";


const RequireAuth = () =>{
    // const {auth} = useAuth();

    const location = useLocation();
    // return (auth?.roles?.find(role => allowedRoles.includes(role))) ? <Outlet/> :<Navigate to="" />
        return (authService.getUserRole() == 1) ? <Outlet /> :<Navigate to="" />
//    return ( (allowedRoles == 1)
//     ? <Outlet />
//     : auth?.user
//         ? <Navigate to="/*" state={{ from: location }} replace />
//         : <Navigate to="/login" state={{ from: location }} replace />);


}

export default RequireAuth;