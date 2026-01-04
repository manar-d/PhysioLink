import { useState } from "react";
import { loginPatient, loginSpecialist } from "../mockdb/auth.service";
import { useAuthContext } from "../context/AuthContext";

const USER_KEY = "user";

export default function useAuth() {
  const { user, setUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Login
  const login = async (credentials, role) => {
    setLoading(true);
    setError("");

    try {
      let loggedUser;

      if (role === "patient") {
        loggedUser = loginPatient(credentials.phone, credentials.password);
      }

      if (role === "specialist") {
        loggedUser = loginSpecialist(credentials.email, credentials.password);
      }

      if (!loggedUser) {
        throw new Error("Login failed");
      }

      localStorage.setItem(USER_KEY, JSON.stringify(loggedUser));
      setUser(loggedUser);

      return loggedUser;
    } catch (err) {
      setError(err.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  //Logout
  const logout = () => {
    localStorage.removeItem(USER_KEY);
    setUser(null);
  };

  const clearError = () => setError("");

  return {
    user,
    role: user?.role,
    isAuthenticated: !!user, // T or F
    loading,
    login,
    logout,
    error,
    clearError,
  };
}
