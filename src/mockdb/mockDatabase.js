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
      diagnosis: "Post-ACL Reconstruction Surgery",
      specialistId: 2,
    },
    {
      id: 2,
      patientId: 4,
      name: "Osama Al-Khalid",
      diagnosis: "Chronic Lower Back Pain (L4-L5)",
      specialistId: 2,
    },
  ],

  specialists: [
    {
      id: 1,
      specialistId: 2,
      name: "PT. Munira Mohammed",
      specialty: "Sports Physical Therapy",
      image: "https://www.nomadnurse.co.uk/assets/disk-T2C7KaVH.png",
      bio: "Specialized in sports injuries and post-surgical rehabilitation.",
      experience: "15+ years",
    },
    {
      id: 2,
      specialistId: 3,
      name: "PT. Ahmed Ali",
      specialty: "Orthopedic & Spine Rehabilitation",
      image:
        "https://laredowellness.com/storage/2024/06/dr.dagobarto-laredo-TX.webp",
      bio: "Expert in manual therapy and chronic pain management.",
      experience: "10+ years",
    },
    {
      id: 3,
      specialistId: 5,
      name: "PT. Laura Mitchell",
      specialty: "Pediatric Physiotherapist",
      image:
        "https://physioplus.ae/wp-content/uploads/2024/09/Sondos-1200x1800.jpg",
      bio: "Passionate about helping children achieve their developmental milestones.",
      experience: "12+ years",
    },
    {
      id: 4,
      specialistId: 6,
      name: "PT. Mohammed Amer",
      specialty: "Neurological Physiotherapist",
      image:
        "https://puredentalspa.com/wp-content/uploads/2023/01/Dr.-Amer-Shammaa-ortho-scaled-e1684422835473-779x1024.jpg",
      bio: "Specializing in neurological rehabilitation and stroke recovery.",
      experience: "18+ years",
    },
  ],

  exercises: [
    {
      id: 1,
      title: "Isometric Quad Sets",
      description:
        "Static contraction of the quadriceps muscle to improve knee stability without joint movement.",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070",
      video: "https://www.youtube.com/embed/MT1iBQ1RZc4", // embed link
      difficulty: "beginner",
      categories: ["knee"],  
      duration: "15 minutes",
      createdBy: 2,
    },
    {
      id: 2,
      title: "Glute Bridges",
      description:
        "Strengthens the gluteal muscles and core while improving hip mobility.",
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2040",
      video: "https://www.youtube.com/embed/MT1iBQ1RZc4",
      difficulty: "intermediate",
       categories: ["knee", "sport"],     
      duration: "20 minutes",
      createdBy: 2,
    },
    {
      id: 3,
      title: "Scapular Squeezes",
      description:
        "Retraction of the shoulder blades to improve posture and upper back strength.",
      image:
        "https://images.unsplash.com/photo-1645005512968-0c1fe99f0093?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGh5c2lvdGhlcmFweXxlbnwwfHwwfHx8MA%3D%3D",
      video: "https://www.youtube.com/embed/MT1iBQ1RZc4",
      difficulty: "beginner",
      categories: ["knee"],      
      duration: "90 minutes",
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
    },
    {
      id: 2,
      exerciseId: 2,
      patientId: 1,
      specialistId: 2,
      notes: "Keep your core tight and avoid arching your back.",
    },
    {
      id: 3,
      exerciseId: 2,
      patientId: 4,
      specialistId: 2,
      notes: "Slow movement, twice daily , ten time",
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
  return JSON.parse(data);
}

export function saveDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}
