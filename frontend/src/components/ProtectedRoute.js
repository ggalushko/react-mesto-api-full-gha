import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, loggedIn }) => {
  return loggedIn ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
