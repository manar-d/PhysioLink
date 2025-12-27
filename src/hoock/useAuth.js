import { useState } from "react";
import { loginPatient, loginSpecialist } from "../db/auth.service";

const USER_KEY = "user";

export default function useAuth() {
  const [user, setUser] = useState(() => { //lazy initialization
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  // Login 
  const login = async (credentials, role) => {
    let loggedUser;

    if (role === "patient") {
      loggedUser = loginPatient(
        credentials.phone,
        credentials.password
      );
    }

    if (role === "specialist") {
      loggedUser = loginSpecialist(
        credentials.email,
        credentials.password
      );
    }

    localStorage.setItem(USER_KEY, JSON.stringify(loggedUser));
    setUser(loggedUser);

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
    login,
    logout,
  };
}
