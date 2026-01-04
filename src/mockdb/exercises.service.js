import { getDB, saveDB } from "./mockDatabase";
import { v4 as uuid } from "uuid";

// Specialist exercises
export function getExercisesBySpecialist(specialistId) {
  const db = getDB();
  return db.exercises.filter((e) => e.createdBy === specialistId);
}

// Specialist exercise details
export function getDetailsExercisesBySpecialist(exerciseId) {
  const db = getDB();
  const exercise = db.exercises.find(
    (e) => String(e.id) === String(exerciseId)
  ); // "1" === 1
  if (!exercise) {
    throw new Error("Exercise not found");
  }
  return exercise;
}

// Create exercise
export function createExercise(exercise) {
  if (!exercise) {
    throw new Error("Invalid values");
  }

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
  if (!exerciseId || typeof updatedData !== "object") {
    throw new Error("Invalid values");
  }

  const db = getDB();

  db.exercises = db.exercises.map((e) =>
    String(e.id) === String(exerciseId) ? { ...e, ...updatedData } : e
  );

  saveDB(db);

  const updatedExerciseData = db.exercises.find(
    (e) => String(e.id) === String(exerciseId)
  );

  return updatedExerciseData;
}

// Delete exercise
export function deleteExercise(exerciseId) {
  if (!exerciseId) {
    throw new Error("Exercise ID is required");
  }

  const db = getDB();

  // تحقق من وجود التمرين
  const exists = db.exercises.some((e) => String(e.id) === String(exerciseId)); //if you found one return T ealse F

  if (!exists) {
    throw new Error(`Exercise does not exist`);
  }

  // 1- Delete exercise itself
  db.exercises = db.exercises.filter(
    (e) => String(e.id) !== String(exerciseId)
  );

  // 2️- Delete all related patient-exercise relations
  db.patientExercises = db.patientExercises.filter(
    (pe) => String(pe.exerciseId) !== String(exerciseId)
  );

  saveDB(db);
  return true;
}
