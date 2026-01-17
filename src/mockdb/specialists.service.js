import { getDB } from "./mockDatabase";

// Get all specialists 
export async function getAllSpecialists() {
  const db = getDB();
  return db.specialists || [];
}

// Get specialist by ID
export async function getSpecialistDetailsById(specialistId) {
  const db = getDB();               
  return db.specialists.find(specialist => String(specialist.specialistId) === String(specialistId));
}
