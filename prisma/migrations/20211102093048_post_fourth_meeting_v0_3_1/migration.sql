/*
  Warnings:

  - You are about to drop the column `medicalCertificateUrl` on the `orphandocument` table. All the data in the column will be lost.
  - Added the required column `documentType` to the `orphandocument` table without a default value. This is not possible if the table is not empty.
  - Added the required column `documentUrl` to the `orphandocument` table without a default value. This is not possible if the table is not empty.

*/
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
ALTER TABLE "orphandocument" DROP COLUMN "medicalCertificateUrl",
ADD COLUMN     "documentType" TEXT NOT NULL,
ADD COLUMN     "documentUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "sponsorshipstatus" ALTER COLUMN "date" SET DEFAULT '1970-01-01 00:00:00 +00:00';
