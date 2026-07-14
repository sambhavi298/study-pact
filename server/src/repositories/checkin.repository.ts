import { prisma } from "../config/prisma";
import { CreateCheckInInput, UpdateCheckInInput } from "../validators/checkin.validator";

export function createCheckIn(userId: string, date: Date, input: CreateCheckInInput) {
  return prisma.checkIn.create({ data: { ...input, userId, date } });
}

export function findCheckInsByUserId(userId: string) {
  return prisma.checkIn.findMany({ where: { userId }, orderBy: { date: "desc" } });
}

export function findCheckInById(id: string) {
  return prisma.checkIn.findUnique({ where: { id } });
}

export function findCheckInByUserAndDate(userId: string, date: Date) {
  return prisma.checkIn.findUnique({ where: { userId_date: { userId, date } } });
}

export function updateCheckIn(id: string, input: UpdateCheckInInput) {
  return prisma.checkIn.update({ where: { id }, data: input });
}
