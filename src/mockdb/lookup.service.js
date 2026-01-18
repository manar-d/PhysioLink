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
