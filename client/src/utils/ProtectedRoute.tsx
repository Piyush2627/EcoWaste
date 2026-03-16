import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated, getUserRole } from "./auth";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const isAuth = isAuthenticated();

  if (!isAuth) {
    // If no token or expired, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // If roles are specified, check if user has permission
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = getUserRole();
    if (!userRole || !allowedRoles.includes(userRole)) {
      // If user logs in but tries to access admin, kick them back to home
      return <Navigate to="/" replace />;
    }
  }

  // User is authenticated and authorized
  return <Outlet />;
};

export default ProtectedRoute;
