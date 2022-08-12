-- DropForeignKey
ALTER TABLE "itemParticipants" DROP CONSTRAINT "itemParticipants_itemId_fkey";

-- DropForeignKey
ALTER TABLE "itemParticipants" DROP CONSTRAINT "itemParticipants_participantId_fkey";

-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_tableId_fkey";

-- DropForeignKey
ALTER TABLE "participants" DROP CONSTRAINT "participants_handlerId_fkey";

-- DropForeignKey
ALTER TABLE "participants" DROP CONSTRAINT "participants_tableId_fkey";

-- DropForeignKey
ALTER TABLE "tables" DROP CONSTRAINT "tables_userId_fkey";

-- AddForeignKey
ALTER TABLE "tables" ADD CONSTRAINT "tables_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participants" ADD CONSTRAINT "participants_handlerId_fkey" FOREIGN KEY ("handlerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participants" ADD CONSTRAINT "participants_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "tables"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "tables"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itemParticipants" ADD CONSTRAINT "itemParticipants_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "participants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itemParticipants" ADD CONSTRAINT "itemParticipants_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
