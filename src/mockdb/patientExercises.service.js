import { getDB, saveDB } from "./mockDatabase";
import { v4 as uuid } from "uuid";

export function assignExerciseToPatient({
  patientId,
  exerciseId,
  specialistId,
  notes = "",
}) {
  
  if (!patientId || !exerciseId || !specialistId) {
    throw new Error("Missing required fields");
  }

  const db = getDB();

// Check if the exercise is already assigned to the patient
  const alreadyAssigned = db.patientExercises.find(
    (pe) => String(pe.patientId) === String(patientId) && String(pe.exerciseId) === String(exerciseId)
  );

  if (alreadyAssigned) {
    throw new Error("Exercise already assigned to this patient");
  }

  const assignment = {
    id: uuid(),
    patientId,
    exerciseId,
    specialistId,
    notes,
  };

  db.patientExercises.push(assignment);
  saveDB(db);

  return assignment;
}
