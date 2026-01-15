import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

// hash password
export function hashPassword(password) {
  const hashpass = bcrypt.hashSync(password, SALT_ROUNDS);
  return hashpass;
}

// compare password
export function comparePassword(password, hashedPassword) {
  const result = bcrypt.compareSync(password, hashedPassword);
  return result;
}
