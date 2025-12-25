import api from "./axios";
import { mockUsers } from "./mockData";

// mock users
// fake database
const users = [
  { id: 1, role: "patient", phone: "0500000000", name: "Manar" },
  {
    id: 2,
    role: "specialist",
    name: "Dr Ahmed",
    email: "doc@test.com",
    password: "password123",
  },
    {
    id: 3,
    role: "specialist",
    name: "Dr Munira",
    email: "test@test.com",
    password: "password123",
  },
];

export function loginPatient(phone, password) {
  return api.get("/login", {
    adapter: async () => {
      const user = users.find((u) => u.phone === phone && u.role === "patient" && u.password === password);

      if (!user) {
        return {
          status: 401,
          data: { message: "Patient not found" },
        };
      }

      return {
        status: 200,
        data: user,
      };
    },
  });
}

export function loginSpecialist(email, password) {
  return api.get("/login", {
    adapter: async () => { 
      const user = users.find(
        (u) => u.email === email && u.role === "specialist" && u.password === password
      );


      if (!user) {
        return {
          status: 401,
          data: { message: "specialist not found" },
        };
      }
      return {
        status: 200,
        data: user,
      };
    },
  });
}
