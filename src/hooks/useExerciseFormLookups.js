import { useEffect, useState } from "react";
import {
  getDifficulties,
  getCategories,
  getGender,
} from "../mockdb/lookup.service";

export default function useExerciseFormLookups() {
  const [lookups, setLookups] = useState({
    difficulties: [],
    categories: [],
    gender:[],
  });

useEffect(() => {
  const loadLookups = async () => {
    try {
      const [difficulties, categories, gender] = await Promise.all([
        getDifficulties(),
        getCategories(),
        getGender(),
      ]);

      setLookups({ difficulties, categories, gender });
    } catch (error) {
      const _error = error;
    }
  };

  loadLookups();
}, []);


  return lookups;
}
