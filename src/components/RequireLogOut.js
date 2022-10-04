import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireLogOut = () => {
    const isLoggedIn = useSelector((state) => state.user.loggedIn);
    const location = useLocation();

    return isLoggedIn ? (
        <Navigate to="/" state={{ from: location }} replace />
    ) : (
        <Outlet />
    );
};

export default RequireLogOut;
