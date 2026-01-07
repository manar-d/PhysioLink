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
  const [error, setError] = useState("");

  // Load exercises
  useEffect(() => {
    if (!specialistId) return;

    const load = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getExercisesBySpecialist(specialistId);
        setExercises(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [specialistId]);

  // Load single exercise
  const loadExerciseDetails = async (exerciseId) => {
    setLoading(true);
    setError("");
    setSelectedExercise(null);

    try {
      const details = await getDetailsExercisesBySpecialist(exerciseId);
      setSelectedExercise(details);
      return details;
    } catch (err) {
      setError(err.message);
      setSelectedExercise(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Create
  const addExercise = async (data) => {
    setLoading(true);
    setError("");

    try {
      const newExercise = await createExercise(data);
      setExercises((prev) => [...prev, newExercise]);
      return newExercise;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setTimeout(() => setLoading(false), 2000);
    }
  };

  // Update
  const editExercise = async (exerciseId, data) => {
    setLoading(true);
    setError("");

    try {
      const updated = await updateExercise(exerciseId, data);
      setExercises((prev) =>
        prev.map((e) => (e.id === exerciseId ? updated : e))
      );
      return updated;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setTimeout(() => setLoading(false), 2000);
    }
  };

  // Delete
  const removeExercise = async (exerciseId) => {
    setLoading(true);
    setError("");

    try {
      await deleteExercise(exerciseId);
      setExercises((prev) => prev.filter((e) => e.id !== exerciseId));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    exercises,
    selectedExercise,
    loading,
    error,
    loadExerciseDetails,
    addExercise,
    editExercise,
    removeExercise,
  };
}
