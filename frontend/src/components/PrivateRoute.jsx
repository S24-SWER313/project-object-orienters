import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";


const PrivateRoute = () => {
  const token = useAuth();
  if (token) return <Outlet />;
  return <Navigate to="/login" />;
};

export default PrivateRoute;