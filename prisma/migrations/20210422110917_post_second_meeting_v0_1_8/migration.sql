-- DropForeignKey
ALTER TABLE "socialworker" DROP CONSTRAINT "socialworker_districtId_fkey";

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

-- AlterTable
ALTER TABLE "village" ALTER COLUMN "registrationDate" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- CreateTable
CREATE TABLE "_districtsDonors" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_districtsSocialWorkers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_districtsDonors_AB_unique" ON "_districtsDonors"("A", "B");

-- CreateIndex
CREATE INDEX "_districtsDonors_B_index" ON "_districtsDonors"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_districtsSocialWorkers_AB_unique" ON "_districtsSocialWorkers"("A", "B");

-- CreateIndex
CREATE INDEX "_districtsSocialWorkers_B_index" ON "_districtsSocialWorkers"("B");

-- AddForeignKey
ALTER TABLE "_districtsDonors" ADD FOREIGN KEY ("A") REFERENCES "district"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_districtsDonors" ADD FOREIGN KEY ("B") REFERENCES "donor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_districtsSocialWorkers" ADD FOREIGN KEY ("A") REFERENCES "district"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_districtsSocialWorkers" ADD FOREIGN KEY ("B") REFERENCES "socialworker"("id") ON DELETE CASCADE ON UPDATE CASCADE;
