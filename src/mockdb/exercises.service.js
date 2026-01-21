import { ERROR_CODES } from "../constants/error.constants";
import { getDB, saveDB } from "./mockDatabase";
import { v4 as uuid } from "uuid";

// Get exercises by specialist
export async function getExercisesBySpecialist(specialistId) {
  const db = getDB();
  return db.exercises.filter(
    (e) => String(e.createdBy) === String(specialistId),
  );
}

// Get exercise details
export async function getDetailsExercisesBySpecialist(exerciseId) {
  const db = getDB();

  const exercise = db.exercises.find(
    (e) => String(e.id) === String(exerciseId),
  ); // "1" === 1

  if (!exercise) {
    throw new Error(ERROR_CODES.EX_GET_NOT_FOUND.key);
  }

  return exercise;
}

// Create exercise
export async function createExercise(exercise) {
  if (!exercise) {
    throw new Error(ERROR_CODES.EX_CREATE_INVALID_VALUES.key);
  }

  const db = getDB();

  const newExercise = {
    id: uuid(),
    title: exercise.title,
    description: exercise.description,
    image: exercise.image,
    video: exercise.video,
    difficultyId: exercise.difficultyId,
    categoryIds: Array.isArray(exercise.categoryIds)
      ? exercise.categoryIds
      : [], // ensure it's an array
    duration: exercise.duration,
    createdBy: exercise.createdBy,
  };

  db.exercises.push(newExercise);
  saveDB(db);

  return newExercise;
}

// Update exercise
export async function updateExercise(userId, exerciseId, updatedData) {
  if (!exerciseId || typeof updatedData !== "object") {
    throw new Error(ERROR_CODES.EX_UPDATE_INVALID_VALUES.key);
  }

  // Authorization check:  only creator can Edite
  if (userId !== updatedData.createdBy) {
    throw new Error(ERROR_CODES.UNAUTHORIZED.key);
  }

  const db = getDB();

  const index = db.exercises.findIndex(
    (e) => String(e.id) === String(exerciseId),
  );

  if (index === -1) {
    throw new Error(ERROR_CODES.EX_UPDATE_NOT_FOUND.key);
  }

  db.exercises[index] = { ...db.exercises[index], ...updatedData };
  saveDB(db);

  const updatedExerciseData = db.exercises[index];
  return updatedExerciseData;
}

// Delete exercise
export async function deleteExercise(userId, exerciseId) {
  
  if (!exerciseId) {
    throw new Error(ERROR_CODES.EX_DELETE_ID_REQUIRED.key); 
  }

  if (!userId) {
    throw new Error(ERROR_CODES.UNAUTHORIZED.key);
  }

  const db = getDB();

  // Check if exercise exists
  const exercise = db.exercises.find(
    (e) => String(e.id) === String(exerciseId),
  );

  if (!exercise) {
    throw new Error(ERROR_CODES.EX_DELETE_NOT_FOUND.key);
  }

  // Authorization check: only creator can delete
  if (String(exercise.createdBy) !== String(userId)) {
    throw new Error(ERROR_CODES.UNAUTHORIZED.key);
  }

  // 1- Delete exercise itself
  db.exercises = db.exercises.filter(
    (e) => String(e.id) !== String(exerciseId),
  );
  // 2️- Delete all related patient-exercise relations
  db.patientExercises = db.patientExercises.filter(
    (pe) => String(pe.exerciseId) !== String(exerciseId),
  );

  saveDB(db);
  return true;
}

// Get all exercises
export async function getAllExercises() {
  const db = getDB();
  return db.exercises || [];
}
