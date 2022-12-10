import { Navigate } from "react-router-dom";
import { useUserAuth } from "../../store/auth-context";

const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
