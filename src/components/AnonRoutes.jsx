import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const AnonRoutes = ({ children }) => {
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return <>{!isLoggedIn ? children : <Navigate to="/" replace />}</>;
};

export default AnonRoutes;
