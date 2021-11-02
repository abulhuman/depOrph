/*
  Warnings:

  - You are about to drop the `healthrecord` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "healthrecord" DROP CONSTRAINT "healthrecord_orphanId_fkey";

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

-- DropTable
DROP TABLE "healthrecord";

-- CreateTable
CREATE TABLE "orphandocument" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "medicalCertificateUrl" TEXT,
    "orphanId" INTEGER,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orphandocument" ADD FOREIGN KEY ("orphanId") REFERENCES "orphan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
