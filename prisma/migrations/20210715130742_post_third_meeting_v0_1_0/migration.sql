-- CreateEnum
CREATE TYPE "accountMaintainenceType_enum" AS ENUM ('createAccount', 'passwordRecovery', 'emailChange');

-- AlterEnum
ALTER TYPE "education_level_enum" ADD VALUE 'gradeSchool';

-- AlterEnum
ALTER TYPE "guardian_relationtoorphan_enum" ADD VALUE 'other';

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
ALTER TABLE "sponsorshipstatus" ADD COLUMN     "reason" TEXT,
ALTER COLUMN "date" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- AlterTable
ALTER TABLE "village" ALTER COLUMN "registrationDate" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- CreateTable
CREATE TABLE "accountMaintainence" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "type" "accountMaintainenceType_enum" NOT NULL DEFAULT E'createAccount',
    "firstName" TEXT NOT NULL DEFAULT E'',
    "middleName" TEXT NOT NULL DEFAULT E'',
    "lastName" TEXT NOT NULL DEFAULT E'',
    "email" TEXT NOT NULL DEFAULT E'',
    "mobileNumber" TEXT NOT NULL DEFAULT E'',

    PRIMARY KEY ("id")
);
