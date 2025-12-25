const DB_KEY = "physiolink_db";

const defaultDB = { 
    
  exercises: [
    {
      id: 1,
      title: "Knee Stretch",
      description: "Stretching exercise for knee flexibility",
      difficulty: "Beginner",
      category: "Knee",
      createdBy: 2,
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
    },
  ],

  patientExercises: [
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
    },
  ],
};

export function initDB() {
  if (!localStorage.getItem(DB_KEY)) {
    localStorage.setItem(DB_KEY, JSON.stringify(defaultDB));
  }
}

export function getDB() {
  const data = localStorage.getItem(DB_KEY);
//   if (!data) {
//     localStorage.setItem(DB_KEY, JSON.stringify(defaultDB));
//     return defaultDB;
//   }
  return JSON.parse(data);
}

export function saveDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}
