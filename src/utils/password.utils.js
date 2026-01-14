import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

// hash password
export function hashPassword(password) {
  console.log(password);
  const hashpass = bcrypt.hashSync(password, SALT_ROUNDS);
  console.log("hashed password", hashpass);
  return hashpass;
}

// compare password
export function comparePassword(password, hashedPassword) {
  console.log("password", password);
  console.log("hashedPassword", hashedPassword);
  const result = bcrypt.compareSync(password, hashedPassword);
  console.log("compare result", result);
  return result;
}
