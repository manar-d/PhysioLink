import { useState } from "react";
import useAuth from "./useAuth";
import { ROLE_PATIENT, ROLE_SPECIALIST } from "../auth.constants";
import { getSpecialistDetailsById } from "../mockdb/specialists.service";
import { getExercisesBySpecialist } from "../mockdb/exercises.service";

export default function useSpecialist() {
  const { user } = useAuth();

  const __specialistId = user?.role === ROLE_SPECIALIST ? user.id : null;

  const [specialistDetails, setSpecialistDetails] = useState(null);
  const [exercisesDetails, setExercisesDetails] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getExercisesBySpecialistDetail = async (specialistId) => {
    if (!specialistId) return null;

    setLoading(true);
    setError("");

    try {
      const data = await getExercisesBySpecialist(specialistId);
      setExercisesDetails(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // get specialist details by ID
  const getSpecialistDetails = async (specialistId) => {
    if (!specialistId) return null;

    setLoading(true);
    setError("");

    try {
      const specialist = await getSpecialistDetailsById(specialistId);
      setSpecialistDetails(specialist);
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    specialistDetails,
    exercisesDetails,
    getSpecialistDetails,
    getExercisesBySpecialistDetail,
    loading,
    error,
  };
}
