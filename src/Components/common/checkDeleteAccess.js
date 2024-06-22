import { useLocation } from "react-router-dom";
import useAuth from "../../context/JwtContext";

const checkDeleteAccess = () => {
    const { user } = useAuth();
    const { pathname } = useLocation();
    
    const hasAccess = (path) => {
      // Check if the exact path is allowed
      console.log(path)
      if (user.allowedModules[path]?.delete) {
        return true;
      }
  
      // Check for dynamic route access
      let newUrl = pathname?.replace(/\/\d+$/, "") + '/';
      return Object.keys(user.allowedModules).some(
        (allowedPath) =>
          path.startsWith(allowedPath) && user?.allowedModules[newUrl]?.delete
      );
    };
    console.log(hasAccess(pathname))
    return hasAccess(pathname);
  }
export default checkDeleteAccess
