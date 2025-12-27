import api from "./axios";
import { __getMockData } from "./Exercises.api";

/*  Patient APIs (Read Only) */

// Get all patient exercises with notes
export function getPatientExercises(patientId) {
  const { exercises, patientExercises } = __getMockData();

  const data = patientExercises
    .filter((pe) => pe.patientId === patientId) // Search for all exercises linked to the patient
    .map((pe) => { // To map and return the required data
      const exercise = exercises.find((e) => e.id === pe.exerciseId); // Get exercise details
      return { // Finaly return data structure
        assignmentId: pe.id,
        notes: pe.notes,
        ...exercise,
      };
    });

  // console.log(data);

  return api.get("/patient/exercises", {
    adapter: async () => ({
      status: 200,
      data,
    }),
  });
}

// Get single exercise (details)
export function getPatientExerciseById(patientId, exerciseId) {
  const { exercises, patientExercises } = __getMockData();

  const assignment = patientExercises.find(
    (pe) => pe.patientId === patientId && pe.exerciseId === exerciseId
  );

  if (!assignment) {
    return api.get("/patient/exercise", {
      adapter: async () => ({
        status: 404,
        data: { message: "Exercise not found" },
      }),
    });
  }

  const exercise = exercises.find((e) => e.id === exerciseId);


  return api.get("/patient/exercise", {
    adapter: async () => ({
      status: 200,
      data: {
        ...exercise,
        notes: assignment.notes, // To customize the patient exercise page with specialist notes
      },
    }),
  });
}
