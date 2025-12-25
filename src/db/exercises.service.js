import { getDB, saveDB } from "./database";
import { v4 as uuid } from "uuid";

//  تمارين الأخصائي
export function getExercisesBySpecialist(specialistId) {
  const db = getDB();
  return db.exercises.filter((e) => e.createdBy === specialistId);
}

//  تفاصيل تمارين الأخصائي
export function getDetailsExercisesBySpecialist(exerciseId) {
  const db = getDB();
  const exercise = db.exercises.find((e) => String(e.id) === exerciseId); // "1" === 1
  return exercise;
}

//  إنشاء تمرين
export function createExercise(exercise) {
  const db = getDB();

  const newExercise = {
    id: uuid(),
    ...exercise, 
  };

  db.exercises.push(newExercise); 
  saveDB(db);
//   console.log("----- newExercise from createExercise ----- ", newExercise);
  return newExercise;
}

//  تعديل تمرين
export function updateExercise(exerciseId, updatedData) {
  const db = getDB();

  console.log("----- exerciseId from exerciseId, updatedDatae ----- ", exerciseId, updatedData);

  db.exercises = db.exercises.map((e) =>
    String(e.id) === String(exerciseId) ? { ...e, ...updatedData } : e
  );
  const updatedExerciseData = db.exercises.find((e) => String(e.id) === String(exerciseId));
  console.log("----- exerciseId from updateExercise ----- ", updatedExerciseData);

  saveDB(db);

  return updatedExerciseData;
}

//  حذف تمرين
export function deleteExercise(exerciseId) {
  const db = getDB();

  db.exercises = db.exercises.filter((e) => e.id !== exerciseId);
  saveDB(db);
  console.log("----- exerciseId from deleteExercise ----- ", db.exercises);
  return true;
}
