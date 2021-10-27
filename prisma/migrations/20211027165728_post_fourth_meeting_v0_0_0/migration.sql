/*
  Warnings:

  - The `transactionType` column on the `financialrecord` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `reason` column on the `financialrecord` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `iDCardUrl` on the `guardian` table. All the data in the column will be lost.
  - The `maritalStatus` column on the `mother` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `donorId` on the `orphan` table. All the data in the column will be lost.
  - You are about to drop the column `healthDescription` on the `orphan` table. All the data in the column will be lost.
  - You are about to drop the column `originalThankyouLetterUrl` on the `orphan` table. All the data in the column will be lost.
  - You are about to drop the column `psychologicalStatus` on the `orphan` table. All the data in the column will be lost.
  - You are about to drop the column `supportPlanId` on the `orphan` table. All the data in the column will be lost.
  - You are about to drop the column `translatedThankyouLetterUrl` on the `orphan` table. All the data in the column will be lost.
  - The `religion` column on the `orphan` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `gender` column on the `socialworker` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `sponsorshipstatus` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `adminFee_brr` on the `supportplan` table. All the data in the column will be lost.
  - You are about to drop the column `collectiveFund_fc` on the `supportplan` table. All the data in the column will be lost.
  - You are about to drop the column `exchangeRate` on the `supportplan` table. All the data in the column will be lost.
  - You are about to drop the column `foreignCurrency` on the `supportplan` table. All the data in the column will be lost.
  - You are about to drop the column `individualFund_brr` on the `supportplan` table. All the data in the column will be lost.
  - You are about to drop the column `individualFund_fc` on the `supportplan` table. All the data in the column will be lost.
  - You are about to drop the column `initDate` on the `supportplan` table. All the data in the column will be lost.
  - You are about to drop the column `netPayment_brr` on the `supportplan` table. All the data in the column will be lost.
  - You are about to drop the column `supportPeriod` on the `supportplan` table. All the data in the column will be lost.
  - You are about to drop the column `termDate` on the `supportplan` table. All the data in the column will be lost.
  - You are about to drop the `_districtsDonors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `education` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `educationalrecord` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `type` on the `accountMaintainence` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `accountMaintainence` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `role` on the `accountMaintainence` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `gender` on the `guardian` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `relationToOrphan` on the `guardian` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `nationality` on the `guardian` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `vitalStatus` on the `mother` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `gender` on the `orphan` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `name` to the `supportplan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentInterval` to the `supportplan` table without a default value. This is not possible if the table is not empty.
  - Made the column `adminFeePercentage` on table `supportplan` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `role` on the `user` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "_districtsDonors" DROP CONSTRAINT "_districtsDonors_A_fkey";

-- DropForeignKey
ALTER TABLE "_districtsDonors" DROP CONSTRAINT "_districtsDonors_B_fkey";

-- DropForeignKey
ALTER TABLE "educationalrecord" DROP CONSTRAINT "educationalrecord_educationId_fkey";

-- DropForeignKey
ALTER TABLE "orphan" DROP CONSTRAINT "orphan_donorId_fkey";

-- DropForeignKey
ALTER TABLE "orphan" DROP CONSTRAINT "orphan_educationId_fkey";

-- DropForeignKey
ALTER TABLE "orphan" DROP CONSTRAINT "orphan_supportPlanId_fkey";

-- AlterTable
ALTER TABLE "accountMaintainence" DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "district" ADD COLUMN     "donorId" INTEGER;

-- AlterTable
ALTER TABLE "father" ALTER COLUMN "dateOfDeath" SET DEFAULT '1970-01-01 00:00:00 +00:00',
ALTER COLUMN "dateOfBirth" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- AlterTable
ALTER TABLE "financialrecord" DROP COLUMN "transactionType",
ADD COLUMN     "transactionType" TEXT,
DROP COLUMN "reason",
ADD COLUMN     "reason" TEXT;

-- AlterTable
ALTER TABLE "guardian" DROP COLUMN "iDCardUrl",
ADD COLUMN     "idCardUrl" TEXT NOT NULL DEFAULT E'',
DROP COLUMN "gender",
ADD COLUMN     "gender" TEXT NOT NULL,
DROP COLUMN "relationToOrphan",
ADD COLUMN     "relationToOrphan" TEXT NOT NULL,
ALTER COLUMN "dateOfBirth" SET DEFAULT '1970-01-01 00:00:00 +00:00',
DROP COLUMN "nationality",
ADD COLUMN     "nationality" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "mother" DROP COLUMN "vitalStatus",
ADD COLUMN     "vitalStatus" TEXT NOT NULL,
ALTER COLUMN "dateOfBirth" SET DEFAULT '1970-01-01 00:00:00 +00:00',
DROP COLUMN "maritalStatus",
ADD COLUMN     "maritalStatus" TEXT;

-- AlterTable
ALTER TABLE "orphan" DROP COLUMN "donorId",
DROP COLUMN "healthDescription",
DROP COLUMN "originalThankyouLetterUrl",
DROP COLUMN "psychologicalStatus",
DROP COLUMN "supportPlanId",
DROP COLUMN "translatedThankyouLetterUrl",
DROP COLUMN "gender",
ADD COLUMN     "gender" TEXT NOT NULL,
ALTER COLUMN "dateOfBirth" SET DEFAULT '1970-01-01 00:00:00 +00:00',
DROP COLUMN "religion",
ADD COLUMN     "religion" TEXT;

-- AlterTable
ALTER TABLE "socialworker" DROP COLUMN "gender",
ADD COLUMN     "gender" TEXT;

-- AlterTable
ALTER TABLE "sponsorshipstatus" DROP COLUMN "status",
ADD COLUMN     "status" TEXT,
ALTER COLUMN "date" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- AlterTable
ALTER TABLE "supportplan" DROP COLUMN "adminFee_brr",
DROP COLUMN "collectiveFund_fc",
DROP COLUMN "exchangeRate",
DROP COLUMN "foreignCurrency",
DROP COLUMN "individualFund_brr",
DROP COLUMN "individualFund_fc",
DROP COLUMN "initDate",
DROP COLUMN "netPayment_brr",
DROP COLUMN "supportPeriod",
DROP COLUMN "termDate",
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "paymentInterval" TEXT NOT NULL,
ADD COLUMN     "projectId" INTEGER,
ADD COLUMN     "startDate" TIMESTAMP(3),
ALTER COLUMN "adminFeePercentage" SET NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "role",
ADD COLUMN     "role" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "village" ALTER COLUMN "registrationDate" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- DropTable
DROP TABLE "_districtsDonors";

-- DropTable
DROP TABLE "education";

-- DropTable
DROP TABLE "educationalrecord";

-- CreateTable
CREATE TABLE "educationalRecord" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "enrollmentStatus" TEXT NOT NULL,
    "schoolName" TEXT,
    "typeOfSchool" TEXT,
    "year" TEXT,
    "level" TEXT,
    "reason" TEXT,
    "yearDivision" TEXT,
    "quarter" TEXT,
    "semester" TEXT,
    "totalMark" DOUBLE PRECISION,
    "numberOfSubjects" INTEGER,
    "average" DOUBLE PRECISION,
    "rank" INTEGER,
    "reportCardUrl" TEXT,
    "semesterGPA" DOUBLE PRECISION,
    "cumulativeGPA" DOUBLE PRECISION,
    "orphanId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "healthStatus" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "healthDescription" TEXT NOT NULL DEFAULT E'',
    "psychologicalStatus" TEXT,
    "orphanId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orphanLetter" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "originalThankyouLetterUrl" TEXT,
    "translatedThankyouLetterUrl" TEXT,
    "orphanId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "number" TEXT NOT NULL,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "maximumNumberOfBeneficiaries" INTEGER NOT NULL,
    "durationInYears" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "totalBudget" DOUBLE PRECISION NOT NULL,
    "administrativeCost" DOUBLE PRECISION NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projectDocument" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "documentUrl" TEXT NOT NULL,
    "documentType" TEXT NOT NULL,
    "projectId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "incomeGeneratingActivity" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "beneficiaryType" TEXT NOT NULL,
    "activityType" TEXT NOT NULL,
    "firstName" TEXT NOT NULL DEFAULT E'',
    "middleName" TEXT NOT NULL DEFAULT E'',
    "lastName" TEXT NOT NULL DEFAULT E'',
    "budget" DOUBLE PRECISION NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "status" TEXT NOT NULL,
    "projectId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "incomeGeneratingActivityPhoto" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "photoUrl" TEXT NOT NULL,
    "incomeGeneratingActivityId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "paymentInPrimaryForeignCurrency" DOUBLE PRECISION NOT NULL,
    "primaryForeignCurrency" TEXT NOT NULL,
    "primaryExchangeRate" DOUBLE PRECISION NOT NULL,
    "paymentInSecondaryForeignCurrency" DOUBLE PRECISION NOT NULL,
    "secondaryForeignCurrency" TEXT NOT NULL,
    "secondaryExchangeRate" DOUBLE PRECISION NOT NULL,
    "grossPaymentInDomesticCurrency" DOUBLE PRECISION NOT NULL,
    "adminFeeInDomesticCurrency" DOUBLE PRECISION NOT NULL,
    "netPaymentInDomesticCurrency" DOUBLE PRECISION NOT NULL,
    "paymentPeriodInMonths" INTEGER NOT NULL,
    "supportPlanId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_orphanTosupportplan" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CoordinatorToProject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_orphanTosupportplan_AB_unique" ON "_orphanTosupportplan"("A", "B");

-- CreateIndex
CREATE INDEX "_orphanTosupportplan_B_index" ON "_orphanTosupportplan"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CoordinatorToProject_AB_unique" ON "_CoordinatorToProject"("A", "B");

-- CreateIndex
CREATE INDEX "_CoordinatorToProject_B_index" ON "_CoordinatorToProject"("B");

-- AddForeignKey
ALTER TABLE "educationalRecord" ADD FOREIGN KEY ("orphanId") REFERENCES "orphan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "district" ADD FOREIGN KEY ("donorId") REFERENCES "donor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "healthStatus" ADD FOREIGN KEY ("orphanId") REFERENCES "orphan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orphanLetter" ADD FOREIGN KEY ("orphanId") REFERENCES "orphan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projectDocument" ADD FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incomeGeneratingActivity" ADD FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incomeGeneratingActivityPhoto" ADD FOREIGN KEY ("incomeGeneratingActivityId") REFERENCES "incomeGeneratingActivity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supportplan" ADD FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD FOREIGN KEY ("supportPlanId") REFERENCES "supportplan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_orphanTosupportplan" ADD FOREIGN KEY ("A") REFERENCES "orphan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_orphanTosupportplan" ADD FOREIGN KEY ("B") REFERENCES "supportplan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoordinatorToProject" ADD FOREIGN KEY ("A") REFERENCES "coordinator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoordinatorToProject" ADD FOREIGN KEY ("B") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
