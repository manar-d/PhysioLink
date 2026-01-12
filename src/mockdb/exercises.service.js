import { getDB, saveDB } from "./mockDatabase";
import { v4 as uuid } from "uuid";

// Get exercises by specialist
export async function getExercisesBySpecialist(specialistId) {
  const db = getDB();
  return db.exercises.filter((e) => e.createdBy === specialistId);
}

// Get exercise details
export async function getDetailsExercisesBySpecialist(exerciseId) {
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
export async function createExercise(exercise) {
  if (!exercise) {
    throw new Error("Invalid values");
  }

  const db = getDB();

  const newExercise = {
    id: uuid(),
    title: exercise.title,
    description: exercise.description,
    image: exercise.image,
    video: exercise.video,
    difficulty: exercise.difficulty,
    categories: Array.isArray(exercise.categories) ? exercise.categories : [], // ensure it's an array
    duration: exercise.duration,
    createdBy: exercise.createdBy,
  };

  db.exercises.push(newExercise);
  saveDB(db);

  return newExercise;
}

// Update exercise
export async function updateExercise(exerciseId, updatedData) {
  if (!exerciseId || typeof updatedData !== "object") {
    throw new Error("Invalid values");
  }

  const db = getDB();

  const index = db.exercises.findIndex(
    (e) => String(e.id) === String(exerciseId)
  );

  if (index === -1) {
    throw new Error("Exercise not found");
  }

  db.exercises[index] = { ...db.exercises[index], ...updatedData };
  saveDB(db);

  const updatedExerciseData = db.exercises[index];
  return updatedExerciseData;
}

// Delete exercise
export async function deleteExercise(exerciseId) {
  if (!exerciseId) {
    throw new Error("Exercise ID is required");
  }

  const db = getDB();
  // Check if exercise exists
  const exists = db.exercises.some((e) => String(e.id) === String(exerciseId)); //if you found one return T ealse F

  if (!exists) {
    throw new Error("Exercise does not exist");
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

// Get all exercises
export async function getAllExercises() {
  const db = getDB();
  return db.exercises || [];
}

// // Get All exercises only or with filters
// export async function getExercises({
//   search,
//   category,
//   difficulty,
//   limit,
// } = {}) {
//   const db = getDB();
//   let output = db.exercises || [];

//   // Search by title
//   if (search) {
//     const input = search.toLowerCase();
//     output = output.filter(exercise =>
//       exercise.title.toLowerCase().includes(input)
//     );
//   }

//   // Category filter ("All" / "Knee" / "Women" / "Sport"/...)
//   if (category && category !== "All") {
//     output = output.filter(exercise => exercise.category === category);
//   }

//   // Difficulty filter (All / Beginner / Intermediate / Advanced)
//   if (difficulty && difficulty !== "All") {
//     output = output.filter(exercise => exercise.difficulty === difficulty);
//   }

//   // Limit for home page
//   if (limit) {
//     output = output.slice(0, limit);
//   }

//   return output;
// }
