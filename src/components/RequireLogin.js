import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireLogin = () => {
    const isLoggedIn = useSelector((state) => state.user.loggedIn);
    const location = useLocation();

    return isLoggedIn ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequireLogin;
