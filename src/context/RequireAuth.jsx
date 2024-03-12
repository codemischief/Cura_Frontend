import { useLocation,Navigate,Outlet } from "react-router";
import useAuth from "./useAuth";
// import Dashboard from "../Components/Dashboard/Dashboard";


const RequireAuth = ({allowedRoles}) =>{
    const {auth} = useAuth();

    const location = useLocation();
console.log(auth?.roles)
    // return (auth?.roles?.find(role => allowedRoles.includes(role))) ? <Outlet/> :<Navigate to="" />
    return (allowedRoles == 1) ? <Outlet /> :<Navigate to="" />
//    return ( (allowedRoles == 1)
//     ? <Outlet />
//     : auth?.user
//         ? <Navigate to="/*" state={{ from: location }} replace />
//         : <Navigate to="/login" state={{ from: location }} replace />);


}

export default RequireAuth;