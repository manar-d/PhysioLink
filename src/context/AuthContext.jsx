import { createContext, useContext, useState } from "react";
import { USER_KEY } from "../auth.constants";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (err) {
      console.error("Invalid user in storage:", err);
      localStorage.removeItem(USER_KEY);
      return null;
    }
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
