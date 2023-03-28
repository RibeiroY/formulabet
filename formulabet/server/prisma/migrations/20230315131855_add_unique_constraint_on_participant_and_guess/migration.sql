/*
  Warnings:

  - A unique constraint covering the columns `[participantId,raceId]` on the table `Guess` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Guess_participantId_raceId_key" ON "Guess"("participantId", "raceId");
