/*
  Warnings:

  - The migration will remove the values [SocailWorker] on the enum `userRoles_enum`. If these variants are still used in the database, the migration will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "userRoles_enum_new" AS ENUM ('Admin', 'Head', 'Coordinator', 'Donor', 'SocialWorker', 'Guest');
ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "user" ALTER COLUMN "role" TYPE "userRoles_enum_new" USING ("role"::text::"userRoles_enum_new");
ALTER TABLE "user" ALTER COLUMN "role" SET  DEFAULT E'Guest';
ALTER TYPE "userRoles_enum" RENAME TO "userRoles_enum_old";
ALTER TYPE "userRoles_enum_new" RENAME TO "userRoles_enum";
DROP TYPE "userRoles_enum_old";
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
ALTER TABLE "supportplan" ADD COLUMN     "adminFeePercentage" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "village" ALTER COLUMN "registrationDate" SET DEFAULT '1970-01-01 00:00:00 +00:00';
