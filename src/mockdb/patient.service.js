import { getDB, saveDB } from "./mockDatabase";

export function getPatientsByspecialistId(specialistId) {
  // get all specialist Patients !
  const db = getDB();

  const patients = db.patients.filter(
    (p) => String(p.specialistId) === String(specialistId)
  );

  return patients;
}

export function getSpecialistByPatient(patientId) {
  const db = getDB();
  const patient = db.patients.find(
    (p) => String(p.patientId) === String(patientId)
  );

  if (!patient) return null; // there is no patient

  return db.specialists.find(
    (s) => String(s.specialistId) === String(patient.specialistId)
  );
}

// All patient exercises
export function getPatientExercises(patientId) {
  const db = getDB();

  return db.patientExercises
    .filter((pe) => pe.patientId === patientId)
    .map((pe) => {
      const exercise = db.exercises.find((e) => e.id === pe.exerciseId);

      return {
        assignmentId: pe.id,
        notes: pe.notes,
        ...exercise,
      };
    });
}

// Single patient exercise (details)
export function getPatientExerciseById(patientId, exerciseId) {
  const db = getDB();

  const assignment = db.patientExercises.find(
    (pe) => pe.patientId === patientId && pe.exerciseId === exerciseId
  );

  if (!assignment) {
    throw new Error("There is no exercise is assigned to this patient");
  }

  const exercise = db.exercises.find((e) => e.id === exerciseId);

  return {
    ...exercise,
    notes: assignment.notes,
  };
}

// Delete patient
export function deletePatient(patientId) {
  if (!patientId) {
    throw new Error("Exercise ID is required");
  }

  const db = getDB();

  // 1- Delete patient itself
  db.patients = db.patients.filter(
    (e) => String(e.patientId) !== String(patientId)
  );

  // 2️- Delete all related patient-exercise relations
  db.patientExercises = db.patientExercises.filter(
    (pe) => String(pe.patientId) !== String(patientId)
  );

  saveDB(db);

  return true;
}
