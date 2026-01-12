import { getDB, saveDB } from "./mockDatabase";

// ID Reference:
// User ID         -> users.id
// Record ID       -> patients.id , specialists.id
// Relation ID     -> patientExercises.id
// Patient User    -> patients.patientId = users.id
// Specialist User -> specialists.specialistId = users.id

// Get patients by specialist (SPECIALIST VIEW) -> specialistId = users.id
export async function getPatientsBySpecialistId(specialistId) {
  // get all specialist Patients !
  const db = getDB();

  const patients = db.patients.filter(
    (p) => String(p.specialistId) === String(specialistId)
  );

  return patients;
}

// Get specialist by patient (PATIENT VIEW) -> patientId  = users.id
export async function getSpecialistByPatient(patientId) {
  const db = getDB();
  const patient = db.patients.find(
    (p) => String(p.patientId) === String(patientId)
  );

  if (!patient) {
    throw new Error("Patient not found");
  } // there is no patient

  const specialist = db.specialists.find(
    (s) => String(s.specialistId) === String(patient.specialistId)
  );

  if (!specialist) {
    throw new Error("Specialist not found");
  }

  return specialist;
}

//Get all exercises assigned to patient -> patientId = users.id
export async function getPatientExercises(patientId) {
  const db = getDB();

  return db.patientExercises
    .filter((pe) => String(pe.patientId) === String(patientId))
    .map((pe) => {
      const exercise = db.exercises.find(
        (e) => String(e.id) === String(pe.exerciseId)
      );

      if (!exercise) return null; // Exercise not found, skip this entry

      return {
        assignmentId: pe.id,
        notes: pe.notes,
        instructions: pe.instructions,
        ...exercise,
      };
    })
    .filter(Boolean); // Remove null values
}

//Get single patient exercise details -> patientId = users.id
export async function getPatientExerciseById(patientId, exerciseId) {
  const db = getDB();

  const assignment = db.patientExercises.find(
    (pe) =>
      String(pe.patientId) === String(patientId) &&
      String(pe.exerciseId) === String(exerciseId)
  );

  if (!assignment) {
    throw new Error("This exercise is not assigned to the patient");
  }

  const exercise = db.exercises.find(
    (e) => String(e.id) === String(exerciseId)
  );

  if (!exercise) {
    throw new Error("Exercise not found");
  }

  return {
    ...exercise,
    notes: assignment.notes,
    instructions: assignment.instructions,
  };
}

//Delete patient -> patientId = patients.id (Record ID)

export async function deletePatient(patientRecordId) {
  if (!patientRecordId) {
    throw new Error("Patient ID is required");
  }

  const db = getDB();

  const patient = db.patients.find(
    (p) => String(p.id) === String(patientRecordId)
  );

  if (!patient) {
    throw new Error("Patient does not exist");
  }

  // Delete patient record
  db.patients = db.patients.filter(
    (p) => String(p.id) !== String(patientRecordId)
  );

  // Delete all related exercises (using userId)
  db.patientExercises = db.patientExercises.filter(
    (pe) => String(pe.patientId) !== String(patient.patientId)
  );

  saveDB(db);
  return true;
}

//get patient by ID
export async function getPatientDetailsById(patientId) {
  const db = getDB();
  return db.patients.find((p) => String(p.patientId) === String(patientId));
}

export async function getCityFromLocation({ lat, lng }) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );

    const data = await res.json();

    return (
      data.address.city ||
      data.address.town ||
      data.address.village ||
      "Unknown"
    );
  } catch (error) {
    console.error("Failed to get city:", error);
    return "Unknown";
  }
}

// Add new patient
export async function addPatient(patient) {
  const db = getDB();

  const city = patient.location
    ? await getCityFromLocation(patient.location)
    : "Unknown";

  const newPatient = {
    id: Date.now(),
    ...patient,
    city,
  };

  db.patients.push(newPatient);
  saveDB(db);

  return newPatient;
}
