import { getDB, saveDB } from "./mockDatabase";
import { ROLE_PATIENT, ROLE_SPECIALIST } from "../auth.constants";
import { comparePassword, hashPassword } from "../utils/password.utils";
import { v4 as uuid } from "uuid";

//save user without save password
function sanitizeUser(user) {
  const { password: _password, ...safeUser } = user; //Object Destructuring
  return safeUser;
}

// Login Patient
export function loginPatient(phone, password) {
  const db = getDB();

  const user = db.users.find(
    (u) => u.phone === phone && u.role === ROLE_PATIENT
  );

  if (!user) return null;

  const isValid = comparePassword(password, user.password);
  if (!isValid) return null;

  return sanitizeUser(user);
}

// Login Specialist
export function loginSpecialist(email, password) {
  const db = getDB();

  const user = db.users.find(
    (u) => u.email === email && u.role === ROLE_SPECIALIST
  );

  if (!user) return null;
  const isValid = comparePassword(password, user.password);

  if (!isValid) return null;

  return sanitizeUser(user);
}



export function resetPassword(userId, oldPassword, newPassword) {
  const db = getDB();

  const user = db.users.find((u) => u.id === userId);
  if (!user) {
    throw new Error("User not found");
  }

  //verify old password
  const isValid = comparePassword(oldPassword, user.password);
  if (!isValid) {
    throw new Error("Current password is incorrect");
  }

  //update password (hash new one)
  user.password = hashPassword(newPassword);

  saveDB(db);

  return true;
}


export function createUserForPatient({ phone, name }) {
  if (!phone) {
    throw new Error("Phone is required");
  }

  const db = getDB();

  // prevent duplicate patient users
  const exists = db.users.find(
    (u) => u.role === "patient" && u.phone === phone
  );

  if (exists) {
    throw new Error("user already exists");
  }

  const user = {
    id: uuid(),
    role: "patient",
    name: name,
    phone: phone,
    password: `password${phone}`,
  };

  db.users.push(user);
  saveDB(db);

  return user;
}
