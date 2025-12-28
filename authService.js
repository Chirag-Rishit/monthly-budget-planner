// src/services/authService.js
import api from "./api";

// ✅ Login user and store JWT token
export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login", credentials);

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user)); // optional
  }

  return response.data;
};

// ✅ Register new user
export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// ✅ Logout helper (optional)
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
