import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles }) => {
  const { userRole } = useSelector((state) => state.auth);

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />;
  } else {
    return <Outlet />;
  }
};

export default ProtectedRoute;
