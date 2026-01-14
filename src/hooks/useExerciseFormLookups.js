import { useEffect, useState } from "react";
import { getDifficulties, getCategories } from "../mockdb/lookup.service";

export default function useExerciseFormLookups() {
  const [lookups, setLookups] = useState({
    difficulties: [],
    categories: [],
  });

  useEffect(() => {
    setLookups({
      difficulties: getDifficulties(),
      categories: getCategories(),
    });
  }, []);

  return lookups;
}
