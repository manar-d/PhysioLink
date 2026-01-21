import { useState } from "react";
import {
  loginPatient,
  loginSpecialist,
  resetPassword,
} from "../mockdb/auth.service";
import {
  ROLE_PATIENT,
  ROLE_SPECIALIST,
  USER_KEY,
} from "../constants/auth.constants";
import { useAuthContext } from "./useAuthContext";
import { ERROR_CODES } from "../constants/error.constants";

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
        setError(ERROR_CODES.AUTH_LOGIN_INVALID_ROLE.key);
      }

      if (!loggedUser) {
        setError(ERROR_CODES.AUTH_LOGIN_INVALID_CREDENTIALS.key);
      }

      localStorage.setItem(USER_KEY, JSON.stringify(loggedUser));
      setUser(loggedUser);

      return loggedUser;
    } catch (err) {
      setError(err.message || ERROR_CODES.AUTH_LOGIN_FAILED.key);
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
      setError(err || ERROR_CODES.AUTH_LOGOUT_FAILED.key);
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async ({ oldPassword, newPassword }) => {
    if (!user) {
      throw new Error(ERROR_CODES.AUTH_UNAUTHORIZED.key);
    }

    setLoading(true);
    setError("");

    try {
      resetPassword(user.id, oldPassword, newPassword);
      return true;
    } catch (err) {
      setError(err.message || ERROR_CODES.AUTH_REST_FAIALED);
      throw err;
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
    changePassword,
    clearError,
  };
}
