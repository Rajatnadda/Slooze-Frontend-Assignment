import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoutes";
import Layout from "./components/DashboardLayout";
import Login from "./pages/Login";

import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Unauthorized from "./pages/Unauthorized";
import Products from "./pages/Products";
import ProductForm from "./pages/ProductForm.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route
        element={<ProtectedRoute roles={["manager", "store_keeper"]} />}
      >
        <Route element={<Layout />}>
          <Route path="/products" element={<Products />} />
          <Route path="/products/add" element={<ProductForm />} />
          <Route path="/products/edit/:id" element={<ProductForm />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute roles={["manager"]} />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Route>

      <Route path="*" element={<div>404: Page Not Found</div>} />
    </Routes>
  );
}
