import { getDB } from "./database";

export function getPatientsByspecialistId(specialistId) {
return specialistId;
}

// All patient exercises
export function getPatientExercises(patientId) {
  const db = getDB();

  return db.patientExercises
    .filter(pe => pe.patientId === patientId)
    .map(pe => {
      const exercise = db.exercises.find(
        e => e.id === pe.exerciseId
      );

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
    pe => pe.patientId === patientId && pe.exerciseId === exerciseId
  );

  if (!assignment) return null;

  const exercise = db.exercises.find(e => e.id === exerciseId);

  return {
    ...exercise,
    notes: assignment.notes,
  };
}
