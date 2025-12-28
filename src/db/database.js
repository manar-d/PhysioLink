const DB_KEY = "physiolink_db";

const defaultDB = {
  users: [
    {
      id: 1,
      role: "patient",
      name: "Manar",
      phone: "0500000000",
      password: "password123",
    },
    {
      id: 2,
      role: "specialist",
      name: "Dr Munira",
      email: "doc@test.com",
      password: "password123",
    },
    {
      id: 3,
      role: "specialist",
      name: "Dr Ahmed",
      email: "test@test.com",
      password: "password123",
    },
  ],

  patients: [
    {
      id: 1,
      patientId: 1,
      name: "Manar",
      phone: "0500000000",
    },
  ],

  specialists: [
    {
      id: 1,
      specialistId: 2,
      name: "Dr Munira",
      email: "doc@test.com",
    },
    {
      id: 2,
      specialistId: 3,
      name: "Dr Ahmed",
      email: "test@test.com",
    },
  ],

  exercises: [
    {
      id: 1,
      title: "Knee Stretch",
      description: "Stretching exercise for knee flexibility",
      // image:
      //   "https://columbiaclinic.us/wp-content/uploads/2020/11/physical-therapy.jpg",
      difficulty: "Beginner",
      category: "Knee",
      createdBy: 2,
    },
    {
      id: 2,
      title: "Leg Raise",
      description: "Strengthening exercise for legs",
      // image:
      //   "https://columbiaclinic.us/wp-content/uploads/2020/11/physical-therapy.jpg",
      difficulty: "Intermediate",
      category: "Sport",
      createdBy: 2,
    },
    {
      id: 3,
      title: "Arm Circles",
      description: "Warm-up exercise for arms",
      // image:
      //   "https://columbiaclinic.us/wp-content/uploads/2020/11/physical-therapy.jpg",
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
