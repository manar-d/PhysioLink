import { getDB } from "../mockdb/mockDatabase";

export function getDifficulties() {
  return getDB().lookups.difficulties;
}

export function getCategories() {
  return getDB().lookups.categories;
}

export function getDifficultyById(id) {
  return getDB().lookups.difficulties.find((d) => d.id === id);
}

export function getCategoryById(id) {
  return getDB().lookups.categories.find((c) => c.id === id);
}
