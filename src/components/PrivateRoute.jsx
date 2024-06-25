import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ()=>{
    const UserInfo = useSelector((state)=> state.auth.userInfo);
    return UserInfo ? <Outlet /> : <Navigate to='/login' replace />
}

export default PrivateRoute;