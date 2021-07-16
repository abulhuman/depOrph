/*
  Warnings:

  - The values [emailChange] on the enum `accountMaintainenceType_enum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "accountMaintainenceType_enum_new" AS ENUM ('createAccount', 'passwordRecovery');
ALTER TABLE "accountMaintainence" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "accountMaintainence" ALTER COLUMN "type" TYPE "accountMaintainenceType_enum_new" USING ("type"::text::"accountMaintainenceType_enum_new");
ALTER TYPE "accountMaintainenceType_enum" RENAME TO "accountMaintainenceType_enum_old";
ALTER TYPE "accountMaintainenceType_enum_new" RENAME TO "accountMaintainenceType_enum";
DROP TYPE "accountMaintainenceType_enum_old";
ALTER TABLE "accountMaintainence" ALTER COLUMN "type" SET DEFAULT 'createAccount';
COMMIT;

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
