import {
  createUser,
  findUserByEmail,
  findUserById,
} from "../repositories/user.repository";
import { AppError } from "../errors/AppError";
import { CreateUserInput } from "../validators/user.validator";

export async function registerUser(input: CreateUserInput) {
  const existing = await findUserByEmail(input.email);
  if (existing) {
    throw new AppError("Email already in use", 409);
  }

  return createUser(input.email, input.name);
}

export async function getUserById(id: string) {
  const user = await findUserById(id);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  return user;
}
