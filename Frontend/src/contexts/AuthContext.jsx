import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [dataVersion, setDataVersion] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserJson = localStorage.getItem("user");

    if (storedToken && storedUserJson) {
      try {
        const storedUser = JSON.parse(storedUserJson);
        setUser(storedUser);
      } catch (e) {
        console.error("Failed to parse user data. Clearing storage.", e);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    setReady(true);
  }, []);

  const login = async (payload) => {
    try {
      const res = await API.post("/auth/login", payload);
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);

      if (user.role === "manager") {
        navigate("/dashboard");
      } else {
        navigate("/products");
      }
      return true;
    } catch (error) {
      throw error;
    }
  };

  const register = async (payload) => {
    const res = await API.post("/auth/register", payload);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };
  const triggerDataRefresh = () => {
    setDataVersion((prev) => prev + 1);
  };

  const contextValue = {
    isAuthenticated: !!user,
    user,
    login,
    register,
    logout,
    ready,
    dataVersion,
    triggerDataRefresh,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
