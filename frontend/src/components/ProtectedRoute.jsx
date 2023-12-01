import { Navigate } from "react-router-dom";
import Outlet from "../layout/Outlet";
import toast from "react-hot-toast";

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("tokenUser");

  if (!token) {
    toast.error("Debes iniciar sesión para acceder a esta página");
    return <Navigate to="/user  " replace />;
  }

  return children ? children : <Outlet />;
};
