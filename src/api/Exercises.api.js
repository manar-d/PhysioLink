import api from "./axios";
import { v4 as uuid } from "uuid";

/* Mock Database */

// التمارين (يسويها الأخصائي)
let exercises = [
  {
    id: 1,
    title: "Knee Stretch",
    description: "Stretching exercise for knee flexibility",
    difficulty: "Beginner", // Beginner | Intermediate | Advanced
    category: "Knee", // Knee | Women | Sport
    createdBy: 2, // specialistId
  },
  {
    id: 2,
    title: "Leg Raise",
    description: "Strengthening exercise for legs",
    difficulty: "Intermediate",
    category: "Sport",
    createdBy: 2,
  },
  {
    id: 3,
    title: "Arm Circles",
    description: "Warm-up exercise for arms",
    difficulty: "Beginner",
    category: "Women",
    createdBy: 2,
  }
];

// تعيين التمارين للمرضى + ملاحظات
let patientExercises = [
  {
    id: 1,
    exerciseId: 1,
    patientId: 1,
    specialistId: 10,
    notes: "Slow movement, twice daily",
  },
    {
    id: 2,
    exerciseId: 2,
    patientId: 1,
    specialistId: 10,
    notes: "testtt, twice daily",
  }
];

/* Specialist APIs */

// بـ id ارجاع تمارين الأخصائي
export function getExercisesBySpecialist(specialistId) {
  return api.get("/exercises", {
    adapter: async () => ({
      status: 200,
      data: exercises.filter((e) => e.createdBy === specialistId),
    }),
  });
}

// إنشاء تمرين
export function createExercise(exercise) {
  const newExercise = {
    ...exercise,
    id: uuid(),
  };

  exercises.push(newExercise);

  return api.post("/exercises", {
    adapter: async () => ({
      status: 201,
      data: newExercise,
    }),
  });
}

//  تعديل تمرين
export function updateExercise(exerciseId, updatedData) {
  exercises = exercises.map((e) =>
    e.id === exerciseId ? { ...e, ...updatedData } : e
  );

  return api.put(`/exercises/${exerciseId}`, {
    adapter: async () => ({
      status: 200,
      data: exercises.find((e) => e.id === exerciseId),
    }),
  });
}

//  حذف تمرين
export function deleteExercise(exerciseId) {
  exercises = exercises.filter((e) => e.id !== exerciseId);

  return api.delete(`/exercises/${exerciseId}`, {
    adapter: async () => ({
      status: 200,
      data: { success: true },
    }),
  });
}

//  تعيين تمرين لمريض + ملاحظات
export function assignExerciseToPatient({
  exerciseId,
  patientId,
  specialistId,
  notes,
}) {
  const assignment = {
    id: uuid(),
    exerciseId,
    patientId,
    specialistId,
    notes,
  };

  patientExercises.push(assignment);

  return api.post("/patient-exercises", {
    adapter: async () => ({
      status: 201,
      data: assignment,
    }),
  });
}

/* need for patient.api.js */
  
export function __getMockData() {
  return { exercises, patientExercises };
}
