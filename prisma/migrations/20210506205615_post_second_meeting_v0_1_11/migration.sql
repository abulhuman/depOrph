/*
  Warnings:

  - You are about to drop the column `guardianIDCardUrl` on the `guardian` table. All the data in the column will be lost.
  - You are about to drop the column `guardianConfirmationLetterUrl` on the `guardian` table. All the data in the column will be lost.
  - You are about to drop the column `guardianLegalConfirmationLetterUrl` on the `guardian` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "father" ALTER COLUMN "dateOfDeath" SET DEFAULT '1970-01-01 00:00:00 +00:00',
ALTER COLUMN "dateOfBirth" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- AlterTable
ALTER TABLE "guardian" DROP COLUMN "guardianIDCardUrl",
DROP COLUMN "guardianConfirmationLetterUrl",
DROP COLUMN "guardianLegalConfirmationLetterUrl",
ADD COLUMN     "iDCardUrl" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "confirmationLetterUrl" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "legalConfirmationLetterUrl" TEXT NOT NULL DEFAULT E'',
ALTER COLUMN "dateOfBirth" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- AlterTable
ALTER TABLE "mother" ALTER COLUMN "dateOfBirth" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- AlterTable
ALTER TABLE "orphan" ALTER COLUMN "dateOfBirth" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- AlterTable
ALTER TABLE "sponsorshipstatus" ALTER COLUMN "date" SET DEFAULT '1970-01-01 00:00:00 +00:00';

-- AlterTable
ALTER TABLE "village" ALTER COLUMN "registrationDate" SET DEFAULT '1970-01-01 00:00:00 +00:00';
