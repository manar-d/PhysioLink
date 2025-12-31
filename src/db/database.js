const DB_KEY = "physiolink_db";

const defaultDB = {
  users: [
    {
      id: 1,
      role: "patient",
      name: "Manar Al-Shiha",
      phone: "0500000000",
      password: "password123",
    },
    {
      id: 2,
      role: "specialist",
      name: "PT. Munira Mohammed",
      email: "doc@test.com",
      password: "password123",
    },
    {
      id: 3,
      role: "specialist",
      name: "PT. Ahmed Ali",
      email: "test@test.com",
      password: "password123",
    },
    {
      id: 4,
      role: "patient",
      name: "Osama Al-Khalid",
      phone: "0550000000",
      password: "password123",
    },
  ],

  patients: [
    {
      id: 1,
      patientId: 1,
      name: "Manar Al-Shiha",
      phone: "0500000000",
      diagnosis: "Post-ACL Reconstruction Surgery", 
      specialistId: 2,
    },
    {
      id: 2,
      patientId: 4,
      name: "Osama Al-Khalid",
      phone: "0550000000",
      diagnosis: "Chronic Lower Back Pain (L4-L5)",
      specialistId: 2,
    },
  ],

  specialists: [
    {
      id: 1,
      specialistId: 2,
      name: "Dr. Munira Mohammed",
      email: "doc@test.com",
      specialty: "Sports Physical Therapy",
      bio: "Specialized in sports injuries and post-surgical rehabilitation.",
    },
    {
      id: 2,
      specialistId: 3,
      name: "Dr. Ahmed Ali",
      email: "test@test.com",
      specialty: "Orthopedic & Spine Rehabilitation",
      bio: "Expert in manual therapy and chronic pain management.",
    },
  ],

  exercises: [
    {
      id: 1,
      title: "Isometric Quad Sets",
      description: "Static contraction of the quadriceps muscle to improve knee stability without joint movement.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070",
      video: "https://www.youtube.com/embed/MT1iBQ1RZc4", // embed link
      difficulty: "Beginner",
      category: "Knee",
      createdBy: 2,
    },
    {
      id: 2,
      title: "Glute Bridges",
      description: "Strengthens the gluteal muscles and core while improving hip mobility.",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2040",
      video: "https://www.youtube.com/embed/MT1iBQ1RZc4",
      difficulty: "Intermediate",
      category: "Women",
      createdBy: 2,
    },
    {
      id: 3,
      title: "Scapular Squeezes",
      description: "Retraction of the shoulder blades to improve posture and upper back strength.",
      image: "https://images.unsplash.com/photo-1645005512968-0c1fe99f0093?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGh5c2lvdGhlcmFweXxlbnwwfHwwfHx8MA%3D%3D",
      video: "https://www.youtube.com/embed/MT1iBQ1RZc4",
      difficulty: "Beginner",
      category: "Sport",
      createdBy: 3,
    },
  ],

  patientExercises: [
    {
      id: 1,
      exerciseId: 1,
      patientId: 1,
      specialistId: 2,
      notes:
        "Perform slowly, hold each contraction for 10 seconds. Twice daily.",
      instructions: "",
    },
    {
      id: 2,
      exerciseId: 2,
      patientId: 1,
      specialistId: 2,
      notes: "Keep your core tight and avoid arching your back.",
      instructions: "",
    },
    {
      id: 3,
      exerciseId: 2,
      patientId: 4,
      specialistId: 2,
      notes: "Slow movement, twice daily , ten time",
      instructions: "",
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
