import axios from "axios";
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" }
});

API.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem("token"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("Error setting Authorization header:", error);
  }
  return config;
}, (error) => {
    return Promise.reject(error);
});

export default API;