/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `tables` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tables_userId_key" ON "tables"("userId");
