/*
  Warnings:

  - You are about to drop the column `coordinatorId` on the `donor` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "donor" DROP CONSTRAINT "donor_coordinatorId_fkey";

-- AlterTable
ALTER TABLE "donor" DROP COLUMN "coordinatorId";

-- AlterTable
ALTER TABLE "father" ALTER COLUMN "dateOfDeath" SET DEFAULT '1970-01-01 00:00:00 +00:00',
ALTER COLUMN "dateOfBirth" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- AlterTable
ALTER TABLE "guardian" ALTER COLUMN "dateOfBirth" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- AlterTable
ALTER TABLE "mother" ALTER COLUMN "dateOfBirth" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- AlterTable
ALTER TABLE "orphan" ALTER COLUMN "dateOfBirth" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- AlterTable
ALTER TABLE "sponsorshipstatus" ALTER COLUMN "date" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- CreateTable
CREATE TABLE "_donorTocoordinator" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_donorTocoordinator_AB_unique" ON "_donorTocoordinator"("A", "B");

-- CreateIndex
CREATE INDEX "_donorTocoordinator_B_index" ON "_donorTocoordinator"("B");

-- AddForeignKey
ALTER TABLE "_donorTocoordinator" ADD FOREIGN KEY ("A") REFERENCES "coordinator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_donorTocoordinator" ADD FOREIGN KEY ("B") REFERENCES "donor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
