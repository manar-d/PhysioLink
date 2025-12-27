import { getDB } from "./database";


//save user without save password
function sanitizeUser(user) {
  const { password, ...safeUser } = user; //Object Destructuring
  return safeUser;
}

// Login Patient
export function loginPatient(phone, password) {
  const db = getDB();

  const user = db.users.find(
    (u) =>
      u.role === "patient" &&
      u.phone === phone &&
      u.password === password
  );

  if (!user) {
    throw new Error("Patient not found or invalid credentials");
  }

  return sanitizeUser(user);
}

//Login Specialist
export function loginSpecialist(email, password) {
  const db = getDB();

  const user = db.users.find(
    (u) =>
      u.role === "specialist" &&
      u.email === email &&
      u.password === password
  );

  if (!user) {
    throw new Error("Specialist not found or invalid credentials");
  }

  return sanitizeUser(user);
}


