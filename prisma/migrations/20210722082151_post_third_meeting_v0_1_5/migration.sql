/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `coordinator` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `donor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `head` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `socialworker` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `coordinator` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `donor` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `head` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `socialworker` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "coordinator" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "donor" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "father" ALTER COLUMN "dateOfDeath" SET DEFAULT '1970-01-01 00:00:00 +00:00',
ALTER COLUMN "dateOfBirth" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- AlterTable
ALTER TABLE "guardian" ALTER COLUMN "dateOfBirth" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- AlterTable
ALTER TABLE "head" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "mother" ALTER COLUMN "dateOfBirth" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- AlterTable
ALTER TABLE "orphan" ALTER COLUMN "dateOfBirth" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- AlterTable
ALTER TABLE "socialworker" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "sponsorshipstatus" ALTER COLUMN "date" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- AlterTable
ALTER TABLE "village" ALTER COLUMN "registrationDate" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- CreateIndex
CREATE UNIQUE INDEX "coordinator_userId_unique" ON "coordinator"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "donor_userId_unique" ON "donor"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "head_userId_unique" ON "head"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "socialworker_userId_unique" ON "socialworker"("userId");
