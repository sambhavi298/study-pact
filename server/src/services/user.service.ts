import {
  createUser,
  findUserByEmail,
  findUserById,
} from "../repositories/user.repository";
import { AppError } from "../errors/AppError";
import { RegisterInput } from "../validators/auth.validator";
import { hashPassword } from "./auth.service";

// Prisma's generated User type includes `password` - we never return it as-is.
function toSafeUser<T extends { password: string }>(user: T) {
  const { password, ...safeUser } = user;
  return safeUser;
}

export async function registerUser(input: RegisterInput) {
  const existing = await findUserByEmail(input.email);
  if (existing) {
    throw new AppError("Email already in use", 409);
  }

  const hashed = await hashPassword(input.password);
  const user = await createUser(input.email, input.name, hashed);
  return toSafeUser(user);
}

export async function getUserById(id: string) {
  const user = await findUserById(id);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  return toSafeUser(user);
}
