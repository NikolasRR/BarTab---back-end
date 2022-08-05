-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tables" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "tables_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "participants" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "handlerId" INTEGER NOT NULL,

    CONSTRAINT "participants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tableParticipants" (
    "id" SERIAL NOT NULL,
    "participantId" INTEGER NOT NULL,
    "tableId" INTEGER NOT NULL,

    CONSTRAINT "tableParticipants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "participantItems" (
    "id" SERIAL NOT NULL,
    "participantId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,

    CONSTRAINT "participantItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tableItems" (
    "id" SERIAL NOT NULL,
    "tableId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,

    CONSTRAINT "tableItems_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "participants_name_key" ON "participants"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tableParticipants_participantId_tableId_key" ON "tableParticipants"("participantId", "tableId");

-- AddForeignKey
ALTER TABLE "tables" ADD CONSTRAINT "tables_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participants" ADD CONSTRAINT "participants_handlerId_fkey" FOREIGN KEY ("handlerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tableParticipants" ADD CONSTRAINT "tableParticipants_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "participants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tableParticipants" ADD CONSTRAINT "tableParticipants_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "tables"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participantItems" ADD CONSTRAINT "participantItems_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "participants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participantItems" ADD CONSTRAINT "participantItems_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tableItems" ADD CONSTRAINT "tableItems_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "tables"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tableItems" ADD CONSTRAINT "tableItems_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
