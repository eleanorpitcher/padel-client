import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const PrivateRoutes = ({ children }) => {
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return <>{isLoggedIn ? children : <Navigate to="/login" replace />}</>;
};

export default PrivateRoutes;
