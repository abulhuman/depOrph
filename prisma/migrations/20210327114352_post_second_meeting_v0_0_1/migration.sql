/*
  Warnings:

  - You are about to drop the column `currentJobTitle` on the `motherjob` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `supportplan` table. All the data in the column will be lost.
  - You are about to drop the column `fund_fc` on the `supportplan` table. All the data in the column will be lost.
  - You are about to drop the column `fund_brr` on the `supportplan` table. All the data in the column will be lost.
  - You are about to drop the column `period` on the `supportplan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "father" ALTER COLUMN "dateOfDeath" SET DEFAULT '1970-01-01 00:00:00 +00:00',
ALTER COLUMN "dateOfBirth" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- AlterTable
ALTER TABLE "guardian" ALTER COLUMN "dateOfBirth" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- AlterTable
ALTER TABLE "mother" ALTER COLUMN "dateOfBirth" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- AlterTable
ALTER TABLE "motherjob" DROP COLUMN "currentJobTitle",
ADD COLUMN     "jobTitle" TEXT;

-- AlterTable
ALTER TABLE "orphan" ALTER COLUMN "dateOfBirth" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- AlterTable
ALTER TABLE "sponsorshipstatus" ALTER COLUMN "date" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- AlterTable
ALTER TABLE "supportplan" DROP COLUMN "currency",
DROP COLUMN "fund_fc",
DROP COLUMN "fund_brr",
DROP COLUMN "period",
ADD COLUMN     "collectiveFund_fc" DOUBLE PRECISION,
ADD COLUMN     "individualFund_fc" DOUBLE PRECISION,
ADD COLUMN     "foreignCurrency" TEXT,
ADD COLUMN     "supportPeriod" INTEGER,
ADD COLUMN     "exchangeRate" DOUBLE PRECISION,
ADD COLUMN     "individualFund_brr" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "village" ALTER COLUMN "registrationDate" SET DEFAULT '1970-01-01 00:00:00 +00:00';
