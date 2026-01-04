import { useEffect, useState } from "react";
import {
  getPatientsByspecialistId,
  getSpecialistByPatient,
  getPatientExercises,
  getPatientExerciseById,
  deletePatient,
} from "../mockdb/patient.service";
import useAuth from "./useAuth";

export default function usePatient() {
  const { user } = useAuth();

  const patientId = user?.role === "patient" ? user.id : null;
  const specialistId = user?.role === "specialist" ? user.id : null;

  const [patients, setPatients] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [specialist, setSpecialist] = useState(null);
  const [loading, setLoading] = useState(false);

  // if user = Specialist
  useEffect(() => {
    const loadData = () => {
      if (!specialistId) return;

      setLoading(true);
      const data = getPatientsByspecialistId(specialistId);
      setPatients(data);
      setLoading(false);
    };

    loadData();
  }, [specialistId]);

  // if user = Patient

  useEffect(() => {
    if (!patientId) return;

    const data = getSpecialistByPatient(patientId);
    setSpecialist(data);
  }, [patientId]);

  useEffect(() => {
    if (!patientId) return;

    setLoading(true);
    const data = getPatientExercises(patientId);
    setExercises(data);
    setLoading(false);
  }, [patientId]);

  function getExerciseDetails(exerciseId) {
    if (!patientId) return null;

    const exercise = getPatientExerciseById(patientId, exerciseId);
    setSelectedExercise(exercise);
    return exercise;
  }

  // Delete
  function removepatient(patientId) {
    deletePatient(patientId);
    setPatients((prev) => prev.filter((e) => e.id !== patientId));
  }

  return {
    patients,
    exercises,
    specialist,
    selectedExercise,

    loading,

    getExerciseDetails,
    removepatient,
  };
}
