import { getDB, saveDB } from "./database";
import { v4 as uuid } from "uuid";

export function assignExerciseToPatient({
  exerciseId,
  patientId,
  specialistId,
  notes,
}) {
  const db = getDB();

  const alreadyAssigned = db.patientExercises.find(
    (pe) => pe.patientId === patientId && pe.exerciseId === exerciseId
  );

  if (alreadyAssigned) {
    throw new Error("This exercise is already assigned to this patient");
  }

  const assignment = {
    id: uuid(),
    exerciseId,
    patientId,
    specialistId,
    notes,
  };

  db.patientExercises.push(assignment);
  saveDB(db);

  return assignment;
}
