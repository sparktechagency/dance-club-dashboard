import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {

    const user = useSelector((state) => state.auth.user);
    // console.log(user, "user from private route");

    return user ? <Outlet /> : <Navigate to="/sign-in" />
};

export default PrivateRoute;