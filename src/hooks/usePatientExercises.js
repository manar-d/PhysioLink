import { useState } from "react";
import { assignExerciseToPatient } from "../mockdb/patientExercises.service";

export default function usePatientExercises() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const assignExercise = async (data) => {
    setLoading(true);
    setError("");

    try {
      return assignExerciseToPatient(data);
    } catch (e) {
      setError(e.message);
      return;
    } finally {
      setLoading(false);
    }
  };

  return {
    assignExercise,
    loading,
    error,
  };
}
