/*
  Warnings:

  - You are about to alter the column `totalMark` on the `educationalrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `average` on the `educationalrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `semesterGPA` on the `educationalrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `cumulativeGPA` on the `educationalrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `amount` on the `financialrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `monthlyExpense` on the `mother` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `monthlyIncome` on the `motherjob` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `currentBalance` on the `orphan` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `adminFee_brr` on the `supportplan` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `netPayment_brr` on the `supportplan` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `fund_fc` on the `supportplan` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `fund_brr` on the `supportplan` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "educationalrecord" ALTER COLUMN "totalMark" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "average" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "semesterGPA" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "cumulativeGPA" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "father" ALTER COLUMN "dateOfDeath" SET DEFAULT '1970-01-01 00:00:00 +00:00',
ALTER COLUMN "dateOfBirth" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- AlterTable
ALTER TABLE "financialrecord" ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "guardian" ALTER COLUMN "dateOfBirth" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- AlterTable
ALTER TABLE "mother" ALTER COLUMN "dateOfBirth" SET DEFAULT '1970-01-01 00:00:00 +00:00',
ALTER COLUMN "monthlyExpense" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "motherjob" ALTER COLUMN "monthlyIncome" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "orphan" ALTER COLUMN "dateOfBirth" SET DEFAULT '1970-01-01 00:00:00 +00:00',
ALTER COLUMN "currentBalance" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "sponsorshipstatus" ALTER COLUMN "date" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- AlterTable
ALTER TABLE "supportplan" ALTER COLUMN "adminFee_brr" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "netPayment_brr" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "fund_fc" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "fund_brr" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "village" ALTER COLUMN "registrationDate" SET DEFAULT '1970-01-01 00:00:00 +00:00';
