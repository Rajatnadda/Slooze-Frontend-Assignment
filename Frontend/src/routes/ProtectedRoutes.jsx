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

  const normalizedRole = user.role?.toLowerCase().trim();
  const normalizedRoles = roles?.map((r) => r.toLowerCase().trim()) || [];

  if (normalizedRoles.length > 0 && normalizedRoles.includes(normalizedRole)) {
    return <Outlet />;
  }

  return <Navigate to="/unauthorized" replace />;
};

export default ProtectedRoute;
