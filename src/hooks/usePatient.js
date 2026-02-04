import { useEffect, useState } from "react";
import {
  getPatientsBySpecialistId,
  getSpecialistByPatient,
  getPatientExercises,
  getPatientExerciseById,
  deletePatient,
  getPatientDetailsById,
  createPatient,
} from "../mockdb/patient.service";
import useAuth from "./useAuth";
import { ROLE_PATIENT, ROLE_SPECIALIST } from "../constants/auth.constants";
import { createUserForPatient } from "../mockdb/auth.service";

export default function usePatient() {
  const { user } = useAuth();

  const patientId = user?.role === ROLE_PATIENT ? user.id : null;
  const specialistId = user?.role === ROLE_SPECIALIST ? user.id : null;

  const [patients, setPatients] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [specialist, setSpecialist] = useState(null);
  const [patientDetails, setPatientDetails] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // if user = Specialist -> load patients
  useEffect(() => {
    if (!specialistId) return;

    const loadData = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getPatientsBySpecialistId(specialistId);
        setPatients(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [specialistId]);

  // if user = Patient -> load specialist
  useEffect(() => {
    if (!patientId) return;

    const loadData = async () => {
      try {
        const data = await getSpecialistByPatient(patientId);
        setSpecialist(data);
      } catch (err) {
        setError(err.message);
      }
    };

    loadData();
  }, [patientId]);

  // Patient exercises
  useEffect(() => {
    if (!patientId) return;

    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getPatientExercises(patientId);
        setExercises(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [patientId]);

  // load patient details by ID
  useEffect(() => {
    if (!patientId) return;

    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getPatientDetailsById(patientId);
        setPatientDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [patientId]);

  // Single exercise details
  const getExerciseDetails = async (exerciseId) => {
    if (!patientId) return null;

    setLoading(true);
    setError("");

    try {
      const exercise = await getPatientExerciseById(patientId, exerciseId);
      setSelectedExercise(exercise);
      return exercise;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Delete patient
  const removePatient = async (id) => {
    setLoading(true);
    setError("");

    try {
      await deletePatient(user.id, id);
      setPatients((prev) => prev.filter((p) => p.id !== id));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const addPatient = async (patientData) => {
    setLoading(true);
    setError("");

    try {
      const newUser = createUserForPatient({
        phone: patientData.phone,
        name: patientData.name,
      });

      createPatient(patientData, newUser.id);

      return newUser;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getPatientById = async (patientId) => {
    if (!patientId) return null;

    setLoading(true);
    setError("");

    try {
      const data = await getPatientDetailsById(patientId);
      setSelectedPatient(data);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getSinglePatientExercises = async (patientId) => {
    setLoading(true);
    setError("");
    try {
      const data = await getPatientExercises(patientId);
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    patients,
    exercises,
    specialist,
    selectedExercise,
    patientDetails,
    selectedPatient,
    loading,
    error,
    addPatient,
    getExerciseDetails,
    getSinglePatientExercises,
    getPatientById,
    removePatient,
  };
}
