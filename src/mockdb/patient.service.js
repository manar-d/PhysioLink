import { ERROR_CODES } from "../constants/error.constants";
import { getDB, saveDB } from "./mockDatabase";
import { v4 as uuid } from "uuid";

// ID Reference:
// User ID         -> users.id
// Record ID       -> patients.id , specialists.id
// Relation ID     -> patientExercises.id
// Patient User    -> patients.patientId = users.id
// Specialist User -> specialists.specialistId = users.id

// Get patients by specialist (SPECIALIST VIEW) -> specialistId = users.id
export async function getPatientsBySpecialistId(specialistId) {
  // get all specialist Patients !
  const db = getDB();

  const patients = db.patients.filter(
    (p) => String(p.specialistId) === String(specialistId)
  );

  return patients;
}

// Get specialist by patient (PATIENT VIEW) -> patientId  = users.id
export async function getSpecialistByPatient(patientId) {
  const db = getDB();
  const patient = db.patients.find(
    (p) => String(p.patientId) === String(patientId)
  );

  if (!patient) {
    throw new Error(ERROR_CODES.PT_GET_NOT_FOUND.key);
  } // there is no patient

  const specialist = db.specialists.find(
    (s) => String(s.specialistId) === String(patient.specialistId)
  );

  if (!specialist) {
    throw new Error(ERROR_CODES.PT_SPECIALIST_NOT_FOUND.key);
  }

  return specialist;
}

//Get all exercises assigned to patient -> patientId = users.id
export async function getPatientExercises(patientId) {
  const db = getDB();

  const result =  db.patientExercises
    .filter((pe) => String(pe.patientId) === String(patientId))
    .map((pe) => {
      const exercise = db.exercises.find(
        (e) => String(e.id) === String(pe.exerciseId)
      );

      if (!exercise) return null; // Exercise not found, skip this entry

      return {
        assignmentId: pe.id,
        notes: pe.notes,
        ...exercise,
      };
    })
    .filter(Boolean); // Remove null values

return result
    
}

//Get single patient exercise details -> patientId = users.id
export async function getPatientExerciseById(patientId, exerciseId) {
  const db = getDB();

  const assignment = db.patientExercises.find(
    (pe) =>
      String(pe.patientId) === String(patientId) &&
      String(pe.exerciseId) === String(exerciseId)
  );

  if (!assignment) {
    throw new Error(ERROR_CODES.PT_EXERCISE_NOT_ASSIGNED.key);
  }

  const exercise = db.exercises.find(
    (e) => String(e.id) === String(exerciseId)
  );

  if (!exercise) {
    throw new Error(ERROR_CODES.PT_EXERCISE_NOT_FOUND.key);
  }

  return {
    ...exercise,
    notes: assignment.notes,
  };
}

// Delete patient -> patientId = patients.id (Record ID)
// Only patient's specialist can delete
export async function deletePatient(userId, patientRecordId) {
  if (!patientRecordId) {
    throw new Error(ERROR_CODES.PT_DELETE_ID_REQUIRED.key);
  }

  if (!userId) {
    throw new Error(ERROR_CODES.UNAUTHORIZED.key);
  }

  const db = getDB();

  const patient = db.patients.find(
    (p) => String(p.id) === String(patientRecordId)
  );

  if (!patient) {
    throw new Error(ERROR_CODES.PT_DELETE_NOT_FOUND.key);
  }

  // Authorization check: only patient's specialist
  if (String(patient.specialistId) !== String(userId)) {
    throw new Error(ERROR_CODES.UNAUTHORIZED.key);
  }

  // 1- Delete patient record
  db.patients = db.patients.filter(
    (p) => String(p.id) !== String(patientRecordId)
  );

  // 2- Delete all related exercises (using userId) 
  db.patientExercises = db.patientExercises.filter(
    (pe) => String(pe.patientId) !== String(patient.patientId)
  );

  saveDB(db);
  return true;
}

//get patient by ID
export async function getPatientDetailsById(patientId) {
  const db = getDB();
  return db.patients.find((p) => String(p.patientId) === String(patientId));
}

// create patient
export function createPatient(patientData, userId) {
  if (!userId) {
    throw new Error(ERROR_CODES.PT_CREATE_USER_REQUIRED.key);
  }

  const db = getDB();

  const patient = {
    id: uuid(),
    patientId: userId,
    name: patientData?.name,
    age: patientData?.age, 
    gender: patientData?.gender, 
    diagnosis: patientData?.diagnosis,
    specialistId: patientData.specialistId
  };

  db.patients.push(patient);
  saveDB(db);

  return patient;
}