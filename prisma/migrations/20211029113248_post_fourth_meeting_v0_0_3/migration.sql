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
ALTER TABLE "project" ADD COLUMN     "status" TEXT NOT NULL DEFAULT E'new';

-- AlterTable
ALTER TABLE "sponsorshipstatus" ALTER COLUMN "date" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- AlterIndex
ALTER INDEX "coordinator_userId_unique" RENAME TO "coordinator.userId_unique";

-- AlterIndex
ALTER INDEX "donor_userId_unique" RENAME TO "donor.userId_unique";

-- AlterIndex
ALTER INDEX "head_userId_unique" RENAME TO "head.userId_unique";

-- AlterIndex
ALTER INDEX "socialworker_userId_unique" RENAME TO "socialworker.userId_unique";
