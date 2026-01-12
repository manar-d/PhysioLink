import { useEffect, useState } from "react";
import { getAllExercises } from "../mockdb/exercises.service";
import { getAllSpecialists } from "../mockdb/specialists.service";

export default function useHome() {

  const [allExercises, setAllExercises] = useState([]);
  const [allSpecialists, setAllSpecialists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //  const homeExercises = allExercises.slice(0, 5);
  
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError("");

      try {
        const [exercises, specialists] = await Promise.all([
          getAllExercises(),
          getAllSpecialists(),
        ]);

        setAllExercises(exercises);
        setAllSpecialists(specialists);
      } catch (err) {
        setError(err.message || "Failed to load home data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return {
    allExercises,
    allSpecialists,
    loading,
    error,
  };
}
