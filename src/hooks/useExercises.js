import { useEffect, useState } from "react";
import {
  getExercisesBySpecialist,
  getDetailsExercisesBySpecialist,
  createExercise,
  updateExercise,
  deleteExercise,
} from "../db/exercises.service";
import useAuth from "./useAuth";

export default function useExercises() {
  const { user } = useAuth();
  const specialistId = user?.id;

  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [loading, setLoading] = useState(false);

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

  // Get single exercise
  function getExerciseById(exerciseId) {
    const exercise = getDetailsExercisesBySpecialist(exerciseId);
    setSelectedExercise(exercise);
    return exercise;
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
    deleteExercise(exerciseId);
    setExercises((prev) => prev.filter((e) => e.id !== exerciseId));
  }

  return {
    exercises,
    selectedExercise,
    loading,
    getExerciseById,
    addExercise,
    editExercise,
    removeExercise,
  };
}
