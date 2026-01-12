import { getDB } from "./mockDatabase";

// Get all specialists 
export async function getAllSpecialists() {
  const db = getDB();
  return db.specialists || [];
}

// Get specialist by ID
export async function getSpecialistDetailsById(specialistId) {
  const db = getDB();               
  return db.specialists.find(specialist => String(specialist.id) === String(specialistId));
}

// // Get All specialists only or with search and limit
// export async function getSpecialists({
//   search,
//   limit,
// } = {}) {
//   const db = getDB();
//   let output = db.specialists || [];

//   // Search by name
//   if (search) {
//     const input = search.toLowerCase();
//     output = output.filter(s =>
//       s.name.toLowerCase().includes(input)
//     );
//   }

//   //Limit 
//   if (limit) {
//     output = output.slice(0, limit);
//   }

//   return output;
// }
