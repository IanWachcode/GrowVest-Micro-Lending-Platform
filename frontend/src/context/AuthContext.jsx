// context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import api from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch logged-in user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data); // set user if logged in
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Login function
  const login = async ({ email, password }) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const { token, ...userData } = res.data;
      setUser(userData); // update user in context
      localStorage.setItem("token", token); // save token
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || err.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token"); // if using token
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
