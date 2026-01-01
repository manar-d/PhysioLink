import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

/** If no role is provided, the user is considered
 *  a visitor (home)
 */

export default function PrivateRoute({ role, children }) {
  const { user, isAuthenticated } = useAuth();

  // If the user is not logged in, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If the user is logged in but NOT authorized, redirect to home
  if (role && user.role !== role) {
    // Example: if a patient tries to access a specialist page
    return <Navigate to="/" replace />;
  }

  // allow access
  return children;
}
