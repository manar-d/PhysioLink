import { useState } from "react";
import { loginPatient, loginSpecialist } from "../mockdb/auth.service";
import { useAuthContext } from "../context/AuthContext";
import { ROLE_PATIENT, ROLE_SPECIALIST, USER_KEY } from "../auth.constants";

export default function useAuth() {
  const { user, setUser } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Login
  const login = async (credentials, role) => {
    setLoading(true);
    setError("");

    try {
      let loggedUser = null;

      if (role === ROLE_PATIENT) {
        loggedUser = loginPatient(credentials.phone, credentials.password);
      } else if (role === ROLE_SPECIALIST) {
        loggedUser = loginSpecialist(credentials.email, credentials.password);
      } else {
        throw new Error("Invalid role");
      }

      if (!loggedUser) {
        throw new Error("Invalid credentials");
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

  // Logout
  const logout = () => {
    try {
      setLoading(true);
      localStorage.removeItem(USER_KEY);
      setUser(null);
    } catch (err) {
      setError("Logout failed");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Clear Error
  const clearError = () => setError("");

  return {
    user,
    role: user?.role,
    isAuthenticated: !!user, // T or F
    loading,
    error,
    login,
    logout,
    clearError,
  };
}
