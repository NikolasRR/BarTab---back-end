/*
  Warnings:

  - Added the required column `participantsAmount` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "items" ADD COLUMN     "participantsAmount" INTEGER NOT NULL;
