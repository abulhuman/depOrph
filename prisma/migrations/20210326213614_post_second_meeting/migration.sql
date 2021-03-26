/*
  Warnings:

  - The migration will remove the values [inProgress,suspended] on the enum `sponsorshipstatus_enum`. If these variants are still used in the database, the migration will fail.
  - You are about to drop the column `districtName` on the `district` table. All the data in the column will be lost.
  - You are about to drop the column `region` on the `district` table. All the data in the column will be lost.
  - You are about to drop the column `zone` on the `district` table. All the data in the column will be lost.
  - You are about to drop the column `POBox` on the `guardian` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `guardian` table. All the data in the column will be lost.
  - You are about to drop the column `medicalCenterName` on the `healthrecord` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfExamination` on the `healthrecord` table. All the data in the column will be lost.
  - You are about to drop the column `diagnosis` on the `healthrecord` table. All the data in the column will be lost.
  - You are about to drop the column `doctorsRecommendation` on the `healthrecord` table. All the data in the column will be lost.
  - You are about to drop the column `restRecommended` on the `healthrecord` table. All the data in the column will be lost.
  - You are about to drop the column `totalMedicalExpense` on the `healthrecord` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `mother` table. All the data in the column will be lost.
  - You are about to drop the column `fatherName` on the `orphan` table. All the data in the column will be lost.
  - You are about to drop the column `grandfatherName` on the `orphan` table. All the data in the column will be lost.
  - You are about to drop the column `districtId` on the `orphan` table. All the data in the column will be lost.
  - You are about to drop the column `peasantAssociationId` on the `orphan` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `socialworker` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `socialworker` table. All the data in the column will be lost.
  - You are about to drop the column `peasantAssociationId` on the `socialworker` table. All the data in the column will be lost.
  - You are about to drop the column `totalFund_fc` on the `supportplan` table. All the data in the column will be lost.
  - You are about to drop the column `totalFund_brr` on the `supportplan` table. All the data in the column will be lost.
  - You are about to drop the `peasantassociation` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "guardian_nationality_enum" AS ENUM ('Djiboutian', 'Ethiopian', 'Eritrean', 'Kenyan', 'Somali', 'South_Sudanese', 'Sudanese');

-- CreateEnum
CREATE TYPE "userRoles_enum" AS ENUM ('Admin', 'Head', 'Coordiantor', 'Donor', 'SocailWorker', 'Guest');

-- AlterEnum
ALTER TYPE "education_level_enum" ADD VALUE 'religiousEducation';

-- AlterEnum
ALTER TYPE "education_typeofschool_enum" ADD VALUE 'N/A';

-- AlterEnum
ALTER TYPE "guardian_relationtoorphan_enum" ADD VALUE 'legalGuardian';

-- AlterEnum
ALTER TYPE "orphan_religion_enum" ADD VALUE 'Other';

-- AlterEnum
BEGIN;
CREATE TYPE "sponsorshipstatus_enum_new" AS ENUM ('processing', 'pending', 'active', 'graduated');
ALTER TABLE "sponsorshipstatus" ALTER COLUMN "status" TYPE "sponsorshipstatus_enum_new" USING ("status"::text::"sponsorshipstatus_enum_new");
ALTER TYPE "sponsorshipstatus_enum" RENAME TO "sponsorshipstatus_enum_old";
ALTER TYPE "sponsorshipstatus_enum_new" RENAME TO "sponsorshipstatus_enum";
DROP TYPE "sponsorshipstatus_enum_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "peasantassociation" DROP CONSTRAINT "peasantassociation_districtId_fkey";

-- DropForeignKey
ALTER TABLE "peasantassociation" DROP CONSTRAINT "peasantassociation_donorId_fkey";

-- DropForeignKey
ALTER TABLE "orphan" DROP CONSTRAINT "orphan_districtId_fkey";

-- DropForeignKey
ALTER TABLE "orphan" DROP CONSTRAINT "orphan_peasantAssociationId_fkey";

-- DropForeignKey
ALTER TABLE "socialworker" DROP CONSTRAINT "socialworker_peasantAssociationId_fkey";

-- AlterTable
ALTER TABLE "district" DROP COLUMN "districtName",
DROP COLUMN "region",
DROP COLUMN "zone",
ADD COLUMN     "name" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "zoneId" INTEGER,
ADD COLUMN     "coordinatorId" INTEGER;

-- AlterTable
ALTER TABLE "donor" ADD COLUMN     "userId" INTEGER,
ADD COLUMN     "coordinatorId" INTEGER,
ALTER COLUMN "companyName" SET DEFAULT E'',
ALTER COLUMN "nameInitials" SET DEFAULT E'';

-- AlterTable
ALTER TABLE "education" ALTER COLUMN "enrollmentStatus" SET DEFAULT E'unenrolled';

-- AlterTable
ALTER TABLE "father" ADD COLUMN     "firstName" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "lastName" TEXT NOT NULL DEFAULT E'',
ALTER COLUMN "dateOfDeath" SET DEFAULT '1970-01-01 00:00:00 +00:00',
ALTER COLUMN "causeOfDeath" SET DEFAULT E'',
ALTER COLUMN "dateOfBirth" SET DEFAULT '1970-01-01 00:00:00 +00:00',
ALTER COLUMN "deathCertificateUrl" SET DEFAULT E'';

-- AlterTable
ALTER TABLE "guardian" DROP COLUMN "POBox",
DROP COLUMN "phoneNumber",
ADD COLUMN     "moblieNumber" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "telephoneNumber" TEXT,
ADD COLUMN     "nationality" "guardian_nationality_enum" NOT NULL DEFAULT E'Ethiopian',
ADD COLUMN     "guardianLegalConfirmationLetterUrl" TEXT NOT NULL DEFAULT E'',
ALTER COLUMN "firstName" SET DEFAULT E'',
ALTER COLUMN "middleName" SET DEFAULT E'',
ALTER COLUMN "lastName" SET DEFAULT E'',
ALTER COLUMN "gender" SET DEFAULT E'M',
ALTER COLUMN "relationToOrphan" SET DEFAULT E'mother',
ALTER COLUMN "email" SET DEFAULT E'',
ALTER COLUMN "dateOfBirth" SET DEFAULT '1970-01-01 00:00:00 +00:00',
ALTER COLUMN "guardianIDCardUrl" SET DEFAULT E'',
ALTER COLUMN "guardianConfirmationLetterUrl" SET DEFAULT E'';

-- AlterTable
ALTER TABLE "healthrecord" DROP COLUMN "medicalCenterName",
DROP COLUMN "dateOfExamination",
DROP COLUMN "diagnosis",
DROP COLUMN "doctorsRecommendation",
DROP COLUMN "restRecommended",
DROP COLUMN "totalMedicalExpense";

-- AlterTable
ALTER TABLE "house_property" ALTER COLUMN "housingSituation" SET DEFAULT E'';

-- AlterTable
ALTER TABLE "mother" DROP COLUMN "phoneNumber",
ADD COLUMN     "mobileNumber" TEXT NOT NULL DEFAULT E'',
ALTER COLUMN "firstName" SET DEFAULT E'',
ALTER COLUMN "middleName" SET DEFAULT E'',
ALTER COLUMN "lastName" SET DEFAULT E'',
ALTER COLUMN "vitalStatus" SET DEFAULT E'alive',
ALTER COLUMN "dateOfBirth" SET DEFAULT '1970-01-01 00:00:00 +00:00',
ALTER COLUMN "monthlyExpense" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "orphan" DROP COLUMN "fatherName",
DROP COLUMN "grandfatherName",
DROP COLUMN "districtId",
DROP COLUMN "peasantAssociationId",
ADD COLUMN     "villageId" INTEGER,
ALTER COLUMN "firstName" SET DEFAULT E'',
ALTER COLUMN "gender" SET DEFAULT E'M',
ALTER COLUMN "placeOfBirth" SET DEFAULT E'',
ALTER COLUMN "dateOfBirth" SET DEFAULT '1970-01-01 00:00:00 +00:00',
ALTER COLUMN "birthCertificateUrl" SET DEFAULT E'',
ALTER COLUMN "healthDescription" SET DEFAULT E'';

-- AlterTable
ALTER TABLE "orphanphotos" ALTER COLUMN "photoPortraitUrl" SET DEFAULT E'';

-- AlterTable
ALTER TABLE "socialworker" DROP COLUMN "fullName",
DROP COLUMN "phoneNumber",
DROP COLUMN "peasantAssociationId",
ADD COLUMN     "firstName" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "middleName" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "lastName" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "mobileNumber" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "districtId" INTEGER,
ADD COLUMN     "userId" INTEGER,
ALTER COLUMN "email" SET DEFAULT E'';

-- AlterTable
ALTER TABLE "sponsorshipstatus" ALTER COLUMN "date" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- AlterTable
ALTER TABLE "supportplan" DROP COLUMN "totalFund_fc",
DROP COLUMN "totalFund_brr",
ADD COLUMN     "fund_fc" DECIMAL(65,30),
ADD COLUMN     "fund_brr" DECIMAL(65,30),
ADD COLUMN     "period" INTEGER;

-- DropTable
DROP TABLE "peasantassociation";

-- CreateTable
CREATE TABLE "region" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "name" TEXT NOT NULL DEFAULT E'',

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "zone" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "name" TEXT NOT NULL DEFAULT E'',
    "regionId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "village" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "registrationDate" TIMESTAMP(3) NOT NULL DEFAULT '1970-01-01 00:00:00 +00:00',
    "name" TEXT,
    "districtId" INTEGER,
    "donorId" INTEGER,
    "coordinatorId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "head" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "firstName" TEXT NOT NULL DEFAULT E'',
    "middleName" TEXT NOT NULL DEFAULT E'',
    "lastName" TEXT NOT NULL DEFAULT E'',
    "userId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coordinator" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "firstName" TEXT NOT NULL DEFAULT E'',
    "middleName" TEXT NOT NULL DEFAULT E'',
    "lastName" TEXT NOT NULL DEFAULT E'',
    "userId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "role" "userRoles_enum" NOT NULL DEFAULT E'Guest',
    "email" TEXT NOT NULL DEFAULT E'',
    "password" TEXT,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "zone" ADD FOREIGN KEY ("regionId") REFERENCES "region"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "village" ADD FOREIGN KEY ("coordinatorId") REFERENCES "coordinator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "village" ADD FOREIGN KEY ("districtId") REFERENCES "district"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "village" ADD FOREIGN KEY ("donorId") REFERENCES "donor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "head" ADD FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coordinator" ADD FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "district" ADD FOREIGN KEY ("coordinatorId") REFERENCES "coordinator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "district" ADD FOREIGN KEY ("zoneId") REFERENCES "zone"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donor" ADD FOREIGN KEY ("coordinatorId") REFERENCES "coordinator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donor" ADD FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orphan" ADD FOREIGN KEY ("villageId") REFERENCES "village"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "socialworker" ADD FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "socialworker" ADD FOREIGN KEY ("districtId") REFERENCES "district"("id") ON DELETE SET NULL ON UPDATE CASCADE;
