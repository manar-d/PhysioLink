import { ERROR_CODES } from "../constants/error.constants";
import { getDB } from "../mockdb/mockDatabase";

export async function getDifficulties() {
  return getDB().lookups.difficulties;
}

export async function getCategories() {
  return getDB().lookups.categories;
}

export async function getGender() {
  return getDB().lookups.gender;
}

export async function resolveLookup(lookupName, value) {
  const lookups = getDB().lookups;
  const source = lookups[lookupName];

    if (!source) {
    throw new Error(ERROR_CODES.LO_LOOKUP_NOT_FOUND.key);
  }
  
  // Multiple IDs (categoryIds)
  if (Array.isArray(value)) {
    const result = source
      .filter((item) => value.includes(item.id))
      .map((item) => item.key);
    return result;
  }

  // Single ID (difficulty, gender)
  const result = source.find((item) => item.id === value)?.key || "-";
  return result;
}
