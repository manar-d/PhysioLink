import { useEffect, useState } from "react";
import {
  getExercisesBySpecialist,
  getDetailsExercisesBySpecialist,
  createExercise,
  updateExercise,
  deleteExercise,
} from "../mockdb/exercises.service";
import useAuth from "./useAuth";

export default function useExercises() {
  const { user } = useAuth();
  const specialistId = user?.id;

  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Load specialist exercises
  useEffect(() => {
    if (!specialistId) return;

    setLoading(true);
    //setTimeout(() => { //test loading
    const data = getExercisesBySpecialist(specialistId);
    setExercises(data);
    setLoading(false);
    //}, 5000);
  }, [specialistId]);

  // Load single exercise details
  function loadExerciseDetails(exerciseId) {
    setLoading(true);

    // const details = getDetailsExercisesBySpecialist(exerciseId);
    // setSelectedExercise(details);

    // setLoading(false);
    // return details;

    try {
      const details = getDetailsExercisesBySpecialist(exerciseId);
      setSelectedExercise(details);
      return details;
    } catch (error) {
      console.error("Error loading exercise:", error.message);
      setError(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  }

  // Create
  function addExercise(data) {
    const newExercise = createExercise(data);
    setExercises((prev) => [...prev, newExercise]);
    return newExercise;
  }

  // Update
  function editExercise(exerciseId, data) {
    const updated = updateExercise(exerciseId, data);

    setExercises((prev) =>
      prev.map((e) => (e.id === exerciseId ? updated : e))
    );

    return updated;
  }

  // Delete
  function removeExercise(exerciseId) {
    try {
      deleteExercise(exerciseId);
      setExercises((prev) => prev.filter((e) => e.id !== exerciseId));
    } catch (error) {
      setExercises((prev) => prev.filter((e) => e.id !== exerciseId));
      console.error("Error loading exercise:", error.message);
      setError(error.message);
      return null;
    }
  }

  // const clearError = () => setError("");

  return {
    exercises,
    error,
    selectedExercise,
    loading,
    loadExerciseDetails,
    addExercise,
    editExercise,
    removeExercise,
    // clearError,
  };
}
