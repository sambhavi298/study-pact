import {
  createCheckIn,
  findCheckInsByUserId,
  findCheckInById,
  findCheckInByUserAndDate,
  updateCheckIn,
} from "../repositories/checkin.repository";
import { AppError } from "../errors/AppError";
import { CreateCheckInInput, UpdateCheckInInput } from "../validators/checkin.validator";

// Normalizes "now" to a UTC midnight Date, matching the @db.Date column -
// a check-in belongs to a calendar day, not a specific moment in time.
function todayAsDate(): Date {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

export async function createTodayCheckIn(userId: string, input: CreateCheckInInput) {
  const date = todayAsDate();

  const existing = await findCheckInByUserAndDate(userId, date);
  if (existing) {
    throw new AppError("You've already checked in today", 409);
  }

  return createCheckIn(userId, date, input);
}

export function listUserCheckIns(userId: string) {
  return findCheckInsByUserId(userId);
}

export function getTodayCheckIn(userId: string) {
  return findCheckInByUserAndDate(userId, todayAsDate());
}

async function getOwnedCheckInOrThrow(userId: string, checkInId: string) {
  const checkIn = await findCheckInById(checkInId);
  if (!checkIn || checkIn.userId !== userId) {
    throw new AppError("Check-in not found", 404);
  }
  return checkIn;
}

export async function updateUserCheckIn(
  userId: string,
  checkInId: string,
  input: UpdateCheckInInput,
) {
  await getOwnedCheckInOrThrow(userId, checkInId);
  return updateCheckIn(checkInId, input);
}
