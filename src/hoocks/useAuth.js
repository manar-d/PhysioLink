import { useState } from "react";
import { loginPatient, loginSpecialist } from "../db/auth.service";
import { useAuthContext } from "../context/AuthContext";

const USER_KEY = "user";

export default function useAuth() {
  const { user, setUser } = useAuthContext();
  const [loading, setLoading] = useState(false);

  // Login
  const login = async (credentials, role) => {
    setLoading(true);
// setTimeout(() => {  //test loading
    let loggedUser;

    if (role === "patient") {
      loggedUser = loginPatient(credentials.phone, credentials.password);
    }

    if (role === "specialist") {
      loggedUser = loginSpecialist(credentials.email, credentials.password);
    }

    localStorage.setItem(USER_KEY, JSON.stringify(loggedUser));
    setUser(loggedUser);

    setLoading(false); 
    // }, 5000); // test loading

    return loggedUser;
  };

  //Logout
  const logout = () => {
    localStorage.removeItem(USER_KEY);
    setUser(null);
  };

  return {
    user,
    role: user?.role,
    isAuthenticated: !!user, // T or F
    loading,
    login,
    logout,
  };
}
