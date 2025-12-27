import { getDB, saveDB } from "./database";
import { v4 as uuid } from "uuid";

// Specialist exercises
export function getExercisesBySpecialist(specialistId) {
  const db = getDB();
  return db.exercises.filter((e) => e.createdBy === specialistId);
}

// Specialist exercise details
export function getDetailsExercisesBySpecialist(exerciseId) {
  const db = getDB();
  const exercise = db.exercises.find((e) => String(e.id) === exerciseId); // "1" === 1
  return exercise;
}

// Create exercise
export function createExercise(exercise) {
  const db = getDB();

  const newExercise = {
    id: uuid(),
    ...exercise,
  };

  db.exercises.push(newExercise);
  saveDB(db);
  return newExercise;
}

// Update exercise
export function updateExercise(exerciseId, updatedData) {
  const db = getDB();

  db.exercises = db.exercises.map((e) =>
    String(e.id) === String(exerciseId) ? { ...e, ...updatedData } : e
  );
  const updatedExerciseData = db.exercises.find(
    (e) => String(e.id) === String(exerciseId)
  );

  saveDB(db);

  return updatedExerciseData;
}

// Delete exercise
export function deleteExercise(exerciseId) {
  const db = getDB();

  db.exercises = db.exercises.filter((e) => e.id !== exerciseId);
  saveDB(db);
  return true;
}
