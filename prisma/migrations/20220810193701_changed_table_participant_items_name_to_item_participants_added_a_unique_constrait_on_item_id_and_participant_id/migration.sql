/*
  Warnings:

  - You are about to drop the `participantItems` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "participantItems" DROP CONSTRAINT "participantItems_itemId_fkey";

-- DropForeignKey
ALTER TABLE "participantItems" DROP CONSTRAINT "participantItems_participantId_fkey";

-- DropTable
DROP TABLE "participantItems";

-- CreateTable
CREATE TABLE "itemParticipants" (
    "id" SERIAL NOT NULL,
    "participantId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,

    CONSTRAINT "itemParticipants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "itemParticipants_itemId_participantId_key" ON "itemParticipants"("itemId", "participantId");

-- AddForeignKey
ALTER TABLE "itemParticipants" ADD CONSTRAINT "itemParticipants_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "participants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itemParticipants" ADD CONSTRAINT "itemParticipants_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
