import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../CustomeHooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    // const hasrole = auth && Object.values(auth.role).some(role => allowedRoles.includes(role));
     const hasrole = allowedRoles.includes(auth?.role);
    // const hasrole = Object.keys(auth?.role || {}).some(role => allowedRoles.includes(auth?.role[role]));
    console.log(auth?.role);
    // console.log(hasrole);
    return (
        hasrole
        // auth?.role?.find(role => allowedRoles?.includes(role))
            ? <Outlet /> //if the roles match, renders child components
            : auth?.token
                ? <Navigate to="/Unauthorized" state={{ from: location }} replace />
                : <Navigate to="/Login" state={{ from: location }} replace />
    );
}

export default RequireAuth;