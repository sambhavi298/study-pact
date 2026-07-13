import { prisma } from "../config/prisma";

export function createUser(email: string, name: string) {
  return prisma.user.create({ data: { email, name } });
}

export function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export function findUserById(id: string) {
  return prisma.user.findUnique({ where: { id } });
}
