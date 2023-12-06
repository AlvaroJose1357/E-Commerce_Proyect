import { Navigate } from "react-router-dom";
import Outlet from "../layout/Outlet";
import toast from "react-hot-toast";

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("tokenUser");

  if (!token) {
    return <Navigate to="/user  " replace />;
  }

  return children ? children : <Outlet />;
};
