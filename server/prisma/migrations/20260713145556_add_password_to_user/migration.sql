/*
  Warnings:
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Manually added: clearing existing test data since these are throwaway rows created before authentication existed.
*/
-- Clear existing rows (test data only, no real users yet)
DELETE FROM "User";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL;