import { useEffect, useState } from "react";
import {
  getDifficulties,
  getCategories,
  getGender,
  resolveLookup,
} from "../mockdb/lookup.service";

export default function useExerciseFormLookups() {
  const [lookups, setLookups] = useState({
    difficulties: [],
    categories: [],
    gender: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadLookups = async () => {
      setLoading(true);
      setError("");

      try {
        const [difficulties, categories, gender] = await Promise.all([
          getDifficulties(),
          getCategories(),
          getGender(),
        ]);

        setLookups({ difficulties, categories, gender });
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    loadLookups();
  }, []);

  const getLabel = async (lookupName, value) => {
    try {
      return await resolveLookup(lookupName, value);
    } catch (e) {
      setError(e.message);
      return Array.isArray(value) ? [] : "-";
    }
  };

  return {
    lookups,
    getLabel,
    loading,
    error,
  };
}
