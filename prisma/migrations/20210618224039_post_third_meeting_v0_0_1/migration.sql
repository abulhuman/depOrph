/*
  Warnings:

  - You are about to drop the column `thankyouLetterUrl` on the `orphan` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "sponsorshipstatus_enum" ADD VALUE 'new';

-- AlterTable
ALTER TABLE "educationalrecord" ADD COLUMN     "enrollmentStatus" "education_enrollmentstatus_enum" NOT NULL DEFAULT E'unenrolled',
ADD COLUMN     "schoolName" TEXT,
ADD COLUMN     "typeOfSchool" "education_typeofschool_enum",
ADD COLUMN     "year" TEXT,
ADD COLUMN     "level" "education_level_enum",
ADD COLUMN     "reason" TEXT;

-- AlterTable
ALTER TABLE "father" ALTER COLUMN "dateOfDeath" SET DEFAULT '1970-01-01 00:00:00 +00:00',
ALTER COLUMN "dateOfBirth" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- AlterTable
ALTER TABLE "guardian" ALTER COLUMN "dateOfBirth" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- AlterTable
ALTER TABLE "mother" ALTER COLUMN "dateOfBirth" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- AlterTable
ALTER TABLE "orphan" DROP COLUMN "thankyouLetterUrl",
ADD COLUMN     "originalThankyouLetterUrl" TEXT,
ADD COLUMN     "translatedThankyouLetterUrl" TEXT,
ALTER COLUMN "dateOfBirth" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- AlterTable
ALTER TABLE "sponsorshipstatus" ALTER COLUMN "date" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- AlterTable
ALTER TABLE "village" ALTER COLUMN "registrationDate" SET DEFAULT '1970-01-01 00:00:00 +00:00';
