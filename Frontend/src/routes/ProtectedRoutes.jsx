import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ roles }) => {
  const { user, ready } = useAuth();

  if (!ready) {
    return null;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return roles && roles.includes(user.role) ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" replace />
  );
};

export default ProtectedRoute;
