/*
  Warnings:

  - You are about to drop the `tableParticipants` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name,tableId]` on the table `participants` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tableId` to the `participants` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tableParticipants" DROP CONSTRAINT "tableParticipants_participantId_fkey";

-- DropForeignKey
ALTER TABLE "tableParticipants" DROP CONSTRAINT "tableParticipants_tableId_fkey";

-- DropIndex
DROP INDEX "participants_name_key";

-- AlterTable
ALTER TABLE "participants" ADD COLUMN     "tableId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "tableParticipants";

-- CreateIndex
CREATE UNIQUE INDEX "participants_name_tableId_key" ON "participants"("name", "tableId");

-- AddForeignKey
ALTER TABLE "participants" ADD CONSTRAINT "participants_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "tables"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
