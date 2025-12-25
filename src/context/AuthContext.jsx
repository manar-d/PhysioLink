import { createContext, useContext, useEffect, useState } from "react";
import { loginPatient, loginSpecialist } from "../api/auth.api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();


  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  async function handleLoginPatient(phone) {
    const res = await loginPatient(phone);
    setUser(res.data);
    sessionStorage.setItem("user", JSON.stringify(res.data));
    navigate("/patient");
  }

  async function handleLoginSpecialist(email) {
    const res = await loginSpecialist(email);
    setUser(res.data);
    sessionStorage.setItem("user", JSON.stringify(res.data));
    navigate("/specialist");
  }

  function logout() {
    setUser(null);
    sessionStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginPatient: handleLoginPatient,
        loginSpecialist: handleLoginSpecialist,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
