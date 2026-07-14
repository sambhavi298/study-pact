import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/env";

const SALT_ROUNDS = 10;

export function hashPassword(plain: string) {
  return bcrypt.hash(plain, SALT_ROUNDS);
}

export function verifyPassword(plain: string, hash: string) {
  return bcrypt.compare(plain, hash);
}

export function generateToken(userId: string) {
  return jwt.sign({ sub: userId }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  } as jwt.SignOptions);
}

export function verifyToken(token: string) {
  return jwt.verify(token, config.jwtSecret) as { sub: string };
}
