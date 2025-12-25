import api from "./axios";
import { __getMockData } from "./Exercises.api";

/*  Patient APIs (Read Only) */

//  ارجاع كل تمارين المريض مع الملاحظات
export function getPatientExercises(patientId) {
  const { exercises, patientExercises } = __getMockData();

  const data = patientExercises
    .filter(pe => pe.patientId === patientId) // يدور على كل التمارين المرتبطه بالمريض 
    .map(pe => { // عشان نطبع البيانات المطلوبة 
      const exercise = exercises.find(e => e.id === pe.exerciseId); // يجيب تفاصيل التمرين
      return { // النهاية يطلع البيانات المطلوبة
        assignmentId: pe.id,
        notes: pe.notes,
        ...exercise,
      };
    });
    
console.log(data);

//      patientExercises OBJECT
//   {
//     id: 1,
//     exerciseId: 1,
//     patientId: 1,
//     specialistId: 10,
//     notes: "Slow movement, twice daily",
//   } 

  return api.get("/patient/exercises", {
    adapter: async () => ({
      status: 200,
      data,
    }),
  });
}

//  ارجاع تمرين واحد (تفاصيل)
export function getPatientExerciseById(patientId, exerciseId) {
  const { exercises, patientExercises } = __getMockData();

  const assignment = patientExercises.find(
    pe => pe.patientId === patientId && pe.exerciseId === exerciseId
  );

// console.log("----- assignment from getPatientExerciseById ----- ", assignment);

  if (!assignment) {
    return api.get("/patient/exercise", {
      adapter: async () => ({
        status: 404,
        data: { message: "Exercise not found" },
      }),
    });
  }

const exercise = exercises.find(e => e.id === exerciseId);

// console.log("----- exercise from getPatientExerciseById ----- ", exercise);

  return api.get("/patient/exercise", {
    adapter: async () => ({
      status: 200,
      data: {
        ...exercise,
        notes: assignment.notes, // عشان اخصص صفحة تمارين المريض بالملاحظات الاخصائي
      },
    }),
  });
}
