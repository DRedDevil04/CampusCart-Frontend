import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ()=>{
    const UserInfo = useSelector((state)=> state.auth.userInfo);
    return UserInfo ? <Outlet /> : <Navigate to='/login' replace />
}

export default ProtectedRoute;