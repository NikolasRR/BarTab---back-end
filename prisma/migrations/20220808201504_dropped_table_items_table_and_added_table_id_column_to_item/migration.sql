/*
  Warnings:

  - You are about to drop the `tableItems` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `amount` to the `items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tableId` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tableItems" DROP CONSTRAINT "tableItems_itemId_fkey";

-- DropForeignKey
ALTER TABLE "tableItems" DROP CONSTRAINT "tableItems_tableId_fkey";

-- AlterTable
ALTER TABLE "items" ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "tableId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "tableItems";

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "tables"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
